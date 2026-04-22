import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare, LayoutDashboard, Wand2, Layers,
  ArrowRight, Zap, Shield, Globe, TrendingUp,
  CheckCircle, ChevronRight, BarChart3, Sparkles
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Interface",
    description: "Ask any question in plain English. Get SQL, charts, and business narratives — streamed in real time.",
    color: "caribbean",
  },
  {
    icon: LayoutDashboard,
    title: "Live Dashboards",
    description: "KPI cards, interactive charts, drag-and-drop widgets. Your data, always at a glance.",
    color: "reef",
  },
  {
    icon: Wand2,
    title: "AI Prompt Builder",
    description: "Design, version, and test your AI analytics prompts with a visual split-pane editor.",
    color: "coral",
  },
  {
    icon: Layers,
    title: "Semantic Layer Editor",
    description: "Define metrics, dimensions, and joins visually. Publish a single source of truth for your whole org.",
    color: "caribbean",
  },
];

const stats = [
  { value: "< 2s", label: "Average query time" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "87%", label: "Avg AI confidence" },
  { value: "268+", label: "Teams onboarded" },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals and small teams exploring AI analytics.",
    features: ["100 AI queries / month", "2 data sources", "Chat UI", "Basic dashboard"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For growing teams who need the full platform.",
    features: ["Unlimited queries", "10 data sources", "All 4 products", "Prompt Builder", "Semantic Layer", "Priority support"],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organisations with advanced security and compliance needs.",
    features: ["Everything in Pro", "SSO / SAML", "Audit logs", "Custom LLM", "SLA agreement", "Dedicated CSM"],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-caribbean-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-foreground">GET THERE 268</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Demo</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-caribbean-500 hover:bg-caribbean-600 text-white gap-1.5">
                Start free <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.08)_0%,_transparent_70%)]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-coral-500/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="gap-2 border-caribbean-300 text-caribbean-700 bg-caribbean-50 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Claude claude-sonnet-4-6 · Built for Antigua & Barbuda 🇦🇬
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-center text-foreground tracking-tight leading-tight mb-6">
            Your data.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-500 to-reef-500">
              Understood.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            GET THERE 268 is the AI-native analytics platform that turns your databases into instant insights.
            No SQL required. No BI expertise needed. Just ask.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup">
              <Button size="lg" className="bg-caribbean-500 hover:bg-caribbean-600 text-white gap-2 h-12 px-8 text-base">
                Start for free — no credit card <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base">
                <BarChart3 className="w-4 h-4" /> View live demo
              </Button>
            </Link>
          </div>

          {/* Mock UI Preview */}
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden mx-auto max-w-4xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground">
                  <Zap className="w-3 h-3 text-caribbean-500" />
                  getthere268.com/chat
                </div>
              </div>
            </div>
            <div className="bg-background p-6 min-h-[280px] flex flex-col gap-4">
              {/* Mock chat */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-ocean-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-semibold">JD</span>
                </div>
                <div className="bg-caribbean-500 text-white rounded-xl px-4 py-2.5 text-sm max-w-sm">
                  What were our top 5 revenue regions last quarter?
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-caribbean-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-2 flex-1 max-w-lg">
                  <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground">
                    The Caribbean region led with $2.4M in Q4 2024 — up 18% YoY. North America followed at $1.8M.
                  </div>
                  <div className="bg-muted rounded-xl p-3">
                    <div className="space-y-1.5">
                      {[["Caribbean", 2400000, "#0ea5e9"], ["North America", 1800000, "#10b981"], ["Europe", 1200000, "#f97316"], ["APAC", 890000, "#8b5cf6"], ["LATAM", 640000, "#f59e0b"]].map(([region, value, color]) => (
                        <div key={region as string} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-28">{region as string}</span>
                          <div className="flex-1 bg-background rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${((value as number) / 2400000) * 100}%`,
                                backgroundColor: color as string,
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground w-16 text-right">
                            ${((value as number) / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-[10px] border-reef-300 text-reef-700 bg-reef-50">94% confidence</Badge>
                    <Badge variant="outline" className="text-[10px]">View SQL</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Four powerful products</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything your team needs to get there
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From natural language queries to a published semantic layer — GET THERE 268 covers the full analytics stack.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  feature.color === "caribbean" ? "bg-caribbean-100 text-caribbean-600" :
                  feature.color === "reef" ? "bg-reef-100 text-reef-600" :
                  "bg-coral-100 text-coral-600"
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-caribbean-600 hover:text-caribbean-700 transition-colors"
                >
                  Try it now <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Simple pricing</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Start free. Scale as you grow.
            </h2>
            <p className="text-muted-foreground">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col ${
                  plan.highlighted
                    ? "border-caribbean-500 bg-caribbean-500 text-white shadow-xl shadow-caribbean-500/20 scale-105"
                    : "border-border bg-card"
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? "text-caribbean-200" : "text-muted-foreground"}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.highlighted ? "text-caribbean-100" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-caribbean-200" : "text-reef-500"}`} />
                      <span className={plan.highlighted ? "text-caribbean-50" : "text-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-white text-caribbean-600 hover:bg-caribbean-50"
                        : "bg-caribbean-500 hover:bg-caribbean-600 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full bg-caribbean-50 border border-caribbean-200 text-caribbean-700 text-sm font-medium">
            <Globe className="w-4 h-4" /> Built in Antigua & Barbuda 🇦🇬 · Trusted worldwide
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to get there?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join 268+ teams already using AI to turn their data into decisions.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-caribbean-500 hover:bg-caribbean-600 text-white gap-2 h-14 px-10 text-lg">
              Start for free — no credit card <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-caribbean-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-foreground">GET THERE 268</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GET THERE 268. All rights reserved. · Antigua & Barbuda 🇦🇬
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="mailto:hello@getthere268.com" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
