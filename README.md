# TheHunter: Call of the Wild バックパックシミュレーター

「The Hunter: Call of the Wild」の携行装備重量をシミュレーションするWebアプリ。
銃器・弾薬・アイテム情報の参照、重量計算、URLによるシミュレーション共有が可能。

## 主な機能

- **重量シミュレーター**: 銃器・弾薬・アイテムをドラッグ&ドロップで装備し、合計重量をリアルタイム計算
- **銃器データベース**: ライフル・ショットガン・ハンドガン・弓の一覧と対応弾薬
- **アイテムデータベース**: 呼び笛・匂いアイテム・装備・構造物の一覧
- **シミュレーション共有**: 装備構成をURLで保存・共有（ログイン不要）

## 技術スタック

| 役割 | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS + shadcn/ui (Radix UI) |
| ドラッグ&ドロップ | @dnd-kit/core |
| データベース | Supabase (PostgreSQL) |

## セットアップ

詳細は [SETUP.md](./SETUP.md) を参照。

```bash
npm install
npm run dev
```

`http://localhost:3000` でアクセス。

## ディレクトリ構成

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # トップページ
│   ├── firearms/                 # 銃器一覧・詳細
│   ├── items/                    # アイテム一覧（呼び笛/匂い/装備/構造物）
│   └── simulator/                # 重量シミュレータ・保存済み閲覧
├── components/
│   ├── navigation.tsx            # グローバルナビゲーション
│   ├── firearm-table.tsx         # 銃器一覧テーブル
│   ├── firearm-detail.tsx        # 銃器詳細
│   ├── item-table.tsx            # アイテム一覧テーブル
│   └── ui/                       # shadcn/ui コンポーネント
└── lib/
    ├── supabase.ts               # Supabase クライアント
    ├── database.types.ts         # DB 型定義
    ├── firearms.ts               # 銃器データ取得ユーティリティ
    └── weight.ts                 # 重量計算ロジック
supabase/
├── schema.sql                    # テーブル定義
├── migrations/                   # スキーマ追加マイグレーション
├── seed.sql                      # 初期データ
└── rls.sql                       # Row Level Security ポリシー
docs/
├── requirements.md               # 要件定義書
├── basic-design.md               # 基本設計書
└── detailed-design/              # 詳細設計書（画面別）
```

## データソース

ゲームデータは以下 wiki を参照:  
https://w.atwiki.jp/thehunter_cotw/
