"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Scope } from "@/lib/database.types"

interface ScopeTableProps {
  scopes: Scope[]
}

export function ScopeTable({ scopes }: ScopeTableProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search) return scopes
    return scopes.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [scopes, search])

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="スコープ名で検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* PC: Table */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>名前</TableHead>
              <TableHead className="text-right">倍率</TableHead>
              <TableHead className="text-right">必要スコア</TableHead>
              <TableHead className="text-right">重量</TableHead>
              <TableHead className="text-right">価格</TableHead>
              <TableHead>説明</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  該当するスコープが見つかりません
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((scope) => (
                <TableRow key={scope.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{scope.name}</TableCell>
                  <TableCell className="text-right tabular-nums">{scope.magnification}x</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {scope.required_score != null && scope.required_score > 0
                      ? scope.required_score.toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {scope.weight.toFixed(2)} kg
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {scope.price != null && scope.price > 0
                      ? scope.price.toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {scope.description ?? "-"}
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
          <p className="text-center text-muted-foreground py-8">該当するスコープが見つかりません</p>
        ) : (
          filtered.map((scope) => (
            <Card key={scope.id} className="p-4">
              <p className="font-medium text-foreground mb-1">{scope.name}</p>
              <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                <span>倍率: {scope.magnification}x</span>
                <span>{scope.weight.toFixed(2)} kg</span>
                {scope.price != null && scope.price > 0 && (
                  <span>¥{scope.price.toLocaleString()}</span>
                )}
                {scope.required_score != null && scope.required_score > 0 && (
                  <span>スコア: {scope.required_score.toLocaleString()}</span>
                )}
              </div>
              {scope.description && (
                <p className="text-xs text-muted-foreground">{scope.description}</p>
              )}
            </Card>
          ))
        )}
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} 件</p>
    </div>
  )
}
