'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  ChevronLeft, Calendar, User, CreditCard, FileText, 
  Check, Clock, AlertCircle, Plus, X, Download, Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrderDetailPageProps {
  orderId: string
  onBack: () => void
}

export function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'payment' | 'contract' | 'evaluation' | 'history'>('basic')
  const [showUploadReceipt, setShowUploadReceipt] = useState(false)
  const [showCreateContract, setShowCreateContract] = useState(false)
  const [showEvaluation, setShowEvaluation] = useState(false)

  // 模拟订单数据
  const order = {
    id: 'ORD20260301001',
    status: 'in_service',
    statusLabel: '服务中',
    customer: {
      name: '王女士',
      phone: '138****8888',
      address: '浦东新区xxx路xxx号',
    },
    serviceType: '月嫂服务',
    startDate: '2026-04-01',
    endDate: '2026-04-26',
    products: [
      { name: '月嫂服务（26天）', price: 6800, quantity: 1, total: 6800 },
      { name: '产后恢复护理', price: 2000, quantity: 1, total: 2000 },
    ],
    totalAmount: 15800,
    payment: {
      method: 'installment',
      firstPayment: 5000,
      dueDate: '2026-03-27',
      status: 'paid',
      schedule: [
        { period: 1, amount: 5000, dueDate: '2026-03-27', status: 'paid', paidDate: '2026-03-27' },
        { period: 2, amount: 5400, dueDate: '2026-04-10', status: 'pending', paidDate: null },
        { period: 3, amount: 5400, dueDate: '2026-04-24', status: 'pending', paidDate: null },
      ],
    },
    contract: {
      status: 'signed',
      signDate: '2026-03-20',
      signatories: ['客户', '家政员'],
    },
    commission: {
      rate: 15,
      amount: 2370,
      owner: '李顾问',
    },
    notes: '客户要求使用特定品牌纸尿裤',
    createdAt: '2026-03-01',
  }

  const tabs = [
    { id: 'basic' as const, label: '基本信息', icon: FileText },
    { id: 'payment' as const, label: '收费与票据', icon: CreditCard },
    { id: 'contract' as const, label: '合同', icon: FileText },
    { id: 'evaluation' as const, label: '评价', icon: User },
    { id: 'history' as const, label: '审批记录', icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-base">{order.id}</h1>
              <p className="text-[11px] text-muted-foreground">{order.serviceType}</p>
            </div>
          </div>
          <Badge className="bg-teal-100 text-teal-700">{order.statusLabel}</Badge>
        </div>

        {/* Tabs */}
        <div className="px-3 border-t border-border flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-3 py-2 space-y-2">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-2">
            {/* Customer Card */}
            <Card>
              <CardContent className="p-2.5">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs">{order.customer.name}</p>
                    <p className="text-[10px] text-muted-foreground">{order.customer.phone} · {order.customer.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardContent className="p-2.5">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground">服务类型</p>
                    <p className="text-xs font-medium">{order.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">开始日期</p>
                    <p className="text-xs font-medium">{order.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">结束日期</p>
                    <p className="text-xs font-medium">{order.endDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardContent className="p-2.5">
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">服务项目</p>
                <div className="space-y-1">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                      <div>
                        <p className="text-[11px] font-medium">{product.name}</p>
                        <p className="text-[10px] text-muted-foreground">¥{product.price} × {product.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold text-primary">¥{product.total}</p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 border-t border-border">
                    <p className="text-[11px] font-semibold">合计</p>
                    <p className="text-sm font-bold text-primary">¥{order.totalAmount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remarks */}
            {order.notes && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">备注</p>
                  <p className="text-xs text-foreground">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-4">
            {/* Payment Schedule */}
            <Card>
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">支付计划</p>
                <div className="space-y-2.5">
                  {order.payment.schedule.map((item) => (
                    <div key={item.period} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium">第 {item.period} 期 - ¥{item.amount}</p>
                        <Badge className={cn(
                          'text-[9px] px-1.5 py-0',
                          item.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        )}>
                          {item.status === 'paid' ? '已支付' : '待支付'}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        预计: {item.dueDate}
                        {item.paidDate && ` | 实付: ${item.paidDate}`}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Receipt */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground">回款凭证</p>
                  <Button
                    size="sm"
                    className="h-6 text-[11px] bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
                    onClick={() => setShowUploadReceipt(true)}
                  >
                    <Upload className="w-3 h-3" />上传
                  </Button>
                </div>
                <div className="space-y-2">
                  {[
                    { date: '2026-03-27', amount: 5000, status: 'verified' }
                  ].map((receipt, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-xs font-medium">{receipt.date}</p>
                        <p className="text-[10px] text-muted-foreground">¥{receipt.amount}</p>
                      </div>
                      {receipt.status === 'verified' && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {/* Contract Tab */}
        {activeTab === 'contract' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">合同状态</p>
                    <Badge className="bg-green-100 text-green-700">已签署</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">签署时间</p>
                    <p className="text-xs font-medium">{order.contract.signDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">签署方</p>
                    <div className="flex flex-wrap gap-1">
                      {order.contract.signatories.map(sig => (
                        <Badge key={sig} variant="outline" className="text-[10px]">{sig}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1">
                <Download className="w-3 h-3" />查看合同
              </Button>
              <Button 
                variant="outline" 
                className="h-10 bg-transparent text-xs gap-1"
                onClick={() => setShowCreateContract(true)}
              >
                <Plus className="w-3 h-3" />创建合同
              </Button>
            </div>
          </div>
        )}

        {/* Evaluation Tab */}
        {activeTab === 'evaluation' && (
          <div className="space-y-4">
            {/* Customer Evaluation */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">对家政员的评价</p>
                  <Button 
                    size="sm" 
                    className="h-7 text-xs bg-primary hover:bg-primary/90"
                    onClick={() => setShowEvaluation(true)}
                  >
                    <Plus className="w-3 h-3 mr-1" />添加评价
                  </Button>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800">暂无对家政员的评价</p>
                </div>
              </CardContent>
            </Card>

            {/* Caregiver Evaluation */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">家政员对客户的评价</p>
                  <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                    <Plus className="w-3 h-3 mr-1" />查看
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs font-medium text-green-800">客户配合度高，很好相处</p>
                    <p className="text-[10px] text-green-600 mt-1">— 李阿姨 2026-03-20</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {[
              { date: '2026-03-27 14:30', action: '订单创建', actor: '李顾问', status: 'completed' },
              { date: '2026-03-27 15:45', action: '合同生成', actor: '系统自动', status: 'completed' },
              { date: '2026-03-27 16:00', action: '合同已签署', actor: '客户王女士', status: 'completed' },
              { date: '2026-03-27 17:00', action: '首期款已收款', actor: '财务确认', status: 'completed' },
            ].map((record, idx) => (
              <Card key={idx}>
                <CardContent className="p-3 flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{record.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{record.actor}</p>
                    <p className="text-[10px] text-muted-foreground">{record.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Upload Receipt Drawer */}
      <Sheet open={showUploadReceipt} onOpenChange={setShowUploadReceipt}>
        <SheetContent side="right" className="w-[85vw] max-w-sm py-0">
          <div className="px-4 py-4 space-y-4">
            <SheetTitle>上传回款凭证</SheetTitle>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">期数</label>
              <select className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background">
                <option>第 2 期 - ¥5,400 (2026-04-10 到期)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">上传凭证</label>
              <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">点击或拖拽上传凭证照片</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={() => setShowUploadReceipt(false)}>
                取消
              </Button>
              <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
                确认上传
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Contract Drawer */}
      <Sheet open={showCreateContract} onOpenChange={setShowCreateContract}>
        <SheetContent side="right" className="w-[85vw] max-w-sm py-0">
          <div className="px-4 py-4 space-y-4">
            <SheetTitle>基于订单创建合同</SheetTitle>
            
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-foreground mb-1.5">合同模板</p>
                <select className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background">
                  <option>标准服务合同</option>
                  <option>月嫂服务合同</option>
                  <option>产后修复服务合同</option>
                  <option>育婴师服务合同</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium mb-1">合同信息自动填充：</p>
                <ul className="text-blue-700 space-y-0.5 text-[10px]">
                  <li>• 客户姓名：王女士</li>
                  <li>• 服务类型：月嫂服务</li>
                  <li>• 合同金额：¥15,800</li>
                  <li>• 服务时间：2026-04-01 至 2026-04-26</li>
                  <li>• 签署方：客户、家政员、公司</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label className="font-semibold">生效日期*</label>
                <input type="date" className="w-full px-3 py-2 text-sm border border-input rounded-lg" defaultValue="2026-04-01" />
              </div>

              <div className="space-y-2">
                <label className="font-semibold">备注说明</label>
                <textarea className="w-full px-3 py-2 text-sm border border-input rounded-lg resize-none h-20" placeholder="输入合同备注..." />
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={() => setShowCreateContract(false)}>
                取消
              </Button>
              <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
                创建合同
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Evaluation Drawer */}
      <Sheet open={showEvaluation} onOpenChange={setShowEvaluation}>
        <SheetContent side="right" className="w-[85vw] max-w-sm py-0">
          <div className="px-4 py-4 space-y-4">
            <SheetTitle>对家政员的评价</SheetTitle>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-foreground block mb-2">服务评分*</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="text-2xl text-yellow-400 hover:text-yellow-500">★</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-2">服务态度*</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="text-2xl text-yellow-400 hover:text-yellow-500">★</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-2">专业能力*</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="text-2xl text-yellow-400 hover:text-yellow-500">★</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1.5">评价内容*</label>
                <textarea 
                  className="w-full px-3 py-2 text-sm border border-input rounded-lg resize-none h-24" 
                  placeholder="请输入您对阿姨的评价..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" className="w-4 h-4" />
                <label htmlFor="anonymous" className="text-foreground">匿名评价</label>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={() => setShowEvaluation(false)}>
                取消
              </Button>
              <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
                提交评价
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
