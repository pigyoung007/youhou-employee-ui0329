"use client"

import { useState, Suspense, lazy } from "react"
import { MergedEmployeeBottomNav, EmployeeTabId } from "@/components/employee/merged/bottom-nav"
import { EmployeeHomePage } from "@/components/employee/merged/home-page"
import { Spinner } from "@/components/ui/spinner"
import type { ContractOrderPrefill, ContractPrefillData } from "@/components/employee/merged/contract-management-page"
import type { OrderPrefillData, OrderToContractData } from "@/components/employee/merged/orders-create-page"

const MergedLeadsPage = lazy(() => import("@/components/employee/merged/leads-page").then(m => ({ default: m.MergedLeadsPage })))
const LeadsManagementPage = lazy(() => import("@/components/employee/merged/leads-management-page").then(m => ({ default: m.LeadsManagementPage })))
const TalentPoolPage = lazy(() => import("@/components/employee/merged/talent-pool-page").then(m => ({ default: m.TalentPoolPage })))
const MergedEmployeeProfilePage = lazy(() => import("@/components/employee/merged/profile-page").then(m => ({ default: m.MergedEmployeeProfilePage })))
const MaternityServicePage = lazy(() => import("@/components/employer/maternity-service-page").then(m => ({ default: m.MaternityServicePage })))
const PostpartumServicePage = lazy(() => import("@/components/employer/postpartum-service-page").then(m => ({ default: m.PostpartumServicePage })))
const ChildcareServicePage = lazy(() => import("@/components/employer/childcare-service-page").then(m => ({ default: m.ChildcareServicePage })))
const CoursesServicePage = lazy(() => import("@/components/employer/courses-service-page").then(m => ({ default: m.CoursesServicePage })))
const WorkJournalPage = lazy(() => import("@/components/employee/merged/work-journal-page").then(m => ({ default: m.WorkJournalPage })))
const PerformanceGoalsPage = lazy(() => import("@/components/employee/merged/performance-goals-page").then(m => ({ default: m.PerformanceGoalsPage })))
const ContractManagePage = lazy(() => import("@/components/employee/merged/contract-manage-page").then(m => ({ default: m.ContractManagePage })))
const ContractManagementPage = lazy(() => import("@/components/employee/merged/contract-management-page").then(m => ({ default: m.ContractManagementPage })))
const SchedulePage = lazy(() => import("@/components/employee/merged/schedule-page").then(m => ({ default: m.SchedulePage })))
const EmployeeOrdersPage = lazy(() => import("@/components/employee/merged/orders-page").then(m => ({ default: m.EmployeeOrdersPage })))
const OrderCreatePage = lazy(() => import("@/components/employee/merged/orders-create-page").then(m => ({ default: m.OrderCreatePage })))
const OrderDetailPage = lazy(() => import("@/components/employee/merged/orders-detail-page").then(m => ({ default: m.OrderDetailPage })))
const OrderAdjustPage = lazy(() => import("@/components/employee/merged/orders-adjust-page").then(m => ({ default: m.OrderAdjustPage })))
const InventoryManagementPage = lazy(() => import("@/components/employee/merged/inventory-management-page").then(m => ({ default: m.InventoryManagementPage })))
const InvoiceManagementPage = lazy(() => import("@/components/employee/merged/invoice-management-page").then(m => ({ default: m.InvoiceManagementPage })))
const GiftManagementPage = lazy(() => import("@/components/employee/merged/gift-management-page").then(m => ({ default: m.GiftManagementPage })))
const BeiYiShengVisitPage = lazy(() => import("@/components/employee/merged/visit-management-page").then(m => ({ default: m.BeiYiShengVisitPage })))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner className="w-8 h-8" />
    </div>
  )
}

type SubPageType = 
  | "journal" 
  | "goals" 
  | "contracts" 
  | "contract-management"
  | "schedule" 
  | "inventory" 
  | "invoice"
  | "gift" 
  | "leads" 
  | "leads-management"
  | "visits"
  | "order-create"
  | "order-detail"
  | "order-adjust"

