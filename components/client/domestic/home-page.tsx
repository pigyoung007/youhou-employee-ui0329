"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Bell,
  ChevronRight,
  Shield,
  Award,
  Star,
  Share2,
  Lock,
  Eye,
  Calendar,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  Heart,
  X,
  Download,
  QrCode,
  Clock,
  FileText,
  CheckCircle,
  Video,
  Link2,
  Play,
  User,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// 个人简历数据
const profileData = {
  name: "李阿姨",
  avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
  age: 45,
  hometown: "湖南长沙",
  currentCity: "银川金凤",
  education: "高中",
  phone: "138****8888",
  level: "金牌月嫂",
  salary: "15800-18800元/26天",
  experience: "8年",
  joinDate: "2018-03-15",
  certificates: ["母婴护理师证", "催乳师证", "营养师证"],
  skills: ["新生儿护理", "月子餐制作", "产妇护理", "催乳通乳"],
  workHistory: [
    { period: "2024.06-2024.08", employer: "王女士家", service: "月嫂服务", rating: 5 },
    { period: "2024.03-2024.05", employer: "李先生家", service: "月嫂服务", rating: 5 },
    { period: "2023.11-2024.02", employer: "张女士家", service: "月嫂服务", rating: 4.8 },
  ],
}

// 简历分享设置
const shareSettings = {
  views: 156,
  maxViews: 200,
  validUntil: "2026-03-15",
}

// 资质认证
const certifications = [
  { name: "人社部认证", icon: Shield, verified: true },
  { name: "行业协会会员", icon: Award, verified: true },
  { name: "ISO认证", icon: Star, verified: true },
]

// 感谢信
const thankYouLetters = [
  {
    id: 1,
    from: "王女士",
    date: "2024-08-20",
    content: "李阿姨非常专业，对宝宝照顾得无微不至，月子餐也做得很好吃...",
    rating: 5,
  },
  {
    id: 2,
    from: "李先生",
    date: "2024-05-15",
    content: "感谢李阿姨两个月的辛苦付出，宝宝被照顾得很好，太太恢复也很快...",
    rating: 5,
  },
]

// 待办事项（面试等）
const todoItems = [
  {
    id: 1,
    type: "interview",
    title: "视频面试 - 王女士",
    description: "雇主王女士已确认与您的面试",
    date: "2026-01-25 14:00",
    link: "https://interview.youhou.com/abc123",
    status: "pending",
    employer: {
      name: "王女士",
      address: "银川市金凤区",
      serviceType: "月嫂服务",
    },
  },
]

