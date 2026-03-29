'use client'

import { useState } from 'react'
import { ChevronLeft, AlertCircle, CheckCircle, XCircle, Clock, Edit2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface OrderAdjustPageProps {
  orderId?: string
  onBack?: () => void
}

interface AdjustmentRequest {
  id: string
  orderId: string
  type: 'product' | 'price' | 'period' | 'personnel'
  status: 'pending' | 'approved' | 'rejected'
  changes: {
    before: any
    after: any
  }
  reason: string
  requestedAt: string
  reviewedAt?: string
  reviewer?: string
  comments?: string
}

export function OrderAdjustPage({ orderId = 'ORD-2024-001', onBack }: OrderAdjustPageProps) {
  const [adjustments, setAdjustments] = useState<AdjustmentRequest[]>([
    {
      id: 'ADJ-001',
      orderId,
      type: 'product',
      status: 'pending',
      changes: {
        before: { name: '月嫂服务', days: 28, price: 16800 },
        after: { name: '月嫂服务', days: 42, price: 25200 },
      },
      reason: '客户需要延长服务期，从28天改为42天',
      requestedAt: '2026-03-27 14:30',
    },
    {
      id: 'ADJ-002',
      orderId,
      type: 'price',
      status: 'approved',
      changes: {
        before: { totalPrice: 16800, discount: 0 },
        after: { totalPrice: 15800, discount: 1000 },
      },
      reason: '客户介绍新客户，获得推荐返佣',
      requestedAt: '2026-03-26 10:15',
      reviewedAt: '2026-03-26 16:45',
      reviewer: '王主管',
    },
  ])

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showNewAdjustment, setShowNewAdjustment] = useState(false)
  const [newAdjustmentType, setNewAdjustmentType] = useState<'product' | 'price' | 'period' | 'personnel'>('product')
  const [newReason, setNewReason] = useState('')

  const adjustmentTypeMap = {
    product: { label: '产品变更', icon: '📦', color: 'bg-blue-500' },
    price: { label: '价格调整', icon: '💰', color: 'bg-amber-500' },
    period: { label: '周期调整', icon: '📅', color: 'bg-teal-500' },
    personnel: { label: '人员变更', icon: '👤', color: 'bg-pink-500' },
  }

  const statusMap = {
    pending: { label: '待审批', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    approved: { label: '已通过', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    rejected: { label: '已驳回', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
  }

  const handleSubmitAdjustment = () => {
    if (!newReason.trim()) return

    const newAdj: AdjustmentRequest = {
      id: `ADJ-${String(adjustments.length + 1).padStart(3, '0')}`,
      orderId,
      type: newAdjustmentType,
      status: 'pending',
      changes: { before: {}, after: {} },
      reason: newReason,
      requestedAt: new Date().toLocaleString('zh-CN'),
    }

    setAdjustments([newAdj, ...adjustments])
    setNewReason('')
    setShowNewAdjustment(false)
  }

  const pendingCount = adjustments.filter(a => a.status === 'pending').length
  const approvedCount = adjustments.filter(a => a.status === 'approved').length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 safe-area-top">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-base">订单调整审批</h1>
              <p className="text-xs text-muted-foreground">{orderId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-3 py-3 bg-gradient-to-r from-pink-50 to-rose-50 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-pink-600">{adjustments.length}</p>
          <p className="text-xs text-muted-foreground">总调整申请</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-muted-foreground">待审批</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          <p className="text-xs text-muted-foreground">已通过</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-4 space-y-3">
        {/* New Adjustment Button */}
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setShowNewAdjustment(!showNewAdjustment)}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          发起新的调整申请
        </Button>

        {/* New Adjustment Form */}
        {showNewAdjustment && (
          <Card className="border-pink-200 bg-pink-50/50">
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">调整类型</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(adjustmentTypeMap).map(([key, { label }]) => (
                    <button
                      key={key}
                      onClick={() => setNewAdjustmentType(key as any)}
                      className={cn(
                        "p-2 rounded-lg text-sm font-medium transition-colors",
                        newAdjustmentType === key
                          ? "bg-primary text-primary-foreground"
                          : "bg-white text-foreground border border-border hover:bg-muted"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">调整原因</p>
                <textarea
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="请说明此次调整的原因和具体内容..."
                  className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setShowNewAdjustment(false)
                    setNewReason('')
                  }}
                >
                  取消
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSubmitAdjustment}
                  disabled={!newReason.trim()}
                >
                  提交申请
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Adjustments List */}
        <div className="space-y-2">
          {adjustments.map((adjustment) => {
            const typeInfo = adjustmentTypeMap[adjustment.type]
            const statusInfo = statusMap[adjustment.status]
            const StatusIcon = statusInfo.icon
            const isExpanded = expandedId === adjustment.id

            return (
              <Card
                key={adjustment.id}
                className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden border-l-4"
                style={{
                  borderLeftColor: adjustment.status === 'pending' ? '#f59e0b' : 
                                   adjustment.status === 'approved' ? '#10b981' : '#ef4444'
                }}
              >
                <CardContent
                  className="p-3"
                  onClick={() => setExpandedId(isExpanded ? null : adjustment.id)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className={`${typeInfo.color} text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0`}>
                      {typeInfo.label.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{typeInfo.label}</h3>
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                          statusInfo.bgColor
                        )}>
                          <StatusIcon className={cn("w-3 h-3", statusInfo.color)} />
                          <span className={statusInfo.color}>{statusInfo.label}</span>
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{adjustment.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">{adjustment.requestedAt}</p>
                    </div>

                    <div className="text-muted-foreground flex-shrink-0">
                      {isExpanded ? '▼' : '▶'}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-3">
                      {/* Changes Preview */}
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                        <p className="text-sm font-semibold">变更内容</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-muted-foreground mb-1">原值</p>
                            <div className="bg-white p-2 rounded border border-border font-mono">
                              {JSON.stringify(adjustment.changes.before, null, 2).split('\n').slice(0, 3).join('\n')}
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">新值</p>
                            <div className="bg-white p-2 rounded border border-border font-mono">
                              {JSON.stringify(adjustment.changes.after, null, 2).split('\n').slice(0, 3).join('\n')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Review Info */}
                      {adjustment.status !== 'pending' && adjustment.reviewedAt && (
                        <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                          <p className="text-xs font-semibold">审批信息</p>
                          <p className="text-xs text-muted-foreground">审批人: {adjustment.reviewer}</p>
                          <p className="text-xs text-muted-foreground">时间: {adjustment.reviewedAt}</p>
                          {adjustment.comments && (
                            <p className="text-xs mt-2 p-2 bg-white rounded border border-border">{adjustment.comments}</p>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      {adjustment.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            className="flex-1 h-9 text-xs bg-transparent"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            驳回
                          </Button>
                          <Button
                            className="flex-1 h-9 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            通过
                          </Button>
                        </div>
                      )}

                      {/* View Comparison */}
                      <Button
                        variant="outline"
                        className="w-full h-9 text-xs bg-transparent"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        查看完整对比
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
