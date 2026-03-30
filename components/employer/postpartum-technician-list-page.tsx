"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Search,
  Star,
  MapPin,
  Heart,
  SlidersHorizontal,
  Filter,
  Calendar,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { originToProvinceLabel } from "@/lib/employer-caregiver-display"
import { StarRatingRow } from "@/components/employer/star-rating-row"
import { BookingModal } from "@/components/booking-modal"

const technicians = [
  {
    id: 1,
    name: "陈老师",
    title: "高级产康师",
    avatar: "/professional-chinese-woman-avatar-portrait.jpg",
    rating: 4.9,
    reviews: 326,
    goodReviewRate: "98%",
    age: 38,
    education: "大专",
    origin: "江苏南京",
    personality: "细致稳妥",
    specialty: "骨盆修复、腹直肌",
    specialties: ["骨盆修复", "腹直肌"],
    available: true,
  },
  {
    id: 2,
    name: "林老师",
    title: "资深催乳师",
    avatar: "/young-chinese-woman.jpg",
    rating: 5.0,
    reviews: 218,
    goodReviewRate: "99%",
    age: 35,
    education: "本科",
    origin: "浙江杭州",
    personality: "亲和力强",
    specialty: "乳腺疏通、母乳指导",
    specialties: ["乳腺疏通", "母乳喂养"],
    available: true,
  },
  {
    id: 3,
    name: "赵老师",
    title: "产后康复师",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    rating: 4.8,
    reviews: 156,
    goodReviewRate: "97%",
    age: 41,
    education: "高中",
    origin: "四川成都",
    personality: "沉稳耐心",
    specialty: "盆底肌、体态调整",
    specialties: ["盆底肌", "体态调整"],
    available: false,
  },
]

const filterOptions = {
  specialty: [
    { id: "pg", label: "骨盆修复", checked: false },
    { id: "fzj", label: "腹直肌", checked: false },
    { id: "pdj", label: "盆底肌", checked: false },
    { id: "rx", label: "乳腺护理", checked: false },
  ],
  minRating: [
    { id: "45", label: "4.5星及以上", checked: false },
    { id: "48", label: "4.8星及以上", checked: false },
    { id: "50", label: "5.0星", checked: false },
  ],
  age: [
    { id: "30-40", label: "30-40岁", checked: false },
    { id: "40-50", label: "40-50岁", checked: false },
  ],
  education: [
    { id: "high", label: "高中", checked: false },
    { id: "college", label: "大专", checked: false },
    { id: "bachelor", label: "本科及以上", checked: false },
  ],
  personality: [
    { id: "xi", label: "细致稳妥", checked: false },
    { id: "qin", label: "亲和力强", checked: false },
    { id: "chen", label: "沉稳耐心", checked: false },
  ],
  origin: [
    { id: "js", label: "江苏", checked: false },
    { id: "zj", label: "浙江", checked: false },
    { id: "sc", label: "四川", checked: false },
  ],
}

interface PostpartumTechnicianListPageProps {
  onBack: () => void
  isGuest?: boolean
  onRegister?: () => void
}

