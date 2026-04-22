import Link from "next/link";
import { MapPin, Shield, Clock, Star, Car, ChevronRight, Phone, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-caribbean-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-ocean-900 text-lg">GET THERE 268</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-ocean-600 hover:text-ocean-900 transition-colors font-medium">
              Log in
            </Link>
            <Link href="/signup" className="text-sm bg-ocean-900 text-white px-4 py-2 rounded-full hover:bg-ocean-800 transition-colors font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-ocean-950 to-ocean-900 text-white min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-caribbean-500/20 border border-caribbean-400/30 rounded-full px-4 py-1.5 text-caribbean-300 text-sm font-medium mb-6">
              🇦🇬 Serving Antigua & Barbuda
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your ride.<br />
              <span className="text-caribbean-400">Whenever.</span><br />
              Wherever.
            </h1>
            <p className="text-xl text-ocean-300 mb-10 leading-relaxed">
              The fastest, safest way to get around Antigua & Barbuda. Book in seconds. Ride in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup?role=rider" className="flex items-center justify-center gap-2 bg-caribbean-500 hover:bg-caribbean-400 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105">
                Get a ride <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/signup?role=driver" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-2xl text-lg transition-all">
                <Car className="w-5 h-5" /> Drive with us
              </Link>
            </div>
          </div>
          {/* Mock phone UI */}
          <div className="hidden md:flex justify-center">
            <div className="w-72 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-ocean-800">
              <div className="h-8 bg-ocean-900 flex items-center justify-center">
                <div className="w-24 h-4 bg-ocean-800 rounded-full" />
              </div>
              <div className="bg-caribbean-50 h-48 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "20px 20px"}} />
                <div className="relative bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-caribbean-500 flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Marcus is arriving</p>
                    <p className="font-bold text-ocean-900">2 min away</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-caribbean-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="text-sm font-medium">St. John's Harbour</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-coral-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm font-medium">V.C. Bird Airport</p>
                  </div>
                </div>
                <div className="bg-caribbean-500 text-white text-center py-3 rounded-xl font-semibold text-sm">
                  XCD $12.50 · 8 min ride
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-ocean-900 mb-3">How it works</h2>
          <p className="text-center text-muted-foreground mb-14">Three simple steps to your ride</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: MapPin, step: "1", title: "Set your destination", desc: "Enter where you're going and we'll instantly show you the fare." },
              { icon: Car, step: "2", title: "Get matched instantly", desc: "A nearby driver accepts your ride — usually within 2 minutes." },
              { icon: Star, step: "3", title: "Ride & rate", desc: "Enjoy a safe, comfortable ride then rate your driver." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-caribbean-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-caribbean-500" />
                </div>
                <div className="w-7 h-7 rounded-full bg-caribbean-500 text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-ocean-900 text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-ocean-950 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">Why GET THERE 268?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Safe & verified", desc: "Every driver is background-checked and approved by our team." },
              { icon: Clock, title: "Always on time", desc: "Track your driver live. Know exactly when they arrive." },
              { icon: Star, title: "Top-rated drivers", desc: "Our drivers maintain high ratings. Low ratings = off the platform." },
              { icon: MapPin, title: "Covers all of Antigua", desc: "From St. John's to English Harbour — we've got you covered." },
              { icon: Phone, title: "In-app chat", desc: "Message your driver directly without sharing phone numbers." },
              { icon: Car, title: "Multiple ride types", desc: "Standard, XL, and premium vehicles. You choose." },
            ].map((f) => (
              <div key={f.title} className="bg-ocean-900 rounded-2xl p-6 border border-ocean-800 hover:border-caribbean-500/40 transition-colors">
                <f.icon className="w-6 h-6 text-caribbean-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-ocean-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drive CTA */}
      <section className="py-20 px-6 bg-coral-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Car className="w-12 h-12 mx-auto mb-5 text-white/80" />
          <h2 className="text-4xl font-bold mb-4">Drive. Earn. Thrive.</h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Join our growing team of drivers in Antigua. Set your own hours and earn on your terms.
          </p>
          <Link href="/signup?role=driver" className="inline-flex items-center gap-2 bg-white text-coral-600 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-coral-50 transition-all hover:scale-105">
            Start driving <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-950 text-ocean-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-caribbean-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white">GET THERE 268</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} GET THERE 268. Antigua & Barbuda 🇦🇬</p>
          <div className="flex gap-5 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/safety" className="hover:text-white transition-colors">Safety</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
