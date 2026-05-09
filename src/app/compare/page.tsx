import { getFirearmsWithTypes } from "@/lib/firearms"
import { CompareSimulator } from "@/components/compare-simulator"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "銃器比較 | TheHunter: CoTW バックパックシミュレーター",
  description: "銃器をドラッグ＆ドロップしてスペックと弾道性能を比較できます。",
}

export default async function ComparePage() {
  const firearms = await getFirearmsWithTypes([
    "rifle", "muzzleloader", "shotgun", "handgun", "bow",
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">銃器比較</h1>
      <p className="text-muted-foreground text-sm mb-6">
        下の一覧から銃器をドラッグしてスロットに置くと、スペックと弾道性能を比較できます。
      </p>
      <CompareSimulator firearms={firearms} />
    </div>
  )
}
