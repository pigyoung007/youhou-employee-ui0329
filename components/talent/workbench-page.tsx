"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock, MapPin, Camera, Upload, LogIn, LogOut, Baby, Heart,
  CheckCircle2, FileText, ClipboardList, QrCode,
} from "lucide-react"
import { WorkbenchTabs } from "./workbench-tabs"
import { WorkbenchOrdersTab } from "./workbench-orders-tab"
import { WorkbenchContractsTab } from "./workbench-contracts-tab"
import { WorkbenchInsuranceTab } from "./workbench-insurance-tab"
import { WorkbenchLogsTab } from "./workbench-logs-tab"
import { WorkbenchScheduleTab } from "./workbench-schedule-tab"

const workbenchTabsList = [
  { id: "service", label: "服务" },
  { id: "orders", label: "订单" },
  { id: "contracts", label: "合同" },
  { id: "insurance", label: "保险" },
  { id: "logs", label: "日志" },
  { id: "schedule", label: "档期" },
]

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

interface TalentWorkbenchPageProps {
  onCreatePrivateOrder?: () => void
}

export function TalentWorkbenchPage({ onCreatePrivateOrder }: TalentWorkbenchPageProps) {
  const [activeTab, setActiveTab] = useState("service")
  const [showDailyLog, setShowDailyLog] = useState(false)
  const [showMealUpload, setShowMealUpload] = useState(false)
  const [showPunchRecords, setShowPunchRecords] = useState(false)
  const [babyLog, setBabyLog] = useState({ feedCount: "", diaperWet: "", diaperDirty: "", sleepTotal: "", temperature: "", weight: "", note: "" })
  const [motherLog, setMotherLog] = useState({ recovery: "", mood: "", note: "" })

  const completedTasks = dailyTasks.filter((t) => t.done).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="safe-area-top bg-gradient-to-r from-rose-500 to-pink-500 px-4 pb-2 pt-4">
        <h1 className="text-lg font-bold text-white">工作台</h1>
        <p className="mt-0.5 text-xs text-white/85">服务履约与业务管理</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gradient-to-b from-rose-500/10 to-transparent">
        <WorkbenchTabs
          tabs={workbenchTabsList}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      <main className="pb-24">
        {/* Service Tab */}
        {activeTab === "service" && (
          <div className="space-y-4 px-4 py-4">
            {/* Current Service Info */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-rose-50 to-pink-50">
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
                  <div className="flex-1 h-2 bg-rose-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(currentService.daysCompleted / currentService.totalDays) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-rose-600">{currentService.daysCompleted}/{currentService.totalDays}天</span>
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
                  <span className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-rose-500" />今日任务</span>
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
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowDailyLog(true)}>
                <CardContent className="p-3 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-pink-500" />
                  </div>
                  <p className="text-xs font-medium text-foreground">填写日报</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowMealUpload(true)}>
                <CardContent className="p-3 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs font-medium text-foreground">餐食记录</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => alert("出示销卡二维码")}>
                <CardContent className="p-3 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-violet-500" />
                  </div>
                  <p className="text-xs font-medium text-foreground">销卡</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="py-4">
            <WorkbenchOrdersTab onCreatePrivateOrder={onCreatePrivateOrder} />
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === "contracts" && (
          <div className="py-4">
            <WorkbenchContractsTab />
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab === "insurance" && (
          <div className="py-4">
            <WorkbenchInsuranceTab />
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === "logs" && (
          <div className="py-4">
            <WorkbenchLogsTab />
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="py-4">
            <WorkbenchScheduleTab />
          </div>
        )}
      </main>

      {/* Daily Log Sheet */}
      <Sheet open={showDailyLog} onOpenChange={setShowDailyLog}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-3 border-b border-border"><SheetTitle className="text-base">今日护理日报</SheetTitle></SheetHeader>
          <div className="flex-1 min-h-0 py-3 space-y-4 overflow-y-auto">
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
          <div className="pt-4 border-t border-border"><Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => setShowDailyLog(false)}>提交日报</Button></div>
        </SheetContent>
      </Sheet>

      {/* Meal Upload Sheet */}
      <Sheet open={showMealUpload} onOpenChange={setShowMealUpload}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>上传餐食照片</SheetTitle></SheetHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {["早餐", "午餐", "晚餐", "加餐"].map((meal) => (
                <Card key={meal} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-foreground mb-2">{meal}</p>
                    <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-rose-500 transition-colors">
                      <div className="text-center"><Camera className="w-6 h-6 mx-auto text-muted-foreground" /><p className="text-xs text-muted-foreground mt-1">点击上传</p></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => setShowMealUpload(false)}><Upload className="w-4 h-4 mr-2" />提交餐食记录</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Punch Records Sheet */}
      <Sheet open={showPunchRecords} onOpenChange={setShowPunchRecords}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>打卡记录</SheetTitle></SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {punchRecords.map((record, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <p className="font-medium text-sm text-foreground mb-2">{record.date}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-teal-600"><LogIn className="w-4 h-4" /><span>上户 {record.checkIn}</span></div>
                    <div className="flex items-center gap-2 text-rose-600"><LogOut className="w-4 h-4" /><span>下户 {record.checkOut}</span></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2"><MapPin className="w-3 h-3" /><span>{record.location}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
