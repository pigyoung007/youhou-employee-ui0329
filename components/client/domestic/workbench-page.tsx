"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  MapPin,
  Clock,
  Camera,
  CheckCircle2,
  AlertCircle,
  LogIn,
  LogOut,
  FileText,
  Utensils,
  Baby,
  Heart,
  Thermometer,
  Droplet,
  Moon,
  Sun,
  Upload,
  X,
} from "lucide-react"
import Image from "next/image"

// 当前服务信息
const currentService = {
  employer: "王女士",
  address: "银川市金凤区瑞银财富中心xxx小区",
  startDate: "2026-01-15",
  day: 7,
  totalDays: 26,
}

// 打卡记录
const punchRecords = [
  { date: "2026-01-21", checkIn: "07:30", checkOut: "22:00", location: "金凤区瑞银财富中心xxx小区" },
  { date: "2026-01-20", checkIn: "07:35", checkOut: "21:45", location: "金凤区瑞银财富中心xxx小区" },
  { date: "2026-01-19", checkIn: "07:28", checkOut: "22:10", location: "金凤区瑞银财富中心xxx小区" },
]

// 日报模板
const dailyLogTemplate = {
  baby: {
    feeding: { times: 0, amount: "", note: "" },
    diaper: { wet: 0, dirty: 0, note: "" },
    sleep: { total: "", daytime: "", night: "", note: "" },
    temperature: "",
    weight: "",
    note: "",
  },
  mother: {
    meals: { breakfast: "", lunch: "", dinner: "", snacks: "" },
    recovery: "",
    mood: "",
    note: "",
  },
}

