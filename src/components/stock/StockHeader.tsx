interface StockHeaderProps {
  stockCode: string
  stockName: string
  market?: string
  currentPrice: string
  priceChange: string
  priceChangeRate: string
  isWatchlisted?: boolean
  onWatchlistToggle?: () => void
}

function StockHeader({ stockCode, stockName, market = 'KOSPI', currentPrice, priceChange, priceChangeRate, isWatchlisted = false, onWatchlistToggle }: StockHeaderProps) {
  const isPositive = !priceChangeRate.startsWith('-') && priceChangeRate !== '0.00%'

  return (
    <div className="flex items-start justify-between pb-space-md border-b border-[#30363d]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
            <h1 className="text-display-lg text-on-background font-bold tracking-tight">{stockName}</h1>
            <button
            onClick={onWatchlistToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-medium transition-all ${
                isWatchlisted
                ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                : 'bg-surface-container-high border border-[#30363d] text-on-surface-variant hover:border-outline hover:text-on-surface'
            }`}
            >
            <span className={`material-symbols-outlined text-[15px] ${isWatchlisted ? 'text-yellow-400' : ''}`}
                style={{ fontVariationSettings: isWatchlisted ? "'FILL' 1" : "'FILL' 0" }}>
                star
            </span>
            {isWatchlisted ? '관심 해제' : '관심종목'}
            </button>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-body-data text-on-surface-variant font-mono tracking-wider">{stockCode}</span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <span className="text-body-data text-primary-container font-medium">{market}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-display-lg text-on-background">
          {currentPrice} <span className="text-title-sm text-on-surface-variant">KRW</span>
        </div>
        <div className={`flex items-center justify-end gap-1 text-title-sm mt-1 ${isPositive ? 'text-secondary' : 'text-[#f85149]'}`}>
          <span className="material-symbols-outlined text-[20px]">
            {isPositive ? 'arrow_upward' : 'arrow_downward'}
          </span>
          <span>{priceChange} ({priceChangeRate})</span>
        </div>
      </div>
    </div>
  )
}

export default StockHeader