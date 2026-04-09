"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileSignature,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PrivateOrderCreatePageProps {
  onBack: () => void
}

interface ServiceItem {
  id: string
  name: string
  type: "single" | "package"
  price: number
  sessions: number
}

const SERVICE_CATALOG: ServiceItem[] = [
  { id: "s1", name: "产后腹直肌修复", type: "single", price: 680, sessions: 1 },
  { id: "s2", name: "盆底肌康复训练", type: "single", price: 580, sessions: 1 },
  { id: "s3", name: "乳腺疏通护理", type: "single", price: 480, sessions: 1 },
  { id: "s4", name: "产后骨盆修复", type: "single", price: 780, sessions: 1 },
  { id: "s5", name: "产后全身调理", type: "single", price: 1200, sessions: 1 },
  { id: "p1", name: "产后修复基础套卡（10次）", type: "package", price: 5800, sessions: 10 },
  { id: "p2", name: "产后修复高级套卡（20次）", type: "package", price: 9800, sessions: 20 },
  { id: "p3", name: "盆底肌康复套卡（12次）", type: "package", price: 5600, sessions: 12 },
  { id: "p4", name: "产后全身调理套卡（8次）", type: "package", price: 8000, sessions: 8 },
]

const STEPS = ["客户信息", "服务选择", "付款信息", "确认发送"]

