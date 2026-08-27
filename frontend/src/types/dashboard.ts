export interface DashboardStats {
  totalRevenue: number;
  totalBooking: number;
  activeTrain: number;
  passengersToday: number;
}
export type Class = "A" | "B" | "C";
export interface RevenuePoint {
  date: string;
  revenue: number;
}
export interface RouteBookings {
  route: string;
  bookings: number;
}
export interface OccupancyByClass {
  className: Class;
  value: number;
}
