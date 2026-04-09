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
import { OrdersPage } from "@/components/employer/orders-page"
import { ContractsPage } from "@/components/employer/contracts-page"
import { OrderDetailPage } from "@/components/employer/order-detail-page"
import { ContractDetailPage } from "@/components/employer/contract-detail-page"
import { PaymentPage } from "@/components/employer/payment-page"
import { ReviewPage } from "@/components/employer/review-page"
import { ComplaintPage } from "@/components/employer/complaint-page"
import { MyReviewsPage } from "@/components/employer/my-reviews-page"
import { ComplaintSubmitPage } from "@/components/employer/complaint-submit-page"
import { AppointmentPage } from "@/components/employer/appointment-page"

type SubPage =
  | null
  | { type: "orders" }
  | { type: "order-detail"; orderId: string }
  | { type: "payment"; orderId: string; amount: number }
  | { type: "review-submit"; orderId: string; caregiverName: string }
  | { type: "complaint-detail"; orderId: string; caregiverName: string }
  | { type: "contracts" }
  | { type: "contract-detail"; contractId: string }
  | { type: "reviews" }
  | { type: "complaints" }
  | { type: "appointments" }

export default function EmployerPortal() {
  const [isGuest, setIsGuest] = useState(true)
  const [activeTab, setActiveTab] = useState<"home" | "service" | "profile">("home")
  const [activeServicePage, setActiveServicePage] = useState<string | null>(null)
  const [activeSubPage, setActiveSubPage] = useState<SubPage>(null)

  const handleRegister = () => setIsGuest(false)
  const handleLogout = () => {
    setIsGuest(true)
    setActiveTab("home")
    setActiveSubPage(null)
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

  const handleProfileNavigate = (target: string) => {
    switch (target) {
      case "orders":
        setActiveSubPage({ type: "orders" })
        break
      case "contracts":
        setActiveSubPage({ type: "contracts" })
        break
      case "reviews":
        setActiveSubPage({ type: "reviews" })
        break
      case "complaints":
        setActiveSubPage({ type: "complaints" })
        break
      case "appointments":
        setActiveSubPage({ type: "appointments" })
        break
    }
  }

  const handleTabChange = (tab: "home" | "service" | "profile") => {
    setActiveTab(tab)
    setActiveSubPage(null)
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

  // Render sub-pages (full screen, no bottom nav)
  if (activeSubPage) {
    const wrapper = (content: React.ReactNode) => (
      <div className="min-h-screen bg-background max-w-md mx-auto relative">
        {content}
      </div>
    )

    switch (activeSubPage.type) {
      case "orders":
        return wrapper(
          <OrdersPage
            onBack={() => setActiveSubPage(null)}
            onOrderClick={(orderId) => setActiveSubPage({ type: "order-detail", orderId })}
          />
        )
      case "order-detail":
        return wrapper(
          <OrderDetailPage
            orderId={activeSubPage.orderId}
            onBack={() => setActiveSubPage({ type: "orders" })}
            onPayment={(orderId, amount) => setActiveSubPage({ type: "payment", orderId, amount })}
            onReview={(orderId, caregiverName) => setActiveSubPage({ type: "review-submit", orderId, caregiverName })}
            onComplaint={(orderId, caregiverName) => setActiveSubPage({ type: "complaint-detail", orderId, caregiverName })}
          />
        )
      case "payment":
        return wrapper(
          <PaymentPage
            orderId={activeSubPage.orderId}
            amount={activeSubPage.amount}
            onBack={() => setActiveSubPage({ type: "order-detail", orderId: activeSubPage.orderId })}
            onPaymentSuccess={() => setActiveSubPage({ type: "order-detail", orderId: activeSubPage.orderId })}
          />
        )
      case "review-submit":
        return wrapper(
          <ReviewPage
            orderId={activeSubPage.orderId}
            caregiverName={activeSubPage.caregiverName}
            onBack={() => setActiveSubPage({ type: "order-detail", orderId: activeSubPage.orderId })}
            onSubmitSuccess={() => setActiveSubPage({ type: "order-detail", orderId: activeSubPage.orderId })}
          />
        )
      case "complaint-detail":
        return wrapper(
          <ComplaintPage
            orderId={activeSubPage.orderId}
            caregiverName={activeSubPage.caregiverName}
            onBack={() => setActiveSubPage({ type: "order-detail", orderId: activeSubPage.orderId })}
            onSubmitSuccess={() => setActiveSubPage({ type: "order-detail", orderId: activeSubPage.orderId })}
          />
        )
      case "contracts":
        return wrapper(
          <ContractsPage
            onBack={() => setActiveSubPage(null)}
            onContractClick={(contractId) => setActiveSubPage({ type: "contract-detail", contractId })}
          />
        )
      case "contract-detail":
        return wrapper(
          <ContractDetailPage
            contractId={activeSubPage.contractId}
            onBack={() => setActiveSubPage({ type: "contracts" })}
          />
        )
      case "reviews":
        return wrapper(
          <MyReviewsPage onBack={() => setActiveSubPage(null)} />
        )
      case "complaints":
        return wrapper(
          <ComplaintSubmitPage onBack={() => setActiveSubPage(null)} />
        )
      case "appointments":
        return wrapper(
          <AppointmentPage onBack={() => setActiveSubPage(null)} />
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
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} onBackToEntry={handleBackToEntry} />
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
        {activeTab === "service" && (
          <ServiceDashboard
            onNavigate={handleProfileNavigate}
          />
        )}
        {activeTab === "profile" && (
          <ProfilePage
            onLogout={handleLogout}
            onNavigate={handleProfileNavigate}
          />
        )}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} onBackToEntry={handleBackToEntry} />
    </div>
  )
}
