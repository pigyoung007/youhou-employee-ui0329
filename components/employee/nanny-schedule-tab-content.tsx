"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScheduleOverviewBar, type ScheduleOverviewSegment } from "@/components/employee/schedule-overview-bar"

/** 客户详情 / 人才库共用的档期默认示图（无后端数据时） */
export const DEFAULT_NANNY_SCHEDULE_SEGMENTS: ScheduleOverviewSegment[] = [
  { kind: "booked", start: { month: 1, day: 11 }, end: { month: 2, day: 10 } },
  { kind: "training", start: { month: 2, day: 11 }, end: { month: 3, day: 8 } },
  { kind: "available", start: { month: 3, day: 9 }, end: { month: 5, day: 18 } },
  { kind: "booked", start: { month: 5, day: 19 }, end: { month: 8, day: 31 } },
]

export interface NannyScheduleBookingItem {
  id: string
  name: string
  range: string
  st: string
}

export interface NannyScheduleTabContentProps {
  segments: ScheduleOverviewSegment[]
  year?: number
  idleDays?: number
  onJobDays?: number
  vacationDays?: number
  currentStatus?: string
  statusHint?: string
  /** 状态说明条样式（待岗绿 / 上户琥珀 / 培训蓝等） */
  bannerTone?: "idle" | "working" | "training"
  /** 预约/排期列表（客户详情档案等场景） */
  bookings?: NannyScheduleBookingItem[]
  className?: string
}

const bannerToneClass: Record<NonNullable<NannyScheduleTabContentProps["bannerTone"]>, string> = {
  idle: "border-green-200 bg-green-50",
  working: "border-amber-200 bg-amber-50",
  training: "border-sky-200 bg-sky-50",
}

const bannerTitleClass: Record<NonNullable<NannyScheduleTabContentProps["bannerTone"]>, string> = {
  idle: "text-green-900",
  working: "text-amber-900",
  training: "text-sky-900",
}

const bannerSubClass: Record<NonNullable<NannyScheduleTabContentProps["bannerTone"]>, string> = {
  idle: "text-green-700",
  working: "text-amber-800",
  training: "text-sky-800",
}

export function resolveScheduleBannerTone(workStatus: string): NannyScheduleTabContentProps["bannerTone"] {
  if (workStatus.includes("服务") || workStatus.includes("上户")) return "working"
  if (workStatus.includes("培训") || workStatus.includes("休息")) return "training"
  return "idle"
}

export function resolveScheduleStatusHint(workStatus: string): string {
  if (workStatus.includes("服务") || workStatus.includes("上户")) return "当前上户服务中，新单需结合档期条确认空档"
  if (workStatus.includes("培训")) return "培训阶段安排中，请关注蓝色培训段与可排单空档"
  return "可立即派单服务"
}

export function NannyScheduleTabContent({
  segments,
  year = 2026,
  idleDays = 3,
  onJobDays = 26,
  vacationDays = 0,
  currentStatus = "待岗",
  statusHint = "可立即派单服务",
  bannerTone = "idle",
  bookings,
  className,
}: NannyScheduleTabContentProps) {
  const tone = bannerTone ?? "idle"

  return (
    <div className={cn("space-y-3", className)}>
      <div className="rounded-xl border border-border/70 bg-background px-3 py-3 shadow-sm">
        <ScheduleOverviewBar year={year} segments={segments} density="comfortable" />
      </div>

      <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-lg border border-border/40 bg-muted/25 px-2 py-1.5 text-center text-[10px]">
        <span className="tabular-nums">
          <span className="font-semibold text-green-600">待岗</span> {idleDays}天
        </span>
        <span className="text-border opacity-40" aria-hidden>
          ·
        </span>
        <span className="tabular-nums">
          <span className="font-semibold text-amber-600">上户</span> {onJobDays}天
        </span>
        <span className="text-border opacity-40" aria-hidden>
          ·
        </span>
        <span className="tabular-nums">
          <span className="font-semibold text-gray-600">休假</span> {vacationDays}天
        </span>
      </div>

      <div className={cn("rounded-lg border px-2.5 py-2", bannerToneClass[tone])}>
        <p className={cn("text-xs font-semibold leading-snug", bannerTitleClass[tone])}>当前状态：{currentStatus}</p>
        <p className={cn("mt-0.5 text-[10px] leading-relaxed", bannerSubClass[tone])}>{statusHint}</p>
      </div>

      {bookings && bookings.length > 0 && (
        <div className="space-y-2">
          {bookings.map((s) => (
            <Card key={s.id} className="border-border border shadow-sm">
              <CardContent className="space-y-1 p-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-foreground font-medium">{s.name}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {s.st}
                  </Badge>
                </div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3 shrink-0" />
                  {s.range}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
