"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search, ChevronRight, Clock, Award, Star,
  Share2, Briefcase, GraduationCap, ImageIcon, FileText, X, Users, BookOpen, User,
} from "lucide-react"
import { ScheduleOverviewBar, type ScheduleOverviewSegment } from "@/components/employee/schedule-overview-bar"
import {
  NannyScheduleTabContent,
  resolveScheduleBannerTone,
  resolveScheduleStatusHint,
} from "@/components/employee/nanny-schedule-tab-content"
import { SharePosterModal } from "@/components/share-poster-modal"
import { NannyResumeShareView, domesticWorkerToResumeData } from "@/components/nanny-resume-share-view"
import { cn } from "@/lib/utils"

/** 在学课程（列表与详情共用） */
interface StudentCurrentCourse {
  name: string
  category: string
  teacher: string
  startDate: string
  endDate: string
  attendedHours: number
  totalHours: number
  progress: number
  nextClass?: string
}

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
    type: "student" as const,
    age: 28,
    gender: "女",
    idCardMasked: "640***********1026",
    city: "银川市金凤区",
    education: "大专",
    studentNo: "XY20251015001",
    consultant: "张顾问",
    source: "抖音广告",
    wechat: "wx_zhxh",
    currentCourses: [
      {
        name: "母婴护理师（初级）",
        category: "技能培训",
        teacher: "张老师",
        startDate: "2025-10-16",
        endDate: "2026-02-28",
        attendedHours: 36,
        totalHours: 48,
        progress: 75,
        nextClass: "每周三 09:00 · 实操教室 A",
      },
      {
        name: "母乳喂养与辅食基础（选修）",
        category: "公开课",
        teacher: "李老师",
        startDate: "2025-11-01",
        endDate: "2026-01-15",
        attendedHours: 8,
        totalHours: 12,
        progress: 66,
        nextClass: "每周五 14:00 · 线上直播",
      },
    ] satisfies StudentCurrentCourse[],
  },
  {
    id: 2,
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
    type: "student" as const,
    age: 42,
    gender: "女",
    idCardMasked: "640***********8891",
    city: "兰州市城关区",
    education: "高中",
    studentNo: "XY20250810002",
    consultant: "李顾问",
    source: "朋友推荐",
    wechat: "wx_wdj",
    currentCourses: [
      {
        name: "育婴师培训（中级）",
        category: "技能培训",
        teacher: "王老师",
        startDate: "2025-08-12",
        endDate: "2025-12-20",
        attendedHours: 56,
        totalHours: 56,
        progress: 100,
        nextClass: "已全部结课",
      },
    ] satisfies StudentCurrentCourse[],
  },
  {
    id: 3,
    name: "刘小芳",
    phone: "135****7890",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    course: "催乳师培训",
    level: "初级",
    progress: 40,
    status: "在学",
    totalOrders: 0,
    totalIncome: 0,
    joinDate: "2026-01-05",
    type: "student" as const,
    age: 35,
    gender: "女",
    idCardMasked: "640***********4455",
    city: "西安市雁塔区",
    education: "中专",
    studentNo: "XY20260105003",
    consultant: "张顾问",
    source: "小红书",
    wechat: "wx_lxf",
    currentCourses: [
      {
        name: "催乳师培训（初级）",
        category: "技能培训",
        teacher: "赵老师",
        startDate: "2026-01-08",
        endDate: "2026-04-30",
        attendedHours: 16,
        totalHours: 40,
        progress: 40,
        nextClass: "每周二/四 10:00 · 小班课",
      },
    ] satisfies StudentCurrentCourse[],
  },
]

