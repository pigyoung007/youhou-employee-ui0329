"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  PenLine,
  Download,
  Share2,
  Building2,
  User,
  Calendar,
  Shield,
  AlertCircle,
  FileSignature,
  RefreshCw,
  Ban,
  History,
  ChevronLeft,
  X,
  Stamp,
  Users,
  Phone,
  Mail,
  CreditCard,
  Banknote,
  FileCheck,
  Send,
  Link2,
  Copy,
  Printer,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { SignaturePad } from "@/components/signature-pad"

// 合同模板
const contractTemplates = [
  { id: 1, name: "月嫂服务合同", type: "maternity", parties: 3, description: "适用于月嫂上户服务" },
  { id: 2, name: "育婴师服务合同", type: "childcare", parties: 3, description: "适用于育婴师上户服务" },
  { id: 3, name: "产后康复服务协议", type: "recovery", parties: 2, description: "适用于产康项目服务" },
  { id: 4, name: "家政服务合同", type: "domestic", parties: 3, description: "适用于保姆/钟点工服务" },
  { id: 5, name: "培训服务协议", type: "training", parties: 2, description: "适用于职业技能培训" },
]

// 公司抬头
const companyHeaders = [
  { id: 1, name: "优厚家庭服务（银川）有限公司", shortName: "优厚银川", license: "91640000XXXXXXXX" },
  { id: 2, name: "优厚母婴护理（银川）有限公司", shortName: "优厚母婴", license: "91640000YYYYYYYY" },
  { id: 3, name: "优厚职业技能培训学校", shortName: "优厚培训", license: "91640000ZZZZZZZZ" },
]

// 合同列表数据
const contractsData = [
  {
    id: "HT20260121001",
    title: "月嫂服务合同",
    templateId: 1,
    type: "maternity",
    companyId: 1,
    status: "pending_sign", // draft, pending_sign, signed, changed, terminated
    amount: 15800,
    parties: [
      { role: "甲方", name: "优厚家庭服务（银川）有限公司", type: "company", signed: false },
      { role: "乙方", name: "王女士", type: "employer", phone: "138****8888", signed: false },
      { role: "丙方", name: "李阿姨", type: "caregiver", phone: "139****9999", signed: false },
    ],
    serviceContent: "月嫂上户服务26天",
    startDate: "2026-02-01",
    endDate: "2026-02-26",
    createTime: "2026-01-21 14:30",
    consultantId: 1,
    consultantName: "张顾问",
    insuranceStatus: "valid", // valid, expired, none
    insuranceExpiry: "2026-06-30",
    relatedContracts: [],
  },
  {
    id: "HT20260120002",
    title: "产后康复服务协议",
    templateId: 3,
    type: "recovery",
    companyId: 2,
    status: "signed",
    amount: 6800,
    parties: [
      { role: "甲方", name: "优厚母婴护理（银川）有限公司", type: "company", signed: true, signTime: "2026-01-20 10:00" },
      { role: "乙方", name: "李女士", type: "employer", phone: "137****7777", signed: true, signTime: "2026-01-20 11:30" },
    ],
    serviceContent: "盆底肌修复10次",
    startDate: "2026-01-20",
    endDate: "2026-06-30",
    createTime: "2026-01-19 16:00",
    signedTime: "2026-01-20 11:30",
    consultantId: 1,
    consultantName: "张顾问",
    insuranceStatus: "valid",
    insuranceExpiry: "2026-12-31",
    relatedContracts: [],
  },
  {
    id: "HT20260115003",
    title: "月嫂服务合同",
    templateId: 1,
    type: "maternity",
    companyId: 1,
    status: "changed",
    amount: 12800,
    parties: [
      { role: "甲方", name: "优厚家庭服务（银川）有限公司", type: "company", signed: true },
      { role: "乙方", name: "赵女士", type: "employer", phone: "136****6666", signed: true },
      { role: "丙方", name: "张阿姨", type: "caregiver", phone: "135****5555", signed: true },
    ],
    serviceContent: "月嫂上户服务26天",
    startDate: "2026-01-15",
    endDate: "2026-02-10",
    createTime: "2026-01-10 09:00",
    signedTime: "2026-01-12 15:00",
    consultantId: 2,
    consultantName: "李顾问",
    insuranceStatus: "valid",
    insuranceExpiry: "2026-08-15",
    relatedContracts: ["BC20260118001"],
    changeReason: "服务人员更换",
  },
  {
    id: "HT20260110004",
    title: "育婴师服务合同",
    templateId: 2,
    type: "childcare",
    companyId: 1,
    status: "terminated",
    amount: 9800,
    parties: [
      { role: "甲方", name: "优厚家庭服务（银川）有限公司", type: "company", signed: true },
      { role: "乙方", name: "孙先生", type: "employer", phone: "134****4444", signed: true },
      { role: "丙方", name: "周阿姨", type: "caregiver", phone: "133****3333", signed: true },
    ],
    serviceContent: "育婴师上户服务30天",
    startDate: "2026-01-10",
    endDate: "2026-02-10",
    createTime: "2026-01-05 11:00",
    signedTime: "2026-01-08 14:00",
    terminatedTime: "2026-01-18 16:00",
    consultantId: 1,
    consultantName: "张顾问",
    insuranceStatus: "expired",
    insuranceExpiry: "2026-01-15",
    relatedContracts: [],
    terminateReason: "雇主家庭原因提前终止",
    refundAmount: 5200,
  },
]

