type RiskType = 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE'

interface RiskTypeOption {
  value: RiskType
  label: string
  icon: string
  description: string
  iconColor: string
}

interface RiskTypeSelectorProps {
  selected: RiskType | null
  onChange: (value: RiskType) => void
}

const RISK_TYPES: RiskTypeOption[] = [
  {
    value: 'AGGRESSIVE',
    label: '공격형',
    icon: 'rocket_launch',
    description: '높은 리스크를 감수하고 고수익을 추구하는 성장주 위주 투자.',
    iconColor: 'text-tertiary',
  },
  {
    value: 'NEUTRAL',
    label: '중립형',
    icon: 'balance',
    description: '적절한 리스크를 감수하며 시장 평균 수익률을 목표로 하는 균형 투자.',
    iconColor: 'text-primary',
  },
  {
    value: 'CONSERVATIVE',
    label: '안정형',
    icon: 'shield',
    description: '원금 보존을 최우선으로 하며, 낮은 리스크의 배당주 위주 투자.',
    iconColor: 'text-secondary',
  },
]

function RiskTypeSelector({ selected, onChange }: RiskTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {RISK_TYPES.map((type) => (
        <label key={type.value} className="cursor-pointer relative">
          <input
            className="peer sr-only"
            type="radio"
            name="riskType"
            value={type.value}
            checked={selected === type.value}
            onChange={() => onChange(type.value)}
          />
          <div className="h-full bg-surface-container-low border border-[#30363d] rounded-xl p-space-md hover:border-outline transition-colors peer-checked:border-primary-container peer-checked:bg-primary-container/10">
            <div className="flex justify-between items-start mb-2">
              <span className={`material-symbols-outlined text-[24px] ${type.iconColor}`}>
                {type.icon}
              </span>
            </div>
            <h4 className="text-title-sm text-on-surface mb-1">{type.label}</h4>
            <p className="text-caption text-on-surface-variant">{type.description}</p>
          </div>
          <div className="absolute inset-0 border-2 border-primary-container rounded-xl pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"></div>
        </label>
      ))}
    </div>
  )
}

export default RiskTypeSelector