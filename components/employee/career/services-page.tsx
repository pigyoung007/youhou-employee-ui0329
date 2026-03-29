"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Shield,
  Award,
  Star,
  ChevronRight,
  Share2,
  BookOpen,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  GraduationCap,
  X,
  Download,
  Phone,
  MapPin,
  Heart,
  Calendar,
  Sparkles,
  Gift,
} from "lucide-react"
import Image from "next/image"

// 品牌实力
const brandStats = {
  families: 10000,
  caregivers: 500,
  years: 8,
  satisfaction: 99,
}

// 资质认证
const certifications = [
  { name: "人社部认证培训机构", icon: Shield, verified: true },
  { name: "行业协会会员单位", icon: Award, verified: true },
  { name: "ISO9001认证", icon: Star, verified: true },
]

// 培训项目
const trainingProjects = [
  {
    id: 1,
    name: "月嫂培训认证班",
    duration: "45天",
    price: 4980,
    originalPrice: 5980,
    students: 1200,
    rating: 4.9,
    features: ["理论+实操", "包考证", "推荐就业"],
    courses: ["新生儿护理", "产妇护理", "月子餐制作", "催乳通乳"],
  },
  {
    id: 2,
    name: "育婴师培训认证班",
    duration: "30天",
    price: 3580,
    originalPrice: 4580,
    students: 800,
    rating: 4.8,
    features: ["理论+实操", "包考证", "推荐就业"],
    courses: ["婴幼儿护理", "早教启蒙", "辅食制作", "常见疾病护理"],
  },
  {
    id: 3,
    name: "催乳师专项培训",
    duration: "15天",
    price: 2580,
    originalPrice: 3280,
    students: 500,
    rating: 4.9,
    features: ["小班教学", "包考证", "终身复训"],
    courses: ["乳房解剖学", "催乳按摩手法", "常见问题处理"],
  },
  {
    id: 4,
    name: "产后康复师培训",
    duration: "30天",
    price: 4280,
    originalPrice: 5280,
    students: 600,
    rating: 4.8,
    features: ["理论+实操", "包考证", "设备使用"],
    courses: ["盆底肌康复", "腹直肌修复", "体态调整", "产后营养"],
  },
]

// 证书类型
const certificateTypes = [
  {
    id: 1,
    name: "母婴护理师证书",
    issuer: "人社部",
    levels: ["初级", "中级", "高级"],
    requirements: "完成培训课程并通过考试",
    benefits: ["全国通用", "网上可查", "就业必备"],
  },
  {
    id: 2,
    name: "育婴师证书",
    issuer: "人社部",
    levels: ["初级", "中级", "高级"],
    requirements: "完成培训课程并通过考试",
    benefits: ["全国通用", "网上可查", "就业必备"],
  },
  {
    id: 3,
    name: "催乳师证书",
    issuer: "中国保健协会",
    levels: ["初级", "中级", "高级"],
    requirements: "完成培训课程并通过考试",
    benefits: ["行业认可", "技能提升", "收入增加"],
  },
]

