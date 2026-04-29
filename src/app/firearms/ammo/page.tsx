import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { AmmoTable } from "@/components/ammo-table"
import type { Ammo } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export default async function AmmoPage() {
  const { data } = await supabase
    .from("ammo")
    .select("*")
    .order("type")
    .order("class_min")
    .order("name")

  const ammoList = (data ?? []) as Ammo[]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/firearms"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        銃器カテゴリ
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">弾薬一覧</h1>
      <p className="text-muted-foreground mb-8">
        ライフル・ショットガン・ハンドガン・弓・マズルローダー対応弾薬の一覧。
      </p>

      <AmmoTable ammoList={ammoList} />
    </div>
  )
}
