import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosInstance from '../../api/axiosInstance'
import RiskTypeSelector from './RiskTypeSelector'

type RiskType = 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE'

interface RiskTypeModalProps {
  onClose: () => void
}

function RiskTypeModal({ onClose }: RiskTypeModalProps) {
  const { user, login } = useAuth()
  const [selected, setSelected] = useState<RiskType | null>(null)
  const [error, setError] = useState<string>('')

  const handleSubmit = async () => {
    if (!selected) {
      setError('투자 성향을 선택해주세요.')
      return
    }
    try {
      await axiosInstance.put('/api/users/me/risk-type', { riskType: selected })
      if (user) {
        login(localStorage.getItem('accessToken')!, { ...user, riskType: selected })
      }
      onClose()
    } catch {
      setError('오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-space-md">
      <div className="w-full max-w-2xl bg-surface-container rounded-xl border border-surface-variant p-space-lg shadow-lg flex flex-col gap-space-lg">

        <div className="text-center">
          <h1 className="text-headline-md text-on-surface mb-2">투자 성향 설정</h1>
          <p className="text-body-data text-on-surface-variant">나의 투자 스타일에 맞는 성향을 선택해주세요.</p>
          <p className="text-caption text-outline mt-1">선택한 성향에 따라 AI 분석 내용이 달라집니다.</p>
        </div>

        <RiskTypeSelector selected={selected} onChange={setSelected} />

        {error && (
          <p className="text-error text-caption text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-primary-container text-on-primary-container text-title-sm rounded py-space-sm flex justify-center items-center gap-space-xs hover:bg-inverse-primary transition-colors"
        >
          시작하기
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

      </div>
    </div>
  )
}

export default RiskTypeModal