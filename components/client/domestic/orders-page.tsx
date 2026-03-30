"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { OrderConsultantLines } from "@/components/order-consultant-lines"
import {
  CalendarDays,
  MapPin,
  Clock,
  User,
  Phone,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Video,
} from "lucide-react"

// 订单数据
const orders = [
  {
    id: "ORD20260115001",
    type: "月嫂服务",
    status: "ongoing",
    employer: "王女士",
    phone: "138****1234",
    address: "银川市金凤区瑞银财富中心xxx小区",
    startDate: "2026-01-15",
    endDate: "2026-02-10",
    duration: "26天",
    salary: "15800元",
    maternityConsultant: "张丽",
    careerConsultant: "陈明",
  },
  {
    id: "ORD20251220002",
    type: "月嫂服务",
    status: "pending",
    employer: "李先生",
    phone: "139****5678",
    address: "银川市兴庆区xxx花园",
    startDate: "2026-02-15",
    endDate: "2026-03-13",
    duration: "26天",
    salary: "15800元",
    maternityConsultant: "刘婷",
    careerConsultant: "",
  },
  {
    id: "ORD20251110003",
    type: "月嫂服务",
    status: "completed",
    employer: "张女士",
    phone: "137****9012",
    address: "银川市西夏区xxx小区",
    startDate: "2025-11-10",
    endDate: "2025-12-06",
    duration: "26天",
    salary: "15800元",
    maternityConsultant: "张丽",
    careerConsultant: "王强",
  },
]

// 面试信息
const interviews = [
  {
    id: 1,
    employer: "刘女士",
    phone: "136****3456",
    date: "2026-01-25",
    time: "14:00",
    type: "视频面试",
    status: "upcoming",
    address: "线上",
  },
  {
    id: 2,
    employer: "陈先生",
    phone: "135****7890",
    date: "2026-01-22",
    time: "10:00",
    type: "现场面试",
    status: "completed",
    address: "公司会议室",
  },
]

// 日历工单数据
const calendarEvents: Record<string, { type: string; title: string }[]> = {
  "2026-01-15": [{ type: "start", title: "王女士家服务开始" }],
  "2026-01-20": [{ type: "work", title: "工作日" }],
  "2026-01-25": [{ type: "interview", title: "刘女士视频面试" }],
  "2026-02-10": [{ type: "end", title: "王女士家服务结束" }],
  "2026-02-15": [{ type: "start", title: "李先生家服务开始" }],
}

export function DomesticOrdersPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("orders")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [selectedInterview, setSelectedInterview] = useState<(typeof interviews)[0] | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Badge className="bg-teal-100 text-teal-700 text-[10px]">服务中</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 text-[10px]">待开始</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-600 text-[10px]">已完成</Badge>
      default:
        return null
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  const selectedDateEvents = selectedDate ? calendarEvents[formatDate(selectedDate)] : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-2">接单中心</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{orders.filter(o => o.status === "ongoing").length}</p>
            <p className="text-xs text-white/70">进行中</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{orders.filter(o => o.status === "pending").length}</p>
            <p className="text-xs text-white/70">待开始</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{interviews.filter(i => i.status === "upcoming").length}</p>
            <p className="text-xs text-white/70">待面试</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-muted/50 p-1 rounded-xl mb-4">
            <TabsTrigger value="orders" className="flex-1 rounded-lg data-[state=active]:bg-white">
              订单列表
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1 rounded-lg data-[state=active]:bg-white">
              日历视图
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex-1 rounded-lg data-[state=active]:bg-white">
              面试信息
            </TabsTrigger>
          </TabsList>

          {/* Orders List */}
          <TabsContent value="orders" className="space-y-3">
            {orders.map((order) => (
              <Card 
                key={order.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{order.type}</h3>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <OrderConsultantLines
                    maternityConsultant={order.maternityConsultant}
                    careerConsultant={order.careerConsultant}
                    className="my-2"
                  />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{order.employer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      <span>{order.startDate} 至 {order.endDate} ({order.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{order.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="text-amber-600 font-bold">{order.salary}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-full"
                  modifiers={{
                    hasEvent: (date) => {
                      const dateStr = formatDate(date)
                      return !!calendarEvents[dateStr]
                    },
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: "#f59e0b",
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {selectedDate?.toLocaleDateString("zh-CN", { month: "long", day: "numeric" })} 日程
              </h3>
              {selectedDateEvents && selectedDateEvents.length > 0 ? (
                <div className="space-y-2">
                  {selectedDateEvents.map((event, index) => (
                    <Card key={index} className="border-0 shadow-sm border-l-4 border-l-amber-500">
                      <CardContent className="p-3">
                        <p className="font-medium text-sm text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center text-muted-foreground text-sm">
                    当日暂无安排
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Interview Tab */}
          <TabsContent value="interview" className="space-y-3">
            {interviews.map((interview) => (
              <Card 
                key={interview.id} 
                className={`border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  interview.status === "upcoming" ? "border-l-4 border-l-amber-500" : ""
                }`}
                onClick={() => setSelectedInterview(interview)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-amber-500" />
                      <h3 className="font-semibold text-foreground">{interview.type}</h3>
                    </div>
                    {interview.status === "upcoming" ? (
                      <Badge className="bg-amber-100 text-amber-700 text-[10px]">即将开始</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-600 text-[10px]">已完成</Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{interview.employer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{interview.date} {interview.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{interview.address}</span>
                    </div>
                  </div>
                  {interview.status === "upcoming" && (
                    <Button className="w-full mt-3 bg-amber-500 hover:bg-amber-600" size="sm">
                      进入面试
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>订单详情</SheetTitle>
          </SheetHeader>
          {selectedOrder && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">订单编号</span>
                <span className="text-sm font-medium text-foreground">{selectedOrder.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">服务类型</span>
                <span className="text-sm font-medium text-foreground">{selectedOrder.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">服务状态</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                <OrderConsultantLines
                  maternityConsultant={selectedOrder.maternityConsultant}
                  careerConsultant={selectedOrder.careerConsultant}
                  className="text-xs"
                />
              </div>
              
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">雇主信息</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">雇主姓名</span>
                  <span className="text-sm font-medium text-foreground">{selectedOrder.employer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">联系电话</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-amber-600">
                    <Phone className="w-3.5 h-3.5 mr-1" />
                    {selectedOrder.phone}
                  </Button>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-sm text-muted-foreground">服务地址</span>
                  <span className="text-sm font-medium text-foreground text-right max-w-[200px]">{selectedOrder.address}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">服务信息</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">服务周期</span>
                  <span className="text-sm font-medium text-foreground">{selectedOrder.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">开始日期</span>
                  <span className="text-sm font-medium text-foreground">{selectedOrder.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">结束日期</span>
                  <span className="text-sm font-medium text-foreground">{selectedOrder.endDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">服务费用</span>
                  <span className="text-lg font-bold text-amber-600">{selectedOrder.salary}</span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
