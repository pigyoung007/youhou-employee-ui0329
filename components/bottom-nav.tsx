"use client"

import { Home, Briefcase, User, LayoutGrid, ShoppingBag, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: "home" | "service" | "orders" | "contracts" | "profile"
  onTabChange: (tab: "home" | "service" | "orders" | "contracts" | "profile") => void
  onBackToEntry?: () => void
}

export function BottomNav({ activeTab, onTabChange, onBackToEntry }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, label: "首页", icon: Home },
    { id: "service" as const, label: "服务", icon: Briefcase },
    { id: "orders" as const, label: "订单", icon: ShoppingBag },
    { id: "contracts" as const, label: "合同", icon: FileText },
    { id: "profile" as const, label: "我的", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom max-w-md mx-auto shadow-lg">
      <div className="flex items-center justify-around py-2">
        {onBackToEntry && (
          <button
            type="button"
            onClick={onBackToEntry}
            className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg shrink-0 text-muted-foreground hover:text-foreground transition-colors"
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
                "flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-lg transition-all relative min-w-16",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className={cn("relative p-1.5 rounded-lg transition-all", isActive && "bg-primary/10")}>
                <Icon className={cn("w-4 h-4", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn("text-[10px]", isActive && "font-semibold")}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
