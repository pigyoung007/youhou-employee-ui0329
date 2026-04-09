"use client"

import { cn } from "@/lib/utils"
import { useRef, useEffect } from "react"

export interface WorkbenchTab {
  id: string
  label: string
}

interface WorkbenchTabsProps {
  tabs: WorkbenchTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function WorkbenchTabs({ tabs, activeTab, onTabChange }: WorkbenchTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const el = activeRef.current
      const offset = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
      container.scrollTo({ left: offset, behavior: "smooth" })
    }
  }, [activeTab])

  return (
    <div className="px-4 py-2">
      <div
        ref={scrollRef}
        className="flex items-center gap-1 bg-white rounded-full px-1.5 py-1.5 shadow-sm overflow-x-auto scrollbar-hide"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0",
                isActive
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
