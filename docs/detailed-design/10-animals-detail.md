# 詳細設計書 10 — 動物詳細画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| 動物詳細ページ | `src/app/animals/[id]/page.tsx` |
| 動物詳細表示 | `src/components/animal-detail.tsx` |

---

## 2. 動物詳細ページ（`src/app/animals/[id]/page.tsx`）

### 2.1 概要

URLパラメータ `id` で指定した動物の詳細情報を表示する。Server Component。

### 2.2 ルートパラメータ・クエリパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `params.id` | `string` (UUID) | 動物のID |
| `searchParams.q` | `string?` | 一覧画面の検索ワード（戻りリンク復元用） |
| `searchParams.area` | `string?` | 一覧画面の保護区フィルタID（戻りリンク復元用） |

### 2.3 データ取得

5テーブルを並列取得する。

```typescript
const [
  { data: animalRaw },
  { data: needZones },
  { data: furs },
  { data: areaLinks },
] = await Promise.all([
  supabase.from("animals").select("*").eq("id", id).single(),
  supabase.from("animal_need_zones").select("*, hunting_areas(name)").eq("animal_id", id).order("area_id").order("time_start"),
  supabase.from("animal_furs").select("*").eq("animal_id", id).order("probability", { ascending: false }),
  supabase.from("area_animals").select("hunting_areas(id, name)").eq("animal_id", id),
])
```

### 2.4 バリデーション

| 条件 | 処理 |
|---|---|
| `animal` が null | `notFound()` → 404ページ |

### 2.5 戻りリンクの生成

```typescript
const backParams = new URLSearchParams()
if (sp.q)    backParams.set("q", sp.q)
if (sp.area) backParams.set("area", sp.area)
const backHref = backParams.toString() ? `/animals?${backParams}` : "/animals"
```

---

## 3. 動物詳細表示（`src/components/animal-detail.tsx`）

### 3.1 概要

動物の全詳細情報を表示する共通コンポーネント。Server Component。

### 3.2 Props

| Prop | 型 | 説明 |
|---|---|---|
| `animal` | `Animal` | 動物基本データ |
| `needZones` | `AnimalNeedZone[]` | ニードゾーン（保護区・時間・行動） |
| `furs` | `AnimalFur[]` | 毛皮種類と確率 |
| `backHref` | `string` | 戻るリンクのURL |

### 3.3 表示構造

```
← 動物一覧

[六角アイコン]  動物名（大）
               Class X  [GO バッジ（グレートワンあり時のみ）]

┌─────────────────────────────────────────────────┐
│ [動物画像]                                        │
│ ※ image_url がなければ非表示                      │
└─────────────────────────────────────────────────┘

--- データグリッド ---
┌──────────┬─────────────┬──────────┬─────────────┐
│ クラス    │ 難易度       │ 体重      │ 毛皮種類数   │
│ Class X  │ X〜X        │ X–X kg   │ X 種        │
└──────────┴─────────────┴──────────┴─────────────┘

--- トロフィー情報 ---
┌──────────┬────────┬────────┬──────────┐
│ 種類      │ Silver │ Gold   │ Diamond  │
│ 枝角（頭蓋骨）│ XX.XX │ XX.XX │ XX.XX   │
└──────────┴────────┴────────┴──────────┘

--- 特徴（Features） ---
テキスト

--- ニードゾーン（Need Zone Times） ---
保護区タブ
┌──────────────┬──────────────┐
│ 時間          │ 行動          │
├──────────────┼──────────────┤
│ 0:00〜6:00   │ 食事          │
│ 6:00〜12:00  │ 休憩          │
└──────────────┴──────────────┘

--- 毛皮（Fur） ---
[オス] [メス] [共通]  ← タブ（性別ごとに毛皮が異なる場合のみ表示）
┌──────────┬─────────┬──────────┐
│ 毛皮名    │ 確率     │ レア度    │
├──────────┼─────────┼──────────┤
│ ダークレッド│ 33.23% │ 普通      │
│ パイボールド│  0.20% │ 稀        │
│ アルビノ  │  0.05% │ 極めて稀   │
└──────────┴─────────┴──────────┘
```

