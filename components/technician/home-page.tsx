"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  Star,
  CheckCircle2,
  AlertCircle,
  Phone,
} from "lucide-react"
import { OrderConsultantLines } from "@/components/order-consultant-lines"

export function TechnicianHomePage() {
  const [todayOrders] = useState([
    {
      id: 1,
      time: "09:00-10:30",
      customer: "王女士",
      phone: "138****5678",
      service: "产后腹直肌修复",
      address: "朝阳区望京SOHO T1 1205室",
      status: "upcoming",
      session: "3/10",
      maternityConsultant: "张丽",
      careerConsultant: "陈明",
    },
    {
      id: 2,
      time: "11:00-12:30",
      customer: "李女士",
      phone: "139****1234",
      service: "盆底肌康复训练",
      address: "海淀区中关村软件园二期 8号楼",
      status: "upcoming",
      session: "5/12",
      maternityConsultant: "刘婷",
      careerConsultant: "",
    },
    {
      id: 3,
      time: "14:00-15:30",
      customer: "张女士",
      phone: "136****9876",
      service: "乳腺疏通护理",
      address: "西城区金融街威斯汀酒店 2308",
      status: "upcoming",
      session: "1/6",
      maternityConsultant: "张丽",
      careerConsultant: "王强",
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 pt-4 pb-6 px-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-white/30">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-white/20 text-white">陈</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="font-bold">陈美丽</h2>
              <p className="text-sm text-white/80">高级产康技师</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-white/70">今日预约</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">28</p>
            <p className="text-xs text-white/70">本月完成</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">4.9</p>
            <p className="text-xs text-white/70">服务评分</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-xs text-white/70">累计服务</p>
          </div>
        </div>
      </div>

      <main className="px-4 -mt-4 space-y-4">
        {/* Today Schedule */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-500" />
                今日行程
              </CardTitle>
              <Badge variant="secondary" className="bg-teal-50 text-teal-600">
                {todayOrders.length}个预约
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayOrders.map((order, index) => (
              <div
                key={order.id}
                className="p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.service}</p>
                      <p className="text-xs text-muted-foreground">第{order.session}次</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-teal-200 text-teal-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {order.time}
                  </Badge>
                </div>
                <OrderConsultantLines
                  maternityConsultant={order.maternityConsultant}
                  careerConsultant={order.careerConsultant}
                  className="mt-1.5"
                />
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-[10px] bg-teal-100 text-teal-600">
                        {order.customer[0]}
                      </AvatarFallback>
                    </Avatar>
                    {order.customer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {order.phone}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{order.address}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs bg-transparent">
                    查看详情
                  </Button>
                  <Button size="sm" className="flex-1 h-8 text-xs bg-teal-500 hover:bg-teal-600">
                    开始服务
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-xs font-medium">我的排班</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs font-medium">签到打卡</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-violet-600" />
            </div>
            <span className="text-xs font-medium">业绩统计</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-xs font-medium">我的评价</span>
          </button>
        </div>

        {/* Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              待处理事项
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-sm">您有2份服务报告待提交</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full" />
                <span className="text-sm">明日有4个预约需确认</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                <span className="text-sm">耗材申领单已批准，请领取</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
