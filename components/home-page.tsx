"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Bell,
  ChevronRight,
  MapPin,
  Star,
  Heart,
  Baby,
  Flower2,
  GraduationCap,
  BookOpen,
  ScanLine,
  Filter,
  ChevronDown,
  HandHeart,
  Home,
  Users,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { BookingModal } from "@/components/booking-modal"
import { CaregiverDetail } from "@/components/caregiver-detail"
import { PointsCenter } from "@/components/points-center"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { originToProvinceLabel } from "@/lib/employer-caregiver-display"
import { StarRatingRow } from "@/components/employer/star-rating-row"


const banners = [
  {
    id: 1,
    title: "新手妈妈必看",
    subtitle: "科学坐月子指南",
    tag: "科普专栏",
    color: "from-orange-400/90 to-amber-300/90",
  },
  {
    id: 2,
    title: "限时优惠",
    subtitle: "产后修复套餐8折起",
    tag: "限时活动",
    color: "from-rose-400/90 to-pink-300/90",
  },
  {
    id: 3,
    title: "金牌月嫂推荐",
    subtitle: "10年经验 安心之选",
    tag: "精选推荐",
    color: "from-teal-400/90 to-emerald-300/90",
  },
]

const categories = [
  {
    id: 1,
    name: "找月嫂",
    icon: Baby,
    color: "bg-gradient-to-br from-orange-100 to-amber-50",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    name: "产后修复",
    icon: Flower2,
    color: "bg-gradient-to-br from-pink-100 to-rose-50",
    iconColor: "text-pink-500",
  },
  {
    id: 3,
    name: "育婴师",
    icon: GraduationCap,
    color: "bg-gradient-to-br from-teal-100 to-emerald-50",
    iconColor: "text-teal-500",
  },
  {
    id: 4,
    name: "在线课程",
    icon: BookOpen,
    color: "bg-gradient-to-br from-violet-100 to-purple-50",
    iconColor: "text-violet-500",
  },
  {
    id: 5,
    name: "养老护理师",
    icon: HandHeart,
    color: "bg-gradient-to-br from-sky-100 to-cyan-50",
    iconColor: "text-sky-600",
  },
  {
    id: 6,
    name: "保姆",
    icon: Home,
    color: "bg-gradient-to-br from-lime-100 to-green-50",
    iconColor: "text-lime-700",
  },
  {
    id: 7,
    name: "家庭陪伴师",
    icon: Users,
    color: "bg-gradient-to-br from-indigo-100 to-violet-50",
    iconColor: "text-indigo-600",
  },
]

const COMING_SOON_SERVICES = new Set(["养老护理师", "保姆", "家庭陪伴师"])

const caregivers = [
  {
    id: 1,
    name: "王阿姨",
    avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    experience: 8,
    origin: "四川成都",
    rating: 4.9,
    reviews: 126,
    tags: ["金牌月嫂", "催乳师", "营养配餐"],
    price: 12800,
    available: true,
    liked: false,
    serviceCount: 89,
    age: 45,
    education: "高中",
    personality: "温和耐心",
    specialty: "月子餐、新生儿护理",
    goodReviewRate: "98%",
  },
  {
    id: 2,
    name: "李阿姨",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    experience: 6,
    origin: "湖南长沙",
    rating: 4.8,
    reviews: 89,
    tags: ["高级育婴师", "早教指导"],
    price: 9800,
    available: true,
    liked: true,
    serviceCount: 67,
    age: 42,
    education: "大专",
    personality: "开朗细致",
    specialty: "早教互动、辅食添加",
    goodReviewRate: "97%",
  },
  {
    id: 3,
    name: "张阿姨",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    experience: 10,
    origin: "江苏南京",
    rating: 5.0,
    reviews: 203,
    tags: ["金牌月嫂", "双胞胎经验", "产康师"],
    price: 15800,
    available: false,
    liked: false,
    serviceCount: 156,
    age: 48,
    education: "中专",
    personality: "沉稳可靠",
    specialty: "双胞胎护理、产后康复",
    goodReviewRate: "99%",
  },
]

const filterOptions = {
  serviceType: [
    { id: "yuesao", label: "月嫂", checked: true },
    { id: "yuyingshi", label: "育婴师", checked: false },
    { id: "chanhouxiufu", label: "产后修复师", checked: false },
    { id: "cuirushi", label: "催乳师", checked: false },
  ],
  minRating: [
    { id: "4.5", label: "4.5星及以上", checked: false },
    { id: "4.8", label: "4.8星及以上", checked: false },
    { id: "5.0", label: "5.0星", checked: false },
  ],
  ageRange: [
    { id: "35-45", label: "35-45岁", checked: false },
    { id: "45-55", label: "45-55岁", checked: false },
    { id: "55+", label: "55岁以上", checked: false },
  ],
  education: [
    { id: "junior", label: "初中", checked: false },
    { id: "high", label: "高中", checked: true },
    { id: "college", label: "大专", checked: false },
    { id: "bachelor", label: "本科及以上", checked: false },
  ],
  personality: [
    { id: "wenhe", label: "温和耐心", checked: false },
    { id: "kaichen", label: "开朗细致", checked: false },
    { id: "chenwen", label: "沉稳可靠", checked: false },
  ],
  specialtyPick: [
    { id: "yuezi", label: "月子餐", checked: false },
    { id: "xinshenger", label: "新生儿护理", checked: false },
    { id: "zaojiao", label: "早教互动", checked: false },
    { id: "shuangbao", label: "双胞胎", checked: false },
  ],
  origin: [
    { id: "sichuan", label: "四川", checked: false },
    { id: "hunan", label: "湖南", checked: false },
    { id: "anhui", label: "安徽", checked: false },
    { id: "jiangsu", label: "江苏", checked: false },
  ],
}

