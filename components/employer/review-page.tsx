'use client'

import { useState } from 'react'
import { ChevronLeft, Star, Image as ImageIcon, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ReviewPageProps {
  orderId: string
  caregiverName: string
  onBack: () => void
  onSubmitSuccess?: () => void
}

export function ReviewPage({ orderId, caregiverName, onBack, onSubmitSuccess }: ReviewPageProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const tags = [
    '服务专业',
    '态度友善',
    '沟通及时',
    '守时准时',
    '卫生整洁',
    '经验丰富',
  ]

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('请先选择评分')
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
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Star className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-xl font-bold mb-2">评价已提交</h1>
        <p className="text-sm text-muted-foreground text-center">
          感谢您的评价，将帮助我们持续改进服务质量
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
          <h1 className="font-bold text-base flex-1">评价服务</h1>
        </div>
      </div>

      {/* 内容 */}
      <div className="px-3 py-4 space-y-4">
        {/* 服务人员信息 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                👩
              </div>
              <div>
                <p className="text-sm font-medium">{caregiverName}</p>
                <p className="text-xs text-muted-foreground">订单号: {orderId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 星级评分 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">您的评分</p>
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      'w-8 h-8 transition-colors',
                      (hoveredRating || rating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-xs text-center text-muted-foreground">
                {['极差', '不满意', '一般', '满意', '非常满意'][rating - 1]}
              </p>
            )}
          </CardContent>
        </Card>

        {/* 评价标签 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">选择评价标签</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag))
                    } else {
                      setSelectedTags([...selectedTags, tag])
                    }
                  }}
                  className={cn(
                    'px-3 py-1.5 text-xs rounded-full border-2 transition-all',
                    selectedTags.includes(tag)
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border text-muted-foreground hover:border-border/70'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 文字评价 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">评价内容</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="请分享您对服务的看法（选填）"
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none h-24"
            />
            <p className="text-[10px] text-muted-foreground text-right mt-1">
              {comment.length}/200
            </p>
          </CardContent>
        </Card>

        {/* 图片上传 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-3">上传图片</p>
            <button className="w-full border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors flex flex-col items-center gap-2">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">点击上传图片</p>
              <p className="text-[10px] text-muted-foreground">最多上传3张</p>
            </button>
          </CardContent>
        </Card>

        {/* 匿名选项 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="w-full flex items-center gap-3 p-2"
            >
              <div className={cn(
                'w-5 h-5 rounded border-2 border-border flex items-center justify-center transition-all',
                isAnonymous && 'bg-primary border-primary'
              )}>
                {isAnonymous && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
              </div>
              <span className="text-sm">匿名评价</span>
            </button>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0}
          className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
        >
          {isSubmitting ? '提交中...' : '提交评价'}
        </Button>
      </div>
    </div>
  )
}
