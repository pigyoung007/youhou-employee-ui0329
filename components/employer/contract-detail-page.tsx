'use client'

import { useState } from 'react'
import { ChevronLeft, FileText, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContractDetailPageProps {
  contractId: string
  onBack: () => void
}

const statusConfig = {
  pending_sign: { label: '待签署', color: 'bg-orange-100 text-orange-700' },
  signed: { label: '已签署', color: 'bg-green-100 text-green-700' },
  expired: { label: '已过期', color: 'bg-gray-100 text-gray-700' },
}

export function ContractDetailPage({ contractId, onBack }: ContractDetailPageProps) {
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false)
  const [signStatus, setSignStatus] = useState<'ready' | 'signing' | 'success'>('ready')

  const contract = {
    id: contractId,
    type: '月嫂服务合同',
    serviceType: '月嫂服务',
    caregiverName: '李春华',
    caregiverLevel: '金牌月嫂',
    customerName: '王女士',
    status: 'pending_sign' as const,
    amount: 15800,
    startDate: '2026-04-01',
    endDate: '2026-04-26',
    serviceDays: 26,
    createdAt: '2026-03-29',
    signDeadline: '2026-03-30',
    signatories: [
      { name: '王女士', role: '客户' as const, status: 'pending' as const },
      { name: '李春华', role: '服务人员' as const, status: 'pending' as const },
      { name: '优厚家庭服务', role: '公司' as const, status: 'signed' as const },
    ],
  }

  const config = statusConfig[contract.status]

  const handleSign = async () => {
    setSignStatus('signing')
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSignStatus('success')
    setTimeout(() => {
      setIsSigningModalOpen(false)
      setSignStatus('ready')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-base flex-1">合同详情</h1>
        </div>
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-muted-foreground">{contract.id}</p>
          <Badge className={cn('text-[10px] px-2 py-0.5', config.color)}>
            {config.label}
          </Badge>
        </div>
      </div>

      {/* 内容 */}
      <div className="px-3 py-4 space-y-3">
        {/* 合同基本信息 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">合同类型</p>
              <p className="font-semibold text-sm">{contract.type}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">客户</p>
                <p className="text-sm font-medium">{contract.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">服务人员</p>
                <p className="text-sm font-medium">{contract.caregiverName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 服务信息 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs font-semibold text-foreground mb-3">服务信息</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">服务类型</span>
              <span className="font-medium">{contract.serviceType}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">服务日期</span>
              <span className="font-medium">{contract.startDate} 至 {contract.endDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">服务天数</span>
              <span className="font-medium">{contract.serviceDays} 天</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
              <span className="font-semibold">合同金额</span>
              <span className="font-bold text-primary">¥{contract.amount}</span>
            </div>
          </CardContent>
        </Card>

        {/* 签署进度 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-foreground mb-3">签署进度</p>
            <div className="space-y-2">
              {contract.signatories.map((sig, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-white text-xs',
                    sig.status === 'signed' ? 'bg-green-500' : 'bg-muted'
                  )}>
                    {sig.status === 'signed' ? <Check className="w-3 h-3" /> : '○'}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{sig.name}</p>
                    <p className="text-[10px] text-muted-foreground">{sig.role}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {sig.status === 'signed' ? '已签署' : '待签署'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 合同预览 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">查看完整合同</span>
              </div>
              <span className="text-xs text-muted-foreground">PDF</span>
            </button>
          </CardContent>
        </Card>

        {/* 签署按钮 */}
        {contract.status === 'pending_sign' && (
          <Button
            onClick={() => setIsSigningModalOpen(true)}
            className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
          >
            电子签署合同
          </Button>
        )}
      </div>

      {/* 签署模态框 */}
      {isSigningModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6">
              {signStatus === 'success' ? (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-base mb-2">签署成功</h3>
                  <p className="text-xs text-muted-foreground">合同已成功签署，所有方已收到通知</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-base mb-2">电子签署</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    您即将签署 {contract.type}，点击下方按钮完成签署
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsSigningModalOpen(false)}
                      disabled={signStatus === 'signing'}
                      className="flex-1"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleSign}
                      disabled={signStatus === 'signing'}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {signStatus === 'signing' ? '签署中...' : '确认签署'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
