# 詳細設計書 07 — 保存済みシミュレーション閲覧画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| 保存済みシミュレーション閲覧 | `src/app/simulator/[id]/page.tsx` |

---

## 2. 概要

`/simulator/{uuid}` でアクセスされた保存済みシミュレーションを復元・表示する。  
Server Component。`force-dynamic` で毎リクエスト時にDBから取得。  
URLのUUIDが存在しない場合は404を返す。

---

## 3. ルートパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `id` | `string` (UUID) | シミュレーションID |

```typescript
const { id } = await params  // Next.js 15: params は Promise
```

---

## 4. データ取得フロー

```
1. simulations テーブルから id で1件取得（.single()）
   └ 存在しない場合: notFound() → 404

2. selected_items (JSONB) を SimulationItem[] として解析
   └ type別に firearm_ids / ammo_ids / item_ids に分類

3. 各IDリストで並列取得（Promise.all）
   ├ firearms テーブル: firearm_ids が空なら [] を返す
   ├ ammo テーブル:     ammo_ids が空なら [] を返す
   └ items テーブル:    item_ids が空なら [] を返す
```

```typescript
const { data: simRaw } = await supabase
  .from("simulations").select("*").eq("id", id).single()

const sim = simRaw as Simulation | null
if (!sim) notFound()

const [{ data: firearmsRaw }, { data: ammoRaw }, { data: itemsRaw }] =
  await Promise.all([
    firearmsIds.length ? supabase.from("firearms").select("*").in("id", firearmsIds) : { data: [] },
    ammoIds.length     ? supabase.from("ammo").select("*").in("id", ammoIds)         : { data: [] },
    itemIds.length     ? supabase.from("items").select("*").in("id", itemIds)         : { data: [] },
  ])
```

---

## 5. 表示仕様

### 5.1 ヘッダーカード

```
← シミュレータに戻る

┌────────────────────────────────────────────────┐
│ {sim.name ?? "保存済みシミュレーション"}           │
│ 📅 {sim.created_at を ja-JP ロケールで表示}       │
│                                                  │
│ [荷運びラバ ON]  ← sim.pack_mule が true のみ表示 │
│                                                  │
│ 重量:              {total_weight} / {capacity} kg│
│ ████████████░░░  ← プログレスバー                │
└────────────────────────────────────────────────┘
```

### 5.2 プログレスバー

| 条件 | バー色 | 数値色 |
|---|---|---|
| `total_weight <= capacity` | amber | amber |
| `total_weight > capacity` | red | red |

進捗値: `Math.min((total_weight / capacity) * 100, 100)`

### 5.3 アイテムリスト

`selected_items` を順番通りに表示。各行:

```
[アイテム名]                    [重量 kg]
```

アイテム名の解決:

```typescript
for (si of selectedItems) {
  if (si.type === "firearm") → firearms.find(x => x.id === si.id) から name, weight を取得
  if (si.type === "ammo")    → ammo.find(x => x.id === si.id) から name, weight を取得
  if (si.type === "item")    → items.find(x => x.id === si.id) から name, weight を取得
  // 対応するレコードが存在しない場合: name="不明", weight=0
}
```

### 5.4 空状態

`selectedItems.length === 0` のとき「装備アイテムがありません」を表示。

---

## 6. 画面遷移

| 操作 | 遷移先 |
|---|---|
| 「← シミュレータに戻る」 | `/simulator` |
| 「新しいシミュレーションを作成」ボタン | `/simulator` |

---

## 7. エラーハンドリング

| 条件 | 処理 |
|---|---|
| `id` に対応するシミュレーションが存在しない | `notFound()` → Next.js の404ページ |
| アイテムIDが取得できない（削除済み等） | name=`"不明"`、weight=`0` として表示（エラーにしない） |
