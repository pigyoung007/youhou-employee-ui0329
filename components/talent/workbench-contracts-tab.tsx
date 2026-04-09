"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Search, Plus, ChevronRight, FileText, Download, Eye,
  Building2, User, Send, Clock, CheckCircle, AlertCircle, PenTool,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ContractStatus = "pending_sign" | "signed" | "expired" | "terminated"
type ContractCategory = "company" | "private"

interface Contract {
  id: string
  contractType: string
  customerName: string
  amount: number
  startDate: string
  endDate: string
  status: ContractStatus
  signDate?: string
  category: ContractCategory
}

const statusConfig: Record<ContractStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending_sign: { label: "待签署", color: "bg-yellow-50 text-yellow-600 border-yellow-200", icon: Clock },
  signed: { label: "已签署", color: "bg-green-50 text-green-600 border-green-200", icon: CheckCircle },
  expired: { label: "已过期", color: "bg-gray-50 text-gray-600 border-gray-200", icon: AlertCircle },
  terminated: { label: "已终止", color: "bg-red-50 text-red-600 border-red-200", icon: AlertCircle },
}

const companyContracts: Contract[] = [
  {
    id: "CT20260327001", contractType: "月嫂服务合同", customerName: "王女士",
    amount: 15800, startDate: "2026-04-01", endDate: "2026-04-26",
    status: "pending_sign", category: "company",
  },
  {
    id: "CT20260320002", contractType: "育婴师合同", customerName: "李先生",
    amount: 8500, startDate: "2026-03-15", endDate: "2026-06-15",
    status: "signed", signDate: "2026-03-18", category: "company",
  },
]

const privateContracts: Contract[] = [
  {
    id: "PCT20260405001", contractType: "月嫂服务合同（私）", customerName: "张女士",
    amount: 12800, startDate: "2026-05-01", endDate: "2026-05-26",
    status: "pending_sign", category: "private",
  },
  {
    id: "PCT20260401002", contractType: "育婴师合同（私）", customerName: "赵女士",
    amount: 9600, startDate: "2026-04-10", endDate: "2026-07-10",
    status: "signed", signDate: "2026-04-08", category: "private",
  },
]

const contractTemplates = [
  { id: "tpl_yuesao", name: "月嫂服务合同模板" },
  { id: "tpl_yuyingshi", name: "育婴师服务合同模板" },
  { id: "tpl_chanhou", name: "产后修复服务协议模板" },
  { id: "tpl_baomu", name: "保姆服务合同模板" },
]

