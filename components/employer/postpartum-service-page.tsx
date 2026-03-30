"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Search,
  Star,
  Clock,
  Flower2,
  Heart,
  Calendar,
  ChevronRight,
  BadgeCheck,
  MapPin,
  CheckCircle2,
  Share2, // Declare the Share2 variable here
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BookingModal } from "@/components/booking-modal"
import { SharePosterModal } from "@/components/share-poster-modal"
import { PostpartumTechnicianListPage } from "@/components/employer/postpartum-technician-list-page"

const filterTabs = ["全部", "骨盆修复", "腹直肌", "盆底肌", "乳腺护理", "体态调整"]

const postpartumServices = [
  {
    id: 1,
    name: "骨盆修复",
    desc: "专业骨盆矫正复位，改善产后骨盆前倾、耻骨联合分离等问题",
    price: "¥680/次",
    originalPrice: "¥880/次",
    sessions: "建议6-8次",
    popular: true,
    rating: 4.9,
    reviews: 326,
    image: "/postpartum-pelvis-recovery.jpg",
    benefits: ["缓解腰痛", "改善体态", "恢复骨盆稳定"],
    duration: "45-60分钟",
  },
  {
    id: 2,
    name: "腹直肌修复",
    desc: "产后腹直肌分离修复，恢复腹部核心力量与紧致度",
    price: "¥580/次",
    originalPrice: "¥780/次",
    sessions: "建议8-10次",
    popular: true,
    rating: 4.8,
    reviews: 218,
    image: "/postpartum-abdominal-recovery.jpg",
    benefits: ["收紧腹部", "恢复核心", "改善体型"],
    duration: "40-50分钟",
  },
  {
    id: 3,
    name: "盆底肌康复",
    desc: "盆底肌力恢复训练，预防漏尿、脱垂等产后问题",
    price: "¥480/次",
    originalPrice: "¥680/次",
    sessions: "建议10-12次",
    popular: false,
    rating: 4.9,
    reviews: 189,
    image: "/postpartum-pelvic-floor.jpg",
    benefits: ["改善漏尿", "提升肌力", "预防脱垂"],
    duration: "30-40分钟",
  },
  {
    id: 4,
    name: "产后体态调整",
    desc: "体态评估与矫正，改善含胸驼背、骨盆前倾等问题",
    price: "¥580/次",
    originalPrice: null,
    sessions: "建议6次",
    popular: false,
    rating: 4.7,
    reviews: 96,
    image: "/postpartum-posture.jpg",
    benefits: ["改善体态", "纠正驼背", "缓解疼痛"],
    duration: "50-60分钟",
  },
  {
    id: 5,
    name: "乳腺疏通",
    desc: "专业乳腺护理疏通，缓解涨奶堵奶等哺乳期问题",
    price: "¥380/次",
    originalPrice: null,
    sessions: "按需",
    popular: true,
    rating: 5.0,
    reviews: 412,
    image: "/postpartum-breast-care.jpg",
    benefits: ["缓解涨奶", "疏通乳腺", "预防乳腺炎"],
    duration: "30-40分钟",
  },
  {
    id: 6,
    name: "满月发汗",
    desc: "中药熏蒸排毒祛湿，促进气血运行改善产后体质",
    price: "¥880/次",
    originalPrice: "¥1080/次",
    sessions: "建议3次",
    popular: false,
    rating: 4.8,
    reviews: 156,
    image: "/postpartum-sweat-therapy.jpg",
    benefits: ["排毒祛湿", "促进循环", "改善体质"],
    duration: "60-90分钟",
  },
]

const technicians = [
  {
    id: 1,
    name: "陈老师",
    title: "高级产康师",
    experience: 8,
    avatar: "/professional-chinese-woman-avatar-portrait.jpg",
    rating: 4.9,
    reviews: 326,
    specialties: ["骨盆修复", "腹直肌修复"],
  },
  {
    id: 2,
    name: "林老师",
    title: "资深催乳师",
    experience: 6,
    avatar: "/young-chinese-woman.jpg",
    rating: 5.0,
    reviews: 218,
    specialties: ["乳腺疏通", "母乳喂养指导"],
  },
]

interface PostpartumServicePageProps {
  onBack: () => void
  isGuest?: boolean
  onRegister?: () => void
}

