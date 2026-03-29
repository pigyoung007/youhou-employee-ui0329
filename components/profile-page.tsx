"use client"

import { useState } from "react"
import {
  ChevronRight,
  FileText,
  Users,
  Receipt,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Shield,
  Crown,
  Gift,
  Bell,
  Lock,
  MessageCircle,
  X,
  Coins,
} from "lucide-react"
import { PointsCenter } from "@/components/points-center"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    id: "orders",
    icon: FileText,
    label: "订单管理",
    desc: "查看全部订单",
    badge: "3",
    color: "text-primary",
    bgColor: "bg-gradient-to-br from-orange-100 to-amber-50",
  },
  {
    id: "caregivers",
    icon: Users,
    label: "我的阿姨",
    desc: "当前服务的阿姨档案",
    color: "text-teal-600",
    bgColor: "bg-gradient-to-br from-teal-100 to-emerald-50",
  },
  {
    id: "settings",
    icon: Settings,
    label: "设置",
    desc: "账号与隐私设置、修改密码",
    color: "text-slate-600",
    bgColor: "bg-gradient-to-br from-slate-100 to-gray-50",
  },
  {
    id: "help",
    icon: HelpCircle,
    label: "帮助与反馈",
    desc: "常见问题解答与联系客服",
    color: "text-slate-600",
    bgColor: "bg-gradient-to-br from-slate-100 to-gray-50",
  },
]

const orderStats = [
  { label: "待付款", value: 1, color: "text-primary" },
  { label: "服务中", value: 2, color: "text-teal-600" },
  { label: "待评价", value: 1, color: "text-amber-600" },
  { label: "已完成", value: 8, color: "text-foreground" },
]

const memberBenefits = [
  { icon: Star, label: "专享9折", active: true },
  { icon: Crown, label: "优先预约", active: true },
  { icon: Gift, label: "积分翻倍", active: true },
  { icon: Shield, label: "专属客服", active: true },
]

interface ProfilePageProps {
  onLogout?: () => void
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const [showBenefits, setShowBenefits] = useState(false)
  const [showPoints, setShowPoints] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary to-primary/80 px-4 pt-6 pb-20 safe-area-top relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h1 className="text-lg font-semibold text-primary-foreground">个人中心</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-18 h-18 rounded-full bg-card overflow-hidden ring-4 ring-primary-foreground/20 shadow-lg">
            <img
              src="/professional-chinese-woman-avatar-portrait.jpg"
              alt="用户头像"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-primary-foreground">张女士</h2>
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-foreground border-0 shadow-sm">
                <Crown className="w-3 h-3 mr-1" />
                VIP会员
              </Badge>
            </div>
            <p className="text-sm text-primary-foreground/80 mt-1">138****8888</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            编辑资料
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary-foreground/10 rounded-full" />
        <div className="absolute right-10 bottom-4 w-24 h-24 bg-primary-foreground/5 rounded-full" />
      </header>

      <main className="px-4 -mt-14 pb-8 space-y-4 relative z-10">
        {/* Order Stats Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-4">
              {orderStats.map((stat, idx) => (
                <button
                  key={stat.label}
                  className="flex flex-col items-center gap-1 py-5 hover:bg-muted/50 transition-colors relative"
                >
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  {idx < orderStats.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Member Card */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <button
              onClick={() => setShowBenefits(true)}
              className="w-full bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 p-4 flex items-center gap-4 relative overflow-hidden text-left"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md">
                <Shield className="w-7 h-7 text-card" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground">会员权益</p>
                  <Badge variant="outline" className="bg-card/80 border-amber-300 text-amber-700 text-xs">
                    <Star className="w-3 h-3 mr-0.5 fill-amber-500 text-amber-500" />
                    专享9折
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">点击查看更多会员权益详情</p>
              </div>
              <ChevronRight className="w-5 h-5 text-amber-600" />
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-200/30 rounded-full" />
            </button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          <Card 
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setShowPoints(true)}
          >
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-100 to-yellow-50 rounded-xl flex items-center justify-center mb-2">
                <Coins className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-medium text-foreground">会员积分</p>
              <p className="text-[10px] text-amber-600 font-semibold">2680</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center mb-2">
                <Gift className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-xs font-medium text-foreground">邀请有礼</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-xs font-medium text-foreground">我的评价</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl flex items-center justify-center mb-2">
                <Receipt className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-xs font-medium text-foreground">优惠券</p>
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
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors relative"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-foreground block">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                  {item.badge && (
                    <Badge className="bg-destructive text-destructive-foreground border-0 h-5 min-w-5 justify-center">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  {idx < menuItems.length - 1 && (
                    <span className="absolute left-[4.5rem] right-4 bottom-0 h-px bg-border" />
                  )}
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 bg-card h-12"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-2 pb-4">优厚家庭服务 v1.0.0</p>
</main>

      {/* Points Center */}
      <PointsCenter open={showPoints} onClose={() => setShowPoints(false)} />
  
      {/* Benefits Modal */}
      {showBenefits && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-foreground/60" onClick={() => setShowBenefits(false)} />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">VIP会员权益</h3>
              <button onClick={() => setShowBenefits(false)} className="p-2 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Current Level */}
              <Card className="border-0 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 overflow-hidden">
                <CardContent className="p-4 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <Crown className="w-8 h-8 text-card" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground">VIP会员</p>
                      <p className="text-sm text-muted-foreground">有效期至 2025-12-31</p>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-200/30 rounded-full" />
                </CardContent>
              </Card>

              {/* Benefits List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">专享权益</h4>
                {[
                  { icon: Star, title: "服务折扣", desc: "所有服务享受9折优惠", active: true },
                  { icon: Crown, title: "优先预约", desc: "热门阿姨优先选择权", active: true },
                  { icon: Gift, title: "积分翻倍", desc: "消费积分双倍累积", active: true },
                  { icon: Shield, title: "专属客服", desc: "一对一VIP顾问服务", active: true },
                  { icon: MessageCircle, title: "免费咨询", desc: "无限次在线育儿咨询", active: true },
                  { icon: Receipt, title: "生日礼券", desc: "生日当月专属优惠券", active: true },
                ].map((benefit) => {
                  const Icon = benefit.icon
                  return (
                    <div key={benefit.title} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{benefit.title}</p>
                        <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                      </div>
                      <Badge className="bg-teal-100 text-teal-700 border-0">已解锁</Badge>
                    </div>
                  )
                })}
              </div>

              {/* Upgrade Hint */}
              <Card className="border-0 bg-gradient-to-r from-violet-100 to-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">升级至SVIP</p>
                      <p className="text-xs text-muted-foreground">解锁更多专属权益</p>
                    </div>
                    <Button size="sm" className="bg-violet-500 hover:bg-violet-600 text-white">
                      了解详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
