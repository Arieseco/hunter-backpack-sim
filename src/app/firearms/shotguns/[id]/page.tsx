import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { FirearmDetail } from "@/components/firearm-detail"
import type { Firearm, Ammo, Scope, FirearmBallistics } from "@/lib/database.types"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ShotgunDetailPage({ params }: PageProps) {
  const { id } = await params

  const [{ data: firearmRaw }, { data: ammoLinks }, { data: scopeLinks }, { data: ballisticsRaw }] =
    await Promise.all([
      supabase.from("firearms").select("*").eq("id", id).single(),
      supabase.from("firearm_ammo").select("ammo_id").eq("firearm_id", id),
      supabase.from("scope_firearms").select("scope_id").eq("firearm_id", id),
      supabase
        .from("firearm_ballistics")
        .select("*")
        .eq("firearm_id", id)
        .order("ammo_note")
        .order("zero_distance")
        .order("range_distance"),
    ])

  const firearm = firearmRaw as Firearm | null

  if (!firearm || firearm.type !== "shotgun") {
    notFound()
  }

  const ammoIds = (ammoLinks as { ammo_id: string }[] | null)?.map((l) => l.ammo_id) ?? []
  const scopeIds = (scopeLinks as { scope_id: string }[] | null)?.map((l) => l.scope_id) ?? []

  const [ammoList, scopes] = await Promise.all([
    ammoIds.length > 0
      ? supabase.from("ammo").select("*").in("id", ammoIds).order("name").then(({ data }) => (data as Ammo[] | null) ?? [])
      : Promise.resolve([] as Ammo[]),
    scopeIds.length > 0
      ? supabase.from("scopes").select("*").in("id", scopeIds).order("name").then(({ data }) => (data as Scope[] | null) ?? [])
      : Promise.resolve([] as Scope[]),
  ])

  return (
    <FirearmDetail
      firearm={firearm}
      ammoList={ammoList}
      scopes={scopes}
      ballistics={(ballisticsRaw as FirearmBallistics[] | null) ?? []}
      bowSightDistances={[]}
      backHref="/firearms/shotguns"
      backLabel="ショットガン一覧"
    />
  )
}
