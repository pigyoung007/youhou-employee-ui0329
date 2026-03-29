"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Phone, MapPin, Clock, Calendar, ChevronRight, CheckCircle2,
  XCircle, Star, Search, Filter, DollarSign, Briefcase,
} from "lucide-react"
import { Input } from "@/components/ui/input"

// Job Pool / Available Orders (matching market for domestic workers)
const availableOrders = [
  {
    id: "J2025001", service: "月嫂服务", customer: "张女士", phone: "138****1234",
    date: "2025-03-01", duration: "26天", salary: "¥13,800",
    address: "银川市金凤区万达公寓12-3-602", status: "pending",
    note: "预产期3月5日，需要有产妇护理经验", tags: ["月嫂", "产妇护理"],
  },
  {
    id: "J2025002", service: "育儿嫂", customer: "李女士", phone: "139****5678",
    date: "2025-03-10", duration: "长期", salary: "¥8,500/月",
    address: "银川市兴庆区新华街88号", status: "pending",
    note: "宝宝4个月，需要有育婴师证", tags: ["育儿嫂", "长期"],
  },
  {
    id: "J2025003", service: "产后修复", customer: "王女士", phone: "137****9012",
    date: "2025-03-15", duration: "10次", salary: "¥3,800",
    address: "银川市西夏区大学路66号", status: "pending",
    note: "产后3个月，需要骨盆修复", tags: ["产后修复"],
  },
]

// My current / ongoing orders (from domestic orders-page)
const myOrders = {
  ongoing: [
    {
      id: "D2025001", type: "月嫂服务", employer: "陈女士", phone: "136****2468",
      address: "银川市金凤区瑞银中心A座1208", status: "serving" as const,
      duration: "26天", startDate: "2025-02-10", endDate: "2025-03-08", salary: "¥12,800",
    },
  ],
  completed: [
    {
      id: "D2024012", type: "月嫂服务", employer: "刘女士", phone: "135****1357",
      address: "银川市兴庆区文化街120号", status: "completed" as const,
      duration: "30天", startDate: "2024-12-01", endDate: "2024-12-31", salary: "¥13,500",
      rating: 5, comment: "李阿姨非常专业，宝宝照顾得很好！",
    },
    {
      id: "D2024010", type: "育儿嫂", employer: "赵女士", phone: "133****7890",
      address: "银川市西夏区梦想城3-2-501", status: "completed" as const,
      duration: "3个月", startDate: "2024-07-01", endDate: "2024-09-30", salary: "¥8,200/月",
      rating: 4, comment: "很有耐心，宝宝很喜欢",
    },
  ],
}

// Technician orders for on-demand services
const techOrders = {
  pending: [
    {
      id: "T2025001", service: "催乳通乳", session: 3, customer: "赵女士", phone: "131****4567",
      date: "2025-02-20", time: "10:00-11:30", address: "银川市金凤区阅海万家C区8-1-301",
      price: 380, note: "产后第12天，乳汁不畅", status: "pending",
    },
  ],
  accepted: [
    {
      id: "T2025002", service: "产后修复", session: 5, customer: "孙女士", phone: "132****8901",
      date: "2025-02-21", time: "14:00-15:30", address: "银川市兴庆区丽景街168号",
      price: 450, status: "accepted",
    },
  ],
  completed: [
    {
      id: "T2024030", service: "小儿推拿", session: 8, customer: "周女士", phone: "130****2345",
      date: "2025-01-15", time: "09:00-10:00", address: "银川市西夏区怀远路56号",
      price: 280, rating: 5, comment: "手法很专业，宝宝配合度好",
    },
  ],
}

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; cls: string }> = {
    serving: { label: "服务中", cls: "bg-green-100 text-green-700" },
    completed: { label: "已完成", cls: "bg-blue-100 text-blue-700" },
    pending: { label: "待确认", cls: "bg-amber-100 text-amber-700" },
    accepted: { label: "已接单", cls: "bg-teal-100 text-teal-700" },
  }
  const s = map[status] || { label: status, cls: "bg-gray-100 text-gray-700" }
  return <Badge className={`${s.cls} text-[10px]`}>{s.label}</Badge>
}

