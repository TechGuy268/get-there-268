import Link from "next/link";
import { LayoutDashboard, Users, Car, Map, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-ocean-900 text-white flex flex-col flex-shrink-0">
        <div className="px-6 py-5 border-b border-ocean-800">
          <p className="text-xl font-bold text-caribbean-400">GET THERE 268</p>
          <p className="text-xs text-ocean-400 mt-0.5">Admin Portal</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {[
            { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/admin/drivers", icon: Car, label: "Drivers" },
            { href: "/admin/riders", icon: Users, label: "Riders" },
            { href: "/admin/trips", icon: Map, label: "Trips" },
            { href: "/admin/pricing", icon: Settings, label: "Pricing" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ocean-300 hover:bg-ocean-800 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-ocean-800">
          <p className="text-xs text-ocean-500">Antigua & Barbuda</p>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
