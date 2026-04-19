import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getFirearmsWithClass } from "@/lib/firearms"
import { FirearmTable } from "@/components/firearm-table"

export const dynamic = "force-dynamic"

export default async function ShotgunsPage() {
  const firearms = await getFirearmsWithClass("shotgun")

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/firearms"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        銃器カテゴリ
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">ショットガン</h1>
      <p className="text-muted-foreground mb-8">
        近距離戦に適した散弾銃。鳥類から大型獣まで幅広く対応。
      </p>

      <FirearmTable firearms={firearms} type="shotguns" />
    </div>
  )
}
