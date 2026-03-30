"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, Settings, Bell, FileText, HelpCircle, LogOut, Target, Users, X, TrendingUp } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface ProfilePageProps {
  employeeRole?: "career" | "maternity_consultant" | "bei_yi_sheng"
  onBackToEntry?: () => void
  onOpenGoals?: () => void
  onOpenContracts?: () => void
  onOpenSchedule?: () => void
  onSwitchRole?: (role: "career" | "maternity_consultant" | "bei_yi_sheng") => void
}

export function MergedEmployeeProfilePage({
  employeeRole = "maternity_consultant",
  onBackToEntry,
  onOpenGoals,
  onOpenContracts,
  onOpenSchedule,
  onSwitchRole,
}: ProfilePageProps) {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false)

  const isCareer = employeeRole === "career"
  const isBeiYiSheng = employeeRole === "bei_yi_sheng"
  const roleName = isCareer ? "职业顾问" : isBeiYiSheng ? "贝医生" : "母婴顾问"
  const employeeName = isCareer ? "王顾问" : isBeiYiSheng ? "李护士" : "张婷婷"
  const empNo = isCareer ? "EMP001" : isBeiYiSheng ? "BYS001" : "MY20231056"

  // 本月业绩数据
  const performanceData = isBeiYiSheng
    ? [
        { val: "45", label: "完成回访", color: "text-pink-600", bgColor: "bg-pink-50" },
        { val: "98%", label: "准时率", color: "text-amber-600", bgColor: "bg-amber-50" },
        { val: "4.9", label: "客户评分", color: "text-teal-600", bgColor: "bg-teal-50" },
      ]
    : isCareer
    ? [
        { val: "12", label: "新签学员", color: "text-pink-600", bgColor: "bg-pink-50" },
        { val: "¥8.6万", label: "签约金额", color: "text-amber-600", bgColor: "bg-amber-50" },
        { val: "78%", label: "目标完成", color: "text-teal-600", bgColor: "bg-teal-50" },
      ]
    : [
        { val: "18", label: "新签订单", color: "text-pink-600", bgColor: "bg-pink-50" },
        { val: "¥32.5万", label: "签约金额", color: "text-amber-600", bgColor: "bg-amber-50" },
        { val: "85%", label: "目标完成", color: "text-teal-600", bgColor: "bg-teal-50" },
      ]

  const menuItems = [
    { icon: Target, label: "绩效目标", onClick: onOpenGoals },
    { icon: FileText, label: "合同管理", onClick: onOpenContracts },
    { icon: Bell, label: "消息通知", onClick: undefined },
    { icon: Settings, label: "设置", onClick: undefined },
    { icon: HelpCircle, label: "帮助中心", onClick: undefined },
  ]

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* 头部区域 - 紧凑设计 */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 pt-8 pb-4 px-3 text-white">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback className="bg-white/20 text-white">{employeeName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold">{employeeName}</h1>
            <p className="text-white/80 text-xs">{roleName} · {empNo}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/90 hover:text-white hover:bg-white/10 text-xs h-7 px-2"
            onClick={() => setShowRoleSwitcher(true)}
          >
            <Users className="w-3.5 h-3.5 mr-1" />
            切换
          </Button>
        </div>
      </div>

      <div className="px-3 py-2 space-y-2">
        {/* 本月业绩卡片 - 紧凑版 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <TrendingUp className="w-3 h-3 text-primary" />
              <h3 className="font-semibold text-[11px]">本月业绩</h3>
            </div>
            <div className="flex items-center justify-between">
              {performanceData.map((item, idx) => (
                <div key={idx} className={`${item.bgColor} rounded px-2 py-1 text-center flex-1 ${idx > 0 ? 'ml-1.5' : ''}`}>
                  <p className={`text-sm font-bold ${item.color}`}>{item.val}</p>
                  <p className="text-[9px] text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 菜单列表 - 紧凑间距 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
                  onClick={item.onClick}
                >
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-pink-500" />
                  </div>
                  <span className="flex-1 text-sm">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* 退出登录按钮 */}
        <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={onBackToEntry}>
          <CardContent className="p-0">
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <LogOut className="w-4 h-4 text-red-500" />
              </div>
              <span className="flex-1 text-sm text-red-600">退出登录</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Switcher Drawer */}
      <Sheet open={showRoleSwitcher} onOpenChange={setShowRoleSwitcher}>
        <SheetContent side="right" className="w-[85vw] max-w-sm flex flex-col py-0 h-full">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="text-sm">切换角色</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {[
              { id: "career" as const, name: "职业顾问", desc: "负责学员培训与就业" },
              { id: "maternity_consultant" as const, name: "母婴顾问", desc: "负责月嫂/育婴师服务" },
              { id: "bei_yi_sheng" as const, name: "贝医生", desc: "负责产康回访服务" },
            ].map((role) => (
              <div
                key={role.id}
                onClick={() => {
                  onSwitchRole?.(role.id)
                  setShowRoleSwitcher(false)
                }}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  employeeRole === role.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
              >
                <p className="font-semibold text-sm">{role.name}</p>
                <p className="text-xs text-muted-foreground">{role.desc}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
