import { supabase } from "@/lib/supabase"
import { DogList } from "@/components/dog-list"
import type { HuntingDogWithDetails } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "狩猟犬 | TheHunter: CoTW バックパックシミュレーター",
  description: "狩猟犬（ブラッドハウンド・ラブラドール・レトリバー・ジャーマン・ショートヘアード・ポインター）の能力と特性一覧。",
}

export default async function DogsPage() {
  const { data } = await supabase
    .from("hunting_dogs")
    .select("*, dog_abilities(*), dog_traits(*)")
    .order("sort_order")
    .order("sort_order", { referencedTable: "dog_abilities" })
    .order("level",      { referencedTable: "dog_traits" })
    .order("slot",       { referencedTable: "dog_traits" })

  const dogs = (data ?? []) as unknown as HuntingDogWithDetails[]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">狩猟犬</h1>
      <p className="text-muted-foreground text-sm mb-6">
        全3種の狩猟犬（DLC）の能力と特性一覧。レベル5ごとに2つの特性からどちらか1つを選択できます。
      </p>
      <DogList dogs={dogs} />
    </div>
  )
}
