import { cn } from "@/lib/utils"

function fmtConsultant(v?: string | null) {
  if (v == null || String(v).trim() === "") return "—"
  return v
}

export function OrderConsultantLines({
  maternityConsultant,
  careerConsultant,
  className,
}: {
  maternityConsultant?: string | null
  careerConsultant?: string | null
  className?: string
}) {
  return (
    <div className={cn("text-[11px] text-muted-foreground space-y-0.5", className)}>
      <p>母婴顾问：{fmtConsultant(maternityConsultant)}</p>
      <p>职业顾问：{fmtConsultant(careerConsultant)}</p>
    </div>
  )
}
