"use client"

import { Home, Database, TrendingUp, Briefcase, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MaternityBottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MaternityBottomNav({ activeTab, onTabChange }: MaternityBottomNavProps) {
  const tabs = [
    { id: "leads", label: "线索池", icon: Home },
    { id: "resource", label: "资源库", icon: Database },
    { id: "performance", label: "业绩", icon: TrendingUp },
    { id: "services", label: "服务", icon: Briefcase },
    { id: "profile", label: "我的", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className={cn("w-5 h-5", activeTab === tab.id && "text-primary")} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
