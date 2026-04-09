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
  Plus, Calendar, Clock, FileText, Camera, Baby, Heart,
  ChevronLeft, ChevronRight, Search, Image,
} from "lucide-react"
import { cn } from "@/lib/utils"

type LogType = "all" | "baby" | "mother" | "service" | "visit"

interface ServiceLog {
  id: string
  type: LogType
  date: string
  time: string
  title: string
  summary: string
  status: "draft" | "submitted"
  photos?: number
}

const logTypeConfig: Record<string, { label: string; color: string; icon: typeof Baby }> = {
  baby: { label: "宝宝日报", color: "bg-blue-100 text-blue-700", icon: Baby },
  mother: { label: "产妇护理", color: "bg-pink-100 text-pink-700", icon: Heart },
  service: { label: "服务记录", color: "bg-amber-100 text-amber-700", icon: FileText },
  visit: { label: "上门日志", color: "bg-teal-100 text-teal-700", icon: Calendar },
}

const sampleLogs: ServiceLog[] = [
  {
    id: "LOG001", type: "baby", date: "2026-04-09", time: "18:30",
    title: "宝宝日报 - 第12天", summary: "喂奶6次，换尿布8次，睡眠良好，体温36.5°C",
    status: "submitted", photos: 3,
  },
  {
    id: "LOG002", type: "mother", date: "2026-04-09", time: "17:00",
    title: "产妇护理记录", summary: "产妇恢复良好，情绪稳定，完成康复操指导",
    status: "submitted",
  },
  {
    id: "LOG003", type: "service", date: "2026-04-08", time: "20:00",
    title: "月子餐服务记录", summary: "早中晚三餐+加餐均已完成，已上传照片",
    status: "submitted", photos: 4,
  },
  {
    id: "LOG004", type: "baby", date: "2026-04-08", time: "18:00",
    title: "宝宝日报 - 第11天", summary: "黄疸值下降至8.2，喂养量增加",
    status: "submitted", photos: 2,
  },
  {
    id: "LOG005", type: "visit", date: "2026-04-07", time: "10:00",
    title: "上门服务日志", summary: "到达客户家进行产后修复服务，完成骨盆修复项目",
    status: "draft",
  },
]

