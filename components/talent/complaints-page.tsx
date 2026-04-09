"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronLeft, Plus, MessageSquare, Clock, CheckCircle,
  AlertCircle, Camera, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ComplaintStatus = "pending" | "processing" | "resolved" | "closed"
type ComplaintType = "complaint" | "suggestion"
type ViewTab = "mine" | "about_me"

interface Complaint {
  id: string
  type: ComplaintType
  category: string
  title: string
  description: string
  status: ComplaintStatus
  createdAt: string
  resolvedAt?: string
  reply?: string
}

const statusConfig: Record<ComplaintStatus, { label: string; color: string }> = {
  pending: { label: "待处理", color: "bg-amber-50 text-amber-600" },
  processing: { label: "处理中", color: "bg-blue-50 text-blue-600" },
  resolved: { label: "已解决", color: "bg-green-50 text-green-600" },
  closed: { label: "已关闭", color: "bg-gray-50 text-gray-600" },
}

const myComplaints: Complaint[] = [
  {
    id: "CP001", type: "complaint", category: "薪资问题",
    title: "上月结算金额有误", description: "上月服务王女士家庭的费用结算少了500元，已确认服务天数为26天整。",
    status: "processing", createdAt: "2026-04-05",
  },
  {
    id: "CP002", type: "suggestion", category: "功能建议",
    title: "希望增加日志模板", description: "建议增加更多护理日志模板，方便快速填写。",
    status: "resolved", createdAt: "2026-03-20", resolvedAt: "2026-03-25",
    reply: "感谢您的建议，我们已在新版本中增加了多种日志模板。",
  },
]

const aboutMeComplaints: Complaint[] = [
  {
    id: "CP003", type: "complaint", category: "服务质量",
    title: "雇主反馈：月子餐口味偏淡", description: "雇主反馈月子餐偏淡，希望改善。",
    status: "resolved", createdAt: "2026-03-10", resolvedAt: "2026-03-12",
    reply: "已与您沟通并调整餐食口味。",
  },
]

const complaintCategories = ["薪资问题", "合同纠纷", "服务安排", "保险问题", "功能建议", "其他"]

interface ComplaintsPageProps {
  onBack: () => void
}

export function ComplaintsPage({ onBack }: ComplaintsPageProps) {
  const [viewTab, setViewTab] = useState<ViewTab>("mine")
  const [showCreate, setShowCreate] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [createForm, setCreateForm] = useState({ type: "complaint" as ComplaintType, category: "", title: "", description: "" })

  const complaints = viewTab === "mine" ? myComplaints : aboutMeComplaints

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold">投诉建议</h1>
        </div>
        <Button size="sm" className="bg-rose-500 hover:bg-rose-600" onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-1" />
          提交
        </Button>
      </div>

      {/* View Tab Toggle */}
      <div className="px-4 py-3">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewTab("mine")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
              viewTab === "mine" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            我提交的
          </button>
          <button
            onClick={() => setViewTab("about_me")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
              viewTab === "about_me" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            关于我的
          </button>
        </div>
      </div>

      <main className="px-4 space-y-2 pb-24">
        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">暂无记录</p>
          </div>
        ) : (
          complaints.map((item) => (
            <Card
              key={item.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedComplaint(item)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-[10px]",
                      item.type === "complaint" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {item.type === "complaint" ? "投诉" : "建议"}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{item.category}</span>
                  </div>
                  <Badge className={cn("text-[9px] shrink-0", statusConfig[item.status].color)}>
                    {statusConfig[item.status].label}
                  </Badge>
                </div>
                <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{item.createdAt}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </main>

      {/* Detail Sheet */}
      <Sheet open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">详情</SheetTitle>
          </SheetHeader>
          {selectedComplaint && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className="flex items-center gap-2">
                <Badge className={cn("text-[10px]",
                  selectedComplaint.type === "complaint" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                )}>
                  {selectedComplaint.type === "complaint" ? "投诉" : "建议"}
                </Badge>
                <Badge className={cn("text-[10px]", statusConfig[selectedComplaint.status].color)}>
                  {statusConfig[selectedComplaint.status].label}
                </Badge>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{selectedComplaint.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedComplaint.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <span>分类：{selectedComplaint.category}</span>
                    <span>提交时间：{selectedComplaint.createdAt}</span>
                  </div>
                </CardContent>
              </Card>

              {selectedComplaint.reply && (
                <Card className="border-0 shadow-sm bg-green-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-700">处理回复</span>
                    </div>
                    <p className="text-sm text-green-600">{selectedComplaint.reply}</p>
                    {selectedComplaint.resolvedAt && (
                      <p className="text-xs text-green-500 mt-2">处理时间：{selectedComplaint.resolvedAt}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Sheet */}
      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">提交投诉/建议</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            {/* Type */}
            <div>
              <Label className="text-xs mb-2 block">类型</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCreateForm({ ...createForm, type: "complaint" })}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-medium transition-all",
                    createForm.type === "complaint"
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-200 text-gray-600"
                  )}
                >
                  投诉
                </button>
                <button
                  onClick={() => setCreateForm({ ...createForm, type: "suggestion" })}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-medium transition-all",
                    createForm.type === "suggestion"
                      ? "border-blue-300 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-600"
                  )}
                >
                  建议
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <Label className="text-xs mb-2 block">分类</Label>
              <div className="flex flex-wrap gap-2">
                {complaintCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCreateForm({ ...createForm, category: cat })}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                      createForm.category === cat
                        ? "bg-rose-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <Label className="text-xs">标题 *</Label>
              <Input
                placeholder="请简要描述问题"
                value={createForm.title}
                onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-xs">详细描述 *</Label>
              <Textarea
                placeholder="请详细描述情况..."
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                rows={4}
              />
            </div>

            {/* Photos */}
            <div>
              <Label className="text-xs mb-2 block">附件（可选）</Label>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-rose-300">
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              className="w-full bg-rose-500 hover:bg-rose-600"
              disabled={!createForm.title || !createForm.description || !createForm.category}
              onClick={() => { setShowCreate(false); alert("提交成功，我们会尽快处理") }}
            >
              提交
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
