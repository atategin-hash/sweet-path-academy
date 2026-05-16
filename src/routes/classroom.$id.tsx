import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-chrome";
import { getCourse, flatLessons, type Course } from "@/lib/courses";
import { useMemo, useRef, useState } from "react";
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  ChevronLeft,
  FileText,
  MessageCircle,
  Clock,
} from "lucide-react";

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
      <SiteHeader />
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = lessons[activeIdx];

  const toggleComplete = (i: number) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const pickLesson = (i: number) => {
    setActiveIdx(i);
    // ensure the video reloads the new src
    queueMicrotask(() => videoRef.current?.load());
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Video + content */}
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-foreground shadow-[var(--shadow-warm)]">
              <video
                ref={videoRef}
                key={active.id}
                src={active.videoUrl}
                poster={course.image}
                controls
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary">
                    {course.title} · Lesson {activeIdx + 1} of {lessons.length}
                  </p>
                  <h1 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">{active.title}</h1>
                  <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="h-7 w-7 rounded-full border border-border bg-accent"
                    />
                    With {course.instructor.name} · {course.instructor.title}
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {active.duration}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => toggleComplete(activeIdx)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
                    completed.has(activeIdx)
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {completed.has(activeIdx) ? "Completed" : "Mark complete"}
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-4 text-left transition-colors hover:bg-accent">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Recipe PDF</p>
                    <p className="text-xs text-muted-foreground">Download · 2 pages</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-4 text-left transition-colors hover:bg-accent">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Ask the chef</p>
                    <p className="text-xs text-muted-foreground">Q&A community</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                disabled={activeIdx === 0}
                onClick={() => pickLesson(Math.max(0, activeIdx - 1))}
                className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-40"
              >
                ← Previous lesson
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

          {/* Lesson outline sidebar — grouped by module */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              <div className="border-b border-border/60 p-5">
                <p className="text-xs uppercase tracking-wider text-primary">Course outline</p>
                <p className="mt-1 font-serif text-lg text-foreground">{course.title}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {completed.size}/{lessons.length} complete
                    </span>
                    <span>{Math.round((completed.size / lessons.length) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(completed.size / lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="max-h-[32rem] overflow-y-auto">
                {course.modules.map((mod, mIdx) => {
                  // compute the absolute index offset for lessons in earlier modules
                  const offset = course.modules
                    .slice(0, mIdx)
                    .reduce((sum, m) => sum + m.lessons.length, 0);

                  return (
                    <div key={mod.id}>
                      <div className="sticky top-0 border-b border-border/40 bg-muted/60 px-5 py-2 backdrop-blur">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Module {mIdx + 1}
                        </p>
                        <p className="text-sm font-medium text-foreground">{mod.title}</p>
                      </div>
                      <ol>
                        {mod.lessons.map((lesson, lIdx) => {
                          const absIdx = offset + lIdx;
                          const isActive = absIdx === activeIdx;
                          const isDone = completed.has(absIdx);
                          const isLocked =
                            absIdx > 0 &&
                            !completed.has(absIdx - 1) &&
                            !isActive &&
                            absIdx !== activeIdx + 1;
                          return (
                            <li key={lesson.id}>
                              <button
                                onClick={() => !isLocked && pickLesson(absIdx)}
                                disabled={isLocked}
                                className={`flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-colors ${
                                  isActive ? "bg-accent" : "hover:bg-accent/50"
                                } ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
                              >
                                <span
                                  className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                                    isDone
                                      ? "bg-primary text-primary-foreground"
                                      : isActive
                                      ? "bg-foreground text-background"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                  ) : isLocked ? (
                                    <Lock className="h-3 w-3" />
                                  ) : isActive ? (
                                    <PlayCircle className="h-4 w-4" />
                                  ) : (
                                    absIdx + 1
                                  )}
                                </span>
                                <div className="flex-1">
                                  <p
                                    className={`text-sm ${
                                      isActive ? "font-medium text-foreground" : "text-foreground"
                                    }`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" /> {lesson.duration}
                                  </p>
                                </div>
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
              className="mt-4 block rounded-2xl border border-border/60 bg-card p-5 text-sm text-muted-foreground transition-colors hover:bg-accent"
            >
              View full course details →
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
