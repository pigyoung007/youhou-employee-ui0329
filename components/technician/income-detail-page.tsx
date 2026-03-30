"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calendar, DollarSign, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { OrderConsultantLines } from "@/components/order-consultant-lines"

export function TechnicianIncomeDetailPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"monthly" | "orders" | "withdrawals">("monthly")

  const monthlyStats = {
    thisMonth: {
      totalEarnings: 8640,
      completedOrders: 12,
      pendingSettlement: 1440,
      withdrawn: 7200,
    },
    lastMonth: {
      totalEarnings: 7800,
      completedOrders: 11,
    },
    totalEarnings: 48600,
    totalOrders: 68,
  }

  const orders = [
    {
      id: "ORD20240115001",
      customerName: "王女士",
      serviceName: "产后腹直肌修复",
      serviceDate: "2024-01-15",
      serviceTime: "09:00-10:30",
      amount: 720,
      status: "completed",
      settlementDate: "2024-01-22",
      maternityConsultant: "张丽",
      careerConsultant: "陈明",
    },
    {
      id: "ORD20240115002",
      customerName: "李女士",
      serviceName: "盆底肌康复训练",
      serviceDate: "2024-01-15",
      serviceTime: "14:00-15:30",
      amount: 720,
      status: "completed",
      settlementDate: "2024-01-22",
      maternityConsultant: "刘婷",
      careerConsultant: "",
    },
    {
      id: "ORD20240116001",
      customerName: "张女士",
      serviceName: "乳腺疏通护理",
      serviceDate: "2024-01-16",
      serviceTime: "10:00-11:00",
      amount: 600,
      status: "pending",
      settlementDate: "2024-01-23",
      maternityConsultant: "张丽",
      careerConsultant: "王强",
    },
    {
      id: "ORD20240116002",
      customerName: "刘女士",
      serviceName: "产后恢复套餐",
      serviceDate: "2024-01-16",
      serviceTime: "15:00-17:00",
      amount: 800,
      status: "completed",
      settlementDate: "2024-01-23",
      maternityConsultant: "赵敏",
      careerConsultant: "周洋",
    },
  ]

  const withdrawals = [
    {
      id: "WD20240110001",
      amount: 5000,
      date: "2024-01-10",
      status: "completed",
      method: "银行卡",
      account: "尾号8888",
      completeDate: "2024-01-11",
    },
    {
      id: "WD20240105001",
      amount: 3000,
      date: "2024-01-05",
      status: "completed",
      method: "支付宝",
      account: "zhang***@email.com",
      completeDate: "2024-01-05",
    },
    {
      id: "WD20240101001",
      amount: 4200,
      date: "2024-01-01",
      status: "completed",
      method: "银行卡",
      account: "尾号6666",
      completeDate: "2024-01-02",
    },
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle2, label: "已完成" }
      case "pending":
        return { color: "text-amber-600", bg: "bg-amber-100", icon: Clock, label: "待结算" }
      case "cancelled":
        return { color: "text-red-600", bg: "bg-red-100", icon: AlertCircle, label: "已取消" }
      default:
        return { color: "text-gray-600", bg: "bg-gray-100", icon: AlertCircle, label: "未知" }
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-primary/10 to-background z-10 px-4 pt-4 pb-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            ← 返回
          </button>
          <h1 className="text-xl font-bold flex-1">收入明细</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">本月收入</p>
              <p className="text-2xl font-bold text-primary">¥{monthlyStats.thisMonth.totalEarnings}</p>
              <p className="text-xs text-muted-foreground mt-1">{monthlyStats.thisMonth.completedOrders}单</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">累计收入</p>
              <p className="text-2xl font-bold text-green-600">¥{monthlyStats.totalEarnings}</p>
              <p className="text-xs text-muted-foreground mt-1">{monthlyStats.totalOrders}单</p>
            </CardContent>
          </Card>
        </div>

        {/* Details Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">待结算</p>
                <p className="text-xl font-bold text-blue-900">¥{monthlyStats.thisMonth.pendingSettlement}</p>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">已提现</p>
                <p className="text-xl font-bold text-blue-900">¥{monthlyStats.thisMonth.withdrawn}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="monthly" className="text-xs">本月订单</TabsTrigger>
            <TabsTrigger value="orders" className="text-xs">全部订单</TabsTrigger>
            <TabsTrigger value="withdrawals" className="text-xs">提现记录</TabsTrigger>
          </TabsList>

          {/* Monthly Orders */}
          <TabsContent value="monthly" className="space-y-3 mt-4">
            {orders.filter(o => o.status === "completed").map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.serviceName}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100 text-[10px]">
                      已完成
                    </Badge>
                  </div>
                  <OrderConsultantLines
                    maternityConsultant={order.maternityConsultant}
                    careerConsultant={order.careerConsultant}
                    className="mt-1"
                  />
                  <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                    <span>{order.serviceDate}</span>
                    <p className="font-bold text-primary">¥{order.amount}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* All Orders */}
          <TabsContent value="orders" className="space-y-3 mt-4">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon
              return (
                <Card key={order.id} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.serviceName}</p>
                      </div>
                      <Badge variant="secondary" className={cn("text-[10px] border-0", statusInfo.bg, statusInfo.color)}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <OrderConsultantLines
                      maternityConsultant={order.maternityConsultant}
                      careerConsultant={order.careerConsultant}
                      className="mt-1"
                    />
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>服务时间：{order.serviceDate} {order.serviceTime}</p>
                      <p>结算时间：{order.settlementDate}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t mt-2">
                      <span className="text-xs">订单号：{order.id}</span>
                      <p className="font-bold text-primary">¥{order.amount}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          {/* Withdrawals */}
          <TabsContent value="withdrawals" className="space-y-3 mt-4">
            {withdrawals.map((withdrawal) => (
              <Card key={withdrawal.id} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">提现申请</p>
                      <p className="text-xs text-muted-foreground">{withdrawal.method} - {withdrawal.account}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100 text-[10px]">
                      已完成
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>申请时间：{withdrawal.date}</p>
                    <p>到账时间：{withdrawal.completeDate}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t mt-2">
                    <span className="text-xs">提现ID：{withdrawal.id}</span>
                    <p className="font-bold text-primary">¥{withdrawal.amount}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 space-y-1">
          <p className="font-medium">说明：</p>
          <p>• 订单金额为您应得佣金，扣除平台服务费后即为实际收入</p>
          <p>• 每周一结算上周订单，周三可申请提现</p>
          <p>• 提现手续费按提现金额的0.5%收取</p>
        </div>
      </div>
    </div>
  )
}
