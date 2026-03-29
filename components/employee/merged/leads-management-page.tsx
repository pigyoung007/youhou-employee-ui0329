'use client'

import { useState } from 'react'
import { ChevronLeft, Phone, MapPin, Plus, Star, MessageCircle, Clock, CheckCircle, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CustomerDetailDrawer } from '@/components/customer-detail-drawer'

interface Lead {
  id: string
  name: string
  phone: string
  city: string
  serviceType: 'maternity' | 'training' | 'postpartum'
  status: 'new' | 'contacted' | 'qualified' | 'ordered' | 'lost'
  lastContactDate?: string
  followUpDate?: string
  source: string
  remark?: string
  priority: 'high' | 'medium' | 'low'
}

interface LeadsManagementPageProps {
  employeeRole?: 'career' | 'maternity_consultant' | 'bei_yi_sheng'
  onBack?: () => void
}

export function LeadsManagementPage({ employeeRole = 'maternity_consultant', onBack }: LeadsManagementPageProps) {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LEAD-001',
      name: '张女士',
      phone: '138****5678',
      city: '北京',
      serviceType: 'maternity',
      status: 'contacted',
      lastContactDate: '2026-03-27',
      followUpDate: '2026-03-30',
      source: '亲友介绍',
      remark: '预产期3月底，需要月嫂服务',
      priority: 'high',
    },
    {
      id: 'LEAD-002',
      name: '李女士',
      phone: '139****1234',
      city: '上海',
      serviceType: 'maternity',
      status: 'new',
      source: '小程序浏览',
      priority: 'medium',
    },
    {
      id: 'LEAD-003',
      name: '王先生',
      phone: '137****9999',
      city: '深圳',
      serviceType: 'training',
      status: 'qualified',
      lastContactDate: '2026-03-25',
      source: '公众号',
      remark: '对育婴师课程感兴趣',
      priority: 'high',
    },
    {
      id: 'LEAD-004',
      name: '陈女士',
      phone: '136****6666',
      city: '杭州',
      serviceType: 'postpartum',
      status: 'ordered',
      source: '转介绍',
      priority: 'low',
    },
  ])

  const [filterStatus, setFilterStatus] = useState<Lead['status'] | 'all'>('all')
  const [searchText, setSearchText] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [followUpLead, setFollowUpLead] = useState<Lead | null>(null)
  const [showNewLead, setShowNewLead] = useState(false)
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)
  const [showFollowUpHistory, setShowFollowUpHistory] = useState(false)

  // 根据角色筛选线索类型
  const isCareer = employeeRole === 'career'
  const pageTitle = isCareer ? '学员线索' : '客户线索'
  
  // 职业顾问看培训线索，母婴顾问看家政线索
  const roleFilteredLeads = leads.filter(lead => {
    if (isCareer) {
      return lead.serviceType === 'training'
    }
    return lead.serviceType === 'maternity' || lead.serviceType === 'postpartum'
  })

  const statusMap = {
    new: { label: '新线索', icon: '🆕', color: 'bg-blue-100 text-blue-700' },
    contacted: { label: '已联系', icon: '📞', color: 'bg-green-100 text-green-700' },
    qualified: { label: '已资格', icon: '✓', color: 'bg-purple-100 text-purple-700' },
    ordered: { label: '已下单', icon: '✅', color: 'bg-emerald-100 text-emerald-700' },
    lost: { label: '已失效', icon: '❌', color: 'bg-gray-100 text-gray-700' },
  }

  const serviceTypeMap = {
    maternity: '月嫂服务',
    training: '培训课程',
    postpartum: '产后护理',
  }

  const filteredLeads = roleFilteredLeads.filter(lead => {
  const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
  const matchesSearch = lead.name.includes(searchText) || lead.phone.includes(searchText) || lead.city.includes(searchText)
  return matchesStatus && matchesSearch
  })

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: newStatus,
          lastContactDate: new Date().toISOString().split('T')[0]
        }
      }
      return lead
    }))
  }

  const needsFollowUp = leads.filter(l => {
    if (!l.followUpDate) return false
    const today = new Date()
    const followUpDate = new Date(l.followUpDate)
    return followUpDate <= today && l.status !== 'ordered' && l.status !== 'lost'
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 safe-area-top">
          <button onClick={onBack} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">{pageTitle}</h1>
          <Button size="sm" className="h-8 px-2 text-xs bg-primary hover:bg-primary/90" onClick={() => setShowNewLead(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            新建
          </Button>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* Follow-up Alert */}
        {needsFollowUp.length > 0 && (
          <div className="flex gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs text-orange-700">
              <p className="font-semibold">需要跟进的线索</p>
              <p className="mt-0.5">{needsFollowUp.length} 个线索已到跟进时间</p>
            </div>
          </div>
        )}

        {/* Search */}
        <Input
          placeholder="搜索客户名称、电话或城市"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-9"
        />

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['all', 'new', 'contacted', 'qualified', 'ordered', 'lost'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors",
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
            >
              {status === 'all' ? '全部' : statusMap[status as Lead['status']].label}
            </button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-2">
          {filteredLeads.map(lead => {
            const statusInfo = statusMap[lead.status]
            const isHighPriority = lead.priority === 'high'
            const needsFollowUp = lead.followUpDate && new Date(lead.followUpDate) <= new Date() && lead.status !== 'ordered' && lead.status !== 'lost'

            return (
              <Card
                key={lead.id}
                className={cn(
                  "border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow",
                  isHighPriority && "ring-1 ring-primary/50"
                )}
                onClick={() => setSelectedLead(lead)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{lead.name}</h3>
                          <span className={cn("px-1.5 py-0.5 rounded text-xs font-medium", statusInfo.color)}>
                            {statusInfo.label}
                          </span>
                          {isHighPriority && (
                            <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {serviceTypeMap[lead.serviceType]}
                        </p>
                      </div>
                      <button onClick={(e) => {
                        e.stopPropagation()
                        // Copy phone to clipboard
                      }} className="flex-shrink-0">
                        <Phone className="w-4 h-4 text-primary" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lead.city}</span>
                      <span>•</span>
                      <span>{lead.source}</span>
                    </div>

                    {/* Remark */}
                    {lead.remark && (
                      <p className="text-xs bg-muted/50 rounded p-2">{lead.remark}</p>
                    )}

                    {/* Last Contact & Follow-up */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {lead.lastContactDate && <span>最后联系: {lead.lastContactDate}</span>}
                      {lead.followUpDate && (
                        <span className={needsFollowUp ? "text-orange-600 font-semibold" : ""}>
                          跟进: {lead.followUpDate}
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-1.5 pt-2 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            setFollowUpLead(lead)
                            setShowAddFollowUp(true)
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          添加跟进
                        </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedLead(lead)
                          setShowFollowUpHistory(true)
                        }}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        跟进记录
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

      {/* Lead Detail Sheet - 使用独立的客户详情组件 */}
      <CustomerDetailDrawer
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        customer={selectedLead ? {
          id: selectedLead.id,
          name: selectedLead.name,
          phone: selectedLead.phone,
          wechat: 'wx_' + selectedLead.name,
          consultant: '张顾问',
          status: '入库',
          statusProgress: 36,
          tags: selectedLead.priority === 'high' ? ['高净值', '复购客户'] : ['潜在客户'],
          fullName: selectedLead.name,
          starLevel: 4,
          source: selectedLead.source,
          ethnicity: '汉族',
          gender: '女',
          maternityConsultant: '张顾问',
          referralInfo: selectedLead.remark || '-',
          dueDate: selectedLead.followUpDate || '-',
        } : null}
      />
      {/* 新建线索抽屉 */}
      {showNewLead && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowNewLead(false)}>
          <div 
            className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold text-sm">新建线索</h2>
              <button onClick={() => setShowNewLead(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="text-xs font-medium mb-1 block">客户姓名</label>
                <Input placeholder="请输入客户姓名" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">联系电话</label>
                <Input placeholder="请输入联系电话" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">所在城市</label>
                <Input placeholder="请输入所在城市" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">服务类型</label>
                <div className="flex gap-2">
                  {Object.entries(serviceTypeMap).map(([key, label]) => (
                    <button key={key} className="flex-1 px-2 py-1.5 border rounded text-xs hover:bg-muted">{label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">线索来源</label>
                <Input placeholder="如：亲友介绍、小程序等" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">备注</label>
                <textarea className="w-full border rounded-lg p-2 text-sm resize-none h-16" placeholder="补充说明" />
              </div>
              <Button className="w-full h-9 bg-primary hover:bg-primary/90" onClick={() => setShowNewLead(false)}>
                确认添加
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 添加跟进记录抽屉 */}
      {showAddFollowUp && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setShowAddFollowUp(false)}>
          <div 
            className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold text-sm">添加跟进记录</h2>
              <button onClick={() => setShowAddFollowUp(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="text-xs font-medium mb-1 block">跟进方式</label>
                <div className="flex gap-2">
                  {['电话', '微信', '面访', '其他'].map(type => (
                    <button key={type} className="flex-1 px-2 py-1.5 border rounded text-xs hover:bg-muted">{type}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">跟进内容</label>
                <textarea className="w-full border rounded-lg p-2 text-sm resize-none h-20" placeholder="请输入跟进内容" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">下次跟进日期</label>
                <Input type="date" className="h-9" />
              </div>
              <Button className="w-full h-9 bg-primary hover:bg-primary/90" onClick={() => setShowAddFollowUp(false)}>
                保存记录
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 跟进记录历史抽屉 */}
      {showFollowUpHistory && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setShowFollowUpHistory(false)}>
          <div 
            className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold text-sm">跟进记录</h2>
              <button onClick={() => setShowFollowUpHistory(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              {[
                { date: '2026-03-27', type: '电话', content: '客户表示预产期在3月底，需要月嫂服务，已发送报价单' },
                { date: '2026-03-25', type: '微信', content: '首次添加微信，介绍了公司服务' },
              ].map((record, idx) => (
                <div key={idx} className="bg-muted/50 rounded p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">{record.type}</span>
                    <span className="text-[10px] text-muted-foreground">{record.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{record.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
