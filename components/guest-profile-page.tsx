"use client"

import {
  ChevronRight,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Shield,
  Crown,
  Gift,
  Star,
  Receipt,
  UserPlus,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    id: "orders",
    icon: FileText,
    label: "订单管理",
    desc: "登录后查看订单",
    color: "text-primary",
    bgColor: "bg-gradient-to-br from-orange-100 to-amber-50",
  },
  {
    id: "caregivers",
    icon: Users,
    label: "我的阿姨",
    desc: "登录后查看服务人员",
    color: "text-teal-600",
    bgColor: "bg-gradient-to-br from-teal-100 to-emerald-50",
  },
  {
    id: "settings",
    icon: Settings,
    label: "设置",
    desc: "账号与隐私设置",
    color: "text-slate-600",
    bgColor: "bg-gradient-to-br from-slate-100 to-gray-50",
  },
  {
    id: "help",
    icon: HelpCircle,
    label: "帮助与反馈",
    desc: "常见问题解答",
    color: "text-slate-600",
    bgColor: "bg-gradient-to-br from-slate-100 to-gray-50",
  },
]

const memberBenefits = [
  { icon: Star, label: "专属折扣", desc: "会员专享9折优惠" },
  { icon: Crown, label: "优先预约", desc: "热门阿姨优先选择" },
  { icon: Gift, label: "积分奖励", desc: "消费积分兑换好礼" },
  { icon: Shield, label: "专属客服", desc: "一对一顾问服务" },
]

interface GuestProfilePageProps {
  onRegister: () => void
}

export function GuestProfilePage({ onRegister }: GuestProfilePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary to-primary/80 px-4 pt-6 pb-20 safe-area-top relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h1 className="text-lg font-semibold text-primary-foreground">个人中心</h1>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Guest Profile */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-18 h-18 rounded-full bg-card/20 overflow-hidden ring-4 ring-primary-foreground/20 shadow-lg flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-primary-foreground/60" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary-foreground">游客用户</h2>
            <p className="text-sm text-primary-foreground/80 mt-1">登录/注册享受更多服务</p>
          </div>
          <Button
            onClick={onRegister}
            className="bg-card hover:bg-card/90 text-primary shadow-md"
          >
            立即登录
          </Button>
        </div>

        <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary-foreground/10 rounded-full" />
        <div className="absolute right-10 bottom-4 w-24 h-24 bg-primary-foreground/5 rounded-full" />
      </header>

      <main className="px-4 -mt-14 pb-8 space-y-4 relative z-10">
        {/* Empty Order Stats */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-4">
              {["待付款", "服务中", "待评价", "已完成"].map((stat, idx) => (
                <button
                  key={stat}
                  onClick={onRegister}
                  className="flex flex-col items-center gap-1 py-5 hover:bg-muted/50 transition-colors relative"
                >
                  <span className="text-2xl font-bold text-muted-foreground/40">--</span>
                  <span className="text-xs text-muted-foreground">{stat}</span>
                  {idx < 3 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Register CTA */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 p-4 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md">
                  <Sparkles className="w-7 h-7 text-card" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">注册成为会员</p>
                  <p className="text-xs text-muted-foreground mt-0.5">新用户首单立减500元</p>
                </div>
                <Button onClick={onRegister} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  立即注册
                </Button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-200/30 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Member Benefits Preview */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">会员权益</h3>
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                注册即享
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {memberBenefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.label} className="p-3 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{benefit.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-10">{benefit.desc}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Disabled */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm opacity-60 cursor-not-allowed">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center mb-2">
                <Gift className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">邀请有礼</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm opacity-60 cursor-not-allowed">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">我的评价</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm opacity-60 cursor-not-allowed">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl flex items-center justify-center mb-2">
                <Receipt className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">优惠券</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu List */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={item.id === "help" || item.id === "settings" ? undefined : onRegister}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors relative"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-foreground block">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  {idx < menuItems.length - 1 && (
                    <span className="absolute left-[4.5rem] right-4 bottom-0 h-px bg-border" />
                  )}
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-2 pb-4">优厚家庭服务 v1.0.0</p>
      </main>
    </div>
  )
}