export function TalentOrdersPage() {
  const [mainTab, setMainTab] = useState("market")
  const [selectedAvailable, setSelectedAvailable] = useState<(typeof availableOrders)[0] | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<(typeof myOrders.ongoing)[0] | null>(null)
  const [techTab, setTechTab] = useState("pending")
  const [showTechDetail, setShowTechDetail] = useState(false)
  const [selectedTech, setSelectedTech] = useState<any>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 pt-4 pb-4 px-4 safe-area-top">
        <h1 className="text-lg font-bold text-white">接单中心</h1>
      </div>

      {/* Main Tabs */}
      <div className="px-4 pt-4">
        <Tabs value={mainTab} onValueChange={setMainTab}>
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 h-9">
            <TabsTrigger value="market" className="text-xs">订单市场</TabsTrigger>
            <TabsTrigger value="my" className="text-xs">我的订单</TabsTrigger>
            <TabsTrigger value="tech" className="text-xs">技师接单</TabsTrigger>
          </TabsList>

          {/* Job Market */}
          <TabsContent value="market" className="mt-4 space-y-3 pb-24">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-9 h-9 text-sm" placeholder="搜索订单..." />
              </div>
              <Button size="sm" variant="outline" className="bg-transparent h-9"><Filter className="w-4 h-4" /></Button>
            </div>

            {availableOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedAvailable(order)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{order.service}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.customer} | {order.duration}</p>
                    </div>
                    <span className="text-lg font-bold text-amber-600">{order.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {order.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] font-normal">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{order.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.address.slice(0, 12)}...</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* My Orders */}
          <TabsContent value="my" className="mt-4 space-y-4 pb-24">
            {/* Ongoing */}
            {myOrders.ongoing.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-500" />
                  进行中 ({myOrders.ongoing.length})
                </h3>
                {myOrders.ongoing.map((order) => (
                  <Card key={order.id} className="border-0 shadow-sm border-l-4 border-l-green-500 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{order.type}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{order.employer}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{order.startDate} ~ {order.endDate}</span>
                        <span className="font-medium text-amber-600">{order.salary}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {/* Completed */}
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                已完成 ({myOrders.completed.length})
              </h3>
              {myOrders.completed.map((order) => (
                <Card key={order.id} className="border-0 shadow-sm mb-2">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{order.type}</h4>
                        <p className="text-xs text-muted-foreground">{order.employer} | {order.duration}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    {order.rating && (
                      <div className="mt-2 p-2 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(order.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs text-amber-600 ml-1">{order.rating}.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{order.comment}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tech Orders */}
          <TabsContent value="tech" className="mt-4 pb-24">
            <Tabs value={techTab} onValueChange={setTechTab}>
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 h-8">
                <TabsTrigger value="pending" className="text-xs">待接单</TabsTrigger>
                <TabsTrigger value="accepted" className="text-xs">已接单</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">已完成</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-3 space-y-3">
                {techOrders.pending.map((order) => (
                  <Card key={order.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{order.service}</h3>
                          <p className="text-sm text-muted-foreground">第{order.session}次服务</p>
                        </div>
                        <span className="text-lg font-bold text-teal-600">¥{order.price}</span>
                      </div>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><Avatar className="w-5 h-5"><AvatarFallback className="bg-teal-100 text-teal-600 text-[10px]">{order.customer[0]}</AvatarFallback></Avatar><span>{order.customer}</span></div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{order.date}</span><Clock className="w-4 h-4 ml-2" /><span>{order.time}</span></div>
                        <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span className="text-xs">{order.address}</span></div>
                      </div>
                      {order.note && <p className="text-xs bg-amber-50 text-amber-700 rounded-lg p-2 mt-2">{order.note}</p>}
                      <div className="flex border-t border-border mt-3 -mx-4 -mb-4">
                        <button className="flex-1 py-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-1"><XCircle className="w-4 h-4" />拒绝</button>
                        <div className="w-px bg-border" />
                        <button className="flex-1 py-3 text-sm text-teal-600 hover:bg-teal-50 transition-colors flex items-center justify-center gap-1 font-medium"><CheckCircle2 className="w-4 h-4" />接单</button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="accepted" className="mt-3 space-y-3">
                {techOrders.accepted.map((order) => (
                  <Card key={order.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div><h3 className="font-semibold">{order.service}</h3><p className="text-sm text-muted-foreground">第{order.session}次服务</p></div>
                        <Badge className="bg-teal-100 text-teal-700">已确认</Badge>
                      </div>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{order.date}</span><Clock className="w-4 h-4 ml-2" /><span>{order.time}</span></div>
                        <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span className="text-xs">{order.address}</span></div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" className="flex-1 bg-transparent" size="sm">导航前往</Button>
                        <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="sm">开始服务</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="mt-3 space-y-3">
                {techOrders.completed.map((order) => (
                  <Card key={order.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div><h3 className="font-semibold">{order.service}</h3><p className="text-sm text-muted-foreground">第{order.session}次服务</p></div>
                        <Badge className="bg-green-100 text-green-700">已完成</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground"><span>{order.date} | {order.customer}</span></div>
                      {order.rating && (
                        <div className="mt-2 p-2 bg-amber-50 rounded-lg">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(order.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                            <span className="text-xs text-amber-600 ml-1">{order.rating}.0</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{order.comment}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* Available Order Detail */}
      <Dialog open={!!selectedAvailable} onOpenChange={() => setSelectedAvailable(null)}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader><DialogTitle>订单详情</DialogTitle></DialogHeader>
          {selectedAvailable && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-1">{selectedAvailable.service}</h4>
                <p className="text-sm text-muted-foreground">订单编号: {selectedAvailable.id}</p>
                <p className="text-lg font-bold text-amber-600 mt-2">{selectedAvailable.salary}</p>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { l: "客户姓名", v: selectedAvailable.customer },
                  { l: "服务日期", v: selectedAvailable.date },
                  { l: "服务时长", v: selectedAvailable.duration },
                  { l: "服务地址", v: selectedAvailable.address },
                ].map((item) => (
                  <div key={item.l} className="flex justify-between">
                    <span className="text-muted-foreground">{item.l}</span>
                    <span className="text-right max-w-[60%]">{item.v}</span>
                  </div>
                ))}
                {selectedAvailable.note && (
                  <div className="pt-2 border-t"><span className="text-muted-foreground">备注信息</span><p className="mt-1">{selectedAvailable.note}</p></div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedAvailable(null)}>关闭</Button>
            <Button className="flex-1 bg-amber-500 hover:bg-amber-600">申请接单</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* My Order Detail */}
      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border"><SheetTitle>订单详情</SheetTitle></SheetHeader>
          {selectedOrder && (
            <div className="py-4 space-y-4 overflow-y-auto h-[calc(70vh-100px)]">
              {[
                { l: "订单编号", v: selectedOrder.id },
                { l: "服务类型", v: selectedOrder.type },
              ].map((item) => (
                <div key={item.l} className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{item.l}</span><span className="text-sm font-medium text-foreground">{item.v}</span></div>
              ))}
              <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">服务状态</span>{getStatusBadge(selectedOrder.status)}</div>
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">雇主信息</h4>
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">雇主姓名</span><span className="text-sm font-medium">{selectedOrder.employer}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">联系电话</span><Button variant="link" size="sm" className="h-auto p-0 text-amber-600"><Phone className="w-3.5 h-3.5 mr-1" />{selectedOrder.phone}</Button></div>
                <div className="flex items-start justify-between"><span className="text-sm text-muted-foreground">服务地址</span><span className="text-sm font-medium text-right max-w-[200px]">{selectedOrder.address}</span></div>
              </div>
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">服务信息</h4>
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">服务周期</span><span className="text-sm font-medium">{selectedOrder.duration}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">开始日期</span><span className="text-sm font-medium">{selectedOrder.startDate}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">结束日期</span><span className="text-sm font-medium">{selectedOrder.endDate}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">服务费用</span><span className="text-lg font-bold text-amber-600">{selectedOrder.salary}</span></div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
