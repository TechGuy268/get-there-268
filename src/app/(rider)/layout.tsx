import Link from "next/link";
import { MapPin, Clock, User, Zap } from "lucide-react";

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-20">{children}</main>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-around z-50">
        <Link href="/book" className="flex flex-col items-center gap-1 text-xs text-ocean-600">
          <Zap className="w-5 h-5" />
          <span>Book</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-ocean-600">
          <Clock className="w-5 h-5" />
          <span>History</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-ocean-600">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
