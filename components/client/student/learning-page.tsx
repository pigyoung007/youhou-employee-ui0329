"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  BookOpen,
  Play,
  Clock,
  Award,
  ChevronRight,
  CheckCircle2,
  Circle,
  Star,
  Briefcase,
  Bell,
  X,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"

// 模拟课程数据
const courses = [
  {
    id: 1,
    name: "母婴护理师（初级）",
    totalLessons: 24,
    completedLessons: 18,
    progress: 75,
    status: "learning",
    image: "/baby-sleeping-peacefully.jpg",
    subjects: [
      { name: "新生儿护理基础", progress: 100, completed: true },
      { name: "母乳喂养指导", progress: 100, completed: true },
      { name: "产妇护理技能", progress: 60, completed: false },
      { name: "婴儿辅食制作", progress: 0, completed: false },
    ],
  },
  {
    id: 2,
    name: "催乳师专项培训",
    totalLessons: 16,
    completedLessons: 16,
    progress: 100,
    status: "completed",
    image: "/cute-baby-playing.jpg",
    subjects: [
      { name: "乳房解剖学基础", progress: 100, completed: true },
      { name: "催乳按摩手法", progress: 100, completed: true },
      { name: "常见问题处理", progress: 100, completed: true },
    ],
  },
  {
    id: 3,
    name: "产后康复师认证",
    totalLessons: 32,
    completedLessons: 0,
    progress: 0,
    status: "not_started",
    image: "/experienced-chinese-maternity-nurse-woman-portrait.jpg",
    subjects: [
      { name: "产后生理变化", progress: 0, completed: false },
      { name: "盆底肌康复", progress: 0, completed: false },
      { name: "腹直肌修复", progress: 0, completed: false },
      { name: "体态调整训练", progress: 0, completed: false },
    ],
  },
]

// 全部课程列表
const allCourses = [
  { id: 1, name: "母婴护理师（初级）", price: 2980, purchased: true },
  { id: 2, name: "催乳师专项培训", price: 1980, purchased: true },
  { id: 3, name: "产后康复师认证", price: 3980, purchased: true },
  { id: 4, name: "育婴师（中级）", price: 3580, purchased: false },
  { id: 5, name: "小儿推拿师", price: 2580, purchased: false },
  { id: 6, name: "营养师基础", price: 1580, purchased: false },
]

// 职业发展证书
const certificates = [
  { id: 1, name: "母婴护理师证书", obtained: true, icon: "baby" },
  { id: 2, name: "催乳师证书", obtained: true, icon: "heart" },
  { id: 3, name: "产后康复师证书", obtained: false, icon: "flower" },
  { id: 4, name: "育婴师证书", obtained: false, icon: "star" },
]

// 转型条件
const transformConditions = [
  { id: 1, name: "完成至少一门课程学习", passed: true },
  { id: 2, name: "获得至少一项职业证书", passed: true },
  { id: 3, name: "通过平台考核", passed: true },
  { id: 4, name: "提交个人简历资料", passed: false },
  { id: 5, name: "完成入职培训", passed: false },
]

