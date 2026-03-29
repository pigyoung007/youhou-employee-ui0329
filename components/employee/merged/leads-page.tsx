"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search, Plus, Phone, ChevronRight, User, Tag, Clock,
  MessageSquare, Mic, Baby, Calendar, X,
} from "lucide-react"
import { CustomerDetailDrawer } from '@/components/customer-detail-drawer'

const trainingLeads = [
  { id: 1, name: "张女士", phone: "138****1234", category: "月嫂培训", source: "抖音广告", intention: "高意向", lastContact: "2026-01-21", note: "咨询月嫂培训课程，预计下月报名", type: "training", followUps: [{ date: "2026-01-21", content: "初次电话沟通，客户对月嫂培训很感兴趣" }, { date: "2026-01-19", content: "发送课程资料，客户表示会仔细了解" }] },
  { id: 2, name: "李阿姨", phone: "139****5678", category: "育婴师培训", source: "朋友推荐", intention: "中意向", lastContact: "2026-01-20", note: "有育儿经验，想考证", type: "training", followUps: [{ date: "2026-01-20", content: "电话回访，客户考虑中" }] },
  { id: 3, name: "赵女士", phone: "136****3456", category: "产康培训", source: "小红书", intention: "高意向", lastContact: "2026-01-22", note: "美容行业转行，对产康很感兴趣", type: "training", followUps: [] },
]

const employerLeads = [
  { id: 101, name: "王女士", phone: "138****1234", dueDate: "2026-03-15", address: "银川市金凤区", budget: "15000-18000", serviceType: "月嫂", intention: "高意向", lastContact: "2026-01-21", note: "预产期3月中旬，需要金牌月嫂", type: "employer", followUps: [{ date: "2026-01-21", content: "已推荐3位阿姨，客户正在考虑" }, { date: "2026-01-19", content: "初次电话沟通，了解需求" }] },
  { id: 102, name: "李先生", phone: "139****5678", dueDate: "2026-04-20", address: "银川市兴庆区", budget: "12000-15000", serviceType: "育儿嫂", intention: "中意向", lastContact: "2026-01-20", note: "二胎家庭，需要有经验的育儿嫂", type: "employer", followUps: [] },
]

const intentionTags = ["高意向", "中意向", "低意向", "已报名", "已签约", "已流失"]

