'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  ChevronLeft, MapPin, Clock, Phone, CheckCircle, AlertCircle,
  Camera, Send, X, Navigation, User
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface VisitTask {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  visitDate: string
  visitTime: string
  address: string
  latitude?: number
  longitude?: number
  status: 'pending' | 'in_progress' | 'completed' | 'abnormal'
  checkInTime?: string
  checkOutTime?: string
  nursingNote?: string
  photos?: string[]
  abnormalReason?: string
}

interface BeiYiShengVisitPageProps {
  onBack?: () => void
}

export function BeiYiShengVisitPage({ onBack }: BeiYiShengVisitPageProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'today' | 'pending' | 'completed'>('today')
  const [selectedTask, setSelectedTask] = useState<VisitTask | null>(null)
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [checkInNote, setCheckInNote] = useState('')

  const tasks: VisitTask[] = [
    {
      id: 'VIS001',
      taskId: 'TASK-2026-001',
      customerName: '王女士',
      serviceType: '产后修复护理',
      visitDate: '2026-03-27',
      visitTime: '10:00',
      address: '浦东新区世纪大道100号',
      status: 'in_progress',
      checkInTime: '2026-03-27 09:58',
    },
    {
      id: 'VIS002',
      taskId: 'TASK-2026-002',
      customerName: '李女士',
      serviceType: '骨盆修复',
      visitDate: '2026-03-27',
      visitTime: '14:00',
      address: '徐汇区淮海中路300号',
      status: 'pending',
    },
    {
      id: 'VIS003',
      taskId: 'TASK-2026-003',
      customerName: '张女士',
      serviceType: '产后恢复',
      visitDate: '2026-03-26',
      visitTime: '10:30',
      address: '浦东新区陆家嘴环路500号',
      status: 'completed',
      checkInTime: '2026-03-26 10:28',
      checkOutTime: '2026-03-26 11:15',
      nursingNote: '客户恢复良好，继续按计划进行护理',
    },
    {
      id: 'VIS004',
      taskId: 'TASK-2026-004',
      customerName: '赵女士',
      serviceType: '产康护理',
      visitDate: '2026-03-25',
      visitTime: '15:00',
      address: '黄浦区南京东路200号',
      status: 'abnormal',
      checkInTime: '2026-03-25 14:50',
      abnormalReason: '客户临时有事，改期到3月29日',
    },
  ]

  const statusConfig = {
    pending: { label: '待执行', color: 'bg-amber-100 text-amber-700' },
    in_progress: { label: '执行中', color: 'bg-blue-100 text-blue-700' },
    completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
    abnormal: { label: '异常', color: 'bg-red-100 text-red-700' },
  }

  const filteredTasks = tasks.filter(t => {
    if (filterStatus === 'today') return t.visitDate === '2026-03-27'
    if (filterStatus === 'pending') return t.status === 'pending'
    if (filterStatus === 'completed') return t.status === 'completed'
    return true
  })

  const pendingCount = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
  <div className="px-3 py-3">
  <div className="flex items-center gap-3 mb-2">
  {onBack && (
    <button onClick={onBack} className="p-1 -ml-1 hover:bg-muted rounded-full">
      <ChevronLeft className="w-5 h-5" />
    </button>
  )}
  <h1 className="font-semibold text-base">回访任务</h1>
            <Badge className="bg-primary/20 text-primary text-[10px]">贝医生</Badge>
          </div>
          <p className="text-[11px] text-muted-foreground">{pendingCount} 项待执行</p>
        </div>

        {/* Filter Tabs */}
        <div className="px-3 py-2 border-t border-border flex gap-2 overflow-x-auto">
          {[
            { id: 'today' as const, label: '今日' },
            { id: 'pending' as const, label: '待执行' },
            { id: 'completed' as const, label: '已完成' },
            { id: 'all' as const, label: '全部' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium whitespace-nowrap rounded-lg transition-all',
                filterStatus === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-3 py-3 space-y-2.5">
        {filteredTasks.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">暂无任务</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map(task => (
            <Card
              key={task.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedTask(task)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{task.customerName}</h3>
                      <Badge className={cn('text-[9px] px-1.5 py-0', statusConfig[task.status].color)}>
                        {statusConfig[task.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{task.serviceType}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{task.visitDate} {task.visitTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{task.address}</span>
                  </div>
                  {task.checkInTime && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span>已上户: {task.checkInTime.split(' ')[1]}</span>
                    </div>
                  )}
                  {task.abnormalReason && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      <span>{task.abnormalReason}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Task Detail Drawer */}
      <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent side="right" className="w-[90vw] max-w-md flex flex-col py-0 h-full">
          {selectedTask && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
                <SheetTitle className="text-base font-semibold">任务执行</SheetTitle>
                <button onClick={() => setSelectedTask(null)} className="p-1">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Task Info */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground">任务号</p>
                        <p className="text-sm font-mono">{selectedTask.taskId}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground">状态</p>
                        <Badge className={cn('text-[10px] px-2 py-1', statusConfig[selectedTask.status].color)}>
                          {statusConfig[selectedTask.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">预约时间</p>
                          <p className="text-sm font-semibold">{selectedTask.visitDate} {selectedTask.visitTime}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Info */}
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-3">客户信息</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{selectedTask.customerName}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">{selectedTask.address}</p>
                          {selectedTask.latitude && (
                            <p className="text-[10px] text-muted-foreground mt-1">
                              坐标: {selectedTask.latitude.toFixed(4)}, {selectedTask.longitude?.toFixed(4)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent ml-auto">
                          拨号
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Type */}
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">服务类型</p>
                    <p className="text-sm font-medium">{selectedTask.serviceType}</p>
                  </CardContent>
                </Card>

                {/* Check-in/out Timeline */}
                {selectedTask.checkInTime && (
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">打卡记录</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-xs font-medium">上户签到</p>
                            <p className="text-[10px] text-muted-foreground">{selectedTask.checkInTime}</p>
                          </div>
                        </div>
                        {selectedTask.checkOutTime && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-xs font-medium">下户签退</p>
                              <p className="text-[10px] text-muted-foreground">{selectedTask.checkOutTime}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Nursing Notes */}
                {selectedTask.nursingNote && (
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1.5">护理日志</p>
                      <p className="text-xs text-foreground">{selectedTask.nursingNote}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Abnormal Note */}
                {selectedTask.abnormalReason && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <p className="text-xs font-semibold text-red-700 mb-1.5">异常反馈</p>
                      <p className="text-xs text-red-600">{selectedTask.abnormalReason}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                {selectedTask.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1"
                      onClick={() => setIsCheckingIn(true)}
                    >
                      <Navigation className="w-3 h-3" />上户打卡
                    </Button>
                    <Button variant="outline" className="h-10 bg-transparent text-xs">
                      改期
                    </Button>
                  </div>
                )}

                {selectedTask.status === 'in_progress' && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-10 bg-transparent text-xs gap-1">
                      <Camera className="w-3 h-3" />上传照片
                    </Button>
                    <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1">
                      <CheckCircle className="w-3 h-3" />下户完成
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Check-in Drawer */}
      <Sheet open={isCheckingIn} onOpenChange={setIsCheckingIn}>
        <SheetContent side="right" className="w-[85vw] max-w-sm py-0">
          <div className="px-4 py-4 space-y-4">
            <SheetTitle>上户签到</SheetTitle>

            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-1">GPS定位中...</p>
                <p className="text-[10px] text-blue-700">
                  当前位置: {selectedTask?.address}
                </p>
                <p className="text-[10px] text-blue-600 mt-1">
                  坐标: 31.2304°N, 121.4737°E (精度 ±10m)
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">备注 (可选)</label>
                <textarea
                  value={checkInNote}
                  onChange={(e) => setCheckInNote(e.target.value)}
                  placeholder="记录现场情况、客户状态等"
                  className="w-full px-3 py-2 text-xs border border-input rounded-lg bg-background resize-none h-16"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-10 bg-transparent"
                  onClick={() => setIsCheckingIn(false)}
                >
                  取消
                </Button>
                <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground gap-1">
                  <Navigation className="w-4 h-4" />确认签到
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
