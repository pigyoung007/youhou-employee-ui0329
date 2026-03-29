"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { X, RotateCcw, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SignaturePadProps {
  onClose: () => void
  onComplete: (signature: string) => void
}

export function SignaturePad({ onClose, onComplete }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    // Set drawing styles
    ctx.strokeStyle = "#1a1a1a"
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)
    setHasSignature(true)

    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return
    e.preventDefault()

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return

    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const confirmSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const signature = canvas.toDataURL("image/png")
    onComplete(signature)
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end">
      <div className="w-full bg-card rounded-t-3xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">电子签名</h3>
            <p className="text-xs text-muted-foreground mt-0.5">请在下方区域手写签名</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">您的签名将具有法律效力，请认真签署。签名后将用于生成电子合同。</p>
          </div>

          {/* Canvas */}
          <div className="bg-muted/20 rounded-2xl p-3 border-2 border-dashed border-border">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full h-52 bg-card rounded-xl touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-muted-foreground/50 text-lg">在此处签名</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1 h-12 bg-transparent border-border"
              onClick={clearSignature}
              disabled={!hasSignature}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重新签名
            </Button>
            <Button
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={confirmSignature}
              disabled={!hasSignature}
            >
              <Check className="w-4 h-4 mr-2" />
              确认签署
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            点击&ldquo;确认签署&rdquo;即表示您已阅读并同意
            <span className="text-primary cursor-pointer">《服务协议》</span>和
            <span className="text-primary cursor-pointer">《隐私政策》</span>
          </p>
        </div>
      </div>
    </div>
  )
}
