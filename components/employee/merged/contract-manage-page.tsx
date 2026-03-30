"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  ArrowLeft, FileText, Search, Clock, CheckCircle2,
  AlertTriangle, XCircle, ChevronRight, Calendar,
  User, Building2, CreditCard, PenLine, Eye, X,
  Filter, Download,
} from "lucide-react"

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  draft: { label: "草稿", color: "bg-gray-100 text-gray-600", icon: FileText },
  pending_sign: { label: "待签署", color: "bg-amber-100 text-amber-600", icon: Clock },
  signed: { label: "已签署", color: "bg-green-100 text-green-600", icon: CheckCircle2 },
  in_progress: { label: "履行中", color: "bg-blue-100 text-blue-600", icon: CheckCircle2 },
  completed: { label: "已完结", color: "bg-teal-100 text-teal-600", icon: CheckCircle2 },
  expired: { label: "已过期", color: "bg-red-100 text-red-600", icon: AlertTriangle },
  terminated: { label: "已终止", color: "bg-red-100 text-red-600", icon: XCircle },
}

const contracts = [
  {
    id: "HT20260201001", title: "月嫂服务合同", type: "maternity",
    status: "in_progress", amount: 15800,
    clientName: "王女士", workerName: "李阿姨",
    signDate: "2026-02-01", startDate: "2026-02-05", endDate: "2026-03-05",
    company: "优厚家庭服务（银川）有限公司",
    items: [
      { name: "金牌月嫂服务（26天）", amount: 13800 },
      { name: "新生儿抚触", amount: 1000 },
      { name: "催乳服务（3次）", amount: 1000 },
    ],
  },
  {
    id: "HT20260128002", title: "育婴师服务合同", type: "childcare",
    status: "pending_sign", amount: 8800,
    clientName: "张先生", workerName: "赵阿姨",
    signDate: "", startDate: "2026-02-10", endDate: "2026-05-10",
    company: "优厚家庭服务（银川）有限公司",
    items: [
      { name: "高级育婴师服务（3个月）", amount: 7800 },
      { name: "辅食添加指导", amount: 1000 },
    ],
  },
  {
    id: "HT20260120003", title: "产后修复服务协议", type: "recovery",
    status: "signed", amount: 12600,
    clientName: "陈女士", workerName: "周技师",
    signDate: "2026-01-20", startDate: "2026-01-25", endDate: "2026-04-25",
    company: "优厚母婴护理（银川）有限公司",
    items: [
      { name: "骨盆修复（10次）", amount: 6800 },
      { name: "腹直肌修复（8次）", amount: 4800 },
      { name: "产后体态评估", amount: 1000 },
    ],
  },
  {
    id: "HT20260110004", title: "月嫂服务合同", type: "maternity",
    status: "completed", amount: 13500,
    clientName: "刘女士", workerName: "孙阿姨",
    signDate: "2026-01-10", startDate: "2026-01-12", endDate: "2026-02-08",
    company: "优厚家庭服务（银川）有限公司",
    items: [
      { name: "星级月嫂服务（26天）", amount: 11500 },
      { name: "催乳服务（4次）", amount: 2000 },
    ],
  },
  {
    id: "HT20251215005", title: "培训服务协议", type: "training",
    status: "expired", amount: 3980,
    clientName: "马学员", workerName: "",
    signDate: "2025-12-15", startDate: "2025-12-20", endDate: "2026-01-05",
    company: "优厚职业技能培训学校",
    items: [
      { name: "高级月嫂培训课程（15天）", amount: 3980 },
    ],
  },
]

interface ContractManagePageProps {
  onBack: () => void
}

