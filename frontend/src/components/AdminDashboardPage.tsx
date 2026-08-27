import StatCard from "../components/StatCard";
import RevenueLineChart from "../components/charts/RevenueLineChart";
import BookingByRouteChart from "../components/charts/BookingByRouteChart";
import OccupancyPieChart from "../components/charts/OccupancyPieChart";
import { useDashboardData } from "../hooks/useDashboardData";
import LoadingSpinner from "./LoadingSpinner";
export default function AdminDashboardPage() {
  const { stats, revenue, isLoading, error, bookingByRoute, occupancy } =
    useDashboardData();
  if (isLoading) {
    return <LoadingSpinner label="Loading Dashboard" />;
  }
  if (error || !stats) {
    return (
      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
        {error ?? "something went wrong"}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of system activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`KSh ${stats.totalRevenue?.toLocaleString()}`}
        />
        <StatCard
          label="Total Bookings"
          value={stats.totalBooking?.toLocaleString()}
        />
        <StatCard label="Active Trains" value={stats.activeTrain?.toString()} />
        <StatCard
          label="Passengers Today"
          value={stats.passengersToday.toString()}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueLineChart data={revenue} />
        <BookingByRouteChart data={bookingByRoute} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyPieChart data={occupancy} />
      </div>
    </div>
  );
}
