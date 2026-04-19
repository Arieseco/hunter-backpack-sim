import { supabase } from "@/lib/supabase"
import type { Firearm, Ammo, Item, HuntingArea, Animal, AreaAnimal, FirearmAmmo } from "@/lib/database.types"
import { SimulatorClient } from "./simulator-client"

export const dynamic = "force-dynamic"

export default async function SimulatorPage() {
  // 7テーブルを並列取得
  const [
    { data: firearms },
    { data: ammo },
    { data: items },
    { data: areas },
    { data: areaAnimals },
    { data: animals },
    { data: firearmAmmo },
  ] = await Promise.all([
    supabase
      .from("firearms")
      .select("*")
      .order("type", { ascending: true })
      .then((r) => ({ ...r, data: (r.data as Firearm[] | null) ?? [] })),
    supabase
      .from("ammo")
      .select("*")
      .order("name", { ascending: true })
      .then((r) => ({ ...r, data: (r.data as Ammo[] | null) ?? [] })),
    supabase
      .from("items")
      .select("*")
      .order("category", { ascending: true })
      .then((r) => ({ ...r, data: (r.data as Item[] | null) ?? [] })),
    supabase
      .from("hunting_areas")
      .select("*")
      .order("name", { ascending: true })
      .then((r) => ({ ...r, data: (r.data as HuntingArea[] | null) ?? [] })),
    supabase
      .from("area_animals")
      .select("*")
      .then((r) => ({ ...r, data: (r.data as AreaAnimal[] | null) ?? [] })),
    supabase
      .from("animals")
      .select("*")
      .order("name", { ascending: true })
      .then((r) => ({ ...r, data: (r.data as Animal[] | null) ?? [] })),
    supabase
      .from("firearm_ammo")
      .select("*")
      .then((r) => ({ ...r, data: (r.data as FirearmAmmo[] | null) ?? [] })),
  ])

  return (
    <SimulatorClient
      firearms={firearms}
      ammo={ammo}
      items={items}
      areas={areas}
      areaAnimals={areaAnimals}
      animals={animals}
      firearmAmmo={firearmAmmo}
    />
  )
}
