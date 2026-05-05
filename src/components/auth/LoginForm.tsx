import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import axiosInstance from '../../api/axiosInstance'

interface LoginResponse {
  accessToken: string
  user: {
    id: number
    email: string
    nickname: string
    riskType: 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE' | null
    interestSector: string | null
  }
}

function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axiosInstance.post<LoginResponse>('/api/auth/login', { email, password })
      login(response.data.accessToken, response.data.user)
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
      <div>
        <label className="block text-label-caps text-on-surface-variant mb-space-xs" htmlFor="email">
          이메일
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">mail</span>
          <input
            className="w-full bg-surface-container-low border border-surface-variant rounded py-space-sm pl-10 pr-space-sm text-body-data text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors"
            id="email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-label-caps text-on-surface-variant mb-space-xs" htmlFor="password">
          비밀번호
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">lock</span>
          <input
            className="w-full bg-surface-container-low border border-surface-variant rounded py-space-sm pl-10 pr-space-sm text-body-data text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-error text-caption">{error}</p>
      )}

      <button
        className="w-full bg-primary-container text-on-primary-container text-title-sm rounded py-space-sm flex justify-center items-center gap-space-xs hover:bg-inverse-primary transition-colors mt-space-md"
        type="submit"
      >
        로그인
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>

      <div className="text-center text-caption text-on-surface-variant">
        계정이 없으신가요?{' '}
        <Link to={ROUTES.SIGNUP} className="text-primary-container hover:underline font-medium">
          회원가입
        </Link>
      </div>
    </form>
  )
}

export default LoginForm