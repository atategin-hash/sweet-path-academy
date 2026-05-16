import { Link } from "@tanstack/react-router";
import { PlayCircle, Sparkles } from "lucide-react";
import { courses } from "@/lib/courses";

export function FreeMasterclasses() {
  const free = courses.filter((c) => c.free);
  if (free.length === 0) return null;

  return (
    <section className="border-y border-emerald-500/15 bg-gradient-to-b from-emerald-50/60 via-background to-background py-20 dark:from-emerald-950/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" /> Ücretsiz Uzmanlık Dersleri
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl text-foreground md:text-5xl">
              Free Masterclasses — Start Baking Now
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              Stream the full lessons instantly. No sign-up, no credit card — just press play.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {free.map((c) => (
            <Link
              key={c.id}
              to="/classroom/$id"
              params={{ id: c.id }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                  ★ Free
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-xl transition-transform group-hover:scale-110">
                    <PlayCircle className="h-8 w-8" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/80">{c.duration}</p>
                  <h3 className="mt-1 font-serif text-xl leading-tight text-white">{c.title}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <span className="text-sm text-muted-foreground">{c.instructor.name}</span>
                <span className="text-sm font-semibold text-emerald-600">Watch now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
