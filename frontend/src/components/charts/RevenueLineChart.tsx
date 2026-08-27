import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RevenuePoint } from "../../types/dashboard";

interface RevenueLineChartProps {
  data: RevenuePoint[];
}
export default function RevenueLineChart({ data }: RevenueLineChartProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-medium text-slate-700 mb-4">
        Revenue (last 7 days)
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis dataKey="revenue" tick={{ fontSize: 12, fill: "#64748b" }} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              borderColor: "#e2e8f0",
            }}
            formatter={(value: any) => [
              `KSh ${(value ?? 0).toLocaleString()}`,
              "Revenue",
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0f172a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