export default function EmployeePortal() {
  const [activeTab, setActiveTab] = useState<EmployeeTabId>("home")
  const [employeeRole, setEmployeeRole] = useState<"career" | "maternity_consultant" | "bei_yi_sheng">("maternity_consultant")
  const [servicePage, setServicePage] = useState<string | null>(null)
  const [subPage, setSubPage] = useState<SubPageType | null>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [orderPrefill, setOrderPrefill] = useState<OrderPrefillData | null>(null)
  const [contractPrefill, setContractPrefill] = useState<ContractPrefillData | null>(null)
  const [autoOpenCreateContract, setAutoOpenCreateContract] = useState(false)

  const handleOpenSubPage = (page: string) => {
    setSubPage(page as SubPageType)
  }

  const handleBack = () => {
    setSubPage(null)
    setSelectedOrderId(null)
  }

  const handleOpenOrderDetail = (orderId: string) => {
    setSelectedOrderId(orderId)
    setSubPage("order-detail")
  }

  const handleOpenOrderAdjust = (orderId: string) => {
    setSelectedOrderId(orderId)
    setSubPage("order-adjust")
  }

  const handleCreateOrderFromContract = (data: ContractOrderPrefill) => {
    setOrderPrefill({
      customerName: data.customerName,
      serviceType: data.serviceType,
      amount: data.amount,
      startDate: data.startDate,
      endDate: data.endDate,
      caregiverName: data.caregiverName,
      contractId: data.contractId,
      orderId: data.orderId,
      fromContract: true,
    })
    setSubPage("order-create")
  }

  const openOrderCreateFromCustomer = (prefill: OrderPrefillData) => {
    setOrderPrefill({ ...prefill, receiptOnly: false })
    setSubPage("order-create")
  }

  const openReceiptCreateFromCustomer = (prefill: OrderPrefillData) => {
    setOrderPrefill({ ...prefill, receiptOnly: true })
    setSubPage("order-create")
  }

  const handleCreateContractFromOrder = (data: OrderToContractData) => {
    setContractPrefill({
      customerName: data.customerName,
      serviceType: data.serviceType,
      amount: data.amount,
      startDate: data.startDate,
      endDate: data.endDate,
      orderId: data.orderId,
    })
    setOrderPrefill(null)
    setSubPage(null)
    setAutoOpenCreateContract(true)
    setActiveTab("contracts")
  }

  if (subPage) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <Suspense fallback={<LoadingFallback />}>
          {subPage === "journal" && (
            <WorkJournalPage onBack={handleBack} />
          )}
          {subPage === "goals" && (
            <PerformanceGoalsPage onBack={handleBack} />
          )}
          {subPage === "contracts" && (
            <ContractManagePage onBack={handleBack} />
          )}
          {subPage === "contract-management" && (
            <ContractManagementPage onBack={handleBack} onCreateOrder={handleCreateOrderFromContract} />
          )}
          {subPage === "schedule" && (
            <SchedulePage onBack={handleBack} />
          )}
          {subPage === "inventory" && (
            <InventoryManagementPage onBack={handleBack} />
          )}
          {subPage === "invoice" && (
            <InvoiceManagementPage onBack={handleBack} />
          )}
          {subPage === "gift" && (
            <GiftManagementPage onBack={handleBack} />
          )}
          {subPage === "leads" && (
            <MergedLeadsPage
              onNewOrder={openOrderCreateFromCustomer}
              onNewReceipt={openReceiptCreateFromCustomer}
            />
          )}
          {subPage === "leads-management" && (
            <LeadsManagementPage onBack={handleBack} />
          )}
          {subPage === "visits" && (
            <BeiYiShengVisitPage onBack={handleBack} />
          )}
          {subPage === "order-create" && (
            <OrderCreatePage
              onBack={() => { handleBack(); setOrderPrefill(null) }}
              orderType={employeeRole === "career" ? "training" : "service"}
              prefillData={orderPrefill ?? undefined}
              onOpenContract={handleCreateContractFromOrder}
            />
          )}
          {subPage === "order-detail" && selectedOrderId && (
            <OrderDetailPage 
              orderId={selectedOrderId} 
              onBack={handleBack}
              onOpenAdjust={() => handleOpenOrderAdjust(selectedOrderId)}
            />
          )}
          {subPage === "order-adjust" && selectedOrderId && (
            <OrderAdjustPage 
              orderId={selectedOrderId} 
              onBack={() => setSubPage("order-detail")}
            />
          )}
        </Suspense>
      </div>
    )
  }

  if (servicePage) {
    const serviceProps = { onBack: () => setServicePage(null) }
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <Suspense fallback={<LoadingFallback />}>
          {servicePage === "找月嫂" && <MaternityServicePage {...serviceProps} />}
          {servicePage === "产后修复" && <PostpartumServicePage {...serviceProps} />}
          {servicePage === "育婴师" && <ChildcareServicePage {...serviceProps} />}
          {servicePage === "在线课程" && <CoursesServicePage {...serviceProps} />}
        </Suspense>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      {/* Tab Content */}
      <div className={activeTab === "home" ? "block" : "hidden"}>
        <EmployeeHomePage
          employeeRole={employeeRole}
          onOpenService={setServicePage}
          onOpenJournal={() => setSubPage("journal")}
          onOpenSubPage={handleOpenSubPage}
          onSwitchTab={(tab) => setActiveTab(tab as EmployeeTabId)}
        />
      </div>
      
      <Suspense fallback={<LoadingFallback />}>
        <div className={activeTab === "leads" ? "block" : "hidden"}>
          <LeadsManagementPage 
            employeeRole={employeeRole === "career" ? "career" : "maternity_consultant"} 
            onBack={() => setActiveTab("home")}
            onNewOrder={openOrderCreateFromCustomer}
            onNewReceipt={openReceiptCreateFromCustomer}
          />
        </div>
        
        <div className={activeTab === "talent" ? "block" : "hidden"}>
          <TalentPoolPage />
        </div>
        
        <div className={activeTab === "orders" ? "block" : "hidden"}>
          <EmployeeOrdersPage 
            employeeRole={employeeRole}
            onOpenCreate={() => setSubPage("order-create")}
            onOpenDetail={handleOpenOrderDetail}
            onBack={() => setActiveTab("home")}
          />
        </div>

        <div className={activeTab === "contracts" ? "block" : "hidden"}>
          <ContractManagementPage
            onBack={() => {
              setActiveTab("home")
              setContractPrefill(null)
              setAutoOpenCreateContract(false)
            }}
            onCreateOrder={handleCreateOrderFromContract}
            contractPrefill={contractPrefill ?? undefined}
            autoOpenCreate={autoOpenCreateContract}
          />
        </div>

        <div className={activeTab === "visits" ? "block" : "hidden"}>
          <BeiYiShengVisitPage />
        </div>

        <div className={activeTab === "journal" ? "block" : "hidden"}>
          <WorkJournalPage />
        </div>
        
        <div className={activeTab === "profile" ? "block" : "hidden"}>
          <MergedEmployeeProfilePage
            employeeRole={employeeRole}
            onBackToEntry={() => window.location.href = "/"}
            onOpenGoals={() => setSubPage("goals")}
            onOpenContracts={() => setSubPage("contract-management")}
            onOpenSchedule={() => setSubPage("schedule")}
            onSwitchRole={(role) => setEmployeeRole(role)}
          />
        </div>
      </Suspense>

      {/* Bottom Navigation */}
      <MergedEmployeeBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        employeeRole={employeeRole}
        onBackToEntry={() => {
          window.location.href = "/"
        }}
      />
    </div>
  )
}
