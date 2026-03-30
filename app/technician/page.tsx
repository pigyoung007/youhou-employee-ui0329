"use client"

import { useState } from "react"
import { TechnicianHomePage } from "@/components/technician/home-page"
import { TechnicianOrdersPage } from "@/components/technician/orders-page"
import { TechnicianWorkbenchPage } from "@/components/technician/workbench-page"
import { TechnicianProfilePage } from "@/components/technician/profile-page"
import { TechnicianLearningPage } from "@/components/technician/learning-page"
import { TechnicianCardDeductionPage } from "@/components/technician/card-deduction-page"
import { TechnicianBottomNav } from "@/components/technician/bottom-nav"

export default function TechnicianPortal() {
  const [activeTab, setActiveTab] = useState("home")
  const [subPage, setSubPage] = useState<string | null>(null)

  const handleOpenSubPage = (page: string) => {
    setSubPage(page)
  }

  if (subPage === "card-deduction") {
    return (
      <div className="relative mx-auto min-h-screen max-w-md bg-background">
        <TechnicianCardDeductionPage onBack={() => setSubPage(null)} />
      </div>
    )
  }

  if (subPage) {
    return (
      <div className="relative mx-auto min-h-screen max-w-md bg-background">
        <div className="py-12 text-center text-muted-foreground">
          <p>{subPage} 页面开发中…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-background">
      <div className="pb-20">
        {activeTab === "home" && <TechnicianHomePage />}
        {activeTab === "orders" && (
          <TechnicianOrdersPage onOpenCardDeduction={() => setSubPage("card-deduction")} />
        )}
        {activeTab === "workbench" && (
          <TechnicianWorkbenchPage onOpenCardDeduction={() => setSubPage("card-deduction")} />
        )}
        {activeTab === "learning" && <TechnicianLearningPage />}
        {activeTab === "profile" && <TechnicianProfilePage onOpenSubPage={handleOpenSubPage} />}
      </div>
      <TechnicianBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToEntry={() => {
          window.location.href = "/"
        }}
      />
    </div>
  )
}
