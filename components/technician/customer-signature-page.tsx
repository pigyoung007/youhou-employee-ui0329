"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { CheckCircle2, RotateCcw, Check, AlertCircle } from "lucide-react"

export function TechnicianCustomerSignaturePage({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const serviceInfo = {
    customerName: "王女士",
    serviceName: "产后腹直肌修复",
    serviceDate: "2026-01-22",
    serviceTime: "09:00-10:30",
    duration: 90,
    serviceItems: [
      { name: "产后腹直肌评估", status: "completed" },
      { name: "腹直肌修复疗程", status: "completed" },
      { name: "居家护理指导", status: "completed" },
    ],
    remarks: "客户配合度好，效果显著。建议继续5周疗程。",
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.strokeStyle = "#1f2937"
      ctx.lineTo(x, y)
      ctx.stroke()
      setHasSignature(true)
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      setHasSignature(false)
    }
  }

  const handleConfirmSignature = () => {
    if (hasSignature) {
      setShowConfirm(true)
    }
  }

  const handleSubmit = () => {
    alert("签署成功！服务单已保存。")
    setShowConfirm(false)
    clearSignature()
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-primary/10 to-background z-10 px-4 pt-4 pb-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            ← 返回
          </button>
          <h1 className="text-xl font-bold flex-1">客户签署</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Service Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">服务信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">客户：</span>
                <span className="font-semibold">{serviceInfo.customerName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">服务项目：</span>
                <span className="font-medium">{serviceInfo.serviceName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">服务时间：</span>
                <span>{serviceInfo.serviceDate} {serviceInfo.serviceTime}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">服务时长：</span>
                <span>{serviceInfo.duration}分钟</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Items */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">服务内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {serviceInfo.serviceItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Remarks */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">服务备注</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground bg-muted/50 rounded p-3">
              {serviceInfo.remarks}
            </p>
          </CardContent>
        </Card>

        {/* Signature Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">客户签名</CardTitle>
              {hasSignature && (
                <Badge className="bg-green-100 text-green-800 border-0">已签署</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-2 border-dashed rounded-lg overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                width={300}
                height={180}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full cursor-crosshair bg-white"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={clearSignature}
                className="flex-1"
                disabled={!hasSignature}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                清除签名
              </Button>
              <Button
                onClick={handleConfirmSignature}
                disabled={!hasSignature}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Check className="w-4 h-4 mr-1" />
                确认签署
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              在上方签名区域手写您的签名
            </p>
          </CardContent>
        </Card>

        {/* Agreement */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">重要提示：</p>
              <p>客户签名表示确认本次服务已完成，如有异议请立即沟通。签署后无法修改。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认客户签署</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">客户：</span>
                <span className="font-semibold">{serviceInfo.customerName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">服务项目：</span>
                <span className="font-semibold">{serviceInfo.serviceName}</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              确认签署后，本次服务单将被保存并上报系统。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              确认签署
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
