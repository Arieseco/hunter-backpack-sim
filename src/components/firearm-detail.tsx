import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { Firearm, Ammo } from "@/lib/database.types";

interface FirearmDetailProps {
  firearm: Firearm;
  ammoList: Ammo[];
  backHref: string;
  backLabel: string;
}

export function FirearmDetail({ firearm, ammoList, backHref, backLabel }: FirearmDetailProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-200 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>

      <div className="bg-stone-900 border border-stone-700 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">{firearm.name}</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-stone-500 mb-1">重量</p>
            <p className="text-lg font-semibold text-amber-400">{firearm.weight} kg</p>
          </div>
        </div>
        {firearm.description && (
          <p className="text-stone-400 text-sm leading-relaxed">{firearm.description}</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">対応弾薬・矢</h2>
        {ammoList.length === 0 ? (
          <p className="text-stone-500 text-sm">弾薬情報がありません</p>
        ) : (
          <div className="rounded-lg border border-stone-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-stone-800 text-stone-400">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">弾薬名</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">適正クラス</th>
                  <th className="text-right px-4 py-3 font-medium">重量</th>
                </tr>
              </thead>
              <tbody>
                {ammoList.map((ammo, i) => (
                  <tr
                    key={ammo.id}
                    className={`border-t border-stone-800 ${i % 2 === 0 ? "bg-stone-900" : "bg-stone-900/50"}`}
                  >
                    <td className="px-4 py-3 text-stone-100">{ammo.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {ammo.class_min != null && ammo.class_max != null ? (
                        <Badge variant="outline" className="border-stone-600 text-stone-300">
                          クラス {ammo.class_min}–{ammo.class_max}
                        </Badge>
                      ) : (
                        <span className="text-stone-600">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-stone-300">{ammo.weight} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
