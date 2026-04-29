import { Suspense } from "react"
import { supabase } from "@/lib/supabase"
import { MultiTrophyList } from "@/components/multi-trophy-list"
import type { MultiTrophyWithRequirements } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "マルチトロフィー一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "TheHunter: CotWに登場する全マルチトロフィーマウントの必要トロフィーとコスト一覧。",
}

export default async function MultiTrophiesPage() {
  const { data } = await supabase
    .from("multi_trophies")
    .select(`
      id, name, size, cost,
      multi_trophy_requirements(sort_order, gender, animals(name))
    `)
    .order("name")

  const trophies = (data ?? []) as unknown as MultiTrophyWithRequirements[]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">マルチトロフィー一覧</h1>
      <p className="text-muted-foreground text-sm mb-6">
        複数のトロフィーを組み合わせて作成できる特別な剥製マウント一覧
      </p>
      <Suspense>
        <MultiTrophyList trophies={trophies} />
      </Suspense>
    </div>
  )
}
