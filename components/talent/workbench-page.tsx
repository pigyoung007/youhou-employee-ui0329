"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock, MapPin, Camera, Upload, LogIn, LogOut, Baby, Heart,
  Calendar, ChevronRight, CheckCircle2, FileText, ClipboardList,
  Phone, Star,
} from "lucide-react"

// Domestic Worker Workbench Data (monthly live-in care)
const currentService = {
  employer: "陈女士", babyName: "小宝", babyAge: "18天",
  address: "金凤区瑞银中心A座1208",
  startDate: "2025-02-10", endDate: "2025-03-08",
  daysCompleted: 11, totalDays: 26,
}

const dailyTasks = [
  { id: 1, time: "06:00", task: "晨间喂养", done: true },
  { id: 2, time: "08:00", task: "月子早餐", done: true },
  { id: 3, time: "09:00", task: "宝宝洗澡+抚触", done: true },
  { id: 4, time: "10:30", task: "产妇伤口护理", done: false },
  { id: 5, time: "12:00", task: "月子午餐", done: false },
  { id: 6, time: "14:00", task: "产妇康复操指导", done: false },
  { id: 7, time: "17:30", task: "月子晚餐", done: false },
  { id: 8, time: "20:00", task: "宝宝晚间护理", done: false },
]

const punchRecords = [
  { date: "2025-02-20", checkIn: "07:55", checkOut: "20:05", location: "金凤区瑞银中心A座" },
  { date: "2025-02-19", checkIn: "08:00", checkOut: "20:10", location: "金凤区瑞银中心A座" },
  { date: "2025-02-18", checkIn: "07:50", checkOut: "20:00", location: "金凤区瑞银中心A座" },
]

// Technician Workbench Data (visit-based services)
const todayServices = [
  {
    id: 1, serviceName: "催乳通乳", customerName: "赵女士", phone: "131****4567",
    serviceDate: "2025-02-20", serviceTime: "10:00-11:30",
    address: "金凤区阅海万家C区8-1-301", status: "upcoming" as const,
    items: [{ name: "精油", quantity: 1 }, { name: "热敷包", quantity: 2 }],
  },
  {
    id: 2, serviceName: "产后修复", customerName: "孙女士", phone: "132****8901",
    serviceDate: "2025-02-20", serviceTime: "14:00-15:30",
    address: "兴庆区丽景街168号", status: "upcoming" as const,
    items: [{ name: "修复仪", quantity: 1 }, { name: "腹带", quantity: 1 }],
  },
]

const historyServices = [
  {
    id: 10, serviceName: "小儿推拿", customerName: "周女士", phone: "130****2345",
    serviceDate: "2025-02-19", serviceTime: "09:00-10:00",
    address: "西夏区怀远路56号", status: "completed" as const,
    items: [{ name: "推拿油", quantity: 1 }],
  },
]

