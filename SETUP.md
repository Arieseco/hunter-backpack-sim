# セットアップ手順

## 1. Supabaseプロジェクトの作成

1. [supabase.com](https://supabase.com) でプロジェクトを作成
2. プロジェクトのダッシュボードから以下を取得:
   - **Project URL** (例: `https://xxxx.supabase.co`)
   - **anon/public キー**

## 2. 環境変数の設定

`.env.local` を編集:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. データベースのセットアップ

Supabaseダッシュボードの **SQL Editor** で以下を順番に実行:

1. `supabase/schema.sql` の内容を実行（テーブル作成）
2. `supabase/migrations/001_add_call_details.sql` を実行
3. `supabase/migrations/002_add_item_type.sql` を実行
4. `supabase/migrations/003_add_structure_details.sql` を実行
5. `supabase/seed.sql` の内容を実行（初期データ投入）

## 4. 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:3000` でアプリにアクセス。

## 5. 本番ビルド

```bash
npm run build
npm start
```

---

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx                  # トップページ
│   ├── firearms/
│   │   ├── page.tsx              # 銃器一覧トップ
│   │   ├── rifles/               # ライフル一覧・詳細
│   │   ├── shotguns/             # ショットガン一覧・詳細
│   │   ├── handguns/             # ハンドガン一覧・詳細
│   │   └── bows/                 # 弓一覧・詳細
│   ├── items/
│   │   ├── page.tsx              # アイテム一覧トップ
│   │   ├── calls/                # 呼び笛一覧
│   │   ├── scents/               # 匂いアイテム一覧
│   │   ├── equipment/            # 装備一覧
│   │   └── structures/           # 構造物一覧
│   └── simulator/
│       ├── page.tsx              # 重量シミュレータ
│       └── [id]/page.tsx         # 保存済みシミュレーション
├── components/
│   ├── navigation.tsx            # ナビゲーション
│   ├── firearm-table.tsx         # 銃器テーブル
│   ├── firearm-detail.tsx        # 銃器詳細
│   └── item-table.tsx            # アイテムテーブル
└── lib/
    ├── supabase.ts               # Supabaseクライアント
    ├── database.types.ts         # 型定義
    └── weight.ts                 # 重量計算ロジック
supabase/
├── schema.sql                    # テーブル定義
├── migrations/                   # スキーマ追加マイグレーション
│   ├── 001_add_call_details.sql
│   ├── 002_add_item_type.sql
│   └── 003_add_structure_details.sql
├── seed.sql                      # 初期データ
└── rls.sql                       # Row Level Security ポリシー
```
