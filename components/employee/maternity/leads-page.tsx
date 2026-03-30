"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Phone,
  ChevronRight,
  User,
  Tag,
  Clock,
  MessageSquare,
  Mic,
  Baby,
  MapPin,
  Calendar,
  DollarSign,
  Share2,
  Video,
  Users,
  CheckCircle2,
  Star,
  X,
  RefreshCw,
  Link2,
  Play,
  Pause,
  FileText,
  Send,
  PhoneCall,
  VideoIcon,
  MicOff,
  VideoOff,
  PhoneOff,
  Upload,
  CheckCircle,
  AlertCircle,
  Bell,
  FileSignature,
} from "lucide-react"
import { ContractManagement } from "@/components/contract-management"

// 雇主线索数据
const employerLeads = [
  {
    id: 1,
    name: "王女士",
    phone: "138****1234",
    dueDate: "2026-03-15",
    address: "银川市金凤区",
    budget: "15000-18000",
    serviceType: "月嫂",
    requirements: ["住家", "有证件"],
    intention: "高意向",
    lastContact: "2026-01-21",
    note: "预产期3月中旬，需要金牌月嫂",
    followUps: [
      { 
        id: 1,
        date: "2026-01-21", 
        content: "已推荐3位阿姨，客户正在考虑", 
        type: "text",
        tags: ["已推荐"]
      },
      { 
        id: 2,
        date: "2026-01-19", 
        content: "初次电话沟通，了解需求", 
        type: "call",
        duration: "5:32",
        audioUrl: "/audio/call-1.mp3",
        transcript: "顾问：您好，我是优厚家政的母婴顾问小李，请问您是王女士吗？\n客户：是的，你好。\n顾问：了解到您有月嫂服务的需求，请问您的预产期是什么时候呢？\n客户：预产期是3月15号左右。\n顾问：好的，那请问您对月嫂有什么特别的要求吗？\n客户：希望是有经验的，最好会催乳，住家的那种。",
        summary: "客户预产期3月15日，需要住家月嫂，要求有经验且会催乳。意向较高。"
      },
    ],
    recommendedCaregivers: [
      { id: 1, status: "pending", confirmedAt: null },
      { id: 2, status: "confirmed", confirmedAt: "2026-01-22 10:30" },
    ],
    interviewLink: null,
  },
  {
    id: 2,
    name: "李先生",
    phone: "139****5678",
    dueDate: "2026-04-20",
    address: "银川市兴庆区",
    budget: "12000-15000",
    serviceType: "育儿嫂",
    requirements: ["白班", "有经验"],
    intention: "中意向",
    lastContact: "2026-01-20",
    note: "二胎家庭，需要有经验的育儿嫂",
    followUps: [],
    recommendedCaregivers: [],
    interviewLink: null,
  },
]

// 可推荐的阿姨
const availableCaregivers = [
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
    available: true,
    skills: ["新生儿护理", "月子餐", "催乳"],
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
    available: true,
    skills: ["新生儿护理", "产妇护理"],
  },
  {
    id: 3,
    name: "王阿姨",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    level: "钻石月嫂",
    age: 48,
    hometown: "江西南昌",
    experience: "10年",
    salary: "18800-22800元/26天",
    rating: 5.0,
    available: true,
    skills: ["新生儿护理", "月子餐", "催乳", "早教"],
  },
]

// 面试信息
const interviews = [
  {
    id: 1,
    employer: "王女士",
    employerId: 1,
    caregiver: "张阿姨",
    caregiverId: 2,
    date: "2026-01-25",
    time: "14:00",
    type: "视频面试",
    status: "upcoming",
    link: "https://interview.youhou.com/abc123",
  },
]

