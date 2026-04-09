'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ChevronLeft, Plus, X, ChevronDown, AlertCircle, Check, Edit3, Upload,
  MessageCircle, Phone, FileText, Trash2, Search, User, Package, Link, Copy, ExternalLink, Tag
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── 工具函数 ───────────────────────────────────────────────
function calcDateDiffDays(start: string, end: string): number {
  if (!start || !end) return 0
  const diff = new Date(end).getTime() - new Date(start).getTime()
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
}

function calcActualDays(calendarDays: number, startTime: string, endTime: string): number {
  if (calendarDays <= 0) return 0
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return (h || 0) * 60 + (m || 0)
  }
  const dailyMinutes = toMinutes(endTime) - toMinutes(startTime)
  const standardMinutes = 8 * 60
  const extraMinutes = dailyMinutes - standardMinutes
  if (extraMinutes <= 0) return calendarDays
  const extraHours = extraMinutes / 60
  const dailyExtra = extraHours > 4 ? 1 : 0.5
  return calendarDays + dailyExtra
}

function calculateEducationDiscount(courseItems: Array<{ name: string; price: number }>) {
  const originalTotal = courseItems.reduce((sum, item) => sum + item.price, 0)
  const courseCount = courseItems.length
  const appliedRules: Array<{ name: string; description: string; amount: number }> = []
  let totalDiscount = 0

  const tiered = [
    { courses: 3, discount: 0.05, description: '3科95折' },
    { courses: 4, discount: 0.05, description: '4科95折' },
    { courses: 5, discount: 0.1, description: '5科及以上9折' },
  ]
  const tierRule = tiered.find(t => t.courses === courseCount) || (courseCount >= 5 ? tiered[2] : null)
  if (tierRule && tierRule.discount > 0) {
    const discountAmount = originalTotal * tierRule.discount
    appliedRules.push({ name: tierRule.description, description: `${courseCount}科课程享受优惠`, amount: discountAmount })
    totalDiscount += discountAmount
  }

  const consecutive = [
    { courses: 5, reduction: 500, description: '5科连报减500' },
    { courses: 6, reduction: 600, description: '6科连报减600' },
    { courses: 7, reduction: 800, description: '7科及以上连报减800' },
  ]
  const consecutiveRule = [...consecutive].reverse().find(c => courseCount >= c.courses)
  if (consecutiveRule) {
    appliedRules.push({ name: consecutiveRule.description, description: `连报减免${consecutiveRule.reduction}元`, amount: consecutiveRule.reduction })
    totalDiscount += consecutiveRule.reduction
  }

  const hasTargetCourse = courseItems.some(item => ['产康', '小儿推拿'].some(c => item.name.includes(c)))
  if (hasTargetCourse && courseCount >= 5) {
    appliedRules.push({ name: '特定科目直降', description: '5科及以上产康/小儿推拿直降1500', amount: 1500 })
    totalDiscount += 1500
  }

  const finalAmount = Math.max(originalTotal - totalDiscount, 500 * courseCount)
  return { originalTotal, appliedRules, totalDiscount: Math.round(totalDiscount), finalAmount: Math.round(finalAmount) }
}

// ─── Mock 常量数据 ───────────────────────────────────────────
const STUDENT_POOL = [
  { phone: '13812345678', name: '刘女士', source: 'online', address: '银川市金凤区正源街瑞银财富中心', idCard: '' },
  { phone: '13900001111', name: '陈先生', source: 'referral', address: '银川市兴庆区解放街 88 号', idCard: '' },
]

const CUSTOMER_POOL = [
  { phone: '13812345678', name: '刘女士', source: '线上渠道', address: '银川市金凤区正源街瑞银财富中心' },
  { phone: '13900001111', name: '陈先生', source: '介绍转介', address: '银川市兴庆区解放街 88 号' },
]

const ENROLLMENT_HISTORY: Record<string, { count: number; lastCourse: string; lastDate: string; discountAvailable: boolean; discountDesc: string }> = {
  '13800138001': { count: 2, lastCourse: '高级月嫂培训', lastDate: '2024-03', discountAvailable: true, discountDesc: '第3次报名，可享单科减¥1500（限用一次）' },
  '13900139001': { count: 1, lastCourse: '育婴师初级', lastDate: '2025-06', discountAvailable: false, discountDesc: '第2次报名，连报折扣已享用' },
}

interface CourseItem {
  id: string; name: string; category: string; price: number
  discount?: number; discountedPrice?: number
  certificate?: string; certificateSelected?: boolean
}

const COURSES_DATA: Record<string, CourseItem[]> = {
  yuesao: [
    { id: 'y1', name: '初级月嫂培训', category: 'yuesao', price: 2800, certificate: '初级母婴护理师证书' },
    { id: 'y2', name: '高级月嫂培训', category: 'yuesao', price: 3800, certificate: '高级母婴护理师证书' },
    { id: 'y3', name: '金牌月嫂培训', category: 'yuesao', price: 4800, certificate: '金牌母婴护理师证书' },
  ],
  yuyingshi: [
    { id: 'a1', name: '育婴师初级', category: 'yuyingshi', price: 2000, certificate: '初级育婴师证书' },
    { id: 'a2', name: '育婴师中级', category: 'yuyingshi', price: 2500, certificate: '中级育婴师证书' },
    { id: 'a3', name: '育婴师高级', category: 'yuyingshi', price: 3200, certificate: '高级育婴师证书' },
  ],
  kangyang: [
    { id: 'k1', name: '产康师初级', category: 'kangyang', price: 2800, certificate: '初级产康师证书' },
    { id: 'k2', name: '产康师高级', category: 'kangyang', price: 3800, certificate: '高级产康师证书' },
  ],
  xiaoyertui: [
    { id: 'x1', name: '小儿推拿培训', category: 'xiaoyertui', price: 3000, certificate: '小儿推拿师证书' },
  ],
}
const ALL_COURSES: CourseItem[] = Object.values(COURSES_DATA).flat()

const COURSE_CATEGORIES = [
  { value: 'yuesao', label: '月嫂培训' },
  { value: 'yuyingshi', label: '育婴培训' },
  { value: 'kangyang', label: '产康培训' },
  { value: 'xiaoyertui', label: '小儿推拿' },
]

const PACKAGES_DATA: Record<string, { label: string; price: number; desc: string; courseIds: string[]; lumpSumDiscount?: number }> = {
  beginner: { label: '初级套餐', price: 2800, desc: '适合零基础入门，含初级月嫂培训', courseIds: ['y1'] },
  intermediate: { label: '中级套餐', price: 4500, desc: '含初级月嫂 + 育婴师初级，连报优惠', courseIds: ['y1', 'a1'] },
  advanced: { label: '高级套餐（全科）', price: 6800, desc: '含月嫂高级 + 育婴师中级 + 产康师初级', courseIds: ['y2', 'a2', 'k1'] },
  employment: { label: '就业班套餐', price: 8800, desc: '含金牌月嫂 + 育婴师高级 + 产康高级，含就业安置', courseIds: ['y3', 'a3', 'k2'] },
  vip_12000: { label: 'VIP全科套餐', price: 12000, desc: '含月嫂高级 + 育婴师高级 + 产康高级 + 小儿推拿', courseIds: ['y2', 'a3', 'k2', 'x1'], lumpSumDiscount: 1500 },
  premium_14000: { label: '精英定制套餐', price: 14000, desc: '含金牌月嫂 + 育婴师高级 + 产康高级 + 小儿推拿', courseIds: ['y3', 'a3', 'k2', 'x1'], lumpSumDiscount: 2000 },
}

const DEFAULT_TRAINING_MATERIALS = [
  { id: 'tm1', name: '培训教材（上册）', type: 'purchase' as const },
  { id: 'tm2', name: '培训教材（下册）', type: 'gift' as const },
  { id: 'tm3', name: '培训T恤', type: 'purchase' as const },
  { id: 'tm4', name: '笔记本', type: 'gift' as const },
]

const DEFAULT_VISIT_MATERIALS = [
  { id: 'vm1', name: '月嫂服务用品包', type: 'gift' as const },
  { id: 'vm2', name: '手脚印泥（贝医生）', type: 'purchase' as const },
  { id: 'vm3', name: '新生儿大礼包', type: 'purchase' as const },
  { id: 'vm4', name: '上户回访礼品', type: 'gift' as const },
]

const SERVICE_TYPES = [
  { value: 'yuesao', label: '月嫂服务' },
  { value: 'yuying', label: '育婴师服务' },
  { value: 'kangfu', label: '产康服务' },
  { value: 'baoming', label: '保姆服务' },
]

