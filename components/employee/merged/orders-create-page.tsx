'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  ChevronLeft, Plus, X, ChevronDown, AlertCircle, Check, Edit3, Upload, 
  MessageCircle, Phone, FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrderFormData {
  // Part 1: 基本信息
  customer: string
  serviceType: 'nanny' | 'caregiver' | 'postnatal' | 'training'
  startDate: string
  endDate: string
  isReferral: boolean
  referrerName: string
  remarks: string

  // Part 2: 产品信息
  products: Array<{
    id: string
    name: string
    unitPrice: number
    quantity: number
  }>

  // Part 3: 收费信息
  totalAmount: number
  paymentType: 'full' | 'installment'
  firstPayment: number
  installments: Array<{
    period: number
    amount: number
    dueDate: string
  }>
  otherFees: number

  // Part 4: 协议信息
  contractNo: string
  contractType: string
  signDate: string
  specialTerms: string
}

export interface OrderPrefillData {
  customerName?: string
  serviceType?: string
  amount?: number
  startDate?: string
  endDate?: string
  caregiverName?: string
  contractId?: string
  orderId?: string
  fromContract?: boolean // 标识是否来自合同管理
}

export interface OrderToContractData {
  customerName: string
  serviceType: string
  amount: number
  startDate: string
  endDate: string
  orderId: string
}

interface OrderCreatePageProps {
  onBack: () => void
  orderType?: 'service' | 'training' // 'service' for 母婴顾问, 'training' for 职业顾问
  prefillData?: OrderPrefillData
  onOpenContract?: (data: OrderToContractData) => void
}

// 账单项接口
interface BillItem {
  id: string
  period: number
  amount: number
  plannedDate: string
  paidDate: string
  status: 'paid' | 'pending' | 'overdue'
}

