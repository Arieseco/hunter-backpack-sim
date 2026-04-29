"use client"

import { useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { MultiTrophyWithRequirements, TrophyMountSize } from "@/lib/database.types"

const SIZE_ORDER: Record<TrophyMountSize, number> = {
  極小: 1, 小: 2, 中: 3, 大: 4, 特大: 5, 極大: 6,
}

const SIZE_BADGE_CLASS: Record<TrophyMountSize, string> = {
  極小: "bg-slate-500/20 text-slate-400 border-slate-500/40",
  小:   "bg-sky-500/20   text-sky-400   border-sky-500/40",
  中:   "bg-green-500/20 text-green-400 border-green-500/40",
  大:   "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  特大: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  極大: "bg-red-500/20   text-red-400   border-red-500/40",
}

const SIZES: TrophyMountSize[] = ["極小", "小", "中", "大", "特大", "極大"]

function genderSymbol(gender: "male" | "female" | null): string {
  if (gender === "male") return "♂"
  if (gender === "female") return "♀"
  return ""
}

function formatCost(cost: number): string {
  return cost.toLocaleString("ja-JP")
}

interface MultiTrophyListProps {
  trophies: MultiTrophyWithRequirements[]
}

function RequirementChips({
  requirements,
}: {
  requirements: MultiTrophyWithRequirements["multi_trophy_requirements"]
}) {
  const sorted = [...requirements].sort((a, b) => a.sort_order - b.sort_order)
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {sorted.map((req, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
        >
          {req.animals?.name ?? "—"}
          <span className="text-muted-foreground">{genderSymbol(req.gender)}</span>
        </span>
      ))}
    </div>
  )
}

export function MultiTrophyList({ trophies }: MultiTrophyListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get("q") ?? ""
  const selectedSize = (searchParams.get("size") ?? "all") as TrophyMountSize | "all"

  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set("q", value)
    else params.delete("q")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function setSelectedSize(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value !== "all") params.set("size", value)
    else params.delete("size")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return trophies
      .filter((t) => {
        if (selectedSize !== "all" && t.size !== selectedSize) return false
        if (!q) return true
        if (t.name.toLowerCase().includes(q)) return true
        return t.multi_trophy_requirements.some((r) =>
          r.animals?.name.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => {
        const sizeDiff = SIZE_ORDER[a.size] - SIZE_ORDER[b.size]
        return sizeDiff !== 0 ? sizeDiff : a.name.localeCompare(b.name, "ja")
      })
  }, [trophies, search, selectedSize])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="名前・動物名で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのサイズ</SelectItem>
            {SIZES.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          該当するマルチトロフィーが見つかりません
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((trophy) => (
            <Card key={trophy.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-foreground leading-snug">{trophy.name}</p>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-xs ${SIZE_BADGE_CLASS[trophy.size]}`}
                >
                  {trophy.size}
                </Badge>
              </div>
              <RequirementChips requirements={trophy.multi_trophy_requirements} />
              <p className="mt-3 text-right text-sm font-medium text-foreground tabular-nums">
                {formatCost(trophy.cost)}{" "}
                <span className="text-xs text-muted-foreground">G</span>
              </p>
            </Card>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">{filtered.length} 件</p>
    </div>
  )
}
