"use client"

import { useState } from "react"
import { Award, Clock, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TechnicianLearningPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "exams" | "certificates">("courses")

  const courses = [
    {
      id: 1,
      title: "产后修复基础知识",
      category: "基础课程",
      progress: 100,
      lessons: 12,
      completedLessons: 12,
      duration: "8小时",
      instructor: "李医生",
      certificate: true,
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      id: 2,
      title: "骨盆修复技能实操",
      category: "实操课程",
      progress: 65,
      lessons: 10,
      completedLessons: 6,
      duration: "10小时",
      instructor: "王技师",
      certificate: false,
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      id: 3,
      title: "产后康养方案设计",
      category: "进阶课程",
      progress: 30,
      lessons: 15,
      completedLessons: 5,
      duration: "12小时",
      instructor: "陈主任",
      certificate: false,
      image: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      id: 4,
      title: "客户沟通与服务",
      category: "技能课程",
      progress: 0,
      lessons: 8,
      completedLessons: 0,
      duration: "6小时",
      instructor: "刘老师",
      certificate: false,
      image: "bg-gradient-to-br from-teal-400 to-teal-600",
      locked: true,
    },
  ]

  const exams = [
    {
      id: 1,
      title: "产后修复理论考试",
      status: "completed",
      score: 92,
      passScore: 80,
      date: "2024-03-20",
      duration: 60,
    },
    {
      id: 2,
      title: "骨盆修复实操考试",
      status: "pending",
      date: "2024-04-10",
      duration: 90,
    },
    {
      id: 3,
      title: "高级康复方案考试",
      status: "locked",
      date: "待开放",
      duration: 120,
    },
  ]

  const certificates = [
    {
      id: 1,
      title: "产后修复技能证书",
      issuer: "优厚家庭服务",
      date: "2024-03-20",
      expiryDate: "2026-03-20",
      level: "中级",
    },
    {
      id: 2,
      title: "产康咨询师证书",
      issuer: "中国产后康复协会",
      date: "2023-06-15",
      level: "高级",
    },
  ]

  const stats = {
    learningHours: "32小时",
    coursesCompleted: 1,
    totalCourses: 4,
    certificatesEarned: 2,
    nextExam: "2024-04-10",
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background pb-20">
      <header className="shrink-0 border-b border-border bg-background px-3 pb-2 pt-3">
        <h1 className="text-base font-bold text-foreground">学习中心</h1>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <Card className="border border-border/70 shadow-none">
            <CardContent className="px-2 py-1.5 text-center">
              <p className="text-[10px] text-muted-foreground">学习时长</p>
              <p className="text-sm font-bold text-primary">{stats.learningHours}</p>
            </CardContent>
          </Card>
          <Card className="border border-border/70 shadow-none">
            <CardContent className="px-2 py-1.5 text-center">
              <p className="text-[10px] text-muted-foreground">已获证书</p>
              <p className="text-sm font-bold text-primary">{stats.certificatesEarned} 本</p>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="sticky top-0 z-20 shrink-0 border-b border-border bg-background/95 px-2 py-1.5 backdrop-blur-sm">
        <div className="flex gap-0.5 overflow-x-auto">
          {[
            { id: "courses" as const, label: "课程", count: stats.totalCourses },
            { id: "exams" as const, label: "考试", count: exams.length },
            { id: "certificates" as const, label: "证书", count: stats.certificatesEarned },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {tab.label}
              <Badge
                variant="outline"
                className={cn(
                  "h-4 px-1 py-0 text-[9px] leading-none",
                  activeTab === tab.id ? "border-white/40 bg-white/15 text-white" : "",
                )}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-2 py-2">
        {activeTab === "courses" &&
          courses.map((course) => (
            <Card
              key={course.id}
              className={cn(
                "overflow-hidden border border-border/70 shadow-sm",
                course.locked && "opacity-65",
              )}
            >
              <CardContent className="p-0">
                <div className="flex gap-2 p-2">
                  <div
                    className={cn(
                      "relative h-[4.5rem] w-[5.25rem] shrink-0 overflow-hidden rounded-md",
                      course.image,
                    )}
                  >
                    {course.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                        <Lock className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-1.5">
                      <h3 className="line-clamp-2 text-[13px] font-semibold leading-tight">{course.title}</h3>
                      <Badge variant="secondary" className="shrink-0 px-1.5 py-0 text-[9px]">
                        {course.category}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{course.instructor}</p>
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>进度</span>
                        <span>
                          {course.completedLessons}/{course.lessons} 课
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1 pt-0.5">
                      <div className="flex min-w-0 flex-wrap gap-x-2 gap-y-0 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5 shrink-0" />
                          {course.duration}
                        </span>
                        {course.certificate && (
                          <span className="flex items-center gap-0.5 text-amber-600">
                            <Award className="h-2.5 w-2.5 shrink-0" />
                            有证书
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant={course.progress === 100 ? "outline" : "default"}
                        className="h-6 shrink-0 px-2 text-[10px]"
                        disabled={course.locked}
                        type="button"
                      >
                        {course.progress === 100 ? "已完成" : "继续学习"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {activeTab === "exams" &&
          exams.map((exam) => (
            <Card key={exam.id} className="border border-border/70 shadow-sm">
              <CardContent className="p-2.5">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <h3 className="text-[13px] font-semibold leading-snug">{exam.title}</h3>
                  <Badge
                    variant={
                      exam.status === "completed"
                        ? "default"
                        : exam.status === "pending"
                          ? "secondary"
                          : "outline"
                    }
                    className="shrink-0 px-1.5 py-0 text-[9px]"
                  >
                    {exam.status === "completed" && "已完成"}
                    {exam.status === "pending" && "待考试"}
                    {exam.status === "locked" && "锁定"}
                  </Badge>
                </div>
                <div className="space-y-1 text-[10px] text-muted-foreground">
                  <p>考试时长：{exam.duration} 分钟</p>
                  {exam.status === "completed" && (
                    <div className="flex items-center justify-between rounded-md bg-muted/50 px-2 py-1">
                      <span>成绩</span>
                      <span className="font-bold text-primary">
                        {exam.score} 分 / {exam.passScore} 分合格
                      </span>
                    </div>
                  )}
                  {exam.status !== "locked" && (
                    <p>
                      {exam.status === "completed" ? "考试时间" : "考试日期"}：{exam.date}
                    </p>
                  )}
                </div>
                {exam.status === "pending" && (
                  <Button className="mt-2 h-7 w-full text-[11px]" type="button">
                    开始考试
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

        {activeTab === "certificates" &&
          certificates.map((cert) => (
            <Card key={cert.id} className="border border-border/70 shadow-sm">
              <CardContent className="p-2.5">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <h3 className="text-[13px] font-semibold leading-snug">{cert.title}</h3>
                  <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[9px] text-amber-800">
                    {cert.level}
                  </Badge>
                </div>
                <div className="space-y-0.5 text-[10px] text-muted-foreground">
                  <p>颁发机构：{cert.issuer}</p>
                  <p>颁发时间：{cert.date}</p>
                  {cert.expiryDate && <p>有效期至：{cert.expiryDate}</p>}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <Button variant="outline" size="sm" className="h-7 flex-1 text-[10px]" type="button">
                    查看详情
                  </Button>
                  <Button size="sm" className="h-7 flex-1 text-[10px]" type="button">
                    下载证书
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
