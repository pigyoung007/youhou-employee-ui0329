"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronRight,
  Filter,
  QrCode,
  Camera,
  ClipboardList,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { OrderConsultantLines } from "@/components/order-consultant-lines"

interface TechnicianOrdersPageProps {
  /** 进入完整销卡管理页（扫码/查询套卡） */
  onOpenCardDeduction?: () => void
}

export function TechnicianOrdersPage({ onOpenCardDeduction }: TechnicianOrdersPageProps) {
  const [activeTab, setActiveTab] = useState("pending")
  const [showDetail, setShowDetail] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [checkInOrder, setCheckInOrder] = useState<any>(null)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [startOrder, setStartOrder] = useState<any>(null)
  const [showStartFlow, setShowStartFlow] = useState(false)
  const [serviceLogText, setServiceLogText] = useState("")
  const [showServiceLogAfter, setShowServiceLogAfter] = useState(false)

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
        maternityConsultant: "张丽",
        careerConsultant: "陈明",
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
        maternityConsultant: "刘婷",
        careerConsultant: "",
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
        maternityConsultant: "张丽",
        careerConsultant: "王强",
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
        maternityConsultant: "赵敏",
        careerConsultant: "周洋",
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
            <TabsTrigger
              value="private"
              className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-teal-600"
            >
              私单
              <Badge className="ml-1 bg-white/30 text-white text-xs px-1.5">2</Badge>
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
                      <OrderConsultantLines
                        maternityConsultant={order.maternityConsultant}
                        careerConsultant={order.careerConsultant}
                      />
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
                    <OrderConsultantLines
                      maternityConsultant={order.maternityConsultant}
                      careerConsultant={order.careerConsultant}
                    />
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
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-teal-200 bg-transparent text-xs"
                      size="sm"
                      onClick={() => {
                        setCheckInOrder(order)
                        setShowCheckIn(true)
                      }}
                    >
                      <MapPin className="mr-1 h-3.5 w-3.5 shrink-0" />
                      到户打卡
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 bg-teal-600 text-xs hover:bg-teal-700"
                      size="sm"
                      onClick={() => {
                        setStartOrder(order)
                        setShowStartFlow(true)
                      }}
                    >
                      开始服务
                    </Button>
                  </div>
                  {onOpenCardDeduction && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="mt-2 h-8 w-full text-xs text-muted-foreground"
                      onClick={onOpenCardDeduction}
                    >
                      <ClipboardList className="mr-1 h-3.5 w-3.5" />
                      套卡销卡（查询/手动销卡）
                    </Button>
                  )}
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
                    <OrderConsultantLines
                      maternityConsultant={order.maternityConsultant}
                      careerConsultant={order.careerConsultant}
                    />
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

        {activeTab === "private" && (
          <div className="space-y-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">产后全身调理</h3>
                    <p className="text-sm text-muted-foreground">第1/8次 · 私有订单</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">待确认</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2026-04-11</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>10:00-12:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>陈女士 · 136****8888</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-teal-600">¥1,200</span>
                  <Badge className="bg-violet-100 text-violet-600 text-[10px]">私单</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">乳腺疏通护理</h3>
                    <p className="text-sm text-muted-foreground">第2/6次 · 私有订单</p>
                  </div>
                  <Badge className="bg-teal-100 text-teal-700">已确认</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2026-04-09</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>15:00-16:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>吴女士 · 137****6666</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-teal-600">¥480</span>
                  <Badge className="bg-violet-100 text-violet-600 text-[10px]">私单</Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" className="flex-1 border-teal-200 bg-transparent text-xs" size="sm">
                    <Phone className="mr-1 h-3.5 w-3.5" />
                    联系客户
                  </Button>
                  <Button className="flex-1 bg-teal-600 text-xs hover:bg-teal-700" size="sm">
                    开始服务
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">母婴顾问</span>
                  <span>{selectedOrder.maternityConsultant?.trim() ? selectedOrder.maternityConsultant : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">职业顾问</span>
                  <span>{selectedOrder.careerConsultant?.trim() ? selectedOrder.careerConsultant : "—"}</span>
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

      {/* 到户打卡 */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>到户打卡</DialogTitle>
          </DialogHeader>
          {checkInOrder && (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                到达客户地址附近后打卡，用于履约记录（演示环境为模拟定位）。
              </p>
              <div className="bg-muted/50 space-y-1 rounded-lg p-3 text-xs">
                <p>
                  <span className="text-muted-foreground">地址：</span>
                  {checkInOrder.address}
                </p>
                <p className="text-primary font-medium">定位状态：已在服务范围内（约 35m）</p>
              </div>
              <Button
                type="button"
                className="w-full bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  setShowCheckIn(false)
                  alert("打卡成功，已记录到户时间")
                }}
              >
                确认到户打卡
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 开始服务 = 销卡：雇主扫码 + 技师确认 */}
      <Dialog open={showStartFlow} onOpenChange={setShowStartFlow}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>销卡服务</DialogTitle>
          </DialogHeader>
          {startOrder && (
            <div className="space-y-4">
              <div className="text-sm">
                <p className="font-medium">{startOrder.service}</p>
                <p className="text-muted-foreground mt-1 text-xs">{startOrder.customer}</p>
              </div>
              <div className="border-border flex flex-col items-center gap-2 rounded-xl border-2 border-dashed bg-muted/30 p-4">
                <QrCode className="text-primary h-16 w-16" strokeWidth={1.25} />
                <p className="text-center text-xs text-muted-foreground">
                  请雇主使用优厚家服小程序「扫一扫」扫描销卡二维码
                  <br />
                  扫码后扣除套卡 1 次，双方订单同步更新
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowStartFlow(false)
                    onOpenCardDeduction?.()
                  }}
                >
                  手动销卡
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  onClick={() => {
                    setShowStartFlow(false)
                    setServiceLogText("")
                    setShowServiceLogAfter(true)
                  }}
                >
                  已完成销卡
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 服务结束后：日志 + 照片 */}
      <Dialog open={showServiceLogAfter} onOpenChange={setShowServiceLogAfter}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>上传服务日志与照片</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Textarea
              placeholder="记录本次服务内容、客户反应、注意事项…"
              value={serviceLogText}
              onChange={(e) => setServiceLogText(e.target.value)}
              className="min-h-[100px] text-sm"
            />
            <button
              type="button"
              className="border-border flex h-24 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Camera className="h-8 w-8" />
              <span className="text-xs">上传服务前后对比照片</span>
            </button>
            <Button
              type="button"
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                setShowServiceLogAfter(false)
                alert("服务日志已提交")
              }}
            >
              提交并完成
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
