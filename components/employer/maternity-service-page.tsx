"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Search,
  Play,
  Star,
  MapPin,
  Filter,
  Heart,
  SlidersHorizontal,
  X,
  Phone,
  Share2,
  Award,
  BadgeCheck,
  Calendar,
  ChevronRight,
  Video,
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

const filterTabs = ["全部", "金牌月嫂", "银牌月嫂", "高级月嫂", "育婴师"]

const nannies = [
  {
    id: 1,
    name: "王阿姨",
    avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    rating: 4.9,
    reviews: 256,
    workYears: 8,
    origin: "四川成都",
    age: 42,
    tags: ["金牌月嫂", "催乳师证", "营养配餐", "双胞胎经验"],
    salaryRange: "¥12,800/月",
    hasVideo: true,
    available: true,
    serviceCount: 89,
    certificates: ["高级母婴护理师", "催乳师", "营养师"],
    goodReviewRate: "98%",
    education: "高中",
    personality: "温和细致",
    specialty: "月子餐、新生儿护理",
  },
  {
    id: 2,
    name: "李阿姨",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    rating: 4.8,
    reviews: 128,
    workYears: 6,
    origin: "湖南长沙",
    age: 45,
    tags: ["高级育婴师", "早教指导", "耐心细致"],
    salaryRange: "¥9,800/月",
    hasVideo: true,
    available: true,
    serviceCount: 67,
    certificates: ["育婴师证", "早教指导师"],
    goodReviewRate: "97%",
    education: "大专",
    personality: "耐心亲和",
    specialty: "早教互动、辅食添加",
  },
  {
    id: 3,
    name: "张阿姨",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    rating: 5.0,
    reviews: 203,
    workYears: 10,
    origin: "江苏南京",
    age: 48,
    tags: ["金牌月嫂", "双胞胎经验", "产康师", "月子餐"],
    salaryRange: "¥15,800/月",
    hasVideo: false,
    available: false,
    serviceCount: 156,
    certificates: ["高级母婴护理师", "产后康复师", "营养师"],
    goodReviewRate: "99%",
    education: "中专",
    personality: "沉稳可靠",
    specialty: "双胞胎护理、产后康复",
  },
  {
    id: 4,
    name: "刘阿姨",
    avatar: "/young-chinese-woman.jpg",
    rating: 4.7,
    reviews: 65,
    workYears: 3,
    origin: "安徽合肥",
    age: 38,
    tags: ["银牌月嫂", "会做辅食", "性格温和"],
    salaryRange: "¥7,800/月",
    hasVideo: true,
    available: true,
    serviceCount: 32,
    certificates: ["母婴护理师", "健康证"],
    goodReviewRate: "96%",
    education: "初中",
    personality: "开朗随和",
    specialty: "辅食制作、日常照料",
  },
]

const filterOptions = {
  serviceType: [
    { id: "jinpai", label: "金牌月嫂", checked: false },
    { id: "yinpai", label: "银牌月嫂", checked: false },
    { id: "gaoji", label: "高级月嫂", checked: false },
    { id: "yuyingshi", label: "育婴师", checked: false },
  ],
  minRating: [
    { id: "45", label: "4.5星及以上", checked: false },
    { id: "48", label: "4.8星及以上", checked: false },
    { id: "50", label: "5.0星", checked: false },
  ],
  age: [
    { id: "30-40", label: "30-40岁", checked: false },
    { id: "40-50", label: "40-50岁", checked: false },
    { id: "50+", label: "50岁以上", checked: false },
  ],
  education: [
    { id: "chuzhong", label: "初中", checked: false },
    { id: "gaozhong", label: "高中", checked: false },
    { id: "dazhuan", label: "大专", checked: false },
    { id: "benke", label: "本科及以上", checked: false },
  ],
  personality: [
    { id: "wen", label: "温和细致", checked: false },
    { id: "qin", label: "耐心亲和", checked: false },
    { id: "chen", label: "沉稳可靠", checked: false },
    { id: "kailang", label: "开朗随和", checked: false },
  ],
  specialtyPick: [
    { id: "yuezi", label: "月子餐", checked: false },
    { id: "xin", label: "新生儿护理", checked: false },
    { id: "zaojiao", label: "早教互动", checked: false },
    { id: "shuang", label: "双胞胎", checked: false },
  ],
  availability: [
    { id: "available", label: "立即可派", checked: false },
    { id: "soon", label: "一周内可派", checked: false },
    { id: "booked", label: "已预约", checked: false },
  ],
  origin: [
    { id: "sichuan", label: "四川", checked: false },
    { id: "hunan", label: "湖南", checked: false },
    { id: "jiangsu", label: "江苏", checked: false },
    { id: "anhui", label: "安徽", checked: false },
  ],
}

