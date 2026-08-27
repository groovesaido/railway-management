import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { startOfDay, endOfDay, subDays, format } from "date-fns";
import { TicketStatus } from "../generated/prisma/enums";
const ACTIVE_STATUS_FILTER = {
  status: { not: TicketStatus.CANCELLED },
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [revenueAgg, totalBooking, activeTrain, passengersToday] =
      await Promise.all([
        prisma.ticket.aggregate({
          _sum: { price: true },
          where: ACTIVE_STATUS_FILTER,
        }),
        prisma.ticket.count({ where: ACTIVE_STATUS_FILTER }),
        prisma.train.count({ where: { status: "ACTIVE" } }),
        prisma.ticket.findMany({
          where: {
            bookingTime: {
              gte: startOfDay(new Date()),
              lte: endOfDay(new Date()),
            },
            ...ACTIVE_STATUS_FILTER,
          },
          distinct: ["passangerId"],
          select: { passangerId: true },
        }),
      ]);
    res.status(200).json({
      totalRevenue: revenueAgg._sum.price ?? 0,
      totalBooking,
      activeTrain,
      passengersToday: passengersToday.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

export const getRevenueTrend = async (req: Request, res: Response) => {
  try {
    const sevenDaysAgo = startOfDay(subDays(new Date(), 6));
    const tickets = await prisma.ticket.findMany({
      where: { bookingTime: { gte: sevenDaysAgo }, ...ACTIVE_STATUS_FILTER },
      select: { bookingTime: true, price: true },
    });
    const buckets = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      buckets.set(format(subDays(new Date(), i), "EEE"), 0);
    }
    for (const ticket of tickets) {
      const day = format(ticket.bookingTime, "EEE");
      if (buckets.has(day)) {
        buckets.set(day, buckets.get(day)! + ticket.price);
      }
    }
    const Chartdata = Array.from(buckets.entries()).map((item) => {
      const date = item[0];
      const revenue = item[1];
      return {
        date: date,
        revenue: revenue,
      };
    });
    res.json(Chartdata);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch revenue trend" });
  }
};

export const getOccupancyByClass = async (req: Request, res: Response) => {
  try {
    const grouped = await prisma.ticket.groupBy({
      by: ["ticketClass"],
      _count: { id: true },
      where: ACTIVE_STATUS_FILTER,
    });
    res.json(
      grouped.map((g) => ({ className: g.ticketClass, value: g._count })),
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch occupancy data" });
  }
};

export const getBookingByRoute = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: ACTIVE_STATUS_FILTER,
      select: {
        schedule: {
          select: {
            route: {
              select: { name: true, origin: true, destination: true },
            },
          },
        },
      },
    });
    const counts = new Map<string, number>();
    for (const ticket of tickets) {
      const route = ticket.schedule.route;
      const label = route.name || `${route.origin}-${route.destination}`;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    res.json(
      Array.from(counts.entries())
        .map((item) => {
          const route = item[0];
          const bookings = item[1];
          return { route: route, bookings: bookings };
        })
        .sort((a, b) => b.bookings - a.bookings),
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};
