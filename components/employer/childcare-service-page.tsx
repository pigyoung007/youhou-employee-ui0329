"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Search,
  Star,
  Play,
  MapPin,
  Heart,
  GraduationCap,
  BadgeCheck,
  Calendar,
  Award,
  Video,
  SlidersHorizontal,
  Filter,
  Share2, // Import Share2 icon
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { BookingModal } from "@/components/booking-modal"
import { SharePosterModal } from "@/components/share-poster-modal"
import { originToProvinceLabel } from "@/lib/employer-caregiver-display"
import { StarRatingRow } from "@/components/employer/star-rating-row"

const filterTabs = ["全部", "住家育婴师", "白班育婴师", "早教师", "小儿推拿"]

const childcareWorkers = [
  {
    id: 1,
    name: "赵老师",
    avatar: "/professional-chinese-woman-avatar-portrait.jpg",
    rating: 4.9,
    reviews: 186,
    workYears: 7,
    origin: "上海",
    age: 35,
    tags: ["高级育婴师", "蒙氏早教", "辅食达人", "英语启蒙"],
    salary: "¥10,800/月",
    hasVideo: true,
    available: true,
    serviceCount: 52,
    type: "住家育婴师",
    certificates: ["高级育婴师证", "蒙氏教育证", "营养师证"],
    desc: "擅长0-3岁婴幼儿科学喂养与早期教育，蒙氏教育理念融入日常",
    goodReviewRate: "98%",
    education: "大专",
    personality: "亲和有耐心",
    specialty: "蒙氏早教、科学喂养",
  },
  {
    id: 2,
    name: "孙老师",
    avatar: "/young-chinese-woman.jpg",
    rating: 4.8,
    reviews: 124,
    workYears: 5,
    origin: "浙江杭州",
    age: 32,
    tags: ["育婴师", "感统训练", "绘本阅读"],
    salary: "¥8,800/月",
    hasVideo: true,
    available: true,
    serviceCount: 38,
    type: "白班育婴师",
    certificates: ["育婴师证", "感统训练师"],
    desc: "专注婴幼儿感统发展训练，每日定制适龄互动游戏方案",
    goodReviewRate: "97%",
    education: "本科",
    personality: "活泼细致",
    specialty: "感统训练、绘本阅读",
  },
  {
    id: 3,
    name: "周老师",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    rating: 5.0,
    reviews: 98,
    workYears: 10,
    origin: "北京",
    age: 40,
    tags: ["资深早教师", "音乐启蒙", "语言发展"],
    salary: "¥12,800/月",
    hasVideo: false,
    available: false,
    serviceCount: 86,
    type: "早教师",
    certificates: ["高级育婴师证", "早期教育指导师", "心理咨询师"],
    desc: "10年早期教育经验，擅长音乐启蒙与语言发展引导",
    goodReviewRate: "99%",
    education: "本科",
    personality: "稳重专业",
    specialty: "音乐启蒙、语言发展",
  },
  {
    id: 4,
    name: "吴老师",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    rating: 4.7,
    reviews: 76,
    workYears: 4,
    origin: "江苏苏州",
    age: 36,
    tags: ["小儿推拿师", "中医保健", "穴位按摩"],
    salary: "¥280/次",
    hasVideo: true,
    available: true,
    serviceCount: 215,
    type: "小儿推拿",
    certificates: ["小儿推拿师证", "中医保健师"],
    desc: "专业小儿推拿保健，调理积食、咳嗽、夜啼等常见问题",
    goodReviewRate: "96%",
    education: "中专",
    personality: "手法娴熟",
    specialty: "小儿推拿、体质调理",
  },
]

