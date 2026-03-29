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
import { Calendar } from "@/components/ui/calendar"
import {
  Search,
  ChevronRight,
  User,
  BookOpen,
  Briefcase,
  TrendingUp,
  Award,
  FileText,
  Clock,
  Star,
  CalendarDays,
  DollarSign,
  Send,
} from "lucide-react"

// 学员数据
const students = [
  {
    id: 1,
    name: "张小红",
    phone: "138****1234",
    avatar: "/chinese-woman-portrait.jpg",
    course: "母婴护理师（初级）",
    level: "初级",
    progress: 75,
    status: "在学",
    totalOrders: 0,
    totalIncome: 0,
    joinDate: "2025-10-15",
  },
  {
    id: 2,
    name: "李阿姨",
    phone: "139****5678",
    avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    course: "月嫂培训",
    level: "金牌",
    progress: 100,
    status: "已就业",
    totalOrders: 8,
    totalIncome: 126400,
    joinDate: "2024-06-20",
  },
  {
    id: 3,
    name: "王大姐",
    phone: "137****9012",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    course: "育婴师培训",
    level: "中级",
    progress: 100,
    status: "已结业",
    totalOrders: 0,
    totalIncome: 0,
    joinDate: "2025-08-10",
  },
]

// 学员详情数据
const studentDetail = {
  learning: {
    courseComplete: 18,
    totalCourse: 24,
    studyHours: 120,
    examPassed: 2,
    certificates: ["母婴护理师证", "催乳师证"],
    recentLearning: [
      { date: "2026-01-21", course: "产妇护理技能", type: "线上" },
      { date: "2026-01-19", course: "实操培训", type: "线下" },
    ],
  },
  income: {
    total: 126400,
    thisMonth: 15800,
    lastMonth: 15800,
    pendingOrders: 1,
    records: [
      { date: "2026-01-15", amount: 15800, type: "月嫂服务", employer: "王女士" },
      { date: "2025-12-10", amount: 15800, type: "月嫂服务", employer: "李先生" },
    ],
  },
  orders: {
    total: 8,
    completed: 7,
    ongoing: 1,
    avgRating: 4.9,
    records: [
      { date: "2026-01", employer: "王女士家", service: "月嫂服务", rating: 5, status: "进行中" },
      { date: "2025-12", employer: "李先生家", service: "月嫂服务", rating: 5, status: "已完成" },
    ],
  },
  resume: {
    age: 45,
    hometown: "湖南长沙",
    currentCity: "银川金凤",
    education: "高中",
    experience: "8年",
    salary: "15800-18800元/26天",
    skills: ["新生儿护理", "月子餐制作", "产妇护理", "催乳通乳"],
    workHistory: [
      { period: "2024.06-2024.08", employer: "王女士家", rating: 5 },
      { period: "2024.03-2024.05", employer: "李先生家", rating: 5 },
    ],
  },
  growth: {
    currentLevel: "金牌月嫂",
    nextLevel: "钻石月嫂",
    milestones: [
      { date: "2024-06", event: "加入平台" },
      { date: "2024-08", event: "完成培训" },
      { date: "2024-10", event: "首单服务" },
      { date: "2025-06", event: "晋升金牌" },
    ],
  },
}