export function CareerServicesPage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [selectedProject, setSelectedProject] = useState<(typeof trainingProjects)[0] | null>(null)
  const [selectedCert, setSelectedCert] = useState<(typeof certificateTypes)[0] | null>(null)
  const [showPoster, setShowPoster] = useState(false)
  const [posterProject, setPosterProject] = useState<(typeof trainingProjects)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">服务中心</h1>
        
        {/* Brand Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-sm text-white/80 mb-3">品牌实力</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.families}+</p>
              <p className="text-xs text-white/70">服务家庭</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.caregivers}+</p>
              <p className="text-xs text-white/70">专业阿姨</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.years}年</p>
              <p className="text-xs text-white/70">服务年限</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.satisfaction}%</p>
              <p className="text-xs text-white/70">好评率</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Certifications */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">资质认证</h2>
          <div className="grid grid-cols-3 gap-3">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-violet-500" />
                    </div>
                    <p className="text-xs font-medium text-foreground line-clamp-2">{cert.name}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="projects" className="flex-1 rounded-lg data-[state=active]:bg-white">
              培���项目
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex-1 rounded-lg data-[state=active]:bg-white">
              证书类型
            </TabsTrigger>
          </TabsList>

          {/* Training Projects */}
          <TabsContent value="projects" className="space-y-3 mt-4">
            {trainingProjects.map((project) => (
              <Card 
                key={project.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">
                          <Clock className="w-3 h-3 mr-1" />
                          {project.duration}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          <Users className="w-3 h-3 mr-1" />
                          {project.students}人已报名
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-bold text-sm">{project.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.features.map((feature, index) => (
                      <Badge key={index} className="bg-violet-100 text-violet-700 text-[10px]">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-violet-600">¥{project.price}</span>
                      <span className="text-sm text-muted-foreground line-through">¥{project.originalPrice}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPosterProject(project)
                        setShowPoster(true)
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5 mr-1" />
                      分享
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Certificate Types */}
          <TabsContent value="certificates" className="space-y-3 mt-4">
            {certificateTypes.map((cert) => (
              <Card 
                key={cert.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCert(cert)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">发证机构：{cert.issuer}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cert.levels.map((level, index) => (
                      <Badge key={index} variant="outline" className="text-[10px]">{level}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Project Detail Sheet */}
      <Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>{selectedProject?.name}</SheetTitle>
          </SheetHeader>
          {selectedProject && (
            <div className="py-4 space-y-4 overflow-y-auto h-[calc(80vh-140px)]">
              {/* Price */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-violet-600">¥{selectedProject.price}</span>
                  <span className="text-lg text-muted-foreground line-through">¥{selectedProject.originalPrice}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">培训周期：{selectedProject.duration}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <Users className="w-5 h-5 mx-auto text-violet-500 mb-1" />
                    <p className="font-bold">{selectedProject.students}</p>
                    <p className="text-xs text-muted-foreground">已报名</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <Star className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                    <p className="font-bold">{selectedProject.rating}</p>
                    <p className="text-xs text-muted-foreground">学员评分</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <Clock className="w-5 h-5 mx-auto text-teal-500 mb-1" />
                    <p className="font-bold">{selectedProject.duration}</p>
                    <p className="text-xs text-muted-foreground">培训周期</p>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">课程特色</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <Badge key={index} className="bg-violet-100 text-violet-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Courses */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">课程内容</h4>
                <div className="space-y-2">
                  {selectedProject.courses.map((course, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <BookOpen className="w-4 h-4 text-violet-500" />
                      <span className="text-sm text-foreground">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setPosterProject(selectedProject)
                    setSelectedProject(null)
                    setShowPoster(true)
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  分享课程
                </Button>
                <Button className="flex-1 bg-violet-500 hover:bg-violet-600">
                  立即报名
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Certificate Detail Sheet */}
      <Sheet open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>{selectedCert?.name}</SheetTitle>
          </SheetHeader>
          {selectedCert && (
            <div className="py-4 space-y-4 overflow-y-auto h-[calc(60vh-100px)]">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{selectedCert.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">发证机构：{selectedCert.issuer}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">证书等级</h4>
                <div className="flex gap-2">
                  {selectedCert.levels.map((level, index) => (
                    <Badge key={index} className="bg-amber-100 text-amber-700">{level}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">获取条件</h4>
                <p className="text-sm text-muted-foreground">{selectedCert.requirements}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">证书权益</h4>
                <div className="space-y-2">
                  {selectedCert.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-violet-500 hover:bg-violet-600" variant="outline" onClick={() => setSelectedCert(null)}>
                <Share2 className="w-4 h-4 mr-2" />
                分享证书信息
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Course Poster Modal */}
      {showPoster && posterProject && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 overflow-y-auto">
          <div className="relative w-full max-w-xs">
            {/* Close Button */}
            <button 
              onClick={() => {
                setShowPoster(false)
                setPosterProject(null)
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
                  <h2 className="text-base font-bold mb-1">{posterProject.name}</h2>
                  <p className="text-white/80 text-[10px]">专业培训 · 考证无忧 · 推荐就业</p>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 px-3 py-2 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] text-muted-foreground">特惠</span>
                  <span className="text-xl font-bold text-rose-600">¥{posterProject.price}</span>
                  <span className="text-xs text-muted-foreground line-through">¥{posterProject.originalPrice}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {posterProject.duration}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Users className="w-3 h-3" />
                    {posterProject.students}人报名
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
                    {posterProject.features.map((feature, index) => (
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
                    {posterProject.courses.slice(0, 4).map((course, index) => (
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
                    <span className="text-muted-foreground">开班</span>
                    <span className="font-medium text-foreground">2026年2月15日</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">地点</span>
                    <span className="font-medium text-foreground">银川金凤校区</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between bg-amber-50 rounded-lg p-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(posterProject.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                    <span className="text-xs font-bold text-amber-600 ml-1">{posterProject.rating}</span>
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
                  setPosterProject(null)
                }}
              >
                返回
              </Button>
              <Button size="sm" className="flex-1 bg-violet-500 hover:bg-violet-600 text-xs h-8">
                <Download className="w-3 h-3 mr-1" />
                保存海报
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
