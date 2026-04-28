"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"
import type { FirearmBallistics } from "@/lib/database.types"

const ZERO_COLORS = ["#3b82f6", "#22c55e", "#f59e0b"]

// Convert score + direction to vertical Y position
//   up   → bullet above aim line  (positive)
//   down → bullet below aim line  (negative)
//   null → bullet at horizontal center (0)
// Using ring midpoints so each score maps to a distinct half-integer value
function toY(row: FirearmBallistics): number | null {
  if (row.is_out || row.score === null) return null
  const ringDist = 10 - row.score // 0 = bullseye
  if (row.direction === "up") return +(ringDist + 0.5)
  if (row.direction === "down") return -(ringDist + 0.5)
  return 0
}

function yTickFormatter(v: number): string {
  if (v === 0) return "aim"
  const absV = Math.abs(v)
  // Integer ticks sit between half-integer data points; round to nearest ring
  const score = Math.max(1, Math.round(10 - absV + 0.5))
  return v > 0 ? `${score}↑` : `${score}↓`
}

type ChartEntry = { range: number; [k: string]: number | string | null }

interface BallisticsChartProps {
  ballistics: FirearmBallistics[]
  ammoNote: string | null
}

export function BallisticsChart({ ballistics, ammoNote }: BallisticsChartProps) {
  const rows = ballistics.filter((r) => (r.ammo_note ?? null) === ammoNote)
  if (rows.length === 0) return null

  const zeros = [...new Set(rows.map((r) => r.zero_distance))].sort((a, b) => a - b)
  const ranges = [...new Set(rows.map((r) => r.range_distance))].sort((a, b) => a - b)

  const chartData: ChartEntry[] = ranges.map((range) => {
    const entry: ChartEntry = { range }
    for (const z of zeros) {
      const row = rows.find((r) => r.zero_distance === z && r.range_distance === range)
      if (!row) {
        entry[`z${z}`] = null
        entry[`z${z}_t`] = "-"
      } else if (row.is_out || row.score === null) {
        entry[`z${z}`] = null
        entry[`z${z}_t`] = "OUT"
      } else {
        entry[`z${z}`] = toY(row)
        const dir = row.direction === "up" ? "↑" : row.direction === "down" ? "↓" : ""
        entry[`z${z}_t`] = `${row.score}${dir}`
      }
    }
    return entry
  })

  const yVals = chartData
    .flatMap((d) => zeros.map((z) => d[`z${z}`] as number | null))
    .filter((v) => v !== null) as number[]

  if (yVals.length === 0) return null

  const yAbsMax = Math.ceil(Math.max(3, ...yVals.map(Math.abs)) + 0.5)
  const ticks = Array.from({ length: yAbsMax * 2 + 1 }, (_, i) => i - yAbsMax)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 24 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
        <XAxis
          dataKey="range"
          tick={{ fontSize: 11 }}
          label={{ value: "射距 (m)", position: "insideBottom", offset: -12, fontSize: 12 }}
        />
        <YAxis
          domain={[-yAbsMax, yAbsMax]}
          ticks={ticks}
          tickFormatter={yTickFormatter}
          tick={{ fontSize: 10 }}
          width={40}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border bg-background p-2 shadow text-xs">
                <p className="font-medium mb-1">{label} m</p>
                {payload.map((p) => (
                  <p key={p.dataKey as string} style={{ color: p.color as string }}>
                    {p.name}:{" "}
                    {(p.payload as ChartEntry)[`${p.dataKey as string}_t`] ?? "-"}
                  </p>
                ))}
              </div>
            )
          }}
        />
        <Legend verticalAlign="top" wrapperStyle={{ fontSize: 12 }} />
        <ReferenceLine
          y={0}
          stroke="#888"
          strokeWidth={1.5}
          label={{ value: "照準", position: "right", fontSize: 10, fill: "#888" }}
        />
        {zeros.map((z, i) => (
          <Line
            key={z}
            type="monotone"
            dataKey={`z${z}`}
            name={`ゼロイン ${z}m`}
            stroke={ZERO_COLORS[i % ZERO_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
