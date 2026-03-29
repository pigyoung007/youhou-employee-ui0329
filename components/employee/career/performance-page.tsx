"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Share2,
  Download,
  ChevronRight,
  Award,
  Target,
  Star,
  X,
  Phone,
  MapPin,
  Heart,
  Clock,
  CheckCircle2,
  BookOpen,
  Calendar,
  Sparkles,
  Gift,
  Shield,
  ArrowLeft,
  FileSignature,
} from "lucide-react"
import { ContractManagement } from "@/components/contract-management"
import Image from "next/image"

// 业绩数据
const performanceData = {
  totalStudents: 15,
  employedStudents: 8,
  totalIncome: 850000,
  thisMonthCommission: 12800,
  targetCompletion: 85,
}

// 学员列表
const studentList = [
  { name: "李阿姨", status: "已就业", income: 126400, orders: 8 },
  { name: "张小红", status: "在学", income: 0, orders: 0 },
  { name: "王大姐", status: "已结业", income: 0, orders: 0 },
  { name: "陈姐", status: "已就业", income: 95800, orders: 6 },
  { name: "刘阿姨", status: "已就业", income: 78600, orders: 5 },
]

// 推广海报模板
const posterTemplates = [
  { id: 1, name: "月嫂培训招生", type: "课程推广" },
  { id: 2, name: "育婴师认证班", type: "课程推广" },
  { id: 3, name: "双十二优惠", type: "活动推广" },
  { id: 4, name: "新年特惠", type: "活动推广" },
]

// 培训项目数据
const trainingProjects = [
  {
    id: 1,
    name: "高级月嫂培训班",
    price: 3980,
    originalPrice: 5980,
    duration: "15天",
    students: 328,
    rating: 4.9,
    features: ["理论+实操", "包考证", "推荐就业", "终身复训"],
    courses: ["产妇护理", "新生儿护理", "月子餐制作", "产后康复", "母乳喂养指导", "常见疾病预防"],
    nextClass: "2026年2月15日",
    schedule: "周一至周五 9:00-17:00",
  },
  {
    id: 2,
    name: "育婴师认证班",
    price: 2980,
    originalPrice: 4580,
    duration: "12天",
    students: 256,
    rating: 4.8,
    features: ["国家认证", "实操为主", "推荐就业", "小班教学"],
    courses: ["婴幼儿喂养", "早期教育", "日常护理", "���食添加", "生长发育", "疾病预防"],
    nextClass: "2026年2月20日",
    schedule: "周一至周五 9:00-17:00",
  },
  {
    id: 3,
    name: "产后康复师培训",
    price: 4580,
    originalPrice: 6880,
    duration: "20天",
    students: 189,
    rating: 4.9,
    features: ["专业技能", "高薪就业", "包考证", "实操教学"],
    courses: ["产后评估", "骨盆修复", "腹直肌修复", "盆底康复", "体态调整", "营养指导"],
    nextClass: "2026年3月1日",
    schedule: "周一至周五 9:00-17:00",
  },
]