export function TalentWorkbenchPage() {
  const [workMode, setWorkMode] = useState<"domestic" | "technician">("domestic")
  const [showDailyLog, setShowDailyLog] = useState(false)
  const [showMealUpload, setShowMealUpload] = useState(false)
  const [showPunchRecords, setShowPunchRecords] = useState(false)
  const [showServiceDetail, setShowServiceDetail] = useState(false)
  const [showServiceLog, setShowServiceLog] = useState(false)
  const [selectedService, setSelectedService] = useState<(typeof todayServices)[0] | null>(null)
  const [babyLog, setBabyLog] = useState({ feedCount: "", diaperWet: "", diaperDirty: "", sleepTotal: "", temperature: "", weight: "", note: "" })
  const [motherLog, setMotherLog] = useState({ recovery: "", mood: "", note: "" })

  const completedTasks = dailyTasks.filter((t) => t.done).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 pt-4 pb-4 px-4 safe-area-top">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">工作台</h1>
          {/* Work Mode Toggle */}
          <div className="flex bg-white/20 rounded-lg p-0.5">
            <button
              onClick={() => setWorkMode("domestic")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${workMode === "domestic" ? "bg-white text-amber-600 font-medium" : "text-white"}`}
            >
              住家
            </button>
            <button
              onClick={() => setWorkMode("technician")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${workMode === "technician" ? "bg-white text-amber-600 font-medium" : "text-white"}`}
            >
              技师
            </button>
          </div>
        </div>
      </div>

      <main className="px-4 py-4 space-y-4 pb-24">
        {workMode === "domestic" ? (
          <>
            {/* Current Service Info */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{currentService.employer}家</h3>
                    <p className="text-xs text-muted-foreground">{currentService.babyName} ({currentService.babyAge})</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-[10px]">服务中</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{currentService.address}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-amber-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(currentService.daysCompleted / currentService.totalDays) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-amber-600">{currentService.daysCompleted}/{currentService.totalDays}天</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Punch */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-14 bg-teal-500 hover:bg-teal-600 flex flex-col gap-1">
                <LogIn className="w-5 h-5" />
                <span className="text-xs">上户打卡</span>
              </Button>
              <Button variant="outline" className="h-14 flex flex-col gap-1 bg-transparent" onClick={() => setShowPunchRecords(true)}>
                <Clock className="w-5 h-5" />
                <span className="text-xs">打卡记录</span>
              </Button>
            </div>

            {/* Daily Tasks */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-amber-500" />今日任务</span>
                  <span className="text-xs text-muted-foreground font-normal">{completedTasks}/{dailyTasks.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {dailyTasks.map((task) => (
                  <div key={task.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${task.done ? "bg-green-50" : "bg-muted/50"}`}>
                    {task.done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />}
                    <span className="text-xs font-medium text-muted-foreground w-12">{task.time}</span>
                    <span className={`text-sm ${task.done ? "text-foreground" : "text-muted-foreground"}`}>{task.task}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowDailyLog(true)}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">填写日报</p>
                    <p className="text-xs text-muted-foreground">记录今日护理</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowMealUpload(true)}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">餐食记录</p>
                    <p className="text-xs text-muted-foreground">上传月子餐照片</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          /* Technician Workbench */
          <>
            {/* Today Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 shadow-sm"><CardContent className="p-3 text-center"><p className="text-xl font-bold text-teal-600">{todayServices.length}</p><p className="text-xs text-muted-foreground">今日预约</p></CardContent></Card>
              <Card className="border-0 shadow-sm"><CardContent className="p-3 text-center"><p className="text-xl font-bold text-amber-600">0</p><p className="text-xs text-muted-foreground">已完成</p></CardContent></Card>
              <Card className="border-0 shadow-sm"><CardContent className="p-3 text-center"><p className="text-xl font-bold text-green-600">¥830</p><p className="text-xs text-muted-foreground">今日收入</p></CardContent></Card>
            </div>

            {/* Service List */}
            <Tabs defaultValue="today">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 h-9">
                <TabsTrigger value="today" className="text-xs">今日服务</TabsTrigger>
                <TabsTrigger value="history" className="text-xs">历史记录</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-4 space-y-3">
                {todayServices.map((svc) => (
                  <Card key={svc.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => { setSelectedService(svc); setShowServiceDetail(true) }}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{svc.serviceName}</h4>
                          <p className="text-xs text-muted-foreground">{svc.customerName}</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700 text-[10px]">待服务</Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{svc.serviceTime}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{svc.address}</div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" className="flex-1 bg-transparent" size="sm">导航</Button>
                        <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="sm">开始服务</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="history" className="mt-4 space-y-3">
                {historyServices.map((svc) => (
                  <Card key={svc.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{svc.serviceName}</h4>
                          <p className="text-xs text-muted-foreground">{svc.customerName} | {svc.serviceDate}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 text-[10px]">已完成</Badge>
                      </div>
                      <Button variant="ghost" className="w-full mt-2 text-xs text-muted-foreground" size="sm"
                        onClick={() => { setSelectedService(svc as any); setShowServiceLog(true) }}>
                        填写服务日志 <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Daily Log Sheet (Domestic) */}
      <Sheet open={showDailyLog} onOpenChange={setShowDailyLog}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border"><SheetTitle className="text-base">今日护理日报</SheetTitle></SheetHeader>
          <div className="py-3 space-y-4 overflow-y-auto h-[calc(75vh-100px)]">
            <div>
              <div className="flex items-center gap-2 mb-3"><Baby className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-foreground">宝宝护理记录</h3></div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">喂养次数</Label><Input value={babyLog.feedCount} onChange={(e) => setBabyLog({ ...babyLog, feedCount: e.target.value })} placeholder="次" /></div>
                  <div><Label className="text-xs">换尿布(湿)</Label><Input value={babyLog.diaperWet} onChange={(e) => setBabyLog({ ...babyLog, diaperWet: e.target.value })} placeholder="次" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">换尿布(便)</Label><Input value={babyLog.diaperDirty} onChange={(e) => setBabyLog({ ...babyLog, diaperDirty: e.target.value })} placeholder="次" /></div>
                  <div><Label className="text-xs">睡眠时长</Label><Input value={babyLog.sleepTotal} onChange={(e) => setBabyLog({ ...babyLog, sleepTotal: e.target.value })} placeholder="小时" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">体温</Label><Input value={babyLog.temperature} onChange={(e) => setBabyLog({ ...babyLog, temperature: e.target.value })} placeholder="°C" /></div>
                  <div><Label className="text-xs">体重</Label><Input value={babyLog.weight} onChange={(e) => setBabyLog({ ...babyLog, weight: e.target.value })} placeholder="kg" /></div>
                </div>
                <div><Label className="text-xs">备注</Label><Textarea value={babyLog.note} onChange={(e) => setBabyLog({ ...babyLog, note: e.target.value })} placeholder="记录宝宝今日特殊情况..." rows={2} /></div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3"><Heart className="w-5 h-5 text-pink-500" /><h3 className="font-semibold text-foreground">产妇护理记录</h3></div>
              <div className="space-y-4">
                <div><Label className="text-xs">恢复情况</Label><Textarea value={motherLog.recovery} onChange={(e) => setMotherLog({ ...motherLog, recovery: e.target.value })} placeholder="记录产妇恢复情况..." rows={2} /></div>
                <div><Label className="text-xs">情绪状态</Label><Input value={motherLog.mood} onChange={(e) => setMotherLog({ ...motherLog, mood: e.target.value })} placeholder="如：稳定、焦虑、开心等" /></div>
                <div><Label className="text-xs">其他备注</Label><Textarea value={motherLog.note} onChange={(e) => setMotherLog({ ...motherLog, note: e.target.value })} placeholder="记录其他需要注意的事项..." rows={2} /></div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-border"><Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => setShowDailyLog(false)}>提交日报</Button></div>
        </SheetContent>
      </Sheet>

      {/* Meal Upload Sheet */}
      <Sheet open={showMealUpload} onOpenChange={setShowMealUpload}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>上传餐食照片</SheetTitle></SheetHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {["早餐", "午餐", "晚餐", "加餐"].map((meal) => (
                <Card key={meal} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-foreground mb-2">{meal}</p>
                    <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-amber-500 transition-colors">
                      <div className="text-center"><Camera className="w-6 h-6 mx-auto text-muted-foreground" /><p className="text-xs text-muted-foreground mt-1">点击上传</p></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => setShowMealUpload(false)}><Upload className="w-4 h-4 mr-2" />提交餐食记录</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Punch Records Sheet */}
      <Sheet open={showPunchRecords} onOpenChange={setShowPunchRecords}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>打卡记录</SheetTitle></SheetHeader>
          <div className="py-4 space-y-3 overflow-y-auto h-[calc(70vh-100px)]">
            {punchRecords.map((record, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <p className="font-medium text-sm text-foreground mb-2">{record.date}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-teal-600"><LogIn className="w-4 h-4" /><span>上户 {record.checkIn}</span></div>
                    <div className="flex items-center gap-2 text-amber-600"><LogOut className="w-4 h-4" /><span>下户 {record.checkOut}</span></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2"><MapPin className="w-3 h-3" /><span>{record.location}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Service Detail Dialog (Technician) */}
      <Dialog open={showServiceDetail} onOpenChange={setShowServiceDetail}>
        <DialogContent className="max-w-sm w-[92vw] max-h-[80vh] rounded-xl">
          <DialogHeader><DialogTitle>服务详情</DialogTitle></DialogHeader>
          {selectedService && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <Card className="border">
                  <CardHeader className="pb-2"><CardTitle className="text-base">客户信息</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">客户姓名</span><span>{selectedService.customerName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">联系电话</span><span>{selectedService.phone}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">服务地址</span><span className="text-right max-w-[60%]">{selectedService.address}</span></div>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardHeader className="pb-2"><CardTitle className="text-base">服务信息</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">服务项目</span><span>{selectedService.serviceName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">服务日期</span><span>{selectedService.serviceDate}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">服务时间</span><span>{selectedService.serviceTime}</span></div>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardHeader className="pb-2"><CardTitle className="text-base">耗材使用</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedService.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm"><span className="text-muted-foreground">{item.name}</span><span>x{item.quantity}</span></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Service Log Dialog (Technician) */}
      <Dialog open={showServiceLog} onOpenChange={setShowServiceLog}>
        <DialogContent className="max-w-sm w-[92vw] max-h-[80vh] rounded-xl">
          <DialogHeader><DialogTitle>填写服务日志</DialogTitle></DialogHeader>
          {selectedService && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium">{selectedService.customerName} - {selectedService.serviceName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedService.serviceDate} {selectedService.serviceTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">服务记录</label>
                  <textarea className="w-full h-24 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20" placeholder="请填写本次服务的详细记录..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">客户反馈</label>
                  <textarea className="w-full h-20 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20" placeholder="请记录客户的反馈意见..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">服务照片</label>
                  <div className="flex gap-2">
                    <button className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:border-teal-500 hover:text-teal-600 transition-colors">
                      <Camera className="w-6 h-6" /><span className="text-xs mt-1">添加</span>
                    </button>
                  </div>
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-600"><CheckCircle2 className="w-4 h-4 mr-2" />提交日志</Button>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
