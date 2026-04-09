'use client'

import { useState } from 'react'
import {
  ChevronLeft, Phone, MapPin, Plus, Star, MessageCircle,
  Clock, CheckCircle, ArrowRight, X, ChevronRight as ChevronRightIcon,
  Users, Video, ClipboardList, GraduationCap, Heart, Sparkles,
  Tag, Check, Mic, History,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CustomerDetailDrawer } from '@/components/customer-detail-drawer'
import type { OrderPrefillData } from '@/components/employee/merged/orders-create-page'

// ==================== 类型定义 ====================

type ScrmDemandTypeKey = 'training' | 'maternity_nanny' | 'maternity_infant' | 'wellness'
type FollowupType = 'phone' | 'wechat' | 'visit' | 'video' | 'demand_info'
type BusinessType = 'all' | 'maternal' | 'wellness' | 'student' | 'sales' | 'transfer' | 'maintenance' | 'demand_info'

interface CustomerFormData {
  name: string
  phone: string
  gender: string
  wechat?: string
  address?: string
  budget?: string
  careerConsultant?: string
  maternalConsultant?: string
  wellnessTechnician?: string
  invitationConsultant?: string
  source: string
  notes?: string
  // 培训
  employType?: string
  expectedEmployDate?: string
  actualEmployDate?: string
  skillGraduateDate?: string
  hasCertificate?: string
  expectedSalary?: string
  experience?: string
  workHistory?: string
  course?: string
  className?: string
  enrollDate?: string
  familyIntro?: string
  // 母婴
  serviceType?: string
  dueDate?: string
  isSecondBaby?: string
  serviceStartDate?: string
  serviceEndDate?: string
  requirements?: string
  // 产康
  wellnessPlannedDate?: string
  wellnessServiceProject?: string
  wellnessRequirements?: string
}

interface FollowupRecord {
  id: string
  type: FollowupType
  businessType: Exclude<BusinessType, 'all'>
  content: string
  time: string
  duration?: string
  consultantName: string
  consultantIsResigned?: boolean
  hasRecording?: boolean
}

interface Lead {
  id: string
  name: string
  phone: string
  city: string
  serviceType: 'maternity' | 'training' | 'postpartum'
  status: 'new' | 'contacted' | 'qualified' | 'ordered' | 'lost'
  lastContactDate?: string
  followUpDate?: string
  dueDate?: string
  source: string
  remark?: string
  priority: 'high' | 'medium' | 'low'
  followUps: FollowupRecord[]
}

// ==================== 配置常量 ====================

const consultantSelectValues = ['张顾问', '李顾问', '王顾问', '赵顾问', '周顾问']
const sourceOptions = ['线上咨询', '线下活动', '老学员介绍', '抖音推广', '官网报名', '美团推广', '小红书', '朋友介绍', '其他']
const budgetOptions = ['5000以下', '5000-10000', '10000-15000', '15000-20000', '20000以上']
const scrmDemandOptions: { id: ScrmDemandTypeKey; label: string }[] = [
  { id: 'training', label: '培训需求' },
  { id: 'maternity_nanny', label: '月嫂需求' },
  { id: 'maternity_infant', label: '育婴师需求' },
  { id: 'wellness', label: '产康需求' },
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
  rose: 'bg-rose-100 text-rose-700 border-rose-200',
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
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

const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-001', name: '张女士', phone: '138****5678', city: '北京',
    serviceType: 'maternity', status: 'contacted',
    lastContactDate: '2026-03-27', followUpDate: '2026-03-30',
    source: '亲友介绍', remark: '预产期3月底，需要月嫂服务', dueDate: '2026-03-28', priority: 'high',
    followUps: [
      { id: 'F001-1', type: 'phone', businessType: 'maternal', content: '客户咨询月嫂服务，预产期3月底，对金牌月嫂有需求，预算15000-20000元。已介绍李春华阿姨的情况，客户表示满意。', time: '2026-03-27 14:30', duration: '12分钟', consultantName: '张顾问', hasRecording: true },
      { id: 'F001-2', type: 'wechat', businessType: 'maternal', content: '发送了李春华阿姨的简历和服务案例', time: '2026-03-27 15:00', consultantName: '张顾问' },
      { id: 'F001-3', type: 'phone', businessType: 'maternal', content: '首次电话沟通，了解客户基本需求，客户正在比较多家机构', time: '2026-03-25 10:20', duration: '8分钟', consultantName: '周顾问', consultantIsResigned: true },
    ],
  },
  {
    id: 'LEAD-002', name: '李女士', phone: '139****1234', city: '上海',
    serviceType: 'maternity', status: 'new', source: '小程序浏览',
    dueDate: '2026-04-20', priority: 'medium',
    followUps: [],
  },
  {
    id: 'LEAD-003', name: '王先生', phone: '137****9999', city: '深圳',
    serviceType: 'training', status: 'qualified',
    lastContactDate: '2026-03-25', source: '公众号',
    remark: '对育婴师课程感兴趣', priority: 'high',
    followUps: [
      { id: 'F003-1', type: 'phone', businessType: 'student', content: '客户咨询育婴师培训课程，有育儿经验，想系统学习并考证。已介绍课程体系与学费。', time: '2026-03-25 09:15', duration: '15分钟', consultantName: '张顾问', hasRecording: true },
      { id: 'F003-2', type: 'wechat', businessType: 'student', content: '发送课程大纲和报名资料', time: '2026-03-25 10:00', consultantName: '张顾问' },
    ],
  },
  {
    id: 'LEAD-004', name: '陈女士', phone: '136****6666', city: '杭州',
    serviceType: 'postpartum', status: 'ordered', source: '转介绍', priority: 'low',
    followUps: [
      { id: 'F004-1', type: 'visit', businessType: 'wellness', content: '到店咨询产后修复套餐，已体验盆底康复项目一次', time: '2026-03-20 14:00', consultantName: '李顾问' },
    ],
  },
]

