import { supabase } from "@/lib/supabase"
import type { Firearm, FirearmType } from "@/lib/database.types"

export interface FirearmWithClass extends Firearm {
  class_min: number | null
  class_max: number | null
}

/**
 * 指定タイプの銃器一覧を対応クラス情報付きで取得
 */
export async function getFirearmsWithClass(type: FirearmType): Promise<FirearmWithClass[]> {
  // 銃器一覧を取得
  const { data: firearms } = await supabase
    .from("firearms")
    .select("*")
    .eq("type", type)
    .order("name")

  // firearm_ammo と ammo を結合して対応クラスを取得
  const { data: ammoData } = await supabase
    .from("firearm_ammo")
    .select(`
      firearm_id,
      ammo:ammo_id (
        class_min,
        class_max
      )
    `)

  // 銃器ごとのクラス範囲を集計
  const classRangeMap = new Map<string, { min: number; max: number }>()
  
  if (ammoData) {
    for (const row of ammoData) {
      const ammo = row.ammo as { class_min: number | null; class_max: number | null } | null
      if (!ammo || ammo.class_min == null || ammo.class_max == null) continue
      
      const existing = classRangeMap.get(row.firearm_id)
      if (existing) {
        existing.min = Math.min(existing.min, ammo.class_min)
        existing.max = Math.max(existing.max, ammo.class_max)
      } else {
        classRangeMap.set(row.firearm_id, { min: ammo.class_min, max: ammo.class_max })
      }
    }
  }

  // 銃器データにクラス情報を付与
  return ((firearms as Firearm[] | null) ?? []).map((f) => {
    const range = classRangeMap.get(f.id)
    return {
      ...f,
      class_min: range?.min ?? null,
      class_max: range?.max ?? null,
    }
  })
}
