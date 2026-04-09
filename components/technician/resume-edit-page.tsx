"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Camera,
  Share2,
  Eye,
  Edit3,
  Plus,
  X,
  Award,
  Briefcase,
  Star,
  Image,
  Link2,
  Download,
  MessageSquare,
  QrCode,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ResumeEditPageProps {
  onBack: () => void
}

export function ResumeEditPage({ onBack }: ResumeEditPageProps) {
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit")
  const [showShareDialog, setShowShareDialog] = useState(false)

  const [name, setName] = useState("陈美丽")
  const [title, setTitle] = useState("高级产康技师")
  const [experience, setExperience] = useState("5")
  const [intro, setIntro] = useState(
    "拥有5年产后康复从业经验，擅长产后腹直肌修复、盆底肌康复训练、骨盆修复等项目。累计服务超过500位产后妈妈，获得99%好评率。持有高级产康师证书、中医推拿师证书。",
  )
  const [skills] = useState([
    "产后腹直肌修复",
    "盆底肌康复",
    "乳腺疏通",
    "骨盆修复",
    "产后瑜伽",
    "中医推拿",
  ])
  const [certificates] = useState([
    { name: "高级产康师证书", issuer: "中国医学科学院", date: "2023-06" },
    { name: "中医推拿师证书", issuer: "国家中医药管理局", date: "2022-03" },
    { name: "母婴护理师证书", issuer: "人力资源和社会保障部", date: "2021-09" },
  ])
  const [workHistory] = useState([
    { company: "优厚家庭服务", role: "高级产康技师", period: "2024-至今", desc: "负责VIP客户产后康复服务" },
    { company: "某月子中心", role: "产康技师", period: "2021-2024", desc: "提供产后修复与母婴护理" },
  ])
  const [reviews] = useState([
    { customer: "王女士", rating: 5, content: "陈老师技术非常专业，腹直肌修复效果很明显！", date: "2026-03" },
    { customer: "李女士", rating: 5, content: "盆底肌训练后漏尿情况好了很多，谢谢！", date: "2026-02" },
    { customer: "张女士", rating: 5, content: "服务态度好，手法轻柔有效", date: "2026-01" },
  ])

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-teal-500 to-emerald-500 px-4 pb-3 pt-4 text-white safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">我的简历</h1>
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-white hover:bg-white/10"
              onClick={() => setShowShareDialog(true)}
            >
              <Share2 className="mr-1 h-4 w-4" />
              分享
            </Button>
          </div>
        </div>

        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "edit" | "preview")} className="mt-3">
          <TabsList className="h-8 w-full bg-white/20 p-0.5">
            <TabsTrigger value="edit" className="flex-1 gap-1 text-xs text-white data-[state=active]:bg-white data-[state=active]:text-teal-600">
              <Edit3 className="h-3 w-3" />
              编辑
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1 gap-1 text-xs text-white data-[state=active]:bg-white data-[state=active]:text-teal-600">
              <Eye className="h-3 w-3" />
              预览
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 pt-4">
        {activeView === "edit" && (
          <div className="space-y-4">
            {/* 基本信息 */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <p className="mb-3 text-sm font-medium">基本信息</p>
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-teal-200">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-teal-100 text-lg text-teal-600">陈</AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white shadow"
                    >
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="姓名" />
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="职称/头衔" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">从业年限</label>
                  <Input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="年" />
                </div>
              </CardContent>
            </Card>

            {/* 自我介绍 */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <p className="mb-2 text-sm font-medium">自我介绍</p>
                <Textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="介绍您的专业特长、服务理念..."
                />
              </CardContent>
            </Card>

            {/* 专业技能 */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">专业技能</p>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs text-teal-600">
                    <Plus className="mr-0.5 h-3 w-3" />
                    添加
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-teal-100 text-xs text-teal-600">
                      {skill}
                      <button type="button" className="ml-1">
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 资质证书 */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">资质证书</p>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs text-teal-600">
                    <Plus className="mr-0.5 h-3 w-3" />
                    添加
                  </Button>
                </div>
                <div className="space-y-2">
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-muted/50 p-2.5">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium">{cert.name}</p>
                          <p className="text-[10px] text-muted-foreground">{cert.issuer} · {cert.date}</p>
                        </div>
                      </div>
                      <button type="button" className="text-muted-foreground hover:text-destructive">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 工作经历 */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">工作经历</p>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs text-teal-600">
                    <Plus className="mr-0.5 h-3 w-3" />
                    添加
                  </Button>
                </div>
                <div className="space-y-2">
                  {workHistory.map((work, idx) => (
                    <div key={idx} className="rounded-lg bg-muted/50 p-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-teal-600" />
                          <p className="text-sm font-medium">{work.company}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{work.period}</span>
                      </div>
                      <p className="mt-0.5 pl-6 text-xs text-muted-foreground">{work.role} · {work.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 工作照片 */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <p className="mb-2 text-sm font-medium">工作照片</p>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
                      <Image className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground hover:border-teal-300 hover:text-teal-600"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="mt-0.5 text-[10px]">添加</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Button type="button" className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => alert("简历已保存")}>
              保存简历
            </Button>
          </div>
        )}

        {activeView === "preview" && (
          <div className="space-y-4">
            {/* Profile Card */}
            <Card className="overflow-hidden border shadow-sm">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16 border-2 border-white/30">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-white/20 text-lg text-white">陈</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-sm text-white/90">{title}</p>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-300 text-amber-300" />
                      ))}
                      <span className="ml-1 text-xs">5.0</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/10 p-2">
                    <p className="text-lg font-bold">{experience}年</p>
                    <p className="text-[10px] text-white/70">从业经验</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-2">
                    <p className="text-lg font-bold">500+</p>
                    <p className="text-[10px] text-white/70">服务客户</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-2">
                    <p className="text-lg font-bold">99%</p>
                    <p className="text-[10px] text-white/70">好评率</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 自我介绍 */}
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <p className="mb-1.5 text-sm font-medium">自我介绍</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{intro}</p>
              </CardContent>
            </Card>

            {/* 专业技能 */}
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <p className="mb-2 text-sm font-medium">专业技能</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-teal-100 text-xs text-teal-600">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 资质证书 */}
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <p className="mb-2 text-sm font-medium">资质证书</p>
                <div className="space-y-2">
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="text-sm">{cert.name}</p>
                        <p className="text-[10px] text-muted-foreground">{cert.issuer} · {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 工作经历 */}
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <p className="mb-2 text-sm font-medium">工作经历</p>
                <div className="space-y-2">
                  {workHistory.map((work, idx) => (
                    <div key={idx} className="border-l-2 border-teal-300 pl-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{work.company}</p>
                        <span className="text-[10px] text-muted-foreground">{work.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{work.role} · {work.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 客户评价 */}
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <p className="mb-2 text-sm font-medium">客户评价</p>
                <div className="space-y-2">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="rounded-lg bg-muted/50 p-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{review.content}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">— {review.customer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>分享简历</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex justify-center rounded-lg border-2 border-dashed border-teal-200 bg-muted/30 p-6">
              <div className="text-center">
                <QrCode className="mx-auto h-24 w-24 text-teal-600" strokeWidth={1.1} />
                <p className="mt-2 text-xs text-muted-foreground">扫码查看我的简历</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" className="h-10 gap-1.5 bg-transparent text-xs">
                <Image className="h-4 w-4" />
                生成海报
              </Button>
              <Button type="button" variant="outline" className="h-10 gap-1.5 bg-transparent text-xs">
                <Link2 className="h-4 w-4" />
                复制链接
              </Button>
              <Button type="button" variant="outline" className="h-10 gap-1.5 bg-transparent text-xs">
                <MessageSquare className="h-4 w-4" />
                发送微信
              </Button>
              <Button type="button" variant="outline" className="h-10 gap-1.5 bg-transparent text-xs">
                <Download className="h-4 w-4" />
                保存图片
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="w-full" onClick={() => setShowShareDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
