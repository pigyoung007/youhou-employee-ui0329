"use client"

import { useState } from "react"
import { TalentBottomNav } from "@/components/talent/bottom-nav"
import { TalentHomePage } from "@/components/talent/home-page"
import { TalentLearningPage } from "@/components/talent/learning-page"
import { TalentWorkbenchPage } from "@/components/talent/workbench-page"
import { TalentProfilePage } from "@/components/talent/profile-page"
import { MaternityServicePage } from "@/components/employer/maternity-service-page"
import { PostpartumServicePage } from "@/components/employer/postpartum-service-page"
import { ChildcareServicePage } from "@/components/employer/childcare-service-page"
import { CoursesServicePage } from "@/components/employer/courses-service-page"
import { TalentContractsPage } from "@/components/talent/contracts-page"
import { TalentDepositPage } from "@/components/talent/deposit-page"
import { TalentDischargeNoticePage } from "@/components/talent/discharge-notice-page"
import { TalentIncomeDetailsPage } from "@/components/talent/income-details-page"
import { OrdersPoolPage } from "@/components/talent/orders-pool-page"
import { PrivateOrderCreate } from "@/components/talent/private-order-create"
import { ResumeEditPage } from "@/components/talent/resume-edit-page"
import { BackgroundCheckPage } from "@/components/talent/background-check-page"
import { ComplaintsPage } from "@/components/talent/complaints-page"

export default function TalentPortal() {
  const [activeTab, setActiveTab] = useState("home")
  const [servicePage, setServicePage] = useState<string | null>(null)
  const [subPage, setSubPage] = useState<string | null>(null)

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

  // If a sub page is open, render it
  if (subPage) {
    const subPageProps = { onBack: () => setSubPage(null) }
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        {subPage === "contracts" && <TalentContractsPage onBack={() => setSubPage(null)} />}
        {subPage === "deposit" && <TalentDepositPage onBack={() => setSubPage(null)} />}
        {subPage === "discharge" && <TalentDischargeNoticePage onBack={() => setSubPage(null)} />}
        {subPage === "income" && <TalentIncomeDetailsPage onBack={() => setSubPage(null)} />}
        {subPage === "private-order-create" && (
          <PrivateOrderCreate
            onBack={() => setSubPage(null)}
            onCreated={() => { setSubPage(null); setActiveTab("workbench") }}
          />
        )}
        {subPage === "resume-edit" && <ResumeEditPage onBack={() => setSubPage(null)} />}
        {subPage === "background-check" && <BackgroundCheckPage onBack={() => setSubPage(null)} />}
        {subPage === "complaints" && <ComplaintsPage onBack={() => setSubPage(null)} />}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      <div className={activeTab === "home" ? "block" : "hidden"}>
        <TalentHomePage
          onOpenService={setServicePage}
          onOpenSubPage={setSubPage}
        />
      </div>
      <div className={activeTab === "learning" ? "block" : "hidden"}><TalentLearningPage /></div>
      <div className={activeTab === "workbench" ? "block" : "hidden"}>
        <TalentWorkbenchPage
          onCreatePrivateOrder={() => setSubPage("private-order-create")}
        />
      </div>
      <div className={activeTab === "orders-pool" ? "block" : "hidden"}><OrdersPoolPage /></div>
      <div className={activeTab === "profile" ? "block" : "hidden"}>
        <TalentProfilePage onOpenSubPage={setSubPage} />
      </div>
      <TalentBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToEntry={() => {
          window.location.href = "/"
        }}
      />
    </div>
  )
}
