"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, X, Save, Check, Trash2 } from "lucide-react";
import type { Firearm, Ammo, Item, HuntingArea, AreaAnimal, Animal } from "@/lib/database.types";
import { calculateCapacity } from "@/lib/weight";
import { supabase } from "@/lib/supabase";

type SlotItem =
  | { kind: "firearm"; data: Firearm }
  | { kind: "ammo"; data: Ammo }
  | { kind: "item"; data: Item };

interface Props {
  firearms: Firearm[];
  ammo: Ammo[];
  items: Item[];
  areas: HuntingArea[];
  areaAnimals: AreaAnimal[];
  animals: Animal[];
}

const FIREARM_TYPE_LABEL: Record<string, string> = {
  rifle: "ライフル",
  shotgun: "ショットガン",
  handgun: "ハンドガン",
  bow: "弓",
};

const ITEM_CATEGORY_LABEL: Record<string, string> = {
  call: "呼び笛",
  scent: "匂い",
  equipment: "装備",
  structure: "構造物",
  backpack: "バックパック",
};

function DraggableCard({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
    >
      {children}
    </div>
  );
}

function DropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: "equipped" });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-32 rounded-lg border-2 border-dashed transition-colors p-2 ${
        isOver ? "border-amber-500 bg-amber-950/20" : "border-stone-700"
      }`}
    >
      {children}
    </div>
  );
}

function ItemCard({ label, weight, description, badge }: {
  label: string;
  weight: number;
  description: string | null;
  badge?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className="w-full text-left">
        <div className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm select-none">
          <div className="flex items-center justify-between gap-2">
            <span className="text-stone-100 truncate">{label}</span>
            <div className="flex items-center gap-2 shrink-0">
              {badge && (
                <Badge variant="outline" className="border-stone-600 text-stone-400 text-xs">
                  {badge}
                </Badge>
              )}
              <span className="text-amber-400 text-xs">{weight} kg</span>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      {description && (
        <TooltipContent side="right" className="max-w-xs bg-stone-800 border-stone-600 text-stone-200">
          <p className="text-xs leading-relaxed">{description}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}

export function SimulatorClient({ firearms, ammo, items, areas, areaAnimals, animals }: Props) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [equipped, setEquipped] = useState<SlotItem[]>([]);
  const [backpackId, setBackpackId] = useState<string | null>(null);
  const [packMule, setPackMule] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [simName, setSimName] = useState("");

  const backpacks = items.filter((i) => i.category === "backpack");
  const selectedBackpack = backpacks.find((b) => b.id === backpackId) ?? null;
  const backpackBonus = selectedBackpack?.weight_bonus ?? 0;
  const capacity = calculateCapacity(packMule, backpackBonus);

  const totalWeight = equipped.reduce((sum, slot) => sum + slot.data.weight, 0);
  const overWeight = totalWeight > capacity;

  const areaAnimalIds = selectedAreaId
    ? areaAnimals.filter((aa) => aa.area_id === selectedAreaId).map((aa) => aa.animal_id)
    : [];
  const areaAnimalsFiltered = animals.filter((a) => areaAnimalIds.includes(a.id));

  const allItems: SlotItem[] = [
    ...firearms.map((f): SlotItem => ({ kind: "firearm", data: f })),
    ...ammo.map((a): SlotItem => ({ kind: "ammo", data: a })),
    ...items.filter((i) => i.category !== "backpack").map((i): SlotItem => ({ kind: "item", data: i })),
  ];

  const filtered = allItems.filter((slot) => {
    const name = slot.data.name.toLowerCase();
    if (!name.includes(search.toLowerCase())) return false;
    if (filterCategory === "all") return true;
    if (filterCategory === "firearm") return slot.kind === "firearm";
    if (filterCategory === "ammo") return slot.kind === "ammo";
    if (slot.kind === "item") return slot.data.category === filterCategory;
    return false;
  });

  function getBadge(slot: SlotItem): string | undefined {
    if (slot.kind === "firearm") return FIREARM_TYPE_LABEL[slot.data.type];
    if (slot.kind === "ammo") {
      const a = slot.data as Ammo;
      if (a.class_min != null && a.class_max != null)
        return `Cl.${a.class_min}-${a.class_max}`;
    }
    if (slot.kind === "item") return ITEM_CATEGORY_LABEL[slot.data.category];
    return undefined;
  }

  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  }, []);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    setActiveId(null);
    if (e.over?.id === "equipped") {
      const id = String(e.active.id);
      const slot = allItems.find((s) => s.data.id === id);
      if (slot) {
        setEquipped((prev) => [...prev, slot]);
      }
    }
  }, [allItems]);

  function removeEquipped(index: number) {
    setEquipped((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaveState("saving");
    const selectedItems = equipped.map((s) => ({
      type: s.kind === "ammo" ? "ammo" : s.kind === "firearm" ? "firearm" : "item",
      id: s.data.id,
      quantity: 1,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("simulations")
      .insert({
        name: simName || null,
        pack_mule: packMule,
        backpack_item_id: backpackId,
        selected_items: selectedItems,
        total_weight: totalWeight,
        capacity,
      })
      .select("id")
      .single() as { data: { id: string } | null; error: unknown };

    if (!error && data) {
      setSavedUrl(`/simulator/${data.id}`);
      setSaveState("saved");
    } else {
      setSaveState("idle");
    }
  }

  const activeSlot = activeId ? allItems.find((s) => s.data.id === activeId) : null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">重量シミュレータ</h1>

        {/* Hunting area selector */}
        <div className="mb-6 p-4 bg-stone-900 border border-stone-700 rounded-xl">
          <div className="flex flex-wrap items-start gap-6">
            <div className="min-w-48">
              <label className="text-xs text-stone-400 block mb-2">狩猟区を選択</label>
              <select
                className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded px-3 py-2 text-sm"
                value={selectedAreaId ?? ""}
                onChange={(e) => setSelectedAreaId(e.target.value || null)}
              >
                <option value="">-- 狩猟区を選択 --</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            </div>
            {selectedAreaId && areaAnimalsFiltered.length > 0 && (
              <div>
                <p className="text-xs text-stone-400 mb-2">出没動物と適正クラス</p>
                <div className="flex flex-wrap gap-2">
                  {areaAnimalsFiltered.map((a) => (
                    <Badge
                      key={a.id}
                      variant="outline"
                      className="border-stone-600 text-stone-300 text-xs"
                    >
                      {a.name} <span className="text-amber-400 ml-1">Cl.{a.level_min}-{a.level_max}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left panel: item list */}
          <div className="flex-1 min-w-0">
            <div className="bg-stone-900 border border-stone-700 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-stone-300 mb-3">
                アイテムリスト <span className="text-stone-500 font-normal">（ドラッグして右パネルへ追加）</span>
              </h2>
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                  <Input
                    placeholder="検索..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500"
                  />
                </div>
                <select
                  className="bg-stone-800 border border-stone-700 text-stone-300 rounded px-3 text-sm"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">すべて</option>
                  <option value="firearm">銃器</option>
                  <option value="ammo">弾薬</option>
                  <option value="call">呼び笛</option>
                  <option value="scent">匂い</option>
                  <option value="equipment">装備</option>
                  <option value="structure">構造物</option>
                </select>
              </div>
              <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {filtered.map((slot) => (
                  <DraggableCard key={slot.data.id} id={slot.data.id}>
                    <ItemCard
                      label={slot.data.name}
                      weight={slot.data.weight}
                      description={slot.data.description}
                      badge={getBadge(slot)}
                    />
                  </DraggableCard>
                ))}
                {filtered.length === 0 && (
                  <p className="text-stone-600 text-sm text-center py-8">
                    該当するアイテムがありません
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right panel: equipped */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-stone-900 border border-stone-700 rounded-xl p-4 sticky top-20">
              <h2 className="text-sm font-semibold text-stone-300 mb-3">装備中アイテム</h2>

              {/* Weight bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-stone-400">重量</span>
                  <span className={`text-sm font-bold ${overWeight ? "text-red-400" : "text-amber-400"}`}>
                    {totalWeight.toFixed(2)} / {capacity.toFixed(2)} kg
                  </span>
                </div>
                <Progress
                  value={Math.min((totalWeight / capacity) * 100, 100)}
                  className={`h-2 ${overWeight ? "[&>div]:bg-red-500" : "[&>div]:bg-amber-500"}`}
                />
                {overWeight && (
                  <p className="text-xs text-red-400 mt-1">重量超過！</p>
                )}
              </div>

              {/* Pack Mule toggle */}
              <div className="flex items-center justify-between mb-3 py-2 border-t border-stone-800">
                <div>
                  <p className="text-sm text-stone-300">荷運びラバ</p>
                  <p className="text-xs text-stone-500">基本容量+15%（{(20 * 1.15).toFixed(1)}kg）</p>
                </div>
                <button
                  onClick={() => setPackMule((v) => !v)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${packMule ? "bg-amber-500" : "bg-stone-700"}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${packMule ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>

              {/* Backpack selector */}
              <div className="mb-4 border-t border-stone-800 pt-3">
                <label className="text-xs text-stone-400 block mb-2">バックパック</label>
                <div className="grid grid-cols-4 gap-1">
                  <button
                    onClick={() => setBackpackId(null)}
                    className={`px-2 py-1.5 rounded text-xs transition-colors ${!backpackId ? "bg-amber-600 text-white" : "bg-stone-800 text-stone-400 hover:bg-stone-700"}`}
                  >
                    なし
                  </button>
                  {backpacks.map((bp) => (
                    <button
                      key={bp.id}
                      onClick={() => setBackpackId(bp.id)}
                      className={`px-2 py-1.5 rounded text-xs transition-colors ${backpackId === bp.id ? "bg-amber-600 text-white" : "bg-stone-800 text-stone-400 hover:bg-stone-700"}`}
                    >
                      {bp.name.includes("小") ? "小(+3)" : bp.name.includes("中") ? "中(+6)" : "大(+9)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop zone */}
              <DropZone>
                {equipped.length === 0 ? (
                  <p className="text-stone-600 text-sm text-center py-6">
                    ここにドラッグ&ドロップ
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {equipped.map((slot, i) => (
                      <div key={`${slot.data.id}-${i}`} className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-stone-100 truncate">{slot.data.name}</span>
                            <span className="text-amber-400 text-xs shrink-0 ml-2">{slot.data.weight} kg</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeEquipped(i)}
                          className="text-stone-600 hover:text-red-400 transition-colors shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </DropZone>

              {/* Clear & Save buttons */}
              <div className="mt-4 border-t border-stone-800 pt-4 space-y-3">
                <button
                  onClick={() => setEquipped([])}
                  className="flex items-center gap-2 text-xs text-stone-500 hover:text-stone-300 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  すべてクリア
                </button>
                <Input
                  placeholder="シミュレーション名（任意）"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm"
                />
                <button
                  onClick={handleSave}
                  disabled={saveState === "saving" || equipped.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:text-stone-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {saveState === "saved" ? (
                    <><Check className="w-4 h-4" /> 保存済み</>
                  ) : (
                    <><Save className="w-4 h-4" /> 保存してURLを発行</>
                  )}
                </button>
                {savedUrl && (
                  <div className="text-xs text-stone-400 break-all">
                    共有URL:{" "}
                    <a
                      href={savedUrl}
                      className="text-amber-400 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {typeof window !== "undefined" ? window.location.origin : ""}{savedUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeSlot && (
          <div className="px-3 py-2 bg-stone-700 border border-amber-500 rounded-lg text-sm text-stone-100 shadow-xl opacity-90">
            {activeSlot.data.name} — {activeSlot.data.weight} kg
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
