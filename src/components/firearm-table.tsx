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
import { Search, ChevronRight, Weight, Target } from "lucide-react"
import type { Firearm } from "@/lib/database.types"

const typeLabel: Record<string, string> = {
  rifle: "ライフル",
  shotgun: "ショットガン",
  handgun: "ハンドガン",
  bow: "弓",
}

interface FirearmWithAmmo extends Firearm {
  class_min?: number | null
  class_max?: number | null
}

interface FirearmTableProps {
  firearms: FirearmWithAmmo[]
  type: string
}

function ClassBadge({ min, max }: { min?: number | null; max?: number | null }) {
  if (min == null && max == null) return <span className="text-muted-foreground text-sm">-</span>
  if (min === max) {
    return <Badge variant="outline" className="text-xs">クラス {min}</Badge>
  }
  return <Badge variant="outline" className="text-xs">クラス {min} - {max}</Badge>
}

export function FirearmTable({ firearms, type }: FirearmTableProps) {
  const [search, setSearch] = useState("")

  const filtered = firearms.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="銃器名で検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
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
                      {typeLabel[firearm.type] ?? firearm.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ClassBadge min={firearm.class_min} max={firearm.class_max} />
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
                      <ClassBadge min={firearm.class_min} max={firearm.class_max} />
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
