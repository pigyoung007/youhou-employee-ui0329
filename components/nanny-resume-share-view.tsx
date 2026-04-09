"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Sparkles, Play } from "lucide-react"
import { cn } from "@/lib/utils"

/** 与「客户详情 · 家政员档案 · 简历」区块字段一致，供抽屉与简历分享页复用 */
export interface NannyResumeShareData {
  name: string
  avatar?: string
  subtitle?: string
  selfIntro: string
  gender?: string
  ethnicity?: string
  zodiac?: string
  hometown?: string
  skills: string[]
  certificates: { name: string }[]
  workPhotos: string[]
  foodPhotos: string[]
  introVideoUrl?: string
  introVideoPoster?: string
  reviews?: { quote: string; author: string; date?: string }[]
  workHistory?: string[]
}

export function buildNannyResumeData(
  base: {
    name: string
    avatar?: string
    subtitle?: string
    selfIntro?: string
    gender?: string
    ethnicity?: string
    zodiac?: string
    hometown?: string
    skills?: string[]
    certificates?: { name: string }[]
    workPhotos?: string[]
    foodPhotos?: string[]
    introVideoUrl?: string
    introVideoPoster?: string
    reviews?: NannyResumeShareData["reviews"]
    workHistory?: string[]
  },
  override?: Partial<NannyResumeShareData>,
): NannyResumeShareData {
  const ph = "/placeholder.svg"
  const av = base.avatar || ph
  const defaults: NannyResumeShareData = {
    name: base.name,
    avatar: av,
    subtitle: base.subtitle ?? "家政服务",
    selfIntro:
      base.selfIntro ??
      `您好，我是${base.name}，从事母婴护理工作多年，持有相关资质证书，擅长新生儿护理、产妇护理与月子餐，服务细致耐心。`,
    gender: base.gender ?? "女",
    ethnicity: base.ethnicity ?? "汉族",
    zodiac: base.zodiac ?? "天蝎座",
    hometown: base.hometown ?? "—",
    skills: base.skills ?? ["母乳喂养指导", "新生儿护理", "月子餐", "产妇护理"],
    certificates: base.certificates ?? [
      { name: "高级母婴护理师" },
      { name: "健康证" },
      { name: "育婴师（三级）" },
    ],
    workPhotos: base.workPhotos?.length ? base.workPhotos : [av, ph, ph],
    foodPhotos: base.foodPhotos?.length ? base.foodPhotos : [ph, ph, ph],
    introVideoUrl: base.introVideoUrl,
    introVideoPoster: base.introVideoPoster ?? av,
    reviews: base.reviews ?? [
      { quote: "阿姨非常专业，护理细心周到，强烈推荐！", author: "王女士", date: "2025-02" },
    ],
    workHistory: base.workHistory ?? [
      "2020-2025：银川市多家庭 月嫂/育婴服务",
      "2018-2020：机构培训与上户实习",
    ],
  }
  return { ...defaults, ...override }
}

export function domesticWorkerToResumeData(worker: {
  name: string
  avatar?: string
  level: string
  workerType: string
  age: number
  hometown: string
  experience: string
  gender?: string
  ethnicity?: string
  zodiac?: string
}): NannyResumeShareData {
  const ph = "/placeholder.svg"
  const av = worker.avatar || ph
  return buildNannyResumeData({
    name: worker.name,
    avatar: av,
    subtitle: `${worker.level} · ${worker.workerType}`,
    selfIntro: `您好，我是${worker.name}，${worker.age}岁，籍贯${worker.hometown}，具备${worker.experience}母婴护理经验，持有高级母婴护理师等资质，擅长新生儿护理、产妇护理与月子餐。`,
    gender: worker.gender,
    ethnicity: worker.ethnicity,
    zodiac: worker.zodiac,
    hometown: worker.hometown,
    workPhotos: [av, `${ph}#w1`, `${ph}#w2`],
    foodPhotos: [`${ph}#f1`, `${ph}#f2`, `${ph}#f3`],
  })
}

export function NannyResumeShareView({
  data,
  className,
  dense,
}: {
  data: NannyResumeShareData
  className?: string
  /** 抽屉内略紧凑，分享全屏略松 */
  dense?: boolean
}) {
  const gap = dense ? "space-y-3" : "space-y-4"
  const textSize = dense ? "text-xs" : "text-sm"
  const pad = dense ? "p-3" : "p-4"

  return (
    <div className={cn(gap, className)}>
      <Card className="border-border border shadow-sm">
        <CardContent className={cn("space-y-3 leading-relaxed", pad, textSize)}>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary h-4 w-4 shrink-0" />
            <span className="text-foreground font-medium">自我介绍</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {([
              ["姓名", data.name],
              ["性别", data.gender],
              ["民族", data.ethnicity],
              ["星座", data.zodiac],
              ["籍贯", data.hometown],
            ] as const).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-foreground font-medium">{value || "—"}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-foreground mb-2 font-medium">技能标签</p>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-[10px] font-normal">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <p className="text-foreground mb-2 text-xs font-medium">工作照</p>
        <div className="grid grid-cols-3 gap-1.5">
          {data.workPhotos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="bg-muted/40 relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src.split("#")[0]} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-foreground mb-2 text-xs font-medium">视频介绍</p>
        <div className="bg-muted/40 relative aspect-video overflow-hidden rounded-lg border border-border">
          {data.introVideoUrl ? (
            <video
              src={data.introVideoUrl}
              poster={data.introVideoPoster}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-1 px-4 text-center text-xs">
              <Play className="h-10 w-10 opacity-40" />
              <span>视频可在管理端上传，上传后将在此播放</span>
            </div>
          )}
        </div>
      </section>

      <section>
        <p className="text-foreground mb-2 text-xs font-medium">辅食作品</p>
        <div className="grid grid-cols-3 gap-1.5">
          {data.foodPhotos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="bg-muted/40 relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src.split("#")[0]} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <Card className="border-border border shadow-sm">
        <CardContent className={pad}>
          <p className="text-foreground mb-2 text-xs font-medium">资质证书</p>
          <div className="space-y-2">
            {data.certificates.map((c) => (
              <div
                key={c.name}
                className="bg-muted/40 flex items-center justify-between rounded-md px-2 py-1.5 text-xs"
              >
                <span>{c.name}</span>
                <CheckCircle className="text-primary h-3.5 w-3.5 shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {data.reviews && data.reviews.length > 0 && (
        <section>
          <p className="text-foreground mb-2 text-xs font-medium">客户好评</p>
          <div className="space-y-2">
            {data.reviews.map((r, i) => (
              <Card key={i} className="border-border border-primary/10 bg-primary/5 shadow-sm">
                <CardContent className="p-3 text-xs">
                  <p className="text-foreground">&ldquo;{r.quote}&rdquo;</p>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    — {r.author}
                    {r.date ? ` ${r.date}` : ""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {data.workHistory && data.workHistory.length > 0 && (
        <section>
          <p className="text-foreground mb-2 text-xs font-medium">工作经历</p>
          <div className="text-muted-foreground space-y-1 text-xs">
            {data.workHistory.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
