import { supabase } from "@/lib/supabase";
import { FirearmTable } from "@/components/firearm-table";

export const dynamic = "force-dynamic";

export default async function BowsPage() {
  const { data: firearms } = await supabase
    .from("firearms")
    .select("*")
    .eq("type", "bow")
    .order("name");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">弓一覧</h1>
      <FirearmTable firearms={firearms ?? []} type="bows" />
    </div>
  );
}