export function PostpartumTechnicianListPage({ onBack, isGuest, onRegister }: PostpartumTechnicianListPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState(filterOptions)
  const [likedList, setLikedList] = useState<number[]>([])
  const [showBooking, setShowBooking] = useState(false)
  const [selected, setSelected] = useState<(typeof technicians)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleFilterChange = (category: keyof typeof filterOptions, id: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }))
  }

  const toggleLike = (id: number) => {
    setLikedList((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  if (showDetail && selected) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <header className="safe-area-top sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 shadow-sm backdrop-blur-md">
          <button type="button" onClick={() => setShowDetail(false)} className="p-1">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">技师详情</h1>
          <button type="button" onClick={() => toggleLike(selected.id)} className="p-1">
            <Heart
              className={cn(
                "h-5 w-5",
                likedList.includes(selected.id) ? "fill-destructive text-destructive" : "text-muted-foreground"
              )}
            />
          </button>
        </header>

        <div className="px-4 py-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img
                  src={selected.avatar || "/placeholder.svg"}
                  alt={selected.name}
                  className="h-16 w-16 rounded-full border-2 border-card object-cover shadow"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
                    <Badge className="border-0 bg-pink-100 text-[10px] text-pink-700">{selected.title}</Badge>
                  </div>
                  <StarRatingRow rating={selected.rating} className="mt-1" sizeClassName="h-4 w-4" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    服务好评 <span className="font-semibold text-pink-600">{selected.goodReviewRate}</span>
                    <span className="mx-1">·</span>
                    {selected.reviews} 条评价
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{selected.age}岁</span>
                    <span>{selected.education}</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-3 w-3" />
                      {originToProvinceLabel(selected.origin)}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <p>
                      <span className="text-muted-foreground">性格特征：</span>
                      <span className="text-foreground">{selected.personality}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">特长：</span>
                      <span className="text-foreground">{selected.specialty}</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card safe-area-bottom">
          <div className="mx-auto flex max-w-md gap-3 px-4 py-3">
            <Button
              variant="outline"
              className="h-12 flex-1 rounded-xl border-pink-300 bg-transparent text-pink-600"
              onClick={() => {
                if (isGuest && onRegister) onRegister()
              }}
            >
              在线咨询
            </Button>
            <Button
              className="h-12 flex-1 rounded-xl bg-pink-500 text-white hover:bg-pink-600"
              onClick={() => {
                if (isGuest && onRegister) onRegister()
                else setShowBooking(true)
              }}
            >
              <Calendar className="mr-1 h-5 w-5" />
              预约服务
            </Button>
          </div>
        </div>

        {showBooking && (
          <BookingModal
            onClose={() => setShowBooking(false)}
            caregiverName={selected.name}
            onSuccess={() => {
              setShowBooking(false)
              setShowDetail(false)
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-4">
      <header className="safe-area-top sticky top-0 z-10 bg-card shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button type="button" onClick={onBack} className="p-1">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索产康技师..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-full border-0 bg-muted/50 pl-9 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <div className="space-y-3 px-4 py-4">
        {technicians.map((t) => (
          <Card
            key={t.id}
            className="cursor-pointer overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
            onClick={() => {
              setSelected(t)
              setShowDetail(true)
            }}
          >
            <CardContent className="p-0">
              <div className="flex">
                <div className="relative w-28 shrink-0">
                  <img
                    src={t.avatar || "/placeholder.svg"}
                    alt={t.name}
                    className="aspect-square h-full w-full object-cover"
                  />
                  {t.available ? (
                    <div className="absolute left-2 top-2 rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-medium text-card">
                      可预约
                    </div>
                  ) : (
                    <div className="absolute left-2 top-2 rounded-full bg-muted-foreground px-2 py-0.5 text-[10px] font-medium text-card">
                      已约满
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-foreground">{t.name}</h3>
                          <Badge className="border-0 bg-pink-100 text-[10px] text-pink-700">{t.title}</Badge>
                        </div>
                        <StarRatingRow rating={t.rating} className="mt-1" />
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          服务好评 <span className="font-semibold text-pink-600">{t.goodReviewRate}</span>
                          <span className="mx-1">·</span>
                          {t.reviews} 条评价
                        </p>
                        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                          <span className="text-foreground">{t.age}岁</span>
                          <span>·</span>
                          <span>{t.education}</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {originToProvinceLabel(t.origin)}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-foreground">
                          <span className="text-muted-foreground">性格</span> {t.personality}
                          <span className="mx-1 text-muted-foreground">|</span>
                          <span className="text-muted-foreground">特长</span> {t.specialty}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(t.id)
                        }}
                        className="p-1"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5",
                            likedList.includes(t.id) ? "fill-destructive text-destructive" : "text-muted-foreground"
                          )}
                        />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {t.specialties.map((s) => (
                        <span key={s} className="rounded bg-pink-50 px-1.5 py-0.5 text-[10px] text-pink-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="h-full w-[85vw] max-w-sm">
          <SheetHeader className="border-b pb-3">
            <div className="drawer-kv-row-head">
              <SheetTitle className="flex min-w-0 items-center gap-2">
                <Filter className="h-5 w-5 shrink-0 text-pink-600" />
                <span className="break-words">筛选条件</span>
              </SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters(filterOptions)}
                className="h-auto shrink-0 p-0 text-muted-foreground"
              >
                重置
              </Button>
            </div>
          </SheetHeader>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-3">
            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">服务专长</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.specialty.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg border p-2 text-xs transition-all",
                      item.checked ? "border-pink-500 bg-pink-500/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("specialty", item.id)}
                      className="h-3.5 w-3.5 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">评价星级</h4>
              <div className="grid grid-cols-1 gap-1.5">
                {filters.minRating.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg border p-2 text-xs transition-all",
                      item.checked ? "border-pink-500 bg-pink-500/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("minRating", item.id)}
                      className="h-3.5 w-3.5 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                    />
                    <span className="flex items-center gap-1">
                      {item.label}
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">年龄</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.age.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg border p-2 text-xs transition-all",
                      item.checked ? "border-pink-500 bg-pink-500/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("age", item.id)}
                      className="h-3.5 w-3.5 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">学历</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.education.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg border p-2 text-xs transition-all",
                      item.checked ? "border-pink-500 bg-pink-500/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("education", item.id)}
                      className="h-3.5 w-3.5 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">性格特征</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.personality.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg border p-2 text-xs transition-all",
                      item.checked ? "border-pink-500 bg-pink-500/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("personality", item.id)}
                      className="h-3.5 w-3.5 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold text-foreground">籍贯</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {filters.origin.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-1 rounded-lg border p-2 text-xs transition-all",
                      item.checked ? "border-pink-500 bg-pink-500/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("origin", item.id)}
                      className="h-3.5 w-3.5 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t bg-card p-4 safe-area-bottom">
            <div className="flex gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1 bg-transparent">
                  取消
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="flex-1 bg-pink-500 text-white hover:bg-pink-600">确认筛选</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {showBooking && selected && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          caregiverName={selected.name}
          onSuccess={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}
