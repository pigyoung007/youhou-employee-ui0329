"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search, Plus, Phone, ChevronRight, User, Tag, Clock,
  MessageCircle, Mic, Baby, Calendar, X, Check,
  Users, Video, ClipboardList, GraduationCap, Heart, Sparkles, History, MapPin, Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CustomerDetailDrawer } from '@/components/customer-detail-drawer'
import type { OrderPrefillData } from '@/components/employee/merged/orders-create-page'

// ==================== 类型定义 ====================

type ScrmDemandTypeKey = 'training' | 'maternity_nanny' | 'maternity_infant' | 'wellness'
type FollowupType = 'phone' | 'wechat' | 'visit' | 'video' | 'demand_info'
type BusinessType = 'all' | 'maternal' | 'wellness' | 'student' | 'sales' | 'transfer' | 'maintenance' | 'demand_info'

interface CustomerFormData {
  name: string; phone: string; gender: string; wechat?: string; address?: string; budget?: string
  careerConsultant?: string; maternalConsultant?: string; wellnessTechnician?: string; invitationConsultant?: string
  source: string; notes?: string
  employType?: string; expectedEmployDate?: string; actualEmployDate?: string; skillGraduateDate?: string
  hasCertificate?: string; expectedSalary?: string; experience?: string; workHistory?: string
  course?: string; className?: string; enrollDate?: string; familyIntro?: string
  serviceType?: string; dueDate?: string; isSecondBaby?: string; serviceStartDate?: string; serviceEndDate?: string; requirements?: string
  wellnessPlannedDate?: string; wellnessServiceProject?: string; wellnessRequirements?: string
}

interface FollowupRecord {
  id: string; type: FollowupType; businessType: Exclude<BusinessType, 'all'>
  content: string; time: string; duration?: string
  consultantName: string; consultantIsResigned?: boolean; hasRecording?: boolean
}

interface LeadItem {
  id: number; name: string; phone: string; type: 'training' | 'employer'
  intention: string; lastContact: string; note: string
  category?: string; source?: string; serviceType?: string; dueDate?: string; address?: string; budget?: string
  followUps: FollowupRecord[]
}

// ==================== 配置常量 ====================

