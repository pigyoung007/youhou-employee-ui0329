'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Wallet, Plus, Minus, Clock, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DepositRecord {
  id: string
  type: 'deposit' | 'refund' | 'deduction'
  amount: number
  reason: string
  date: string
  status: 'completed' | 'processing' | 'failed'
}

export function TalentDepositPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'withdraw'>('overview')
  const [withdrawAmount, setWithdrawAmount] = useState<string>('')

  const balance = 5000
  const frozenAmount = 1000
  const totalDeposited = 5000

  const records: DepositRecord[] = [
    {
      id: 'DEP20260327001',
      type: 'deposit',
      amount: 5000,
      reason: '月嫂服务保证金',
      date: '2026-03-27',
      status: 'completed',
    },
    {
      id: 'DEF20260320001',
      type: 'deduction',
      amount: 500,
      reason: '客户投诉罚款',
      date: '2026-03-20',
      status: 'completed',
    },
    {
      id: 'REF20260310001',
      type: 'refund',
      amount: 1000,
      reason: '部分退款申请',
      date: '2026-03-10',
      status: 'processing',
    },
  ]

  const getTypeConfig = (type: DepositRecord['type']) => {
    switch (type) {
      case 'deposit':
        return { label: '缴纳', icon: Plus, color: 'text-green-600' }
      case 'refund':
        return { label: '退款', icon: Minus, color: 'text-blue-600' }
      case 'deduction':
        return { label: '扣款', icon: AlertCircle, color: 'text-red-600' }
    }
  }

  const getStatusConfig = (status: DepositRecord['status']) => {
    switch (status) {
      case 'completed':
        return { label: '已完成', color: 'bg-green-50 text-green-600' }
      case 'processing':
        return { label: '处理中', color: 'bg-yellow-50 text-yellow-600' }
      case 'failed':
        return { label: '失败', color: 'bg-red-50 text-red-600' }
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-6 space-y-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="text-white hover:opacity-80">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-bold">保证金管理</h1>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xs opacity-80">可用余额</p>
            <p className="text-xl font-bold mt-1">¥{balance}</p>
          </div>
          <div className="text-center border-l border-r border-white/30">
            <p className="text-xs opacity-80">冻结金额</p>
            <p className="text-xl font-bold mt-1">¥{frozenAmount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-80">累计缴纳</p>
            <p className="text-xl font-bold mt-1">¥{totalDeposited}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-white sticky top-0 z-10">
        {(['overview', 'records', 'withdraw'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            )}
          >
            {tab === 'overview' && '概览'}
            {tab === 'records' && '交易记录'}
            {tab === 'withdraw' && '申请退款'}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold mb-3">保证金规则</h2>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>保证金用于担保您的服务质量和履约能力</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>客户投诉确认后，可能扣除相应保证金</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>合同期间的保证金将被冻结，不可提现</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>所有合同结束后30天可申请提现</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold mb-3">最近交易</h2>
                <div className="space-y-2">
                  {records.slice(0, 3).map(record => {
                    const typeConfig = getTypeConfig(record.type)
                    const Icon = typeConfig.icon
                    return (
                      <div key={record.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <Icon className={cn('w-4 h-4', typeConfig.color)} />
                          </div>
                          <div>
                            <p className="text-xs font-medium">{typeConfig.label}</p>
                            <p className="text-[10px] text-muted-foreground">{record.reason}</p>
                          </div>
                        </div>
                        <p className={cn('text-sm font-semibold', typeConfig.color)}>
                          {record.type === 'deduction' || record.type === 'refund' ? '-' : '+'}¥{record.amount}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-10 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              继续缴纳保证金
            </Button>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-2">
            {records.length === 0 ? (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">暂无交易记录</p>
              </div>
            ) : (
              records.map(record => {
                const typeConfig = getTypeConfig(record.type)
                const statusConfig = getStatusConfig(record.status)
                const Icon = typeConfig.icon
                return (
                  <Card key={record.id} className="border-0 shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mt-0.5">
                            <Icon className={cn('w-5 h-5', typeConfig.color)} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{typeConfig.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{record.reason}</p>
                            <p className="text-xs text-muted-foreground mt-1">{record.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn('text-sm font-bold', typeConfig.color)}>
                            {record.type === 'deduction' || record.type === 'refund' ? '-' : '+'}¥{record.amount}
                          </p>
                          <Badge className={cn('text-[9px] mt-1', statusConfig.color)}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <div className="space-y-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                <div className="text-xs text-yellow-700">
                  <p className="font-semibold mb-0.5">提现限制</p>
                  <p>只有完全空闲的保证金才能申请提现，冻结部分无法提现</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">可提现金额</label>
                    <span className="text-sm font-bold text-primary">¥{balance - frozenAmount}</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="输入提现金额"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    提现将在3-5个工作日内到账，具体以银行处理速度为准
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">提现账户</h3>
                  <Card className="border-dashed">
                    <CardContent className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">收款人</span>
                          <span className="font-medium">李春华</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">账户</span>
                          <span className="font-mono text-xs">622848****2345</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">开户行</span>
                          <span className="font-medium">中国银行</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full h-10 bg-primary hover:bg-primary/90">
                  申请提现
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
