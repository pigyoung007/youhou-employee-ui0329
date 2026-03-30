'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  ChevronLeft, ChevronDown, FileText, Clock, CheckCircle, AlertCircle, 
  Send, Download, Plus, X, Calendar, User, Copy, MessageSquare, Phone
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ContractOrderPrefill {
  customerName: string
  serviceType: string
  amount: number
  startDate: string
  endDate: string
  caregiverName: string
  contractId: string
  orderId: string
}

export interface ContractPrefillData {
  customerName?: string
  serviceType?: string
  amount?: number
  startDate?: string
  endDate?: string
  orderId?: string
}

interface ContractManagementPageProps {
  onBack: () => void
  onCreateOrder?: (data: ContractOrderPrefill) => void
  contractPrefill?: ContractPrefillData
  autoOpenCreate?: boolean
}

interface Contract {
  id: string
  orderId: string
  customerName: string
  serviceType: string
  amount: number
  status: 'pending_sign' | 'pending_receipt' | 'signed' | 'supplement_pending' | 'terminated'
  signDeadline: string
  signatories: Array<{
    name: string
    role: 'customer' | 'caregiver' | 'company'
    status: 'pending' | 'signed'
    signDate?: string
  }>
  createdAt: string
  // 新增字段
  scheduleStart: string // 档期开始
  scheduleEnd: string // 档期结束
  caregiverLevel: string // 月嫂星级
  consultantName: string // 顾问名称
  serviceDays: number // 服务时间（天）
  supplementAgreements?: Array<{
    id: string
    reason: string
    status: 'pending' | 'signed'
  }>
}

