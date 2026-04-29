import Link from "next/link"
import Image from "next/image"
import {
  Crosshair,
  Scale,
  Target,
  Package,
  ArrowRight,
  TreePine,
  PawPrint,
  Trophy,
  MapPin,
  Swords,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  {
    href: "/simulator",
    icon: Scale,
    title: "重量シミュレータ",
    description:
      "銃器・弾薬・アイテムを選択して、バックパックの重量をシミュレーション。最適な装備構成を見つけよう。",
    highlight: true,
  },
  {
    href: "/firearms",
    icon: Target,
    title: "銃器一覧",
    description:
      "ライフル・ショットガン・ハンドガン・弓の一覧。重量や対応弾薬を確認できます。",
    highlight: false,
    children: [
      { href: "/firearms/rifles", label: "ライフル" },
      { href: "/firearms/shotguns", label: "ショットガン" },
      { href: "/firearms/handguns", label: "ハンドガン" },
      { href: "/firearms/bows", label: "弓" },
    ],
  },
  {
    href: "/items",
    icon: Package,
    title: "アイテム一覧",
    description:
      "呼び笛・匂いアイテム・装備・構造物・給餌器の一覧。重量と説明を確認できます。",
    highlight: false,
    children: [
      { href: "/items/calls", label: "呼び笛" },
      { href: "/items/scents", label: "匂いアイテム" },
      { href: "/items/equipment", label: "装備" },
      { href: "/items/structures", label: "構造物" },
      { href: "/items/feeders", label: "給餌器" },
    ],
  },
  {
    href: "/animals",
    icon: PawPrint,
    title: "動物一覧",
    description:
      "登場する全動物の適正クラスと出現する狩猟区を確認できます。保護区フィルタや名前検索に対応。",
    highlight: false,
  },
  {
    href: "/areas",
    icon: MapPin,
    title: "保護区一覧",
    description:
      "世界各地の狩猟保護区を地図から確認。保護区をクリックすると出現動物や詳細情報を確認できます。",
    highlight: false,
  },
  {
    href: "/multi-trophies",
    icon: Trophy,
    title: "マルチトロフィー",
    description:
      "複数のトロフィーを組み合わせて作成できる特別な剥製マウントの一覧。必要トロフィーとコストを確認できます。",
    highlight: false,
  },
  {
    href: "/skills",
    icon: Swords,
    title: "スキル一覧",
    description:
      "ストーカー・アンブッシャーのスキルツリー一覧。ティア別に各スキルのレベル詳細と効果を確認できます。",
    highlight: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-forest.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-8">
            <Crosshair className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">TheHunter: CoTW</span>
            <span className="block text-primary mt-2">バックパックシミュレーター</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            The Hunter: Call of the Wild の装備重量を簡単にシミュレーション。
            <br className="hidden sm:block" />
            最適な装備構成で、静寂の森へ狩りに出かけよう。
          </p>

          {/* CTA Button */}
          <Button asChild size="lg" className="text-base">
            <Link href="/simulator">
              シミュレーターを開く
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <TreePine className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">コンテンツ</h2>
          </div>

          {/* Section Cards */}
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.href}
                  className={`group rounded-lg border p-6 transition-all duration-300 ${
                    section.highlight
                      ? "border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10"
                      : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`shrink-0 p-3 rounded-lg transition-colors ${
                          section.highlight 
                            ? "bg-primary/20 group-hover:bg-primary/30" 
                            : "bg-secondary group-hover:bg-secondary/80"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            section.highlight
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-2">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant={section.highlight ? "default" : "outline"}
                      className="shrink-0 hidden sm:inline-flex"
                    >
                      <Link href={section.href}>
                        開く
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Mobile Button */}
                  <div className="mt-4 sm:hidden">
                    <Button
                      asChild
                      variant={section.highlight ? "default" : "outline"}
                      className="w-full"
                    >
                      <Link href={section.href}>
                        開く
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {section.children && (
                    <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                      {section.children.map((child) => (
                        <Button
                          key={child.href}
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Link href={child.href}>{child.label}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
          <p>
            データ出典:{" "}
            <a
              href="https://w.atwiki.jp/thehunter_cotw/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              The Hunter: Call of the Wild Wiki
            </a>
          </p>
          <p>
            ゲームアップデートにより実際の数値と異なる場合があります。
          </p>
        </div>
      </footer>
    </div>
  )
}
