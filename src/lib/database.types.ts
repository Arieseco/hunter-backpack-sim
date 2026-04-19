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

export interface Database {
  public: {
    Tables: {
      firearms: {
        Row: Firearm
        Insert: Omit<Firearm, 'id'>
        Update: Partial<Omit<Firearm, 'id'>>
      }
      ammo: {
        Row: Ammo
        Insert: Omit<Ammo, 'id'>
        Update: Partial<Omit<Ammo, 'id'>>
      }
      firearm_ammo: {
        Row: FirearmAmmo
        Insert: FirearmAmmo
        Update: Partial<FirearmAmmo>
      }
      items: {
        Row: Item
        Insert: Omit<Item, 'id'>
        Update: Partial<Omit<Item, 'id'>>
      }
      hunting_areas: {
        Row: HuntingArea
        Insert: Omit<HuntingArea, 'id'>
        Update: Partial<Omit<HuntingArea, 'id'>>
      }
      animals: {
        Row: Animal
        Insert: Omit<Animal, 'id'>
        Update: Partial<Omit<Animal, 'id'>>
      }
      area_animals: {
        Row: AreaAnimal
        Insert: AreaAnimal
        Update: Partial<AreaAnimal>
      }
      simulations: {
        Row: Simulation
        Insert: Omit<Simulation, 'id' | 'created_at'>
        Update: Partial<Omit<Simulation, 'id' | 'created_at'>>
      }
    }
  }
}
