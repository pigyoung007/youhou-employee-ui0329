"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Gift,
  Bell,
  Receipt,
} from "lucide-react"

interface CareerProfilePageProps {
  onBackToEntry: () => void
}

export function CareerProfilePage({ onBackToEntry }: CareerProfilePageProps) {
  const menuItems = [
    { icon: FileText, label: "订单管理", desc: "查看学员订单记录" },
    { icon: Settings, label: "设置", desc: "账号与密码设置" },
    { icon: HelpCircle, label: "帮助与反馈", desc: "常见问题与客服" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">我的</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
              5
            </span>
          </Button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white/30">
            <AvatarImage src="/professional-chinese-woman-avatar-portrait.jpg" />
            <AvatarFallback className="bg-white/20 text-white text-lg">王</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-lg font-bold">王顾问</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-white/20 text-white text-xs">职业顾问</Badge>
              <span className="text-xs text-white/80">工号: EMP001</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center mb-2">
                <Gift className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-xs font-medium text-foreground">邀请有礼</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-xs font-medium text-foreground">我的评价</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center mb-2">
                <Receipt className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-medium text-foreground">优惠券</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="w-9 h-9 bg-muted/50 rounded-lg flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          onClick={onBackToEntry}
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          优厚家庭服务 · 员工端 v1.0.0
        </p>
      </main>
    </div>
  )
}