const filterOptions = {
  serviceType: [
    { id: "zhujia", label: "住家育婴师", checked: false },
    { id: "baiban", label: "白班育婴师", checked: false },
    { id: "zaojiao", label: "早教师", checked: false },
    { id: "tuina", label: "小儿推拿", checked: false },
  ],
  minRating: [
    { id: "45", label: "4.5星及以上", checked: false },
    { id: "48", label: "4.8星及以上", checked: false },
    { id: "50", label: "5.0星", checked: false },
  ],
  age: [
    { id: "25-35", label: "25-35岁", checked: false },
    { id: "35-45", label: "35-45岁", checked: false },
    { id: "45+", label: "45岁以上", checked: false },
  ],
  education: [
    { id: "zhongzhuan", label: "中专", checked: false },
    { id: "dazhuan", label: "大专", checked: false },
    { id: "benke", label: "本科及以上", checked: false },
  ],
  personality: [
    { id: "qin", label: "亲和有耐心", checked: false },
    { id: "huo", label: "活泼细致", checked: false },
    { id: "wen", label: "稳重专业", checked: false },
  ],
  specialtyPick: [
    { id: "meng", label: "蒙氏早教", checked: false },
    { id: "gan", label: "感统训练", checked: false },
    { id: "yin", label: "音乐启蒙", checked: false },
    { id: "tui", label: "小儿推拿", checked: false },
  ],
  availability: [
    { id: "available", label: "立即可派", checked: false },
    { id: "soon", label: "一周内可派", checked: false },
    { id: "booked", label: "已预约", checked: false },
  ],
  origin: [
    { id: "shanghai", label: "上海", checked: false },
    { id: "zhejiang", label: "浙江", checked: false },
    { id: "jiangsu", label: "江苏", checked: false },
    { id: "beijing", label: "北京", checked: false },
  ],
}

const reviews = [
  { id: 1, name: "王女士", rating: 5, content: "赵老师非常专业，宝宝在她的引导下进步很大！", date: "2025-11-20" },
  { id: 2, name: "陈先生", rating: 5, content: "早教方案很科学，宝宝每天都很开心。", date: "2025-11-15" },
]

interface ChildcareServicePageProps {
  onBack: () => void
  isGuest?: boolean
  onRegister?: () => void
}