export function CareerStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [detailTab, setDetailTab] = useState("learning")

  const filteredStudents = students.filter(student => {
    if (activeFilter === "all") return true
    return student.status === activeFilter
  }).filter(student => {
    if (!searchQuery) return true
    return student.name.includes(searchQuery) || student.phone.includes(searchQuery)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "在学":
        return "bg-amber-100 text-amber-700"
      case "已结业":
        return "bg-teal-100 text-teal-700"
      case "已就业":
        return "bg-violet-100 text-violet-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">学员管理</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-white/10 rounded-xl p-3">
            <p className="text-xl font-bold">{students.length}</p>
            <p className="text-xs text-white/70">我的学员</p>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-3">
            <p className="text-xl font-bold">{students.filter(s => s.status === "在学").length}</p>
            <p className="text-xs text-white/70">在学习</p>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-3">
            <p className="text-xl font-bold">{students.filter(s => s.status === "已就业").length}</p>
            <p className="text-xs text-white/70">已就业</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索学员姓名或手机号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "在学", "已结业", "已就业"].map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "default" : "outline"}
              className={activeFilter === filter ? "bg-violet-500 hover:bg-violet-600" : "bg-transparent"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "全部学员" : filter}
            </Button>
          ))}
        </div>

        {/* Students List */}
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <Card 
              key={student.id} 
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedStudent(student)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <Badge className={`text-[10px] ${getStatusColor(student.status)}`}>
                        {student.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{student.course} · {student.level}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">学习进度</span>
                  <Progress value={student.progress} className="flex-1 h-2" />
                  <span className="text-xs font-medium">{student.progress}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-xs">
                  <div className="text-center">
                    <p className="font-bold text-foreground">{student.totalOrders}</p>
                    <p className="text-muted-foreground">派单</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">
                      {student.totalIncome > 0 ? `¥${(student.totalIncome / 10000).toFixed(1)}万` : "-"}
                    </p>
                    <p className="text-muted-foreground">总收益</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">{student.joinDate.split("-")[0]}</p>
                    <p className="text-muted-foreground">入学年份</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Student Detail Sheet */}
      <Sheet open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={selectedStudent?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedStudent?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle>{selectedStudent?.name}</SheetTitle>
                <p className="text-sm text-muted-foreground">{selectedStudent?.course}</p>
              </div>
            </div>
          </SheetHeader>
          
          {selectedStudent && (
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
                <div className="overflow-y-auto h-[calc(90vh-180px)] py-4">
                  {/* Learning Tab */}
                  <TabsContent value="learning" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <BookOpen className="w-5 h-5 mx-auto text-violet-500 mb-1" />
                          <p className="text-lg font-bold">{studentDetail.learning.courseComplete}/{studentDetail.learning.totalCourse}</p>
                          <p className="text-xs text-muted-foreground">课程完成</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <Clock className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                          <p className="text-lg font-bold">{studentDetail.learning.studyHours}h</p>
                          <p className="text-xs text-muted-foreground">学习时长</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <FileText className="w-5 h-5 mx-auto text-teal-500 mb-1" />
                          <p className="text-lg font-bold">{studentDetail.learning.examPassed}</p>
                          <p className="text-xs text-muted-foreground">考试通过</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <Award className="w-5 h-5 mx-auto text-rose-500 mb-1" />
                          <p className="text-lg font-bold">{studentDetail.learning.certificates.length}</p>
                          <p className="text-xs text-muted-foreground">已获证书</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">最近学习</h4>
                      <div className="space-y-2">
                        {studentDetail.learning.recentLearning.map((item, index) => (
                          <Card key={index} className="border-0 shadow-sm">
                            <CardContent className="p-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{item.course}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                              </div>
                              <Badge variant="outline">{item.type}</Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">已获证书</h4>
                      <div className="flex flex-wrap gap-2">
                        {studentDetail.learning.certificates.map((cert, index) => (
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
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50">
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">累计收入</p>
                        <p className="text-2xl font-bold text-violet-600">¥{studentDetail.income.total.toLocaleString()}</p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-3 gap-3">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-lg font-bold text-foreground">¥{studentDetail.income.thisMonth.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">本月</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-lg font-bold text-foreground">¥{studentDetail.income.lastMonth.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">上月</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3 text-center">
                          <p className="text-lg font-bold text-foreground">{studentDetail.income.pendingOrders}</p>
                          <p className="text-xs text-muted-foreground">待结算</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">收入明细</h4>
                      <div className="space-y-2">
                        {studentDetail.income.records.map((item, index) => (
                          <Card key={index} className="border-0 shadow-sm">
                            <CardContent className="p-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{item.type} - {item.employer}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                              </div>
                              <span className="font-bold text-teal-600">+¥{item.amount.toLocaleString()}</span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Orders Tab */}
                  <TabsContent value="orders" className="space-y-4 mt-0">
                    <div className="grid grid-cols-4 gap-2">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold">{studentDetail.orders.total}</p>
                          <p className="text-[10px] text-muted-foreground">总派单</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold text-teal-600">{studentDetail.orders.completed}</p>
                          <p className="text-[10px] text-muted-foreground">已完成</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold text-amber-600">{studentDetail.orders.ongoing}</p>
                          <p className="text-[10px] text-muted-foreground">进行中</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-2 text-center">
                          <p className="text-lg font-bold">{studentDetail.orders.avgRating}</p>
                          <p className="text-[10px] text-muted-foreground">平均评分</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">派单记录</h4>
                      <div className="space-y-2">
                        {studentDetail.orders.records.map((item, index) => (
                          <Card key={index} className="border-0 shadow-sm">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{item.employer} - {item.service}</span>
                                <Badge className={item.status === "进行中" ? "bg-amber-100 text-amber-700" : "bg-teal-100 text-teal-700"}>
                                  {item.status}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{item.date}</span>
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                                  {item.rating}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Resume Tab */}
                  <TabsContent value="resume" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">年龄</p>
                        <p className="font-medium">{studentDetail.resume.age}岁</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">籍贯</p>
                        <p className="font-medium">{studentDetail.resume.hometown}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">现居</p>
                        <p className="font-medium">{studentDetail.resume.currentCity}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">学历</p>
                        <p className="font-medium">{studentDetail.resume.education}</p>
                      </div>
                    </div>

                    <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">当前等级薪资</p>
                        <p className="text-lg font-bold text-amber-600">{studentDetail.resume.salary}</p>
                      </CardContent>
                    </Card>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">技能特长</h4>
                      <div className="flex flex-wrap gap-2">
                        {studentDetail.resume.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Growth Tab */}
                  <TabsContent value="growth" className="space-y-4 mt-0">
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">当前等级</p>
                            <p className="text-lg font-bold text-violet-600">{studentDetail.growth.currentLevel}</p>
                          </div>
                          <TrendingUp className="w-5 h-5 text-violet-500" />
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">下一等级</p>
                            <p className="text-lg font-bold text-foreground">{studentDetail.growth.nextLevel}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">成长里程碑</h4>
                      <div className="relative pl-4 border-l-2 border-violet-200 space-y-4">
                        {studentDetail.growth.milestones.map((milestone, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-[21px] w-4 h-4 bg-violet-500 rounded-full border-2 border-white" />
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
