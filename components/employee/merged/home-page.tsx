"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Bell, ChevronRight, Baby, Flower2, GraduationCap, BookOpen,
  Share2, Star, Clock, AlertCircle, Sparkles, FileText,
  Phone, ImageIcon, X, Shield, CheckCircle, Download,
  Calendar, TrendingUp, Target, Users, ClipboardList, Package,
  CreditCard, FileSignature, Truck, Gift, MapPin,
} from "lucide-react"

// Service categories for maternity consultant
const serviceCategories = [
  { id: 1, name: "找月嫂", icon: Baby, color: "bg-gradient-to-br from-pink-100 to-rose-50", iconColor: "text-pink-500", desc: "专业月子护理" },
  { id: 2, name: "产后修复", icon: Flower2, color: "bg-gradient-to-br from-pink-100 to-rose-50", iconColor: "text-pink-500", desc: "科学产后恢复" },
  { id: 3, name: "育婴师", icon: GraduationCap, color: "bg-gradient-to-br from-teal-100 to-emerald-50", iconColor: "text-teal-500", desc: "专业育儿指导" },
  { id: 4, name: "在线课程", icon: BookOpen, color: "bg-gradient-to-br from-amber-100 to-orange-50", iconColor: "text-amber-500", desc: "育儿知识学习" },
]

// Quick action items for employees
const quickActions = {
  career: [
    { id: "journal", name: "写日报", icon: FileText, color: "bg-pink-500" },
    { id: "leads", name: "线索跟进", icon: Users, color: "bg-amber-500" },
    { id: "orders", name: "订单管理", icon: ClipboardList, color: "bg-teal-500" },
    { id: "contracts", name: "合同管理", icon: FileSignature, color: "bg-blue-500" },
  ],
  maternity_consultant: [
    { id: "journal", name: "写日报", icon: FileText, color: "bg-pink-500" },
    { id: "leads", name: "线索跟进", icon: Users, color: "bg-amber-500" },
    { id: "orders", name: "订单管理", icon: ClipboardList, color: "bg-teal-500" },
    { id: "inventory", name: "���存管理", icon: Package, color: "bg-purple-500" },
    { id: "contracts", name: "合同管理", icon: FileSignature, color: "bg-blue-500" },
    { id: "gift", name: "礼包申请", icon: Gift, color: "bg-rose-500" },
  ],
  technician: [
    { id: "visits", name: "回访任务", icon: ClipboardList, color: "bg-pink-500" },
    { id: "journal", name: "工作日报", icon: FileText, color: "bg-teal-500" },
  ],
}

// 将 technician 改为 bei_yi_sheng
const quickActionsByRole = {
  career: quickActions.career,
  maternity_consultant: quickActions.maternity_consultant,
  bei_yi_sheng: quickActions.technician,
}

// Sample pending tasks
const pendingTasks = {
  career: [
    { color: "bg-amber-500", bgColor: "bg-amber-50", text: "5个线索待跟进", link: "leads" },
    { color: "bg-pink-500", bgColor: "bg-pink-50", text: "2个学员考试提醒", link: "students" },
    { color: "bg-teal-500", bgColor: "bg-teal-50", text: "1份合同待签署", link: "contracts" },
  ],
  maternity_consultant: [
    { color: "bg-amber-500", bgColor: "bg-amber-50", text: "8个线索待跟进", link: "leads" },
    { color: "bg-pink-500", bgColor: "bg-pink-50", text: "3位雇主待匹配", link: "match" },
    { color: "bg-teal-500", bgColor: "bg-teal-50", text: "2份合同待签署", link: "contracts" },
    { color: "bg-purple-500", bgColor: "bg-purple-50", text: "1个礼包待发放", link: "gift" },
  ],
  technician: [
    { color: "bg-pink-500", bgColor: "bg-pink-50", text: "今日2个回访任务" },
    { color: "bg-amber-500", bgColor: "bg-amber-50", text: "1个异常待反馈" },
  ],
}

