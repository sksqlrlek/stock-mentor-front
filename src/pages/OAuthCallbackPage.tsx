import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'

interface UserResponse {
  id: number
  email: string
  nickname: string
  riskType: 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE' | null
  interestSector: string | null
}

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    localStorage.setItem('accessToken', token)

    axiosInstance.get<UserResponse>('/api/users/me')
      .then((res) => {
        login(token, res.data)
        navigate('/', { replace: true })
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
        navigate('/login', { replace: true })
      })
  }, [])

  return <div>로그인 처리 중...</div>
}