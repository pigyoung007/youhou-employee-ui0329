'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Calendar, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IncomeRecord {
  date: string
  contractType: string
  customerName: string
  days: number
  dailyRate: number
  totalAmount: number
  status: 'completed' | 'pending' | 'cancelled'
}

const statusConfig: Record<IncomeRecord['status'], { label: string; color: string }> = {
  completed: { label: '已完成', color: 'bg-green-50 text-green-600' },
  pending: { label: '进行中', color: 'bg-blue-50 text-blue-600' },
  cancelled: { label: '已取消', color: 'bg-gray-50 text-gray-600' },
}

export function TalentIncomeDetailsPage({ onBack }: { onBack?: () => void }) {
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-03')
  const [filterStatus, setFilterStatus] = useState<IncomeRecord['status'] | 'all'>('all')

  const records: IncomeRecord[] = [
    {
      date: '2026-03-27',
      contractType: '月嫂服务',
      customerName: '王女士',
      days: 26,
      dailyRate: 608,
      totalAmount: 15808,
      status: 'completed',
    },
    {
      date: '2026-03-10',
      contractType: '育婴师',
      customerName: '李先生',
      days: 10,
      dailyRate: 850,
      totalAmount: 8500,
      status: 'pending',
    },
    {
      date: '2026-03-05',
      contractType: '月嫂服务',
      customerName: '张女士',
      days: 28,
      dailyRate: 450,
      totalAmount: 12600,
      status: 'cancelled',
    },
  ]

  const filteredRecords = filterStatus === 'all'
    ? records
    : records.filter(r => r.status === filterStatus)

  const monthlyTotal = records
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.totalAmount, 0)

  const monthlyPending = records
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.totalAmount, 0)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-6 space-y-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="text-white hover:opacity-80">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-bold">收入明细</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">本月已收</p>
            <p className="text-2xl font-bold mt-1">¥{monthlyTotal}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">待结算</p>
            <p className="text-2xl font-bold mt-1">¥{monthlyPending}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Month Selector */}
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="flex-1 text-sm bg-transparent border-0 outline-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'completed', 'pending', 'cancelled'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                filterStatus === status
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {status === 'all' ? '全部' : statusConfig[status]?.label || ''}
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-[10px] text-muted-foreground mb-1">平均日薪</p>
              <p className="text-base font-bold">¥608</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-[10px] text-muted-foreground mb-1">总服务天数</p>
              <p className="text-base font-bold">64天</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-[10px] text-muted-foreground mb-1">完成率</p>
              <p className="text-base font-bold text-green-600">92%</p>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        <div className="space-y-2">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">暂无相关记录</p>
            </div>
          ) : (
            filteredRecords.map((record, index) => {
              const config = statusConfig[record.status]
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">{record.contractType}</h3>
                            <p className="text-xs text-muted-foreground">{record.customerName}</p>
                          </div>
                          <Badge className={cn('text-[9px] shrink-0', config.color)}>
                            {config.label}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-2">
                          <div>
                            <p className="opacity-75">服务天数</p>
                            <p className="font-medium text-foreground">{record.days}天</p>
                          </div>
                          <div>
                            <p className="opacity-75">日薪</p>
                            <p className="font-medium text-foreground">¥{record.dailyRate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-primary">¥{record.totalAmount}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{record.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0">
          <CardContent className="p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-foreground">本月统计</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>已完成</span>
                <span className="font-medium text-foreground">¥{monthlyTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>待结算</span>
                <span className="font-medium text-foreground">¥{monthlyPending}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span>预计到账</span>
                <span className="font-bold text-primary">¥{monthlyTotal + monthlyPending}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