const SERVICE_PRODUCTS: Record<string, { value: string; label: string; price: number }[]> = {
  yuesao: [
    { value: 'golden', label: '金牌月嫂', price: 12800 },
    { value: 'premium', label: '高级月嫂', price: 10800 },
    { value: 'standard', label: '标准月嫂', price: 8800 },
  ],
  yuying: [
    { value: 'senior', label: '高级育婴师', price: 8800 },
    { value: 'mid', label: '中级育婴师', price: 6800 },
    { value: 'junior', label: '初级育婴师', price: 5800 },
  ],
  kangfu: [
    { value: 'kangfu_premium', label: '产康师高级', price: 9800 },
    { value: 'kangfu_standard', label: '产康师标准', price: 7800 },
  ],
  baoming: [
    { value: 'live_in', label: '住家保姆', price: 6800 },
    { value: 'hourly', label: '钟点保姆', price: 150 },
  ],
}

const MOCK_CONTRACTS = [
  { id: 'HT2026001', name: '培训服务协议-刘女士-2026-01', type: 'training' },
  { id: 'HT2026002', name: '就业班协议-陈先生-2026-02', type: 'employment' },
  { id: 'HT2026003', name: '培训服务协议-王女士-2026-01', type: 'training' },
]

const MOCK_SERVICE_CONTRACTS = [
  { id: 'FW2026001', name: '家庭服务合同-刘女士-2026-01', type: 'service' },
  { id: 'FW2026002', name: '家庭服务合同-陈先生-2026-02', type: 'service' },
  { id: 'FW2026003', name: '家庭服务合同-王女士-2026-01', type: 'service' },
]

const ADVISORS = ['张顾问', '李顾问', '王顾问', '赵顾问']
const SOURCES_SERVICE = ['线上渠道', '介绍转介', '抖音推广', '小红书', '线下推广', '医院合作']

const DISCOUNT_OPTIONS = [
  { value: '1', label: '无优惠', discount: 1 },
  { value: '0.95', label: '95折', discount: 0.95 },
  { value: '0.9', label: '9折', discount: 0.9 },
  { value: '0.85', label: '85折', discount: 0.85 },
  { value: '0.8', label: '8折', discount: 0.8 },
]

// ─── 接口定义 ─────────────────────────────────────────────

interface ServiceItem {
  id: string; serviceType: string; productName: string
  originalPrice: number; standardDays: number
  startDate: string; endDate: string; startTime: string; endTime: string
  serviceDays: number; actualDays: number
  serviceAddress: string; staffLevel: string; workMode: string
}

interface PaymentBill {
  id: string; amount: number; dueDate: string; status: 'pending' | 'paid'
}

export interface OrderPrefillData {
  customerName?: string; serviceType?: string; amount?: number
  startDate?: string; endDate?: string; dueDate?: string
  caregiverName?: string; contractId?: string; orderId?: string
  fromContract?: boolean; receiptOnly?: boolean
}

export interface OrderToContractData {
  customerName: string; serviceType: string; amount: number
  startDate: string; endDate: string; orderId: string
}

interface OrderCreatePageProps {
  onBack: () => void
  orderType?: 'service' | 'training'
  prefillData?: OrderPrefillData
  onOpenContract?: (data: OrderToContractData) => void
}

// ─── 组件 ────────────────────────────────────────────────

