"use client"

import { Home, ClipboardList, Briefcase, BookOpen, User, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

interface TechnicianBottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onBackToEntry?: () => void
}

export function TechnicianBottomNav({ activeTab, onTabChange, onBackToEntry }: TechnicianBottomNavProps) {
  const tabs = [
    { id: "home", label: "首页", icon: Home },
    { id: "orders", label: "接单", icon: ClipboardList },
    { id: "workbench", label: "工作台", icon: Briefcase },
    { id: "learning", label: "学习", icon: BookOpen },
    { id: "profile", label: "我的", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t shadow-lg z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 gap-0.5 px-1">
        {onBackToEntry && (
          <button
            type="button"
            onClick={onBackToEntry}
            className="flex flex-col items-center gap-0.5 px-1.5 py-1.5 rounded-lg shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />
            <span className="text-[10px] leading-none">切换</span>
          </button>
        )}
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-1.5 py-1 transition-colors min-w-0 flex-1",
                isActive ? "text-teal-600" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive && "stroke-[2.5]")} />
              <span className={cn("text-[10px] leading-tight text-center", isActive && "font-medium")}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
