'use client'

import { useState } from 'react'
import { ChevronLeft, Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MyReviewsPageProps {
  onBack: () => void
}

interface Review {
  id: string
  orderId: string
  serviceType: string
  caregiverName: string
  rating: number
  tags: string[]
  comment: string
  createdAt: string
  type: 'caregiver' | 'technician' | 'consultant'
  typeLabel: string
}

interface PendingReview {
  id: string
  orderId: string
  serviceType: string
  caregiverName: string
  completedAt: string
  type: 'caregiver' | 'technician' | 'consultant'
  typeLabel: string
}

const mockReviews: Review[] = [
  {
    id: 'REV001',
    orderId: 'ORD20260325004',
    serviceType: '月嫂服务',
    caregiverName: '陈姐',
    rating: 5,
    tags: ['服务专业', '态度友善', '守时准时'],
    comment: '陈姐非常专业，月子餐做得特别好，宝宝照顾得也很细心，非常感谢！',
    createdAt: '2026-02-15',
    type: 'caregiver',
    typeLabel: '家政员评价',
  },
  {
    id: 'REV002',
    orderId: 'ORD20260328002',
    serviceType: '产后修复',
    caregiverName: '张技师',
    rating: 4,
    tags: ['手法专业', '效果明显'],
    comment: '产后修复效果不错，技师很有耐心地讲解注意事项。',
    createdAt: '2026-03-10',
    type: 'technician',
    typeLabel: '技师评价',
  },
  {
    id: 'REV003',
    orderId: 'ORD20260329001',
    serviceType: '月嫂服务',
    caregiverName: '张丽',
    rating: 5,
    tags: ['沟通及时', '服务周到'],
    comment: '顾问张丽老师非常专业，推荐的阿姨非常合适我们家的情况。',
    createdAt: '2026-03-28',
    type: 'consultant',
    typeLabel: '顾问评价',
  },
]

const mockPendingReviews: PendingReview[] = [
  {
    id: 'PREV001',
    orderId: 'ORD20260327003',
    serviceType: '育婴师',
    caregiverName: '张静',
    completedAt: '2026-04-05',
    type: 'caregiver',
    typeLabel: '家政员评价',
  },
]

const typeColors = {
  caregiver: 'bg-teal-100 text-teal-700',
  technician: 'bg-violet-100 text-violet-700',
  consultant: 'bg-blue-100 text-blue-700',
}

export function MyReviewsPage({ onBack }: MyReviewsPageProps) {
  const [activeTab, setActiveTab] = useState<'submitted' | 'pending'>('submitted')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border pt-3 pb-3">
        <div className="px-3">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-base">我的评价</h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('submitted')}
              className={cn(
                'px-4 py-1.5 text-xs font-medium rounded-full transition-colors',
                activeTab === 'submitted'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              已评价 ({mockReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={cn(
                'px-4 py-1.5 text-xs font-medium rounded-full transition-colors',
                activeTab === 'pending'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              待评价 ({mockPendingReviews.length})
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 space-y-3">
        {activeTab === 'submitted' ? (
          mockReviews.length === 0 ? (
            <div className="py-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">暂无评价记录</p>
            </div>
          ) : (
            mockReviews.map((review) => (
              <Card key={review.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{review.serviceType}</p>
                        <Badge className={cn('text-[10px] px-1.5 py-0', typeColors[review.type])}>
                          {review.typeLabel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">评价对象: {review.caregiverName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.createdAt}</p>
                  </div>

                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/20'
                        )}
                      />
                    ))}
                    <span className="text-xs font-semibold text-amber-600 ml-1">{review.rating}.0</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {review.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 bg-muted/50">
                        <ThumbsUp className="w-2.5 h-2.5 mr-0.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          )
        ) : (
          mockPendingReviews.length === 0 ? (
            <div className="py-12 text-center">
              <Star className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">暂无待评价项目</p>
            </div>
          ) : (
            mockPendingReviews.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{item.serviceType}</p>
                        <Badge className={cn('text-[10px] px-1.5 py-0', typeColors[item.type])}>
                          {item.typeLabel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">评价对象: {item.caregiverName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">完成时间: {item.completedAt}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full h-8 text-xs bg-primary hover:bg-primary/90">
                    <Star className="w-3.5 h-3.5 mr-1" />
                    立即评价
                  </Button>
                </CardContent>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  )
}
