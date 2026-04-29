"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronDown, Clock, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { PerkCategory, PerkWithLevels } from "@/lib/database.types"

const CATEGORIES: PerkCategory[] = ['ライフル', 'ハンドガン', 'ショットガン', 'アーチェリー']

function formatCooldown(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}時間${m > 0 ? `${m}分` : ''}`
  if (m > 0) return `${m}分${s > 0 ? `${s}秒` : ''}`
  return `${s}秒`
}

function PerkCard({ perk }: { perk: PerkWithLevels }) {
  const [expanded, setExpanded] = useState(false)
  const levels = [...perk.perk_levels].sort((a, b) => a.level - b.level)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-medium text-foreground">{perk.name}</span>
            {perk.activation_type === 'active' ? (
              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/30">
                <Zap className="h-3 w-3 mr-1" />アクティブ
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs bg-slate-500/10 text-slate-400 border-slate-500/30">
                パッシブ
              </Badge>
            )}
            {perk.cooldown != null && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatCooldown(perk.cooldown)}
              </span>
            )}
            {perk.max_level > 1 && (
              <span className="text-xs text-muted-foreground">最大Lv{perk.max_level}</span>
            )}
          </div>
          {perk.comment && (
            <p className="text-xs text-muted-foreground leading-relaxed">{perk.comment}</p>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && levels.length > 0 && (
        <div className="border-t border-border divide-y divide-border/50">
          {levels.map((lvl) => (
            <div key={lvl.level} className="px-4 py-3 flex gap-3">
              <span className="text-xs font-semibold text-primary shrink-0 mt-0.5 w-8">
                Lv{lvl.level}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{lvl.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function PerkList({ perks }: { perks: PerkWithLevels[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = (searchParams.get('cat') ?? 'ライフル') as PerkCategory

  function setCategory(cat: PerkCategory) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('cat', cat)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const filtered = perks
    .filter((p) => p.category === activeCategory)
    .sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-0 border-b border-border">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeCategory === cat
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((perk) => (
          <PerkCard key={perk.id} perk={perk} />
        ))}
      </div>
    </div>
  )
}
