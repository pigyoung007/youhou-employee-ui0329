'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Signature, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DischargeNotice {
  id: string
  contractId: string
  customerName: string
  contractType: string
  serviceEndDate: string
  totalDays: number
  status: 'pending_sign' | 'signed' | 'completed'
  createdAt: string
  signedAt?: string
}

const statusConfig: Record<DischargeNotice['status'], { label: string; color: string; icon: any }> = {
  pending_sign: { label: '待签署', color: 'bg-yellow-50 text-yellow-600', icon: AlertCircle },
  signed: { label: '已签署', color: 'bg-blue-50 text-blue-600', icon: Signature },
  completed: { label: '已完成', color: 'bg-green-50 text-green-600', icon: CheckCircle2 },
}

export function TalentDischargeNoticePage({ onBack }: { onBack?: () => void }) {
  const [selectedNotice, setSelectedNotice] = useState<DischargeNotice | null>(null)

  const notices: DischargeNotice[] = [
    {
      id: 'DN20260327001',
      contractId: 'CT20260327001',
      customerName: '王女士',
      contractType: '月嫂服务合同',
      serviceEndDate: '2026-04-26',
      totalDays: 26,
      status: 'pending_sign',
      createdAt: '2026-04-26',
    },
    {
      id: 'DN20260320002',
      contractId: 'CT20260320002',
      customerName: '李先生',
      contractType: '育婴师合同',
      serviceEndDate: '2026-06-15',
      totalDays: 92,
      status: 'signed',
      createdAt: '2026-06-15',
      signedAt: '2026-06-16',
    },
  ]

  if (selectedNotice) {
    const config = statusConfig[selectedNotice.status]
    const Icon = config.icon

    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSelectedNotice(null)}
            className="flex items-center gap-1 text-primary hover:opacity-80"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回</span>
          </button>
        </div>

        <div className="p-4 space-y-4 pb-20">
          {/* Status Card */}
          <Card className={cn('border-0', config.color)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">{config.label}</p>
                  <p className="text-xs opacity-75">{selectedNotice.createdAt} 生成</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="text-sm font-semibold">服务信息</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">合同类型</span>
                  <span className="font-medium">{selectedNotice.contractType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">雇主</span>
                  <span className="font-medium">{selectedNotice.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">服务天数</span>
                  <span className="font-medium">{selectedNotice.totalDays}天</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">服务结束日期</span>
                  <span className="font-medium">{selectedNotice.serviceEndDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discharge Details */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="text-sm font-semibold">下户确认信息</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-muted-foreground">下户时间</label>
                  <p className="font-medium mt-1">{selectedNotice.serviceEndDate} 08:00</p>
                </div>
                <div>
                  <label className="text-muted-foreground">下户物品清点</label>
                  <p className="font-medium mt-1">✓ 已完成</p>
                </div>
                <div>
                  <label className="text-muted-foreground">家务卫生交接</label>
                  <p className="font-medium mt-1">✓ 已完成</p>
                </div>
                <div>
                  <label className="text-muted-foreground">客户确认签字</label>
                  <p className="font-medium mt-1">
                    {selectedNotice.status === 'pending_sign' ? '待签署' : '已签署'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {selectedNotice.status === 'pending_sign' && (
            <Button className="w-full h-10 bg-primary hover:bg-primary/90">
              <Signature className="w-4 h-4 mr-2" />
              请雇主签署下户单
            </Button>
          )}

          <Button variant="outline" className="w-full h-10">
            <Download className="w-4 h-4 mr-2" />
            下载下户单
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="text-foreground hover:opacity-80">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-base font-semibold">下户通知单</h1>
      </div>

      <div className="p-3">
        {notices.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">暂无下户单</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notices.map(notice => {
              const config = statusConfig[notice.status]
              const Icon = config.icon

              return (
                <Card
                  key={notice.id}
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedNotice(notice)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', config.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">{notice.contractType}</h3>
                            <p className="text-xs text-muted-foreground">{notice.customerName}</p>
                          </div>
                          <Badge className={cn('text-[9px] shrink-0', config.color)}>
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-2 text-muted-foreground">
                          <span>{notice.totalDays}天服务</span>
                          <span>{notice.serviceEndDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
