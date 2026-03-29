"use client"

import { useState, useEffect } from "react"
import {
  Search,
  ChevronDown,
  MapPin,
  Star,
  Baby,
  Flower2,
  GraduationCap,
  BookOpen,
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Lock,
  Phone,
  MessageCircle,
  X,
  SlidersHorizontal,
  Filter,
  Heart,
  Sparkles,
  Building2,
  Medal,
  BadgeCheck,
  Quote,
  Copy,
  Calendar,
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

const banners = [
  {
    id: 1,
    title: "优厚家庭服务",
    subtitle: "专业月嫂·用心呵护每一个家庭",
    tag: "品牌介绍",
    color: "from-orange-400/90 to-amber-300/90",
  },
  {
    id: 2,
    title: "严选好阿姨",
    subtitle: "8大筛选标准·层层把关",
    tag: "品质保障",
    color: "from-teal-400/90 to-emerald-300/90",
  },
  {
    id: 3,
    title: "新用户专享",
    subtitle: "注册即享首单优惠",
    tag: "限时活动",
    color: "from-rose-400/90 to-pink-300/90",
  },
]

const categories = [
  {
    id: 1,
    name: "找月嫂",
    icon: Baby,
    color: "bg-gradient-to-br from-orange-100 to-amber-50",
    iconColor: "text-orange-500",
    desc: "专业月子护理",
  },
  {
    id: 2,
    name: "产后修复",
    icon: Flower2,
    color: "bg-gradient-to-br from-pink-100 to-rose-50",
    iconColor: "text-pink-500",
    desc: "科学产后恢复",
  },
  {
    id: 3,
    name: "育婴师",
    icon: GraduationCap,
    color: "bg-gradient-to-br from-teal-100 to-emerald-50",
    iconColor: "text-teal-500",
    desc: "专业育儿指导",
  },
  {
    id: 4,
    name: "在线课程",
    icon: BookOpen,
    color: "bg-gradient-to-br from-violet-100 to-purple-50",
    iconColor: "text-violet-500",
    desc: "育儿知识学习",
  },
]

const companyStats = [
  { label: "服务家庭", value: "50,000+", icon: Users },
  { label: "专业阿姨", value: "3,000+", icon: Award },
  { label: "服务年限", value: "12年", icon: Clock },
  { label: "好评率", value: "99.2%", icon: Star },
]

const qualifications = [
  { name: "人社部认证培训机构", icon: BadgeCheck },
  { name: "母婴护理行业协会会员", icon: Medal },
  { name: "ISO9001服务质量认证", icon: Shield },
  { name: "AAA级信用企业", icon: Award },
]

const testimonials = [
  {
    id: 1,
    name: "张女士",
    avatar: "/chinese-woman-portrait.jpg",
    content: "王阿姨照顾我和宝宝整整一个月，非常专业细心。宝宝的作息调整得很好，我也恢复得很快。感谢优厚推荐的好阿姨！",
    date: "2024年12月",
    rating: 5,
  },
  {
    id: 2,
    name: "李先生",
    avatar: "/chinese-man-portrait.png",
    content:
      "作为新手爸爸，最担心的就是找不到靠谱的月嫂。优厚的服务很贴心，从面试到签约都有顾问全程陪同，让我们很放心。",
    date: "2024年11月",
    rating: 5,
  },
  {
    id: 3,
    name: "刘女士",
    avatar: "/young-chinese-woman.jpg",
    content: "产后修复的课程非常专业，老师很有耐心。现在身体恢复得很好，强烈推荐给其他宝妈！",
    date: "2024年10月",
    rating: 5,
  },
]

const caregivers = [
  {
    id: 1,
    name: "王阿姨",
    experience: 8,
    origin: "四川成都",
    rating: 4.9,
    reviews: 126,
    tags: ["金牌月嫂", "催乳师", "营养配餐"],
    price: 12800,
    serviceCount: 89,
  },
  {
    id: 2,
    name: "李阿姨",
    experience: 6,
    origin: "湖南长沙",
    rating: 4.8,
    reviews: 89,
    tags: ["高级育婴师", "早教指导"],
    price: 9800,
    serviceCount: 67,
  },
  {
    id: 3,
    name: "张阿姨",
    experience: 10,
    origin: "江苏南京",
    rating: 5.0,
    reviews: 203,
    tags: ["金牌月嫂", "双胞胎经验", "产康师"],
    price: 15800,
    serviceCount: 156,
  },
]

const filterOptions = {
  serviceType: [
    { id: "yuesao", label: "月嫂", checked: true },
    { id: "yuyingshi", label: "育婴师", checked: false },
    { id: "chanhouxiufu", label: "产后修复师", checked: false },
    { id: "cuirushi", label: "催乳师", checked: false },
  ],
  experience: [
    { id: "1-3", label: "1-3年", checked: false },
    { id: "3-5", label: "3-5年", checked: false },
    { id: "5-8", label: "5-8年", checked: true },
    { id: "8+", label: "8年以上", checked: false },
  ],
  certificates: [
    { id: "jinpai", label: "金牌月嫂", checked: false },
    { id: "cuiru", label: "催乳师证", checked: false },
    { id: "yingyang", label: "营养师证", checked: false },
    { id: "zaojiao", label: "早教证", checked: false },
  ],
  specialSkills: [
    { id: "shuangtai", label: "双胞胎护理", checked: false },
    { id: "zaochan", label: "早产儿护理", checked: false },
    { id: "yuezicanm", label: "月子餐制作", checked: false },
    { id: "chanhoukangfu", label: "产后康复", checked: false },
  ],
}

interface GuestPageProps {
  onRegister: () => void
  onServiceNavigate?: (service: string) => void
}

export function GuestPage({ onRegister, onServiceNavigate }: GuestPageProps) {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [filterOpen, setFilterOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactModalType, setContactModalType] = useState<"contact" | "qrcode">("contact")
  const [priceRange, setPriceRange] = useState([8000, 18000])
  const [filters, setFilters] = useState(filterOptions)
  const [showBooking, setShowBooking] = useState(false)
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof caregivers)[0] | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

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

  const openContactModal = (type: "contact" | "qrcode") => {
    setContactModalType(type)
    setContactModalOpen(true)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("400-888-8888")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBooking = (caregiver: (typeof caregivers)[0]) => {
    setSelectedCaregiver(caregiver)
    setShowBooking(true)
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
          <Button
            size="sm"
            onClick={onRegister}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 h-8"
          >
            登录/注册
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

        {/* Company Stats */}
        <section>
          <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">品牌实力</h3>
                <Badge className="bg-primary/15 text-primary border-0 text-xs">值得信赖</Badge>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {companyStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-card flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-base font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Business Categories */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">服务项目</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => onServiceNavigate?.(cat.name)}
                  className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:scale-105 transition-transform relative"
                >
                  <div
                    className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", cat.color)}
                  >
                    <Icon className={cn("w-7 h-7", cat.iconColor)} />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium text-foreground block">{cat.name}</span>
                    <span className="text-[10px] text-muted-foreground">{cat.desc}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Screening Rules */}
        <section>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-emerald-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-foreground">阿姨严选标准</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { step: "01", title: "身份核验", desc: "身份证、健康证核查" },
                  { step: "02", title: "背景调查", desc: "无犯罪记录证明" },
                  { step: "03", title: "技能考核", desc: "专业技能实操测试" },
                  { step: "04", title: "岗前培训", desc: "120小时系统培训" },
                  { step: "05", title: "试用评估", desc: "3个月跟踪服务" },
                  { step: "06", title: "持证上岗", desc: "多证书持有优先" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-2 p-2 bg-card/60 rounded-xl">
                    <span className="text-xs font-bold text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">荣誉专区</h3>
            <Badge variant="secondary" className="text-xs">客户感谢信</Badge>
          </div>
          <div className="space-y-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-foreground">{testimonial.name}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="absolute -left-1 -top-1 w-4 h-4 text-primary/20" />
                        <p className="text-xs text-muted-foreground leading-relaxed pl-3">{testimonial.content}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground/70 mt-2">{testimonial.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Caregivers - Blurred */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-lg">优选阿姨推荐</h3>
              <p className="text-xs text-muted-foreground mt-0.5">严选好阿姨，放心到家</p>
            </div>
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary h-auto p-0 gap-1">
                  <SlidersHorizontal className="w-4 h-4" />
                  筛选
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm h-full px-0">
                <SheetHeader className="px-4 pb-3 border-b">
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
                <div className="overflow-y-auto h-[calc(100vh-140px)] px-4 py-4 space-y-6">
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

                  {/* Experience */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">工作年限</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.experience.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("experience", item.id)}
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

                  {/* Certificates */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">资质证书</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.certificates.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("certificates", item.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Special Skills */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">特殊技能</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.specialSkills.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                            item.checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleFilterChange("specialSkills", item.id)}
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

          {/* Caregiver Cards with Blurred Photos */}
          <div className="space-y-3">
            {caregivers.map((caregiver) => (
              <Card key={caregiver.id} className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex">
                    <div
                      className="relative w-28 shrink-0 cursor-pointer group"
                      onClick={() => openContactModal("contact")}
                    >
                      {/* Blurred placeholder */}
                      <div className="w-full h-full aspect-square bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/80 to-amber-200/80 backdrop-blur-sm" />
                        <div className="relative z-10 text-center p-2">
                          <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-card/80 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-[10px] text-foreground/80 font-medium">点击解锁</p>
                        </div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-foreground text-base">{caregiver.name}</h4>
                            <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-semibold text-amber-600">{caregiver.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{caregiver.experience}年经验</span>
                          <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
                          <span>{caregiver.origin}</span>
                          <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
                          <span>服务{caregiver.serviceCount}户</span>
                        </div>
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
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                        <div className="text-primary font-bold text-lg">
                          ¥{caregiver.price.toLocaleString()}
                          <span className="text-xs font-normal text-muted-foreground">/月</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openContactModal("qrcode")}
                            className="h-8 rounded-full px-3 border-muted-foreground/30 text-muted-foreground hover:bg-muted bg-transparent"
                          >
                            <Phone className="w-3.5 h-3.5 mr-1" />
                            联系
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleBooking(caregiver)}
                            className="h-8 rounded-full px-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            预约
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Hint */}
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={onRegister}
              className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
            >
              <Lock className="w-4 h-4 mr-2" />
              注册查看更多优选阿姨
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-orange-500 overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-primary-foreground mb-1">立即注册，享专属优惠</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">新用户首单立减500元，更多会员权益等你解锁</p>
                <div className="flex gap-3">
                  <Button onClick={onRegister} className="bg-card hover:bg-card/90 text-primary shadow-md">
                    免费注册
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => openContactModal("qrcode")}
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  >
                    咨询顾问
                  </Button>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-card/10 rounded-full" />
              <div className="absolute -right-2 top-2 w-16 h-16 bg-card/10 rounded-full" />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Contact Consultant Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-foreground/60" onClick={() => setContactModalOpen(false)} />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl p-6 safe-area-bottom animate-in slide-in-from-bottom duration-300">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>

            {contactModalType === "contact" ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">联系母婴顾问</h3>
                  <p className="text-sm text-muted-foreground mt-1">专业顾问为您一对一服务</p>
                </div>
                <div className="space-y-3">
                  <Button
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                    onClick={() => {
                      setContactModalOpen(false)
                      onRegister()
                    }}
                  >
                    <Phone className="w-5 h-5" />
                    注册后查看顾问电话
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 gap-2 bg-transparent"
                    onClick={() => setContactModalType("qrcode")}
                  >
                    <MessageCircle className="w-5 h-5" />
                    查看联系方式
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-foreground">联系我们</h3>
                  <p className="text-sm text-muted-foreground mt-1">扫码添加微信或拨打电话</p>
                </div>

                {/* WeChat QR Code */}
                <div className="bg-muted/30 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-card rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
                      <div className="text-center">
                        <MessageCircle className="w-8 h-8 text-primary mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground">微信二维码</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">微信扫码咨询</p>
                      <p className="text-xs text-muted-foreground mb-2">添加顾问微信，获取专属服务</p>
                      <Badge className="bg-teal-100 text-teal-700 border-0">24小时内回复</Badge>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-muted/30 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">服务热线</p>
                        <p className="text-lg font-bold text-foreground">400-888-8888</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyPhone}
                      className="gap-1 bg-transparent"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "已复制" : "复制"}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">服务时间：9:00-21:00（全年无休）</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && selectedCaregiver && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          caregiverName={selectedCaregiver.name}
          onSuccess={() => setShowBooking(false)}
        />
      )}

    </div>
  )
}
