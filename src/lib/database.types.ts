// DB型定義 - Supabaseテーブルに対応するTypeScript型

export type FirearmType = 'rifle' | 'shotgun' | 'handgun' | 'bow' | 'muzzleloader'

export type BowType = 'コンパウンドボウ' | 'クロスボウ' | 'リカーブボウ'

export type ItemCategory = 'call' | 'scent' | 'equipment' | 'structure' | 'backpack' | 'feeder'

export interface Firearm {
  id: string
  name: string
  type: FirearmType
  accuracy: number
  recoil: number
  reload_speed: number
  hipfire_accuracy: number
  magazine_capacity: number
  weight: number
  required_score: number
  price: number
  comment: string | null
  image_url: string | null
  bow_type: BowType | null
}

export interface Ammo {
  id: string
  name: string
  type: string
  weight: number
  class_min: number | null
  class_max: number | null
  effective_range: number | null
  penetration: number | null
  expansion: number | null
  required_score: number
  price: number
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

export interface Scope {
  id: string
  name: string
  magnification: string
  weight: number
  required_score: number | null
  price: number | null
  description: string | null
}

export interface ScopeFirearm {
  scope_id: string
  firearm_id: string
}

export type BowGrain = 300 | 420 | 600

export interface BowSightDistance {
  id: string
  firearm_id: string
  zero_distance: number
  grain: BowGrain
  pin: number        // 1–5 (1=top, 3=middle/zero, 5=bottom)
  distance: number   // meters
}

export type BallisticsDirection = 'up' | 'down' | null

export interface FirearmBallistics {
  id: string
  firearm_id: string
  ammo_note: string | null
  zero_distance: number
  range_distance: number
  score: number | null
  direction: BallisticsDirection
  is_out: boolean
}

export interface HuntingArea {
  id: string
  name: string
  description: string | null
}

export type TrophyType = 'weight' | 'weight_skull' | 'antlers_skull' | 'tusks_skull' | 'composite'
export type FurRarity = 'common' | 'uncommon' | 'rare' | 'very_rare'
export type NeedZoneBehavior = 'feeding' | 'resting' | 'drinking'

export interface Animal {
  id: string
  name: string
  level_min: number
  level_max: number
  image_url: string | null
  difficulty_min: number | null
  difficulty_max: number | null
  trophy_type: TrophyType | null
  silver_score: number | null
  gold_score: number | null
  diamond_score: number | null
  has_great_one: boolean
  weight_min: number | null
  weight_max: number | null
  features: string | null
}

export interface AnimalNeedZone {
  id: string
  animal_id: string
  area_id: string
  time_start: string
  time_end: string
  behavior: NeedZoneBehavior
}

export interface AnimalFur {
  id: string
  animal_id: string
  fur_name: string
  probability: number
  rarity: FurRarity
  gender: 'male' | 'female' | null
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

export type TrophyMountSize = '極小' | '小' | '中' | '大' | '特大' | '極大'

export interface MultiTrophy {
  id: string
  name: string
  size: TrophyMountSize
  cost: number
}

export interface MultiTrophyRequirement {
  id: string
  multi_trophy_id: string
  animal_id: string
  gender: 'male' | 'female' | null
  sort_order: number
}

export type MultiTrophyWithRequirements = MultiTrophy & {
  multi_trophy_requirements: Array<{
    sort_order: number
    gender: 'male' | 'female' | null
    animals: { name: string } | null
  }>
}

// ラベル定義
export const FIREARM_TYPE_LABEL: Record<FirearmType, string> = {
  rifle: 'ライフル',
  shotgun: 'ショットガン',
  handgun: 'ハンドガン',
  bow: '弓',
  muzzleloader: 'マズルローダー',
}

export const ITEM_CATEGORY_LABEL: Record<ItemCategory, string> = {
  call: '呼び笛',
  scent: '匂い消し',
  equipment: '装備品',
  structure: '構造物',
  backpack: 'バックパック',
  feeder: '給餌器',
}
