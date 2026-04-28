import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ANIMAL_ICON_MAP } from "@/lib/animal-icon-map"
import type { Animal, AnimalFur, AnimalNeedZone, FurRarity, NeedZoneBehavior } from "@/lib/database.types"

const DIFFICULTY_LABEL: Record<number, string> = {
  1: "トリビアル",
  2: "マイナー",
  3: "ベリーイージー",
  4: "イージー",
  5: "メディアム",
  6: "ハード",
  7: "ベリーハード",
  8: "ミシカル",
  9: "レジェンダリー",
  10: "フェイブル",
}

const TROPHY_TYPE_LABEL: Record<string, string> = {
  weight:        "体重",
  weight_skull:  "体重（頭蓋骨）",
  antlers_skull: "枝角（頭蓋骨）",
  tusks_skull:   "牙（頭蓋骨）",
  composite:     "複合",
}

const FUR_RARITY_LABEL: Record<FurRarity, string> = {
  common:    "普通",
  uncommon:  "やや稀",
  rare:      "稀",
  very_rare: "極めて稀",
}

const BEHAVIOR_LABEL: Record<NeedZoneBehavior, string> = {
  feeding:  "食事",
  resting:  "休憩",
  drinking: "水分補給",
}

const RARITY_COLOR: Record<FurRarity, string> = {
  common:    "text-green-600 border-green-600/50",
  uncommon:  "text-blue-500 border-blue-500/50",
  rare:      "text-purple-500 border-purple-500/50",
  very_rare: "text-red-500 border-red-500/50",
}

type NeedZoneWithArea = AnimalNeedZone & {
  hunting_areas: { name: string } | null
}

interface AnimalDetailProps {
  animal: Animal
  needZones: NeedZoneWithArea[]
  furs: AnimalFur[]
  backHref: string
}

function DataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3 flex flex-col gap-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}