export function OrderCreatePage({ onBack, orderType = 'service', prefillData, onOpenContract }: OrderCreatePageProps) {
  const isReceiptOnly = !!prefillData?.receiptOnly
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(() => (isReceiptOnly ? 3 : 1))

  // ── 共享 state ──
  const [phoneMatchHint, setPhoneMatchHint] = useState<string | null>(null)
  const [contractSearch, setContractSearch] = useState('')
  const [selectedContractId, setSelectedContractId] = useState('')

  // ── 培训 state (Step 1) ──
  const [studentName, setStudentName] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [studentIdCard, setStudentIdCard] = useState('')
  const [studentSource, setStudentSource] = useState('')
  const [studentAddress, setStudentAddress] = useState('')
  const [trainingAdvisor, setTrainingAdvisor] = useState('张顾问')
  const [pendingStudentMatch, setPendingStudentMatch] = useState<typeof STUDENT_POOL[0] | null>(null)

  // ── 培训 state (Step 2) ──
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCourses, setSelectedCourses] = useState<CourseItem[]>([])
  const [isContinuousEnrollment, setIsContinuousEnrollment] = useState(false)
  const [enrollmentInfo, setEnrollmentInfo] = useState<typeof ENROLLMENT_HISTORY[string] | null>(null)
  const [enableMaterialOutbound, setEnableMaterialOutbound] = useState(true)
  const [trainingMaterials, setTrainingMaterials] = useState(DEFAULT_TRAINING_MATERIALS.map(m => ({ ...m, checked: true })))
  const [newMaterialName, setNewMaterialName] = useState('')
  const [newMaterialType, setNewMaterialType] = useState<'purchase' | 'gift'>('purchase')

  // ── 培训 state (Step 3) ──
  const [trainingPaymentType, setTrainingPaymentType] = useState('full')
  const [trainingBills, setTrainingBills] = useState<PaymentBill[]>([])

  // ── 培训 state (Step 4) ──
  const [agreementType, setAgreementType] = useState('training_service')
  const [trainingContractNumber, setTrainingContractNumber] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [contractSignStatus, setContractSignStatus] = useState<'unsigned' | 'signed'>('unsigned')
  const [contractLink, setContractLink] = useState('')

  // ── 服务 state (Step 1) ──
  const [customerName, setCustomerName] = useState(prefillData?.customerName ?? '')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerIdCard, setCustomerIdCard] = useState('')
  const [customerSource, setCustomerSource] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [maternalAdvisor, setMaternalAdvisor] = useState('张顾问')
  const [serviceAdvisor, setServiceAdvisor] = useState('张顾问')
  const [expectedDelivery, setExpectedDelivery] = useState('')
  const [expectedStartDate, setExpectedStartDate] = useState(prefillData?.startDate ?? '')
  const [specialRequirements, setSpecialRequirements] = useState('')
  const [pendingCustomerMatch, setPendingCustomerMatch] = useState<typeof CUSTOMER_POOL[0] | null>(null)

  // ── 服务 state (Step 2) ──
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([])
  const [newService, setNewService] = useState({
    serviceType: '', productName: '', originalPrice: 0, standardDays: 26,
    startDate: '', endDate: '', startTime: '08:30', endTime: '17:30',
    serviceDays: 0, actualDays: 0, serviceAddress: '', staffLevel: '', workMode: 'live_in',
  })
  const [enableVisitMaterialOutbound, setEnableVisitMaterialOutbound] = useState(true)
  const [visitMaterials, setVisitMaterials] = useState(DEFAULT_VISIT_MATERIALS.map(m => ({ ...m, checked: true })))
  const [newVisitMaterialName, setNewVisitMaterialName] = useState('')
  const [newVisitMaterialType, setNewVisitMaterialType] = useState<'purchase' | 'gift'>('purchase')

  // ── 服务 state (Step 3) ──
  const [hasTwins, setHasTwins] = useState(false)
  const [hasPremature, setHasPremature] = useState(false)
  const [servicePaymentType, setServicePaymentType] = useState('full')
  const [serviceBills, setServiceBills] = useState<PaymentBill[]>([])

  // ── 服务 state (Step 4) ──
  const [dealType, setDealType] = useState('')
  const [tripartiteSignStatus, setTripartiteSignStatus] = useState<'unsigned' | 'signed'>('unsigned')
  const [tripartiteLink, setTripartiteLink] = useState('')

  // ── 收据模式兼容 ──
  const [receiptBills, setReceiptBills] = useState<Array<{ id: string; period: number; amount: number; plannedDate: string; paidDate: string; status: 'paid' | 'pending' | 'overdue' }>>([
    { id: '1', period: 1, amount: 0, plannedDate: '2026-04-28', paidDate: '2026-03-29', status: 'paid' }
  ])

  // ── 培训计算 ──
  const trainingTotalPrice = useMemo(() => selectedCourses.reduce((sum, c) => sum + c.price, 0), [selectedCourses])
  const trainingDiscountResult = useMemo(() => calculateEducationDiscount(selectedCourses.map(c => ({ name: c.name, price: c.price }))), [selectedCourses])
  const isPackageMode = !!selectedPackage
  const pkg = selectedPackage ? PACKAGES_DATA[selectedPackage] : null
  const isLumpSumPackage = !!(pkg?.lumpSumDiscount && pkg.lumpSumDiscount > 0)
  const trainingFinalPrice = isPackageMode && pkg
    ? (isLumpSumPackage ? pkg.price - (pkg.lumpSumDiscount ?? 0) : pkg.price)
    : trainingDiscountResult.finalAmount
  const trainingTotalDiscount = isPackageMode && pkg
    ? (isLumpSumPackage ? (pkg.lumpSumDiscount ?? 0) : 0)
    : trainingDiscountResult.totalDiscount
  const certificateCount = selectedCourses.filter(c => c.certificateSelected !== false).length

  // ── 服务计算 ──
  const calcServiceItemAmount = (item: ServiceItem): number => {
    if (item.actualDays > 0 && item.standardDays > 0) {
      return Math.round((item.originalPrice / item.standardDays) * item.actualDays)
    }
    return item.originalPrice
  }
  const serviceSubtotal = useMemo(() => serviceItems.reduce((sum, item) => sum + calcServiceItemAmount(item), 0), [serviceItems])
  const twinsFee = hasTwins ? Math.round(serviceSubtotal * 0.5) : 0
  const prematureFee = hasPremature ? 2000 : 0
  const serviceTotalAmount = serviceSubtotal + twinsFee + prematureFee

  // ── 手机号匹配 (培训) ──
  const handleStudentPhoneChange = (phone: string) => {
    setStudentPhone(phone)
    const digits = phone.replace(/\D/g, '')
    if (digits.length >= 11) {
      const match = STUDENT_POOL.find(s => s.phone.replace(/\D/g, '') === digits)
      if (match) setPendingStudentMatch(match)
      else setPhoneMatchHint(null)

      const history = ENROLLMENT_HISTORY[digits]
      if (history) { setEnrollmentInfo(history); setIsContinuousEnrollment(true) }
      else { setEnrollmentInfo(null); setIsContinuousEnrollment(false) }
    }
  }
  const confirmStudentMatch = () => {
    if (!pendingStudentMatch) return
    setStudentName(pendingStudentMatch.name)
    setStudentSource(pendingStudentMatch.source)
    setStudentAddress(pendingStudentMatch.address)
    setPhoneMatchHint(`已确认匹配学员：${pendingStudentMatch.name}，基本信息已填充`)
    setPendingStudentMatch(null)
  }

  // ── 手机号匹配 (服务) ──
  const handleCustomerPhoneChange = (phone: string) => {
    setCustomerPhone(phone)
    const digits = phone.replace(/\D/g, '')
    if (digits.length >= 11) {
      const match = CUSTOMER_POOL.find(c => c.phone.replace(/\D/g, '') === digits)
      if (match) setPendingCustomerMatch(match)
      else setPhoneMatchHint(null)
    }
  }
  const confirmCustomerMatch = () => {
    if (!pendingCustomerMatch) return
    setCustomerName(pendingCustomerMatch.name)
    setCustomerSource(pendingCustomerMatch.source)
    setCustomerAddress(pendingCustomerMatch.address)
    setPhoneMatchHint(`已确认匹配客户：${pendingCustomerMatch.name}，基本信息已填充`)
    setPendingCustomerMatch(null)
  }

  // ── 课程操作 (培训) ──
  const handleAddCourse = (course: CourseItem) => {
    if (selectedPackage) return
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, { ...course, discount: 0.9, discountedPrice: Math.round(course.price * 0.9), certificateSelected: true }])
    }
  }
  const handleRemoveCourse = (courseId: string) => {
    if (selectedPackage) return
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId))
  }
  const handleSelectPackage = (pkgKey: string) => {
    if (pkgKey === 'none') {
      setSelectedPackage('')
      setSelectedCourses([])
      return
    }
    const p = PACKAGES_DATA[pkgKey]
    if (!p) return
    setSelectedPackage(pkgKey)
    setSelectedCategory('')
    const courses = p.courseIds.map(id => ALL_COURSES.find(c => c.id === id)!).filter(Boolean)
    setSelectedCourses(courses.map(c => ({ ...c, certificateSelected: true })))
  }

  // ── 服务项操作 ──
  const updateServiceDates = (startDate: string, endDate: string, startTime: string, endTime: string) => {
    const calDays = calcDateDiffDays(startDate, endDate)
    const actDays = calcActualDays(calDays, startTime, endTime)
    setNewService(prev => ({ ...prev, startDate, endDate, startTime, endTime, serviceDays: calDays, actualDays: actDays }))
  }
  const handleServiceProductChange = (productName: string) => {
    const products = SERVICE_PRODUCTS[newService.serviceType] || []
    const selected = products.find(p => p.value === productName)
    setNewService(prev => ({ ...prev, productName, originalPrice: selected?.price || 0 }))
  }
  const handleAddService = () => {
    if (!newService.serviceType || !newService.productName) return
    const item: ServiceItem = {
      id: Date.now().toString(), serviceType: newService.serviceType, productName: newService.productName,
      originalPrice: newService.originalPrice, standardDays: newService.standardDays,
      startDate: newService.startDate, endDate: newService.endDate,
      startTime: newService.startTime, endTime: newService.endTime,
      serviceDays: newService.serviceDays, actualDays: newService.actualDays,
      serviceAddress: newService.serviceAddress, staffLevel: newService.staffLevel, workMode: newService.workMode,
    }
    setServiceItems([...serviceItems, item])
    setNewService({ serviceType: '', productName: '', originalPrice: 0, standardDays: 26, startDate: '', endDate: '', startTime: '08:30', endTime: '17:30', serviceDays: 0, actualDays: 0, serviceAddress: '', staffLevel: '', workMode: 'live_in' })
  }

  // ── 提交 ──
  const handleSubmit = () => {
    if (prefillData?.fromContract) { alert('订单创建成功！'); onBack(); return }
    const orderId = `ORD${Date.now().toString().slice(-6)}`
    if (orderType === 'training') {
      alert('培训订单创建成功！')
      onBack()
    } else {
      onOpenContract?.({ customerName, serviceType: '月嫂服务', amount: serviceTotalAmount, startDate: expectedStartDate, endDate: '', orderId })
    }
  }

  const handleReceiptSubmit = () => { alert('收据已保存'); onBack() }

  // ── 账单操作 helpers ──
  const addBill = (setter: React.Dispatch<React.SetStateAction<PaymentBill[]>>, total: number) => {
    setter(prev => [...prev, {
      id: Date.now().toString(),
      amount: Math.round(total / (prev.length + 1)),
      dueDate: new Date(Date.now() + (prev.length + 1) * 30 * 86400000).toISOString().split('T')[0],
      status: 'pending',
    }])
  }
  const updateBill = (setter: React.Dispatch<React.SetStateAction<PaymentBill[]>>, id: string, updates: Partial<PaymentBill>) => {
    setter(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))
  }
  const removeBill = (setter: React.Dispatch<React.SetStateAction<PaymentBill[]>>, id: string) => {
    setter(prev => prev.filter(b => b.id !== id))
  }

  const stepTitles = orderType === 'training'
    ? ['学员信息', '课程选择', '付款信息', '协议签约']
    : ['客户信息', '服务选择', '付款信息', '协议签约']

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
            <div>
              <h1 className="font-semibold text-base">{isReceiptOnly ? '新建收据' : '创建订单'}</h1>
              <p className="text-[11px] text-muted-foreground">{isReceiptOnly ? '付款账单' : stepTitles[currentStep - 1]}</p>
            </div>
          </div>
        </div>
        {!isReceiptOnly && (
          <div className="px-3 py-2 border-t border-border">
            <div className="flex items-center justify-between gap-1">
              {[1, 2, 3, 4].map((step) => (
                <button key={step} onClick={() => setCurrentStep(step as 1 | 2 | 3 | 4)} className="flex-1 text-center">
                  <div className={cn('w-full py-2 rounded-lg text-[11px] font-medium transition-all', step <= currentStep ? 'bg-primary/20 text-primary border border-primary' : 'bg-muted text-muted-foreground')}>
                    {step}
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1">{stepTitles[step - 1]}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 手机号匹配弹窗 (培训) */}
      <Sheet open={!!pendingStudentMatch} onOpenChange={() => setPendingStudentMatch(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetTitle className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-teal-600" />发现匹配学员</SheetTitle>
          <p className="text-xs text-muted-foreground mt-1">在学员池中找到相同手机号的学员信息，是否填充到当前表单？</p>
          {pendingStudentMatch && (
            <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs space-y-1.5 mt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">姓名</span><span className="font-medium">{pendingStudentMatch.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">手机</span><span className="font-medium">{pendingStudentMatch.phone}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">来源</span><span className="font-medium">{pendingStudentMatch.source === 'online' ? '线上报名' : pendingStudentMatch.source === 'referral' ? '老学员介绍' : pendingStudentMatch.source}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">地址</span><span className="font-medium text-right max-w-[60%]">{pendingStudentMatch.address}</span></div>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setPendingStudentMatch(null)}>不使用</Button>
            <Button className="flex-1" onClick={confirmStudentMatch}>确认填充</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* 手机号匹配弹窗 (服务) */}
      <Sheet open={!!pendingCustomerMatch} onOpenChange={() => setPendingCustomerMatch(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetTitle className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-teal-600" />发现匹配客户</SheetTitle>
          <p className="text-xs text-muted-foreground mt-1">在客户池中找到相同手机号的客户信息，是否填充到当前表单？</p>
          {pendingCustomerMatch && (
            <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs space-y-1.5 mt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">姓名</span><span className="font-medium">{pendingCustomerMatch.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">来源</span><span className="font-medium">{pendingCustomerMatch.source}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">地址</span><span className="font-medium text-right max-w-[60%]">{pendingCustomerMatch.address}</span></div>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setPendingCustomerMatch(null)}>不使用</Button>
            <Button className="flex-1" onClick={confirmCustomerMatch}>确认填充</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Content Area */}
      <div className="px-3 py-4 space-y-4">
        {prefillData?.contractId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-medium">来自合同 {prefillData.contractId}</p>
              <p className="text-[10px] text-muted-foreground">已自动填入合同相关信息，请核对后继续</p>
            </div>
          </div>
        )}

        {/* ═══════ Step 1 ═══════ */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                {orderType === 'training' ? (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">学员姓名*</label>
                      <Input placeholder="请输入学员姓名" className="h-9" value={studentName} onChange={e => setStudentName(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">联系电话*</label>
                      <Input placeholder="输入11位手机号自动匹配学员" className="h-9" value={studentPhone} onChange={e => handleStudentPhoneChange(e.target.value)} />
                      {phoneMatchHint && <p className="text-[10px] text-teal-600 bg-teal-50 px-2 py-1 rounded border border-teal-200 mt-1">{phoneMatchHint}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">身份证号*</label>
                      <Input placeholder="用于办理证书" className="h-9" value={studentIdCard} onChange={e => setStudentIdCard(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">学员来源</label>
                      <Select value={studentSource} onValueChange={setStudentSource}>
                        <SelectTrigger className="h-9"><SelectValue placeholder="选择来源" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">线上报名</SelectItem>
                          <SelectItem value="referral">老学员介绍</SelectItem>
                          <SelectItem value="promotion">推广渠道</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">家庭住址</label>
                      <Input placeholder="请输入家庭住址" className="h-9" value={studentAddress} onChange={e => setStudentAddress(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">招生顾问*</label>
                      <Select value={trainingAdvisor} onValueChange={setTrainingAdvisor}>
                        <SelectTrigger className="h-9"><SelectValue placeholder="选择顾问" /></SelectTrigger>
                        <SelectContent>
                          {ADVISORS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">客户姓名*</label>
                      <Input placeholder="请输入客户姓名" className="h-9" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">联系电话*</label>
                      <Input placeholder="输入11位手机号自动匹配客户" className="h-9" value={customerPhone} onChange={e => handleCustomerPhoneChange(e.target.value)} />
                      {phoneMatchHint && <p className="text-[10px] text-teal-600 bg-teal-50 px-2 py-1 rounded border border-teal-200 mt-1">{phoneMatchHint}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">身份证号</label>
                      <Input placeholder="请输入身份证号" className="h-9" value={customerIdCard} onChange={e => setCustomerIdCard(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">客户来源</label>
                      <Select value={customerSource} onValueChange={setCustomerSource}>
                        <SelectTrigger className="h-9"><SelectValue placeholder="选择来源" /></SelectTrigger>
                        <SelectContent>
                          {SOURCES_SERVICE.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">家庭住址</label>
                      <Input placeholder="请输入家庭住址" className="h-9" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} />
                    </div>
                    {prefillData?.caregiverName && (
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">服务人员</label>
                        <Input className="h-9 bg-muted/50" defaultValue={prefillData.caregiverName} readOnly />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">母婴顾问</label>
                        <Select value={maternalAdvisor} onValueChange={setMaternalAdvisor}>
                          <SelectTrigger className="h-9"><SelectValue placeholder="选择顾问" /></SelectTrigger>
                          <SelectContent>
                            {ADVISORS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">招生顾问*</label>
                        <Select value={serviceAdvisor} onValueChange={setServiceAdvisor}>
                          <SelectTrigger className="h-9"><SelectValue placeholder="选择顾问" /></SelectTrigger>
                          <SelectContent>
                            {ADVISORS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">预产期时间</label>
                        <Input type="date" className="h-9" value={expectedDelivery} onChange={e => setExpectedDelivery(e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">要求上户时间*</label>
                        <Input type="date" className="h-9" value={expectedStartDate} onChange={e => setExpectedStartDate(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">特殊要求</label>
                      <textarea placeholder="如有特殊要求，请详细描述..." className="w-full border rounded-lg p-2 text-sm h-16 resize-none" value={specialRequirements} onChange={e => setSpecialRequirements(e.target.value)} />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={onBack}>取消</Button>
              <Button className="flex-1 h-10" onClick={() => setCurrentStep(2)}>下一步</Button>
            </div>
          </div>
        )}

        {/* ═══════ Step 2 ═══════ */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {orderType === 'training' ? (
              <>
                {/* 套餐选择 + 连报状态 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">套餐选择</label>
                      <Select value={selectedPackage || 'none'} onValueChange={handleSelectPackage}>
                        <SelectTrigger className="h-9"><SelectValue placeholder="选择课程套餐（可选）" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">不选套餐</SelectItem>
                          {Object.entries(PACKAGES_DATA).map(([key, p]) => (
                            <SelectItem key={key} value={key}>{p.label} - ¥{p.price.toLocaleString()}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">连报状态 <span className="font-normal text-[10px] text-muted-foreground">（根据手机号自动检索）</span></label>
                      <div className={cn('h-9 px-3 flex items-center rounded-md border text-xs',
                        isContinuousEnrollment ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-muted/30 text-muted-foreground'
                      )}>
                        {studentPhone.replace(/\D/g, '').length >= 11
                          ? isContinuousEnrollment
                            ? <span className="font-medium">是（第 {(enrollmentInfo?.count ?? 1) + 1} 次报名）</span>
                            : <span>否（首次报名）</span>
                          : <span>请先输入学员手机号</span>
                        }
                      </div>
                    </div>

                    {isContinuousEnrollment && enrollmentInfo && (
                      <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Tag className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                          <span className="text-[10px] font-medium text-purple-900">连报信息</span>
                          <Badge variant="outline" className="text-[10px] bg-purple-100 text-purple-700 border-purple-300">第 {enrollmentInfo.count + 1} 次报名</Badge>
                          {enrollmentInfo.discountAvailable && <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">可享连报优惠</Badge>}
                        </div>
                        <p className="text-[10px] text-purple-700 pl-5">上次报名：{enrollmentInfo.lastCourse}（{enrollmentInfo.lastDate}）</p>
                        {enrollmentInfo.discountAvailable && <p className="text-[10px] text-purple-600 pl-5 font-medium">{enrollmentInfo.discountDesc}</p>}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selectedPackage && pkg && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-amber-900">{pkg.label}</span>
                      <span className="text-[10px] text-amber-700 ml-2">{pkg.desc}</span>
                      <span className="text-[10px] text-amber-600 ml-2">（套餐课程已锁定）</span>
                    </div>
                    <span className="text-sm font-bold text-amber-800">¥{pkg.price.toLocaleString()}</span>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-800">该学员已报/已学课程：高级月嫂培训（2024年）</p>
                </div>

                {/* 可选课程 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-foreground">
                        可选课程
                        {isPackageMode && <span className="ml-1 text-[10px] text-muted-foreground font-normal">（套餐：{pkg?.courseIds.length} 门课程，已锁定）</span>}
                      </p>
                      {!isPackageMode && (
                        <Select value={selectedCategory || 'all'} onValueChange={v => setSelectedCategory(v === 'all' ? '' : v)}>
                          <SelectTrigger className="h-7 w-24 text-[10px]"><SelectValue placeholder="全部" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">全部</SelectItem>
                            {COURSE_CATEGORIES.map(cat => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 gap-1 bg-muted/50 px-2 py-2 text-[10px] font-semibold text-muted-foreground">
                        <div className="col-span-3">课程名称</div>
                        <div className="col-span-2 text-center">费用</div>
                        {!isPackageMode && <div className="col-span-3 text-center">优惠</div>}
                        <div className={cn('text-center', isPackageMode ? 'col-span-3' : 'col-span-2')}>证书</div>
                        <div className={cn('text-center', isPackageMode ? 'col-span-4' : 'col-span-2')}>选择</div>
                      </div>
                      {(isPackageMode
                        ? (pkg?.courseIds || []).map(id => ALL_COURSES.find(c => c.id === id)!).filter(Boolean)
                        : selectedCategory ? (COURSES_DATA[selectedCategory] || []) : ALL_COURSES
                      ).map((course) => {
                        const isSelected = selectedCourses.some(c => c.id === course.id)
                        return (
                          <div key={course.id} className={cn('grid grid-cols-12 gap-1 px-2 py-2.5 border-t border-border items-center', isSelected && 'bg-primary/5', isPackageMode && 'bg-amber-50/30')}>
                            <div className="col-span-3 text-xs">{course.name}</div>
                            <div className="col-span-2 text-xs text-center text-primary font-medium">¥{course.price}</div>
                            {!isPackageMode && (
                              <div className="col-span-3">
                                <select className="w-full text-[10px] px-1 py-1 border border-input rounded bg-background">
                                  {DISCOUNT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                              </div>
                            )}
                            <div className={cn('flex justify-center', isPackageMode ? 'col-span-3' : 'col-span-2')}>
                              <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked disabled={isPackageMode} />
                            </div>
                            <div className={cn('flex justify-center', isPackageMode ? 'col-span-4' : 'col-span-2')}>
                              <Button size="sm" variant={isSelected ? 'secondary' : 'default'} className="h-6 text-[10px] px-2" disabled={isPackageMode}
                                onClick={() => isSelected ? handleRemoveCourse(course.id) : handleAddCourse(course)}>
                                {isPackageMode ? '锁定' : isSelected ? '已选' : '选择'}
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {!isPackageMode && <p className="text-[10px] text-muted-foreground">合报折扣：1-2科不打折；3-4科9.5折；5科9折减500；6科减600；7科9折减800</p>}

                    {selectedCourses.length > 0 && (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
                        <p className="text-xs font-medium text-emerald-900">已选课程 ({selectedCourses.length})</p>
                        {selectedCourses.map(c => (
                          <div key={c.id} className="flex justify-between text-xs">
                            <span>{c.name}</span>
                            <span className="font-medium text-emerald-700">{isPackageMode ? '含于套餐' : `¥${c.discountedPrice || c.price}`}</span>
                          </div>
                        ))}
                        <div className="border-t border-emerald-200 pt-1 flex justify-between text-xs font-bold text-emerald-800">
                          <span>合计</span>
                          <span>¥{(isPackageMode && pkg ? pkg.price : selectedCourses.reduce((s, c) => s + (c.discountedPrice || c.price), 0)).toLocaleString()}</span>
                        </div>
                        {isLumpSumPackage && pkg && (
                          <div className="flex justify-between text-[10px] text-amber-700">
                            <span>一次性优惠</span>
                            <span>-¥{pkg.lumpSumDiscount!.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 培训物料出库单 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="enable-material" checked={enableMaterialOutbound} onCheckedChange={v => setEnableMaterialOutbound(!!v)} />
                      <label htmlFor="enable-material" className="text-xs font-medium cursor-pointer flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5 text-primary" />创建培训物料出库单
                        <Badge variant="secondary" className="text-[10px]">默认勾选</Badge>
                      </label>
                    </div>
                    {enableMaterialOutbound && (
                      <div className="border rounded-lg overflow-hidden bg-blue-50/30">
                        <div className="px-3 py-2 bg-blue-50 border-b"><span className="text-xs font-medium text-blue-900">物料清单</span></div>
                        {trainingMaterials.map((m, idx) => (
                          <div key={m.id} className="flex items-center gap-2 px-3 py-2 border-t">
                            <Checkbox checked={m.checked} onCheckedChange={v => setTrainingMaterials(prev => prev.map((item, i) => i === idx ? { ...item, checked: !!v } : item))} />
                            <span className="text-xs flex-1">{m.name}</span>
                            <Select value={m.type} onValueChange={(v: 'purchase' | 'gift') => setTrainingMaterials(prev => prev.map((item, i) => i === idx ? { ...item, type: v } : item))}>
                              <SelectTrigger className="h-6 text-[10px] w-16"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="purchase">购买</SelectItem>
                                <SelectItem value="gift">赠送</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                        <div className="px-3 py-2 border-t flex items-center gap-2">
                          <Input className="h-7 text-xs flex-1" placeholder="添加物料名称" value={newMaterialName} onChange={e => setNewMaterialName(e.target.value)} />
                          <Select value={newMaterialType} onValueChange={(v: 'purchase' | 'gift') => setNewMaterialType(v)}>
                            <SelectTrigger className="h-7 text-xs w-16"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="purchase">购买</SelectItem>
                              <SelectItem value="gift">赠送</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => {
                            if (!newMaterialName.trim()) return
                            setTrainingMaterials(prev => [...prev, { id: `tm_${Date.now()}`, name: newMaterialName.trim(), type: newMaterialType, checked: true }])
                            setNewMaterialName('')
                          }}><Plus className="h-3 w-3 mr-1" />添加</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(1)}>上一步</Button>
                  <Button className="flex-1 h-10" onClick={() => setCurrentStep(3)} disabled={selectedCourses.length === 0}>下一步</Button>
                </div>
              </>
            ) : (
              <>
                {/* 服务项目添加表单 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-foreground">添加服务项目</p>
                    <div className="p-3 rounded-lg border bg-blue-50 space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">服务类型</label>
                          <Select value={newService.serviceType} onValueChange={v => setNewService(prev => ({ ...prev, serviceType: v, productName: '', originalPrice: 0 }))}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择类型" /></SelectTrigger>
                            <SelectContent>
                              {SERVICE_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">服务产品</label>
                          <Select value={newService.productName} onValueChange={handleServiceProductChange}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择产品" /></SelectTrigger>
                            <SelectContent>
                              {(SERVICE_PRODUCTS[newService.serviceType] || []).map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {newService.originalPrice > 0 && (
                        <div className="text-xs text-primary font-medium">标准价格：¥{newService.originalPrice.toLocaleString()}/26天</div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">开始日期</label>
                          <Input type="date" className="h-8 text-xs" value={newService.startDate} onChange={e => updateServiceDates(e.target.value, newService.endDate, newService.startTime, newService.endTime)} />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">结束日期</label>
                          <Input type="date" className="h-8 text-xs" value={newService.endDate} onChange={e => updateServiceDates(newService.startDate, e.target.value, newService.startTime, newService.endTime)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">每日开始</label>
                          <Input type="time" className="h-8 text-xs" value={newService.startTime} onChange={e => updateServiceDates(newService.startDate, newService.endDate, e.target.value, newService.endTime)} />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">每日结束</label>
                          <Input type="time" className="h-8 text-xs" value={newService.endTime} onChange={e => updateServiceDates(newService.startDate, newService.endDate, newService.startTime, e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">服务天数</label>
                          <div className="h-8 px-2 flex items-center bg-muted/40 rounded border text-xs">
                            {newService.serviceDays ? (
                              <>{newService.serviceDays}天{newService.actualDays !== newService.serviceDays && <span className="ml-1 text-teal-600">（计费{newService.actualDays}天）</span>}</>
                            ) : <span className="text-muted-foreground">自动计算</span>}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-foreground block mb-1">服务地址</label>
                        <Input className="h-8 text-xs" placeholder="请输入上门服务地址" value={newService.serviceAddress} onChange={e => setNewService(prev => ({ ...prev, serviceAddress: e.target.value }))} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">人员级别</label>
                          <Select value={newService.staffLevel} onValueChange={v => setNewService(prev => ({ ...prev, staffLevel: v }))}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择级别" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="star_5">五星</SelectItem>
                              <SelectItem value="star_4">四星</SelectItem>
                              <SelectItem value="star_3">三星</SelectItem>
                              <SelectItem value="star_2">两星</SelectItem>
                              <SelectItem value="star_1">一星</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-foreground block mb-1">服务方式</label>
                          <Select value={newService.workMode} onValueChange={v => setNewService(prev => ({ ...prev, workMode: v }))}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择方式" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="live_in">住家</SelectItem>
                              <SelectItem value="daytime">白班</SelectItem>
                              <SelectItem value="hourly">钟点</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button size="sm" className="w-full h-8 text-xs" onClick={handleAddService} disabled={!newService.serviceType || !newService.productName}>
                        <Plus className="h-3 w-3 mr-1" />添加服务
                      </Button>
                    </div>

                    {serviceItems.length > 0 && (
                      <div className="space-y-2 mt-3">
                        <p className="text-xs font-medium">已选择服务 ({serviceItems.length})</p>
                        {serviceItems.map(item => {
                          const productLabel = SERVICE_PRODUCTS[item.serviceType]?.find(p => p.value === item.productName)?.label || item.productName
                          return (
                            <div key={item.id} className="p-2.5 rounded-lg border bg-white flex items-center justify-between">
                              <div className="text-xs flex-1">
                                <p className="font-medium">{productLabel}</p>
                                <p className="text-muted-foreground text-[10px]">¥{item.originalPrice.toLocaleString()} · {item.startDate || '未设日期'} 至 {item.endDate || '未设日期'}</p>
                                {item.serviceDays > 0 && <p className="text-[10px] text-teal-600">{item.serviceDays}天{item.actualDays !== item.serviceDays ? `（计费${item.actualDays}天）` : ''}</p>}
                              </div>
                              <button className="p-1 text-red-500 hover:text-red-600" onClick={() => setServiceItems(prev => prev.filter(i => i.id !== item.id))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 上户物料出库单 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="enable-visit-material" checked={enableVisitMaterialOutbound} onCheckedChange={v => setEnableVisitMaterialOutbound(!!v)} />
                      <label htmlFor="enable-visit-material" className="text-xs font-medium cursor-pointer flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5 text-primary" />创建上户物料出库单
                        <Badge variant="secondary" className="text-[10px]">默认勾选</Badge>
                      </label>
                    </div>
                    {enableVisitMaterialOutbound && (
                      <div className="border rounded-lg overflow-hidden bg-blue-50/30">
                        <div className="px-3 py-2 bg-blue-50 border-b"><span className="text-xs font-medium text-blue-900">物料清单</span></div>
                        {visitMaterials.map((m, idx) => (
                          <div key={m.id} className="flex items-center gap-2 px-3 py-2 border-t">
                            <Checkbox checked={m.checked} onCheckedChange={v => setVisitMaterials(prev => prev.map((item, i) => i === idx ? { ...item, checked: !!v } : item))} />
                            <span className="text-xs flex-1">{m.name}</span>
                            <Select value={m.type} onValueChange={(v: 'purchase' | 'gift') => setVisitMaterials(prev => prev.map((item, i) => i === idx ? { ...item, type: v } : item))}>
                              <SelectTrigger className="h-6 text-[10px] w-16"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="purchase">购买</SelectItem>
                                <SelectItem value="gift">赠送</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                        <div className="px-3 py-2 border-t flex items-center gap-2">
                          <Input className="h-7 text-xs flex-1" placeholder="添加物料名称" value={newVisitMaterialName} onChange={e => setNewVisitMaterialName(e.target.value)} />
                          <Select value={newVisitMaterialType} onValueChange={(v: 'purchase' | 'gift') => setNewVisitMaterialType(v)}>
                            <SelectTrigger className="h-7 text-xs w-16"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="purchase">购买</SelectItem>
                              <SelectItem value="gift">赠送</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => {
                            if (!newVisitMaterialName.trim()) return
                            setVisitMaterials(prev => [...prev, { id: `vm_${Date.now()}`, name: newVisitMaterialName.trim(), type: newVisitMaterialType, checked: true }])
                            setNewVisitMaterialName('')
                          }}><Plus className="h-3 w-3 mr-1" />添加</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={() => setCurrentStep(1)}>上一步</Button>
                  <Button className="flex-1 h-10" onClick={() => setCurrentStep(3)} disabled={serviceItems.length === 0}>下一步</Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══════ Step 3 ═══════ */}
        {currentStep === 3 && (
          <div className="space-y-4">
            {orderType === 'training' && !isReceiptOnly ? (
              <>
                {/* 课程费用明细 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-emerald-900">课程费用明细</p>
                    <div className="space-y-1.5">
                      {selectedCourses.map(course => (
                        <div key={course.id} className="flex justify-between text-xs py-1 px-2 bg-white rounded border">
                          <span>{course.name}</span>
                          <span className="font-medium">{isPackageMode ? '含于套餐' : `¥${(course.discountedPrice || course.price).toLocaleString()}`}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg border bg-primary/5 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">原价合计</span>
                        <span className="font-medium">¥{trainingTotalPrice.toLocaleString()}</span>
                      </div>
                      {trainingTotalDiscount > 0 && (
                        <div className="flex justify-between text-amber-700">
                          <span>{isPackageMode ? '一次性优惠' : '连报折扣减免'}</span>
                          <span className="font-medium">-¥{trainingTotalDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t pt-2 font-bold text-primary">
                        <span>最终应付</span>
                        <span className="text-lg">¥{trainingFinalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 支付方式 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold">支付方式</p>
                    <Select value={trainingPaymentType} onValueChange={setTrainingPaymentType}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">全款支付</SelectItem>
                        <SelectItem value="deposit">定金+尾款 (30%+70%)</SelectItem>
                        <SelectItem value="installment">分期付款</SelectItem>
                      </SelectContent>
                    </Select>

                    {trainingPaymentType === 'deposit' && (
                      <div className="p-2 rounded-lg border bg-amber-50 text-xs text-amber-900 space-y-1">
                        <div className="flex justify-between"><span>定金 (30%)</span><span>¥{Math.round(trainingFinalPrice * 0.3).toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>尾款 (70%)</span><span>¥{Math.round(trainingFinalPrice * 0.7).toLocaleString()}</span></div>
                      </div>
                    )}

                    {trainingPaymentType === 'installment' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium">付款账单</p>
                          <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent" onClick={() => addBill(setTrainingBills, trainingFinalPrice)}>
                            <Plus className="w-3 h-3 mr-1" />添加账单
                          </Button>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div><p className="text-[10px] text-muted-foreground">订单总额</p><p className="text-sm font-bold text-primary">¥{trainingFinalPrice.toLocaleString()}</p></div>
                            <div><p className="text-[10px] text-muted-foreground">已付金额</p><p className="text-sm font-bold text-green-600">¥{trainingBills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0).toLocaleString()}</p></div>
                            <div><p className="text-[10px] text-muted-foreground">待付金额</p><p className="text-sm font-bold text-red-500">¥{trainingBills.filter(b => b.status === 'pending').reduce((s, b) => s + b.amount, 0).toLocaleString()}</p></div>
                          </div>
                        </div>
                        {trainingBills.length === 0 ? (
                          <p className="text-xs text-muted-foreground text-center py-4">暂无账单，点击"添加账单"创建分期</p>
                        ) : trainingBills.map((bill, index) => (
                          <BillCard key={bill.id} bill={bill} index={index} onUpdate={(id, u) => updateBill(setTrainingBills, id, u)} onRemove={id => removeBill(setTrainingBills, id)} />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(2)}>上一步</Button>
                  <Button className="flex-1 h-10" onClick={() => setCurrentStep(4)}>下一步</Button>
                </div>
              </>
            ) : orderType === 'service' && !isReceiptOnly ? (
              <>
                {/* 服务项目费用 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-emerald-900">服务项目费用</p>
                    {serviceItems.map(item => {
                      const productLabel = SERVICE_PRODUCTS[item.serviceType]?.find(p => p.value === item.productName)?.label || item.productName
                      const itemTotal = calcServiceItemAmount(item)
                      const dailyRate = item.standardDays > 0 ? Math.round(item.originalPrice / item.standardDays) : 0
                      return (
                        <div key={item.id} className="py-1.5 px-2 rounded bg-white border text-xs">
                          <div className="flex justify-between"><span className="font-medium">{productLabel}</span><span className="font-medium text-emerald-700">¥{itemTotal.toLocaleString()}</span></div>
                          <div className="text-muted-foreground text-[10px] mt-0.5 space-y-0.5">
                            <div>项目总价: ¥{item.originalPrice.toLocaleString()} ÷ {item.standardDays}天 = 日费¥{dailyRate}</div>
                            {item.actualDays > 0 && (
                              <div>
                                日期: {item.startDate} 至 {item.endDate}（{item.serviceDays}天）
                                {item.startTime && <span>，{item.startTime}~{item.endTime}</span>}
                                {item.actualDays !== item.serviceDays && <span className="text-teal-600 ml-1">→ 计费{item.actualDays}天</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    <div className="border-t pt-1.5 flex justify-between text-xs font-bold">
                      <span>服务项目合计</span>
                      <span className="text-emerald-700">¥{serviceSubtotal.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 额外费用 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-blue-900">额外费用</p>
                    <div className="flex items-center justify-between p-2 rounded bg-blue-50 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-3.5 w-3.5" checked={hasTwins} onChange={e => setHasTwins(e.target.checked)} />
                        <span>双胞胎服务费 (+50%)</span>
                      </label>
                      {hasTwins && <span className="font-medium text-blue-600">¥{twinsFee.toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-blue-50 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-3.5 w-3.5" checked={hasPremature} onChange={e => setHasPremature(e.target.checked)} />
                        <span>早产儿服务费</span>
                      </label>
                      <span className="font-medium text-blue-600">¥2,000</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 费用汇总 */}
                <div className="p-3 rounded-lg border bg-primary/5 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">服务项目</span><span className="font-medium">¥{serviceSubtotal.toLocaleString()}</span></div>
                  {hasTwins && <div className="flex justify-between text-blue-600"><span>双胞胎费</span><span className="font-medium">¥{twinsFee.toLocaleString()}</span></div>}
                  {hasPremature && <div className="flex justify-between text-blue-600"><span>早产儿费</span><span className="font-medium">¥2,000</span></div>}
                  <div className="flex justify-between border-t pt-2 font-bold text-primary">
                    <span>订单总费用</span>
                    <span className="text-lg">¥{serviceTotalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* 付款方案 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs font-semibold">付款方案</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="svc_pay" className="w-4 h-4" checked={servicePaymentType === 'full'} onChange={() => setServicePaymentType('full')} />
                        <span className="text-xs">全款支付</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="svc_pay" className="w-4 h-4" checked={servicePaymentType === 'installment'} onChange={() => setServicePaymentType('installment')} />
                        <span className="text-xs">分期付款 (预付10% + 定金20% + 尾款70%)</span>
                      </label>
                    </div>

                    {servicePaymentType === 'installment' && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium">付款账单</p>
                          <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent" onClick={() => addBill(setServiceBills, serviceTotalAmount)}>
                            <Plus className="w-3 h-3 mr-1" />添加账单
                          </Button>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div><p className="text-[10px] text-muted-foreground">订单总额</p><p className="text-sm font-bold text-primary">¥{serviceTotalAmount.toLocaleString()}</p></div>
                            <div><p className="text-[10px] text-muted-foreground">已付金额</p><p className="text-sm font-bold text-green-600">¥{serviceBills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0).toLocaleString()}</p></div>
                            <div><p className="text-[10px] text-muted-foreground">待付金额</p><p className="text-sm font-bold text-red-500">¥{serviceBills.filter(b => b.status === 'pending').reduce((s, b) => s + b.amount, 0).toLocaleString()}</p></div>
                          </div>
                        </div>
                        {serviceBills.length === 0 ? (
                          <p className="text-xs text-muted-foreground text-center py-4">暂无账单，点击"添加账单"创建分期</p>
                        ) : serviceBills.map((bill, index) => (
                          <BillCard key={bill.id} bill={bill} index={index} onUpdate={(id, u) => updateBill(setServiceBills, id, u)} onRemove={id => removeBill(setServiceBills, id)} />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(2)}>上一步</Button>
                  <Button className="flex-1 h-10" onClick={() => setCurrentStep(4)}>下一步</Button>
                </div>
              </>
            ) : (
              /* 收据模式 */
              <>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-primary">付款账单</p>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent" onClick={() => {
                        const newPeriod = receiptBills.length + 1
                        setReceiptBills(prev => [...prev, { id: String(Date.now()), period: newPeriod, amount: 0, plannedDate: '', paidDate: '', status: 'pending' }])
                      }}><Plus className="w-3 h-3 mr-1" />添加账单</Button>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div><p className="text-[10px] text-muted-foreground">订单总额</p><p className="text-sm font-bold text-primary">¥{receiptBills.reduce((s, b) => s + b.amount, 0)}</p></div>
                        <div><p className="text-[10px] text-muted-foreground">已付金额</p><p className="text-sm font-bold text-green-600">¥{receiptBills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0)}</p></div>
                        <div><p className="text-[10px] text-muted-foreground">待付金额</p><p className="text-sm font-bold text-red-500">¥{receiptBills.filter(b => b.status !== 'paid').reduce((s, b) => s + b.amount, 0)}</p></div>
                      </div>
                    </div>
                    {receiptBills.map(bill => (
                      <div key={bill.id} className="border border-border rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-muted text-muted-foreground text-[10px]">第 {bill.period} 期</Badge>
                          <div className="flex items-center gap-2">
                            <select className={cn("text-[10px] px-2 py-1 rounded border-0", bill.status === 'paid' ? "bg-green-100 text-green-700" : bill.status === 'overdue' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}
                              value={bill.status} onChange={e => setReceiptBills(prev => prev.map(b => b.id === bill.id ? { ...b, status: e.target.value as 'paid' | 'pending' | 'overdue' } : b))}>
                              <option value="paid">已付款</option>
                              <option value="pending">待付款</option>
                              <option value="overdue">逾期</option>
                            </select>
                            <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 bg-transparent"><Upload className="w-3 h-3 mr-1" />凭证</Button>
                            <button className="text-red-500 hover:text-red-600" onClick={() => {
                              if (receiptBills.length > 1) setReceiptBills(prev => prev.filter(b => b.id !== bill.id).map((b, i) => ({ ...b, period: i + 1 })))
                            }}><X className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-14">金额:</span>
                            <Input type="number" placeholder="0" className="h-8 text-xs flex-1" value={bill.amount} onChange={e => setReceiptBills(prev => prev.map(b => b.id === bill.id ? { ...b, amount: Number(e.target.value) } : b))} />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-14">计划日期:</span>
                            <Input type="date" className="h-8 text-xs flex-1" value={bill.plannedDate} onChange={e => setReceiptBills(prev => prev.map(b => b.id === bill.id ? { ...b, plannedDate: e.target.value } : b))} />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-14">付款日期:</span>
                            <Input type="date" className="h-8 text-xs flex-1" value={bill.paidDate} onChange={e => setReceiptBills(prev => prev.map(b => b.id === bill.id ? { ...b, paidDate: e.target.value } : b))} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 h-10 bg-transparent" onClick={onBack}>取消</Button>
                  <Button className="flex-1 h-10" onClick={handleReceiptSubmit}>完成</Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══════ Step 4 ═══════ */}
        {currentStep === 4 && (
          <div className="space-y-4">
            {orderType === 'training' ? (
              <>
                {/* 协议类型 */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold">协议类型</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={cn('flex flex-col gap-1 p-3 border-2 rounded-lg cursor-pointer', agreementType === 'training_service' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50')} onClick={() => setAgreementType('training_service')}>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="contractType" checked={agreementType === 'training_service'} readOnly className="w-4 h-4" />
                          <span className="text-sm font-medium">培训服务协议</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground pl-6">培训内容、课程安排、费用、退费规则</p>
                      </label>
                      <label className={cn('flex flex-col gap-1 p-3 border-2 rounded-lg cursor-pointer', agreementType === 'employment' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50')} onClick={() => setAgreementType('employment')}>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="contractType" checked={agreementType === 'employment'} readOnly className="w-4 h-4" />
                          <span className="text-sm font-medium">就业班协议</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground pl-6">就业指导、证书颁发、岗位安置承诺</p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* 合同选择 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm font-semibold">选择合同</p>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input className="h-9 text-xs pl-8" placeholder="搜索合同编号或名称..." value={contractSearch} onChange={e => setContractSearch(e.target.value)} />
                    </div>
                    {contractSearch && (
                      <div className="max-h-32 overflow-y-auto border rounded-lg bg-white">
                        {MOCK_CONTRACTS.filter(c => c.id.toLowerCase().includes(contractSearch.toLowerCase()) || c.name.toLowerCase().includes(contractSearch.toLowerCase())).map(c => (
                          <div key={c.id} className={cn('px-3 py-2 text-xs cursor-pointer hover:bg-muted/50 border-b last:border-0', selectedContractId === c.id && 'bg-primary/5 text-primary')}
                            onClick={() => { setSelectedContractId(c.id); setContractSearch(c.name) }}>
                            <span className="font-medium">{c.id}</span><span className="ml-2 text-muted-foreground">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedContractId && (
                      <div className="flex items-center gap-2 text-[10px] text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-200">
                        <Check className="h-3 w-3" />已选合同：{selectedContractId}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 二方电子签约 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-xs font-semibold flex items-center gap-1.5 text-blue-900"><Edit3 className="h-3.5 w-3.5" />二方合同电子签约</p>
                    <p className="text-[10px] text-blue-700">二方合同（机构 + 客户）需双方签署</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent gap-1" onClick={() => setContractLink(`https://sign.youhou.com/edu/${Date.now()}`)}>
                        <Link className="h-3 w-3" />生成签约链接
                      </Button>
                      {contractLink && (
                        <>
                          <span className="text-[10px] text-muted-foreground truncate flex-1 min-w-0">{contractLink}</span>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => navigator.clipboard?.writeText(contractLink)}><Copy className="h-3 w-3" /></Button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-muted-foreground">签约状态：</span>
                      <Select value={contractSignStatus} onValueChange={(v: 'unsigned' | 'signed') => setContractSignStatus(v)}>
                        <SelectTrigger className="h-6 w-20 text-[10px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unsigned">待签署</SelectItem>
                          <SelectItem value="signed">已签署</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge variant="outline" className={cn('text-[10px]', contractSignStatus === 'signed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200')}>
                        {contractSignStatus === 'signed' ? '已签署' : '待签署'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 线下合同上传 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2"><Upload className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-xs font-semibold">线下合同拍照上传</p></div>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:bg-primary/5 cursor-pointer transition-colors">
                      <p className="text-sm text-primary font-medium">点击或拖拽上传合同</p>
                      <p className="text-xs text-muted-foreground mt-1">支持PDF、JPG、PNG</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 协议确认 */}
                <label className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} />
                  <span className="text-xs text-foreground">我已阅读并同意以上协议条款</span>
                </label>

                {/* 报名信息汇总 */}
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold text-primary">报名信息汇总</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">学员姓名</span><span className="font-medium">{studentName || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">联系电话</span><span className="font-medium">{studentPhone || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">身份证号</span><span className="font-medium">{studentIdCard ? `${studentIdCard.slice(0, 6)}****${studentIdCard.slice(-4)}` : '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">职业顾问</span><span className="font-medium">{trainingAdvisor || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">报名课程</span><span className="font-medium">{selectedCourses.length} 门课程</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-green-200">
                      <div className="flex justify-between"><span className="text-muted-foreground">订单总额</span><span className="font-bold text-primary">¥{trainingTotalPrice.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">优惠减免</span><span className="font-bold text-red-500">-¥{trainingTotalDiscount.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">证书数量</span><span className="font-medium">{certificateCount} 本</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">订单实付</span><span className="font-bold text-green-600">¥{trainingFinalPrice.toLocaleString()}</span></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-100 rounded text-[10px] text-green-700">
                      <Check className="w-3.5 h-3.5" />包含 {certificateCount} 本结业证书颁发
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 px-6 bg-transparent" onClick={() => setCurrentStep(3)}>上一步</Button>
                  <Button className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit} disabled={!agreedTerms}>
                    <Check className="w-4 h-4 mr-1.5" />提交订单
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* 合同选择 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2"><Edit3 className="w-4 h-4 text-primary" /><p className="text-sm font-semibold">选择合同</p></div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input className="h-9 text-xs pl-8" placeholder="搜索合同编号或名称..." value={contractSearch} onChange={e => setContractSearch(e.target.value)} />
                    </div>
                    {contractSearch && (
                      <div className="max-h-32 overflow-y-auto border rounded-lg bg-white">
                        {MOCK_SERVICE_CONTRACTS.filter(c => c.id.toLowerCase().includes(contractSearch.toLowerCase()) || c.name.toLowerCase().includes(contractSearch.toLowerCase())).map(c => (
                          <div key={c.id} className={cn('px-3 py-2 text-xs cursor-pointer hover:bg-muted/50 border-b last:border-0', selectedContractId === c.id && 'bg-primary/5 text-primary')}
                            onClick={() => { setSelectedContractId(c.id); setContractSearch(c.name) }}>
                            <span className="font-medium">{c.id}</span><span className="ml-2 text-muted-foreground">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedContractId && (
                      <div className="flex items-center gap-2 text-[10px] text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-200">
                        <Check className="h-3 w-3" />已选合同：{selectedContractId}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 三方电子签约 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-xs font-semibold flex items-center gap-1.5 text-blue-900"><Edit3 className="h-3.5 w-3.5" />三方合同电子签约</p>
                    <p className="text-[10px] text-blue-700">三方合同（机构 + 客户 + 服务人员）需同时签署</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent gap-1" onClick={() => setTripartiteLink(`https://sign.youhou.com/srv/${Date.now()}`)}>
                        <Link className="h-3 w-3" />生成签约链接
                      </Button>
                      {tripartiteLink && (
                        <>
                          <span className="text-[10px] text-muted-foreground truncate flex-1 min-w-0">{tripartiteLink}</span>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => navigator.clipboard?.writeText(tripartiteLink)}><Copy className="h-3 w-3" /></Button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-muted-foreground">签约状态：</span>
                      <Select value={tripartiteSignStatus} onValueChange={(v: 'unsigned' | 'signed') => setTripartiteSignStatus(v)}>
                        <SelectTrigger className="h-6 w-20 text-[10px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unsigned">待签署</SelectItem>
                          <SelectItem value="signed">已签署</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge variant="outline" className={cn('text-[10px]', tripartiteSignStatus === 'signed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200')}>
                        {tripartiteSignStatus === 'signed' ? '已签署' : '待签署'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 线下合同上传 */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2"><Upload className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-xs font-semibold">线下合同拍照上传</p></div>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:bg-primary/5 cursor-pointer transition-colors">
                      <p className="text-sm text-primary font-medium">点击或拖拽上传合同</p>
                      <p className="text-xs text-muted-foreground mt-1">支持PDF、JPG、PNG</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 成交方式 */}
                <Card className="border border-amber-200 bg-amber-50">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold text-primary">成交方式</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ value: 'meeting', label: '月嫂见面会' }, { value: 'online', label: '线上成交' }, { value: 'offline', label: '线下成交' }].map(opt => (
                        <label key={opt.value} className={cn('flex items-center justify-center gap-2 p-3 border bg-white rounded-lg cursor-pointer', dealType === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-amber-100')} onClick={() => setDealType(opt.value)}>
                          <input type="radio" name="dealType" checked={dealType === opt.value} readOnly className="w-4 h-4" />
                          <span className="text-xs">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 订单信息汇总 */}
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-semibold text-emerald-800">订单信息汇总</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">客户姓名</span><span className="font-medium">{customerName || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">联系电话</span><span className="font-medium">{customerPhone || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">服务类型</span><span className="font-medium">{serviceItems.length > 0 ? `${serviceItems.length}项服务` : '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">订单总额</span><span className="font-medium text-primary">¥{serviceTotalAmount.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">上户日期</span><span className="font-medium">{expectedStartDate || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">招生顾问</span><span className="font-medium">{serviceAdvisor || '-'}</span></div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" className="h-10 px-4 bg-transparent" onClick={() => setCurrentStep(3)}>上一步</Button>
                  <Button className="flex-1 h-10" onClick={handleSubmit}>确认发送并创建合同</Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── 账单卡片子组件 ──
function BillCard({ bill, index, onUpdate, onRemove }: {
  bill: PaymentBill; index: number
  onUpdate: (id: string, updates: Partial<PaymentBill>) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <Badge className="bg-muted text-muted-foreground text-[10px]">第 {index + 1} 期</Badge>
        <div className="flex items-center gap-2">
          <select className={cn('text-[10px] px-2 py-1 rounded border-0', bill.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')}
            value={bill.status} onChange={e => onUpdate(bill.id, { status: e.target.value as 'pending' | 'paid' })}>
            <option value="pending">待付款</option>
            <option value="paid">已付款</option>
          </select>
          {bill.status === 'paid' && (
            <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 bg-transparent"><Upload className="w-3 h-3 mr-1" />凭证</Button>
          )}
          <button className="text-red-500 hover:text-red-600" onClick={() => onRemove(bill.id)}><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-14 shrink-0">金额:</span>
          <Input type="number" placeholder="0" className="h-7 text-xs flex-1" value={bill.amount} onChange={e => onUpdate(bill.id, { amount: Number(e.target.value) })} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-14 shrink-0">计划日期:</span>
          <Input type="date" className="h-7 text-xs flex-1" value={bill.dueDate} onChange={e => onUpdate(bill.id, { dueDate: e.target.value })} />
        </div>
      </div>
    </div>
  )
}
