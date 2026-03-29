"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Search,
  Star,
  BookOpen,
  Play,
  Clock,
  Users,
  Heart,
  CheckCircle2,
  ChevronRight,
  Share2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SharePosterModal } from "@/components/share-poster-modal"

const filterTabs = ["全部", "孕期准备", "产后护理", "婴儿喂养", "早教启蒙", "心理调适"]

const courses = [
  {
    id: 1,
    name: "新手妈妈必修课",
    desc: "从孕晚期到产后42天，全方位产后护理知识攻略",
    lessons: 24,
    price: "¥199",
    originalPrice: "¥399",
    tag: "热门",
    category: "产后护理",
    rating: 4.9,
    students: 3826,
    instructor: "李晓红",
    instructorTitle: "三甲医院主任护师",
    duration: "12小时",
    chapters: [
      "产后身体变化与恢复",
      "科学坐月子饮食",
      "母乳喂养技巧",
      "新生儿护理基础",
      "产后情绪管理",
      "恶露观察与护理",
    ],
    cover: "gradient-orange",
  },
  {
    id: 2,
    name: "科学坐月子",
    desc: "月子期间饮食搭配、日常护理、运动恢复��指南",
    lessons: 16,
    price: "¥149",
    originalPrice: "¥299",
    tag: "推荐",
    category: "产后护理",
    rating: 4.8,
    students: 2156,
    instructor: "张美玲",
    instructorTitle: "注册营养师",
    duration: "8小时",
    chapters: [
      "月子餐食谱大全",
      "产后伤口护理",
      "月子期间运动指导",
      "婆媳月子沟通技巧",
    ],
    cover: "gradient-rose",
  },
  {
    id: 3,
    name: "母乳喂养指南",
    desc: "母乳喂养全面指导，解决堵奶、追奶等常见问题",
    lessons: 12,
    price: "¥99",
    originalPrice: null,
    tag: "",
    category: "婴儿喂养",
    rating: 4.9,
    students: 5102,
    instructor: "王丽华",
    instructorTitle: "国际认证泌乳顾问",
    duration: "6小时",
    chapters: [
      "母乳喂养姿势",
      "奶量不足怎么办",
      "堵奶与乳腺炎预防",
      "母乳存储指南",
    ],
    cover: "gradient-teal",
  },
  {
    id: 4,
    name: "婴幼儿辅食添加",
    desc: "6-24月龄科学辅食添加全计划，附100+食谱",
    lessons: 20,
    price: "¥169",
    originalPrice: "¥299",
    tag: "新上",
    category: "婴儿喂养",
    rating: 4.7,
    students: 1823,
    instructor: "陈明芳",
    instructorTitle: "儿童营养专家",
    duration: "10小时",
    chapters: [
      "辅食添加时机判断",
      "第一口辅食怎么选",
      "不同月龄食谱推荐",
      "过敏食物添加策略",
    ],
    cover: "gradient-amber",
  },
  {
    id: 5,
    name: "新生儿护理",
    desc: "新生儿日常护理全要点，黄疸、脐带、洗澡一网打尽",
    lessons: 18,
    price: "¥129",
    originalPrice: null,
    tag: "",
    category: "产后护理",
    rating: 4.8,
    students: 2987,
    instructor: "周琳",
    instructorTitle: "新生儿科护士长",
    duration: "9小时",
    chapters: [
      "新生儿黄疸护理",
      "脐带消毒与护理",
      "正确洗澡与抚触",
      "睡眠作息调整",
    ],
    cover: "gradient-sky",
  },
  {
    id: 6,
    name: "0-3岁早教启蒙",
    desc: "在家也能做的早教游戏，培养宝宝全面发展",
    lessons: 30,
    price: "¥249",
    originalPrice: "¥499",
    tag: "热门",
    category: "早教启蒙",
    rating: 4.9,
    students: 4521,
    instructor: "林彤",
    instructorTitle: "儿童发展心理学博士",
    duration: "15小时",
    chapters: [
      "大运动发展游戏",
      "精细动作训练",
      "语言启蒙方法",
      "认知能力培养",
      "社交情感引导",
    ],
    cover: "gradient-violet",
  },
]

const coverColors: Record<string, string> = {
  "gradient-orange": "from-orange-100 to-amber-50",
  "gradient-rose": "from-rose-100 to-pink-50",
  "gradient-teal": "from-teal-100 to-emerald-50",
  "gradient-amber": "from-amber-100 to-yellow-50",
  "gradient-sky": "from-sky-100 to-blue-50",
  "gradient-violet": "from-violet-100 to-purple-50",
}

const coverIconColors: Record<string, string> = {
  "gradient-orange": "text-orange-300",
  "gradient-rose": "text-rose-300",
  "gradient-teal": "text-teal-300",
  "gradient-amber": "text-amber-300",
  "gradient-sky": "text-sky-300",
  "gradient-violet": "text-violet-300",
}

interface CoursesServicePageProps {
  onBack: () => void
  isGuest?: boolean
  onRegister?: () => void
}

