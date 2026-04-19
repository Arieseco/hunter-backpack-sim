import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
import { FirearmDetail } from "@/components/firearm-detail";
import type { Firearm, Ammo } from "@/lib/database.types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ShotgunDetailPage({ params }: Props) {
  const { id } = await params;

  const [{ data: firearmRaw }, { data: ammoLinks }] = await Promise.all([
    supabase.from("firearms").select("*").eq("id", id).single(),
    supabase.from("firearm_ammo").select("ammo_id").eq("firearm_id", id),
  ]);

  const firearm = firearmRaw as Firearm | null;
  if (!firearm || firearm.type !== "shotgun") notFound();

  const links = ammoLinks as { ammo_id: string }[] | null;
  const ammoIds = (links ?? []).map((l) => l.ammo_id);
  const { data: ammoRaw } = ammoIds.length
    ? await supabase.from("ammo").select("*").in("id", ammoIds).order("name")
    : { data: [] };

  return (
    <FirearmDetail
      firearm={firearm}
      ammoList={(ammoRaw as Ammo[] | null) ?? []}
      backHref="/firearms/shotguns"
      backLabel="ショットガン一覧"
    />
  );
}
