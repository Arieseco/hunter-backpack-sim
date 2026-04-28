import { notFound } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import type { Animal } from "@/lib/database.types"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AnimalDetailPage({ params, searchParams }: PageProps) {
  const [{ id }, sp] = await Promise.all([params, searchParams])

  const backParams = new URLSearchParams()
  if (typeof sp.q === "string") backParams.set("q", sp.q)
  if (typeof sp.area === "string") backParams.set("area", sp.area)
  const backHref = backParams.toString() ? `/animals?${backParams.toString()}` : "/animals"

  const { data: animalRaw } = await supabase
    .from("animals")
    .select("*")
    .eq("id", id)
    .single()

  const animal = animalRaw as Animal | null
  if (!animal) notFound()

  const classLabel =
    animal.level_min === animal.level_max
      ? `Class ${animal.level_min}`
      : `Class ${animal.level_min}–${animal.level_max}`

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href={backHref}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← 動物一覧
      </Link>
      <div className="mt-6 flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">{animal.name}</h1>
        <Badge variant="outline">{classLabel}</Badge>
      </div>
    </div>
  )
}
