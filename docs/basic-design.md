# 基本設計書

**プロジェクト名:** TheHunter: Call of the Wild バックパックシミュレーター  
**作成日:** 2026-04-19  
**対応要件定義書:** docs/requirements.md

---

## 1. システム構成

### 1.1 アーキテクチャ概要

```
ブラウザ
  │
  │ HTTPS
  ▼
Next.js (App Router / SSR)          ← フロントエンド + サーバーサイド
  │
  │ Supabase JS Client (HTTPS)
  ▼
Supabase (PostgreSQL)               ← データベース
```

- フロントエンドとサーバーサイドは Next.js で一体管理（フルスタック構成）
- DBアクセスはサーバーコンポーネント（Server Component）から行い、クライアントに生SQLを露出しない
- シミュレーター保存のみクライアントコンポーネントから Supabase を直接呼び出す（RLS で保護）

### 1.2 技術スタック

| 役割 | 技術 | バージョン |
|---|---|---|
| フレームワーク | Next.js (App Router) | 16.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| UIコンポーネント | shadcn/ui (Radix UI ベース、new-york スタイル) | 最新 |
| ドラッグ&ドロップ | @dnd-kit/core | 最新 |
| アイコン | lucide-react | 最新 |
| DBクライアント | @supabase/supabase-js | 2.x |
| DB | Supabase (PostgreSQL) | — |

### 1.3 レンダリング方式

| ページ種別 | 方式 | 理由 |
|---|---|---|
| トップページ / カテゴリ一覧 | Static (SSG) | DBアクセス不要 |
| 銃器・アイテム一覧 / 詳細 | Dynamic (SSR) | DBからデータ取得 |
| シミュレータ | Dynamic (SSR) + Client Component | 初期データSSR、インタラクションはClient |
| 保存済みシミュレーション | Dynamic (SSR) | IDでDBから取得 |

---

## 2. ディレクトリ構成

```
hunter-simulator/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # ルートレイアウト（ナビ・フォント）
│   │   ├── page.tsx                  # トップページ
│   │   ├── globals.css               # グローバルスタイル
│   │   ├── firearms/
│   │   │   ├── page.tsx              # 銃器カテゴリ選択
│   │   │   ├── rifles/
│   │   │   │   ├── page.tsx          # ライフル一覧（Server Component）
│   │   │   │   └── [id]/page.tsx     # ライフル詳細（Server Component）
│   │   │   ├── shotguns/             # （rifles と同構造）
│   │   │   ├── handguns/             # （rifles と同構造）
│   │   │   └── bows/                 # （rifles と同構造）
│   │   ├── items/
│   │   │   ├── page.tsx              # アイテムカテゴリ選択
│   │   │   ├── calls/page.tsx        # 呼び笛一覧（Server Component）
│   │   │   ├── scents/page.tsx       # 匂いアイテム一覧
│   │   │   ├── equipment/page.tsx    # 装備一覧
│   │   │   └── structures/page.tsx   # 構造物一覧
│   │   └── simulator/
│   │       ├── page.tsx              # シミュレータ（Server Component）
│   │       ├── simulator-client.tsx  # シミュレータUI（Client Component）
│   │       └── [id]/page.tsx         # 保存済みシミュレーション
│   ├── components/
│   │   ├── navigation.tsx            # グローバルナビゲーション
│   │   ├── firearm-table.tsx         # 銃器一覧テーブル（Client Component）
│   │   ├── firearm-detail.tsx        # 銃器詳細（Server Component）
│   │   ├── item-table.tsx            # アイテム一覧テーブル（Client Component）
│   │   └── ui/                       # shadcn/ui コンポーネント群
│   └── lib/
│       ├── supabase.ts               # Supabaseクライアント初期化
│       ├── database.types.ts         # DB型定義（手動管理）
│       ├── firearms.ts               # 銃器データ取得ユーティリティ
│       ├── weight.ts                 # 重量計算ロジック
│       └── utils.ts                  # tailwind cn ユーティリティ
├── supabase/
│   ├── schema.sql                    # テーブル定義
│   ├── migrations/                   # スキーマ追加マイグレーション
│   │   ├── 001_add_call_details.sql  # call/scent 用カラム追加
│   │   ├── 002_add_item_type.sql     # equipment サブカテゴリカラム追加
│   │   └── 003_add_structure_details.sql # structure 用カラム追加
│   ├── seed.sql                      # 初期データ
│   └── rls.sql                       # Row Level Security ポリシー
├── docs/
│   ├── requirements.md               # 要件定義書
│   └── basic-design.md              # 本書
├── .env.local                        # 環境変数（Git管理外）
└── SETUP.md                          # セットアップ手順
```

