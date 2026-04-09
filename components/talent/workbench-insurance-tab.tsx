"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Shield, ShieldCheck, ShieldAlert, ShieldX, Clock,
  ChevronRight, ShoppingCart, FileText, AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type InsuranceStatus = "active" | "expiring" | "expired" | "none"

interface InsurancePolicy {
  id: string
  productName: string
  insurer: string
  coverage: number
  premium: number
  startDate: string
  endDate: string
  status: InsuranceStatus
  policyNo: string
}

interface InsuranceProduct {
  id: string
  name: string
  insurer: string
  coverage: number
  premium: number
  period: string
  features: string[]
}

const statusConfig: Record<InsuranceStatus, { label: string; color: string; icon: typeof ShieldCheck }> = {
  active: { label: "有效", color: "bg-green-50 text-green-600", icon: ShieldCheck },
  expiring: { label: "即将到期", color: "bg-amber-50 text-amber-600", icon: ShieldAlert },
  expired: { label: "已过期", color: "bg-gray-50 text-gray-600", icon: ShieldX },
  none: { label: "未投保", color: "bg-red-50 text-red-600", icon: ShieldX },
}

const myPolicies: InsurancePolicy[] = [
  {
    id: "INS001", productName: "家政人员意外险", insurer: "中国人保",
    coverage: 500000, premium: 380, startDate: "2026-01-15", endDate: "2027-01-14",
    status: "active", policyNo: "PICC-2026-001234",
  },
  {
    id: "INS002", productName: "家政人员责任险", insurer: "平安保险",
    coverage: 200000, premium: 260, startDate: "2026-02-01", endDate: "2026-05-01",
    status: "expiring", policyNo: "PING-2026-005678",
  },
]

const availableProducts: InsuranceProduct[] = [
  {
    id: "PRD001", name: "家政综合意外险", insurer: "中国人保",
    coverage: 500000, premium: 380, period: "1年",
    features: ["意外身故/伤残50万", "意外医疗5万", "住院津贴100元/天"],
  },
  {
    id: "PRD002", name: "家政责任险", insurer: "平安保险",
    coverage: 200000, premium: 260, period: "1年",
    features: ["第三者责任20万", "雇主财产损失5万", "法律费用1万"],
  },
  {
    id: "PRD003", name: "家政人员团体险", insurer: "太平洋保险",
    coverage: 300000, premium: 320, period: "1年",
    features: ["意外身故/伤残30万", "意外医疗3万", "重大疾病5万"],
  },
]

export function WorkbenchInsuranceTab() {
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null)
  const [showProducts, setShowProducts] = useState(false)

  return (
    <div className="space-y-4 px-4 pb-4">
      {/* Insurance Overview */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">我的保险</h3>
              <p className="text-xs text-muted-foreground">共 {myPolicies.length} 份保单</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded-lg p-2">
              <p className="text-sm font-bold text-green-600">{myPolicies.filter((p) => p.status === "active").length}</p>
              <p className="text-[10px] text-muted-foreground">有效</p>
            </div>
            <div className="bg-white rounded-lg p-2">
              <p className="text-sm font-bold text-amber-600">{myPolicies.filter((p) => p.status === "expiring").length}</p>
              <p className="text-[10px] text-muted-foreground">即将到期</p>
            </div>
            <div className="bg-white rounded-lg p-2">
              <p className="text-sm font-bold text-gray-600">{myPolicies.filter((p) => p.status === "expired").length}</p>
              <p className="text-[10px] text-muted-foreground">已过期</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expiring Warning */}
      {myPolicies.some((p) => p.status === "expiring") && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-700">有保单即将到期</p>
              <p className="text-xs text-amber-600">请及时续保，保障服务安全</p>
            </div>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white shrink-0">
              续保
            </Button>
          </CardContent>
        </Card>
      )}

      {/* My Policies */}
      <div>
        <h3 className="text-sm font-semibold mb-2">我的保单</h3>
        <div className="space-y-2">
          {myPolicies.map((policy) => {
            const StatusIcon = statusConfig[policy.status].icon
            return (
              <Card
                key={policy.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPolicy(policy)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      policy.status === "active" ? "bg-green-100" : policy.status === "expiring" ? "bg-amber-100" : "bg-gray-100"
                    )}>
                      <StatusIcon className={cn("w-5 h-5",
                        policy.status === "active" ? "text-green-600" : policy.status === "expiring" ? "text-amber-600" : "text-gray-600"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h4 className="text-sm font-semibold truncate">{policy.productName}</h4>
                          <p className="text-xs text-muted-foreground">{policy.insurer}</p>
                        </div>
                        <Badge className={cn("text-[9px] shrink-0", statusConfig[policy.status].color)}>
                          {statusConfig[policy.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-muted-foreground">保额 ¥{(policy.coverage / 10000).toFixed(0)}万</span>
                        <span className="text-muted-foreground">{policy.startDate} 至 {policy.endDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Buy Insurance */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">保险产品</h3>
          <button className="text-xs text-rose-500 flex items-center gap-1" onClick={() => setShowProducts(true)}>
            更多 <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {availableProducts.slice(0, 2).map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold">{product.name}</h4>
                  <span className="text-sm font-bold text-rose-600">¥{product.premium}/年</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{product.insurer}</span>
                  <span>·</span>
                  <span>保额{(product.coverage / 10000).toFixed(0)}万</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Policy Detail Sheet */}
      <Sheet open={!!selectedPolicy} onOpenChange={() => setSelectedPolicy(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">保单详情</SheetTitle>
          </SheetHeader>
          {selectedPolicy && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">产品名称</span>
                    <span className="text-sm font-medium">{selectedPolicy.productName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">承保公司</span>
                    <span className="text-sm">{selectedPolicy.insurer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">保单号</span>
                    <span className="text-sm font-mono">{selectedPolicy.policyNo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">保额</span>
                    <span className="text-sm font-bold text-green-600">¥{selectedPolicy.coverage.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">保费</span>
                    <span className="text-sm">¥{selectedPolicy.premium}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">保险期间</span>
                    <span className="text-sm">{selectedPolicy.startDate} 至 {selectedPolicy.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">状态</span>
                    <Badge className={cn("text-[10px]", statusConfig[selectedPolicy.status].color)}>
                      {statusConfig[selectedPolicy.status].label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              {selectedPolicy.status === "expiring" && (
                <Button className="w-full bg-amber-500 hover:bg-amber-600">立即续保</Button>
              )}
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                查看保险条款
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Product Detail Sheet */}
      <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">产品详情</SheetTitle>
          </SheetHeader>
          {selectedProduct && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                <h3 className="font-bold text-foreground">{selectedProduct.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{selectedProduct.insurer}</p>
                <p className="text-2xl font-bold text-rose-600 mt-2">¥{selectedProduct.premium}<span className="text-sm font-normal text-muted-foreground">/{selectedProduct.period}</span></p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">保障内容</h4>
                <div className="space-y-2">
                  {selectedProduct.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-rose-500 hover:bg-rose-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                立即投保
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* All Products Sheet */}
      <Sheet open={showProducts} onOpenChange={setShowProducts}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">全部保险产品</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-2 overflow-y-auto">
            {availableProducts.map((product) => (
              <Card
                key={product.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setShowProducts(false); setSelectedProduct(product) }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">{product.name}</h4>
                    <span className="text-sm font-bold text-rose-600">¥{product.premium}/年</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{product.insurer} · 保额{(product.coverage / 10000).toFixed(0)}万</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">{f}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
