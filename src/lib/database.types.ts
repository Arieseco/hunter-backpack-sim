// DB型定義 - Supabaseテーブルに対応するTypeScript型

export type FirearmType = 'rifle' | 'shotgun' | 'handgun' | 'bow'

export type ItemCategory = 'call' | 'scent' | 'equipment' | 'structure' | 'backpack'

export interface Firearm {
  id: string
  name: string
  type: FirearmType
  weight: number
  description: string | null
  image_url: string | null
}

export interface Ammo {
  id: string
  name: string
  weight: number
  class_min: number | null
  class_max: number | null
  description: string | null
}

export interface FirearmAmmo {
  firearm_id: string
  ammo_id: string
}

export interface Item {
  id: string
  name: string
  category: ItemCategory
  weight: number
  weight_bonus: number
  description: string | null
  image_url: string | null
  // call-specific fields
  target_animals: string | null
  effective_distance: number | null
  attraction: number | null
  effective_duration: number | null
  // equipment / shared fields
  item_type: string | null
  price: number | null
  unlock_level: number | null
  // structure-specific fields
  reduces_hunting_pressure: boolean | null
  concealment_rate: number | null
  max_installations: number | null
  disturbance_radius: number | null
}

export interface HuntingArea {
  id: string
  name: string
  description: string | null
}

export interface Animal {
  id: string
  name: string
  level_min: number
  level_max: number
}

export interface AreaAnimal {
  area_id: string
  animal_id: string
}

export interface SimulationItem {
  type: 'firearm' | 'ammo' | 'item'
  id: string
  quantity: number
}

export interface Simulation {
  id: string
  created_at: string
  name: string | null
  pack_mule: boolean
  backpack_item_id: string | null
  selected_items: SimulationItem[]
  total_weight: number
  capacity: number
}

// ラベル定義
export const FIREARM_TYPE_LABEL: Record<FirearmType, string> = {
  rifle: 'ライフル',
  shotgun: 'ショットガン',
  handgun: 'ハンドガン',
  bow: '弓',
}

export const ITEM_CATEGORY_LABEL: Record<ItemCategory, string> = {
  call: '呼び笛',
  scent: '匂い消し',
  equipment: '装備品',
  structure: '構造物',
  backpack: 'バックパック',
}