export function WorkbenchContractsTab() {
  const [category, setCategory] = useState<ContractCategory>("company")
  const [filterStatus, setFilterStatus] = useState<ContractStatus | "all">("all")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [createStep, setCreateStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const contracts = category === "company" ? companyContracts : privateContracts
  const filtered = filterStatus === "all"
    ? contracts
    : contracts.filter((c) => c.status === filterStatus)

  return (
    <div className="space-y-4">
      {/* Category Toggle */}
      <div className="flex gap-2 px-4">
        {([
          { id: "company" as const, label: "公司合同", icon: Building2 },
          { id: "private" as const, label: "私有合同", icon: User },
        ]).map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id); setFilterStatus("all") }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
              category === cat.id
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-1">
        {([
          { id: "all" as const, label: "全部" },
          { id: "pending_sign" as const, label: "待签署" },
          { id: "signed" as const, label: "已签署" },
          { id: "expired" as const, label: "已过期" },
          { id: "terminated" as const, label: "已终止" },
        ]).map((s) => (
          <button
            key={s.id}
            onClick={() => setFilterStatus(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              filterStatus === s.id
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Create Button */}
      {category === "private" && (
        <div className="px-4">
          <Button
            className="w-full bg-rose-500 hover:bg-rose-600 h-10"
            onClick={() => { setShowCreate(true); setCreateStep(1); setSelectedTemplate("") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            新建私有合同
          </Button>
        </div>
      )}

      {/* Contract List */}
      <div className="px-4 space-y-2 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">暂无合同</p>
          </div>
        ) : (
          filtered.map((contract) => (
            <Card
              key={contract.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedContract(contract)}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground truncate">{contract.contractType}</h3>
                        <p className="text-xs text-muted-foreground">{contract.customerName}</p>
                      </div>
                      <Badge className={cn("text-[9px] shrink-0", statusConfig[contract.status].color)}>
                        {statusConfig[contract.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2">
                      <span className="text-rose-600 font-medium">¥{contract.amount.toLocaleString()}</span>
                      <span className="text-muted-foreground">{contract.startDate} 至 {contract.endDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Contract Detail Sheet */}
      <Sheet open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">合同详情</SheetTitle>
          </SheetHeader>
          {selectedContract && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <p className="text-xs text-blue-600 mb-1">合同类型</p>
                <h2 className="text-lg font-bold text-foreground">{selectedContract.contractType}</h2>
                <p className="text-sm text-muted-foreground mt-1">{selectedContract.customerName}</p>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">合同金额</span>
                    <span className="text-lg font-bold text-rose-600">¥{selectedContract.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">服务周期</span>
                    <span className="text-sm font-medium">{selectedContract.startDate} 至 {selectedContract.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">合同号</span>
                    <span className="text-sm font-mono">{selectedContract.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">合同状态</span>
                    <Badge className={cn("text-[10px]", statusConfig[selectedContract.status].color)}>
                      {statusConfig[selectedContract.status].label}
                    </Badge>
                  </div>
                  {selectedContract.signDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">签署时间</span>
                      <span className="text-sm font-medium">{selectedContract.signDate}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold">合同条款</h3>
                <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    1. 本合同由甲方与乙方双方自愿订立。<br />
                    2. 服务范围包括约定的家政服务项目。<br />
                    3. 服务费用为¥{selectedContract.amount.toLocaleString()}，按约定方式支付。<br />
                    4. 本合同自签署之日起生效，至{selectedContract.endDate}止。<br />
                    5. 双方承诺遵守合同约定的各项条款。
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {selectedContract.status === "pending_sign" && (
                  <Button className="w-full h-10 bg-rose-500 hover:bg-rose-600">
                    <PenTool className="w-4 h-4 mr-2" />
                    立即签署
                  </Button>
                )}
                {selectedContract.category === "private" && selectedContract.status === "pending_sign" && (
                  <Button variant="outline" className="w-full h-10">
                    <Send className="w-4 h-4 mr-2" />
                    推送给雇主签署
                  </Button>
                )}
                <Button variant="outline" className="w-full h-10">
                  <Eye className="w-4 h-4 mr-2" />
                  查看原始合同
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Contract Sheet */}
      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">新建私有合同</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            {createStep === 1 && (
              <>
                <h3 className="text-sm font-semibold">选择合同模板</h3>
                <div className="space-y-2">
                  {contractTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                        selectedTemplate === tpl.id
                          ? "border-rose-300 bg-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-sm font-medium">{tpl.name}</span>
                      {selectedTemplate === tpl.id && (
                        <CheckCircle className="w-4 h-4 text-rose-500 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {createStep === 2 && (
              <>
                <h3 className="text-sm font-semibold">填写合同信息</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs">雇主姓名 *</Label>
                    <Input placeholder="请输入雇主姓名" />
                  </div>
                  <div>
                    <Label className="text-xs">雇主电话 *</Label>
                    <Input placeholder="请输入雇主电话" />
                  </div>
                  <div>
                    <Label className="text-xs">合同金额（元）*</Label>
                    <Input type="number" placeholder="请输入合同金额" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">开始日期 *</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="text-xs">结束日期 *</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-4 border-t border-border flex gap-3">
            {createStep === 2 && (
              <Button variant="outline" className="flex-1" onClick={() => setCreateStep(1)}>
                上一步
              </Button>
            )}
            {createStep === 1 ? (
              <Button
                className="flex-1 bg-rose-500 hover:bg-rose-600"
                disabled={!selectedTemplate}
                onClick={() => setCreateStep(2)}
              >
                下一步
              </Button>
            ) : (
              <Button
                className="flex-1 bg-rose-500 hover:bg-rose-600"
                onClick={() => {
                  setShowCreate(false)
                  alert("合同已创建，等待双方签署")
                }}
              >
                生成合同
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
