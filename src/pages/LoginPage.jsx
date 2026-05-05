import LoginForm from '../components/auth/LoginForm'
import SocialLoginButtons from '../components/auth/SocialLoginButtons'

function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow flex items-center justify-center p-space-md">
        <div className="w-full max-w-md bg-surface-container rounded-xl border border-surface-variant p-space-lg shadow-lg flex flex-col gap-space-lg">

          <div className="text-center">
            <h1 className="text-display-lg text-on-surface tracking-tighter mb-2">StockMentor</h1>
            <p className="text-body-data text-on-surface-variant">Guided Precision for Korean Investors.</p>
          </div>

          <LoginForm />

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-surface-variant flex-grow"></div>
            <span className="text-caption text-outline-variant">또는 소셜 로그인</span>
            <div className="h-px bg-surface-variant flex-grow"></div>
          </div>

          <SocialLoginButtons label="로그인" />

        </div>
      </main>
    </div>
  )
}

export default LoginPage