import SignupForm from '../components/auth/SignupForm'
import SocialLoginButtons from '../components/auth/SocialLoginButtons'

function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow flex items-center justify-center p-space-md">
        <div className="w-full max-w-md bg-surface-container rounded-xl border border-surface-variant p-space-lg shadow-lg flex flex-col gap-space-lg">

          <div className="text-center">
            <h1 className="text-display-lg text-on-surface tracking-tighter mb-2">계정 만들기</h1>
            <p className="text-body-data text-on-surface-variant">StockMentor와 함께 스마트한 투자를 시작하세요.</p>
          </div>

          <SignupForm />

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-surface-variant flex-grow"></div>
            <span className="text-caption text-outline-variant">또는 소셜로 시작하기</span>
            <div className="h-px bg-surface-variant flex-grow"></div>
          </div>

          <SocialLoginButtons label="시작하기" />

        </div>
      </main>
    </div>
  )
}

export default SignupPage