function NeedZoneTable({ zones }: { zones: NeedZoneWithArea[] }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>時間</TableHead>
            <TableHead>行動</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((nz) => (
            <TableRow key={nz.id}>
              <TableCell className="tabular-nums">{nz.time_start} – {nz.time_end}</TableCell>
              <TableCell>{BEHAVIOR_LABEL[nz.behavior]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function FurTable({ furs }: { furs: AnimalFur[] }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>毛皮名</TableHead>
            <TableHead className="text-right">確率</TableHead>
            <TableHead>レア度</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {furs.map((fur) => (
            <TableRow key={fur.id}>
              <TableCell className="font-medium">{fur.fur_name}</TableCell>
              <TableCell className="text-right tabular-nums">{fur.probability.toFixed(2)}%</TableCell>
              <TableCell>
                <Badge variant="outline" className={RARITY_COLOR[fur.rarity]}>
                  {FUR_RARITY_LABEL[fur.rarity]}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function AnimalDetail({ animal, needZones, furs, backHref }: AnimalDetailProps) {
  const iconSrc = ANIMAL_ICON_MAP[animal.name]

  const classLabel =
    animal.level_min === animal.level_max
      ? `Class ${animal.level_min}`
      : `Class ${animal.level_min}–${animal.level_max}`

  const difficultyLabel =
    animal.difficulty_min != null && animal.difficulty_max != null
      ? animal.difficulty_min === animal.difficulty_max
        ? String(animal.difficulty_min)
        : `${animal.difficulty_min}–${animal.difficulty_max}`
      : "—"

  const weightLabel =
    animal.weight_min != null
      ? animal.weight_max != null && animal.weight_max !== animal.weight_min
        ? `${animal.weight_min}–${animal.weight_max} kg`
        : `${animal.weight_min} kg`
      : "—"

  // Group need zones by area name
  const areaGroups: Record<string, NeedZoneWithArea[]> = {}
  for (const nz of needZones) {
    const name = nz.hunting_areas?.name ?? "不明"
    if (!areaGroups[name]) areaGroups[name] = []
    areaGroups[name].push(nz)
  }
  const areaNames = Object.keys(areaGroups)

  const hasMaleFurs = furs.some((f) => f.gender === "male")
  const hasFemaleFurs = furs.some((f) => f.gender === "female")
  const hasCommonFurs = furs.some((f) => f.gender === null)
  const hasGenderTabs = hasMaleFurs || hasFemaleFurs

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        動物一覧
      </Link>

      {/* Header */}
      <div className="mt-6 flex items-center gap-4">
        <div
          className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0 overflow-hidden"
          style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
        >
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt={animal.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-2xl text-muted-foreground/40">?</span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{animal.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{classLabel}</Badge>
            {animal.has_great_one && (
              <Badge variant="secondary" className="text-xs">GO</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Animal image */}
      {animal.image_url && (
        <div className="mt-6 rounded-lg overflow-hidden border border-border">
          <Image
            src={animal.image_url}
            alt={animal.name}
            width={768}
            height={400}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Data grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <DataCard label="クラス" value={classLabel} />
        <DataCard label="難易度" value={difficultyLabel} />
        <DataCard label="体重" value={weightLabel} />
        <DataCard label="毛皮種類" value={furs.length > 0 ? `${furs.length} 種` : "—"} />
      </div>

      {/* Trophy */}
      {animal.trophy_type && (
        <>
          <Separator className="my-6" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            トロフィー情報
          </h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>種類</TableHead>
                  <TableHead className="text-right">Silver</TableHead>
                  <TableHead className="text-right">Gold</TableHead>
                  <TableHead className="text-right">Diamond</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {TROPHY_TYPE_LABEL[animal.trophy_type] ?? animal.trophy_type}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {animal.silver_score ?? "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {animal.gold_score ?? "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {animal.diamond_score ?? "—"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Features */}
      {animal.features && (
        <>
          <Separator className="my-6" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            特徴
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed">{animal.features}</p>
        </>
      )}

      {/* Need zones */}
      {areaNames.length > 0 && (
        <>
          <Separator className="my-6" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            ニードゾーン
          </h2>
          {areaNames.length === 1 ? (
            <NeedZoneTable zones={areaGroups[areaNames[0]]} />
          ) : (
            <Tabs defaultValue={areaNames[0]}>
              <TabsList className="h-auto flex-wrap gap-1 mb-2">
                {areaNames.map((name) => (
                  <TabsTrigger key={name} value={name} className="text-xs">
                    {name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {areaNames.map((name) => (
                <TabsContent key={name} value={name}>
                  <NeedZoneTable zones={areaGroups[name]} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </>
      )}

      {/* Furs */}
      {furs.length > 0 && (
        <>
          <Separator className="my-6" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            毛皮バリアント
          </h2>
          {!hasGenderTabs ? (
            <FurTable furs={furs} />
          ) : (
            <Tabs defaultValue={hasMaleFurs ? "male" : "female"}>
              <TabsList className="mb-2">
                {hasMaleFurs && <TabsTrigger value="male">オス</TabsTrigger>}
                {hasFemaleFurs && <TabsTrigger value="female">メス</TabsTrigger>}
                {hasCommonFurs && <TabsTrigger value="both">共通</TabsTrigger>}
              </TabsList>
              {hasMaleFurs && (
                <TabsContent value="male">
                  <FurTable furs={furs.filter((f) => f.gender === "male")} />
                </TabsContent>
              )}
              {hasFemaleFurs && (
                <TabsContent value="female">
                  <FurTable furs={furs.filter((f) => f.gender === "female")} />
                </TabsContent>
              )}
              {hasCommonFurs && (
                <TabsContent value="both">
                  <FurTable furs={furs.filter((f) => f.gender === null)} />
                </TabsContent>
              )}
            </Tabs>
          )}
        </>
      )}
    </div>
  )
}
