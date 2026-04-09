"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  ChevronRight,
  FileSignature,
  FileText,
  Send,
  User,
  Building2,
  Clock,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContractItem {
  id: string
  contractNo: string
  title: string
  customerName: string
  amount: number
  status: "pending_sign" | "signed" | "expired"
  type: "company" | "private"
  serviceType: string
  startDate: string
  endDate: string
  signedDate?: string
  orderId?: string
  signers: { name: string; role: string; signed: boolean }[]
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  pending_sign: { label: "待签署", className: "bg-amber-100 text-amber-700" },
  signed: { label: "已签署", className: "bg-green-100 text-green-700" },
  expired: { label: "已失效", className: "bg-gray-100 text-gray-500" },
}

export function WorkbenchContractsTab() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showDetail, setShowDetail] = useState(false)
  const [selectedContract, setSelectedContract] = useState<ContractItem | null>(null)

  const contracts: ContractItem[] = [
    {
      id: "1",
      contractNo: "HT-2026-0088",
      title: "产后康复服务协议",
      customerName: "王女士",
      amount: 6800,
      status: "signed",
      type: "company",
      serviceType: "产后腹直肌修复",
      startDate: "2026-03-01",
      endDate: "2026-06-30",
      signedDate: "2026-03-01",
      orderId: "DD-2026-0101",
      signers: [
        { name: "王女士", role: "甲方（雇主）", signed: true },
        { name: "陈美丽", role: "乙方（技师）", signed: true },
        { name: "优厚家庭服务", role: "丙方（公司）", signed: true },
      ],
    },
    {
      id: "2",
      contractNo: "PS-2026-0015",
      title: "产康私人服务协议",
      customerName: "吴女士",
      amount: 2880,
      status: "pending_sign",
      type: "private",
      serviceType: "乳腺疏通护理",
      startDate: "2026-04-01",
      endDate: "2026-07-31",
      orderId: "DD-2026-0202",
      signers: [
        { name: "吴女士", role: "甲方（雇主）", signed: false },
        { name: "陈美丽", role: "乙方（技师）", signed: true },
      ],
    },
    {
      id: "3",
      contractNo: "PS-2026-0012",
      title: "产后修复套餐协议",
      customerName: "郑女士",
      amount: 6800,
      status: "signed",
      type: "private",
      serviceType: "产后腹直肌修复",
      startDate: "2026-02-15",
      endDate: "2026-05-15",
      signedDate: "2026-02-15",
      orderId: "DD-2026-0203",
      signers: [
        { name: "郑女士", role: "甲方（雇主）", signed: true },
        { name: "陈美丽", role: "乙方（技师）", signed: true },
      ],
    },
    {
      id: "4",
      contractNo: "HT-2025-0412",
      title: "产后康复服务协议",
      customerName: "刘女士",
      amount: 5800,
      status: "expired",
      type: "company",
      serviceType: "盆底肌康复训练",
      startDate: "2025-09-01",
      endDate: "2025-12-31",
      signedDate: "2025-09-01",
      signers: [
        { name: "刘女士", role: "甲方（雇主）", signed: true },
        { name: "陈美丽", role: "乙方（技师）", signed: true },
        { name: "优厚家庭服务", role: "丙方（公司）", signed: true },
      ],
    },
  ]

  const filteredContracts = contracts.filter((c) => {
    if (activeFilter === "all") return true
    return c.status === activeFilter
  })

  const pendingCount = contracts.filter((c) => c.status === "pending_sign").length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-teal-200 text-xs text-teal-600">
            共 {contracts.length} 份
          </Badge>
          {pendingCount > 0 && (
            <Badge className="bg-amber-100 text-xs text-amber-700">
              {pendingCount} 待签署
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="h-8 w-full bg-muted/60 p-0.5">
          <TabsTrigger value="all" className="flex-1 text-xs">全部</TabsTrigger>
          <TabsTrigger value="pending_sign" className="flex-1 text-xs">待签署</TabsTrigger>
          <TabsTrigger value="signed" className="flex-1 text-xs">已签署</TabsTrigger>
          <TabsTrigger value="expired" className="flex-1 text-xs">已失效</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filteredContracts.map((contract) => {
          const statusInfo = STATUS_MAP[contract.status]
          return (
            <Card
              key={contract.id}
              className="border border-border/80 shadow-sm"
            >
              <CardContent className="p-3">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <FileSignature className="h-3.5 w-3.5 text-teal-600" />
                      <p className="text-sm font-medium">{contract.title}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{contract.contractNo}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`${statusInfo.className} text-[10px]`}>
                      {statusInfo.label}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${contract.type === "private" ? "border-violet-200 text-violet-600" : "border-blue-200 text-blue-600"}`}
                    >
                      {contract.type === "private" ? "私单" : "公司"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3 w-3" />
                    <span>{contract.customerName}</span>
                    <span className="mx-1">·</span>
                    <span>{contract.serviceType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>{contract.startDate} ~ {contract.endDate}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-teal-600">¥{contract.amount.toLocaleString()}</span>
                  <div className="flex gap-1.5">
                    {contract.status === "pending_sign" && (
                      <Button
                        type="button"
                        size="sm"
                        className="h-7 bg-amber-500 text-xs hover:bg-amber-600"
                        onClick={() => alert("催签通知已发送")}
                      >
                        <Send className="mr-1 h-3 w-3" />
                        催签
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground"
                      onClick={() => {
                        setSelectedContract(contract)
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

        {filteredContracts.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">暂无合同</div>
        )}
      </div>

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>合同详情</DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedContract.title}</h4>
                    <Badge className={STATUS_MAP[selectedContract.status].className}>
                      {STATUS_MAP[selectedContract.status].label}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedContract.contractNo}</p>
                  <p className="mt-1 text-lg font-bold text-teal-600">
                    ¥{selectedContract.amount.toLocaleString()}
                  </p>
                </div>

                <Card className="border">
                  <CardContent className="space-y-2 p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">合同类型</span>
                      <span>{selectedContract.type === "private" ? "私有合同" : "公司合同"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务类型</span>
                      <span>{selectedContract.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">客户姓名</span>
                      <span>{selectedContract.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务周期</span>
                      <span>{selectedContract.startDate} ~ {selectedContract.endDate}</span>
                    </div>
                    {selectedContract.signedDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">签署日期</span>
                        <span>{selectedContract.signedDate}</span>
                      </div>
                    )}
                    {selectedContract.orderId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">关联订单</span>
                        <span className="text-teal-600">{selectedContract.orderId}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-3">
                    <p className="mb-2 text-sm font-medium">签署方</p>
                    <div className="space-y-2">
                      {selectedContract.signers.map((signer, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${signer.signed ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                              {signer.signed ? "✓" : "!"}
                            </div>
                            <div>
                              <p className="text-sm">{signer.name}</p>
                              <p className="text-[10px] text-muted-foreground">{signer.role}</p>
                            </div>
                          </div>
                          <Badge className={`text-[10px] ${signer.signed ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                            {signer.signed ? "已签署" : "待签署"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent text-xs" size="sm">
                    <FileText className="mr-1 h-3.5 w-3.5" />
                    查看合同
                  </Button>
                  {selectedContract.status === "signed" && (
                    <Button type="button" variant="outline" className="flex-1 bg-transparent text-xs" size="sm">
                      <FileSignature className="mr-1 h-3.5 w-3.5" />
                      补充协议
                    </Button>
                  )}
                  {selectedContract.status === "pending_sign" && (
                    <Button type="button" className="flex-1 bg-amber-500 text-xs hover:bg-amber-600" size="sm">
                      <Send className="mr-1 h-3.5 w-3.5" />
                      催签
                    </Button>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
