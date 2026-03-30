"use client"

/**
 * 结构与字段对齐 youhou-admin-ui0329 `UnifiedCustomerDetailPanel`：
 * - 上方固定客户信息区（头像、基本信息、自定义信息）
 * - 一级 Tab：客户档案 | 学员档案 | 家政员档案
 * - 客户档案二级：跟进信息、合同、订单、任务、评价、文件、积分
 * - 学员档案二级：课程信息、报名记录、考试成绩、证书信息
 * - 家政员档案二级：简历、档期、等级、征信、保证金、服务记录
 */

import { useEffect, useMemo, useState } from "react"
import { OrderConsultantLines } from "@/components/order-consultant-lines"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Phone,
  Edit3,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  ExternalLink,
  Star,
  BookOpen,
  Award,
  Shield,
  Calendar,
  ChevronRight,
  CheckCircle,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NannyResumeShareView,
  buildNannyResumeData,
  type NannyResumeShareData,
} from "@/components/nanny-resume-share-view"
import type { ScheduleOverviewSegment } from "@/components/employee/schedule-overview-bar"
import {
  DEFAULT_NANNY_SCHEDULE_SEGMENTS,
  NannyScheduleTabContent,
  resolveScheduleBannerTone,
  resolveScheduleStatusHint,
} from "@/components/employee/nanny-schedule-tab-content"

// ============ 类型（与 admin 统一客户详情对齐） ============

export interface CustomerInfo {
  id: string
  name: string
  avatar?: string
  phone: string
  wechat?: string
  consultant: string
  status: string
  statusProgress: number
  tags: string[]
  fullName: string
  starLevel: number
  source: string
  ethnicity: string
  gender: string
  maternityConsultant: string
  referralInfo?: string
  /** 手机下方归属地/备注（无则服务场景下不展示长文案） */
  phoneLocation?: string
  /** 资料完整度 0–100，默认 36 */
  profileCompleteness?: number
  dueDate?: string
  babyBirthDate?: string
  motherAge?: number
  birthdayReminder?: boolean
  /** 培训线索：意向课程、阶段、跟进（与 admin 学员侧字段对齐） */
  trainingIntent?: string
  leadStageLabel?: string
  nextFollowUp?: string
  trainingNotes?: string
}

