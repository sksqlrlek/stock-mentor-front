import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../constants/routes'
import ProfileCard from '../components/mypage/ProfileCard'
import ProfileEditForm from '../components/mypage/ProfileEditForm'

interface UserProfile {
  id: number
  email: string
  nickname: string
  riskType: 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE' | null
  interestSector: string | null
  createdAt: string
}

function MyPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN)
      return
    }
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get<UserProfile>('/api/users/me')
      setProfile(response.data)
    } catch {
      console.error('프로필 조회 실패')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.HOME)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="material-symbols-outlined animate-spin text-primary-container text-[48px]">progress_activity</span>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-on-surface-variant text-body-main">프로필 정보를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-display-lg text-on-surface">마이페이지</h1>
          <p className="text-body-data text-on-surface-variant mt-1">계정 정보 및 투자 성향을 관리하세요.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-body-data text-[#f85149] hover:bg-[#f85149]/10 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-[#f85149]/30"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          로그아웃
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-4">
          <ProfileCard
            nickname={profile.nickname}
            email={profile.email}
            riskType={profile.riskType}
            createdAt={profile.createdAt}
          />
        </div>
        <div className="lg:col-span-8">
          <ProfileEditForm
            initialNickname={profile.nickname}
            initialRiskType={profile.riskType}
            initialInterestSector={profile.interestSector ?? ''}
          />
        </div>
      </div>
    </div>
  )
}

export default MyPage