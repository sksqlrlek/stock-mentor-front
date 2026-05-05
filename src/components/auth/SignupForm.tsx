import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'

interface SignupResponse {
  accessToken: string
  user: {
    id: number
    email: string
    nickname: string
    riskType: 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE' | null
    interestSector: string | null
  }
}

function SignupForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await axiosInstance.post('/api/auth/signup', { email, password, nickname })
      const response = await axiosInstance.post<SignupResponse>('/api/auth/login', { email, password })
      login(response.data.accessToken, response.data.user)
      navigate(ROUTES.HOME)
    } catch {
      setError('이미 사용 중인 이메일입니다.')
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
        <label className="block text-label-caps text-on-surface-variant mb-space-xs" htmlFor="nickname">
          닉네임
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">person</span>
          <input
            className="w-full bg-surface-container-low border border-surface-variant rounded py-space-sm pl-10 pr-space-sm text-body-data text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors"
            id="nickname"
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
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

      <div>
        <label className="block text-label-caps text-on-surface-variant mb-space-xs" htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">lock</span>
          <input
            className="w-full bg-surface-container-low border border-surface-variant rounded py-space-sm pl-10 pr-space-sm text-body-data text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors"
            id="passwordConfirm"
            type="password"
            placeholder="••••••••"
            value={passwordConfirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
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
        회원가입
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>

      <div className="text-center text-caption text-on-surface-variant">
        이미 계정이 있으신가요?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary-container hover:underline font-medium">
          로그인
        </Link>
      </div>
    </form>
  )
}

export default SignupForm