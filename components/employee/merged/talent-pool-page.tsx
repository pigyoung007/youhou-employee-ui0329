"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search, ChevronRight, BookOpen, Clock, Award, Star,
  Send, Share2, Briefcase, User, GraduationCap,
} from "lucide-react"
import { SharePosterModal } from "@/components/share-poster-modal"

const students = [
  { id: 1, name: "张小红", phone: "138****1234", avatar: "/chinese-woman-portrait.jpg", course: "母婴护理师（初级）", level: "初级", progress: 75, status: "在学", totalOrders: 0, totalIncome: 0, joinDate: "2025-10-15", type: "student" as const },
  { id: 2, name: "王大姐", phone: "137****9012", avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg", course: "育婴师培训", level: "中级", progress: 100, status: "已结业", totalOrders: 0, totalIncome: 0, joinDate: "2025-08-10", type: "student" as const },
  { id: 3, name: "刘小芳", phone: "135****7890", avatar: "/friendly-chinese-caregiver-woman-portrait.jpg", course: "催乳师培训", level: "初级", progress: 40, status: "在学", totalOrders: 0, totalIncome: 0, joinDate: "2026-01-05", type: "student" as const },
]

const domesticWorkers = [
  { id: 101, name: "李阿姨", phone: "138****1234", avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg", workerType: "月嫂", level: "金牌", age: 45, hometown: "湖南长沙", experience: "8年", salary: "15800-18800元/26天", rating: 4.9, totalOrders: 28, completedOrders: 27, available: true, type: "domestic" as const },
  { id: 102, name: "张阿姨", phone: "139****5678", avatar: "/friendly-chinese-caregiver-woman-portrait.jpg", workerType: "育婴师", level: "银牌", age: 42, hometown: "四川成都", experience: "5年", salary: "10800-12800元/26天", rating: 4.8, totalOrders: 15, completedOrders: 14, available: false, type: "domestic" as const },
  { id: 103, name: "王阿姨", phone: "137****9012", avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg", workerType: "月嫂", level: "钻石", age: 48, hometown: "江西南昌", experience: "10年", salary: "18800-22800元/26天", rating: 5.0, totalOrders: 35, completedOrders: 35, available: true, type: "domestic" as const },
]

const detailData = {
  learning: { courseComplete: 18, totalCourse: 24, studyHours: 120, examPassed: 2, certificates: ["母婴护理师证", "催乳师证"] },
  orders: { total: 28, completed: 27, ongoing: 1, avgRating: 4.9 },
}

const studentFilterOptions = ["all", "在学", "已结业", "已就业"]
const workerFilterOptions = ["all", "年龄", "星级", "档期", "籍贯"]

function getFilterLabel(f: string) {
  if (f === "all") return "全部"
  if (f === "年龄") return "年龄"
  if (f === "星级") return "星级"
  if (f === "档期") return "档期"
  if (f === "籍贯") return "籍贯"
  return f
}

function getLevelColor(level: string) {
  if (level === "钻石") return "bg-violet-100 text-violet-700"
  if (level === "金牌") return "bg-amber-100 text-amber-700"
  if (level === "银牌") return "bg-gray-100 text-gray-600"
  return "bg-teal-100 text-teal-700"
}

function getStatusColor(status: string) {
  if (status === "在学") return "bg-amber-100 text-amber-700"
  if (status === "已结业") return "bg-teal-100 text-teal-700"
  return "bg-violet-100 text-violet-700"
}



function getPersonInfoFields(person: any) {
  if (person.type === "student") {
    return [
      { label: "客户全名", value: person.name },
      { label: "客户星级", value: "四星" },
      { label: "手机", value: person.phone },
      { label: "微信号", value: "wx_" + person.name },
      { label: "客户来源", value: "线上咨询" },
      { label: "民族", value: "汉族" },
      { label: "性别", value: "女" },
      { label: "所属母婴顾问", value: "张顾问" },
      { label: "课程", value: person.course },
      { label: "入学时间", value: person.joinDate },
      { label: "学习进度", value: person.progress + "%" },
      { label: "状态", value: person.status },
    ]
  }
  return [
    { label: "姓名", value: person.name },
    { label: "联系方式", value: person.phone },
    { label: "身份证号", value: "640***********1234" },
    { label: "微信号", value: "wx_" + person.name },
    { label: "性别", value: "女" },
    { label: "民族", value: "汉族" },
    { label: "客户来源", value: "线上咨询" },
    { label: "所属顾问", value: "张顾问" },
    { label: "家庭住址", value: "银川市金凤区" },
    { label: "紧急联系人", value: "家属139****5678" },
    { label: "星座", value: "天秤座" },
    { label: "年龄", value: person.age + "岁" },
    { label: "籍贯", value: person.hometown },
    { label: "从业经验", value: person.experience },
    { label: "薪资", value: person.salary },
    { label: "评分", value: person.rating + "分" },
  ]
}

export function TalentPoolPage() {
  const [activeTab, setActiveTab] = useState<"student" | "domestic">("student")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null)
  const [detailTab, setDetailTab] = useState("info")
  const [showPoster, setShowPoster] = useState(false)
  const [posterPerson, setPosterPerson] = useState<any | null>(null)

  const handleShare = (e: React.MouseEvent, person: any) => {
    e.stopPropagation()
    setPosterPerson(person)
    setShowPoster(true)
  }

  const filteredStudents = students
    .filter(s => activeFilter === "all" || s.status === activeFilter)
    .filter(s => !searchQuery || s.name.includes(searchQuery) || s.phone.includes(searchQuery))

  const filteredWorkers = domesticWorkers
    .filter(w => {
      if (activeFilter === "all") return true
      if (activeFilter === "年龄") return w.age >= 40 && w.age <= 50
      if (activeFilter === "星级") return w.level === "金牌" || w.level === "钻石"
      if (activeFilter === "档期") return w.available
      if (activeFilter === "籍贯") return ["湖南长沙", "江西南昌"].includes(w.hometown)
      return false
    })
    .filter(w => !searchQuery || w.name.includes(searchQuery) || w.phone.includes(searchQuery))

  const filters = activeTab === "student" ? studentFilterOptions : workerFilterOptions
  const infoFields = selectedPerson ? getPersonInfoFields(selectedPerson) : []

  const openDetail = (person: any) => {
    setSelectedPerson(person)
    setDetailTab("info")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3 pt-3 pb-3 safe-area-top">
        <h1 className="text-sm font-bold">人才库</h1>
      </header>

      <main className="px-3 py-2.5 space-y-2">
        <Tabs value={activeTab} onValueChange={v => { setActiveTab(v as any); setActiveFilter("all") }}>
          <TabsList className="w-full bg-muted/50 p-0.5 rounded-lg h-8">
            <TabsTrigger value="student" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">
              <GraduationCap className="w-3.5 h-3.5 mr-1" />学员
            </TabsTrigger>
            <TabsTrigger value="domestic" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">
              <Briefcase className="w-3.5 h-3.5 mr-1" />家政员
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="搜索姓名或手机号" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8 h-8 text-xs" />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {filters.map(filter => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "default" : "outline"}
              className={`text-[11px] h-6 px-2.5 shrink-0 ${activeFilter === filter ? "bg-violet-500 hover:bg-violet-600 text-white" : "bg-transparent"}`}
              onClick={() => {
                if (filter === "档期") {
                  setShowDatePicker(true)
                } else {
                  setActiveFilter(filter)
                }
              }}
            >
              {filter === "档期" && selectedDate ? `档期: ${selectedDate}` : getFilterLabel(filter)}
            </Button>
          ))}
        </div>

        {/* 档期日期选择器 */}
        <Sheet open={showDatePicker} onOpenChange={setShowDatePicker}>
          <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
            <div className="p-4 space-y-4">
              <SheetTitle className="text-sm">选择档期日期</SheetTitle>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">选择家政员可上户的日期</p>
                <input 
                  type="date" 
                  className="w-full px-3 py-3 text-sm border border-border rounded-lg"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent" onClick={() => setSelectedDate('2026-04-01')}>4月1日</Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent" onClick={() => setSelectedDate('2026-04-15')}>4月15日</Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent" onClick={() => setSelectedDate('2026-05-01')}>5月1日</Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent" onClick={() => setSelectedDate('2026-05-15')}>5月15日</Button>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => { setSelectedDate(''); setShowDatePicker(false); setActiveFilter('all') }}>
                  清除
                </Button>
                <Button className="flex-1 bg-violet-500 hover:bg-violet-600" onClick={() => { setActiveFilter('档期'); setShowDatePicker(false) }}>
                  确认筛选
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {activeTab === "student" && filteredStudents.map(student => (
          <Card key={student.id} className="border-0 shadow-sm cursor-pointer" onClick={() => openDetail(student)}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2.5 mb-2">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-[10px]">{student.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-xs">{student.name}</h3>
                    <Badge className={`text-[9px] px-1.5 py-0 ${getStatusColor(student.status)}`}>{student.status}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{student.course}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-muted-foreground shrink-0">进度</span>
                <Progress value={student.progress} className="flex-1 h-1.5" />
                <span className="text-[10px] font-medium shrink-0">{student.progress}%</span>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-border/50">
                <Button size="sm" variant="outline" className="flex-1 text-[10px] h-6 bg-transparent" onClick={e => e.stopPropagation()}>
                  <Briefcase className="w-3 h-3 mr-0.5" />转为家政员
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {activeTab === "domestic" && filteredWorkers.map(worker => (
          <Card key={worker.id} className="border-0 shadow-sm cursor-pointer" onClick={() => openDetail(worker)}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-[10px]">{worker.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-xs">{worker.name}</h3>
                    <Badge className={`text-[9px] px-1.5 py-0 ${getLevelColor(worker.level)}`}>{worker.level}{worker.workerType}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{worker.age}岁 · {worker.hometown} · {worker.experience}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-primary">{worker.salary}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />{worker.rating}
                    </span>
                  </div>
                </div>
                <Badge className={`text-[9px] shrink-0 ${worker.available ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"}`}>
                  {worker.available ? "可派单" : "服务中"}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1.5 border-t border-border/50 text-[10px] text-center mb-1.5">
                <div><span className="font-bold text-xs">{worker.totalOrders}</span> <span className="text-muted-foreground">派单</span></div>
                <div><span className="font-bold text-xs">{worker.completedOrders}</span> <span className="text-muted-foreground">完成</span></div>
                <div><span className="font-bold text-xs text-teal-600">{worker.available ? "空闲" : "在岗"}</span> <span className="text-muted-foreground">状态</span></div>
              </div>
              <div className="flex items-center gap-1.5">
                <Button size="sm" variant="outline" className="flex-1 text-[10px] h-6 bg-transparent" onClick={e => handleShare(e, worker)}>
                  <Share2 className="w-3 h-3 mr-0.5" />分享
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      {showPoster && posterPerson && posterPerson.type === "domestic" && (
        <SharePosterModal
          onClose={() => setShowPoster(false)}
          type="caregiver"
          themeColor="amber"
          data={{
            name: posterPerson.name,
            subtitle: `${posterPerson.level}${posterPerson.workerType}`,
            desc: `${posterPerson.age}岁 | ${posterPerson.hometown} | ${posterPerson.experience}经验`,
            price: posterPerson.salary,
            tags: [posterPerson.level, posterPerson.workerType, posterPerson.available ? "可派单" : "服务中"],
            avatar: posterPerson.avatar,
            rating: posterPerson.rating,
            reviews: posterPerson.totalOrders,
          }}
        />
      )}

      <Sheet open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <SheetContent side="right" className="w-[90vw] max-w-md p-0 flex flex-col h-full">
          <SheetTitle className="sr-only">人才详情</SheetTitle>
          <div className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-2.5 border-b border-border shrink-0">
              <div className="flex items-center gap-2.5">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={selectedPerson?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-[10px]">{selectedPerson?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{selectedPerson?.name}</h3>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedPerson?.type === "student" ? selectedPerson?.course : selectedPerson?.level + selectedPerson?.workerType}
                  </p>
                </div>
              </div>
            </div>

            {selectedPerson && (
              <div className="px-4 pt-2 shrink-0">
                <Tabs value={detailTab} onValueChange={setDetailTab}>
                  {selectedPerson?.type === "student" ? (
                    <TabsList className="w-full bg-muted/50 p-0.5 rounded-lg h-8 grid grid-cols-4">
                      <TabsTrigger value="info" className="text-xs h-7 rounded-md data-[state=active]:bg-white">基本信息</TabsTrigger>
                      <TabsTrigger value="course" className="text-xs h-7 rounded-md data-[state=active]:bg-white">课程</TabsTrigger>
                      <TabsTrigger value="exam" className="text-xs h-7 rounded-md data-[state=active]:bg-white">成绩</TabsTrigger>
                      <TabsTrigger value="cert" className="text-xs h-7 rounded-md data-[state=active]:bg-white">证书</TabsTrigger>
                    </TabsList>
                  ) : (
                    <TabsList className="w-full bg-muted/50 p-0.5 rounded-lg h-8 grid grid-cols-5 overflow-x-auto">
                      <TabsTrigger value="info" className="text-xs h-7 rounded-md data-[state=active]:bg-white whitespace-nowrap">基本信息</TabsTrigger>
                      <TabsTrigger value="resume" className="text-xs h-7 rounded-md data-[state=active]:bg-white whitespace-nowrap">简历</TabsTrigger>
                      <TabsTrigger value="schedule" className="text-xs h-7 rounded-md data-[state=active]:bg-white whitespace-nowrap">档期</TabsTrigger>
                      <TabsTrigger value="rating" className="text-xs h-7 rounded-md data-[state=active]:bg-white whitespace-nowrap">等级</TabsTrigger>
                      <TabsTrigger value="records" className="text-xs h-7 rounded-md data-[state=active]:bg-white whitespace-nowrap">服务</TabsTrigger>
                    </TabsList>
                  )}
                </Tabs>
              </div>
            )}

            {selectedPerson && (
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                {selectedPerson?.type === "student" ? (
                  <>
                    {detailTab === "info" && (
                      <div className="grid grid-cols-2 gap-2">
                        {infoFields.map(item => (
                          <div key={item.label} className="bg-muted/50 rounded-lg p-2.5">
                            <p className="text-[10px] text-muted-foreground">{item.label}</p>
                            <p className="font-medium text-xs mt-0.5">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {detailTab === "course" && (
                      <div className="space-y-2">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs font-semibold text-blue-900">已报课程</p>
                          <p className="text-xs text-blue-700 mt-1">高级月嫂培训班 (2024年)</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2.5 space-y-1">
                          <p className="text-[10px] text-muted-foreground">授课老师: 张老师</p>
                          <p className="text-[10px] text-muted-foreground">课程类型: 技能培训</p>
                          <p className="text-[10px] text-muted-foreground">开课: 2025-03-01</p>
                          <p className="text-[10px] text-muted-foreground">结束: 2025-03-15</p>
                          <div className="mt-2">
                            <p className="text-[10px] text-muted-foreground mb-1">学习进度</p>
                            <Progress value={80} className="h-1.5" />
                            <p className="text-[10px] font-medium mt-1">32/40课时</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {detailTab === "exam" && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2.5">
                              <p className="text-[10px] text-muted-foreground">笔试成绩</p>
                              <p className="text-lg font-bold text-teal-600 mt-1">92分</p>
                            </CardContent>
                          </Card>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2.5">
                              <p className="text-[10px] text-muted-foreground">面试成绩</p>
                              <p className="text-lg font-bold text-teal-600 mt-1">88分</p>
                            </CardContent>
                          </Card>
                        </div>
                        <Card className="border-0 shadow-sm">
                          <CardContent className="p-2.5">
                            <p className="text-xs font-semibold mb-2">考试状态: 已通过</p>
                            <p className="text-[10px] text-muted-foreground">通过日期: 2025-03-10</p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    {detailTab === "cert" && (
                      <div className="space-y-2">
                        <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                          <div className="flex items-start gap-2">
                            <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-amber-900">母婴护理师证</p>
                              <p className="text-[10px] text-amber-700 mt-1">颁发机构: 国家人力资源和社会保障部</p>
                              <p className="text-[10px] text-amber-700">颁发日期: 2025-03-15</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-violet-50 rounded-lg p-2.5 border border-violet-200">
                          <div className="flex items-start gap-2">
                            <Award className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-violet-900">催乳师证</p>
                              <p className="text-[10px] text-violet-700 mt-1">颁发机构: 中国妇幼保健协会</p>
                              <p className="text-[10px] text-violet-700">颁发日期: 2025-01-20</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {detailTab === "info" && (
                      <div className="grid grid-cols-2 gap-2">
                        {infoFields.map(item => (
                          <div key={item.label} className="bg-muted/50 rounded-lg p-2.5">
                            <p className="text-[10px] text-muted-foreground">{item.label}</p>
                            <p className="font-medium text-xs mt-0.5">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {detailTab === "resume" && (
                      <div className="space-y-2">
                        <div className="bg-amber-50 rounded-lg p-3">
                          <h4 className="text-xs font-semibold mb-2">工作生活照</h4>
                          <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-[10px] text-amber-600">工作照片</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-1">视频介绍</h4>
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-[10px] text-gray-500">视频介绍</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-1">资格证书</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-green-100 text-green-700 text-[10px]">母婴护理师证</Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-[10px]">催乳师证</Badge>
                            <Badge className="bg-violet-100 text-violet-700 text-[10px]">育婴师证</Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-1">辅食作品</h4>
                          <div className="grid grid-cols-3 gap-1">
                            <div className="aspect-square bg-orange-50 rounded flex items-center justify-center text-[9px] text-orange-400">辅食1</div>
                            <div className="aspect-square bg-orange-50 rounded flex items-center justify-center text-[9px] text-orange-400">辅食2</div>
                            <div className="aspect-square bg-orange-50 rounded flex items-center justify-center text-[9px] text-orange-400">辅食3</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-1">客户好评</h4>
                          <div className="space-y-1.5">
                            <div className="bg-green-50 rounded p-2 border border-green-100">
                              <p className="text-[10px] text-green-800">
                                &ldquo;阿姨非常专业，护理细心周到，强烈推荐！&rdquo;
                              </p>
                              <p className="text-[9px] text-green-600 mt-1">— 王女士 2025-02</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-1">工作经历</h4>
                          <div className="text-[10px] text-muted-foreground space-y-1">
                            <p>2020-2025: 银川市金凤区李女士家 月嫂服务</p>
                            <p>2018-2020: 银川市兴庆区张女士家 育婴服务</p>
                          </div>
                        </div>
                        {/* 分享按钮 */}
                        <div className="pt-2 border-t border-border">
                          <Button
                            className="w-full h-9 bg-pink-500 hover:bg-pink-600 text-white text-xs"
                            onClick={(e) => handleShare(e, selectedPerson)}
                          >
                            <Share2 className="w-3.5 h-3.5 mr-1.5" />
                            生成分享链接
                          </Button>
                        </div>
                      </div>
                    )}
                    {detailTab === "schedule" && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm font-bold text-green-600">待岗</p>
                              <p className="text-[9px] text-muted-foreground">3天</p>
                            </CardContent>
                          </Card>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm font-bold text-amber-600">上户中</p>
                              <p className="text-[9px] text-muted-foreground">26天</p>
                            </CardContent>
                          </Card>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm font-bold text-gray-600">休假</p>
                              <p className="text-[9px] text-muted-foreground">0天</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="bg-green-50 rounded-lg p-2.5 border border-green-200">
                          <p className="text-xs font-semibold text-green-900">当前状态: 待岗</p>
                          <p className="text-[10px] text-green-700 mt-1">可立即派单服务</p>
                        </div>
                      </div>
                    )}
                    {detailTab === "rating" && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2.5 text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <p className="text-xs font-bold">五星级</p>
                            </CardContent>
                          </Card>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2.5">
                              <p className="text-[10px] text-muted-foreground">评分</p>
                              <p className="text-lg font-bold text-primary mt-1">4.9分</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                          <p className="text-xs font-semibold text-amber-900 mb-1">等级调整</p>
                          <p className="text-[10px] text-amber-700">晋升为金牌</p>
                          <p className="text-[10px] text-muted-foreground mt-1">2025-01-15</p>
                        </div>
                      </div>
                    )}
                    {detailTab === "records" && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm font-bold">28</p>
                              <p className="text-[9px] text-muted-foreground">总派单</p>
                            </CardContent>
                          </Card>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm font-bold">27</p>
                              <p className="text-[9px] text-muted-foreground">已完成</p>
                            </CardContent>
                          </Card>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2 text-center">
                              <p className="text-sm font-bold text-green-600">1</p>
                              <p className="text-[9px] text-muted-foreground">进行中</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs mb-1.5">最近服务</h4>
                          <Card className="border-0 shadow-sm">
                            <CardContent className="p-2.5">
                              <p className="text-xs font-medium">王女士家月嫂服务</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">2025-12-01 ~ 2025-12-26</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">已完成</span>
                                <div className="flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="text-[10px]">5.0 好评</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
