import { supabase } from "@/lib/supabase";
import { SimulatorClient } from "./simulator-client";

export const dynamic = "force-dynamic";

export default async function SimulatorPage() {
  const [
    { data: firearms },
    { data: ammo },
    { data: items },
    { data: areas },
    { data: areaAnimals },
    { data: animals },
  ] = await Promise.all([
    supabase.from("firearms").select("*").order("type").then((r) => ({
      ...r,
      data: r.data ?? [],
    })),
    supabase.from("ammo").select("*").order("name").then((r) => ({
      ...r,
      data: r.data ?? [],
    })),
    supabase.from("items").select("*").order("category").then((r) => ({
      ...r,
      data: r.data ?? [],
    })),
    supabase.from("hunting_areas").select("*").order("name").then((r) => ({
      ...r,
      data: r.data ?? [],
    })),
    supabase.from("area_animals").select("*").then((r) => ({
      ...r,
      data: r.data ?? [],
    })),
    supabase.from("animals").select("*").order("name").then((r) => ({
      ...r,
      data: r.data ?? [],
    })),
  ]);

  return (
    <SimulatorClient
      firearms={firearms ?? []}
      ammo={ammo ?? []}
      items={items ?? []}
      areas={areas ?? []}
      areaAnimals={areaAnimals ?? []}
      animals={animals ?? []}
    />
  );
}
