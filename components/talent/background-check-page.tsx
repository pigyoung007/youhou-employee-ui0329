"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronLeft, ShieldCheck, ShieldAlert, FileText, Upload,
  CheckCircle, Clock, AlertCircle, Eye, Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

type CheckStatus = "not_checked" | "checking" | "passed" | "warning"

interface BackgroundCheckItem {
  id: string
  type: "credit" | "criminal"
  title: string
  status: CheckStatus
  lastChecked?: string
  score?: number
  detail?: string
  expiresAt?: string
}

const statusConfig: Record<CheckStatus, { label: string; color: string; icon: typeof ShieldCheck }> = {
  not_checked: { label: "未查询", color: "bg-gray-50 text-gray-600", icon: Search },
  checking: { label: "查询中", color: "bg-blue-50 text-blue-600", icon: Clock },
  passed: { label: "已通过", color: "bg-green-50 text-green-600", icon: CheckCircle },
  warning: { label: "异常", color: "bg-red-50 text-red-600", icon: AlertCircle },
}

const backgroundChecks: BackgroundCheckItem[] = [
  {
    id: "BC001", type: "credit", title: "个人征信报告",
    status: "passed", lastChecked: "2026-03-15", score: 720,
    detail: "信用良好，无逾期记录", expiresAt: "2026-09-15",
  },
  {
    id: "BC002", type: "criminal", title: "无犯罪记录证明",
    status: "passed", lastChecked: "2026-02-20",
    detail: "经查询，无犯罪记录", expiresAt: "2026-08-20",
  },
]

interface BackgroundCheckPageProps {
  onBack: () => void
}

export function BackgroundCheckPage({ onBack }: BackgroundCheckPageProps) {
  const [selectedItem, setSelectedItem] = useState<BackgroundCheckItem | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">征信与背调</h1>
      </div>

      <main className="px-4 py-4 space-y-4 pb-24">
        {/* Overview */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">背调状态</h3>
                <p className="text-xs text-muted-foreground">信用良好，背调通过</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-green-600">720</p>
                <p className="text-[10px] text-muted-foreground">征信评分</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-bold text-green-600">通过</span>
                </div>
                <p className="text-[10px] text-muted-foreground">无犯罪记录</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check Items */}
        <div className="space-y-3">
          {backgroundChecks.map((item) => {
            const StatusIcon = statusConfig[item.status].icon
            return (
              <Card
                key={item.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      item.type === "credit" ? "bg-blue-100" : "bg-purple-100"
                    )}>
                      {item.type === "credit" ? (
                        <FileText className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ShieldCheck className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <Badge className={cn("text-[10px] shrink-0", statusConfig[item.status].color)}>
                          <StatusIcon className="w-3 h-3 mr-0.5" />
                          {statusConfig[item.status].label}
                        </Badge>
                      </div>
                      {item.score && (
                        <p className="text-xs text-muted-foreground">评分：<span className="font-semibold text-green-600">{item.score}</span></p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                      {item.lastChecked && (
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>查询时间：{item.lastChecked}</span>
                          {item.expiresAt && <span>有效至：{item.expiresAt}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            className="w-full bg-rose-500 hover:bg-rose-600 h-11"
            onClick={() => alert("正在发起征信查询...")}
          >
            <Search className="w-4 h-4 mr-2" />
            查询征信报告
          </Button>
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={() => setShowUpload(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            上传无犯罪记录证明
          </Button>
        </div>

        {/* Tips */}
        <Card className="border-0 shadow-sm bg-amber-50">
          <CardContent className="p-3">
            <h4 className="text-sm font-semibold text-amber-700 mb-1">温馨提示</h4>
            <ul className="text-xs text-amber-600 space-y-1">
              <li>· 征信报告建议每半年更新一次</li>
              <li>· 无犯罪记录证明可到户籍所在地派出所办理</li>
              <li>· 背调通过可提升您在平台的信任等级</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Detail Sheet */}
      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0 w-full sm:max-w-md">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">{selectedItem?.title}</SheetTitle>
          </SheetHeader>
          {selectedItem && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">类型</span>
                    <span className="text-sm font-medium">{selectedItem.type === "credit" ? "征信报告" : "无犯罪记录证明"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">状态</span>
                    <Badge className={cn("text-[10px]", statusConfig[selectedItem.status].color)}>
                      {statusConfig[selectedItem.status].label}
                    </Badge>
                  </div>
                  {selectedItem.score && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">信用评分</span>
                      <span className="text-lg font-bold text-green-600">{selectedItem.score}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">查询日期</span>
                    <span className="text-sm">{selectedItem.lastChecked}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">有效期至</span>
                    <span className="text-sm">{selectedItem.expiresAt}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">详情</span>
                    <p className="text-sm mt-1">{selectedItem.detail}</p>
                  </div>
                </CardContent>
              </Card>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                查看完整报告
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Upload Sheet */}
      <Sheet open={showUpload} onOpenChange={setShowUpload}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="pb-3 border-b border-border">
            <SheetTitle className="text-base">上传无犯罪记录证明</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="aspect-[4/3] bg-muted rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-rose-300 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">点击或拖拽上传文件</p>
              <p className="text-xs text-muted-foreground mt-1">支持 JPG/PNG/PDF，不超过 10MB</p>
            </div>
            <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => { setShowUpload(false); alert("上传成功") }}>
              确认上传
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
