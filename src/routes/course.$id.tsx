import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getCourse, totalLessons, type Course } from "@/lib/courses";
import { useStore } from "@/lib/store";
import { CourseFAQ } from "@/components/course-faq";
import { useI18n } from "@/lib/i18n";
import {
  Clock,
  BookOpen,
  BarChart3,
  PlayCircle,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Star,
  Layers,
  Sparkles,
  ChefHat,
  Wrench,
  Award,
  GraduationCap,
  FileText,
  Globe,
  Film,
  Plus,
  Minus,
  Info,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/course/$id")({
  loader: ({ params }): { course: Course } => {
    const course = getCourse(params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — MaisonCrumb` },
          { name: "description", content: loaderData.course.description },
          { property: "og:title", content: loaderData.course.title },
          { property: "og:description", content: loaderData.course.description },
          { property: "og:image", content: loaderData.course.image },
        ]
      : [],
  }),
  notFoundComponent: CourseNotFound,
  component: CoursePage,
});

function CourseNotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="font-serif text-4xl">{t("course.notFound")}</h1>
        <Link to="/courses" className="mt-6 inline-block text-primary hover:underline">← {t("course.backCatalog")}</Link>
      </div>
    </div>
  );
}

function CoursePage() {
  const { course } = Route.useLoaderData();
  const { t, tx } = useI18n();
  const lessonCount = totalLessons(course);
  const { addToCart, openDrawer, isInCart, isEnrolled } = useStore();
  const inCart = isInCart(course.id);
  const enrolled = isEnrolled(course.id);
  const features = ["course.feature.hd", "course.feature.recipes", "course.feature.qa", "course.feature.certificate"];
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-6 py-6 md:py-4">
        <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
          ← {t("course.all")}
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]">
              <img
                src={course.image}
                alt={tx(course.title)}
                width={800}
                height={640}
                className="aspect-[5/4] w-full object-cover"
              />
              <Link
                to="/classroom/$id"
                params={{ id: course.id }}
                className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity hover:opacity-100"
              >
                <span className="flex items-center gap-2 rounded-full bg-background/95 px-6 py-3 text-sm font-medium text-foreground">
                  <PlayCircle className="h-5 w-5 text-primary" /> {t("course.playPreview")}
                </span>
              </Link>
            </div>

            {/* ABOUT — minimal hero strip */}
            {(() => {
              const isMedovik = course.id === "medovik";
              const fullTitle = isMedovik ? "Medovik Excellence" : tx(course.title);
              const splitMatch = fullTitle.match(/^(.*?)\s*[:—–-]\s*(.+)$/);
              const mainTitle = isMedovik ? "Medovik Excellence" : splitMatch ? splitMatch[1] : fullTitle;
              const subTitle = isMedovik
                ? "Master the 8-layer honey cake"
                : (splitMatch ? splitMatch[2] : tx(course.tagline));
              const fullDesc = tx(course.description);

              return (
                <div className="mt-3 flex h-[100px] items-center justify-between gap-4 border-y border-border/50 px-4">
                  <h2 className="truncate font-serif font-light leading-none tracking-[-0.02em] text-foreground" style={{ fontSize: "32px" }}>
                    {mainTitle}
                  </h2>

                  {enrolled ? (
                    <Link
                      to="/classroom/$id"
                      params={{ id: course.id }}
                      className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
                    >
                      <PlayCircle className="h-4 w-4" /> {t("course.continue")}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (!inCart) addToCart(course.id);
                        openDrawer();
                      }}
                      className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {inCart ? t("course.viewInCart") : "Bake this today"}
                    </button>
                  )}
                </div>
              );
            })()}

            {/* AT A GLANCE */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:grid-cols-4">
              {[
                { Icon: Clock, label: "Duration", value: course.duration },
                { Icon: GraduationCap, label: "Level", value: t(`difficulty.${course.difficulty}`) },
                { Icon: FileText, label: "Includes", value: "Digital Workbook" },
                { Icon: Globe, label: "Language", value: "English (CC)" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl text-foreground md:text-3xl">Key Techniques</h2>
                <ul className="mt-5 space-y-3">
                  {course.learningOutcomes.map((outcome: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-base leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* COURSE TRAILER PLACEHOLDER */}
            <div className="mt-12">
              <Link
                to="/classroom/$id"
                params={{ id: course.id }}
                className="group relative block overflow-hidden rounded-3xl border border-border/60"
              >
                <div
                  className="relative aspect-[16/7] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                >
                  <div className="absolute inset-0 bg-foreground/55 transition-colors group-hover:bg-foreground/45" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-warm)] transition-transform group-hover:scale-105">
                      <Film className="h-7 w-7" />
                    </span>
                    <p className="mt-4 text-[10px] font-light uppercase tracking-[0.3em] text-white/80">Course Trailer</p>
                    <p className="mt-1 font-serif text-xl text-white md:text-2xl">Watch the 90-second preview</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="font-serif text-2xl text-foreground md:text-3xl">{t("course.curriculum")}</h2>
                <span className="text-sm text-muted-foreground">
                  {course.modules.length} {t("common.modules")} · {lessonCount} {t("common.lessons")} · {course.duration}
                </span>
              </div>

              {/* 4-phase curriculum overview */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { Icon: Sparkles, title: "Introduction", desc: "Heritage context and studio set-up." },
                  { Icon: ChefHat, title: "Core Technique", desc: "The defining craft of the discipline." },
                  { Icon: Wrench, title: "Assembly", desc: "Architectural build and structure." },
                  { Icon: Award, title: "Finishing", desc: "Luxury presentation and signature." },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-border/60 bg-card/50 p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <p className="mt-3 font-serif text-base text-foreground">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {course.modules.map((mod: Course["modules"][number], mIdx: number) => (
                  <details
                    key={mod.id}
                    open={mIdx === 0}
                    className="group overflow-hidden rounded-2xl border border-border/60 bg-card"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                        <Layers className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-primary">
                          {t("common.module")} {mIdx + 1}
                        </p>
                        <p className="font-serif text-xl text-foreground">{tx(mod.title)}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {mod.lessons.length} {t("common.lessons")}
                      </span>
                      <span className="text-muted-foreground transition-transform group-open:rotate-180">▾</span>
                    </summary>
                    <ul className="divide-y divide-border/60 border-t border-border/60">
                      {mod.lessons.map((lesson: Course["modules"][number]["lessons"][number], lIdx: number) => (
                        <li key={lesson.id} className="flex items-center gap-4 px-5 py-4">
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                            {lIdx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{tx(lesson.title)}</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                          <PlayCircle className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                  {t(`difficulty.${course.difficulty}`)}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                  <span>({course.reviews})</span>
                </span>
              </div>
              <h1 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
                {tx(course.title)}
              </h1>
              <p className="mt-3 text-muted-foreground">{tx(course.tagline)}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-foreground">${course.price}</span>
                <span className="text-sm text-muted-foreground">/ {t("course.lifetime")}</span>
              </div>

              {enrolled ? (
                <Link
                  to="/classroom/$id"
                  params={{ id: course.id }}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
                >
                  <PlayCircle className="h-4 w-4" /> {t("course.continue")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (!inCart) addToCart(course.id);
                    openDrawer();
                  }}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {inCart ? t("course.viewInCart") : t("course.addToCart")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <Link
                to="/classroom/$id"
                params={{ id: course.id }}
                className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <PlayCircle className="h-4 w-4 text-primary" /> {t("course.preview")}
              </Link>

              <dl className="mt-8 space-y-3 border-t border-border/60 pt-6 text-sm">
                <Stat icon={<Clock className="h-4 w-4" />} label={t("course.runtime")} value={course.duration} />
                <Stat icon={<BookOpen className="h-4 w-4" />} label={t("course.lessons")} value={`${lessonCount} ${t("common.videos")}`} />
                <Stat icon={<Layers className="h-4 w-4" />} label={t("course.modules")} value={String(course.modules.length)} />
                <Stat icon={<BarChart3 className="h-4 w-4" />} label={t("course.difficulty")} value={t(`difficulty.${course.difficulty}`)} />
              </dl>

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm font-medium text-foreground">{t("course.instructor")}</p>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-12 w-12 rounded-full border border-border bg-accent"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium text-foreground">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Award className="h-3.5 w-3.5" /> Expert Guidance
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Learn from industry veterans with years of experience in luxury pastry shops.
                </p>
              </div>

              <ul className="mt-8 space-y-2 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {t(f)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <CourseFAQ course={course} className="mt-20 max-w-3xl" />
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-muted-foreground">{icon}{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