export function PostpartumServicePage({ onBack, isGuest, onRegister }: PostpartumServicePageProps) {
  const [subView, setSubView] = useState<"default" | "technicians">("default")
  const [activeFilter, setActiveFilter] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<(typeof postpartumServices)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showPoster, setShowPoster] = useState(false)

  const filteredServices = activeFilter === "全部"
    ? postpartumServices
    : postpartumServices.filter((s) => s.name.includes(activeFilter))

  if (subView === "technicians") {
    return (
      <PostpartumTechnicianListPage
        onBack={() => setSubView("default")}
        isGuest={isGuest}
        onRegister={onRegister}
      />
    )
  }

  // Detail View
  if (showDetail && selectedService) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 safe-area-top flex items-center gap-3 shadow-sm">
          <button onClick={() => setShowDetail(false)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground flex-1">{selectedService.name}</h1>
          <button onClick={() => setShowPoster(true)} className="p-1">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </header>

        {/* Hero */}
        <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-50 flex items-center justify-center">
          <Flower2 className="w-20 h-20 text-pink-300" />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Service Info */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedService.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-sm">{selectedService.rating}</span>
                    <span className="text-xs text-muted-foreground">({selectedService.reviews}条评价)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-pink-600">{selectedService.price}</p>
                  {selectedService.originalPrice && (
                    <p className="text-xs text-muted-foreground line-through">{selectedService.originalPrice}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{selectedService.desc}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedService.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedService.sessions}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">服务功效</h3>
              <div className="flex gap-2">
                {selectedService.benefits.map((b) => (
                  <div key={b} className="flex-1 bg-pink-50 rounded-xl p-3 text-center">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                    <span className="text-xs font-medium text-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Technicians */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">推荐技师</h3>
              <div className="space-y-3">
                {technicians.map((tech) => (
                  <div key={tech.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                    <img src={tech.avatar || "/placeholder.svg"} alt={tech.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{tech.name}</span>
                        <Badge className="bg-pink-100 text-pink-700 border-0 text-[10px]">{tech.title}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>{tech.experience}年经验</span>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{tech.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 rounded-full text-xs bg-transparent border-pink-300 text-pink-600">
                      选择
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-20">
          <div className="max-w-md mx-auto px-4 py-3 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl bg-transparent border-pink-300 text-pink-600"
              onClick={() => {
                if (isGuest && onRegister) { onRegister() }
              }}
            >
              咨询详情
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-pink-500 hover:bg-pink-600 text-white"
              onClick={() => {
                if (isGuest && onRegister) { onRegister() }
                else { setShowBooking(true) }
              }}
            >
              立即预约
            </Button>
          </div>
        </div>

        {showBooking && (
          <BookingModal
            onClose={() => setShowBooking(false)}
            caregiverName={selectedService.name}
            onSuccess={() => { setShowBooking(false); setShowDetail(false) }}
          />
        )}

        {showPoster && (
          <SharePosterModal
            onClose={() => setShowPoster(false)}
            type="service"
            themeColor="pink"
            data={{
              name: selectedService.name,
              subtitle: `${selectedService.duration} | ${selectedService.sessions}`,
              desc: selectedService.desc,
              price: selectedService.price,
              tags: selectedService.benefits,
              rating: selectedService.rating,
              reviews: selectedService.reviews,
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
          <h1 className="font-semibold text-foreground flex-1">产后修复</h1>
        </div>
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === tab
                    ? "bg-pink-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="px-4 pt-4">
        <Card className="border-0 shadow-sm bg-gradient-to-r from-pink-100 to-rose-50 overflow-hidden">
          <CardContent className="p-4 relative">
            <div className="relative z-10">
              <h3 className="font-bold text-foreground">科学产后恢复</h3>
              <p className="text-xs text-muted-foreground mt-1">专业产康技师上门服务，安全有效</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-card/80 text-pink-700 border-0 text-xs">
                  <BadgeCheck className="w-3 h-3 mr-0.5" />
                  持证上岗
                </Badge>
                <Badge className="bg-card/80 text-pink-700 border-0 text-xs">
                  <MapPin className="w-3 h-3 mr-0.5" />
                  上门服务
                </Badge>
              </div>
            </div>
            <Flower2 className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-pink-200" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-3 px-4">
        <button
          type="button"
          onClick={() => setSubView("technicians")}
          className="flex w-full items-center justify-between rounded-xl border border-pink-200/80 bg-card px-4 py-3 text-left shadow-sm transition-colors hover:bg-pink-50/50"
        >
          <div>
            <p className="font-semibold text-foreground">产康技师列表</p>
            <p className="text-xs text-muted-foreground">查看持证技师、评价与服务好评</p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-pink-500" />
        </button>
      </div>

      {/* Service List */}
      <div className="px-4 py-4 space-y-3">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => { setSelectedService(service); setShowDetail(true) }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    {service.popular && <Badge className="bg-pink-100 text-pink-700 border-0 text-[10px]">热门</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </span>
                    <span>{service.sessions}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{service.rating}</span>
                    <span className="text-[10px] text-muted-foreground">({service.reviews}条评价)</span>
                  </div>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p className="font-bold text-pink-600 text-lg">{service.price}</p>
                  {service.originalPrice && (
                    <p className="text-xs text-muted-foreground line-through">{service.originalPrice}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex gap-1.5">
                  {service.benefits.map((b) => (
                    <span key={b} className="text-[10px] text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded">{b}</span>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="h-7 rounded-full px-3 text-xs bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isGuest && onRegister) { onRegister() }
                    else { setSelectedService(service); setShowBooking(true) }
                  }}
                >
                  预约
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showBooking && selectedService && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          caregiverName={selectedService.name}
          onSuccess={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}