---

## 3. 画面設計

### 3.1 共通レイアウト

```
┌─────────────────────────────────────────────┐
│  ナビゲーションバー（固定・最上部）              │
│  [🎯 TheHunter Simulator] [トップ] [銃器▼] [アイテム▼] [重量シミュレータ] │
├─────────────────────────────────────────────┤
│                                             │
│              <page content>                 │
│                                             │
└─────────────────────────────────────────────┘
```

- ナビゲーションは `sticky top-0` で常に表示
- 銃器・アイテムはドロップダウンメニュー（ホバーで展開）
- アクティブページはアンバー色でハイライト
- カラーテーマ: stone（ダーク系）+ amber（アクセント）

### 3.2 トップページ（`/`）

```
┌──────────────────────────────────────┐
│         🎯 アイコン                    │
│   TheHunter: CoTW                    │
│   バックパックシミュレーター            │
│   （説明文）                           │
├──────────────────────────────────────┤
│ ★ 重量シミュレータ        [開く →]   │
│   （説明）                            │
├──────────────────────────────────────┤
│ 銃器一覧               [開く →]      │
│  [ライフル] [ショットガン] [ハンドガン] [弓] │
├──────────────────────────────────────┤
│ アイテム一覧            [開く →]     │
│  [呼び笛] [匂い] [装備] [構造物]      │
└──────────────────────────────────────┘
```

### 3.3 銃器一覧ページ（`/firearms/rifles` など）

```
┌──────────────────────────────────────┐
│ ライフル一覧                          │
│ [🔍 検索ボックス                    ] │
├─────────────┬──────────┬────────────┤
│ 名前         │ 種類      │ 重量  │    │
├─────────────┼──────────┼────────────┤
│ .30-06 ...  │ ライフル  │ 3.00kg│詳細→│
│ ...         │ ...      │ ...   │詳細→│
└─────────────┴──────────┴────────────┘
  N 件
```

### 3.4 銃器詳細ページ（`/firearms/rifles/[id]`）

```
┌──────────────────────────────────────┐
│ ← ライフル一覧                        │
├──────────────────────────────────────┤
│ [銃器名]                              │
│ 重量: X.XX kg                         │
│ （説明文）                             │
├──────────────────────────────────────┤
│ 対応弾薬・矢                           │
├──────────┬──────────────┬────────────┤
│ 弾薬名    │ 適正クラス    │ 重量        │
├──────────┼──────────────┼────────────┤
│ .30-06   │ クラス 4–8   │ 0.10 kg    │
└──────────┴──────────────┴────────────┘
```

### 3.5 重量シミュレータ（`/simulator`）

```
┌──────────────────────────────────────────────────────────┐
│ 重量シミュレータ                                           │
├──────────────────────────────────────────────────────────┤
│ 狩猟区: [ドロップダウン▼]  出没動物: [バッジ一覧]           │
├────────────────────────────┬─────────────────────────────┤
│ アイテムリスト              │ 装備中アイテム               │
│ [🔍検索] [カテゴリ▼]       │ 重量: X.XX / XX.XX kg ████  │
│ ┌──────────────────┐       │ ─────────────────────────── │
│ │ アイテム名  カテゴリ X.XXkg│ │ 荷運びラバ        [toggle]│
│ │ （ドラッグ可）    │       │ ─────────────────────────── │
│ │ ...               │       │ バックパック                 │
│ └──────────────────┘       │ [なし][小+3][中+6][大+9]    │
│  （スクロール可）            │ ─────────────────────────── │
│                             │ ┌─ ドロップゾーン ─────────┐│
│                             │ │ アイテム名       X.XX kg [×]││
│                             │ │ ...                      ││
│                             │ └─────────────────────────┘│
│                             │ ─────────────────────────── │
│                             │ [シミュレーション名         ] │
│                             │ [💾 保存してURLを発行       ] │
│                             │ 共有URL: https://...        │
└────────────────────────────┴─────────────────────────────┘
```

---

## 4. データベース設計

### 4.1 ER図（概念）

```
firearms ──── firearm_ammo ──── ammo
  │
  └─ type: rifle | shotgun | handgun | bow

items
  └─ category: call | scent | equipment | structure | backpack

hunting_areas ──── area_animals ──── animals

simulations
  └─ selected_items: JSONB [{type, id, quantity}]
  └─ backpack_item_id → items(id)
```

### 4.2 テーブル定義

