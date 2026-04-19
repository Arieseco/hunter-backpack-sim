"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import { Search, Save, Check, X, Package, Weight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { calculateCapacity } from "@/lib/weight"
import {
  type Firearm,
  type Ammo,
  type Item,
  type HuntingArea,
  type Animal,
  type AreaAnimal,
  type FirearmAmmo,
  FIREARM_TYPE_LABEL,
  ITEM_CATEGORY_LABEL,
} from "@/lib/database.types"
import { supabase } from "@/lib/supabase"

// 判別共用体型
type SlotItem =
  | { kind: "firearm"; data: Firearm }
  | { kind: "ammo"; data: Ammo }
  | { kind: "item"; data: Item }

interface SimulatorClientProps {
  firearms: Firearm[]
  ammo: Ammo[]
  items: Item[]
  areas: HuntingArea[]
  areaAnimals: AreaAnimal[]
  animals: Animal[]
  firearmAmmo: FirearmAmmo[]
}

// カテゴリフィルタのオプション（弾薬は動的に追加）
const BASE_FILTER_OPTIONS = [
  { value: "all", label: "すべて" },
  { value: "firearm", label: "銃器" },
  { value: "call", label: "呼び笛" },
  { value: "scent", label: "匂い消し" },
  { value: "equipment", label: "装備品" },
  { value: "structure", label: "構造物" },
]

const AMMO_FILTER_OPTION = { value: "ammo", label: "弾薬" }

