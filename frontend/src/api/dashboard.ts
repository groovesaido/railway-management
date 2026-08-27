import apiClient from "./client";

import type {
  DashboardStats,
  RevenuePoint,
  RouteBookings,
  OccupancyByClass,
} from "../types/dashboard";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await apiClient.get<DashboardStats>(
    "/admin/dashboard/stats",
  );
  return data;
};

export const fetchRevenueTrend = async (): Promise<RevenuePoint[]> => {
  const { data } = await apiClient.get<RevenuePoint[]>(
    "/admin/dashboard/revenue",
  );
  return data;
};
export const fetchBookingByRoute = async (): Promise<RouteBookings[]> => {
  const { data } = await apiClient.get<RouteBookings[]>(
    "/admin/dashboard/booking-by-route",
  );
  return data;
};

export const fetchOccupancyByClass = async (): Promise<OccupancyByClass[]> => {
  const { data } = await apiClient.get<OccupancyByClass[]>(
    "/admin/dashboard/occupancy",
  );
  return data;
};
