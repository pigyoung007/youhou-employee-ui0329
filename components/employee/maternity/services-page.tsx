"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Shield,
  Award,
  Star,
  ChevronRight,
  Share2,
  Baby,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  Flower2,
  Heart,
} from "lucide-react"

// 品牌实力
const brandStats = {
  families: 10000,
  caregivers: 500,
  years: 8,
  satisfaction: 99,
}

// 资质认证
const certifications = [
  { name: "人社部认证", icon: Shield, verified: true },
  { name: "行业协会会员", icon: Award, verified: true },
  { name: "ISO9001认证", icon: Star, verified: true },
]

// 服务项目
const serviceProjects = [
  {
    id: 1,
    name: "月嫂服务",
    icon: Baby,
    duration: "26天/40天",
    priceRange: "8800-22800元",
    description: "专业月嫂上门服务，照顾产妇和新生儿",
    features: ["新生儿护理", "产妇护理", "月子餐制作", "催乳通乳"],
    levels: [
      { name: "初级月嫂", price: "8800-10800元/26天" },
      { name: "中级月嫂", price: "10800-12800元/26天" },
      { name: "高级月嫂", price: "12800-15800元/26天" },
      { name: "金牌月嫂", price: "15800-18800元/26天" },
      { name: "钻石月嫂", price: "18800-22800元/26天" },
    ],
  },
  {
    id: 2,
    name: "育儿嫂服务",
    icon: Heart,
    duration: "月度服务",
    priceRange: "6800-12800元/月",
    description: "专业育儿嫂，照顾婴幼儿日常生活",
    features: ["婴幼儿护理", "辅食制作", "早教启蒙", "习惯培养"],
    levels: [
      { name: "初级育儿嫂", price: "6800-8800元/月" },
      { name: "中级育儿嫂", price: "8800-10800元/月" },
      { name: "高级育儿嫂", price: "10800-12800元/月" },
    ],
  },
  {
    id: 3,
    name: "产后康复服务",
    icon: Flower2,
    duration: "按次/套餐",
    priceRange: "200-15800元",
    description: "专业产后康复，帮助产妇恢复身体",
    features: ["盆底肌康复", "腹直肌修复", "产后塑形", "疏通乳腺"],
    levels: [
      { name: "单次服务", price: "200-500元/次" },
      { name: "基础套餐", price: "3980元/10次" },
      { name: "标准套餐", price: "7980元/20次" },
      { name: "尊享套餐", price: "15800元/40次" },
    ],
  },
]

export function MaternityServicesPage() {
  const [selectedProject, setSelectedProject] = useState<(typeof serviceProjects)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-4">服务中心</h1>
        
        {/* Brand Stats */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-sm text-white/80 mb-3">品牌实力</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.families}+</p>
              <p className="text-xs text-white/70">服务家庭</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.caregivers}+</p>
              <p className="text-xs text-white/70">专业阿姨</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.years}年</p>
              <p className="text-xs text-white/70">服务年限</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{brandStats.satisfaction}%</p>
              <p className="text-xs text-white/70">好评率</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Certifications */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">资质认证</h2>
          <div className="grid grid-cols-3 gap-3">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 mx-auto bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-rose-500" />
                    </div>
                    <p className="text-xs font-medium text-foreground">{cert.name}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Service Projects */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">服务项目</h2>
          <div className="space-y-3">
            {serviceProjects.map((project) => {
              const Icon = project.icon
              return (
                <Card 
                  key={project.id} 
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-rose-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{project.name}</h3>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {project.duration}
                          </span>
                          <span className="flex items-center gap-1 text-rose-600 font-bold">
                            <DollarSign className="w-3 h-3" />
                            {project.priceRange}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/50">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-[10px]">{feature}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>

      {/* Project Detail Sheet */}
      <Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle>{selectedProject?.name}</SheetTitle>
          </SheetHeader>
          {selectedProject && (
            <div className="py-4 space-y-4 overflow-y-auto h-[calc(80vh-140px)]">
              {/* Icon & Description */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-100 to-pink-50 rounded-2xl flex items-center justify-center mb-3">
                  <selectedProject.icon className="w-10 h-10 text-rose-500" />
                </div>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">服务内容</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-rose-500" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Levels */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">价格档位</h4>
                <div className="space-y-2">
                  {selectedProject.levels.map((level, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <CardContent className="p-3 flex items-center justify-between">
                        <span className="font-medium text-foreground">{level.name}</span>
                        <span className="text-rose-600 font-bold">{level.price}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4">
                <Button className="w-full bg-rose-500 hover:bg-rose-600">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享服务
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
