"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Upload,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Search,
  FileCheck,
  Camera,
  Calendar,
  RefreshCw,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BackgroundCheckPageProps {
  onBack: () => void
}

interface CheckItem {
  id: string
  type: "credit" | "criminal"
  title: string
  status: "valid" | "querying" | "expired" | "none"
  queryDate?: string
  validUntil?: string
  result?: string
}

const STATUS_MAP: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  valid: { label: "有效", className: "bg-green-100 text-green-700", icon: CheckCircle2 },
  querying: { label: "查询中", className: "bg-blue-100 text-blue-700", icon: Clock },
  expired: { label: "已过期", className: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  none: { label: "未查询", className: "bg-gray-100 text-gray-500", icon: XCircle },
}

export function BackgroundCheckPage({ onBack }: BackgroundCheckPageProps) {
  const [showCreditDetail, setShowCreditDetail] = useState(false)
  const [showCriminalDetail, setShowCriminalDetail] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  const checks: CheckItem[] = [
    {
      id: "1",
      type: "credit",
      title: "个人征信报告",
      status: "valid",
      queryDate: "2026-03-15",
      validUntil: "2026-09-15",
      result: "信用良好，无不良记录",
    },
    {
      id: "2",
      type: "criminal",
      title: "无犯罪记录证明",
      status: "valid",
      queryDate: "2026-02-20",
      validUntil: "2026-08-20",
      result: "经查询，无犯罪记录",
    },
  ]

  const creditCheck = checks.find((c) => c.type === "credit")!
  const criminalCheck = checks.find((c) => c.type === "criminal")!

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-4 pb-4 pt-4 text-white safe-area-top">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">征信与背景查询</h1>
        </div>
        <p className="mt-1 pl-10 text-xs opacity-90">管理您的征信报告与无犯罪记录证明</p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* 总览 */}
        <Card className="border shadow-sm">
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3">
                <ShieldCheck className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-700">2</p>
                  <p className="text-[10px] text-green-600">证明有效</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-teal-50 p-3">
                <FileCheck className="h-8 w-8 text-teal-600" />
                <div>
                  <p className="text-lg font-bold text-teal-700">良好</p>
                  <p className="text-[10px] text-teal-600">信用状态</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 征信报告 */}
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{creditCheck.title}</p>
                  <p className="text-xs text-muted-foreground">
                    查询日期: {creditCheck.queryDate}
                  </p>
                </div>
              </div>
              <Badge className={STATUS_MAP[creditCheck.status].className}>
                {STATUS_MAP[creditCheck.status].label}
              </Badge>
            </div>

            <div className="mb-3 rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-green-700">{creditCheck.result}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                有效期至: {creditCheck.validUntil}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent text-xs"
                onClick={() => setShowCreditDetail(true)}
              >
                <FileText className="mr-1 h-3.5 w-3.5" />
                查看报告
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1 bg-teal-600 text-xs hover:bg-teal-700"
                onClick={() => alert("已发起重新查询，预计1-3个工作日出结果")}
              >
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                重新查询
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 无犯罪记录 */}
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{criminalCheck.title}</p>
                  <p className="text-xs text-muted-foreground">
                    开具日期: {criminalCheck.queryDate}
                  </p>
                </div>
              </div>
              <Badge className={STATUS_MAP[criminalCheck.status].className}>
                {STATUS_MAP[criminalCheck.status].label}
              </Badge>
            </div>

            <div className="mb-3 rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-green-700">{criminalCheck.result}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                有效期至: {criminalCheck.validUntil}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent text-xs"
                onClick={() => setShowCriminalDetail(true)}
              >
                <FileText className="mr-1 h-3.5 w-3.5" />
                查看证明
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1 bg-teal-600 text-xs hover:bg-teal-700"
                onClick={() => setShowUpload(true)}
              >
                <Upload className="mr-1 h-3.5 w-3.5" />
                上传新证明
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 提示 */}
        <Card className="border border-blue-200 bg-blue-50 shadow-sm">
          <CardContent className="flex items-start gap-2 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <div className="text-xs text-blue-700">
              <p className="font-medium">温馨提示</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5">
                <li>征信报告建议每6个月更新一次</li>
                <li>无犯罪记录证明有效期为6个月</li>
                <li>保持良好记录有助于获取更多客户信任</li>
                <li>私有订单签约时需提供有效征信与无犯罪记录</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 征信详情 */}
      <Dialog open={showCreditDetail} onOpenChange={setShowCreditDetail}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>征信报告详情</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <Card className="border">
                <CardContent className="space-y-2 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">报告编号</span>
                    <span>ZX-2026031500088</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">查询机构</span>
                    <span>中国人民银行征信中心</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">查询日期</span>
                    <span>{creditCheck.queryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">有效期至</span>
                    <span>{creditCheck.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">查询结果</span>
                    <span className="text-green-600">{creditCheck.result}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent className="p-3">
                  <p className="mb-2 text-sm font-medium">信用摘要</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">信贷记录</span>
                      <Badge className="bg-green-100 text-[10px] text-green-600">正常</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">逾期记录</span>
                      <Badge className="bg-green-100 text-[10px] text-green-600">无</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">公共记录</span>
                      <Badge className="bg-green-100 text-[10px] text-green-600">无</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">查询记录</span>
                      <span>近6个月 2 次</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* 无犯罪记录详情 */}
      <Dialog open={showCriminalDetail} onOpenChange={setShowCriminalDetail}>
        <DialogContent className="max-h-[85vh] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>无犯罪记录证明</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <Card className="border">
                <CardContent className="space-y-2 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">证明编号</span>
                    <span>WFZ-2026022000088</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">开具单位</span>
                    <span>XX区公安分局</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">开具日期</span>
                    <span>{criminalCheck.queryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">有效期至</span>
                    <span>{criminalCheck.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">查询结果</span>
                    <span className="text-green-600">{criminalCheck.result}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center rounded-lg border-2 border-dashed bg-muted/30 p-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12" />
                  <p className="mt-2 text-xs">证明文件预览</p>
                  <p className="text-[10px]">（上线后展示真实文件扫描件）</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* 上传证明 */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>上传无犯罪记录证明</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              请上传最新的无犯罪记录证明扫描件或照片，审核通过后将更新您的证明状态。
            </p>
            <button
              type="button"
              className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-muted-foreground hover:border-teal-300 hover:text-teal-600 transition-colors"
            >
              <Camera className="h-8 w-8" />
              <span className="text-sm">点击拍照或选择文件</span>
              <span className="text-[10px]">支持 JPG、PNG、PDF 格式</span>
            </button>
            <div>
              <label className="mb-1.5 block text-sm font-medium">开具日期</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="date" className="w-full rounded-md border px-9 py-2 text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowUpload(false)}>
              取消
            </Button>
            <Button
              type="button"
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                setShowUpload(false)
                alert("已提交，等待审核")
              }}
            >
              <Upload className="mr-1 h-4 w-4" />
              提交审核
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
