import { Suspense } from "react"
import { supabase } from "@/lib/supabase"
import { PerkList } from "@/components/perk-list"
import type { PerkWithLevels } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "パーク一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "ライフル・ハンドガン・ショットガン・アーチェリー全パークの一覧。各パークのレベル詳細と効果を確認できます。",
}

export default async function PerksPage() {
  const { data } = await supabase
    .from("perks")
    .select("*, perk_levels(*)")
    .order("sort_order")

  const perks = (data ?? []) as unknown as PerkWithLevels[]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">パーク一覧</h1>
      <p className="text-muted-foreground text-sm mb-6">
        武器カテゴリ別のパーク一覧。パークをクリックするとレベル詳細を確認できます。
      </p>
      <Suspense>
        <PerkList perks={perks} />
      </Suspense>
    </div>
  )
}