#### firearms（銃器）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 主キー |
| name | TEXT | NOT NULL | 銃器名 |
| type | TEXT | NOT NULL, CHECK | rifle / shotgun / handgun / bow |
| weight | DECIMAL(5,2) | NOT NULL | 重量（kg） |
| description | TEXT | — | 説明文 |
| image_url | TEXT | — | 画像URL（将来用） |

#### ammo（弾薬・矢）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PK | 主キー |
| name | TEXT | NOT NULL | 弾薬名 |
| weight | DECIMAL(5,2) | NOT NULL | 重量（kg） |
| class_min | INTEGER | — | 適正クラス最小値 |
| class_max | INTEGER | — | 適正クラス最大値 |
| description | TEXT | — | 説明文 |

#### firearm_ammo（銃器-弾薬対応）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| firearm_id | UUID | PK, FK→firearms | 銃器ID |
| ammo_id | UUID | PK, FK→ammo | 弾薬ID |

#### items（アイテム）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PK | 主キー |
| name | TEXT | NOT NULL | アイテム名 |
| category | TEXT | NOT NULL, CHECK | call / scent / equipment / structure / backpack |
| weight | DECIMAL(5,2) | NOT NULL | 重量（kg） |
| weight_bonus | DECIMAL(5,2) | DEFAULT 0 | 所持重量増加量（バックパックのみ使用） |
| description | TEXT | — | 説明文 |
| image_url | TEXT | — | 画像URL（将来用） |
| target_animals | TEXT | — | 効果対象動物（call / scent） |
| effective_distance | INTEGER | — | 有効距離・m（call / scent） |
| attraction | INTEGER | — | 誘引率（call / scent） |
| effective_duration | INTEGER | — | 効果時間・秒（call / scent） |
| price | INTEGER | — | 価格（call / scent / equipment） |
| unlock_level | INTEGER | — | 解除レベル（call / scent / equipment） |
| item_type | TEXT | — | サブカテゴリ（equipment：双眼鏡 / その他） |
| reduces_hunting_pressure | BOOLEAN | — | 狩猟圧軽減フラグ（structure） |
| concealment_rate | INTEGER | — | 隠蔽率・%（structure） |
| max_installations | INTEGER | — | 最大設置数（structure） |
| disturbance_radius | INTEGER | — | 妨害半径・m（structure） |

#### hunting_areas（狩猟区）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PK | 主キー |
| name | TEXT | NOT NULL | 狩猟区名 |
| description | TEXT | — | 説明文 |

#### animals（動物）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PK | 主キー |
| name | TEXT | NOT NULL | 動物名 |
| level_min | INTEGER | NOT NULL | 適正狩猟クラス最小値 |
| level_max | INTEGER | NOT NULL | 適正狩猟クラス最大値 |

#### area_animals（狩猟区-動物対応）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| area_id | UUID | PK, FK→hunting_areas | 狩猟区ID |
| animal_id | UUID | PK, FK→animals | 動物ID |

#### simulations（保存済みシミュレーション）

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 主キー・共有URL用 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 保存日時 |
| name | TEXT | — | シミュレーション名（任意） |
| pack_mule | BOOLEAN | DEFAULT FALSE | 荷運びラバスキルON/OFF |
| backpack_item_id | UUID | FK→items | 選択バックパックID |
| selected_items | JSONB | NOT NULL | 装備アイテム一覧 |
| total_weight | DECIMAL(5,2) | NOT NULL | 合計重量 |
| capacity | DECIMAL(5,2) | NOT NULL | 保存時の容量上限 |

`selected_items` の JSONB 構造:
```json
[
  { "type": "firearm", "id": "uuid", "quantity": 1 },
  { "type": "ammo",    "id": "uuid", "quantity": 1 },
  { "type": "item",    "id": "uuid", "quantity": 1 }
]
```

### 4.3 Row Level Security ポリシー

| テーブル | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| firearms | 全員許可 | 不可 | 不可 | 不可 |
| ammo | 全員許可 | 不可 | 不可 | 不可 |
| firearm_ammo | 全員許可 | 不可 | 不可 | 不可 |
| items | 全員許可 | 不可 | 不可 | 不可 |
| hunting_areas | 全員許可 | 不可 | 不可 | 不可 |
| animals | 全員許可 | 不可 | 不可 | 不可 |
| area_animals | 全員許可 | 不可 | 不可 | 不可 |
| simulations | 全員許可 | 全員許可 | 不可 | 不可 |

---

## 5. コンポーネント設計

### 5.1 Server Components（DBアクセス担当）

