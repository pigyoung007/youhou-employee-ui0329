"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft, Target, TrendingUp, Users, Briefcase,
  ChevronRight, Calendar, Award, Trophy, Flame,
  CheckCircle2, Circle, BarChart3, X,
} from "lucide-react"

const monthlyGoals = [
  {
    id: 1, category: "签约业绩", target: 33, current: 28, unit: "单",
    color: "violet", items: [
      { label: "月嫂签约", target: 15, current: 13 },
      { label: "育婴师签约", target: 10, current: 9 },
      { label: "产后修复签约", target: 8, current: 6 },
    ],
  },
  {
    id: 2, category: "营收目标", target: 150000, current: 128000, unit: "元",
    color: "amber", items: [
      { label: "月嫂服务", target: 80000, current: 72000 },
      { label: "育婴师服务", target: 40000, current: 35000 },
      { label: "产后修复", target: 30000, current: 21000 },
    ],
  },
  {
    id: 3, category: "客户开发", target: 50, current: 42, unit: "位",
    color: "teal", items: [
      { label: "新增客户", target: 30, current: 26 },
      { label: "老客户续签", target: 10, current: 9 },
      { label: "转介绍客户", target: 10, current: 7 },
    ],
  },
]

const quarterGoals = [
  { label: "Q1签约目标", target: 100, current: 28, unit: "单" },
  { label: "Q1营收目标", target: 450000, current: 128000, unit: "元" },
  { label: "Q1客户满意度", target: 95, current: 96.2, unit: "%" },
]

const rankingData = [
  { rank: 1, name: "张经理", value: 35, avatar: "张" },
  { rank: 2, name: "王顾问", value: 28, avatar: "王", isMe: true },
  { rank: 3, name: "李顾问", value: 25, avatar: "李" },
  { rank: 4, name: "刘顾问", value: 22, avatar: "刘" },
  { rank: 5, name: "陈顾问", value: 18, avatar: "陈" },
]

interface PerformanceGoalsPageProps {
  onBack: () => void
}

