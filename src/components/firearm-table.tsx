"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { Firearm } from "@/lib/database.types";

interface FirearmTableProps {
  firearms: Firearm[];
  type: string;
}

export function FirearmTable({ firearms, type }: FirearmTableProps) {
  const [search, setSearch] = useState("");

  const filtered = firearms.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const typeLabel: Record<string, string> = {
    rifle: "ライフル",
    shotgun: "ショットガン",
    handgun: "ハンドガン",
    bow: "弓",
  };

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
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">種類</th>
              <th className="text-right px-4 py-3 font-medium">重量</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-stone-500">
                  該当する銃器が見つかりません
                </td>
              </tr>
            ) : (
              filtered.map((firearm, i) => (
                <tr
                  key={firearm.id}
                  className={`border-t border-stone-800 ${i % 2 === 0 ? "bg-stone-900" : "bg-stone-900/50"} hover:bg-stone-800 transition-colors`}
                >
                  <td className="px-4 py-3 text-stone-100 font-medium">{firearm.name}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant="outline" className="border-stone-600 text-stone-400">
                      {typeLabel[firearm.type] ?? firearm.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right text-stone-300">{firearm.weight} kg</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/firearms/${type}/${firearm.id}`}
                      className="text-amber-400 hover:text-amber-300 text-xs transition-colors"
                    >
                      詳細 →
                    </Link>
                  </td>
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
