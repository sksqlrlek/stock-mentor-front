interface StockInfoGridProps {
  marketCap: string
  per: string
  pbr: string
  high52Week: string
  low52Week: string
}

function StockInfoGrid({ marketCap, per, pbr, high52Week, low52Week }: StockInfoGridProps) {
  const items = [
    { label: '시가총액', value: marketCap, unit: '', icon: 'corporate_fare' },
    { label: 'PER', value: per, unit: '배', icon: 'percent' },
    { label: 'PBR', value: pbr, unit: '배', icon: 'calculate' },
    { label: '52주 최고', value: high52Week, unit: '원', icon: 'arrow_upward', valueColor: 'text-secondary' },
    { label: '52주 최저', value: low52Week, unit: '원', icon: 'arrow_downward', valueColor: 'text-[#f85149]' },
  ]

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="px-space-md pt-space-md pb-space-sm border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary-container text-[18px]">monitoring</span>
          <span className="text-title-sm text-on-surface">핵심 지표</span>
        </div>
        <p className="text-caption text-on-surface-variant">주요 재무 지표 요약</p>
      </div>
      <div className="divide-y divide-[#30363d]">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between px-space-md py-space-sm hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">{item.icon}</span>
              <span className="text-caption text-on-surface-variant">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className={`text-body-data font-semibold tabular-nums ${item.valueColor ?? 'text-on-surface'}`}>
                    {item.value}
                </span>
                {item.unit && (
                    <span className="text-body-data text-on-surface-variant opacity-70">
                    {item.unit}
                    </span>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StockInfoGrid