'use client'

import { useState } from 'react'
import { Search, ChevronRight, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { OrderConsultantLines } from '@/components/order-consultant-lines'

interface Order {
  id: string
  serviceType: '月嫂服务' | '产后修复' | '育婴师' | '在线课程'
  caregiverName: string
  caregiverAvatar: string
  startDate: string
  endDate: string
  amount: number
  status: 'pending_pay' | 'paid' | 'in_service' | 'completed' | 'cancelled'
  createdAt: string
  contractId?: string
  maternityConsultant?: string
  careerConsultant?: string
}

const statusConfig = {
  pending_pay: { label: '待支付', color: 'bg-orange-100 text-orange-700', icon: '⏳' },
  paid: { label: '已支付', color: 'bg-blue-100 text-blue-700', icon: '✓' },
  in_service: { label: '服务中', color: 'bg-green-100 text-green-700', icon: '🏠' },
  completed: { label: '已完成', color: 'bg-gray-100 text-gray-700', icon: '✓✓' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-700', icon: '✗' },
}

const serviceTypeEmoji = {
  '月嫂服务': '👶',
  '产后修复': '💆',
  '育婴师': '👧',
  '在线课程': '📚',
}

export function OrdersPage({ onOrderClick }: { onOrderClick?: (orderId: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | Order['status']>('all')

  // Mock 订单数据
  const mockOrders: Order[] = [
    {
      id: 'ORD20260329001',
      serviceType: '月嫂服务',
      caregiverName: '李春华',
      caregiverAvatar: '👩',
      startDate: '2026-04-01',
      endDate: '2026-04-26',
      amount: 15800,
      status: 'pending_pay',
      createdAt: '2026-03-29',
      contractId: 'CT2026033101',
      maternityConsultant: '张丽',
      careerConsultant: '陈明',
    },
    {
      id: 'ORD20260328002',
      serviceType: '产后修复',
      caregiverName: '王阿姨',
      caregiverAvatar: '👩',
      startDate: '2026-03-30',
      endDate: '2026-04-15',
      amount: 6800,
      status: 'in_service',
      createdAt: '2026-03-28',
      contractId: 'CT2026033102',
      maternityConsultant: '刘婷',
      careerConsultant: '',
    },
    {
      id: 'ORD20260327003',
      serviceType: '育婴师',
      caregiverName: '张静',
      caregiverAvatar: '👩',
      startDate: '2026-03-20',
      endDate: '2026-06-20',
      amount: 8800,
      status: 'paid',
      createdAt: '2026-03-27',
      contractId: 'CT2026033103',
      maternityConsultant: '张丽',
      careerConsultant: '王强',
    },
    {
      id: 'ORD20260325004',
      serviceType: '月嫂服务',
      caregiverName: '陈姐',
      caregiverAvatar: '👩',
      startDate: '2026-01-15',
      endDate: '2026-02-12',
      amount: 15800,
      status: 'completed',
      createdAt: '2026-03-25',
      contractId: 'CT2026033104',
      maternityConsultant: '赵敏',
      careerConsultant: '周洋',
    },
  ]

  // 筛选订单
  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.caregiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  const statusTabs: Array<{ id: 'all' | Order['status'], label: string }> = [
    { id: 'all', label: '全部' },
    { id: 'pending_pay', label: '待支付' },
    { id: 'paid', label: '已支付' },
    { id: 'in_service', label: '服务中' },
    { id: 'completed', label: '已完成' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border pt-3 pb-3">
        <div className="px-3">
          <h1 className="font-bold text-base mb-3">我的订单</h1>

          {/* 搜索框 */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索订单号或服务人员"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
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

      {/* 订单列表 */}
      <div className="px-3 py-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-2">暂无订单</p>
            <p className="text-xs text-muted-foreground">预约服务后订单将显示在这里</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status]
            return (
              <Card
                key={order.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => onOrderClick?.(order.id)}
              >
                <CardContent className="p-3">
                  {/* 顶部：服务类型 + 状态 */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{serviceTypeEmoji[order.serviceType]}</span>
                      <div>
                        <p className="font-semibold text-sm">{order.serviceType}</p>
                        <p className="text-xs text-muted-foreground">{order.id}</p>
                      </div>
                    </div>
                    <Badge className={cn('text-[10px] px-2 py-0.5 shrink-0', config.color)}>
                      {config.label}
                    </Badge>
                  </div>

                  <OrderConsultantLines
                    maternityConsultant={order.maternityConsultant}
                    careerConsultant={order.careerConsultant}
                    className="mb-2"
                  />

                  {/* 中部：服务人员 + 日期 */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white text-sm">
                        {order.caregiverAvatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{order.caregiverName}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.startDate} 至 {order.endDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 底部：金额 + 操作 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">订单金额</p>
                      <p className="text-lg font-bold text-primary">¥{order.amount}</p>
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
