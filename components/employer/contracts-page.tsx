'use client'

import { useState } from 'react'
import { FileText, ChevronRight, ChevronLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Contract {
  id: string
  type: string
  serviceType: string
  caregiverName: string
  status: 'pending_sign' | 'signed' | 'expired'
  signDeadline: string
  createdAt: string
  signatories: Array<{ name: string; role: 'customer' | 'caregiver' | 'company'; status: 'pending' | 'signed' }>
}

const statusConfig = {
  pending_sign: { label: '待签署', color: 'bg-orange-100 text-orange-700', icon: '⏳' },
  signed: { label: '已签署', color: 'bg-green-100 text-green-700', icon: '✓' },
  expired: { label: '已过期', color: 'bg-gray-100 text-gray-700', icon: '✗' },
}

interface ContractsPageProps {
  onBack?: () => void
  onContractClick?: (contractId: string) => void
}

export function ContractsPage({ onBack, onContractClick }: ContractsPageProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | Contract['status']>('all')

  // Mock 合同数据
  const mockContracts: Contract[] = [
    {
      id: 'CT2026033101',
      type: '月嫂服务合同',
      serviceType: '月嫂服务',
      caregiverName: '李春华',
      status: 'pending_sign',
      signDeadline: '2026-03-30',
      createdAt: '2026-03-29',
      signatories: [
        { name: '王女士', role: 'customer', status: 'pending' },
        { name: '李春华', role: 'caregiver', status: 'pending' },
        { name: '优厚家庭服务', role: 'company', status: 'signed' },
      ],
    },
    {
      id: 'CT2026033102',
      type: '产后修复服务合同',
      serviceType: '产后修复',
      caregiverName: '王阿姨',
      status: 'signed',
      signDeadline: '2026-03-28',
      createdAt: '2026-03-27',
      signatories: [
        { name: '张先生', role: 'customer', status: 'signed' },
        { name: '王阿姨', role: 'caregiver', status: 'signed' },
        { name: '优厚家庭服务', role: 'company', status: 'signed' },
      ],
    },
    {
      id: 'CT2026033103',
      type: '育婴师服务合同',
      serviceType: '育婴师',
      caregiverName: '张静',
      status: 'signed',
      signDeadline: '2026-03-25',
      createdAt: '2026-03-24',
      signatories: [
        { name: '刘女士', role: 'customer', status: 'signed' },
        { name: '张静', role: 'caregiver', status: 'signed' },
        { name: '优厚家庭服务', role: 'company', status: 'signed' },
      ],
    },
  ]

  // 筛选合同
  const filteredContracts = mockContracts.filter(
    contract => filterStatus === 'all' || contract.status === filterStatus
  )

  const statusTabs: Array<{ id: 'all' | Contract['status']; label: string }> = [
    { id: 'all', label: '全部' },
    { id: 'pending_sign', label: '待签署' },
    { id: 'signed', label: '已签署' },
    { id: 'expired', label: '已过期' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border pt-3 pb-3">
        <div className="px-3">
          <div className="flex items-center gap-2 mb-3">
            {onBack && (
              <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-bold text-base">我的合同</h1>
          </div>

          {/* 状态筛选 Tab */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3">
            {statusTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                  filterStatus === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 合同列表 */}
      <div className="px-3 py-4 space-y-3">
        {filteredContracts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-2">暂无合同</p>
            <p className="text-xs text-muted-foreground">确认预约后系统会自动生成合同</p>
          </div>
        ) : (
          filteredContracts.map((contract) => {
            const config = statusConfig[contract.status]
            const signedCount = contract.signatories.filter(s => s.status === 'signed').length

            return (
              <Card
                key={contract.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => onContractClick?.(contract.id)}
              >
                <CardContent className="p-3">
                  {/* 顶部：合同类型 + 状态 */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{contract.type}</p>
                        <p className="text-xs text-muted-foreground">{contract.id}</p>
                      </div>
                    </div>
                    <Badge className={cn('text-[10px] px-2 py-0.5 shrink-0', config.color)}>
                      {config.label}
                    </Badge>
                  </div>

                  {/* 中部：服务人员 + 日期 */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">服务人员</p>
                      <p className="text-sm font-medium">{contract.caregiverName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">签署进度</p>
                      <p className="text-sm font-medium">{signedCount}/{contract.signatories.length}</p>
                    </div>
                  </div>

                  {/* 底部：截止日期 + 操作 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">截止日期</p>
                      <p className="text-xs font-medium text-foreground">{contract.signDeadline}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
