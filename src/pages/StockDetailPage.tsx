import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import StockHeader from '../components/stock/StockHeader'
import StockInfoGrid from '../components/stock/StockInfoGrid'
import StockChart from '../components/stock/StockChart'
import IndicatorChart from '../components/stock/IndicatorChart'
import NewsCard from '../components/stock/NewsCard'
import CompanySummaryCard from '../components/stock/CompanySummaryCard'
import AiAnalysisCard from '../components/stock/AiAnalysisCard'

interface StockInfo {
  stockCode: string
  stockName: string
  currentPrice: string
  priceChange: string
  priceChangeRate: string
  marketCap: string
  per: string
  pbr: string
  high52Week: string
  low52Week: string
}

interface ChartData {
  date: string
  openPrice: string
  highPrice: string
  lowPrice: string
  closePrice: string
  volume: string
}

function StockDetailPage() {
  const { stockCode } = useParams<{ stockCode: string }>()
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [aiSummary, setAiSummary] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false)
  const [news, setNews] = useState<Array<{
    title: string
    sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
    summary: string
    publishedAt: string
    url: string
  }>>([])
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(false)
  const [isAiAnalysisLoading, setIsAiAnalysisLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!stockCode) return
    setStockInfo({
      stockCode: '005930',
      stockName: '삼성전자',
      currentPrice: '73,400',
      priceChange: '-1,200',
      priceChangeRate: '-1.61%',
      marketCap: '438조 1,823억',
      per: '14.52',
      pbr: '1.38',
      high52Week: '86,000',
      low52Week: '65,800',
    })
    setChartData([
      { date: '04/01', openPrice: '68000', highPrice: '69500', lowPrice: '67500', closePrice: '69000', volume: '12000000' },
      { date: '04/02', openPrice: '69000', highPrice: '70500', lowPrice: '68500', closePrice: '70200', volume: '14000000' },
      { date: '04/03', openPrice: '70200', highPrice: '71000', lowPrice: '69800', closePrice: '70800', volume: '11000000' },
      { date: '04/04', openPrice: '70800', highPrice: '72000', lowPrice: '70500', closePrice: '71500', volume: '13000000' },
      { date: '04/07', openPrice: '71500', highPrice: '72500', lowPrice: '71000', closePrice: '72000', volume: '10000000' },
      { date: '04/08', openPrice: '72000', highPrice: '73000', lowPrice: '71500', closePrice: '72800', volume: '15000000' },
      { date: '04/09', openPrice: '72800', highPrice: '73500', lowPrice: '72000', closePrice: '72300', volume: '9000000' },
      { date: '04/10', openPrice: '72300', highPrice: '73000', lowPrice: '71800', closePrice: '73000', volume: '11000000' },
      { date: '04/11', openPrice: '73000', highPrice: '74000', lowPrice: '72500', closePrice: '73500', volume: '16000000' },
      { date: '04/14', openPrice: '73500', highPrice: '74500', lowPrice: '73000', closePrice: '74000', volume: '13000000' },
      { date: '04/15', openPrice: '74000', highPrice: '74800', lowPrice: '73200', closePrice: '73800', volume: '12000000' },
      { date: '04/16', openPrice: '73800', highPrice: '74200', lowPrice: '72800', closePrice: '73200', volume: '10000000' },
      { date: '04/17', openPrice: '73200', highPrice: '73800', lowPrice: '72500', closePrice: '73600', volume: '11000000' },
      { date: '04/18', openPrice: '73600', highPrice: '74500', lowPrice: '73000', closePrice: '74200', volume: '14000000' },
      { date: '04/21', openPrice: '74200', highPrice: '75000', lowPrice: '73800', closePrice: '74800', volume: '15000000' },
      { date: '04/22', openPrice: '74800', highPrice: '75500', lowPrice: '74000', closePrice: '74500', volume: '12000000' },
      { date: '04/23', openPrice: '74500', highPrice: '75200', lowPrice: '73800', closePrice: '73900', volume: '10000000' },
      { date: '04/24', openPrice: '73900', highPrice: '74500', lowPrice: '73200', closePrice: '74000', volume: '11000000' },
      { date: '04/25', openPrice: '74000', highPrice: '74800', lowPrice: '73500', closePrice: '74500', volume: '13000000' },
      { date: '04/28', openPrice: '74500', highPrice: '75000', lowPrice: '73800', closePrice: '73400', volume: '12000000' },
    ])
    setIsLoading(false)
  }, [stockCode])

  const handlePeriodChange = (period: string) => {
    if (!stockCode) return
    console.log('period changed:', period)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="material-symbols-outlined animate-spin text-primary-container text-[48px]">progress_activity</span>
      </div>
    )
  }

  if (!stockInfo) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-on-surface-variant text-body-main">종목 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
      <div className="lg:col-span-8 flex flex-col gap-space-lg">
        <StockHeader
          stockCode={stockInfo.stockCode}
          stockName={stockInfo.stockName}
          currentPrice={stockInfo.currentPrice}
          priceChange={stockInfo.priceChange}
          priceChangeRate={stockInfo.priceChangeRate}
          isWatchlisted={false}
          onWatchlistToggle={() => console.log('watchlist toggle')}
        />
        <StockChart
          data={chartData}
          onPeriodChange={handlePeriodChange}
        />
        <IndicatorChart data={chartData} />
        <AiAnalysisCard
          strategies={[]}
          riskInfo={null}
          isLoading={isAiAnalysisLoading}
        />
      </div>

      <div className="lg:col-span-4 flex flex-col gap-space-lg">
        <StockInfoGrid
          marketCap={stockInfo.marketCap}
          per={stockInfo.per}
          pbr={stockInfo.pbr}
          high52Week={stockInfo.high52Week}
          low52Week={stockInfo.low52Week}
        />
        <CompanySummaryCard
          stockName={stockInfo.stockName}
          summary={aiSummary}
          isLoading={isAiLoading}
        />
        <NewsCard news={news} isLoading={isNewsLoading} />
      </div>
    </div>
  )
}

export default StockDetailPage