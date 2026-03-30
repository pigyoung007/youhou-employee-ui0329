"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Phone,
  ChevronRight,
  User,
  Tag,
  Clock,
  MessageSquare,
  Filter,
  Mic,
  FileText,
} from "lucide-react"

// 线索数据
const leads = [
  {
    id: 1,
    name: "张女士",
    phone: "138****1234",
    category: "月嫂培训",
    source: "抖音广告",
    intention: "高意向",
    lastContact: "2026-01-21",
    note: "咨询月嫂培训课程，预计下月报名",
    followUps: [
      { date: "2026-01-21", content: "初次电话沟通，客户对月嫂培训很感兴趣" },
      { date: "2026-01-19", content: "发送课程资料，客户表示会仔细了解" },
    ],
  },
  {
    id: 2,
    name: "李阿姨",
    phone: "139****5678",
    category: "育婴师培训",
    source: "朋友推荐",
    intention: "中意向",
    lastContact: "2026-01-20",
    note: "有育儿经验，想考证",
    followUps: [
      { date: "2026-01-20", content: "电话回访，客户考虑中" },
    ],
  },
  {
    id: 3,
    name: "王大姐",
    phone: "137****9012",
    category: "催乳师培训",
    source: "线下活动",
    intention: "低意向",
    lastContact: "2026-01-18",
    note: "先了解情况",
    followUps: [],
  },
]

// 意向标签
const intentionTags = ["高意向", "中意向", "低意向", "已报名", "已流失"]

// 来源渠道
const sourceChannels = ["抖音广告", "微信公众号", "朋友推荐", "线下活动", "官网咨询", "其他"]

// 课程类型
const courseTypes = ["月嫂培训", "育婴师培训", "催乳师培训", "产后康复师培训", "小儿推拿培训"]

export function CareerLeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<(typeof leads)[0] | null>(null)
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const filteredLeads = leads.filter(lead => {
    if (activeFilter === "all") return true
    return lead.intention === activeFilter
  }).filter(lead => {
    if (!searchQuery) return true
    return lead.name.includes(searchQuery) || lead.phone.includes(searchQuery)
  })

  const getIntentionColor = (intention: string) => {
    switch (intention) {
      case "高意向":
        return "bg-teal-100 text-teal-700"
      case "中意向":
        return "bg-amber-100 text-amber-700"
      case "低意向":
        return "bg-gray-100 text-gray-600"
      case "已报名":
        return "bg-violet-100 text-violet-700"
      case "已流失":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">线索池</h1>
          <Button 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setShowAddLead(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            新增线索
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-xl font-bold">{leads.length}</p>
            <p className="text-xs text-white/70">全部线索</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{leads.filter(l => l.intention === "高意向").length}</p>
            <p className="text-xs text-white/70">高意向</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{leads.filter(l => l.intention === "中意向").length}</p>
            <p className="text-xs text-white/70">中意向</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-white/70">今日跟进</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索姓名或手机号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "高意向", "中意向", "低意向"].map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "default" : "outline"}
              className={activeFilter === filter ? "bg-violet-500 hover:bg-violet-600" : "bg-transparent"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "全部" : filter}
            </Button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <Card 
              key={lead.id} 
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedLead(lead)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{lead.name}</h3>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </div>
                  </div>
                  <Badge className={`text-[10px] ${getIntentionColor(lead.intention)}`}>
                    {lead.intention}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px]">
                    <Tag className="w-3 h-3 mr-1" />
                    {lead.category}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {lead.source}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{lead.note}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    最近跟进：{lead.lastContact}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-violet-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        // 拨打电话
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Lead Detail Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>线索详情</SheetTitle>
          </SheetHeader>
          {selectedLead && (
            <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
              {/* Basic Info */}
              <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl">
                <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-violet-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{selectedLead.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLead.phone}</p>
                </div>
                <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                  <Phone className="w-4 h-4 mr-1" />
                  拨打
                </Button>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">意向标签</Label>
                <div className="flex flex-wrap gap-2">
                  {intentionTags.map((tag) => (
                    <Badge
                      key={tag}
                      className={`cursor-pointer ${
                        selectedLead.intention === tag 
                          ? getIntentionColor(tag) 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">意向课程</p>
                  <p className="font-medium text-foreground">{selectedLead.category}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">来源渠道</p>
                  <p className="font-medium text-foreground">{selectedLead.source}</p>
                </div>
              </div>

              {/* Note */}
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-1">备注说明</p>
                <p className="text-sm text-foreground">{selectedLead.note}</p>
              </div>

              {/* Follow Up Records */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">跟进记录</h4>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setShowAddFollowUp(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加跟进
                  </Button>
                </div>
                <div className="space-y-3">
                  {selectedLead.followUps.map((followUp, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-violet-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-foreground">{followUp.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">{followUp.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {selectedLead.followUps.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">暂无跟进记录</p>
                  )}
                </div>
              </div>

              {/* Recording Feature */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isRecording ? "bg-red-500 animate-pulse" : "bg-violet-100"
                    }`}>
                      <Mic className={`w-6 h-6 ${isRecording ? "text-white" : "text-violet-500"}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">通话录音</h4>
                      <p className="text-xs text-muted-foreground">支持录音转写与内容提取</p>
                    </div>
                    <Button 
                      size="sm"
                      variant={isRecording ? "destructive" : "outline"}
                      className={isRecording ? "" : "bg-transparent"}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? "停止" : "开始"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Lead Sheet */}
      <Sheet open={showAddLead} onOpenChange={setShowAddLead}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>新增线索</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 py-4 space-y-4 overflow-y-auto">
            <div>
              <Label>姓名</Label>
              <Input placeholder="请输入姓名" />
            </div>
            <div>
              <Label>电话</Label>
              <Input placeholder="请输入手机号" />
            </div>
            <div>
              <Label>意向课程</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择课程类型" />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((course) => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>来源渠道</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择来源渠道" />
                </SelectTrigger>
                <SelectContent>
                  {sourceChannels.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>备注</Label>
              <Textarea placeholder="请输入备注信息" rows={3} />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <Button className="w-full bg-violet-500 hover:bg-violet-600" onClick={() => setShowAddLead(false)}>
              保存线索
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Follow Up Sheet */}
      <Sheet open={showAddFollowUp} onOpenChange={setShowAddFollowUp}>
        <SheetContent side="right" className="flex flex-col min-h-0">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>添加跟进记录</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label>跟进内容</Label>
              <Textarea placeholder="请输入跟进内容" rows={4} />
            </div>
            <div>
              <Label>更新意向</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择意向等级" />
                </SelectTrigger>
                <SelectContent>
                  {intentionTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <Button className="w-full bg-violet-500 hover:bg-violet-600" onClick={() => setShowAddFollowUp(false)}>
              保存跟进
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
