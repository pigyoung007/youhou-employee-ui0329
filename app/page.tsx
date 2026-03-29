"use client"

import { useRouter } from "next/navigation"
import { EntryPortal } from "@/components/entry-portal"
import type { AppType } from "@/components/entry-portal"

export default function App() {
  const router = useRouter()

  const handleSelectApp = (type: AppType) => {
    router.push(`/${type}`)
  }

  return <EntryPortal onSelectApp={handleSelectApp} />
}