// ==================== 辅助函数 ====================

const serviceTypeMap: Record<Lead['serviceType'], string> = {
  maternity: '月嫂服务',
  training: '培训课程',
  postpartum: '产后护理',
}

function managementLeadToOrderPrefill(lead: Lead, map: typeof serviceTypeMap): OrderPrefillData {
  if (lead.serviceType === 'training') {
    return { customerName: lead.name, serviceType: map.training }
  }
  return { customerName: lead.name, serviceType: map[lead.serviceType], startDate: lead.dueDate, dueDate: lead.dueDate }
}

function deriveLegacyServiceType(demands: ScrmDemandTypeKey[]): Lead['serviceType'] {
  if (demands.includes('training')) return 'training'
  if (demands.includes('maternity_nanny') || demands.includes('maternity_infant')) return 'maternity'
  if (demands.includes('wellness')) return 'postpartum'
  return 'maternity'
}

// ==================== 主组件 ====================

interface LeadsManagementPageProps {
  employeeRole?: 'career' | 'maternity_consultant' | 'bei_yi_sheng'
  onBack?: () => void
  onNewOrder?: (prefill: OrderPrefillData) => void
  onNewReceipt?: (prefill: OrderPrefillData) => void
}

export function LeadsManagementPage({ employeeRole = 'maternity_consultant', onBack, onNewOrder, onNewReceipt }: LeadsManagementPageProps) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [filterStatus, setFilterStatus] = useState<Lead['status'] | 'all'>('all')
  const [searchText, setSearchText] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // 新建客户
  const [showNewLead, setShowNewLead] = useState(false)
  const [createStep, setCreateStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CustomerFormData>>({ name: '', phone: '', gender: '', source: '' })
  const [demandTypes, setDemandTypes] = useState<ScrmDemandTypeKey[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 跟进
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)
  const [followUpLead, setFollowUpLead] = useState<Lead | null>(null)
  const [newFollowupType, setNewFollowupType] = useState<FollowupType>('phone')
  const [newFollowupBiz, setNewFollowupBiz] = useState<Exclude<BusinessType, 'all'>>('maternal')
  const [newFollowupContent, setNewFollowupContent] = useState('')
  const [nextFollowDate, setNextFollowDate] = useState('')

  // 跟进记录
  const [showFollowUpHistory, setShowFollowUpHistory] = useState(false)
  const [historyLead, setHistoryLead] = useState<Lead | null>(null)
  const [historyConsultantFilter, setHistoryConsultantFilter] = useState('all')
  const [historyBizFilter, setHistoryBizFilter] = useState<string>('all')

  const isCareer = employeeRole === 'career'
  const pageTitle = isCareer ? '学员线索' : '客户线索'

  const roleFilteredLeads = leads.filter(lead => {
    if (isCareer) return lead.serviceType === 'training'
    return lead.serviceType === 'maternity' || lead.serviceType === 'postpartum'
  })

  const statusMap: Record<Lead['status'], { label: string; color: string }> = {
    new: { label: '新线索', color: 'bg-blue-100 text-blue-700' },
    contacted: { label: '已联系', color: 'bg-green-100 text-green-700' },
    qualified: { label: '已资格', color: 'bg-purple-100 text-purple-700' },
    ordered: { label: '已下单', color: 'bg-emerald-100 text-emerald-700' },
    lost: { label: '已失效', color: 'bg-gray-100 text-gray-700' },
  }

  const filteredLeads = roleFilteredLeads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
    const matchesSearch = lead.name.includes(searchText) || lead.phone.includes(searchText) || lead.city.includes(searchText)
    return matchesStatus && matchesSearch
  })

  const needsFollowUp = leads.filter(l => {
    if (!l.followUpDate) return false
    const today = new Date()
    const followUpDate = new Date(l.followUpDate)
    return followUpDate <= today && l.status !== 'ordered' && l.status !== 'lost'
  })

  // ==================== 新建客户逻辑 ====================

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  const handleToggleDemand = (id: ScrmDemandTypeKey) => {
    setDemandTypes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId])
  }

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

  const resetCreateForm = () => {
    setCreateStep(1)
    setFormData({ name: '', phone: '', gender: '', source: '' })
    setDemandTypes([])
    setSelectedTags([])
  }

  const handleCreateSubmit = () => {
    const newLead: Lead = {
      id: `LEAD-${String(Date.now()).slice(-6)}`,
      name: formData.name || '未命名',
      phone: formData.phone || '',
      city: formData.address || '',
      serviceType: deriveLegacyServiceType(demandTypes),
      status: 'new',
      source: formData.source || '',
      remark: formData.notes,
      dueDate: formData.dueDate,
      priority: selectedTags.includes('high-intent') ? 'high' : selectedTags.includes('mid-intent') ? 'medium' : 'low',
      followUps: [],
    }
    setLeads(prev => [newLead, ...prev])
    resetCreateForm()
    setShowNewLead(false)
  }

  // ==================== 跟进逻辑 ====================

  const resetFollowupForm = () => {
    setNewFollowupType('phone')
    setNewFollowupBiz('maternal')
    setNewFollowupContent('')
    setNextFollowDate('')
  }

  const handleSaveFollowup = () => {
    if (!followUpLead || !newFollowupContent.trim()) return
    const newRecord: FollowupRecord = {
      id: `F-${Date.now()}`,
      type: newFollowupType,
      businessType: newFollowupBiz,
      content: newFollowupContent,
      time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
      consultantName: '张顾问',
    }
    setLeads(prev => prev.map(l => {
      if (l.id !== followUpLead.id) return l
      return {
        ...l,
        followUps: [newRecord, ...l.followUps],
        lastContactDate: new Date().toISOString().split('T')[0],
        followUpDate: nextFollowDate || l.followUpDate,
      }
    }))
    resetFollowupForm()
    setShowAddFollowUp(false)
  }

  // ==================== 渲染：新建客户 Step1 基本信息 ====================

  const renderCreateStep1 = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">客户姓名 <span className="text-red-500">*</span></Label>
          <Input className="h-8 text-xs" placeholder="请输入姓名" value={formData.name || ''} onChange={e => updateFormData('name', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">手机号 <span className="text-red-500">*</span></Label>
          <Input className="h-8 text-xs" placeholder="11位手机号" value={formData.phone || ''} onChange={e => updateFormData('phone', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">性别 <span className="text-red-500">*</span></Label>
          <Select value={formData.gender} onValueChange={v => updateFormData('gender', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
            <SelectContent className="z-[110]">
              <SelectItem value="female">女</SelectItem>
              <SelectItem value="male">男</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">微信</Label>
          <Input className="h-8 text-xs" placeholder="微信号" value={formData.wechat || ''} onChange={e => updateFormData('wechat', e.target.value)} />
        </div>
        <div className="space-y-1 col-span-2">
          <Label className="text-xs">居住地址</Label>
          <Input className="h-8 text-xs" placeholder="常住地址" value={formData.address || ''} onChange={e => updateFormData('address', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">预算范围</Label>
          <Select value={formData.budget || undefined} onValueChange={v => updateFormData('budget', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择预算" /></SelectTrigger>
            <SelectContent className="z-[110]">
              {budgetOptions.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">客户来源 <span className="text-red-500">*</span></Label>
          <Select value={formData.source} onValueChange={v => updateFormData('source', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择来源" /></SelectTrigger>
            <SelectContent className="z-[110]">
              {sourceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">所属职业顾问</Label>
          <Select value={formData.careerConsultant || undefined} onValueChange={v => updateFormData('careerConsultant', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
            <SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">所属母婴顾问</Label>
          <Select value={formData.maternalConsultant || undefined} onValueChange={v => updateFormData('maternalConsultant', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
            <SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">产康技师</Label>
          <Select value={formData.wellnessTechnician || undefined} onValueChange={v => updateFormData('wellnessTechnician', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
            <SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">邀约顾问</Label>
          <Select value={formData.invitationConsultant || undefined} onValueChange={v => updateFormData('invitationConsultant', v)}>
            <SelectTrigger className="h-8 w-full text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
            <SelectContent className="z-[110]">{consultantSelectValues.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      {/* 需求类型多选 — 纯 div 实现，避免 Radix Checkbox/Label 事件问题 */}
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

      {/* 客户标签 */}
      <div className="space-y-1">
        <Label className="text-xs">客户标签</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent w-full justify-start">
              <Tag className="h-3 w-3 mr-2" />
              {selectedTags.length > 0 ? (
                <div className="flex gap-1 flex-wrap">
                  {selectedTags.slice(0, 3).map(tagId => {
                    const tag = availableTags.find(t => t.id === tagId)
                    return tag ? <Badge key={tagId} variant="secondary" className={cn('text-[9px] h-4', tagColorMap[tag.color])}>{tag.name}</Badge> : null
                  })}
                  {selectedTags.length > 3 && <Badge variant="secondary" className="text-[9px] h-4">+{selectedTags.length - 3}</Badge>}
                </div>
              ) : (
                <span className="text-muted-foreground">选择客户标签</span>
              )}
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

      <div className="space-y-1">
        <Label className="text-xs">备注</Label>
        <Textarea className="text-xs min-h-[56px] resize-none" placeholder="备注信息" value={formData.notes || ''} onChange={e => updateFormData('notes', e.target.value)} />
      </div>
    </div>
  )

  // ==================== 渲染：新建客户 Step2 自定义信息 ====================

  const renderCreateStep2 = () => (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground font-medium">按已勾选的需求类型维护详细信息</p>

      {demandTypes.length === 0 && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          当前没有勾选任何需求类型，请点击「上一步」勾选。
        </div>
      )}

      {demandTypes.includes('training') && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-3 py-2 bg-purple-50 border-b flex items-center gap-2 text-xs font-medium text-purple-900">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" /> 培训需求 · 就业信息
          </div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">就业类型 <span className="text-red-500">*</span></Label>
                <Select value={formData.employType || ''} onValueChange={v => updateFormData('employType', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    {['月嫂', '育婴师', '保姆', '护工', '收纳师'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">预计就业时间</Label>
                <Input className="h-8 text-xs" type="date" value={formData.expectedEmployDate || ''} onChange={e => updateFormData('expectedEmployDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">实际就业时间</Label>
                <Input className="h-8 text-xs" type="date" value={formData.actualEmployDate || ''} onChange={e => updateFormData('actualEmployDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">技能岗毕业时间</Label>
                <Input className="h-8 text-xs" type="date" value={formData.skillGraduateDate || ''} onChange={e => updateFormData('skillGraduateDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">有无证书</Label>
                <Select value={formData.hasCertificate || ''} onValueChange={v => updateFormData('hasCertificate', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    <SelectItem value="yes">有</SelectItem>
                    <SelectItem value="no">无</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">期望薪资</Label>
                <Input className="h-8 text-xs" placeholder="如: 10000-12000" value={formData.expectedSalary || ''} onChange={e => updateFormData('expectedSalary', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">从业经验</Label>
                <Input className="h-8 text-xs" placeholder="如: 3年" value={formData.experience || ''} onChange={e => updateFormData('experience', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">工作经历</Label>
              <Textarea className="text-xs min-h-[48px] resize-none" placeholder="请描述工作经历" value={formData.workHistory || ''} onChange={e => updateFormData('workHistory', e.target.value)} />
            </div>
          </div>
          <div className="px-3 py-2 bg-purple-50/80 border-t border-b flex items-center gap-2 text-xs font-medium text-purple-900">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" /> 培训需求 · 培训信息
          </div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">培训课程 <span className="text-red-500">*</span></Label>
                <Select value={formData.course || ''} onValueChange={v => updateFormData('course', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择课程" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    {['高级月嫂', '育婴师', '产康师初级', '产康师高级'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">所在班级 <span className="text-red-500">*</span></Label>
                <Select value={formData.className || ''} onValueChange={v => updateFormData('className', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择班级" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    {['2025年第1期', '2025年第2期', '2025年第3期'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">入学日期</Label>
                <Input className="h-8 text-xs" type="date" value={formData.enrollDate || ''} onChange={e => updateFormData('enrollDate', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">家庭介绍</Label>
              <Textarea className="text-xs min-h-[48px] resize-none" placeholder="家庭情况介绍" value={formData.familyIntro || ''} onChange={e => updateFormData('familyIntro', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {(demandTypes.includes('maternity_nanny') || demandTypes.includes('maternity_infant')) && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-3 py-2 bg-rose-50 border-b flex items-center gap-2 text-xs font-medium text-rose-900">
            <Heart className="h-3.5 w-3.5 shrink-0" /> 月嫂 / 育婴师服务要求
          </div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">服务类型</Label>
                <Select value={formData.serviceType || ''} onValueChange={v => updateFormData('serviceType', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    {demandTypes.includes('maternity_nanny') && <>
                      <SelectItem value="月嫂">月嫂</SelectItem>
                      <SelectItem value="催乳师">催乳师</SelectItem>
                    </>}
                    {demandTypes.includes('maternity_infant') && <>
                      <SelectItem value="育婴师">育婴师</SelectItem>
                      <SelectItem value="保姆">保姆</SelectItem>
                    </>}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">预产期</Label>
                <Input className="h-8 text-xs" type="date" value={formData.dueDate || ''} onChange={e => updateFormData('dueDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">是否二胎</Label>
                <Select value={formData.isSecondBaby || ''} onValueChange={v => updateFormData('isSecondBaby', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    <SelectItem value="yes">是</SelectItem>
                    <SelectItem value="no">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">服务开始日期</Label>
                <Input className="h-8 text-xs" type="date" value={formData.serviceStartDate || ''} onChange={e => updateFormData('serviceStartDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">服务结束日期</Label>
                <Input className="h-8 text-xs" type="date" value={formData.serviceEndDate || ''} onChange={e => updateFormData('serviceEndDate', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">其他服务要求</Label>
              <Textarea className="text-xs min-h-[48px] resize-none" placeholder="口味、住家/不住家、技能证书偏好等" value={formData.requirements || ''} onChange={e => updateFormData('requirements', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {demandTypes.includes('wellness') && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-3 py-2 bg-teal-50 border-b flex items-center gap-2 text-xs font-medium text-teal-900">
            <Sparkles className="h-3.5 w-3.5 shrink-0" /> 产康服务要求
          </div>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">预服务时间</Label>
                <Input className="h-8 text-xs" type="date" value={formData.wellnessPlannedDate || ''} onChange={e => updateFormData('wellnessPlannedDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">意向产康项目</Label>
                <Select value={formData.wellnessServiceProject || ''} onValueChange={v => updateFormData('wellnessServiceProject', v)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择项目" /></SelectTrigger>
                  <SelectContent className="z-[110]">
                    {['盆底康复', '腹直肌修复', '骨盆修复', '满月汗蒸', '产后修复'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">产康需求补充</Label>
              <Textarea className="text-xs min-h-[48px] resize-none" placeholder="身体状况、调理目标等" value={formData.wellnessRequirements || ''} onChange={e => updateFormData('wellnessRequirements', e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // ==================== 渲染：跟进记录列表 ====================

  const renderFollowUpHistory = () => {
    if (!historyLead) return null
    const records = historyLead.followUps
    const consultantNames = [...new Set(records.map(r => r.consultantName))]
    const filteredRecords = records.filter(r => {
      if (historyConsultantFilter !== 'all' && r.consultantName !== historyConsultantFilter) return false
      if (historyBizFilter !== 'all' && r.businessType !== historyBizFilter) return false
      return true
    })

    return (
      <>
        {/* 客户信息区 */}
        <div className="px-4 py-3 flex items-center gap-3 bg-muted/30 border-b shrink-0">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">{historyLead.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{historyLead.name}</span>
              <Badge variant="outline" className={cn('text-[10px] h-4 px-1.5 border', intentionConfig[historyLead.priority]?.className)}>
                {intentionConfig[historyLead.priority]?.label || historyLead.priority}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {historyLead.phone} · 需求: {serviceTypeMap[historyLead.serviceType]}
            </p>
          </div>
          <Button size="sm" className="h-7 text-xs shrink-0" onClick={() => {
            setFollowUpLead(historyLead)
            setShowAddFollowUp(true)
          }}>
            <Plus className="h-3.5 w-3.5 mr-1" />新增
          </Button>
        </div>

        {/* 顾问筛选 */}
        {consultantNames.length > 0 && (
          <div className="px-4 py-2 border-b shrink-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-muted-foreground">跟进顾问:</span>
              <button type="button" onClick={() => setHistoryConsultantFilter('all')}
                className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-colors',
                  historyConsultantFilter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground/30 hover:bg-muted')}>
                全部
              </button>
              {consultantNames.map(name => {
                const count = records.filter(r => r.consultantName === name).length
                const resigned = records.find(r => r.consultantName === name)?.consultantIsResigned
                return (
                  <button key={name} type="button" onClick={() => setHistoryConsultantFilter(historyConsultantFilter === name ? 'all' : name)}
                    className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-colors',
                      historyConsultantFilter === name ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground/30 hover:bg-muted')}>
                    <span className="font-medium">{name[0]}</span>
                    <span>{name}</span>
                    <span className="opacity-70">{count}条</span>
                    {resigned && <span className="ml-0.5 text-[9px] bg-red-100 text-red-600 px-1 rounded">已离职</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 业务线 Tab */}
        <div className="border-b shrink-0">
          <Tabs value={historyBizFilter} onValueChange={setHistoryBizFilter}>
            <TabsList className="h-8 bg-transparent rounded-none justify-start gap-0 px-4 !overflow-x-auto flex-nowrap w-full [&::-webkit-scrollbar]:hidden">
              {[{ key: 'all', label: '全部' }, ...Object.entries(businessTypeConfig).map(([k, v]) => ({ key: k, label: v.label }))].map(item => (
                <TabsTrigger key={item.key} value={item.key} className="text-[10px] px-2.5 py-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shrink-0">
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* 记录列表 */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="px-4 py-3 space-y-3">
            {filteredRecords.length === 0 && (
              <div className="text-center py-8">
                <History className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground">暂无跟进记录</p>
              </div>
            )}
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
                      {bizCfg && (
                        <Badge variant="outline" className={cn('text-[9px] h-4 px-1 border', bizCfg.className)}>
                          {bizCfg.label}
                        </Badge>
                      )}
                      {record.hasRecording && (
                        <Badge variant="outline" className="text-[9px] h-4 px-1 border text-blue-600 bg-blue-50 border-blue-200">
                          <Mic className="h-2.5 w-2.5 mr-0.5" />录音
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-foreground mb-1 break-words">{record.content}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{record.time}</span>
                      {record.duration && <span>· {record.duration}</span>}
                      <span>· {record.consultantName}</span>
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
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 safe-area-top">
          <button onClick={onBack} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">{pageTitle}</h1>
          <Button size="sm" className="h-8 px-2 text-xs bg-primary hover:bg-primary/90" onClick={() => { resetCreateForm(); setShowNewLead(true) }}>
            <Plus className="w-3.5 h-3.5 mr-1" />新建
          </Button>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        {needsFollowUp.length > 0 && (
          <div className="flex gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs text-orange-700">
              <p className="font-semibold">需要跟进的线索</p>
              <p className="mt-0.5">{needsFollowUp.length} 个线索已到跟进时间</p>
            </div>
          </div>
        )}

        <Input placeholder="搜索客户名称、电话或城市" value={searchText} onChange={e => setSearchText(e.target.value)} className="h-9" />

        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['all', 'new', 'contacted', 'qualified', 'ordered', 'lost'] as const).map(status => (
            <button key={status} onClick={() => setFilterStatus(status)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors',
                filterStatus === status ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80')}>
              {status === 'all' ? '全部' : statusMap[status as Lead['status']].label}
            </button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-2">
          {filteredLeads.map(lead => {
            const statusInfo = statusMap[lead.status]
            const isHighPriority = lead.priority === 'high'
            const shouldFollowUp = lead.followUpDate && new Date(lead.followUpDate) <= new Date() && lead.status !== 'ordered' && lead.status !== 'lost'
            return (
              <Card key={lead.id} className={cn('border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow', isHighPriority && 'ring-1 ring-primary/50')} onClick={() => setSelectedLead(lead)}>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{lead.name}</h3>
                          <span className={cn('px-1.5 py-0.5 rounded text-xs font-medium', statusInfo.color)}>{statusInfo.label}</span>
                          {isHighPriority && <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{serviceTypeMap[lead.serviceType]}</p>
                      </div>
                      <button onClick={e => e.stopPropagation()} className="shrink-0">
                        <Phone className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /><span>{lead.city}</span><span>·</span><span>{lead.source}</span>
                    </div>
                    {lead.remark && <p className="text-xs bg-muted/50 rounded p-2">{lead.remark}</p>}
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {lead.lastContactDate && <span>最后联系: {lead.lastContactDate}</span>}
                      {lead.followUpDate && (
                        <span className={shouldFollowUp ? 'text-orange-600 font-semibold' : ''}>跟进: {lead.followUpDate}</span>
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
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {filteredLeads.length === 0 && (
            <div className="text-center py-6">
              <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">暂无线索数据</p>
            </div>
          )}
        </div>
      </div>

      {/* 客户详情抽屉 */}
      <CustomerDetailDrawer
        open={!!selectedLead && !showFollowUpHistory}
        onClose={() => setSelectedLead(null)}
        onNewOrder={onNewOrder && selectedLead ? () => { onNewOrder(managementLeadToOrderPrefill(selectedLead, serviceTypeMap)); setSelectedLead(null) } : undefined}
        onNewReceipt={onNewReceipt && selectedLead ? () => { onNewReceipt(managementLeadToOrderPrefill(selectedLead, serviceTypeMap)); setSelectedLead(null) } : undefined}
        detailMode={selectedLead?.serviceType === 'training' ? 'training' : 'service'}
        defaultArchive={selectedLead?.serviceType === 'training' ? 'student' : 'customer'}
        studentArchive={selectedLead?.serviceType === 'training' ? {
          courseCategory: '职业培训', courseName: `培训课程 · ${selectedLead.remark?.slice(0, 24) || '育婴师考证'}`,
          progressPercent: selectedLead.priority === 'high' ? 65 : 40, examStatus: selectedLead.status === 'qualified' ? '已通过初审' : '待考',
          enrollDate: selectedLead.lastContactDate || '2026-01-05', studyHours: selectedLead.priority === 'high' ? '28/48 课时' : '8/48 课时',
          certificate: '暂无', tags: ['学习中', selectedLead.priority === 'high' ? '重点学员' : ''].filter(Boolean),
        } : undefined}
        courses={selectedLead?.serviceType === 'training' ? [
          { id: 'c1', courseName: `培训课程 · ${selectedLead.remark?.slice(0, 20) || '育婴师考证'}`, courseType: '职业培训', teacher: '张老师', startDate: '2025-03-01', endDate: '2025-03-15', progress: selectedLead.priority === 'high' ? 72 : 45, status: 'in_progress', totalHours: 48, attendedHours: selectedLead.priority === 'high' ? 36 : 16 },
          { id: 'c2', courseName: '岗前实操强化', courseType: '辅助训练', teacher: '李老师', startDate: '2025-03-20', endDate: '2025-04-05', progress: 20, status: 'not_started', totalHours: 16, attendedHours: 0 },
        ] : undefined}
        enrollments={selectedLead?.serviceType === 'training' ? [
          { id: 'e1', courseName: '培训课程 · 系统班', enrollDate: selectedLead.lastContactDate || '2026-01-08', amount: 3980, paymentStatus: 'paid', orderNo: `EDU${selectedLead.id.replace(/\D/g, '')}0001` },
          { id: 'e2', courseName: '岗前实操强化', enrollDate: '2026-03-18', amount: 800, paymentStatus: 'unpaid', orderNo: `EDU${selectedLead.id.replace(/\D/g, '')}0002` },
        ] : undefined}
        domesticArchive={selectedLead && selectedLead.serviceType !== 'training' ? {
          displayName: '待匹配服务人员', serviceType: serviceTypeMap[selectedLead.serviceType], level: selectedLead.priority === 'high' ? '金牌优先' : '待评级',
          workStatus: selectedLead.status === 'ordered' ? '已签约待上户' : '雇主需求对接中', ordersCompleted: selectedLead.status === 'ordered' ? 1 : 0,
          rating: selectedLead.priority === 'high' ? 4.9 : 0, lastServiceDate: selectedLead.lastContactDate, consultant: '张顾问', tags: ['匹配池', selectedLead.city].filter(Boolean),
        } : undefined}
        customer={selectedLead ? {
          id: selectedLead.id, name: selectedLead.name, phone: selectedLead.phone, wechat: 'wx_' + selectedLead.name, consultant: '张顾问',
          status: '入库', statusProgress: selectedLead.serviceType === 'training' ? (selectedLead.status === 'qualified' ? 72 : 55) : 36,
          tags: selectedLead.priority === 'high' ? ['高意向', '重点跟进'] : ['潜在客户'], fullName: selectedLead.name,
          starLevel: selectedLead.priority === 'high' ? 5 : 4, source: selectedLead.source, ethnicity: '汉族', gender: '女',
          maternityConsultant: '张顾问', referralInfo: selectedLead.remark || '-',
          phoneLocation: selectedLead.city ? `${selectedLead.city} · 线索跟进` : undefined,
          profileCompleteness: selectedLead.priority === 'high' ? 58 : 42,
          dueDate: selectedLead.serviceType === 'training' ? undefined : (selectedLead.dueDate || selectedLead.followUpDate || '-'),
          trainingIntent: selectedLead.serviceType === 'training' ? (selectedLead.remark || '培训课程意向') : undefined,
          leadStageLabel: selectedLead.serviceType === 'training' ? statusMap[selectedLead.status].label : undefined,
          nextFollowUp: selectedLead.followUpDate || '-',
          trainingNotes: selectedLead.serviceType === 'training' ? (selectedLead.remark || '-') : undefined,
        } : null}
      />

      {/* ==================== 新建客户抽屉 ====================  */}
      {showNewLead && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => { setShowNewLead(false); resetCreateForm() }}>
          <div className="absolute inset-y-0 right-0 flex h-dvh max-h-dvh w-[90%] max-w-md min-h-0 flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            {/* 头部 */}
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0 z-10">
              <h2 className="font-semibold text-sm">新建客户</h2>
              <button onClick={() => { setShowNewLead(false); resetCreateForm() }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 步骤指示器 */}
            <div className="flex items-center justify-center gap-2 py-2.5 border-b bg-muted/20 shrink-0">
              {[{ title: '基本信息', step: 1 }, { title: '自定义信息', step: 2 }].map((s, i) => (
                <div key={s.step} className="flex items-center">
                  <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors',
                    createStep === s.step ? 'bg-primary text-primary-foreground' : createStep > s.step ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground')}>
                    {createStep > s.step ? <Check className="h-3 w-3" /> : <span className="w-4 text-center">{s.step}</span>}
                    <span>{s.title}</span>
                  </div>
                  {i === 0 && <ChevronRightIcon className="h-3 w-3 mx-1 text-muted-foreground" />}
                </div>
              ))}
            </div>

            {/* 内容：min-h-0 保证 flex 子项可收缩，底部按钮栏始终可点 */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
              {createStep === 1 ? renderCreateStep1() : renderCreateStep2()}
            </div>

            {/* 底部操作 */}
            <div className="shrink-0 border-t border-border px-4 py-3">
              {createStep === 1 && !canProceedStep1 && step1MissingLabels.length > 0 && (
                <p className="text-muted-foreground mb-2 text-[10px] leading-snug">
                  请先完成：{step1MissingLabels.join('、')}
                </p>
              )}
              <div className="flex gap-2">
              {createStep === 2 && (
                <Button variant="outline" className="flex-1 h-9 text-sm" onClick={() => setCreateStep(1)}>上一步</Button>
              )}
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
                <Button className="flex-1 h-9 text-sm bg-primary hover:bg-primary/90" onClick={handleCreateSubmit}>
                  确认创建
                </Button>
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
              <button onClick={() => { setShowAddFollowUp(false); resetFollowupForm() }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">跟进类型</Label>
                  <Select value={newFollowupType} onValueChange={v => setNewFollowupType(v as FollowupType)}>
                    <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                    <SelectContent className="z-[110]">
                      {(Object.keys(followupTypeConfig) as FollowupType[]).map(t => (
                        <SelectItem key={t} value={t} className="text-xs">{followupTypeConfig[t].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">业务线</Label>
                  <Select value={newFollowupBiz} onValueChange={v => setNewFollowupBiz(v as Exclude<BusinessType, 'all'>)}>
                    <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                    <SelectContent className="z-[110]">
                      {Object.entries(businessTypeConfig).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs">{v.label}</SelectItem>
                      ))}
                    </SelectContent>
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
              <Button className="w-full h-9 text-sm bg-primary hover:bg-primary/90" disabled={!newFollowupContent.trim()} onClick={handleSaveFollowup}>
                保存记录
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 跟进记录历史抽屉 ==================== */}
      {showFollowUpHistory && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setShowFollowUpHistory(false)}>
          <div className="absolute inset-y-0 right-0 w-[90%] max-w-md bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-sm">客户跟进记录</h2>
              </div>
              <button onClick={() => setShowFollowUpHistory(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            {renderFollowUpHistory()}
          </div>
        </div>
      )}
    </div>
  )
}
