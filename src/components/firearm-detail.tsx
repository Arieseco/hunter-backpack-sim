import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BallisticsChart } from "@/components/ballistics-chart"
import type {
  Firearm,
  Ammo,
  Scope,
  FirearmBallistics,
  BowSightDistance,
} from "@/lib/database.types"

interface FirearmDetailProps {
  firearm: Firearm
  ammoList: Ammo[]
  scopes: Scope[]
  ballistics: FirearmBallistics[]
  bowSightDistances: BowSightDistance[]
  backHref: string
  backLabel: string
}

const STATS = [
  { key: "accuracy",          label: "精度" },
  { key: "recoil",            label: "反動" },
  { key: "reload_speed",      label: "リロード速度" },
  { key: "hipfire_accuracy",  label: "腰だめ精度" },
  { key: "magazine_capacity", label: "装弾数" },
  { key: "weight",            label: "重量" },
  { key: "required_score",    label: "必要スコア" },
  { key: "price",             label: "価格" },
] as const

function statValue(key: (typeof STATS)[number]["key"], firearm: Firearm): string {
  if (key === "weight") return `${firearm.weight.toFixed(2)} kg`
  if (key === "required_score") return firearm.required_score === 0 ? "-" : String(firearm.required_score)
  if (key === "price") return firearm.price === 0 ? "-" : `${firearm.price.toLocaleString()} G`
  return String(firearm[key] ?? "-")
}

function formatBallistic(entry: FirearmBallistics | undefined): string {
  if (!entry) return "-"
  if (entry.is_out) return "OUT"
  if (entry.score === null) return "-"
  const dir = entry.direction === "up" ? "↑" : entry.direction === "down" ? "↓" : ""
  return `${entry.score}${dir}`
}

