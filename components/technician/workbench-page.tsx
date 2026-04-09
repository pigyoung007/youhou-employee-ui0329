"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Camera,
  Edit3,
  User,
  Stethoscope,
  CreditCard,
  QrCode,
  ClipboardList,
  FileSignature,
  Shield,
  CalendarDays,
  LogIn,
  LogOut,
} from "lucide-react"
import { WorkbenchOrdersTab } from "./workbench-orders-tab"
import { WorkbenchContractsTab } from "./workbench-contracts-tab"
import { WorkbenchInsuranceTab } from "./workbench-insurance-tab"
import { WorkbenchLogsTab } from "./workbench-logs-tab"
import { WorkbenchScheduleTab } from "./workbench-schedule-tab"

interface ServiceRecord {
  id: string
  customerName: string
  serviceName: string
  serviceDate: string
  serviceTime: string
  address: string
  phone: string
  status: "pending" | "in_progress" | "completed"
  items: { name: string; quantity: number }[]
}

interface TechnicianWorkbenchPageProps {
  onOpenCardDeduction?: () => void
  onCreatePrivateOrder?: () => void
}

const STATUS_ORDER: Record<ServiceRecord["status"], number> = {
  pending: 0,
  in_progress: 1,
  completed: 2,
}

type WorkbenchTab = "service" | "orders" | "contracts" | "insurance" | "logs" | "schedule"

const TABS: { id: WorkbenchTab; label: string; icon: typeof Stethoscope }[] = [
  { id: "service", label: "服务", icon: Stethoscope },
  { id: "orders", label: "订单", icon: ClipboardList },
  { id: "contracts", label: "合同", icon: FileSignature },
  { id: "insurance", label: "保险", icon: Shield },
  { id: "logs", label: "日志", icon: FileText },
  { id: "schedule", label: "档期", icon: CalendarDays },
]

const punchRecords = [
  { date: "2026-04-09", checkIn: "08:30", checkOut: "17:30", location: "朝阳区建国路88号" },
  { date: "2026-04-08", checkIn: "08:45", checkOut: "18:00", location: "海淀区中关村大街66号" },
  { date: "2026-04-07", checkIn: "09:00", checkOut: "17:00", location: "西城区金融街18号" },
  { date: "2026-04-05", checkIn: "08:30", checkOut: "16:30", location: "东城区王府井大街99号" },
]

