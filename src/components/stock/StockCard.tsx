import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

interface StockCardProps {
  stockCode: string
  stockName: string
  market: string
  currentPrice: string
  priceChange: string
  priceChangeRate: string
}

function StockCard({ stockCode, stockName, market, currentPrice, priceChange, priceChangeRate }: StockCardProps) {
  const navigate = useNavigate()
  const isPositive = !priceChangeRate.startsWith('-')

  const handleClick = () => {
    navigate(ROUTES.STOCK_DETAIL.replace(':stockCode', stockCode))
  }

  return (
    <div
      onClick={handleClick}
      className="bg-[#161b22] border border-[#30363d] rounded-lg p-space-md flex flex-col gap-space-sm hover:border-primary-container cursor-pointer transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-title-sm text-on-surface">{stockName}</h3>
          <span className="text-caption text-on-surface-variant">{stockCode}</span>
        </div>
        <span className="text-label-caps border border-[#30363d] text-on-surface-variant px-2 py-0.5 rounded">
          {market}
        </span>
      </div>
      <div className="mt-space-sm flex justify-between items-end">
        <div className="text-headline-md text-on-surface">{currentPrice}</div>
        <div className="flex flex-col items-end">
          <span className={`text-body-data flex items-center gap-0.5 ${isPositive ? 'text-secondary' : 'text-error'}`}>
            <span className="material-symbols-outlined text-[14px]">
              {isPositive ? 'arrow_upward' : 'arrow_downward'}
            </span>
            {priceChangeRate}
          </span>
          <span className="text-caption text-on-surface-variant">{priceChange}</span>
        </div>
      </div>
    </div>
  )
}

export default StockCard