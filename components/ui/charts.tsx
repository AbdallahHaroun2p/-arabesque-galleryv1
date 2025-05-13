"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

interface ChartProps {
  data: any[]
  xField: string
  yField: string
  height?: number
  angleField?: string
  colorField?: string
}

const COLORS = [
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
  "#06B6D4",
  "#84CC16",
]

export function LineChart({ data, xField, yField, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey={xField} stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
        <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "#9CA3AF" }}
          itemStyle={{ color: "#F59E0B" }}
        />
        <Line
          type="monotone"
          dataKey={yField}
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ fill: "#F59E0B" }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart({ data, xField, yField, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey={xField} stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
        <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "#9CA3AF" }}
          itemStyle={{ color: "#F59E0B" }}
        />
        <Bar dataKey={yField} fill="#F59E0B" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function PieChart({
  data,
  angleField,
  colorField,
  height = 300,
}: Omit<ChartProps, 'xField' | 'yField'> & { angleField: string; colorField: string }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={angleField}
          nameKey={colorField}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "#9CA3AF" }}
          itemStyle={{ color: "#F59E0B" }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
} 