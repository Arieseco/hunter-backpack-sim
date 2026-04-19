import Link from "next/link";
import { ChevronRight, Crosshair } from "lucide-react";

const categories = [
  { href: "/firearms/rifles", label: "ライフル", description: "ボルトアクション・レバーアクション等。長距離・大型獣に対応。" },
  { href: "/firearms/shotguns", label: "ショットガン", description: "近距離戦に適した散弾銃。鳥類から大型獣まで幅広く対応。" },
  { href: "/firearms/handguns", label: "ハンドガン", description: "軽量なサイドアーム。緊急時や小型獣に使用。" },
  { href: "/firearms/bows", label: "弓", description: "静音性に優れた弓。発見されにくく近距離狩猟に最適。" },
];

export default function FirearmsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Crosshair className="w-6 h-6 text-amber-400" />
        <h1 className="text-2xl font-bold text-white">銃器一覧</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="flex items-center justify-between p-5 bg-stone-900 border border-stone-700 hover:border-amber-600 rounded-xl transition-colors group"
          >
            <div>
              <p className="font-semibold text-white group-hover:text-amber-400 transition-colors">{cat.label}</p>
              <p className="text-sm text-stone-400 mt-1">{cat.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-amber-400 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
