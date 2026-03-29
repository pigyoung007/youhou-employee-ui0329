'use client'

import { useState } from 'react'
import { ChevronLeft, Plus, Package, FileText, Clock, CheckCircle, XCircle, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface OutboundRequest {
  id: string
  itemName: string
  quantity: number
  unit: string
  reason: string
  orderId?: string
  orderName?: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  createdBy: string
}

interface InventoryPageProps {
  onBack?: () => void
}

export function InventoryManagementPage({ onBack }: InventoryPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newRequest, setNewRequest] = useState({
    itemName: '',
    quantity: '',
    unit: '件',
    reason: '',
    orderId: '',
  })

  const [requests, setRequests] = useState<OutboundRequest[]>([
    {
      id: 'OUT-001',
      itemName: '产妇护理垫',
      quantity: 5,
      unit: '盒',
      reason: '客户订单配送',
      orderId: 'ORD-2025-001',
      orderName: '张女士月嫂服务订单',
      status: 'pending',
      createdAt: '2025-03-28 14:30',
      createdBy: '李顾问',
    },
    {
      id: 'OUT-002',
      itemName: '新生儿礼包',
      quantity: 1,
      unit: '套',
      reason: '客户赠品',
      orderId: 'ORD-2025-002',
      orderName: '王女士育婴服务订单',
      status: 'approved',
      createdAt: '2025-03-27 10:15',
      createdBy: '王顾问',
    },
    {
      id: 'OUT-003',
      itemName: '产妇恢复保健品',
      quantity: 2,
      unit: '瓶',
      reason: '损耗报废',
      status: 'rejected',
      createdAt: '2025-03-26 16:45',
      createdBy: '张顾问',
    },
  ])

  const outboundReasons = ['客户订单配送', '客户赠品', '损耗报废', '内部使用', '退换货', '其他']

  const mockOrders = [
    { id: 'ORD-2025-001', name: '张女士月嫂服务订单' },
    { id: 'ORD-2025-002', name: '王女士育婴服务订单' },
    { id: 'ORD-2025-003', name: '刘女士产后康复订单' },
  ]

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'all') return true
    return req.status === activeTab
  })

  const statusConfig = {
    pending: { label: '待审批', color: 'bg-amber-100 text-amber-700', icon: Clock },
    approved: { label: '已通过', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { label: '已驳回', color: 'bg-red-100 text-red-700', icon: XCircle },
  }

  const handleCreateRequest = () => {
    if (!newRequest.itemName || !newRequest.quantity || !newRequest.reason) return

    const order = mockOrders.find(o => o.id === newRequest.orderId)
    const newReq: OutboundRequest = {
      id: `OUT-${String(requests.length + 1).padStart(3, '0')}`,
      itemName: newRequest.itemName,
      quantity: parseInt(newRequest.quantity),
      unit: newRequest.unit,
      reason: newRequest.reason,
      orderId: newRequest.orderId || undefined,
      orderName: order?.name,
      status: 'pending',
      createdAt: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-'),
      createdBy: '当前用户',
    }

    setRequests([newReq, ...requests])
    setShowCreateModal(false)
    setNewRequest({ itemName: '', quantity: '', unit: '件', reason: '', orderId: '' })
  }

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'approved' as const } : req))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'rejected' as const } : req))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 safe-area-top">
          <button onClick={onBack} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">出库申请</h1>
          <Button size="sm" className="h-8 text-xs bg-primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-3 h-3 mr-1" />新建
          </Button>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* Status Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '待审批' },
            { key: 'approved', label: '已通过' },
            { key: 'rejected', label: '已驳回' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full transition-colors',
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Request List */}
        <div className="space-y-2">
          {filteredRequests.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <Package className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">暂无出库申请</p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map(req => {
              const config = statusConfig[req.status]
              const StatusIcon = config.icon
              return (
                <Card key={req.id} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-sm">{req.itemName}</h3>
                          <span className="text-xs text-primary font-bold">x{req.quantity}{req.unit}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">申请单号: {req.id}</p>
                      </div>
                      <span className={cn('px-2 py-1 text-[10px] rounded-full flex items-center gap-1', config.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground mb-2">
                      <p>出库原因: <span className="text-foreground">{req.reason}</span></p>
                      {req.orderId && (
                        <p className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          关联订单: <span className="text-primary">{req.orderName}</span>
                        </p>
                      )}
                      <p>申请人: {req.createdBy} | {req.createdAt}</p>
                    </div>

                    {/* Action Buttons for pending requests */}
                    {req.status === 'pending' && (
                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs bg-red-50 hover:bg-red-100 text-red-600 border-0"
                          onClick={() => handleReject(req.id)}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          驳回
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(req.id)}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          通过
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>

      {/* Create Drawer - Right Side Sheet */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreateModal(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <h2 className="font-semibold">新建出库申请</h2>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">物品名称*</label>
                <Input
                  placeholder="请输入物品名称"
                  value={newRequest.itemName}
                  onChange={(e) => setNewRequest({ ...newRequest, itemName: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">数量*</label>
                  <Input
                    type="number"
                    placeholder="输入数量"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">单位</label>
                  <div className="relative">
                    <select
                      value={newRequest.unit}
                      onChange={(e) => setNewRequest({ ...newRequest, unit: e.target.value })}
                      className="w-full h-10 px-3 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer"
                    >
                      <option value="件">件</option>
                      <option value="盒">盒</option>
                      <option value="套">套</option>
                      <option value="瓶">瓶</option>
                      <option value="包">包</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">出库原因*</label>
                <div className="relative">
                  <select
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                    className="w-full h-10 px-3 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer"
                  >
                    <option value="">选择出库原因</option>
                    {outboundReasons.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">关联订单（可选）</label>
                <div className="relative">
                  <select
                    value={newRequest.orderId}
                    onChange={(e) => setNewRequest({ ...newRequest, orderId: e.target.value })}
                    className="w-full h-10 px-3 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer"
                  >
                    <option value="">选择关联订单</option>
                    {mockOrders.map(order => (
                      <option key={order.id} value={order.id}>{order.id} - {order.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">备注说明</label>
                <textarea
                  placeholder="请输入备注说明（可选）"
                  className="w-full h-20 px-3 py-2 text-sm border border-input rounded-lg bg-background resize-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-border shrink-0">
              <Button
                className="w-full h-11 bg-primary hover:bg-primary/90"
                onClick={handleCreateRequest}
                disabled={!newRequest.itemName || !newRequest.quantity || !newRequest.reason}
              >
                提交申请
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
