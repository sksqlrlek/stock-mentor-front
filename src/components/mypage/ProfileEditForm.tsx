import { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import RiskTypeSelector from '../common/RiskTypeSelector'

type RiskType = 'AGGRESSIVE' | 'NEUTRAL' | 'CONSERVATIVE'

interface ProfileEditFormProps {
  initialNickname: string
  initialRiskType: RiskType | null
  initialInterestSector: string
}

function ProfileEditForm({ initialNickname, initialRiskType, initialInterestSector }: ProfileEditFormProps) {
  const { user, login } = useAuth()
  const [nickname, setNickname] = useState<string>(initialNickname)
  const [riskType, setRiskType] = useState<RiskType | null>(initialRiskType)
  const [interestSector, setInterestSector] = useState<string>(initialInterestSector)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async () => {
    setError('')
    setSuccess(false)
    setIsLoading(true)
    try {
      await axiosInstance.put('/api/users/me/profile', {
        nickname,
        riskType,
        interestSector,
      })
      if (user) {
        login(localStorage.getItem('accessToken')!, {
          ...user,
          nickname,
          riskType,
          interestSector,
        })
      }
      setSuccess(true)
    } catch {
      setError('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="px-space-md pt-space-md pb-space-sm border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary-container text-[18px]">manage_accounts</span>
          <span className="text-title-sm text-on-surface">기본 정보 설정</span>
        </div>
        <p className="text-caption text-on-surface-variant">닉네임, 관심 섹터, 투자 성향을 수정할 수 있습니다</p>
      </div>

      <div className="p-space-lg flex flex-col gap-space-lg">
        <div>
          <label className="block text-label-caps text-on-surface-variant mb-space-xs" htmlFor="nickname">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
            className="w-full bg-surface-container-low border border-[#30363d] rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors text-body-data"
          />
          <p className="text-caption text-on-surface-variant mt-1">다른 사용자와 중복되지 않는 닉네임을 입력해주세요.</p>
        </div>

        <div>
          <label className="block text-label-caps text-on-surface-variant mb-space-xs" htmlFor="interestSector">
            관심 섹터
          </label>
          <input
            id="interestSector"
            type="text"
            value={interestSector}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestSector(e.target.value)}
            placeholder="예: 반도체, AI, 바이오"
            className="w-full bg-surface-container-low border border-[#30363d] rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors text-body-data placeholder:text-outline"
          />
        </div>

        <div>
          <label className="block text-label-caps text-on-surface-variant mb-space-sm">
            투자 성향
          </label>
          <RiskTypeSelector selected={riskType} onChange={setRiskType} />
        </div>

        {error && <p className="text-caption text-[#f85149]">{error}</p>}
        {success && <p className="text-caption text-secondary">저장되었습니다!</p>}

        <div className="flex justify-end pt-space-sm border-t border-[#30363d]">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary-container text-on-primary-container text-body-data px-6 py-2 rounded-lg hover:bg-inverse-primary transition-colors disabled:opacity-50"
          >
            {isLoading ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditForm