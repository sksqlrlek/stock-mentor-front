import { useState } from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface ChartData {
  date: string
  openPrice: string
  highPrice: string
  lowPrice: string
  closePrice: string
  volume: string
}

interface CandleData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  isPositive: boolean
  candleBody: [number, number]
}

interface StockChartProps {
  data: ChartData[]
  onPeriodChange: (period: string) => void
}

const PERIODS = [
  { label: '1개월', value: 'M1' },
  { label: '3개월', value: 'M3' },
  { label: '6개월', value: 'M6' },
  { label: '1년', value: 'Y1' },
  { label: '3년', value: 'Y3' },
]

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: CandleData }> }) => {
  if (!active || !payload || !payload.length) return null
  const d = payload[0].payload

  return (
    <div className="bg-surface-container border border-[#30363d] rounded-lg p-3 text-caption shadow-lg">
      <p className="text-on-surface-variant mb-2">{d.date}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <span className="text-on-surface-variant">시가</span>
        <span className="text-on-surface">{d.open.toLocaleString()}</span>
        <span className="text-on-surface-variant">고가</span>
        <span className="text-secondary">{d.high.toLocaleString()}</span>
        <span className="text-on-surface-variant">저가</span>
        <span className="text-error">{d.low.toLocaleString()}</span>
        <span className="text-on-surface-variant">종가</span>
        <span className="text-on-surface">{d.close.toLocaleString()}</span>
      </div>
    </div>
  )
}

function StockChart({ data, onPeriodChange }: StockChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('M1')

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    onPeriodChange(period)
  }

  const candleData: CandleData[] = data.map((item) => {
    const open = parseFloat(item.openPrice)
    const close = parseFloat(item.closePrice)
    const high = parseFloat(item.highPrice)
    const low = parseFloat(item.lowPrice)
    const isPositive = close >= open

    return {
      date: item.date,
      open,
      high,
      low,
      close,
      volume: parseFloat(item.volume),
      isPositive,
      candleBody: [Math.min(open, close), Math.max(open, close)],
    }
  })

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-space-md">
      <div className="flex items-center justify-between mb-space-md">
        <span className="text-body-data text-on-surface">주가 차트</span>
        <div className="flex gap-1">
          {PERIODS.map((period) => (
            <button
              key={period.value}
              onClick={() => handlePeriodChange(period.value)}
              className={`px-3 py-1.5 rounded text-label-caps transition-colors ${
                selectedPeriod === period.value
                  ? 'bg-surface-container-highest text-on-background border border-outline-variant'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={candleData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#8b949e', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: '#8b949e', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(v) => v.toLocaleString()}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="candleBody" radius={[2, 2, 2, 2]}>
            {candleData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.isPositive ? '#3fb950' : '#f85149'}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StockChart