const domesticWorkers = [
  {
    id: 101,
    name: "李阿姨",
    phone: "138****1234",
    avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    workerType: "月嫂",
    level: "金牌",
    starTitle: "一星月嫂",
    workerStatus: "待岗",
    age: 45,
    hometown: "湖南长沙",
    experience: "8年",
    gender: "女",
    ethnicity: "汉族",
    zodiac: "天蝎座",
    salary: "15800-18800元/26天",
    totalOrders: 28,
    completedOrders: 27,
    available: true,
    type: "domestic" as const,
    scheduleSegments: [
      { kind: "booked" as const, start: { month: 1, day: 11 }, end: { month: 2, day: 10 } },
      { kind: "training" as const, start: { month: 2, day: 11 }, end: { month: 3, day: 8 } },
      { kind: "available" as const, start: { month: 3, day: 9 }, end: { month: 5, day: 18 } },
      { kind: "booked" as const, start: { month: 5, day: 19 }, end: { month: 8, day: 31 } },
    ] satisfies ScheduleOverviewSegment[],
  },
  {
    id: 102,
    name: "张阿姨",
    phone: "139****5678",
    avatar: "/friendly-chinese-caregiver-woman-portrait.jpg",
    workerType: "育婴师",
    level: "银牌",
    starTitle: "二星育婴师",
    workerStatus: "服务中",
    age: 42,
    hometown: "四川成都",
    experience: "5年",
    gender: "女",
    ethnicity: "汉族",
    zodiac: "双子座",
    salary: "10800-12800元/26天",
    totalOrders: 15,
    completedOrders: 14,
    available: false,
    type: "domestic" as const,
    scheduleSegments: [
      { kind: "booked" as const, start: { month: 1, day: 1 }, end: { month: 1, day: 25 } },
      { kind: "available" as const, start: { month: 1, day: 26 }, end: { month: 8, day: 31 } },
    ] satisfies ScheduleOverviewSegment[],
  },
  {
    id: 103,
    name: "王阿姨",
    phone: "137****9012",
    avatar: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    workerType: "月嫂",
    level: "钻石",
    starTitle: "三星月嫂",
    workerStatus: "培训中",
    age: 48,
    hometown: "江西南昌",
    experience: "10年",
    gender: "女",
    ethnicity: "回族",
    zodiac: "巨蟹座",
    salary: "18800-22800元/26天",
    totalOrders: 35,
    completedOrders: 35,
    available: true,
    type: "domestic" as const,
    scheduleSegments: [
      { kind: "training" as const, start: { month: 1, day: 5 }, end: { month: 2, day: 28 } },
      { kind: "available" as const, start: { month: 3, day: 1 }, end: { month: 4, day: 10 } },
      { kind: "booked" as const, start: { month: 4, day: 11 }, end: { month: 8, day: 31 } },
    ] satisfies ScheduleOverviewSegment[],
  },
]

