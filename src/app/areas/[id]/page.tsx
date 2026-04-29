import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ANIMAL_ICON_MAP } from "@/lib/animal-icon-map"
import type { Animal, HuntingArea } from "@/lib/database.types"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
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

function AnimalCard({ animal }: { animal: Animal }) {
  const iconSrc = ANIMAL_ICON_MAP[animal.name]
  return (
    <Link href={`/animals/${animal.id}`} className="group block">
      <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors text-center">
        <div
          className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 overflow-hidden"
          style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
        >
          {iconSrc ? (
            <Image src={iconSrc} alt={animal.name} width={56} height={56} className="object-cover w-full h-full" />
          ) : (
            <span className="text-lg text-muted-foreground/40">?</span>
          )}
        </div>
        <p className="text-xs font-medium text-foreground leading-tight">{animal.name}</p>
      </div>
    </Link>
  )
}

export default async function AreaDetailPage({ params }: PageProps) {
  const { id } = await params

  const [{ data: areaRaw }, { data: areaAnimalRows }] = await Promise.all([
    supabase.from("hunting_areas").select("*").eq("id", id).single(),
    supabase.from("area_animals").select("animal_id").eq("area_id", id),
  ])

  const area = areaRaw as HuntingArea | null
  if (!area) notFound()

  const animalIds = (areaAnimalRows ?? []).map((r) => r.animal_id)

  let animals: Animal[] = []
  if (animalIds.length > 0) {
    const { data } = await supabase
      .from("animals")
      .select("*")
      .in("id", animalIds)
      .order("level_min")
      .order("name")
    animals = (data ?? []) as Animal[]
  }

  const grouped = new Map<number, Animal[]>()
  for (const animal of animals) {
    const level = animal.level_min
    const group = grouped.get(level) ?? []
    group.push(animal)
    grouped.set(level, group)
  }
  const sortedGroups = Array.from(grouped.entries()).sort(([a], [b]) => a - b)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href="/areas"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        保護区一覧
      </Link>

      <div className="flex items-start gap-3 mb-2">
        <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">{area.name}</h1>
          {area.description && (
            <p className="text-muted-foreground text-sm mt-1">{area.description}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-1">登場する動物</h2>
        <p className="text-sm text-muted-foreground mb-2">{animals.length} 種</p>

        {sortedGroups.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">動物データがありません</p>
        ) : (
          sortedGroups.map(([level, group]) => (
            <div key={level}>
              <ClassDivider level={level} />
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {group.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
