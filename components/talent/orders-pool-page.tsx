"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Search, Phone, MapPin, Calendar, Clock, DollarSign,
  ChevronRight, CheckCircle, User, FileText,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type PoolTab = "available" | "my_orders"
type MyOrderStatus = "in_progress" | "completed" | "cancelled"

interface WorkOrder {
  id: string
  serviceType: string
  customerName: string
  customerPhone: string
  date: string
  duration: string
  salary: string
  address: string
  requirements: string
  tags: string[]
  postedAt: string
}

interface MyOrder {
  id: string
  serviceType: string
  customerName: string
  period: string
  salary: string
  status: MyOrderStatus
  address: string
  rating?: number
  income?: number
}

const myOrderStatusConfig: Record<MyOrderStatus, { label: string; color: string }> = {
  in_progress: { label: "进行中", color: "bg-green-100 text-green-700" },
  completed: { label: "已完成", color: "bg-blue-100 text-blue-700" },
  cancelled: { label: "已取消", color: "bg-gray-100 text-gray-600" },
}

const availableOrders: WorkOrder[] = [
  {
    id: "WO001", serviceType: "月嫂服务", customerName: "王女士",
    customerPhone: "138****8888", date: "2026-05-01 至 2026-05-26",
    duration: "26天", salary: "12,800-15,800", address: "金凤区万达公寓12-3-602",
    requirements: "预产期5月初，需有3年以上月嫂经验，擅长新生儿护理和月子餐",
    tags: ["急招", "26天", "金凤区"], postedAt: "2小时前",
  },
  {
    id: "WO002", serviceType: "育婴师服务", customerName: "李先生",
    customerPhone: "139****6666", date: "2026-05-10 起",
    duration: "长期", salary: "8,000-10,000", address: "兴庆区新华街88号",
    requirements: "宝宝6个月，需育婴师照护，有早教经验优先",
    tags: ["长期", "兴庆区"], postedAt: "5小时前",
  },
  {
    id: "WO003", serviceType: "产后修复", customerName: "赵女士",
    customerPhone: "137****5555", date: "2026-04-20",
    duration: "10次", salary: "3,800", address: "西夏区朝阳路128号",
    requirements: "产后3个月，需骨盆修复和腹直肌恢复",
    tags: ["产康", "西夏区"], postedAt: "1天前",
  },
]

const myOrders: MyOrder[] = [
  {
    id: "MO001", serviceType: "月嫂服务", customerName: "陈女士",
    period: "2026-03-10 至 2026-04-05", salary: "15,800",
    status: "in_progress", address: "金凤区瑞银中心A座1208",
  },
  {
    id: "MO002", serviceType: "育婴师服务", customerName: "张先生",
    period: "2026-01-15 至 2026-03-15", salary: "9,200",
    status: "completed", address: "兴庆区凤凰北街66号",
    rating: 4.9, income: 9200,
  },
  {
    id: "MO003", serviceType: "月嫂服务", customerName: "刘女士",
    period: "2025-12-01 至 2025-12-26", salary: "12,800",
    status: "completed", address: "贺兰县富贵花园",
    rating: 5.0, income: 12800,
  },
]

export function OrdersPoolPage() {
  const [poolTab, setPoolTab] = useState<PoolTab>("available")
  const [myOrderFilter, setMyOrderFilter] = useState<MyOrderStatus | "all">("all")
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null)
  const [searchText, setSearchText] = useState("")

  const filteredMyOrders = myOrderFilter === "all"
    ? myOrders
    : myOrders.filter((o) => o.status === myOrderFilter)

  const filteredAvailable = searchText
    ? availableOrders.filter((o) =>
        o.serviceType.includes(searchText) || o.customerName.includes(searchText) || o.address.includes(searchText)
      )
    : availableOrders

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="safe-area-top bg-gradient-to-r from-rose-500 to-pink-500 px-4 pb-4 pt-4">
        <h1 className="text-lg font-bold text-white">接单</h1>
        <p className="mt-0.5 text-xs text-white/85">查看可接工单与我的订单</p>
      </div>

      {/* Pool Tab Toggle */}
      <div className="px-4 py-3">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setPoolTab("available")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
              poolTab === "available" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            可接工单
          </button>
          <button
            onClick={() => setPoolTab("my_orders")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
              poolTab === "my_orders" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            我的订单
          </button>
        </div>
      </div>

      <main className="px-4 pb-24 space-y-3">
        {poolTab === "available" && (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索服务类型、客户、地区..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Available Orders */}
            {filteredAvailable.map((order) => (
              <Card
                key={order.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{order.serviceType}</h3>
                      <p className="text-xs text-muted-foreground">{order.customerName} · {order.postedAt}</p>
                    </div>
                    <span className="text-sm font-bold text-rose-600">¥{order.salary}</span>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{order.date} · {order.duration}</div>
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.address}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{order.requirements}</p>
                  <div className="flex gap-1 mt-2">
                    {order.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {poolTab === "my_orders" && (
          <>
            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {([
                { id: "all" as const, label: "全部" },
                { id: "in_progress" as const, label: "进行中" },
                { id: "completed" as const, label: "已完成" },
                { id: "cancelled" as const, label: "已取消" },
              ]).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setMyOrderFilter(s.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                    myOrderFilter === s.id
                      ? "bg-rose-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* My Orders */}
            {filteredMyOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{order.serviceType}</h3>
                      <p className="text-xs text-muted-foreground">{order.customerName}</p>
                    </div>
                    <Badge className={cn("text-[10px]", myOrderStatusConfig[order.status].color)}>
                      {myOrderStatusConfig[order.status].label}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{order.period}</div>
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.address}</div>
                    <div className="flex items-center gap-1"><DollarSign className="w-3 h-3" />¥{order.salary}</div>
                  </div>
                  {order.status === "completed" && order.rating && (
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border text-xs">
                      <span className="text-amber-600">评分 {order.rating}</span>
                      <span className="text-green-600">收入 ¥{order.income?.toLocaleString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </main>

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">工单详情</SheetTitle>
          </SheetHeader>
          {selectedOrder && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4">
                <h3 className="font-bold text-foreground text-lg">{selectedOrder.serviceType}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedOrder.customerName}</p>
                <p className="text-xl font-bold text-rose-600 mt-2">¥{selectedOrder.salary}</p>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">工单编号</span>
                    <span className="text-sm font-mono">{selectedOrder.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">服务时间</span>
                    <span className="text-sm">{selectedOrder.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">服务时长</span>
                    <span className="text-sm">{selectedOrder.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">服务地址</span>
                    <span className="text-sm text-right max-w-[180px]">{selectedOrder.address}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <h4 className="text-sm font-semibold mb-2">需求说明</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedOrder.requirements}</p>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => alert("拨打电话")}>
                  <Phone className="w-4 h-4 mr-1" />
                  联系客户
                </Button>
                <Button className="flex-1 bg-rose-500 hover:bg-rose-600" onClick={() => { setSelectedOrder(null); alert("接单成功！") }}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  确认接单
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
