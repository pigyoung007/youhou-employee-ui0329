"use client"

import { FileText, Calendar, QrCode, Lock, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GuestServiceDashboardProps {
  onRegister: () => void
}

export function GuestServiceDashboard({ onRegister }: GuestServiceDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary to-primary/80 px-4 pt-4 pb-16 safe-area-top relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-xl font-bold text-primary-foreground">服务工作台</h1>
          <p className="text-sm text-primary-foreground/80 mt-1">登录后管理您的服务进度</p>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-foreground/10 rounded-full" />
        <div className="absolute right-20 bottom-0 w-24 h-24 bg-primary-foreground/5 rounded-full" />
      </header>

      <main className="px-4 -mt-10 pb-4 space-y-4 relative z-10">
        {/* Stats Cards - Locked */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card border-0 shadow-md relative overflow-hidden">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-muted-foreground/50">--</p>
              <p className="text-xs text-muted-foreground">待签合同</p>
            </CardContent>
            <div className="absolute inset-0 bg-card/80 backdrop-blur-[1px] flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
          <Card className="bg-card border-0 shadow-md relative overflow-hidden">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-2xl font-bold text-muted-foreground/50">--</p>
              <p className="text-xs text-muted-foreground">服务天数</p>
            </CardContent>
            <div className="absolute inset-0 bg-card/80 backdrop-blur-[1px] flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
          <Card className="bg-card border-0 shadow-md relative overflow-hidden">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl flex items-center justify-center mb-2">
                <QrCode className="w-5 h-5 text-violet-600" />
              </div>
              <p className="text-2xl font-bold text-muted-foreground/50">--</p>
              <p className="text-xs text-muted-foreground">剩余次卡</p>
            </CardContent>
            <div className="absolute inset-0 bg-card/80 backdrop-blur-[1px] flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Main Tabs - Locked */}
        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="w-full bg-card p-1 rounded-2xl shadow-sm h-12">
            <TabsTrigger
              value="contracts"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl h-10 font-medium"
            >
              电子合同
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl h-10 font-medium"
            >
              服务日志
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl h-10 font-medium"
            >
              耗卡确认
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contracts" className="mt-4">
            <LockedContent onRegister={onRegister} title="电子合同" desc="登录后查看和签署服务合同" />
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <LockedContent onRegister={onRegister} title="服务日志" desc="登录后查看宝宝每日护理记录" />
          </TabsContent>

          <TabsContent value="cards" className="mt-4">
            <LockedContent onRegister={onRegister} title="耗卡确认" desc="登录后进行服务次卡核销" />
          </TabsContent>
        </Tabs>

        {/* Feature Preview */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">注册后可享受以下功能</h3>
            <div className="space-y-3">
              {[
                { icon: FileText, title: "电子合同", desc: "在线签署月嫂服务合同、产后修复协议" },
                { icon: Calendar, title: "服务日志", desc: "实时查看宝宝喂养、睡眠、体温等记录" },
                { icon: QrCode, title: "耗卡确认", desc: "扫码核销产后修复等次卡服务" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function LockedContent({
  onRegister,
  title,
  desc,
}: {
  onRegister: () => void
  title: string
  desc: string
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-6">{desc}</p>
        <Button onClick={onRegister} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <UserPlus className="w-4 h-4" />
          立即注册
        </Button>
      </CardContent>
    </Card>
  )
}
