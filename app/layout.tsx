import type React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_SC } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-sc",
})

export const metadata: Metadata = {
  title: "优厚家庭服务",
  description: "专业母婴护理·家政服务·培训就业一站式平台",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF8C00",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
