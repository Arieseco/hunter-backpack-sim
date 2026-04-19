"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { Item } from "@/lib/database.types"

interface ItemTableProps {
  items: Item[]
}

export function ItemTable({ items }: ItemTableProps) {
  const [search, setSearch] = useState("")

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.target_animals ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const hasCallDetails = items.some((item) => item.target_animals != null)
  const colSpan = hasCallDetails ? 4 : 3

  return (
    <div className="space-y-4">
      {/* 検索 */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={hasCallDetails ? "アイテム名・効果対象で検索..." : "アイテム名で検索..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* PC: テーブル表示 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-3 px-4 font-medium text-muted-foreground">名前</th>
              {hasCallDetails && (
                <th className="py-3 px-4 font-medium text-muted-foreground">効果対象</th>
              )}
              <th className="py-3 px-4 font-medium text-muted-foreground">説明</th>
              <th className="py-3 px-4 font-medium text-muted-foreground text-right">重量</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="py-8 text-center text-muted-foreground">
                  該当するアイテムが見つかりません
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-secondary/30">
                  <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">{item.name}</td>
                  {hasCallDetails && (
                    <td className="py-3 px-4 text-primary text-xs">
                      {item.target_animals ?? "-"}
                    </td>
                  )}
                  <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">
                    {item.description ?? "-"}
                  </td>
                  <td className="py-3 px-4 text-right text-foreground tabular-nums whitespace-nowrap">
                    {item.weight} kg
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* スマホ: カード表示 */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            該当するアイテムが見つかりません
          </div>
        ) : (
          filtered.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  {item.target_animals && (
                    <p className="text-xs text-primary mt-1">
                      対象: {item.target_animals}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {item.weight} kg
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 件数表示 */}
      <div className="text-sm text-muted-foreground">
        {filtered.length} 件
      </div>
    </div>
  )
}
