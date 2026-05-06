import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

interface WatchlistItemProps {
  id: number
  stockCode: string
  stockName: string
  currentPrice: string
  priceChange: string
  priceChangeRate: string
  onDelete: (id: number) => void
}

function WatchlistItem({ id, stockCode, stockName, currentPrice, priceChange, priceChangeRate, onDelete }: WatchlistItemProps) {
  const navigate = useNavigate()
  const isPositive = !priceChangeRate.startsWith('-') && priceChangeRate !== '0.00%'

  return (
    <div
      onClick={() => navigate(ROUTES.STOCK_DETAIL.replace(':stockCode', stockCode))}
      className="grid grid-cols-12 gap-4 px-space-md py-space-sm items-center border-b border-[#30363d] hover:bg-surface-container-high cursor-pointer transition-colors group"
    >
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-[#30363d] flex items-center justify-center shrink-0">
          <span className="text-body-data text-on-surface font-semibold">{stockName[0]}</span>
        </div>
        <div>
          <p className="text-body-data text-on-surface group-hover:text-primary-container transition-colors">{stockName}</p>
          <p className="text-caption text-on-surface-variant font-mono">{stockCode}</p>
        </div>
      </div>

      <div className="col-span-3 text-right">
        <p className="text-body-data text-on-surface font-mono">{currentPrice}원</p>
      </div>

      <div className="col-span-3 text-right">
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-caption ${
          isPositive
            ? 'text-secondary bg-secondary/10 border-secondary/30'
            : priceChangeRate === '0.00%'
            ? 'text-on-surface-variant bg-surface-container border-[#30363d]'
            : 'text-[#f85149] bg-[#f85149]/10 border-[#f85149]/30'
        }`}>
          <span className="material-symbols-outlined text-[14px]">
            {isPositive ? 'arrow_upward' : priceChangeRate === '0.00%' ? 'horizontal_rule' : 'arrow_downward'}
          </span>
          {priceChangeRate}
        </div>
        <p className="text-caption text-on-surface-variant mt-0.5 text-right">{priceChange}</p>
      </div>

      <div className="col-span-1 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
          className="text-on-surface-variant hover:text-[#f85149] transition-colors p-1 rounded"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  )
}

export default WatchlistItem