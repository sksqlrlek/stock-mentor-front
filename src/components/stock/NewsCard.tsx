interface NewsItem {
  title: string
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  summary: string
  publishedAt: string
  url: string
}

interface NewsCardProps {
  news: NewsItem[]
  isLoading: boolean
}

const SENTIMENT_CONFIG = {
  POSITIVE: { label: '긍정', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' },
  NEUTRAL: { label: '중립', color: 'text-on-surface-variant', bg: 'bg-surface-container-high', border: 'border-[#30363d]' },
  NEGATIVE: { label: '부정', color: 'text-[#f85149]', bg: 'bg-[#f85149]/10', border: 'border-[#f85149]/30' },
}

function NewsCard({ news, isLoading }: NewsCardProps) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="px-space-md pt-space-md pb-space-sm border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary-container text-[18px]">newspaper</span>
          <span className="text-title-sm text-on-surface">뉴스 감성 분석</span>
        </div>
        <p className="text-caption text-on-surface-variant">최신 뉴스의 감성을 AI가 분석합니다</p>
      </div>

      <div className="divide-y divide-[#30363d]">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-space-md flex flex-col gap-2">
              <div className="h-3 bg-surface-container-high rounded animate-pulse w-1/4"></div>
              <div className="h-3 bg-surface-container-high rounded animate-pulse w-full"></div>
              <div className="h-3 bg-surface-container-high rounded animate-pulse w-3/4"></div>
            </div>
          ))
        ) : news.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-space-lg text-on-surface-variant">
            <span className="material-symbols-outlined text-[32px]">newspaper</span>
            <p className="text-body-data">관련 뉴스가 없습니다</p>
          </div>
        ) : (
          news.map((item, index) => {
            const config = SENTIMENT_CONFIG[item.sentiment]
            return (
              <div key={index} className="p-space-md hover:bg-surface-container transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className={`text-caption px-2 py-0.5 rounded-full border ${config.color} ${config.bg} ${config.border} shrink-0`}>
                    {config.label}
                  </span>
                  <span className="text-caption text-on-surface-variant">{item.publishedAt}</span>
                </div>
                
                  <a href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-data text-on-surface hover:text-primary-container transition-colors line-clamp-2 block mb-1"
                >
                  {item.title}
                </a>
                <p className="text-caption text-on-surface-variant line-clamp-2">{item.summary}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default NewsCard