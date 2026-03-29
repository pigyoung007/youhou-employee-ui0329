"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronRight,
  Star,
  Award,
  Calendar,
  Clock,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Shield,
  Wallet,
  TrendingUp,
} from "lucide-react"

interface TechnicianProfilePageProps {
  onBackToEntry?: () => void
}

export function TechnicianProfilePage({ onBackToEntry }: TechnicianProfilePageProps) {
  const [showNotification, setShowNotification] = useState(true)

  const menuItems = [
    { icon: Wallet, label: "我的收入", desc: "查看收入明细", badge: "" },
    { icon: Calendar, label: "排班管理", desc: "查看和申请排班", badge: "" },
    { icon: FileText, label: "服务记录", desc: "历史服务详情", badge: "" },
    { icon: Award, label: "资质证书", desc: "证书管理与查看", badge: "3" },
    { icon: TrendingUp, label: "技能提升", desc: "培训课程与考核", badge: "新" },
    { icon: Bell, label: "消息通知", desc: "系统消息与提醒", badge: "5" },
    { icon: Settings, label: "账号设置", desc: "个人信息与密码", badge: "" },
    { icon: HelpCircle, label: "帮助中心", desc: "常见问题解答", badge: "" },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white p-4 pt-4 pb-8 safe-area-top">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white/30">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-white/20 text-white text-lg">技</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">张小芳</h2>
              <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400">高级技师</Badge>
            </div>
            <p className="text-sm opacity-90 mt-1">工号: TEC20230088</p>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-3 h-3 ${i <= 5 ? "fill-amber-300 text-amber-300" : "text-white/30"}`} />
              ))}
              <span className="text-xs ml-1">5.0分</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 -mt-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-xl font-bold text-teal-600">156</p>
                <p className="text-xs text-muted-foreground">服务次数</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">98%</p>
                <p className="text-xs text-muted-foreground">好评率</p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber-600">3</p>
                <p className="text-xs text-muted-foreground">本月表彰</p>
              </div>
              <div>
                <p className="text-xl font-bold text-violet-600">2680</p>
                <p className="text-xs text-muted-foreground">积分</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <div className="px-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">专业技能</h3>
              <Shield className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-teal-100 text-teal-600 hover:bg-teal-100">产后腹直肌修复</Badge>
              <Badge variant="secondary" className="bg-teal-100 text-teal-600 hover:bg-teal-100">盆底肌康复</Badge>
              <Badge variant="secondary" className="bg-teal-100 text-teal-600 hover:bg-teal-100">乳腺疏通</Badge>
              <Badge variant="secondary" className="bg-teal-100 text-teal-600 hover:bg-teal-100">骨盆修复</Badge>
              <Badge variant="secondary" className="bg-teal-100 text-teal-600 hover:bg-teal-100">产后瑜伽</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu List */}
      <div className="p-4">
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left ${
                  index !== menuItems.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-50 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {item.badge && (
                  <Badge className={`${item.badge === "新" ? "bg-teal-500" : "bg-red-500"} text-white hover:bg-teal-500`}>
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Logout */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          className="w-full bg-transparent border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={onBackToEntry}
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground pb-4">优厚家庭服务 员工版 v1.0.0</p>
    </div>
  )
}