// 已完成的面试记录
const completedInterviews = [
  {
    id: 101,
    employer: "赵女士",
    caregiver: "李阿姨",
    date: "2026-01-20",
    time: "10:00",
    duration: "25:32",
    videoUrl: "/videos/interview-1.mp4",
    transcript: [
      { time: "00:00", speaker: "顾问", content: "好的，面试正式开始，我是母婴顾问小李，今天由我来主持这次面试。" },
      { time: "00:15", speaker: "雇主", content: "你好，我是赵女士。" },
      { time: "00:20", speaker: "阿姨", content: "您好，我是李阿姨，很高兴认识您。" },
      { time: "00:30", speaker: "雇主", content: "李阿姨，请问您做月嫂多少年了？" },
      { time: "00:38", speaker: "阿姨", content: "我从事月嫂工作已经8年了，服务过60多个家庭。" },
      { time: "01:05", speaker: "雇主", content: "那您对新生儿黄疸有什么护理经验吗？" },
      { time: "01:15", speaker: "阿姨", content: "新生儿黄疸分为生理性和病理性，生理性黄疸一般在出生后2-3天出现..." },
    ],
    summary: "本次面试顺利进行，雇主赵女士对李阿姨的专业能力和服务态度表示满意。李阿姨详细介绍了8年的月嫂经验，重点展示了新生儿护理、黄疸观察、母乳喂养指导等专业技能。双方就服务时间和费用达成初步意向。",
    result: "通过",
  },
]

