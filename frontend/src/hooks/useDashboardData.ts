import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  fetchOccupancyByClass,
  fetchRevenueTrend,
  fetchBookingByRoute,
} from "../api/dashboard";

import type {
  DashboardStats,
  RevenuePoint,
  RouteBookings,
  OccupancyByClass,
} from "../types/dashboard";

interface DashboardData {
  stats: DashboardStats | null;
  revenue: RevenuePoint[];
  bookingByRoute: RouteBookings[];
  occupancy: OccupancyByClass[];
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    stats: null,
    revenue: [],
    bookingByRoute: [],
    occupancy: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const [stats, revenue, bookingByRoute, occupancy] = await Promise.all([
          fetchDashboardStats(),
          fetchRevenueTrend(),
          fetchBookingByRoute(),
          fetchOccupancyByClass(),
        ]);
        if (!cancelled) {
          setData({ stats, revenue, bookingByRoute, occupancy });
        }
      } catch (err) {
        if (!cancelled) setError("Failed to Load Dashboard");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { ...data, isLoading, error };
}
