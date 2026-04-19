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
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* 検索 */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="アイテム名で検索..."
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
              <th className="py-3 px-4 font-medium text-muted-foreground">説明</th>
              <th className="py-3 px-4 font-medium text-muted-foreground text-right">重量</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  該当するアイテムが見つかりません
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-secondary/30">
                  <td className="py-3 px-4 text-foreground font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">
                    {item.description ?? "-"}
                  </td>
                  <td className="py-3 px-4 text-right text-foreground tabular-nums">
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
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-medium text-primary tabular-nums">
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
