import { supabase } from "@/lib/supabase"
import { AnimalTable } from "@/components/animal-table"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "動物一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "TheHunter: CotWに登場する全動物の適正クラスと出現狩猟区一覧。狩猟区でフィルター可能。",
}

export default async function AnimalsPage() {
  const [{ data: animals }, { data: areas }, { data: areaAnimals }] = await Promise.all([
    supabase.from("animals").select("*").order("level_min").order("name"),
    supabase.from("hunting_areas").select("*").order("name"),
    supabase.from("area_animals").select("*"),
  ])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">動物一覧</h1>
      <p className="text-muted-foreground text-sm mb-6">
        登場する全動物の適正クラスと出現する狩猟区を確認できます
      </p>
      <AnimalTable
        animals={animals ?? []}
        areas={areas ?? []}
        areaAnimals={areaAnimals ?? []}
      />
    </div>
  )
}
