import { useState } from 'react'
import { ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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
        <span className="text-on-surface font-mono">{d.open.toLocaleString()}</span>
        <span className="text-on-surface-variant">고가</span>
        <span className="text-secondary font-mono">{d.high.toLocaleString()}</span>
        <span className="text-on-surface-variant">저가</span>
        <span className="text-[#f85149] font-mono">{d.low.toLocaleString()}</span>
        <span className="text-on-surface-variant">종가</span>
        <span className="text-on-surface font-mono">{d.close.toLocaleString()}</span>
      </div>
    </div>
  )
}

const CandleStick = (props: {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: CandleData
  yAxis?: { scale: (v: number) => number }
}) => {
  const { x = 0, y = 0, width = 0, payload, yAxis } = props
  if (!payload || !yAxis?.scale) return null

  const { open, high, low, close, isPositive } = payload
  const scale = yAxis.scale

  const highY = scale(high)
  const lowY = scale(low)
  const openY = scale(open)
  const closeY = scale(close)

  const bodyTop = Math.min(openY, closeY)
  const bodyHeight = Math.max(Math.abs(closeY - openY), 2)
  const centerX = x + width / 2
  const color = isPositive ? '#3fb950' : '#f85149'

  return (
    <g>
      <line x1={centerX} y1={highY} x2={centerX} y2={bodyTop} stroke={color} strokeWidth={1.5} />
      <line x1={centerX} y1={bodyTop + bodyHeight} x2={centerX} y2={lowY} stroke={color} strokeWidth={1.5} />
      <rect
        x={x + width * 0.1}
        y={bodyTop}
        width={width * 0.8}
        height={bodyHeight}
        fill={color}
        rx={1}
      />
    </g>
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
    return {
      date: item.date,
      open,
      high: parseFloat(item.highPrice),
      low: parseFloat(item.lowPrice),
      close,
      volume: parseFloat(item.volume),
      isPositive: close >= open,
    }
  })

  const minPrice = Math.min(...candleData.map(d => d.low)) * 0.999
  const maxPrice = Math.max(...candleData.map(d => d.high)) * 1.001

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
            domain={[minPrice, maxPrice]}
            tickFormatter={(v) => v.toLocaleString()}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          {candleData.map((entry, index) => (
            <CandleStick
              key={index}
              payload={entry}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StockChart