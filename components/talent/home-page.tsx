"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Star, Award, ChevronRight, Calendar, Bell, MapPin,
  TrendingUp, Clock, Heart, Phone, Shield,
  Briefcase, GraduationCap, CheckCircle,
} from "lucide-react"

const profileData = {
  name: "李秀英",
  avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
  level: "金牌月嫂",
  age: 45,
  hometown: "宁夏银川",
  experience: "8年",
  currentCity: "银川",
  education: "高中",
  joinDate: "2017-03",
  phone: "138****8888",
  salary: "12800-15800/月",
  rating: 4.9,
  totalOrders: 86,
  monthIncome: 13500,
  totalIncome: 268000,
  certificates: ["高级母婴护理师", "催乳师", "营养师", "育婴师"],
  skills: ["新生儿护理", "产妇护理", "月子餐", "早教启蒙", "催乳通乳"],
  completeness: 85,
  incompletItems: ["上传健康证", "完善自我介绍视频"],
  workHistory: [
    { employer: "张女士家庭", period: "2024.01-2024.02", rating: 5.0 },
    { employer: "李女士家庭", period: "2023.10-2023.11", rating: 4.8 },
  ],
}

const todaySchedule = [
  { id: 1, time: "09:00", type: "月嫂服务", client: "张女士", address: "金凤区万达公寓12-3-602", status: "进行中" },
  { id: 2, time: "14:00", type: "产后修复", client: "王女士", address: "兴庆区新华街88号", status: "待开始" },
]

const notifications = [
  { id: 1, text: "您有2份服务报告待提交", color: "bg-amber-50", dot: "bg-amber-500" },
  { id: 2, text: "明日有1个产后修复预约需确认", color: "bg-teal-50", dot: "bg-teal-500" },
  { id: 3, text: "新证书已颁发，请前往查看", color: "bg-violet-50", dot: "bg-violet-500" },
]

interface TalentHomePageProps {
  onOpenService?: (serviceName: string) => void
}

export function TalentHomePage({ onOpenService }: TalentHomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 pt-4 pb-6 px-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white">优厚家服 - 人才端</h1>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-amber-200">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-amber-100 text-amber-600">{profileData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                  {profileData.level.slice(0, 2)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg text-foreground">{profileData.name}</h2>
                  <Badge className="bg-amber-100 text-amber-700 text-[10px]">{profileData.level}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{profileData.rating}</span>
                  <span>{profileData.totalOrders}单</span>
                  <span>{profileData.experience}经验</span>
                </div>
                {/* Completeness */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">档案完善度</span>
                    <span className="font-medium text-amber-600">{profileData.completeness}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${profileData.completeness}%` }} />
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-4 pb-24">
        {/* Service Categories */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">服务项目</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: "找月嫂", icon: "👶", color: "from-amber-100 to-orange-50" },
                { name: "产后修复", icon: "🌸", color: "from-pink-100 to-rose-50" },
                { name: "育婴师", icon: "🎒", color: "from-teal-100 to-emerald-50" },
                { name: "在线课程", icon: "📚", color: "from-violet-100 to-purple-50" },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => onOpenService?.(cat.name)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-xl`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs text-foreground font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today Schedule */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              今日日程
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todaySchedule.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="text-center min-w-[48px]">
                  <p className="text-sm font-bold text-amber-600">{item.time}</p>
                </div>
                <div className="w-px h-10 bg-amber-300" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.type}</p>
                    <Badge className={`text-[10px] ${item.status === "进行中" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.client} | {item.address}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              通知提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-3 ${item.color} rounded-lg`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${item.dot} rounded-full`} />
                  <span className="text-sm">{item.text}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

    </div>
  )
}
