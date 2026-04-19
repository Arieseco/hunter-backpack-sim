import Link from "next/link"
import { ChevronLeft, Weight } from "lucide-react"
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
import type { Firearm, Ammo } from "@/lib/database.types"

interface FirearmDetailProps {
  firearm: Firearm
  ammoList: Ammo[]
  backHref: string
  backLabel: string
}

export function FirearmDetail({
  firearm,
  ammoList,
  backHref,
  backLabel,
}: FirearmDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{firearm.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <Weight className="h-5 w-5 text-primary" />
            <span className="font-medium">{firearm.weight.toFixed(2)} kg</span>
          </div>
          {firearm.description && (
            <p className="text-muted-foreground">{firearm.description}</p>
          )}
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">対応弾薬・矢</h2>

      {ammoList.length === 0 ? (
        <p className="text-muted-foreground">弾薬情報がありません</p>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>弾薬名</TableHead>
                <TableHead className="hidden sm:table-cell">適正クラス</TableHead>
                <TableHead className="text-right">重量</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ammoList.map((ammo) => (
                <TableRow key={ammo.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{ammo.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {ammo.class_min != null && ammo.class_max != null ? (
                      <Badge variant="outline">
                        クラス {ammo.class_min}–{ammo.class_max}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {ammo.weight.toFixed(2)} kg
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
