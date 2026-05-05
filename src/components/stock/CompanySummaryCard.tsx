interface CompanySummaryCard {
  stockName: string
  summary: string
  isLoading: boolean
}

function CompanySummaryCard({ stockName, summary, isLoading }: CompanySummaryCard) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="px-space-md pt-space-md pb-space-sm border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary-container text-[18px]">neurology</span>
          <span className="text-title-sm text-on-surface">AI 기업 요약</span>
        </div>
        <p className="text-caption text-on-surface-variant">Claude AI가 분석한 기업 개요</p>
      </div>

      <div className="p-space-md">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              <span className="text-body-data">{stockName} 분석 중...</span>
            </div>
            <div className="h-3 bg-surface-container-high rounded animate-pulse w-full"></div>
            <div className="h-3 bg-surface-container-high rounded animate-pulse w-4/5"></div>
            <div className="h-3 bg-surface-container-high rounded animate-pulse w-3/5"></div>
          </div>
        ) : summary ? (
          <p className="text-body-data text-on-surface-variant leading-relaxed">
            {summary}
          </p>
        ) : (
          <div className="flex flex-col items-center gap-2 py-space-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[32px]">smart_toy</span>
            <p className="text-body-data">AI 분석을 요청해보세요</p>
            <p className="text-caption text-outline">종목 상세 분석을 제공합니다</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanySummaryCard