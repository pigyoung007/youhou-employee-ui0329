"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen, Play, Clock, CheckCircle2, Circle, Award, Star, Lock,
  ChevronRight, AlertCircle, Briefcase, GraduationCap, FileText,
} from "lucide-react"

// Courses data from student learning-page
const myCourses = [
  { id: 1, name: "高级母婴护理师", progress: 75, totalHours: 120, completedHours: 90, subjects: [
    { name: "新生儿护理基础", progress: 100, completed: true },
    { name: "母乳喂养指导", progress: 100, completed: true },
    { name: "产妇身体恢复", progress: 80, completed: false },
    { name: "新生儿常见疾病", progress: 40, completed: false },
    { name: "心理疏导技巧", progress: 0, completed: false },
  ]},
  { id: 2, name: "催乳师专项培训", progress: 30, totalHours: 60, completedHours: 18, subjects: [
    { name: "乳房解剖与生理", progress: 100, completed: true },
    { name: "催乳手法实操", progress: 50, completed: false },
    { name: "常见问题处理", progress: 0, completed: false },
  ]},
  { id: 3, name: "产后康复技能", progress: 10, totalHours: 80, completedHours: 8, subjects: [
    { name: "产后康复概论", progress: 60, completed: false },
    { name: "骨盆修复技术", progress: 0, completed: false },
    { name: "腹直肌修复", progress: 0, completed: false },
    { name: "盆底肌康复训练", progress: 0, completed: false },
  ]},
]

const allCourses = [
  { id: 1, name: "高级母婴护理师", purchased: true, price: 3980 },
  { id: 2, name: "催乳师专项培训", purchased: true, price: 2680 },
  { id: 3, name: "产后康复技能", purchased: true, price: 3280 },
  { id: 4, name: "育婴师（高级）", purchased: false, price: 4580 },
  { id: 5, name: "营养师基础课程", purchased: false, price: 1980 },
  { id: 6, name: "小儿推拿培训", purchased: false, price: 2280 },
]

// Certificates from student certificate-page
const obtainedCerts = [
  { id: 1, name: "母婴护理师（高级）", level: "高级", certNo: "MYH-2024-001234", issuer: "人力资源和社会保障部", issueDate: "2024-03-15", validUntil: "2027-03-15" },
  { id: 2, name: "催乳师（中级）", level: "中级", certNo: "CRS-2024-005678", issuer: "中国保健协会", issueDate: "2024-06-20", validUntil: "2027-06-20" },
]

const pendingCerts = [
  { id: 3, name: "育婴师（高级）", level: "高级", requirements: ["完成育婴师课程学习", "通过理论考试(85分以上)", "完成实操考核"] },
  { id: 4, name: "营养师", level: "初级", requirements: ["完成营养师基础课程", "通过在线考试"] },
]

const upcomingExams = [
  { id: 1, name: "产后康复师理论考试", examDate: "2025-03-20", examTime: "09:00-11:00", location: "银川培训中心A教室" },
]

// Transform conditions from student learning-page
const transformConditions = [
  { id: 1, name: "完成至少一门专业课程", passed: true },
  { id: 2, name: "获得至少一项职业证书", passed: true },
  { id: 3, name: "通过面试评估", passed: true },
  { id: 4, name: "提交健康证明", passed: false },
  { id: 5, name: "完成背景调查", passed: false },
]

// Student benefits
const benefits = [
  { title: "免费复训", desc: "毕业学员可免费参加同课程复训1次" },
  { title: "就业推荐", desc: "优秀学员优先推荐上岗就业" },
  { title: "证书补贴", desc: "考取指定证书可享受培训费用补贴" },
  { title: "保险赠送", desc: "上岗后公司赠送人身意外保险" },
]

