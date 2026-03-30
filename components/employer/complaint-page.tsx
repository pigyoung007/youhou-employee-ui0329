'use client'

import { useState } from 'react'
import { ChevronLeft, AlertCircle, Upload, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ComplaintPageProps {
  orderId: string
  caregiverName: string
  onBack: () => void
  onSubmitSuccess?: () => void
}

export function ComplaintPage({ orderId, caregiverName, onBack, onSubmitSuccess }: ComplaintPageProps) {
  const [complaintType, setComplaintType] = useState<string>('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const complaintTypes = [
    '服务态度不好',
    '服务质量差',
    '迟到或缺席',
    '卫生问题',
    '其他问题',
  ]

  const handleSubmit = async () => {
    if (!complaintType || !description.trim()) {
      alert('请填写投诉类型和描述')
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      onSubmitSuccess?.()
      onBack()
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Send className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-xl font-bold mb-2">投诉已提交</h1>
        <p className="text-sm text-muted-foreground text-center">
          我们已收到您的投诉，客服团队将在24小时内与您联系
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-base flex-1">提交投诉</h1>
        </div>
      </div>

      {/* 内容 */}
      <div className="px-3 py-4 space-y-4">
        {/* 提示 */}
        <Card className="border-0 shadow-sm bg-orange-50">
          <CardContent className="p-3 flex gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-orange-900 mb-1">重要说明</p>
              <p className="text-xs text-orange-700">
                我们重视您的反馈。请详细描述问题，附加证据将有助于我们更好地处理您的投诉
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 服务人员信息 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                👩
              </div>
              <div>
                <p className="text-sm font-medium">{caregiverName}</p>
                <p className="text-xs text-muted-foreground">订单号: {orderId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 投诉类型 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">投诉类型*</p>
            <div className="space-y-2">
              {complaintTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setComplaintType(type)}
                  className={cn(
                    'w-full p-3 border-2 rounded-lg text-left transition-all text-sm',
                    complaintType === type
                      ? 'border-red-500 bg-red-50 font-medium text-red-700'
                      : 'border-border hover:border-border/70'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 详细描述 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">问题描述*</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请详细描述您遇到的问题..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none h-28"
            />
            <p className="text-[10px] text-muted-foreground text-right mt-1">
              {description.length}/500
            </p>
          </CardContent>
        </Card>

        {/* 证据上传 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">上传证据（选填）</p>
            <button className="w-full border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors flex flex-col items-center gap-2">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">点击上传图片或视频</p>
              <p className="text-[10px] text-muted-foreground">最多上传5个文件，单个文件不超过10MB</p>
            </button>
            {attachments.length > 0 && (
              <div className="mt-3 space-y-1">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span className="truncate">{file}</span>
                    <button className="text-red-600 hover:text-red-700">删除</button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !complaintType || !description.trim()}
          className="w-full h-10 bg-red-600 hover:bg-red-700 font-semibold"
        >
          {isSubmitting ? '提交中...' : '提交投诉'}
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full h-10"
        >
          取消
        </Button>
      </div>
    </div>
  )
}
