"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { X, Search, Grip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { BallisticsChart } from "@/components/ballistics-chart"
import type { FirearmBallistics } from "@/lib/database.types"
import type { FirearmWithClass } from "@/lib/firearms"

// ─── constants ────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
  rifle: "ライフル",
  muzzleloader: "マズルローダー",
  shotgun: "ショットガン",
  handgun: "ハンドガン",
  bow: "弓",
}

const ALL_TYPES = ["rifle", "muzzleloader", "shotgun", "handgun", "bow"]

const STATS = [
  { key: "accuracy",          label: "精度",         higherIsBetter: true },
  { key: "recoil",            label: "反動",         higherIsBetter: false },
  { key: "reload_speed",      label: "リロード速度",  higherIsBetter: true },
  { key: "hipfire_accuracy",  label: "腰だめ精度",   higherIsBetter: true },
  { key: "magazine_capacity", label: "装弾数",        higherIsBetter: true },
  { key: "weight",            label: "重量 (kg)",    higherIsBetter: false },
] as const

// ─── helpers ──────────────────────────────────────────────────────────────────

function getNum(f: FirearmWithClass, key: string): number {
  return (f as unknown as Record<string, number>)[key] ?? 0
}

function displayStat(f: FirearmWithClass, key: string): string {
  if (key === "weight") return f.weight.toFixed(2)
  return String((f as unknown as Record<string, unknown>)[key] ?? "-")
}

async function fetchBallistics(firearmId: string): Promise<FirearmBallistics[]> {
  const { data } = await supabase
    .from("firearm_ballistics")
    .select("*")
    .eq("firearm_id", firearmId)
    .order("ammo_note")
    .order("zero_distance")
    .order("range_distance")
  return (data as FirearmBallistics[] | null) ?? []
}

function ammoNotesList(ballistics: FirearmBallistics[]): Array<string | null> {
  const notes = [...new Set(ballistics.map((r) => r.ammo_note ?? null))]
  return notes
}

// ─── FirearmCardContent ────────────────────────────────────────────────────────

function FirearmCardContent({ firearm }: { firearm: FirearmWithClass }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 select-none">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{firearm.name}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge variant="secondary" className="text-xs">{TYPE_LABEL[firearm.type] ?? firearm.type}</Badge>
            {firearm.ammo_classes.map((c, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {c.min === c.max ? `C${c.min}` : `C${c.min}-${c.max}`}
              </Badge>
            ))}
          </div>
        </div>
        <Grip className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 tabular-nums">{firearm.weight.toFixed(2)} kg</p>
    </div>
  )
}

// ─── DraggableCard ────────────────────────────────────────────────────────────

function DraggableCard({ firearm }: { firearm: FirearmWithClass }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: firearm.id,
    data: { firearm },
  })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn("touch-none cursor-grab active:cursor-grabbing", isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      <FirearmCardContent firearm={firearm} />
    </div>
  )
}

// ─── DroppableSlot ────────────────────────────────────────────────────────────

function DroppableSlot({
  slotId,
  label,
  firearm,
  onRemove,
}: {
  slotId: string
  label: string
  firearm: FirearmWithClass | null
  onRemove: () => void
}) {
  const { isOver, setNodeRef } = useDroppable({ id: slotId })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-1 min-h-[90px] rounded-lg border-2 border-dashed transition-colors p-3",
        isOver ? "border-primary bg-primary/5" : "border-border",
      )}
    >
      {firearm ? (
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="font-semibold text-foreground mt-0.5">{firearm.name}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">{TYPE_LABEL[firearm.type] ?? firearm.type}</Badge>
              {firearm.ammo_classes.map((c, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {c.min === c.max ? `C${c.min}` : `C${c.min}-${c.max}`}
                </Badge>
              ))}
            </div>
          </div>
          <button
            onClick={onRemove}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center py-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">銃器をドラッグ</p>
        </div>
      )}
    </div>
  )
}

// ─── StatsComparison ──────────────────────────────────────────────────────────