---

## 4. データモデル（追加が必要なテーブル・カラム）

### 4.1 animals テーブルへの追加カラム

| カラム | 型 | 説明 |
|---|---|---|
| `image_url` | `TEXT` | スクレイピングした動物写真のURL |
| `difficulty_min` | `INTEGER` | 難易度の最小値（1〜10） |
| `difficulty_max` | `INTEGER` | 難易度の最大値（1〜10） |
| `trophy_type` | `TEXT` | `weight` / `weight_skull` / `antlers_skull` / `tusks_skull` / `composite` |
| `silver_score` | `NUMERIC` | シルバー評価スコア |
| `gold_score` | `NUMERIC` | ゴールド評価スコア |
| `diamond_score` | `NUMERIC` | ダイヤモンド評価スコア |
| `has_great_one` | `BOOLEAN` | 難易度10（フェイブル）が存在するか |
| `weight_min` | `NUMERIC` | 最小体重（kg） |
| `weight_max` | `NUMERIC` | 最大体重（kg） |
| `features` | `TEXT` | 特徴テキスト（英語 or 日本語） |

### 4.2 animal_need_zones テーブル（新規）

```sql
CREATE TABLE animal_need_zones (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id),
  area_id     UUID NOT NULL REFERENCES hunting_areas(id),
  time_start  TEXT NOT NULL,  -- "00:00" 形式
  time_end    TEXT NOT NULL,  -- "23:59" 形式
  behavior    TEXT NOT NULL   -- 'feeding' | 'resting' | 'drinking'
);
```

### 4.3 animal_furs テーブル（新規）

```sql
CREATE TABLE animal_furs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id),
  fur_name    TEXT NOT NULL,
  probability NUMERIC NOT NULL,  -- 例: 33.23
  rarity      TEXT NOT NULL,     -- 'common' | 'uncommon' | 'rare' | 'very_rare'
  gender      TEXT               -- 'male' | 'female' | NULL（両性共通）
);
```

---

## 5. 定数定義

### 5.1 難易度ラベル

```typescript
const DIFFICULTY_LABEL: Record<number, string> = {
  1: "トリビアル",
  2: "マイナー",
  3: "ベリーイージー",
  4: "イージー",
  5: "メディアム",
  6: "ハード",
  7: "ベリーハード",
  8: "ミシカル",
  9: "レジェンダリー",
  10: "フェイブル",
}
```

### 5.2 トロフィー種類ラベル

```typescript
const TROPHY_TYPE_LABEL: Record<string, string> = {
  weight:        "体重",
  weight_skull:  "体重（頭蓋骨）",
  antlers_skull: "枝角（頭蓋骨）",
  tusks_skull:   "牙（頭蓋骨）",
  composite:     "複合",
}
```

### 5.3 毛皮レア度ラベル

```typescript
const FUR_RARITY_LABEL: Record<string, string> = {
  common:    "普通",
  uncommon:  "やや稀",
  rare:      "稀",
  very_rare: "極めて稀",
}
```

### 5.4 行動ラベル

```typescript
const BEHAVIOR_LABEL: Record<string, string> = {
  feeding:   "食事",
  resting:   "休憩",
  drinking:  "水分補給",
}
```

---

## 6. 備考・決定事項

- データ収集（スクレイピング）は別タスク。カラム追加後にデータを投入するまでは各項目を「—」表示する。
- ニードゾーンは保護区ごとにタブで切り替える。生息保護区が1つしかない動物はタブなし。
- 毛皮の性別タブは、オス専用またはメス専用の毛皮が存在する動物のみ表示する。存在しない場合は性別タブ非表示。
- グレートワンバッジは `has_great_one = true` の動物のみ表示する。
- 参考資料: https://thehuntercotw.fandom.com/wiki/Red_Fox
