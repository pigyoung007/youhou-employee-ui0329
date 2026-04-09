'use client'

import { useState } from 'react'
import { ChevronLeft, Calendar, Clock, MapPin, User, Plus, Phone, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AppointmentPageProps {
  onBack: () => void
}

interface Appointment {
  id: string
  serviceType: string
  caregiverName: string
  date: string
  time: string
  duration: string
  location: string
  status: 'upcoming' | 'confirmed' | 'completed' | 'cancelled'
  consultantName?: string
}

const statusConfig = {
  upcoming: { label: '待确认', color: 'bg-orange-100 text-orange-700' },
  confirmed: { label: '已确认', color: 'bg-green-100 text-green-700' },
  completed: { label: '已完成', color: 'bg-gray-100 text-gray-700' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-700' },
}

const serviceTypeConfig: Record<string, { emoji: string; color: string }> = {
  '月嫂服务': { emoji: '👶', color: 'from-orange-100 to-amber-50' },
  '产后修复': { emoji: '💆', color: 'from-rose-100 to-pink-50' },
  '育婴师': { emoji: '👧', color: 'from-teal-100 to-emerald-50' },
  '面试': { emoji: '🎥', color: 'from-blue-100 to-sky-50' },
}

const mockAppointments: Appointment[] = [
  {
    id: 'APT001',
    serviceType: '产后修复',
    caregiverName: '张技师',
    date: '2026-04-10',
    time: '14:00',
    duration: '60分钟',
    location: '优厚家庭服务中心（徐汇店）',
    status: 'confirmed',
    consultantName: '刘婷',
  },
  {
    id: 'APT002',
    serviceType: '面试',
    caregiverName: '王阿姨',
    date: '2026-04-12',
    time: '10:00',
    duration: '30分钟',
    location: '线上视频面试',
    status: 'upcoming',
    consultantName: '张丽',
  },
  {
    id: 'APT003',
    serviceType: '产后修复',
    caregiverName: '李技师',
    date: '2026-04-05',
    time: '15:30',
    duration: '60分钟',
    location: '优厚家庭服务中心（浦东店）',
    status: 'completed',
  },
  {
    id: 'APT004',
    serviceType: '月嫂服务',
    caregiverName: '赵阿姨',
    date: '2026-04-03',
    time: '09:00',
    duration: '上户面试',
    location: '客户家中',
    status: 'cancelled',
    consultantName: '张丽',
  },
]

const serviceTypes = ['全部', '产后修复', '月嫂服务', '育婴师', '面试']

export function AppointmentPage({ onBack }: AppointmentPageProps) {
  const [filterType, setFilterType] = useState('全部')
  const [showNewForm, setShowNewForm] = useState(false)
  const [newServiceType, setNewServiceType] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newNote, setNewNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const filtered = mockAppointments.filter(
    a => filterType === '全部' || a.serviceType === filterType
  )

  const upcoming = filtered.filter(a => a.status === 'upcoming' || a.status === 'confirmed')
  const past = filtered.filter(a => a.status === 'completed' || a.status === 'cancelled')

  const handleSubmit = async () => {
    if (!newServiceType || !newDate || !newTime) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setShowNewForm(false)
      setNewServiceType('')
      setNewDate('')
      setNewTime('')
      setNewNote('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border pt-3 pb-3">
        <div className="px-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="font-bold text-base">预约管理</h1>
            </div>
            <Button
              size="sm"
              variant={showNewForm ? 'outline' : 'default'}
              className="h-7 text-xs"
              onClick={() => setShowNewForm(!showNewForm)}
            >
              {showNewForm ? '返回列表' : (
                <>
                  <Plus className="w-3 h-3 mr-1" />
                  新建预约
                </>
              )}
            </Button>
          </div>

          {!showNewForm && (
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3">
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                    filterType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-4">
        {showNewForm ? (
          isSuccess ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <p className="font-semibold text-lg mb-2">预约提交成功</p>
              <p className="text-sm text-muted-foreground">顾问会尽快与您确认预约详情</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">服务类型</label>
                <div className="grid grid-cols-2 gap-2">
                  {['月嫂服务', '产后修复', '育婴师', '面试'].map((type) => {
                    const config = serviceTypeConfig[type]
                    return (
                      <button
                        key={type}
                        onClick={() => setNewServiceType(type)}
                        className={cn(
                          'p-3 rounded-lg border text-left transition-colors',
                          newServiceType === type
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                        )}
                      >
                        <span className="text-lg mr-1">{config?.emoji}</span>
                        <span className="text-sm font-medium">{type}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">预约日期</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-3 text-sm border border-border rounded-lg bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">预约时间</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full p-3 text-sm border border-border rounded-lg bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">备注（可选）</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="请描述您的需求或特殊要求..."
                  className="w-full h-24 p-3 text-sm border border-border rounded-lg bg-muted/30 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button
                className="w-full h-10"
                disabled={!newServiceType || !newDate || !newTime || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? '提交中...' : '提交预约'}
              </Button>
            </div>
          )
        ) : (
          <div className="space-y-6">
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3">即将到来</h2>
                <div className="space-y-3">
                  {upcoming.map((apt) => {
                    const config = statusConfig[apt.status]
                    const svcConfig = serviceTypeConfig[apt.serviceType]
                    return (
                      <Card key={apt.id} className="border-0 shadow-sm overflow-hidden">
                        <div className={cn('h-1', apt.status === 'confirmed' ? 'bg-green-500' : 'bg-orange-400')} />
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{svcConfig?.emoji}</span>
                              <div>
                                <p className="font-semibold text-sm">{apt.serviceType}</p>
                                <p className="text-xs text-muted-foreground">{apt.id}</p>
                              </div>
                            </div>
                            <Badge className={cn('text-[10px] px-2 py-0.5', config.color)}>
                              {config.label}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-3.5 h-3.5" />
                              <span>{apt.caregiverName}</span>
                              {apt.consultantName && (
                                <span className="text-xs">（顾问: {apt.consultantName}）</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{apt.date}</span>
                              <Clock className="w-3.5 h-3.5 ml-2" />
                              <span>{apt.time} ({apt.duration})</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="text-xs">{apt.location}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1">
                              <Phone className="w-3 h-3" />
                              联系顾问
                            </Button>
                            {apt.status === 'upcoming' && (
                              <Button size="sm" className="flex-1 h-8 text-xs">
                                确认预约
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Past */}
            {past.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-3">历史记录</h2>
                <div className="space-y-3">
                  {past.map((apt) => {
                    const config = statusConfig[apt.status]
                    const svcConfig = serviceTypeConfig[apt.serviceType]
                    return (
                      <Card key={apt.id} className="border-0 shadow-sm opacity-75">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{svcConfig?.emoji}</span>
                              <div>
                                <p className="font-medium text-sm">{apt.serviceType} · {apt.caregiverName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {apt.date} {apt.time}
                                </p>
                              </div>
                            </div>
                            <Badge className={cn('text-[10px] px-2 py-0.5', config.color)}>
                              {config.label}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">暂无预约记录</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
