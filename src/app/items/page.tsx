import Link from "next/link"
import { Megaphone, Wind, Backpack, Tent } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata = {
  title: "アイテム一覧 | TheHunter: CoTW バックパックシミュレーター",
  description: "アイテムカテゴリを選択",
}

const categories = [
  {
    label: "呼び笛",
    href: "/items/calls",
    description: "動物を引き寄せる各種コール。ターゲット動物に合わせて選択。",
    icon: Megaphone,
  },
  {
    label: "匂いアイテム",
    href: "/items/scents",
    description: "プレイヤーの気配を消したり動物を引き付けたりする匂いアイテム。",
    icon: Wind,
  },
  {
    label: "装備",
    href: "/items/equipment",
    description: "双眼鏡、デコイなど狩猟補助装備。バックパックもこちら。",
    icon: Backpack,
  },
  {
    label: "構造物",
    href: "/items/structures",
    description: "テント、三脚、ブラインドなどフィールドに設置する構造物。",
    icon: Tent,
  },
]

export default function ItemsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">アイテム一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link key={cat.href} href={cat.href}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cat.label}</CardTitle>
                      <CardDescription className="mt-1">{cat.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
