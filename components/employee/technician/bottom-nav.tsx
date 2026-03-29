"use client"

import { Home, ClipboardList, Briefcase, Package, User } from "lucide-react"

interface TechnicianBottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TechnicianBottomNav({ activeTab, onTabChange }: TechnicianBottomNavProps) {
  const tabs = [
    { id: "home", label: "首页", icon: Home },
    { id: "orders", label: "接单", icon: ClipboardList },
    { id: "workbench", label: "工作台", icon: Briefcase },
    { id: "supplies", label: "耗材库", icon: Package },
    { id: "profile", label: "我的", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t shadow-lg z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                isActive ? "text-teal-600" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
