"use client"

import { useState } from "react"
import { X, Download, Share2, Heart, Phone, MapPin, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface SharePosterModalProps {
  onClose: () => void
  type: "caregiver" | "service" | "course"
  data: {
    name: string
    subtitle?: string
    desc?: string
    price?: string
    tags?: string[]
    avatar?: string
    rating?: number
    reviews?: number
  }
  themeColor?: string
}

const colorMap: Record<string, { gradient: string; text: string; bg: string; badge: string }> = {
  amber: { gradient: "from-amber-500 via-orange-500 to-amber-600", text: "text-amber-600", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700" },
  pink: { gradient: "from-pink-500 via-rose-500 to-pink-600", text: "text-pink-600", bg: "bg-pink-50", badge: "bg-pink-100 text-pink-700" },
  teal: { gradient: "from-teal-500 via-teal-600 to-emerald-600", text: "text-teal-600", bg: "bg-teal-50", badge: "bg-teal-100 text-teal-700" },
  violet: { gradient: "from-violet-500 via-purple-500 to-violet-600", text: "text-violet-600", bg: "bg-violet-50", badge: "bg-violet-100 text-violet-700" },
  primary: { gradient: "from-primary via-primary to-primary/80", text: "text-primary", bg: "bg-primary/5", badge: "bg-primary/10 text-primary" },
}

export function SharePosterModal({ onClose, type, data, themeColor = "primary" }: SharePosterModalProps) {
  const [saving, setSaving] = useState(false)
  const colors = colorMap[themeColor] || colorMap.primary

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      onClose()
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex flex-col items-center justify-end sm:justify-center p-0 sm:p-4 pb-[calc(4.75rem+env(safe-area-inset-bottom))]"
      role="dialog"
      aria-modal="true"
      aria-label="推广海报"
    >
      <div className="relative w-full max-w-sm flex flex-col sm:max-h-[90vh]" style={{ maxHeight: "min(95dvh, calc(100dvh - 4.75rem - env(safe-area-inset-bottom)))" }}>

        <div
          className="bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            maxHeight:
              "min(calc(95dvh - 130px), calc(100dvh - 4.75rem - env(safe-area-inset-bottom) - 130px))",
          }}
        >
          <div className="overflow-y-auto">
            <div className={`bg-gradient-to-br ${colors.gradient} p-4 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                {type === "caregiver" && data.avatar ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={data.avatar || "/placeholder.svg"}
                      alt={data.name}
                      className="w-16 h-16 rounded-full border-2 border-white/30 shadow-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold leading-tight">{data.name}</h2>
                      {data.subtitle && (
                        <Badge className="bg-white/20 text-white text-[10px] border-0 mt-1">{data.subtitle}</Badge>
                      )}
                      {data.price && (
                        <p className="text-white/90 text-sm font-medium mt-1">{data.price}</p>
                      )}
                      {data.rating && (
                        <div className="flex items-center gap-2 mt-1 text-white/80 text-xs">
                          <span>{"★".repeat(Math.floor(data.rating))} {data.rating}</span>
                          {data.reviews && <span>{data.reviews}条好评</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-lg font-bold">{data.name}</h2>
                    {data.subtitle && <p className="text-white/80 text-sm mt-1">{data.subtitle}</p>}
                    {data.price && <p className="text-2xl font-bold mt-1">{data.price}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-3 space-y-3">
              {data.desc && (
                <p className="text-sm text-muted-foreground text-center leading-relaxed">{data.desc}</p>
              )}
              {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {data.tags.map((tag) => (
                    <Badge key={tag} className={`${colors.badge} text-[10px] font-normal`}>{tag}</Badge>
                  ))}
                </div>
              )}
              <div className={`${colors.bg} rounded-xl p-3 flex items-center gap-3`}>
                <div className="w-16 h-16 bg-white rounded-lg p-0.5 shrink-0">
                  <Image src="/youhou-service-qrcode.jpg" alt="scan" width={60} height={60} className="w-full h-full object-cover rounded" />
                </div>
                <div>
                  <p className="text-xs font-medium">扫码了解详情</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">微信扫一扫查看家政员详情</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center shrink-0">
                      <Heart className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs">优厚家庭服务</h3>
                      <p className="text-[9px] text-white/60">专业母婴护理 值得信赖</p>
                    </div>
                  </div>
                  <div className="space-y-0.5 text-[9px] text-white/70">
                    <p className="flex items-center gap-1"><Shield className="w-2.5 h-2.5 shrink-0" />人社部认证 行业协会会员</p>
                    <p className="flex items-center gap-1"><Phone className="w-2.5 h-2.5 shrink-0" />400-888-8888</p>
                    <p className="flex items-center gap-1 truncate"><MapPin className="w-2.5 h-2.5 shrink-0" />银川市金凤区瑞银财富中心C座7楼</p>
                  </div>
                </div>
                <div className="text-center shrink-0">
                  <div className="w-12 h-12 bg-white rounded-lg p-0.5">
                    <Image src="/youhou-service-qrcode.jpg" alt="qr" width={44} height={44} className="w-full h-full object-cover rounded" />
                  </div>
                  <p className="text-[8px] text-white/50 mt-0.5">联系客服</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/70 px-4 pt-3 pb-5 space-y-2 rounded-b-2xl">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-10 bg-green-500/90 border-green-600 text-white hover:bg-green-600 text-xs"
              onClick={() => alert('正在打开微信分享...')}
            >
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
                <path d="M23.998 14.435c0-3.26-3.166-5.91-7.066-5.91-3.9 0-7.065 2.65-7.065 5.91s3.166 5.91 7.065 5.91c.772 0 1.509-.106 2.204-.298a.67.67 0 0 1 .559.076l1.482.87a.253.253 0 0 0 .13.04c.124 0 .226-.104.226-.232 0-.056-.023-.111-.037-.166l-.304-1.153a.46.46 0 0 1 .166-.518c1.43-1.05 2.64-2.645 2.64-4.529zM14.2 13.3a.91.91 0 0 1-.9-.92.91.91 0 0 1 .9-.92.91.91 0 0 1 .9.92.91.91 0 0 1-.9.92zm4.537 0a.91.91 0 0 1-.9-.92.91.91 0 0 1 .9-.92.91.91 0 0 1 .9.92.91.91 0 0 1-.9.92z"/>
              </svg>
              分享到微信
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              onClick={() => {
                navigator.clipboard?.writeText('https://youhou.com/share/caregiver/xxx')
                alert('链接已复制')
              }}
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              复制链接
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-10 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              onClick={onClose}
            >
              <X className="w-4 h-4 mr-1.5" />
              关闭
            </Button>
            <Button
              className={`flex-1 h-10 bg-gradient-to-r ${colors.gradient} text-xs`}
              onClick={handleSave}
              disabled={saving}
            >
              <Download className="w-4 h-4 mr-1.5" />
              {saving ? "保存中..." : "保存海报"}
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
