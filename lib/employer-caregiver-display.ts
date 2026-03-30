/** 籍贯展示为省级（雇主端阿姨/技师卡片） */
export function originToProvinceLabel(origin: string): string {
  if (!origin?.trim()) return ""
  const s = origin.trim()
  const municipality = s.match(/^(北京|上海|天津|重庆)/)
  if (municipality) return municipality[1]!
  if (s.startsWith("内蒙古")) return "内蒙古"
  if (s.startsWith("新疆")) return "新疆"
  if (s.startsWith("西藏")) return "西藏"
  if (s.startsWith("广西")) return "广西"
  if (s.startsWith("宁夏")) return "宁夏"
  const idx = s.indexOf("省")
  if (idx > 0) return s.slice(0, idx + 1)
  return s.slice(0, 2)
}
