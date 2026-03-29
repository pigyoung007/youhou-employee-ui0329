"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronRight,
  Filter,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export function TechnicianOrdersPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [showDetail, setShowDetail] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const orders = {
    pending: [
      {
        id: 1,
        customer: "王女士",
        phone: "138****5678",
        service: "产后腹直肌修复",
        date: "2024-01-20",
        time: "09:00-10:30",
        address: "朝阳区望京SOHO T1 1205室",
        price: 680,
        note: "产后3个月，首次体验",
        session: "1/10",
      },
      {
        id: 2,
        customer: "李女士",
        phone: "139****1234",
        service: "盆底肌康复训练",
        date: "2024-01-20",
        time: "14:00-15:30",
        address: "海淀区中关村软件园二期 8号楼",
        price: 580,
        note: "产后6个月，盆底肌松弛",
        session: "2/12",
      },
    ],
    accepted: [
      {
        id: 3,
        customer: "张女士",
        phone: "136****9876",
        service: "乳腺疏通护理",
        date: "2024-01-21",
        time: "10:00-11:30",
        address: "西城区金融街威斯汀酒店 2308",
        price: 480,
        status: "confirmed",
        session: "3/6",
      },
    ],
    completed: [
      {
        id: 4,
        customer: "赵女士",
        phone: "135****4567",
        service: "产后骨盆修复",
        date: "2024-01-18",
        time: "15:00-16:30",
        address: "东城区东方银座 A座 1608",
        price: 780,
        rating: 5,
        comment: "技术很专业，效果明显",
        session: "8/10",
      },
    ],
  }

  const handleViewDetail = (order: any) => {
    setSelectedOrder(order)
    setShowDetail(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-teal-100 text-teal-700"
      case "completed":
        return "bg-green-100 text-green-700"
      default:
        return "bg-amber-100 text-amber-700"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 pt-4 pb-4 px-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">接单中心</h1>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Filter className="w-4 h-4 mr-1" />
            筛选
          </Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white/20 p-1">
            <TabsTrigger
              value="pending"
              className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-teal-600"
            >
              待接单
              <Badge className="ml-1 bg-white/30 text-white text-xs px-1.5">
                {orders.pending.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="accepted"
              className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-teal-600"
            >
              已接单
              <Badge className="ml-1 bg-white/30 text-white text-xs px-1.5">
                {orders.accepted.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-teal-600"
            >
              已完成
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <main className="px-4 py-4 space-y-3">
        {activeTab === "pending" && (
          <>
            {orders.pending.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{order.service}</h3>
                        <p className="text-sm text-muted-foreground">第{order.session}次服务</p>
                      </div>
                      <span className="text-lg font-bold text-teal-600">¥{order.price}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-teal-100 text-teal-600 text-xs">
                            {order.customer[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{order.customer}</span>
                        <span className="text-muted-foreground">{order.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{order.date}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{order.time}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{order.address}</span>
                      </div>
                      {order.note && (
                        <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                          备注: {order.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex border-t border-border">
                    <button
                      onClick={() => handleViewDetail(order)}
                      className="flex-1 py-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      查看详情
                    </button>
                    <div className="w-px bg-border" />
                    <button className="flex-1 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-1">
                      <XCircle className="w-4 h-4" />
                      拒绝
                    </button>
                    <div className="w-px bg-border" />
                    <button className="flex-1 py-3 text-sm text-teal-600 hover:bg-teal-50 transition-colors flex items-center justify-center gap-1 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      接单
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {activeTab === "accepted" && (
          <>
            {orders.accepted.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{order.service}</h3>
                      <p className="text-sm text-muted-foreground">第{order.session}次服务</p>
                    </div>
                    <Badge className={getStatusColor(order.status || "")}>已确认</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-teal-100 text-teal-600 text-xs">
                          {order.customer[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>{order.customer}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-teal-600">
                        <Phone className="w-3 h-3 mr-1" />
                        联系
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{order.date}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{order.time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{order.address}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      导航前往
                    </Button>
                    <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="sm">
                      开始服务
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {activeTab === "completed" && (
          <>
            {orders.completed.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{order.service}</h3>
                      <p className="text-sm text-muted-foreground">第{order.session}次服务</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">已完成</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{order.date}</span>
                      <span className="mx-1">|</span>
                      <span>{order.customer}</span>
                    </div>
                  </div>
                  {order.rating && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(order.rating)].map((_, i) => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                        <span className="text-sm text-amber-600 ml-1">{order.rating}.0</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.comment}</p>
                    </div>
                  )}
                  <Button variant="ghost" className="w-full mt-3 text-muted-foreground" size="sm">
                    查看详情
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </main>

      {/* Order Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedOrder.service}</h4>
                <p className="text-sm text-muted-foreground">服务次数: 第{selectedOrder.session}次</p>
                <p className="text-lg font-bold text-teal-600 mt-2">¥{selectedOrder.price}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">客户姓名</span>
                  <span>{selectedOrder.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">联系电话</span>
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">服务日期</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">服务时间</span>
                  <span>{selectedOrder.time}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">服务地址</span>
                  <span className="text-right max-w-[60%]">{selectedOrder.address}</span>
                </div>
                {selectedOrder.note && (
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground">备注信息</span>
                    <p className="mt-1">{selectedOrder.note}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowDetail(false)}>
              关闭
            </Button>
            <Button className="flex-1 bg-teal-500 hover:bg-teal-600">接受订单</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
