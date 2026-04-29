import { Suspense } from "react"
import { supabase } from "@/lib/supabase"
import { SkillList } from "@/components/skill-list"
import type { SkillWithLevels } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "スキル一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "ストーカー・アンブッシャー全スキルのティア別一覧。各スキルのレベル説明と効果を確認できます。",
}

export default async function SkillsPage() {
  const { data } = await supabase
    .from("skills")
    .select("*, skill_levels(*)")
    .order("tier")
    .order("sort_order")

  const skills = (data ?? []) as unknown as SkillWithLevels[]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">スキル一覧</h1>
      <p className="text-muted-foreground text-sm mb-6">
        ストーカーとアンブッシャーのスキルツリー一覧。スキルをクリックするとレベル詳細を確認できます。
      </p>
      <Suspense>
        <SkillList skills={skills} />
      </Suspense>
    </div>
  )
}
