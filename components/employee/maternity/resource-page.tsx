"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  Star,
  DollarSign,
  Send,
  Calendar,
  TrendingUp,
  Share2,
  Filter,
} from "lucide-react"

// 家政员数据
const caregivers = [
  {
    id: 1,
    name: "李阿姨",
    phone: "138****1234",
    avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    type: "月嫂",
    level: "金牌",
    age: 45,
    hometown: "湖南长沙",
    experience: "8年",
    salary: "15800-18800元/26天",
    rating: 4.9,
    totalOrders: 28,
    completedOrders: 27,
    ongoingOrders: 1,
    totalIncome: 442400,
    thisMonthIncome: 15800,
    available: true,
  },
  {
    id: 2,
    name: "张阿姨",
    phone: "139****5678",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    type: "育婴师",
    level: "银牌",
    age: 42,
    hometown: "四川成都",
    experience: "5年",
    salary: "10800-12800元/26天",
    rating: 4.8,
    totalOrders: 15,
    completedOrders: 14,
    ongoingOrders: 1,
    totalIncome: 162000,
    thisMonthIncome: 10800,
    available: false,
  },
  {
    id: 3,
    name: "王阿姨",
    phone: "137****9012",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    type: "月嫂",
    level: "钻石",
    age: 48,
    hometown: "江西南昌",
    experience: "10年",
    salary: "18800-22800元/26天",
    rating: 5.0,
    totalOrders: 35,
    completedOrders: 35,
    ongoingOrders: 0,
    totalIncome: 658000,
    thisMonthIncome: 0,
    available: true,
  },
  {
    id: 4,
    name: "陈阿姨",
    phone: "136****3456",
    avatar: "/chinese-woman-portrait.jpg",
    type: "产康技师",
    level: "中级",
    age: 38,
    hometown: "宁夏银川",
    experience: "3年",
    salary: "8000-10000元/月",
    rating: 4.7,
    totalOrders: 120,
    completedOrders: 118,
    ongoingOrders: 2,
    totalIncome: 288000,
    thisMonthIncome: 8500,
    available: true,
  },
]

// 详情数据
const caregiverDetail = {
  learning: {
    courseComplete: 24,
    totalCourse: 24,
    studyHours: 180,
    examPassed: 4,
    certificates: ["母婴护理师证", "催乳师证", "营养师证", "小儿推拿师证"],
    recentLearning: [
      { date: "2026-01-15", course: "高级月子餐制作", type: "线下" },
      { date: "2025-12-20", course: "新生儿急救培训", type: "线下" },
    ],
  },
  income: {
    total: 442400,
    thisMonth: 15800,
    lastMonth: 15800,
    pendingOrders: 1,
    records: [
      { date: "2026-01-15", amount: 15800, type: "月嫂服务", employer: "王女士" },
      { date: "2025-12-10", amount: 15800, type: "月嫂服务", employer: "李先生" },
    ],
  },
  orders: {
    total: 28,
    completed: 27,
    ongoing: 1,
    avgRating: 4.9,
    thisMonth: [
      { employer: "王女士", service: "月嫂服务", period: "01.15-02.10", status: "进行中" },
    ],
    history: [
      { date: "2025-12", employer: "李先生", service: "月嫂服务", rating: 5 },
      { date: "2025-10", employer: "张女士", service: "月嫂服务", rating: 5 },
    ],
  },
  resume: {
    education: "高中",
    skills: ["新生儿护理", "月子餐制作", "产妇护理", "催乳通乳", "早教启蒙"],
    workHistory: [
      { period: "2024.06-2024.08", employer: "王女士家", rating: 5 },
      { period: "2024.03-2024.05", employer: "李先生家", rating: 5 },
    ],
  },
  growth: {
    currentLevel: "金牌月嫂",
    nextLevel: "钻石月嫂",
    progress: 75,
    milestones: [
      { date: "2018-03", event: "加入平台" },
      { date: "2018-06", event: "完成培训" },
      { date: "2019-01", event: "晋升银牌" },
      { date: "2021-06", event: "晋升金牌" },
    ],
  },
}

