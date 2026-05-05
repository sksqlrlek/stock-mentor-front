import SearchBar from '../components/stock/SearchBar'
import StockCard from '../components/stock/StockCard'

const POPULAR_STOCKS = [
  { stockCode: '005930', stockName: '삼성전자', market: 'KOSPI', currentPrice: '73,200', priceChange: '+900', priceChangeRate: '+1.24%' },
  { stockCode: '000660', stockName: 'SK하이닉스', market: 'KOSPI', currentPrice: '158,400', priceChange: '+4,000', priceChangeRate: '+2.59%' },
  { stockCode: '035420', stockName: 'NAVER', market: 'KOSPI', currentPrice: '192,500', priceChange: '-1,500', priceChangeRate: '-0.77%' },
  { stockCode: '005380', stockName: '현대차', market: 'KOSPI', currentPrice: '245,000', priceChange: '0', priceChangeRate: '0.00%' },
]

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-space-xl">

      <div className="w-full flex flex-col items-center text-center gap-space-lg mt-space-lg">
        <h1 className="text-display-lg text-on-surface">시장 분석의 새로운 기준</h1>
        <p className="text-body-main text-on-surface-variant max-w-2xl">
          초보 투자자를 위한 전문가 수준의 데이터. 복잡함 없이 명확한 인사이트로 현명한 투자를 시작하세요.
        </p>
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-end mb-space-md">
          <h2 className="text-headline-md text-on-surface">인기 종목</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {POPULAR_STOCKS.map((stock) => (
            <StockCard key={stock.stockCode} {...stock} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage