"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ArrowLeft, Plus, Calendar, Clock, FileText, User,
  Camera, ChevronRight, Search, BarChart3, X,
} from "lucide-react"

// Journal types
const journalTypes = [
  { id: "daily", label: "日报", color: "bg-violet-100 text-violet-700" },
  { id: "weekly", label: "周报", color: "bg-blue-100 text-blue-700" },
  { id: "visit", label: "拜访记录", color: "bg-amber-100 text-amber-700" },
  { id: "followup", label: "跟进记录", color: "bg-teal-100 text-teal-700" },
]

// System auto-stats (simulated)
const systemStats = [
  { label: "分配数据量", value: "15", color: "from-violet-50 to-violet-100 text-violet-600" },
  { label: "呼出次数", value: "45", color: "from-green-50 to-green-100 text-green-600" },
  { label: "通话时长", value: "128分钟", color: "from-amber-50 to-amber-100 text-amber-600" },
  { label: "接通率", value: "84.4%", color: "from-yellow-50 to-yellow-100 text-red-500" },
]

// Sample journal history
const sampleJournals = [
  {
    id: 1, type: "daily", date: "2026-02-11", time: "18:30",
    systemStats: { allocatedData: 15, callCount: 45, callDuration: 128, connectRate: 84.4 },
    manualStats: { wechatCount: 8, interviewCount: 2, newSignCount: 1, revenue: 12800 },
    summary: "上午跟进了3位意向客户，其中王女士对金牌月嫂服务非常感兴趣，已安排明日面试。下午完成了2份合同的签署工作。",
    difficulties: "部分客户对价格比较敏感，需要更好的话术来体现服务价值。",
    tomorrowPlan: "1. 继续跟进王女士月嫂面试\n2. 联系3位新分配的客户\n3. 准备周报材料",
    status: "submitted" as const,
  },
  {
    id: 2, type: "visit", date: "2026-02-10", time: "15:20",
    systemStats: { allocatedData: 12, callCount: 38, callDuration: 96, connectRate: 78.9 },
    manualStats: { wechatCount: 5, interviewCount: 1, newSignCount: 0, revenue: 0 },
    summary: "今天上门拜访了张女士家庭，了解了她的产后恢复需求。推荐了骨盆修复和腹直肌修复套餐，客户表示考虑中。",
    difficulties: "客户对产后修复效果有顾虑，需要提供更多案例参考。",
    tomorrowPlan: "1. 准备产后修复成功案例资料\n2. 跟进张女士决定",
    status: "submitted" as const,
  },
  {
    id: 3, type: "followup", date: "2026-02-09", time: "11:00",
    systemStats: { allocatedData: 18, callCount: 52, callDuration: 145, connectRate: 82.1 },
    manualStats: { wechatCount: 10, interviewCount: 3, newSignCount: 2, revenue: 25600 },
    summary: "电话跟进李先生，他们家预产期在3月中旬，需要金牌月嫂。已推荐了3位阿姨的资料，客户会在本周内回复。",
    difficulties: "金牌月嫂资源紧张，3月档期所剩不多。",
    tomorrowPlan: "1. 确认金牌月嫂3月档期\n2. 电话跟进李先生",
    status: "submitted" as const,
  },
  {
    id: 4, type: "weekly", date: "2026-02-08", time: "17:45",
    systemStats: { allocatedData: 10, callCount: 30, callDuration: 88, connectRate: 80.0 },
    manualStats: { wechatCount: 6, interviewCount: 0, newSignCount: 1, revenue: 8800 },
    summary: "本周新增客户5位，完成签单3个，总金额约4.2万。重点跟进了2位高意向客户，计划下周安排面试。",
    difficulties: "周末客户响应率较低，部分客户微信未通过好友申请。",
    tomorrowPlan: "1. 整理本周未成交客户\n2. 制定下周拜访计划",
    status: "draft" as const,
  },
  {
    id: 5, type: "daily", date: "2026-02-07", time: "16:10",
    systemStats: { allocatedData: 14, callCount: 40, callDuration: 110, connectRate: 85.0 },
    manualStats: { wechatCount: 4, interviewCount: 1, newSignCount: 0, revenue: 0 },
    summary: "对本月签约客户进行了电话回访，3位客户对阿姨服务表示满意，1位客户反馈阿姨做饭口味偏淡，已记录并沟通。",
    difficulties: "服务中的问题反馈需要更及时地同步给服务人员。",
    tomorrowPlan: "1. 与阿姨沟通饮食口味问题\n2. 继续其他客户回访",
    status: "submitted" as const,
  },
]

interface WorkJournalPageProps {
  onBack: () => void
}