// Reviews data for detail view
const reviews = [
  { id: 1, name: "张女士", rating: 5, content: "王阿姨非常细心，照顾宝宝很有耐心，推荐！", date: "2025-10-15" },
  { id: 2, name: "李先生", rating: 5, content: "做饭很好吃，宝宝辅食做得很用心。", date: "2025-10-10" },
]

interface MaternityServicePageProps {
  onBack: () => void
  isGuest?: boolean
  onRegister?: () => void
}

export function MaternityServicePage({ onBack, isGuest, onRegister }: MaternityServicePageProps) {
  const [activeFilter, setActiveFilter] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([5000, 20000])
  const [filters, setFilters] = useState(filterOptions)
  const [likedList, setLikedList] = useState<number[]>([])
  const [showBooking, setShowBooking] = useState(false)
  const [selectedNanny, setSelectedNanny] = useState<(typeof nannies)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showPoster, setShowPoster] = useState(false)

  const handleFilterChange = (category: keyof typeof filterOptions, id: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    }))
  }

  const toggleLike = (id: number) => {
    setLikedList((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  // Detail View
  if (showDetail && selectedNanny) {
    return (
      <div className="min-h-screen bg-background">
        {/* Detail Header */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 safe-area-top flex items-center justify-between shadow-sm">
          <button onClick={() => setShowDetail(false)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">阿姨详情</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleLike(selectedNanny.id)}>
              <Heart className={cn("w-5 h-5", likedList.includes(selectedNanny.id) ? "fill-destructive text-destructive" : "text-muted-foreground")} />
            </button>
            <button onClick={() => setShowPoster(true)}>
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Photo/Video Area */}
        <div className="relative aspect-[4/3] bg-muted">
          <img src={selectedNanny.avatar || "/placeholder.svg"} alt={selectedNanny.name} className="w-full h-full object-cover" />
          {selectedNanny.hasVideo && (
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="-mt-6 relative z-10 mx-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={selectedNanny.avatar || "/placeholder.svg"} alt={selectedNanny.name} className="w-14 h-14 rounded-full object-cover border-2 border-card shadow" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{selectedNanny.name}</h2>
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">
                      <BadgeCheck className="w-3 h-3 mr-0.5" />
                      已认证
                    </Badge>
                  </div>
                  <StarRatingRow rating={selectedNanny.rating} className="mt-1" sizeClassName="h-4 w-4" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    服务好评 <span className="font-semibold text-primary">{selectedNanny.goodReviewRate}</span>
                    <span className="mx-1">·</span>({selectedNanny.reviews}条评价)
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="text-foreground">{selectedNanny.age}岁</span>
                    <span>·</span>
                    <span>{selectedNanny.education}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {originToProvinceLabel(selectedNanny.origin)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug text-foreground">
                    <span className="text-muted-foreground">性格</span> {selectedNanny.personality}
                    <span className="mx-1 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">特长</span> {selectedNanny.specialty}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedNanny.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary text-xs">{tag}</Badge>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">薪资不向雇主端展示，签约前由顾问沟通。</p>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 py-4 space-y-4 pb-28">
          {/* Certificates */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">资质证书</h3>
              </div>
              <div className="flex gap-3">
                {selectedNanny.certificates.map((cert) => (
                  <div key={cert} className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-foreground text-center font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">雇主评价</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-xs">
                  查看全部
                </Button>
              </div>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-foreground">{review.name}</span>
                      <div className="flex items-center gap-0.5">
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

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-20">
          <div className="max-w-md mx-auto px-4 py-3 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl gap-2 bg-transparent border-primary text-primary"
              onClick={() => {
                if (isGuest && onRegister) {
                  onRegister()
                }
              }}
            >
              <Video className="w-5 h-5" />
              预约面试
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                if (isGuest && onRegister) {
                  onRegister()
                } else {
                  setShowBooking(true)
                }
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
            caregiverName={selectedNanny.name}
            onSuccess={() => { setShowBooking(false); setShowDetail(false) }}
          />
        )}

        {showPoster && (
          <SharePosterModal
            onClose={() => setShowPoster(false)}
            type="caregiver"
            themeColor="amber"
            data={{
              name: selectedNanny.name,
              subtitle: selectedNanny.tags[0],
              desc: `${originToProvinceLabel(selectedNanny.origin)} | ${selectedNanny.goodReviewRate}服务好评 | ${selectedNanny.reviews}条评价`,
              price: "面议",
              tags: selectedNanny.tags,
              avatar: selectedNanny.avatar,
              rating: selectedNanny.rating,
              reviews: selectedNanny.reviews,
            }}
          />
        )}
      </div>
    )
  }

  // List View
  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <header className="bg-card sticky top-0 z-10 shadow-sm safe-area-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索阿姨姓名、技能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-full bg-muted/50 border-0 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Nanny List */}
      <div className="px-4 py-4 space-y-3">
        {nannies.map((nanny) => (
          <Card
            key={nanny.id}
            className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => { setSelectedNanny(nanny); setShowDetail(true) }}
          >
            <CardContent className="p-0">
              <div className="flex">
                {/* Avatar */}
                <div className="relative w-28 shrink-0">
                  <img
                    src={nanny.avatar || "/placeholder.svg"}
                    alt={nanny.name}
                    className="w-full h-full object-cover aspect-square"
                  />
                  {nanny.hasVideo && (
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-foreground/60 rounded-full flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-card fill-card ml-0.5" />
                    </div>
                  )}
                  {nanny.available ? (
                    <div className="absolute top-2 left-2 bg-teal-500 text-card text-[10px] px-2 py-0.5 rounded-full font-medium">
                      可预约
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 bg-muted-foreground text-card text-[10px] px-2 py-0.5 rounded-full font-medium">
                      已约满
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-foreground">{nanny.name}</h3>
                        <StarRatingRow rating={nanny.rating} className="mt-0.5" />
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          服务好评 <span className="font-semibold text-primary">{nanny.goodReviewRate}</span>
                          <span className="mx-1">·</span>({nanny.reviews}条评价)
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLike(nanny.id) }}
                        className="p-1"
                      >
                        <Heart className={cn("w-5 h-5", likedList.includes(nanny.id) ? "fill-destructive text-destructive" : "text-muted-foreground")} />
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span className="text-foreground">{nanny.age}岁</span>
                      <span>·</span>
                      <span>{nanny.education}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {originToProvinceLabel(nanny.origin)}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] leading-snug text-foreground">
                      <span className="text-muted-foreground">性格</span> {nanny.personality}
                      <span className="mx-1 text-muted-foreground">|</span>
                      <span className="text-muted-foreground">特长</span> {nanny.specialty}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {nanny.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={tag}
                          className={cn(
                            "px-1.5 py-0.5 text-[10px] rounded",
                            idx === 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                    <span className="text-[10px] text-muted-foreground">薪资由顾问沟通</span>
                    <Button
                      size="sm"
                      className="h-7 rounded-full px-3 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isGuest && onRegister) { onRegister() }
                        else { setSelectedNanny(nanny); setShowBooking(true) }
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
          <p className="text-sm text-muted-foreground">已展示全部阿姨</p>
        </div>
      </div>

      {/* Filter Sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="h-full w-[85vw] max-w-sm">
          <SheetHeader className="border-b pb-3">
            <div className="drawer-kv-row-head">
              <SheetTitle className="flex min-w-0 items-center gap-2">
                <Filter className="h-5 w-5 shrink-0 text-primary" />
                <span className="break-words">筛选条件</span>
              </SheetTitle>
              <Button variant="ghost" size="sm" onClick={() => setFilters(filterOptions)} className="h-auto shrink-0 p-0 text-muted-foreground">
                重置
              </Button>
            </div>
          </SheetHeader>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-3">
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">服务等级</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.serviceType.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("serviceType", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">评价星级</h4>
              <div className="grid grid-cols-1 gap-1.5">
                {filters.minRating.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("minRating", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
              <h4 className="font-semibold text-xs text-foreground mb-2">年纪</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {filters.age.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("age", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">学历</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.education.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("education", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">性格特征</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.personality.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("personality", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">特长</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {filters.specialtyPick.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("specialtyPick", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">档期情况</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {filters.availability.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("availability", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">籍贯（省）</h4>
              <div className="grid grid-cols-4 gap-1.5">
                {filters.origin.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1 p-2 rounded-lg border cursor-pointer transition-all text-xs",
                      item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleFilterChange("origin", item.id)}
                      className="w-3.5 h-3.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-foreground mb-2">
                预算区间
                <span className="font-normal text-primary ml-2 text-xs">
                  ¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}
                </span>
              </h4>
              <div className="px-1">
                <Slider value={priceRange} onValueChange={setPriceRange} min={5000} max={25000} step={1000} />
                <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground">
                  <span>¥5,000</span>
                  <span>¥25,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t safe-area-bottom">
            <div className="flex gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1 bg-transparent">取消</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="flex-1 bg-primary hover:bg-primary/90">确认筛选</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {showBooking && selectedNanny && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          caregiverName={selectedNanny.name}
          onSuccess={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}
