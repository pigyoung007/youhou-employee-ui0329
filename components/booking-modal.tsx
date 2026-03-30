"use client"

import { useState } from "react"
import { X, Calendar, User, CheckCircle2, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BookingModalProps {
  onClose: () => void
  caregiverName: string
  onSuccess?: () => void
}

const scheduleOptions = [
  { id: "26", label: "26天", desc: "标准月子期", popular: true },
  { id: "40", label: "40天", desc: "延长护理期", popular: false },
  { id: "52", label: "52天", desc: "双月护理期", popular: false },
  { id: "custom", label: "自定义", desc: "与顾问沟通", popular: false },
]

const consultants = [
  { id: "1", name: "李顾问", avatar: "/chinese-woman-portrait.jpg", rating: 4.9, clients: 156 },
  { id: "2", name: "王顾问", avatar: "/young-chinese-woman.jpg", rating: 4.8, clients: 128 },
  { id: "3", name: "张顾问", avatar: "/professional-chinese-woman-avatar-portrait.jpg", rating: 5.0, clients: 203 },
]

const availableDates = [
  { date: "2月15日", weekday: "周六", available: true },
  { date: "2月16日", weekday: "周日", available: true },
  { date: "2月17日", weekday: "周一", available: false },
  { date: "2月18日", weekday: "周二", available: true },
  { date: "2月19日", weekday: "周三", available: true },
  { date: "2月20日", weekday: "周四", available: true },
]

export function BookingModal({ onClose, caregiverName, onSuccess }: BookingModalProps) {
  const [step, setStep] = useState<"schedule" | "date" | "consultant" | "confirm" | "success">("schedule")
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    if (step === "schedule" && selectedSchedule) {
      setStep("date")
    } else if (step === "date" && selectedDate) {
      setStep("consultant")
    } else if (step === "consultant") {
      setStep("confirm")
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStep("success")
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 2000)
    }, 1500)
  }

  const getStepTitle = () => {
    switch (step) {
      case "schedule":
        return "选择服务档期"
      case "date":
        return "选择开始日期"
      case "consultant":
        return "选择母婴顾问"
      case "confirm":
        return "确认预约信息"
      case "success":
        return "预约成功"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/60" onClick={onClose} />
      <div className="relative flex h-dvh max-h-dvh w-full max-w-md flex-col overflow-hidden border-l bg-card shadow-xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h3 className="text-lg font-bold text-foreground">{getStepTitle()}</h3>
            <p className="text-xs text-muted-foreground">预约 {caregiverName}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {step === "schedule" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">请选择您需要的服务周期</p>
              {scheduleOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    "border-2 cursor-pointer transition-all",
                    selectedSchedule === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                  onClick={() => setSelectedSchedule(option.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          selectedSchedule === option.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{option.label}</span>
                          {option.popular && (
                            <Badge className="bg-primary/15 text-primary border-0 text-xs">热门</Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{option.desc}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedSchedule === option.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                      )}
                    >
                      {selectedSchedule === option.id && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === "date" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">选择阿姨可开始服务的日期</p>
              <div className="grid grid-cols-3 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date.date}
                    disabled={!date.available}
                    onClick={() => setSelectedDate(date.date)}
                    className={cn(
                      "p-3 rounded-xl text-center transition-all",
                      !date.available && "opacity-50 cursor-not-allowed",
                      selectedDate === date.date
                        ? "bg-primary text-primary-foreground"
                        : date.available
                        ? "bg-muted hover:bg-muted/80"
                        : "bg-muted/50"
                    )}
                  >
                    <p className={cn("font-semibold text-sm", selectedDate === date.date ? "text-primary-foreground" : "text-foreground")}>
                      {date.date}
                    </p>
                    <p className={cn("text-xs mt-0.5", selectedDate === date.date ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {date.available ? date.weekday : "已约"}
                    </p>
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                查看更多日期
              </Button>
            </div>
          )}

          {step === "consultant" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">选择一位顾问为您服务（可跳过）</p>
              {consultants.map((consultant) => (
                <Card
                  key={consultant.id}
                  className={cn(
                    "border-2 cursor-pointer transition-all",
                    selectedConsultant === consultant.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                  onClick={() => setSelectedConsultant(consultant.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <img
                      src={consultant.avatar || "/placeholder.svg"}
                      alt={consultant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{consultant.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {consultant.rating}分
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">已服务{consultant.clients}位客户</span>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedConsultant === consultant.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                      )}
                    >
                      {selectedConsultant === consultant.id && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <p className="text-xs text-muted-foreground text-center mt-4">
                未选择顾问时，将由系统自动分配
              </p>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-4">
              <Card className="border-0 bg-muted/30">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">预约阿姨</span>
                    <span className="font-semibold text-foreground">{caregiverName}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">服务档期</span>
                    <span className="font-semibold text-foreground">
                      {scheduleOptions.find((s) => s.id === selectedSchedule)?.label}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">开始日期</span>
                    <span className="font-semibold text-foreground">{selectedDate}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">服务顾问</span>
                    <span className="font-semibold text-foreground">
                      {selectedConsultant
                        ? consultants.find((c) => c.id === selectedConsultant)?.name
                        : "系统分配"}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <p className="text-xs text-muted-foreground text-center">
                提交后，顾问将在24小时内与您联系确认详情
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-5 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">预约提交成功</h4>
              <p className="text-muted-foreground">顾问将尽快与您联系</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== "success" && (
          <div className="p-5 border-t border-border bg-card safe-area-bottom">
            {step === "confirm" ? (
              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    提交中...
                  </>
                ) : (
                  "确认提交预约"
                )}
              </Button>
            ) : (
              <div className="flex gap-3">
                {step !== "schedule" && (
                  <Button
                    variant="outline"
                    className="flex-1 h-12 bg-transparent"
                    onClick={() => {
                      if (step === "date") setStep("schedule")
                      else if (step === "consultant") setStep("date")
                    }}
                  >
                    上一步
                  </Button>
                )}
                <Button
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleNext}
                  disabled={
                    (step === "schedule" && !selectedSchedule) ||
                    (step === "date" && !selectedDate)
                  }
                >
                  {step === "consultant" ? "跳过/下一步" : "下一步"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
