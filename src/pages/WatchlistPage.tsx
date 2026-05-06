import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import WatchlistItem from '../components/watchlist/WatchlistItem'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/AuthContext'

interface WatchlistStock {
  id: number
  stockCode: string
  stockName: string
  currentPrice: string
  priceChange: string
  priceChangeRate: string
}

function WatchlistPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN)
      return
    }
    fetchWatchlist()
  }, [user])

  const fetchWatchlist = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get<WatchlistStock[]>('/api/watchlist')
      setWatchlist(response.data)
    } catch {
      console.error('관심종목 조회 실패')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/watchlist/${id}`)
      setWatchlist((prev) => prev.filter((item) => item.id !== id))
    } catch {
      console.error('관심종목 삭제 실패')
    }
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-display-lg text-on-surface">나의 관심종목</h1>
          <p className="text-body-data text-on-surface-variant mt-1">선택한 주식의 실시간 변동을 추적합니다.</p>
        </div>
        <span className="text-caption text-on-surface-variant">{watchlist.length}개 종목</span>
      </div>

      <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-space-md py-space-sm border-b border-[#30363d] bg-surface-container-low">
          <div className="col-span-5 text-label-caps text-outline">종목명</div>
          <div className="col-span-3 text-label-caps text-outline text-right">현재가</div>
          <div className="col-span-3 text-label-caps text-outline text-right">변동률</div>
          <div className="col-span-1"></div>
        </div>

        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-space-md py-space-sm border-b border-[#30363d]">
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container-high animate-pulse"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-20 bg-surface-container-high rounded animate-pulse"></div>
                  <div className="h-2 w-12 bg-surface-container-high rounded animate-pulse"></div>
                </div>
              </div>
              <div className="col-span-3 flex justify-end items-center">
                <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse"></div>
              </div>
              <div className="col-span-3 flex justify-end items-center">
                <div className="h-6 w-16 bg-surface-container-high rounded animate-pulse"></div>
              </div>
            </div>
          ))
        ) : watchlist.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-space-xl text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px]">star</span>
            <p className="text-body-main">관심종목이 없습니다</p>
            <p className="text-body-data text-outline">종목 검색에서 관심종목을 추가해보세요</p>
          </div>
        ) : (
          watchlist.map((item) => (
            <WatchlistItem
              key={item.id}
              {...item}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default WatchlistPage