export function DomesticHomePage() {
  const [showProfile, setShowProfile] = useState(false)
  const [showShareSettings, setShowShareSettings] = useState(false)
  const [showPoster, setShowPoster] = useState(false)
  const [showTodoList, setShowTodoList] = useState(false)
  const [showInterviewDetail, setShowInterviewDetail] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<(typeof todoItems)[0] | null>(null)
  const [shareConfig, setShareConfig] = useState({
    showPhoto: true,
    showSalary: true,
    showPhone: false,
    showWorkHistory: true,
    maxViews: 200,
    validDays: 90,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">家政首页</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 relative"
            onClick={() => setShowTodoList(true)}
          >
            <Bell className="w-5 h-5" />
            {todoItems.filter(t => t.status === "pending").length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                {todoItems.filter(t => t.status === "pending").length}
              </span>
            )}
          </Button>
        </div>

        {/* Brand Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-sm text-white/80 mb-3">品牌实力</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <p className="text-lg font-bold">10000+</p>
              <p className="text-xs text-white/70">服务家庭</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">500+</p>
              <p className="text-xs text-white/70">专业阿姨</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">8年</p>
              <p className="text-xs text-white/70">服务年限</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">99%</p>
              <p className="text-xs text-white/70">好评率</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Interview Todo Card */}
        {todoItems.filter(t => t.status === "pending" && t.type === "interview").length > 0 && (
          <Card className="border-0 shadow-sm border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-rose-500" />
                <span className="font-semibold text-foreground">待办面试</span>
                <Badge className="bg-rose-100 text-rose-700 text-[10px]">
                  {todoItems.filter(t => t.status === "pending" && t.type === "interview").length}场
                </Badge>
              </div>
              {todoItems.filter(t => t.status === "pending" && t.type === "interview").slice(0, 1).map((todo) => (
                <div key={todo.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{todo.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{todo.date}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-rose-500 hover:bg-rose-600"
                      onClick={() => {
                        setSelectedTodo(todo)
                        setShowInterviewDetail(true)
                      }}
                    >
                      查看详情
                    </Button>
                  </div>
                  {todo.employer && (
                    <div className="bg-white/60 rounded-lg p-2 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">雇主：{todo.employer.name}</span>
                        <span className="text-muted-foreground">{todo.employer.serviceType}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Personal Profile Card */}
        <Card 
          className="border-0 shadow-md overflow-hidden cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16 border-2 border-amber-200">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-amber-100 text-amber-600">{profileData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{profileData.name}</h3>
                    <Badge className="bg-amber-500 text-white text-[10px]">{profileData.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{profileData.salary}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{profileData.age}岁</span>
                    <span>{profileData.hometown}</span>
                    <span>{profileData.experience}经验</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  {profileData.certificates.length}项证书
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  5.0评分
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-7 bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowShareSettings(true)
                }}
              >
                <Share2 className="w-3.5 h-3.5 mr-1" />
                分享简历
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">资质认证</h2>
          <div className="grid grid-cols-3 gap-3">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-xs font-medium text-foreground">{cert.name}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Service Items - Locked */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">服务项目</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "找月嫂", open: true },
              { name: "产后修复", open: false },
              { name: "育婴师", open: false },
              { name: "在线课程", open: false },
            ].map((item, index) => (
              <Card key={index} className={`border-0 shadow-sm ${!item.open && "opacity-60"}`}>
                <CardContent className="p-3 text-center relative">
                  <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{item.name}</p>
                  {!item.open && (
                    <div className="absolute inset-0 bg-white/60 rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Thank You Letters */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">荣誉专区 · 感谢信</h2>
          <div className="space-y-3">
            {thankYouLetters.map((letter) => (
              <Card key={letter.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{letter.from}</span>
                    <div className="flex items-center gap-1">
                      {Array(letter.rating).fill(0).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{letter.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{letter.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Profile Detail Sheet */}
      <Sheet open={showProfile} onOpenChange={setShowProfile}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>我的档案</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            {/* Avatar & Basic Info */}
            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto border-2 border-amber-200">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback>{profileData.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg text-foreground mt-3">{profileData.name}</h3>
              <Badge className="bg-amber-500 text-white mt-1">{profileData.level}</Badge>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">年龄</p>
                <p className="font-medium text-foreground">{profileData.age}岁</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">籍贯</p>
                <p className="font-medium text-foreground">{profileData.hometown}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">现居</p>
                <p className="font-medium text-foreground">{profileData.currentCity}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">学历</p>
                <p className="font-medium text-foreground">{profileData.education}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">入职时间</p>
                <p className="font-medium text-foreground">{profileData.joinDate}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">从业经验</p>
                <p className="font-medium text-foreground">{profileData.experience}</p>
              </div>
            </div>

            {/* Salary */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">当前等级薪资</p>
                <p className="text-lg font-bold text-amber-600">{profileData.salary}</p>
              </CardContent>
            </Card>

            {/* Certificates */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">资质证书</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.certificates.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">技能特长</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Work History */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">工作经历</h4>
              <div className="space-y-2">
                {profileData.workHistory.map((work, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-foreground">{work.employer}</p>
                          <p className="text-xs text-muted-foreground">{work.period} · {work.service}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">{work.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Share Settings Sheet */}
      <Sheet open={showShareSettings} onOpenChange={setShowShareSettings}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>简历分享设置</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            {/* Current Stats */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">已被查看次数</span>
                <span className="font-bold text-amber-600">{shareSettings.views}/{shareConfig.maxViews}</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{ width: `${(shareSettings.views / shareConfig.maxViews) * 100}%` }}
                />
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">隐私设置</h4>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">显示照片</p>
                    <p className="text-xs text-muted-foreground">在简历中展示头像照片</p>
                  </div>
                </div>
                <Switch 
                  checked={shareConfig.showPhoto}
                  onCheckedChange={(checked) => setShareConfig({...shareConfig, showPhoto: checked})}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">显示薪资</p>
                    <p className="text-xs text-muted-foreground">在简历中展示期望薪资</p>
                  </div>
                </div>
                <Switch 
                  checked={shareConfig.showSalary}
                  onCheckedChange={(checked) => setShareConfig({...shareConfig, showSalary: checked})}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">显示电话</p>
                    <p className="text-xs text-muted-foreground">在简历中展示联系电话</p>
                  </div>
                </div>
                <Switch 
                  checked={shareConfig.showPhone}
                  onCheckedChange={(checked) => setShareConfig({...shareConfig, showPhone: checked})}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">显示工作经历</p>
                    <p className="text-xs text-muted-foreground">在简历中展示服务历史</p>
                  </div>
                </div>
                <Switch 
                  checked={shareConfig.showWorkHistory}
                  onCheckedChange={(checked) => setShareConfig({...shareConfig, showWorkHistory: checked})}
                />
              </div>
            </div>

            {/* Limit Settings */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">分享限制</h4>
              
              <div className="p-3 bg-muted/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">最大查看次数</Label>
                  <span className="text-sm font-medium text-amber-600">{shareConfig.maxViews}次</span>
                </div>
                <Slider
                  value={[shareConfig.maxViews]}
                  onValueChange={([value]) => setShareConfig({...shareConfig, maxViews: value})}
                  min={50}
                  max={500}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">有效期</Label>
                  <span className="text-sm font-medium text-amber-600">{shareConfig.validDays}天</span>
                </div>
                <Slider
                  value={[shareConfig.validDays]}
                  onValueChange={([value]) => setShareConfig({...shareConfig, validDays: value})}
                  min={7}
                  max={180}
                  step={7}
                  className="w-full"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600"
              onClick={() => {
                setShowShareSettings(false)
                setShowPoster(true)
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              生成简历海报
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {showPoster && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 pb-[calc(5rem+env(safe-area-inset-bottom))] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="简历海报"
        >
          <div className="relative w-full max-w-sm my-auto">
            <button 
              onClick={() => setShowPoster(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 flex items-center gap-4">
                  {shareConfig.showPhoto ? (
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-3 border-white/30 shadow-lg">
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-amber-100 text-amber-600 text-xl">{profileData.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-3 border-white/30">
                      <span className="text-2xl font-bold">{profileData.name[0]}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold">{profileData.name}</h2>
                      <Badge className="bg-white/20 text-white text-[10px] border-0">{profileData.level}</Badge>
                    </div>
                    {shareConfig.showSalary && (
                      <p className="text-white/90 text-sm font-medium">{profileData.salary}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-white/80 text-xs">
                      <span>{profileData.age}岁</span>
                      <span className="w-1 h-1 bg-white/50 rounded-full" />
                      <span>{profileData.hometown}</span>
                      <span className="w-1 h-1 bg-white/50 rounded-full" />
                      <span>{profileData.experience}经验</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-amber-50 rounded-lg p-2.5 text-center">
                    <GraduationCap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">学历</p>
                    <p className="text-xs font-semibold text-foreground">{profileData.education}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2.5 text-center">
                    <MapPin className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">现居</p>
                    <p className="text-xs font-semibold text-foreground">{profileData.currentCity}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2.5 text-center">
                    <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">入职</p>
                    <p className="text-xs font-semibold text-foreground">{profileData.joinDate.slice(0, 7)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    资质证书
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {profileData.certificates.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700 text-[10px] font-normal">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    技能特长
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-[10px] font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {shareConfig.showWorkHistory && (
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                      服务经历
                    </h4>
                    <div className="space-y-1.5">
                      {profileData.workHistory.slice(0, 2).map((work, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                          <div>
                            <p className="text-xs font-medium text-foreground">{work.employer}</p>
                            <p className="text-[10px] text-muted-foreground">{work.period}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium">{work.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shareConfig.showPhone && (
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2.5">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 text-white">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">优厚家庭服务</h3>
                        <p className="text-[10px] text-white/60">专业母婴护理 · 值得信赖</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-[10px] text-white/80">
                      <p className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        人社部认证 · 行业协会会员 · ISO认证
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        服务热线：400-888-8888
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        银川市金凤区瑞银财富中心C座7楼
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-lg p-1 mb-1">
                      <Image
                        src="/youhou-service-qrcode.jpg"
                        alt="客服二维码"
                        width={56}
                        height={56}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <p className="text-[9px] text-white/60">扫码联系客服</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => setShowPoster(false)}
              >
                返回修改
              </Button>
              <Button className="flex-1 bg-amber-500 hover:bg-amber-600">
                <Download className="w-4 h-4 mr-2" />
                保存海报
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Todo List Sheet */}
      <Sheet open={showTodoList} onOpenChange={setShowTodoList}>
        <SheetContent side="right" className="w-[90vw] max-w-md">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              待办事项
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {todoItems.map((item) => (
              <Card 
                key={item.id}
                className="border-0 shadow-sm border-l-4 border-l-rose-500"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                  </div>
                  {item.type === "interview" && (
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          if (item.link) {
                            navigator.clipboard.writeText(item.link)
                          }
                        }}
                      >
                        <Link2 className="w-3 h-3 mr-1" />
                        复制链接
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-rose-500 hover:bg-rose-600"
                        onClick={() => {
                          setSelectedTodo(item)
                          setShowTodoList(false)
                          setShowInterviewDetail(true)
                        }}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        查看详情
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {todoItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>暂无待办事项</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Interview Detail Sheet */}
      <Sheet open={showInterviewDetail} onOpenChange={setShowInterviewDetail}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-rose-500" />
              面试详情
            </SheetTitle>
          </SheetHeader>
          {selectedTodo && selectedTodo.type === "interview" && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              {/* Interview Time */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-rose-50 to-pink-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">面试时间</p>
                      <p className="font-bold text-lg text-foreground">{selectedTodo.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employer Info */}
              {selectedTodo.employer && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">雇主信息</h4>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{selectedTodo.employer.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedTodo.employer.serviceType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedTodo.employer.address}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Interview Link */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">面试链接</h4>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="bg-muted rounded-lg p-3 mb-3">
                      <p className="text-sm font-mono break-all text-muted-foreground">{selectedTodo.link}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          if (selectedTodo.link) {
                            navigator.clipboard.writeText(selectedTodo.link)
                          }
                        }}
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        复制链接
                      </Button>
                      <Button className="flex-1 bg-rose-500 hover:bg-rose-600">
                        <Video className="w-4 h-4 mr-2" />
                        进入面试
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tips */}
              <Card className="border-0 shadow-sm bg-amber-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    面试小贴士
                  </h4>
                  <ul className="text-sm text-amber-600 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>请提前5分钟进入面试房间，检查网络和设备</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>保持良好的仪容仪表，选择安静的环境</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>准备好相关证书原件，以便展示</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
