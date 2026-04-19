export const BASE_CAPACITY = 20;
export const PACK_MULE_MULTIPLIER = 1.15;

export const BACKPACK_BONUSES: Record<string, number> = {
  small: 3,
  medium: 6,
  large: 9,
};

export function calculateCapacity(packMule: boolean, backpackBonus: number): number {
  const base = packMule ? BASE_CAPACITY * PACK_MULE_MULTIPLIER : BASE_CAPACITY;
  return base + backpackBonus;
}