interface HomePageProps {
  onServiceNavigate?: (service: string) => void
  onGoToServiceTab?: (subTab?: string) => void
}

export function HomePage({ onServiceNavigate, onGoToServiceTab }: HomePageProps) {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [likedCaregivers, setLikedCaregivers] = useState<number[]>([2])
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([8000, 18000])
  const [filters, setFilters] = useState(filterOptions)
  const [showBooking, setShowBooking] = useState(false)
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof caregivers)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(3)
  const [showPoints, setShowPoints] = useState(false)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const toggleLike = (id: number) => {
    setLikedCaregivers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleFilterChange = (category: keyof typeof filterOptions, id: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    }))
  }

  const resetFilters = () => {
    setFilters(filterOptions)
    setPriceRange([8000, 18000])
  }

  const handleBooking = (caregiver: (typeof caregivers)[0]) => {
    setSelectedCaregiver(caregiver)
    setShowBooking(true)
  }

  const handleViewDetail = (caregiver: (typeof caregivers)[0]) => {
    setSelectedCaregiver(caregiver)
    setShowDetail(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 safe-area-top shadow-sm">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            <span>上海</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索月嫂、育婴师..."
              className="pl-9 bg-muted/50 border-0 h-9 text-sm rounded-full focus-visible:ring-primary/30"
            />
          </div>
          {/* Scan Button */}
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <ScanLine className="w-5 h-5" />
          </Button>
          {/* Message Button */}
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <Bell className="w-5 h-5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
                {unreadMessages}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Banner Carousel */}
        <section className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className={cn(
                    "min-w-full h-44 rounded-2xl bg-gradient-to-r p-5 flex flex-col justify-between relative overflow-hidden",
                    banner.color
                  )}
                >
                  <div className="relative z-10">
                    <Badge className="bg-card/90 text-foreground border-0 text-xs font-medium mb-2">{banner.tag}</Badge>
                    <h3 className="text-2xl font-bold text-card">{banner.title}</h3>
                    <p className="text-sm text-card/90 mt-1">{banner.subtitle}</p>
                  </div>
                  <Button size="sm" className="w-fit bg-card hover:bg-card/90 text-foreground shadow-md">
                    了解更多
                  </Button>
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-card/10 rounded-full" />
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-card/10 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentBanner ? "bg-primary w-6" : "bg-muted-foreground/30 w-1.5"
                )}
              />
            ))}
          </div>
        </section>

        {/* Categories - 金刚区 */}
        <section>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    if (COMING_SOON_SERVICES.has(cat.name)) {
                      setComingSoonOpen(true)
                      return
                    }
                    onServiceNavigate?.(cat.name)
                  }}
                  className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:scale-105 transition-transform"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", cat.color)}>
                    <Icon className={cn("w-7 h-7", cat.iconColor)} />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center leading-tight">{cat.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* My Service Status */}
        <section>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">我的服务</h3>
                <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-sm" onClick={() => onGoToServiceTab?.()}>
                  全部服务 <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={() => onGoToServiceTab?.("contracts")}
                  className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 text-center overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative z-10">
                    <p className="text-xl font-bold text-primary">2</p>
                    <p className="text-xs text-muted-foreground mt-1">待签合同</p>
                  </div>
                  <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-primary/10 rounded-full" />
                </button>
                <button onClick={() => onGoToServiceTab?.("active")} className="relative bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-3 text-center overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative z-10">
                    <p className="text-xl font-bold text-teal-600">1</p>
                    <p className="text-xs text-muted-foreground mt-1">服务中</p>
                  </div>
                  <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-teal-500/10 rounded-full" />
                </button>
                <button onClick={() => onGoToServiceTab?.("cards")} className="relative bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-3 text-center overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative z-10">
                    <p className="text-xl font-bold text-violet-600">
                      5<span className="text-xs font-normal">次</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">剩余次卡</p>
                  </div>
                  <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-violet-500/10 rounded-full" />
                </button>
                <button 
                  onClick={() => setShowPoints(true)}
                  className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 text-center overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative z-10">
                    <p className="text-xl font-bold text-amber-600">2680</p>
                    <p className="text-xs text-muted-foreground mt-1">会员积分</p>
                  </div>
                  <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-amber-500/10 rounded-full" />
                </button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommended Caregivers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-lg">优选阿姨推荐</h3>
              <p className="text-xs text-muted-foreground mt-0.5">严选好阿姨，放心到家</p>
            </div>
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary h-auto p-0 gap-1">
                  <Filter className="w-4 h-4" />
                  筛选
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm h-full">
                <SheetHeader className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-primary" />
                      筛选条件
                    </SheetTitle>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground h-auto p-0">
                      重置
                    </Button>
                  </div>
                </SheetHeader>
                <div className="min-h-0 flex-1 space-y-6 overflow-y-auto py-4">
                  {/* Service Type */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">服务类型</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.serviceType.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("serviceType", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 评价星级 */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">评价星级</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {filters.minRating.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("minRating", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="flex items-center gap-1 text-sm">
                            {item.label}
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 年龄 */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">年纪</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.ageRange.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("ageRange", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">
                      价格区间
                      <span className="font-normal text-primary ml-2">
                        ¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}
                      </span>
                    </h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={5000}
                        max={25000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>¥5,000</span>
                        <span>¥25,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">学历</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.education.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("education", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 性格特征 */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">性格特征</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.personality.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("personality", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 特长 */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">特长</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.specialtyPick.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("specialtyPick", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Origin */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">籍贯（省）</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.origin.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("origin", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t safe-area-bottom">
                  <div className="flex gap-3">
                    <SheetClose asChild>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        取消
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className="flex-1 bg-primary hover:bg-primary/90">确认筛选</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="space-y-3">
            {caregivers.map((caregiver) => (
              <Card
                key={caregiver.id}
                className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Avatar Section */}
                    <button
                      className="relative w-28 shrink-0"
                      onClick={() => handleViewDetail(caregiver)}
                    >
                      <img
                        src={caregiver.avatar || "/placeholder.svg"}
                        alt={caregiver.name}
                        className="w-full h-full object-cover aspect-square"
                      />
                      {!caregiver.available && (
                        <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                          <span className="text-xs text-card font-medium bg-foreground/80 px-2 py-1 rounded">
                            已预约
                          </span>
                        </div>
                      )}
                      {caregiver.available && (
                        <div className="absolute bottom-2 left-2 bg-success text-success-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                          可预约
                        </div>
                      )}
                    </button>

                    {/* Info Section */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex min-w-0 flex-col gap-1">
                            <h4 className="font-bold text-foreground text-base">{caregiver.name}</h4>
                            <StarRatingRow rating={caregiver.rating} />
                            <p className="text-[11px] text-muted-foreground">
                              服务好评{" "}
                              <span className="font-semibold text-primary">{caregiver.goodReviewRate}</span>
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(caregiver.id)
                            }}
                            className="p-1.5 -mr-1.5 -mt-1"
                          >
                            <Heart
                              className={cn(
                                "w-5 h-5 transition-all",
                                likedCaregivers.includes(caregiver.id)
                                  ? "fill-destructive text-destructive scale-110"
                                  : "text-muted-foreground hover:text-destructive"
                              )}
                            />
                          </button>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                          <span className="font-medium text-foreground">{caregiver.age}岁</span>
                          <span className="text-border">|</span>
                          <span>{caregiver.education}</span>
                          <span className="text-border">|</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {originToProvinceLabel(caregiver.origin)}
                          </span>
                          <span className="text-border">|</span>
                          <span>服务{caregiver.serviceCount}户</span>
                        </div>
                        <p className="mt-1 text-[11px] leading-snug text-foreground">
                          <span className="text-muted-foreground">性格</span> {caregiver.personality}
                          <span className="mx-1 text-muted-foreground">·</span>
                          <span className="text-muted-foreground">特长</span> {caregiver.specialty}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {caregiver.tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className={cn(
                                "text-xs font-normal px-2 py-0",
                                idx === 0 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                              )}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                        <span className="text-[11px] text-muted-foreground">薪资由顾问沟通，不向雇主公开展示</span>
                        <Button
                          size="sm"
                          className={cn(
                            "h-8 shrink-0 rounded-full px-4",
                            caregiver.available
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "bg-muted text-muted-foreground"
                          )}
                          disabled={!caregiver.available}
                          onClick={() => handleBooking(caregiver)}
                        >
                          {caregiver.available ? "立即预约" : "已约满"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More */}
          <div className="mt-4 text-center">
            <Button variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent" onClick={() => onServiceNavigate?.("找月嫂")}>
              查看更多阿姨
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {showBooking && selectedCaregiver && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          caregiverName={selectedCaregiver.name}
          onSuccess={() => setShowBooking(false)}
        />
      )}

      {/* Caregiver Detail */}
      {showDetail && selectedCaregiver && (
        <CaregiverDetail
          onClose={() => setShowDetail(false)}
          onBook={() => {
            setShowDetail(false)
            setShowBooking(true)
          }}
          caregiver={selectedCaregiver}
        />
      )}

      {/* Points Center */}
      <PointsCenter open={showPoints} onClose={() => setShowPoints(false)} />

      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>敬请期待</DialogTitle>
            <DialogDescription>该服务正在筹备中，开通后将在首页通知您。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="w-full" onClick={() => setComingSoonOpen(false)}>
              知道了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
