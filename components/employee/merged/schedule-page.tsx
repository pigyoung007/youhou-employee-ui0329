"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  ArrowLeft, Calendar, Clock, Plus, ChevronLeft, ChevronRight,
  MapPin, User, Phone, Video, FileText, Bell,
  CheckCircle2, Circle, X, Trash2,
} from "lucide-react"

const eventTypes = [
  { id: "visit", label: "上门拜访", color: "bg-violet-500", light: "bg-violet-100 text-violet-700" },
  { id: "interview", label: "面试安排", color: "bg-blue-500", light: "bg-blue-100 text-blue-700" },
  { id: "meeting", label: "内部会议", color: "bg-amber-500", light: "bg-amber-100 text-amber-700" },
  { id: "followup", label: "客户跟进", color: "bg-teal-500", light: "bg-teal-100 text-teal-700" },
  { id: "training", label: "培训", color: "bg-rose-500", light: "bg-rose-100 text-rose-700" },
  { id: "other", label: "其他", color: "bg-gray-500", light: "bg-gray-100 text-gray-700" },
]

const generateEvents = () => {
  const today = new Date()
  const y = today.getFullYear()
  const m = today.getMonth()
  const d = today.getDate()
  return [
    {
      id: 1, type: "visit", title: "拜访王女士家庭",
      date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      startTime: "09:30", endTime: "10:30",
      location: "金凤区康平路XX小区", contact: "王女士", phone: "138****5678",
      notes: "了解月嫂服务需求，预产期3月中旬",
      done: false,
    },
    {
      id: 2, type: "interview", title: "月嫂面试 - 张阿姨",
      date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      startTime: "14:00", endTime: "15:00",
      location: "公司面试室", contact: "张阿姨", phone: "139****1234",
      notes: "金牌月嫂候选人，5年经验",
      done: false,
    },
    {
      id: 3, type: "meeting", title: "周度部门例会",
      date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      startTime: "16:00", endTime: "17:00",
      location: "公司会议室", contact: "", phone: "",
      notes: "汇报本周业绩，讨论下周计划",
      done: true,
    },
    {
      id: 4, type: "followup", title: "跟进李先生合同签署",
      date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d + 1).padStart(2, "0")}`,
      startTime: "10:00", endTime: "10:30",
      location: "", contact: "李先生", phone: "137****8888",
      notes: "电话确认合同条款，安排签约时间",
      done: false,
    },
    {
      id: 5, type: "visit", title: "产后修复方案沟通",
      date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d + 1).padStart(2, "0")}`,
      startTime: "14:30", endTime: "16:00",
      location: "兴庆区丽景街XX号", contact: "陈女士", phone: "136****6666",
      notes: "介绍骨盆修复和腹直肌修复套餐",
      done: false,
    },
    {
      id: 6, type: "training", title: "新产品培训",
      date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d + 2).padStart(2, "0")}`,
      startTime: "09:00", endTime: "12:00",
      location: "公司培训室", contact: "", phone: "",
      notes: "产后修复新项目培训",
      done: false,
    },
  ]
}

interface SchedulePageProps {
  onBack: () => void
}

export function SchedulePage({ onBack }: SchedulePageProps) {
  const [events] = useState(generateEvents)
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  })
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newType, setNewType] = useState("visit")
  const [newStartTime, setNewStartTime] = useState("09:00")
  const [newEndTime, setNewEndTime] = useState("10:00")
  const [newLocation, setNewLocation] = useState("")
  const [newContact, setNewContact] = useState("")
  const [newNotes, setNewNotes] = useState("")

  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`

  // Calendar helpers
  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate()
  const firstDayOfWeek = new Date(currentMonth.year, currentMonth.month, 1).getDay()
  const monthLabel = `${currentMonth.year}年${currentMonth.month + 1}月`

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 }
      return { ...prev, month: prev.month - 1 }
    })
  }
  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 }
      return { ...prev, month: prev.month + 1 }
    })
  }

  const getDayStr = (day: number) => {
    return `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getEventsForDate = (dateStr: string) => events.filter(e => e.date === dateStr)
  const dayEvents = getEventsForDate(selectedDate)
  const getTypeConfig = (type: string) => eventTypes.find(t => t.id === type) || eventTypes[5]

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"]

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 pt-4 pb-3 safe-area-top">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 -ml-1 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold">日程安排</h1>
          </div>
          <Button
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white text-xs h-7 px-2.5"
            onClick={() => setShowAddEvent(true)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />新建
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/15 rounded-xl px-3 py-1.5 text-center backdrop-blur-sm">
            <p className="text-base font-bold">{events.filter(e => e.date === todayStr).length}</p>
            <p className="text-[10px] text-white/80">今日事项</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5 text-center backdrop-blur-sm">
            <p className="text-base font-bold">{events.filter(e => !e.done).length}</p>
            <p className="text-[10px] text-white/80">待完成</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5 text-center backdrop-blur-sm">
            <p className="text-base font-bold">{events.filter(e => e.done).length}</p>
            <p className="text-[10px] text-white/80">已完成</p>
          </div>
        </div>
      </header>

      <main className="px-3 py-3 space-y-3">
        {/* Calendar */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="p-1 hover:bg-muted rounded-lg">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold">{monthLabel}</span>
              <button onClick={nextMonth} className="p-1 hover:bg-muted rounded-lg">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-0 mb-1">
              {weekDays.map(d => (
                <div key={d} className="text-center text-[10px] text-muted-foreground py-1">{d}</div>
              ))}
            </div>

            {/* Day Grid */}
            <div className="grid grid-cols-7 gap-0">
              {/* Empty cells before first day */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayStr = getDayStr(day)
                const isToday = dayStr === todayStr
                const isSelected = dayStr === selectedDate
                const hasEvents = getEventsForDate(dayStr).length > 0
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dayStr)}
                    className={`h-9 flex flex-col items-center justify-center rounded-lg text-xs relative transition-all ${
                      isSelected
                        ? "bg-teal-500 text-white font-bold"
                        : isToday
                        ? "bg-teal-50 text-teal-600 font-semibold"
                        : "hover:bg-muted"
                    }`}
                  >
                    {day}
                    {hasEvents && !isSelected && (
                      <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-teal-500" />
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day Events */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            {selectedDate === todayStr ? "今日日程" : `${selectedDate.slice(5)} 日程`}
          </h2>
          <Badge variant="secondary" className="text-[10px]">{dayEvents.length} 项</Badge>
        </div>

        {dayEvents.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">暂无日程安排</p>
              <Button size="sm" className="mt-3 bg-teal-500 hover:bg-teal-600 text-xs" onClick={() => setShowAddEvent(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" />添加日程
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(event => {
              const typeConf = getTypeConfig(event.type)
              return (
                <Card
                  key={event.id}
                  className={`border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${event.done ? "opacity-60" : ""}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className={`w-1 shrink-0 rounded-l-xl ${typeConf.color}`} />
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            {event.done ? (
                              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                            )}
                            <h3 className={`text-sm font-medium truncate ${event.done ? "line-through text-muted-foreground" : ""}`}>
                              {event.title}
                            </h3>
                          </div>
                          <Badge className={`text-[9px] px-1.5 py-0 shrink-0 ml-1 ${typeConf.light}`}>{typeConf.label}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground pl-5.5">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />{event.startTime}-{event.endTime}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-0.5 truncate">
                              <MapPin className="w-3 h-3 shrink-0" />{event.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>

      {/* Event Detail Drawer */}
      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent side="right" className="w-[85vw] max-w-sm flex flex-col py-0 h-auto max-h-screen">
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <SheetTitle className="text-base">日程详情</SheetTitle>
              <button onClick={() => setSelectedEvent(null)} className="p-1"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            {selectedEvent && (() => {
              const typeConf = getTypeConfig(selectedEvent.type)
              return (
                <div className="px-4 py-3 space-y-3 overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] px-2 py-0.5 ${typeConf.light}`}>{typeConf.label}</Badge>
                    {selectedEvent.done && <Badge className="bg-teal-100 text-teal-700 text-[10px]">已完成</Badge>}
                  </div>

                  <h3 className="text-base font-bold">{selectedEvent.title}</h3>

                  <div className="space-y-2">
                    {[
                      { icon: Calendar, label: "日期", value: selectedEvent.date },
                      { icon: Clock, label: "时间", value: `${selectedEvent.startTime} - ${selectedEvent.endTime}` },
                      ...(selectedEvent.location ? [{ icon: MapPin, label: "地点", value: selectedEvent.location }] : []),
                      ...(selectedEvent.contact ? [{ icon: User, label: "联系人", value: selectedEvent.contact }] : []),
                      ...(selectedEvent.phone ? [{ icon: Phone, label: "电话", value: selectedEvent.phone }] : []),
                    ].map(row => {
                      const Icon = row.icon
                      return (
                        <div key={row.label} className="flex items-center gap-2.5 py-1.5 border-b border-border/30 last:border-b-0">
                          <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">{row.label}</p>
                            <p className="text-xs font-medium">{row.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {selectedEvent.notes && (
                    <div className="bg-muted/30 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground mb-1">备注</p>
                      <p className="text-sm">{selectedEvent.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1 pb-2">
                    {!selectedEvent.done && (
                      <Button className="flex-1 h-9 text-xs bg-teal-500 hover:bg-teal-600 text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />标记完成
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1 h-9 text-xs bg-transparent">
                      <FileText className="w-3.5 h-3.5 mr-1" />编辑
                    </Button>
                  </div>
                </div>
              )
            })()}
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Event Drawer */}
      <Sheet open={showAddEvent} onOpenChange={setShowAddEvent}>
        <SheetContent side="right" className="w-[90vw] max-w-md flex flex-col py-0 h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
              <SheetTitle className="text-base">新建日程</SheetTitle>
              <button onClick={() => setShowAddEvent(false)} className="p-1"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Title */}
              <div>
                <p className="text-sm font-semibold mb-1.5">日程标题</p>
                <Input
                  placeholder="输入日程标题..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>

              {/* Type */}
              <div>
                <p className="text-sm font-semibold mb-2">类型</p>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setNewType(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        newType === t.id ? `${t.light} ring-1 ring-current` : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm font-semibold mb-1.5">日期</p>
                <Input type="date" value={selectedDate} className="h-10 text-sm" readOnly />
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-semibold mb-1.5">开始时间</p>
                  <Input type="time" value={newStartTime} onChange={e => setNewStartTime(e.target.value)} className="h-10 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5">结束时间</p>
                  <Input type="time" value={newEndTime} onChange={e => setNewEndTime(e.target.value)} className="h-10 text-sm" />
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm font-semibold mb-1.5">地点（可选）</p>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input placeholder="输入地点..." value={newLocation} onChange={e => setNewLocation(e.target.value)} className="h-10 text-sm pl-9" />
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-sm font-semibold mb-1.5">联系人（可选）</p>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input placeholder="输入联系人..." value={newContact} onChange={e => setNewContact(e.target.value)} className="h-10 text-sm pl-9" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-sm font-semibold mb-1.5">备注</p>
                <Textarea
                  placeholder="添加备注信息..."
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="shrink-0 px-4 py-3 border-t border-border flex justify-end gap-3">
              <Button variant="outline" className="h-9 px-5 text-sm bg-transparent" onClick={() => setShowAddEvent(false)}>
                取消
              </Button>
              <Button className="h-9 px-5 text-sm bg-teal-500 hover:bg-teal-600 text-white" disabled={!newTitle.trim()} onClick={() => setShowAddEvent(false)}>
                保存日程
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