export function MaternityLeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<(typeof employerLeads)[0] | null>(null)
  const [showAddLead, setShowAddLead] = useState(false)
  const [showRecommend, setShowRecommend] = useState(false)
  const [showInterview, setShowInterview] = useState(false)
  const [selectedCaregivers, setSelectedCaregivers] = useState<number[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)
  const [newFollowUp, setNewFollowUp] = useState({ content: "", tags: [] as string[] })
  const [showChangeCaregiver, setShowChangeCaregiver] = useState(false)
  const [caregiverToChange, setCaregiverToChange] = useState<number | null>(null)
  const [showGenerateLink, setShowGenerateLink] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")
  const [showInterviewRoom, setShowInterviewRoom] = useState(false)
  const [interviewState, setInterviewState] = useState<"waiting" | "ongoing" | "ended">("waiting")
  const [showInterviewRecord, setShowInterviewRecord] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState<(typeof completedInterviews)[0] | null>(null)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [showCallRecordDetail, setShowCallRecordDetail] = useState(false)
  const [selectedCallRecord, setSelectedCallRecord] = useState<any>(null)
  const [showContracts, setShowContracts] = useState(false)

  const getIntentionColor = (intention: string) => {
    switch (intention) {
      case "高意向":
        return "bg-teal-100 text-teal-700"
      case "中意向":
        return "bg-amber-100 text-amber-700"
      case "低意向":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const handleSelectCaregiver = (id: number) => {
    setSelectedCaregivers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleCall = () => {
    setIsCalling(true)
    setIsRecording(true)
    // 模拟通话计时
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    // 存储timer以便清除
    return () => clearInterval(timer)
  }

  const handleEndCall = () => {
    setIsCalling(false)
    setIsRecording(false)
    setCallDuration(0)
    // 这里会自动保存录音和转写
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleGenerateInterviewLink = () => {
    // 生成面试链接
    const link = `https://interview.youhou.com/${Math.random().toString(36).substring(7)}`
    setGeneratedLink(link)
    setShowGenerateLink(true)
  }

  const handleStartInterview = () => {
    setShowInterview(false)
    setShowInterviewRoom(true)
    setInterviewState("waiting")
  }

  const handleBeginInterview = () => {
    setInterviewState("ongoing")
    setIsRecording(true)
  }

  const handleEndInterview = () => {
    setInterviewState("ended")
    setIsRecording(false)
    // 模拟上传完成后跳转到回看
    setTimeout(() => {
      setShowInterviewRoom(false)
      setSelectedInterview(completedInterviews[0])
      setShowInterviewRecord(true)
    }, 2000)
  }

  const availableTags = ["已推荐", "已联系", "待跟进", "已签约", "已面试", "高意向", "考虑中"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">线索池</h1>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setShowContracts(true)}
            >
              <FileSignature className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setShowAddLead(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              新增线索
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-xl font-bold">{employerLeads.length}</p>
            <p className="text-xs text-white/70">全部线索</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{employerLeads.filter(l => l.intention === "高意向").length}</p>
            <p className="text-xs text-white/70">高意向</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{interviews.filter(i => i.status === "upcoming").length}</p>
            <p className="text-xs text-white/70">待面试</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-white/70">今日跟进</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索姓名或手机号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          {employerLeads.map((lead) => (
            <Card 
              key={lead.id} 
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedLead(lead)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{lead.name}</h3>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </div>
                  </div>
                  <Badge className={`text-[10px] ${getIntentionColor(lead.intention)}`}>
                    {lead.intention}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>预产期：{lead.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>预算：{lead.budget}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{lead.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Baby className="w-3 h-3" />
                    <span>{lead.serviceType}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {lead.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-[10px]">{req}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    最近跟进：{lead.lastContact}
                  </span>
                  <div className="flex items-center gap-2">
                    {lead.recommendedCaregivers.length > 0 && (
                      <Badge className="bg-rose-100 text-rose-700 text-[10px]">
                        已推荐{lead.recommendedCaregivers.length}人
                        {lead.recommendedCaregivers.some(c => c.status === "confirmed") && (
                          <CheckCircle className="w-3 h-3 ml-1 inline" />
                        )}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Interviews */}
        {interviews.filter(i => i.status === "upcoming").length > 0 && (
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">待面试</h2>
            {interviews.filter(i => i.status === "upcoming").map((interview) => (
              <Card key={interview.id} className="border-0 shadow-sm border-l-4 border-l-rose-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-rose-500" />
                      <span className="font-medium text-foreground">{interview.type}</span>
                    </div>
                    <Badge className="bg-rose-100 text-rose-700 text-[10px]">即将开始</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {interview.employer} - {interview.caregiver}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {interview.date} {interview.time}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => {
                          navigator.clipboard.writeText(interview.link)
                        }}
                      >
                        <Link2 className="w-3 h-3 mr-1" />
                        复制链接
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-rose-500 hover:bg-rose-600"
                        onClick={handleStartInterview}
                      >
                        开始面试
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </main>

      {/* Lead Detail Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>雇主详情</SheetTitle>
          </SheetHeader>
          {selectedLead && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              {/* Basic Info */}
              <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-xl">
                <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-rose-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{selectedLead.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLead.phone}</p>
                </div>
                {isCalling ? (
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-red-500">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">{formatDuration(callDuration)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">录音中</p>
                    </div>
                    <Button size="sm" variant="destructive" onClick={handleEndCall}>
                      <PhoneOff className="w-4 h-4 mr-1" />
                      挂断
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600" onClick={handleCall}>
                    <Phone className="w-4 h-4 mr-1" />
                    拨打
                  </Button>
                )}
              </div>

              {/* Employer Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">预产期</p>
                  <p className="font-medium text-foreground">{selectedLead.dueDate}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">预算</p>
                  <p className="font-medium text-foreground">{selectedLead.budget}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">服务类型</p>
                  <p className="font-medium text-foreground">{selectedLead.serviceType}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">服务地址</p>
                  <p className="font-medium text-foreground">{selectedLead.address}</p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">需求标签</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.requirements.map((req, index) => (
                    <Badge key={index} className="bg-rose-100 text-rose-700">{req}</Badge>
                  ))}
                </div>
              </div>

              {/* Recommended Caregivers */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">已推荐阿姨</h4>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setShowRecommend(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    推荐阿姨
                  </Button>
                </div>
                {selectedLead.recommendedCaregivers.length > 0 ? (
                  <div className="space-y-2">
                    {selectedLead.recommendedCaregivers.map((rec) => {
                      const caregiver = availableCaregivers.find(c => c.id === rec.id)
                      if (!caregiver) return null
                      return (
                        <Card key={rec.id} className="border-0 shadow-sm">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={caregiver.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{caregiver.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{caregiver.name}</p>
                                  {rec.status === "confirmed" ? (
                                    <Badge className="bg-green-100 text-green-700 text-[10px]">
                                      <CheckCircle className="w-3 h-3 mr-0.5" />
                                      雇主已确认
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                                      待确认
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{caregiver.level}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs bg-transparent h-7 px-2"
                                  onClick={() => {
                                    setCaregiverToChange(rec.id)
                                    setShowChangeCaregiver(true)
                                  }}
                                >
                                  <RefreshCw className="w-3 h-3 mr-1" />
                                  更换
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs bg-transparent h-7 px-2"
                                >
                                  <Share2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                    
                    {/* 生成面试链接按钮 - 仅当有已确认的阿姨时显示 */}
                    {selectedLead.recommendedCaregivers.some(c => c.status === "confirmed") && (
                      <Button 
                        className="w-full bg-rose-500 hover:bg-rose-600"
                        onClick={handleGenerateInterviewLink}
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        一键生成面试链接
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">暂未推荐阿姨</p>
                )}
              </div>

              {/* Follow Up Records */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">跟进记录</h4>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setShowAddFollowUp(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加记录
                  </Button>
                </div>
                <div className="space-y-2">
                  {selectedLead.followUps.map((followUp: any) => (
                    <Card 
                      key={followUp.id} 
                      className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        if (followUp.type === "call") {
                          setSelectedCallRecord(followUp)
                          setShowCallRecordDetail(true)
                        }
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          {followUp.type === "call" ? (
                            <PhoneCall className="w-4 h-4 text-green-500 mt-0.5" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-rose-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{followUp.content}</p>
                            {followUp.type === "call" && (
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-[10px]">
                                  <Mic className="w-3 h-3 mr-1" />
                                  通话录音 {followUp.duration}
                                </Badge>
                                <Badge variant="outline" className="text-[10px]">
                                  <FileText className="w-3 h-3 mr-1" />
                                  已转写
                                </Badge>
                              </div>
                            )}
                            {followUp.tags && followUp.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {followUp.tags.map((tag: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="text-[10px]">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">{followUp.date}</p>
                          </div>
                          {followUp.type === "call" && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Recommend Caregiver Sheet */}
      <Sheet open={showRecommend} onOpenChange={setShowRecommend}>
        <SheetContent side="right" className="w-[90vw] max-w-md">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>推荐阿姨</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {availableCaregivers.map((caregiver) => (
              <Card 
                key={caregiver.id} 
                className={`border-0 shadow-sm cursor-pointer transition-all ${
                  selectedCaregivers.includes(caregiver.id) ? "ring-2 ring-rose-500" : ""
                } ${!caregiver.available ? "opacity-50" : ""}`}
                onClick={() => caregiver.available && handleSelectCaregiver(caregiver.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={caregiver.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{caregiver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{caregiver.name}</h3>
                        <Badge className="bg-rose-100 text-rose-700 text-[10px]">{caregiver.level}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {caregiver.age}岁 · {caregiver.hometown} · {caregiver.experience}经验
                      </p>
                    </div>
                    <Checkbox 
                      checked={selectedCaregivers.includes(caregiver.id)}
                      disabled={!caregiver.available}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-rose-600">{caregiver.salary}</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {caregiver.rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {caregiver.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-[10px]">{skill}</Badge>
                    ))}
                  </div>
                  {!caregiver.available && (
                    <Badge className="mt-2 bg-gray-100 text-gray-600">档期已满</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="pt-4 border-t border-border">
            <Button 
              className="w-full bg-rose-500 hover:bg-rose-600"
              disabled={selectedCaregivers.length === 0}
              onClick={() => {
                setShowRecommend(false)
                setSelectedCaregivers([])
              }}
            >
              确认推荐 ({selectedCaregivers.length})
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Change Caregiver Sheet */}
      <Sheet open={showChangeCaregiver} onOpenChange={setShowChangeCaregiver}>
        <SheetContent side="right" className="w-[90vw] max-w-md">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>更换阿姨</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            <p className="text-sm text-muted-foreground mb-4">
              选择新的阿姨替换当前推荐的阿姨，更换后将通知雇主重新确认。
            </p>
            {availableCaregivers.filter(c => c.id !== caregiverToChange).map((caregiver) => (
              <Card 
                key={caregiver.id} 
                className={`border-0 shadow-sm cursor-pointer transition-all hover:ring-2 hover:ring-rose-500 ${
                  !caregiver.available ? "opacity-50" : ""
                }`}
                onClick={() => {
                  if (caregiver.available) {
                    setShowChangeCaregiver(false)
                    setCaregiverToChange(null)
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={caregiver.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{caregiver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{caregiver.name}</h3>
                        <Badge className="bg-rose-100 text-rose-700 text-[10px]">{caregiver.level}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {caregiver.age}岁 · {caregiver.hometown} · {caregiver.experience}经验
                      </p>
                      <p className="text-sm font-bold text-rose-600 mt-1">{caregiver.salary}</p>
                    </div>
                    {caregiver.available ? (
                      <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                        选择
                      </Button>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-600">档期已满</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Follow Up Dialog */}
      <Dialog open={showAddFollowUp} onOpenChange={setShowAddFollowUp}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>添加跟进记录</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>跟进内容</Label>
              <Textarea 
                placeholder="请输入跟进内容"
                value={newFollowUp.content}
                onChange={(e) => setNewFollowUp({...newFollowUp, content: e.target.value})}
                rows={4}
              />
            </div>
            <div>
              <Label>标签</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant={newFollowUp.tags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${newFollowUp.tags.includes(tag) ? "bg-rose-500" : ""}`}
                    onClick={() => {
                      setNewFollowUp(prev => ({
                        ...prev,
                        tags: prev.tags.includes(tag) 
                          ? prev.tags.filter(t => t !== tag)
                          : [...prev.tags, tag]
                      }))
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFollowUp(false)}>
              取消
            </Button>
            <Button 
              className="bg-rose-500 hover:bg-rose-600"
              onClick={() => {
                setShowAddFollowUp(false)
                setNewFollowUp({ content: "", tags: [] })
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Interview Link Dialog */}
      <Dialog open={showGenerateLink} onOpenChange={setShowGenerateLink}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              面试链接已生成
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-mono break-all">{generatedLink}</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                链接已发送至雇主待办事项
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                链接已发送至您的待办事项
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                链接已发送至阿姨待办事项
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(generatedLink)
              }}
            >
              复制链接
            </Button>
            <Button 
              className="bg-rose-500 hover:bg-rose-600"
              onClick={() => setShowGenerateLink(false)}
            >
              完成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Interview Room */}
      <Dialog open={showInterviewRoom} onOpenChange={setShowInterviewRoom}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="bg-gray-900 text-white">
            {/* Video Area */}
            <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
              {interviewState === "waiting" ? (
                <div className="text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">等待参与者加入</p>
                  <p className="text-sm text-gray-400 mt-2">王女士、张阿姨</p>
                </div>
              ) : interviewState === "ongoing" ? (
                <>
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 bg-gray-700 flex items-center justify-center border-r border-gray-600">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <User className="w-8 h-8" />
                        </div>
                        <p className="text-sm">王女士</p>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <User className="w-8 h-8" />
                        </div>
                        <p className="text-sm">张阿姨</p>
                      </div>
                    </div>
                  </div>
                  {/* Recording Indicator */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500/90 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-medium">录制中</span>
                  </div>
                  {/* Self View */}
                  <div className="absolute bottom-3 right-3 w-24 h-18 bg-gray-600 rounded-lg flex items-center justify-center">
                    <p className="text-xs">顾问</p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="w-16 h-16 mx-auto mb-4 animate-pulse text-rose-400" />
                  <p className="text-lg font-medium">面试已结束</p>
                  <p className="text-sm text-gray-400 mt-2">正在上传录像并生成转写...</p>
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="p-4 bg-gray-800">
              <div className="flex items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className={`rounded-full w-12 h-12 ${isAudioMuted ? "bg-red-500/20 text-red-400" : "bg-white/10"}`}
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                >
                  {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                {interviewState === "waiting" ? (
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 bg-green-500 hover:bg-green-600"
                    onClick={handleBeginInterview}
                  >
                    开始面试
                  </Button>
                ) : interviewState === "ongoing" ? (
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 bg-red-500 hover:bg-red-600"
                    onClick={handleEndInterview}
                  >
                    <PhoneOff className="w-5 h-5 mr-2" />
                    结束面试
                  </Button>
                ) : null}
                
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className={`rounded-full w-12 h-12 ${isVideoMuted ? "bg-red-500/20 text-red-400" : "bg-white/10"}`}
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                >
                  {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
                </Button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">面试全程录音录像，结束后自动生成文字摘要</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Interview Record View */}
      <Sheet open={showInterviewRecord} onOpenChange={setShowInterviewRecord}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>面试回放</SheetTitle>
          </SheetHeader>
          {selectedInterview && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              {/* Video Player */}
              <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-2 opacity-70" />
                  <p className="text-sm">点击播放面试录像</p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/30 rounded-full">
                    <div className="w-1/3 h-full bg-rose-500 rounded-full" />
                  </div>
                  <span className="text-xs text-white/70">{selectedInterview.duration}</span>
                </div>
              </div>

              {/* Interview Info */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-medium">{selectedInterview.employer} - {selectedInterview.caregiver}</p>
                  <p className="text-xs text-muted-foreground">{selectedInterview.date} {selectedInterview.time}</p>
                </div>
                <Badge className={selectedInterview.result === "通过" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  {selectedInterview.result}
                </Badge>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-500" />
                  AI摘要
                </h4>
                <Card className="border-0 shadow-sm bg-rose-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground leading-relaxed">{selectedInterview.summary}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Transcript */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-500" />
                  面试对话记录
                </h4>
                <div className="space-y-3">
                  {selectedInterview.transcript.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="text-xs text-muted-foreground w-12 shrink-0 pt-0.5">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant="secondary" 
                            className={`text-[10px] ${
                              item.speaker === "顾问" 
                                ? "bg-rose-100 text-rose-700"
                                : item.speaker === "雇主"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.speaker}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Call Record Detail Sheet */}
      <Sheet open={showCallRecordDetail} onOpenChange={setShowCallRecordDetail}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>通话记录详情</SheetTitle>
          </SheetHeader>
          {selectedCallRecord && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              {/* Audio Player */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Button size="icon" className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600">
                      <Play className="w-5 h-5" />
                    </Button>
                    <div className="flex-1">
                      <div className="h-2 bg-green-200 rounded-full">
                        <div className="w-0 h-full bg-green-500 rounded-full" />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">00:00</span>
                        <span className="text-xs text-muted-foreground">{selectedCallRecord.duration}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{selectedCallRecord.date} 通话录音</p>
                </CardContent>
              </Card>

              {/* Summary */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-500" />
                  AI摘要
                </h4>
                <Card className="border-0 shadow-sm bg-green-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground leading-relaxed">{selectedCallRecord.summary}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Transcript */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                  通话转写
                </h4>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedCallRecord.transcript}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Lead Sheet */}
      <Sheet open={showAddLead} onOpenChange={setShowAddLead}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>新增雇主线索</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            <div>
              <Label>雇主姓名</Label>
              <Input placeholder="请输入姓名" />
            </div>
            <div>
              <Label>联系电话</Label>
              <Input placeholder="请输入手机号" />
            </div>
            <div>
              <Label>预产期</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>服务地址</Label>
              <Input placeholder="请输入地址" />
            </div>
            <div>
              <Label>预算范围</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择预算" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8000-12000">8000-12000元</SelectItem>
                  <SelectItem value="12000-15000">12000-15000元</SelectItem>
                  <SelectItem value="15000-18000">15000-18000元</SelectItem>
                  <SelectItem value="18000+">18000元以上</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>服务类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="月嫂">月嫂</SelectItem>
                  <SelectItem value="育儿嫂">育儿嫂</SelectItem>
                  <SelectItem value="住家保姆">住家保姆</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>备注</Label>
              <Textarea placeholder="请输入备注信息" rows={3} />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => setShowAddLead(false)}>
              保存线索
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Contracts Sheet */}
      <Sheet open={showContracts} onOpenChange={setShowContracts}>
        <SheetContent side="right" className="flex flex-col min-h-0 overflow-hidden">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <FileSignature className="w-5 h-5 text-rose-500" />
              合同管理
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 overflow-y-auto py-4">
            <ContractManagement role="consultant" showHeader={false} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
