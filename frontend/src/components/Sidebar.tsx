import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Train,
  MapPin,
  Calendar,
  Users,
  Ticket,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types/auth";

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: Role[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Stations", path: "/admin/station", icon: MapPin, roles: ["ADMIN"] },
  {
    label: "Trains",
    path: "/admin/trains",
    icon: Train,
    roles: ["ADMIN"],
  },
  {
    label: "Schedules",
    path: "/admin/schedules",
    icon: Calendar,
    roles: ["ADMIN", "STAFF"],
  },
  { label: "Users", path: "/admin/users", icon: Users, roles: ["ADMIN"] },
  {
    label: "My Bookings",
    path: "/bookings",
    icon: Ticket,
    roles: ["PASSENGER"],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  // Tracks mouse position relative to whichever item is currently hovered
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const visibleItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role)),
  );

  const handleMouseMove = (e: React.MouseEvent, path: string) => {
    setHoveredPath(path);
    setHoverPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredPath(null);
    setHoverPos(null);
  };

  return (
    <aside className="h-screen w-60 flex flex-col bg-white border-r border-slate-200">
      <div className="px-5 py-5 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-900">
          Railway Management
        </h2>
        {user && (
          <p className="text-xs text-slate-500 mt-0.5 truncate">{user.email}</p>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseMove={(e) => handleMouseMove(e, item.path)}
              onMouseLeave={handleMouseLeave}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} className="shrink-0" color="black" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-200">
        <button
          onMouseMove={(e) => handleMouseMove(e, "logout")}
          onMouseLeave={handleMouseLeave}
          onClick={logout}
          className="relative w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                     text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Log out</span>
        </button>
      </div>

      {/* Single tooltip, positioned at the cursor, rendered once outside the loop */}
      {hoveredPath && hoverPos && (
        <span
          className="pointer-events-none fixed whitespace-nowrap rounded-md
                     bg-slate-900 px-2 py-1 text-xs text-white shadow-md z-50"
          style={{ left: hoverPos.x + 14, top: hoverPos.y - 10 }}
        >
          {hoveredPath === "logout"
            ? "Log out"
            : navItems.find((i) => i.path === hoveredPath)?.label}
        </span>
      )}
    </aside>
  );
}
