import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ScopeTable } from "@/components/scope-table"
import type { Scope } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export default async function ScopesPage() {
  const { data } = await supabase
    .from("scopes")
    .select("*")
    .order("required_score")
    .order("name")

  const scopes = (data ?? []) as Scope[]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/firearms"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        銃器カテゴリ
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">スコープ一覧</h1>
      <p className="text-muted-foreground mb-8">
        各銃器に対応するスコープの倍率・重量・必要スコアを確認できます。
      </p>

      <ScopeTable scopes={scopes} />
    </div>
  )
}
