# 詳細設計書 04 — 銃器詳細画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| ライフル詳細ページ | `src/app/firearms/rifles/[id]/page.tsx` |
| ショットガン詳細ページ | `src/app/firearms/shotguns/[id]/page.tsx` |
| ハンドガン詳細ページ | `src/app/firearms/handguns/[id]/page.tsx` |
| 弓詳細ページ | `src/app/firearms/bows/[id]/page.tsx` |
| 銃器詳細表示（共通） | `src/components/firearm-detail.tsx` |

---

## 2. 詳細ページ群（`rifles/[id]` など）

### 2.1 概要

URLパラメータ `id` で指定した銃器の詳細と対応弾薬を表示する。  
4ページとも同一ロジック、カテゴリ（type）チェックのみ異なる。Server Component。

### 2.2 ルートパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `id` | `string` (UUID) | 銃器のID |

```typescript
// Next.js 15: params は Promise
const { id } = await params
```

### 2.3 データ取得フロー

```
1. firearms テーブルから id で1件取得（.single()）
2. firearm_ammo テーブルから firearm_id で ammo_id を取得
3. ammo_id リストで ammo テーブルから弾薬を取得
   └ ammo_id が空の場合はDBアクセスをスキップし [] を返す
```

```typescript
const [{ data: firearmRaw }, { data: ammoLinks }] = await Promise.all([
  supabase.from("firearms").select("*").eq("id", id).single(),
  supabase.from("firearm_ammo").select("ammo_id").eq("firearm_id", id),
])
```

### 2.4 バリデーション

| 条件 | 処理 |
|---|---|
| `firearm` が null | `notFound()` → 404ページ表示 |
| `firearm.type` がページのカテゴリと不一致 | `notFound()` → 404ページ表示 |

カテゴリチェック対応表:

| ページ | チェック値 |
|---|---|
| rifles/[id] | `firearm.type !== "rifle"` |
| shotguns/[id] | `firearm.type !== "shotgun"` |
| handguns/[id] | `firearm.type !== "handgun"` |
| bows/[id] | `firearm.type !== "bow"` |

### 2.5 型キャスト

Supabase クライアントに Database 型を渡していないため、明示的キャストが必要。

```typescript
const firearm = firearmRaw as Firearm | null
const links   = ammoLinks  as { ammo_id: string }[] | null
const ammoList = ammoRaw   as Ammo[] | null
```

### 2.6 FirearmDetail への渡し方

| ページ | backHref | backLabel |
|---|---|---|
| rifles/[id] | `/firearms/rifles` | `"ライフル一覧"` |
| shotguns/[id] | `/firearms/shotguns` | `"ショットガン一覧"` |
| handguns/[id] | `/firearms/handguns` | `"ハンドガン一覧"` |
| bows/[id] | `/firearms/bows` | `"弓一覧"` |

---

## 3. 銃器詳細表示（`src/components/firearm-detail.tsx`）

### 3.1 概要

銃器の基本情報と対応弾薬テーブルを表示する共通コンポーネント。Server Component。

### 3.2 Props

| Prop | 型 | 説明 |
|---|---|---|
| `firearm` | `Firearm` | 表示する銃器 |
| `ammoList` | `Ammo[]` | 対応弾薬一覧 |
| `backHref` | `string` | 戻るリンクのURL |
| `backLabel` | `string` | 戻るリンクのラベル |

### 3.3 表示構造

```
← {backLabel}

┌────────────────────────────────────┐
│ {firearm.name}                     │
│ 重量: {firearm.weight} kg          │
│ {firearm.comment}（任意）           │
└────────────────────────────────────┘

対応弾薬・矢
┌────────────┬──────────────┬────────┐
│ 弾薬名      │ 適正クラス    │ 重量   │
├────────────┼──────────────┼────────┤
│ .30-06 FMJ │ クラス 4–8   │ 0.10kg │
└────────────┴──────────────┴────────┘
```

### 3.4 弾薬テーブル列定義

| 列 | 表示条件 | 内容 |
|---|---|---|
| 弾薬名 | 常時 | `ammo.name` |
| 適正クラス | sm以上 | `class_min`・`class_max` が両方非nullならバッジ表示、どちらかnullなら `"-"` |
| 重量 | 常時 | `ammo.weight` kg（右寄せ） |

### 3.5 空状態

`ammoList.length === 0` のとき「弾薬情報がありません」を表示。

### 3.6 画面遷移

| 操作 | 遷移先 |
|---|---|
| 「← {backLabel}」リンク | `backHref` |
