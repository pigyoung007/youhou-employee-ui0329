"use client"

import { BookOpen, Award, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface StudentBottomNavProps {
  activeTab: "learning" | "certificate" | "profile"
  onTabChange: (tab: "learning" | "certificate" | "profile") => void
}

export function StudentBottomNav({ activeTab, onTabChange }: StudentBottomNavProps) {
  const tabs = [
    { id: "learning" as const, label: "学习", icon: BookOpen },
    { id: "certificate" as const, label: "证书", icon: Award },
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
                "flex flex-col items-center gap-1 px-8 py-2 rounded-xl transition-all relative",
                isActive ? "text-teal-500" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all",
                isActive && "bg-teal-500/10"
              )}>
                <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn("text-xs", isActive && "font-semibold")}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
