import Link from "next/link";
import { Home, DollarSign, Clock, User } from "lucide-react";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-ocean-950">
      <main className="flex-1 pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-ocean-900 border-t border-ocean-800 px-6 py-3 flex items-center justify-around z-50">
        <Link href="/driver/home" className="flex flex-col items-center gap-1 text-xs text-caribbean-400">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link href="/driver/earnings" className="flex flex-col items-center gap-1 text-xs text-ocean-400 hover:text-caribbean-400">
          <DollarSign className="w-5 h-5" />
          <span>Earnings</span>
        </Link>
        <Link href="/driver/history" className="flex flex-col items-center gap-1 text-xs text-ocean-400 hover:text-caribbean-400">
          <Clock className="w-5 h-5" />
          <span>History</span>
        </Link>
        <Link href="/driver/profile" className="flex flex-col items-center gap-1 text-xs text-ocean-400 hover:text-caribbean-400">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
