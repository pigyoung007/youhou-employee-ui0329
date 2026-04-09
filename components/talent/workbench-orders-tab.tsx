"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Search, Plus, ChevronRight, Phone, MapPin, Calendar,
  Clock, FileText, Building2, User,
} from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus = "all" | "pending_payment" | "in_service" | "completed" | "cancelled"
type OrderCategory = "company" | "private"

interface Order {
  id: string
  customerName: string
  customerPhone: string
  serviceType: string
  servicePeriod: string
  totalAmount: number
  paidAmount: number
  status: "pending_payment" | "in_service" | "completed" | "cancelled"
  createdAt: string
  address?: string
  category: OrderCategory
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending_payment: { label: "待付款", color: "bg-amber-100 text-amber-700" },
  in_service: { label: "服务中", color: "bg-green-100 text-green-700" },
  completed: { label: "已完成", color: "bg-blue-100 text-blue-700" },
  cancelled: { label: "已取消", color: "bg-gray-100 text-gray-600" },
}

const companyOrders: Order[] = [
  {
    id: "CO20260401001", customerName: "王女士", customerPhone: "138****8888",
    serviceType: "月嫂服务", servicePeriod: "2026-04-01 至 2026-04-26",
    totalAmount: 15800, paidAmount: 15800, status: "in_service",
    createdAt: "2026-03-28", address: "金凤区瑞银中心A座1208", category: "company",
  },
  {
    id: "CO20260320002", customerName: "李先生", customerPhone: "139****6666",
    serviceType: "育婴师服务", servicePeriod: "2026-03-15 至 2026-06-15",
    totalAmount: 8500, paidAmount: 8500, status: "completed",
    createdAt: "2026-03-10", address: "兴庆区新华街88号", category: "company",
  },
]

const privateOrders: Order[] = [
  {
    id: "PO20260405001", customerName: "张女士", customerPhone: "137****5555",
    serviceType: "月嫂服务", servicePeriod: "2026-05-01 至 2026-05-26",
    totalAmount: 12800, paidAmount: 6400, status: "pending_payment",
    createdAt: "2026-04-05", address: "西夏区朝阳小区3栋", category: "private",
  },
  {
    id: "PO20260401002", customerName: "赵女士", customerPhone: "136****4444",
    serviceType: "育婴师服务", servicePeriod: "2026-04-10 至 2026-07-10",
    totalAmount: 9600, paidAmount: 9600, status: "in_service",
    createdAt: "2026-04-01", address: "金凤区万达公寓12-3-602", category: "private",
  },
]

interface WorkbenchOrdersTabProps {
  onCreatePrivateOrder?: () => void
}

export function WorkbenchOrdersTab({ onCreatePrivateOrder }: WorkbenchOrdersTabProps) {
  const [category, setCategory] = useState<OrderCategory>("company")
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all")
  const [searchText, setSearchText] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const orders = category === "company" ? companyOrders : privateOrders
  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false
    if (searchText && !o.customerName.includes(searchText) && !o.id.includes(searchText)) return false
    return true
  })

  return (
    <div className="space-y-4">
      {/* Category Toggle */}
      <div className="flex gap-2 px-4">
        {([
          { id: "company" as const, label: "公司订单", icon: Building2 },
          { id: "private" as const, label: "私有订单", icon: User },
        ]).map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id); setStatusFilter("all") }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
              category === cat.id
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索客户姓名或订单号..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-1">
        {([
          { id: "all" as const, label: "全部" },
          { id: "in_service" as const, label: "服务中" },
          { id: "pending_payment" as const, label: "待付款" },
          { id: "completed" as const, label: "已完成" },
          { id: "cancelled" as const, label: "已取消" },
        ]).map((s) => (
          <button
            key={s.id}
            onClick={() => setStatusFilter(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              statusFilter === s.id
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Create Private Order Button */}
      {category === "private" && (
        <div className="px-4">
          <Button
            onClick={onCreatePrivateOrder}
            className="w-full bg-rose-500 hover:bg-rose-600 h-10"
          >
            <Plus className="w-4 h-4 mr-2" />
            新建私有订单
          </Button>
        </div>
      )}

      {/* Order List */}
      <div className="px-4 space-y-2 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">暂无订单</p>
          </div>
        ) : (
          filtered.map((order) => (
            <Card
              key={order.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedOrder(order)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{order.customerName}</h3>
                    <p className="text-xs text-muted-foreground">{order.serviceType}</p>
                  </div>
                  <Badge className={cn("text-[10px] shrink-0", statusConfig[order.status]?.color)}>
                    {statusConfig[order.status]?.label}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{order.servicePeriod}</span>
                  </div>
                  {order.address && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                  <span className="text-sm font-bold text-rose-600">¥{order.totalAmount.toLocaleString()}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>已付 ¥{order.paidAmount.toLocaleString()}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">订单详情</SheetTitle>
          </SheetHeader>
          {selectedOrder && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{selectedOrder.customerName}</h3>
                  <Badge className={cn("text-[10px]", statusConfig[selectedOrder.status]?.color)}>
                    {statusConfig[selectedOrder.status]?.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{selectedOrder.serviceType}</p>
                <p className="text-lg font-bold text-rose-600 mt-2">¥{selectedOrder.totalAmount.toLocaleString()}</p>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">订单编号</span>
                    <span className="text-sm font-mono">{selectedOrder.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">服务周期</span>
                    <span className="text-sm">{selectedOrder.servicePeriod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">已付金额</span>
                    <span className="text-sm font-medium text-green-600">¥{selectedOrder.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">创建时间</span>
                    <span className="text-sm">{selectedOrder.createdAt}</span>
                  </div>
                  {selectedOrder.address && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">服务地址</span>
                      <span className="text-sm text-right max-w-[180px]">{selectedOrder.address}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 h-10" onClick={() => alert("拨打电话")}>
                  <Phone className="w-4 h-4 mr-1" />
                  联系客户
                </Button>
                {selectedOrder.category === "private" && selectedOrder.status === "in_service" && (
                  <Button variant="outline" className="flex-1 h-10" onClick={() => alert("查看合同")}>
                    <FileText className="w-4 h-4 mr-1" />
                    查看合同
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
