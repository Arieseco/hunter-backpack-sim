import { supabase } from "@/lib/supabase";
import { FirearmTable } from "@/components/firearm-table";

export const dynamic = "force-dynamic";

export default async function ShotgunsPage() {
  const { data: firearms } = await supabase
    .from("firearms")
    .select("*")
    .eq("type", "shotgun")
    .order("name");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">ショットガン一覧</h1>
      <FirearmTable firearms={firearms ?? []} type="shotguns" />
    </div>
  );
}
