"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Plus,
  Building2,
  User,
  FileText,
  CreditCard,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WorkbenchOrdersTabProps {
  onCreatePrivateOrder?: () => void
}

type OrderSource = "company" | "private"

interface OrderItem {
  id: number
  customer: string
  phone: string
  service: string
  date: string
  time: string
  address: string
  price: number
  session: string
  status: "draft" | "pending_confirm" | "confirmed" | "in_progress" | "completed"
  source: OrderSource
  contractId?: string
  paymentStatus?: "unpaid" | "partial" | "paid"
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  draft: { label: "草稿", className: "bg-gray-100 text-gray-600" },
  pending_confirm: { label: "待确认", className: "bg-amber-100 text-amber-700" },
  confirmed: { label: "已确认", className: "bg-teal-100 text-teal-700" },
  in_progress: { label: "服务中", className: "bg-blue-100 text-blue-700" },
  completed: { label: "已完成", className: "bg-green-100 text-green-700" },
}

const PAYMENT_MAP: Record<string, { label: string; className: string }> = {
  unpaid: { label: "未付款", className: "bg-red-100 text-red-600" },
  partial: { label: "部分付款", className: "bg-amber-100 text-amber-600" },
  paid: { label: "已付款", className: "bg-green-100 text-green-600" },
}

export function WorkbenchOrdersTab({ onCreatePrivateOrder }: WorkbenchOrdersTabProps) {
  const [activeSource, setActiveSource] = useState<OrderSource>("company")
  const [showDetail, setShowDetail] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

  const companyOrders: OrderItem[] = [
    {
      id: 101,
      customer: "王女士",
      phone: "138****5678",
      service: "产后腹直肌修复",
      date: "2026-04-10",
      time: "09:00-10:30",
      address: "朝阳区建国路88号",
      price: 680,
      session: "3/10",
      status: "confirmed",
      source: "company",
      contractId: "HT-2026-0088",
      paymentStatus: "paid",
    },
    {
      id: 102,
      customer: "李女士",
      phone: "139****1234",
      service: "盆底肌康复训练",
      date: "2026-04-10",
      time: "14:00-15:30",
      address: "海淀区中关村大街66号",
      price: 580,
      session: "2/12",
      status: "in_progress",
      source: "company",
      contractId: "HT-2026-0092",
      paymentStatus: "paid",
    },
    {
      id: 103,
      customer: "赵女士",
      phone: "135****4567",
      service: "产后骨盆修复",
      date: "2026-04-08",
      time: "10:00-11:30",
      address: "东城区王府井大街99号",
      price: 780,
      session: "8/10",
      status: "completed",
      source: "company",
      paymentStatus: "paid",
    },
  ]

  const privateOrders: OrderItem[] = [
    {
      id: 201,
      customer: "陈女士",
      phone: "136****8888",
      service: "产后全身调理",
      date: "2026-04-11",
      time: "10:00-12:00",
      address: "朝阳区望京SOHO T2 2205室",
      price: 1200,
      session: "1/8",
      status: "pending_confirm",
      source: "private",
      paymentStatus: "unpaid",
    },
    {
      id: 202,
      customer: "吴女士",
      phone: "137****6666",
      service: "乳腺疏通护理",
      date: "2026-04-09",
      time: "15:00-16:00",
      address: "丰台区丽泽路55号",
      price: 480,
      session: "2/6",
      status: "confirmed",
      source: "private",
      contractId: "PS-2026-0015",
      paymentStatus: "partial",
    },
    {
      id: 203,
      customer: "郑女士",
      phone: "133****2222",
      service: "产后腹直肌修复",
      date: "2026-04-05",
      time: "09:30-11:00",
      address: "西城区金融街18号",
      price: 680,
      session: "5/10",
      status: "completed",
      source: "private",
      contractId: "PS-2026-0012",
      paymentStatus: "paid",
    },
  ]

  const orders = activeSource === "company" ? companyOrders : privateOrders

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Tabs value={activeSource} onValueChange={(v) => setActiveSource(v as OrderSource)} className="flex-1">
          <TabsList className="h-8 w-full bg-muted/60 p-0.5">
            <TabsTrigger value="company" className="flex-1 gap-1 text-xs">
              <Building2 className="h-3 w-3" />
              公司订单
            </TabsTrigger>
            <TabsTrigger value="private" className="flex-1 gap-1 text-xs">
              <User className="h-3 w-3" />
              我的私单
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeSource === "private" && (
        <Button
          type="button"
          className="h-9 w-full gap-1.5 bg-teal-600 text-xs hover:bg-teal-700"
          onClick={onCreatePrivateOrder}
        >
          <Plus className="h-3.5 w-3.5" />
          创建私有订单
        </Button>
      )}

      <div className="space-y-2">
        {orders.map((order) => {
          const statusInfo = STATUS_MAP[order.status]
          const paymentInfo = order.paymentStatus ? PAYMENT_MAP[order.paymentStatus] : null
          return (
            <Card key={order.id} className="border border-border/80 shadow-sm">
              <CardContent className="p-3">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-teal-100 text-xs text-teal-600">
                        {order.customer[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{order.service}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer} · 第{order.session}次
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`${statusInfo.className} text-[10px]`}>
                      {statusInfo.label}
                    </Badge>
                    {paymentInfo && (
                      <Badge className={`${paymentInfo.className} text-[10px]`}>
                        {paymentInfo.label}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>{order.date}</span>
                    <Clock className="ml-1 h-3 w-3" />
                    <span>{order.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{order.address}</span>
                  </div>
                  {order.contractId && (
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3 w-3" />
                      <span>合同: {order.contractId}</span>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-teal-600">¥{order.price}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowDetail(true)
                    }}
                  >
                    查看详情
                    <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {orders.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            暂无{activeSource === "company" ? "公司" : "私有"}订单
          </div>
        )}
      </div>

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedOrder.service}</h4>
                    <Badge className={STATUS_MAP[selectedOrder.status].className}>
                      {STATUS_MAP[selectedOrder.status].label}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    第{selectedOrder.session}次服务
                  </p>
                  <p className="mt-1 text-lg font-bold text-teal-600">¥{selectedOrder.price}</p>
                </div>

                <Card className="border">
                  <CardContent className="space-y-2 p-3 text-sm">
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
                    <div className="flex items-start justify-between">
                      <span className="text-muted-foreground">服务地址</span>
                      <span className="max-w-[60%] text-right">{selectedOrder.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">订单来源</span>
                      <span>{selectedOrder.source === "company" ? "公司派单" : "私有订单"}</span>
                    </div>
                    {selectedOrder.contractId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">关联合同</span>
                        <span className="text-teal-600">{selectedOrder.contractId}</span>
                      </div>
                    )}
                    {selectedOrder.paymentStatus && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">付款状态</span>
                        <Badge className={PAYMENT_MAP[selectedOrder.paymentStatus].className + " text-[10px]"}>
                          {PAYMENT_MAP[selectedOrder.paymentStatus].label}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent text-xs"
                    size="sm"
                  >
                    <Phone className="mr-1 h-3.5 w-3.5" />
                    联系客户
                  </Button>
                  {selectedOrder.source === "private" && !selectedOrder.contractId && (
                    <Button
                      type="button"
                      className="flex-1 bg-teal-600 text-xs hover:bg-teal-700"
                      size="sm"
                    >
                      <CreditCard className="mr-1 h-3.5 w-3.5" />
                      生成合同
                    </Button>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
