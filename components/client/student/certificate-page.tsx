"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Award,
  CheckCircle2,
  Clock,
  FileText,
  ChevronRight,
  Lock,
  AlertCircle,
  Briefcase,
} from "lucide-react"

// 已获得的证书
const obtainedCerts = [
  {
    id: 1,
    name: "母婴护理师证书",
    level: "初级",
    issueDate: "2025-10-15",
    validUntil: "2028-10-15",
    certNo: "MYHL2025001234",
    issuer: "中国人力资源和社会保障部",
  },
  {
    id: 2,
    name: "催乳师资格证书",
    level: "中级",
    issueDate: "2025-12-20",
    validUntil: "2028-12-20",
    certNo: "CRS2025005678",
    issuer: "中国保健协会",
  },
]

// 待获取的证书
const pendingCerts = [
  {
    id: 3,
    name: "产后康复师证书",
    level: "初级",
    requirements: ["完成产后康复师课程", "通过理论考试", "通过实操考核"],
    progress: 30,
  },
  {
    id: 4,
    name: "育婴师证书",
    level: "中级",
    requirements: ["完成育婴师课程", "通过理论考试", "满300小时实践"],
    progress: 0,
  },
  {
    id: 5,
    name: "营养师证书",
    level: "初级",
    requirements: ["完成营养师课程", "通过理论考试"],
    progress: 0,
  },
]

// 待考试的证书
const examCerts = [
  {
    id: 6,
    name: "产后康复师证书",
    examType: "理论考试",
    examDate: "2026-02-15",
    examTime: "09:00-11:00",
    location: "线上考试",
    status: "upcoming",
  },
]

// 转型条件
const transformConditions = [
  { id: 1, name: "获得至少一项职业证书", passed: true },
  { id: 2, name: "完成平台入职培训", passed: true },
  { id: 3, name: "提交个人简历资料", passed: false },
  { id: 4, name: "通过背景审核", passed: false },
]

export function StudentCertificatePage() {
  const [selectedCert, setSelectedCert] = useState<(typeof obtainedCerts)[0] | null>(null)
  const [selectedPending, setSelectedPending] = useState<(typeof pendingCerts)[0] | null>(null)
  const [showTransform, setShowTransform] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">我的证书</h1>
        
        {/* Certificate Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{obtainedCerts.length}</p>
              <p className="text-xs text-white/70">已获证书</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{pendingCerts.length}</p>
              <p className="text-xs text-white/70">待获取</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{examCerts.length}</p>
              <p className="text-xs text-white/70">待考试</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Obtained Certificates */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">已获得的证书</h2>
          <div className="space-y-3">
            {obtainedCerts.map((cert) => (
              <Card 
                key={cert.id} 
                className="border-0 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCert(cert)}
              >
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{cert.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {cert.level} · {cert.issueDate}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                    <span>证书编号：{cert.certNo}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pending Certificates */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">待获取的证书</h2>
          <div className="space-y-3">
            {pendingCerts.map((cert) => (
              <Card 
                key={cert.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPending(cert)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.level}</p>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-[10px]">
                      {cert.progress}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Exams */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">待考试</h2>
          <div className="space-y-3">
            {examCerts.map((exam) => (
              <Card key={exam.id} className="border-0 shadow-sm border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{exam.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{exam.examType}</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                      即将开始
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.examDate} {exam.examTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {exam.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Transform to Domestic Worker */}
        <section>
          <Card 
            className="border-0 shadow-md bg-gradient-to-r from-teal-500 to-teal-600 cursor-pointer"
            onClick={() => setShowTransform(true)}
          >
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
        </section>
      </main>

      {/* Certificate Detail Sheet */}
      <Sheet open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>证书详情</SheetTitle>
          </SheetHeader>
          {selectedCert && (
            <div className="py-4 space-y-4">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center border-2 border-amber-200">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{selectedCert.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedCert.level}</p>
              </div>

              {/* Certificate Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">证书编号</span>
                  <span className="text-sm font-medium text-foreground">{selectedCert.certNo}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">发证机构</span>
                  <span className="text-sm font-medium text-foreground">{selectedCert.issuer}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">发证日期</span>
                  <span className="text-sm font-medium text-foreground">{selectedCert.issueDate}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">有效期至</span>
                  <span className="text-sm font-medium text-foreground">{selectedCert.validUntil}</span>
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                下载证书
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Pending Certificate Detail Sheet */}
      <Sheet open={!!selectedPending} onOpenChange={() => setSelectedPending(null)}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>获取条件</SheetTitle>
          </SheetHeader>
          {selectedPending && (
            <div className="py-4 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Lock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{selectedPending.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedPending.level}</p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm font-medium text-amber-800 mb-3">获取条件：</p>
                <div className="space-y-2">
                  {selectedPending.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-amber-700">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600">
                开始学习
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Transform Sheet */}
      <Sheet open={showTransform} onOpenChange={setShowTransform}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>申请转为家政员</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4 overflow-y-auto h-[calc(70vh-140px)]">
            <div className="bg-teal-50 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-teal-800">转型说明</p>
                  <p className="text-xs text-teal-700 mt-1">
                    审核通过后，系统将自动创建您的家政档案，您可以开始接单服务。
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
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
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