export function MaternityResourcePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof caregivers)[0] | null>(null)
  const [detailTab, setDetailTab] = useState("learning")

  const filteredCaregivers = caregivers.filter(cg => {
    if (activeFilter === "all") return true
    return cg.type === activeFilter
  }).filter(cg => {
    if (!searchQuery) return true
    return cg.name.includes(searchQuery) || cg.phone.includes(searchQuery)
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "钻石":
        return "bg-violet-100 text-violet-700"
      case "金牌":
        return "bg-amber-100 text-amber-700"
      case "银牌":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-teal-100 text-teal-700"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">资源库</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-xl font-bold">{caregivers.length}</p>
            <p className="text-xs text-white/70">全部人员</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{caregivers.filter(c => c.type === "月嫂").length}</p>
            <p className="text-xs text-white/70">月嫂</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{caregivers.filter(c => c.type === "育婴师").length}</p>
            <p className="text-xs text-white/70">育婴师</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{caregivers.filter(c => c.available).length}</p>
            <p className="text-xs text-white/70">可派单</p>
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

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "月嫂", "育婴师", "产康技师"].map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "default" : "outline"}
              className={activeFilter === filter ? "bg-rose-500 hover:bg-rose-600" : "bg-transparent"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "全部类型" : filter}
            </Button>
          ))}
        </div>

        {/* Caregivers List */}
        <div className="space-y-3">
          {filteredCaregivers.map((caregiver) => (
            <Card 
              key={caregiver.id} 
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCaregiver(caregiver)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={caregiver.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{caregiver.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{caregiver.name}</h3>
                      <Badge className={`text-[10px] ${getLevelColor(caregiver.level)}`}>
                        {caregiver.level}{caregiver.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {caregiver.age}岁 · {caregiver.hometown} · {caregiver.experience}经验
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-rose-600">{caregiver.salary}</span>
                      <span className="flex items-center gap-0.5 text-amber-500 text-xs">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {caregiver.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {caregiver.available ? (
                      <Badge className="bg-teal-100 text-teal-700 text-[10px]">可派单</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-600 text-[10px]">服务中</Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-xs text-center">
                  <div>
                    <p className="font-bold text-foreground">{caregiver.totalOrders}</p>
                    <p className="text-muted-foreground">总派单</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{caregiver.completedOrders}</p>
                    <p className="text-muted-foreground">已完成</p>
                  </div>
                  <div>
                    <p className="font-bold text-rose-600">¥{(caregiver.totalIncome / 10000).toFixed(1)}万</p>
                    <p className="text-muted-foreground">总收入</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Caregiver Detail Sheet */}
      <Sheet open={!!selectedCaregiver} onOpenChange={() => setSelectedCaregiver(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={selectedCaregiver?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedCaregiver?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <SheetTitle>{selectedCaregiver?.name}</SheetTitle>
                  <Badge className={getLevelColor(selectedCaregiver?.level || "")}>
                    {selectedCaregiver?.level}{selectedCaregiver?.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedCaregiver?.salary}</p>
              </div>
              <Button size="sm" variant="outline" className="bg-transparent">
                <Share2 className="w-4 h-4 mr-1" />
                分享
              </Button>
            </div>
          </SheetHeader>
          
          {selectedCaregiver && (
            <div className="pt-4">
              <Tabs value={detailTab} onValueChange={setDetailTab}>
                <TabsList className="w-full bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger value="learning" className="flex-1 text-xs rounded-lg data-[state=active]:bg-white">
                    学习
                  </TabsTrigger>
                  <TabsTrigger value="income" className="flex-1 text-xs rounded-lg data-[state=active]:bg-white">
                    收入
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex-1 text-xs rounded-lg data-[state=active]:bg-white">
                    派单
                  </TabsTrigger>
                  <TabsTrigger value="resume" className="flex-1 text-xs rounded-lg data-[state=active]:bg-white">
                    简历
                  </TabsTrigger>
                  <TabsTrigger value="growth" className="flex-1 text-xs rounded-lg data-[state=active]:bg-white">
                    成长
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 min-h-0 overflow-y-auto py-4">
                  {/* Learning Tab */}
                  <TabsContent value="learning" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <BookOpen className="w-5 h-5 mx-auto text-rose-500 mb-1" />
                          <p className="text-lg font-bold">{caregiverDetail.learning.courseComplete}/{caregiverDetail.learning.totalCourse}</p>
                          <p className="text-xs text-muted-foreground">课程完成</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <Clock className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                          <p className="text-lg font-bold">{caregiverDetail.learning.studyHours}h</p>
                          <p className="text-xs text-muted-foreground">学习时长</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">已获证书</h4>
                      <div className="flex flex-wrap gap-2">
                        {caregiverDetail.learning.certificates.map((cert, index) => (
                          <Badge key={index} className="bg-amber-100 text-amber-700">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Income Tab */}
                  <TabsContent value="income" className="space-y-4 mt-0">
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-rose-50 to-pink-50">
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">累计收入</p>
                        <p className="text-2xl font-bold text-rose-600">¥{caregiverDetail.income.total.toLocaleString()}</p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-3 gap-3">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-lg font-bold">¥{caregiverDetail.income.thisMonth.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">本月</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-lg font-bold">¥{caregiverDetail.income.lastMonth.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">上月</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-lg font-bold">{caregiverDetail.income.pendingOrders}</p>
                          <p className="text-xs text-muted-foreground">待结算</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Orders Tab */}
                  <TabsContent value="orders" className="space-y-4 mt-0">
                    <div className="grid grid-cols-4 gap-2">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold">{caregiverDetail.orders.total}</p>
                          <p className="text-[10px] text-muted-foreground">总派单</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold text-teal-600">{caregiverDetail.orders.completed}</p>
                          <p className="text-[10px] text-muted-foreground">已完成</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold text-amber-600">{caregiverDetail.orders.ongoing}</p>
                          <p className="text-[10px] text-muted-foreground">进行中</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold">{caregiverDetail.orders.avgRating}</p>
                          <p className="text-[10px] text-muted-foreground">评分</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">当月派单</h4>
                      {caregiverDetail.orders.thisMonth.map((order, index) => (
                        <Card key={index} className="border-0 shadow-sm">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{order.employer} - {order.service}</p>
                                <p className="text-xs text-muted-foreground">{order.period}</p>
                              </div>
                              <Badge className="bg-amber-100 text-amber-700">{order.status}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Resume Tab */}
                  <TabsContent value="resume" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">年龄</p>
                        <p className="font-medium">{selectedCaregiver.age}岁</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">籍贯</p>
                        <p className="font-medium">{selectedCaregiver.hometown}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">学历</p>
                        <p className="font-medium">{caregiverDetail.resume.education}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">从业经验</p>
                        <p className="font-medium">{selectedCaregiver.experience}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">技能特长</h4>
                      <div className="flex flex-wrap gap-2">
                        {caregiverDetail.resume.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Growth Tab */}
                  <TabsContent value="growth" className="space-y-4 mt-0">
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-rose-50 to-pink-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-xs text-muted-foreground">当前等级</p>
                            <p className="text-lg font-bold text-rose-600">{caregiverDetail.growth.currentLevel}</p>
                          </div>
                          <TrendingUp className="w-5 h-5 text-rose-500" />
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">下一等级</p>
                            <p className="text-lg font-bold">{caregiverDetail.growth.nextLevel}</p>
                          </div>
                        </div>
                        <Progress value={caregiverDetail.growth.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1 text-right">{caregiverDetail.growth.progress}%</p>
                      </CardContent>
                    </Card>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">成长里程碑</h4>
                      <div className="relative pl-4 border-l-2 border-rose-200 space-y-4">
                        {caregiverDetail.growth.milestones.map((milestone, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-[21px] w-4 h-4 bg-rose-500 rounded-full border-2 border-white" />
                            <div className="ml-4">
                              <p className="font-medium text-sm">{milestone.event}</p>
                              <p className="text-xs text-muted-foreground">{milestone.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
