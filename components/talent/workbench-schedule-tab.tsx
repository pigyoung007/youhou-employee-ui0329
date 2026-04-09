"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ChevronLeft, ChevronRight, Calendar, Clock, MapPin,
  Plus, User, Check, X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ScheduleStatus = "booked" | "available" | "rest" | "unavailable"

interface ScheduleEvent {
  id: string
  date: string
  status: ScheduleStatus
  customerName?: string
  serviceType?: string
  address?: string
}

const statusConfig: Record<ScheduleStatus, { label: string; color: string; dotColor: string }> = {
  booked: { label: "已预约", color: "bg-rose-50 text-rose-600", dotColor: "bg-rose-500" },
  available: { label: "空闲", color: "bg-green-50 text-green-600", dotColor: "bg-green-500" },
  rest: { label: "休息", color: "bg-amber-50 text-amber-600", dotColor: "bg-amber-500" },
  unavailable: { label: "不可用", color: "bg-gray-50 text-gray-600", dotColor: "bg-gray-400" },
}

const generateScheduleData = (): ScheduleEvent[] => {
  const today = new Date()
  const y = today.getFullYear()
  const m = today.getMonth()
  return [
    { id: "1", date: `${y}-${String(m + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`, status: "booked", customerName: "陈女士", serviceType: "月嫂服务", address: "金凤区瑞银中心A座1208" },
    { id: "2", date: `${y}-${String(m + 1).padStart(2, "0")}-${String(today.getDate() + 1).padStart(2, "0")}`, status: "booked", customerName: "陈女士", serviceType: "月嫂服务", address: "金凤区瑞银中心A座1208" },
    { id: "3", date: `${y}-${String(m + 1).padStart(2, "0")}-${String(today.getDate() + 5).padStart(2, "0")}`, status: "rest" },
    { id: "4", date: `${y}-${String(m + 1).padStart(2, "0")}-${String(today.getDate() + 8).padStart(2, "0")}`, status: "available" },
    { id: "5", date: `${y}-${String(m + 1).padStart(2, "0")}-${String(today.getDate() + 10).padStart(2, "0")}`, status: "available" },
    { id: "6", date: `${y}-${String(m + 1).padStart(2, "0")}-${String(today.getDate() + 15).padStart(2, "0")}`, status: "unavailable" },
  ]
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]

export function WorkbenchScheduleTab() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showSetStatus, setShowSetStatus] = useState(false)
  const [scheduleData] = useState(generateScheduleData)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }, [year, month])

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  const getDateStatus = (day: number): ScheduleStatus | null => {
    const dateStr = getDateStr(day)
    const event = scheduleData.find((e) => e.date === dateStr)
    return event?.status || null
  }

  const getDateEvent = (dateStr: string) => scheduleData.find((e) => e.date === dateStr)

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const todayStr = (() => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`
  })()

  const selectedEvent = selectedDate ? getDateEvent(selectedDate) : null

  // Stats
  const bookedDays = scheduleData.filter((e) => e.status === "booked").length
  const availableDays = scheduleData.filter((e) => e.status === "available").length
  const restDays = scheduleData.filter((e) => e.status === "rest").length

  return (
    <div className="space-y-4 px-4 pb-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-rose-600">{bookedDays}</p>
            <p className="text-[10px] text-muted-foreground">已预约</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-green-600">{availableDays}</p>
            <p className="text-[10px] text-muted-foreground">空闲</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-amber-600">{restDays}</p>
            <p className="text-[10px] text-muted-foreground">休息</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1 hover:bg-muted rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-semibold">{year}年{month + 1}月</h3>
            <button onClick={nextMonth} className="p-1 hover:bg-muted rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />
              const dateStr = getDateStr(day)
              const status = getDateStatus(day)
              const isToday = dateStr === todayStr
              const isSelected = dateStr === selectedDate
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                  className={cn(
                    "relative flex flex-col items-center py-1.5 rounded-lg transition-all text-sm",
                    isSelected ? "bg-rose-500 text-white" : isToday ? "bg-rose-50 text-rose-600 font-semibold" : "hover:bg-muted",
                  )}
                >
                  {day}
                  {status && (
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full mt-0.5",
                      isSelected ? "bg-white" : statusConfig[status].dotColor
                    )} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-1">
                <div className={cn("w-2 h-2 rounded-full", config.dotColor)} />
                <span className="text-[10px] text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Detail */}
      {selectedDate && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">{selectedDate}</h4>
              {selectedEvent ? (
                <Badge className={cn("text-[10px]", statusConfig[selectedEvent.status].color)}>
                  {statusConfig[selectedEvent.status].label}
                </Badge>
              ) : (
                <Badge className="text-[10px] bg-gray-50 text-gray-600">无安排</Badge>
              )}
            </div>
            {selectedEvent?.customerName ? (
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><User className="w-3 h-3" /><span>{selectedEvent.customerName}</span></div>
                <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span>{selectedEvent.serviceType}</span></div>
                {selectedEvent.address && (
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /><span>{selectedEvent.address}</span></div>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">暂无服务安排</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Set Schedule Button */}
      <Button
        className="w-full bg-rose-500 hover:bg-rose-600"
        onClick={() => setShowSetStatus(true)}
      >
        <Calendar className="w-4 h-4 mr-2" />
        设置档期
      </Button>

      {/* Set Status Sheet */}
      <Sheet open={showSetStatus} onOpenChange={setShowSetStatus}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">设置档期</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">开始日期</Label>
                <Input type="date" />
              </div>
              <div>
                <Label className="text-xs">结束日期</Label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <Label className="text-xs mb-2 block">状态</Label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "available", label: "空闲可约", icon: Check, color: "text-green-600 border-green-200 bg-green-50" },
                  { id: "rest", label: "休息", icon: Clock, color: "text-amber-600 border-amber-200 bg-amber-50" },
                  { id: "unavailable", label: "不可用", icon: X, color: "text-gray-600 border-gray-200 bg-gray-50" },
                ] as const).map((s) => (
                  <button
                    key={s.id}
                    className={cn("flex items-center gap-2 p-3 rounded-xl border transition-all", s.color)}
                  >
                    <s.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button
              className="w-full bg-rose-500 hover:bg-rose-600"
              onClick={() => { setShowSetStatus(false); alert("档期已更新") }}
            >
              确认设置
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
