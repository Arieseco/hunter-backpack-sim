import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getFirearmsWithTypes } from "@/lib/firearms"
import { FirearmTable } from "@/components/firearm-table"

export const dynamic = "force-dynamic"

export default async function RiflesPage() {
  const firearms = await getFirearmsWithTypes(["rifle", "muzzleloader"])

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/firearms"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        銃器カテゴリ
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">ライフル / マズルローダー</h1>
      <p className="text-muted-foreground mb-8">
        ボルトアクション・レバーアクション・マズルローダー等。長距離・大型獣に対応。
      </p>

      <FirearmTable firearms={firearms} type="rifles" />
    </div>
  )
}
