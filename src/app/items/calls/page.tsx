import { supabase } from "@/lib/supabase"
import { ItemTable } from "@/components/item-table"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "呼び笛一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "動物を引き寄せる各種コール一覧",
}

export default async function CallsPage() {
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("category", "call")
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
      <h1 className="text-2xl font-bold text-foreground mb-6">呼び笛一覧</h1>
      <ItemTable items={data ?? []} />
    </div>
  )
}