export function ChildcareServicePage({ onBack, isGuest, onRegister }: ChildcareServicePageProps) {
  const [activeFilter, setActiveFilter] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([5000, 15000])
  const [filters, setFilters] = useState(filterOptions)
  const [likedList, setLikedList] = useState<number[]>([])
  const [showBooking, setShowBooking] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<(typeof childcareWorkers)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showPoster, setShowPoster] = useState(false)

  const filteredWorkers = activeFilter === "全部"
    ? childcareWorkers
    : childcareWorkers.filter((w) => w.type === activeFilter)

  const toggleLike = (id: number) => {
    setLikedList((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleFilterChange = (category: keyof typeof filterOptions, id: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    }))
  }

  // Detail View
  if (showDetail && selectedWorker) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 safe-area-top flex items-center justify-between shadow-sm">
          <button onClick={() => setShowDetail(false)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">育婴师详情</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleLike(selectedWorker.id)}>
              <Heart className={cn("w-5 h-5", likedList.includes(selectedWorker.id) ? "fill-destructive text-destructive" : "text-muted-foreground")} />
            </button>
            <button onClick={() => setShowPoster(true)}>
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        <div className="relative aspect-[4/3] bg-muted">
          <img src={selectedWorker.avatar || "/placeholder.svg"} alt={selectedWorker.name} className="w-full h-full object-cover" />
          {selectedWorker.hasVideo && (
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-teal-500/80 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </button>
          )}
        </div>

        <div className="-mt-6 relative z-10 mx-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={selectedWorker.avatar || "/placeholder.svg"} alt={selectedWorker.name} className="w-14 h-14 rounded-full object-cover border-2 border-card shadow" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{selectedWorker.name}</h2>
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">
                      <BadgeCheck className="w-3 h-3 mr-0.5" />
                      已认证
                    </Badge>
                  </div>
                  <StarRatingRow rating={selectedWorker.rating} className="mt-1" sizeClassName="h-4 w-4" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    服务好评 <span className="font-semibold text-teal-600">{selectedWorker.goodReviewRate}</span>
                    <span className="mx-1">·</span>({selectedWorker.reviews}条评价)
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="text-foreground">{selectedWorker.age}岁</span>
                    <span>·</span>
                    <span>{selectedWorker.education}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {originToProvinceLabel(selectedWorker.origin)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug text-foreground">
                    <span className="text-muted-foreground">性格</span> {selectedWorker.personality}
                    <span className="mx-1 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">特长</span> {selectedWorker.specialty}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{selectedWorker.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedWorker.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-teal-500/10 text-teal-700 text-xs">{tag}</Badge>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">薪资不向雇主端展示，签约前由顾问沟通。</p>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 py-4 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-foreground">资质证书</h3>
              </div>
              <div className="flex gap-3">
                {selectedWorker.certificates.map((cert) => (
                  <div key={cert} className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl flex-1">
                    <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                      <BadgeCheck className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-xs text-foreground text-center font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">雇主评价</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-teal-600 h-auto p-0 text-xs">查看全部</Button>
              </div>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-foreground">{review.name}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.content}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-20">
          <div className="max-w-md mx-auto px-4 py-3 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl gap-2 bg-transparent border-teal-400 text-teal-600"
              onClick={() => { if (isGuest && onRegister) onRegister() }}
            >
              <Video className="w-5 h-5" />
              预约面试
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl gap-2 bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => {
                if (isGuest && onRegister) { onRegister() }
                else { setShowBooking(true) }
              }}
            >
              <Calendar className="w-5 h-5" />
              立即签约
            </Button>
          </div>
        </div>

        {showBooking && (
          <BookingModal
            onClose={() => setShowBooking(false)}
            caregiverName={selectedWorker.name}
            onSuccess={() => { setShowBooking(false); setShowDetail(false) }}
          />
        )}

        {showPoster && (
          <SharePosterModal
            onClose={() => setShowPoster(false)}
            type="caregiver"
            themeColor="teal"
            data={{
              name: selectedWorker.name,
              subtitle: selectedWorker.type,
              desc: `${originToProvinceLabel(selectedWorker.origin)} | ${selectedWorker.goodReviewRate}服务好评 | ${selectedWorker.reviews}条评价`,
              price: "面议",
              tags: selectedWorker.tags,
              avatar: selectedWorker.avatar,
              rating: selectedWorker.rating,
              reviews: selectedWorker.reviews,
            }}
          />
        )}
      </div>
    )
  }

  // List View
  return (
    <div className="min-h-screen bg-background pb-4">
      <header className="bg-card sticky top-0 z-10 shadow-sm safe-area-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索育婴师..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-full bg-muted/50 border-0 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === tab ? "bg-teal-500 text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        {filteredWorkers.map((worker) => (
          <Card
            key={worker.id}
            className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => { setSelectedWorker(worker); setShowDetail(true) }}
          >
            <CardContent className="p-0">
              <div className="flex">
                <div className="relative w-28 shrink-0">
                  <img src={worker.avatar || "/placeholder.svg"} alt={worker.name} className="w-full h-full object-cover aspect-square" />
                  {worker.hasVideo && (
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-foreground/60 rounded-full flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-card fill-card ml-0.5" />
                    </div>
                  )}
                  {worker.available ? (
                    <div className="absolute top-2 left-2 bg-teal-500 text-card text-[10px] px-2 py-0.5 rounded-full font-medium">可预约</div>
                  ) : (
                    <div className="absolute top-2 left-2 bg-muted-foreground text-card text-[10px] px-2 py-0.5 rounded-full font-medium">已约满</div>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-foreground">{worker.name}</h3>
                          <Badge className="border-0 bg-teal-100 text-[10px] text-teal-700">{worker.type}</Badge>
                        </div>
                        <StarRatingRow rating={worker.rating} className="mt-0.5" />
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          服务好评 <span className="font-semibold text-teal-600">{worker.goodReviewRate}</span>
                          <span className="mx-1">·</span>({worker.reviews}条评价)
                        </p>
                      </div>
                      <button type="button" onClick={(e) => { e.stopPropagation(); toggleLike(worker.id) }} className="p-1">
                        <Heart className={cn("h-5 w-5", likedList.includes(worker.id) ? "fill-destructive text-destructive" : "text-muted-foreground")} />
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span className="text-foreground">{worker.age}岁</span>
                      <span>·</span>
                      <span>{worker.education}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {originToProvinceLabel(worker.origin)}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] leading-snug text-foreground">
                      <span className="text-muted-foreground">性格</span> {worker.personality}
                      <span className="mx-1 text-muted-foreground">|</span>
                      <span className="text-muted-foreground">特长</span> {worker.specialty}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {worker.tags.slice(0, 3).map((tag, idx) => (
                        <span key={tag} className={cn("px-1.5 py-0.5 text-[10px] rounded", idx === 0 ? "bg-teal-500/10 text-teal-700" : "bg-muted text-muted-foreground")}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                    <span className="text-[10px] text-muted-foreground">薪资由顾问沟通</span>
                    <Button
                      size="sm"
                      className="h-7 rounded-full px-3 text-xs bg-teal-500 hover:bg-teal-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isGuest && onRegister) { onRegister() }
                        else { setSelectedWorker(worker); setShowBooking(true) }
                      }}
                    >
                      立即预约
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">已展示全部育婴师</p>
        </div>
      </div>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="h-full w-[85vw] max-w-sm">
          <SheetHeader className="border-b pb-3">
            <div className="drawer-kv-row-head">
              <SheetTitle className="flex min-w-0 items-center gap-2">
                <Filter className="h-5 w-5 shrink-0 text-teal-600" />
                <span className="break-words">筛选条件</span>
              </SheetTitle>
              <Button variant="ghost" size="sm" onClick={() => setFilters(filterOptions)} className="h-auto shrink-0 p-0 text-muted-foreground">
                重置
              </Button>
            </div>
          </SheetHeader>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-3">
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">服务类型</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.serviceType.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("serviceType", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">评价星级</h4>
              <div className="grid grid-cols-1 gap-1.5">
                {filters.minRating.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("minRating", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span className="flex items-center gap-1">
                      {item.label}
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">年纪</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {filters.age.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("age", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">学历</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.education.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("education", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">性格特征</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.personality.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("personality", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">特长</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.specialtyPick.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("specialtyPick", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">档期情况</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {filters.availability.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("availability", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">籍贯（省）</h4>
              <div className="grid grid-cols-4 gap-1.5">
                {filters.origin.map((item) => (
                  <label key={item.id} className={cn("flex items-center gap-1 p-2 rounded-lg border cursor-pointer transition-all text-xs", item.checked ? "border-teal-500 bg-teal-500/5" : "border-border bg-card")}>
                    <Checkbox checked={item.checked} onCheckedChange={() => handleFilterChange("origin", item.id)} className="w-3.5 h-3.5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">
                预算区间
                <span className="font-normal text-teal-600 ml-2 text-xs">¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}</span>
              </h4>
              <div className="px-1">
                <Slider value={priceRange} onValueChange={setPriceRange} min={3000} max={15000} step={500} />
                <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground">
                  <span>¥3,000</span>
                  <span>¥15,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t safe-area-bottom">
            <div className="flex gap-3">
              <SheetClose asChild><Button variant="outline" className="flex-1 bg-transparent">取消</Button></SheetClose>
              <SheetClose asChild><Button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white">确认筛选</Button></SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {showBooking && selectedWorker && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          caregiverName={selectedWorker.name}
          onSuccess={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}