export function MergedLeadsPage() {
  const [activeLeadType, setActiveLeadType] = useState<"all" | "training" | "employer">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<any | null>(null)
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)

  const allLeads = [...trainingLeads, ...employerLeads]
  const filteredLeads = allLeads
    .filter((lead) => {
      if (activeLeadType === "training") return lead.type === "training"
      if (activeLeadType === "employer") return lead.type === "employer"
      return true
    })
    .filter((lead) => activeFilter === "all" || lead.intention === activeFilter)
    .filter((lead) => !searchQuery || lead.name.includes(searchQuery) || lead.phone.includes(searchQuery))

  const getIntentionColor = (intention: string) => {
    switch (intention) {
      case "高意向": return "bg-teal-100 text-teal-700"
      case "中意向": return "bg-amber-100 text-amber-700"
      case "低意向": return "bg-gray-100 text-gray-600"
      case "已报名": case "已签约": return "bg-violet-100 text-violet-700"
      case "已流失": return "bg-red-100 text-red-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Compact Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3 pt-3 pb-3 safe-area-top">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold">线索管理</h1>
          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white h-7 text-[11px] px-2.5" onClick={() => setShowAddLead(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />新增
          </Button>
        </div>
      </header>

      <main className="px-3 py-2.5 space-y-2">
        {/* Lead Type Tabs */}
        <Tabs value={activeLeadType} onValueChange={(v) => setActiveLeadType(v as any)}>
          <TabsList className="w-full bg-muted/50 p-0.5 rounded-lg h-8">
            <TabsTrigger value="all" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">全部</TabsTrigger>
            <TabsTrigger value="training" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">培训线索</TabsTrigger>
            <TabsTrigger value="employer" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">雇主线索</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="搜索姓名或手机号" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8 h-8 text-xs" />
        </div>

        {/* Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {["all", "高意向", "中意向", "低意向"].map((filter) => (
            <Button key={filter} size="sm" variant={activeFilter === filter ? "default" : "outline"}
              className={`text-[11px] h-6 px-2.5 shrink-0 ${activeFilter === filter ? "bg-violet-500 hover:bg-violet-600" : "bg-transparent"}`}
              onClick={() => setActiveFilter(filter)}
            >{filter === "all" ? "全部" : filter}</Button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-2">
          {filteredLeads.map((lead) => (
            <Card key={`${lead.type}-${lead.id}`} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedLead(lead)}>
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${lead.type === "training" ? "bg-violet-100" : "bg-rose-100"}`}>
                      <User className={`w-4 h-4 ${lead.type === "training" ? "text-violet-500" : "text-rose-500"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm">{lead.name}</h3>
                        <Badge className={`text-[9px] px-1.5 py-0 ${lead.type === "training" ? "bg-violet-100 text-violet-700" : "bg-rose-100 text-rose-700"}`}>
                          {lead.type === "training" ? "培训" : "雇主"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{lead.phone}</p>
                    </div>
                  </div>
                  <Badge className={`text-[9px] px-1.5 py-0 shrink-0 ${getIntentionColor(lead.intention)}`}>{lead.intention}</Badge>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-1 text-[11px] text-muted-foreground">
                  {lead.type === "training" && (lead as any).category && (
                    <span className="flex items-center gap-0.5"><Tag className="w-3 h-3" />{(lead as any).category}</span>
                  )}
                  {lead.type === "employer" && (lead as any).serviceType && (
                    <>
                      <span className="flex items-center gap-0.5"><Baby className="w-3 h-3" />{(lead as any).serviceType}</span>
                      <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />预产期：{(lead as any).dueDate}</span>
                    </>
                  )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">{lead.note}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />跟进：{lead.lastContact}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-violet-500" onClick={(e) => e.stopPropagation()}>
                      <Phone className="w-3.5 h-3.5" />
                    </Button>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Lead Detail Drawer - 使用独立的客户详情组件 */}
      <CustomerDetailDrawer
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        customer={selectedLead ? {
          id: String(selectedLead.id),
          name: selectedLead.name,
          phone: selectedLead.phone,
          wechat: 'wx_' + selectedLead.name,
          consultant: '张顾问',
          status: '入库',
          statusProgress: 36,
          tags: selectedLead.intention === '高意向' ? ['高净值', '复购客户'] : ['潜在客户'],
          fullName: selectedLead.name,
          starLevel: selectedLead.intention === '高意向' ? 5 : 4,
          source: (selectedLead as any).source || '线上咨询',
          ethnicity: '汉族',
          gender: '女',
          maternityConsultant: '张顾问',
          referralInfo: selectedLead.note || '-',
          dueDate: selectedLead.type === 'training' ? undefined : (selectedLead as any).dueDate,
        } : null}
      />

      {/* Add Lead Drawer */}
      <Sheet open={showAddLead} onOpenChange={setShowAddLead}>
        <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col h-full">
          <div className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-3 border-b border-border shrink-0">
              <SheetTitle className="text-sm">新增线索</SheetTitle>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <div><Label className="text-xs">线索类型</Label><Select><SelectTrigger className="h-9 text-xs mt-1"><SelectValue placeholder="选择线索类型" /></SelectTrigger><SelectContent><SelectItem value="training">培训线索</SelectItem><SelectItem value="employer">雇主线索</SelectItem></SelectContent></Select></div>
              <div><Label className="text-xs">姓名</Label><Input placeholder="请输入姓名" className="h-9 text-xs mt-1" /></div>
              <div><Label className="text-xs">电话</Label><Input placeholder="请输入手机号" className="h-9 text-xs mt-1" /></div>
              <div><Label className="text-xs">备注</Label><Textarea placeholder="请输入备注信息" rows={3} className="text-xs mt-1" /></div>
            </div>
            <div className="px-4 py-3 border-t border-border shrink-0">
              <Button className="w-full bg-violet-500 hover:bg-violet-600 h-9 text-sm" onClick={() => setShowAddLead(false)}>保存线索</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Follow Up Drawer */}
      <Sheet open={showAddFollowUp} onOpenChange={setShowAddFollowUp}>
        <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col h-full">
          <div className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-3 border-b border-border shrink-0">
              <SheetTitle className="text-sm">添加跟进记录</SheetTitle>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <div><Label className="text-xs">跟进内容</Label><Textarea placeholder="请输入跟进内容" rows={3} className="text-xs mt-1" /></div>
              <div><Label className="text-xs">更新意向</Label><Select><SelectTrigger className="h-9 text-xs mt-1"><SelectValue placeholder="选择意向等级" /></SelectTrigger><SelectContent>{intentionTags.map((tag) => (<SelectItem key={tag} value={tag}>{tag}</SelectItem>))}</SelectContent></Select></div>
            </div>
            <div className="px-4 py-3 border-t border-border shrink-0">
              <Button className="w-full bg-violet-500 hover:bg-violet-600 h-9 text-sm" onClick={() => setShowAddFollowUp(false)}>保存跟进</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