| コンポーネント | ファイル | 役割 |
|---|---|---|
| RootLayout | `app/layout.tsx` | フォント・ナビ・TooltipProvider の配置 |
| RiflesPage | `app/firearms/rifles/page.tsx` | ライフル一覧をDBから取得して FirearmTable へ渡す |
| RifleDetailPage | `app/firearms/rifles/[id]/page.tsx` | 銃器+弾薬をDBから取得して FirearmDetail へ渡す |
| SimulatorPage | `app/simulator/page.tsx` | 全マスタデータをDBから取得して SimulatorClient へ渡す |
| SavedSimulationPage | `app/simulator/[id]/page.tsx` | 保存済みシミュレーションをDBから復元して表示 |

### 5.2 Client Components（インタラクション担当）

| コンポーネント | ファイル | 役割 |
|---|---|---|
| Navigation | `components/navigation.tsx` | ドロップダウンナビ。usePathname でアクティブ管理 |
| FirearmTable | `components/firearm-table.tsx` | テキスト検索フィルタ付き銃器テーブル |
| ItemTable | `components/item-table.tsx` | テキスト検索フィルタ付きアイテムテーブル |
| SimulatorClient | `app/simulator/simulator-client.tsx` | シミュレータのすべてのインタラクションを管理 |

### 5.3 SimulatorClient の状態管理

```
SimulatorClient
  ├── search: string               検索ワード
  ├── filterCategory: string       カテゴリフィルタ
  ├── equipped: SlotItem[]         装備中アイテム一覧
  ├── backpackId: string | null    選択中バックパックID
  ├── packMule: boolean            荷運びラバON/OFF
  ├── selectedAreaId: string|null  選択中狩猟区ID
  ├── activeId: string | null      ドラッグ中アイテムID
  ├── saveState: idle|saving|saved 保存状態
  ├── savedUrl: string | null      発行済みURL
  └── simName: string              シミュレーション名
```

---

## 6. ロジック設計

### 6.1 重量計算（`src/lib/weight.ts`）

```
BASE_CAPACITY = 20
PACK_MULE_MULTIPLIER = 1.15

calculateCapacity(packMule, backpackBonus):
  base = packMule ? BASE_CAPACITY × 1.15 : BASE_CAPACITY
  return base + backpackBonus
```

| 条件 | 計算式 | 結果 |
|---|---|---|
| デフォルト | 20 + 0 | 20.00 kg |
| バックパック大 | 20 + 9 | 29.00 kg |
| 荷運びラバのみ | 20×1.15 + 0 | 23.00 kg |
| 荷運びラバ + バックパック大 | 20×1.15 + 9 | 32.00 kg |

### 6.2 ドラッグ&ドロップフロー

```
1. ユーザーがアイテムカードをドラッグ開始
   → handleDragStart: activeId にアイテムIDをセット
   → DragOverlay でドラッグ中アイテムを浮遊表示

2. DropZone（equipped エリア）にドロップ
   → handleDragEnd: e.over.id === "equipped" を確認
   → equipped 配列に SlotItem を追加
   → totalWeight を再計算

3. アイテム削除
   → removeEquipped(index): equipped[index] を除外

4. 一括クリア
   → setEquipped([])
```

### 6.3 シミュレーション保存フロー

```
1. 「保存してURLを発行」ボタン押下
2. saveState → "saving"
3. equipped を SimulationItem[] に変換
4. supabase.from("simulations").insert({...}).select("id").single()
5. 成功: savedUrl = "/simulator/{id}", saveState → "saved"
6. 失敗: saveState → "idle"（エラー表示なし・再試行可）
```

---

## 7. 環境変数

| 変数名 | 説明 | 例 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトのAPI URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabaseの公開キー（publishable） | `sb_publishable_...` |

- `NEXT_PUBLIC_` プレフィックスによりブラウザからも参照可能
- `.env.local` はGit管理外（`.gitignore` 対象）
- 環境変数が未設定またはURLでない場合、ビルド時はフォールバック URL を使用しエラーを防ぐ

---

## 8. セキュリティ設計

| 対策 | 内容 |
|---|---|
| RLS | 全テーブルにRow Level Securityを適用し、anon キーでの書き込みを制限 |
| 公開キーのみ使用 | `anon`（publishable）キーのみ使用。`service_role`（secret）キーはサーバー専用 |
| XSS対策 | Next.jsのJSXエスケープにより自動対策済み |
| SQLインジェクション | Supabase JS Clientのパラメータバインドにより対策済み |
| simulations書き込み | INSERT のみ許可。UPDATE・DELETE は不可（保存後の改ざん不可） |