export function SimulatorClient({
  firearms,
  ammo,
  items,
  areas,
  areaAnimals,
  animals,
  firearmAmmo,
}: SimulatorClientProps) {
  // 状態
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [equipped, setEquipped] = useState<SlotItem[]>([])
  const [backpackId, setBackpackId] = useState<string | null>(null)
  const [packMule, setPackMule] = useState(false)
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle")
  const [savedUrl, setSavedUrl] = useState<string | null>(null)
  const [simName, setSimName] = useState("")

  // 派生値
  const backpacks = items.filter((i) => i.category === "backpack")
  const selectedBackpack = backpacks.find((b) => b.id === backpackId)
  const backpackBonus = selectedBackpack?.weight_bonus ?? 0
  const capacity = calculateCapacity(packMule, backpackBonus)
  const totalWeight = equipped.reduce((sum, s) => sum + s.data.weight, 0)
  const overWeight = totalWeight > capacity
  const progressValue = Math.min((totalWeight / capacity) * 100, 100)

  // 選択狩猟区の動物一覧
  const areaAnimalIds = areaAnimals
    .filter((aa) => aa.area_id === selectedAreaId)
    .map((aa) => aa.animal_id)
  const areaAnimalsFiltered = animals.filter((a) => areaAnimalIds.includes(a.id))

  // 狩猟適正レベル（その狩猟区の動物のクラス範囲）
  const huntingClassRange = useMemo(() => {
    if (areaAnimalsFiltered.length === 0) return null
    const minClass = Math.min(...areaAnimalsFiltered.map((a) => a.level_min))
    const maxClass = Math.max(...areaAnimalsFiltered.map((a) => a.level_max))
    return { min: minClass, max: maxClass }
  }, [areaAnimalsFiltered])

  // アイテムリスト（バックパック除く）
  const allItems: SlotItem[] = [
    ...firearms.map((f) => ({ kind: "firearm" as const, data: f })),
    ...ammo.map((a) => ({ kind: "ammo" as const, data: a })),
    ...items
      .filter((i) => i.category !== "backpack")
      .map((i) => ({ kind: "item" as const, data: i })),
  ]

  // 装備済みアイテムのIDセット
  const equippedIds = new Set(equipped.map((slot) => slot.data.id))

  // 装備中の銃器ID一覧
  const equippedFirearmIds = equipped
    .filter((slot) => slot.kind === "firearm")
    .map((slot) => slot.data.id)

  // 装備中の銃器に対応する弾薬ID一覧
  const availableAmmoIds = new Set(
    firearmAmmo
      .filter((fa) => equippedFirearmIds.includes(fa.firearm_id))
      .map((fa) => fa.ammo_id)
  )

  // 装備中の弾薬ID一覧
  const equippedAmmoIds = useMemo(() => {
    return equipped.filter((slot) => slot.kind === "ammo").map((slot) => slot.data.id)
  }, [equipped])

  // 装備中の弾薬から対応クラス範囲を計算
  const equippedClassRanges = useMemo(() => {
    const equippedAmmoList = ammo.filter((a) => equippedAmmoIds.includes(a.id))
    if (equippedAmmoList.length === 0) return []
    return equippedAmmoList.map((a) => ({ min: a.class_min, max: a.class_max }))
  }, [ammo, equippedAmmoIds])

  // 動物が狩猟可能かチェック（装備中の弾薬のクラス範囲内にあるか）
  const isAnimalHuntable = useCallback(
    (animal: Animal): boolean => {
      if (equippedClassRanges.length === 0) return false
      return equippedClassRanges.some(
        (range) => range.min !== null && range.max !== null &&
          range.min <= animal.level_max && range.max >= animal.level_min
      )
    },
    [equippedClassRanges]
  )

  // 全ての出現動物が狩猟可能かチェック
  const allAnimalsHuntable = useMemo(() => {
    if (areaAnimalsFiltered.length === 0) return false
    return areaAnimalsFiltered.every((animal) => isAnimalHuntable(animal))
  }, [areaAnimalsFiltered, isAnimalHuntable])

  // 銃器が装備されている場合のみ弾薬フィルタを表示
  const hasEquippedFirearms = equippedFirearmIds.length > 0
  const filterOptions = hasEquippedFirearms
    ? [
        BASE_FILTER_OPTIONS[0], // all
        BASE_FILTER_OPTIONS[1], // firearm
        AMMO_FILTER_OPTION,     // ammo
        ...BASE_FILTER_OPTIONS.slice(2),
      ]
    : BASE_FILTER_OPTIONS

  // 銃器がなくなったら弾薬フィルタをリセット
  useEffect(() => {
    if (!hasEquippedFirearms && filterCategory === "ammo") {
      setFilterCategory("all")
    }
  }, [hasEquippedFirearms, filterCategory])

  // フィルタ適用
  const filtered = allItems.filter((slot) => {
    // 既に装備中のアイテムは除外
    if (equippedIds.has(slot.data.id)) return false

    // 弾薬は装備中の銃器に対応するもののみ表示
    if (slot.kind === "ammo") {
      if (!availableAmmoIds.has(slot.data.id)) return false
    }

    // 検索フィルタ
    const matchSearch = slot.data.name.toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false

    // カテゴリフィルタ
    if (filterCategory === "all") return true
    if (filterCategory === "firearm") return slot.kind === "firearm"
    if (filterCategory === "ammo") return slot.kind === "ammo"
    if (slot.kind === "item") {
      return slot.data.category === filterCategory
    }
    return false
  })

  // バッジラベル取得
  const getBadge = (slot: SlotItem): string | undefined => {
    if (slot.kind === "firearm") {
      return FIREARM_TYPE_LABEL[slot.data.type]
    }
    if (slot.kind === "ammo") {
      if (slot.data.class_min !== null && slot.data.class_max !== null) {
        return `Cl.${slot.data.class_min}-${slot.data.class_max}`
      }
      return undefined
    }
    if (slot.kind === "item") {
      return ITEM_CATEGORY_LABEL[slot.data.category]
    }
    return undefined
  }

  // ドラッグ開始
  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(String(e.active.id))
  }, [])

  // ドラッグ終了
  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveId(null)
      if (e.over?.id === "equipped") {
        const slot = allItems.find((s) => s.data.id === String(e.active.id))
        if (slot) {
          setEquipped((prev) => [...prev, slot])
        }
      }
    },
    [allItems]
  )

  // 装備追加（タップ用）
  const addEquipped = useCallback((slot: SlotItem) => {
    console.log("[v0] addEquipped called:", { kind: slot.kind, id: slot.data.id, name: slot.data.name })
    setEquipped((prev) => {
      const newEquipped = [...prev, slot]
      console.log("[v0] newEquipped:", newEquipped.map(s => ({ kind: s.kind, id: s.data.id, name: s.data.name })))
      return newEquipped
    })
  }, [])

  // 装備解除
  const removeEquipped = (index: number) => {
    setEquipped((prev) => prev.filter((_, i) => i !== index))
  }

  // 保存処理
  const handleSave = async () => {
    setSaveState("saving")
    try {
      const selectedItems = equipped.map((slot) => ({
        type: slot.kind,
        id: slot.data.id,
        quantity: 1,
      }))

      const { data, error } = (await (supabase as unknown as { from: (table: string) => { insert: (data: object) => { select: (columns: string) => { single: () => Promise<{ data: { id: string } | null; error: unknown }> } } } })
        .from("simulations")
        .insert({
          name: simName || null,
          pack_mule: packMule,
          backpack_item_id: backpackId,
          selected_items: selectedItems,
          total_weight: totalWeight,
          capacity: capacity,
        })
        .select("id")
        .single()) as { data: { id: string } | null; error: unknown }

      if (error || !data) {
        setSaveState("idle")
        return
      }

      setSavedUrl(`${window.location.origin}/simulator/${data.id}`)
      setSaveState("saved")
    } catch {
      setSaveState("idle")
    }
  }

  // アクティブなスロットアイテム（DragOverlay用）
  const activeSlot = activeId ? allItems.find((s) => s.data.id === activeId) : null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          重量シミュレータ
        </h1>
        <p className="text-muted-foreground mb-8">
          装備をタップまたはドラッグ&ドロップで追加し、合計重量を確認できます
        </p>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左: アイテムリスト */}
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Package className="size-5" />
                    アイテム一覧
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 検索・フィルタ */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        placeholder="アイテムを検索..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-background border-border"
                      />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-full sm:w-[140px] bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* アイテムグリッド */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                    {filtered.length === 0 ? (
                      <p className="text-muted-foreground text-sm col-span-2 py-8 text-center">
                        アイテムが見つかりません
                      </p>
                    ) : (
                      filtered.map((slot) => (
                        <DraggableCard
                          key={slot.data.id}
                          id={slot.data.id}
                          onTap={() => addEquipped(slot)}
                        >
                          <ItemCard
                            label={slot.data.name}
                            weight={slot.data.weight}
                            description={
                              "description" in slot.data ? slot.data.description : null
                            }
                            badge={getBadge(slot)}
                          />
                        </DraggableCard>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 狩猟区選択 */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground">狩猟区を選択</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={selectedAreaId ?? "none"}
                    onValueChange={(v) => setSelectedAreaId(v === "none" ? null : v)}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="狩猟区を選択..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">選択なし</SelectItem>
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedAreaId && areaAnimalsFiltered.length > 0 && (
                    <div className="space-y-4">
                      {/* 狩猟適正レベル */}
                      {huntingClassRange && (
                        <div
                          className={cn(
                            "p-3 rounded-lg border transition-all",
                            allAnimalsHuntable
                              ? "bg-green-500/20 border-green-500/50"
                              : "bg-muted/30 border-border opacity-60"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm text-muted-foreground">狩猟適正レベル:</p>
                            {allAnimalsHuntable && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p
                            className={cn(
                              "text-xl font-bold",
                              allAnimalsHuntable ? "text-green-500" : "text-muted-foreground"
                            )}
                          >
                            クラス {huntingClassRange.min} - {huntingClassRange.max}
                          </p>
                        </div>
                      )}

                      {/* 出現動物 */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">出現動物:</p>
                        <div className="flex flex-wrap gap-2">
                          {areaAnimalsFiltered.map((animal) => {
                            const huntable = isAnimalHuntable(animal)
                            return (
                              <Badge
                                key={animal.id}
                                variant="secondary"
                                className={cn(
                                  "transition-all flex items-center gap-1",
                                  huntable
                                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                    : "bg-secondary/50 text-muted-foreground opacity-60"
                                )}
                              >
                                {huntable && <Check className="h-3 w-3" />}
                                {animal.name} (Lv.{animal.level_min}-{animal.level_max})
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 右: 装備中パネル */}
            <div className="space-y-4">
              {/* 設定パネル */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground">設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 荷運びラバ */}
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="pack-mule"
                      className="text-foreground flex flex-col gap-1"
                    >
                      <span>荷運びラバ</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        容量が15%増加します
                      </span>
                    </Label>
                    <Switch
                      id="pack-mule"
                      checked={packMule}
                      onCheckedChange={setPackMule}
                    />
                  </div>

                  {/* バックパック選択 */}
                  <div className="space-y-2">
                    <Label className="text-foreground">バックパック</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={backpackId === null ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setBackpackId(null)}
                        className={cn(
                          backpackId === null
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        なし
                      </Button>
                      {backpacks.map((bp) => (
                        <Button
                          key={bp.id}
                          variant={backpackId === bp.id ? "default" : "secondary"}
                          size="sm"
                          onClick={() => setBackpackId(bp.id)}
                          className={cn(
                            backpackId === bp.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {bp.name} (+{bp.weight_bonus})
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 重量表示 */}
              <Card
                className={cn(
                  "bg-card border-2 transition-colors",
                  overWeight ? "border-red-600" : "border-primary"
                )}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Weight className="size-5" />
                    重量
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <span
                        className={cn(
                          "text-4xl font-bold font-mono",
                          overWeight ? "text-red-500" : "text-primary"
                        )}
                      >
                        {totalWeight.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        / {capacity.toFixed(1)} kg
                      </span>
                    </div>
                    {overWeight && (
                      <span className="text-red-500 text-sm font-medium">
                        重量超過!
                      </span>
                    )}
                  </div>
                  <Progress
                    value={progressValue}
                    className={cn(
                      "h-3",
                      overWeight ? "[&>div]:bg-red-500" : "[&>div]:bg-primary"
                    )}
                  />
                </CardContent>
              </Card>

              {/* 装備中リスト */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground">装備中</CardTitle>
                </CardHeader>
                <CardContent>
                  <DropZone>
                    {equipped.length === 0 ? (
                      <p className="text-muted-foreground text-sm py-8 text-center border-2 border-dashed border-border rounded-lg">
                        アイテムをタップして追加
                      </p>
                    ) : (
                      <div className="space-y-2 min-h-[100px]">
                        {equipped.map((slot, index) => (
                          <div
                            key={`${slot.data.id}-${index}`}
                            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-foreground">{slot.data.name}</span>
                              {getBadge(slot) && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-border text-muted-foreground"
                                >
                                  {getBadge(slot)}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-muted-foreground font-mono text-sm">
                                {slot.data.weight.toFixed(1)} kg
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeEquipped(index)}
                                className="size-8 text-muted-foreground hover:text-red-500"
                              >
                                <X className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DropZone>
                </CardContent>
              </Card>

              {/* 保存パネル */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground">保存</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="シミュレーション名（任意）"
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    className="bg-background border-border"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={equipped.length === 0 || saveState !== "idle"}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {saveState === "saved" ? (
                      <>
                        <Check className="size-4 mr-2" />
                        保存済み
                      </>
                    ) : (
                      <>
                        <Save className="size-4 mr-2" />
                        保存してURLを発行
                      </>
                    )}
                  </Button>
                  {savedUrl && (
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">共有URL:</p>
                      <p className="text-sm text-primary break-all font-mono">{savedUrl}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* DragOverlay */}
          <DragOverlay>
            {activeSlot && (
              <div className="p-3 bg-card border-2 border-primary rounded-lg shadow-xl opacity-90">
                <span className="text-foreground">{activeSlot.data.name}</span>
                <span className="text-muted-foreground ml-2">
                  {activeSlot.data.weight.toFixed(1)} kg
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

// ドラッグ可能 & タップ可能なカード
function DraggableCard({
  id,
  children,
  onTap,
}: {
  id: string
  children: React.ReactNode
  onTap: () => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    listeners?.onPointerDown?.(e as unknown as React.PointerEvent<Element>)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartPos.current) {
      const dx = Math.abs(e.clientX - dragStartPos.current.x)
      const dy = Math.abs(e.clientY - dragStartPos.current.y)
      // 移動距離が小さければタップとみなす
      if (dx < 5 && dy < 5) {
        onTap()
      }
    }
    dragStartPos.current = null
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={cn(
        "cursor-pointer md:cursor-grab md:active:cursor-grabbing select-none touch-none",
        isDragging && "opacity-40"
      )}
    >
      {children}
    </div>
  )
}

// ドロップゾーン
function DropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: "equipped" })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "transition-colors rounded-lg",
        isOver && "bg-primary/10 ring-2 ring-primary"
      )}
    >
      {children}
    </div>
  )
}

// アイテムカード
function ItemCard({
  label,
  weight,
  description,
  badge,
}: {
  label: string
  weight: number
  description: string | null
  badge?: string
}) {
  const content = (
    <div className="p-3 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <span className="text-foreground text-sm font-medium">{label}</span>
        {badge && (
          <Badge variant="outline" className="text-xs border-primary/50 text-primary shrink-0">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground text-xs mt-1 font-mono">
        {weight.toFixed(1)} kg
      </p>
    </div>
  )

  if (description) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
