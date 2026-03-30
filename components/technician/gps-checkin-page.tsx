"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MapPin, Clock, AlertCircle, CheckCircle2, Navigation, Loader2 } from "lucide-react"

export function TechnicianGPSCheckInPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"checkin" | "checkout">("checkin")
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [checkInData, setCheckInData] = useState<any>(null)

  const serviceLocation = {
    lat: 39.9042,
    lng: 116.4074,
    address: "朝阳区建国路88号",
    tolerance: 200, // 200米范围内允许签到
  }

  const currentService = {
    customerName: "王女士",
    serviceName: "产后腹直肌修复",
    scheduledTime: "09:00",
    duration: 90,
    checkedIn: true,
    checkedInTime: "08:55",
    checkOutTime: null,
  }

  // 模拟GPS定位
  const handleGetLocation = () => {
    setIsLoading(true)
    setTimeout(() => {
      // 模拟在服务地点附近
      const lat = serviceLocation.lat + (Math.random() - 0.5) * 0.002
      const lng = serviceLocation.lng + (Math.random() - 0.5) * 0.002
      const acc = 10 + Math.random() * 20 // 10-30米精度

      setLocation({ lat, lng })
      setAccuracy(acc)
      setIsLoading(false)
    }, 2000)
  }

  const calculateDistance = () => {
    if (!location) return null

    const R = 6371000 // 地球半径（米）
    const lat1 = (serviceLocation.lat * Math.PI) / 180
    const lat2 = (location.lat * Math.PI) / 180
    const deltaLat = ((location.lat - serviceLocation.lat) * Math.PI) / 180
    const deltaLng = ((location.lng - serviceLocation.lng) * Math.PI) / 180

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c)
  }

  const distance = calculateDistance()
  const isInRange = distance && accuracy ? distance + accuracy <= serviceLocation.tolerance : false

  const handleCheckIn = () => {
    if (isInRange) {
      setCheckInData({ type: "checkin", time: new Date().toLocaleTimeString() })
      setShowConfirm(true)
    } else {
      alert("您不在服务地点范围内，无法签到")
    }
  }

  const handleCheckOut = () => {
    if (isInRange) {
      setCheckInData({ type: "checkout", time: new Date().toLocaleTimeString() })
      setShowConfirm(true)
    } else {
      alert("您不在服务地点范围内，无法签退")
    }
  }

  const confirmCheckIn = () => {
    alert(checkInData.type === "checkin" ? "签到成功！" : "签退成功！")
    setShowConfirm(false)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-primary/10 to-background z-10 px-4 pt-4 pb-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
            ← 返回
          </button>
          <h1 className="text-xl font-bold flex-1">GPS签到签退</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Service Info */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">服务客户：</span>
                <span className="font-semibold">{currentService.customerName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">服务项目：</span>
                <span className="font-medium">{currentService.serviceName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">计划时间：</span>
                <span>{currentService.scheduledTime} ({currentService.duration}分钟)</span>
              </p>
              {currentService.checkedIn && (
                <p className="text-sm">
                  <span className="text-muted-foreground">已签到：</span>
                  <span className="text-green-600 font-semibold">{currentService.checkedInTime}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Status */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              位置信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Service Location */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">服务地点</p>
              <p className="text-sm font-semibold">{serviceLocation.address}</p>
              <p className="text-xs text-muted-foreground mt-1">允许范围：±{serviceLocation.tolerance}米</p>
            </div>

            {/* Current Location */}
            {location ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                <p className="text-xs text-blue-900 font-medium">当前位置</p>
                <p className="text-xs text-blue-900">
                  坐标: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
                <p className="text-xs text-blue-900">
                  精度: ±{accuracy?.toFixed(1)}米
                </p>
                {distance && (
                  <p className={`text-xs font-semibold ${isInRange ? "text-green-600" : "text-red-600"}`}>
                    距离服务地点: {distance}米
                  </p>
                )}
                {isInRange ? (
                  <div className="flex items-center gap-1 text-green-600 text-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    在允许范围内
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    超出允许范围
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                <p className="text-xs text-amber-900">
                  请先获取位置信息
                </p>
              </div>
            )}

            {/* Get Location Button */}
            <Button
              onClick={handleGetLocation}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  定位中...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-2" />
                  获取GPS位置
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Check In/Out Buttons */}
        {currentService.checkedIn && !currentService.checkOutTime && (
          <Button
            onClick={handleCheckOut}
            disabled={!location || !isInRange}
            className="w-full h-11 bg-red-600 hover:bg-red-700 text-white text-base font-semibold"
          >
            <Clock className="w-4 h-4 mr-2" />
            签退
          </Button>
        )}

        {!currentService.checkedIn && (
          <Button
            onClick={handleCheckIn}
            disabled={!location || !isInRange}
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white text-base font-semibold"
          >
            <Clock className="w-4 h-4 mr-2" />
            签到
          </Button>
        )}

        {/* Info Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-xs text-blue-800 space-y-1">
              <p className="font-medium">签到/签退提示：</p>
              <ul className="space-y-0.5">
                <li>• 请确保GPS定位精度在30米以内</li>
                <li>• 您必须在服务地点范围内才能完成签到/签退</li>
                <li>• 签到后3分钟内无法取消，请谨慎操作</li>
                <li>• 离线超过5分钟会自动签退</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Historical Records */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">本日签到记录</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { service: "产后腹直肌修复", checkIn: "08:55", checkOut: "10:25" },
              { service: "盆底肌康复训练", checkIn: "14:00", checkOut: null },
            ].map((record, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                <span className="font-medium flex-1">{record.service}</span>
                <div className="text-xs text-muted-foreground">
                  {record.checkIn} {record.checkOut && `- ${record.checkOut}`}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              确认{checkInData?.type === "checkin" ? "签到" : "签退"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">客户：</span>
                <span className="font-semibold">{currentService.customerName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">时间：</span>
                <span className="font-semibold">{checkInData?.time}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">位置精度：</span>
                <span>±{accuracy?.toFixed(1)}米</span>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              取消
            </Button>
            <Button onClick={confirmCheckIn} className="bg-primary hover:bg-primary/90">
              确认{checkInData?.type === "checkin" ? "签到" : "签退"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
