"use client"

import { Users, GraduationCap, TrendingUp, Briefcase, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface CareerBottomNavProps {
  activeTab: "leads" | "students" | "performance" | "services" | "profile"
  onTabChange: (tab: "leads" | "students" | "performance" | "services" | "profile") => void
}

export function CareerBottomNav({ activeTab, onTabChange }: CareerBottomNavProps) {
  const tabs = [
    { id: "leads" as const, label: "线索", icon: Users },
    { id: "students" as const, label: "学员", icon: GraduationCap },
    { id: "performance" as const, label: "业绩", icon: TrendingUp },
    { id: "services" as const, label: "服务", icon: Briefcase },
    { id: "profile" as const, label: "我的", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom max-w-md mx-auto shadow-lg">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative",
                isActive ? "text-violet-500" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all",
                isActive && "bg-violet-500/10"
              )}>
                <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn("text-[10px]", isActive && "font-semibold")}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