export function OrderCreatePage({ onBack, orderType = 'service', prefillData, onOpenContract }: OrderCreatePageProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [formData, setFormData] = useState<OrderFormData>({
    customer: prefillData?.customerName ?? '',
    serviceType: 'nanny',
    startDate: prefillData?.startDate ?? '',
    endDate: prefillData?.endDate ?? '',
    isReferral: false,
    referrerName: '',
    remarks: '',
    products: [],
    totalAmount: prefillData?.amount ?? 0,
    paymentType: 'full',
    firstPayment: 0,
    installments: [],
    otherFees: 0,
    contractNo: prefillData?.contractId ?? '',
    contractType: prefillData?.serviceType ?? '',
    signDate: '',
    specialTerms: '',
  })

  // 账单列表状态
  const [bills, setBills] = useState<BillItem[]>([
    { id: '1', period: 1, amount: 0, plannedDate: '2026-04-28', paidDate: '2026-03-29', status: 'paid' }
  ])

  // 添加账单
  const handleAddBill = () => {
    const newPeriod = bills.length + 1
    const newBill: BillItem = {
      id: String(Date.now()),
      period: newPeriod,
      amount: 0,
      plannedDate: '',
      paidDate: '',
      status: 'pending'
    }
    setBills([...bills, newBill])
  }

  // 删除账单
  const handleRemoveBill = (id: string) => {
    if (bills.length > 1) {
      setBills(bills.filter(b => b.id !== id).map((b, i) => ({ ...b, period: i + 1 })))
    }
  }

  // 更新账单
  const handleUpdateBill = (id: string, updates: Partial<BillItem>) => {
    setBills(bills.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  // 提交订单
  const handleSubmit = () => {
    // 如果来自合同管理，直接返回不弹出新建合同
    if (prefillData?.fromContract) {
      alert('订单创建成功！')
      onBack()
      return
    }
    // 否则跳转到新建合同
    const orderId = `ORD${Date.now().toString().slice(-6)}`
    onOpenContract?.({
      customerName: formData.customer,
      serviceType: formData.contractType || '月嫂服务',
      amount: formData.totalAmount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      orderId,
    })
  }

  // 模拟数据
  const mockCustomers = ['张女士', '李女士', '王女士', '赵女士']
  const mockProducts = {
    nanny: [
      { id: 'p1', name: '月嫂服务（26天）', price: 6800 },
      { id: 'p2', name: '金牌月嫂（26天）', price: 8800 },
      { id: 'p3', name: '产后恢复护理', price: 2800 },
    ],
    caregiver: [
      { id: 'p4', name: '育婴师服务（月）', price: 5000 },
      { id: 'p5', name: '全职育婴师', price: 8000 },
    ],
    postnatal: [
      { id: 'p6', name: '产后修复套餐', price: 3800 },
      { id: 'p7', name: '骨盆修复课程', price: 2800 },
    ],
    training: [
      { id: 'p8', name: '月嫂培训课程', price: 3980 },
      { id: 'p9', name: '育婴师资格认证', price: 4980 },
    ],
  }

  const serviceTypeLabels = {
    nanny: '月嫂服务',
    caregiver: '育婴师服务',
    postnatal: '产康服务',
    training: '培训课程',
  }

  const calculateTotalAmount = () => {
    return formData.products.reduce((sum, p) => sum + (p.unitPrice * p.quantity), 0) + formData.otherFees
  }



  const handleUpdateStep1 = (data: Partial<OrderFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
      totalAmount: calculateTotalAmount(),
    }))
  }

  const handleAddProduct = (product: any) => {
    const newProduct = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: 1,
    }
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, newProduct],
    }))
  }

  const handleRemoveProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId),
    }))
  }

  const handleUpdateProduct = (productId: string, updates: Partial<typeof formData.products[0]>) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(p =>
        p.id === productId ? { ...p, ...updates } : p
      ),
    }))
  }

  const availableProducts = mockProducts[formData.serviceType] || []
  const totalAmount = calculateTotalAmount()

  const stepTitles = orderType === 'training'
    ? ['学员信息', '课程选择', '付款信息', '协议签约']
    : ['客户信息', '服务选择', '付款信息', '协议签约']
  const stepDescriptions = orderType === 'training'
    ? ['学员、电话、身份证', '选择培训课程、套餐', '配置支付计划', '协议类型、签署']
    : ['家庭住址、母婴顾问', '选择服务项目', '配置支付计划、额外费用', '服务协议、线下合同上传']

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
              <h1 className="font-semibold text-base">创建订单</h1>
              <p className="text-[11px] text-muted-foreground">{stepTitles[currentStep - 1]}</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-3 py-2 border-t border-border">
          <div className="flex items-center justify-between gap-1">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step as 1 | 2 | 3 | 4)}
                className="flex-1 text-center"
              >
                <div className={cn(
                  'w-full py-2 rounded-lg text-[11px] font-medium transition-all',
                  step <= currentStep
                    ? 'bg-primary/20 text-primary border border-primary'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {step}
                </div>
                <p className="text-[9px] text-muted-foreground mt-1">{stepTitles[step - 1]}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-3 py-4 space-y-4">
        {/* 来源合同提示 */}
        {prefillData?.contractId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-medium">来自合同 {prefillData.contractId}</p>
              <p className="text-[10px] text-muted-foreground">已自动填入合同相关信息，请核对后继续</p>
            </div>
          </div>
        )}

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                {orderType === 'training' ? (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">学员姓名*</label>
                      <Input placeholder="请输入学员姓名" className="h-9" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">联系电话*</label>
                      <Input placeholder="请输入联系电话" className="h-9" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">身份证号*</label>
                      <Input placeholder="用于办理证书" className="h-9" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">学员来源</label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer">
                          <option>选择来源</option>
                          <option>线上咨询</option>
                          <option>亲友介绍</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">家庭住址</label>
                      <Input placeholder="请输入家庭住址" className="h-9" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">招生顾问*</label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer">
                          <option>选择顾问</option>
                          <option>张老师</option>
                          <option>李老师</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">客户姓名*</label>
                      <Input
                        placeholder="请输入客户姓名"
                        className="h-9"
                        defaultValue={prefillData?.customerName ?? ''}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">家庭住址</label>
                      <Input placeholder="请输入家庭住址" className="h-9" />
                    </div>
                    {prefillData?.caregiverName && (
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">服务人员</label>
                        <Input className="h-9 bg-muted/50" defaultValue={prefillData.caregiverName} readOnly />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">母婴顾问</label>
                        <div className="relative">
                          <select className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer">
                            <option>选择顾问</option>
                            <option>王阿姨</option>
                            <option>张阿姨</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">招生顾问*</label>
                        <div className="relative">
                          <select className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background appearance-none cursor-pointer">
                            <option>选择顾问</option>
                            <option>李顾问</option>
                            <option>王顾问</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">预产期时间</label>
                        <Input type="date" className="h-9" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">要求上户时间*</label>
                        <Input type="date" className="h-9" defaultValue={prefillData?.startDate ?? ''} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">特殊要求</label>
                      <textarea placeholder="如有特殊要求，请详细描述..." className="w-full border rounded-lg p-2 text-sm h-16 resize-none" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={onBack}>
                取消
              </Button>
              <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCurrentStep(2)}>
                下一步
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Products/Courses */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {orderType === 'training' ? (
              <>
                {/* 已报课程提示 */}
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-800">该学员已报/已学课程：高级月嫂培训（2024年）</p>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-foreground">可选课程</p>
                    {/* 课程表格 */}
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 gap-1 bg-muted/50 px-2 py-2 text-[10px] font-semibold text-muted-foreground">
                        <div className="col-span-4">课程名称</div>
                        <div className="col-span-2 text-center">费用</div>
                        <div className="col-span-3 text-center">优惠选择</div>
                        <div className="col-span-1 text-center">证书</div>
                        <div className="col-span-2 text-center">选择</div>
                      </div>
                      {[
                        { name: '育婴师初级', price: 2000 },
                        { name: '育婴师中级', price: 2500 },
                        { name: '育婴师高级', price: 3200 },
                        { name: '月嫂初级', price: 2800 },
                        { name: '月嫂高级', price: 3800 },
                        { name: '催乳师', price: 2000 },
                      ].map((course, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-1 px-2 py-2.5 border-t border-border items-center">
                          <div className="col-span-4 text-xs">{course.name}</div>
                          <div className="col-span-2 text-xs text-center text-primary font-medium">¥{course.price}</div>
                          <div className="col-span-3">
                            <select className="w-full text-[10px] px-1 py-1 border border-input rounded bg-background">
                              <option>9折</option>
                              <option>9.5折</option>
                              <option>不优惠</option>
                            </select>
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                          </div>
                          <div className="col-span-2 flex justify-center">
                            <Button size="sm" className="h-6 text-[10px] px-2 bg-primary hover:bg-primary/90 text-white">
                              选择
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">合报折扣：1-2科不打折；3-4科9.5折；5科9折减500；6科9折减600；7科9折减800</p>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(1)}>
                    上一步
                  </Button>
                  <Button variant="outline" className="h-10 px-6 bg-transparent">
                    保存草稿
                  </Button>
                  <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCurrentStep(3)}>
                    下一步
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-foreground mb-2">选择服务项目*</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableProducts.map((product) => {
                          const isSelected = formData.products.some(p => p.id === product.id)
                          return (
                            <button
                              key={product.id}
                              onClick={() => !isSelected && handleAddProduct(product)}
                              disabled={isSelected}
                              className={cn(
                                'p-2 text-xs border rounded-lg text-left transition-all',
                                isSelected
                                  ? 'border-primary bg-primary/10 opacity-50 cursor-not-allowed'
                                  : 'border-border hover:border-primary hover:bg-primary/5'
                              )}
                            >
                              <p className="font-medium">{product.name}</p>
                              <p className="text-primary font-semibold">¥{product.price}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {formData.products.length === 0 ? (
                      <div className="text-center py-4">
                        <AlertCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">请选择至少一个服务项目</p>
                      </div>
                    ) : (
                      <div className="space-y-2 border-t border-border pt-3">
                        {formData.products.map((product) => (
                          <div key={product.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground">{product.name}</p>
                              <p className="text-[10px] text-muted-foreground">¥{product.unitPrice}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="1"
                                max="99"
                                value={product.quantity}
                                onChange={(e) => handleUpdateProduct(product.id, { quantity: parseInt(e.target.value) || 1 })}
                                className="w-12 px-2 py-1 text-xs border border-input rounded bg-background text-center"
                              />
                              <button
                                onClick={() => handleRemoveProduct(product.id)}
                                className="p-1 hover:bg-destructive/10 rounded text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-between pt-2 border-t border-border">
                          <p className="text-xs font-semibold text-foreground">产品合计</p>
                          <p className="text-sm font-bold text-primary">¥{formData.products.reduce((sum, p) => sum + (p.unitPrice * p.quantity), 0)}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={() => setCurrentStep(1)}>
                    上一步
                  </Button>
                  <Button
                    className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setCurrentStep(3)}
                    disabled={formData.products.length === 0}
                  >
                    下一步
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="space-y-4">
            {orderType === 'training' ? (
              <>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {/* 付款账单标题 */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-primary">付款账单</p>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent" onClick={handleAddBill}>
                        <Plus className="w-3 h-3 mr-1" />添加账单
                      </Button>
                    </div>

                    {/* 金额统计 */}
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-[10px] text-muted-foreground">订单总额</p>
                          <p className="text-sm font-bold text-primary">¥{bills.reduce((sum, b) => sum + b.amount, 0)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">已付金额</p>
                          <p className="text-sm font-bold text-green-600">¥{bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">待付金额</p>
                          <p className="text-sm font-bold text-red-500">¥{bills.filter(b => b.status !== 'paid').reduce((sum, b) => sum + b.amount, 0)}</p>
                        </div>
                      </div>
                    </div>

                    {/* 账单明细列表 */}
                    {bills.map((bill) => (
                      <div key={bill.id} className="border border-border rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-muted text-muted-foreground text-[10px]">第 {bill.period} 期</Badge>
                          <div className="flex items-center gap-2">
                            <select 
                              className={cn(
                                "text-[10px] px-2 py-1 rounded border-0",
                                bill.status === 'paid' ? "bg-green-100 text-green-700" : 
                                bill.status === 'overdue' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                              )}
                              value={bill.status}
                              onChange={(e) => handleUpdateBill(bill.id, { status: e.target.value as BillItem['status'] })}
                            >
                              <option value="paid">已付款</option>
                              <option value="pending">待付款</option>
                              <option value="overdue">逾期</option>
                            </select>
                            <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 bg-transparent">
                              <Upload className="w-3 h-3 mr-1" />凭证
                            </Button>
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleRemoveBill(bill.id)}>
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-12">金额:</span>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              className="h-8 text-xs flex-1" 
                              value={bill.amount} 
                              onChange={(e) => handleUpdateBill(bill.id, { amount: Number(e.target.value) })}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-12">计划日期:</span>
                            <Input 
                              type="date" 
                              className="h-8 text-xs flex-1" 
                              value={bill.plannedDate}
                              onChange={(e) => handleUpdateBill(bill.id, { plannedDate: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-12">付款日期:</span>
                            <Input 
                              type="date" 
                              className="h-8 text-xs flex-1" 
                              value={bill.paidDate}
                              onChange={(e) => handleUpdateBill(bill.id, { paidDate: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(2)}>
                    上一步
                  </Button>
                  <Button variant="outline" className="h-10 px-6 bg-transparent">
                    保存草稿
                  </Button>
                  <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCurrentStep(4)}>
                    下一步
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {/* 支付方式选择 */}
                    <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="paymentType" 
                          checked={formData.paymentType === 'full'}
                          onChange={() => handleUpdateStep1({ paymentType: 'full' })}
                          className="w-4 h-4" 
                        />
                        <span className="text-xs">全款支付</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="paymentType" 
                          checked={formData.paymentType === 'installment'}
                          onChange={() => handleUpdateStep1({ paymentType: 'installment' })}
                          className="w-4 h-4" 
                        />
                        <span className="text-xs">分期付款 (预付10% + 定金20% + 尾款70%)</span>
                      </label>
                    </div>

                    {/* 付款账单标题 */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-primary">付款账单</p>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent" onClick={handleAddBill}>
                        <Plus className="w-3 h-3 mr-1" />添加账单
                      </Button>
                    </div>

                    {/* 金额统计 */}
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-[10px] text-muted-foreground">订单总额</p>
                          <p className="text-sm font-bold text-primary">¥{bills.reduce((sum, b) => sum + b.amount, 0)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">已付金额</p>
                          <p className="text-sm font-bold text-green-600">¥{bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">待付金额</p>
                          <p className="text-sm font-bold text-red-500">¥{bills.filter(b => b.status !== 'paid').reduce((sum, b) => sum + b.amount, 0)}</p>
                        </div>
                      </div>
                    </div>

                    {/* 账单明细列表 */}
                    {bills.map((bill) => (
                      <div key={bill.id} className="border border-border rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-muted text-muted-foreground text-[10px]">第 {bill.period} 期</Badge>
                          <div className="flex items-center gap-2">
                            <select 
                              className={cn(
                                "text-[10px] px-2 py-1 rounded border-0",
                                bill.status === 'paid' ? "bg-green-100 text-green-700" : 
                                bill.status === 'overdue' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                              )}
                              value={bill.status}
                              onChange={(e) => handleUpdateBill(bill.id, { status: e.target.value as BillItem['status'] })}
                            >
                              <option value="paid">已付款</option>
                              <option value="pending">待付款</option>
                              <option value="overdue">逾期</option>
                            </select>
                            <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 bg-transparent">
                              <Upload className="w-3 h-3 mr-1" />凭证
                            </Button>
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleRemoveBill(bill.id)}>
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-14">金额:</span>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              className="h-8 text-xs flex-1" 
                              value={bill.amount}
                              onChange={(e) => handleUpdateBill(bill.id, { amount: Number(e.target.value) })}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-14">付款日期:</span>
                            <Input 
                              type="date" 
                              className="h-8 text-xs flex-1" 
                              value={bill.plannedDate}
                              onChange={(e) => handleUpdateBill(bill.id, { plannedDate: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(2)}>
                    上一步
                  </Button>
                  <Button variant="outline" className="h-10 px-6 bg-transparent">
                    保存草稿
                  </Button>
                  <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCurrentStep(4)}>
                    下一步
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: 协议签约 */}
        {currentStep === 4 && (
          <div className="space-y-4">
            {orderType === 'training' ? (
              <>
                {/* 协议类型选择 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold">协议类型</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1 p-3 border-2 border-primary bg-primary/5 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="radio" name="contractType" defaultChecked className="w-4 h-4" />
                          <span className="text-sm font-medium">培训服务协议</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground pl-6">包含培训内容、课程安排、费用说明、退费规则</p>
                      </label>
                      <label className="flex flex-col gap-1 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <input type="radio" name="contractType" className="w-4 h-4" />
                          <span className="text-sm font-medium">就业班（套餐）协议</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground pl-6">包含就业指导、证书颁发、岗位安置承诺</p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* 合同编号 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm font-semibold">合同编号</p>
                    <Input placeholder="系统自动生成或手动输入" className="h-10" />
                  </CardContent>
                </Card>

                {/* 协议确认 */}
                <label className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-xs text-foreground">我已阅读并同意以上协议条款</span>
                </label>

                {/* 报名信息汇总 */}
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold text-primary">报名信息汇总</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">学员姓名</span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">联系电话</span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">身份证号</span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">职业顾问</span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">报名课程</span>
                        <span className="font-medium">0 门课程</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-green-200">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">订单总额</span>
                        <span className="font-bold text-primary">¥0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">优惠减免</span>
                        <span className="font-bold text-red-500">-¥0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">证书数量</span>
                        <span className="font-medium">0 本</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">订单实付</span>
                        <span className="font-bold text-green-600">¥0</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-100 rounded text-[10px] text-green-700">
                      <Check className="w-3.5 h-3.5" />
                      包含 0 本结业证书颁发
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(3)}>
                    上一步
                  </Button>
                  <Button variant="outline" className="h-10 px-6 bg-transparent">
                    保存草稿
                  </Button>
                  <Button className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit}>
                    <Check className="w-4 h-4 mr-1.5" />
                    提交订单
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* 合同与协议 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">合同与协议</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">服务协议</p>
                        <p className="text-xs text-muted-foreground">包含服务内容、费用、权利义务等</p>
                      </div>
                      <select className="text-xs px-3 py-1.5 bg-background border border-border rounded">
                        <option>待签署</option>
                        <option>已签署</option>
                        <option>已过期</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* 线下合同上传 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">线下合同上传</p>
                    </div>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:bg-primary/5 cursor-pointer transition-colors">
                      <p className="text-sm text-primary font-medium">点击或拖拽上传合同</p>
                      <p className="text-xs text-muted-foreground mt-1">支持PDF、JPG、PNG等格式</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">已上传: 1份合同</Badge>
                  </CardContent>
                </Card>

                {/* 成交方式 */}
                <Card className="border border-amber-200 bg-amber-50">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold text-primary">成交方式</p>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex items-center justify-center gap-2 p-3 border border-border bg-white rounded-lg cursor-pointer hover:bg-amber-100">
                        <input type="radio" name="dealType" className="w-4 h-4" />
                        <span className="text-xs">月嫂见面会</span>
                      </label>
                      <label className="flex items-center justify-center gap-2 p-3 border border-border bg-white rounded-lg cursor-pointer hover:bg-amber-100">
                        <input type="radio" name="dealType" className="w-4 h-4" />
                        <span className="text-xs">线上成交</span>
                      </label>
                      <label className="flex items-center justify-center gap-2 p-3 border border-border bg-white rounded-lg cursor-pointer hover:bg-amber-100">
                        <input type="radio" name="dealType" className="w-4 h-4" />
                        <span className="text-xs">线下成交</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* 合同签署链接 */}
                <Card className="border border-blue-200 bg-blue-50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">合同签署链接已生成</p>
                    </div>
                    <p className="text-xs text-muted-foreground">合同编号 CT996064 · 关联订单 ORD996064</p>
                    <div className="flex items-center gap-2">
                      <Input value="https://sign.youhou.com/c/CT996064" readOnly className="flex-1 text-xs h-9" />
                      <Button size="sm" variant="outline" className="h-9 px-2.5 bg-transparent">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* 签约方确认 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">签约方人员确认</p>
                    <Badge variant="outline" className="text-[10px]">共 2 方签署</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2.5 border border-border rounded-lg">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <div className="w-8 h-8 bg-muted rounded-full" />
                      <p className="text-xs flex-1">甲方(雇主) ·</p>
                      <button className="text-xs text-primary flex items-center gap-1">
                        <FileText className="w-3 h-3" />复制链接
                      </button>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 border border-border rounded-lg">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">银川优厚家庭服务有限公司</p>
                        <p className="text-[10px] text-muted-foreground">丙方(公司) · 授权代表签署</p>
                      </div>
                      <button className="text-xs text-primary flex items-center gap-1">
                        <FileText className="w-3 h-3" />复制链接
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" className="h-10 px-4 bg-transparent" onClick={() => setCurrentStep(3)}>
                    上一步
                  </Button>
                  <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-white" onClick={handleSubmit}>
                    确认发送并创建合同 (2)
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
