# 詳細設計書 05 — アイテム一覧画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| アイテムカテゴリ選択 | `src/app/items/page.tsx` |
| 呼び笛一覧 | `src/app/items/calls/page.tsx` |
| 匂いアイテム一覧 | `src/app/items/scents/page.tsx` |
| 装備一覧 | `src/app/items/equipment/page.tsx` |
| 構造物一覧 | `src/app/items/structures/page.tsx` |
| アイテム一覧テーブル（共通） | `src/components/item-table.tsx` |

---

## 2. アイテムカテゴリ選択（`src/app/items/page.tsx`）

### 2.1 概要

アイテムの4カテゴリへのナビゲーション画面。DBアクセスなし・SSG。

### 2.2 カテゴリ一覧

| label | href | description |
|---|---|---|
| 呼び笛 | `/items/calls` | 動物を引き寄せる各種コール。ターゲット動物に合わせて選択。 |
| 匂いアイテム | `/items/scents` | プレイヤーの気配を消したり動物を引き付けたりする匂いアイテム。 |
| 装備 | `/items/equipment` | 双眼鏡、デコイなど狩猟補助装備。バックパックもこちら。 |
| 構造物 | `/items/structures` | テント、三脚、ブラインドなどフィールドに設置する構造物。 |

---

## 3. アイテム一覧ページ群

### 3.1 概要

各カテゴリのアイテムを一覧表示する。4ページとも同一構造。Server Component。

### 3.2 データ取得

```typescript
// 例: 呼び笛
const { data: items } = await supabase
  .from("items")
  .select("*")
  .eq("category", "call")
  .order("name")
```

| ページ | `.eq("category", ...)` |
|---|---|
| 呼び笛 | `"call"` |
| 匂いアイテム | `"scent"` |
| 装備 | `.in("category", ["equipment", "backpack"])` ※複数カテゴリ |
| 構造物 | `"structure"` |

> **装備ページの特記事項:** バックパックは `items` テーブルの `backpack` カテゴリに格納されており、装備ページでまとめて表示する（`.in()` で複数カテゴリを指定）。

- `export const dynamic = "force-dynamic"` で毎リクエスト時にDBから取得
- 取得失敗時は `[] ` を渡す（`?? []`）

### 3.3 レンダリング

```tsx
<ItemTable items={items ?? []} />
```

---

## 4. アイテム一覧テーブル（`src/components/item-table.tsx`）

### 4.1 概要

アイテムデータを検索フィルタ付きテーブルで表示する共通コンポーネント。Client Component。

### 4.2 Props

| Prop | 型 | 説明 |
|---|---|---|
| `items` | `Item[]` | 表示するアイテム一覧 |

### 4.3 状態

| 状態変数 | 型 | 初期値 | 説明 |
|---|---|---|---|
| `search` | `string` | `""` | 検索ワード |

### 4.4 関数仕様

#### フィルタリング

```typescript
const filtered = items.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
)
```

- アイテム名を小文字変換して部分一致検索
- 大文字・小文字を区別しない

### 4.5 テーブル列定義

| 列 | 表示条件 | 内容 |
|---|---|---|
| 名前 | 常時 | `item.name` |
| 説明 | md以上 | `item.description`（nullの場合は `"-"`）、最大幅 `max-w-xs` で切り捨て |
| 重量 | 常時 | `item.weight` kg（右寄せ） |

### 4.6 空状態

`filtered.length === 0` のとき「該当するアイテムが見つかりません」を全列結合セルで表示。

### 4.7 件数表示

テーブル下部に `{filtered.length} 件` を表示。
