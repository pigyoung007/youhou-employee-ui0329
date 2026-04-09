'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Eye, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Contract {
  id: string
  contractType: string
  customerName: string
  amount: number
  startDate: string
  endDate: string
  status: 'pending_sign' | 'signed' | 'expired' | 'terminated'
  signDate?: string
  documentUrl?: string
}

const statusConfig: Record<Contract['status'], { label: string; color: string }> = {
  pending_sign: { label: '待签署', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  signed: { label: '已签署', color: 'bg-green-50 text-green-600 border-green-200' },
  expired: { label: '已过期', color: 'bg-gray-50 text-gray-600 border-gray-200' },
  terminated: { label: '已终止', color: 'bg-red-50 text-red-600 border-red-200' },
}

export function TalentContractsPage({ onBack }: { onBack?: () => void }) {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [filterStatus, setFilterStatus] = useState<Contract['status'] | 'all'>('all')

  const contracts: Contract[] = [
    {
      id: 'CT20260327001',
      contractType: '月嫂服务合同',
      customerName: '王女士',
      amount: 15800,
      startDate: '2026-04-01',
      endDate: '2026-04-26',
      status: 'pending_sign',
    },
    {
      id: 'CT20260320002',
      contractType: '育婴师合同',
      customerName: '李先生',
      amount: 8500,
      startDate: '2026-03-15',
      endDate: '2026-06-15',
      status: 'signed',
      signDate: '2026-03-18',
      documentUrl: '#',
    },
    {
      id: 'CT20260310003',
      contractType: '月嫂服务合同',
      customerName: '张女士',
      amount: 12800,
      startDate: '2026-02-01',
      endDate: '2026-02-28',
      status: 'expired',
      signDate: '2026-02-01',
    },
  ]

  const filteredContracts = filterStatus === 'all'
    ? contracts
    : contracts.filter(c => c.status === filterStatus)

  if (selectedContract) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSelectedContract(null)}
            className="flex items-center gap-1 text-primary hover:opacity-80"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回</span>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <p className="text-xs text-blue-600 mb-1">合同类型</p>
            <h2 className="text-lg font-bold text-foreground">{selectedContract.contractType}</h2>
            <p className="text-sm text-muted-foreground mt-1">{selectedContract.customerName}</p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">合同金额</span>
                <span className="text-lg font-bold text-primary">¥{selectedContract.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">服务周期</span>
                <span className="text-sm font-medium">{selectedContract.startDate} 至 {selectedContract.endDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">合同号</span>
                <span className="text-sm font-mono">{selectedContract.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">合同状态</span>
                <Badge className={cn('text-[10px]', statusConfig[selectedContract.status].color)}>
                  {statusConfig[selectedContract.status].label}
                </Badge>
              </div>
              {selectedContract.signDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">签署时间</span>
                  <span className="text-sm font-medium">{selectedContract.signDate}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">合同条款</h3>
            <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                1. 本合同由甲方与乙方双方自愿订立。
                <br />
                2. 服务范围包括新生儿护理、产妇护理等。
                <br />
                3. 服务费用为{selectedContract.amount}元，按周期支付。
                <br />
                4. 本合同自签署之日起生效，至{selectedContract.endDate}止。
                <br />
                5. 双方承诺遵守合同约定的各项条款。
              </p>
            </div>
          </div>

          {selectedContract.status === 'pending_sign' && (
            <Button className="w-full h-10 bg-primary hover:bg-primary/90">
              <FileText className="w-4 h-4 mr-2" />
              立即签署
            </Button>
          )}

          {selectedContract.documentUrl && (
            <Button variant="outline" className="w-full h-10">
              <Download className="w-4 h-4 mr-2" />
              下载合同PDF
            </Button>
          )}

          <Button variant="outline" className="w-full h-10">
            <Eye className="w-4 h-4 mr-2" />
            查看原始合同
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="text-foreground hover:opacity-80">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-base font-semibold">我的合同</h1>
      </div>

      <div className="p-3">
        {/* 筛选标签 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            全部
          </button>
          {(['pending_sign', 'signed', 'expired', 'terminated'] as const).map(status => (
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
              {statusConfig[status].label}
            </button>
          ))}
        </div>

        {/* 合同列表 */}
        <div className="space-y-2">
          {filteredContracts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">暂无合同</p>
            </div>
          ) : (
            filteredContracts.map(contract => (
              <Card
                key={contract.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedContract(contract)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground truncate">{contract.contractType}</h3>
                          <p className="text-xs text-muted-foreground">{contract.customerName}</p>
                        </div>
                        <Badge className={cn('text-[9px] shrink-0', statusConfig[contract.status].color)}>
                          {statusConfig[contract.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-2">
                        <span className="text-muted-foreground">¥{contract.amount}</span>
                        <span className="text-muted-foreground">{contract.startDate} 至 {contract.endDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
