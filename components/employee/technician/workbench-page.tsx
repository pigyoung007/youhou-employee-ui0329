"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  ChevronRight,
  User,
  Stethoscope,
  ClipboardList,
} from "lucide-react"

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

export function TechnicianWorkbenchPage() {
  const [activeTab, setActiveTab] = useState("today")
  const [showServiceDetail, setShowServiceDetail] = useState(false)
  const [showServiceLog, setShowServiceLog] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null)

  const todayServices: ServiceRecord[] = [
    {
      id: "1",
      customerName: "王女士",
      serviceName: "产后腹直肌修复",
      serviceDate: "2026-01-22",
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
      serviceDate: "2026-01-22",
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
      serviceDate: "2026-01-22",
      serviceTime: "16:00-17:00",
      address: "西城区金融街18号",
      phone: "136****6666",
      status: "pending",
      items: [{ name: "护理精油", quantity: 1 }, { name: "热敷贴", quantity: 2 }],
    },
  ]

  const historyServices: ServiceRecord[] = [
    {
      id: "4",
      customerName: "赵女士",
      serviceName: "产后腹直肌修复",
      serviceDate: "2026-01-21",
      serviceTime: "10:00-11:30",
      address: "东城区王府井大街99号",
      phone: "135****5555",
      status: "completed",
      items: [{ name: "修复精油", quantity: 1 }],
    },
    {
      id: "5",
      customerName: "刘女士",
      serviceName: "骨盆修复",
      serviceDate: "2026-01-20",
      serviceTime: "15:00-16:30",
      address: "丰台区丽泽路55号",
      phone: "137****7777",
      status: "completed",
      items: [{ name: "骨盆带", quantity: 1 }, { name: "一次性床单", quantity: 2 }],
    },
  ]

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
    <Card className="border-0 shadow-sm mb-3">
      <CardContent className="p-4">
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
          <div className="flex gap-2 mt-4">
            {service.status === "pending" && (
              <>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Phone className="w-4 h-4 mr-1" />
                  联系客户
                </Button>
                <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-600">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  开始服务
                </Button>
              </>
            )}
            {service.status === "in_progress" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setSelectedService(service)
                    setShowServiceLog(true)
                  }}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  填写日志
                </Button>
                <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-600">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  完成服务
                </Button>
              </>
            )}
            {service.status === "completed" && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedService(service)
                  setShowServiceDetail(true)
                }}
              >
                <FileText className="w-4 h-4 mr-1" />
                查看详情
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 pt-4 safe-area-top">
        <h1 className="text-xl font-bold">服务工作台</h1>
        <p className="text-sm opacity-90 mt-1">管理您的服务记录</p>
      </div>

      {/* Stats Cards */}
      <div className="p-4 -mt-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-2">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">待服务</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">服务中</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">28</p>
                <p className="text-xs text-muted-foreground">本月完成</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service List */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-muted/50">
            <TabsTrigger value="today" className="flex-1">今日服务</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-4">
            {todayServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            {historyServices.map((service) => (
              <ServiceCard key={service.id} service={service} showActions={true} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

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
    </div>
  )
}
