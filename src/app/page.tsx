import Link from "next/link";
import { Crosshair, Package, Weight, ChevronRight } from "lucide-react";

const sections = [
  {
    href: "/simulator",
    icon: Weight,
    title: "重量シミュレータ",
    description: "携行アイテムを選択し、重量をシミュレーション。バックパックやスキルも考慮した最適な装備を計画できます。",
    highlight: true,
  },
  {
    href: "/firearms",
    icon: Crosshair,
    title: "銃器一覧",
    description: "ライフル、ショットガン、ハンドガン、弓の一覧と対応弾薬。重量・適正クラスを確認できます。",
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
    description: "呼び笛、匂いアイテム、装備、構造物など銃器以外のアイテム一覧。",
    children: [
      { href: "/items/calls", label: "呼び笛" },
      { href: "/items/scents", label: "匂いアイテム" },
      { href: "/items/equipment", label: "装備" },
      { href: "/items/structures", label: "構造物" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Crosshair className="w-12 h-12 text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">
          TheHunter: CoTW<br />
          <span className="text-amber-400">バックパックシミュレーター</span>
        </h1>
        <p className="text-stone-400 max-w-lg mx-auto">
          The Hunter: Call of the Wild の装備重量をシミュレート。銃器・アイテム情報の確認、最適な携行装備の計画にご活用ください。
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.href}
              className={`rounded-xl border p-6 ${
                section.highlight
                  ? "border-amber-600 bg-amber-950/30"
                  : "border-stone-700 bg-stone-900"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${section.highlight ? "text-amber-400" : "text-stone-400"}`} />
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                </div>
                <Link
                  href={section.href}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    section.highlight
                      ? "text-amber-400 hover:text-amber-300"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  開く <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-stone-400 text-sm mb-4">{section.description}</p>
              {section.children && (
                <div className="flex flex-wrap gap-2">
                  {section.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded text-sm transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-4 bg-stone-900 border border-stone-700 rounded-lg text-sm text-stone-500">
        <p>
          データ出典:{" "}
          <span className="text-stone-400">The Hunter: Call of the Wild Wiki</span>。
          ゲームアップデートにより実際の数値と異なる場合があります。
        </p>
      </div>
    </div>
  );
}
