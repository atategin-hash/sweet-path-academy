import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  getCourse,
  flatLessons,
  scaleIngredient,
  type Course,
  type ScaleMode,
} from "@/lib/courses";
import { useEffect, useMemo, useState } from "react";
import {
  Play,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Clock,
  Download,
  MessageCircle,
  Sparkles,
  ListChecks,
  BookOpen,
  ChefHat,
  Timer,
  Users,
  Home,
  Store,
  Factory,
  Headphones,
  Subtitles as SubtitlesIcon,
  Wand2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseFAQDark } from "@/components/course-faq";
import { CountdownUpsell, NextStepTeaser, LockedChefSecrets } from "@/components/free-upsell";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const classroomSearch = z.object({
  lesson: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/classroom/$id")({
  validateSearch: zodValidator(classroomSearch),
  loader: ({ params }): { course: Course } => {
    const course = getCourse(params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Classroom — ${loaderData.course.title}` }] : [],
  }),
  notFoundComponent: ClassroomNotFound,
  component: ClassroomPage,
});

function ClassroomNotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">{t("classroom.notFound")}</h1>
        <Link to="/dashboard" className="mt-6 inline-block text-primary hover:underline">
          ← {t("classroom.backDashboard")}
        </Link>
      </div>
    </div>
  );
}

function ClassroomPage() {
  const { course } = Route.useLoaderData();
  const { lesson: lessonParam } = Route.useSearch();
  const { t, tx, lang } = useI18n();
  const lessons = useMemo(() => flatLessons(course), [course]);
  const initialIdx = useMemo(() => {
    if (!lessonParam) return 0;
    const i = lessons.findIndex((l) => l.id === lessonParam);
    return i >= 0 ? i : 0;
  }, [lessons, lessonParam]);
  const [activeIdx, setActiveIdx] = useState(initialIdx);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [started, setStarted] = useState(false);
  const [audioLang, setAudioLang] = useState<Lang>(lang);
  const [subLang, setSubLang] = useState<Lang | "off">(lang === "en" ? "off" : lang);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const active = lessons[activeIdx];

  useEffect(() => {
    setAudioLang(lang);
    setSubLang(lang === "en" ? "off" : lang);
  }, [lang]);

  const pct = Math.round((completed.size / lessons.length) * 100);

  const pickLesson = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      for (let k = 0; k < i; k++) next.add(k);
      return next;
    });
    setActiveIdx(i);
    setStarted(false);
  };

  const markComplete = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(activeIdx);
      return next;
    });
    if (course.free) setTeaserOpen(true);
  };

  const isYouTube = active.videoUrl.includes("youtube.com/embed");
  const embedSrc = isYouTube ? `${active.videoUrl}${active.videoUrl.includes("?") ? "&" : "?"}autoplay=1` : active.videoUrl;

  return (
    <div className="min-h-screen bg-[oklch(0.16_0.01_60)] text-[oklch(0.96_0.01_60)]">
      {/* Distraction-free topbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[oklch(0.14_0.01_60)]/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> {t("classroom.exit")}
          </Link>
          <div className="hidden flex-1 px-8 md:block">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-wider text-white/50">{tx(course.title)}</span>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs font-medium text-white/70">{pct}%</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector variant="dark" />
            <div className="hidden items-center gap-2 text-sm text-white/60 sm:inline-flex">
              <Sparkles className="h-4 w-4 text-primary" />
              {completed.size}/{lessons.length}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Player + tabs */}
          <div className="min-w-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
              {started ? (
                <iframe
                  key={active.id}
                  src={embedSrc}
                  title={tx(active.title)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setStarted(true)}
                  className="group relative block h-full w-full"
                  aria-label="Play lesson"
                >
                  <img src={course.image} alt={tx(active.title)} className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-95" />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/20 to-black/40">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/95 shadow-[0_8px_40px_-4px_oklch(0.7_0.15_50/0.6)] ring-4 ring-white/20 transition-transform group-hover:scale-105">
                      <Play className="ml-1 h-8 w-8 text-primary-foreground" fill="currentColor" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      {t("recipe.step") /* reuse */} {activeIdx + 1} · {active.duration}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl text-white md:text-3xl">{tx(active.title)}</h2>
                  </div>
                </button>
              )}
            </div>

            {/* AI Translation control bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 pl-4">
              <p className="inline-flex items-center gap-2 text-xs text-white/60">
                <span className="text-base leading-none">🤖</span>
                {t("classroom.aiPowered")}
              </p>
              <div className="flex items-center gap-2">
                <AudioPicker value={audioLang} onChange={setAudioLang} label={t("classroom.audio")} />
                <SubtitlePicker value={subLang} onChange={setSubLang} label={t("classroom.subtitles")} offLabel={t("classroom.subtitlesOff")} />
              </div>
            </div>

            {/* Lesson header + actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
                <div>
                  <p className="text-sm font-medium text-white">{course.instructor.name}</p>
                  <p className="text-xs text-white/50">{course.instructor.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markComplete}
                  className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all ${
                    completed.has(activeIdx)
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {completed.has(activeIdx) ? t("classroom.completed") : t("classroom.markComplete")}
                </button>
                <button
                  disabled={activeIdx === lessons.length - 1}
                  onClick={() => pickLesson(Math.min(lessons.length - 1, activeIdx + 1))}
                  className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40"
                >
                  {t("classroom.next")} →
                </button>
              </div>
            </div>

            {/* Subtitle simulation strip */}
            {subLang !== "off" && started && (
              <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm italic text-white/80">
                <span className="mr-2 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] uppercase tracking-wider not-italic text-primary">
                  <SubtitlesIcon className="h-3 w-3" /> {LANGUAGES.find((l) => l.code === subLang)?.label}
                </span>
                {tx(active.title)} — {t("classroom.aiTranslating")}
              </div>
            )}

            {/* Tabs */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <Tabs defaultValue="overview" value={undefined} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <BookOpen className="mr-2 h-4 w-4" /> {t("tabs.overview")}
                  </TabsTrigger>
                  <TabsTrigger value="recipes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <ListChecks className="mr-2 h-4 w-4" /> {t("tabs.recipes")}
                  </TabsTrigger>
                  <TabsTrigger value="discussion" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <MessageCircle className="mr-2 h-4 w-4" /> {t("tabs.discussion")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <h3 className="font-serif text-xl text-white">{t("classroom.aboutLesson")}</h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {tx(course.description)}
                  </p>
                  {lang !== "en" && (
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary">
                      <Wand2 className="h-3 w-3" /> {t("classroom.aiTranslating")}
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="recipes" className="mt-6">
                  <RecipePanel lesson={active} defaultMode={course.tier} />
                </TabsContent>

                <TabsContent value="discussion" className="mt-6 space-y-4">
                  <h3 className="font-serif text-xl text-white">{t("classroom.discussionTitle")}</h3>
                  <p className="text-sm text-white/60">{t("classroom.discussionBody")}</p>
                  <textarea
                    rows={3}
                    placeholder={t("classroom.commentPlaceholder")}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
                      {t("classroom.postComment")}
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {sampleComments.map((c) => (
                      <div key={c.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-sm font-medium text-white">{c.name}</p>
                        <p className="mt-1 text-sm text-white/70">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Curriculum sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
              <div className="border-b border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{t("classroom.curriculum")}</p>
                <p className="mt-1 font-serif text-lg text-white">{tx(course.title)}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                  <span>{completed.size} {t("common.of")} {lessons.length} {t("common.lessons")}</span>
                  <span className="font-medium text-white">{pct}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="max-h-[34rem] overflow-y-auto">
                {course.modules.map((mod: Course["modules"][number], mIdx: number) => {
                  const offset = course.modules
                    .slice(0, mIdx)
                    .reduce((s: number, m: Course["modules"][number]) => s + m.lessons.length, 0);
                  return (
                    <div key={mod.id}>
                      <div className="sticky top-0 border-b border-white/10 bg-[oklch(0.14_0.01_60)]/90 px-5 py-2.5 backdrop-blur">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{t("common.module")} {mIdx + 1}</p>
                        <p className="text-sm font-medium text-white">{tx(mod.title)}</p>
                      </div>
                      <ol>
                        {mod.lessons.map((lesson: Course["modules"][number]["lessons"][number], lIdx: number) => {
                          const absIdx = offset + lIdx;
                          const isActive = absIdx === activeIdx;
                          const isDone = completed.has(absIdx);
                          return (
                            <li key={lesson.id}>
                              <button
                                onClick={() => pickLesson(absIdx)}
                                className={`flex w-full items-start gap-3 border-b border-white/5 px-5 py-3.5 text-left transition-colors ${
                                  isActive ? "bg-primary/15" : "hover:bg-white/[0.04]"
                                }`}
                              >
                                <span
                                  className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                                    isDone
                                      ? "bg-primary text-primary-foreground"
                                      : isActive
                                      ? "bg-white text-[oklch(0.16_0.01_60)]"
                                      : "bg-white/10 text-white/60"
                                  }`}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                  ) : isActive ? (
                                    <Play className="h-3 w-3" fill="currentColor" />
                                  ) : (
                                    absIdx + 1
                                  )}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className={`truncate text-sm ${isActive ? "text-white" : isDone ? "text-white/60" : "text-white/85"}`}>
                                    {tx(lesson.title)}
                                  </p>
                                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/40">
                                    <Clock className="h-3 w-3" /> {lesson.duration}
                                  </p>
                                </div>
                                {!isActive && !isDone && absIdx > activeIdx + 1 && (
                                  <Lock className="mt-1 h-3 w-3 flex-shrink-0 text-white/30" />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              to="/course/$id"
              params={{ id: course.id }}
              className="mt-4 block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t("course.fullDetails")} →
            </Link>
          </aside>
        </div>

        <CourseFAQDark course={course} className="mt-16 max-w-3xl" />
      </div>
    </div>
  );
}

const SCALE_TABS: { id: ScaleMode; labelKey: string; Icon: typeof Home; hintKey: string }[] = [
  { id: "home", labelKey: "tier.home.label", Icon: Home, hintKey: "scale.home.hint" },
  { id: "business", labelKey: "tier.business.label", Icon: Store, hintKey: "scale.business.hint" },
  { id: "industrial", labelKey: "tier.industrial.label", Icon: Factory, hintKey: "scale.industrial.hint" },
];

function RecipePanel({
  lesson,
  defaultMode,
}: {
  lesson: ReturnType<typeof flatLessons>[number];
  defaultMode: ScaleMode;
}) {
  const { t, tx, lang } = useI18n();
  const r = lesson.recipe;
  const [mode, setMode] = useState<ScaleMode>(defaultMode);
  if (!r) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/60">
        {t("classroom.noRecipe")}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            {t("tabs.recipes")}
            {lang !== "en" && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] not-italic text-primary">
                <Wand2 className="h-3 w-3" /> {t("classroom.aiTranslating")}
              </span>
            )}
          </p>
          <h3 className="mt-1 font-serif text-2xl text-white">{tx(lesson.title)}</h3>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-white/60">
          {r.servings && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5">
              <Users className="h-3.5 w-3.5 text-primary" /> {t("recipe.servings")}: {tx(r.servings)}
            </span>
          )}
          {r.time && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5">
              <Timer className="h-3.5 w-3.5 text-primary" /> {t("recipe.time")}: {tx(r.time)}
            </span>
          )}
        </div>
      </div>

      {/* Tier scaling selector */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          {t("classroom.scale")}
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {SCALE_TABS.map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`flex flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_oklch(0.7_0.15_50/0.6)]"
                    : "bg-white/[0.02] text-white/70 hover:bg-white/[0.06]"
                }`}
              >
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <tab.Icon className="h-3.5 w-3.5" />
                  {t(tab.labelKey)}
                </span>
                <span className={`text-[10px] ${active ? "text-primary-foreground/80" : "text-white/40"}`}>
                  {t(tab.hintKey)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">
          {t("recipe.ingredients")} <span className="text-white/30">· {t(SCALE_TABS.find((tab) => tab.id === mode)?.hintKey ?? "")}</span>
        </h4>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {r.ingredients.map((ing, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-all">
              <span className="text-white/85">{tx(ing.item)}</span>
              <span className="flex-shrink-0 font-medium text-primary tabular-nums">
                {scaleIngredient(ing.qty, mode)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">{t("recipe.steps")}</h4>
        <ol className="space-y-3">
          {r.steps.map((step, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-white/80">
                <span className="mr-2 text-xs uppercase tracking-wider text-white/40">{t("recipe.step")} {i + 1}</span>
                {tx(step)}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {r.chefNotes && r.chefNotes.length > 0 && (
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <ChefHat className="h-4 w-4" /> {t("recipe.chefNotes")}
          </div>
          <ul className="space-y-1.5 text-sm text-white/80">
            {r.chefNotes.map((n, i) => (
              <li key={i}>— {tx(n)}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => window.print()}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white transition-colors hover:bg-white/10"
      >
        <Download className="h-4 w-4" /> {t("classroom.print")}
      </button>
    </div>
  );
}

const sampleComments = [
  { name: "Olivia R.", text: "The mise en place breakdown finally clicked for me. Best 5 minutes I've spent in the kitchen." },
  { name: "Daniel K.", text: "Loved the slow-motion piping shots — so much easier to follow than other tutorials." },
];

const ORIGINAL_AUDIO: Lang = "en";

function AudioPicker({
  value,
  onChange,
  label,
}: {
  value: Lang;
  onChange: (l: Lang) => void;
  label: string;
}) {
  const { t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === value)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white">
        <Headphones className="h-3.5 w-3.5 text-primary" />
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.native}</span>
        <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] uppercase text-primary">
          {value === ORIGINAL_AUDIO ? t("common.original") : t("common.ai")}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => onChange(l.code)}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <span className="flex-1 text-sm">{l.native}</span>
            <span className="text-[10px] uppercase text-muted-foreground">
              {l.code === ORIGINAL_AUDIO ? t("common.original") : t("common.aiDubbed")}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SubtitlePicker({
  value,
  onChange,
  label,
  offLabel,
}: {
  value: Lang | "off";
  onChange: (v: Lang | "off") => void;
  label: string;
  offLabel: string;
}) {
  const current = value === "off" ? null : LANGUAGES.find((l) => l.code === value)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white">
        <SubtitlesIcon className="h-3.5 w-3.5 text-primary" />
        {current ? (
          <>
            <span className="text-sm leading-none">{current.flag}</span>
            <span className="hidden sm:inline">CC · {current.label}</span>
          </>
        ) : (
          <span>CC {offLabel}</span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange("off")} className="cursor-pointer text-sm">
          {offLabel}
        </DropdownMenuItem>
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => onChange(l.code)}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <span className="flex-1 text-sm">{l.native}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