function StatsComparison({ a, b }: { a: FirearmWithClass; b: FirearmWithClass }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-medium text-muted-foreground w-1/3">項目</th>
            <th className="text-center py-2 px-2 font-medium w-1/3 truncate max-w-[120px]">{a.name}</th>
            <th className="text-center py-2 pl-2 font-medium w-1/3 truncate max-w-[120px]">{b.name}</th>
          </tr>
        </thead>
        <tbody>
          {STATS.map(({ key, label, higherIsBetter }) => {
            const va = getNum(a, key)
            const vb = getNum(b, key)
            const aWins = higherIsBetter ? va > vb : va < vb
            const bWins = higherIsBetter ? vb > va : vb < va

            return (
              <tr key={key} className="border-b border-border/50 last:border-0">
                <td className="py-2 pr-4 text-muted-foreground">{label}</td>
                <td
                  className={cn(
                    "py-2 px-2 text-center tabular-nums font-medium",
                    aWins && "text-green-500",
                    bWins && "text-red-400",
                  )}
                >
                  {displayStat(a, key)}
                </td>
                <td
                  className={cn(
                    "py-2 pl-2 text-center tabular-nums font-medium",
                    bWins && "text-green-500",
                    aWins && "text-red-400",
                  )}
                >
                  {displayStat(b, key)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── AmmoNoteFilter ───────────────────────────────────────────────────────────

function AmmoNoteFilter({
  notes,
  selected,
  onChange,
}: {
  notes: Array<string | null>
  selected: string | null
  onChange: (v: string | null) => void
}) {
  if (notes.length <= 1) return null
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {notes.map((n) => (
        <button
          key={n ?? "__none__"}
          onClick={() => onChange(n)}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
            selected === n
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          {n ?? "デフォルト"}
        </button>
      ))}
    </div>
  )
}

// ─── ZeroFilter ───────────────────────────────────────────────────────────────

function ZeroFilter({
  zeros,
  selected,
  onChange,
}: {
  zeros: number[]
  selected: number | null
  onChange: (v: number | null) => void
}) {
  if (zeros.length <= 1) return null
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
          selected === null
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
        )}
      >
        全ゼロイン
      </button>
      {zeros.map((z) => (
        <button
          key={z}
          onClick={() => onChange(z)}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
            selected === z
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          {z}m
        </button>
      ))}
    </div>
  )
}

// ─── BallisticsPanel ──────────────────────────────────────────────────────────

function BallisticsPanel({
  firearm,
  ballistics,
  ammoNote,
  onAmmoNoteChange,
}: {
  firearm: FirearmWithClass
  ballistics: FirearmBallistics[]
  ammoNote: string | null
  onAmmoNoteChange: (v: string | null) => void
}) {
  const notes = ammoNotesList(ballistics)
  const filtered = ballistics.filter((r) => (r.ammo_note ?? null) === ammoNote)
  const zeros = [...new Set(filtered.map((r) => r.zero_distance))].sort((a, b) => a - b)
  const [zeroFilter, setZeroFilter] = useState<number | null>(null)

  const chartBallistics = zeroFilter === null
    ? ballistics
    : ballistics.filter((r) => r.zero_distance === zeroFilter)

  if (ballistics.length === 0) {
    return <p className="text-xs text-muted-foreground py-4 text-center">弾道データなし</p>
  }

  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {firearm.name}
      </p>
      <AmmoNoteFilter notes={notes} selected={ammoNote} onChange={onAmmoNoteChange} />
      <ZeroFilter zeros={zeros} selected={zeroFilter} onChange={setZeroFilter} />
      <BallisticsChart ballistics={chartBallistics} ammoNote={ammoNote} />
    </div>
  )
}

// ─── CompareResults ───────────────────────────────────────────────────────────

function CompareResults({
  slotA,
  slotB,
  ballisticsA,
  ballisticsB,
  ammoNoteA,
  ammoNoteB,
  onAmmoNoteAChange,
  onAmmoNoteBChange,
}: {
  slotA: FirearmWithClass
  slotB: FirearmWithClass
  ballisticsA: FirearmBallistics[]
  ballisticsB: FirearmBallistics[]
  ammoNoteA: string | null
  ammoNoteB: string | null
  onAmmoNoteAChange: (v: string | null) => void
  onAmmoNoteBChange: (v: string | null) => void
}) {
  return (
    <div className="mt-6 space-y-6">
      {/* Stats */}
      <div className="rounded-lg border border-border p-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          スペック比較
        </h2>
        <StatsComparison a={slotA} b={slotB} />
        <p className="text-xs text-muted-foreground mt-2">
          <span className="text-green-500 font-medium">緑</span>: 優勢
          <span className="text-red-400 font-medium">赤</span>: 劣勢
        </p>
      </div>

      {/* Ballistics */}
      {(ballisticsA.length > 0 || ballisticsB.length > 0) && (
        <div className="rounded-lg border border-border p-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            弾道性能
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ballisticsA.length > 0 && (
              <BallisticsPanel
                firearm={slotA}
                ballistics={ballisticsA}
                ammoNote={ammoNoteA}
                onAmmoNoteChange={onAmmoNoteAChange}
              />
            )}
            {ballisticsB.length > 0 && (
              <BallisticsPanel
                firearm={slotB}
                ballistics={ballisticsB}
                ammoNote={ammoNoteB}
                onAmmoNoteChange={onAmmoNoteBChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── CompareSimulator (main export) ──────────────────────────────────────────

interface CompareSimulatorProps {
  firearms: FirearmWithClass[]
}

export function CompareSimulator({ firearms }: CompareSimulatorProps) {
  const [slotA, setSlotA] = useState<FirearmWithClass | null>(null)
  const [slotB, setSlotB] = useState<FirearmWithClass | null>(null)
  const [ballisticsA, setBallisticsA] = useState<FirearmBallistics[]>([])
  const [ballisticsB, setBallisticsB] = useState<FirearmBallistics[]>([])
  const [ammoNoteA, setAmmoNoteA] = useState<string | null>(null)
  const [ammoNoteB, setAmmoNoteB] = useState<string | null>(null)
  const [activeFirearm, setActiveFirearm] = useState<FirearmWithClass | null>(null)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  const presentTypes = [...new Set(firearms.map((f) => f.type))]

  const filtered = firearms.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || f.type === typeFilter
    return matchSearch && matchType
  })

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as { firearm: FirearmWithClass } | undefined
    if (data) setActiveFirearm(data.firearm)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveFirearm(null)
    const { over, active } = event
    if (!over) return
    const data = active.data.current as { firearm: FirearmWithClass } | undefined
    if (!data) return
    const firearm = data.firearm
    const ballistics = await fetchBallistics(firearm.id)
    const notes = ammoNotesList(ballistics)
    const defaultNote = notes[0] ?? null

    if (over.id === "slot-a") {
      setSlotA(firearm)
      setBallisticsA(ballistics)
      setAmmoNoteA(defaultNote)
    } else if (over.id === "slot-b") {
      setSlotB(firearm)
      setBallisticsB(ballistics)
      setAmmoNoteB(defaultNote)
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {/* Drop slots */}
      <div className="flex gap-3">
        <DroppableSlot
          slotId="slot-a"
          label="銃器 A"
          firearm={slotA}
          onRemove={() => { setSlotA(null); setBallisticsA([]); setAmmoNoteA(null) }}
        />
        <DroppableSlot
          slotId="slot-b"
          label="銃器 B"
          firearm={slotB}
          onRemove={() => { setSlotB(null); setBallisticsB([]); setAmmoNoteB(null) }}
        />
      </div>

      {/* Comparison results */}
      {slotA && slotB && (
        <CompareResults
          slotA={slotA}
          slotB={slotB}
          ballisticsA={ballisticsA}
          ballisticsB={ballisticsB}
          ammoNoteA={ammoNoteA}
          ammoNoteB={ammoNoteB}
          onAmmoNoteAChange={setAmmoNoteA}
          onAmmoNoteBChange={setAmmoNoteB}
        />
      )}

      {/* Firearm grid */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="銃器名で検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          {presentTypes.length > 1 && (
            <div className="flex gap-1 flex-wrap rounded-lg border border-border p-1 bg-muted/30 w-fit h-fit">
              <button
                onClick={() => setTypeFilter("all")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  typeFilter === "all"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                全て
              </button>
              {presentTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    typeFilter === t
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {TYPE_LABEL[t] ?? t}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-3">{filtered.length} 件 — カードをドラッグしてスロットに置いてください</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((f) => (
            <DraggableCard key={f.id} firearm={f} />
          ))}
        </div>
      </div>

      {/* Drag overlay (ghost card) */}
      <DragOverlay>
        {activeFirearm && (
          <div className="opacity-90 rotate-2 scale-105">
            <FirearmCardContent firearm={activeFirearm} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
