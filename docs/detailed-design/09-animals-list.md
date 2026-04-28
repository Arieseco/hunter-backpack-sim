# 詳細設計書 09 — 動物一覧画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| 動物一覧ページ | `src/app/animals/page.tsx` |
| 動物一覧グリッド（共通） | `src/components/animal-grid.tsx` |

---

## 2. 動物一覧ページ（`src/app/animals/page.tsx`）

### 2.1 概要

全動物をグリッド表示する。保護区フィルタと名前検索で絞り込み可能。各カードから動物詳細ページへ遷移する。Server Component。

### 2.2 データ取得

3テーブルを並列取得する。

```typescript
const [{ data: animals }, { data: areas }, { data: areaAnimals }] = await Promise.all([
  supabase.from("animals").select("*").order("level_min").order("name"),
  supabase.from("hunting_areas").select("*").order("name"),
  supabase.from("area_animals").select("*"),
])
```

- `export const dynamic = "force-dynamic"` で毎リクエスト時にDBから取得

### 2.3 レンダリング

取得したデータを `AnimalGrid` コンポーネントに渡す。

```tsx
<AnimalGrid animals={animals} areas={areas} areaAnimals={areaAnimals} />
```

---

## 3. 動物一覧グリッド（`src/components/animal-grid.tsx`）

### 3.1 概要

動物データを保護区フィルタ・名前検索付きグリッドで表示する共通コンポーネント。Client Component。

### 3.2 Props

| Prop | 型 | 説明 |
|---|---|---|
| `animals` | `Animal[]` | 表示する動物一覧 |
| `areas` | `HuntingArea[]` | 保護区一覧（フィルタ用） |
| `areaAnimals` | `AreaAnimal[]` | 保護区と動物の対応（中間テーブル） |

### 3.3 状態

| 状態変数 | 型 | 初期値 | 説明 |
|---|---|---|---|
| `search` | `string` | `""` | 名前検索ワード |
| `selectedAreaId` | `string \| null` | `null` | 選択中の保護区ID（nullは「全て」） |

### 3.4 関数仕様

#### 保護区フィルタリング

```typescript
const filteredByArea = selectedAreaId
  ? animals.filter((a) =>
      areaAnimals.some((aa) => aa.area_id === selectedAreaId && aa.animal_id === a.id)
    )
  : animals
```

#### 名前検索フィルタリング

```typescript
const filtered = filteredByArea.filter((a) =>
  a.name.toLowerCase().includes(search.toLowerCase())
)
```

- 大文字・小文字を区別しない部分一致

#### クラス表示ラベル（`classLabel`）

```typescript
function classLabel(animal: Animal): string {
  return animal.level_min === animal.level_max
    ? `Class ${animal.level_min}`
    : `Class ${animal.level_min}–${animal.level_max}`
}
```

### 3.5 レイアウト

```
┌─────────────────────────────────────────────┐
│ [ページタイトル] Animals                      │
├─────────────────────────────────────────────┤
│ 保護区: [全て ▼]   検索: [____________ 🔍]   │
│                               XX 種          │
├─────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ icon │ │ icon │ │ icon │ │ icon │        │
│  │ 動物名 │ │ 動物名 │ │ 動物名 │ │ 動物名 │        │
│  │Class1│ │Class1│ │Class2│ │Class3│        │
│  └──────┘ └──────┘ └──────┘ └──────┘        │
│  ...                                         │
└─────────────────────────────────────────────┘
```

#### グリッド列数

| ブレークポイント | 列数 |
|---|---|
| モバイル（< 640px） | 3列 |
| タブレット（640–1024px） | 4列 |
| デスクトップ（> 1024px） | 6列 |

### 3.6 動物カード

| 要素 | 内容 |
|---|---|
| アイコン | 六角形プレースホルダー（`animals.icon_url` 未実装期間） |
| 動物名 | `animal.name` |
| クラス | `classLabel(animal)`（例: "Class 3"、"Class 1–3"） |
| リンク | カード全体が `/animals/{animal.id}` へのリンク |
| ホバー | カードハイライト（他ページと統一） |

### 3.7 フィルタバー

| 要素 | 仕様 |
|---|---|
| 保護区ドロップダウン | 先頭に「全て」、続いて保護区名を name 昇順で列挙 |
| 名前検索 | テキスト入力、インクリメンタル検索 |
| 件数表示 | フィルタ結果の `filtered.length` を「XX 種」で表示 |

### 3.8 空状態

`filtered.length === 0` のとき、「該当する動物が見つかりません」を表示。

### 3.9 ソート順

デフォルト: `level_min ASC → name ASC`（DBから取得時に ORDER BY 済み。クライアント側ソートなし）

---

## 4. 画面遷移

| 操作 | 遷移先 |
|---|---|
| 動物カードをクリック | `/animals/{animal.id}` |

---

## 5. 将来対応（スコープ外）

- `animals.icon_url` カラム追加後、プレースホルダーをアイコン画像に差し替え
- 保護区の複数選択フィルタ
