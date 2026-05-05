import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import axiosInstance from '../../api/axiosInstance'

interface StockSearchResult {
  stockCode: string
  stockName: string
  market: string
}

interface SearchBarProps {
  placeholder?: string
  size?: 'sm' | 'md'
}

function SearchBar({ placeholder = '종목명 또는 코드 검색 (예: 삼성전자, 005930)', size = 'md' }: SearchBarProps) {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState<string>('')
  const [results, setResults] = useState<StockSearchResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearch = async (value: string) => {
    setKeyword(value)
    if (value.trim().length < 1) {
      setResults([])
      return
    }
    setIsLoading(true)
    try {
      const response = await axiosInstance.get<StockSearchResult[]>(`/api/stocks/search?q=${value}`)
      setResults(response.data)
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (stockCode: string) => {
    setKeyword('')
    setResults([])
    navigate(ROUTES.STOCK_DETAIL.replace(':stockCode', stockCode))
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-[24px]">search</span>
        <input
          className={`w-full bg-[#161b22] border border-[#30363d] rounded-lg text-on-surface pl-10 pr-4 ${size === 'sm' ? 'py-1.5 text-body-data' : 'py-4 text-body-main'} focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-colors placeholder:text-outline`}
          placeholder={placeholder}
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
        />
        {isLoading && (
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline animate-spin text-[20px]">progress_activity</span>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container border border-[#30363d] rounded-lg overflow-hidden z-10 shadow-lg">
          {results.map((stock) => (
            <div
              key={stock.stockCode}
              onClick={() => handleSelect(stock.stockCode)}
              className="flex items-center justify-between px-4 py-3 hover:bg-surface-container-high cursor-pointer transition-colors border-b border-[#30363d] last:border-none"
            >
              <div>
                <span className="text-body-data text-on-surface">{stock.stockName}</span>
                <span className="text-caption text-on-surface-variant ml-2">{stock.stockCode}</span>
              </div>
              <span className="text-label-caps border border-[#30363d] text-on-surface-variant px-2 py-0.5 rounded">
                {stock.market}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar