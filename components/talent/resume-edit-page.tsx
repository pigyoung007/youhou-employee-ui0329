"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronLeft, Camera, Edit, Share2, Plus, Trash2, Star,
  Award, Briefcase, MessageSquare, Image, Link2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeData {
  name: string
  avatar: string
  age: number
  hometown: string
  experience: string
  education: string
  level: string
  salary: string
  intro: string
  skills: string[]
  certificates: { name: string; issuer: string }[]
  workHistory: { employer: string; period: string; role: string; description: string }[]
  photos: string[]
}

const initialResume: ResumeData = {
  name: "李秀英",
  avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
  age: 45,
  hometown: "宁夏银川",
  experience: "8年",
  education: "高中",
  level: "金牌月嫂",
  salary: "12,800-15,800/月",
  intro: "从事月嫂行业8年，专注新生儿护理和产妇照护。擅长制作营养月子餐，对新生儿常见问题有丰富的处理经验。持有高级母婴护理师证书，性格温和有耐心。",
  skills: ["新生儿护理", "产妇护理", "月子餐", "早教启蒙", "催乳通乳", "辅食制作"],
  certificates: [
    { name: "高级母婴护理师", issuer: "人社部" },
    { name: "催乳师（中级）", issuer: "中国保健协会" },
    { name: "营养师", issuer: "卫健委" },
    { name: "育婴师", issuer: "人社部" },
  ],
  workHistory: [
    { employer: "张女士家庭", period: "2024.01-2024.02", role: "月嫂", description: "新生儿全程护理，产妇月子期照护" },
    { employer: "李女士家庭", period: "2023.10-2023.11", role: "月嫂", description: "双胞胎新生儿护理，产妇产后恢复指导" },
  ],
  photos: [],
}

interface ResumeEditPageProps {
  onBack: () => void
}

