"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Item } from "@/lib/database.types";

interface ItemTableProps {
  items: Item[];
}

export function ItemTable({ items }: ItemTableProps) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-stone-400 shrink-0" />
        <Input
          placeholder="名前で検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500"
        />
      </div>
      <div className="rounded-lg border border-stone-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-800 text-stone-400">
            <tr>
              <th className="text-left px-4 py-3 font-medium">名前</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">説明</th>
              <th className="text-right px-4 py-3 font-medium">重量</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-stone-500">
                  該当するアイテムが見つかりません
                </td>
              </tr>
            ) : (
              filtered.map((item, i) => (
                <tr
                  key={item.id}
                  className={`border-t border-stone-800 ${i % 2 === 0 ? "bg-stone-900" : "bg-stone-900/50"} hover:bg-stone-800 transition-colors`}
                >
                  <td className="px-4 py-3 text-stone-100 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-stone-400 hidden md:table-cell text-xs max-w-xs truncate">
                    {item.description ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right text-stone-300">{item.weight} kg</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-stone-600">{filtered.length} 件</p>
    </div>
  );
}