// 将 technician 改为 bei_yi_sheng
const pendingTasksByRole = {
  career: pendingTasks.career,
  maternity_consultant: pendingTasks.maternity_consultant,
  bei_yi_sheng: pendingTasks.technician,
}

// Sample schedule items
const scheduleItems = {
  career: [
    { time: "10:00", title: "跟进张女士线索", desc: "高意向培训客户", color: "bg-pink-500" },
    { time: "14:00", title: "学员入学面谈", desc: "新学员报名咨询", color: "bg-teal-500" },
    { time: "16:30", title: "合同签署", desc: "李先生培训合同", color: "bg-blue-500" },
  ],
  maternity_consultant: [
    { time: "09:30", title: "客户面试安排", desc: "王女士 - 张阿姨面试", color: "bg-pink-500" },
    { time: "11:00", title: "跟进高意向客户", desc: "刘先生，预产期3月", color: "bg-amber-500" },
    { time: "14:30", title: "配单确认", desc: "为陈女士确认月嫂", color: "bg-teal-500" },
  ],
  technician: [
    { time: "09:00", title: "李女士��后回访", desc: "剖腹产第3天，检查伤口恢复", color: "bg-pink-500" },
    { time: "15:00", title: "王女士产康评估", desc: "盆底肌评估与训练计划", color: "bg-teal-500" },
  ],
}

// 将 technician 改为 bei_yi_sheng
const scheduleByRole = {
  career: scheduleItems.career,
  maternity_consultant: scheduleItems.maternity_consultant,
  bei_yi_sheng: scheduleItems.technician,
}

interface EmployeeHomePageProps {
  employeeRole: "career" | "maternity_consultant" | "bei_yi_sheng"
  onOpenService?: (serviceName: string) => void
  onOpenJournal?: () => void
  onOpenSubPage?: (page: string) => void
  onSwitchTab?: (tab: string) => void
}

