"use client"

// Employee Orders Page Component - Updated 2026-03-29
import { useState } from "react"
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Plus, ChevronRight, Baby, GraduationCap, X, ChevronLeft } from 'lucide-react'

interface Order {
  id: string
  customerName: string
  customerPhone: string
  serviceType: string
  servicePeriod: string
  totalAmount: number
  paidAmount: number
  status: 'draft' | 'pending_payment' | 'in_service' | 'completed' | 'pending_review'
  createdAt: string
}

const maternityOrders: Order[] = [
  { id: 'ORD001', customerName: '王女士', customerPhone: '138****8888', serviceType: '月嫂服务', servicePeriod: '2026-04-01 至 2026-04-26', totalAmount: 15800, paidAmount: 5000, status: 'in_service', createdAt: '2026-03-01' },
  { id: 'ORD002', customerName: '张先生', customerPhone: '139****6666', serviceType: '产后修复', servicePeriod: '2026-03-15 起', totalAmount: 8800, paidAmount: 8800, status: 'completed', createdAt: '2026-02-28' },
  { id: 'ORD003', customerName: '刘女士', customerPhone: '137****5555', serviceType: '月嫂服务', servicePeriod: '2026-05-01 至 2026-05-26', totalAmount: 18800, paidAmount: 0, status: 'pending_payment', createdAt: '2026-02-25' },
]

const careerOrders: Order[] = [
  { id: 'TRN001', customerName: '李小姐', customerPhone: '138****1234', serviceType: '月嫂培训', servicePeriod: '2026-04-01 至 2026-04-30', totalAmount: 5800, paidAmount: 5800, status: 'in_service', createdAt: '2026-03-01' },
  { id: 'TRN002', customerName: '张女士', customerPhone: '139****5678', serviceType: '育婴师培训', servicePeriod: '2026-03-15 至 2026-04-15', totalAmount: 4800, paidAmount: 2400, status: 'pending_payment', createdAt: '2026-02-28' },
]

const statusMap: Record<string, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-600' },
  pending_payment: { label: '待付款', color: 'bg-amber-100 text-amber-700' },
  in_service: { label: '服务中', color: 'bg-green-100 text-green-700' },
  completed: { label: '已完成', color: 'bg-blue-100 text-blue-700' },
  pending_review: { label: '待审核', color: 'bg-pink-100 text-pink-700' },
}

interface OrdersPageProps {
  employeeRole?: 'career' | 'maternity_consultant' | 'bei_yi_sheng'
  onOpenCreate?: () => void
  onOpenDetail?: (orderId: string) => void
  onBack?: () => void
}

export function EmployeeOrdersPage({ employeeRole = 'maternity_consultant', onOpenCreate, onOpenDetail, onBack }: OrdersPageProps) {
  const [activeStatus, setActiveStatus] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const isCareer = employeeRole === 'career'
  const orders = isCareer ? careerOrders : maternityOrders
  const pageTitle = isCareer ? '培训订单' : '服务订单'

  const filteredOrders = orders.filter(order => {
    const matchesStatus = activeStatus === 'all' || order.status === activeStatus
    const matchesSearch = order.customerName.includes(searchText) || order.id.includes(searchText)
    return matchesStatus && matchesSearch
  })

  const statusTabs = [
    { id: 'all', label: '全部', count: orders.length },
    { id: 'pending_payment', label: '待付款', count: orders.filter(o => o.status === 'pending_payment').length },
    { id: 'in_service', label: '服务中', count: orders.filter(o => o.status === 'in_service').length },
    { id: 'completed', label: '已完成', count: orders.filter(o => o.status === 'completed').length },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-base">{pageTitle}</h1>
          </div>
          <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 gap-1" onClick={onOpenCreate}>
            <Plus className="w-3.5 h-3.5" />新建
          </Button>
        </div>

        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索客户名称或订单号"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {statusTabs.map(tab => (
            <Button
              key={tab.id}
              size="sm"
              variant={activeStatus === tab.id ? 'default' : 'outline'}
              className={`h-7 text-xs px-3 shrink-0 ${activeStatus === tab.id ? 'bg-primary' : 'bg-transparent'}`}
              onClick={() => setActiveStatus(tab.id)}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="px-3 py-3 space-y-2">
        {filteredOrders.map(order => {
          const status = statusMap[order.status]
          return (
            <Card
              key={order.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onOpenDetail ? onOpenDetail(order.id) : setSelectedOrder(order)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                      {isCareer ? <GraduationCap className="w-4 h-4 text-pink-500" /> : <Baby className="w-4 h-4 text-pink-500" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.serviceType}</p>
                    </div>
                  </div>
                  <Badge className={`text-[10px] ${status.color}`}>{status.label}</Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{order.servicePeriod}</span>
                  <span className="font-semibold text-foreground">¥{order.totalAmount.toLocaleString()}</span>
                </div>

                {order.paidAmount < order.totalAmount && order.paidAmount > 0 && (
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(order.paidAmount / order.totalAmount) * 100}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>暂无订单</p>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setSelectedOrder(null)}>
          <div
            className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold">订单详情</h2>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">订单编号</span>
                  <span className="text-sm font-medium">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">客户姓名</span>
                  <span className="text-sm font-medium">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">服务类型</span>
                  <span className="text-sm font-medium">{selectedOrder.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">服务周期</span>
                  <span className="text-sm font-medium">{selectedOrder.servicePeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">订单金额</span>
                  <span className="text-sm font-bold text-primary">¥{selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">已支付</span>
                  <span className="text-sm font-medium">¥{selectedOrder.paidAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full h-10 bg-primary hover:bg-primary/90">上传回款凭证</Button>
                <Button variant="outline" className="w-full h-10 bg-transparent">生成合同</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
