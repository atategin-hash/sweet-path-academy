import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCourse, flatLessons, type Course } from "@/lib/courses";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Clock,
  Download,
  MessageCircle,
  Sparkles,
  ListChecks,
  BookOpen,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/classroom/$id")({
  loader: ({ params }): { course: Course } => {
    const course = getCourse(params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Classroom — ${loaderData.course.title}` }] : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Classroom not found</h1>
        <Link to="/dashboard" className="mt-6 inline-block text-primary hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  ),
  component: ClassroomPage,
});

function ClassroomPage() {
  const { course } = Route.useLoaderData();
  const lessons = useMemo(() => flatLessons(course), [course]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = lessons[activeIdx];

  const pct = Math.round((completed.size / lessons.length) * 100);

  const pickLesson = (i: number) => {
    // Auto-mark all previous lessons as completed
    setCompleted((prev) => {
      const next = new Set(prev);
      for (let k = 0; k < i; k++) next.add(k);
      return next;
    });
    setActiveIdx(i);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const markComplete = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(activeIdx);
      return next;
    });
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      setIsPlaying(false);
      markComplete();
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  return (
    <div className="min-h-screen bg-[oklch(0.16_0.01_60)] text-[oklch(0.96_0.01_60)]">
      {/* Minimal distraction-free topbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[oklch(0.14_0.01_60)]/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> Exit classroom
          </Link>
          <div className="hidden flex-1 px-8 md:block">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-wider text-white/50">
                {course.title}
              </span>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-white/70">{pct}%</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <Sparkles className="h-4 w-4 text-primary" />
            {completed.size}/{lessons.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Video + tabs */}
          <div className="min-w-0">
            <div
              className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                key={active.id}
                src={active.videoUrl}
                poster={course.image}
                className="h-full w-full object-cover"
                playsInline
              />

              {/* Custom play overlay */}
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-black/30 transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/95 shadow-[0_8px_40px_-4px_oklch(0.7_0.15_50/0.6)] ring-4 ring-white/20 transition-transform duration-300 hover:scale-105">
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-primary-foreground" />
                  ) : (
                    <Play className="ml-1 h-8 w-8 text-primary-foreground" fill="currentColor" />
                  )}
                </div>
              </div>

              {/* Bottom info gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Lesson {activeIdx + 1} · {active.duration}
                </p>
                <h2 className="mt-1 font-serif text-2xl text-white md:text-3xl">
                  {active.title}
                </h2>
              </div>

              {/* Native controls toggle in corner */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const v = videoRef.current;
                  if (v) v.controls = !v.controls;
                }}
                className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/80 opacity-0 backdrop-blur transition-opacity hover:bg-black/60 group-hover:opacity-100"
              >
                Toggle controls
              </button>
            </div>

            {/* Lesson header + actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5"
                />
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
                  {completed.has(activeIdx) ? "Completed" : "Mark complete"}
                </button>
                <button
                  disabled={activeIdx === lessons.length - 1}
                  onClick={() => pickLesson(Math.min(lessons.length - 1, activeIdx + 1))}
                  className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40"
                >
                  Next lesson →
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <BookOpen className="mr-2 h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="recipes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <ListChecks className="mr-2 h-4 w-4" /> Recipes
                  </TabsTrigger>
                  <TabsTrigger value="discussion" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <MessageCircle className="mr-2 h-4 w-4" /> Discussion
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <h3 className="font-serif text-xl text-white">About this lesson</h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {course.description} In this lesson, <span className="text-white">{active.title}</span>,
                    {" "}{course.instructor.name} walks you through every step at a relaxed,
                    studio-quality pace so you can pause, practice, and rewind whenever you need to.
                  </p>
                  <ul className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Duration {active.duration}</li>
                    <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Difficulty {course.difficulty}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> HD studio video</li>
                    <li className="flex items-center gap-2"><Download className="h-4 w-4 text-primary" /> Recipe card included</li>
                  </ul>
                </TabsContent>

                <TabsContent value="recipes" className="mt-6 space-y-4">
                  <h3 className="font-serif text-xl text-white">Ingredients</h3>
                  <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                    {sampleIngredients.map((ing) => (
                      <li key={ing.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                        <span>{ing.name}</span>
                        <span className="text-white/50">{ing.qty}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-2 inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white transition-colors hover:bg-white/10">
                    <Download className="h-4 w-4" /> Download recipe PDF
                  </button>
                </TabsContent>

                <TabsContent value="discussion" className="mt-6 space-y-4">
                  <h3 className="font-serif text-xl text-white">Ask the chef</h3>
                  <p className="text-sm text-white/60">Share your bake, ask a question, get feedback from {course.instructor.name} and the community.</p>
                  <textarea
                    rows={3}
                    placeholder="What did you discover in this lesson?"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
                      Post comment
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
                <p className="text-xs uppercase tracking-[0.2em] text-primary">Curriculum</p>
                <p className="mt-1 font-serif text-lg text-white">{course.title}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                  <span>{completed.size} of {lessons.length} lessons</span>
                  <span className="font-medium text-white">{pct}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
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
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                          Module {mIdx + 1}
                        </p>
                        <p className="text-sm font-medium text-white">{mod.title}</p>
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
                                    {lesson.title}
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
              View full course details →
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

const sampleIngredients = [
  { name: "Almond flour", qty: "200g" },
  { name: "Powdered sugar", qty: "200g" },
  { name: "Egg whites, aged", qty: "150g" },
  { name: "Granulated sugar", qty: "200g" },
  { name: "Water", qty: "50ml" },
  { name: "Food coloring", qty: "as needed" },
];

const sampleComments = [
  { name: "Olivia R.", text: "The macaronage tip at 7:42 finally made it click for me. My shells came out perfect!" },
  { name: "Daniel K.", text: "Loved the slow-motion piping shots — so much easier to follow than other tutorials." },
];