/** 按客户匹配家政员：选择客户后带出意向并参与筛选 */
const matchCustomers = [
  {
    id: "mc1",
    name: "王女士",
    phone: "138****1234",
    intention: "高意向",
    serviceType: "月嫂",
    budget: "15000-18000元/26天",
    dueDate: "2026-03-15",
  },
  {
    id: "mc2",
    name: "李先生",
    phone: "139****5678",
    intention: "中意向",
    serviceType: "育儿嫂",
    budget: "12000-15000元/26天",
    dueDate: "2026-04-20",
  },
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

function scheduleSummaryDays(worker: (typeof domesticWorkers)[0]) {
  if (worker.workerStatus === "服务中") return { idleDays: 0, onJobDays: 26, vacationDays: 0 }
  if (worker.workerStatus === "培训中") return { idleDays: 8, onJobDays: 0, vacationDays: 0 }
  return { idleDays: 3, onJobDays: 0, vacationDays: 0 }
}



function getPersonInfoFields(person: any) {
  if (person.type === "student") {
    return [
      { label: "学员姓名", value: person.name },
      { label: "学号", value: person.studentNo ?? "-" },
      { label: "手机", value: person.phone },
      { label: "微信号", value: person.wechat ?? `wx_${person.name}` },
      { label: "身份证", value: person.idCardMasked ?? "-" },
      { label: "性别", value: person.gender ?? "女" },
      { label: "年龄", value: person.age != null ? `${person.age}岁` : "-" },
      { label: "学历", value: person.education ?? "-" },
      { label: "所在城市", value: person.city ?? "-" },
      { label: "民族", value: "汉族" },
      { label: "客户来源", value: person.source ?? "线上咨询" },
      { label: "职业顾问/教务", value: person.consultant ?? "张顾问" },
      { label: "主修班次", value: person.course },
      { label: "学级", value: person.level },
      { label: "入学时间", value: person.joinDate },
      { label: "整体进度", value: `${person.progress ?? 0}%` },
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
    { label: "家政员星级", value: person.starTitle || `${person.level}${person.workerType}` },
    { label: "状态", value: person.workerStatus || (person.available ? "待岗" : "服务中") },
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
  const [showResumeShare, setShowResumeShare] = useState(false)
  const [resumeShareWorker, setResumeShareWorker] = useState<(typeof domesticWorkers)[0] | null>(null)
  const [selectedMatchCustomer, setSelectedMatchCustomer] = useState<(typeof matchCustomers)[0] | null>(null)
  const [dueDateFilter, setDueDateFilter] = useState("")
  const [showMatchCustomerSheet, setShowMatchCustomerSheet] = useState(false)

  const openPosterShare = (person: (typeof domesticWorkers)[0]) => {
    setPosterPerson(person)
    setShowPoster(true)
  }

  const openResumeShare = (person: (typeof domesticWorkers)[0]) => {
    setResumeShareWorker(person)
    setShowResumeShare(true)
  }

  const filteredStudents = students
    .filter(s => activeFilter === "all" || s.status === activeFilter)
    .filter(
      s =>
        !searchQuery ||
        s.name.includes(searchQuery) ||
        s.phone.includes(searchQuery) ||
        (s.studentNo && s.studentNo.includes(searchQuery)) ||
        (s.city && s.city.includes(searchQuery)),
    )

  const filteredWorkers = domesticWorkers
    .filter((w) => {
      if (selectedMatchCustomer) {
        if (selectedMatchCustomer.serviceType.includes("月嫂") && w.workerType !== "月嫂") return false
        if (selectedMatchCustomer.serviceType.includes("育儿") && w.workerType !== "育婴师") return false
      }
      return true
    })
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
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v as "student" | "domestic")
            setActiveFilter("all")
            if (v !== "domestic") {
              setSelectedMatchCustomer(null)
              setDueDateFilter("")
            }
          }}
        >
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
          <Input
            placeholder="搜索姓名、手机、学号或城市"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>

        {activeTab === "domestic" && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={selectedMatchCustomer ? "default" : "outline"}
                className="h-8 text-[11px] bg-violet-500 hover:bg-violet-600 text-white"
                onClick={() => setShowMatchCustomerSheet(true)}
              >
                <Users className="w-3.5 h-3.5 mr-1" />
                {selectedMatchCustomer ? `已选：${selectedMatchCustomer.name}` : "选择匹配客户"}
              </Button>
              {selectedMatchCustomer && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 text-[10px] text-muted-foreground"
                  onClick={() => {
                    setSelectedMatchCustomer(null)
                    setDueDateFilter("")
                  }}
                >
                  清除客户
                </Button>
              )}
            </div>
            {selectedMatchCustomer && (
              <div className="rounded-lg border border-dashed border-violet-300 bg-violet-50/80 px-2.5 py-2 text-[10px] leading-relaxed text-foreground">
                <span className="font-medium text-violet-800">自动匹配 · 客户意向：</span>
                {selectedMatchCustomer.intention} · {selectedMatchCustomer.serviceType} · 预算 {selectedMatchCustomer.budget}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground shrink-0 whitespace-nowrap">预产期</span>
              <Input
                type="date"
                className="h-8 flex-1 text-[11px]"
                value={dueDateFilter}
                onChange={(e) => setDueDateFilter(e.target.value)}
              />
            </div>
          </div>
        )}

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
          <SheetContent side="right" className="flex min-h-0 flex-col py-0">
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

        <Sheet open={showMatchCustomerSheet} onOpenChange={setShowMatchCustomerSheet}>
          <SheetContent side="right" className="flex min-h-0 flex-col py-0">
            <div className="space-y-3 p-4">
              <SheetTitle className="text-sm">选择客户</SheetTitle>
              <p className="text-[11px] text-muted-foreground">选择后将带出客户意向，并用于自动匹配家政员筛选</p>
              <div className="space-y-2">
                {matchCustomers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="w-full rounded-lg border border-border p-3 text-left text-xs transition-colors hover:bg-muted/50"
                    onClick={() => {
                      setSelectedMatchCustomer(c)
                      setDueDateFilter(c.dueDate)
                      setShowMatchCustomerSheet(false)
                    }}
                  >
                    <p className="font-semibold text-foreground">
                      {c.name}{" "}
                      <span className="font-normal text-muted-foreground">{c.phone}</span>
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {c.intention} · {c.serviceType} · 预算 {c.budget}
                    </p>
                    <p className="mt-0.5 text-[10px] text-primary">预产期 {c.dueDate}</p>
                  </button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {activeTab === "student" && filteredStudents.map((student) => (
          <Card key={student.id} className="border-0 shadow-sm cursor-pointer" onClick={() => openDetail(student)}>
            <CardContent className="p-3">
              <div className="flex items-start gap-2.5 mb-2">
                <Avatar className="w-9 h-9 shrink-0">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-[10px]">{student.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="font-semibold text-xs">{student.name}</h3>
                    <Badge className={`text-[9px] px-1.5 py-0 ${getStatusColor(student.status)}`}>{student.status}</Badge>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-muted-foreground/30">
                      {student.level}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5">
                      <User className="h-3 w-3 shrink-0 opacity-70" />
                      {student.age}岁 · {student.gender}
                    </span>
                    <span className="text-border">|</span>
                    <span>{student.city}</span>
                    <span className="text-border">|</span>
                    <span>{student.consultant}</span>
                  </div>
                  <p className="mt-1 font-mono text-[9px] text-muted-foreground">学号 {student.studentNo}</p>
                </div>
                <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </div>

              <div className="border-border/60 bg-muted/30 mb-2 space-y-2 rounded-lg border px-2 py-2">
                <div className="flex items-center gap-1 text-[10px] font-semibold text-foreground">
                  <BookOpen className="h-3 w-3 text-primary" />
                  在学课程
                </div>
                <div className="space-y-2">
                  {student.currentCourses.map((c) => (
                    <div key={c.name} className="rounded-md border border-border/50 bg-background/80 px-2 py-1.5">
                      <p className="text-[11px] font-medium leading-snug text-foreground">{c.name}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {c.teacher} · {c.attendedHours}/{c.totalHours} 课时
                        {c.nextClass ? ` · ${c.nextClass}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <span className="shrink-0 text-[10px] text-muted-foreground">整体进度</span>
                <Progress value={student.progress} className="h-1.5 flex-1" />
                <span className="shrink-0 text-[10px] font-medium tabular-nums">{student.progress}%</span>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-border/50">
                <Button size="sm" variant="outline" className="flex-1 text-[10px] h-6 bg-transparent" onClick={e => e.stopPropagation()}>
                  <Briefcase className="w-3 h-3 mr-0.5" />转为家政员
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {activeTab === "domestic" && filteredWorkers.map((worker) => (
          <Card
            key={worker.id}
            className="cursor-pointer border-0 shadow-sm ring-1 ring-border/40"
            onClick={() => openDetail(worker)}
          >
            <CardContent className="space-y-0 px-3.5 py-4">
              <div className="flex gap-3">
                <Avatar className="h-11 w-11 shrink-0 ring-1 ring-border/50">
                  <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{worker.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug text-foreground">{worker.name}</h3>
                    <Badge
                      className={`shrink-0 text-[10px] font-normal ${worker.available ? "bg-teal-100 text-teal-800" : "bg-muted text-muted-foreground"}`}
                    >
                      {worker.workerStatus}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      variant="outline"
                      className="border-primary/35 px-2 py-0 text-[10px] font-normal text-primary"
                    >
                      {worker.starTitle}
                    </Badge>
                    <Badge className={`px-2 py-0 text-[10px] font-normal ${getLevelColor(worker.level)}`}>
                      {worker.level}
                      {worker.workerType}
                    </Badge>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {worker.age}岁 · {worker.hometown} · {worker.experience}
                  </p>
                  <p className="text-sm font-bold tabular-nums text-primary">{worker.salary}</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-border/50 bg-muted/15 px-3 py-2">
                <ScheduleOverviewBar year={2026} segments={worker.scheduleSegments} density="compact" />
              </div>

              <div className="mt-2 space-y-1.5 border-t border-border/45 pt-2">
                <div className="flex items-stretch justify-center">
                  <div className="min-w-0 flex-1 px-0.5 text-center">
                    <p className="text-sm font-bold tabular-nums leading-none text-foreground">{worker.totalOrders}</p>
                    <p className="mt-1 text-[10px] leading-none text-muted-foreground">派单</p>
                  </div>
                  <div className="my-0.5 w-px shrink-0 bg-border/50" aria-hidden />
                  <div className="min-w-0 flex-1 px-0.5 text-center">
                    <p className="text-sm font-bold tabular-nums leading-none text-foreground">{worker.completedOrders}</p>
                    <p className="mt-1 text-[10px] leading-none text-muted-foreground">完成</p>
                  </div>
                  <div className="my-0.5 w-px shrink-0 bg-border/50" aria-hidden />
                  <div className="min-w-0 flex-1 px-0.5 text-center">
                    <p className="truncate text-xs font-semibold leading-none text-teal-600">{worker.workerStatus}</p>
                    <p className="mt-1 text-[10px] leading-none text-muted-foreground">状态</p>
                  </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-full rounded-md border-border/60 bg-background text-[11px] font-medium"
                      >
                        <Share2 className="mr-1 h-3 w-3 shrink-0" />
                        分享
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        className="text-xs"
                        onSelect={() => openPosterShare(worker)}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        海报分享
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-xs"
                        onSelect={() => openResumeShare(worker)}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        简历分享
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
            tags: [posterPerson.level, posterPerson.workerType, posterPerson.workerStatus],
            avatar: posterPerson.avatar,
            reviews: posterPerson.totalOrders,
          }}
        />
      )}

      <Sheet open={showResumeShare} onOpenChange={setShowResumeShare}>
        <SheetContent
          side="right"
          className="flex h-dvh max-h-dvh w-full max-w-md flex-col gap-0 overflow-hidden p-0"
        >
          <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
            <SheetTitle className="text-base font-semibold">简历分享</SheetTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowResumeShare(false)}
              aria-label="关闭"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {resumeShareWorker && (
              <NannyResumeShareView data={domesticWorkerToResumeData(resumeShareWorker)} />
            )}
          </div>
          <div className="border-border bg-background shrink-0 space-y-2 border-t p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <p className="text-muted-foreground text-center text-[10px]">
              预览内容与「客户详情 · 家政员档案 · 简历」一致
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-9 flex-1 text-xs"
                onClick={() => {
                  void navigator.clipboard?.writeText(
                    `https://youhou.com/share/resume/${resumeShareWorker?.id ?? "xxx"}`,
                  )
                }}
              >
                复制链接
              </Button>
              <Button
                type="button"
                className="h-9 flex-1 bg-primary text-xs text-primary-foreground hover:bg-primary/90"
                onClick={() => alert("正在打开微信分享…")}
              >
                分享到微信
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <SheetContent side="right" className="flex h-full w-[90vw] max-w-md flex-col bg-background py-0">
          <SheetTitle className="sr-only">人才详情</SheetTitle>
          <div className="flex h-full flex-col">
            {!selectedPerson ? null : selectedPerson.type === "domestic" ? (
              <>
                <div className="shrink-0 px-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 ring-2 ring-rose-100 ring-offset-2 ring-offset-background">
                      <AvatarImage src={selectedPerson.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-sm">{selectedPerson.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-foreground">{selectedPerson.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedPerson.starTitle} · {selectedPerson.level}
                        {selectedPerson.workerType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 px-4 pt-3">
                  <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-rose-50/95 to-pink-50/70 px-4 py-3.5 shadow-sm">
                    <p className="text-[10px] font-medium text-rose-900/65">家政员档案</p>
                    <p className="mt-0.5 text-lg font-bold tracking-tight text-rose-950">{selectedPerson.name}</p>
                    <p className="mt-1.5 text-xs text-rose-900/85">
                      {selectedPerson.workerType} · {selectedPerson.level} · {selectedPerson.workerStatus}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-medium text-rose-900 shadow-sm ring-1 ring-rose-100/80">
                        {selectedPerson.starTitle}
                      </span>
                      <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-medium text-rose-900/90 shadow-sm ring-1 ring-rose-100/60">
                        {selectedPerson.salary}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 border-b border-border px-4 pb-2 pt-3">
                  <div className="flex gap-0.5 overflow-x-auto rounded-xl bg-muted/45 p-1">
                    {[
                      { id: "info", label: "基本信息" },
                      { id: "resume", label: "简历" },
                      { id: "schedule", label: "档期" },
                      { id: "rating", label: "等级" },
                      { id: "records", label: "服务" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDetailTab(t.id)}
                        className={cn(
                          "h-8 shrink-0 whitespace-nowrap rounded-lg px-3 text-xs transition-all",
                          detailTab === t.id
                            ? "bg-background font-semibold text-foreground shadow-sm"
                            : "font-normal text-muted-foreground",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="border-border shrink-0 border-b px-4 pb-2.5 pt-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={selectedPerson?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-[10px]">{selectedPerson?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold">{selectedPerson?.name}</h3>
                      <p className="text-[11px] text-muted-foreground">
                        {[selectedPerson?.studentNo, selectedPerson?.course, selectedPerson?.consultant]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 px-4 pt-2">
                  <div className="grid h-8 grid-cols-4 gap-0.5 rounded-lg bg-muted/50 p-0.5">
                    {[
                      { id: "info", label: "基本信息" },
                      { id: "course", label: "在学课程" },
                      { id: "exam", label: "成绩" },
                      { id: "cert", label: "证书" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDetailTab(t.id)}
                        className={cn(
                          "h-7 rounded-md text-xs transition-colors",
                          detailTab === t.id ? "bg-background font-semibold text-foreground shadow-sm" : "text-muted-foreground",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedPerson && (
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                {selectedPerson?.type === "student" ? (
                  <>
                    {detailTab === "info" && (
                      <div className="space-y-3">
                        {infoFields.map((item) => (
                          <div key={item.label} className="drawer-kv-row">
                            <span className="text-muted-foreground text-xs leading-snug">{item.label}</span>
                            <p className="break-words text-xs font-medium leading-relaxed text-foreground">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {detailTab === "course" && Array.isArray(selectedPerson.currentCourses) && (
                      <div className="space-y-3">
                        {selectedPerson.currentCourses.map((c: StudentCurrentCourse) => (
                          <Card key={c.name} className="border border-border shadow-sm">
                            <CardContent className="space-y-2 p-3">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold leading-snug">{c.name}</p>
                                <Badge variant="secondary" className="shrink-0 text-[9px]">
                                  {c.category}
                                </Badge>
                              </div>
                              <p className="text-[10px] text-muted-foreground">授课老师：{c.teacher}</p>
                              <p className="text-[10px] text-muted-foreground">
                                开课 {c.startDate} — 结课 {c.endDate}
                              </p>
                              {c.nextClass ? (
                                <p className="text-[10px] font-medium text-primary">下次课：{c.nextClass}</p>
                              ) : null}
                              <div>
                                <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                                  <span>学习进度</span>
                                  <span className="tabular-nums">
                                    {c.attendedHours}/{c.totalHours} 课时（{c.progress}%）
                                  </span>
                                </div>
                                <Progress value={c.progress} className="h-1.5" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
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
                      <div className="space-y-3">
                        {infoFields.map((item) => (
                          <div key={item.label} className="drawer-kv-row">
                            <span className="text-muted-foreground text-xs leading-snug">{item.label}</span>
                            <p className="break-words text-xs font-medium leading-relaxed text-foreground">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {detailTab === "resume" && selectedPerson?.type === "domestic" && (
                      <div className="space-y-3">
                        <NannyResumeShareView
                          data={domesticWorkerToResumeData(selectedPerson)}
                          dense
                        />
                        <div className="border-border space-y-2 border-t pt-3">
                          <p className="text-muted-foreground text-center text-[10px]">分享方式</p>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="h-9 flex-1 text-xs"
                              onClick={() => openPosterShare(selectedPerson)}
                            >
                              <ImageIcon className="mr-1 h-3.5 w-3.5" />
                              海报分享
                            </Button>
                            <Button
                              type="button"
                              className="h-9 flex-1 bg-primary text-xs text-primary-foreground hover:bg-primary/90"
                              onClick={() => openResumeShare(selectedPerson)}
                            >
                              <FileText className="mr-1 h-3.5 w-3.5" />
                              简历分享
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {detailTab === "schedule" && selectedPerson?.type === "domestic" && (
                      <NannyScheduleTabContent
                        segments={selectedPerson.scheduleSegments}
                        year={2026}
                        {...scheduleSummaryDays(selectedPerson)}
                        currentStatus={selectedPerson.workerStatus}
                        statusHint={resolveScheduleStatusHint(selectedPerson.workerStatus)}
                        bannerTone={resolveScheduleBannerTone(selectedPerson.workerStatus)}
                        bookings={[
                          { id: "b1", name: "张女士", range: "2026-03-20 ~ 2026-04-20", st: "已确认" },
                          { id: "b2", name: "李女士", range: "2026-04-25 ~ 2026-05-25", st: "待确认" },
                        ]}
                      />
                    )}
                    {detailTab === "rating" && selectedPerson?.type === "domestic" && (
                      <div className="space-y-2">
                        <Card className="border-0 shadow-sm">
                          <CardContent className="p-3 space-y-2">
                            <p className="text-[10px] text-muted-foreground">家政员星级</p>
                            <p className="text-sm font-semibold">{selectedPerson.starTitle}</p>
                            <p className="text-[10px] text-muted-foreground">
                              等级类型：{selectedPerson.level}
                              {selectedPerson.workerType}
                            </p>
                            <p className="text-[10px] text-muted-foreground">当前状态：{selectedPerson.workerStatus}</p>
                          </CardContent>
                        </Card>
                        <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                          <p className="text-xs font-semibold text-amber-900 mb-1">等级调整记录</p>
                          <p className="text-[10px] text-amber-700">晋升为{selectedPerson.level}</p>
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
