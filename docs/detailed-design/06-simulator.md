# 詳細設計書 06 — 重量シミュレータ画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| シミュレータページ（Server） | `src/app/simulator/page.tsx` |
| シミュレータUI（Client） | `src/app/simulator/simulator-client.tsx` |
| 重量計算ロジック | `src/lib/weight.ts` |

---

## 2. シミュレータページ（`src/app/simulator/page.tsx`）

### 2.1 概要

シミュレータに必要なすべてのマスタデータをDBから取得し、`SimulatorClient` に渡す。  
Server Component。`force-dynamic` で毎リクエスト時に取得。

### 2.2 データ取得

9テーブルを `Promise.all` で並列取得する。

```typescript
const [
  { data: firearms },      // 全銃器（type昇順）
  { data: ammo },          // 全弾薬（name昇順）
  { data: items },         // 全アイテム（category昇順）
  { data: areas },         // 全狩猟区（name昇順）
  { data: areaAnimals },   // 全狩猟区-動物対応（順序なし）
  { data: animals },       // 全動物（name昇順）
  { data: firearmAmmo },   // 全銃器-弾薬対応（弾薬フィルタ用）
  { data: scopes },        // 全スコープ（name昇順）
  { data: scopeFirearms }, // 全スコープ-銃器対応（スコープフィルタ用）
] = await Promise.all([...])
```

- 各取得でエラー時は `.then((r) => ({ ...r, data: r.data ?? [] }))` で `[]` にフォールバック

---

## 3. シミュレータUI（`src/app/simulator/simulator-client.tsx`）

### 3.1 概要

シミュレータのすべてのインタラクションを担う。Client Component。  
@dnd-kit によるドラッグ&ドロップ、重量計算、保存処理を実装。

### 3.2 型定義

```typescript
type SlotItem =
  | { kind: "firearm"; data: Firearm }
  | { kind: "ammo";    data: Ammo    }
  | { kind: "scope";   data: Scope   }
  | { kind: "item";    data: Item    }
```

アイテムリスト・装備中リストの要素を統一的に扱う判別共用体型。

### 3.3 Props

| Prop | 型 | 説明 |
|---|---|---|
| `firearms` | `Firearm[]` | 全銃器 |
| `ammo` | `Ammo[]` | 全弾薬 |
| `items` | `Item[]` | 全アイテム（バックパック含む） |
| `areas` | `HuntingArea[]` | 全狩猟区 |
| `areaAnimals` | `AreaAnimal[]` | 狩猟区-動物対応 |
| `animals` | `Animal[]` | 全動物 |
| `firearmAmmo` | `FirearmAmmo[]` | 銃器-弾薬対応（装備中銃器に対応する弾薬フィルタ用） |
| `scopes` | `Scope[]` | 全スコープ |
| `scopeFirearms` | `ScopeFirearm[]` | スコープ-銃器対応（装備中銃器に対応するスコープフィルタ用） |

### 3.4 状態一覧

| 状態変数 | 型 | 初期値 | 説明 |
|---|---|---|---|
| `search` | `string` | `""` | アイテム検索ワード |
| `filterCategory` | `string` | `"all"` | カテゴリフィルタ |
| `equipped` | `SlotItem[]` | `[]` | 装備中アイテム一覧 |
| `backpackId` | `string \| null` | `null` | 選択中バックパックのID |
| `packMule` | `boolean` | `false` | 荷運びラバスキルON/OFF |
| `selectedAreaId` | `string \| null` | `null` | 選択中狩猟区ID |
| `activeId` | `string \| null` | `null` | ドラッグ中アイテムID（DragOverlay用） |
| `saveState` | `"idle" \| "saving" \| "saved"` | `"idle"` | 保存ボタン状態 |
| `savedUrl` | `string \| null` | `null` | 発行済み共有URL |
| `simName` | `string` | `""` | シミュレーション名入力値 |

### 3.5 派生値