const consultantSelectValues = ['张顾问', '李顾问', '王顾问', '赵顾问', '周顾问']
const sourceOptions = ['线上咨询', '线下活动', '老学员介绍', '抖音推广', '官网报名', '美团推广', '小红书', '朋友介绍', '其他']
const budgetOptions = ['5000以下', '5000-10000', '10000-15000', '15000-20000', '20000以上']
const scrmDemandOptions: { id: ScrmDemandTypeKey; label: string }[] = [
  { id: 'training', label: '培训需求' }, { id: 'maternity_nanny', label: '月嫂需求' },
  { id: 'maternity_infant', label: '育婴师需求' }, { id: 'wellness', label: '产康需求' },
]
const availableTags = [
  { id: 'high-intent', name: '高意向', color: 'rose', group: '意向' },
  { id: 'mid-intent', name: '中意向', color: 'amber', group: '意向' },
  { id: 'low-intent', name: '低意向', color: 'gray', group: '意向' },
  { id: 'urgent', name: '紧急', color: 'red', group: '特征' },
  { id: 'vip', name: 'VIP', color: 'purple', group: '特征' },
  { id: 'first-baby', name: '一胎', color: 'blue', group: '需求' },
  { id: 'second-baby', name: '二胎', color: 'cyan', group: '需求' },
  { id: 'twins', name: '双胞胎', color: 'teal', group: '需求' },
]
const tagColorMap: Record<string, string> = {
  rose: 'bg-rose-100 text-rose-700 border-rose-200', amber: 'bg-amber-100 text-amber-700 border-amber-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200', red: 'bg-red-100 text-red-700 border-red-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200', blue: 'bg-blue-100 text-blue-700 border-blue-200',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200', teal: 'bg-teal-100 text-teal-700 border-teal-200',
}
const followupTypeConfig: Record<FollowupType, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  phone: { label: '电话', icon: Phone, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  wechat: { label: '微信', icon: MessageCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
  visit: { label: '拜访', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  video: { label: '视频', icon: Video, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  demand_info: { label: '自定义信息', icon: ClipboardList, color: 'text-teal-600', bgColor: 'bg-teal-50' },
}
const businessTypeConfig: Record<string, { label: string; className: string }> = {
  maternal: { label: '母婴业务', className: 'text-rose-600 bg-rose-50 border-rose-200' },
  wellness: { label: '产康业务', className: 'text-teal-600 bg-teal-50 border-teal-200' },
  student: { label: '学员业务', className: 'text-purple-600 bg-purple-50 border-purple-200' },
  sales: { label: '销售活动', className: 'text-orange-600 bg-orange-50 border-orange-200' },
  transfer: { label: '流转记录', className: 'text-amber-600 bg-amber-50 border-amber-200' },
  maintenance: { label: '资料维护', className: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  demand_info: { label: '自定义信息', className: 'text-blue-600 bg-blue-50 border-blue-200' },
}
const intentionConfig: Record<string, { label: string; className: string }> = {
  high: { label: '高意向', className: 'bg-green-100 text-green-700 border-green-200' },
  medium: { label: '中意向', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  low: { label: '低意向', className: 'bg-gray-100 text-gray-700 border-gray-200' },
}

// ==================== Mock 数据 ====================

const INITIAL_TRAINING_LEADS: LeadItem[] = [
  { id: 1, name: "张女士", phone: "138****1234", category: "月嫂培训", source: "抖音广告", intention: "高意向", lastContact: "2026-01-21", note: "咨询月嫂培训课程，预计下月报名", type: "training",
    followUps: [
      { id: 'FT1-1', type: 'phone', businessType: 'student', content: '初次电话沟通，客户对月嫂培训很感兴趣，已介绍课程体系', time: '2026-01-21 10:30', duration: '10分钟', consultantName: '张顾问', hasRecording: true },
      { id: 'FT1-2', type: 'wechat', businessType: 'student', content: '发送课程资料，客户表示会仔细了解', time: '2026-01-19 14:00', consultantName: '张顾问' },
    ],
  },
  { id: 2, name: "李阿姨", phone: "139****5678", category: "育婴师培训", source: "朋友推荐", intention: "中意向", lastContact: "2026-01-20", note: "有育儿经验，想考证", type: "training",
    followUps: [{ id: 'FT2-1', type: 'phone', businessType: 'student', content: '电话回访，客户考虑中', time: '2026-01-20 15:00', duration: '5分钟', consultantName: '李顾问' }],
  },
  { id: 3, name: "赵女士", phone: "136****3456", category: "产康培训", source: "小红书", intention: "高意向", lastContact: "2026-01-22", note: "美容行业转行，对产康很感兴趣", type: "training", followUps: [] },
]

const INITIAL_EMPLOYER_LEADS: LeadItem[] = [
  { id: 101, name: "王女士", phone: "138****1234", dueDate: "2026-03-15", address: "银川市金凤区", budget: "15000-18000", serviceType: "月嫂", intention: "高意向", lastContact: "2026-01-21", note: "预产期3月中旬，需要金牌月嫂", type: "employer",
    followUps: [
      { id: 'FE1-1', type: 'phone', businessType: 'maternal', content: '已推荐3位阿姨，客户正在考虑', time: '2026-01-21 14:30', duration: '12分钟', consultantName: '张顾问', hasRecording: true },
      { id: 'FE1-2', type: 'wechat', businessType: 'maternal', content: '初次电话沟通，了解需求', time: '2026-01-19 10:00', consultantName: '周顾问', consultantIsResigned: true },
    ],
  },
  { id: 102, name: "李先生", phone: "139****5678", dueDate: "2026-04-20", address: "银川市兴庆区", budget: "12000-15000", serviceType: "育儿嫂", intention: "中意向", lastContact: "2026-01-20", note: "二胎家庭，需要有经验的育儿嫂", type: "employer", followUps: [] },
]

const intentionTags = ["高意向", "中意向", "低意向", "已报名", "已签约", "已流失"]

function mergedLeadToOrderPrefill(lead: LeadItem): OrderPrefillData {
  if (lead.type === 'training') {
    return { customerName: lead.name, serviceType: lead.category || "培训课程" }
  }
  const serviceLabel = lead.serviceType === "月嫂" ? "月嫂服务" : `${lead.serviceType}服务`
  return { customerName: lead.name, serviceType: serviceLabel, startDate: lead.dueDate, dueDate: lead.dueDate }
}

// ==================== 主组件 ====================

interface MergedLeadsPageProps {
  onNewOrder?: (prefill: OrderPrefillData) => void
  onNewReceipt?: (prefill: OrderPrefillData) => void
}

export function MergedLeadsPage({ onNewOrder, onNewReceipt }: MergedLeadsPageProps = {}) {
  const [allLeads, setAllLeads] = useState<LeadItem[]>([...INITIAL_TRAINING_LEADS, ...INITIAL_EMPLOYER_LEADS])
  const [activeLeadType, setActiveLeadType] = useState<"all" | "training" | "employer">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null)

  // 新建客户
  const [showAddLead, setShowAddLead] = useState(false)
  const [createStep, setCreateStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CustomerFormData>>({ name: '', phone: '', gender: '', source: '' })
  const [demandTypes, setDemandTypes] = useState<ScrmDemandTypeKey[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 跟进
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)
  const [followUpLead, setFollowUpLead] = useState<LeadItem | null>(null)
  const [newFollowupType, setNewFollowupType] = useState<FollowupType>('phone')
  const [newFollowupBiz, setNewFollowupBiz] = useState<Exclude<BusinessType, 'all'>>('maternal')
  const [newFollowupContent, setNewFollowupContent] = useState('')
  const [nextFollowDate, setNextFollowDate] = useState('')

  // 跟进记录
  const [showFollowUpHistory, setShowFollowUpHistory] = useState(false)
  const [historyLead, setHistoryLead] = useState<LeadItem | null>(null)
  const [historyConsultantFilter, setHistoryConsultantFilter] = useState('all')
  const [historyBizFilter, setHistoryBizFilter] = useState('all')

  const filteredLeads = allLeads
    .filter(lead => { if (activeLeadType === "training") return lead.type === "training"; if (activeLeadType === "employer") return lead.type === "employer"; return true })
    .filter(lead => activeFilter === "all" || lead.intention === activeFilter)
    .filter(lead => !searchQuery || lead.name.includes(searchQuery) || lead.phone.includes(searchQuery))

  const getIntentionColor = (intention: string) => {
    switch (intention) {
      case "高意向": return "bg-teal-100 text-teal-700"
      case "中意向": return "bg-amber-100 text-amber-700"
      case "低意向": return "bg-gray-100 text-gray-600"
      case "已报名": case "已签约": return "bg-violet-100 text-violet-700"
      case "已流失": return "bg-red-100 text-red-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  // 新建客户
  const updateFormData = (field: keyof CustomerFormData, value: string) => setFormData(prev => ({ ...prev, [field]: value }))
  const handleToggleDemand = (id: ScrmDemandTypeKey) => {
    setDemandTypes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }
  const toggleTag = (tagId: string) => setSelectedTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId])
  const canProceedStep1 = !!(
    (formData.name || '').trim() &&
    (formData.phone || '').trim() &&
    formData.gender &&
    formData.source &&
    demandTypes.length > 0
  )

  const step1MissingLabels: string[] = []
  if (!(formData.name || '').trim()) step1MissingLabels.push('姓名')
  if (!(formData.phone || '').trim()) step1MissingLabels.push('手机号')
  if (!formData.gender) step1MissingLabels.push('性别')
  if (!formData.source) step1MissingLabels.push('客户来源')
  if (demandTypes.length === 0) step1MissingLabels.push('客户需求类型')

  const resetCreateForm = () => { setCreateStep(1); setFormData({ name: '', phone: '', gender: '', source: '' }); setDemandTypes([]); setSelectedTags([]) }
  const handleCreateSubmit = () => {
    const newLead: LeadItem = {
      id: Date.now(), name: formData.name || '未命名', phone: formData.phone || '',
      type: demandTypes.includes('training') ? 'training' : 'employer',
      intention: selectedTags.includes('high-intent') ? '高意向' : selectedTags.includes('mid-intent') ? '中意向' : '低意向',
      lastContact: new Date().toISOString().split('T')[0], note: formData.notes || '',
      source: formData.source, category: demandTypes.includes('training') ? (formData.course || '培训课程') : undefined,
      serviceType: formData.serviceType, dueDate: formData.dueDate, address: formData.address, budget: formData.budget,
      followUps: [],
    }
    setAllLeads(prev => [newLead, ...prev])
    resetCreateForm()
    setShowAddLead(false)
  }

  // 跟进
  const resetFollowupForm = () => { setNewFollowupType('phone'); setNewFollowupBiz('maternal'); setNewFollowupContent(''); setNextFollowDate('') }
  const handleSaveFollowup = () => {
    if (!followUpLead || !newFollowupContent.trim()) return
    const newRecord: FollowupRecord = {
      id: `F-${Date.now()}`, type: newFollowupType, businessType: newFollowupBiz,
      content: newFollowupContent, time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
      consultantName: '张顾问',
    }
    setAllLeads(prev => prev.map(l => l.id !== followUpLead.id ? l : { ...l, followUps: [newRecord, ...l.followUps], lastContact: new Date().toISOString().split('T')[0] }))
    resetFollowupForm()
    setShowAddFollowUp(false)
  }

  // ==================== 新建客户 Step1 ====================

  const renderCreateStep1 = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1"><Label className="text-xs">客户姓名 <span className="text-red-500">*</span></Label><Input className="h-8 text-xs" placeholder="请输入姓名" value={formData.name || ''} onChange={e => updateFormData('name', e.target.value)} /></div>
        <div className="space-y-1"><Label className="text-xs">手机号 <span className="text-red-500">*</span></Label><Input className="h-8 text-xs" placeholder="11位手机号" value={formData.phone || ''} onChange={e => updateFormData('phone', e.target.value)} /></div>
        <div className="space-y-1">
          <Label className="text-xs">性别 <span className="text-red-500">*</span></Label>
          <Select value={formData.gender} onValueChange={v => updateFormData('gender', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]"><SelectItem value="female">女</SelectItem><SelectItem value="male">男</SelectItem></SelectContent></Select>
        </div>
        <div className="space-y-1"><Label className="text-xs">微信</Label><Input className="h-8 text-xs" placeholder="微信号" value={formData.wechat || ''} onChange={e => updateFormData('wechat', e.target.value)} /></div>
        <div className="space-y-1 col-span-2"><Label className="text-xs">居住地址</Label><Input className="h-8 text-xs" placeholder="常住地址" value={formData.address || ''} onChange={e => updateFormData('address', e.target.value)} /></div>
        <div className="space-y-1">
          <Label className="text-xs">预算范围</Label>
          <Select value={formData.budget || undefined} onValueChange={v => updateFormData('budget', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择预算" /></SelectTrigger><SelectContent className="z-[110]">{budgetOptions.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">客户来源 <span className="text-red-500">*</span></Label>
          <Select value={formData.source} onValueChange={v => updateFormData('source', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择来源" /></SelectTrigger><SelectContent className="z-[110]">{sourceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="space-y-1"><Label className="text-xs">所属职业顾问</Label><Select value={formData.careerConsultant || undefined} onValueChange={v => updateFormData('careerConsultant', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-1"><Label className="text-xs">所属母婴顾问</Label><Select value={formData.maternalConsultant || undefined} onValueChange={v => updateFormData('maternalConsultant', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-1"><Label className="text-xs">产康技师</Label><Select value={formData.wellnessTechnician || undefined} onValueChange={v => updateFormData('wellnessTechnician', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-1"><Label className="text-xs">邀约顾问</Label><Select value={formData.invitationConsultant || undefined} onValueChange={v => updateFormData('invitationConsultant', v)}><SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent></Select></div>
      </div>

      <div className="space-y-2 rounded-md border bg-muted/20 p-3">
        <span className="text-xs font-medium">客户需求类型 <span className="text-red-500">*</span>（可多选）</span>
        <div className="grid grid-cols-2 gap-2">
          {scrmDemandOptions.map((opt) => {
            const active = demandTypes.includes(opt.id)
            return (
              <div
                key={opt.id}
                role="checkbox"
                aria-checked={active}
                tabIndex={0}
                className="flex cursor-pointer select-none items-center gap-2 text-xs"
                onClick={() => handleToggleDemand(opt.id)}
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggleDemand(opt.id) } }}
              >
                <div className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-colors',
                  active ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background'
                )}>
                  {active && <Check className="h-3 w-3" />}
                </div>
                <span>{opt.label}</span>
              </div>
            )
          })}
        </div>
        {demandTypes.length === 0 && <p className="text-[10px] text-amber-700">请至少选择一种需求类型</p>}
      </div>

      <div className="space-y-1">
        <Label className="text-xs">客户标签</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent w-full justify-start">
              <Tag className="h-3 w-3 mr-2" />
              {selectedTags.length > 0 ? (
                <div className="flex gap-1 flex-wrap">
                  {selectedTags.slice(0, 3).map(tagId => { const tag = availableTags.find(t => t.id === tagId); return tag ? <Badge key={tagId} variant="secondary" className={cn('text-[9px] h-4', tagColorMap[tag.color])}>{tag.name}</Badge> : null })}
                  {selectedTags.length > 3 && <Badge variant="secondary" className="text-[9px] h-4">+{selectedTags.length - 3}</Badge>}
                </div>
              ) : <span className="text-muted-foreground">选择客户标签</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[110] w-56 p-2" align="start">
            {['意向', '特征', '需求'].map(group => {
              const groupTags = availableTags.filter(t => t.group === group)
              return (
                <div key={group} className="mb-2">
                  <p className="text-[10px] text-muted-foreground mb-1">{group}</p>
                  <div className="flex flex-wrap gap-1">
                    {groupTags.map(tag => (
                      <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)}
                        className={cn('px-1.5 py-0.5 rounded text-[10px] border transition-colors', selectedTags.includes(tag.id) ? tagColorMap[tag.color] : 'bg-muted/50 hover:bg-muted')}>
                        {selectedTags.includes(tag.id) && <Check className="h-2 w-2 inline mr-0.5" />}{tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1"><Label className="text-xs">备注</Label><Textarea className="text-xs min-h-[56px] resize-none" placeholder="备注信息" value={formData.notes || ''} onChange={e => updateFormData('notes', e.target.value)} /></div>
    </div>
  )

  // ==================== 新建客户 Step2 ====================

  const renderCreateStep2 = () => (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground font-medium">按已勾选的需求类型维护详细信息</p>
      {demandTypes.length === 0 && <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">当前没有勾选需求类型，请点击「上一步」勾选。</div>}

      {demandTypes.includes('training') && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-3 py-2 bg-purple-50 border-b flex items-center gap-2 text-xs font-medium text-purple-900"><GraduationCap className="h-3.5 w-3.5 shrink-0" /> 培训需求 · 就业信息</div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">就业类型 <span className="text-red-500">*</span></Label><Select value={formData.employType || ''} onValueChange={v => updateFormData('employType', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]">{['月嫂', '育婴师', '保姆', '护工', '收纳师'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-1"><Label className="text-xs">预计就业时间</Label><Input className="h-8 text-xs" type="date" value={formData.expectedEmployDate || ''} onChange={e => updateFormData('expectedEmployDate', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">实际就业时间</Label><Input className="h-8 text-xs" type="date" value={formData.actualEmployDate || ''} onChange={e => updateFormData('actualEmployDate', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">技能岗毕业时间</Label><Input className="h-8 text-xs" type="date" value={formData.skillGraduateDate || ''} onChange={e => updateFormData('skillGraduateDate', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">有无证书</Label><Select value={formData.hasCertificate || ''} onValueChange={v => updateFormData('hasCertificate', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]"><SelectItem value="yes">有</SelectItem><SelectItem value="no">无</SelectItem></SelectContent></Select></div>
              <div className="space-y-1"><Label className="text-xs">期望薪资</Label><Input className="h-8 text-xs" placeholder="如: 10000-12000" value={formData.expectedSalary || ''} onChange={e => updateFormData('expectedSalary', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">从业经验</Label><Input className="h-8 text-xs" placeholder="如: 3年" value={formData.experience || ''} onChange={e => updateFormData('experience', e.target.value)} /></div>
            </div>
            <div className="space-y-1"><Label className="text-xs">工作经历</Label><Textarea className="text-xs min-h-[48px] resize-none" placeholder="请描述工作经历" value={formData.workHistory || ''} onChange={e => updateFormData('workHistory', e.target.value)} /></div>
          </div>
          <div className="px-3 py-2 bg-purple-50/80 border-t border-b flex items-center gap-2 text-xs font-medium text-purple-900"><GraduationCap className="h-3.5 w-3.5 shrink-0" /> 培训需求 · 培训信息</div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">培训课程 <span className="text-red-500">*</span></Label><Select value={formData.course || ''} onValueChange={v => updateFormData('course', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择课程" /></SelectTrigger><SelectContent className="z-[110]">{['高级月嫂', '育婴师', '产康师初级', '产康师高级'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-1"><Label className="text-xs">所在班级 <span className="text-red-500">*</span></Label><Select value={formData.className || ''} onValueChange={v => updateFormData('className', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择班级" /></SelectTrigger><SelectContent className="z-[110]">{['2025年第1期', '2025年第2期', '2025年第3期'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-1"><Label className="text-xs">入学日期</Label><Input className="h-8 text-xs" type="date" value={formData.enrollDate || ''} onChange={e => updateFormData('enrollDate', e.target.value)} /></div>
            </div>
            <div className="space-y-1"><Label className="text-xs">家庭介绍</Label><Textarea className="text-xs min-h-[48px] resize-none" placeholder="家庭情况介绍" value={formData.familyIntro || ''} onChange={e => updateFormData('familyIntro', e.target.value)} /></div>
          </div>
        </div>
      )}

      {(demandTypes.includes('maternity_nanny') || demandTypes.includes('maternity_infant')) && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-3 py-2 bg-rose-50 border-b flex items-center gap-2 text-xs font-medium text-rose-900"><Heart className="h-3.5 w-3.5 shrink-0" /> 月嫂 / 育婴师服务要求</div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">服务类型</Label><Select value={formData.serviceType || ''} onValueChange={v => updateFormData('serviceType', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]">
                {demandTypes.includes('maternity_nanny') && <><SelectItem value="月嫂">月嫂</SelectItem><SelectItem value="催乳师">催乳师</SelectItem></>}
                {demandTypes.includes('maternity_infant') && <><SelectItem value="育婴师">育婴师</SelectItem><SelectItem value="保姆">保姆</SelectItem></>}
              </SelectContent></Select></div>
              <div className="space-y-1"><Label className="text-xs">预产期</Label><Input className="h-8 text-xs" type="date" value={formData.dueDate || ''} onChange={e => updateFormData('dueDate', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">是否二胎</Label><Select value={formData.isSecondBaby || ''} onValueChange={v => updateFormData('isSecondBaby', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger><SelectContent className="z-[110]"><SelectItem value="yes">是</SelectItem><SelectItem value="no">否</SelectItem></SelectContent></Select></div>
              <div className="space-y-1"><Label className="text-xs">服务开始日期</Label><Input className="h-8 text-xs" type="date" value={formData.serviceStartDate || ''} onChange={e => updateFormData('serviceStartDate', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">服务结束日期</Label><Input className="h-8 text-xs" type="date" value={formData.serviceEndDate || ''} onChange={e => updateFormData('serviceEndDate', e.target.value)} /></div>
            </div>
            <div className="space-y-1"><Label className="text-xs">其他服务要求</Label><Textarea className="text-xs min-h-[48px] resize-none" placeholder="口味、住家/不住家、技能证书偏好等" value={formData.requirements || ''} onChange={e => updateFormData('requirements', e.target.value)} /></div>
          </div>
        </div>
      )}

      {demandTypes.includes('wellness') && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-3 py-2 bg-teal-50 border-b flex items-center gap-2 text-xs font-medium text-teal-900"><Sparkles className="h-3.5 w-3.5 shrink-0" /> 产康服务要求</div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">预服务时间</Label><Input className="h-8 text-xs" type="date" value={formData.wellnessPlannedDate || ''} onChange={e => updateFormData('wellnessPlannedDate', e.target.value)} /></div>
              <div className="space-y-1"><Label className="text-xs">意向产康项目</Label><Select value={formData.wellnessServiceProject || ''} onValueChange={v => updateFormData('wellnessServiceProject', v)}><SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择项目" /></SelectTrigger><SelectContent className="z-[110]">{['盆底康复', '腹直肌修复', '骨盆修复', '满月汗蒸', '产后修复'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="space-y-1"><Label className="text-xs">产康需求补充</Label><Textarea className="text-xs min-h-[48px] resize-none" placeholder="身体状况、调理目标等" value={formData.wellnessRequirements || ''} onChange={e => updateFormData('wellnessRequirements', e.target.value)} /></div>
          </div>
        </div>
      )}
    </div>
  )

  // ==================== 跟进记录列表 ====================

  const renderFollowUpHistory = () => {
    if (!historyLead) return null
    const records = historyLead.followUps
    const consultantNames = [...new Set(records.map(r => r.consultantName))]
    const filteredRecords = records.filter(r => {
      if (historyConsultantFilter !== 'all' && r.consultantName !== historyConsultantFilter) return false
      if (historyBizFilter !== 'all' && r.businessType !== historyBizFilter) return false
      return true
    })

    const intentionKey = historyLead.intention === '高意向' ? 'high' : historyLead.intention === '中意向' ? 'medium' : 'low'
    const intentCfg = intentionConfig[intentionKey]

    return (
      <>
        <div className="px-4 py-3 flex items-center gap-3 bg-muted/30 border-b shrink-0">
          <Avatar className="h-10 w-10 shrink-0"><AvatarFallback className="bg-primary/10 text-primary font-medium">{historyLead.name[0]}</AvatarFallback></Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{historyLead.name}</span>
              <Badge variant="outline" className={cn('text-[10px] h-4 px-1.5 border', intentCfg?.className)}>{intentCfg?.label || historyLead.intention}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{historyLead.phone} · {historyLead.type === 'training' ? historyLead.category : historyLead.serviceType}</p>
          </div>
          <Button size="sm" className="h-7 text-xs shrink-0" onClick={() => { setFollowUpLead(historyLead); resetFollowupForm(); setShowAddFollowUp(true) }}>
            <Plus className="h-3.5 w-3.5 mr-1" />新增
          </Button>
        </div>

        {consultantNames.length > 0 && (
          <div className="px-4 py-2 border-b shrink-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-muted-foreground">跟进顾问:</span>
              <button type="button" onClick={() => setHistoryConsultantFilter('all')} className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-colors', historyConsultantFilter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground/30 hover:bg-muted')}>全部</button>
              {consultantNames.map(name => {
                const count = records.filter(r => r.consultantName === name).length
                const resigned = records.find(r => r.consultantName === name)?.consultantIsResigned
                return (
                  <button key={name} type="button" onClick={() => setHistoryConsultantFilter(historyConsultantFilter === name ? 'all' : name)}
                    className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-colors', historyConsultantFilter === name ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground/30 hover:bg-muted')}>
                    <span className="font-medium">{name[0]}</span><span>{name}</span><span className="opacity-70">{count}条</span>
                    {resigned && <span className="ml-0.5 text-[9px] bg-red-100 text-red-600 px-1 rounded">已离职</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="border-b shrink-0">
          <Tabs value={historyBizFilter} onValueChange={setHistoryBizFilter}>
            <TabsList className="h-8 bg-transparent rounded-none justify-start gap-0 px-4 !overflow-x-auto flex-nowrap w-full [&::-webkit-scrollbar]:hidden">
              {[{ key: 'all', label: '全部' }, ...Object.entries(businessTypeConfig).map(([k, v]) => ({ key: k, label: v.label }))].map(item => (
                <TabsTrigger key={item.key} value={item.key} className="text-[10px] px-2.5 py-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shrink-0">{item.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <div className="px-4 py-3 space-y-3">
            {filteredRecords.length === 0 && <div className="text-center py-8"><History className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" /><p className="text-xs text-muted-foreground">暂无跟进记录</p></div>}
            {filteredRecords.map(record => {
              const typeCfg = followupTypeConfig[record.type]
              const bizCfg = businessTypeConfig[record.businessType]
              const Icon = typeCfg?.icon || Phone
              return (
                <div key={record.id} className="flex gap-3">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5', typeCfg?.bgColor || 'bg-muted')}>
                    <Icon className={cn('h-3.5 w-3.5', typeCfg?.color || 'text-muted-foreground')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-medium">{typeCfg?.label || record.type}</span>
                      {bizCfg && <Badge variant="outline" className={cn('text-[9px] h-4 px-1 border', bizCfg.className)}>{bizCfg.label}</Badge>}
                      {record.hasRecording && <Badge variant="outline" className="text-[9px] h-4 px-1 border text-blue-600 bg-blue-50 border-blue-200"><Mic className="h-2.5 w-2.5 mr-0.5" />录音</Badge>}
                    </div>
                    <p className="text-xs text-foreground mb-1 break-words">{record.content}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{record.time}</span>{record.duration && <span>· {record.duration}</span>}<span>· {record.consultantName}</span>
                      {record.consultantIsResigned && <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded">已离职</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </>
    )
  }

  // ==================== 主渲染 ====================

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3 pt-3 pb-3 safe-area-top">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold">线索管理</h1>
          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white h-7 text-[11px] px-2.5" onClick={() => { resetCreateForm(); setShowAddLead(true) }}>
            <Plus className="w-3.5 h-3.5 mr-1" />新增
          </Button>
        </div>
      </header>

      <main className="px-3 py-2.5 space-y-2">
        <Tabs value={activeLeadType} onValueChange={v => setActiveLeadType(v as typeof activeLeadType)}>
          <TabsList className="w-full bg-muted/50 p-0.5 rounded-lg h-8">
            <TabsTrigger value="all" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">全部</TabsTrigger>
            <TabsTrigger value="training" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">培训线索</TabsTrigger>
            <TabsTrigger value="employer" className="flex-1 rounded-md text-xs h-7 data-[state=active]:bg-white">雇主线索</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="搜索姓名或手机号" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8 h-8 text-xs" />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {["all", "高意向", "中意向", "低意向"].map(filter => (
            <Button key={filter} size="sm" variant={activeFilter === filter ? "default" : "outline"}
              className={`text-[11px] h-6 px-2.5 shrink-0 ${activeFilter === filter ? "bg-violet-500 hover:bg-violet-600" : "bg-transparent"}`}
              onClick={() => setActiveFilter(filter)}
            >{filter === "all" ? "全部" : filter}</Button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredLeads.map(lead => (
            <Card key={`${lead.type}-${lead.id}`} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedLead(lead)}>
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${lead.type === "training" ? "bg-violet-100" : "bg-rose-100"}`}>
                      <User className={`w-4 h-4 ${lead.type === "training" ? "text-violet-500" : "text-rose-500"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm">{lead.name}</h3>
                        <Badge className={`text-[9px] px-1.5 py-0 ${lead.type === "training" ? "bg-violet-100 text-violet-700" : "bg-rose-100 text-rose-700"}`}>
                          {lead.type === "training" ? "培训" : "雇主"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{lead.phone}</p>
                    </div>
                  </div>
                  <Badge className={`text-[9px] px-1.5 py-0 shrink-0 ${getIntentionColor(lead.intention)}`}>{lead.intention}</Badge>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-1 text-[11px] text-muted-foreground">
                  {lead.type === "training" && lead.category && <span className="flex items-center gap-0.5"><Tag className="w-3 h-3" />{lead.category}</span>}
                  {lead.type === "employer" && lead.serviceType && <>
                    <span className="flex items-center gap-0.5"><Baby className="w-3 h-3" />{lead.serviceType}</span>
                    <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />预产期：{lead.dueDate}</span>
                  </>}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">{lead.note}</p>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />跟进：{lead.lastContact}
                  </span>
                  {lead.followUps.length > 0 && (
                    <span className="text-[10px] text-muted-foreground">{lead.followUps.length}条记录</span>
                  )}
                </div>

                <div className="flex gap-1.5 pt-2 border-t border-border">
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs bg-transparent" onClick={e => { e.stopPropagation(); setFollowUpLead(lead); resetFollowupForm(); setShowAddFollowUp(true) }}>
                    <Plus className="w-3 h-3 mr-1" />添加跟进
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs bg-transparent" onClick={e => { e.stopPropagation(); setHistoryLead(lead); setHistoryConsultantFilter('all'); setHistoryBizFilter('all'); setShowFollowUpHistory(true) }}>
                    <Clock className="w-3 h-3 mr-1" />跟进记录
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 客户详情 */}
      <CustomerDetailDrawer
        open={!!selectedLead && !showFollowUpHistory}
        onClose={() => setSelectedLead(null)}
        onNewOrder={onNewOrder && selectedLead ? () => { onNewOrder(mergedLeadToOrderPrefill(selectedLead)); setSelectedLead(null) } : undefined}
        onNewReceipt={onNewReceipt && selectedLead ? () => { onNewReceipt(mergedLeadToOrderPrefill(selectedLead)); setSelectedLead(null) } : undefined}
        detailMode={selectedLead?.type === 'training' ? 'training' : 'service'}
        defaultArchive={selectedLead?.type === 'training' ? 'student' : 'customer'}
        studentArchive={selectedLead?.type === 'training' ? { courseCategory: selectedLead.category || '培训', courseName: `${selectedLead.category} · 系统班`, progressPercent: selectedLead.intention === '高意向' ? 72 : 48, examStatus: '待考', enrollDate: '2025-10-12', studyHours: selectedLead.intention === '高意向' ? '36/48 课时' : '12/48 课时', certificate: '暂无', tags: ['学习中', selectedLead.intention === '高意向' ? '重点跟进' : ''].filter(Boolean) } : undefined}
        domesticArchive={selectedLead?.type === 'employer' ? { displayName: '待匹配服务人员', serviceType: selectedLead.serviceType || '月嫂', level: '待评级', workStatus: '雇主需求对接中', ordersCompleted: 0, rating: 0, lastServiceDate: undefined, consultant: '张顾问', tags: ['匹配池', '未指派'] } : undefined}
        customer={selectedLead ? { id: String(selectedLead.id), name: selectedLead.name, phone: selectedLead.phone, wechat: 'wx_' + selectedLead.name, consultant: '张顾问', status: '入库', statusProgress: selectedLead.type === 'training' ? (selectedLead.intention === '已报名' ? 75 : 62) : 36, tags: selectedLead.intention === '高意向' ? ['高意向', '重点跟进'] : ['潜在客户'], fullName: selectedLead.name, starLevel: selectedLead.intention === '高意向' ? 5 : 4, source: selectedLead.source || '线上咨询', ethnicity: '汉族', gender: '女', maternityConsultant: '张顾问', referralInfo: selectedLead.note || '-', profileCompleteness: selectedLead.type === 'training' ? 55 : undefined, dueDate: selectedLead.type === 'training' ? undefined : selectedLead.dueDate, trainingIntent: selectedLead.type === 'training' ? (selectedLead.note || `${selectedLead.category}意向`) : undefined, leadStageLabel: selectedLead.type === 'training' ? selectedLead.intention : undefined, nextFollowUp: selectedLead.lastContact, trainingNotes: selectedLead.type === 'training' ? (selectedLead.note || '-') : undefined } : null}
      />

      {/* ==================== 新建客户抽屉 ==================== */}
      {showAddLead && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => { setShowAddLead(false); resetCreateForm() }}>
          <div className="absolute inset-y-0 right-0 flex h-dvh max-h-dvh w-[90%] max-w-md min-h-0 flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0 z-10">
              <h2 className="font-semibold text-sm">新建客户</h2>
              <button onClick={() => { setShowAddLead(false); resetCreateForm() }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 border-b bg-muted/20 shrink-0">
              {[{ title: '基本信息', step: 1 }, { title: '自定义信息', step: 2 }].map((s, i) => (
                <div key={s.step} className="flex items-center">
                  <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors', createStep === s.step ? 'bg-primary text-primary-foreground' : createStep > s.step ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground')}>
                    {createStep > s.step ? <Check className="h-3 w-3" /> : <span className="w-4 text-center">{s.step}</span>}<span>{s.title}</span>
                  </div>
                  {i === 0 && <ChevronRight className="h-3 w-3 mx-1 text-muted-foreground" />}
                </div>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">{createStep === 1 ? renderCreateStep1() : renderCreateStep2()}</div>
            <div className="shrink-0 border-t border-border px-4 py-3">
              {createStep === 1 && !canProceedStep1 && step1MissingLabels.length > 0 && (
                <p className="text-muted-foreground mb-2 text-[10px] leading-snug">
                  请先完成：{step1MissingLabels.join('、')}
                </p>
              )}
              <div className="flex gap-2">
                {createStep === 2 && <Button variant="outline" className="flex-1 h-9 text-sm" onClick={() => setCreateStep(1)}>上一步</Button>}
                {createStep === 1 ? (
                  <Button
                    type="button"
                    className="flex-1 h-9 text-sm bg-primary hover:bg-primary/90"
                    disabled={!canProceedStep1}
                    onClick={() => {
                      if (canProceedStep1) setCreateStep(2)
                    }}
                  >
                    下一步
                  </Button>
                ) : (
                  <Button className="flex-1 h-9 text-sm bg-primary hover:bg-primary/90" onClick={handleCreateSubmit}>确认创建</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 添加跟进抽屉 ==================== */}
      {showAddFollowUp && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => { setShowAddFollowUp(false); resetFollowupForm() }}>
          <div className="absolute inset-y-0 right-0 flex h-dvh max-h-dvh w-[85%] max-w-sm min-h-0 flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-semibold text-sm">添加跟进记录</h2>
                {followUpLead && <p className="text-[10px] text-muted-foreground mt-0.5">{followUpLead.name} · {followUpLead.phone}</p>}
              </div>
              <button onClick={() => { setShowAddFollowUp(false); resetFollowupForm() }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">跟进类型</Label>
                  <Select value={newFollowupType} onValueChange={v => setNewFollowupType(v as FollowupType)}>
                    <SelectTrigger className="h-8 w-full text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent className="z-[110]">{(Object.keys(followupTypeConfig) as FollowupType[]).map(t => <SelectItem key={t} value={t} className="text-xs">{followupTypeConfig[t].label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">业务线</Label>
                  <Select value={newFollowupBiz} onValueChange={v => setNewFollowupBiz(v as Exclude<BusinessType, 'all'>)}>
                    <SelectTrigger className="h-8 w-full text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent className="z-[110]">{Object.entries(businessTypeConfig).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">跟进内容 <span className="text-red-500">*</span></Label>
                <Textarea placeholder="记录跟进内容..." className="text-xs min-h-[80px] resize-none" value={newFollowupContent} onChange={e => setNewFollowupContent(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">下次跟进日期</Label>
                <Input type="date" className="h-8 text-xs" value={nextFollowDate} onChange={e => setNextFollowDate(e.target.value)} />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-border shrink-0">
              <Button className="w-full h-9 text-sm bg-primary hover:bg-primary/90" disabled={!newFollowupContent.trim()} onClick={handleSaveFollowup}>保存记录</Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 跟进记录历史抽屉 ==================== */}
      {showFollowUpHistory && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setShowFollowUpHistory(false)}>
          <div className="absolute inset-y-0 right-0 flex h-dvh max-h-dvh w-[90%] max-w-md min-h-0 flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2"><History className="h-4 w-4 text-primary" /><h2 className="font-semibold text-sm">客户跟进记录</h2></div>
              <button onClick={() => setShowFollowUpHistory(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            {renderFollowUpHistory()}
          </div>
        </div>
      )}
    </div>
  )
}
