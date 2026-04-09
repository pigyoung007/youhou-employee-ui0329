"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronLeft, User, Phone, MapPin, Calendar, DollarSign,
  FileText, CheckCircle2, Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"

const serviceTypes = [
  { id: "yuesao", label: "月嫂服务", icon: "👶" },
  { id: "yuyingshi", label: "育婴师服务", icon: "🎒" },
  { id: "chanhou", label: "产后修复", icon: "🌸" },
  { id: "baomu", label: "保姆服务", icon: "🏠" },
  { id: "huli", label: "护理服务", icon: "💊" },
]

interface PrivateOrderCreateProps {
  onBack: () => void
  onCreated?: () => void
}

export function PrivateOrderCreate({ onBack, onCreated }: PrivateOrderCreateProps) {
  const [step, setStep] = useState(1)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    serviceType: "",
    startDate: "",
    endDate: "",
    totalAmount: "",
    depositAmount: "",
    remark: "",
  })

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const canNext = step === 1
    ? form.customerName && form.customerPhone
    : step === 2
    ? form.serviceType && form.startDate && form.endDate
    : form.totalAmount

  const handleSubmit = () => {
    setShowConfirm(false)
    alert("私有订单创建成功！")
    onCreated?.()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">新建私有订单</h1>
      </div>

      {/* Step Indicator */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "客户信息" },
            { num: 2, label: "服务信息" },
            { num: 3, label: "费用信息" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= s.num ? "bg-rose-500 text-white" : "bg-gray-200 text-gray-500"
                )}>
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span className="text-[10px] mt-1 text-muted-foreground">{s.label}</span>
              </div>
              {i < 2 && (
                <div className={cn(
                  "w-16 h-0.5 mx-1 mt-[-12px]",
                  step > s.num ? "bg-rose-500" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4 pb-24">
        {/* Step 1: Customer Info */}
        {step === 1 && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-rose-500" />
                客户信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs">客户姓名 *</Label>
                <Input
                  placeholder="请输入客户姓名"
                  value={form.customerName}
                  onChange={(e) => updateForm("customerName", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">联系电话 *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="请输入联系电话"
                    value={form.customerPhone}
                    onChange={(e) => updateForm("customerPhone", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">服务地址</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="请输入服务地址"
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Service Info */}
        {step === 2 && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-rose-500" />
                服务信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">服务类型 *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {serviceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updateForm("serviceType", type.id)}
                      className={cn(
                        "p-3 rounded-xl border text-center transition-all",
                        form.serviceType === type.id
                          ? "border-rose-300 bg-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <p className="text-xs mt-1 font-medium">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">开始日期 *</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateForm("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs">结束日期 *</Label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => updateForm("endDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Fee Info */}
        {step === 3 && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-rose-500" />
                费用信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs">服务总金额（元）*</Label>
                <Input
                  type="number"
                  placeholder="请输入服务总金额"
                  value={form.totalAmount}
                  onChange={(e) => updateForm("totalAmount", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">定金金额（元）</Label>
                <Input
                  type="number"
                  placeholder="请输入定金金额"
                  value={form.depositAmount}
                  onChange={(e) => updateForm("depositAmount", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">备注</Label>
                <Textarea
                  placeholder="请输入备注说明..."
                  value={form.remark}
                  onChange={(e) => updateForm("remark", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-border px-4 py-3 flex gap-3 z-10">
        {step > 1 && (
          <Button variant="outline" className="flex-1 h-10" onClick={() => setStep(step - 1)}>
            上一步
          </Button>
        )}
        {step < 3 ? (
          <Button
            className="flex-1 h-10 bg-rose-500 hover:bg-rose-600"
            disabled={!canNext}
            onClick={() => setStep(step + 1)}
          >
            下一步
          </Button>
        ) : (
          <Button
            className="flex-1 h-10 bg-rose-500 hover:bg-rose-600"
            disabled={!canNext}
            onClick={() => setShowConfirm(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            提交订单
          </Button>
        )}
      </div>

      {/* Confirm Sheet */}
      <Sheet open={showConfirm} onOpenChange={setShowConfirm}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">确认订单信息</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">客户</span>
              <span className="text-sm font-medium">{form.customerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">电话</span>
              <span className="text-sm">{form.customerPhone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">服务类型</span>
              <span className="text-sm">{serviceTypes.find((t) => t.id === form.serviceType)?.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">服务周期</span>
              <span className="text-sm">{form.startDate} 至 {form.endDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总金额</span>
              <span className="text-sm font-bold text-rose-600">¥{Number(form.totalAmount).toLocaleString()}</span>
            </div>
            <Button className="w-full h-10 mt-4 bg-rose-500 hover:bg-rose-600" onClick={handleSubmit}>
              确认提交
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
