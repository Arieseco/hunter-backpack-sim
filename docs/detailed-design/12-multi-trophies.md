# 詳細設計書 12 — マルチトロフィーマウント

---

## 1. 概要

The Hunter: Call of the Wild では、狩猟した動物の剥製（トロフィー）を複数組み合わせて  
**マルチトロフィーマウント**と呼ばれる特別な剥製を作成できる。  
本設計書ではそのデータを管理する2テーブルの設計を定義する。

---

## 2. テーブル設計

### 2.1 `multi_trophies` — マルチトロフィーマウント マスタ

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | 内部ID |
| `name` | TEXT | NOT NULL, UNIQUE | マルチトロフィー名称 |
| `size` | TEXT | NOT NULL, CHECK | 台座サイズ（下表参照） |
| `cost` | INTEGER | NOT NULL, CHECK (> 0) | 作成費用（ゲーム内通貨） |

**sizeの許容値（昇順）**

| 値 | 意味 |
|---|---|
| `極小` | Tiny |
| `小` | Small |
| `中` | Medium |
| `大` | Large |
| `特大` | X-Large |
| `極大` | XX-Large |

---

### 2.2 `multi_trophy_requirements` — 必要トロフィー明細

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | 内部ID |
| `multi_trophy_id` | UUID | NOT NULL, FK → multi_trophies(id) | 対象マウント |
| `animal_id` | UUID | NOT NULL, FK → animals(id) | 必要な動物 |
| `gender` | TEXT | CHECK ('male','female'), NULL可 | 性別（NULL = 指定なし） |
| `sort_order` | INTEGER | NOT NULL, DEFAULT 0 | 表示順（1始まり） |

**ユニーク制約**: `(multi_trophy_id, animal_id, gender, sort_order) NULLS NOT DISTINCT`  
→ 同一マウントに同一動物・同一性別・同一順が重複しないことを保証。

---

## 3. ER図（概略）

```
animals ─┐
         │ animal_id (FK)
         ↓
multi_trophy_requirements ──── multi_trophy_id (FK) ──→ multi_trophies
```

---

## 4. データ仕様

全 **54件** のマルチトロフィーマウントを管理する。  
必要トロフィー数は最小2件〜最大7件（退散）。

---

## 5. RLS

他テーブルと同様、全ユーザーに読み取り許可。書き込みは管理者のみ（デフォルト拒否）。

```sql
CREATE POLICY "public read multi_trophies"            ON multi_trophies            FOR SELECT USING (true);
CREATE POLICY "public read multi_trophy_requirements" ON multi_trophy_requirements FOR SELECT USING (true);
```

---

## 6. 関連ファイル

| 役割 | パス |
|---|---|
| マイグレーション | `supabase/migrations/019_add_multi_trophies.sql` |
| 表示画面（未実装） | `src/app/multi-trophies/page.tsx`（将来） |
