"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Star, Award, ChevronRight, Settings, Heart, HelpCircle,
  FileText, Shield, Bell, LogOut, Wallet, Calendar,
  UserCheck, BookOpen, Phone, MapPin, Edit, FileCheck, Gift, TrendingUp,
} from "lucide-react"

const profileData = {
  name: "李秀英",
  avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
  level: "金牌月嫂",
  phone: "138****8888",
  age: 45,
  hometown: "宁夏银川",
  currentCity: "银川市",
  experience: "8年",
  education: "高中",
  rating: 4.9,
  totalOrders: 86,
  totalIncome: 268000,
  balance: 12800,
  certificates: [
    { name: "高级母婴护理师", issuer: "人社部", status: "有效" },
    { name: "催乳师（中级）", issuer: "中国保健协会", status: "有效" },
    { name: "营养师", issuer: "卫健委", status: "有效" },
    { name: "育婴师", issuer: "人社部", status: "有效" },
  ],
}

const menuGroups = [
  {
    title: "我的服务",
    items: [
      { icon: Wallet, label: "我的钱包", desc: "余额 ¥12,800", color: "text-green-600", bg: "bg-green-100", action: "deposit" },
      { icon: TrendingUp, label: "收入明细", desc: "本月收入", color: "text-emerald-600", bg: "bg-emerald-100", action: "income" },
      { icon: Calendar, label: "服务记录", desc: "共86单", color: "text-blue-600", bg: "bg-blue-100" },
      { icon: FileCheck, label: "我的合同", desc: "3份合同", color: "text-indigo-600", bg: "bg-indigo-100", action: "contracts" },
      { icon: Gift, label: "下户单", desc: "待签署", color: "text-rose-600", bg: "bg-rose-100", action: "discharge" },
      { icon: Award, label: "我的证书", desc: "4本证书", color: "text-amber-600", bg: "bg-amber-100" },
      { icon: BookOpen, label: "学习记录", desc: "3门课程", color: "text-purple-600", bg: "bg-purple-100" },
    ],
  },
  {
    title: "账户设置",
    items: [
      { icon: UserCheck, label: "实名认证", desc: "已认证", color: "text-teal-600", bg: "bg-teal-100" },
      { icon: Shield, label: "隐私设置", desc: "", color: "text-slate-600", bg: "bg-slate-100" },
      { icon: Bell, label: "通知设置", desc: "", color: "text-rose-600", bg: "bg-rose-100" },
      { icon: Settings, label: "系统设置", desc: "", color: "text-gray-600", bg: "bg-gray-100" },
    ],
  },
  {
    title: "其他",
    items: [
      { icon: HelpCircle, label: "帮助中心", desc: "", color: "text-cyan-600", bg: "bg-cyan-100" },
      { icon: FileText, label: "用户协议", desc: "", color: "text-indigo-600", bg: "bg-indigo-100" },
      { icon: Heart, label: "关于我们", desc: "", color: "text-pink-600", bg: "bg-pink-100" },
    ],
  },
]

export function TalentProfilePage({ onOpenSubPage }: { onOpenSubPage?: (page: string) => void }) {
  const [showCerts, setShowCerts] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 pt-4 pb-8 px-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white">我的</h1>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <Avatar className="w-18 h-18 border-3 border-white/30 shadow-lg">
            <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-amber-100 text-amber-600 text-xl">{profileData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{profileData.name}</h2>
              <Badge className="bg-white/20 text-white border-0 text-[10px]">{profileData.level}</Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-white/80 text-sm">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-white text-white" />{profileData.rating}</span>
              <span>{profileData.totalOrders}单</span>
              <span>{profileData.experience}经验</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-white/70 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{profileData.currentCity}</span>
              <Phone className="w-3 h-3 ml-2" />
              <span>{profileData.phone}</span>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 shrink-0">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <main className="px-4 -mt-4 space-y-4 pb-24">
        {/* Stats Cards */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-4 divide-x divide-border">
              <div className="p-3 text-center">
                <p className="text-base font-bold text-green-600">¥13,500</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">本月收入</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-amber-600">¥{(profileData.totalIncome / 10000).toFixed(1)}万</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">累计收入</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-blue-600">{profileData.totalOrders}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">完成订单</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-purple-600">{profileData.certificates.length}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">持有证书</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Groups */}
        {menuGroups.map((group) => (
          <Card key={group.title} className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              </div>
              <div className="divide-y divide-border">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      if (item.label === "我的证书") {
                        setShowCerts(true)
                      } else if ("action" in item && item.action) {
                        onOpenSubPage?.(item.action)
                      }
                    }}
                  >
                    <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center`}>
                      <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                    </div>
                    {item.desc && <span className="text-xs text-muted-foreground">{item.desc}</span>}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Logout */}
        <Button variant="outline" className="w-full bg-transparent text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>
      </main>

      {/* Certificates Sheet */}
      <Sheet open={showCerts} onOpenChange={setShowCerts}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>我的证书</SheetTitle></SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {profileData.certificates.map((cert, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-[10px]">{cert.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