export function PerformanceGoalsPage({ onBack }: PerformanceGoalsPageProps) {
  const [activeTab, setActiveTab] = useState<"month" | "quarter">("month")
  const [selectedGoal, setSelectedGoal] = useState<typeof monthlyGoals[0] | null>(null)

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; text: string; light: string; bar: string }> = {
      violet: { bg: "bg-violet-100", text: "text-violet-600", light: "from-violet-50 to-purple-50", bar: "bg-violet-500" },
      amber: { bg: "bg-amber-100", text: "text-amber-600", light: "from-amber-50 to-orange-50", bar: "bg-amber-500" },
      teal: { bg: "bg-teal-100", text: "text-teal-600", light: "from-teal-50 to-emerald-50", bar: "bg-teal-500" },
    }
    return map[color] || map.violet
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 pt-4 pb-4 safe-area-top">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 -ml-1 hover:bg-white/10 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold">业绩目标</h1>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">85%</p>
            <p className="text-[10px] text-white/80">月目标完成率</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">No.2</p>
            <p className="text-[10px] text-white/80">团队排名</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">12天</p>
            <p className="text-[10px] text-white/80">连续达标</p>
          </div>
        </div>
      </header>

      <main className="px-3 py-3 space-y-3">
        {/* Tab Switcher */}
        <div className="flex bg-muted rounded-xl p-1">
          {[
            { id: "month" as const, label: "本月目标" },
            { id: "quarter" as const, label: "季度目标" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "month" ? (
          <>
            {/* Monthly Goal Cards */}
            {monthlyGoals.map(goal => {
              const pct = Math.round((goal.current / goal.target) * 100)
              const c = getColorClasses(goal.color)
              return (
                <Card
                  key={goal.id}
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedGoal(goal)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${c.bg} rounded-lg flex items-center justify-center`}>
                          <Target className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">{goal.category}</h3>
                          <p className="text-[10px] text-muted-foreground">{goal.current}/{goal.target} {goal.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-lg font-bold ${c.text}`}>{pct}%</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${c.bar} rounded-full transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Team Ranking */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold">团队排名（本月签约）</h3>
                </div>
                <div className="space-y-2">
                  {rankingData.map(r => (
                    <div
                      key={r.rank}
                      className={`flex items-center gap-2.5 p-2 rounded-xl ${r.isMe ? "bg-violet-50 ring-1 ring-violet-200" : "bg-muted/30"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        r.rank === 1 ? "bg-amber-100 text-amber-600" :
                        r.rank === 2 ? "bg-gray-100 text-gray-600" :
                        r.rank === 3 ? "bg-orange-100 text-orange-600" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {r.rank}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-medium text-violet-600 shrink-0">
                        {r.avatar}
                      </div>
                      <span className={`text-xs flex-1 ${r.isMe ? "font-semibold text-violet-700" : ""}`}>
                        {r.name}{r.isMe ? "（我）" : ""}
                      </span>
                      <span className="text-xs font-bold">{r.value}单</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-violet-500" />
                  <h3 className="text-sm font-semibold">成就徽章</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: Flame, label: "连续达标", active: true },
                    { icon: Trophy, label: "月度冠军", active: false },
                    { icon: TrendingUp, label: "业绩翻倍", active: true },
                    { icon: Users, label: "客户满分", active: true },
                  ].map((badge) => {
                    const Icon = badge.icon
                    return (
                      <div key={badge.label} className="text-center">
                        <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-1 ${
                          badge.active ? "bg-gradient-to-br from-amber-100 to-orange-100" : "bg-muted"
                        }`}>
                          <Icon className={`w-5 h-5 ${badge.active ? "text-amber-500" : "text-muted-foreground/40"}`} />
                        </div>
                        <p className={`text-[10px] ${badge.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{badge.label}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Quarter Goals */}
            {quarterGoals.map(goal => {
              const pct = goal.unit === "%" ? goal.current : Math.round((goal.current / goal.target) * 100)
              const display = goal.unit === "元"
                ? `${(goal.current / 10000).toFixed(1)}万/${(goal.target / 10000).toFixed(1)}万`
                : `${goal.current}/${goal.target}${goal.unit}`
              return (
                <Card key={goal.label} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">{goal.label}</h3>
                      <span className="text-xs text-muted-foreground">{display}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${Number(pct) >= 100 ? "bg-teal-500" : "bg-violet-500"}`}
                        style={{ width: `${Math.min(Number(pct), 100)}%` }}
                      />
                    </div>
                    <p className="text-right text-[11px] text-muted-foreground mt-1">{typeof pct === "number" ? pct.toFixed(pct % 1 === 0 ? 0 : 1) : pct}%</p>
                  </CardContent>
                </Card>
              )
            })}

            {/* Quarter Summary */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-violet-500" />
                  <h3 className="text-sm font-semibold">Q1进度概览</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/80 rounded-lg p-2 text-center">
                    <p className="text-base font-bold text-violet-600">1/3</p>
                    <p className="text-[10px] text-muted-foreground">已完成月份</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-2 text-center">
                    <p className="text-base font-bold text-amber-600">28.4%</p>
                    <p className="text-[10px] text-muted-foreground">营收进度</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-2 text-center">
                    <p className="text-base font-bold text-teal-600">领先</p>
                    <p className="text-[10px] text-muted-foreground">同比去年</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Goal Detail Drawer */}
      <Sheet open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
        <SheetContent side="right" className="w-[85vw] max-w-sm flex flex-col py-0 h-auto max-h-screen">
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <SheetTitle className="text-base">{selectedGoal?.category} - 明细</SheetTitle>
              <button onClick={() => setSelectedGoal(null)} className="p-1"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            {selectedGoal && (
              <div className="px-4 py-3 space-y-3 overflow-y-auto">
                {selectedGoal.items.map(item => {
                  const pct = Math.round((item.current / item.target) * 100)
                  const c = getColorClasses(selectedGoal.color)
                  return (
                    <div key={item.label} className="bg-muted/30 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.current}/{item.target} {selectedGoal.unit}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          {pct >= 100 ? (
                            <CheckCircle2 className="w-3 h-3 text-teal-500" />
                          ) : (
                            <Circle className="w-3 h-3 text-muted-foreground" />
                          )}
                          <span className={`text-[10px] ${pct >= 100 ? "text-teal-600 font-medium" : "text-muted-foreground"}`}>
                            {pct >= 100 ? "已完成" : `还差 ${item.target - item.current} ${selectedGoal.unit}`}
                          </span>
                        </div>
                        <span className={`text-xs font-bold ${c.text}`}>{pct}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
