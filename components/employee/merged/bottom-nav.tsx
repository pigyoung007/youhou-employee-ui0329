"use client"

import { Home, Users, Database, FileText, User, MapPin, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

export type EmployeeTabId = "home" | "leads" | "talent" | "orders" | "visits" | "journal" | "profile"

interface BottomNavProps {
  activeTab: EmployeeTabId
  onTabChange: (tab: EmployeeTabId) => void
  employeeRole?: "career" | "maternity_consultant" | "bei_yi_sheng"
  onBackToEntry?: () => void
}

export function MergedEmployeeBottomNav({ activeTab, onTabChange, employeeRole = "maternity_consultant", onBackToEntry }: BottomNavProps) {
  const getTabs = () => {
    if (employeeRole === "career") {
      return [
        { id: "home" as const, label: "首页", icon: Home },
        { id: "leads" as const, label: "客户", icon: Users },
        { id: "talent" as const, label: "学员", icon: Database },
        { id: "orders" as const, label: "订单", icon: FileText },
        { id: "profile" as const, label: "我的", icon: User },
      ]
    } else if (employeeRole === "bei_yi_sheng") {
      return [
        { id: "home" as const, label: "首页", icon: Home },
        { id: "visits" as const, label: "回访", icon: MapPin },
        { id: "journal" as const, label: "日报", icon: FileText },
        { id: "profile" as const, label: "我的", icon: User },
      ]
    } else {
      return [
        { id: "home" as const, label: "首页", icon: Home },
        { id: "leads" as const, label: "客户", icon: Users },
        { id: "talent" as const, label: "人才库", icon: Database },
        { id: "orders" as const, label: "订单", icon: FileText },
        { id: "profile" as const, label: "我的", icon: User },
      ]
    }
  }

  const tabs = getTabs()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-white border-t border-border safe-area-bottom flex items-stretch">
        {onBackToEntry && (
          <button
            type="button"
            onClick={onBackToEntry}
            className="shrink-0 flex flex-col items-center justify-center gap-0.5 w-[52px] border-r border-border text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors py-2"
          >
            <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />
            <span className="text-[10px] leading-tight">切换</span>
          </button>
        )}
        <div className="flex flex-1 min-w-0 items-stretch">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors min-w-0",
                  isActive ? "bg-pink-50 text-primary" : "text-muted-foreground hover:bg-muted/30",
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "stroke-[2.5px]")} />
                <span className={cn("text-[10px] leading-tight text-center", isActive && "font-semibold")}>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
