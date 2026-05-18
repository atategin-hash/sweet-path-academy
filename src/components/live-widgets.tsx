import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Globe2,
  Lightbulb,
  PlayCircle,
  Radio,
  Rocket,
  Sparkles,
  TrendingUp,
  Wand2,
  X,
} from "lucide-react";
import { courses } from "@/lib/courses";
import { useI18n } from "@/lib/i18n";

// ---------- Daily rotation helpers ----------
function dayIndex(offset = 0): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000) + offset;
}

function pickDaily<T>(arr: T[], offset = 0): T {
  return arr[((dayIndex(offset) % arr.length) + arr.length) % arr.length];
}

function useCountdownToMidnight() {
  const [ms, setMs] = useState(() => msToMidnight());
  useEffect(() => {
    const id = setInterval(() => setMs(msToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return { h, m, s };
}

function msToMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

const fmt = (n: number) => String(n).padStart(2, "0");

// ---------- Live "active" pulse indicator ----------
export function LivePulse({ label = "Live Updating" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-500">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {label}
    </span>
  );
}

// ---------- Recipe of the Day ----------
export function RecipeOfTheDay() {
  const { tx } = useI18n();
  const course = useMemo(() => pickDaily(courses), []);
  const { h, m, s } = useCountdownToMidnight();

  return (
    <section className="container mx-auto px-6 py-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-[oklch(0.97_0.02_70)] via-card to-[oklch(0.95_0.04_55)] p-8 shadow-[var(--shadow-warm)] md:p-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-warm)" }}
        />
        <div className="relative grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                <Sparkles className="h-3 w-3" /> Recipe of the Day
              </span>
              <LivePulse label="AI-Curated Today" />
            </div>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              {tx(course.title)}
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              {tx(course.description)}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Refreshes in {fmt(h)}:{fmt(m)}:{fmt(s)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/course/$id"
                params={{ id: course.id }}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
              >
                <PlayCircle className="h-4 w-4" /> Bake this today
              </Link>
              <Link
                to="/courses"
                className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Browse trending
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-warm)] ring-1 ring-border/50">
              <img
                src={course.image}
                alt={tx(course.title)}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium uppercase tracking-wider text-primary">
                  Today's Pick · #{dayIndex()}
                </span>
                <span className="text-muted-foreground">
                  {course.modules.length} modules ·{" "}
                  {course.modules.reduce((s, m) => s + m.lessons.length, 0)} lessons
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Live Trend Feed ----------
const TREND_POOL: { city: string; flag: string; title: string }[] = [
  { city: "Paris", flag: "🇫🇷", title: "Bone-marrow brown-butter financiers are everywhere this week" },
  { city: "New York", flag: "🇺🇸", title: "Cube croissants topped with miso caramel going viral on TikTok" },
  { city: "Tokyo", flag: "🇯🇵", title: "Mochi-cream donuts with yuzu glaze trending across Shibuya cafés" },
  { city: "Istanbul", flag: "🇹🇷", title: "Pistachio katmer reinvented as a layered entremet" },
  { city: "Seoul", flag: "🇰🇷", title: "Injeolmi tiramisu sweeping dessert bars in Gangnam" },
  { city: "Milan", flag: "🇮🇹", title: "Olive-oil gelato sandwiches with maldon salt at trattorias" },
  { city: "London", flag: "🇬🇧", title: "Custard tarts with burnt-honey tops outselling cronuts" },
  { city: "Dubai", flag: "🇦🇪", title: "Knafeh chocolate bars driving 3-week waitlists" },
  { city: "Mexico City", flag: "🇲🇽", title: "Concha hybrids with cardamom glaze featured by top pastelerías" },
  { city: "Lisbon", flag: "🇵🇹", title: "Modern pastéis with brown-butter custard and yuzu zest" },
];

export function LiveTrendFeed() {
  const trends = useMemo(() => {
    const start = dayIndex() % TREND_POOL.length;
    return [0, 1, 2, 3].map((i) => TREND_POOL[(start + i) % TREND_POOL.length]);
  }, []);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % trends.length), 4000);
    return () => clearInterval(id);
  }, [trends.length]);

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-primary" />
          <h3 className="font-serif text-lg text-foreground">Live Trend Feed</h3>
        </div>
        <LivePulse label="Live" />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Updated daily from our chefs in {trends.length} pastry capitals.
      </p>

      <ul className="mt-5 space-y-3">
        {trends.map((t, i) => {
          const isActive = i === active;
          return (
            <li
              key={t.city + i}
              className={`flex gap-3 rounded-2xl border p-3 transition-all duration-500 ${
                isActive
                  ? "border-primary/40 bg-primary/5 shadow-[0_8px_24px_-12px_oklch(0.7_0.15_50/0.4)]"
                  : "border-border/60 bg-background/50"
              }`}
            >
              <span className="text-2xl leading-none">{t.flag}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t.city}
                  </span>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500">
                      <TrendingUp className="h-3 w-3" /> trending now
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm leading-snug text-foreground">{t.title}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---------- Coming Soon Roadmap ----------
const UPCOMING = [
  { title: "Korean Cream Cheese Garlic Bread", days: 2, tag: "Trending in Seoul" },
  { title: "Modernist Entremets · Spheres & Mirrors", days: 4, tag: "Patisserie · Advanced" },
  { title: "Vegan Sourdough Croissants", days: 6, tag: "Plant-based" },
];

export function ComingSoonRoadmap() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-primary" />
          <h3 className="font-serif text-lg text-foreground">Dropping This Week</h3>
        </div>
        <LivePulse label="Roadmap" />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        New courses unlocking soon — set your alarm.
      </p>

      <ul className="mt-5 space-y-3">
        {UPCOMING.map((u) => (
          <UpcomingItem key={u.title} {...u} />
        ))}
      </ul>
    </div>
  );
}

function UpcomingItem({
  title,
  days,
  tag,
}: {
  title: string;
  days: number;
  tag: string;
}) {
  const target = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + days);
    return d.getTime();
  }, [days]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  return (
    <li className="rounded-2xl border border-border/60 bg-background/60 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-primary">{tag}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          <Clock className="h-3 w-3" />
          {d}d {fmt(h)}:{fmt(m)}:{fmt(s)}
        </span>
      </div>
    </li>
  );
}

