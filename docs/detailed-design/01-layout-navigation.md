# 詳細設計書 01 — ルートレイアウト・ナビゲーション

---

## 1. 対象ファイル

| 役割 | パス |
|---|---|
| ルートレイアウト | `src/app/layout.tsx` |
| ナビゲーション | `src/components/navigation.tsx` |

---

## 2. ルートレイアウト（`src/app/layout.tsx`）

### 2.1 概要

全ページを包むルートレイアウト。フォント・グローバルスタイル・ナビゲーション・TooltipProvider を配置する。Server Component。

### 2.2 メタデータ

| プロパティ | 値 |
|---|---|
| title | `TheHunter: CoTW バックパックシミュレーター` |
| description | `The Hunter: Call of the Wild の装備重量シミュレーター` |

### 2.3 フォント

| 設定 | 値 |
|---|---|
| フォントファミリー | Geist（Google Fonts） |
| CSS変数名 | `--font-geist-sans` |
| サブセット | latin |

### 2.4 HTML構造

```
<html lang="ja" class="[フォント変数] h-full antialiased">
  <body class="min-h-full flex flex-col bg-stone-950 text-stone-100">
    <TooltipProvider>           ← ツールチップをアプリ全体で有効化
      <Navigation />            ← グローバルナビゲーション
      <main class="flex-1">    ← ページコンテンツ領域
        {children}
      </main>
    </TooltipProvider>
  </body>
</html>
```

### 2.5 デザイントークン

| トークン | 値 | 用途 |
|---|---|---|
| bg-stone-950 | #0c0a09 | ページ背景色 |
| text-stone-100 | #f5f5f4 | デフォルト文字色 |

---

## 3. ナビゲーション（`src/components/navigation.tsx`）

### 3.1 概要

全ページ上部に固定表示されるグローバルナビゲーションバー。Client Component（`usePathname` でアクティブ状態を管理）。

### 3.2 ナビゲーション項目定義（`navItems`）

```typescript
const navItems = [
  { href: "/", label: "トップ" },
  {
    label: "銃器一覧", href: "/firearms",
    children: [
      { href: "/firearms/rifles",   label: "ライフル" },
      { href: "/firearms/shotguns", label: "ショットガン" },
      { href: "/firearms/handguns", label: "ハンドガン" },
      { href: "/firearms/bows",     label: "弓" },
    ],
  },
  {
    label: "アイテム一覧", href: "/items",
    children: [
      { href: "/items/calls",      label: "呼び笛" },
      { href: "/items/scents",     label: "匂いアイテム" },
      { href: "/items/equipment",  label: "装備" },
      { href: "/items/structures", label: "構造物" },
    ],
  },
  { href: "/simulator", label: "重量シミュレータ" },
]
```

### 3.3 状態

| 状態変数 | 型 | 初期値 | 説明 |
|---|---|---|---|
| `openMenu` | `string \| null` | `null` | 現在開いているドロップダウンの `href` |

### 3.4 関数仕様

#### アクティブ判定

```typescript
const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
```

- 完全一致または前方一致でアクティブと判断
- アクティブ時: `bg-amber-600 text-white`
- 非アクティブ時: `text-stone-300 hover:bg-stone-800`

#### ドロップダウン開閉

| イベント | 処理 |
|---|---|
| ボタン `onMouseEnter` | `setOpenMenu(item.href)` |
| ボタン `onMouseLeave` | `setOpenMenu(null)` |
| ボタン `onClick` | トグル（開いていれば閉じる） |
| メニュー `onMouseEnter` | `setOpenMenu(item.href)`（カーソルがメニューに移動しても閉じない） |
| メニュー `onMouseLeave` | `setOpenMenu(null)` |

### 3.5 レイアウト

```
<nav class="bg-stone-900 border-b border-stone-700 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">
    [ロゴ: 🎯 TheHunter Simulator]  ← sm以上で表示
    [トップ] [銃器一覧▼] [アイテム一覧▼] [重量シミュレータ]
  </div>
</nav>
```

### 3.6 ドロップダウンメニュー構造

```
<div class="relative">
  <button>銃器一覧 ▼</button>
  {openMenu === href && (
    <div class="absolute top-full left-0 mt-1 bg-stone-800 border ...">
      <Link>ライフル</Link>
      <Link>ショットガン</Link>
      ...
    </div>
  )}
</div>
```

- `z-50` で他要素より前面に表示
- 子項目が現在のパスと一致する場合は `text-amber-400 bg-stone-700` でハイライト
