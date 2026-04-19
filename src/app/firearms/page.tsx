import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crosshair, Target, CircleDot, BowArrow } from "lucide-react"

const categories = [
  {
    label: "ライフル",
    href: "/firearms/rifles",
    description: "ボルトアクション・レバーアクション等。長距離・大型獣に対応。",
    icon: Crosshair,
  },
  {
    label: "ショットガン",
    href: "/firearms/shotguns",
    description: "近距離戦に適した散弾銃。鳥類から大型獣まで幅広く対応。",
    icon: Target,
  },
  {
    label: "ハンドガン",
    href: "/firearms/handguns",
    description: "軽量なサイドアーム。緊急時や小型獣に使用。",
    icon: CircleDot,
  },
  {
    label: "弓",
    href: "/firearms/bows",
    description: "静音性に優れた弓。発見されにくく近距離狩猟に最適。",
    icon: BowArrow,
  },
]

export default function FirearmsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">銃器一覧</h1>
      <p className="text-muted-foreground mb-8">
        カテゴリを選択して銃器の詳細を確認できます
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Card
              key={category.href}
              className="group hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{category.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm min-h-[3rem]">
                  {category.description}
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href={category.href}>一覧を見る</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
