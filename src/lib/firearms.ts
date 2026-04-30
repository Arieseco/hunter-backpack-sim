import { supabase } from "@/lib/supabase"
import type { Firearm, FirearmType } from "@/lib/database.types"

export interface AmmoClassRange {
  min: number
  max: number
}

export interface FirearmWithClass extends Firearm {
  ammo_classes: AmmoClassRange[]
}

export async function getFirearmsWithClass(type: FirearmType): Promise<FirearmWithClass[]> {
  return getFirearmsWithTypes([type])
}

export async function getFirearmsWithTypes(types: FirearmType[]): Promise<FirearmWithClass[]> {
  const { data: firearms } = await supabase
    .from("firearms")
    .select("*")
    .in("type", types)
    .order("name")

  const firearmList = (firearms as Firearm[] | null) ?? []
  const ids = firearmList.map((f) => f.id)

  if (ids.length === 0) return []

  const { data: ammoData } = await supabase
    .from("firearm_ammo")
    .select(`
      firearm_id,
      ammo:ammo_id (
        class_min,
        class_max
      )
    `)
    .in("firearm_id", ids)

  const classesMap = new Map<string, AmmoClassRange[]>()

  if (ammoData) {
    for (const row of ammoData) {
      const ammo = row.ammo as unknown as { class_min: number | null; class_max: number | null } | null
      if (!ammo || ammo.class_min == null || ammo.class_max == null) continue

      const existing = classesMap.get(row.firearm_id) ?? []
      const isDuplicate = existing.some(
        (r) => r.min === ammo.class_min && r.max === ammo.class_max
      )
      if (!isDuplicate) {
        existing.push({ min: ammo.class_min, max: ammo.class_max })
      }
      classesMap.set(row.firearm_id, existing)
    }
  }

  return firearmList.map((f) => {
    const classes = classesMap.get(f.id) ?? []
    classes.sort((a, b) => a.min - b.min)
    return { ...f, ammo_classes: classes }
  })
}
