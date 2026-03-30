'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { FileText, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SigningContract {
  id: string
  contractType: string
  customerName: string
  amount: number
  startDate: string
  endDate: string
}

interface SignStep {
  step: 1 | 2 | 3 | 4
  title: string
  description: string
}

const signSteps: SignStep[] = [
  { step: 1, title: '阅读条款', description: '请仔细阅读合同条款' },
  { step: 2, title: '确认信息', description: '确认个人信息无误' },
  { step: 3, title: '手写签名', description: '在指定位置签署' },
  { step: 4, title: '签署完成', description: '合同已生效' },
]

export function TalentContractSignPage({ contract }: { contract?: SigningContract }) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [signature, setSignature] = useState<string>('')

  const defaultContract: SigningContract = contract || {
    id: 'CT20260327001',
    contractType: '月嫂服务合同',
    customerName: '王女士',
    amount: 15800,
    startDate: '2026-04-01',
    endDate: '2026-04-26',
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 进度条 */}
      <div className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-base font-semibold mb-3">电子合同签署</h1>
          <div className="flex items-center gap-2">
            {signSteps.map((item, index) => (
              <div key={item.step} className="flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-1 transition-all',
                      currentStep >= item.step
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {currentStep > item.step ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground">{item.title}</p>
                </div>
                {index < signSteps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 -mt-2 mx-1',
                      currentStep > item.step ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Step 1: 阅读条款 */}
        {currentStep === 1 && (
          <>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold mb-3">合同信息</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">类型</span>
                    <span className="font-medium">{defaultContract.contractType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">雇主</span>
                    <span className="font-medium">{defaultContract.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">金额</span>
                    <span className="font-bold text-primary">¥{defaultContract.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">周期</span>
                    <span className="font-medium">{defaultContract.startDate} 至 {defaultContract.endDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-sm font-semibold mb-2">合同条款</h2>
              <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto border border-border">
                <p className="text-xs leading-relaxed text-muted-foreground space-y-2">
                  <div>
                    <strong>第一条 服务内容</strong>
                    <p>乙方为甲方提供专业的新生儿护理、产妇护理等服务，具体内容如下：</p>
                    <p>1. 新生儿日常护理（清洁、更换尿布、喂养等）</p>
                    <p>2. 产妇康复护理（营养餐准备、卫生护理等）</p>
                    <p>3. 家务辅助（婴儿房卫生、婴儿衣物清洗等）</p>
                  </div>
                  <div className="mt-2">
                    <strong>第二条 服务期限</strong>
                    <p>服务期限为{defaultContract.startDate}至{defaultContract.endDate}，共计26天。</p>
                  </div>
                  <div className="mt-2">
                    <strong>第三条 服务费用</strong>
                    <p>本合同项下服务总费用为{defaultContract.amount}元，按周期支付。</p>
                  </div>
                  <div className="mt-2">
                    <strong>第四条 权利义务</strong>
                    <p>甲乙双方应恪守职业道德，诚实守信，遵守相关法律法规。</p>
                  </div>
                  <div className="mt-2">
                    <strong>第五条 合同生效</strong>
                    <p>本合同自双方签署之日起生效，至服务期限终止时自动终止。</p>
                  </div>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="agree"
                checked={agreedTerms}
                onCheckedChange={(checked) => setAgreedTerms(checked as boolean)}
              />
              <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                我已阅读并同意以上条款
              </label>
            </div>
          </>
        )}

        {/* Step 2: 确认信息 */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <h2 className="text-sm font-semibold mb-3">请确认以下信息</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="text-muted-foreground">姓名</label>
                    <p className="font-medium mt-1">李春华</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">身份证号</label>
                    <p className="font-medium mt-1">6401****7890</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">手机号码</label>
                    <p className="font-medium mt-1">138****1234</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">资格证号</label>
                    <p className="font-medium mt-1">HJ20250315****</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: 手写签名 */}
        {currentStep === 3 && (
          <>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold mb-3">请在下方签署</h2>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-xs text-muted-foreground">请使用手指在此区域签署</p>
                    <p className="text-xs text-muted-foreground mt-1">(模拟签署，实际应使用电子签名组件)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="outline"
              className="w-full h-10"
              onClick={() => {
                setSignature('已签署')
                handleNext()
              }}
            >
              模拟签署并继续
            </Button>
          </>
        )}

        {/* Step 4: 签署完成 */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-lg font-bold mb-2">签署成功</h2>
              <p className="text-sm text-muted-foreground mb-4">
                您已成功签署{defaultContract.contractType}，合同现已生效。
              </p>
              <div className="bg-muted rounded-lg p-3 text-left space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">签署时间</span>
                  <span className="font-medium">{new Date().toLocaleString('zh-CN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">合同编号</span>
                  <span className="font-mono text-xs">{defaultContract.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 max-w-md mx-auto">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 h-10"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            上一步
          </Button>
          <Button
            className="flex-1 h-10 bg-primary hover:bg-primary/90"
            onClick={handleNext}
            disabled={currentStep === 1 && !agreedTerms || currentStep === 4}
          >
            {currentStep === 4 ? '完成' : '下一步'}
          </Button>
        </div>
      </div>
    </div>
  )
}