export function ContractManagePage({ onBack }: ContractManagePageProps) {
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selected, setSelected] = useState<typeof contracts[0] | null>(null)

  const statusFilters = [
    { id: "all", label: "全部" },
    { id: "pending_sign", label: "待签署" },
    { id: "in_progress", label: "履行中" },
    { id: "completed", label: "已完结" },
  ]

  const filtered = contracts.filter(c => {
    if (filterStatus !== "all" && c.status !== filterStatus) return false
    if (searchText && !c.title.includes(searchText) && !c.clientName.includes(searchText) && !c.id.includes(searchText)) return false
    return true
  })

  const stats = {
    total: contracts.length,
    pending: contracts.filter(c => c.status === "pending_sign").length,
    active: contracts.filter(c => c.status === "in_progress" || c.status === "signed").length,
    totalAmount: contracts.filter(c => c.status !== "expired" && c.status !== "terminated").reduce((s, c) => s + c.amount, 0),
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 pt-4 pb-4 safe-area-top">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 -ml-1 hover:bg-white/10 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold">合同管理</h1>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">{stats.total}</p>
            <p className="text-[10px] text-white/80">合同总数</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">{stats.pending}</p>
            <p className="text-[10px] text-white/80">待签署</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">{(stats.totalAmount / 10000).toFixed(1)}万</p>
            <p className="text-[10px] text-white/80">合同总额</p>
          </div>
        </div>
      </header>

      <main className="px-3 py-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="搜索合同编号、客户姓名..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {statusFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filterStatus === f.id
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Contract List */}
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">暂无合同记录</p>
          </div>
        ) : (
          filtered.map(contract => {
            const st = statusConfig[contract.status] || statusConfig.draft
            const StIcon = st.icon
            return (
              <Card
                key={contract.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelected(contract)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-sm font-semibold truncate">{contract.title}</h3>
                        <Badge className={`text-[9px] px-1.5 py-0 shrink-0 ${st.color}`}>{st.label}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{contract.id}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
                    <span className="flex items-center gap-0.5"><User className="w-3 h-3" />{contract.clientName}</span>
                    {contract.workerName && (
                      <span className="flex items-center gap-0.5"><User className="w-3 h-3" />{contract.workerName}</span>
                    )}
                    <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />{contract.startDate.slice(5)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600">¥{contract.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground">{contract.company.slice(0, 8)}...</span>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </main>

      {/* Contract Detail Drawer */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent side="right" className="w-[90vw] max-w-md flex flex-col py-0 h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
              <SheetTitle className="text-base">合同详情</SheetTitle>
              <button onClick={() => setSelected(null)} className="p-1"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            {selected && (() => {
              const st = statusConfig[selected.status] || statusConfig.draft
              return (
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  {/* Status Banner */}
                  <div className={`rounded-xl p-3 flex items-center gap-2.5 ${st.color}`}>
                    <st.icon className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{st.label}</p>
                      <p className="text-[10px]">{selected.id}</p>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <h3 className="text-sm font-semibold mb-2">基本信息</h3>
                      {[
                        { icon: FileText, label: "合同名称", value: selected.title },
                        { icon: Building2, label: "签约主体", value: selected.company },
                        { icon: User, label: "客户", value: selected.clientName },
                        ...(selected.workerName ? [{ icon: User, label: "服务人员", value: selected.workerName }] : []),
                        { icon: Calendar, label: "服务期限", value: `${selected.startDate} 至 ${selected.endDate}` },
                        { icon: CreditCard, label: "合同金额", value: `¥${selected.amount.toLocaleString()}` },
                      ].map((row) => {
                        const Icon = row.icon
                        return (
                          <div key={row.label} className="flex items-start gap-2 py-1.5 border-b border-border/30 last:border-b-0">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-muted-foreground">{row.label}</p>
                              <p className="text-xs font-medium">{row.value}</p>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  {/* Service Items */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold mb-2">服务项目</h3>
                      <div className="space-y-2">
                        {selected.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-b-0">
                            <span className="text-xs">{item.name}</span>
                            <span className="text-xs font-medium">¥{item.amount.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-xs font-semibold">合计</span>
                          <span className="text-sm font-bold text-blue-600">¥{selected.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-2 pb-2">
                    {selected.status === "pending_sign" && (
                      <Button className="flex-1 h-9 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                        <PenLine className="w-3.5 h-3.5 mr-1" />发起签署
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1 h-9 text-xs bg-transparent">
                      <Eye className="w-3.5 h-3.5 mr-1" />查看全文
                    </Button>
                    <Button variant="outline" className="h-9 text-xs bg-transparent px-3">
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
