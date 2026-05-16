import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { Home, Store, Factory, Layers } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { CourseCard } from "@/components/course-card";
import { CatalogSearch } from "@/components/catalog-search";
import { FreeMasterclasses } from "@/components/free-masterclasses";
import { courses, type Tier } from "@/lib/courses";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  tier: fallback(z.enum(["all", "home", "business", "industrial"]), "all").default("all"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/courses/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "All Courses — MaisonCrumb Academy" },
      { name: "description", content: "Browse curated baking courses by production environment: home, café, or industrial." },
      { property: "og:title", content: "All Courses — MaisonCrumb Academy" },
      { property: "og:description", content: "Filter by production tier and find your next masterclass." },
    ],
  }),
  component: CoursesPage,
});

const TABS: { id: "all" | Tier; labelKey: string; Icon: typeof Home }[] = [
  { id: "all", labelKey: "tier.all.label", Icon: Layers },
  { id: "home", labelKey: "tier.home.label", Icon: Home },
  { id: "business", labelKey: "tier.business.label", Icon: Store },
  { id: "industrial", labelKey: "tier.industrial.label", Icon: Factory },
];

function CoursesPage() {
  const { tier, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t, tx } = useI18n();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (tier !== "all" && c.tier !== tier) return false;
      if (!term) return true;
      const hay = [c.title, tx(c.title), c.tagline, tx(c.tagline), c.description, tx(c.description), ...(c.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [tier, q, tx]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-6 py-16 md:py-20">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">{t("catalog.eyebrow")}</p>
        <h1 className="mt-2 max-w-2xl font-serif text-5xl text-foreground md:text-6xl">
          {t("catalog.title")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          {t("catalog.subtitle")}
        </p>

        <div className="mt-8 max-w-2xl">
          <CatalogSearch />
        </div>

        <div className="mt-10 flex flex-wrap gap-2 rounded-2xl border border-border/60 bg-card/50 p-2">
          {TABS.map((tab) => {
            const active = tab.id === tier;
            return (
              <button
                key={tab.id}
                onClick={() => navigate({ search: (s: { tier: typeof tier; q: string }) => ({ ...s, tier: tab.id }) })}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <tab.Icon className="h-4 w-4" />
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>

        {tier !== "all" && (
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{t(`tier.${tier as Tier}.label`)}:</span>{" "}
            {t(`tier.${tier as Tier}.description`)}
          </p>
        )}

        <div className="mt-10 grid gap-8 transition-all duration-500 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <div key={course.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
            <p className="font-serif text-2xl text-foreground">{t("catalog.emptyTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("catalog.emptyText")}
            </p>
          </div>
        )}
      </section>
      <FreeMasterclasses />
      <SiteFooter />
    </div>
  );
}
