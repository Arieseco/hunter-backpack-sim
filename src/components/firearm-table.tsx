"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, ChevronRight, Weight } from "lucide-react"
import type { Firearm } from "@/lib/database.types"
import type { AmmoClassRange } from "@/lib/firearms"
import { cn } from "@/lib/utils"

const typeLabel: Record<string, string> = {
  rifle: "ライフル",
  shotgun: "ショットガン",
  handgun: "ハンドガン",
  bow: "弓",
  muzzleloader: "マズルローダー",
}

interface FirearmWithAmmo extends Firearm {
  ammo_classes: AmmoClassRange[]
}

interface FirearmTableProps {
  firearms: FirearmWithAmmo[]
  type: string
}

function ClassBadge({ classes }: { classes: AmmoClassRange[] }) {
  if (classes.length === 0) return <span className="text-muted-foreground text-sm">-</span>
  return (
    <div className="flex flex-wrap gap-1">
      {classes.map((r, i) => (
        <Badge key={i} variant="outline" className="text-xs">
          {r.min === r.max ? `クラス${r.min}` : `クラス${r.min}-${r.max}`}
        </Badge>
      ))}
    </div>
  )
}

export function FirearmTable({ firearms, type }: FirearmTableProps) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const presentTypes = [...new Set(firearms.map((f) => f.type))]
  const showTypeFilter = presentTypes.length > 1

  const filtered = firearms.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || f.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="銃器名で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {showTypeFilter && (
          <div className="flex gap-1 rounded-lg border border-border p-1 bg-muted/30 w-fit">
            <button
              onClick={() => setTypeFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                typeFilter === "all"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
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
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {typeLabel[t] ?? t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PC表示: テーブル */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>名前</TableHead>
              <TableHead>種類</TableHead>
              <TableHead>対応クラス</TableHead>
              <TableHead className="text-right">重量</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  該当する銃器が見つかりません
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((firearm) => (
                <TableRow key={firearm.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{firearm.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {firearm.type === "bow" && firearm.bow_type
                        ? firearm.bow_type
                        : typeLabel[firearm.type] ?? firearm.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ClassBadge classes={firearm.ammo_classes} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {firearm.weight.toFixed(2)} kg
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/firearms/${type}/${firearm.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      詳細
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* スマホ表示: カード形式 */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            該当する銃器が見つかりません
          </div>
        ) : (
          filtered.map((firearm) => (
            <Link
              key={firearm.id}
              href={`/firearms/${type}/${firearm.id}`}
              className="block"
            >
              <Card className="p-4 hover:bg-muted/30 transition-colors active:bg-muted/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {firearm.name}
                    </h3>
                    <div className="mt-2">
                      <ClassBadge classes={firearm.ammo_classes} />
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Weight className="h-3.5 w-3.5" />
                        {firearm.weight.toFixed(2)} kg
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} 件
      </p>
    </div>
  )
}
