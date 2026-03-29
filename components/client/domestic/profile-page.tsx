"use client"

import { useState } from "react"
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
  RefreshCw,
  Receipt,
} from "lucide-react"

interface DomesticProfilePageProps {
  onSwitchRole: () => void
  onBackToEntry: () => void
}

export function DomesticProfilePage({ onSwitchRole, onBackToEntry }: DomesticProfilePageProps) {
  const menuItems = [
    { icon: FileText, label: "订单管理", desc: "查看历史订单记录" },
    { icon: Settings, label: "设置", desc: "账号与隐私设置" },
    { icon: HelpCircle, label: "帮助与反馈", desc: "常见问题与客服" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">我的</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
              2
            </span>
          </Button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white/30">
            <AvatarImage src="/professional-chinese-nanny-woman-portrait-warm-smi.jpg" />
            <AvatarFallback className="bg-white/20 text-white text-lg">李</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-lg font-bold">李阿姨</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-white/20 text-white text-xs">金牌月嫂</Badge>
              <span className="text-xs text-white/80">8年经验</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Switch Role */}
        <Card 
          className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-emerald-50 cursor-pointer"
          onClick={onSwitchRole}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">切换角色</h3>
                <p className="text-xs text-muted-foreground">切换到学员身份</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <button className="py-2">
                <p className="text-lg font-bold text-primary">0</p>
                <p className="text-xs text-muted-foreground">待付款</p>
              </button>
              <button className="py-2">
                <p className="text-lg font-bold text-amber-600">1</p>
                <p className="text-xs text-muted-foreground">服务中</p>
              </button>
              <button className="py-2">
                <p className="text-lg font-bold text-teal-600">0</p>
                <p className="text-xs text-muted-foreground">待评价</p>
              </button>
              <button className="py-2">
                <p className="text-lg font-bold text-violet-600">15</p>
                <p className="text-xs text-muted-foreground">已完成</p>
              </button>
            </div>
          </CardContent>
        </Card>

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
          优厚家庭服务 · 家政端 v1.0.0
        </p>
      </main>
    </div>
  )
}
