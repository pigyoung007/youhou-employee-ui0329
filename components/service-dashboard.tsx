"use client"

import { useState } from "react"
import {
  FileText,
  Calendar,
  QrCode,
  ChevronRight,
  Clock,
  CheckCircle2,
  Baby,
  Thermometer,
  Droplets,
  Apple,
  Scan,
  ChevronLeft,
  Camera,
  PenLine,
  Users,
  BookOpen,
  Video,
  Star,
  MapPin,
  Heart,
  CheckCircle,
  X,
  Link2,
  Play,
  Bell,
  Flower2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { SignaturePad } from "@/components/signature-pad"
import { ScanConfirm } from "@/components/scan-confirm"
import { ContractManagement } from "@/components/contract-management"
import { originToProvinceLabel } from "@/lib/employer-caregiver-display"

const contracts = [
  {
    id: 1,
    title: "月嫂服务合同",
    type: "maternity",
    caregiver: "王阿姨",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    status: "pending",
    amount: 12800,
    createTime: "2024-01-15 14:30",
  },
  {
    id: 2,
    title: "母婴管理服务合同",
    type: "nursing",
    service: "母婴护理管理服务",
    status: "pending",
    amount: 8800,
    createTime: "2024-01-14 10:20",
  },
  {
    id: 3,
    title: "产后修复套餐协议",
    type: "recovery",
    service: "盆底肌修复10次",
    status: "pending",
    amount: 6800,
    createTime: "2024-01-13 09:15",
  },
]

const babyLogs = [
  {
    date: "2024-01-15",
    milkAmount: "120ml",
    milkTimes: 8,
    temperature: "36.5",
    poopTimes: 2,
    poopStatus: "正常",
    food: "米糊 30g",
    sleepHours: 14,
    notes: "宝宝今天状态很好，午睡2小时，下午有些闹觉，晚上睡得很香",
    photos: ["/cute-baby-playing.jpg", "/baby-sleeping-peacefully.jpg"],
    caregiverName: "王阿姨",
    updateTime: "20:30",
  },
]

const calendarDays = [
  { date: 13, day: "一", hasLog: true },
  { date: 14, day: "二", hasLog: true },
  { date: 15, day: "三", hasLog: true, isToday: true },
  { date: 16, day: "四", hasLog: false },
  { date: 17, day: "五", hasLog: false },
  { date: 18, day: "六", hasLog: false },
  { date: 19, day: "日", hasLog: false },
]

const cardBalance = {
  serviceName: "盆底肌修复",
  totalTimes: 10,
  usedTimes: 5,
  remainingTimes: 5,
  expiryDate: "2024-06-30",
}

const consumptionRecords = [
  { date: "2024-01-14", service: "盆底肌修复", technician: "张技师", time: "14:30" },
  { date: "2024-01-10", service: "盆底肌修复", technician: "李技师", time: "10:00" },
  { date: "2024-01-05", service: "盆底肌修复", technician: "张技师", time: "15:45" },
]

const interviews = [
  {
    id: 1,
    caregiverName: "陈阿姨",
    caregiverAvatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    date: "2024-01-18",
    time: "14:00",
    location: "优厚家庭服务中心（徐汇店）",
    status: "upcoming",
    tags: ["金牌月嫂", "8年经验"],
  },
  {
    id: 2,
    caregiverName: "周阿姨",
    caregiverAvatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    date: "2024-01-16",
    time: "10:30",
    location: "线上视频面试",
    status: "completed",
    tags: ["高级育婴师", "5年经验"],
  },
]

const knowledgeArticles = [
  {
    id: 1,
    title: "新生儿黄疸护理指南",
    category: "新生儿护理",
    readTime: "5分钟",
    thumbnail: "/cute-baby-playing.jpg",
  },
  {
    id: 2,
    title: "科学母乳喂养方法",
    category: "喂养指导",
    readTime: "8分钟",
    thumbnail: "/baby-sleeping-peacefully.jpg",
  },
  {
    id: 3,
    title: "产后恢复运动推荐",
    category: "产后康复",
    readTime: "6分钟",
    thumbnail: "/young-chinese-woman.jpg",
  },
]

// 顾问推荐的阿姨
const recommendedCaregivers = [
  {
    id: 1,
    name: "李阿姨",
    avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    level: "金牌月嫂",
    age: 45,
    hometown: "湖南长沙",
    experience: "8年",
    salary: "15800-18800元/26天",
    rating: 4.9,
    skills: ["新生儿护理", "月子餐", "催乳"],
    status: "pending", // pending, confirmed, rejected
    recommendedAt: "2026-01-21 14:30",
    consultantName: "张顾问",
  },
  {
    id: 2,
    name: "张阿姨",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    level: "银牌月嫂",
    age: 42,
    hometown: "四川成都",
    experience: "5年",
    salary: "12800-15800元/26天",
    rating: 4.8,
    skills: ["新生儿护理", "产妇护理"],
    status: "confirmed",
    recommendedAt: "2026-01-20 10:00",
    consultantName: "张顾问",
    confirmedAt: "2026-01-20 15:30",
  },
]

// 待办事项 — 聚合来自员工端、人才端、产康技师端的推送
const todoItems = [
  {
    id: 1,
    type: "contract",
    title: "新合同待签署",
    description: "顾问张丽为您生成了月嫂服务合同，请尽快签署",
    date: "2026-04-08 09:30",
    source: "员工端",
    status: "pending",
  },
  {
    id: 2,
    type: "interview",
    title: "视频面试 - 王阿姨",
    description: "您与王阿姨的面试已安排",
    date: "2026-04-12 10:00",
    link: "https://interview.youhou.com/abc123",
    source: "员工端",
    status: "pending",
  },
  {
    id: 3,
    type: "recommendation",
    title: "新阿姨推荐",
    description: "顾问为您推荐了李阿姨，请查看并确认",
    date: "2026-04-07 14:30",
    source: "员工端",
    status: "pending",
  },
  {
    id: 4,
    type: "punch",
    title: "家政员已上户",
    description: "李春华已于今日08:30到达并签到",
    date: "2026-04-09 08:30",
    source: "人才端",
    status: "pending",
  },
  {
    id: 5,
    type: "sign_confirm",
    title: "耗卡待签字",
    description: "张技师已完成盆底肌修复服务，请签字确认消费",
    date: "2026-04-08 16:00",
    source: "产康技师端",
    status: "pending",
  },
  {
    id: 6,
    type: "order_change",
    title: "订单变更通知",
    description: "您的月嫂服务订单服务日期有变更，请查看",
    date: "2026-04-06 11:00",
    source: "员工端",
    status: "pending",
  },
]

interface ServiceDashboardProps {
  onNavigate?: (target: string) => void
}

export function ServiceDashboard({ onNavigate }: ServiceDashboardProps = {}) {
  const [showSignature, setShowSignature] = useState(false)
  const [selectedContract, setSelectedContract] = useState<number | null>(null)
  const [showScan, setShowScan] = useState(false)
  const [selectedDate, setSelectedDate] = useState(15)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof recommendedCaregivers)[0] | null>(null)
  const [showCaregiverDetail, setShowCaregiverDetail] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showTodoList, setShowTodoList] = useState(false)
  const [showInterviewLink, setShowInterviewLink] = useState(false)
  const [interviewLink, setInterviewLink] = useState("")

  const handleSign = (contractId: number) => {
    setSelectedContract(contractId)
    setShowSignature(true)
  }

  const handleSignatureComplete = (signature: string) => {
    console.log("[v0] Signature completed for contract:", selectedContract, signature)
    setShowSignature(false)
    setSelectedContract(null)
  }

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case "maternity":
        return "月嫂服务"
      case "nursing":
        return "母婴管理"
      case "recovery":
        return "产后修复"
      default:
        return "服务合同"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary to-primary/80 px-4 pt-4 pb-16 safe-area-top relative overflow-hidden">
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">服务中心</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">管理您的服务进度和预约</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground relative"
            onClick={() => setShowTodoList(true)}
          >
            <Bell className="w-5 h-5" />
            {todoItems.filter(t => t.status === "pending").length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {todoItems.filter(t => t.status === "pending").length}
              </span>
            )}
          </Button>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-foreground/10 rounded-full" />
        <div className="absolute right-20 bottom-0 w-24 h-24 bg-primary-foreground/5 rounded-full" />
      </header>

      <main className="px-4 -mt-10 pb-4 space-y-4 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">待签合同</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">26</p>
              <p className="text-xs text-muted-foreground">服务天数</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                <QrCode className="w-5 h-5 text-violet-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">剩余次卡</p>
            </CardContent>
          </Card>
        </div>

        {/* Cross-Platform Notification Banner */}
        {todoItems.filter(t => t.status === "pending").length > 0 && (
          <Card 
            className="border-0 shadow-sm bg-gradient-to-r from-blue-50 via-violet-50 to-teal-50 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowTodoList(true)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    您有 {todoItems.filter(t => t.status === "pending").length} 条待办通知
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {todoItems.filter(t => t.status === "pending")[0]?.title}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Services */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">进行中的服务</h2>
          </div>
          <div className="space-y-3">
            <Card className="border-0 shadow-sm overflow-hidden border-l-4 border-l-orange-400">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <Baby className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">月嫂服务</h3>
                      <Badge className="bg-green-100 text-green-700 text-[10px]">服务中</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">李春华 · 金牌月嫂</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>服务进度</span>
                          <span>15/26天</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400 rounded-full" style={{ width: '58%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm overflow-hidden border-l-4 border-l-rose-400">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <Flower2 className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">产后修复</h3>
                      <Badge className="bg-green-100 text-green-700 text-[10px]">服务中</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">盆底肌修复套卡 · 张技师</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">剩余 5/10 次</span>
                      <span className="text-muted-foreground">下次预约: 04-10 14:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Appointment Quick Entry */}
        <Card 
          className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate?.("appointments")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-sky-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">预约管理</p>
                  <p className="text-xs text-muted-foreground">查看和管理您的服务预约</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700 text-[10px]">2个即将到来</Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Caregivers Card */}
        {recommendedCaregivers.filter(c => c.status === "pending").length > 0 && (
          <Card className="border-0 shadow-sm overflow-hidden border-l-4 border-l-rose-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="font-semibold text-foreground">顾问推荐</span>
                  <Badge className="bg-rose-100 text-rose-700 text-[10px]">
                    {recommendedCaregivers.filter(c => c.status === "pending").length}位待确认
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary h-auto p-0"
                  onClick={() => setShowRecommendations(true)}
                >
                  查看全部 <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {recommendedCaregivers.filter(c => c.status === "pending").slice(0, 1).map((caregiver) => (
                  <div 
                    key={caregiver.id}
                    className="flex items-center gap-3 p-3 bg-rose-50/50 rounded-xl cursor-pointer"
                    onClick={() => {
                      setSelectedCaregiver(caregiver)
                      setShowCaregiverDetail(true)
                    }}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={caregiver.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{caregiver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{caregiver.name}</span>
                        <Badge className="bg-rose-100 text-rose-700 text-[10px]">{caregiver.level}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {caregiver.age}岁 · 籍贯 {originToProvinceLabel(caregiver.hometown)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">薪资由顾问沟通，不在此展示</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        className="h-7 bg-rose-500 hover:bg-rose-600 text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCaregiver(caregiver)
                          setShowConfirmDialog(true)
                        }}
                      >
                        确认
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Interview Info */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-rose-50 to-pink-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-500" />
                面试信息
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-sm">
                全部面试 <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-3">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl",
                  interview.status === "upcoming" ? "bg-rose-50/50" : "bg-muted/30"
                )}
              >
                <img
                  src={interview.caregiverAvatar || "/placeholder.svg"}
                  alt={interview.caregiverName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{interview.caregiverName}</span>
                    {interview.status === "upcoming" ? (
                      <Badge className="bg-rose-100 text-rose-600 border-0 text-xs">即将面试</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">已完成</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{interview.date} {interview.time}</span>
                    <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {interview.location.length > 12 ? `${interview.location.slice(0, 12)}...` : interview.location}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {interview.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {interview.status === "upcoming" && (
                  <Button 
                    size="sm" 
                    className="h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white"
                    onClick={() => {
                      setInterviewLink(`https://interview.youhou.com/room/${interview.id}`)
                      setShowInterviewLink(true)
                    }}
                  >
                    查看
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="w-full bg-card p-1 rounded-2xl shadow-sm h-12">
            <TabsTrigger
              value="contracts"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl h-10 font-medium"
            >
              电子合同
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl h-10 font-medium"
            >
              服务日志
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl h-10 font-medium"
            >
              耗卡确认
            </TabsTrigger>
          </TabsList>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="mt-4">
            <ContractManagement role="employer" showHeader={false} />
          </TabsContent>

          {/* Baby Logs Tab */}
          <TabsContent value="logs" className="mt-4 space-y-4">
            {/* Calendar */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-muted/50 to-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <CardTitle className="text-base">2024年1月</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 bg-card">
                    <Calendar className="w-4 h-4 mr-1" />
                    选择日期
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-4">
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={cn(
                        "flex flex-col items-center py-2 px-1 rounded-xl transition-all",
                        day.isToday && selectedDate !== day.date && "ring-2 ring-primary/30",
                        selectedDate === day.date ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs mb-1",
                          selectedDate === day.date ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}
                      >
                        {day.day}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          selectedDate === day.date ? "text-primary-foreground" : "text-foreground"
                        )}
                      >
                        {day.date}
                      </span>
                      {day.hasLog && (
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full mt-1",
                            selectedDate === day.date ? "bg-primary-foreground" : "bg-teal-500"
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Log Details */}
            {babyLogs.map((log, idx) => (
              <Card key={idx} className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-50/80 to-orange-50/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
                        <Baby className="w-5 h-5 text-primary" />
                      </div>
                      1月{selectedDate}日 宝宝日志
                      <Badge className="bg-teal-100 text-teal-700 text-[10px]">家政员填写</Badge>
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {log.caregiverName} · {log.updateTime}更新
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Droplets className="w-4 h-4" />
                        <span className="text-xs font-medium">喝奶量</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{log.milkAmount}</p>
                      <p className="text-xs text-muted-foreground">共{log.milkTimes}次</p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-rose-600 mb-2">
                        <Thermometer className="w-4 h-4" />
                        <span className="text-xs font-medium">体温</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{log.temperature}°C</p>
                      <p className="text-xs text-teal-600 font-medium">正常</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-amber-600 mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-medium">排便</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{log.poopTimes}次</p>
                      <p className="text-xs text-muted-foreground">{log.poopStatus}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <Apple className="w-4 h-4" />
                        <span className="text-xs font-medium">辅食</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{log.food}</p>
                      <p className="text-xs text-muted-foreground">今日已添加</p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <PenLine className="w-3 h-3" />
                      阿姨备注
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">{log.notes}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      今日照片 ({log.photos.length})
                    </p>
                    <div className="flex gap-2">
                      {log.photos.map((photo, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`宝宝照片${i + 1}`}
                            className="w-24 h-24 rounded-xl object-cover"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 rounded-xl transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Technician Care Log */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-violet-50/80 to-purple-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                    <Flower2 className="w-5 h-5 text-violet-600" />
                  </div>
                  产康护理日志
                  <Badge className="bg-violet-100 text-violet-700 text-[10px]">技师填写</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="bg-violet-50/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">盆底肌修复 · 第5次</p>
                    <p className="text-xs text-muted-foreground">张技师 · 01-14 15:00</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    本次进行盆底肌电刺激+生物反馈训练，肌力从3级提升到3+级，恢复进展良好。建议继续坚持凯格尔训练。
                  </p>
                  <div className="flex gap-2">
                    <div className="relative">
                      <img src="/placeholder.svg" alt="服务前" className="w-16 h-16 rounded-lg object-cover" />
                      <span className="absolute bottom-0 left-0 right-0 bg-foreground/60 text-primary-foreground text-[8px] text-center py-0.5 rounded-b-lg">服务前</span>
                    </div>
                    <div className="relative">
                      <img src="/placeholder.svg" alt="服务后" className="w-16 h-16 rounded-lg object-cover" />
                      <span className="absolute bottom-0 left-0 right-0 bg-foreground/60 text-primary-foreground text-[8px] text-center py-0.5 rounded-b-lg">服务后</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Articles */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    母婴保育知识
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-sm">
                    更多 <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {knowledgeArticles.map((article) => (
                  <button
                    key={article.id}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors text-left"
                  >
                    <img
                      src={article.thumbnail || "/placeholder.svg"}
                      alt={article.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-2">{article.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Card Consumption Tab */}
          <TabsContent value="cards" className="mt-4 space-y-4">
            {/* Card Balance */}
            <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-5 text-primary-foreground relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-primary-foreground/80 text-sm">服务项目</p>
                        <h4 className="font-bold text-xl mt-1">{cardBalance.serviceName}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-foreground/80 text-sm">剩余次数</p>
                        <p className="text-4xl font-bold">{cardBalance.remainingTimes}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-foreground rounded-full transition-all"
                        style={{
                          width: `${(cardBalance.remainingTimes / cardBalance.totalTimes) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-primary-foreground/70 mt-2">
                      <span>已使用 {cardBalance.usedTimes} 次</span>
                      <span>共 {cardBalance.totalTimes} 次</span>
                    </div>
                  </div>
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-foreground/10 rounded-full" />
                  <div className="absolute -right-4 bottom-0 w-20 h-20 bg-primary-foreground/5 rounded-full" />
                </div>
                <div className="p-4 bg-card">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">有效期至</span>
                    <span className="font-medium text-foreground">{cardBalance.expiryDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground rounded-2xl text-base gap-2 shadow-lg shadow-primary/25"
                onClick={() => setShowScan(true)}
              >
                <Scan className="w-5 h-5" />
                扫码核销
              </Button>
              <Button
                variant="outline"
                className="h-14 rounded-2xl text-base gap-2 border-violet-200 text-violet-700 hover:bg-violet-50"
                onClick={() => setShowSignature(true)}
              >
                <PenLine className="w-5 h-5" />
                签字确认
              </Button>
            </div>

            {/* Pending Sign Confirmation */}
            <Card className="border-0 shadow-sm overflow-hidden border-l-4 border-l-violet-400">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                    <PenLine className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">待签字确认</p>
                    <p className="text-xs text-muted-foreground">张技师 · 盆底肌修复 · 01-14 15:30</p>
                    <p className="text-xs text-muted-foreground mt-0.5">消费 1 次，剩余 5 次</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="h-8 text-xs bg-violet-600 hover:bg-violet-700"
                    onClick={() => setShowSignature(true)}
                  >
                    签字
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Records */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">消费记录</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-sm">
                    全部记录 <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-0">
                {consumptionRecords.map((record, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between py-3",
                      idx < consumptionRecords.length - 1 && "border-b border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{record.service}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.date} {record.time} · {record.technician}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-teal-50 text-teal-600 font-semibold">
                      -1次
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Signature Modal */}
      {showSignature && <SignaturePad onClose={() => setShowSignature(false)} onComplete={handleSignatureComplete} />}

      {/* Scan Modal */}
      {showScan && (
        <ScanConfirm
          onClose={() => setShowScan(false)}
          serviceName="盆底肌修复"
          remainingTimes={cardBalance.remainingTimes}
        />
      )}

      {/* Recommendations Sheet */}
      <Sheet open={showRecommendations} onOpenChange={setShowRecommendations}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              顾问推荐的阿姨
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {recommendedCaregivers.map((caregiver) => (
              <Card 
                key={caregiver.id}
                className={cn(
                  "border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow",
                  caregiver.status === "confirmed" && "bg-green-50/50"
                )}
                onClick={() => {
                  setSelectedCaregiver(caregiver)
                  setShowCaregiverDetail(true)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={caregiver.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{caregiver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{caregiver.name}</span>
                        <Badge className="bg-rose-100 text-rose-700 text-[10px]">{caregiver.level}</Badge>
                        {caregiver.status === "confirmed" && (
                          <Badge className="bg-green-100 text-green-700 text-[10px]">
                            <CheckCircle className="w-3 h-3 mr-0.5" />
                            已确认
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {caregiver.age}岁 · 籍贯 {originToProvinceLabel(caregiver.hometown)}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-[11px] text-muted-foreground">薪资由顾问沟通</p>
                        <span className="flex items-center gap-1 text-xs text-amber-500">
                          <Star className="h-3 w-3 fill-amber-400" />
                          {caregiver.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {caregiver.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-[10px]">{skill}</Badge>
                    ))}
                  </div>
                  {caregiver.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          navigator.clipboard.writeText(caregiver.link || "")
                        }}
                      >
                        <Link2 className="w-3 h-3 mr-1" />
                        复制链接
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-rose-500 hover:bg-rose-600"
                        onClick={() => {
                          setInterviewLink(caregiver.link || "")
                          setShowTodoList(false)
                          setShowInterviewLink(true)
                        }}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        进入面试
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {caregiver.consultantName}推荐于 {caregiver.recommendedAt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Caregiver Detail Sheet */}
      <Sheet open={showCaregiverDetail} onOpenChange={setShowCaregiverDetail}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>阿姨详情</SheetTitle>
          </SheetHeader>
          {selectedCaregiver && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedCaregiver.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{selectedCaregiver.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{selectedCaregiver.name}</h3>
                    <Badge className="bg-rose-100 text-rose-700">{selectedCaregiver.level}</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-amber-400" />
                      {selectedCaregiver.rating}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">薪资由顾问沟通，不向雇主端展示</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">年龄</p>
                  <p className="font-medium">{selectedCaregiver.age}岁</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">籍贯（省）</p>
                  <p className="font-medium">{originToProvinceLabel(selectedCaregiver.hometown)}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold mb-2">专业技能</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaregiver.skills.map((skill, index) => (
                    <Badge key={index} className="bg-rose-100 text-rose-700">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Recommendation Info */}
              <Card className="border-0 shadow-sm bg-amber-50/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    推荐信息
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">推荐顾问：</span>{selectedCaregiver.consultantName}</p>
                    <p><span className="text-muted-foreground">推荐时间：</span>{selectedCaregiver.recommendedAt}</p>
                    {selectedCaregiver.confirmedAt && (
                      <p><span className="text-muted-foreground">确认时间：</span>{selectedCaregiver.confirmedAt}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {selectedCaregiver.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-transparent"
                    onClick={() => setShowCaregiverDetail(false)}
                  >
                    暂不考虑
                  </Button>
                  <Button 
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
                    onClick={() => {
                      setShowCaregiverDetail(false)
                      setShowConfirmDialog(true)
                    }}
                  >
                    确认选择
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>确认选择阿姨</DialogTitle>
            <DialogDescription>
              确认后，顾问将为您安排面试。面试链接将发送到您的待办事项中。
            </DialogDescription>
          </DialogHeader>
          {selectedCaregiver && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedCaregiver.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedCaregiver.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedCaregiver.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCaregiver.level}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              取消
            </Button>
            <Button 
              className="bg-rose-500 hover:bg-rose-600"
              onClick={() => {
                setShowConfirmDialog(false)
                // 确认后顾问会收到通知，然后生成面试链接
              }}
            >
              确认选择
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Todo List Sheet */}
      <Sheet open={showTodoList} onOpenChange={setShowTodoList}>
        <SheetContent side="right" className="w-[90vw] max-w-md">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              待办中心
              <Badge className="bg-destructive text-destructive-foreground text-[10px]">
                {todoItems.filter(t => t.status === "pending").length}
              </Badge>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {todoItems.map((item) => {
              const todoIconConfig: Record<string, { icon: typeof Video; bgColor: string; iconColor: string; borderColor: string }> = {
                contract: { icon: FileText, bgColor: "bg-blue-100", iconColor: "text-blue-500", borderColor: "border-l-blue-500" },
                interview: { icon: Video, bgColor: "bg-rose-100", iconColor: "text-rose-500", borderColor: "border-l-rose-500" },
                recommendation: { icon: Heart, bgColor: "bg-amber-100", iconColor: "text-amber-500", borderColor: "border-l-amber-500" },
                punch: { icon: MapPin, bgColor: "bg-teal-100", iconColor: "text-teal-500", borderColor: "border-l-teal-500" },
                sign_confirm: { icon: PenLine, bgColor: "bg-violet-100", iconColor: "text-violet-500", borderColor: "border-l-violet-500" },
                order_change: { icon: Bell, bgColor: "bg-orange-100", iconColor: "text-orange-500", borderColor: "border-l-orange-500" },
              }
              const cfg = todoIconConfig[item.type] || todoIconConfig.contract
              const TodoIcon = cfg.icon

              const sourceColors: Record<string, string> = {
                "员工端": "bg-blue-50 text-blue-600",
                "人才端": "bg-teal-50 text-teal-600",
                "产康技师端": "bg-violet-50 text-violet-600",
              }

              return (
                <Card 
                  key={item.id}
                  className={cn("border-0 shadow-sm border-l-4", cfg.borderColor)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", cfg.bgColor)}>
                        <TodoIcon className={cn("w-5 h-5", cfg.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                          {item.source && (
                            <Badge className={cn("text-[9px] px-1.5 py-0", sourceColors[item.source] || "bg-gray-50 text-gray-600")}>
                              {item.source}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </div>
                    </div>
                    {item.type === "interview" && item.link && (
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => {
                            navigator.clipboard.writeText(item.link!)
                          }}
                        >
                          <Link2 className="w-3 h-3 mr-1" />
                          复制链接
                        </Button>
                        <Button 
                          size="sm"
                          className="flex-1 bg-rose-500 hover:bg-rose-600"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          进入面试
                        </Button>
                      </div>
                    )}
                    {item.type === "recommendation" && (
                      <Button 
                        size="sm"
                        className="w-full mt-3 bg-primary hover:bg-primary/90"
                        onClick={() => {
                          setShowTodoList(false)
                          setShowRecommendations(true)
                        }}
                      >
                        查看推荐
                      </Button>
                    )}
                    {item.type === "contract" && (
                      <Button 
                        size="sm"
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setShowTodoList(false)
                          onNavigate?.("contracts")
                        }}
                      >
                        去签署
                      </Button>
                    )}
                    {item.type === "sign_confirm" && (
                      <Button 
                        size="sm"
                        className="w-full mt-3 bg-violet-600 hover:bg-violet-700"
                        onClick={() => {
                          setShowTodoList(false)
                          setShowSignature(true)
                        }}
                      >
                        去签字
                      </Button>
                    )}
                    {item.type === "order_change" && (
                      <Button 
                        size="sm"
                        variant="outline"
                        className="w-full mt-3"
                        onClick={() => {
                          setShowTodoList(false)
                          onNavigate?.("orders")
                        }}
                      >
                        查看订单
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Interview Link Dialog */}
      <Dialog open={showInterviewLink} onOpenChange={setShowInterviewLink}>
        <DialogContent className="max-w-sm mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-rose-500" />
              面试链接
            </DialogTitle>
            <DialogDescription>
              请在面试时间点击以下链接进入视频面试
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">2026-01-25 14:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">张阿姨 - 视频面试</span>
              </div>
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-primary break-all">{interviewLink}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent"
                onClick={() => {
                  navigator.clipboard.writeText(interviewLink)
                }}
              >
                复制链接
              </Button>
              <Button 
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => {
                  setShowInterviewLink(false)
                }}
              >
                <Play className="w-4 h-4 mr-1" />
                进入面试
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
