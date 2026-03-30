"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRatingRow({
  rating,
  className,
  sizeClassName = "h-3.5 w-3.5",
  showScore = true,
}: {
  rating: number
  className?: string
  sizeClassName?: string
  showScore?: boolean
}) {
  const rounded = Math.min(5, Math.max(0, Math.round(rating)))
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClassName,
            i < rounded ? "fill-amber-400 text-amber-400" : "text-amber-200"
          )}
        />
      ))}
      {showScore && (
        <span className="ml-0.5 text-xs font-medium tabular-nums text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