export function WorkbenchLogsTab() {
  const [logType, setLogType] = useState<LogType>("all")
  const [showCreate, setShowCreate] = useState(false)
  const [createType, setCreateType] = useState<string>("baby")
  const [selectedLog, setSelectedLog] = useState<ServiceLog | null>(null)

  const [babyLog, setBabyLog] = useState({ feedCount: "", diaperWet: "", diaperDirty: "", sleepTotal: "", temperature: "", weight: "", note: "" })
  const [motherLog, setMotherLog] = useState({ recovery: "", mood: "", diet: "", note: "" })

  const filtered = logType === "all" ? sampleLogs : sampleLogs.filter((l) => l.type === logType)

  const today = new Date()
  const currentMonth = `${today.getFullYear()}年${today.getMonth() + 1}月`

  return (
    <div className="space-y-4 px-4 pb-4">
      {/* Month Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-semibold">{currentMonth}</span>
        </div>
        <Button
          size="sm"
          className="bg-rose-500 hover:bg-rose-600"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          写日志
        </Button>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {([
          { id: "all" as const, label: "全部" },
          { id: "baby" as const, label: "宝宝日报" },
          { id: "mother" as const, label: "产妇护理" },
          { id: "service" as const, label: "服务记录" },
          { id: "visit" as const, label: "上门日志" },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setLogType(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              logType === t.id
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Log List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">暂无日志</p>
          </div>
        ) : (
          filtered.map((log) => {
            const typeInfo = logTypeConfig[log.type]
            const TypeIcon = typeInfo?.icon || FileText
            return (
              <Card
                key={log.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedLog(log)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      typeInfo?.color.split(" ")[0] || "bg-gray-100"
                    )}>
                      <TypeIcon className={cn("w-5 h-5", typeInfo?.color.split(" ")[1] || "text-gray-600")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold truncate">{log.title}</h4>
                        {log.status === "draft" && (
                          <Badge className="text-[9px] bg-gray-100 text-gray-600 shrink-0">草稿</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{log.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.date} {log.time}
                        </span>
                        {log.photos && (
                          <span className="flex items-center gap-1">
                            <Image className="w-3 h-3" />
                            {log.photos}张
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Log Detail Sheet */}
      <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">日志详情</SheetTitle>
          </SheetHeader>
          {selectedLog && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className={cn("rounded-xl p-4", logTypeConfig[selectedLog.type]?.color.split(" ")[0] || "bg-gray-50")}>
                <Badge className={cn("text-[10px] mb-2", logTypeConfig[selectedLog.type]?.color)}>
                  {logTypeConfig[selectedLog.type]?.label}
                </Badge>
                <h3 className="font-semibold text-foreground">{selectedLog.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{selectedLog.date} {selectedLog.time}</p>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <h4 className="text-sm font-semibold mb-2">日志内容</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedLog.summary}</p>
                </CardContent>
              </Card>
              {selectedLog.photos && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <h4 className="text-sm font-semibold mb-2">照片（{selectedLog.photos}张）</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: selectedLog.photos }).map((_, i) => (
                        <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-muted-foreground/30" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Log Sheet */}
      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">填写日志</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            {/* Log Type Selector */}
            <div>
              <Label className="text-xs mb-2 block">日志类型</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(logTypeConfig).map(([id, config]) => {
                  const Icon = config.icon
                  return (
                    <button
                      key={id}
                      onClick={() => setCreateType(id)}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-xl border transition-all",
                        createType === id
                          ? "border-rose-300 bg-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{config.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Baby Log Form */}
            {createType === "baby" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1"><Baby className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-sm">宝宝护理记录</h3></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">喂养次数</Label><Input value={babyLog.feedCount} onChange={(e) => setBabyLog({ ...babyLog, feedCount: e.target.value })} placeholder="次" /></div>
                  <div><Label className="text-xs">换尿布(湿)</Label><Input value={babyLog.diaperWet} onChange={(e) => setBabyLog({ ...babyLog, diaperWet: e.target.value })} placeholder="次" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">换尿布(便)</Label><Input value={babyLog.diaperDirty} onChange={(e) => setBabyLog({ ...babyLog, diaperDirty: e.target.value })} placeholder="次" /></div>
                  <div><Label className="text-xs">睡眠时长</Label><Input value={babyLog.sleepTotal} onChange={(e) => setBabyLog({ ...babyLog, sleepTotal: e.target.value })} placeholder="小时" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">体温</Label><Input value={babyLog.temperature} onChange={(e) => setBabyLog({ ...babyLog, temperature: e.target.value })} placeholder="°C" /></div>
                  <div><Label className="text-xs">体重</Label><Input value={babyLog.weight} onChange={(e) => setBabyLog({ ...babyLog, weight: e.target.value })} placeholder="kg" /></div>
                </div>
                <div><Label className="text-xs">备注</Label><Textarea value={babyLog.note} onChange={(e) => setBabyLog({ ...babyLog, note: e.target.value })} placeholder="记录宝宝今日特殊情况..." rows={2} /></div>
              </div>
            )}

            {/* Mother Log Form */}
            {createType === "mother" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1"><Heart className="w-5 h-5 text-pink-500" /><h3 className="font-semibold text-sm">产妇护理记录</h3></div>
                <div><Label className="text-xs">恢复情况</Label><Textarea value={motherLog.recovery} onChange={(e) => setMotherLog({ ...motherLog, recovery: e.target.value })} placeholder="记录产妇恢复情况..." rows={2} /></div>
                <div><Label className="text-xs">情绪状态</Label><Input value={motherLog.mood} onChange={(e) => setMotherLog({ ...motherLog, mood: e.target.value })} placeholder="如：稳定、焦虑、开心等" /></div>
                <div><Label className="text-xs">饮食情况</Label><Textarea value={motherLog.diet} onChange={(e) => setMotherLog({ ...motherLog, diet: e.target.value })} placeholder="记录今日饮食情况..." rows={2} /></div>
                <div><Label className="text-xs">其他备注</Label><Textarea value={motherLog.note} onChange={(e) => setMotherLog({ ...motherLog, note: e.target.value })} placeholder="其他需要注意的事项..." rows={2} /></div>
              </div>
            )}

            {/* Service / Visit Log Form */}
            {(createType === "service" || createType === "visit") && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1"><FileText className="w-5 h-5 text-amber-500" /><h3 className="font-semibold text-sm">{createType === "service" ? "服务记录" : "上门日志"}</h3></div>
                <div><Label className="text-xs">服务内容</Label><Textarea placeholder="请描述今日服务内容..." rows={3} /></div>
                <div><Label className="text-xs">特殊情况</Label><Textarea placeholder="记录特殊情况或注意事项..." rows={2} /></div>
              </div>
            )}

            {/* Photo Upload */}
            <div>
              <Label className="text-xs mb-2 block">上传照片</Label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-rose-300 transition-colors">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
                <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-rose-300 transition-colors">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => { setShowCreate(false); alert("已保存草稿") }}>
              保存草稿
            </Button>
            <Button className="flex-1 bg-rose-500 hover:bg-rose-600" onClick={() => { setShowCreate(false); alert("日志已提交") }}>
              提交日志
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
