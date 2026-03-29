"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Shield,
  Bell,
  FileText,
  Users,
  Target,
  Award,
  Calendar,
  TrendingUp,
} from "lucide-react"

interface MaternityProfilePageProps {
  onBackToEntry?: () => void
}

export function MaternityProfilePage({ onBackToEntry }: MaternityProfilePageProps) {
  const [showSettings, setShowSettings] = useState(false)

  const menuItems = [
    { icon: Target, label: "业绩目标", desc: "查看本月目标完成情况", badge: "85%" },
    { icon: Users, label: "我的客户", desc: "已服务客户档案", count: 156 },
    { icon: FileText, label: "合同管理", desc: "电子合同签署记录", count: 89 },
    { icon: Calendar, label: "日程安排", desc: "查看工作日历", badge: "今日3项" },
    { icon: Award, label: "荣誉墙", desc: "获得的荣誉与奖励", count: 12 },
    { icon: Bell, label: "消息通知", desc: "系统消息与提醒", count: 5 },
    { icon: Settings, label: "账号设置", desc: "修改密码、隐私设置" },
    { icon: HelpCircle, label: "帮助反馈", desc: "常见问题与联系客服" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-orange-500 pt-12 pb-8 px-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-white/30">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-white/20 text-white text-xl">李</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">李婷婷</h2>
              <Badge className="bg-white/20 text-white text-xs">高级顾问</Badge>
            </div>
            <p className="text-white/80 text-sm mt-1">工号: MY20231056</p>
            <p className="text-white/80 text-sm">入职: 2023年3月</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-xs text-white/70">累计客户</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-xs text-white/70">签约合同</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">4.9</p>
            <p className="text-xs text-white/70">服务评分</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">28</p>
            <p className="text-xs text-white/70">本月业绩</p>
          </div>
        </div>
      </div>

      <main className="px-4 -mt-4 space-y-4">
        {/* Performance Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium">本月业绩进度</span>
              </div>
              <span className="text-sm text-primary font-semibold">85%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full" style={{ width: "85%" }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>已完成: 28单</span>
              <span>目标: 33单</span>
            </div>
          </CardContent>
        </Card>

        {/* Menu List */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0 divide-y divide-border">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {item.count !== undefined && (
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                )}
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          onClick={onBackToEntry}
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>

        <p className="text-center text-xs text-muted-foreground pt-2 pb-4">优厚家庭服务 - 员工端 v1.0.0</p>
      </main>
    </div>
  )
}
