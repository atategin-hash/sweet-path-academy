import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { CourseCard } from "@/components/course-card";
import { CatalogSearch } from "@/components/catalog-search";
import { FreeMasterclasses } from "@/components/free-masterclasses";
import {
  RecipeOfTheDay,
  LiveAndRoadmapSection,
  DailyProTip,
} from "@/components/live-widgets";
import { courses } from "@/lib/courses";
import heroImg from "@/assets/hero-cake.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Star, Sparkles, Award, PlayCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MaisonCrumb — Online Cake & Pastry Academy" },
      { name: "description", content: "Learn cake decorating, pastry, bread, and chocolate craft from world-class chefs. On-demand video lessons for every level." },
      { property: "og:title", content: "MaisonCrumb — Online Cake & Pastry Academy" },
      { property: "og:description", content: "On-demand baking masterclasses from world-class pastry chefs." },
    ],
  }),
  component: HomePage,
});

const testimonials = [
  {
    quote: "Finally — someone took the chaos of YouTube baking and turned it into an actual course. I did Day 1 to Day 4 of the Italian masterclass in a single weekend.",
    name: "Lara Mendes",
    role: "Home baker, Lisbon",
  },
  {
    quote: "The bento cake module saved my daughter's birthday. The recipes are precise and the videos are the best on the internet.",
    name: "Daniel Ortiz",
    role: "Café owner, Mexico City",
  },
  {
    quote: "Mise en place changed how I bake forever. The bakery foundations course is genuinely the start I wish I'd had.",
    name: "Yuki Sato",
    role: "Student, Osaka",
  },
];

function HomePage() {
  const { t, tx } = useI18n();
  const featured = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* dark overlay for text readability */}
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="container relative z-10 mx-auto grid gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white">
              <Sparkles className="h-3.5 w-3.5" /> {t("home.eyebrow")}
            </span>
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              {t("home.heroLead")}
            </p>
            <div className="mt-8 max-w-xl">
              <CatalogSearch placeholder={t("home.searchPlaceholder")} />
              <p className="mt-2 pl-2 text-xs text-white/60">
                {t("home.searchHint")}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
              >
                {t("home.browse")}
              </Link>
              <Link
                to="/course/$id"
                params={{ id: "italian-pastries" }}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <PlayCircle className="h-4 w-4 text-white" /> {t("home.preview")}
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-2 font-medium text-white">4.9</span>
              </div>
              <span>{t("home.ratingFrom")}</span>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem]" style={{ background: "var(--gradient-warm)" }} />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]">
              <img
                src={heroImg}
                alt="Pastry chef decorating a layered cake with pink buttercream roses"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)] md:flex md:items-center md:gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Award className="h-5 w-5 text-primary" />
              </span>
              <div className="text-sm">
                <p className="font-medium text-foreground">{t("home.certified")}</p>
                <p className="text-muted-foreground">{t("home.lifetime")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecipeOfTheDay />

      <FreeMasterclasses />

      <LiveAndRoadmapSection />

      {/* FEATURED COURSES */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">{t("home.featured.eyebrow")}</p>
            <h2 className="mt-2 max-w-xl font-serif text-4xl text-foreground md:text-5xl">
              {t("home.featured.title")}
            </h2>
          </div>
          <Link to="/courses" className="text-sm font-medium text-primary hover:underline">
            {t("home.featured.viewAll")}
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">{t("home.testimonials.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
              {t("home.testimonials.title")}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm) => (
              <figure key={tm.name} className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-foreground">
                  "{tx(tm.quote)}"
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
                  <p className="font-medium text-foreground">{tm.name}</p>
                  <p className="text-muted-foreground">{tx(tm.role)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16" style={{ background: "var(--gradient-warm)" }}>
          <div className="relative max-w-2xl">
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              {t("home.cta.lead")}
            </p>
            <Link
              to="/courses"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              {t("home.cta.action")}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <DailyProTip />
    </div>
  );
}
