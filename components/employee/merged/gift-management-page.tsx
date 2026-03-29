'use client'

import { useState } from 'react'
import { ChevronLeft, Gift, Plus, Clock, CheckCircle, AlertCircle, Truck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface GiftApplication {
  id: string
  orderId: string
  customerName: string
  giftType: string
  quantity: number
  status: 'draft' | 'pending' | 'approved' | 'shipped' | 'rejected'
  createDate: string
  approvalDate?: string
  shipDate?: string
  address?: string
  trackingNumber?: string
  reason: string
  rejectReason?: string
}

interface GiftManagementPageProps {
  onBack?: () => void
}

export function GiftManagementPage({ onBack }: GiftManagementPageProps) {
  const [applications, setApplications] = useState<GiftApplication[]>([
    {
      id: 'GIFT-001',
      orderId: 'ORD-20260327-001',
      customerName: '张女士',
      giftType: '新生儿礼包（豪华版）',
      quantity: 1,
      status: 'approved',
      createDate: '2026-03-25',
      approvalDate: '2026-03-26',
      address: '北京市朝阳区XXX小区',
      reason: '月嫂服务客户赠送',
    },
    {
      id: 'GIFT-002',
      orderId: 'ORD-20260320-002',
      customerName: '李女士',
      giftType: '产妇护理礼包',
      quantity: 2,
      status: 'shipped',
      createDate: '2026-03-22',
      approvalDate: '2026-03-23',
      shipDate: '2026-03-24',
      trackingNumber: 'SF123456789',
      address: '上海市浦东新区XXX',
      reason: '转介绍客户赠送',
    },
    {
      id: 'GIFT-003',
      orderId: 'ORD-20260325-003',
      customerName: '王女士',
      giftType: '新生儿礼包（标准版）',
      quantity: 1,
      status: 'pending',
      createDate: '2026-03-27',
      address: '深圳市南山区XXX',
      reason: '育婴师推荐礼包',
    },
    {
      id: 'GIFT-004',
      orderId: 'ORD-20260310-004',
      customerName: '陈先生',
      giftType: '产妇护理礼包',
      quantity: 1,
      status: 'rejected',
      createDate: '2026-03-15',
      rejectReason: '超出本月礼包预算，建议下月申请',
      reason: '产康客户赠送',
    },
  ])

  const [filterStatus, setFilterStatus] = useState<GiftApplication['status'] | 'all'>('all')
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [selectedApp, setSelectedApp] = useState<GiftApplication | null>(null)

  const giftTypes = ['新生儿礼包（豪华版）', '新生儿礼包（标准版）', '产妇护理礼包', '产后恢复套装']

  const statusMap = {
    draft: { label: '草稿', color: 'text-gray-600', bgColor: 'bg-gray-50' },
    pending: { label: '待审批', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    approved: { label: '已通过', color: 'text-green-600', bgColor: 'bg-green-50' },
    shipped: { label: '已发货', color: 'text-teal-600', bgColor: 'bg-teal-50' },
    rejected: { label: '已驳回', color: 'text-red-600', bgColor: 'bg-red-50' },
  }

  const filteredApps = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus
    return matchesStatus
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending' || a.status === 'draft').length,
    approved: applications.filter(a => a.status === 'approved').length,
    shipped: applications.filter(a => a.status === 'shipped').length,
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 safe-area-top">
          <button onClick={onBack} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">礼包申请</h1>
          <Button size="sm" className="h-8 px-2 text-xs bg-primary hover:bg-primary/90" onClick={() => setShowNewDialog(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            申请
          </Button>
        </div>
      </div>

      <div className="px-3 py-4 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">待审批/待发货</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pending + stats.approved}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">已发货</p>
              <p className="text-2xl font-bold text-green-600">{stats.shipped}</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['all', 'draft', 'pending', 'approved', 'shipped', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors",
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
            >
              {status === 'all' ? '全部' : statusMap[status as GiftApplication['status']].label}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-2">
          {filteredApps.map(app => {
            const statusInfo = statusMap[app.status]

            return (
              <Card
                key={app.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedApp(app)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Gift className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-sm truncate">{app.giftType}</h3>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-xs font-medium shrink-0",
                            statusInfo.bgColor
                          )}>
                            <span className={statusInfo.color}>{statusInfo.label}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          订单: {app.orderId} | 客户: {app.customerName}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-sm">×{app.quantity}</p>
                        <p className="text-xs text-muted-foreground">{app.createDate}</p>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>申请</span>
                      <span>→</span>
                      {app.status === 'approved' || app.status === 'shipped' || app.status === 'rejected' ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          <span>已审批</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>审批中</span>
                        </>
                      )}
                      {app.status === 'shipped' && (
                        <>
                          <span>→</span>
                          <Truck className="w-3.5 h-3.5 text-teal-600" />
                          <span>已发货</span>
                          {app.trackingNumber && (
                            <>
                              <span>({app.trackingNumber})</span>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* Address */}
                    {app.address && (
                      <div className="flex gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded p-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{app.address}</span>
                      </div>
                    )}

                    {/* Reject Reason */}
                    {app.status === 'rejected' && app.rejectReason && (
                      <div className="flex gap-1.5 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{app.rejectReason}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {filteredApps.length === 0 && (
            <div className="text-center py-6">
              <Gift className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">暂无申请记录</p>
            </div>
          )}
        </div>
      </div>

      {/* New Application Drawer */}
      <Sheet open={showNewDialog} onOpenChange={setShowNewDialog}>
        <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="text-sm">申请礼包</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            <div>
              <label className="text-xs font-semibold mb-1.5 block">选择礼包类型</label>
              <div className="space-y-2">
                {giftTypes.map(type => (
                  <button
                    key={type}
                    className="w-full p-2.5 border border-border rounded-lg text-left hover:bg-accent transition-colors"
                  >
                    <div className="font-medium text-sm">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-700">
              <p className="font-semibold mb-1">提示</p>
              <p>礼包申请需要主管审批，一般在1-2个工作日内处理。获批后会在3-5个工作日内发货。</p>
            </div>
          </div>

          <div className="px-4 py-3 border-t">
            <Button
              onClick={() => setShowNewDialog(false)}
              className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              确认申请
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Application Detail Drawer */}
      <Sheet open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="text-sm">{selectedApp?.giftType}</SheetTitle>
          </SheetHeader>

          {selectedApp && (
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <div className="bg-muted/50 rounded p-3">
                <p className="text-xs text-muted-foreground mb-1">订单号</p>
                <p className="font-semibold text-sm">{selectedApp.orderId}</p>
              </div>

              <div className="bg-muted/50 rounded p-3">
                <p className="text-xs text-muted-foreground mb-1">客户</p>
                <p className="font-semibold text-sm">{selectedApp.customerName}</p>
              </div>

              <div className="bg-muted/50 rounded p-3">
                <p className="text-xs text-muted-foreground mb-1">申请原因</p>
                <p className="text-sm">{selectedApp.reason}</p>
              </div>

              {selectedApp.address && (
                <div className="bg-muted/50 rounded p-3">
                  <p className="text-xs text-muted-foreground mb-1">收货地址</p>
                  <p className="text-sm">{selectedApp.address}</p>
                </div>
              )}

              {selectedApp.trackingNumber && (
                <div className="bg-teal-50 border border-teal-200 rounded p-3">
                  <p className="text-xs text-teal-700 mb-1">物流信息</p>
                  <p className="text-sm font-semibold text-teal-700">{selectedApp.trackingNumber}</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