export function TechnicianWorkbenchPage({ onOpenCardDeduction, onCreatePrivateOrder }: TechnicianWorkbenchPageProps) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>("service")
  const [showServiceDetail, setShowServiceDetail] = useState(false)
  const [showServiceLog, setShowServiceLog] = useState(false)
  const [showStartQr, setShowStartQr] = useState(false)
  const [showPunchRecords, setShowPunchRecords] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null)

  const todayServicesRaw: ServiceRecord[] = [
    {
      id: "1",
      customerName: "王女士",
      serviceName: "产后腹直肌修复",
      serviceDate: "2026-04-09",
      serviceTime: "09:00-10:30",
      address: "朝阳区建国路88号",
      phone: "138****8888",
      status: "completed",
      items: [{ name: "修复精油", quantity: 1 }, { name: "一次性床单", quantity: 2 }],
    },
    {
      id: "2",
      customerName: "李女士",
      serviceName: "盆底肌康复训练",
      serviceDate: "2026-04-09",
      serviceTime: "14:00-15:30",
      address: "海淀区中关村大街66号",
      phone: "139****9999",
      status: "in_progress",
      items: [{ name: "康复仪贴片", quantity: 4 }, { name: "消毒湿巾", quantity: 1 }],
    },
    {
      id: "3",
      customerName: "张女士",
      serviceName: "乳腺疏通护理",
      serviceDate: "2026-04-09",
      serviceTime: "16:00-17:00",
      address: "西城区金融街18号",
      phone: "136****6666",
      status: "pending",
      items: [{ name: "护理精油", quantity: 1 }, { name: "热敷贴", quantity: 2 }],
    },
  ]

  const todayServices = [...todayServicesRaw].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">待服务</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">服务中</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">已完成</Badge>
      default:
        return null
    }
  }

  const ServiceCard = ({ service, showActions = true }: { service: ServiceRecord; showActions?: boolean }) => (
    <Card className="mb-2 border border-border/80 shadow-sm">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-emerald-50 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium text-foreground">{service.customerName}</p>
              <p className="text-xs text-muted-foreground">{service.serviceName}</p>
            </div>
          </div>
          {getStatusBadge(service.status)}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{service.serviceDate}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{service.serviceTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{service.address}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{service.phone}</span>
          </div>
        </div>

        {showActions && (
          <div className="mt-3 space-y-2">
            {service.status === "pending" && (
              <>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 flex-1 border-teal-200 bg-transparent text-xs" type="button">
                    <Phone className="mr-1 h-3.5 w-3.5" />
                    联系客户
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 flex-1 border-teal-200 bg-transparent text-xs" type="button">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    到户打卡
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="h-9 w-full bg-teal-600 text-xs hover:bg-teal-700"
                  type="button"
                  onClick={() => {
                    setSelectedService(service)
                    setShowStartQr(true)
                  }}
                >
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  开始服务（销卡）
                </Button>
              </>
            )}
            {service.status === "in_progress" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 flex-1 bg-transparent text-xs"
                  type="button"
                  onClick={() => {
                    setSelectedService(service)
                    setShowServiceLog(true)
                  }}
                >
                  <Edit3 className="mr-1 h-3.5 w-3.5" />
                  日志/照片
                </Button>
                <Button size="sm" className="h-8 flex-1 bg-teal-600 text-xs hover:bg-teal-700" type="button">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  完成服务
                </Button>
              </div>
            )}
            {service.status === "completed" && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-full bg-transparent text-xs"
                type="button"
                onClick={() => {
                  setSelectedService(service)
                  setShowServiceDetail(true)
                }}
              >
                <FileText className="mr-1 h-3.5 w-3.5" />
                查看详情
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-4 pb-3 pt-4 text-white safe-area-top">
        <h1 className="text-lg font-bold">服务工作台</h1>
        <p className="mt-0.5 text-xs opacity-90">管理服务、订单、合同与档期</p>
      </div>

      {/* Tab Bar */}
      <div className="-mt-1 px-3">
        <div className="flex gap-0.5 overflow-x-auto rounded-lg bg-white p-1 shadow-md scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-md px-1.5 py-1.5 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "bg-teal-500 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-3 pt-3 pb-4">
        {activeTab === "service" && (
          <>
            {/* Stats + 销卡入口 */}
            <div className="space-y-2 pb-3">
              {onOpenCardDeduction && (
                <Button
                  type="button"
                  className="h-10 w-full gap-2 bg-white text-teal-700 shadow-sm hover:bg-teal-50"
                  variant="secondary"
                  onClick={onOpenCardDeduction}
                >
                  <CreditCard className="h-4 w-4" />
                  套卡销卡（查询卡号 / 扫码核销）
                </Button>
              )}
              <Card className="border border-border/80 shadow-sm">
                <CardContent className="p-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <p className="text-xl font-bold text-foreground">1</p>
                      <p className="text-[10px] text-muted-foreground">待服务</p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-xl font-bold text-foreground">1</p>
                      <p className="text-[10px] text-muted-foreground">服务中</p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-xl font-bold text-foreground">28</p>
                      <p className="text-[10px] text-muted-foreground">本月完成</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Punch Clock */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-14 bg-teal-500 hover:bg-teal-600 flex flex-col gap-1">
                  <LogIn className="w-5 h-5" />
                  <span className="text-xs">签到打卡</span>
                </Button>
                <Button variant="outline" className="h-14 flex flex-col gap-1 bg-transparent" onClick={() => setShowPunchRecords(true)}>
                  <Clock className="w-5 h-5" />
                  <span className="text-xs">打卡记录</span>
                </Button>
              </div>
            </div>

            {/* Today Services */}
            <p className="mb-2 text-sm font-medium text-foreground">今日服务</p>
            {todayServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </>
        )}

        {activeTab === "orders" && (
          <WorkbenchOrdersTab onCreatePrivateOrder={onCreatePrivateOrder} />
        )}

        {activeTab === "contracts" && <WorkbenchContractsTab />}

        {activeTab === "insurance" && <WorkbenchInsuranceTab />}

        {activeTab === "logs" && <WorkbenchLogsTab />}

        {activeTab === "schedule" && <WorkbenchScheduleTab />}
      </div>

      {/* 销卡二维码 Dialog */}
      <Dialog open={showStartQr} onOpenChange={setShowStartQr}>
        <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>销卡二维码</DialogTitle>
            <DialogDescription>
              {selectedService && (
                <>
                  {selectedService.customerName} · {selectedService.serviceName}
                  <br />
                  请雇主使用优厚家服小程序「扫一扫」扫描完成核销
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex h-44 w-44 items-center justify-center rounded-xl border-2 border-dashed border-teal-200 bg-muted/40">
              <QrCode className="h-24 w-24 text-teal-600" strokeWidth={1.1} />
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              演示环境为占位图；上线后展示真实销卡二维码
            </p>
            <Button type="button" variant="outline" className="w-full" onClick={() => setShowStartQr(false)}>
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Detail Dialog */}
      <Dialog open={showServiceDetail} onOpenChange={setShowServiceDetail}>
        <DialogContent className="max-w-[90vw] max-h-[85vh] rounded-xl">
          <DialogHeader>
            <DialogTitle>服务详情</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">客户信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">客户姓名</span>
                      <span>{selectedService.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">联系电话</span>
                      <span>{selectedService.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务地址</span>
                      <span className="text-right max-w-[60%]">{selectedService.address}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">服务信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务项目</span>
                      <span>{selectedService.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务日期</span>
                      <span>{selectedService.serviceDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务时间</span>
                      <span>{selectedService.serviceTime}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">耗材使用</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedService.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span>x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Service Log Dialog */}
      <Dialog open={showServiceLog} onOpenChange={setShowServiceLog}>
        <DialogContent className="max-w-[90vw] max-h-[85vh] rounded-xl">
          <DialogHeader>
            <DialogTitle>填写服务日志</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium">{selectedService.customerName} - {selectedService.serviceName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedService.serviceDate} {selectedService.serviceTime}</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">服务记录</label>
                  <textarea
                    className="w-full h-24 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="请填写本次服务的详细记录..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">客户反馈</label>
                  <textarea
                    className="w-full h-20 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="请记录客户的反馈意见..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">服务照片</label>
                  <div className="flex gap-2">
                    <button className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-teal-600 transition-colors">
                      <Camera className="w-6 h-6" />
                      <span className="text-xs mt-1">添加</span>
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-teal-500 hover:bg-teal-600">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  提交日志
                </Button>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Punch Records Sheet */}
      <Sheet open={showPunchRecords} onOpenChange={setShowPunchRecords}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>打卡记录</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {punchRecords.map((record, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <p className="font-medium text-sm text-foreground mb-2">{record.date}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-teal-600">
                      <LogIn className="w-4 h-4" />
                      <span>签到 {record.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-600">
                      <LogOut className="w-4 h-4" />
                      <span>签退 {record.checkOut}</span>
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
