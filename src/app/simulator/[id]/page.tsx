import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar } from "lucide-react";
import { calculateCapacity } from "@/lib/weight";
import type { Simulation, SimulationItem, Firearm, Ammo, Item } from "@/lib/database.types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SavedSimulationPage({ params }: Props) {
  const { id } = await params;

  const { data: simRaw } = await supabase
    .from("simulations")
    .select("*")
    .eq("id", id)
    .single();

  const sim = simRaw as Simulation | null;
  if (!sim) notFound();

  const selectedItems: SimulationItem[] = sim.selected_items as SimulationItem[];

  const firearmsIds = selectedItems.filter((s) => s.type === "firearm").map((s) => s.id);
  const ammoIds = selectedItems.filter((s) => s.type === "ammo").map((s) => s.id);
  const itemIds = selectedItems.filter((s) => s.type === "item").map((s) => s.id);

  const [{ data: firearmsRaw }, { data: ammoRaw }, { data: itemsRaw }] = await Promise.all([
    firearmsIds.length
      ? supabase.from("firearms").select("*").in("id", firearmsIds)
      : { data: [] },
    ammoIds.length
      ? supabase.from("ammo").select("*").in("id", ammoIds)
      : { data: [] },
    itemIds.length
      ? supabase.from("items").select("*").in("id", itemIds)
      : { data: [] },
  ]);

  const firearms = (firearmsRaw as Firearm[] | null) ?? [];
  const ammo = (ammoRaw as Ammo[] | null) ?? [];
  const items = (itemsRaw as Item[] | null) ?? [];

  const overWeight = sim.total_weight > sim.capacity;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/simulator"
        className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-200 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        シミュレータに戻る
      </Link>

      <div className="bg-stone-900 border border-stone-700 rounded-xl p-6 mb-6">
        <h1 className="text-xl font-bold text-white mb-1">
          {sim.name ?? "保存済みシミュレーション"}
        </h1>
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
          <Calendar className="w-3 h-3" />
          {new Date(sim.created_at).toLocaleString("ja-JP")}
        </div>

        <div className="flex gap-3 mb-4">
          {sim.pack_mule && (
            <Badge variant="outline" className="border-amber-600 text-amber-400">
              荷運びラバ ON
            </Badge>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-stone-400">重量</span>
          <span className={`text-sm font-bold ${overWeight ? "text-red-400" : "text-amber-400"}`}>
            {sim.total_weight} / {sim.capacity} kg
          </span>
        </div>
        <Progress
          value={Math.min((sim.total_weight / sim.capacity) * 100, 100)}
          className={`h-2 ${overWeight ? "[&>div]:bg-red-500" : "[&>div]:bg-amber-500"}`}
        />
      </div>

      <div className="space-y-3">
        {selectedItems.map((si, i) => {
          let name = "不明";
          let weight = 0;
          if (si.type === "firearm") {
            const f = firearms.find((x) => x.id === si.id);
            if (f) { name = f.name; weight = f.weight; }
          } else if (si.type === "ammo") {
            const a = ammo.find((x) => x.id === si.id);
            if (a) { name = a.name; weight = a.weight; }
          } else {
            const it = items.find((x) => x.id === si.id);
            if (it) { name = it.name; weight = it.weight; }
          }

          return (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg text-sm">
              <span className="text-stone-200">{name}</span>
              <span className="text-amber-400">{weight} kg</span>
            </div>
          );
        })}
        {selectedItems.length === 0 && (
          <p className="text-stone-500 text-sm text-center py-8">装備アイテムがありません</p>
        )}
      </div>

      <div className="mt-8">
        <Link
          href="/simulator"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          新しいシミュレーションを作成
        </Link>
      </div>
    </div>
  );
}
