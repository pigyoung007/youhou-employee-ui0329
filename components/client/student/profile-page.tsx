"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronRight,
  FileText,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Gift,
  Bell,
  RefreshCw,
  Receipt,
  Crown,
  Shield,
  CheckCircle2,
} from "lucide-react"

interface StudentProfilePageProps {
  onSwitchRole: () => void
  onBackToEntry: () => void
}

// 学员权益
const studentBenefits = [
  { icon: BookOpen, title: "在线课程", desc: "无限次观看已购课程" },
  { icon: Star, title: "专属辅导", desc: "一对一导师答疑" },
  { icon: Gift, title: "学习礼包", desc: "入学礼包、结业礼包" },
  { icon: Shield, title: "就业保障", desc: "优先推荐就业机会" },
]

export function StudentProfilePage({ onSwitchRole, onBackToEntry }: StudentProfilePageProps) {
  const [showBenefits, setShowBenefits] = useState(false)

  const menuItems = [
    { icon: FileText, label: "订单管理", desc: "查看课程购买记录" },
    { icon: BookOpen, label: "我的课程", desc: "全部课程学习情况" },
    { icon: Settings, label: "设置", desc: "账号与隐私设置" },
    { icon: HelpCircle, label: "帮助与反馈", desc: "常见问题与客服" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">我的</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white/30">
            <AvatarImage src="/chinese-woman-portrait.jpg" />
            <AvatarFallback className="bg-white/20 text-white text-lg">张</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-lg font-bold">张小红</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-white/20 text-white text-xs">学员</Badge>
              <span className="text-xs text-white/80">ID: STU20250001</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Switch Role */}
        <Card 
          className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50 cursor-pointer"
          onClick={onSwitchRole}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">切换角色</h3>
                <p className="text-xs text-muted-foreground">切换到家政从业者身份</p>
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
                <p className="text-lg font-bold text-primary">1</p>
                <p className="text-xs text-muted-foreground">待付款</p>
              </button>
              <button className="py-2">
                <p className="text-lg font-bold text-amber-600">2</p>
                <p className="text-xs text-muted-foreground">学习中</p>
              </button>
              <button className="py-2">
                <p className="text-lg font-bold text-teal-600">1</p>
                <p className="text-xs text-muted-foreground">待评价</p>
              </button>
              <button className="py-2">
                <p className="text-lg font-bold text-violet-600">3</p>
                <p className="text-xs text-muted-foreground">已完成</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Member Benefits */}
        <Card 
          className="border-0 shadow-md bg-gradient-to-r from-teal-500 to-teal-600 cursor-pointer"
          onClick={() => setShowBenefits(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">学员权益</h3>
                  <p className="text-xs text-white/80">查看您的专属权益</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
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
          优厚家庭服务 · 学员端 v1.0.0
        </p>
      </main>

      {/* Benefits Sheet */}
      <Sheet open={showBenefits} onOpenChange={setShowBenefits}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>学员权益</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4 overflow-y-auto h-[calc(60vh-100px)]">
            <div className="grid grid-cols-2 gap-3">
              {studentBenefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-teal-500" />
                        <CheckCircle2 className="w-4 h-4 text-teal-500" />
                      </div>
                      <h4 className="font-medium text-sm text-foreground">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
