"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Ammo } from "@/lib/database.types"

const TYPE_LABEL: Record<string, string> = {
  rifle:          "ライフル",
  shotgun:        "ショットガン",
  handgun:        "ハンドガン",
  コンパウンドボウ: "コンパウンドボウ",
  クロスボウ:       "クロスボウ",
  リカーブボウ:     "リカーブボウ",
  muzzleloader:   "マズルローダー",
}

const TYPE_CLASS: Record<string, string> = {
  rifle:          "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shotgun:        "bg-orange-500/20 text-orange-400 border-orange-500/30",
  handgun:        "bg-green-500/20 text-green-400 border-green-500/30",
  コンパウンドボウ:  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  クロスボウ:        "bg-violet-500/20 text-violet-400 border-violet-500/30",
  リカーブボウ:      "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  muzzleloader:   "bg-rose-500/20 text-rose-400 border-rose-500/30",
}

const TYPE_ORDER = ["rifle", "shotgun", "handgun", "コンパウンドボウ", "クロスボウ", "リカーブボウ", "muzzleloader"]

function ammoDisplayType(ammo: Ammo): string {
  if (ammo.type === "bow" && ammo.bow_type) return ammo.bow_type
  return ammo.type
}

function ClassRange({ min, max }: { min: number | null; max: number | null }) {
  if (min == null || max == null) return <span className="text-muted-foreground">-</span>
  return (
    <Badge variant="outline" className="text-xs">
      {min === max ? `クラス${min}` : `クラス${min}-${max}`}
    </Badge>
  )
}

function TypeBadge({ ammo }: { ammo: Ammo }) {
  const key = ammoDisplayType(ammo)
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium ${TYPE_CLASS[key] ?? ""}`}
    >
      {TYPE_LABEL[key] ?? key}
    </span>
  )
}

interface AmmoTableProps {
  ammoList: Ammo[]
}

export function AmmoTable({ ammoList }: AmmoTableProps) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = useMemo(() => {
    return ammoList
      .filter((a) => {
        if (typeFilter !== "all" && ammoDisplayType(a) !== typeFilter) return false
        if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
        return true
      })
      .sort((a, b) => {
        const ao = TYPE_ORDER.indexOf(ammoDisplayType(a))
        const bo = TYPE_ORDER.indexOf(ammoDisplayType(b))
        if (ao !== bo) return ao - bo
        const cmp = (a.class_min ?? 0) - (b.class_min ?? 0)
        if (cmp !== 0) return cmp
        return a.name.localeCompare(b.name, "ja")
      })
  }, [ammoList, search, typeFilter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="弾薬名で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての種別</SelectItem>
            {TYPE_ORDER.map((t) => (
              <SelectItem key={t} value={t}>{TYPE_LABEL[t] ?? t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* PC: Table */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>名前</TableHead>
              <TableHead>種別</TableHead>
              <TableHead>対応クラス</TableHead>
              <TableHead className="text-right">有効射程</TableHead>
              <TableHead className="text-right">貫通力</TableHead>
              <TableHead className="text-right">拡張性</TableHead>
              <TableHead className="text-right">重量</TableHead>
              <TableHead className="text-right">価格</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  該当する弾薬が見つかりません
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((ammo) => (
                <TableRow key={ammo.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{ammo.name}</TableCell>
                  <TableCell><TypeBadge ammo={ammo} /></TableCell>
                  <TableCell><ClassRange min={ammo.class_min} max={ammo.class_max} /></TableCell>
                  <TableCell className="text-right tabular-nums">
                    {ammo.effective_range != null ? `${ammo.effective_range}m` : "-"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {ammo.penetration ?? "-"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {ammo.expansion ?? "-"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {ammo.weight.toFixed(2)} kg
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {ammo.price > 0 ? `${ammo.price.toLocaleString()}` : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">該当する弾薬が見つかりません</p>
        ) : (
          filtered.map((ammo) => (
            <Card key={ammo.id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-medium text-foreground leading-snug">{ammo.name}</p>
                <TypeBadge ammo={ammo} />
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <ClassRange min={ammo.class_min} max={ammo.class_max} />
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>射程: {ammo.effective_range != null ? `${ammo.effective_range}m` : "-"}</span>
                <span>貫通: {ammo.penetration ?? "-"}</span>
                <span>拡張: {ammo.expansion ?? "-"}</span>
                <span>{ammo.weight.toFixed(2)} kg</span>
                {ammo.price > 0 && <span>¥{ammo.price.toLocaleString()}</span>}
              </div>
            </Card>
          ))
        )}
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} 件</p>
    </div>
  )
}
