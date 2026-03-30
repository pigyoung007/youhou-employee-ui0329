"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { OrderConsultantLines } from "@/components/order-consultant-lines"
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Share2,
  Download,
  ChevronRight,
  Award,
  Target,
  Star,
  FileText,
  Clock,
} from "lucide-react"

// 业绩数据
const performanceData = {
  totalOrders: 45,
  ongoingOrders: 3,
  thisMonthCommission: 25600,
  totalIncome: 1250000,
  targetCompletion: 92,
}

// 订单列表
const orders = [
  {
    id: "ORD20260115001",
    employer: "王女士",
    caregiver: "李阿姨",
    type: "月嫂服务",
    status: "服务中",
    amount: 15800,
    startDate: "2026-01-15",
    endDate: "2026-02-10",
  },
  {
    id: "ORD20260110002",
    employer: "李先生",
    caregiver: "张阿姨",
    type: "育儿嫂服务",
    status: "服务中",
    amount: 10800,
    startDate: "2026-01-10",
    endDate: "2026-04-10",
  },
  {
    id: "ORD20251220003",
    employer: "张女士",
    caregiver: "王阿姨",
    type: "月嫂服务",
    status: "已完成",
    amount: 18800,
    startDate: "2025-12-20",
    endDate: "2026-01-15",
  },
]

// 订单统计
const orderStats = {
  pending: 2,
  ongoing: 3,
  toEvaluate: 1,
  completed: 39,
}

// 海报模板
const posterTemplates = [
  { id: 1, name: "金牌月嫂推荐", type: "阿姨推广" },
  { id: 2, name: "母婴服务套餐", type: "服务推广" },
  { id: 3, name: "新春优惠活动", type: "活动推广" },
]

export function MaternityPerformancePage() {
  const [showPromotion, setShowPromotion] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "服务中":
        return "bg-teal-100 text-teal-700"
      case "待付款":
        return "bg-amber-100 text-amber-700"
      case "已完成":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">业绩看板</h1>
        
        {/* Main Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-white/80">本月提成</p>
              <p className="text-3xl font-bold">¥{performanceData.thisMonthCommission.toLocaleString()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white">
              目标完成 {performanceData.targetCompletion}%
            </Badge>
            <span className="text-xs text-white/70">距月底还有10天</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{performanceData.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">累计订单</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{performanceData.ongoingOrders}</p>
                  <p className="text-xs text-muted-foreground">服务中</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground">¥{(performanceData.totalIncome / 10000).toFixed(1)}万</p>
                  <p className="text-xs text-muted-foreground">累计成交金额</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Management */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">订单管理</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground text-xs"
              onClick={() => setShowOrders(true)}
            >
              查看全部
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                <button className="py-2">
                  <p className="text-lg font-bold text-amber-600">{orderStats.pending}</p>
                  <p className="text-xs text-muted-foreground">待付款</p>
                </button>
                <button className="py-2">
                  <p className="text-lg font-bold text-teal-600">{orderStats.ongoing}</p>
                  <p className="text-xs text-muted-foreground">服务中</p>
                </button>
                <button className="py-2">
                  <p className="text-lg font-bold text-rose-600">{orderStats.toEvaluate}</p>
                  <p className="text-xs text-muted-foreground">待评价</p>
                </button>
                <button className="py-2">
                  <p className="text-lg font-bold text-foreground">{orderStats.completed}</p>
                  <p className="text-xs text-muted-foreground">已完成</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Orders */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">近期订单</h2>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{order.type}</h3>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                    <Badge className={`text-[10px] ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {order.employer} - {order.caregiver}
                  </div>
                  <OrderConsultantLines
                    maternityConsultant={order.maternityConsultant}
                    careerConsultant={order.careerConsultant}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {order.startDate} 至 {order.endDate}
                    </span>
                    <span className="font-bold text-rose-600">¥{order.amount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Monthly Target */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">本月目标</h3>
              <Badge className="bg-rose-100 text-rose-700">进行中</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">签约目标</span>
                  <span className="text-sm font-medium">8/10单</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">成交金额</span>
                  <span className="text-sm font-medium">¥128,000/¥150,000</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotion Tools */}
        <Card 
          className="border-0 shadow-sm bg-gradient-to-r from-rose-50 to-pink-50 cursor-pointer"
          onClick={() => setShowPromotion(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-rose-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">推广工具</h3>
                <p className="text-xs text-muted-foreground">生成推广海报</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Orders Sheet */}
      <Sheet open={showOrders} onOpenChange={setShowOrders}>
        <SheetContent side="right" className="w-[90vw] max-w-md">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>订单管理</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-3 overflow-y-auto">
            {orders.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{order.type}</h3>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                    <Badge className={`text-[10px] ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    雇主：{order.employer} | 阿姨：{order.caregiver}
                  </div>
                  <OrderConsultantLines
                    maternityConsultant={order.maternityConsultant}
                    careerConsultant={order.careerConsultant}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {order.startDate} - {order.endDate}
                    </span>
                    <span className="font-bold text-rose-600">¥{order.amount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Promotion Sheet */}
      <Sheet open={showPromotion} onOpenChange={setShowPromotion}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>选择海报模板</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-3">
            {posterTemplates.map((template) => (
              <Card key={template.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-rose-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{template.name}</h3>
                      <Badge variant="outline" className="text-[10px] mt-1">{template.type}</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Download className="w-4 h-4 mr-1" />
                      生成
                    </Button>
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
