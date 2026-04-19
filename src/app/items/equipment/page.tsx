import { supabase } from "@/lib/supabase";
import { ItemTable } from "@/components/item-table";

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  const { data: items } = await supabase
    .from("items")
    .select("*")
    .in("category", ["equipment", "backpack"])
    .order("name");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">装備一覧</h1>
      <p className="text-stone-400 text-sm mb-6">望遠鏡・バックパックなど銃器以外の装備品</p>
      <ItemTable items={items ?? []} />
    </div>
  );
}