export function ResumeEditPage({ onBack }: ResumeEditPageProps) {
  const [resume, setResume] = useState(initialResume)
  const [editSection, setEditSection] = useState<string | null>(null)
  const [showShareSheet, setShowShareSheet] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const [editIntro, setEditIntro] = useState(resume.intro)
  const [editWorkHistory, setEditWorkHistory] = useState({ employer: "", period: "", role: "", description: "" })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold">我的简历</h1>
        </div>
        <Button size="sm" variant="outline" onClick={() => setShowShareSheet(true)}>
          <Share2 className="w-4 h-4 mr-1" />
          分享
        </Button>
      </div>

      <main className="px-4 py-4 space-y-4 pb-24">
        {/* Profile Header */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-3 border-white/30">
                  <AvatarImage src={resume.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-rose-100 text-rose-600 text-xl">{resume.name[0]}</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Camera className="w-4 h-4 text-rose-500" />
                </button>
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{resume.name}</h2>
                <Badge className="bg-white/20 text-white border-0 text-[10px] mt-1">{resume.level}</Badge>
                <p className="text-sm text-white/80 mt-1">{resume.age}岁 · {resume.hometown} · {resume.experience}经验</p>
                <p className="text-sm font-semibold text-white mt-1">{resume.salary}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              自我介绍
            </CardTitle>
            <button onClick={() => { setEditSection("intro"); setEditIntro(resume.intro) }}>
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{resume.intro}</p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-rose-500" />
              技能标签
            </CardTitle>
            <button onClick={() => setEditSection("skills")}>
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span key={skill} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-rose-500" />
              资质证书
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {resume.certificates.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                <Award className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Work History */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-rose-500" />
              工作经历
            </CardTitle>
            <button onClick={() => setEditSection("work")}>
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardHeader>
          <CardContent className="space-y-3">
            {resume.workHistory.map((work, i) => (
              <div key={i} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold">{work.employer}</h4>
                  <span className="text-xs text-muted-foreground">{work.period}</span>
                </div>
                <p className="text-xs text-rose-600 mb-1">{work.role}</p>
                <p className="text-xs text-muted-foreground">{work.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Image className="w-4 h-4 text-rose-500" />
              照片展示
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-rose-300 transition-colors">
                  <div className="text-center">
                    <Camera className="w-5 h-5 mx-auto text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground mt-1">上传</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit Intro Sheet */}
      <Sheet open={editSection === "intro"} onOpenChange={() => setEditSection(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">编辑自我介绍</SheetTitle>
          </SheetHeader>
          <div className="flex-1 py-4">
            <Textarea
              value={editIntro}
              onChange={(e) => setEditIntro(e.target.value)}
              placeholder="介绍一下自己的经验和特长..."
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">{editIntro.length}/500字</p>
          </div>
          <div className="pt-4 border-t border-border">
            <Button
              className="w-full bg-rose-500 hover:bg-rose-600"
              onClick={() => { setResume({ ...resume, intro: editIntro }); setEditSection(null) }}
            >
              保存
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Skills Sheet */}
      <Sheet open={editSection === "skills"} onOpenChange={() => setEditSection(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">编辑技能标签</SheetTitle>
          </SheetHeader>
          <div className="flex-1 py-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span key={skill} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                  {skill}
                  <button onClick={() => setResume({ ...resume, skills: resume.skills.filter((s) => s !== skill) })}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="添加新技能..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                className="bg-rose-500 hover:bg-rose-600"
                onClick={() => {
                  if (newSkill.trim()) {
                    setResume({ ...resume, skills: [...resume.skills, newSkill.trim()] })
                    setNewSkill("")
                  }
                }}
              >
                添加
              </Button>
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => setEditSection(null)}>
              完成
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Work History Sheet */}
      <Sheet open={editSection === "work"} onOpenChange={() => setEditSection(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">添加工作经历</SheetTitle>
          </SheetHeader>
          <div className="flex-1 py-4 space-y-4">
            <div><Label className="text-xs">雇主/家庭 *</Label><Input value={editWorkHistory.employer} onChange={(e) => setEditWorkHistory({ ...editWorkHistory, employer: e.target.value })} placeholder="如：张女士家庭" /></div>
            <div><Label className="text-xs">时间段 *</Label><Input value={editWorkHistory.period} onChange={(e) => setEditWorkHistory({ ...editWorkHistory, period: e.target.value })} placeholder="如：2024.01-2024.02" /></div>
            <div><Label className="text-xs">岗位 *</Label><Input value={editWorkHistory.role} onChange={(e) => setEditWorkHistory({ ...editWorkHistory, role: e.target.value })} placeholder="如：月嫂" /></div>
            <div><Label className="text-xs">工作描述</Label><Textarea value={editWorkHistory.description} onChange={(e) => setEditWorkHistory({ ...editWorkHistory, description: e.target.value })} placeholder="描述主要工作内容..." rows={3} /></div>
          </div>
          <div className="pt-4 border-t border-border">
            <Button
              className="w-full bg-rose-500 hover:bg-rose-600"
              onClick={() => {
                if (editWorkHistory.employer && editWorkHistory.period && editWorkHistory.role) {
                  setResume({ ...resume, workHistory: [...resume.workHistory, editWorkHistory] })
                  setEditWorkHistory({ employer: "", period: "", role: "", description: "" })
                  setEditSection(null)
                }
              }}
            >
              添加
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Share Sheet */}
      <Sheet open={showShareSheet} onOpenChange={setShowShareSheet}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">分享简历</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-3">
            <Button variant="outline" className="w-full h-12 justify-start" onClick={() => { alert("链接已复制"); setShowShareSheet(false) }}>
              <Link2 className="w-5 h-5 mr-3 text-blue-500" />
              <div className="text-left">
                <p className="text-sm font-medium">复制链接</p>
                <p className="text-xs text-muted-foreground">生成简历分享链接</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full h-12 justify-start" onClick={() => { alert("海报已生成"); setShowShareSheet(false) }}>
              <Image className="w-5 h-5 mr-3 text-rose-500" />
              <div className="text-left">
                <p className="text-sm font-medium">生成海报</p>
                <p className="text-xs text-muted-foreground">生成个人推广海报</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full h-12 justify-start" onClick={() => { alert("分享到微信"); setShowShareSheet(false) }}>
              <Share2 className="w-5 h-5 mr-3 text-green-500" />
              <div className="text-left">
                <p className="text-sm font-medium">分享到微信</p>
                <p className="text-xs text-muted-foreground">发送给微信好友或朋友圈</p>
              </div>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
