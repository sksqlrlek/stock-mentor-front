import { useState } from 'react'

type TabType = 'STRATEGY' | 'RISK'

interface Strategy {
  type: '단기' | '중기' | '장기'
  recommendation: '매수' | '관망' | '매도'
  targetPrice: string
  stopLossPrice: string
  description: string
}

interface RiskInfo {
  level: 'LOW' | 'MEDIUM' | 'HIGH'
  recommendedWeight: string
  description: string
}

interface AiAnalysisCardProps {
  strategies: Strategy[]
  riskInfo: RiskInfo | null
  isLoading: boolean
}

const RECOMMENDATION_CONFIG = {
  매수: { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' },
  관망: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  매도: { color: 'text-[#f85149]', bg: 'bg-[#f85149]/10', border: 'border-[#f85149]/30' },
}

const RISK_CONFIG = {
  LOW: { label: '낮음', color: 'text-secondary', width: 'w-1/3' },
  MEDIUM: { label: '보통', color: 'text-yellow-400', width: 'w-2/3' },
  HIGH: { label: '높음', color: 'text-[#f85149]', width: 'w-full' },
}

const TABS = [
  { label: '매매 전략', value: 'STRATEGY' as TabType },
  { label: '리스크 관리', value: 'RISK' as TabType },
]

function AiAnalysisCard({ strategies, riskInfo, isLoading }: AiAnalysisCardProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('STRATEGY')

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="px-space-md pt-space-md pb-space-sm border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary-container text-[18px]">psychology</span>
          <span className="text-title-sm text-on-surface">AI 매매 분석</span>
        </div>
        <p className="text-caption text-on-surface-variant">Claude AI가 분석한 매매 전략 및 리스크</p>
      </div>

      <div className="flex border-b border-[#30363d]">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`flex-1 py-space-sm text-body-data transition-colors ${
              selectedTab === tab.value
                ? 'text-primary-container border-b-2 border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-space-md">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-on-surface-variant mb-1">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              <span className="text-body-data">AI 분석 중...</span>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-3 bg-surface-container-high rounded animate-pulse" style={{ width: `${80 - i * 15}%` }}></div>
            ))}
          </div>
        ) : selectedTab === 'STRATEGY' ? (
          strategies.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-space-md text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px]">psychology</span>
              <p className="text-body-data">AI 분석을 요청해보세요</p>
              <p className="text-caption text-outline">매매 전략 분석을 제공합니다</p>
            </div>
          ) : (
            <div className="flex flex-col gap-space-md">
              {strategies.map((strategy) => {
                const config = RECOMMENDATION_CONFIG[strategy.recommendation]
                return (
                  <div key={strategy.type} className="bg-surface-container rounded-lg p-space-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body-data text-on-surface font-medium">{strategy.type}</span>
                      <span className={`text-caption px-2 py-0.5 rounded-full border ${config.color} ${config.bg} ${config.border}`}>
                        {strategy.recommendation}
                      </span>
                    </div>
                    <p className="text-caption text-on-surface-variant mb-2">{strategy.description}</p>
                    <div className="flex gap-space-md">
                      <div>
                        <span className="text-caption text-on-surface-variant">목표가 </span>
                        <span className="text-caption text-secondary font-mono">{strategy.targetPrice}원</span>
                      </div>
                      <div>
                        <span className="text-caption text-on-surface-variant">손절가 </span>
                        <span className="text-caption text-[#f85149] font-mono">{strategy.stopLossPrice}원</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        ) : (
          riskInfo === null ? (
            <div className="flex flex-col items-center gap-2 py-space-md text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px]">shield</span>
              <p className="text-body-data">AI 분석을 요청해보세요</p>
              <p className="text-caption text-outline">리스크 관리 가이드를 제공합니다</p>
            </div>
          ) : (
            <div className="flex flex-col gap-space-md">
              <div className="bg-surface-container rounded-lg p-space-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-body-data text-on-surface">리스크 수준</span>
                  <span className={`text-body-data font-semibold ${RISK_CONFIG[riskInfo.level].color}`}>
                    {RISK_CONFIG[riskInfo.level].label}
                  </span>
                </div>
                <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${RISK_CONFIG[riskInfo.level].width} ${
                    riskInfo.level === 'LOW' ? 'bg-secondary' :
                    riskInfo.level === 'MEDIUM' ? 'bg-yellow-400' : 'bg-[#f85149]'
                  }`}></div>
                </div>
              </div>
              <div className="bg-surface-container rounded-lg p-space-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-body-data text-on-surface">권장 투자 비중</span>
                  <span className="text-body-data text-primary-container font-mono font-semibold">{riskInfo.recommendedWeight}</span>
                </div>
                <p className="text-caption text-on-surface-variant">{riskInfo.description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default AiAnalysisCard