import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getFirearmsWithClass } from "@/lib/firearms"
import { FirearmTable } from "@/components/firearm-table"
import type { BowType } from "@/lib/database.types"

export const dynamic = "force-dynamic"

const BOW_TYPE_ORDER: Record<BowType, number> = {
  コンパウンドボウ: 1,
  クロスボウ: 2,
  リカーブボウ: 3,
}

export default async function BowsPage() {
  const raw = await getFirearmsWithClass("bow")
  const firearms = [...raw].sort((a, b) => {
    const ao = BOW_TYPE_ORDER[a.bow_type as BowType] ?? 99
    const bo = BOW_TYPE_ORDER[b.bow_type as BowType] ?? 99
    if (ao !== bo) return ao - bo
    return a.name.localeCompare(b.name, "ja")
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/firearms"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        銃器カテゴリ
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">弓</h1>
      <p className="text-muted-foreground mb-8">
        静音性に優れた弓。発見されにくく近距離狩猟に最適。
      </p>

      <FirearmTable firearms={firearms} type="bows" />
    </div>
  )
}
