'use client'

import { useState } from 'react'
import { ChevronLeft, Check, Loader } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaymentPageProps {
  orderId: string
  amount: number
  onBack: () => void
  onPaymentSuccess?: () => void
}

export function PaymentPage({ orderId, amount, onBack, onPaymentSuccess }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<'wechat' | 'alipay'>('wechat')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'ready' | 'processing' | 'success' | 'failed'>('ready')

  const paymentMethods = [
    { id: 'wechat', name: '微信支付', icon: '🔗', available: true },
    { id: 'alipay', name: '支付宝', icon: '💳', available: true },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStatus('processing')

    // 模拟支付过程
    await new Promise(resolve => setTimeout(resolve, 2000))

    setPaymentStatus('success')
    setIsProcessing(false)

    setTimeout(() => {
      onPaymentSuccess?.()
      onBack()
    }, 1500)
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-xl font-bold mb-2">支付成功</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          订单已支付，我们已向服务人员发送通知
        </p>
        <p className="text-2xl font-bold text-primary mb-8">¥{amount}</p>
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
          <h1 className="font-bold text-base flex-1">确认支付</h1>
        </div>
      </div>

      {/* 内容 */}
      <div className="px-3 py-4 space-y-4">
        {/* 金额展示 */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">应付金额</p>
            <p className="text-4xl font-bold text-primary">¥{amount}</p>
            <p className="text-xs text-muted-foreground mt-2">订单号: {orderId}</p>
          </CardContent>
        </Card>

        {/* 支付方式选择 */}
        <div>
          <h3 className="text-sm font-semibold mb-3">选择支付方式</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as 'wechat' | 'alipay')}
                disabled={!method.available}
                className={cn(
                  'w-full p-4 border-2 rounded-lg transition-all flex items-center gap-3',
                  selectedMethod === method.id && method.available
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-border/80',
                  !method.available && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="text-2xl">{method.icon}</div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{method.name}</p>
                  {!method.available && (
                    <p className="text-xs text-muted-foreground">暂不可用</p>
                  )}
                </div>
                {selectedMethod === method.id && method.available && (
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 温馨提示 */}
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-3">
            <p className="text-xs text-blue-700">
              💡 为了保障您的权益，支付后如需退款请在7天内联系客服处理
            </p>
          </CardContent>
        </Card>

        {/* 支付按钮 */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-base font-semibold"
        >
          {isProcessing ? (
            <>
              <Loader className="w-4 h-4 animate-spin mr-2" />
              支付中...
            </>
          ) : (
            `使用${paymentMethods.find(m => m.id === selectedMethod)?.name}支付`
          )}
        </Button>

        {/* 返回按钮 */}
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full h-10"
        >
          返回
        </Button>
      </div>
    </div>
  )
}
