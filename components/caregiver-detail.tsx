"use client"

import { useState } from "react"
import {
  X,
  Star,
  MapPin,
  Award,
  Heart,
  Calendar,
  Phone,
  BadgeCheck,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CaregiverDetailProps {
  onClose: () => void
  onBook: () => void
  caregiver: {
    id: number
    name: string
    avatar: string
    experience: number
    origin: string
    rating: number
    reviews: number
    tags: string[]
    price: number
    serviceCount: number
    available?: boolean
  }
}

const certificates = [
  { name: "高级母婴护理师证", issuer: "人社部", date: "2020年" },
  { name: "催乳师证", issuer: "中国妇幼保健协会", date: "2019年" },
  { name: "营养师证", issuer: "中国营养学会", date: "2021年" },
  { name: "产后康复师证", issuer: "人社部", date: "2022年" },
]

const workHistory = [
  { period: "2023.10-2024.01", client: "张女士家庭", service: "月嫂服务", rating: 5 },
  { period: "2023.06-2023.09", client: "李女士家庭", service: "月嫂服务", rating: 5 },
  { period: "2023.02-2023.05", client: "王女士家庭", service: "育婴服务", rating: 4.9 },
]

export function CaregiverDetail({ onClose, onBook, caregiver }: CaregiverDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "cert" | "history">("info")

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header with Image */}
      <div className="relative h-72 bg-gradient-to-br from-orange-100 to-amber-100">
        <img
          src={caregiver.avatar || "/placeholder.svg"}
          alt={caregiver.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 safe-area-top">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <X className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className="rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all",
                isLiked ? "fill-destructive text-destructive" : "text-foreground"
              )}
            />
          </Button>
        </div>

        {/* Name Card */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-foreground">{caregiver.name}</h2>
                <Badge className="bg-primary/15 text-primary border-0">
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  已认证
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {caregiver.origin}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {caregiver.experience}年经验
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  服务{caregiver.serviceCount}户
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-amber-600">{caregiver.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4 pb-28 overflow-y-auto h-[calc(100vh-288px-80px)]">
        {/* Price */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-orange-100/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">服务费用</p>
              <p className="text-2xl font-bold text-primary">
                ¥{caregiver.price.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">/月</span>
              </p>
            </div>
            {caregiver.available !== false ? (
              <Badge className="bg-teal-100 text-teal-700 border-0">
                <Calendar className="w-3 h-3 mr-1" />
                可预约
              </Badge>
            ) : (
              <Badge variant="secondary">已约满</Badge>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caregiver.tags.map((tag, idx) => (
            <Badge
              key={tag}
              variant="secondary"
              className={cn(
                "px-3 py-1",
                idx === 0 ? "bg-primary/15 text-primary" : "bg-muted"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {[
            { id: "info", label: "基本信息" },
            { id: "cert", label: "资质证书" },
            { id: "history", label: "服务记录" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-3 text-sm font-medium relative transition-colors",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold text-foreground">个人简介</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  从事母婴护理行业{caregiver.experience}年，擅长新生儿护理、产妇月子餐制作、产后康复指导。
                  性格温和有耐心，深受雇主好评。持有多项专业资质证书，定期参加技能培训，专业技能扎实。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold text-foreground">详细信息</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "年龄", value: "45岁" },
                    { label: "学历", value: "高中" },
                    { label: "籍贯", value: caregiver.origin },
                    { label: "民族", value: "汉族" },
                    { label: "身高", value: "162cm" },
                    { label: "体重", value: "58kg" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground text-sm">{item.label}</span>
                      <span className="text-foreground text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold text-foreground">技能特长</h4>
                <div className="space-y-2">
                  {[
                    { skill: "新生儿护理", level: 95 },
                    { skill: "月子餐制作", level: 90 },
                    { skill: "产后康复", level: 85 },
                    { skill: "早教互动", level: 80 },
                  ].map((item) => (
                    <div key={item.skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.skill}</span>
                        <span className="text-primary font-medium">{item.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "cert" && (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <Card key={cert.name} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-0">
                    已验证
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-3">
            {workHistory.map((record, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{record.client}</p>
                      <p className="text-xs text-muted-foreground">{record.period}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-600">{record.rating}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {record.service}
                  </Badge>
                </CardContent>
              </Card>
            ))}
            <Button variant="ghost" className="w-full text-primary">
              查看更多服务记录
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border safe-area-bottom">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 bg-transparent gap-2">
            <Phone className="w-4 h-4" />
            联系顾问
          </Button>
          <Button
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onBook}
            disabled={caregiver.available === false}
          >
            {caregiver.available === false ? "已约满" : "立即预约"}
          </Button>
        </div>
      </div>
    </div>
  )
}