// 补充协议数据
const supplementaryAgreements = [
  {
    id: "BC20260118001",
    originalContractId: "HT20260115003",
    title: "月嫂服务合同补充协议",
    type: "change",
    changeType: "caregiver_change", // caregiver_change, date_change, amount_change
    status: "signed",
    description: "因原服务人员张阿姨家中有急事，经三方协商，更换服务人员为刘阿姨",
    createTime: "2026-01-18 10:00",
    signedTime: "2026-01-18 14:00",
    oldValue: "张阿姨",
    newValue: "刘阿姨",
  },
]

interface ContractManagementProps {
  role: "employer" | "consultant" | "caregiver"
  userId?: number
  showHeader?: boolean
  filterByUser?: boolean
}

export function ContractManagement({ role, userId, showHeader = true, filterByUser = true }: ContractManagementProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showCreateContract, setShowCreateContract] = useState(false)
  const [showContractDetail, setShowContractDetail] = useState(false)
  const [selectedContract, setSelectedContract] = useState<(typeof contractsData)[0] | null>(null)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [showChangeContract, setShowChangeContract] = useState(false)
  const [showTerminateContract, setShowTerminateContract] = useState(false)
  const [showInsuranceAlert, setShowInsuranceAlert] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof contractTemplates)[0] | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<(typeof companyHeaders)[0] | null>(null)
  const [newContractStep, setNewContractStep] = useState(1)
  
  // 创建合同的表单数据
  const [newContract, setNewContract] = useState({
    templateId: 0,
    companyId: 0,
    employerName: "",
    employerPhone: "",
    caregiverName: "",
    caregiverPhone: "",
    serviceContent: "",
    amount: 0,
    startDate: "",
    endDate: "",
  })

  // 变更合同的表单数据
  const [changeData, setChangeData] = useState({
    changeType: "",
    reason: "",
    oldValue: "",
    newValue: "",
  })

  // 废止合同的表单数据
  const [terminateData, setTerminateData] = useState({
    reason: "",
    refundAmount: 0,
    compensationAmount: 0,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-600">草稿</Badge>
      case "pending_sign":
        return <Badge className="bg-amber-100 text-amber-700 border-0">待签署</Badge>
      case "signed":
        return <Badge className="bg-green-100 text-green-700 border-0">已生效</Badge>
      case "changed":
        return <Badge className="bg-blue-100 text-blue-700 border-0">已变更</Badge>
      case "terminated":
        return <Badge className="bg-red-100 text-red-700 border-0">已废止</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getInsuranceStatusBadge = (status: string, expiry?: string) => {
    if (status === "expired") {
      return (
        <Badge className="bg-red-100 text-red-700 border-0">
          <AlertTriangle className="w-3 h-3 mr-1" />
          保险已过期
        </Badge>
      )
    }
    if (status === "valid" && expiry) {
      const daysLeft = Math.ceil((new Date(expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      if (daysLeft <= 30) {
        return (
          <Badge className="bg-amber-100 text-amber-700 border-0">
            <AlertCircle className="w-3 h-3 mr-1" />
            保险即将到期({daysLeft}天)
          </Badge>
        )
      }
      return (
        <Badge className="bg-green-100 text-green-700 border-0">
          <Shield className="w-3 h-3 mr-1" />
          保险有效
        </Badge>
      )
    }
    return (
      <Badge className="bg-gray-100 text-gray-600 border-0">
        <AlertCircle className="w-3 h-3 mr-1" />
        无保险
      </Badge>
    )
  }

  const filteredContracts = contractsData.filter(contract => {
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!contract.id.toLowerCase().includes(query) && 
          !contract.title.toLowerCase().includes(query) &&
          !contract.parties.some(p => p.name.toLowerCase().includes(query))) {
        return false
      }
    }
    // 状态过滤
    if (statusFilter !== "all" && contract.status !== statusFilter) {
      return false
    }
    return true
  })

  const handleCreateContract = () => {
    // 检查保险状态
    if (selectedContract?.insuranceStatus === "expired") {
      setShowInsuranceAlert(true)
      return
    }
    // 创建合同逻辑
    setShowCreateContract(false)
    setNewContractStep(1)
  }

  const handleSignContract = (signature: string) => {
    console.log("Contract signed:", selectedContract?.id, signature)
    setShowSignatureModal(false)
  }

  const stats = {
    pending: contractsData.filter(c => c.status === "pending_sign").length,
    signed: contractsData.filter(c => c.status === "signed").length,
    changed: contractsData.filter(c => c.status === "changed").length,
    terminated: contractsData.filter(c => c.status === "terminated").length,
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">合同管理</h2>
          {role === "consultant" && (
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setShowCreateContract(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              新建合同
            </Button>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-2">
        <Card 
          className={cn(
            "border-0 shadow-sm cursor-pointer transition-all",
            statusFilter === "pending_sign" && "ring-2 ring-amber-500"
          )}
          onClick={() => setStatusFilter(statusFilter === "pending_sign" ? "all" : "pending_sign")}
        >
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
            <p className="text-[10px] text-muted-foreground">待签署</p>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "border-0 shadow-sm cursor-pointer transition-all",
            statusFilter === "signed" && "ring-2 ring-green-500"
          )}
          onClick={() => setStatusFilter(statusFilter === "signed" ? "all" : "signed")}
        >
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-green-600">{stats.signed}</p>
            <p className="text-[10px] text-muted-foreground">已生效</p>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "border-0 shadow-sm cursor-pointer transition-all",
            statusFilter === "changed" && "ring-2 ring-blue-500"
          )}
          onClick={() => setStatusFilter(statusFilter === "changed" ? "all" : "changed")}
        >
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-blue-600">{stats.changed}</p>
            <p className="text-[10px] text-muted-foreground">已变更</p>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "border-0 shadow-sm cursor-pointer transition-all",
            statusFilter === "terminated" && "ring-2 ring-red-500"
          )}
          onClick={() => setStatusFilter(statusFilter === "terminated" ? "all" : "terminated")}
        >
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-red-600">{stats.terminated}</p>
            <p className="text-[10px] text-muted-foreground">已废止</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索合同编号/客户名称"
            className="pl-9 bg-card border-0 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="bg-card border-0 shadow-sm">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Contract List */}
      <div className="space-y-3">
        {filteredContracts.map((contract) => (
          <Card 
            key={contract.id}
            className="border-0 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedContract(contract)
              setShowContractDetail(true)
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{contract.title}</h4>
                    {getStatusBadge(contract.status)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{contract.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">¥{contract.amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <span className="w-16 shrink-0">签约方</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {contract.parties.map((party, index) => (
                      <span key={index} className="text-foreground">
                        {party.name.length > 6 ? `${party.name.slice(0, 6)}...` : party.name}
                        {index < contract.parties.length - 1 && <span className="text-muted-foreground mx-1">/</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="w-16 shrink-0">服务内容</span>
                  <span className="text-foreground">{contract.serviceContent}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="w-16 shrink-0">服务期限</span>
                  <span className="text-foreground">{contract.startDate} 至 {contract.endDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  {getInsuranceStatusBadge(contract.insuranceStatus, contract.insuranceExpiry)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  {contract.consultantName}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredContracts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>暂无合同记录</p>
          </div>
        )}
      </div>

      {/* Contract Detail Sheet */}
      <Sheet open={showContractDetail} onOpenChange={setShowContractDetail}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl overflow-hidden">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle>合同详情</SheetTitle>
              {selectedContract && getStatusBadge(selectedContract.status)}
            </div>
          </SheetHeader>
          {selectedContract && (
            <div className="overflow-y-auto h-[calc(90vh-140px)] py-4 space-y-4">
              {/* Insurance Alert */}
              {selectedContract.insuranceStatus === "expired" && (
                <Card className="border-0 shadow-sm bg-red-50 border-l-4 border-l-red-500">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                      <div>
                        <p className="font-semibold text-red-700">保险已过期</p>
                        <p className="text-sm text-red-600 mt-0.5">
                          该服务人员的保险已于 {selectedContract.insuranceExpiry} 过期，请先续保或迁移保险后再进行签约
                        </p>
                        <Button size="sm" className="mt-2 bg-red-500 hover:bg-red-600">
                          处理保险
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contract Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    合同信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">合同编号</span>
                    <span className="font-medium">{selectedContract.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">合同名称</span>
                    <span className="font-medium">{selectedContract.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">签约公司</span>
                    <span className="font-medium">
                      {companyHeaders.find(c => c.id === selectedContract.companyId)?.shortName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">合同金额</span>
                    <span className="font-bold text-primary">¥{selectedContract.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">服务内容</span>
                    <span className="font-medium">{selectedContract.serviceContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">服务期限</span>
                    <span className="font-medium">{selectedContract.startDate} 至 {selectedContract.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">创建时间</span>
                    <span>{selectedContract.createTime}</span>
                  </div>
                  {selectedContract.signedTime && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">签署时间</span>
                      <span>{selectedContract.signedTime}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Parties Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    签约方信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedContract.parties.map((party, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 rounded-xl",
                        party.signed ? "bg-green-50" : "bg-amber-50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{party.role}</Badge>
                          <span className="font-medium">{party.name}</span>
                        </div>
                        {party.signed ? (
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            已签署
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            待签署
                          </Badge>
                        )}
                      </div>
                      {party.phone && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {party.phone}
                        </p>
                      )}
                      {party.signTime && (
                        <p className="text-xs text-muted-foreground mt-1">
                          签署时间：{party.signTime}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Insurance Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    保险信息
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">家政服务综合保险</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        有效期至：{selectedContract.insuranceExpiry || "暂无"}
                      </p>
                    </div>
                    {getInsuranceStatusBadge(selectedContract.insuranceStatus, selectedContract.insuranceExpiry)}
                  </div>
                  {selectedContract.insuranceStatus !== "valid" && (
                    <Button size="sm" variant="outline" className="mt-3 w-full bg-transparent">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {selectedContract.insuranceStatus === "expired" ? "续保" : "购买保险"}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Related Contracts */}
              {selectedContract.relatedContracts.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <History className="w-4 h-4 text-primary" />
                      关联协议
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedContract.relatedContracts.map((relatedId) => {
                      const agreement = supplementaryAgreements.find(a => a.id === relatedId)
                      return agreement ? (
                        <div key={relatedId} className="p-3 bg-blue-50 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{agreement.title}</span>
                            <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">补充协议</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{agreement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">签署时间：{agreement.signedTime}</p>
                        </div>
                      ) : null
                    })}
                  </CardContent>
                </Card>
              )}

              {/* Termination Info */}
              {selectedContract.status === "terminated" && (
                <Card className="border-0 shadow-sm bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                      <Ban className="w-4 h-4" />
                      废止信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600">废止时间</span>
                      <span className="font-medium">{selectedContract.terminatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">废止原因</span>
                      <span className="font-medium">{selectedContract.terminateReason}</span>
                    </div>
                    {selectedContract.refundAmount && (
                      <div className="flex justify-between">
                        <span className="text-red-600">退款金额</span>
                        <span className="font-bold text-red-700">¥{selectedContract.refundAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                {selectedContract.status === "pending_sign" && (
                  <>
                    {role === "employer" && !selectedContract.parties.find(p => p.type === "employer")?.signed && (
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => setShowSignatureModal(true)}
                        disabled={selectedContract.insuranceStatus === "expired"}
                      >
                        <PenLine className="w-4 h-4 mr-2" />
                        签署合同
                      </Button>
                    )}
                    {role === "consultant" && (
                      <>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => {
                            // 发送签署链接
                          }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          发送签署链接
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            预览PDF
                          </Button>
                          <Button variant="outline" className="bg-transparent">
                            <Copy className="w-4 h-4 mr-2" />
                            复制链接
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}

                {selectedContract.status === "signed" && role === "consultant" && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="bg-transparent"
                      onClick={() => setShowChangeContract(true)}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      发起变更
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={() => setShowTerminateContract(true)}
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      废止合同
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    下载PDF
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Printer className="w-4 h-4 mr-2" />
                    打印合同
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Contract Sheet */}
      <Sheet open={showCreateContract} onOpenChange={setShowCreateContract}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl overflow-hidden">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              {newContractStep > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => setNewContractStep(newContractStep - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              <SheetTitle>
                新建合同 ({newContractStep}/4)
              </SheetTitle>
            </div>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(90vh-140px)] py-4">
            {/* Step 1: Select Template */}
            {newContractStep === 1 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">请选择合同模板</p>
                {contractTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className={cn(
                      "border-0 shadow-sm cursor-pointer transition-all",
                      selectedTemplate?.id === template.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{template.description}</p>
                        </div>
                        <Badge variant="outline">
                          {template.parties === 3 ? "三方协议" : "双方协议"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  className="w-full mt-4"
                  disabled={!selectedTemplate}
                  onClick={() => setNewContractStep(2)}
                >
                  下一步：选择公司抬头
                </Button>
              </div>
            )}

            {/* Step 2: Select Company */}
            {newContractStep === 2 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">请选择签约公司抬头</p>
                {companyHeaders.map((company) => (
                  <Card 
                    key={company.id}
                    className={cn(
                      "border-0 shadow-sm cursor-pointer transition-all",
                      selectedCompany?.id === company.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{company.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            统一社会信用代码：{company.license}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  className="w-full mt-4"
                  disabled={!selectedCompany}
                  onClick={() => setNewContractStep(3)}
                >
                  下一步：填写签约方信息
                </Button>
              </div>
            )}

            {/* Step 3: Party Info */}
            {newContractStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">请填写签约方信息</p>
                
                {/* Employer Info */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">乙方（雇主）信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">姓名</Label>
                      <Input 
                        placeholder="请输入雇主姓名"
                        value={newContract.employerName}
                        onChange={(e) => setNewContract({...newContract, employerName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">手机号</Label>
                      <Input 
                        placeholder="请输入雇主手机号"
                        value={newContract.employerPhone}
                        onChange={(e) => setNewContract({...newContract, employerPhone: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Caregiver Info (for 3-party contracts) */}
                {selectedTemplate?.parties === 3 && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">丙方（服务人员）信息</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs">姓名</Label>
                        <Input 
                          placeholder="请输入服务人员姓名"
                          value={newContract.caregiverName}
                          onChange={(e) => setNewContract({...newContract, caregiverName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">手机号</Label>
                        <Input 
                          placeholder="请输入服务人员手机号"
                          value={newContract.caregiverPhone}
                          onChange={(e) => setNewContract({...newContract, caregiverPhone: e.target.value})}
                        />
                      </div>
                      {/* Insurance Check */}
                      <div className="p-3 bg-amber-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-700">保险状态检查</span>
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                            查看保险
                          </Button>
                        </div>
                        <p className="text-xs text-amber-600 mt-1">
                          请确认服务人员保险有效，如需迁移保险请先完成操作
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button 
                  className="w-full"
                  onClick={() => setNewContractStep(4)}
                >
                  下一步：填写服务信息
                </Button>
              </div>
            )}

            {/* Step 4: Service Info */}
            {newContractStep === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">请填写服务信息</p>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <Label className="text-xs">服务内容</Label>
                      <Textarea 
                        placeholder="请输入服务内容描述"
                        value={newContract.serviceContent}
                        onChange={(e) => setNewContract({...newContract, serviceContent: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">合同金额（元）</Label>
                      <Input 
                        type="number"
                        placeholder="请输入合同金额"
                        value={newContract.amount || ""}
                        onChange={(e) => setNewContract({...newContract, amount: Number(e.target.value)})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">服务开始日期</Label>
                        <Input 
                          type="date"
                          value={newContract.startDate}
                          onChange={(e) => setNewContract({...newContract, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">服务结束日期</Label>
                        <Input 
                          type="date"
                          value={newContract.endDate}
                          onChange={(e) => setNewContract({...newContract, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview Card */}
                <Card className="border-0 shadow-sm bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      合同预览
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">合同模板</span>
                      <span className="font-medium">{selectedTemplate?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">签约公司</span>
                      <span className="font-medium">{selectedCompany?.shortName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">雇主</span>
                      <span className="font-medium">{newContract.employerName || "-"}</span>
                    </div>
                    {selectedTemplate?.parties === 3 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">服务人员</span>
                        <span className="font-medium">{newContract.caregiverName || "-"}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">合同金额</span>
                      <span className="font-bold text-primary">
                        {newContract.amount ? `¥${newContract.amount.toLocaleString()}` : "-"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <FileSignature className="w-4 h-4 mr-2" />
                    生成合同并发送签署
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    预览PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Change Contract Dialog */}
      <Dialog open={showChangeContract} onOpenChange={setShowChangeContract}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>发起合同变更</DialogTitle>
            <DialogDescription>
              变更将生成补充协议，关联原合同
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-xs">变更类型</Label>
              <Select 
                value={changeData.changeType} 
                onValueChange={(value) => setChangeData({...changeData, changeType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择变更类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caregiver_change">更换服务人员</SelectItem>
                  <SelectItem value="date_change">变更服务日期</SelectItem>
                  <SelectItem value="amount_change">变更合同金额</SelectItem>
                  <SelectItem value="content_change">变更服务内容</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">变更原因</Label>
              <Textarea 
                placeholder="请输入变更原因"
                value={changeData.reason}
                onChange={(e) => setChangeData({...changeData, reason: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">原内容</Label>
                <Input 
                  placeholder="原内容"
                  value={changeData.oldValue}
                  onChange={(e) => setChangeData({...changeData, oldValue: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-xs">新内容</Label>
                <Input 
                  placeholder="新内容"
                  value={changeData.newValue}
                  onChange={(e) => setChangeData({...changeData, newValue: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeContract(false)}>
              取消
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              生成补充协议
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terminate Contract Dialog */}
      <Dialog open={showTerminateContract} onOpenChange={setShowTerminateContract}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Ban className="w-5 h-5" />
              废止合同
            </DialogTitle>
            <DialogDescription>
              废止后合同将终止执行，请谨慎操作
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-xs">废止原因</Label>
              <Textarea 
                placeholder="请输入废止原因"
                value={terminateData.reason}
                onChange={(e) => setTerminateData({...terminateData, reason: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">退款金额（元）</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={terminateData.refundAmount || ""}
                  onChange={(e) => setTerminateData({...terminateData, refundAmount: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label className="text-xs">赔付金额（元）</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={terminateData.compensationAmount || ""}
                  onChange={(e) => setTerminateData({...terminateData, compensationAmount: Number(e.target.value)})}
                />
              </div>
            </div>
            <Card className="border-0 shadow-sm bg-amber-50">
              <CardContent className="p-3">
                <p className="text-xs text-amber-700">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  废止合同后将自动触发退款/赔付流程，请确认金额无误
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTerminateContract(false)}>
              取消
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              确认废止
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Signature Modal */}
      {showSignatureModal && selectedContract && (
        <SignaturePad
          onSign={handleSignContract}
          onClose={() => setShowSignatureModal(false)}
          contractTitle={selectedContract.title}
        />
      )}
    </div>
  )
}
