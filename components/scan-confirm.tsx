"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle2, AlertTriangle, Scan, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScanConfirmProps {
  onClose: () => void
  serviceName: string
  remainingTimes: number
}

export function ScanConfirm({ onClose, serviceName, remainingTimes }: ScanConfirmProps) {
  const [step, setStep] = useState<"scanning" | "confirm" | "processing" | "success">("scanning")
  const [scanProgress, setScanProgress] = useState(0)

  // Animate scan line
  useEffect(() => {
    if (step === "scanning") {
      const timer = setInterval(() => {
        setScanProgress((prev) => (prev + 2) % 100)
      }, 30)
      return () => clearInterval(timer)
    }
  }, [step])

  // Simulate QR scan
  const simulateScan = () => {
    setTimeout(() => {
      setStep("confirm")
    }, 1000)
  }

  const handleConfirm = () => {
    setStep("processing")
    setTimeout(() => {
      setStep("success")
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">耗卡确认</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "scanning" && (
            <div className="text-center">
              <div
                className="w-52 h-52 mx-auto bg-muted/30 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer border-2 border-primary/20"
                onClick={simulateScan}
              >
                {/* Corner markers */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />

                {/* Scan line */}
                <div
                  className="absolute w-[85%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
                  style={{ top: `${10 + scanProgress * 0.8}%` }}
                />

                <div className="text-center">
                  <Scan className="w-14 h-14 text-primary/40 mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">对准二维码扫描</p>
                </div>
              </div>
              <p className="text-foreground font-semibold mt-6">扫描技师二维码</p>
              <p className="text-sm text-muted-foreground mt-1">点击上方区域模拟扫描</p>
            </div>
          )}

          {step === "confirm" && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-5">
                <AlertTriangle className="w-10 h-10 text-amber-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">确认扣除服务次数？</h4>
              <p className="text-sm text-muted-foreground mb-5">请仔细核对以下信息</p>

              <div className="bg-muted/30 rounded-2xl p-5 mb-5 text-left space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">服务项目</span>
                  <span className="font-semibold text-foreground">{serviceName}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">扣除次数</span>
                  <span className="font-bold text-primary text-lg">1次</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">扣除后余额</span>
                  <span className="font-semibold text-foreground">{remainingTimes - 1}次</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 bg-transparent" onClick={onClose}>
                  取消
                </Button>
                <Button
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleConfirm}
                >
                  确认扣除
                </Button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">正在处理...</h4>
              <p className="text-muted-foreground mt-1">请稍候</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-24 h-24 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-5 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-14 h-14 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">核销成功</h4>
              <p className="text-muted-foreground">已扣除1次{serviceName}</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <span className="text-muted-foreground">剩余</span>
                <span className="text-2xl font-bold text-primary">{remainingTimes - 1}</span>
                <span className="text-muted-foreground">次</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
