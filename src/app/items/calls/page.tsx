import { supabase } from "@/lib/supabase";
import { ItemTable } from "@/components/item-table";

export const dynamic = "force-dynamic";

export default async function CallsPage() {
  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("category", "call")
    .order("name");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">呼び笛一覧</h1>
      <ItemTable items={items ?? []} />
    </div>
  );
}
