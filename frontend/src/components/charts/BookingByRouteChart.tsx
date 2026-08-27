import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RouteBookings } from "../../types/dashboard";

interface BookingByRouteChartProps {
  data: RouteBookings[];
}

export default function BookingByRouteChart({
  data,
}: BookingByRouteChartProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-medium text-slate-700 mb-4">
        Bookings by Route
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            horizontal={false}
          />
          <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis
            type="category"
            dataKey="route"
            tick={{ fontSize: 12, fill: "#64748b" }}
            width={110}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              borderColor: "#e2e8f0",
            }}
          />
          <Bar dataKey="bookings" fill="#0f172a" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
