import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";

const categories = [
  { href: "/items/calls", label: "呼び笛", description: "動物を引き寄せる各種コール。ターゲット動物に合わせて選択。" },
  { href: "/items/scents", label: "匂いアイテム", description: "プレイヤーの気配を消したり動物を引き付けたりする匂いアイテム。" },
  { href: "/items/equipment", label: "装備", description: "双眼鏡、デコイなど狩猟補助装備。バックパックもこちら。" },
  { href: "/items/structures", label: "構造物", description: "テント、三脚、ブラインドなどフィールドに設置する構造物。" },
];

export default function ItemsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-6 h-6 text-amber-400" />
        <h1 className="text-2xl font-bold text-white">アイテム一覧</h1>
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