export function StudentLearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)
  const [showAllCourses, setShowAllCourses] = useState(false)
  const [showCareerDev, setShowCareerDev] = useState(false)
  const [showTransform, setShowTransform] = useState(false)

  const totalProgress = Math.round(
    courses.reduce((acc, c) => acc + c.progress, 0) / courses.length
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">学习中心</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Learning Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/80">整体学习进度</span>
            <span className="text-lg font-bold">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2 bg-white/20" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-xs text-white/70">报名课程</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{courses.filter(c => c.status === "completed").length}</p>
              <p className="text-xs text-white/70">已完成</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-white/70">已获证书</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Card 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowAllCourses(true)}
          >
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-xs font-medium text-foreground">课程目录</p>
            </CardContent>
          </Card>
          <Card 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowCareerDev(true)}
          >
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-medium text-foreground">职业发展</p>
            </CardContent>
          </Card>
          <Card 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowTransform(true)}
          >
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                <Briefcase className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-xs font-medium text-foreground">申请转型</p>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">我的课程</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs" onClick={() => setShowAllCourses(true)}>
              查看全部
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className="border-0 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCourse(course)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                      {course.status === "completed" && (
                        <div className="absolute inset-0 bg-teal-500/80 flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-sm text-foreground line-clamp-1">{course.name}</h3>
                        <Badge 
                          variant="secondary" 
                          className={
                            course.status === "completed" 
                              ? "bg-teal-100 text-teal-700 text-[10px]" 
                              : course.status === "learning"
                              ? "bg-amber-100 text-amber-700 text-[10px]"
                              : "bg-gray-100 text-gray-600 text-[10px]"
                          }
                        >
                          {course.status === "completed" ? "已完成" : course.status === "learning" ? "学习中" : "未开始"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {course.completedLessons}/{course.totalLessons} 课时
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Learning */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">继续学习</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-teal-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-foreground">产妇护理技能</h3>
                  <p className="text-xs text-muted-foreground">第12节：产后情绪护理</p>
                </div>
                <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                  继续
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  上次学习：2小时前
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  进度：60%
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Course Detail Sheet */}
      <Sheet open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>{selectedCourse?.name}</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4 overflow-y-auto h-[calc(80vh-80px)]">
            {/* Progress Overview */}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">课程进度</span>
                <span className="text-lg font-bold text-foreground">{selectedCourse?.progress}%</span>
              </div>
              <Progress value={selectedCourse?.progress || 0} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                已完成 {selectedCourse?.completedLessons}/{selectedCourse?.totalLessons} 课时
              </p>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">科目列表</h3>
              <div className="space-y-3">
                {selectedCourse?.subjects.map((subject, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        {subject.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-teal-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{subject.name}</p>
                          <Progress value={subject.progress} className="h-1 mt-2" />
                        </div>
                        <span className="text-xs text-muted-foreground">{subject.progress}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Course Intro */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">课程介绍</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                本课程涵盖母婴护理的核心技能，包括新生儿日常护理、喂养指导、产妇身体恢复、
                心理疏导等内容。通过系统学习，您将掌握专业的母婴护理知识和实操技能。
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* All Courses Sheet */}
      <Sheet open={showAllCourses} onOpenChange={setShowAllCourses}>
        <SheetContent side="right" className="w-[85vw] max-w-sm">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>课程目录</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-3 overflow-y-auto h-[calc(100vh-100px)]">
            {allCourses.map((course) => (
              <Card key={course.id} className={`border-0 shadow-sm ${course.purchased ? "" : "opacity-70"}`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-foreground">{course.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {course.purchased ? (
                          <span className="text-teal-600">已购买</span>
                        ) : (
                          <span>¥{course.price}</span>
                        )}
                      </p>
                    </div>
                    {course.purchased ? (
                      <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-[10px]">
                        已购
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                        了解详情
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Career Development Sheet */}
      <Sheet open={showCareerDev} onOpenChange={setShowCareerDev}>
        <SheetContent side="right" className="w-[85vw] max-w-sm">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>职业发展</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4 overflow-y-auto h-[calc(100vh-100px)]">
            <p className="text-sm text-muted-foreground">
              完成课程学习并通过考试，即可获得对应的职业证书，开启职业发展之路。
            </p>
            
            <div className="space-y-3">
              {certificates.map((cert) => (
                <Card 
                  key={cert.id} 
                  className={`border-0 shadow-sm ${cert.obtained ? "" : "opacity-60"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        cert.obtained 
                          ? "bg-gradient-to-br from-amber-100 to-orange-50" 
                          : "bg-gray-100"
                      }`}>
                        <Award className={`w-6 h-6 ${cert.obtained ? "text-amber-500" : "text-gray-400"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-foreground">{cert.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {cert.obtained ? "已获得" : "待获取"}
                        </p>
                      </div>
                      {cert.obtained && (
                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      )}
                    </div>
                    {!cert.obtained && (
                      <Button size="sm" variant="outline" className="w-full mt-3 text-xs bg-transparent">
                        查看获取条件
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Transform Application Sheet */}
      <Sheet open={showTransform} onOpenChange={setShowTransform}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>申请转型为阿姨</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4 overflow-y-auto h-[calc(70vh-140px)]">
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">转型说明</p>
                  <p className="text-xs text-amber-700 mt-1">
                    完成以下条件后，您可以申请转型为家政从业者，开始接单服务。
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {transformConditions.map((condition) => (
                <Card key={condition.id} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      {condition.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${condition.passed ? "text-foreground" : "text-muted-foreground"}`}>
                        {condition.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-xs text-muted-foreground text-center mb-3">
                已完成 {transformConditions.filter(c => c.passed).length}/{transformConditions.length} 项条件
              </p>
              <Button 
                className="w-full bg-teal-500 hover:bg-teal-600"
                disabled={!transformConditions.every(c => c.passed)}
              >
                {transformConditions.every(c => c.passed) ? "提交转型申请" : "条件未满足"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
