"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { HuntingArea } from "@/lib/database.types"

// Approximate geographic positions (% of image width/height)
const AREA_COORDS: Record<string, { x: number; y: number }> = {
  'ヒルシュフェルデン保護区':    { x: 52, y: 34 },
  'レイトン湖水地方':            { x: 12, y: 33 },
  'メドヴェド＝タイガ国立公園':  { x: 75, y: 28 },
  'ヴルホンガ・サバンナ':         { x: 56, y: 67 },
  'パルケ・フェルナンド':         { x: 28, y: 60 },
  'ユーコンバレー自然保護区':     { x: 10, y: 24 },
  'クアトロ・コリナス狩猟保護区': { x: 47, y: 39 },
  'シルバーリッジ・ピークス':     { x: 17, y: 36 },
  'テ・アワロア国立公園':         { x: 87, y: 75 },
  '渓谷牧場':                    { x: 18, y: 44 },
  'ミシシッピ・エーカーズ保護区': { x: 22, y: 45 },
  'レボントゥリ海岸':            { x: 57, y: 26 },
  'ニューイングランド山地':       { x: 26, y: 34 },
  'エメラルド海岸':              { x: 45, y: 31 },
  'スンダルパタン保護区':         { x: 71, y: 47 },
  'ザルツヴィーゼン公園':         { x: 54, y: 36 },
  'アスキー・リッジ狩猟保護区':   { x: 46, y: 27 },
  'トール・ナン・シアン狩猟場':   { x: 48, y: 25 },
}

const ACTIVE_AREAS = new Set([
  'ヒルシュフェルデン保護区',
  'レイトン湖水地方',
  'メドヴェド＝タイガ国立公園',
  'ヴルホンガ・サバンナ',
  'パルケ・フェルナンド',
  'ユーコンバレー自然保護区',
  'クアトロ・コリナス狩猟保護区',
  'シルバーリッジ・ピークス',
  'テ・アワロア国立公園',
  '渓谷牧場',
  'ミシシッピ・エーカーズ保護区',
  'レボントゥリ海岸',
  'ニューイングランド山地',
  'エメラルド海岸',
  'スンダルパタン保護区',
  'ザルツヴィーゼン公園',
  'アスキー・リッジ狩猟保護区',
  'トール・ナン・シアン狩猟場',
])

interface AreasMapProps {
  areas: HuntingArea[]
}

function AreaPin({ area }: { area: HuntingArea }) {
  const [hovered, setHovered] = useState(false)
  const isActive = ACTIVE_AREAS.has(area.name)
  const coords = AREA_COORDS[area.name]
  if (!coords) return null

  const dot = (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pulse ring for active areas */}
      {isActive && (
        <span className="absolute inset-0 -m-1 rounded-full animate-ping bg-primary/40" />
      )}
      {/* Pin dot */}
      <span
        className={`block rounded-full border-2 transition-transform ${
          isActive
            ? "w-4 h-4 bg-primary border-primary/80 shadow-lg shadow-primary/50 hover:scale-125"
            : "w-3 h-3 bg-muted-foreground/50 border-muted-foreground/30"
        }`}
      />
      {/* Tooltip */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 pointer-events-none">
          <div className="bg-popover border border-border rounded px-2 py-1 text-xs text-foreground whitespace-nowrap shadow-md">
            {area.name}
            {!isActive && (
              <span className="ml-1 text-muted-foreground">（近日公開）</span>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
    >
      {isActive ? (
        <Link href={`/areas/${area.id}`} className="block">
          {dot}
        </Link>
      ) : (
        dot
      )}
    </div>
  )
}

export function AreasMap({ areas }: AreasMapProps) {
  return (
    <div className="space-y-4">
      <div
        className="relative w-full rounded-lg border border-border overflow-hidden"
        style={{ aspectRatio: "1000 / 599" }}
      >
        <Image
          src="/images/worldmap.webp"
          alt="世界地図 - 狩猟保護区"
          fill
          className="object-cover"
          priority
        />
        {areas.map((area) => (
          <AreaPin key={area.id} area={area} />
        ))}
      </div>

      {/* Area list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {areas.map((area) => {
          const isActive = ACTIVE_AREAS.has(area.name)
          return isActive ? (
            <Link
              key={area.id}
              href={`/areas/${area.id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:border-primary/50 hover:bg-secondary/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="text-sm text-foreground">{area.name}</span>
            </Link>
          ) : (
            <div
              key={area.id}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-border/50 opacity-50"
            >
              <span className="w-2 h-2 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">{area.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
