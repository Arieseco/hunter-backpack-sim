import { supabase } from "@/lib/supabase"
import { ItemTable } from "@/components/item-table"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "給餌器一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "フィールドに設置してターゲット動物を引き寄せる給餌器一覧",
}

export default async function FeedersPage() {
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("category", "feeder")
    .order("name")

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/items"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        アイテム一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-6">給餌器一覧</h1>
      <ItemTable items={data ?? []} />
    </div>
  )
}
