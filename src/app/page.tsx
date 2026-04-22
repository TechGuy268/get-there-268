import Link from "next/link";
import { MapPin, Shield, Clock, Star, Car, ChevronRight, Phone, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ocean-950 flex items-center justify-center">
              <Zap className="w-4 h-4 text-reef-500" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-ocean-950 text-lg tracking-tight">GET THERE <span className="text-caribbean-600">268</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-ocean-600 hover:text-ocean-950 transition-colors font-medium px-3 py-2">
              Log in
            </Link>
            <Link href="/signup" className="text-sm bg-ocean-950 text-white px-5 py-2.5 rounded-full hover:bg-ocean-800 transition-colors font-medium">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 min-h-screen flex flex-col overflow-hidden bg-ocean-950">

        {/* Flag stripe accent — thin horizontal bands */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-ocean-950" />
        </div>

        {/* Subtle radial glow — blue */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-caribbean-600/10 blur-[120px] pointer-events-none" />
        {/* Gold glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-reef-500/8 blur-[100px] pointer-events-none" />

        <div className="relative flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center py-24">
            {/* Left */}
            <div>
              {/* Flag colours badge */}
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="flex gap-0.5">
                  <span className="w-2 h-2 rounded-full bg-ocean-950 border border-ocean-700" />
                  <span className="w-2 h-2 rounded-full bg-caribbean-600" />
                  <span className="w-2 h-2 rounded-full bg-coral-500" />
                  <span className="w-2 h-2 rounded-full bg-reef-500" />
                </span>
                <span className="text-ocean-400 text-xs font-medium tracking-widest uppercase">Antigua & Barbuda</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] mb-6 text-white tracking-tight">
                Your ride.<br />
                <span className="text-caribbean-400">On demand.</span>
              </h1>
              <p className="text-lg text-ocean-400 mb-10 leading-relaxed max-w-md">
                The fastest, safest way to get around Antigua & Barbuda. Book in seconds. Ride in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/signup?role=rider" className="inline-flex items-center justify-center gap-2 bg-white text-ocean-950 font-semibold px-7 py-3.5 rounded-full text-base transition-all hover:bg-ocean-100 hover:scale-[1.02]">
                  Get a ride <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/signup?role=driver" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-ocean-700 font-semibold px-7 py-3.5 rounded-full text-base transition-all hover:border-ocean-400">
                  <Car className="w-4 h-4" /> Drive with us
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-ocean-800">
                {[
                  { value: "2 min", label: "avg. pickup" },
                  { value: "4.9★", label: "avg. rating" },
                  { value: "268", label: "area code" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-white font-bold text-lg">{s.value}</p>
                    <p className="text-ocean-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-caribbean-600/20 blur-3xl rounded-full scale-75" />
                <div className="relative w-68 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-ocean-800/50" style={{width: "272px"}}>
                  {/* Status bar */}
                  <div className="h-7 bg-ocean-950 flex items-center justify-center">
                    <div className="w-20 h-3 bg-ocean-800 rounded-full" />
                  </div>
                  {/* Map area */}
                  <div className="h-44 bg-ocean-100 relative overflow-hidden">
                    {/* Grid pattern */}
                    <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(rgba(28,95,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(28,95,212,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px"}} />
                    {/* Route line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 272 176">
                      <path d="M60 140 Q 136 80 210 40" stroke="#1c5fd4" strokeWidth="2" fill="none" strokeDasharray="6 3" opacity="0.5" />
                      <circle cx="60" cy="140" r="5" fill="#1c5fd4" />
                      <circle cx="210" cy="40" r="5" fill="#CE1126" />
                    </svg>
                    {/* Driver chip */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl shadow-md p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ocean-950 flex items-center justify-center flex-shrink-0">
                        <Car className="w-4 h-4 text-reef-500" />
                      </div>
                      <div>
                        <p className="text-xs text-ocean-500">Marcus is arriving</p>
                        <p className="font-bold text-ocean-950 text-sm">2 min away</p>
                      </div>
                    </div>
                  </div>
                  {/* Bottom card */}
                  <div className="p-4 space-y-2.5 bg-white">
                    <div className="flex items-center gap-3 p-2.5 bg-ocean-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-caribbean-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-ocean-500">Pickup</p>
                        <p className="text-sm font-semibold text-ocean-950">St. John's Harbour</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 bg-ocean-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-coral-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-ocean-500">Destination</p>
                        <p className="text-sm font-semibold text-ocean-950">V.C. Bird Airport</p>
                      </div>
                    </div>
                    <div className="bg-ocean-950 text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                      <span className="text-reef-400 font-bold">XCD $12.50</span>
                      <span className="text-ocean-500">·</span>
                      <span>8 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{height: "80px"}}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
          {/* Thin flag-colour stripe along the wave */}
          <svg viewBox="0 0 1440 6" preserveAspectRatio="none" className="absolute top-0 w-full block" style={{height: "6px"}}>
            <rect x="0" y="0" width="480" height="6" fill="#003087" opacity="0.7" />
            <rect x="480" y="0" width="480" height="6" fill="#FAD54B" opacity="0.7" />
            <rect x="960" y="0" width="480" height="6" fill="#CE1126" opacity="0.7" />
          </svg>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-4xl font-bold text-ocean-950 tracking-tight">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: MapPin, step: "01", title: "Set your destination", desc: "Enter where you're going and see the fare instantly — no surprises." },
              { icon: Car, step: "02", title: "Get matched", desc: "A nearby approved driver accepts your ride — usually within 2 minutes." },
              { icon: Star, step: "03", title: "Ride & rate", desc: "Enjoy a safe, comfortable ride then rate your driver." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <p className="text-6xl font-black text-ocean-100 mb-4 leading-none">{item.step}</p>
                <div className="w-10 h-10 bg-ocean-950 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-reef-500" />
                </div>
                <h3 className="font-bold text-ocean-950 text-lg mb-2">{item.title}</h3>
                <p className="text-ocean-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flag stripe divider */}
      <div className="flex h-1">
        <div className="flex-1 bg-ocean-950" />
        <div className="flex-1 bg-caribbean-600" />
        <div className="flex-1 bg-reef-500" />
        <div className="flex-1 bg-coral-500" />
      </div>

      {/* Features */}
      <section className="py-24 px-6 bg-ocean-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Why us</p>
            <h2 className="text-4xl font-bold text-ocean-950 tracking-tight">Built for Antigua</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: "Verified drivers", desc: "Every driver is background-checked and approved by our team before their first ride." },
              { icon: Clock, title: "Live tracking", desc: "See your driver moving in real time. Know exactly when they arrive." },
              { icon: Star, title: "Rated community", desc: "Drivers and riders are rated after every trip. Low ratings mean removal." },
              { icon: MapPin, title: "Island-wide coverage", desc: "St. John's, English Harbour, Dickenson Bay — we cover it all." },
              { icon: Phone, title: "In-app messaging", desc: "Message your driver without sharing personal phone numbers." },
              { icon: Car, title: "Pay your way", desc: "Card via Stripe or cash — whichever works for you." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-ocean-100 hover:border-caribbean-200 hover:shadow-sm transition-all">
                <div className="w-9 h-9 bg-ocean-950 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-4 h-4 text-reef-400" />
                </div>
                <h3 className="font-bold text-ocean-950 mb-1.5">{f.title}</h3>
                <p className="text-ocean-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drive CTA */}
      <section className="py-24 px-6 bg-ocean-950 relative overflow-hidden">
        {/* Subtle blue glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-caribbean-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-reef-400" />
            <span className="text-xs text-ocean-400 font-medium uppercase tracking-widest">For drivers</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-5 tracking-tight">Drive. Earn. Thrive.</h2>
          <p className="text-lg text-ocean-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join our growing team of drivers in Antigua. Set your own hours and earn on your terms.
          </p>
          <Link href="/signup?role=driver" className="inline-flex items-center gap-2 bg-white text-ocean-950 font-bold px-8 py-4 rounded-full text-base hover:bg-ocean-100 transition-all hover:scale-[1.02]">
            Start driving <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-ocean-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-ocean-950 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-reef-500" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-ocean-950">GET THERE <span className="text-caribbean-600">268</span></span>
          </div>
          {/* Flag stripe in footer */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-ocean-950" />
            <span className="w-3 h-3 rounded-full bg-caribbean-600" />
            <span className="w-3 h-3 rounded-full bg-reef-500" />
            <span className="w-3 h-3 rounded-full bg-coral-500" />
            <span className="text-ocean-400 text-sm ml-2">Antigua & Barbuda 🇦🇬</span>
          </div>
          <div className="flex gap-5 text-sm text-ocean-500">
            <Link href="/login" className="hover:text-ocean-950 transition-colors">Privacy</Link>
            <Link href="/login" className="hover:text-ocean-950 transition-colors">Terms</Link>
            <Link href="/login" className="hover:text-ocean-950 transition-colors">Safety</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-ocean-100 text-center">
          <p className="text-xs text-ocean-400">© {new Date().getFullYear()} GET THERE 268. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
