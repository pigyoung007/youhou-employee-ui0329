"use client"

import { useState } from "react"
import { TalentBottomNav } from "@/components/talent/bottom-nav"
import { TalentHomePage } from "@/components/talent/home-page"
import { TalentLearningPage } from "@/components/talent/learning-page"
import { TalentOrdersPage } from "@/components/talent/orders-page"
import { TalentWorkbenchPage } from "@/components/talent/workbench-page"
import { TalentProfilePage } from "@/components/talent/profile-page"
import { MaternityServicePage } from "@/components/employer/maternity-service-page"
import { PostpartumServicePage } from "@/components/employer/postpartum-service-page"
import { ChildcareServicePage } from "@/components/employer/childcare-service-page"
import { CoursesServicePage } from "@/components/employer/courses-service-page"

export default function TalentPortal() {
  const [activeTab, setActiveTab] = useState("home")
  const [servicePage, setServicePage] = useState<string | null>(null)

  // If a service page is open, render it instead
  if (servicePage) {
    const serviceProps = { onBack: () => setServicePage(null) }
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        {servicePage === "找月嫂" && <MaternityServicePage {...serviceProps} />}
        {servicePage === "产后修复" && <PostpartumServicePage {...serviceProps} />}
        {servicePage === "育婴师" && <ChildcareServicePage {...serviceProps} />}
        {servicePage === "在线课程" && <CoursesServicePage {...serviceProps} />}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      <div className={activeTab === "home" ? "block" : "hidden"}>
        <TalentHomePage onOpenService={setServicePage} />
      </div>
      <div className={activeTab === "learning" ? "block" : "hidden"}><TalentLearningPage /></div>
      <div className={activeTab === "orders" ? "block" : "hidden"}><TalentOrdersPage /></div>
      <div className={activeTab === "workbench" ? "block" : "hidden"}><TalentWorkbenchPage /></div>
      <div className={activeTab === "profile" ? "block" : "hidden"}><TalentProfilePage /></div>
      <TalentBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
