"use client"

import { useState } from "react"
import {
  X,
  ChevronRight,
  Coins,
  Gift,
  ShoppingBag,
  TrendingUp,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Sparkles,
  Crown,
  FileCheck,
  UserCheck,
  Share2,
  CalendarCheck,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// 积分明细数据
const pointsHistory = [
  {
    id: 1,
    type: "earn",
    title: "签署月嫂服务合同",
    points: 500,
    date: "2025-01-20",
    time: "14:30",
    icon: FileCheck,
    category: "签约奖励",
  },
  {
    id: 2,
    type: "earn",
    title: "完成服务评价",
    points: 100,
    date: "2025-01-18",
    time: "10:15",
    icon: Star,
    category: "评价奖励",
  },
  {
    id: 3,
    type: "spend",
    title: "兑换婴儿湿巾一包",
    points: -200,
    date: "2025-01-15",
    time: "16:45",
    icon: Gift,
    category: "积分兑换",
  },
  {
    id: 4,
    type: "earn",
    title: "邀请好友注册成功",
    points: 300,
    date: "2025-01-12",
    time: "09:20",
    icon: Share2,
    category: "邀请奖励",
  },
  {
    id: 5,
    type: "earn",
    title: "每日签到",
    points: 10,
    date: "2025-01-11",
    time: "08:00",
    icon: CalendarCheck,
    category: "签到奖励",
  },
  {
    id: 6,
    type: "spend",
    title: "抵扣服务费用",
    points: -500,
    date: "2025-01-10",
    time: "11:30",
    icon: ShoppingBag,
    category: "积分抵扣",
  },
  {
    id: 7,
    type: "earn",
    title: "完善个人资料",
    points: 50,
    date: "2025-01-08",
    time: "15:00",
    icon: UserCheck,
    category: "任务奖励",
  },
]

// 积分规则
const earnRules = [
  { icon: FileCheck, title: "签署服务合同", points: "+500", desc: "签署任意服务合同即可获得" },
  { icon: Star, title: "完成服务评价", points: "+100", desc: "对已完成服务进行评价" },
  { icon: Share2, title: "邀请好友注册", points: "+300", desc: "好友成功注册并实名认证" },
  { icon: CalendarCheck, title: "每日签到", points: "+10", desc: "每日首次打开小程序签到" },
  { icon: UserCheck, title: "完善个人资料", points: "+50", desc: "首次完善全部资料信息" },
  { icon: ShoppingBag, title: "消费返积分", points: "1%", desc: "消费金额1%返还积分" },
]

// 积分商城商品
const giftItems = [
  {
    id: 1,
    name: "婴儿湿巾",
    image: "/cute-baby-playing.jpg",
    points: 200,
    originalPrice: 29,
    stock: 100,
    tag: "热门",
  },
  {
    id: 2,
    name: "新生儿礼盒",
    image: "/baby-sleeping-peacefully.jpg",
    points: 800,
    originalPrice: 128,
    stock: 50,
    tag: "推荐",
  },
  {
    id: 3,
    name: "服务抵扣券",
    image: "/professional-chinese-nanny-woman-portrait-warm-smi.jpg",
    points: 500,
    originalPrice: 100,
    stock: 999,
    tag: "超值",
  },
  {
    id: 4,
    name: "育儿课程",
    image: "/friendly-chinese-caregiver-woman-portrait.jpg",
    points: 300,
    originalPrice: 59,
    stock: 200,
    tag: "",
  },
]

interface PointsCenterProps {
  open: boolean
  onClose: () => void
}

export function PointsCenter({ open, onClose }: PointsCenterProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [historyFilter, setHistoryFilter] = useState<"all" | "earn" | "spend">("all")
  const [showRules, setShowRules] = useState(false)
  const [todaySigned, setTodaySigned] = useState(false)

  const totalPoints = 2680
  const monthEarned = 960
  const monthSpent = 700
  const expiringPoints = 200
  const expiringDate = "2025-03-31"

  const filteredHistory = pointsHistory.filter((item) => {
    if (historyFilter === "all") return true
    return item.type === historyFilter
  })

  const handleSign = () => {
    setTodaySigned(true)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-foreground/60" onClick={onClose} />
      <div className="relative bg-card w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-primary via-primary to-primary/80 px-5 pt-5 pb-6 relative overflow-hidden z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-primary-foreground" />
            <h3 className="text-lg font-bold text-primary-foreground">会员积分</h3>
          </div>

          {/* Points Display */}
          <div className="flex items-end gap-1 mb-4">
            <span className="text-5xl font-bold text-primary-foreground">{totalPoints.toLocaleString()}</span>
            <span className="text-primary-foreground/80 mb-1.5">积分</span>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-primary-foreground/10 rounded-xl p-3">
              <div className="flex items-center gap-1 text-primary-foreground/80 text-xs mb-1">
                <TrendingUp className="w-3 h-3" />
                本月获得
              </div>
              <p className="text-lg font-bold text-primary-foreground">+{monthEarned}</p>
            </div>
            <div className="flex-1 bg-primary-foreground/10 rounded-xl p-3">
              <div className="flex items-center gap-1 text-primary-foreground/80 text-xs mb-1">
                <ShoppingBag className="w-3 h-3" />
                本月消耗
              </div>
              <p className="text-lg font-bold text-primary-foreground">-{monthSpent}</p>
            </div>
          </div>

          {/* Expiring Warning */}
          {expiringPoints > 0 && (
            <div className="mt-3 flex items-center gap-2 bg-amber-500/20 rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-amber-200" />
              <span className="text-xs text-amber-100">
                {expiringPoints}积分将于{expiringDate}到期
              </span>
            </div>
          )}

          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-foreground/10 rounded-full" />
          <div className="absolute right-12 bottom-0 w-20 h-20 bg-primary-foreground/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-220px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start px-4 pt-4 pb-2 bg-transparent gap-2">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              >
                概览
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              >
                明细
              </TabsTrigger>
              <TabsTrigger
                value="exchange"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              >
                兑换
              </TabsTrigger>
              <TabsTrigger
                value="rules"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              >
                规则
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="px-4 pb-6 space-y-4 mt-0">
              {/* Daily Sign */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <CalendarCheck className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">每日签到</p>
                        <p className="text-xs text-muted-foreground">
                          {todaySigned ? "今日已签到" : "签到可获得10积分"}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      disabled={todaySigned}
                      onClick={handleSign}
                      className={cn(
                        "min-w-[72px]",
                        todaySigned
                          ? "bg-muted text-muted-foreground"
                          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                      )}
                    >
                      {todaySigned ? "已签到" : "签到"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab("exchange")}
                  className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 mx-auto bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground">积分兑换</p>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-400 to-purple-400 rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground">积分明细</p>
                </button>
                <button
                  onClick={() => setActiveTab("rules")}
                  className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 mx-auto bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground">积分规则</p>
                </button>
              </div>

              {/* Earn More Section */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      赚取更多积分
                    </h4>
                    <button onClick={() => setActiveTab("rules")} className="text-xs text-primary flex items-center">
                      查看全部 <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {earnRules.slice(0, 3).map((rule) => {
                      const Icon = rule.icon
                      return (
                        <div
                          key={rule.title}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{rule.title}</p>
                            <p className="text-xs text-muted-foreground">{rule.desc}</p>
                          </div>
                          <Badge className="bg-amber-100 text-amber-700 border-0 font-semibold">
                            {rule.points}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* VIP Bonus */}
              <Card className="border-0 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 overflow-hidden">
                <CardContent className="p-4 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">VIP会员专享</p>
                      <p className="text-xs text-muted-foreground">消费积分双倍累积</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0">
                      2x积分
                    </Badge>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-200/30 rounded-full" />
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="px-4 pb-6 space-y-4 mt-0">
              {/* Filter */}
              <div className="flex gap-2">
                {[
                  { key: "all", label: "全部" },
                  { key: "earn", label: "获取" },
                  { key: "spend", label: "消耗" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setHistoryFilter(filter.key as typeof historyFilter)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      historyFilter === filter.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* History List */}
              <div className="space-y-2">
                {filteredHistory.map((item) => {
                  const Icon = item.icon
                  return (
                    <Card key={item.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              item.type === "earn"
                                ? "bg-gradient-to-br from-teal-100 to-emerald-100"
                                : "bg-gradient-to-br from-rose-100 to-pink-100"
                            )}
                          >
                            <Icon
                              className={cn("w-5 h-5", item.type === "earn" ? "text-teal-600" : "text-rose-600")}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground text-sm">{item.title}</p>
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.date} {item.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {item.type === "earn" ? (
                              <ArrowUpRight className="w-4 h-4 text-teal-600" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-rose-600" />
                            )}
                            <span
                              className={cn(
                                "font-bold",
                                item.type === "earn" ? "text-teal-600" : "text-rose-600"
                              )}
                            >
                              {item.points > 0 ? "+" : ""}
                              {item.points}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Exchange Tab */}
            <TabsContent value="exchange" className="px-4 pb-6 space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  可用积分: <span className="font-bold text-primary">{totalPoints.toLocaleString()}</span>
                </p>
                <Badge variant="outline" className="text-xs">
                  100积分=1元
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {giftItems.map((item) => (
                  <Card key={item.id} className="border-0 shadow-sm overflow-hidden">
                    <div className="relative h-28">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                      {item.tag && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0 text-[10px]">
                          {item.tag}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium text-foreground text-sm line-clamp-1">{item.name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-bold text-primary">{item.points}</span>
                        </div>
                        <span className="text-xs text-muted-foreground line-through">
                          ¥{item.originalPrice}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-2 h-8 text-xs"
                        disabled={totalPoints < item.points}
                      >
                        {totalPoints >= item.points ? "立即兑换" : "积分不足"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules" className="px-4 pb-6 space-y-4 mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-teal-500" />
                    如何获取积分
                  </h4>
                  <div className="space-y-2">
                    {earnRules.map((rule) => {
                      const Icon = rule.icon
                      return (
                        <div key={rule.title} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                          <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-teal-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{rule.title}</p>
                            <p className="text-xs text-muted-foreground">{rule.desc}</p>
                          </div>
                          <Badge className="bg-teal-100 text-teal-700 border-0 font-semibold">{rule.points}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-violet-500" />
                    积分使用规则
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>1. 积分可在积分商城兑换礼品或优惠券</p>
                    <p>2. 积分可用于抵扣服务费用，100积分=1元</p>
                    <p>3. 积分有效期为获取后12个月，逾期作废</p>
                    <p>4. VIP会员消费可获得双倍积分</p>
                    <p>5. 积分不可转让、提现或兑换现金</p>
                    <p>6. 如有疑问请联系客服咨询</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
