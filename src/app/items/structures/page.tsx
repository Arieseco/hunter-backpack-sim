import { supabase } from "@/lib/supabase";
import { ItemTable } from "@/components/item-table";

export const dynamic = "force-dynamic";

export default async function StructuresPage() {
  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("category", "structure")
    .order("name");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">構造物一覧</h1>
      <p className="text-stone-400 text-sm mb-6">テント・三脚・ブラインドなどフィールドに設置する構造物</p>
      <ItemTable items={items ?? []} />
    </div>
  );
}