| 派生値 | メモ化 | 計算式 | 説明 |
|---|---|---|---|
| `backpacks` | なし | `items.filter(i => i.category === "backpack")` | バックパック一覧 |
| `selectedBackpack` | なし | `backpacks.find(b => b.id === backpackId)` | 選択中バックパック |
| `backpackBonus` | なし | `selectedBackpack?.weight_bonus ?? 0` | バックパックボーナス |
| `capacity` | なし | `calculateCapacity(packMule, backpackBonus)` | 現在の容量上限 |
| `totalWeight` | なし | `equipped.reduce((sum, s) => sum + s.data.weight, 0)` | 装備中合計重量 |
| `overWeight` | なし | `totalWeight > capacity` | 重量超過フラグ |
| `areaAnimalIds` | なし | `areaAnimals.filter(aa => aa.area_id === selectedAreaId).map(aa => aa.animal_id)` | 選択狩猟区の動物ID群 |
| `areaAnimalsFiltered` | なし | `animals.filter(a => areaAnimalIds.includes(a.id))` | 選択狩猟区の動物一覧 |
| `huntingClasses` | `useMemo` | 出現動物の `level_min`〜`level_max` を展開・重複排除・昇順ソート | 狩猟区の適正クラス一覧 |
| `allItems` | なし | 銃器+弾薬+スコープ+アイテム（バックパック除く）を `SlotItem[]` に変換 | アイテムリスト全件 |
| `equippedIds` | なし | `new Set(equipped.map(s => s.data.id))` | 装備済みIDセット（重複除外フィルタ用） |
| `equippedFirearmIds` | なし | 装備中の `kind === "firearm"` の ID一覧 | 弾薬・スコープフィルタ基準 |
| `availableAmmoIds` | なし | `firearmAmmo` から `equippedFirearmIds` に対応する `ammo_id` を抽出 | 表示対象弾薬IDセット |
| `availableScopeIds` | なし | `scopeFirearms` から `equippedFirearmIds` に対応する `scope_id` を抽出 | 表示対象スコープIDセット |
| `equippedAmmoIds` | `useMemo` | 装備中の `kind === "ammo"` の ID一覧 | 狩猟適正チェック用 |
| `equippedClassRanges` | `useMemo` | 装備中弾薬の `class_min`/`class_max` 範囲一覧 | 動物狩猟適正チェック用 |
| `allAnimalsHuntable` | `useMemo` | 出現動物すべてが `isAnimalHuntable` を満たすか | 狩猟区ハイライト条件 |
| `hasEquippedFirearms` | なし | `equippedFirearmIds.length > 0` | 弾薬・スコープフィルタ表示条件 |
| `filterOptions` | なし | `hasEquippedFirearms` ならammo/scopeオプションを動的挿入、そうでなければ基本オプションのみ | フィルタドロップダウン選択肢 |
| `filtered` | なし | `allItems` に検索・カテゴリフィルタ・装備済み除外・弾薬/スコープ適合フィルタを適用 | フィルタ後アイテムリスト |

### 3.6 関数仕様

#### `getBadge(slot: SlotItem): string | undefined`

アイテムカードに表示するバッジラベルを返す。

| `slot.kind` | 条件 | 戻り値 |
|---|---|---|
| `"firearm"` | 常時 | `FIREARM_TYPE_LABEL[type]`（例: `"ライフル"`） |
| `"ammo"` | `class_min`・`class_max` が両方非null | `"Cl.{min}-{max}"` |
| `"ammo"` | どちらかnull | `undefined` |
| `"scope"` | 常時 | `"{magnification}x"`（例: `"3-9x"`） |
| `"item"` | 常時 | `ITEM_CATEGORY_LABEL[category]`（例: `"呼び笛"`） |

#### `handleDragStart(e: DragStartEvent)`

```typescript
setActiveId(String(e.active.id))
```

