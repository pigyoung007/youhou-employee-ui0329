'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle, Plus, Upload } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ComplaintSubmitPageProps {
  onBack: () => void
}

interface Complaint {
  id: string
  orderId: string
  serviceType: string
  caregiverName: string
  type: string
  description: string
  status: 'pending' | 'processing' | 'resolved' | 'closed'
  createdAt: string
  resolvedAt?: string
  reply?: string
}

const statusConfig = {
  pending: { label: '待处理', color: 'bg-orange-100 text-orange-700', icon: Clock },
  processing: { label: '处理中', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  resolved: { label: '已解决', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  closed: { label: '已关闭', color: 'bg-gray-100 text-gray-700', icon: CheckCircle2 },
}

const mockComplaints: Complaint[] = [
  {
    id: 'CMP001',
    orderId: 'ORD20260325004',
    serviceType: '月嫂服务',
    caregiverName: '陈姐',
    type: '服务质量',
    description: '阿姨月子餐做得比较单一，希望能增加一些花样',
    status: 'resolved',
    createdAt: '2026-02-10',
    resolvedAt: '2026-02-12',
    reply: '感谢您的反馈，我们已与阿姨沟通并提供了更多月子餐食谱培训，后续会有改善。',
  },
  {
    id: 'CMP002',
    orderId: 'ORD20260328002',
    serviceType: '产后修复',
    caregiverName: '张技师',
    type: '迟到',
    description: '技师迟到了30分钟，希望能准时到达',
    status: 'processing',
    createdAt: '2026-03-25',
  },
]

const complaintTypes = [
  '服务态度',
  '服务质量',
  '迟到或缺席',
  '卫生问题',
  '收费问题',
  '其他建议',
]

export function ComplaintSubmitPage({ onBack }: ComplaintSubmitPageProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list')
  const [selectedType, setSelectedType] = useState('')
  const [description, setDescription] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!selectedType || !description) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setActiveTab('list')
      setSelectedType('')
      setDescription('')
      setSelectedOrder('')
    }, 2000)
  }

  const mockOrders = [
    { id: 'ORD20260329001', label: '月嫂服务 - 李春华' },
    { id: 'ORD20260328002', label: '产后修复 - 王阿姨' },
    { id: 'ORD20260327003', label: '育婴师 - 张静' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border pt-3 pb-3">
        <div className="px-3">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-base">投诉建议</h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={cn(
                'px-4 py-1.5 text-xs font-medium rounded-full transition-colors',
                activeTab === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              我的反馈 ({mockComplaints.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={cn(
                'px-4 py-1.5 text-xs font-medium rounded-full transition-colors',
                activeTab === 'new'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Plus className="w-3 h-3 inline mr-0.5" />
              提交投诉
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 py-4">
        {activeTab === 'list' ? (
          <div className="space-y-3">
            {mockComplaints.length === 0 ? (
              <div className="py-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">暂无投诉记录</p>
              </div>
            ) : (
              mockComplaints.map((complaint) => {
                const config = statusConfig[complaint.status]
                const StatusIcon = config.icon
                const isExpanded = expandedId === complaint.id
                return (
                  <Card key={complaint.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <button
                        className="w-full text-left"
                        onClick={() => setExpandedId(isExpanded ? null : complaint.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">{complaint.type}</p>
                              <Badge className={cn('text-[10px] px-1.5 py-0', config.color)}>
                                <StatusIcon className="w-3 h-3 mr-0.5" />
                                {config.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {complaint.serviceType} · {complaint.caregiverName}
                            </p>
                          </div>
                          <ChevronRight className={cn(
                            'w-4 h-4 text-muted-foreground transition-transform',
                            isExpanded && 'rotate-90'
                          )} />
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{complaint.createdAt}</p>
                      </button>

                      {isExpanded && complaint.reply && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs font-medium text-foreground mb-1">处理回复:</p>
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            {complaint.reply}
                          </p>
                          {complaint.resolvedAt && (
                            <p className="text-xs text-muted-foreground mt-2">
                              处理时间: {complaint.resolvedAt}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        ) : isSuccess ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <p className="font-semibold text-lg mb-2">提交成功</p>
            <p className="text-sm text-muted-foreground">我们会尽快处理您的反馈</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 关联订单 */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">关联订单</label>
              <div className="space-y-2">
                {mockOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                    className={cn(
                      'w-full p-3 text-left rounded-lg border transition-colors text-sm',
                      selectedOrder === order.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    )}
                  >
                    <p className="font-medium">{order.label}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 投诉类型 */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">投诉类型</label>
              <div className="flex flex-wrap gap-2">
                {complaintTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
                      selectedType === type
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:bg-muted/50'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 描述 */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">详细描述</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请详细描述您遇到的问题或建议..."
                className="w-full h-32 p-3 text-sm border border-border rounded-lg bg-muted/30 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* 图片上传 */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">上传图片（可选）</label>
              <button className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Upload className="w-5 h-5" />
                <span className="text-[10px]">添加图片</span>
              </button>
            </div>

            <Button
              className="w-full h-10"
              disabled={!selectedType || !description || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? '提交中...' : '提交投诉'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
