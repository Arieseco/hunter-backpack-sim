"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ANIMAL_ICON_MAP } from "@/lib/animal-icon-map"
import type { Animal, HuntingArea, AreaAnimal } from "@/lib/database.types"

interface AnimalGridProps {
  animals: Animal[]
  areas: HuntingArea[]
  areaAnimals: AreaAnimal[]
}

function ClassDivider({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <div className="flex-1 h-px bg-border" />
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-semibold text-foreground">クラス {level}</span>
        <Image
          src={`/icons/class-${level}.png`}
          alt={`クラス${level}`}
          width={28}
          height={28}
          className="opacity-80"
        />
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

function AnimalCard({ animal, returnParams }: { animal: Animal; returnParams: string }) {
  const iconSrc = ANIMAL_ICON_MAP[animal.name]
  const href = returnParams ? `/animals/${animal.id}?${returnParams}` : `/animals/${animal.id}`

  return (
    <Link href={href} className="group block">
      <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors text-center">
        <div
          className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 overflow-hidden"
          style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
        >
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt={animal.name}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-lg text-muted-foreground/40">?</span>
          )}
        </div>
        <p className="text-xs font-medium text-foreground leading-tight">{animal.name}</p>
      </div>
    </Link>
  )
}

export function AnimalGrid({ animals, areas, areaAnimals }: AnimalGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get("q") ?? ""
  const selectedAreaId = searchParams.get("area") ?? "all"

  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set("q", value)
    else params.delete("q")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function setSelectedAreaId(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value !== "all") params.set("area", value)
    else params.delete("area")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const animalIdsInArea = useMemo(() => {
    if (selectedAreaId === "all") return null
    return new Set(
      areaAnimals.filter((aa) => aa.area_id === selectedAreaId).map((aa) => aa.animal_id)
    )
  }, [selectedAreaId, areaAnimals])

  const filtered = useMemo(() => {
    return animals.filter((animal) => {
      if (animalIdsInArea && !animalIdsInArea.has(animal.id)) return false
      if (search && !animal.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [animals, animalIdsInArea, search])

  const grouped = useMemo(() => {
    const map = new Map<number, Animal[]>()
    for (const animal of filtered) {
      const level = animal.level_min
      const group = map.get(level) ?? []
      group.push(animal)
      map.set(level, group)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b)
  }, [filtered])

  const returnParams = searchParams.toString()

  return (
    <div className="space-y-1">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="動物名で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedAreaId} onValueChange={setSelectedAreaId}>
          <SelectTrigger className="w-full sm:w-[260px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての保護区</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                {area.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          該当する動物が見つかりません
        </div>
      ) : (
        grouped.map(([level, group]) => (
          <div key={level}>
            <ClassDivider level={level} />
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {group.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} returnParams={returnParams} />
              ))}
            </div>
          </div>
        ))
      )}

      <p className="text-sm text-muted-foreground mt-4">{filtered.length} 種</p>
    </div>
  )
}