export function TalentLearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<(typeof myCourses)[0] | null>(null)
  const [showAllCourses, setShowAllCourses] = useState(false)
  const [selectedCert, setSelectedCert] = useState<(typeof obtainedCerts)[0] | null>(null)
  const [selectedPending, setSelectedPending] = useState<(typeof pendingCerts)[0] | null>(null)
  const [showTransform, setShowTransform] = useState(false)
  const [showCareerDev, setShowCareerDev] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 pt-4 pb-4 px-4 safe-area-top">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">学习中心</h1>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setShowAllCourses(true)}>
            课程目录
          </Button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-4 pb-24">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 h-9">
            <TabsTrigger value="courses" className="text-xs">我的课程</TabsTrigger>
            <TabsTrigger value="certs" className="text-xs">我的证书</TabsTrigger>
            <TabsTrigger value="exams" className="text-xs">考试安排</TabsTrigger>
            <TabsTrigger value="benefits" className="text-xs">学员权益</TabsTrigger>
          </TabsList>

          {/* My Courses */}
          <TabsContent value="courses" className="mt-4 space-y-3">
            {myCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedCourse(course)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{course.name}</h3>
                    <Badge className={`text-[10px] ${course.progress >= 80 ? "bg-green-100 text-green-700" : course.progress >= 50 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                      {course.progress >= 100 ? "已完成" : "学习中"}
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>已学 {course.completedHours}/{course.totalHours} 课时</span>
                    <span className="font-medium text-amber-600">{course.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Career Transform */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-teal-500 to-teal-600 cursor-pointer" onClick={() => setShowTransform(true)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">申请转为家政员</h3>
                    <p className="text-xs text-white/80 mt-0.5">完成审核后开启接单之旅</p>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Certificates */}
          <TabsContent value="certs" className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                已获得证书
              </h3>
              <div className="space-y-2">
                {obtainedCerts.map((cert) => (
                  <Card key={cert.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedCert(cert)}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">有效期至 {cert.validUntil}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                待获取证书
              </h3>
              <div className="space-y-2">
                {pendingCerts.map((cert) => (
                  <Card key={cert.id} className="border-0 shadow-sm opacity-80 cursor-pointer" onClick={() => setSelectedPending(cert)}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground">{cert.level}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">查看条件</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Exams */}
          <TabsContent value="exams" className="mt-4 space-y-3">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="border-0 shadow-sm border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground">{exam.name}</h4>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exam.examDate} {exam.examTime}</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{exam.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {upcomingExams.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>暂无考试安排</p>
              </div>
            )}
          </TabsContent>

          {/* Benefits */}
          <TabsContent value="benefits" className="mt-4 space-y-3">
            {benefits.map((b, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{b.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Course Detail Sheet */}
      <Sheet open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">{selectedCourse?.name}</SheetTitle>
          </SheetHeader>
          <div className="py-3 space-y-3 overflow-y-auto h-[calc(70vh-80px)]">
            <div className="bg-amber-50 rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-14 h-14 -rotate-90">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#fde68a" strokeWidth="4" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#f59e0b" strokeWidth="4"
                    strokeDasharray={`${(selectedCourse?.progress || 0) * 1.508} 150.8`}
                    strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-amber-600">
                  {selectedCourse?.progress}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">学习进度</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  已学 {selectedCourse?.completedHours}/{selectedCourse?.totalHours} 课时
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-2">课程章节</h3>
              <div className="space-y-2">
                {selectedCourse?.subjects.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 bg-muted/40 rounded-xl">
                    {s.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <Progress value={s.progress} className="h-1 mt-1.5" />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 w-8 text-right">{s.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
              <Play className="w-4 h-4 mr-1" />
              继续学习
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* All Courses Sheet */}
      <Sheet open={showAllCourses} onOpenChange={setShowAllCourses}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>课程目录</SheetTitle></SheetHeader>
          <div className="py-4 space-y-3 overflow-y-auto h-[calc(75vh-100px)]">
            {allCourses.map((c) => (
              <Card key={c.id} className={`border-0 shadow-sm ${c.purchased ? "" : "opacity-70"}`}>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.purchased ? <span className="text-teal-600">已购买</span> : <span>¥{c.price}</span>}</p>
                  </div>
                  {c.purchased ? <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-[10px]">已购</Badge> : <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">了解详情</Button>}
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Certificate Detail */}
      <Sheet open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[65vh] rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border"><SheetTitle className="text-base">证书详情</SheetTitle></SheetHeader>
          {selectedCert && (
            <div className="py-3 space-y-3 overflow-y-auto">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-200">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-2"><Award className="w-6 h-6 text-white" /></div>
                <h3 className="text-base font-bold text-foreground">{selectedCert.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedCert.level}</p>
              </div>
              <div className="space-y-0">
                {[
                  { l: "证书编号", v: selectedCert.certNo },
                  { l: "发证机构", v: selectedCert.issuer },
                  { l: "发证日期", v: selectedCert.issueDate },
                  { l: "有效期至", v: selectedCert.validUntil },
                ].map((item) => (
                  <div key={item.l} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                    <span className="text-xs text-muted-foreground">{item.l}</span>
                    <span className="text-xs font-medium text-foreground">{item.v}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-transparent" variant="outline" size="sm">下载证书</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Pending Certificate Conditions */}
      <Sheet open={!!selectedPending} onOpenChange={() => setSelectedPending(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[55vh] rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border"><SheetTitle className="text-base">获取条件</SheetTitle></SheetHeader>
          {selectedPending && (
            <div className="py-3 space-y-3 overflow-y-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0"><Lock className="w-5 h-5 text-gray-400" /></div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{selectedPending.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedPending.level}</p>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs font-medium text-amber-800 mb-2">获取条件：</p>
                <div className="space-y-1.5">
                  {selectedPending.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-amber-700">
                      <div className="w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-[10px] font-medium shrink-0">{i + 1}</div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-teal-500 hover:bg-teal-600" size="sm">开始学习</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Transform Sheet */}
      <Sheet open={showTransform} onOpenChange={setShowTransform}>
        <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border"><SheetTitle className="text-base">申请转为家政员</SheetTitle></SheetHeader>
          <div className="py-3 space-y-3 overflow-y-auto max-h-[calc(70vh-100px)]">
            <div className="bg-teal-50 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-teal-700">审核通过后，系统将自动创建您的家政档案，您可以开始接单服务。</p>
              </div>
            </div>
            <div className="space-y-2">
              {transformConditions.map((c) => (
                <div key={c.id} className="flex items-center gap-2.5 p-2.5 bg-muted/40 rounded-xl">
                  {c.passed ? <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-muted-foreground shrink-0" />}
                  <span className={`text-sm ${c.passed ? "text-foreground" : "text-muted-foreground"}`}>{c.name}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground text-center mb-2">已完成 {transformConditions.filter(c => c.passed).length}/{transformConditions.length} 项条件</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-600" size="sm" disabled={!transformConditions.every(c => c.passed)}>
                {transformConditions.every(c => c.passed) ? "提交转型申请" : "条件未满足"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
