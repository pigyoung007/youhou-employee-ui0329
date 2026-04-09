"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Sun,
  Moon,
  Coffee,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

type DayStatus = "booked" | "available" | "rest" | "leave" | null

interface ScheduleDay {
  day: number
  status: DayStatus
  services?: { time: string; customer: string; service: string; address: string }[]
}

const STATUS_COLORS: Record<string, string> = {
  booked: "bg-teal-500 text-white",
  available: "bg-green-100 text-green-700",
  rest: "bg-gray-200 text-gray-500",
  leave: "bg-amber-100 text-amber-700",
}

const STATUS_LABELS: Record<string, string> = {
  booked: "已约",
  available: "可服务",
  rest: "休息",
  leave: "请假",
}

export function WorkbenchScheduleTab() {
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(4)
  const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null)
  const [showDayDetail, setShowDayDetail] = useState(false)
  const [showSetStatus, setShowSetStatus] = useState(false)

  const scheduleData: Record<number, DayStatus> = {
    1: "booked", 2: "booked", 3: "available", 4: "rest",
    5: "booked", 6: "rest", 7: "booked", 8: "available",
    9: "booked", 10: "booked", 11: "available", 12: "available",
    13: "rest", 14: "booked", 15: "available", 16: "booked",
    17: "available", 18: "rest", 19: "leave", 20: "rest",
    21: "booked", 22: "available", 23: "booked", 24: "available",
    25: "rest", 26: "booked", 27: "available", 28: "booked",
    29: "available", 30: "booked",
  }

  const dayServices: Record<number, { time: string; customer: string; service: string; address: string }[]> = {
    9: [
      { time: "09:00-10:30", customer: "王女士", service: "产后腹直肌修复", address: "朝阳区建国路88号" },
      { time: "14:00-15:30", customer: "李女士", service: "盆底肌康复训练", address: "海淀区中关村大街66号" },
      { time: "16:00-17:00", customer: "张女士", service: "乳腺疏通护理", address: "西城区金融街18号" },
    ],
    10: [
      { time: "09:00-10:30", customer: "陈女士", service: "产后全身调理", address: "朝阳区望京SOHO T2" },
      { time: "14:00-15:00", customer: "吴女士", service: "乳腺疏通护理", address: "丰台区丽泽路55号" },
    ],
  }

  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month - 1, 1).getDay()

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const bookedDays = Object.values(scheduleData).filter((s) => s === "booked").length
  const availableDays = Object.values(scheduleData).filter((s) => s === "available").length
  const restDays = Object.values(scheduleData).filter((s) => s === "rest" || s === "leave").length

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"]

  return (
    <div className="space-y-3">
      <Card className="border border-border/80 shadow-sm">
        <CardContent className="p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-teal-600">{bookedDays}</p>
              <p className="text-[10px] text-muted-foreground">已约天数</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">{availableDays}</p>
              <p className="text-[10px] text-muted-foreground">可服务</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-500">{restDays}</p>
              <p className="text-[10px] text-muted-foreground">休息/请假</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/80 shadow-sm">
        <CardContent className="p-3">
          <div className="mb-3 flex items-center justify-between">
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentYear}年{currentMonth}月
            </span>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-0.5">
            {weekDays.map((d) => (
              <div key={d} className="py-1 text-center text-[10px] font-medium text-muted-foreground">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const status = scheduleData[day]
              const isToday = day === 9
              return (
                <button
                  key={day}
                  type="button"
                  className={`relative flex aspect-square items-center justify-center rounded-md text-xs transition-colors ${
                    status ? STATUS_COLORS[status] : "hover:bg-muted"
                  } ${isToday ? "ring-2 ring-teal-400 ring-offset-1" : ""}`}
                  onClick={() => {
                    const services = dayServices[day] || []
                    setSelectedDay({ day, status, services })
                    setShowDayDetail(true)
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1">
                <div className={`h-2.5 w-2.5 rounded-sm ${STATUS_COLORS[key].split(" ")[0]}`} />
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        type="button"
        variant="outline"
        className="h-9 w-full border-teal-200 bg-transparent text-xs text-teal-600"
        onClick={() => setShowSetStatus(true)}
      >
        <Calendar className="mr-1.5 h-3.5 w-3.5" />
        批量设置档期状态
      </Button>

      <Dialog open={showDayDetail} onOpenChange={setShowDayDetail}>
        <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {currentMonth}月{selectedDay?.day}日 档期详情
            </DialogTitle>
          </DialogHeader>
          {selectedDay && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={selectedDay.status ? STATUS_COLORS[selectedDay.status] : "bg-gray-100"}>
                  {selectedDay.status ? STATUS_LABELS[selectedDay.status] : "未设置"}
                </Badge>
              </div>

              {selectedDay.services && selectedDay.services.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">当日服务安排</p>
                  {selectedDay.services.map((s, idx) => (
                    <Card key={idx} className="border">
                      <CardContent className="p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{s.service}</span>
                          <span className="text-xs text-muted-foreground">{s.time}</span>
                        </div>
                        <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{s.customer}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{s.address}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">当日无服务安排</p>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-xs"
                  onClick={() => {
                    setShowDayDetail(false)
                    alert("已设为可服务")
                  }}
                >
                  <Sun className="mr-1 h-3 w-3" />
                  设为可服务
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-xs"
                  onClick={() => {
                    setShowDayDetail(false)
                    alert("已设为休息")
                  }}
                >
                  <Coffee className="mr-1 h-3 w-3" />
                  设为休息
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showSetStatus} onOpenChange={setShowSetStatus}>
        <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>批量设置档期</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              选择日期范围并设置统一状态（演示功能，上线后支持日期区间选择）
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" className="h-12 flex-col gap-0.5 bg-transparent text-xs">
                <Sun className="h-4 w-4 text-green-600" />
                <span>批量设为可服务</span>
              </Button>
              <Button type="button" variant="outline" className="h-12 flex-col gap-0.5 bg-transparent text-xs">
                <Coffee className="h-4 w-4 text-gray-500" />
                <span>批量设为休息</span>
              </Button>
              <Button type="button" variant="outline" className="h-12 flex-col gap-0.5 bg-transparent text-xs">
                <Moon className="h-4 w-4 text-amber-600" />
                <span>申请请假</span>
              </Button>
              <Button type="button" variant="outline" className="h-12 flex-col gap-0.5 bg-transparent text-xs">
                <Calendar className="h-4 w-4 text-teal-600" />
                <span>查看全年概览</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="w-full" onClick={() => setShowSetStatus(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
