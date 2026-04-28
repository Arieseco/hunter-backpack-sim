"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Animal, HuntingArea, AreaAnimal } from "@/lib/database.types"

interface AnimalTableProps {
  animals: Animal[]
  areas: HuntingArea[]
  areaAnimals: AreaAnimal[]
}

function ClassBadge({ min, max }: { min: number; max: number }) {
  const label = min === max ? `クラス${min}` : `クラス${min}〜${max}`
  return (
    <Badge variant="outline" className="text-xs whitespace-nowrap">
      {label}
    </Badge>
  )
}

export function AnimalTable({ animals, areas, areaAnimals }: AnimalTableProps) {
  const [search, setSearch] = useState("")
  const [selectedAreaId, setSelectedAreaId] = useState("all")

  const animalAreasMap = useMemo(() => {
    const map = new Map<string, HuntingArea[]>()
    for (const aa of areaAnimals) {
      const area = areas.find((a) => a.id === aa.area_id)
      if (!area) continue
      const list = map.get(aa.animal_id) ?? []
      list.push(area)
      map.set(aa.animal_id, list)
    }
    return map
  }, [areas, areaAnimals])

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

  return (
    <div className="space-y-4">
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
            <SelectItem value="all">すべての狩猟区</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                {area.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* PC: テーブル */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-3 px-4 font-medium text-muted-foreground whitespace-nowrap">動物名</th>
              <th className="py-3 px-4 font-medium text-muted-foreground whitespace-nowrap">クラス</th>
              <th className="py-3 px-4 font-medium text-muted-foreground">出現する狩猟区</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  該当する動物が見つかりません
                </td>
              </tr>
            ) : (
              filtered.map((animal) => (
                <tr key={animal.id} className="border-b border-border hover:bg-secondary/30">
                  <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">
                    {animal.name}
                  </td>
                  <td className="py-3 px-4">
                    <ClassBadge min={animal.level_min} max={animal.level_max} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {(animalAreasMap.get(animal.id) ?? []).map((area) => (
                        <Badge key={area.id} variant="secondary" className="text-xs">
                          {area.name}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* スマホ: カード */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            該当する動物が見つかりません
          </div>
        ) : (
          filtered.map((animal) => (
            <Card key={animal.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">{animal.name}</h3>
                  <div className="mt-1">
                    <ClassBadge min={animal.level_min} max={animal.level_max} />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(animalAreasMap.get(animal.id) ?? []).map((area) => (
                      <Badge key={area.id} variant="secondary" className="text-xs">
                        {area.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} 件</p>
    </div>
  )
}
