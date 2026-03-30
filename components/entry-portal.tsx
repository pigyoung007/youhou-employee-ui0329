"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  GraduationCap,
  Briefcase,
  Baby,
  Flower2,
  BookOpen,
  UserCheck,
  HeartPulse,
  ChevronRight,
  Star,
} from "lucide-react"
export type AppType = "employer" | "talent" | "employee" | "technician"

interface EntryPortalProps {
  onSelectApp: (type: AppType) => void
}

export function EntryPortal({ onSelectApp }: EntryPortalProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Baby className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">优厚家庭服务</h1>
        <p className="text-muted-foreground mt-2">专业母婴护理 · 贴心家政服务</p>
      </div>

      {/* Brand Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">10000+</p>
            <p className="text-xs text-muted-foreground">服务家庭</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">500+</p>
            <p className="text-xs text-muted-foreground">专业阿姨</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">8年</p>
            <p className="text-xs text-muted-foreground">服务年限</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">99%</p>
            <p className="text-xs text-muted-foreground">好评率</p>
          </div>
        </div>
      </div>

      {/* Entry Options - Direct entry, no sub-role selection */}
      <div className="flex-1 px-6 pb-8">
        <p className="text-sm text-muted-foreground mb-4 text-center">请选择您的身份</p>
        
        <div className="space-y-4">
          {/* 优厚家服·雇主端 */}
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            onClick={() => onSelectApp("employer")}
          >
            <CardContent className="p-0">
              <div className="flex items-center p-4 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">优厚家服·雇主端</h3>
                  <p className="text-sm text-muted-foreground">找月嫂 / 产后修复 / 育婴师</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="px-4 py-3 bg-muted/30 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Baby className="w-3.5 h-3.5" />找月嫂
                </span>
                <span className="flex items-center gap-1">
                  <Flower2 className="w-3.5 h-3.5" />产后修复
                </span>
                <span className="flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" />育婴师
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />在线课程
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 优厚家服·人才端 */}
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            onClick={() => onSelectApp("talent")}
          >
            <CardContent className="p-0">
              <div className="flex items-center p-4 bg-gradient-to-r from-teal-500/10 to-teal-500/5">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">优厚家服·人才端</h3>
                  <p className="text-sm text-muted-foreground">学员 / 家政员</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="px-4 py-3 bg-muted/30 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />在线学习
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />接单服务
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />工作台
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 优厚家服·产康技师端 (独立小程序) */}
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            onClick={() => onSelectApp("technician")}
          >
            <CardContent className="p-0">
              <div className="flex items-center p-4 bg-gradient-to-r from-rose-500/10 to-rose-500/5">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mr-4">
                  <HeartPulse className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">优厚家服·产康技师端</h3>
                  <p className="text-sm text-muted-foreground">产后康复专业服务</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="px-4 py-3 bg-muted/30 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />学习中心
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />接单
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />工作台
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 优厚家服·员工端 */}
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            onClick={() => onSelectApp("employee")}
          >
            <CardContent className="p-0">
              <div className="flex items-center p-4 bg-gradient-to-r from-violet-500/10 to-violet-500/5">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center mr-4">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">优厚家服·员工端</h3>
                  <p className="text-sm text-muted-foreground">职业顾问 / 母婴顾问</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="px-4 py-3 bg-muted/30 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />线索管理
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />人才库
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />我的
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">优厚家庭服务 v2.0.0</p>
      </div>
    </div>
  )
}
