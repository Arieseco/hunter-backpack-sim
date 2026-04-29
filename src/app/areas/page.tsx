import { MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { AreasMap } from "@/components/areas-map"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "保護区一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "TheHunter: CotWに登場する全狩猟保護区の一覧。地図から各保護区の詳細を確認できます。",
}

export default async function AreasPage() {
  const { data: areas } = await supabase
    .from("hunting_areas")
    .select("*")
    .order("name")

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">保護区一覧</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6">
        地図上のアイコンをクリックして保護区の詳細を確認できます。
      </p>

      <AreasMap areas={areas ?? []} />

      <p className="text-sm text-muted-foreground mt-4">{(areas ?? []).length} 保護区</p>
    </div>
  )
}
