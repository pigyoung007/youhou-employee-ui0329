'use client'

import { useState } from 'react'
import { ChevronLeft, FileText, Download, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface Invoice {
  id: string
  orderId: string
  amount: number
  type: 'formal' | 'special' | 'adjustment'
  status: 'draft' | 'submitted' | 'issued' | 'rejected'
  createDate: string
  submitDate?: string
  issueDate?: string
  dueDate?: string
  invoiceNumber?: string
  rejectReason?: string
  items: {
    name: string
    amount: number
    quantity: number
  }[]
}

interface InvoicePageProps {
  onBack?: () => void
}

export function InvoiceManagementPage({ onBack }: InvoicePageProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      orderId: 'ORD-20260327-001',
      amount: 16800,
      type: 'formal',
      status: 'issued',
      createDate: '2026-03-20',
      submitDate: '2026-03-21',
      issueDate: '2026-03-23',
      invoiceNumber: '20260001',
      dueDate: '2026-04-23',
      items: [
        { name: '月嫂服务（28天）', amount: 16800, quantity: 1 }
      ]
    },
    {
      id: 'INV-002',
      orderId: 'ORD-20260325-002',
      amount: 9000,
      type: 'formal',
      status: 'submitted',
      createDate: '2026-03-25',
      submitDate: '2026-03-26',
      dueDate: '2026-04-26',
      items: [
        { name: '育婴师服务（15天）', amount: 9000, quantity: 1 }
      ]
    },
    {
      id: 'INV-003',
      orderId: 'ORD-20260310-003',
      amount: 5000,
      type: 'adjustment',
      status: 'draft',
      createDate: '2026-03-27',
      items: [
        { name: '补充服务费', amount: 5000, quantity: 1 }
      ]
    },
  ])

  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [filterStatus, setFilterStatus] = useState<Invoice['status'] | 'all'>('all')
  const [searchText, setSearchText] = useState('')

  const statusMap = {
    draft: { label: '草稿', icon: FileText, color: 'text-gray-600', bgColor: 'bg-gray-50' },
    submitted: { label: '已提交', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    issued: { label: '已开票', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    rejected: { label: '已驳回', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
  }

  const typeMap = {
    formal: '增值税发票',
    special: '特殊发票',
    adjustment: '调整单据'
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus
    const matchesSearch = invoice.orderId.includes(searchText) || invoice.invoiceNumber?.includes(searchText)
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: invoices.length,
    pending: invoices.filter(i => i.status === 'draft' || i.status === 'submitted').length,
    issued: invoices.filter(i => i.status === 'issued').length,
    amount: invoices.reduce((sum, i) => sum + i.amount, 0)
  }

  const handleSubmitRequest = () => {
    if (!selectedInvoice) return
    const updated = invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        return {
          ...inv,
          status: 'submitted' as const,
          submitDate: new Date().toISOString().split('T')[0]
        }
      }
      return inv
    })
    setInvoices(updated)
    setShowRequestDialog(false)
    setSelectedInvoice(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 safe-area-top">
          <button onClick={onBack} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">发票管理</h1>
          <Button size="sm" className="h-8 px-2 text-xs bg-primary hover:bg-primary/90">
            <FileText className="w-3.5 h-3.5 mr-1" />
            新建
          </Button>
        </div>
      </div>

      <div className="px-3 py-4 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">待开票金额</p>
              <p className="text-xl font-bold text-orange-600">¥{invoices.filter(i => i.status === 'draft').reduce((sum, i) => sum + i.amount, 0)}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">已开票金额</p>
              <p className="text-xl font-bold text-green-600">¥{invoices.filter(i => i.status === 'issued').reduce((sum, i) => sum + i.amount, 0)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="space-y-2">
          <Input
            placeholder="搜索订单号或发票号"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-9"
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['all', 'draft', 'submitted', 'issued', 'rejected'] as const).map(status => (
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
                {status === 'all' ? '全部' : statusMap[status as Invoice['status']].label}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices List */}
        <div className="space-y-2">
          {filteredInvoices.map(invoice => {
            const statusInfo = statusMap[invoice.status]
            const StatusIcon = statusInfo.icon

            return (
              <Card
                key={invoice.id}
                className="border-0 shadow-sm overflow-hidden"
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-primary shrink-0" />
                          <h3 className="font-semibold text-sm">{typeMap[invoice.type]}</h3>
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium shrink-0",
                            statusInfo.bgColor
                          )}>
                            <StatusIcon className={cn("w-3 h-3", statusInfo.color)} />
                            <span className={statusInfo.color}>{statusInfo.label}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          订单: {invoice.orderId}
                          {invoice.invoiceNumber && ` | 发票号: ${invoice.invoiceNumber}`}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary shrink-0">
                        ¥{invoice.amount}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="bg-muted/50 rounded p-2.5 space-y-1">
                      {invoice.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="font-medium">¥{item.amount}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dates */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>创建: {invoice.createDate}</span>
                      {invoice.issueDate && <span>开票: {invoice.issueDate}</span>}
                      {invoice.submitDate && <span>提交: {invoice.submitDate}</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-border">
                      {invoice.status === 'draft' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-8 text-xs bg-transparent"
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setShowRequestDialog(true)
                            }}
                          >
                            <Send className="w-3.5 h-3.5 mr-1" />
                            提交申请
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-8 text-xs bg-transparent"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1" />
                            编辑
                          </Button>
                        </>
                      )}

                      {invoice.status === 'submitted' && (
                        <div className="w-full text-center py-1 text-xs text-blue-600 bg-blue-50 rounded">
                          等待财务审批中...
                        </div>
                      )}

                      {invoice.status === 'issued' && (
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" />
                          下载发票
                        </Button>
                      )}

                      {invoice.status === 'rejected' && (
                        <div className="w-full">
                          <p className="text-xs text-red-600 mb-1">
                            驳回原因: {invoice.rejectReason || '未提供'}
                          </p>
                          <Button
                            size="sm"
                            className="w-full h-8 text-xs bg-primary hover:bg-primary/90"
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setShowRequestDialog(true)
                            }}
                          >
                            <Send className="w-3.5 h-3.5 mr-1" />
                            重新提交
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {filteredInvoices.length === 0 && (
            <div className="text-center py-6">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">暂无发票数据</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Drawer */}
      <Sheet open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <SheetContent side="right" className="w-[85vw] max-w-sm flex flex-col py-0 h-full">
          <SheetHeader className="mb-4">
            <SheetTitle>开票申请</SheetTitle>
          </SheetHeader>

          {selectedInvoice && (
            <div className="space-y-3">
              <div className="bg-muted/50 rounded p-3 space-y-1">
                <p className="text-xs text-muted-foreground">订单号</p>
                <p className="font-semibold text-sm">{selectedInvoice.orderId}</p>
              </div>

              <div className="bg-muted/50 rounded p-3 space-y-1">
                <p className="text-xs text-muted-foreground">开票金额</p>
                <p className="font-bold text-lg text-primary">¥{selectedInvoice.amount}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-700">
                <p className="font-semibold mb-1">提示</p>
                <p>开票申请提交后需要财务部门审批，一般会在2-3个工作日内处理。</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-9 bg-transparent"
                  onClick={() => setShowRequestDialog(false)}
                >
                  取消
                </Button>
                <Button
                  onClick={handleSubmitRequest}
                  className="flex-1 h-9 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  确认提交
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
