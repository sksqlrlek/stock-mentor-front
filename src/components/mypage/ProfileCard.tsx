interface ProfileCardProps {
  nickname: string
  email: string
  riskType: 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE' | null
  createdAt?: string
}

const RISK_TYPE_CONFIG = {
  AGGRESSIVE: { label: '공격형', color: 'text-[#f85149]', bg: 'bg-[#f85149]/10', border: 'border-[#f85149]/30' },
  NEUTRAL: { label: '중립형', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  CONSERVATIVE: { label: '안정형', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' },
}

function ProfileCard({ nickname, email, riskType, createdAt }: ProfileCardProps) {
  const riskConfig = riskType ? RISK_TYPE_CONFIG[riskType] : null

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-space-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-5 rounded-bl-full pointer-events-none"></div>

      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-surface-container-high border-2 border-[#30363d] flex items-center justify-center mb-space-md">
          <span className="text-display-lg text-on-surface-variant">{nickname[0]}</span>
        </div>

        <h2 className="text-title-sm text-on-surface mb-1">{nickname}</h2>
        <p className="text-body-data text-on-surface-variant mb-space-md">{email}</p>

        {riskConfig && (
          <span className={`text-caption px-3 py-1 rounded-full border font-medium ${riskConfig.color} ${riskConfig.bg} ${riskConfig.border}`}>
            {riskConfig.label} 투자자
          </span>
        )}
      </div>

      {createdAt && (
        <div className="border-t border-[#30363d] mt-space-md pt-space-sm flex justify-between items-center">
          <span className="text-caption text-on-surface-variant">가입일</span>
          <span className="text-caption text-on-surface">{createdAt}</span>
        </div>
      )}
    </div>
  )
}

export default ProfileCard