export interface FollowUpRecord {
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

export interface CourseRecord {
  id: string
  courseName: string
  courseType: string
  teacher: string
  startDate: string
  endDate: string
  progress: number
  status: "not_started" | "in_progress" | "completed"
  totalHours: number
  attendedHours: number
}

export interface EnrollmentRecord {
  id: string
  courseName: string
  enrollDate: string
  amount: number
  paymentStatus: "unpaid" | "partial" | "paid"
  orderNo: string
}

export interface ExamRecord {
  id: string
  examName: string
  courseName: string
  examDate: string
  score: number
  totalScore: number
  passed: boolean
  rank?: number
}

export interface CertificateRecord {
  id: string
  certName: string
  certType: "training" | "skill" | "qualification"
  issueDate: string
  certNo: string
  validUntil?: string
  status: "issued" | "pending" | "received" | "pending_upload"
}

export interface ContractRecord {
  id: string
  contractNo: string
  title: string
  status: "signed" | "pending" | "expired"
  signDate?: string
  schedule?: string
  nannyLevel?: string
  consultantName?: string
  serviceTime?: string
}

export interface OrderRecord {
  id: string
  orderNo: string
  serviceName: string
  amount: number
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  date: string
  maternityConsultant?: string
  careerConsultant?: string
}

export interface TaskRecord {
  id: string
  title: string
  status: "pending" | "in_progress" | "completed"
  dueDate: string
  assignee: string
}

/** 兼容旧 props：用于合并默认学员展示字段 */
export interface StudentArchiveInfo {
  displayName: string
  courseCategory: string
  courseName: string
  progressPercent: number
  examStatus: string
  enrollDate: string
  studyHours: string
  certificate: string
  consultant: string
  tags?: string[]
}

export interface DomesticArchiveInfo {
  displayName: string
  serviceType: string
  level: string
  workStatus: string
  ordersCompleted: number
  rating: number
  lastServiceDate?: string
  consultant: string
  tags?: string[]
  /** 档期示图条分段（无则使用默认演示数据） */
  scheduleSegments?: ScheduleOverviewSegment[]
  scheduleIdleDays?: number
  scheduleOnJobDays?: number
  scheduleVacationDays?: number
}

export type ArchiveId = "customer" | "student" | "domestic"

interface CustomerDetailDrawerProps {
  open: boolean
  onClose: () => void
  customer: CustomerInfo | null
  followUpRecords?: FollowUpRecord[]
  studentArchive?: Partial<StudentArchiveInfo> | null
  domesticArchive?: Partial<DomesticArchiveInfo> | null
  defaultArchive?: ArchiveId
  /** 默认可展示的全部档案 Tab，与 admin `availableArchives` 一致 */
  availableArchives?: ArchiveId[]
  courses?: CourseRecord[]
  enrollments?: EnrollmentRecord[]
  exams?: ExamRecord[]
  certificates?: CertificateRecord[]
  contracts?: ContractRecord[]
  orders?: OrderRecord[]
  tasks?: TaskRecord[]
  /** 家政员简历（与分享页同源字段），可与 domesticArchive 叠加 */
  nannyResume?: Partial<NannyResumeShareData>
  /**
   * `service`：家政/母婴线索，展示孕产向自定义信息（与管理端默认一致）
   * `training`：职业顾问培训线索，展示学员扩展信息 + 所属职业顾问
   */
  detailMode?: "service" | "training"
  /** 客户档案 · 订单 Tab：新建订单（与全局新建订单一致） */
  onNewOrder?: () => void
  /** 客户档案 · 订单 Tab：新建收据（与新建订单第 3 步账单一致） */
  onNewReceipt?: () => void
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

const MOCK_COURSES: CourseRecord[] = [
  {
    id: "1",
    courseName: "高级月嫂培训班",
    courseType: "技能培训",
    teacher: "张老师",
    startDate: "2025-03-01",
    endDate: "2025-03-15",
    progress: 80,
    status: "in_progress",
    totalHours: 40,
    attendedHours: 32,
  },
]

const MOCK_ENROLLMENTS: EnrollmentRecord[] = [
  { id: "1", courseName: "高级月嫂培训班", enrollDate: "2025-02-25", amount: 3980, paymentStatus: "paid", orderNo: "EDU2025022500001" },
]

const MOCK_EXAMS: ExamRecord[] = [
  { id: "1", examName: "母乳喂养理论考试", courseName: "母乳喂养指导", examDate: "2025-03-12", score: 92, totalScore: 100, passed: true, rank: 3 },
]

const MOCK_CERTS: CertificateRecord[] = [
  { id: "1", certName: "高级母婴护理师证书", certType: "skill", issueDate: "2025-03-15", certNo: "CERT2025031500001", status: "issued" },
]

const MOCK_CONTRACTS: ContractRecord[] = [
  {
    id: "1",
    contractNo: "HT2025031800001",
    title: "月嫂服务合同",
    status: "signed",
    signDate: "2025-03-15",
    schedule: "2025-04-01 至 2025-04-26",
    nannyLevel: "金牌月嫂",
    consultantName: "张顾问",
    serviceTime: "26天",
  },
]

const MOCK_ORDERS: OrderRecord[] = [
  {
    id: "1",
    orderNo: "DD2025031800001",
    serviceName: "金牌月嫂服务-26天",
    amount: 28800,
    status: "in_progress",
    date: "2025-03-10",
    maternityConsultant: "张丽",
    careerConsultant: "陈明",
  },
]

const MOCK_TASKS: TaskRecord[] = [
  { id: "1", title: "电话回访确认服务满意度", status: "pending", dueDate: "2025-03-20", assignee: "张顾问" },
]

function buildStudentMerge(c: CustomerInfo, o?: Partial<StudentArchiveInfo> | null): Partial<StudentArchiveInfo> | undefined {
  if (!o) return undefined
  return {
    displayName: c.name,
    courseCategory: "职业培训",
    courseName: "高级月嫂全科班",
    progressPercent: 68,
    examStatus: "待考",
    enrollDate: "2025-11-01",
    studyHours: "32/48 课时",
    certificate: "暂无",
    consultant: c.consultant,
    tags: ["学习中"],
    ...o,
  }
}

const subTabBtn =
  "shrink-0 border-b-2 border-transparent px-3 py-2 text-xs text-muted-foreground transition-colors"
const subTabActive = "border-primary text-primary font-medium"

export function CustomerDetailDrawer({
  open,
  onClose,
  customer,
  followUpRecords = defaultFollowUps,
  studentArchive: studentOverride,
  domesticArchive,
  defaultArchive = "customer",
  availableArchives = ["customer", "student", "domestic"],
  courses: coursesProp,
  enrollments: enrollmentsProp,
  exams: examsProp,
  certificates: certificatesProp,
  contracts: contractsProp,
  orders: ordersProp,
  tasks: tasksProp,
  nannyResume: nannyResumeProp,
  detailMode = "service",
  onNewOrder,
  onNewReceipt,
}: CustomerDetailDrawerProps) {
  const [primaryTab, setPrimaryTab] = useState<ArchiveId>(defaultArchive)
  const [customerTab, setCustomerTab] = useState("activities")
  const [studentTab, setStudentTab] = useState("courses")
  const [nannyTab, setNannyTab] = useState("resume")
  const [basicInfoExpanded, setBasicInfoExpanded] = useState(true)
  const [customInfoExpanded, setCustomInfoExpanded] = useState(true)
  const [followUpTypeFilter, setFollowUpTypeFilter] = useState("all")
  const [operatorFilter, setOperatorFilter] = useState("all")
  const [birthdayOn, setBirthdayOn] = useState(() => customer?.birthdayReminder ?? false)

  const archivesKey = availableArchives.join(",")

  useEffect(() => {
    if (!open) return
    const archives = availableArchives
    if (archives.includes(defaultArchive)) {
      setPrimaryTab(defaultArchive)
      return
    }
    setPrimaryTab((prev) => (archives.includes(prev) ? prev : archives[0] ?? "customer"))
  }, [open, defaultArchive, archivesKey])

  useEffect(() => {
    setBirthdayOn(customer?.birthdayReminder ?? false)
  }, [customer?.id, customer?.birthdayReminder])

  const mergedStudent = useMemo(
    () => (customer ? buildStudentMerge(customer, studentOverride ?? undefined) : undefined),
    [customer, studentOverride],
  )

  const courses = useMemo(() => {
    const base = coursesProp ?? [...MOCK_COURSES]
    if (mergedStudent?.courseName && base[0]) {
      const first = { ...base[0], courseName: mergedStudent.courseName }
      if (mergedStudent.courseCategory) first.courseType = mergedStudent.courseCategory
      return [first, ...base.slice(1)]
    }
    return base
  }, [coursesProp, mergedStudent])

  const enrollments = enrollmentsProp ?? MOCK_ENROLLMENTS
  const exams = examsProp ?? MOCK_EXAMS
  const certificates = certificatesProp ?? MOCK_CERTS
  const contracts = contractsProp ?? MOCK_CONTRACTS
  const orders = ordersProp ?? MOCK_ORDERS
  const tasks = tasksProp ?? MOCK_TASKS

  const nannyResumeMerged = useMemo(
    () =>
      buildNannyResumeData(
        {
          name: customer?.name ?? "",
          avatar: customer?.avatar,
          subtitle: domesticArchive
            ? [domesticArchive.level, domesticArchive.serviceType].filter(Boolean).join(" · ")
            : undefined,
        },
        nannyResumeProp,
      ),
    [customer?.name, customer?.avatar, domesticArchive, nannyResumeProp],
  )

  const isTraining = detailMode === "training"
  const consultantRoleLabel = isTraining ? "所属职业顾问" : "所属母婴顾问"

  const basicInfoFields = useMemo(() => {
    if (!customer) return [] as { label: string; value: string | number | boolean; sublabel?: string; editable?: boolean; type?: "star" }[]
    return [
      { label: "客户全名 *", value: customer.fullName, editable: true },
      { label: "客户星级", value: customer.starLevel, type: "star" as const },
      {
        label: "手机 *",
        value: customer.phone,
        sublabel: customer.phoneLocation ?? (isTraining ? undefined : "银川市金凤区正源街瑞银财富中心"),
        editable: true,
      },
      { label: "微信号", value: customer.wechat, editable: true },
      { label: "客户来源", value: customer.source, editable: true },
      { label: "民族", value: customer.ethnicity, editable: true },
      { label: "性别", value: customer.gender },
      { label: consultantRoleLabel, value: customer.consultant, editable: false },
      { label: "转介绍情况", value: customer.referralInfo || "-", editable: true },
    ]
  }, [customer, consultantRoleLabel, isTraining])

  const customInfoFields = useMemo(() => {
    if (!customer) return []
    if (isTraining) {
      return [
        { label: "意向课程", value: customer.trainingIntent || "-", editable: true },
        { label: "线索阶段", value: customer.leadStageLabel || "-", editable: false },
        { label: "下次跟进", value: customer.nextFollowUp || "-", editable: true },
        { label: "备注", value: customer.trainingNotes || "-", editable: true },
      ]
    }
    return [
      { label: "预产期", value: customer.dueDate || "-", editable: true },
      { label: "宝宝出生日期", value: customer.babyBirthDate || "-", editable: true },
      { label: "宝妈年龄", value: customer.motherAge ? `${customer.motherAge}岁` : "-", editable: true },
      { label: "宝妈生日提醒", value: birthdayOn, type: "toggle" as const },
    ]
  }, [isTraining, customer, birthdayOn])

  if (!customer) return null

  const selectClass =
    "border-input bg-background text-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-xs shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"

  const filteredFollowUps = followUpRecords

  const showArchive = (id: ArchiveId) => availableArchives.includes(id)

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <SheetContent
        side="right"
        className="flex h-dvh max-h-dvh w-full max-w-md flex-col gap-0 overflow-hidden py-0"
      >
        <SheetTitle className="sr-only">客户详情</SheetTitle>

        <div className="border-border shrink-0 border-b px-3 pb-3 pt-1">
          <div className="drawer-kv-row-head items-center">
            <h2 className="text-foreground min-w-0 pr-2 text-base font-semibold">客户详情</h2>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground h-9 w-9 shrink-0"
              aria-label="在外部打开"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4">
          {/* ========== 固定客户信息区（对齐 admin 左侧） ========== */}
          <section className="border-border bg-card mt-2 rounded-xl border p-4 shadow-sm">
            <div className="flex gap-3">
              <Avatar className="h-14 w-14 shrink-0 border border-border">
                <AvatarImage src={customer.avatar} alt="" />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                  {customer.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <h3 className="text-foreground truncate text-lg font-semibold">{customer.name}</h3>
                  <Button
                    type="button"
                    size="icon"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 shrink-0 rounded-full"
                    aria-label="拨打电话"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-0.5 text-sm">{customer.consultant} 跟进</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-muted-foreground text-xs">{customer.status}</span>
                  <ChevronDown className="text-muted-foreground h-3 w-3 shrink-0" />
                  <div className="min-w-[120px] flex-1">
                    <Progress value={customer.statusProgress} className="h-1.5" />
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {customer.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="border-border/60 text-foreground text-[10px] font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-muted-foreground h-6 border-dashed px-2 py-0 text-[10px]"
                  >
                    <Plus className="mr-0.5 h-2.5 w-2.5" />
                    标签
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className="border-border mt-3 flex items-center justify-between border-b py-3">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span>{isTraining ? "培训学员" : "个人客户"}</span>
              <span className="text-foreground/80">
                资料完整度 {customer.profileCompleteness ?? 36}%
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <Button type="button" size="icon" variant="ghost" className="text-muted-foreground h-8 w-8">
                <Eye className="h-3.5 w-3.5" />
              </Button>
              <Button type="button" size="icon" variant="ghost" className="text-muted-foreground h-8 w-8">
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="border-border border-b">
            <button
              type="button"
              className="hover:bg-muted/50 flex w-full items-center justify-between py-3 text-left"
              onClick={() => setBasicInfoExpanded(!basicInfoExpanded)}
            >
              <span className="text-foreground text-sm font-semibold">基本信息</span>
              {basicInfoExpanded ? (
                <ChevronUp className="text-muted-foreground h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0" />
              )}
            </button>
            {basicInfoExpanded && (
              <div className="border-border space-y-3 border-t pb-3 pt-2">
                {basicInfoFields.map((field, idx) => (
                  <div key={idx} className="drawer-kv-row">
                    <span className="text-muted-foreground text-xs leading-snug">{field.label}</span>
                    <div className="min-w-0">
                      {field.type === "star" ? (
                        <div className="flex shrink-0 flex-wrap gap-0">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3.5 w-3.5",
                                i <= (field.value as number)
                                  ? "fill-amber-400 text-amber-500"
                                  : "text-muted-foreground/40",
                              )}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-start gap-1">
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <span className="text-foreground block text-xs font-medium break-words">
                              {String(field.value)}
                            </span>
                            {field.sublabel && (
                              <p className="text-muted-foreground text-[10px] leading-relaxed break-words">
                                {field.sublabel}
                              </p>
                            )}
                          </div>
                          {field.editable !== false && (
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="text-muted-foreground -mt-0.5 h-6 w-6 shrink-0"
                              aria-label={`编辑${field.label}`}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-border border-b">
            <button
              type="button"
              className="hover:bg-muted/50 flex w-full items-center justify-between py-3 text-left"
              onClick={() => setCustomInfoExpanded(!customInfoExpanded)}
            >
              <span className="text-foreground text-sm font-semibold">
                {isTraining ? "学员扩展信息" : "客户自定义信息"}
              </span>
              {customInfoExpanded ? (
                <ChevronUp className="text-muted-foreground h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0" />
              )}
            </button>
            {customInfoExpanded && (
              <div className="border-border space-y-3 border-t pb-3 pt-2">
                {customInfoFields.map((field, idx) => (
                  <div key={idx} className="drawer-kv-row">
                    <span className="text-muted-foreground text-xs leading-snug">{field.label}</span>
                    <div className="min-w-0">
                      {field.type === "toggle" ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <Switch
                            checked={field.value as boolean}
                            onCheckedChange={setBirthdayOn}
                            aria-label="宝妈生日提醒"
                          />
                          <span className="text-muted-foreground text-[10px]">
                            {(field.value as boolean) ? "已开启" : "未开启"}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-start gap-1">
                          <span className="min-w-0 flex-1 text-xs font-medium break-words text-foreground">
                            {String(field.value)}
                          </span>
                          {field.editable !== false && (
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="text-muted-foreground -mt-0.5 h-6 w-6 shrink-0"
                              aria-label={`编辑${field.label}`}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground h-9 w-full text-xs"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  新增自定义信息类别
                </Button>
              </div>
            )}
          </div>

          {/* ========== 一级档案 Tab（对齐 admin 右侧） ========== */}
          <div className="bg-background sticky top-0 z-[2] mt-3 border-b border-border pb-0 pt-2">
            <Tabs value={primaryTab} onValueChange={(v) => setPrimaryTab(v as ArchiveId)} className="w-full">
              <TabsList className="bg-muted/40 text-muted-foreground inline-flex h-auto w-full flex-nowrap justify-start gap-0 overflow-x-auto rounded-none p-0">
                {showArchive("customer") && (
                  <TabsTrigger value="customer" className="shrink-0 rounded-none px-3 py-2.5 text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    客户档案
                  </TabsTrigger>
                )}
                {showArchive("student") && (
                  <TabsTrigger value="student" className="shrink-0 rounded-none px-3 py-2.5 text-xs data-[state=active]:bg-background data-[state=active]:text-foreground">
                    学员档案
                  </TabsTrigger>
                )}
                {showArchive("domestic") && (
                  <TabsTrigger value="domestic" className="shrink-0 rounded-none px-3 py-2.5 text-xs data-[state=active]:bg-background data-[state=active]:text-foreground">
                    家政员档案
                  </TabsTrigger>
                )}
              </TabsList>

              {/* —— 客户档案：二级 Tab —— */}
              {showArchive("customer") && (
                <TabsContent value="customer" className="mt-0 space-y-0 p-0 pb-3 data-[state=inactive]:hidden">
                  <div className="w-full">
                    <div className="overflow-x-auto border-b border-border">
                      <div className="flex min-w-max justify-start">
                        <button type="button" onClick={() => setCustomerTab("activities")} className={cn(subTabBtn, customerTab === "activities" && subTabActive)}>跟进信息</button>
                        <button type="button" onClick={() => setCustomerTab("contracts")} className={cn(subTabBtn, customerTab === "contracts" && subTabActive)}>合同</button>
                        <button type="button" onClick={() => setCustomerTab("orders")} className={cn(subTabBtn, customerTab === "orders" && subTabActive)}>订单</button>
                        <button type="button" onClick={() => setCustomerTab("tasks")} className={cn(subTabBtn, customerTab === "tasks" && subTabActive)}>任务</button>
                        <button type="button" onClick={() => setCustomerTab("evaluations")} className={cn(subTabBtn, customerTab === "evaluations" && subTabActive)}>评价</button>
                        <button type="button" onClick={() => setCustomerTab("files")} className={cn(subTabBtn, customerTab === "files" && subTabActive)}>文件</button>
                        <button type="button" onClick={() => setCustomerTab("points")} className={cn(subTabBtn, customerTab === "points" && subTabActive)}>积分</button>
                      </div>
                    </div>

                    {customerTab === "activities" && (
                    <div className="mt-0 p-0 pt-3">
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 gap-2">
                          <select
                            className={selectClass}
                            value={followUpTypeFilter}
                            onChange={(e) => setFollowUpTypeFilter(e.target.value)}
                          >
                            <option value="all">全部类型</option>
                            <option value="phone">电话跟进</option>
                            <option value="wechat">微信跟进</option>
                          </select>
                          <select
                            className={selectClass}
                            value={operatorFilter}
                            onChange={(e) => setOperatorFilter(e.target.value)}
                          >
                            <option value="all">全部操作人</option>
                            <option value="zhang">张顾问</option>
                          </select>
                        </div>
                        <Button
                          type="button"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-full text-sm"
                        >
                          添加跟进
                        </Button>
                        {filteredFollowUps.map((record) => (
                          <div key={record.id}>
                            <p className="text-muted-foreground mb-2 text-xs">{record.date}</p>
                            <Card className="border-border bg-card border shadow-sm">
                              <CardContent className="p-3">
                                <div className="mb-3 flex items-start gap-2">
                                  <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                      {record.consultant[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-foreground text-sm font-medium">{record.consultant}</p>
                                    <p className="text-muted-foreground text-[10px]">
                                      {record.type} · {record.time}
                                    </p>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="border-0 bg-primary/10 text-[10px] text-primary"
                                  >
                                    {record.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-xs">
                                  <div>
                                    <p className="text-muted-foreground">跟进内容</p>
                                    <p className="text-foreground mt-0.5 font-medium break-words">{record.content}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">联系电话</p>
                                    <p className="text-foreground mt-0.5 break-all font-medium">{record.contactPhone}</p>
                                  </div>
                                  {record.callDuration && (
                                    <div>
                                      <p className="text-muted-foreground">通话时长</p>
                                      <p className="text-foreground mt-0.5 font-medium">{record.callDuration}</p>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}

                    {customerTab === "contracts" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      {contracts.map((c) => (
                        <Card key={c.id} className="border-border overflow-hidden border shadow-sm">
                          <CardContent className="space-y-2 p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-foreground text-sm font-medium">{c.title}</p>
                                <p className="text-muted-foreground text-xs">{c.contractNo}</p>
                              </div>
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "shrink-0 text-[10px]",
                                  c.status === "signed" ? "bg-primary/10 text-primary" : "bg-amber-500/15 text-amber-800",
                                )}
                              >
                                {c.status === "signed" ? "已签署" : "待签署"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-xs">
                              <div className="bg-muted/40 rounded-md p-2">
                                <p className="text-muted-foreground">档期（排期）</p>
                                <p className="text-foreground font-medium">{c.schedule || "-"}</p>
                              </div>
                              <div className="bg-muted/40 rounded-md p-2">
                                <p className="text-muted-foreground">月嫂星级</p>
                                <p className="text-foreground font-medium">{c.nannyLevel || "-"}</p>
                              </div>
                              <div className="bg-muted/40 rounded-md p-2">
                                <p className="text-muted-foreground">顾问名称</p>
                                <p className="text-foreground font-medium">{c.consultantName || "-"}</p>
                              </div>
                              <div className="bg-muted/40 rounded-md p-2">
                                <p className="text-muted-foreground">服务时间</p>
                                <p className="text-foreground font-medium">{c.serviceTime || "-"}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {customerTab === "orders" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      {(onNewOrder || onNewReceipt) && (
                        <div className="flex gap-2">
                          {onNewOrder && (
                            <Button
                              type="button"
                              size="sm"
                              className="h-9 flex-1 text-xs"
                              onClick={() => onNewOrder()}
                            >
                              <Plus className="mr-1 h-3.5 w-3.5" />
                              新建订单
                            </Button>
                          )}
                          {onNewReceipt && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-9 flex-1 text-xs bg-transparent"
                              onClick={() => onNewReceipt()}
                            >
                              <FileText className="mr-1 h-3.5 w-3.5" />
                              新建收据
                            </Button>
                          )}
                        </div>
                      )}
                      {orders.map((o) => (
                        <Card key={o.id} className="border-border border shadow-sm">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-foreground text-sm font-medium">{o.serviceName}</p>
                                <p className="text-muted-foreground text-xs">{o.orderNo}</p>
                              </div>
                              <Badge variant="outline" className="shrink-0 text-[10px]">
                                {o.status === "in_progress" ? "进行中" : o.status}
                              </Badge>
                            </div>
                            <OrderConsultantLines
                              maternityConsultant={o.maternityConsultant}
                              careerConsultant={o.careerConsultant}
                              className="mt-1.5"
                            />
                            <p className="text-muted-foreground mt-2 text-xs">{o.date}</p>
                            <p className="text-primary mt-1 text-sm font-semibold tabular-nums">¥{o.amount.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {customerTab === "tasks" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      {tasks.map((t) => (
                        <Card key={t.id} className="border-border border shadow-sm">
                          <CardContent className="p-3">
                            <p className="text-foreground text-sm font-medium">{t.title}</p>
                            <p className="text-muted-foreground mt-1 text-xs">
                              截止 {t.dueDate} · {t.assignee}
                            </p>
                            <Badge variant="secondary" className="mt-2 text-[10px]">
                              {t.status === "pending" ? "待处理" : t.status}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {customerTab === "evaluations" && (
                    <div className="mt-0 p-0 pt-3">
                      <p className="text-muted-foreground py-8 text-center text-sm">暂无评价记录</p>
                    </div>
                    )}
                    {customerTab === "files" && (
                    <div className="mt-0 p-0 pt-3">
                      <p className="text-muted-foreground py-8 text-center text-sm">暂无文件</p>
                    </div>
                    )}
                    {customerTab === "points" && (
                    <div className="mt-0 p-0 pt-3">
                      <Card className="border-border border shadow-sm">
                        <CardContent className="p-3">
                          <p className="text-muted-foreground text-xs">当前积分</p>
                          <p className="text-foreground text-2xl font-bold tabular-nums">1,280</p>
                          <p className="text-muted-foreground mt-2 text-xs">最近变动：签到 +10（2025-03-18）</p>
                        </CardContent>
                      </Card>
                    </div>
                    )}
                  </div>
                </TabsContent>
              )}

              {/* —— 学员档案 —— */}
              {showArchive("student") && (
                <TabsContent value="student" className="mt-0 space-y-0 p-0 pb-3 data-[state=inactive]:hidden">
                  <div className="w-full">
                    <div className="overflow-x-auto border-b border-border">
                      <div className="flex min-w-max justify-start">
                        <button type="button" onClick={() => setStudentTab("courses")} className={cn(subTabBtn, studentTab === "courses" && subTabActive)}>课程信息</button>
                        <button type="button" onClick={() => setStudentTab("enrollments")} className={cn(subTabBtn, studentTab === "enrollments" && subTabActive)}>报名记录</button>
                        <button type="button" onClick={() => setStudentTab("exams")} className={cn(subTabBtn, studentTab === "exams" && subTabActive)}>考试成绩</button>
                        <button type="button" onClick={() => setStudentTab("certificates")} className={cn(subTabBtn, studentTab === "certificates" && subTabActive)}>证书信息</button>
                      </div>
                    </div>

                    {studentTab === "courses" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground text-sm font-medium">已报课程</span>
                        <Button type="button" size="sm" variant="outline" className="h-8 text-xs">
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          添加课程
                        </Button>
                      </div>
                      {courses.map((course) => (
                        <Card key={course.id} className="border-border border shadow-sm">
                          <CardContent className="space-y-2 p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex min-w-0 items-center gap-2">
                                <BookOpen className="text-primary h-4 w-4 shrink-0" />
                                <span className="text-foreground font-medium break-words">{course.courseName}</span>
                              </div>
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "shrink-0 text-[10px]",
                                  course.status === "completed"
                                    ? "bg-primary/10 text-primary"
                                    : course.status === "in_progress"
                                      ? "bg-primary/10 text-primary"
                                      : "bg-muted text-muted-foreground",
                                )}
                              >
                                {course.status === "completed"
                                  ? "已完成"
                                  : course.status === "in_progress"
                                    ? "进行中"
                                    : "未开始"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 gap-1.5 text-xs text-muted-foreground">
                              <span>授课老师：{course.teacher}</span>
                              <span>课程类型：{course.courseType}</span>
                              <span>
                                开课：{course.startDate} · 结束：{course.endDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-muted-foreground text-xs">学习进度</span>
                              <Progress value={course.progress} className="h-2 flex-1" />
                              <span className="text-foreground text-xs font-medium tabular-nums">
                                {course.attendedHours}/{course.totalHours} 课时
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {studentTab === "enrollments" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground text-sm font-medium">报名记录</span>
                        <Button type="button" size="sm" variant="outline" className="h-8 text-xs">
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          新增报名
                        </Button>
                      </div>
                      {enrollments.map((e) => (
                        <Card key={e.id} className="border-border border shadow-sm">
                          <CardContent className="space-y-2 p-3 text-xs">
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">订单号</span>
                              <span className="font-mono text-foreground">{e.orderNo}</span>
                            </div>
                            <p className="text-foreground font-medium">{e.courseName}</p>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">报名日期</span>
                              <span>{e.enrollDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">金额</span>
                              <span className="tabular-nums font-medium">¥{e.amount.toLocaleString()}</span>
                            </div>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "text-[10px]",
                                e.paymentStatus === "paid" ? "bg-primary/10 text-primary" : "bg-amber-500/15 text-amber-900",
                              )}
                            >
                              {e.paymentStatus === "paid" ? "已付款" : e.paymentStatus === "partial" ? "部分付款" : "未付款"}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {studentTab === "exams" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      {exams.map((ex) => (
                        <Card key={ex.id} className="border-border border shadow-sm">
                          <CardContent className="space-y-2 p-3 text-xs">
                            <p className="text-foreground text-sm font-medium">{ex.examName}</p>
                            <p className="text-muted-foreground">关联课程：{ex.courseName}</p>
                            <div className="flex flex-wrap justify-between gap-2">
                              <span className="text-muted-foreground">考试日期 {ex.examDate}</span>
                              <span
                                className={cn(
                                  "font-semibold tabular-nums",
                                  ex.passed ? "text-primary" : "text-destructive",
                                )}
                              >
                                {ex.score}/{ex.totalScore}
                              </span>
                            </div>
                            {ex.rank != null && (
                              <p className="text-muted-foreground">排名：第 {ex.rank} 名</p>
                            )}
                            <Badge
                              variant="secondary"
                              className={cn("text-[10px]", ex.passed ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}
                            >
                              {ex.passed ? "通过" : "未通过"}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {studentTab === "certificates" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      {certificates.map((cert) => (
                        <Card key={cert.id} className="border-border border shadow-sm">
                          <CardContent className="space-y-2 p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex min-w-0 items-center gap-2">
                                <Award className="h-4 w-4 shrink-0 text-amber-500" />
                                <span className="text-foreground text-sm font-medium break-words">{cert.certName}</span>
                              </div>
                              <Badge variant="secondary" className="shrink-0 bg-primary/10 text-[10px] text-primary">
                                {cert.status === "issued" ? "已颁发" : cert.status === "received" ? "已领取" : "待颁发"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                              <span>证书编号：{cert.certNo}</span>
                              <span>颁发日期：{cert.issueDate}</span>
                              {cert.validUntil && <span>有效期至：{cert.validUntil}</span>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}
                  </div>
                </TabsContent>
              )}

              {/* —— 家政员档案（对齐 nanny 六 Tab） —— */}
              {showArchive("domestic") && (
                <TabsContent value="domestic" className="mt-0 space-y-0 p-0 pb-3 data-[state=inactive]:hidden">
                  {domesticArchive && (
                    <Card className="border-border bg-muted/30 mb-2 border shadow-none">
                      <CardContent className="space-y-1 p-3 text-xs">
                        <p className="text-muted-foreground">关联家政员 / 服务需求</p>
                        <p className="text-foreground font-medium">{domesticArchive.displayName}</p>
                        <div className="text-muted-foreground flex flex-wrap gap-x-2 gap-y-1">
                          <span>{domesticArchive.serviceType}</span>
                          <span>·</span>
                          <span>{domesticArchive.level}</span>
                          <span>·</span>
                          <span>{domesticArchive.workStatus}</span>
                        </div>
                        {domesticArchive.tags && domesticArchive.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {domesticArchive.tags.map((t) => (
                              <Badge key={t} variant="secondary" className="text-[10px] font-normal">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                  <div className="w-full">
                    <div className="overflow-x-auto border-b border-border">
                      <div className="flex min-w-max justify-start">
                        <button type="button" onClick={() => setNannyTab("resume")} className={cn(subTabBtn, nannyTab === "resume" && subTabActive)}>简历</button>
                        <button type="button" onClick={() => setNannyTab("schedule")} className={cn(subTabBtn, nannyTab === "schedule" && subTabActive)}>档期</button>
                        <button type="button" onClick={() => setNannyTab("level")} className={cn(subTabBtn, nannyTab === "level" && subTabActive)}>等级</button>
                        <button type="button" onClick={() => setNannyTab("credit")} className={cn(subTabBtn, nannyTab === "credit" && subTabActive)}>征信</button>
                        <button type="button" onClick={() => setNannyTab("deposit")} className={cn(subTabBtn, nannyTab === "deposit" && subTabActive)}>保证金</button>
                        <button type="button" onClick={() => setNannyTab("service")} className={cn(subTabBtn, nannyTab === "service" && subTabActive)}>服务记录</button>
                      </div>
                    </div>

                    {nannyTab === "resume" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      <NannyResumeShareView data={nannyResumeMerged} dense />
                    </div>
                    )}

                    {nannyTab === "schedule" && (
                    <div className="mt-0 p-0 pt-3">
                      <NannyScheduleTabContent
                        segments={domesticArchive?.scheduleSegments?.length ? domesticArchive.scheduleSegments : DEFAULT_NANNY_SCHEDULE_SEGMENTS}
                        year={2026}
                        idleDays={domesticArchive?.scheduleIdleDays ?? 3}
                        onJobDays={domesticArchive?.scheduleOnJobDays ?? 26}
                        vacationDays={domesticArchive?.scheduleVacationDays ?? 0}
                        currentStatus={domesticArchive?.workStatus || "待岗"}
                        statusHint={resolveScheduleStatusHint(domesticArchive?.workStatus || "待岗")}
                        bannerTone={resolveScheduleBannerTone(domesticArchive?.workStatus || "待岗")}
                        bookings={[
                          { id: "1", name: "张女士", range: "2025-03-20 ~ 2025-04-20", st: "已确认" },
                          { id: "2", name: "李女士", range: "2025-04-25 ~ 2025-05-25", st: "待确认" },
                        ]}
                      />
                    </div>
                    )}

                    {nannyTab === "level" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      <Card className="border-border border-amber-500/30 bg-amber-500/5 shadow-sm">
                        <CardContent className="p-3">
                          <p className="text-muted-foreground text-xs">当前等级</p>
                          <p className="text-foreground text-xl font-bold">
                            {domesticArchive?.level || "五星月嫂"}
                          </p>
                          <p className="text-muted-foreground mt-2 text-xs">服务参考价</p>
                          <p className="text-primary text-lg font-semibold tabular-nums">¥18,800/月</p>
                        </CardContent>
                      </Card>
                      {[
                        { date: "2024-12-01", from: "四星月嫂", to: "五星月嫂", reason: "客户好评率达标" },
                        { date: "2024-06-15", from: "三星月嫂", to: "四星月嫂", reason: "完成进阶培训" },
                      ].map((lv, i) => (
                        <Card key={i} className="border-border border shadow-sm">
                          <CardContent className="flex gap-2 p-3 text-xs">
                            <Award className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1">
                                <Badge variant="outline">{lv.from}</Badge>
                                <ChevronRight className="h-3 w-3" />
                                <Badge className="bg-primary/10 text-primary">{lv.to}</Badge>
                              </div>
                              <p className="text-muted-foreground mt-1">{lv.reason}</p>
                              <p className="text-muted-foreground mt-1 text-[10px]">{lv.date}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}

                    {nannyTab === "credit" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      <Card className="border-border border-primary/20 bg-primary/5 shadow-sm">
                        <CardContent className="p-3">
                          <p className="text-muted-foreground text-xs">信用评分</p>
                          <p className="text-primary text-3xl font-bold tabular-nums">95</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            <Badge variant="secondary" className="bg-primary/10 text-[10px] text-primary">
                              <CheckCircle className="mr-0.5 h-3 w-3" />
                              实名已认证
                            </Badge>
                            <Badge variant="secondary" className="bg-primary/10 text-[10px] text-primary">
                              背调已通过
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="text-muted-foreground flex flex-col items-center py-6 text-sm">
                        <Shield className="mb-2 h-8 w-8 opacity-40" />
                        暂无不良记录
                      </div>
                    </div>
                    )}

                    {nannyTab === "deposit" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      <Card className="border-border border-primary/20 bg-primary/5 shadow-sm">
                        <CardContent className="flex items-start justify-between p-3">
                          <div>
                            <p className="text-muted-foreground text-xs">保证金状态</p>
                            <p className="text-primary text-lg font-bold">已缴纳</p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground text-xs">金额</p>
                            <p className="text-foreground text-xl font-bold tabular-nums">¥1,000</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-border border shadow-sm">
                        <CardContent className="space-y-2 p-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">缴纳</span>
                            <span className="font-medium text-primary">+¥1,000</span>
                          </div>
                          <p className="text-muted-foreground">2024-06-01 · 入职缴纳保证金</p>
                        </CardContent>
                      </Card>
                    </div>
                    )}

                    {nannyTab === "service" && (
                    <div className="mt-0 space-y-3 p-0 pt-3">
                      {[
                        { no: "DD2025021500001", c: "王女士", type: "月嫂服务", period: "2024-12-01 ~ 2025-02-01", amt: 28800, r: 5 },
                        { no: "DD2024110200002", c: "李女士", type: "月嫂服务", period: "2024-09-01 ~ 2024-11-01", amt: 25600, r: 5 },
                      ].map((sr) => (
                        <Card key={sr.no} className="border-border border shadow-sm">
                          <CardContent className="space-y-1 p-3 text-xs">
                            <div className="flex justify-between gap-2">
                              <span className="font-mono text-muted-foreground">{sr.no}</span>
                              <span className="text-amber-600">★ {sr.r}</span>
                            </div>
                            <p className="text-foreground font-medium">{sr.c}</p>
                            <p className="text-muted-foreground">{sr.type}</p>
                            <p className="text-muted-foreground">{sr.period}</p>
                            <p className="text-primary font-semibold tabular-nums">¥{sr.amt.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
