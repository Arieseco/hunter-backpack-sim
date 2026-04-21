# 詳細設計書 03 — 銃器一覧画面

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| 銃器カテゴリ選択 | `src/app/firearms/page.tsx` |
| ライフル一覧ページ | `src/app/firearms/rifles/page.tsx` |
| ショットガン一覧ページ | `src/app/firearms/shotguns/page.tsx` |
| ハンドガン一覧ページ | `src/app/firearms/handguns/page.tsx` |
| 弓一覧ページ | `src/app/firearms/bows/page.tsx` |
| 銃器一覧テーブル（共通） | `src/components/firearm-table.tsx` |

---

## 2. 銃器カテゴリ選択（`src/app/firearms/page.tsx`）

### 2.1 概要

銃器の4カテゴリへのナビゲーション画面。DBアクセスなし・SSG。  
マズルローダー（`muzzleloader`）はDBに存在するが、専用ページなし。シミュレーターのアイテムリストからのみアクセス可能。

### 2.2 カテゴリ一覧

| label | href | description |
|---|---|---|
| ライフル | `/firearms/rifles` | ボルトアクション・レバーアクション等。長距離・大型獣に対応。 |
| ショットガン | `/firearms/shotguns` | 近距離戦に適した散弾銃。鳥類から大型獣まで幅広く対応。 |
| ハンドガン | `/firearms/handguns` | 軽量なサイドアーム。緊急時や小型獣に使用。 |
| 弓 | `/firearms/bows` | 静音性に優れた弓。発見されにくく近距離狩猟に最適。 |

---

## 3. 銃器一覧ページ群（`rifles / shotguns / handguns / bows`）

### 3.1 概要

各カテゴリの銃器一覧を表示する。4ページとも同一構造。Server Component。

### 3.2 データ取得

`src/lib/firearms.ts` の `getFirearmsWithClass(type)` を使用して、銃器一覧と対応クラス範囲を一括取得する。

```typescript
// 例: ライフル一覧
const firearms = await getFirearmsWithClass("rifle")
```

`getFirearmsWithClass` の内部処理:
1. `firearms` テーブルから指定 type を name 昇順で取得
2. `firearm_ammo` + `ammo` を結合して各銃器の class_min / class_max を集計
3. `FirearmWithClass[]`（`Firearm` + `class_min` + `class_max`）を返す

| ページ | `getFirearmsWithClass(...)` の引数 |
|---|---|
| ライフル | `"rifle"` |
| ショットガン | `"shotgun"` |
| ハンドガン | `"handgun"` |
| 弓 | `"bow"` |

- `export const dynamic = "force-dynamic"` で毎リクエスト時にDBから取得

### 3.3 レンダリング

取得したデータを `FirearmTable` コンポーネントに渡す。

```tsx
<FirearmTable firearms={firearms} type="rifles" />
//                                ↑ 詳細リンク生成に使う種別文字列
```

---

## 4. 銃器一覧テーブル（`src/components/firearm-table.tsx`）

### 4.1 概要

銃器データを検索フィルタ付きテーブルで表示する共通コンポーネント。Client Component。

### 4.2 Props

| Prop | 型 | 説明 |
|---|---|---|
| `firearms` | `FirearmWithClass[]` | 表示する銃器一覧（対応クラス情報付き） |
| `type` | `string` | URLパスに使う種別文字列（`"rifles"` など） |

`FirearmWithClass` は `Firearm` に `class_min: number | null` と `class_max: number | null` を追加した型（`src/lib/firearms.ts` で定義）。

### 4.3 状態

| 状態変数 | 型 | 初期値 | 説明 |
|---|---|---|---|
| `search` | `string` | `""` | 検索ワード |

### 4.4 関数仕様

#### フィルタリング

```typescript
const filtered = firearms.filter((f) =>
  f.name.toLowerCase().includes(search.toLowerCase())
)
```

- 銃器名を小文字変換して部分一致検索
- 大文字・小文字を区別しない

#### 種別ラベル変換（`typeLabel`）

```typescript
const typeLabel: Record<string, string> = {
  rifle:       "ライフル",
  shotgun:     "ショットガン",
  handgun:     "ハンドガン",
  bow:         "弓",
  muzzleloader:"マズルローダー",
}
```

未定義 type の場合は `typeLabel[firearm.type] ?? firearm.type` でフォールバック。

### 4.5 テーブル列定義

PC表示（md以上）はテーブル形式、スマホ（md未満）はカード形式で表示。

| 列 | 表示条件 | 内容 |
|---|---|---|
| 名前 | 常時 | `firearm.name` |
| 種類 | PC（md以上） | `typeLabel[firearm.type]` をバッジ表示 |
| 対応クラス | PC（md以上） | `class_min`/`class_max` をバッジ表示（両方nullなら `"-"`） |
| 重量 | 常時 | `firearm.weight.toFixed(2)` kg（右寄せ） |
| 詳細リンク | 常時 | `/firearms/{type}/{firearm.id}` へのリンク |

### 4.6 空状態

`filtered.length === 0` のとき、「該当する銃器が見つかりません」を全列結合セルで表示。

### 4.7 件数表示

テーブル下部に `{filtered.length} 件` を表示。

### 4.8 画面遷移

| 操作 | 遷移先 |
|---|---|
| 「詳細 →」リンク | `/firearms/{type}/{firearm.id}` |
