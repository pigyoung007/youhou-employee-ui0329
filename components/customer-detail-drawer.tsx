"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Phone, Edit3, Plus, ChevronDown, ChevronUp, Eye, ExternalLink, X, Star, Check
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomerInfo {
  id: string
  name: string
  avatar?: string
  phone: string
  wechat?: string
  consultant: string
  status: string
  statusProgress: number
  tags: string[]
  // 基本信息
  fullName: string
  starLevel: number
  source: string
  ethnicity: string
  gender: string
  maternityConsultant: string
  referralInfo?: string
  // 自定义信息
  dueDate?: string
  babyBirthDate?: string
  motherAge?: number
  birthdayReminder?: boolean
}

interface FollowUpRecord {
  id: string
  date: string
  consultant: string
  type: string
  time: string
  status: string
  content: string
  contactPhone: string
  callDuration?: string
}

interface CustomerDetailDrawerProps {
  open: boolean
  onClose: () => void
  customer: CustomerInfo | null
  followUpRecords?: FollowUpRecord[]
}

const defaultCustomer: CustomerInfo = {
  id: "1",
  name: "刘女士",
  phone: "138****5678",
  wechat: "liu_wechat",
  consultant: "张顾问",
  status: "入库",
  statusProgress: 65,
  tags: ["高净值", "复购客户"],
  fullName: "刘女士",
  starLevel: 4,
  source: "美团推广",
  ethnicity: "汉族",
  gender: "女",
  maternityConsultant: "张顾问",
  dueDate: "2025-03-15",
  motherAge: 30,
  birthdayReminder: false,
}

const defaultFollowUps: FollowUpRecord[] = [
  {
    id: "1",
    date: "2025-03-18",
    consultant: "张顾问",
    type: "电话跟进",
    time: "10:15",
    status: "已接通",
    content: "电话沟通服务需求",
    contactPhone: "138****5678",
    callDuration: "5分32秒",
  },
  {
    id: "2",
    date: "2025-03-17",
    consultant: "张顾问",
    type: "电话跟进",
    time: "14:30",
    status: "已接通",
    content: "初次联系，了解客户需求",
    contactPhone: "138****5678",
    callDuration: "3分15秒",
  },
]

