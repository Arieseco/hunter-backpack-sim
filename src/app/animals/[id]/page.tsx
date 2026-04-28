import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AnimalDetail } from "@/components/animal-detail"
import type { Animal, AnimalFur, AnimalNeedZone } from "@/lib/database.types"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AnimalDetailPage({ params, searchParams }: PageProps) {
  const [{ id }, sp] = await Promise.all([params, searchParams])

  const backParams = new URLSearchParams()
  if (typeof sp.q === "string") backParams.set("q", sp.q)
  if (typeof sp.area === "string") backParams.set("area", sp.area)
  const backHref = backParams.toString() ? `/animals?${backParams.toString()}` : "/animals"

  const [
    { data: animalRaw },
    { data: needZonesRaw },
    { data: fursRaw },
  ] = await Promise.all([
    supabase.from("animals").select("*").eq("id", id).single(),
    supabase
      .from("animal_need_zones")
      .select("*, hunting_areas(name)")
      .eq("animal_id", id)
      .order("area_id")
      .order("time_start"),
    supabase
      .from("animal_furs")
      .select("*")
      .eq("animal_id", id)
      .order("probability", { ascending: false }),
  ])

  const animal = animalRaw as Animal | null
  if (!animal) notFound()

  type NeedZoneRow = AnimalNeedZone & { hunting_areas: { name: string } | null }

  return (
    <AnimalDetail
      animal={animal}
      needZones={(needZonesRaw ?? []) as NeedZoneRow[]}
      furs={(fursRaw ?? []) as AnimalFur[]}
      backHref={backHref}
    />
  )
}