export function ContractManagementPage({ onBack, onCreateOrder, contractPrefill, autoOpenCreate }: ContractManagementPageProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'signed'>('all')
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showReminder, setShowReminder] = useState(false)
  const [showCreateOrder, setShowCreateOrder] = useState(false)
  const [showCreateContract, setShowCreateContract] = useState(false)
  const [createContractStep, setCreateContractStep] = useState<1 | 2 | 3 | 4>(1)
  
  useEffect(() => {
    if (autoOpenCreate && contractPrefill?.orderId) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setShowCreateContract(true)
      setCreateContractStep(2)
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [autoOpenCreate, contractPrefill?.orderId])
  
  // 新建合同表单数据
  const [contractFormData, setContractFormData] = useState({
    company: '银川优厚家庭服务有限公司',
    amount: contractPrefill?.amount ?? 0,
    customerName: contractPrefill?.customerName ?? '',
    caregiverName: '',
    startDate: contractPrefill?.startDate ?? '',
    endDate: contractPrefill?.endDate ?? '',
    serviceType: contractPrefill?.serviceType ?? '月嫂服务',
    orderId: contractPrefill?.orderId ?? '',
    address: '',
  })

  const contracts: Contract[] = [
    {
      id: 'HT2025031800001',
      orderId: 'ORD20260301001',
      customerName: '王女士',
      serviceType: '月嫂服务合同',
      amount: 15800,
      status: 'signed',
      signDeadline: '2026-03-30',
      createdAt: '2025-03-15',
      scheduleStart: '2025-04-01',
      scheduleEnd: '2025-04-26',
      caregiverLevel: '金牌月嫂',
      consultantName: '张顾问',
      serviceDays: 26,
      signatories: [
        { name: '王女士', role: 'customer', status: 'signed', signDate: '2026-03-27' },
        { name: '李阿姨', role: 'caregiver', status: 'signed', signDate: '2026-03-28' },
        { name: '优厚家庭服务', role: 'company', status: 'signed', signDate: '2026-03-27' },
      ],
    },
    {
      id: 'HT2025022800002',
      orderId: 'ORD20260228002',
      customerName: '张先生',
      serviceType: '产后修复合同',
      amount: 8800,
      status: 'pending_sign',
      signDeadline: '2026-04-02',
      createdAt: '2025-02-28',
      scheduleStart: '2025-03-10',
      scheduleEnd: '2025-04-10',
      caregiverLevel: '高级月嫂',
      consultantName: '李顾问',
      serviceDays: 32,
      signatories: [
        { name: '张先生', role: 'customer', status: 'pending' },
        { name: '优厚家庭服务', role: 'company', status: 'signed', signDate: '2026-02-28' },
      ],
    },
    {
      id: 'HT2025022500003',
      orderId: 'ORD20260225003',
      customerName: '刘女士',
      serviceType: '月嫂服务合同',
      amount: 18800,
      status: 'pending_receipt',
      signDeadline: '2026-03-25',
      createdAt: '2025-02-25',
      scheduleStart: '2025-03-01',
      scheduleEnd: '2025-03-28',
      caregiverLevel: '金牌月嫂',
      consultantName: '王顾问',
      serviceDays: 28,
      signatories: [
        { name: '刘女士', role: 'customer', status: 'signed', signDate: '2026-02-25' },
        { name: '张阿姨', role: 'caregiver', status: 'signed', signDate: '2026-02-26' },
        { name: '优厚家庭服务', role: 'company', status: 'signed', signDate: '2026-02-25' },
      ],
      supplementAgreements: [
        { id: 'SUP001', reason: '服务周期增加3天', status: 'pending' }
      ],
    },
  ]

  const statusConfig = {
    pending_sign: { label: '待签署', color: 'bg-amber-100 text-amber-700', icon: Clock },
    pending_receipt: { label: '待收据', color: 'bg-blue-100 text-blue-700', icon: FileText },
    signed: { label: '已签署', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    supplement_pending: { label: '补充协议待签', color: 'bg-purple-100 text-purple-700', icon: AlertCircle },
    terminated: { label: '已终止', color: 'bg-gray-100 text-gray-700', icon: X },
  }

  const filteredContracts = contracts.filter(c => {
    if (filterStatus === 'pending') return c.status === 'pending_sign' || c.status === 'pending_receipt'
    if (filterStatus === 'signed') return c.status === 'signed'
    return true
  })

  const pendingCount = contracts.filter(c => c.status === 'pending_sign' || c.status === 'pending_receipt').length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-base">合同管理</h1>
              <p className="text-[11px] text-muted-foreground">{pendingCount} 份待签署</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="h-8 text-xs bg-primary hover:bg-primary/90"
            onClick={() => { setShowCreateContract(true); setCreateContractStep(1) }}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />新建合同
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="px-3 py-2 border-t border-border flex gap-2 overflow-x-auto">
          {[
            { id: 'all' as const, label: '全部' },
            { id: 'pending' as const, label: '待签署' },
            { id: 'signed' as const, label: '已签署' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium whitespace-nowrap rounded-lg transition-all',
                filterStatus === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contract List */}
      <div className="px-3 py-3 space-y-2.5">
        {filteredContracts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">暂无合同</p>
            </CardContent>
          </Card>
        ) : (
          filteredContracts.map(contract => {
            const config = statusConfig[contract.status]
            return (
              <Card
                key={contract.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedContract(contract)}
              >
                <CardContent className="p-3">
                  {/* 顶部：图标 + 标题 + 状态 */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-sm font-medium text-primary">合</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-semibold text-sm">{contract.serviceType}</h3>
                        <Badge className={cn('text-[10px] px-2 py-0.5 shrink-0', config.color)}>
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{contract.id} | {contract.createdAt}</p>
                    </div>
                  </div>

                  {/* 详情字段 */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-border">
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">档期（排期）</p>
                      <p className="text-xs font-medium">{contract.scheduleStart} 至 {contract.scheduleEnd}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">月嫂星级</p>
                      <p className="text-xs font-medium">{contract.caregiverLevel}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">顾问名称</p>
                      <p className="text-xs font-medium">{contract.consultantName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">服务时间</p>
                      <p className="text-xs font-medium">{contract.serviceDays}天</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Contract Detail Drawer */}
      <Sheet open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <SheetContent side="right" className="w-[90vw] max-w-md flex flex-col py-0 h-full">
          {selectedContract && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
                <SheetTitle className="text-base font-semibold">合同详情</SheetTitle>
                <button onClick={() => setSelectedContract(null)} className="p-1">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Contract Info */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">合同号</p>
                        <p className="text-sm font-medium font-mono">{selectedContract.id}</p>
                      </div>
                      <Badge className={cn('text-[10px] px-2 py-1', statusConfig[selectedContract.status].color)}>
                        {statusConfig[selectedContract.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">订单金额</p>
                        <p className="text-base font-bold text-primary">¥{selectedContract.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">签署截止</p>
                        <p className="text-sm font-semibold">{selectedContract.signDeadline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Info */}
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">客户信息</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">姓名</span>
                        <span className="text-sm font-medium">{selectedContract.customerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">服务类型</span>
                        <span className="text-sm font-medium">{selectedContract.serviceType}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Signatories */}
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2.5">签署方</p>
                    <div className="space-y-2">
                      {selectedContract.signatories.map((sig, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-xs font-medium">{sig.name}</p>
                            <p className="text-[10px] text-muted-foreground">{sig.role}</p>
                          </div>
                          <div className="text-right">
                            {sig.status === 'signed' ? (
                              <div>
                                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                                <p className="text-[9px] text-muted-foreground">{sig.signDate}</p>
                              </div>
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Supplement Agreements */}
                {selectedContract.supplementAgreements && selectedContract.supplementAgreements.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2.5">补充协议</p>
                      <div className="space-y-2">
                        {selectedContract.supplementAgreements.map((sup) => (
                          <div key={sup.id} className="p-2 bg-muted/50 rounded-lg border border-amber-200">
                            <p className="text-xs font-medium">{sup.reason}</p>
                            <Badge className={cn(
                              'text-[8px] px-1 py-0 mt-1',
                              sup.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-green-100 text-green-700'
                            )}>
                              {sup.status === 'pending' ? '待签署' : '已签署'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-10 bg-transparent text-xs gap-1">
                    <Download className="w-3 h-3" />查看合同
                  </Button>
                  {selectedContract.status === 'signed' && (
                    <Button 
                      className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1"
                      onClick={() => {
                        const caregiver = selectedContract.signatories.find(s => s.role === 'caregiver')
                        setSelectedContract(null)
                        onCreateOrder?.({
                          customerName: selectedContract.customerName,
                          serviceType: selectedContract.serviceType,
                          amount: selectedContract.amount,
                          startDate: selectedContract.createdAt,
                          endDate: selectedContract.signDeadline,
                          caregiverName: caregiver?.name ?? '',
                          contractId: selectedContract.id,
                          orderId: selectedContract.orderId,
                        })
                      }}
                    >
                      <Plus className="w-3 h-3" />创建订单
                    </Button>
                  )}
                  {selectedContract.status === 'pending_sign' && (
                    <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1">
                      <Send className="w-3 h-3" />催签
                    </Button>
                  )}
                  {selectedContract.status === 'pending_receipt' && (
                    <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1">
                      <Plus className="w-3 h-3" />补充协议
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Reminder Drawer */}
      <Sheet open={showReminder} onOpenChange={setShowReminder}>
        <SheetContent side="right" className="w-[85vw] max-w-sm py-0">
          <div className="px-4 py-4 space-y-4">
            <SheetTitle>发送催签提醒</SheetTitle>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">提醒方式</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 border border-primary rounded-lg text-center text-xs font-medium text-primary bg-primary/10">
                  短信提醒
                </button>
                <button className="p-2 border border-border rounded-lg text-center text-xs font-medium text-muted-foreground hover:border-primary">
                  电话提醒
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={() => setShowCreateOrder(false)}>
                取消
              </Button>
              <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
                创建订单
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Contract Sheet */}
      <Sheet open={showCreateContract} onOpenChange={setShowCreateContract}>
        <SheetContent side="right" className="max-w-md w-full overflow-y-auto py-0">
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <SheetTitle>新建合同</SheetTitle>
              <p className="text-xs text-muted-foreground">步骤 {createContractStep}/4</p>
            </div>

            {/* Step Progress */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className={cn(
                  "flex-1 h-1.5 rounded-full",
                  step <= createContractStep ? "bg-primary" : "bg-muted"
                )} />
              ))}
            </div>

            {/* Step 1: Basic Info */}
            {createContractStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">基本信息</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium block mb-1.5">合同类型*</label>
                    <select className="w-full px-3 py-2 text-sm border border-border rounded-lg">
                      <option>服务合同</option>
                      <option>培训合同</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5">关联订单</label>
                    <Input placeholder="输入订单编号（可选）" className="h-10" />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5">客户姓名*</label>
                    <Input placeholder="输入客户姓名" className="h-10" />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5">联系电话*</label>
                    <Input placeholder="输入联系电话" className="h-10" />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5">服务类型*</label>
                    <select className="w-full px-3 py-2 text-sm border border-border rounded-lg">
                      <option>月嫂服务</option>
                      <option>育婴师服务</option>
                      <option>产后修复</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateContract(false)}>取消</Button>
                  <Button className="flex-1 bg-primary" onClick={() => setCreateContractStep(2)}>下一步</Button>
                </div>
              </div>
            )}

            {/* Step 2: 填写签约信息 */}
            {createContractStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">填写签约信息</p>
                
                {/* 来源订单提示 */}
                {contractPrefill?.orderId && (
                  <div className="bg-blue-50 border border-blue-200 text-primary text-sm px-4 py-3 rounded-lg">
                    来自订单 {contractPrefill.orderId}，已自动填入相关信息
                  </div>
                )}

                <div className="space-y-4">
                  {/* 签约公司 & 合同金额 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium block mb-1.5">签约公司</label>
                      <select 
                        className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-background"
                        value={contractFormData.company}
                        onChange={e => setContractFormData(d => ({ ...d, company: e.target.value }))}
                      >
                        <option>银川优厚家庭服务有限公司</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1.5">合同金额（元）</label>
                      <Input 
                        type="number" 
                        placeholder="输入金额" 
                        value={contractFormData.amount || ''} 
                        onChange={e => setContractFormData(d => ({ ...d, amount: Number(e.target.value) }))}
                        className="h-10" 
                      />
                    </div>
                  </div>

                  {/* 雇主(甲方) */}
                  <div>
                    <label className="text-xs font-medium block mb-1.5">雇主(甲方)</label>
                    {contractPrefill?.customerName ? (
                      <Input 
                        value={contractFormData.customerName} 
                        onChange={e => setContractFormData(d => ({ ...d, customerName: e.target.value }))}
                        className="h-10" 
                      />
                    ) : (
                      <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-background">
                        <option>张女士 (138****1234)</option>
                        <option>李女士 (139****5678)</option>
                      </select>
                    )}
                  </div>

                  {/* 快速创建新客户 */}
                  {!contractPrefill?.customerName && (
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">快速创建新客户</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}

                  {/* 服务人员(乙方) */}
                  <div>
                    <label className="text-xs font-medium block mb-1.5">服务人员(乙方)</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-background">
                      <option>李春华 - 金牌月嫂</option>
                      <option>王阿姨 - 高级月嫂</option>
                    </select>
                  </div>

                  {/* 服务日期 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium block mb-1.5">服务开始日期</label>
                      <Input 
                        type="date" 
                        value={contractFormData.startDate} 
                        onChange={e => setContractFormData(d => ({ ...d, startDate: e.target.value }))}
                        className="h-10" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1.5">服务结束日期</label>
                      <Input 
                        type="date" 
                        value={contractFormData.endDate} 
                        onChange={e => setContractFormData(d => ({ ...d, endDate: e.target.value }))}
                        className="h-10" 
                      />
                    </div>
                  </div>

                  {/* 服务地址 */}
                  <div>
                    <label className="text-xs font-medium block mb-1.5">服务地址（选填）</label>
                    <Input 
                      placeholder="输入服务地址" 
                      value={contractFormData.address}
                      onChange={e => setContractFormData(d => ({ ...d, address: e.target.value }))}
                      className="h-10" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline" className="h-10" onClick={() => setCreateContractStep(1)}>上一步</Button>
                  <Button className="h-10 bg-primary" onClick={() => setCreateContractStep(3)}>下一步</Button>
                </div>
              </div>
            )}

            {/* Step 3: 确认合同内容 */}
            {createContractStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">确认合同内容</p>
                
                {/* 合同信息汇总 */}
                <Card className="border-t-4 border-t-primary">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">合同类型</span>
                      <span className="text-sm font-medium">月嫂服务合同</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">签约公司</span>
                      <span className="text-sm font-medium">银川优厚家庭服务有限公司</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">雇主</span>
                      <span className="text-sm font-medium">张女士</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">服务人员</span>
                      <span className="text-sm font-medium">李春华（金牌月嫂）</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">合同金额</span>
                      <span className="text-sm font-bold text-primary">¥111</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">服务周期</span>
                      <span className="text-sm font-medium">2026-03-29 至 2026-03-29</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline" className="h-10" onClick={() => setCreateContractStep(2)}>上一步</Button>
                  <Button className="h-10 bg-primary" onClick={() => setCreateContractStep(4)}>生成签署链接</Button>
                </div>
              </div>
            )}

            {/* Step 4: 生成签署链接 */}
            {createContractStep === 4 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">生成签署链接</p>
                
                {/* 合同签署链接已生成 */}
                <Card className="border border-blue-200 bg-blue-50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">合同签署链接已生成</p>
                    </div>
                    <p className="text-xs text-muted-foreground">合同编号 CT481153 · 关联订单 ORD481153</p>
                    <div className="flex items-center gap-2">
                      <Input value="https://sign.youhou.com/c/CT481153" readOnly className="flex-1 text-xs h-10" />
                      <Button size="sm" variant="outline" className="h-10 px-3 bg-transparent">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* 签约方人员确认 - 3方签署 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">签约方人员确认</p>
                    <Badge variant="outline" className="text-xs">共 3 方签署</Badge>
                  </div>
                  <div className="space-y-2">
                    {/* 甲方(雇主) */}
                    <Card className="border border-border">
                      <CardContent className="p-3 flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">张</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">张女士</p>
                          <p className="text-xs text-muted-foreground">甲方(雇主) · 138****1234</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-xs h-8">
                          <Copy className="w-3 h-3 mr-1" />复制链接
                        </Button>
                      </CardContent>
                    </Card>
                    {/* 乙方(服务人员) */}
                    <Card className="border border-border">
                      <CardContent className="p-3 flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">李</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">李春华</p>
                          <p className="text-xs text-muted-foreground">乙方(服务人员) · 金牌月嫂 · 139****5678</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-xs h-8">
                          <Copy className="w-3 h-3 mr-1" />复制链接
                        </Button>
                      </CardContent>
                    </Card>
                    {/* 丙方(公司) */}
                    <Card className="border border-border">
                      <CardContent className="p-3 flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">银川优厚家庭服务有限公司</p>
                          <p className="text-xs text-muted-foreground">丙方(公司) · 授权代表签署</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-xs h-8">
                          <Copy className="w-3 h-3 mr-1" />复制链接
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Button variant="outline" className="h-10" onClick={() => setCreateContractStep(3)}>上一步</Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 h-10" 
                      onClick={() => {
                        setShowCreateContract(false)
                        onCreateOrder?.({
                          customerName: contractFormData.customerName || '张女士',
                          serviceType: contractFormData.serviceType,
                          amount: contractFormData.amount,
                          startDate: contractFormData.startDate,
                          endDate: contractFormData.endDate,
                          caregiverName: '李春华',
                          contractId: `CT${Date.now().toString().slice(-6)}`,
                          orderId: contractFormData.orderId || '',
                        })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />创建订单
                    </Button>
                    <Button className="flex-1 h-10 bg-primary hover:bg-primary/90" onClick={() => setShowCreateContract(false)}>
                      创建合同
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