export function WorkJournalPage({ onBack }: WorkJournalPageProps) {
  const [showEditor, setShowEditor] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [searchText, setSearchText] = useState("")

  // Editor state
  const [editDate, setEditDate] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  })
  const [editWechat, setEditWechat] = useState("")
  const [editInterview, setEditInterview] = useState("")
  const [editNewSign, setEditNewSign] = useState("")
  const [editRevenue, setEditRevenue] = useState("")
  const [editSummary, setEditSummary] = useState("")
  const [editDifficulties, setEditDifficulties] = useState("")
  const [editTomorrowPlan, setEditTomorrowPlan] = useState("")

  // Detail state
  const [selectedJournal, setSelectedJournal] = useState<typeof sampleJournals[0] | null>(null)

  const filteredJournals = sampleJournals.filter(j => {
    if (filterType !== "all" && j.type !== filterType) return false
    if (searchText && !j.summary.includes(searchText)) return false
    return true
  })

  const getTypeInfo = (type: string) => journalTypes.find(t => t.id === type) || journalTypes[0]

  const resetEditor = () => {
    setEditWechat("")
    setEditInterview("")
    setEditNewSign("")
    setEditRevenue("")
    setEditSummary("")
    setEditDifficulties("")
    setEditTomorrowPlan("")
  }

  const handleSubmit = () => {
    setShowEditor(false)
    resetEditor()
  }

  const handleSaveDraft = () => {
    setShowEditor(false)
  }

  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  const todayCount = sampleJournals.filter(j => j.date === todayStr).length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border px-3 py-2.5 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold text-sm flex-1">工作日志</h1>
        <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground gap-1" onClick={() => setShowEditor(true)}>
          <Plus className="w-3.5 h-3.5" />写日志
        </Button>
      </header>

      {/* Stats Bar */}
      <div className="px-3 py-2.5 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-base font-bold text-pink-600">{todayCount}</p>
            <p className="text-[10px] text-muted-foreground">今日</p>
          </div>
          <div>
            <p className="text-base font-bold text-pink-600">{sampleJournals.length}</p>
            <p className="text-[10px] text-muted-foreground">本周</p>
          </div>
          <div>
            <p className="text-base font-bold text-pink-600">23</p>
            <p className="text-[10px] text-muted-foreground">本月</p>
          </div>
          <div>
            <p className="text-base font-bold text-pink-600">5</p>
            <p className="text-[10px] text-muted-foreground">连续天数</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-2 space-y-2">
        <div className="flex gap-1.5 items-center">
          <div className="flex-1 relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="搜索日志..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-8 text-xs pl-8"
            />
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          <Button
            size="sm" variant={filterType === "all" ? "default" : "outline"}
            className={`text-[11px] h-6 px-2.5 shrink-0 ${filterType === "all" ? "bg-primary hover:bg-primary/90" : "bg-transparent"}`}
            onClick={() => setFilterType("all")}
          >
            全部
          </Button>
          {journalTypes.map(t => (
            <Button
              key={t.id} size="sm" variant={filterType === t.id ? "default" : "outline"}
              className={`text-[11px] h-6 px-2.5 shrink-0 ${filterType === t.id ? "bg-primary hover:bg-primary/90" : "bg-transparent"}`}
              onClick={() => setFilterType(t.id)}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Journal List */}
      <div className="px-3 space-y-2 pb-4">
        {filteredJournals.length === 0 ? (
          <div className="text-center py-10">
            <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">暂无日志记录</p>
            <Button size="sm" variant="outline" className="mt-3 text-xs bg-transparent" onClick={() => setShowEditor(true)}>
              <Plus className="w-3.5 h-3.5 mr-1" />写第一篇日志
            </Button>
          </div>
        ) : (
          filteredJournals.map(journal => {
            const typeInfo = getTypeInfo(journal.type)
            return (
              <Card
                key={journal.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedJournal(journal)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <Badge className={`text-[9px] px-1.5 py-0 shrink-0 ${typeInfo.color}`}>{typeInfo.label}</Badge>
                      <span className="text-[10px] text-muted-foreground">{journal.date}</span>
                      {journal.status === "draft" && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-orange-100 text-orange-600">草稿</Badge>
                      )}
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-1" />
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{journal.summary}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>呼出 {journal.systemStats.callCount}次</span>
                    <span>面试 {journal.manualStats.interviewCount}场</span>
                    <span>签单 {journal.manualStats.newSignCount}个</span>
                    {journal.manualStats.revenue > 0 && (
                      <span className="text-green-600 font-medium">+{journal.manualStats.revenue.toLocaleString()}元</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Write Journal Drawer */}
      <Sheet open={showEditor} onOpenChange={setShowEditor}>
        <SheetContent side="right" className="w-[90vw] max-w-md p-0 flex flex-col h-full">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" />
                <SheetTitle className="text-base font-semibold">填写工作日志</SheetTitle>
              </div>
              <button onClick={() => setShowEditor(false)} className="p-1">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {/* Date Picker */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-1.5">日期</p>
                <Input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>

              {/* System Auto Stats */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">自动统计数据（来自系统）</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {systemStats.map(stat => (
                    <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-xl px-3 py-2.5`}>
                      <p className="text-[11px] opacity-80">{stat.label}</p>
                      <p className="text-lg font-bold mt-0.5">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manual Input Fields */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">手动填写</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">微信联系次数</p>
                    <Input
                      type="number"
                      placeholder="0"
                      value={editWechat}
                      onChange={(e) => setEditWechat(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">面试量</p>
                    <Input
                      type="number"
                      placeholder="0"
                      value={editInterview}
                      onChange={(e) => setEditInterview(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">新签量</p>
                    <Input
                      type="number"
                      placeholder="0"
                      value={editNewSign}
                      onChange={(e) => setEditNewSign(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">业绩完成（元）</p>
                    <Input
                      type="number"
                      placeholder="0"
                      value={editRevenue}
                      onChange={(e) => setEditRevenue(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Work Summary */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-1.5">工作总结</p>
                <Textarea
                  placeholder="请填写今日工作总结..."
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                  rows={4}
                />
              </div>

              {/* Difficulties */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-1.5">遇到的困难</p>
                <Textarea
                  placeholder="请填写遇到的困难及需要的支持..."
                  value={editDifficulties}
                  onChange={(e) => setEditDifficulties(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                  rows={4}
                />
              </div>

              {/* Tomorrow Plan */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-1.5">明日计划</p>
                <Textarea
                  placeholder="请填写明日工作计划..."
                  value={editTomorrowPlan}
                  onChange={(e) => setEditTomorrowPlan(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                  rows={4}
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="shrink-0 px-4 py-3 border-t border-border flex justify-end gap-3">
              <Button variant="outline" className="h-9 px-5 text-sm bg-transparent" onClick={handleSaveDraft}>
                保存草稿
              </Button>
              <Button
                className="h-9 px-5 text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSubmit}
                disabled={!editSummary.trim()}
              >
                提交日志
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Journal Detail Drawer */}
      <Sheet open={!!selectedJournal} onOpenChange={() => setSelectedJournal(null)}>
        <SheetContent side="right" className="w-[90vw] max-w-md p-0 flex flex-col h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
              <SheetTitle className="text-base font-semibold">日志详情</SheetTitle>
              <button onClick={() => setSelectedJournal(null)} className="p-1">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            {selectedJournal && (() => {
              const typeInfo = getTypeInfo(selectedJournal.type)
              const s = selectedJournal.systemStats
              const m = selectedJournal.manualStats
              return (
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] px-2 py-0.5 ${typeInfo.color}`}>{typeInfo.label}</Badge>
                    <span className="text-xs text-muted-foreground">{selectedJournal.date}</span>
                    <span className="text-xs text-muted-foreground">{selectedJournal.time}</span>
                    {selectedJournal.status === "draft" && (
                      <Badge className="text-[10px] px-1.5 py-0 bg-orange-100 text-orange-600">草稿</Badge>
                    )}
                  </div>

                  {/* System Stats */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <BarChart3 className="w-3.5 h-3.5 text-primary" />
                      <p className="text-xs font-semibold text-foreground">系统统计</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-pink-500">分配数据量</p>
                        <p className="text-base font-bold text-pink-600">{s.allocatedData}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-green-500">呼出次数</p>
                        <p className="text-base font-bold text-green-600">{s.callCount}</p>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-amber-500">通话时长</p>
                        <p className="text-base font-bold text-amber-600">{s.callDuration}分钟</p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-red-400">接通率</p>
                        <p className="text-base font-bold text-red-500">{s.connectRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Manual Stats */}
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">手动填写数据</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "微信联系次数", value: m.wechatCount },
                        { label: "面试量", value: m.interviewCount },
                        { label: "新签量", value: m.newSignCount },
                        { label: "业绩完成", value: `${m.revenue.toLocaleString()}元` },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2">
                          <span className="text-[11px] text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-semibold text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1.5">工作总结</p>
                    <div className="bg-muted/30 rounded-xl p-3">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedJournal.summary}</p>
                    </div>
                  </div>

                  {/* Difficulties */}
                  {selectedJournal.difficulties && (
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5">遇到的困难</p>
                      <div className="bg-orange-50/50 rounded-xl p-3">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedJournal.difficulties}</p>
                      </div>
                    </div>
                  )}

                  {/* Tomorrow Plan */}
                  {selectedJournal.tomorrowPlan && (
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5">明日计划</p>
                      <div className="bg-blue-50/50 rounded-xl p-3">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedJournal.tomorrowPlan}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