// ---------- AI Curation badge ----------
export function AICurationBadge() {
  const { h } = useCountdownToMidnight();
  const hoursSince = 24 - h;
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-foreground/80">
      <Wand2 className="h-3.5 w-3.5 text-primary" />
      <span className="font-medium">AI refined course copy</span>
      <span className="text-muted-foreground">· {hoursSince}h ago</span>
      <LivePulse label="Auto" />
    </div>
  );
}

// ---------- Daily Pro Tip (corner toast) ----------
const PRO_TIPS = [
  "Aging your egg whites for 24 hours creates more stable macarons.",
  "Cold butter folded into laminated dough yields crisper, taller croissant layers.",
  "Salt your caramel off the heat — it prevents crystallization and deepens flavor.",
  "Bloom gelatin in ice water, not cold tap water, for a silkier mousse set.",
  "Toast your flour for 5 minutes before making pie dough to deepen the nutty notes.",
  "Weigh eggs in grams, not units — pastry tolerances are tighter than you think.",
  "Rest sponge batters 10 minutes before baking to even out crumb structure.",
  "Brûlée with a torch held 8 cm above — closer chars sugar before it caramelizes.",
];

export function DailyProTip() {
  const tip = useMemo(() => pickDaily(PRO_TIPS), []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `mc-tip-dismissed-${dayIndex()}`;
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`mc-tip-dismissed-${dayIndex()}`, "1");
    }
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-6 z-40 w-[22rem] max-w-[calc(100vw-3rem)] animate-fade-in">
      <div className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-[0_20px_60px_-20px_oklch(0.7_0.15_50/0.4)]">
        <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/10 to-transparent px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Today's Pro Tip
            </p>
            <LivePulse label="Daily" />
          </div>
          <button
            onClick={dismiss}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Dismiss tip"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="px-4 py-4 text-sm leading-relaxed text-foreground">
          Did you know? {tip}
        </p>
      </div>
    </div>
  );
}

// ---------- Combined sidebar widget ----------
export function LiveSidebar() {
  return (
    <aside className="space-y-6">
      <LiveTrendFeed />
      <ComingSoonRoadmap />
    </aside>
  );
}

// ---------- Section wrapping trend + roadmap for homepage ----------
export function LiveAndRoadmapSection() {
  return (
    <section className="container mx-auto px-6 py-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Live & Active
            </p>
            <LivePulse />
          </div>
          <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
            What's baking around the world today
          </h2>
        </div>
        <AICurationBadge />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <LiveTrendFeed />
        <ComingSoonRoadmap />
      </div>
    </section>
  );
}
