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
  UserCircle,
  Search,
  ShieldCheck,
  MessageSquareWarning,
  FileSignature,
  GraduationCap,
} from "lucide-react"

interface TechnicianProfilePageProps {
  onBackToEntry?: () => void
  onOpenSubPage?: (page: string) => void
}

export function TechnicianProfilePage({ onBackToEntry, onOpenSubPage }: TechnicianProfilePageProps) {
  const [showNotification, setShowNotification] = useState(true)

  const menuItems = [
    { icon: UserCircle, label: "我的简历", desc: "编辑与分享个人简历", badge: "新", action: "resume" },
    { icon: TrendingUp, label: "业绩统计", desc: "收入与服务数据", badge: "", action: "" },
    { icon: Star, label: "我的评价", desc: "查看客户评价", badge: "12", action: "" },
    { icon: Wallet, label: "我的收入", desc: "查看收入明细", badge: "", action: "" },
    { icon: FileSignature, label: "我的合同", desc: "查看合同与签约", badge: "", action: "" },
    { icon: Search, label: "征信报告", desc: "查看个人征信状态", badge: "", action: "background-check" },
    { icon: ShieldCheck, label: "无犯罪记录", desc: "查看证明与上传", badge: "", action: "background-check" },
    { icon: Shield, label: "我的保险", desc: "保险状态与购买", badge: "", action: "" },
    { icon: FileText, label: "服务记录", desc: "历史服务详情", badge: "", action: "" },
    { icon: Award, label: "资质证书", desc: "证书管理与查看", badge: "3", action: "" },
    { icon: GraduationCap, label: "技能提升", desc: "培训课程与考核", badge: "新", action: "" },
    { icon: MessageSquareWarning, label: "投诉建议", desc: "查看雇主反馈", badge: "2", action: "" },
    { icon: Bell, label: "消息通知", desc: "系统消息与提醒", badge: "5", action: "" },
    { icon: Settings, label: "账号设置", desc: "个人信息与密码", badge: "", action: "" },
    { icon: HelpCircle, label: "帮助中心", desc: "常见问题解答", badge: "", action: "" },
  ]

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <div className="safe-area-top bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 px-4 pb-6 pt-4 text-white">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-white/30">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-white/20 text-white text-lg">技</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">张小芳</h2>
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

      {/* Stats Cards */}
      <div className="-mt-3 px-3">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-4 divide-x divide-border">
              <div className="p-3 text-center">
                <p className="text-base font-bold text-green-600">¥8,500</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">本月收入</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-teal-600">¥12.6万</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">累计收入</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-blue-600">156</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">完成订单</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-purple-600">3</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">持有证书</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <div className="mt-2 px-3">
        <Card className="border border-border/80 shadow-sm">
          <CardContent className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-foreground">专业技能</h3>
              <Shield className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="bg-teal-100 text-[11px] text-teal-600 hover:bg-teal-100">
                产后腹直肌修复
              </Badge>
              <Badge variant="secondary" className="bg-teal-100 text-[11px] text-teal-600 hover:bg-teal-100">
                盆底肌康复
              </Badge>
              <Badge variant="secondary" className="bg-teal-100 text-[11px] text-teal-600 hover:bg-teal-100">
                乳腺疏通
              </Badge>
              <Badge variant="secondary" className="bg-teal-100 text-[11px] text-teal-600 hover:bg-teal-100">
                骨盆修复
              </Badge>
              <Badge variant="secondary" className="bg-teal-100 text-[11px] text-teal-600 hover:bg-teal-100">
                产后瑜伽
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu List */}
      <div className="mt-2 px-3">
        <Card className="overflow-hidden border border-border/80 shadow-sm">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => item.action && onOpenSubPage?.(item.action)}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-muted/50 ${
                  index !== menuItems.length - 1 ? "border-b border-border/60" : ""
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-100 to-emerald-50">
                  <item.icon className="h-3.5 w-3.5 text-teal-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
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
      <div className="mt-3 px-3 pb-4">
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