export function CustomerDetailDrawer({
  open,
  onClose,
  customer = defaultCustomer,
  followUpRecords = defaultFollowUps,
}: CustomerDetailDrawerProps) {
  const [activeArchive, setActiveArchive] = useState<"customer" | "student" | "domestic">("customer")
  const [activeTab, setActiveTab] = useState("followup")
  const [basicInfoExpanded, setBasicInfoExpanded] = useState(true)
  const [customInfoExpanded, setCustomInfoExpanded] = useState(true)
  const [followUpTypeFilter, setFollowUpTypeFilter] = useState("all")
  const [operatorFilter, setOperatorFilter] = useState("all")

  if (!customer) return null

  const archiveTabs = [
    { key: "customer", label: "客户档案" },
    { key: "student", label: "学员档案" },
    { key: "domestic", label: "家政员档案" },
  ]

  const subTabs = [
    { key: "followup", label: "跟进信息" },
    { key: "contract", label: "合同" },
    { key: "order", label: "订单" },
    { key: "task", label: "任务" },
    { key: "review", label: "评价" },
    { key: "file", label: "文件" },
    { key: "points", label: "积分" },
  ]

  const basicInfoFields = [
    { label: "客户全名 *", value: customer.fullName, editable: true },
    { label: "客户星级", value: customer.starLevel, type: "star" },
    { label: "手机 *", value: customer.phone, sublabel: "银川市金凤区正源街瑞银财富中心", editable: true },
    { label: "微信号", value: customer.wechat, editable: true },
    { label: "客户来源", value: customer.source, editable: true },
    { label: "民族", value: customer.ethnicity, editable: true },
    { label: "性别", value: customer.gender },
  ]

  const customInfoFields = [
    { label: "预产期", value: customer.dueDate || "-", editable: true },
    { label: "宝宝出生日期", value: customer.babyBirthDate || "-", editable: true },
    { label: "宝妈年龄", value: customer.motherAge ? `${customer.motherAge}岁` : "-", editable: true },
    { label: "宝妈生日提醒", value: customer.birthdayReminder, type: "toggle" },
  ]

  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent side="right" className="w-full max-w-5xl p-0 flex flex-col h-full">
        <SheetTitle className="sr-only">客户详情</SheetTitle>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <h2 className="font-semibold">客户详情</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Customer Info */}
          <div className="w-80 border-r border-border flex flex-col overflow-y-auto bg-background">
            {/* Customer Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start gap-3">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-medium">
                    {customer.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{customer.name}</h3>
                    <Button size="sm" className="h-8 w-8 p-0 rounded-full bg-green-500 hover:bg-green-600">
                      <Phone className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{customer.consultant} 跟进</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{customer.status}</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    <div className="flex-1">
                      <Progress value={customer.statusProgress} className="h-1.5" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {customer.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        className={cn(
                          "text-[10px]",
                          idx === 0 ? "bg-orange-500 text-white" : "bg-green-500 text-white"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                    <Button size="sm" variant="outline" className="h-5 text-[10px] px-1.5 py-0 bg-transparent">
                      <Plus className="w-2.5 h-2.5 mr-0.5" />标签
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completeness */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">个人客户</span>
                  <span className="text-xs text-muted-foreground">资料完整度 36%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Basic Info Section */}
            <div className="border-b border-border">
              <button 
                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50"
                onClick={() => setBasicInfoExpanded(!basicInfoExpanded)}
              >
                <span className="font-semibold text-sm">基本信息</span>
                {basicInfoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {basicInfoExpanded && (
                <div className="px-4 pb-3 space-y-2.5">
                  {basicInfoFields.map((field, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2">
                      <span className="text-xs text-muted-foreground shrink-0">{field.label}</span>
                      <div className="flex items-center gap-1 text-right">
                        {field.type === "star" ? (
                          <div className="flex">
                            {[1,2,3,4,5].map((i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "w-3.5 h-3.5",
                                  i <= (field.value as number) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )} 
                              />
                            ))}
                          </div>
                        ) : (
                          <>
                            <div>
                              <span className="text-xs font-medium">{field.value as string}</span>
                              {field.sublabel && (
                                <p className="text-[10px] text-muted-foreground">{field.sublabel}</p>
                              )}
                            </div>
                            {field.editable && (
                              <Button size="sm" variant="ghost" className="h-5 w-5 p-0 shrink-0">
                                <Edit3 className="w-3 h-3 text-muted-foreground" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Info Section */}
            <div className="border-b border-border">
              <button 
                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50"
                onClick={() => setCustomInfoExpanded(!customInfoExpanded)}
              >
                <span className="font-semibold text-sm">客户自定义信息</span>
                {customInfoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {customInfoExpanded && (
                <div className="px-4 pb-3 space-y-2.5">
                  {customInfoFields.map((field, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">{field.label}</span>
                      <div className="flex items-center gap-1">
                        {field.type === "toggle" ? (
                          <div className="flex items-center gap-1.5">
                            <div className={cn(
                              "w-8 h-4 rounded-full transition-colors",
                              field.value ? "bg-primary" : "bg-muted"
                            )}>
                              <div className={cn(
                                "w-3 h-3 rounded-full bg-white shadow transition-transform mt-0.5",
                                field.value ? "translate-x-4.5 ml-0.5" : "translate-x-0.5"
                              )} />
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {field.value ? "已开启" : "未开启"}
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="text-xs font-medium">{field.value as string}</span>
                            {field.editable && (
                              <Button size="sm" variant="ghost" className="h-5 w-5 p-0 shrink-0">
                                <Edit3 className="w-3 h-3 text-muted-foreground" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground">
                    <Plus className="w-3 h-3 mr-1" />
                    新增自定义信息类别
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Archives */}
          <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
            {/* Archive Type Tabs */}
            <div className="px-4 pt-4">
              <Tabs value={activeArchive} onValueChange={(v) => setActiveArchive(v as typeof activeArchive)}>
                <TabsList className="bg-muted/50 p-0.5 rounded-lg">
                  {archiveTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.key}
                      value={tab.key}
                      className="px-6 py-1.5 text-xs rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Sub Tabs */}
            <div className="px-4 pt-3 pb-2 border-b border-border">
              <div className="flex gap-1">
                {subTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded transition-colors",
                      activeTab === tab.key
                        ? "bg-primary/10 text-primary border border-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "followup" && (
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">跟进信息</h3>
                    <div className="flex items-center gap-2">
                      <select 
                        className="text-xs px-2 py-1.5 border border-input rounded bg-background"
                        value={followUpTypeFilter}
                        onChange={(e) => setFollowUpTypeFilter(e.target.value)}
                      >
                        <option value="all">全部类型</option>
                        <option value="phone">电话跟进</option>
                        <option value="wechat">微信跟进</option>
                        <option value="visit">上门拜访</option>
                      </select>
                      <select 
                        className="text-xs px-2 py-1.5 border border-input rounded bg-background"
                        value={operatorFilter}
                        onChange={(e) => setOperatorFilter(e.target.value)}
                      >
                        <option value="all">全部操作人</option>
                        <option value="zhang">张顾问</option>
                        <option value="li">李顾问</option>
                      </select>
                      <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary/90">
                        添加跟进
                      </Button>
                    </div>
                  </div>

                  {/* Follow Up Records */}
                  {followUpRecords.map((record) => (
                    <div key={record.id}>
                      <p className="text-xs text-muted-foreground mb-2">{record.date}</p>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-muted text-xs">
                                  {record.consultant[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{record.consultant}</p>
                                <p className="text-[10px] text-muted-foreground">
                                  {record.type} | {record.time}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              className={cn(
                                "text-[10px]",
                                record.status === "已接通" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-red-100 text-red-700"
                              )}
                            >
                              {record.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="text-muted-foreground">跟进内容</p>
                              <p className="font-medium mt-0.5">{record.content}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">联系电话</p>
                              <p className="font-medium mt-0.5">{record.contactPhone}</p>
                            </div>
                            {record.callDuration && (
                              <div>
                                <p className="text-muted-foreground">通话时长</p>
                                <p className="font-medium mt-0.5">{record.callDuration}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "contract" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">暂无合同记录</p>
                </div>
              )}

              {activeTab === "order" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">暂无订单记录</p>
                </div>
              )}

              {activeTab === "task" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">暂无任务记录</p>
                </div>
              )}

              {activeTab === "review" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">暂无评价记录</p>
                </div>
              )}

              {activeTab === "file" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">暂无文件记录</p>
                </div>
              )}

              {activeTab === "points" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">暂无积分记录</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
