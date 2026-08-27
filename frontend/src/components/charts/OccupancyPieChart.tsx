import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { OccupancyByClass } from "../../types/dashboard";

interface OccupancyPieChartProps {
  data: OccupancyByClass[];
}
const COLORS = ["#0f172a", "#475569", "#94a3b8"];

export default function OccupancyPieChart({ data }: OccupancyPieChartProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-medium text-slate-700 mb-4">
        Occupancy by Class
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="className"
            cx="50%"
            cy="90%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            label={({ className, percent }) =>
              `${className} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              borderColor: "#e2e8f0",
            }}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{
              fontSize: 12,
              position: "relative",
              marginTop: -10,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