ドラッグ開始時にDragOverlay用のIDをセット。`useCallback` でメモ化。

#### `handleDragEnd(e: DragEndEvent)`

```typescript
setActiveId(null)
if (e.over?.id === "equipped") {
  const slot = allItems.find((s) => s.data.id === String(e.active.id))
  if (slot) setEquipped((prev) => [...prev, slot])
}
```

ドロップ先が `"equipped"` ゾーンの場合のみ装備リストに追加。`useCallback` でメモ化。

#### `addEquipped(slot: SlotItem)`

```typescript
setEquipped((prev) => [...prev, slot])
```

タップ操作でアイテムを装備リストに追加。`useCallback` でメモ化。  
`DraggableCard` の `onTap` コールバックから呼び出される。

#### `removeEquipped(index: number)`

```typescript
setEquipped((prev) => prev.filter((_, i) => i !== index))
```

装備リストから指定インデックスのアイテムを削除。

#### `isAnimalHuntable(animal: Animal): boolean`

装備中の弾薬クラス範囲と動物の適正クラス範囲が重複するかチェックする。

```
弾薬クラス範囲 [min, max] と 動物クラス範囲 [level_min, level_max] が重複:
  min <= animal.level_max && max >= animal.level_min
```

- `equippedClassRanges` が空の場合は `false`
- いずれかの弾薬範囲が重複すれば `true`
- `useCallback` でメモ化

#### `handleSave()`

```typescript
// 1. saveState → "saving"
// 2. equipped を SimulationItem[] に変換
// 3. supabase.insert → select("id").single()
// 4. 成功: savedUrl セット, saveState → "saved"
// 5. 失敗: saveState → "idle"（エラー詳細は表示しない）
```

Supabase client は型が `any` のためキャストして使用:
```typescript
const { data, error } = await (supabase as any)
  .from("simulations")
  .insert({ name, pack_mule, backpack_item_id, selected_items, total_weight, capacity })
  .select("id")
  .single() as { data: { id: string } | null; error: unknown }
```

### 3.7 カテゴリフィルタ

#### フィルタオプション（動的）

銃器が装備されているときのみ「弾薬」「スコープ」オプションを挿入する。

```typescript
const BASE_FILTER_OPTIONS = [
  { value: "all",       label: "すべて" },
  { value: "firearm",   label: "銃器" },
  { value: "call",      label: "呼び笛" },
  { value: "scent",     label: "匂いアイテム" },
  { value: "equipment", label: "装備品" },
  { value: "structure", label: "構造物" },
]

// 銃器装備時のみ挿入
filterOptions = hasEquippedFirearms
  ? [all, firearm, ammo, scope, call, scent, equipment, structure]
  : BASE_FILTER_OPTIONS
```

銃器がなくなった場合は `useEffect` で `filterCategory` を `"all"` にリセットする。

#### フィルタ値と絞り込み対象

| `filterCategory` 値 | 絞り込み対象 |
|---|---|
| `"all"` | 全件 |
| `"firearm"` | `slot.kind === "firearm"` |
| `"ammo"` | `slot.kind === "ammo"`（銃器装備時のみ選択可） |
| `"scope"` | `slot.kind === "scope"`（銃器装備時のみ選択可） |
| `"call"` | `slot.kind === "item" && category === "call"` |
| `"scent"` | `slot.kind === "item" && category === "scent"` |
| `"equipment"` | `slot.kind === "item" && category === "equipment"` |
| `"structure"` | `slot.kind === "item" && category === "structure"` |

#### アイテムリストのフィルタ処理（`filtered`）

1. 装備済み（`equippedIds`）は除外
2. 弾薬（`kind === "ammo"`）は `availableAmmoIds` 外を除外
3. スコープ（`kind === "scope"`）は `availableScopeIds` 外を除外
4. テキスト検索フィルタを適用
5. カテゴリフィルタを適用

### 3.8 コンポーネント構成（内部）