export function PrivateOrderCreatePage({ onBack }: PrivateOrderCreatePageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [expectedDate, setExpectedDate] = useState("")
  const [remark, setRemark] = useState("")
  const [selectedServices, setSelectedServices] = useState<{ item: ServiceItem; qty: number }[]>([])
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [installments, setInstallments] = useState("1")

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.item.price * s.qty, 0)
  const totalSessions = selectedServices.reduce((sum, s) => sum + s.item.sessions * s.qty, 0)

  const addService = (item: ServiceItem) => {
    const existing = selectedServices.find((s) => s.item.id === item.id)
    if (existing) {
      setSelectedServices(
        selectedServices.map((s) =>
          s.item.id === item.id ? { ...s, qty: s.qty + 1 } : s,
        ),
      )
    } else {
      setSelectedServices([...selectedServices, { item, qty: 1 }])
    }
  }

  const removeService = (itemId: string) => {
    const existing = selectedServices.find((s) => s.item.id === itemId)
    if (existing && existing.qty > 1) {
      setSelectedServices(
        selectedServices.map((s) =>
          s.item.id === itemId ? { ...s, qty: s.qty - 1 } : s,
        ),
      )
    } else {
      setSelectedServices(selectedServices.filter((s) => s.item.id !== itemId))
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return customerName.trim() && customerPhone.trim()
      case 1:
        return selectedServices.length > 0
      case 2:
        return true
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-teal-500 to-emerald-500 px-4 pb-3 pt-4 text-white safe-area-top">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">创建私有订单</h1>
        </div>

        {/* Steps */}
        <div className="mt-3 flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    idx < currentStep
                      ? "bg-white text-teal-600"
                      : idx === currentStep
                        ? "bg-white text-teal-600 ring-2 ring-white/50"
                        : "bg-white/30 text-white/80"
                  }`}
                >
                  {idx < currentStep ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                </div>
                <span className={`mt-1 text-[10px] ${idx <= currentStep ? "text-white" : "text-white/60"}`}>
                  {step}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`mx-1 h-px w-6 ${idx < currentStep ? "bg-white" : "bg-white/30"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Step 1: 客户信息 */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <Card className="border shadow-sm">
              <CardContent className="space-y-4 p-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    客户姓名 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="请输入客户姓名"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    联系电话 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="请输入手机号"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">服务地址</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="请输入客户地址"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">预计服务开始日期</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="date"
                      value={expectedDate}
                      onChange={(e) => setExpectedDate(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">备注</label>
                  <Textarea
                    placeholder="客户特殊需求、注意事项等..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: 服务选择 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {selectedServices.length > 0 && (
              <Card className="border border-teal-200 bg-teal-50/50 shadow-sm">
                <CardContent className="p-3">
                  <p className="mb-2 text-sm font-medium text-teal-700">已选服务</p>
                  <div className="space-y-1.5">
                    {selectedServices.map((s) => (
                      <div key={s.item.id} className="flex items-center justify-between text-sm">
                        <span className="text-teal-800">{s.item.name}</span>
                        <div className="flex items-center gap-2">
                          <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeService(s.item.id)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-5 text-center font-medium">{s.qty}</span>
                          <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => addService(s.item)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="ml-1 w-16 text-right font-bold text-teal-600">
                            ¥{(s.item.price * s.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between border-t border-teal-200 pt-2 text-sm font-bold text-teal-700">
                    <span>合计 ({totalSessions}次)</span>
                    <span>¥{totalAmount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">单次服务</p>
              <div className="space-y-2">
                {SERVICE_CATALOG.filter((s) => s.type === "single").map((item) => {
                  const selected = selectedServices.find((s) => s.item.id === item.id)
                  return (
                    <Card key={item.id} className={`border shadow-sm ${selected ? "border-teal-300 bg-teal-50/30" : ""}`}>
                      <CardContent className="flex items-center justify-between p-3">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">单次服务</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-teal-600">¥{item.price}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant={selected ? "secondary" : "default"}
                            className={`h-7 text-xs ${selected ? "" : "bg-teal-600 hover:bg-teal-700"}`}
                            onClick={() => addService(item)}
                          >
                            {selected ? `已选 x${selected.qty}` : "选择"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">套卡套餐</p>
              <div className="space-y-2">
                {SERVICE_CATALOG.filter((s) => s.type === "package").map((item) => {
                  const selected = selectedServices.find((s) => s.item.id === item.id)
                  return (
                    <Card key={item.id} className={`border shadow-sm ${selected ? "border-teal-300 bg-teal-50/30" : ""}`}>
                      <CardContent className="flex items-center justify-between p-3">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.sessions}次服务</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-teal-600">¥{item.price.toLocaleString()}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant={selected ? "secondary" : "default"}
                            className={`h-7 text-xs ${selected ? "" : "bg-teal-600 hover:bg-teal-700"}`}
                            onClick={() => addService(item)}
                          >
                            {selected ? `已选 x${selected.qty}` : "选择"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 付款信息 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="mb-4 text-center">
                  <p className="text-sm text-muted-foreground">订单总金额</p>
                  <p className="text-3xl font-bold text-teal-600">¥{totalAmount.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted-foreground">共 {totalSessions} 次服务</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">付款方式</label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wechat">微信支付</SelectItem>
                        <SelectItem value="alipay">支付宝</SelectItem>
                        <SelectItem value="bank">银行转账</SelectItem>
                        <SelectItem value="cash">现金</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">分期设置</label>
                    <Select value={installments} onValueChange={setInstallments}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">一次性付清</SelectItem>
                        <SelectItem value="2">分2期 (¥{Math.ceil(totalAmount / 2).toLocaleString()}/期)</SelectItem>
                        <SelectItem value="3">分3期 (¥{Math.ceil(totalAmount / 3).toLocaleString()}/期)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-amber-200 bg-amber-50 shadow-sm">
              <CardContent className="flex items-start gap-2 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-xs text-amber-700">
                  订单创建后将推送给客户确认，客户确认后可进行在线支付。线下付款需您在订单中手动更新付款状态。
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: 确认发送 */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <Card className="border shadow-sm">
              <CardContent className="space-y-3 p-4">
                <p className="text-sm font-medium">订单摘要</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">客户姓名</span>
                    <span>{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">联系电话</span>
                    <span>{customerPhone}</span>
                  </div>
                  {customerAddress && (
                    <div className="flex items-start justify-between">
                      <span className="text-muted-foreground">服务地址</span>
                      <span className="max-w-[60%] text-right">{customerAddress}</span>
                    </div>
                  )}
                  {expectedDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">预计开始</span>
                      <span>{expectedDate}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3">
                  <p className="mb-2 text-sm font-medium">服务项目</p>
                  {selectedServices.map((s) => (
                    <div key={s.item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {s.item.name} x{s.qty}
                      </span>
                      <span className="font-medium">¥{(s.item.price * s.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">付款方式</span>
                    <span>
                      {paymentMethod === "wechat" ? "微信支付" : paymentMethod === "alipay" ? "支付宝" : paymentMethod === "bank" ? "银行转账" : "现金"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">分期</span>
                    <span>{installments === "1" ? "一次性付清" : `分${installments}期`}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-bold">
                    <span>订单总额</span>
                    <span className="text-teal-600">¥{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {remark && (
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground">备注: {remark}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t bg-background p-4 safe-area-bottom">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              上一步
            </Button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <Button
              type="button"
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              disabled={!canProceed()}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              下一步
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                alert("订单已创建并推送给客户确认")
                onBack()
              }}
            >
              <FileSignature className="mr-1 h-4 w-4" />
              确认并发送
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
