"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { HuntingDogWithDetails, DogTrait } from "@/lib/database.types"

const LEVELS = [5, 10, 15, 20, 25, 30] as const

function TraitRow({ level, traits }: { level: number; traits: DogTrait[] }) {
  const slot1 = traits.find((t) => t.level === level && t.slot === 1)
  const slot2 = traits.find((t) => t.level === level && t.slot === 2)

  return (
    <div className="grid grid-cols-[80px_1fr_1fr] gap-x-3 gap-y-1 py-3 border-b border-border last:border-0">
      <div className="flex items-start pt-0.5">
        <Badge variant="outline" className="text-xs font-mono">Lv{level}</Badge>
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{slot1?.name ?? "-"}</p>
        {slot1?.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{slot1.description}</p>
        )}
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{slot2?.name ?? "-"}</p>
        {slot2?.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{slot2.description}</p>
        )}
      </div>
    </div>
  )
}

function DogCard({ dog }: { dog: HuntingDogWithDetails }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-4 bg-card hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-foreground">{dog.name}</span>
          <Badge variant="secondary" className="text-xs">DLC</Badge>
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-5 border-t border-border bg-card space-y-5 pt-4">
          {dog.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{dog.description}</p>
          )}

          {dog.dog_abilities.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">主な能力</h3>
              <ul className="space-y-2">
                {dog.dog_abilities.map((a) => (
                  <li key={a.id} className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">{a.name}</p>
                    {a.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="grid grid-cols-[80px_1fr_1fr] gap-x-3 mb-1 pb-1 border-b border-border">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">レベル</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">特性 A</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">特性 B</span>
            </div>
            {LEVELS.map((lv) => (
              <TraitRow key={lv} level={lv} traits={dog.dog_traits} />
            ))}
          </div>

          {dog.notes && (
            <div className="rounded-md bg-muted/40 px-3 py-2">
              <p className="text-xs text-muted-foreground leading-relaxed">{dog.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface DogListProps {
  dogs: HuntingDogWithDetails[]
}

export function DogList({ dogs }: DogListProps) {
  if (dogs.length === 0) {
    return <p className="text-muted-foreground text-sm">狩猟犬データがありません。</p>
  }

  return (
    <div className="space-y-3">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  )
}