#### `DraggableCard`

```typescript
function DraggableCard({ id, children, onTap })
```

`@dnd-kit` の `useDraggable` フックでラップするコンテナ。  
- ドラッグ中は `opacity-40` で半透明表示
- `onPointerDown` / `onPointerUp` でポインタ移動距離を計測し、5px未満なら `onTap()` を呼び出す（タップ操作での装備追加）

#### `DropZone`

```typescript
function DropZone({ children })
```

`@dnd-kit` の `useDroppable({ id: "equipped" })` で定義。  
ドラッグオーバー時に `ring-2 ring-primary bg-primary/10` に変化。

#### `ItemCard`

```typescript
function ItemCard({ label, weight, description, badge, overCapacity })
```

アイテム1件のカード表示。`Tooltip` でラップし、ホバー時に `description` をポップアップ表示。  
`overCapacity` が `true` の場合、カード背景を赤系（`bg-red-950/40`）に変えて追加時の重量超過を事前警告する。

### 3.9 バックパック選択ボタン

```
[なし] [小(+3)] [中(+6)] [大(+9)]
```

- 選択中: `bg-amber-600 text-white`
- 非選択: `bg-stone-800 text-stone-400`
- 「なし」選択時: `backpackId = null`、ボーナス = 0

### 3.10 重量バー表示仕様

| 条件 | プログレスバー色 | 数値色 | 追加テキスト |
|---|---|---|---|
| `totalWeight <= capacity` | amber (`bg-amber-500`) | `text-amber-400` | なし |
| `totalWeight > capacity` | red (`bg-red-500`) | `text-red-400` | 「重量超過！」 |

進捗値: `Math.min((totalWeight / capacity) * 100, 100)`（100を超えないよう制限）

### 3.11 保存ボタン状態

| `saveState` | ボタン表示 | 活性状態 |
|---|---|---|
| `"idle"` | 「💾 保存してURLを発行」 | `equipped.length > 0` なら活性 |
| `"saving"` | 「💾 保存してURLを発行」 | 非活性（`disabled`） |
| `"saved"` | 「✓ 保存済み」 | 非活性（`disabled`） |

### 3.12 DragOverlay

ドラッグ中のアイテムをカーソルに追従させる浮遊表示。

```tsx
<DragOverlay>
  {activeSlot && (
    <div className="... border-amber-500 shadow-xl opacity-90">
      {activeSlot.data.name} — {activeSlot.data.weight} kg
    </div>
  )}
</DragOverlay>
```

---

## 4. 重量計算ロジック（`src/lib/weight.ts`）

### 4.1 定数

| 定数名 | 値 | 説明 |
|---|---|---|
| `BASE_CAPACITY` | `20` | 初期所持重量上限（kg） |
| `PACK_MULE_MULTIPLIER` | `1.15` | 荷運びラバの倍率 |
| `BACKPACK_BONUSES` | `{ small: 3, medium: 6, large: 9 }` | バックパック別ボーナス（現在は参照用のみ） |

### 4.2 `calculateCapacity(packMule, backpackBonus)`

```typescript
export function calculateCapacity(packMule: boolean, backpackBonus: number): number {
  const base = packMule ? BASE_CAPACITY * PACK_MULE_MULTIPLIER : BASE_CAPACITY
  return base + backpackBonus
}
```

| 引数 | 型 | 説明 |
|---|---|---|
| `packMule` | `boolean` | 荷運びラバスキルON/OFF |
| `backpackBonus` | `number` | バックパックの重量ボーナス（items.weight_bonus） |

| 戻り値 | 型 | 説明 |
|---|---|---|
| `capacity` | `number` | 合計の所持重量上限（kg） |

計算例:

| packMule | backpackBonus | 結果 |
|---|---|---|
| false | 0 | 20.00 |
| false | 9 | 29.00 |
| true | 0 | 23.00 |
| true | 9 | 32.00 |
