"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Star, Award, ChevronRight, Calendar, DollarSign, Bell, MapPin,
  TrendingUp, Clock, Share2, Download, X, Heart, Phone, Shield,
  Briefcase, GraduationCap, CheckCircle, User,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const profileData = {
  name: "李秀英",
  avatar: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
  level: "金牌月嫂",
  age: 45,
  hometown: "宁夏银川",
  experience: "8年",
  currentCity: "银川",
  education: "高中",
  joinDate: "2017-03",
  phone: "138****8888",
  salary: "12800-15800/月",
  rating: 4.9,
  totalOrders: 86,
  monthIncome: 13500,
  totalIncome: 268000,
  certificates: ["高级母婴护理师", "催乳师", "营养师", "育婴师"],
  skills: ["新生儿护理", "产妇护理", "月子餐", "早教启蒙", "催乳通乳"],
  completeness: 85,
  incompletItems: ["上传健康证", "完善自我介绍视频"],
  workHistory: [
    { employer: "张女士家庭", period: "2024.01-2024.02", rating: 5.0 },
    { employer: "李女士家庭", period: "2023.10-2023.11", rating: 4.8 },
  ],
}

const todaySchedule = [
  { id: 1, time: "09:00", type: "月嫂服务", client: "张女士", address: "金凤区万达公寓12-3-602", status: "进行中" },
  { id: 2, time: "14:00", type: "产后修复", client: "王女士", address: "兴庆区新华街88号", status: "待开始" },
]

const notifications = [
  { id: 1, text: "您有2份服务报告待提交", color: "bg-amber-50", dot: "bg-amber-500" },
  { id: 2, text: "明日有1个产后修复预约需确认", color: "bg-teal-50", dot: "bg-teal-500" },
  { id: 3, text: "新证书已颁发，请前往查看", color: "bg-violet-50", dot: "bg-violet-500" },
]

interface TalentHomePageProps {
  onOpenService?: (serviceName: string) => void
}

