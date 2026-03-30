"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { CheckCircle2, AlertCircle, Barcode, CreditCard } from "lucide-react"

export function TechnicianCardDeductionPage({ onBack }: { onBack: () => void }) {
  const [cardId, setCardId] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedCard, setSelectedCard] = useState<any>(null)

  const cards = [
    {
      id: "CARD20240115001",
      customerName: "王女士",
      packageName: "月嫂服务套餐（60次）",
      totalSessions: 60,
      usedSessions: 25,
      remainingSessions: 35,
      totalAmount: 18000,
      unitPrice: 300,
    },
    {
      id: "CARD20240120002",
      customerName: "李女士",
      packageName: "产后修复套餐（30次）",
      totalSessions: 30,
      usedSessions: 15,
      remainingSessions: 15,
      totalAmount: 9000,
      unitPrice: 300,
    },
  ]

  const handleQueryCard = () => {
    const found = cards.find(c => c.id.includes(cardId) || c.customerName.includes(cardId))
    if (found) {
      setSelectedCard(found)
    } else {
      alert("未找到该卡号或客户")
    }
  }

  const handleConfirmDeduction = () => {
    if (selectedCard && selectedCard.remainingSessions > 0) {
      setShowConfirm(true)
    }
  }

  const handleDeduction = () => {
    alert("销卡成功！已扣除1次服务次数")
    setShowConfirm(false)
    setCardId("")
    setSelectedCard(null)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-primary/10 to-background z-10 px-4 pt-4 pb-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            ← 返回
          </button>
          <h1 className="text-xl font-bold flex-1">销卡管理</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Query Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">查询服务卡</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">输入卡号或客户名</label>
              <div className="flex gap-2">
                <Input
                  placeholder="输入卡号或客户名..."
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  className="h-10"
                />
                <Button onClick={handleQueryCard} className="px-4 h-10">
                  查询
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Card Info */}
        {selectedCard && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">服务卡详情</CardTitle>
                <Badge variant="default">{selectedCard.remainingSessions > 0 ? "可用" : "已用尽"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">客户姓名：</span>
                  <span className="font-medium">{selectedCard.customerName}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">卡号：</span>
                  <span className="font-mono text-xs">{selectedCard.id}</span>
                </p>
              </div>

              {/* Package Info */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium">{selectedCard.packageName}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <p>总次数：<span className="text-foreground font-semibold">{selectedCard.totalSessions}次</span></p>
                  <p>已用：<span className="text-foreground font-semibold">{selectedCard.usedSessions}次</span></p>
                  <p>剩余：<span className="text-primary font-semibold">{selectedCard.remainingSessions}次</span></p>
                  <p>单价：¥{selectedCard.unitPrice}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>使用进度</span>
                  <span>{Math.round((selectedCard.usedSessions / selectedCard.totalSessions) * 100)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70"
                    style={{ width: `${(selectedCard.usedSessions / selectedCard.totalSessions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Deduction Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-800">
                    <p className="font-medium mb-1">本次服务将扣除：</p>
                    <p>服务次数：1次</p>
                    <p>金额：¥{selectedCard.unitPrice}</p>
                  </div>
                </div>
              </div>

              {selectedCard.remainingSessions > 0 ? (
                <Button
                  onClick={handleConfirmDeduction}
                  className="w-full h-10 bg-primary hover:bg-primary/90"
                >
                  确认销卡
                </Button>
              ) : (
                <Button disabled className="w-full h-10">
                  卡次已用尽
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Cards */}
        {!selectedCard && (
          <div>
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground">我的服务卡</h2>
            <div className="space-y-2">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className="w-full text-left"
                >
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm">{card.customerName}</p>
                          <p className="text-xs text-muted-foreground">{card.packageName}</p>
                        </div>
                        <Badge variant="secondary">
                          {card.remainingSessions}/{card.totalSessions}
                        </Badge>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(card.remainingSessions / card.totalSessions) * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认销卡</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">客户：</span>
                <span className="font-medium">{selectedCard?.customerName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">本次扣除：</span>
                <span className="font-semibold text-primary">1次 (¥{selectedCard?.unitPrice})</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">扣除后剩余：</span>
                <span className="font-semibold">{selectedCard && selectedCard.remainingSessions - 1}次</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              请确保已完成本次服务，销卡后无法取消。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              取消
            </Button>
            <Button onClick={handleDeduction} className="bg-primary hover:bg-primary/90">
              确认销卡
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
