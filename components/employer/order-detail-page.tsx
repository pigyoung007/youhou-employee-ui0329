'use client'

import { useState } from 'react'
import { ChevronLeft, Calendar, Users, CreditCard, FileText, Star, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OrderDetailPageProps {
  orderId: string
  onBack: () => void
}

const statusConfig = {
  pending_pay: { label: '待支付', color: 'bg-orange-100 text-orange-700' },
  paid: { label: '已支付', color: 'bg-blue-100 text-blue-700' },
  in_service: { label: '服务中', color: 'bg-green-100 text-green-700' },
  completed: { label: '已完成', color: 'bg-gray-100 text-gray-700' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-700' },
}

export function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  // Mock 订单详情数据
  const order = {
    id: orderId,
    serviceType: '月嫂服务',
    caregiverName: '李春华',
    caregiverLevel: '金牌月嫂',
    caregiverPhone: '138****5432',
    startDate: '2026-04-01',
    endDate: '2026-04-26',
    serviceDays: 26,
    totalAmount: 15800,
    status: 'pending_pay' as const,
    createdAt: '2026-03-29',
    contractId: 'CT2026033101',
    payments: [
      {
        id: 'PAY001',
        amount: 7900,
        dueDate: '2026-03-30',
        status: 'pending' as const,
        method: '微信支付',
      },
      {
        id: 'PAY002',
        amount: 7900,
        dueDate: '2026-04-15',
        status: 'unpaid' as const,
        method: '微信支付',
      },
    ],
  }

  const config = statusConfig[order.status]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-base flex-1">订单详情</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{order.id}</p>
          <Badge className={cn('text-[10px] px-2 py-0.5', config.color)}>
            {config.label}
          </Badge>
        </div>
      </div>

      {/* 内容 */}
      <div className="px-3 py-4 space-y-3">
        {/* 服务人员卡片 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white text-lg">
                👩
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">{order.caregiverName}</h3>
                <p className="text-xs text-primary font-medium">{order.caregiverLevel}</p>
                <p className="text-xs text-muted-foreground mt-1">{order.caregiverPhone}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full h-9 text-xs">
              联系服务人员
            </Button>
          </CardContent>
        </Card>

        {/* 服务信息卡片 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">👶</span>
              <h3 className="font-semibold text-sm">{order.serviceType}</h3>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">服务日期</span>
                <span className="ml-auto font-medium">{order.startDate} 至 {order.endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">服务时长</span>
                <span className="ml-auto font-medium">{order.serviceDays} 天</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 支付明细 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              支付明细
            </h3>
            
            <div className="space-y-2">
              {order.payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs font-medium">
                      {payment.status === 'pending' ? '待支付' : '未支付'} - ¥{payment.amount}
                    </p>
                    <p className="text-[10px] text-muted-foreground">截止: {payment.dueDate}</p>
                  </div>
                  {payment.status === 'pending' && (
                    <Button size="sm" className="h-7 text-xs px-2 bg-primary hover:bg-primary/90">
                      支付
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-sm font-semibold">合计</span>
              <span className="text-lg font-bold text-primary">¥{order.totalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {/* 合同信息 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <button className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">查看合同</span>
              </div>
              <span className="text-xs text-muted-foreground">{order.contractId}</span>
            </button>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        {order.status === 'pending_pay' && (
          <div className="space-y-2">
            <Button className="w-full h-10 bg-primary hover:bg-primary/90">
              立即支付
            </Button>
          </div>
        )}

        {order.status === 'completed' && (
          <div className="space-y-2">
            <Button className="w-full h-10 bg-primary hover:bg-primary/90 gap-2">
              <Star className="w-4 h-4" />
              评价服务
            </Button>
            <Button variant="outline" className="w-full h-10 gap-2">
              <AlertCircle className="w-4 h-4" />
              提交投诉
            </Button>
          </div>
        )}
      </div>

      {/* 底部安全距离 */}
      <div className="h-4" />
    </div>
  )
}
