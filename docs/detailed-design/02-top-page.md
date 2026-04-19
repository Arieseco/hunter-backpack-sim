# 詳細設計書 02 — トップページ

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| トップページ | `src/app/page.tsx` |

---

## 2. 概要

アプリのエントリポイント。各機能画面へのナビゲーションカードを表示する。  
Server Component（DBアクセスなし）。静的レンダリング（SSG）。

---

## 3. セクション定義（`sections` 配列）

画面上に表示するカード一覧を定義した定数。

| フィールド | 型 | 説明 |
|---|---|---|
| `href` | `string` | カードクリック先URL |
| `icon` | `LucideIcon` | 表示アイコン |
| `title` | `string` | カードタイトル |
| `description` | `string` | 説明文 |
| `highlight` | `boolean?` | アンバー枠で強調表示するか |
| `children` | `{href, label}[]?` | サブページへのショートカットリンク |

| カード | highlight | children |
|---|---|---|
| 重量シミュレータ（`/simulator`） | `true` | なし |
| 銃器一覧（`/firearms`） | `false` | ライフル / ショットガン / ハンドガン / 弓 |
| アイテム一覧（`/items`） | `false` | 呼び笛 / 匂いアイテム / 装備 / 構造物 |

---

## 4. 表示仕様

### 4.1 ヘッダー部

```
[🎯 アイコン 48px]
TheHunter: CoTW
バックパックシミュレーター  ← amber色
（説明文、最大幅 lg、中央揃え）
```

### 4.2 セクションカード

```
highlight=true のカード:
  border: border-amber-600
  background: bg-amber-950/30

highlight=false のカード:
  border: border-stone-700
  background: bg-stone-900
```

カード内構造:
```
[アイコン] [タイトル]                    [開く →]
説明文
[サブリンクボタン1] [サブリンクボタン2] ...  ← children がある場合のみ
```

### 4.3 フッター

```
データ出典: The Hunter: Call of the Wild Wiki。
ゲームアップデートにより実際の数値と異なる場合があります。
```

---

## 5. 画面遷移

| 操作 | 遷移先 |
|---|---|
| 「重量シミュレータ」「開く」 | `/simulator` |
| 「銃器一覧」「開く」 | `/firearms` |
| 「ライフル」ボタン | `/firearms/rifles` |
| 「ショットガン」ボタン | `/firearms/shotguns` |
| 「ハンドガン」ボタン | `/firearms/handguns` |
| 「弓」ボタン | `/firearms/bows` |
| 「アイテム一覧」「開く」 | `/items` |
| 「呼び笛」ボタン | `/items/calls` |
| 「匂いアイテム」ボタン | `/items/scents` |
| 「装備」ボタン | `/items/equipment` |
| 「構造物」ボタン | `/items/structures` |
