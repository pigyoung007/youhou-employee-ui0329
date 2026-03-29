"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/home-page"
import { ServiceDashboard } from "@/components/service-dashboard"
import { ProfilePage } from "@/components/profile-page"
import { GuestPage } from "@/components/guest-page"
import { GuestServiceDashboard } from "@/components/guest-service-dashboard"
import { GuestProfilePage } from "@/components/guest-profile-page"
import { MaternityServicePage } from "@/components/employer/maternity-service-page"
import { PostpartumServicePage } from "@/components/employer/postpartum-service-page"
import { ChildcareServicePage } from "@/components/employer/childcare-service-page"
import { CoursesServicePage } from "@/components/employer/courses-service-page"

export default function EmployerPortal() {
  const [isGuest, setIsGuest] = useState(true)
  const [activeTab, setActiveTab] = useState<"home" | "service" | "profile">("home")
  const [activeServicePage, setActiveServicePage] = useState<string | null>(null)

  const handleRegister = () => setIsGuest(false)
  const handleLogout = () => {
    setIsGuest(true)
    setActiveTab("home")
  }
  const handleBackToEntry = () => {
    window.location.href = "/"
  }

  const handleServiceNavigate = (service: string) => {
    setActiveServicePage(service)
  }

  const handleGoToServiceTab = (subTab?: string) => {
    setActiveTab("service")
  }

  // Render standalone service pages when navigated
  if (activeServicePage) {
    const onBack = () => setActiveServicePage(null)
    switch (activeServicePage) {
      case "找月嫂":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto relative">
            <MaternityServicePage onBack={onBack} />
          </div>
        )
      case "产后修复":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto relative">
            <PostpartumServicePage onBack={onBack} />
          </div>
        )
      case "育婴师":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto relative">
            <ChildcareServicePage onBack={onBack} />
          </div>
        )
      case "在线课程":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto relative">
            <CoursesServicePage onBack={onBack} />
          </div>
        )
    }
  }

  if (isGuest) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto relative">
        <div className="pb-20">
          {activeTab === "home" && <GuestPage onRegister={handleRegister} onServiceNavigate={handleServiceNavigate} />}
          {activeTab === "service" && <GuestServiceDashboard onRegister={handleRegister} />}
          {activeTab === "profile" && <GuestProfilePage onRegister={handleRegister} />}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onBackToEntry={handleBackToEntry} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className="pb-20">
        {activeTab === "home" && (
          <HomePage
            onServiceNavigate={handleServiceNavigate}
            onGoToServiceTab={handleGoToServiceTab}
          />
        )}
        {activeTab === "service" && <ServiceDashboard />}
        {activeTab === "profile" && <ProfilePage onLogout={handleLogout} />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onBackToEntry={handleBackToEntry} />
    </div>
  )
}