function BallisticsSection({ ballistics }: { ballistics: FirearmBallistics[] }) {
  if (ballistics.length === 0) {
    return <p className="text-sm text-muted-foreground">弾道情報なし</p>
  }

  // group by ammo_note (null → "")
  const groups = new Map<string, FirearmBallistics[]>()
  for (const row of ballistics) {
    const key = row.ammo_note ?? ""
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(row)
  }

  return (
    <div className="space-y-8">
      {Array.from(groups.entries()).map(([key, rows]) => {
        const zeros = [...new Set(rows.map((r) => r.zero_distance))].sort((a, b) => a - b)
        const ranges = [...new Set(rows.map((r) => r.range_distance))].sort((a, b) => a - b)
        const lookup = new Map(rows.map((r) => [`${r.zero_distance}-${r.range_distance}`, r]))

        return (
          <div key={key}>
            {key && (
              <p className="text-sm font-medium text-muted-foreground mb-2">{key}</p>
            )}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="whitespace-nowrap min-w-[6rem]">
                      ゼロイン / 射距(m)
                    </TableHead>
                    {ranges.map((r) => (
                      <TableHead key={r} className="text-center tabular-nums min-w-[3rem]">
                        {r}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zeros.map((z) => (
                    <TableRow key={z}>
                      <TableCell className="font-medium tabular-nums">{z}</TableCell>
                      {ranges.map((r) => {
                        const entry = lookup.get(`${z}-${r}`)
                        const text = formatBallistic(entry)
                        return (
                          <TableCell
                            key={r}
                            className={`text-center tabular-nums text-sm ${
                              entry?.is_out ? "text-destructive" : ""
                            }`}
                          >
                            {text}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6">
              <BallisticsChart
                ballistics={ballistics}
                ammoNote={key === "" ? null : key}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const BOW_GRAINS = [300, 420, 600] as const

function BowSightSection({ bowSightDistances }: { bowSightDistances: BowSightDistance[] }) {
  if (bowSightDistances.length === 0) {
    return <p className="text-sm text-muted-foreground">サイトデータなし</p>
  }

  const zeros = [...new Set(bowSightDistances.map((r) => r.zero_distance))].sort((a, b) => a - b)
  const lookup = new Map(
    bowSightDistances.map((r) => [`${r.zero_distance}-${r.grain}-${r.pin}`, r.distance])
  )

  return (
    <div className="space-y-8">
      {zeros.map((z) => (
        <div key={z}>
          <p className="text-sm font-medium text-muted-foreground mb-2">ゼロイン {z}m</p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>pin</TableHead>
                  {BOW_GRAINS.map((gr) => (
                    <TableHead key={gr} className="text-center tabular-nums">
                      {gr} gr
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((p) => (
                  <TableRow key={p}>
                    <TableCell className="font-medium">{p}</TableCell>
                    {BOW_GRAINS.map((gr) => {
                      const dist = lookup.get(`${z}-${gr}-${p}`)
                      return (
                        <TableCell key={gr} className="text-center tabular-nums">
                          {dist !== undefined ? `${dist} m` : "-"}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FirearmDetail({
  firearm,
  ammoList,
  scopes,
  ballistics,
  bowSightDistances,
  backHref,
  backLabel,
}: FirearmDetailProps) {
  const isBow = firearm.type === "bow"

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      {/* Basic stats */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{firearm.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(({ key, label }) => (
              <div key={key} className="rounded-lg bg-muted/40 px-3 py-2">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm font-semibold tabular-nums mt-0.5">
                  {statValue(key, firearm)}
                </dd>
              </div>
            ))}
          </dl>
          {firearm.comment && (
            <p className="text-sm text-muted-foreground">{firearm.comment}</p>
          )}
        </CardContent>
      </Card>

      {/* Scopes */}
      {scopes.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">搭載できるスコープ・サイト</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {scopes.map((s) => (
                <Badge key={s.id} variant="outline">
                  {s.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ammo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">対応弾薬・矢</CardTitle>
        </CardHeader>
        <CardContent>
          {ammoList.length === 0 ? (
            <p className="text-sm text-muted-foreground">弾薬情報がありません</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>弾薬名</TableHead>
                    <TableHead className="text-center">有効射程</TableHead>
                    <TableHead className="text-center">推奨クラス</TableHead>
                    <TableHead className="text-center">貫通力</TableHead>
                    <TableHead className="text-center">膨張性</TableHead>
                    <TableHead className="text-right">重量</TableHead>
                    <TableHead className="text-right">必要スコア</TableHead>
                    <TableHead className="text-right">価格</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ammoList.map((ammo) => (
                    <TableRow key={ammo.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium whitespace-nowrap">{ammo.name}</TableCell>
                      <TableCell className="text-center tabular-nums">
                        {ammo.effective_range != null ? `${ammo.effective_range} m` : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {ammo.class_min != null && ammo.class_max != null ? (
                          <Badge variant="outline">
                            {ammo.class_min === ammo.class_max
                              ? `${ammo.class_min}`
                              : `${ammo.class_min}–${ammo.class_max}`}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center tabular-nums">
                        {ammo.penetration != null ? ammo.penetration : "-"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums">
                        {ammo.expansion != null ? ammo.expansion : "-"}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {ammo.weight.toFixed(2)} kg
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {ammo.required_score === 0 ? "-" : ammo.required_score}
                      </TableCell>
                      <TableCell className="text-right tabular-nums whitespace-nowrap">
                        {ammo.price === 0 ? "-" : `${ammo.price.toLocaleString()} G`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ballistics (rifle / shotgun / handgun / muzzleloader) */}
      {!isBow && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">弾道情報</CardTitle>
          </CardHeader>
          <CardContent>
            <BallisticsSection ballistics={ballistics} />
          </CardContent>
        </Card>
      )}

      {/* Bow sight distances */}
      {isBow && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">弾道情報（5ピンボウサイト）</CardTitle>
          </CardHeader>
          <CardContent>
            <BowSightSection bowSightDistances={bowSightDistances} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
