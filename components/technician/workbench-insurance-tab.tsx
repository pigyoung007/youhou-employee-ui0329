"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Calendar,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  ShoppingCart,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface InsuranceItem {
  id: string
  policyNo: string
  productName: string
  insurer: string
  coverage: string
  premium: number
  startDate: string
  endDate: string
  status: "active" | "expiring" | "expired" | "none"
}

interface InsuranceProduct {
  id: string
  name: string
  insurer: string
  coverage: string
  premium: number
  period: string
  features: string[]
}

const STATUS_MAP: Record<string, { label: string; icon: typeof Shield; className: string; iconClass: string }> = {
  active: { label: "保障中", icon: ShieldCheck, className: "bg-green-100 text-green-700", iconClass: "text-green-600" },
  expiring: { label: "即将到期", icon: ShieldAlert, className: "bg-amber-100 text-amber-700", iconClass: "text-amber-600" },
  expired: { label: "已过期", icon: ShieldX, className: "bg-red-100 text-red-600", iconClass: "text-red-500" },
  none: { label: "未购买", icon: Shield, className: "bg-gray-100 text-gray-500", iconClass: "text-gray-400" },
}

export function WorkbenchInsuranceTab() {
  const [showDetail, setShowDetail] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceItem | null>(null)

  const myInsurance: InsuranceItem[] = [
    {
      id: "1",
      policyNo: "BX-2026-088001",
      productName: "家政服务综合责任险",
      insurer: "中国人保财险",
      coverage: "服务过程中意外伤害、第三方财产损失、医疗费用",
      premium: 680,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      status: "active",
    },
    {
      id: "2",
      policyNo: "BX-2026-088002",
      productName: "人身意外伤害险",
      insurer: "平安财险",
      coverage: "意外身故/残疾、意外医疗、住院津贴",
      premium: 360,
      startDate: "2026-03-15",
      endDate: "2026-06-14",
      status: "expiring",
    },
    {
      id: "3",
      policyNo: "BX-2025-088003",
      productName: "职业责任险",
      insurer: "太平洋保险",
      coverage: "因操作不当导致的客户人身损害赔偿",
      premium: 520,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "expired",
    },
  ]

  const products: InsuranceProduct[] = [
    {
      id: "p1",
      name: "家政服务综合责任险",
      insurer: "中国人保财险",
      coverage: "服务过程中的意外伤害与第三方财产损失",
      premium: 680,
      period: "1年",
      features: ["最高赔付50万", "含医疗费用", "含财产损失", "全国理赔"],
    },
    {
      id: "p2",
      name: "人身意外伤害险",
      insurer: "平安财险",
      coverage: "意外身故/残疾、意外医疗、住院津贴",
      premium: 360,
      period: "3个月",
      features: ["意外身故20万", "医疗费5万", "住院津贴100/天"],
    },
    {
      id: "p3",
      name: "职业责任险",
      insurer: "太平洋保险",
      coverage: "因专业操作导致客户损害的赔偿责任",
      premium: 520,
      period: "1年",
      features: ["最高赔付30万", "含法律费用", "含鉴定费用"],
    },
  ]

  const activeCount = myInsurance.filter((i) => i.status === "active").length
  const expiringCount = myInsurance.filter((i) => i.status === "expiring").length

  return (
    <div className="space-y-3">
      <Card className="border border-border/80 shadow-sm">
        <CardContent className="p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <ShieldCheck className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-lg font-bold text-foreground">{activeCount}</p>
              <p className="text-[10px] text-muted-foreground">保障中</p>
            </div>
            <div>
              <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-lg font-bold text-foreground">{expiringCount}</p>
              <p className="text-[10px] text-muted-foreground">即将到期</p>
            </div>
            <div>
              <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-teal-100">
                <ShoppingCart className="h-4 w-4 text-teal-600" />
              </div>
              <Button
                type="button"
                variant="ghost"
                className="h-auto p-0 text-lg font-bold text-teal-600 hover:text-teal-700"
                onClick={() => setShowProducts(true)}
              >
                购买
              </Button>
              <p className="text-[10px] text-muted-foreground">投保</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {expiringCount > 0 && (
        <Card className="border border-amber-200 bg-amber-50 shadow-sm">
          <CardContent className="flex items-center gap-2 p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-xs text-amber-700">
              您有 {expiringCount} 份保险即将到期，请及时续保以确保服务保障不中断
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">我的保单</p>
        {myInsurance.map((item) => {
          const statusInfo = STATUS_MAP[item.status]
          const StatusIcon = statusInfo.icon
          return (
            <Card key={item.id} className="border border-border/80 shadow-sm">
              <CardContent className="p-3">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.status === "active" ? "bg-green-100" : item.status === "expiring" ? "bg-amber-100" : "bg-gray-100"}`}>
                      <StatusIcon className={`h-4 w-4 ${statusInfo.iconClass}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">{item.insurer}</p>
                    </div>
                  </div>
                  <Badge className={`${statusInfo.className} text-[10px]`}>
                    {statusInfo.label}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3" />
                    <span>保单号: {item.policyNo}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>{item.startDate} ~ {item.endDate}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-teal-600">¥{item.premium}/期</span>
                  <div className="flex gap-1.5">
                    {item.status === "expiring" && (
                      <Button type="button" size="sm" className="h-7 bg-amber-500 text-xs hover:bg-amber-600">
                        续保
                      </Button>
                    )}
                    {item.status === "expired" && (
                      <Button type="button" size="sm" className="h-7 bg-teal-600 text-xs hover:bg-teal-700">
                        重新投保
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground"
                      onClick={() => {
                        setSelectedInsurance(item)
                        setShowDetail(true)
                      }}
                    >
                      详情
                      <ChevronRight className="ml-0.5 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>保单详情</DialogTitle>
          </DialogHeader>
          {selectedInsurance && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedInsurance.productName}</h4>
                    <Badge className={STATUS_MAP[selectedInsurance.status].className}>
                      {STATUS_MAP[selectedInsurance.status].label}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedInsurance.insurer}</p>
                </div>

                <Card className="border">
                  <CardContent className="space-y-2 p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">保单号</span>
                      <span>{selectedInsurance.policyNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">保险费</span>
                      <span className="font-medium text-teal-600">¥{selectedInsurance.premium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">生效日期</span>
                      <span>{selectedInsurance.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">到期日期</span>
                      <span>{selectedInsurance.endDate}</span>
                    </div>
                    <div className="border-t pt-2">
                      <span className="text-muted-foreground">保障范围</span>
                      <p className="mt-1 text-sm">{selectedInsurance.coverage}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showProducts} onOpenChange={setShowProducts}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>保险产品</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3">
              {products.map((product) => (
                <Card key={product.id} className="border">
                  <CardContent className="p-3">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.insurer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-teal-600">¥{product.premium}</p>
                        <p className="text-[10px] text-muted-foreground">/{product.period}</p>
                      </div>
                    </div>
                    <p className="mb-2 text-xs text-muted-foreground">{product.coverage}</p>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {product.features.map((f, i) => (
                        <Badge key={i} variant="secondary" className="bg-teal-50 text-[10px] text-teal-600">
                          {f}
                        </Badge>
                      ))}
                    </div>
                    <Button type="button" className="h-8 w-full bg-teal-600 text-xs hover:bg-teal-700">
                      立即投保
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
