"use client"

import { cn } from "@/lib/utils"

export type ScheduleSegmentKind = "booked" | "training" | "available"

export interface ScheduleOverviewSegment {
  kind: ScheduleSegmentKind
  start: { month: number; day: number }
  end: { month: number; day: number }
}

interface ScheduleOverviewBarProps {
  year?: number
  /** 时间轴起止月份（含），默认 1–8 月 */
  fromMonth?: number
  toMonth?: number
  segments: ScheduleOverviewSegment[]
  className?: string
  /** compact：列表卡片等；comfortable：档期详情主区域，留白与字阶更大 */
  density?: "compact" | "comfortable"
  /** 是否绘制起止日期行（过窄色块会自动跳过，避免竖排换行） */
  showDateLabels?: boolean
  /**
   * 色块在轴上宽度占比低于此值时不显示该段的开始/结束日期（默认随 density）
   * 亦可传入 0–100 覆盖
   */
  minWidthPercentForDateLabels?: number
}

const KIND_CLASS: Record<ScheduleSegmentKind, string> = {
  booked: "bg-red-400",
  training: "bg-sky-500",
  available: "bg-background border border-border/80",
}

function dayIndexSince(year: number, month: number, day: number, origin: Date): number {
  const t = new Date(year, month - 1, day)
  return Math.round((t.getTime() - origin.getTime()) / 86400000)
}

function formatCnDate(month: number, day: number): string {
  return `${month}月${day}日`
}

export function ScheduleOverviewBar({
  year = new Date().getFullYear(),
  fromMonth = 1,
  toMonth = 8,
  segments,
  className,
  density = "compact",
  showDateLabels = true,
  minWidthPercentForDateLabels: minWidthPctProp,
}: ScheduleOverviewBarProps) {
  const origin = new Date(year, fromMonth - 1, 1)
  const endDate = new Date(year, toMonth, 0)
  const totalDays = dayIndexSince(year, toMonth, endDate.getDate(), origin) + 1

  const monthLabels: number[] = []
  for (let m = fromMonth; m <= toMonth; m++) monthLabels.push(m)

  const comfortable = density === "comfortable"
  const minWidthPct =
    minWidthPctProp ?? (comfortable ? 20 : 14)
  /** 过短天数仍不标字 */
  const minSpanDaysForLabels = 6

  return (
    <div
      className={cn("w-full", comfortable ? "space-y-2.5 py-1" : "space-y-1", className)}
    >
      <div
        className={cn(
          "relative flex justify-between text-muted-foreground",
          comfortable ? "px-0.5 text-[11px] leading-none" : "px-0.5 text-[10px]",
        )}
      >
        {monthLabels.map((m) => (
          <span key={m} className="flex-1 text-center tabular-nums">
            {m}月
          </span>
        ))}
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full border border-border/50 bg-muted/60",
          comfortable ? "h-[18px]" : "h-3",
        )}
      >
        {segments.map((seg, i) => {
          const startIdx = dayIndexSince(year, seg.start.month, seg.start.day, origin)
          const endIdx = dayIndexSince(year, seg.end.month, seg.end.day, origin)
          const spanDays = endIdx - startIdx + 1
          const left = (startIdx / totalDays) * 100
          const width = (spanDays / totalDays) * 100
          return (
            <div
              key={i}
              className={cn(
                "absolute top-0 h-full",
                comfortable ? "rounded-full" : "rounded-sm",
                KIND_CLASS[seg.kind],
              )}
              style={{ left: `${left}%`, width: `${Math.max(width, 0.5)}%` }}
            />
          )
        })}
      </div>

      {showDateLabels ? (
        (() => {
          const labelNodes = segments.map((seg, i) => {
            const startIdx = dayIndexSince(year, seg.start.month, seg.start.day, origin)
            const endIdx = dayIndexSince(year, seg.end.month, seg.end.day, origin)
            const spanDays = endIdx - startIdx + 1
            const widthPct = (spanDays / totalDays) * 100
            if (spanDays < minSpanDaysForLabels || widthPct < minWidthPct) return null
            const left = (startIdx / totalDays) * 100
            return (
              <div
                key={`lbl-${i}`}
                className="absolute top-0 flex justify-between gap-1 px-0.5"
                style={{ left: `${left}%`, width: `${widthPct}%` }}
              >
                <span className="min-w-0 shrink truncate whitespace-nowrap text-left tabular-nums">
                  {formatCnDate(seg.start.month, seg.start.day)}
                </span>
                <span className="min-w-0 shrink truncate whitespace-nowrap text-right tabular-nums">
                  {formatCnDate(seg.end.month, seg.end.day)}
                </span>
              </div>
            )
          })
          const hasAny = labelNodes.some((n) => n != null)
          if (!hasAny) return null
          return (
            <div
              className={cn(
                "relative text-muted-foreground",
                comfortable ? "min-h-[22px] text-[10px] leading-none" : "min-h-[16px] text-[9px] leading-none",
              )}
            >
              {labelNodes}
            </div>
          )
        })()
      ) : null}
    </div>
  )
}
