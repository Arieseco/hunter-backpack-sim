# 詳細設計書 08 — 共通ライブラリ

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| Supabaseクライアント | `src/lib/supabase.ts` |
| DB型定義 | `src/lib/database.types.ts` |
| 重量計算ロジック | `src/lib/weight.ts` |
| スタイルユーティリティ | `src/lib/utils.ts` |

---

## 2. Supabaseクライアント（`src/lib/supabase.ts`）

### 2.1 概要

アプリ全体で共有するSupabaseクライアントのシングルトンインスタンスを提供する。

### 2.2 実装

```typescript
import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = rawUrl?.startsWith('http') ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2.3 環境変数

| 変数名 | 必須 | 説明 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | 本番時必須 | SupabaseプロジェクトのAPI URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 本番時必須 | Supabaseの公開キー（publishable） |

### 2.4 フォールバック処理

環境変数が未設定またはHTTP URLでない場合、ビルドエラーを防ぐためフォールバック値を使用する。  
フォールバック時はSupabaseへのリクエストが失敗するが、ビルドは正常完了する。

| 変数 | 条件 | 使用値 |
|---|---|---|
| URL | `rawUrl` が `http` で始まる | `rawUrl`（実際の接続先） |
| URL | それ以外 | `'https://placeholder.supabase.co'`（ダミー） |
| Key | 設定あり | 設定値 |
| Key | 未設定 | `'placeholder'`（ダミー） |

### 2.5 型について

`createClient` にDatabase型ジェネリクスを渡していない。  
そのため各ページで取得結果を明示的にキャストする必要がある（`as Firearm | null` 等）。

---

## 3. DB型定義（`src/lib/database.types.ts`）

### 3.1 概要

DBテーブルに対応するTypeScript型を手動定義する。  
Supabase CLIによる自動生成は使用していない。

### 3.2 型一覧

#### `FirearmType`

```typescript
type FirearmType = 'rifle' | 'shotgun' | 'handgun' | 'bow'
```

#### `ItemCategory`

```typescript
type ItemCategory = 'call' | 'scent' | 'equipment' | 'structure' | 'backpack'
```

#### `Firearm`

| フィールド | 型 | nullable |
|---|---|---|
| `id` | `string` | No |
| `name` | `string` | No |
| `type` | `FirearmType` | No |
| `weight` | `number` | No |
| `description` | `string` | Yes |
| `image_url` | `string` | Yes |

#### `Ammo`

| フィールド | 型 | nullable |
|---|---|---|
| `id` | `string` | No |
| `name` | `string` | No |
| `weight` | `number` | No |
| `class_min` | `number` | Yes |
| `class_max` | `number` | Yes |
| `description` | `string` | Yes |

#### `FirearmAmmo`

| フィールド | 型 | nullable |
|---|---|---|
| `firearm_id` | `string` | No |
| `ammo_id` | `string` | No |

#### `Item`

| フィールド | 型 | nullable |
|---|---|---|
| `id` | `string` | No |
| `name` | `string` | No |
| `category` | `ItemCategory` | No |
| `weight` | `number` | No |
| `weight_bonus` | `number` | No（default 0） |
| `description` | `string` | Yes |
| `image_url` | `string` | Yes |

#### `HuntingArea`

| フィールド | 型 | nullable |
|---|---|---|
| `id` | `string` | No |
| `name` | `string` | No |
| `description` | `string` | Yes |

#### `Animal`

| フィールド | 型 | nullable |
|---|---|---|
| `id` | `string` | No |
| `name` | `string` | No |
| `level_min` | `number` | No |
| `level_max` | `number` | No |

#### `AreaAnimal`

| フィールド | 型 | nullable |
|---|---|---|
| `area_id` | `string` | No |
| `animal_id` | `string` | No |

#### `SimulationItem`（JSONB内の要素型）

| フィールド | 型 | 説明 |
|---|---|---|
| `type` | `'firearm' \| 'ammo' \| 'item'` | アイテム種別 |
| `id` | `string` | アイテムのUUID |
| `quantity` | `number` | 数量（現時点では常に1） |

#### `Simulation`

| フィールド | 型 | nullable |
|---|---|---|
| `id` | `string` | No |
| `created_at` | `string` | No |
| `name` | `string` | Yes |
| `pack_mule` | `boolean` | No（default false） |
| `backpack_item_id` | `string` | Yes |
| `selected_items` | `SimulationItem[]` | No |
| `total_weight` | `number` | No |
| `capacity` | `number` | No |

#### `Database`（Supabase型ジェネリクス用、現在は未使用）

各テーブルの `Row` / `Insert` / `Update` 型を内包する型定義。  
現在は `createClient` に渡していないため参照のみ。

---

## 4. 重量計算ロジック（`src/lib/weight.ts`）

詳細は [06-simulator.md](06-simulator.md) の「4. 重量計算ロジック」を参照。

### エクスポート一覧

| エクスポート | 種別 | 説明 |
|---|---|---|
| `BASE_CAPACITY` | `const number` | 初期容量 = 20 |
| `PACK_MULE_MULTIPLIER` | `const number` | 荷運びラバ倍率 = 1.15 |
| `BACKPACK_BONUSES` | `const Record<string, number>` | バックパック別ボーナス |
| `calculateCapacity` | `function` | 容量上限を計算して返す |

---

## 5. スタイルユーティリティ（`src/lib/utils.ts`）

### 5.1 概要

shadcn/ui が自動生成するTailwindクラス結合ユーティリティ。

### 5.2 `cn(...inputs)`

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- `clsx`: 条件付きクラス名を結合
- `tailwind-merge`: 競合するTailwindクラスを後勝ちでマージ
- 使用箇所: `navigation.tsx` でアクティブ/非アクティブクラスの切り替えに使用