export function CoursesServicePage({ onBack, isGuest, onRegister }: CoursesServicePageProps) {
  const [activeFilter, setActiveFilter] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showPoster, setShowPoster] = useState(false)

  const filteredCourses = activeFilter === "全部"
    ? courses
    : courses.filter((c) => c.category === activeFilter)

  // Detail View
  if (showDetail && selectedCourse) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 safe-area-top flex items-center gap-3 shadow-sm">
          <button onClick={() => setShowDetail(false)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground flex-1">课程详情</h1>
          <button onClick={() => setShowPoster(true)} className="p-1">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </header>

        {/* Course Cover */}
        <div className={cn("h-48 bg-gradient-to-br flex items-center justify-center", coverColors[selectedCourse.cover])}>
          <BookOpen className={cn("w-20 h-20", coverIconColors[selectedCourse.cover])} />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Course Info */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-foreground">{selectedCourse.name}</h2>
                    {selectedCourse.tag && (
                      <Badge className="bg-violet-100 text-violet-700 border-0 text-xs">{selectedCourse.tag}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{selectedCourse.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Play className="w-3.5 h-3.5" />
                  {selectedCourse.lessons}节课
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {selectedCourse.students.toLocaleString()}人学习
                </span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm">{selectedCourse.rating}</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-bold text-violet-600">{selectedCourse.price}</span>
                {selectedCourse.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">{selectedCourse.originalPrice}</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">讲师介绍</h3>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-violet-600">{selectedCourse.instructor[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedCourse.instructor}</p>
                  <p className="text-xs text-muted-foreground">{selectedCourse.instructorTitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Outline */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">课程大纲</h3>
              <div className="space-y-2">
                {selectedCourse.chapters.map((chapter, idx) => (
                  <div key={chapter} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                    <span className="w-6 h-6 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground">{chapter}</span>
                    <Play className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
                  </div>
                ))}
                {selectedCourse.lessons > selectedCourse.chapters.length && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    还有{selectedCourse.lessons - selectedCourse.chapters.length}节课程...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-20">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-violet-600">{selectedCourse.price}</span>
                {selectedCourse.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">{selectedCourse.originalPrice}</span>
                )}
              </div>
            </div>
            <Button
              className="h-12 px-8 rounded-xl bg-violet-500 hover:bg-violet-600 text-white"
              onClick={() => {
                if (isGuest && onRegister) { onRegister() }
              }}
            >
              立即购买
            </Button>
          </div>
        </div>

        {showPoster && (
          <SharePosterModal
            onClose={() => setShowPoster(false)}
            type="course"
            themeColor="violet"
            data={{
              name: selectedCourse.name,
              subtitle: `${selectedCourse.instructor} | ${selectedCourse.instructorTitle}`,
              desc: selectedCourse.desc,
              price: selectedCourse.price,
              tags: [
                `${selectedCourse.lessons}节课`,
                selectedCourse.duration,
                `${selectedCourse.students.toLocaleString()}人学习`,
              ],
              rating: selectedCourse.rating,
            }}
          />
        )}
      </div>
    )
  }

  // List View
  return (
    <div className="min-h-screen bg-background pb-4">
      <header className="bg-card sticky top-0 z-10 shadow-sm safe-area-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-full bg-muted/50 border-0 text-sm"
            />
          </div>
        </div>
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === tab ? "bg-violet-500 text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="px-4 pt-4">
        <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-100 to-purple-50 overflow-hidden">
          <CardContent className="p-4 relative">
            <div className="relative z-10">
              <h3 className="font-bold text-foreground">育儿知识学堂</h3>
              <p className="text-xs text-muted-foreground mt-1">专业讲师在线授课，科学育儿不走弯路</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-card/80 text-violet-700 border-0 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-0.5" />
                  专家认证
                </Badge>
                <Badge className="bg-card/80 text-violet-700 border-0 text-xs">
                  <Play className="w-3 h-3 mr-0.5" />
                  随时学习
                </Badge>
              </div>
            </div>
            <BookOpen className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-violet-200" />
          </CardContent>
        </Card>
      </div>

      {/* Course List */}
      <div className="px-4 py-4 space-y-3">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            onClick={() => { setSelectedCourse(course); setShowDetail(true) }}
          >
            <CardContent className="p-0">
              <div className="flex">
                {/* Course Cover */}
                <div className={cn("w-28 shrink-0 flex items-center justify-center bg-gradient-to-br aspect-square", coverColors[course.cover])}>
                  <BookOpen className={cn("w-10 h-10", coverIconColors[course.cover])} />
                </div>
                {/* Course Info */}
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground text-sm line-clamp-1">{course.name}</h3>
                      {course.tag && <Badge className="bg-violet-100 text-violet-700 border-0 text-[10px] shrink-0">{course.tag}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.desc}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                      <span>{course.lessons}节课</span>
                      <span>{course.duration}</span>
                      <span>{course.students.toLocaleString()}人学习</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-violet-600">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through">{course.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