export function TalentHomePage({ onOpenService }: TalentHomePageProps) {
  const [showShareSettings, setShowShareSettings] = useState(false)
  const [showPoster, setShowPoster] = useState(false)
  const [shareConfig, setShareConfig] = useState({
    showPhoto: true, showSalary: true, showPhone: false,
    showWorkHistory: true, maxViews: 200, validDays: 30,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 pt-4 pb-6 px-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white">优厚家服 - 人才端</h1>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-amber-200">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-amber-100 text-amber-600">{profileData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                  {profileData.level.slice(0, 2)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg text-foreground">{profileData.name}</h2>
                  <Badge className="bg-amber-100 text-amber-700 text-[10px]">{profileData.level}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{profileData.rating}</span>
                  <span>{profileData.totalOrders}单</span>
                  <span>{profileData.experience}经验</span>
                </div>
                {/* Completeness */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">档案完善度</span>
                    <span className="font-medium text-amber-600">{profileData.completeness}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${profileData.completeness}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent" onClick={() => setShowShareSettings(true)}>
                <Share2 className="w-3 h-3 mr-1" />
                分享简历
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-4 pb-24">
        {/* Service Categories */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">服务项目</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: "找月嫂", icon: "👶", color: "from-amber-100 to-orange-50" },
                { name: "产后修复", icon: "🌸", color: "from-pink-100 to-rose-50" },
                { name: "育婴师", icon: "🎒", color: "from-teal-100 to-emerald-50" },
                { name: "在线课程", icon: "📚", color: "from-violet-100 to-purple-50" },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => onOpenService?.(cat.name)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-xl`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs text-foreground font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today Schedule */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              今日日程
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todaySchedule.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="text-center min-w-[48px]">
                  <p className="text-sm font-bold text-amber-600">{item.time}</p>
                </div>
                <div className="w-px h-10 bg-amber-300" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.type}</p>
                    <Badge className={`text-[10px] ${item.status === "进行中" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.client} | {item.address}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              通知提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-3 ${item.color} rounded-lg`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${item.dot} rounded-full`} />
                  <span className="text-sm">{item.text}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Share Settings Sheet */}
      <Sheet open={showShareSettings} onOpenChange={setShowShareSettings}>
        <SheetContent side="bottom" className="h-auto max-h-[75vh] rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">简历分享设置</SheetTitle>
          </SheetHeader>
          <div className="py-3 space-y-3 overflow-y-auto max-h-[calc(75vh-120px)]">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">展示内容</h4>
              {[
                { key: "showPhoto", icon: User, label: "显示照片", desc: "在简历中展示个人照片" },
                { key: "showSalary", icon: DollarSign, label: "显示薪资", desc: "在简历中展示期望薪资" },
                { key: "showPhone", icon: Phone, label: "显示电话", desc: "在简历中展示联系电话" },
                { key: "showWorkHistory", icon: Briefcase, label: "显示工作经历", desc: "在简历中展示服务历史" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={(shareConfig as any)[item.key]}
                    onCheckedChange={(checked) => setShareConfig({ ...shareConfig, [item.key]: checked })}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">分享限制</h4>
              <div className="p-3 bg-muted/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">最大查看次数</Label>
                  <span className="text-sm font-medium text-amber-600">{shareConfig.maxViews}次</span>
                </div>
                <Slider value={[shareConfig.maxViews]} onValueChange={([v]) => setShareConfig({ ...shareConfig, maxViews: v })} min={50} max={500} step={50} />
              </div>
              <div className="p-3 bg-muted/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">有效期</Label>
                  <span className="text-sm font-medium text-amber-600">{shareConfig.validDays}天</span>
                </div>
                <Slider value={[shareConfig.validDays]} onValueChange={([v]) => setShareConfig({ ...shareConfig, validDays: v })} min={7} max={180} step={7} />
              </div>
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => { setShowShareSettings(false); setShowPoster(true) }}>
              <Share2 className="w-4 h-4 mr-2" />
              生成简历海报
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Resume Poster */}
      {showPoster && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center">
          <div className="relative w-full max-w-sm mx-auto flex flex-col max-h-[100dvh]">
            <div className="shrink-0 flex justify-end px-4 py-2">
              <button onClick={() => setShowPoster(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto px-4 pb-4">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 px-4 py-4 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 flex items-center gap-3">
                    {shareConfig.showPhoto ? (
                      <Avatar className="w-16 h-16 border-2 border-white/30 shadow-lg shrink-0">
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-amber-100 text-amber-600 text-lg">{profileData.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30 shrink-0">
                        <span className="text-xl font-bold">{profileData.name[0]}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="text-lg font-bold">{profileData.name}</h2>
                        <Badge className="bg-white/20 text-white text-[10px] border-0">{profileData.level}</Badge>
                      </div>
                      {shareConfig.showSalary && <p className="text-white/90 text-xs font-medium">{profileData.salary}</p>}
                      <div className="flex items-center gap-1.5 mt-1 text-white/80 text-[11px]">
                        <span>{profileData.age}岁</span>
                        <span className="w-1 h-1 bg-white/50 rounded-full" />
                        <span>{profileData.hometown}</span>
                        <span className="w-1 h-1 bg-white/50 rounded-full" />
                        <span>{profileData.experience}经验</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div className="p-3 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: GraduationCap, label: "学历", val: profileData.education },
                      { icon: MapPin, label: "现居", val: profileData.currentCity },
                      { icon: Clock, label: "入职", val: profileData.joinDate.slice(0, 7) },
                    ].map((item) => (
                      <div key={item.label} className="bg-amber-50 rounded-lg p-2 text-center">
                        <item.icon className="w-3.5 h-3.5 text-amber-500 mx-auto mb-0.5" />
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                        <p className="text-xs font-semibold text-foreground">{item.val}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-500" />资质证书</h4>
                    <div className="flex flex-wrap gap-1">
                      {profileData.certificates.map((cert, i) => (
                        <Badge key={i} variant="secondary" className="bg-amber-100 text-amber-700 text-[10px] font-normal">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" />技能特长</h4>
                    <div className="flex flex-wrap gap-1">
                      {profileData.skills.map((s, i) => <Badge key={i} variant="outline" className="text-[10px] font-normal">{s}</Badge>)}
                    </div>
                  </div>
                  {shareConfig.showWorkHistory && (
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-amber-500" />服务经历</h4>
                      <div className="space-y-1">
                        {profileData.workHistory.map((w, i) => (
                          <div key={i} className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                            <div>
                              <p className="text-xs font-medium text-foreground">{w.employer}</p>
                              <p className="text-[10px] text-muted-foreground">{w.period}</p>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-medium">{w.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {shareConfig.showPhone && (
                    <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">{profileData.phone}</span>
                    </div>
                  )}
                </div>
                {/* Footer */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-3 py-3 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center shrink-0"><Heart className="w-4 h-4 text-white" /></div>
                        <div><h3 className="font-bold text-xs">优厚家庭服务</h3></div>
                      </div>
                      <div className="space-y-0.5 text-[10px] text-white/70">
                        <p className="flex items-center gap-1"><Shield className="w-2.5 h-2.5 shrink-0" />人社部认证 - 行业协会会员</p>
                        <p className="flex items-center gap-1"><Phone className="w-2.5 h-2.5 shrink-0" />400-888-8888</p>
                      </div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="w-14 h-14 bg-white rounded-lg p-0.5">
                        <Image src="/youhou-service-qrcode.jpg" alt="客服二维码" width={52} height={52} className="w-full h-full object-cover rounded" />
                      </div>
                      <p className="text-[9px] text-white/50 mt-0.5">扫码联系</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="mt-3 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => setShowPoster(false)}>返回修改</Button>
                <Button size="sm" className="flex-1 bg-amber-500 hover:bg-amber-600"><Download className="w-4 h-4 mr-1" />保存海报</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