export function DomesticWorkbenchPage() {
  const [isPunchedIn, setIsPunchedIn] = useState(false)
  const [showDailyLog, setShowDailyLog] = useState(false)
  const [showMealUpload, setShowMealUpload] = useState(false)
  const [showPunchRecords, setShowPunchRecords] = useState(false)
  const [mealPhotos, setMealPhotos] = useState<string[]>([])

  // 日报数据
  const [babyLog, setBabyLog] = useState({
    feedingTimes: "8",
    feedingAmount: "600ml",
    diaperWet: "6",
    diaperDirty: "3",
    sleepTotal: "16小时",
    temperature: "36.5",
    weight: "4.2kg",
    note: "宝宝今天状态很好，吃奶有力，睡眠充足。",
  })

  const [motherLog, setMotherLog] = useState({
    recovery: "恢复良好，伤口愈合正常",
    mood: "情绪稳定",
    note: "产妇今天精神状态好，食欲正常。",
  })

  const handlePunch = () => {
    setIsPunchedIn(!isPunchedIn)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">工作台</h1>
        
        {/* Current Service Info */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/80">当前服务</span>
            <Badge className="bg-white/20 text-white">第{currentService.day}/{currentService.totalDays}天</Badge>
          </div>
          <h3 className="font-semibold">{currentService.employer}家</h3>
          <div className="flex items-center gap-1 text-sm text-white/80 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{currentService.address}</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Punch Card */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">工作打卡</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isPunchedIn ? "已上户打卡，工作中" : "请在到达后打卡"}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs"
                onClick={() => setShowPunchRecords(true)}
              >
                打卡记录
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                className={`h-20 flex-col gap-1 ${
                  isPunchedIn
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
                onClick={handlePunch}
                disabled={isPunchedIn}
              >
                <LogIn className="w-6 h-6" />
                <span className="text-sm">上户打卡</span>
                {isPunchedIn && <span className="text-[10px] text-white/80">07:30</span>}
              </Button>
              <Button
                className={`h-20 flex-col gap-1 ${
                  isPunchedIn
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handlePunch}
                disabled={!isPunchedIn}
              >
                <LogOut className="w-6 h-6" />
                <span className="text-sm">下户打卡</span>
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>GPS定位：银川市金凤区瑞银财富中心</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowDailyLog(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">填写日报</h3>
                  <p className="text-xs text-muted-foreground">宝宝/产妇护理记录</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowMealUpload(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">餐食上传</h3>
                  <p className="text-xs text-muted-foreground">上传月子餐照片</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">今日概况</h2>
          
          {/* Baby Stats */}
          <Card className="border-0 shadow-sm mb-3">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Baby className="w-4 h-4 text-rose-500" />
                <h3 className="font-medium text-foreground">宝宝情况</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-rose-50 rounded-lg">
                  <Droplet className="w-4 h-4 mx-auto text-rose-400 mb-1" />
                  <p className="text-sm font-bold text-foreground">8次</p>
                  <p className="text-[10px] text-muted-foreground">喂奶</p>
                </div>
                <div className="text-center p-2 bg-amber-50 rounded-lg">
                  <Sun className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                  <p className="text-sm font-bold text-foreground">6次</p>
                  <p className="text-[10px] text-muted-foreground">换尿布</p>
                </div>
                <div className="text-center p-2 bg-violet-50 rounded-lg">
                  <Moon className="w-4 h-4 mx-auto text-violet-400 mb-1" />
                  <p className="text-sm font-bold text-foreground">16h</p>
                  <p className="text-[10px] text-muted-foreground">睡眠</p>
                </div>
                <div className="text-center p-2 bg-teal-50 rounded-lg">
                  <Thermometer className="w-4 h-4 mx-auto text-teal-400 mb-1" />
                  <p className="text-sm font-bold text-foreground">36.5°</p>
                  <p className="text-[10px] text-muted-foreground">体温</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mother Stats */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-pink-500" />
                <h3 className="font-medium text-foreground">产妇情况</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">恢复情况</span>
                  <span className="text-foreground">良好</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">情绪状态</span>
                  <span className="text-foreground">稳定</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">今日餐食</span>
                  <span className="text-teal-600">已完成 4/4 餐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Daily Log Sheet */}
      <Sheet open={showDailyLog} onOpenChange={setShowDailyLog}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>填写护理日报</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-6 overflow-y-auto">
            {/* Baby Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Baby className="w-5 h-5 text-rose-500" />
                <h3 className="font-semibold text-foreground">宝宝护理记录</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">喂奶次数</Label>
                    <Input value={babyLog.feedingTimes} onChange={(e) => setBabyLog({...babyLog, feedingTimes: e.target.value})} placeholder="次" />
                  </div>
                  <div>
                    <Label className="text-xs">喂奶总量</Label>
                    <Input value={babyLog.feedingAmount} onChange={(e) => setBabyLog({...babyLog, feedingAmount: e.target.value})} placeholder="ml" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">换尿布(湿)</Label>
                    <Input value={babyLog.diaperWet} onChange={(e) => setBabyLog({...babyLog, diaperWet: e.target.value})} placeholder="次" />
                  </div>
                  <div>
                    <Label className="text-xs">换尿布(便)</Label>
                    <Input value={babyLog.diaperDirty} onChange={(e) => setBabyLog({...babyLog, diaperDirty: e.target.value})} placeholder="次" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">睡眠时长</Label>
                    <Input value={babyLog.sleepTotal} onChange={(e) => setBabyLog({...babyLog, sleepTotal: e.target.value})} placeholder="小时" />
                  </div>
                  <div>
                    <Label className="text-xs">体温</Label>
                    <Input value={babyLog.temperature} onChange={(e) => setBabyLog({...babyLog, temperature: e.target.value})} placeholder="°C" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">体重</Label>
                  <Input value={babyLog.weight} onChange={(e) => setBabyLog({...babyLog, weight: e.target.value})} placeholder="kg" />
                </div>
                <div>
                  <Label className="text-xs">备注</Label>
                  <Textarea 
                    value={babyLog.note} 
                    onChange={(e) => setBabyLog({...babyLog, note: e.target.value})}
                    placeholder="记录宝宝今日特殊情况..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Mother Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <h3 className="font-semibold text-foreground">产妇护理记录</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-xs">恢复情况</Label>
                  <Textarea 
                    value={motherLog.recovery}
                    onChange={(e) => setMotherLog({...motherLog, recovery: e.target.value})}
                    placeholder="记录产妇恢复情况..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-xs">情绪状态</Label>
                  <Input 
                    value={motherLog.mood}
                    onChange={(e) => setMotherLog({...motherLog, mood: e.target.value})}
                    placeholder="如：稳定、焦虑、开心等"
                  />
                </div>
                <div>
                  <Label className="text-xs">其他备注</Label>
                  <Textarea 
                    value={motherLog.note}
                    onChange={(e) => setMotherLog({...motherLog, note: e.target.value})}
                    placeholder="记录其他需要注意的事项..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => setShowDailyLog(false)}>
              提交日报
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Meal Upload Sheet */}
      <Sheet open={showMealUpload} onOpenChange={setShowMealUpload}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>上传餐食照片</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {["早餐", "午餐", "晚餐", "加餐"].map((meal, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-foreground mb-2">{meal}</p>
                    <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-amber-500 transition-colors">
                      <div className="text-center">
                        <Camera className="w-6 h-6 mx-auto text-muted-foreground" />
                        <p className="text-xs text-muted-foreground mt-1">点击上传</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => setShowMealUpload(false)}>
              <Upload className="w-4 h-4 mr-2" />
              提交餐食记录
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Punch Records Sheet */}
      <Sheet open={showPunchRecords} onOpenChange={setShowPunchRecords}>
        <SheetContent side="right" className="w-[85vw] max-w-sm">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>打卡记录</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {punchRecords.map((record, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <p className="font-medium text-sm text-foreground mb-2">{record.date}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-teal-600">
                      <LogIn className="w-4 h-4" />
                      <span>上户 {record.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600">
                      <LogOut className="w-4 h-4" />
                      <span>下户 {record.checkOut}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <MapPin className="w-3 h-3" />
                    <span>{record.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
