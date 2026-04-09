"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  User,
  Camera,
  FileText,
  ChevronRight,
  Eye,
  EyeOff,
  Edit3,
  CheckCircle2,
  Filter,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface ServiceLog {
  id: string
  customerName: string
  serviceName: string
  date: string
  time: string
  content: string
  feedback: string
  photos: number
  visibleToEmployer: boolean
  status: "draft" | "submitted"
}

interface DailyReport {
  id: string
  date: string
  serviceCount: number
  totalHours: number
  summary: string
  status: "draft" | "submitted"
}

export function WorkbenchLogsTab() {
  const [activeType, setActiveType] = useState<"service" | "daily">("service")
  const [showLogDetail, setShowLogDetail] = useState(false)
  const [selectedLog, setSelectedLog] = useState<ServiceLog | null>(null)
  const [showDailyForm, setShowDailyForm] = useState(false)
  const [dailySummary, setDailySummary] = useState("")

  const serviceLogs: ServiceLog[] = [
    {
      id: "1",
      customerName: "王女士",
      serviceName: "产后腹直肌修复",
      date: "2026-04-09",
      time: "09:00-10:30",
      content: "本次进行腹直肌分离修复第3次治疗，使用电刺激配合手法按摩。腹直肌间距从初始4.5cm恢复至2.8cm，恢复良好。",
      feedback: "客户反馈腹部紧致感明显增强，日常活动中核心力量有所提升。",
      photos: 2,
      visibleToEmployer: true,
      status: "submitted",
    },
    {
      id: "2",
      customerName: "李女士",
      serviceName: "盆底肌康复训练",
      date: "2026-04-09",
      time: "14:00-15:30",
      content: "盆底肌康复第2次训练，电刺激+生物反馈训练。盆底肌力从1级提升至2级，漏尿症状有所缓解。",
      feedback: "客户配合度好，建议坚持每日凯格尔训练。",
      photos: 1,
      visibleToEmployer: true,
      status: "submitted",
    },
    {
      id: "3",
      customerName: "张女士",
      serviceName: "乳腺疏通护理",
      date: "2026-04-08",
      time: "16:00-17:00",
      content: "乳腺疏通第1次服务，左侧乳房有明显硬块，通过手法按摩+热敷处理后硬块基本消除。",
      feedback: "客户反馈疼痛明显减轻。",
      photos: 0,
      visibleToEmployer: false,
      status: "submitted",
    },
    {
      id: "4",
      customerName: "赵女士",
      serviceName: "产后骨盆修复",
      date: "2026-04-07",
      time: "10:00-11:30",
      content: "骨盆修复第8次治疗，骨盆前倾角度改善明显，从初始12°恢复至6°。",
      feedback: "客户表示腰痛症状基本消失。",
      photos: 2,
      visibleToEmployer: true,
      status: "submitted",
    },
  ]

  const dailyReports: DailyReport[] = [
    { id: "d1", date: "2026-04-09", serviceCount: 3, totalHours: 4.5, summary: "今日完成3位客户服务，均为产后康复项目。王女士恢复效果显著，李女士需加强训练。", status: "submitted" },
    { id: "d2", date: "2026-04-08", serviceCount: 2, totalHours: 3, summary: "完成2位客户服务，张女士乳腺疏通效果良好，刘女士骨盆修复进展顺利。", status: "submitted" },
    { id: "d3", date: "2026-04-07", serviceCount: 3, totalHours: 5, summary: "完成3位客户服务，赵女士骨盆修复即将结疗。", status: "submitted" },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Tabs value={activeType} onValueChange={(v) => setActiveType(v as "service" | "daily")} className="flex-1">
          <TabsList className="h-8 w-full bg-muted/60 p-0.5">
            <TabsTrigger value="service" className="flex-1 gap-1 text-xs">
              <FileText className="h-3 w-3" />
              服务日志
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex-1 gap-1 text-xs">
              <Edit3 className="h-3 w-3" />
              工作日报
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeType === "service" && (
        <div className="space-y-2">
          {serviceLogs.map((log) => (
            <Card key={log.id} className="border border-border/80 shadow-sm">
              <CardContent className="p-3">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                      <User className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{log.customerName}</p>
                      <p className="text-xs text-muted-foreground">{log.serviceName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {log.visibleToEmployer ? (
                      <Badge className="bg-blue-100 text-[10px] text-blue-600">
                        <Eye className="mr-0.5 h-2.5 w-2.5" />
                        雇主可见
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-[10px] text-gray-500">
                        <EyeOff className="mr-0.5 h-2.5 w-2.5" />
                        仅自己
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{log.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{log.time}</span>
                  </div>
                  {log.photos > 0 && (
                    <div className="flex items-center gap-1">
                      <Camera className="h-3 w-3" />
                      <span>{log.photos}张</span>
                    </div>
                  )}
                </div>

                <p className="line-clamp-2 text-xs text-muted-foreground">{log.content}</p>

                <div className="mt-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={() => {
                      setSelectedLog(log)
                      setShowLogDetail(true)
                    }}
                  >
                    查看详情
                    <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeType === "daily" && (
        <div className="space-y-2">
          <Button
            type="button"
            className="h-9 w-full gap-1.5 bg-teal-600 text-xs hover:bg-teal-700"
            onClick={() => {
              setDailySummary("")
              setShowDailyForm(true)
            }}
          >
            <Edit3 className="h-3.5 w-3.5" />
            填写今日日报
          </Button>

          {dailyReports.map((report) => (
            <Card key={report.id} className="border border-border/80 shadow-sm">
              <CardContent className="p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium">{report.date}</span>
                  </div>
                  <Badge className="bg-green-100 text-[10px] text-green-600">
                    <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" />
                    已提交
                  </Badge>
                </div>
                <div className="mb-2 flex gap-4 text-xs text-muted-foreground">
                  <span>服务 {report.serviceCount} 次</span>
                  <span>共 {report.totalHours} 小时</span>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{report.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showLogDetail} onOpenChange={setShowLogDetail}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>日志详情</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{selectedLog.customerName}</p>
                      <p className="text-xs text-muted-foreground">{selectedLog.serviceName}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{selectedLog.date}</p>
                      <p>{selectedLog.time}</p>
                    </div>
                  </div>
                </div>

                <Card className="border">
                  <CardContent className="p-3">
                    <p className="mb-1 text-sm font-medium">服务记录</p>
                    <p className="text-sm text-muted-foreground">{selectedLog.content}</p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-3">
                    <p className="mb-1 text-sm font-medium">客户反馈</p>
                    <p className="text-sm text-muted-foreground">{selectedLog.feedback}</p>
                  </CardContent>
                </Card>

                {selectedLog.photos > 0 && (
                  <Card className="border">
                    <CardContent className="p-3">
                      <p className="mb-2 text-sm font-medium">服务照片</p>
                      <div className="flex gap-2">
                        {Array.from({ length: selectedLog.photos }).map((_, i) => (
                          <div
                            key={i}
                            className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30"
                          >
                            <Camera className="h-6 w-6 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedLog.visibleToEmployer ? (
                    <>
                      <Eye className="h-3 w-3" />
                      <span>此日志对雇主可见</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3" />
                      <span>此日志仅自己可见</span>
                    </>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showDailyForm} onOpenChange={setShowDailyForm}>
        <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>填写工作日报</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-teal-600" />
                <span className="font-medium">2026-04-09</span>
              </div>
              <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                <span>今日服务: 3 次</span>
                <span>总时长: 4.5 小时</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">工作总结</label>
              <Textarea
                placeholder="请总结今日工作情况、客户反馈、特殊事项..."
                value={dailySummary}
                onChange={(e) => setDailySummary(e.target.value)}
                className="min-h-[120px] text-sm"
              />
            </div>

            <Button
              type="button"
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                setShowDailyForm(false)
                alert("日报已提交")
              }}
            >
              <CheckCircle2 className="mr-1 h-4 w-4" />
              提交日报
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