export function CareerPerformancePage() {
  const [showPromotion, setShowPromotion] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof posterTemplates)[0] | null>(null)
  const [selectedProject, setSelectedProject] = useState<(typeof trainingProjects)[0] | null>(null)
  const [showPoster, setShowPoster] = useState(false)
  const [showContracts, setShowContracts] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">业绩看板</h1>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setShowContracts(true)}
          >
            <FileSignature className="w-4 h-4 mr-1" />
            合同
          </Button>
        </div>
        
        {/* Main Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-white/80">本月提成</p>
              <p className="text-3xl font-bold">¥{performanceData.thisMonthCommission.toLocaleString()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white">
              目标完成 {performanceData.targetCompletion}%
            </Badge>
            <span className="text-xs text-white/70">距月底还有10天</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{performanceData.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">我的学��</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{performanceData.employedStudents}</p>
                  <p className="text-xs text-muted-foreground">已就业学员</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground">¥{(performanceData.totalIncome / 10000).toFixed(1)}万</p>
                  <p className="text-xs text-muted-foreground">学员累计收入</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Target */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">本月目标</h3>
              <Badge className="bg-violet-100 text-violet-700">进行中</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">招生目标</span>
                  <span className="text-sm font-medium">3/5人</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">就业目标</span>
                  <span className="text-sm font-medium">2/3人</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: "67%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">提成目标</span>
                  <span className="text-sm font-medium">¥12,800/¥15,000</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Ranking */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">学员贡献排行</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
              查看全部
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {studentList.slice(0, 5).map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border-b border-border/50 last:border-b-0"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? "bg-amber-100 text-amber-600" :
                    index === 1 ? "bg-gray-100 text-gray-600" :
                    index === 2 ? "bg-orange-100 text-orange-600" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.status} · {student.orders}单</p>
                  </div>
                  <span className="font-bold text-sm text-foreground">
                    {student.income > 0 ? `¥${(student.income / 10000).toFixed(1)}万` : "-"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Promotion Tools */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">推广工具</h2>
          </div>
          <Card 
            className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50 cursor-pointer"
            onClick={() => setShowPromotion(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-violet-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">生成推广海报</h3>
                  <p className="text-xs text-muted-foreground">一键生成专属招生海报</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Achievement */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">我的成就</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <Award className="w-8 h-8 mx-auto text-amber-500 mb-1" />
                <p className="text-xs font-medium text-foreground">金牌顾问</p>
                <p className="text-[10px] text-muted-foreground">2025年度</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <Target className="w-8 h-8 mx-auto text-teal-500 mb-1" />
                <p className="text-xs font-medium text-foreground">目标达成</p>
                <p className="text-[10px] text-muted-foreground">连续3月</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <Star className="w-8 h-8 mx-auto text-violet-500 mb-1" />
                <p className="text-xs font-medium text-foreground">口碑之星</p>
                <p className="text-[10px] text-muted-foreground">好评率98%</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Promotion Sheet - Step 1: Select Template */}
      <Sheet open={showPromotion && !selectedTemplate} onOpenChange={setShowPromotion}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>选择海报模板</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-3 overflow-y-auto h-[calc(60vh-100px)]">
            {posterTemplates.filter(t => t.type === "课程推广").map((template) => (
              <Card 
                key={template.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-violet-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{template.name}</h3>
                      <Badge variant="outline" className="text-[10px] mt-1">{template.type}</Badge>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Promotion Sheet - Step 2: Select Project */}
      <Sheet open={!!selectedTemplate && !selectedProject} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8"
                onClick={() => setSelectedTemplate(null)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <SheetTitle>选择培训项目</SheetTitle>
            </div>
          </SheetHeader>
          <div className="py-4 space-y-3 overflow-y-auto h-[calc(70vh-100px)]">
            {trainingProjects.map((project) => (
              <Card 
                key={project.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{project.name}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-bold text-rose-600">¥{project.price}</span>
                        <span className="text-xs text-muted-foreground line-through">¥{project.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{project.duration}</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span>{project.students}人已报名</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {project.rating}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-violet-500 hover:bg-violet-600 text-xs shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProject(project)
                        setShowPoster(true)
                      }}
                    >
                      生成
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Course Poster Modal */}
      {showPoster && selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 overflow-y-auto">
          <div className="relative w-full max-w-xs">
            {/* Close Button */}
            <button 
              onClick={() => {
                setShowPoster(false)
                setSelectedProject(null)
                setSelectedTemplate(null)
                setShowPromotion(false)
              }}
              className="absolute -top-8 right-0 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Content */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl text-sm">
              {/* Poster Header */}
              <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-violet-600 p-3 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-4 h-4 text-white/40" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Badge className="bg-white/20 text-white text-[9px] border-0 px-1.5 py-0.5">
                      <Gift className="w-2.5 h-2.5 mr-0.5" />
                      限时优惠
                    </Badge>
                    <Badge className="bg-amber-400 text-amber-900 text-[9px] border-0 px-1.5 py-0.5">
                      热门
                    </Badge>
                  </div>
                  <h2 className="text-base font-bold mb-1">{selectedProject.name}</h2>
                  <p className="text-white/80 text-[10px]">专业培训 · 考证无忧 · 推荐就业</p>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 px-3 py-2 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] text-muted-foreground">特惠</span>
                  <span className="text-xl font-bold text-rose-600">¥{selectedProject.price}</span>
                  <span className="text-xs text-muted-foreground line-through">¥{selectedProject.originalPrice}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {selectedProject.duration}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Users className="w-3 h-3" />
                    {selectedProject.students}人报名
                  </span>
                </div>
              </div>

              {/* Poster Body */}
              <div className="p-3 space-y-2.5">
                {/* Course Features */}
                <div>
                  <h4 className="text-[11px] font-semibold text-foreground mb-1.5 flex items-center gap-1">
                    <Award className="w-3 h-3 text-violet-500" />
                    课程特色
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.features.map((feature, index) => (
                      <Badge key={index} className="bg-violet-100 text-violet-700 text-[9px] px-1.5 py-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div>
                  <h4 className="text-[11px] font-semibold text-foreground mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-violet-500" />
                    课程内容
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {selectedProject.courses.slice(0, 4).map((course, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-1 p-1.5 bg-violet-50 rounded"
                      >
                        <div className="w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-[9px] text-foreground truncate">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Schedule */}
                <div className="bg-muted/50 rounded-lg p-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      开班
                    </span>
                    <span className="font-medium text-foreground">{selectedProject.nextClass}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      地点
                    </span>
                    <span className="font-medium text-foreground">银川金凤校区</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between bg-amber-50 rounded-lg p-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(selectedProject.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                    <span className="text-xs font-bold text-amber-600 ml-1">{selectedProject.rating}</span>
                  </div>
                  <span className="text-[9px] text-muted-foreground">好评如潮</span>
                </div>
              </div>

              {/* Company Footer */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-2.5 text-white">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-6 h-6 bg-violet-500 rounded flex items-center justify-center shrink-0">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[11px]">优厚家庭服务</h3>
                        <p className="text-[8px] text-white/60">专业母婴培训 · 值得信赖</p>
                      </div>
                    </div>
                    <div className="space-y-0.5 text-[8px] text-white/80">
                      <p className="flex items-center gap-0.5">
                        <Shield className="w-2.5 h-2.5 shrink-0" />
                        人社部认证 · 行业协会会员
                      </p>
                      <p className="flex items-center gap-0.5">
                        <Phone className="w-2.5 h-2.5 shrink-0" />
                        400-888-8888
                      </p>
                      <p className="flex items-start gap-0.5">
                        <MapPin className="w-2.5 h-2.5 shrink-0 mt-0.5" />
                        <span className="break-all">银川市金凤区瑞银财富中心C座7楼</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="w-12 h-12 bg-white rounded p-0.5">
                      <Image
                        src="/youhou-service-qrcode.jpg"
                        alt="客服二维码"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <p className="text-[7px] text-white/60 mt-0.5">扫码咨询</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex gap-2">
              <Button 
                size="sm"
                variant="outline" 
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs h-8"
                onClick={() => {
                  setShowPoster(false)
                  setSelectedProject(null)
                }}
              >
                返回选择
              </Button>
              <Button size="sm" className="flex-1 bg-violet-500 hover:bg-violet-600 text-xs h-8">
                <Download className="w-3 h-3 mr-1" />
                保存海报
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contracts Sheet */}
      <Sheet open={showContracts} onOpenChange={setShowContracts}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl overflow-hidden">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <FileSignature className="w-5 h-5 text-violet-500" />
              合同管理
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(90vh-80px)] py-4">
            <ContractManagement role="consultant" showHeader={false} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
