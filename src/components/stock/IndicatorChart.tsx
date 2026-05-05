import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface ChartData {
  date: string
  openPrice: string
  highPrice: string
  lowPrice: string
  closePrice: string
  volume: string
}

interface IndicatorData {
  date: string
  close: number
  ma5?: number
  ma20?: number
  ma60?: number
  rsi?: number
  macd?: number
  signal?: number
  upperBand?: number
  middleBand?: number
  lowerBand?: number
}

interface IndicatorChartProps {
  data: ChartData[]
}

type IndicatorType = 'MA' | 'RSI' | 'MACD' | 'BB'

const INDICATORS: { label: string; value: IndicatorType }[] = [
  { label: '이동평균선', value: 'MA' },
  { label: 'RSI', value: 'RSI' },
  { label: 'MACD', value: 'MACD' },
  { label: '볼린저 밴드', value: 'BB' },
]

function calculateMA(data: number[], period: number): (number | undefined)[] {
  return data.map((_, i) => {
    if (i < period - 1) return undefined
    const slice = data.slice(i - period + 1, i + 1)
    return slice.reduce((a, b) => a + b, 0) / period
  })
}

function calculateRSI(data: number[], period: number = 14): (number | undefined)[] {
  return data.map((_, i) => {
    if (i < period) return undefined
    const changes = data.slice(i - period + 1, i + 1).map((v, j, arr) => j === 0 ? 0 : v - arr[j - 1])
    const gains = changes.filter(c => c > 0).reduce((a, b) => a + b, 0) / period
    const losses = Math.abs(changes.filter(c => c < 0).reduce((a, b) => a + b, 0)) / period
    if (losses === 0) return 100
    const rs = gains / losses
    return 100 - (100 / (1 + rs))
  })
}

function IndicatorChart({ data }: IndicatorChartProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('MA')

  const closes = data.map(d => parseFloat(d.closePrice))
  const ma5 = calculateMA(closes, 5)
  const ma20 = calculateMA(closes, 20)
  const ma60 = calculateMA(closes, 60)
  const rsi = calculateRSI(closes)

  const indicatorData: IndicatorData[] = data.map((d, i) => ({
    date: d.date,
    close: parseFloat(d.closePrice),
    ma5: ma5[i],
    ma20: ma20[i],
    ma60: ma60[i],
    rsi: rsi[i],
    upperBand: ma20[i] ? ma20[i]! * 1.02 : undefined,
    middleBand: ma20[i],
    lowerBand: ma20[i] ? ma20[i]! * 0.98 : undefined,
  }))

  const renderChart = () => {
    switch (selectedIndicator) {
      case 'MA':
        return (
          <LineChart data={indicatorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => v.toLocaleString()} width={70} />
            <Tooltip contentStyle={{ backgroundColor: '#1c2026', border: '1px solid #30363d', borderRadius: '8px' }} labelStyle={{ color: '#8b949e' }} />
            <Line type="monotone" dataKey="close" stroke="#afc6ff" strokeWidth={1.5} dot={false} name="종가" />
            <Line type="monotone" dataKey="ma5" stroke="#f0a500" strokeWidth={1.5} dot={false} name="MA5" connectNulls />
            <Line type="monotone" dataKey="ma20" stroke="#3fb950" strokeWidth={1.5} dot={false} name="MA20" connectNulls />
            <Line type="monotone" dataKey="ma60" stroke="#f85149" strokeWidth={1.5} dot={false} name="MA60" connectNulls />
          </LineChart>
        )

      case 'RSI':
        return (
          <LineChart data={indicatorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 100]} width={40} />
            <Tooltip contentStyle={{ backgroundColor: '#1c2026', border: '1px solid #30363d', borderRadius: '8px' }} labelStyle={{ color: '#8b949e' }} />
            <ReferenceLine y={70} stroke="#f85149" strokeDasharray="4 4" label={{ value: '과매수(70)', fill: '#f85149', fontSize: 10 }} />
            <ReferenceLine y={30} stroke="#3fb950" strokeDasharray="4 4" label={{ value: '과매도(30)', fill: '#3fb950', fontSize: 10 }} />
            <Line type="monotone" dataKey="rsi" stroke="#afc6ff" strokeWidth={1.5} dot={false} name="RSI" connectNulls />
          </LineChart>
        )

      case 'BB':
        return (
          <LineChart data={indicatorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => v.toLocaleString()} width={70} />
            <Tooltip contentStyle={{ backgroundColor: '#1c2026', border: '1px solid #30363d', borderRadius: '8px' }} labelStyle={{ color: '#8b949e' }} />
            <Line type="monotone" dataKey="upperBand" stroke="#f85149" strokeWidth={1} strokeDasharray="4 4" dot={false} name="상단" connectNulls />
            <Line type="monotone" dataKey="middleBand" stroke="#afc6ff" strokeWidth={1.5} dot={false} name="중간" connectNulls />
            <Line type="monotone" dataKey="lowerBand" stroke="#3fb950" strokeWidth={1} strokeDasharray="4 4" dot={false} name="하단" connectNulls />
            <Line type="monotone" dataKey="close" stroke="#c2c6d6" strokeWidth={1} dot={false} name="종가" />
          </LineChart>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="px-space-md pt-space-md pb-space-sm border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary-container text-[18px]">analytics</span>
          <span className="text-title-sm text-on-surface">기술적 지표</span>
        </div>
        <p className="text-caption text-on-surface-variant">보조 지표로 매매 시점을 분석하세요</p>
      </div>

      <div className="flex gap-1 px-space-md py-space-sm border-b border-[#30363d]">
        {INDICATORS.map((ind) => (
          <button
            key={ind.value}
            onClick={() => setSelectedIndicator(ind.value)}
            className={`px-3 py-1.5 rounded text-caption transition-colors ${
              selectedIndicator === ind.value
                ? 'bg-primary-container text-white'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {ind.label}
          </button>
        ))}
      </div>

      <div className="p-space-md">
        <ResponsiveContainer width="100%" height={250}>
          {renderChart() ?? <LineChart data={[]} />}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default IndicatorChart