export function EmployeeHomePage({ employeeRole, onOpenService, onOpenJournal, onOpenSubPage, onSwitchTab }: EmployeeHomePageProps) {
  const [showPosterModal, setShowPosterModal] = useState(false)
  const [posterTarget, setPosterTarget] = useState<{ name: string; type: string; desc?: string }>({ name: "", type: "" })

  const isCareer = employeeRole === "career"
  const isBeiYiSheng = employeeRole === "bei_yi_sheng"
  const roleName = isCareer ? "职业顾问" : (isBeiYiSheng ? "贝医生" : "母婴顾问")
  const employeeName = isCareer ? "王顾问" : (isBeiYiSheng ? "李护士" : "张婷婷")

  const handleShare = (name: string, type: string, desc?: string) => {
    setPosterTarget({ name, type, desc })
    setShowPosterModal(true)
  }

  const handleQuickAction = (actionId: string) => {
    // 日志页面特殊处理
    if (actionId === "journal") {
      onOpenJournal?.()
      return
    }
    // 需要切换Tab的页面（包括合同管理）
    const tabPages = ["orders", "leads", "talent", "visits", "contracts"]
    if (tabPages.includes(actionId) && onSwitchTab) {
      onSwitchTab(actionId)
      return
    }
    // 其他子页面
    if (onOpenSubPage) {
      onOpenSubPage(actionId)
    }
  }

  const actions = quickActionsByRole[employeeRole] || quickActionsByRole.maternity_consultant
  const tasks = pendingTasksByRole[employeeRole] || pendingTasksByRole.maternity_consultant
  const schedule = scheduleByRole[employeeRole] || scheduleByRole.maternity_consultant

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 pt-3 pb-4 px-3 safe-area-top">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-10 h-10 border-2 border-white/30">
              <AvatarImage src="/professional-chinese-woman-avatar-portrait.jpg" />
              <AvatarFallback className="bg-white/20 text-white text-xs">{employeeName[0]}</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="font-bold text-sm">{employeeName}</h2>
              <p className="text-[10px] text-white/80">{roleName}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative w-8 h-8">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white">3</span>
          </Button>
        </div>

      </div>

      <main className="px-3 -mt-2 space-y-2.5">
        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <h3 className="font-semibold text-xs">快捷操作</h3>
            </div>
            <div className={`grid ${actions.length > 4 ? 'grid-cols-4' : `grid-cols-${actions.length}`} gap-2`}>
              {actions.slice(0, 8).map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${action.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-medium text-foreground">{action.name}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Service Projects - Only for maternity consultant */}
        {!isBeiYiSheng && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Baby className="w-3.5 h-3.5 text-pink-500" />
                <h3 className="font-semibold text-xs">服务项目</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {serviceCategories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onOpenService?.(cat.name)}
                      className="flex flex-col items-center gap-1 p-1 rounded-xl hover:scale-105 transition-transform"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${cat.color}`}>
                        <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-medium text-foreground">{cat.name}</span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Tasks */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <h3 className="font-semibold text-xs flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />待处理事项
              <Badge className="ml-auto text-[9px] bg-amber-100 text-amber-700 px-1.5">{tasks.length}项</Badge>
            </h3>
            <div className="space-y-1.5">
              {tasks.map((item) => (
                <div key={item.text} className={`flex items-center justify-between p-2 ${item.bgColor} rounded-lg cursor-pointer hover:opacity-90 transition-opacity`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 ${item.color} rounded-full shrink-0`} />
                    <span className="text-[11px]">{item.text}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today Schedule */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />今日日程
              </h3>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-primary" onClick={() => onOpenSubPage?.("schedule")}>
                全部日程 <ChevronRight className="w-3 h-3 ml-0.5" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg">
                  <div className={`w-1.5 h-1.5 ${item.color} rounded-full mt-1.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[11px]">{item.time} - {item.title}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    {(item as any).address && (
                      <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                        <MapPin className="w-3 h-3" />{(item as any).address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work Journal Quick Entry */}
        <Card
          className="border-0 shadow-sm bg-gradient-to-r from-pink-50 to-rose-50 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onOpenJournal?.()}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xs text-foreground">工作日志</h3>
                <p className="text-[10px] text-muted-foreground">记录今日工作、客户跟进、心得体会</p>
              </div>
              <ChevronRight className="w-4 h-4 text-primary shrink-0" />
            </div>
          </CardContent>
        </Card>

        {/* Latest News/Announcements */}
        <Card className="border-0 shadow-sm mb-4">
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Bell className="w-3.5 h-3.5 text-blue-500" />
              <h3 className="font-semibold text-xs">公司公告</h3>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 bg-blue-50/50 rounded-lg">
                <Badge className="text-[9px] bg-red-100 text-red-600 px-1.5 shrink-0">新</Badge>
                <span className="text-[11px] truncate flex-1">2026年清明节放假通知</span>
                <span className="text-[9px] text-muted-foreground shrink-0">03-25</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <span className="text-[11px] truncate flex-1">本月优秀员工评选活动开始</span>
                <span className="text-[9px] text-muted-foreground shrink-0">03-20</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Poster Modal */}
      <Dialog open={showPosterModal} onOpenChange={setShowPosterModal}>
        <DialogContent className="max-w-sm mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm">生成推广海报</DialogTitle>
            <DialogDescription className="text-xs">
              为 &ldquo;{posterTarget.name}&rdquo; 生成专属推广海报
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-pink-100 to-rose-50 rounded-xl p-5 text-center">
              <ImageIcon className="w-8 h-8 mx-auto text-pink-400 mb-2" />
              <p className="text-sm font-semibold text-foreground">{posterTarget.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{posterTarget.type}{posterTarget.desc ? ` · ${posterTarget.desc}` : ""}</p>
              <p className="text-[10px] text-primary mt-2">海报将包含您的专属二维码</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 text-xs h-9 bg-transparent" onClick={() => setShowPosterModal(false)}>
                <Share2 className="w-3.5 h-3.5 mr-1" />分享链接
              </Button>
              <Button className="flex-1 text-xs h-9 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setShowPosterModal(false)}>
                <Download className="w-3.5 h-3.5 mr-1" />保存海报
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
