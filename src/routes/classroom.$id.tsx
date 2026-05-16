import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-chrome";
import { getCourse, type Course } from "@/lib/courses";
import { useState } from "react";
import { PlayCircle, CheckCircle2, Lock, ChevronLeft, FileText, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/classroom/$id")({
  loader: ({ params }): { course: Course } => {
    const course = getCourse(params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `Classroom — ${loaderData.course.title}` }]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Classroom not found</h1>
        <Link to="/dashboard" className="mt-6 inline-block text-primary hover:underline">← Back to dashboard</Link>
      </div>
    </div>
  ),
  component: ClassroomPage,
});

function ClassroomPage() {
  const { course } = Route.useLoaderData();
  const [activeIdx, setActiveIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const active = course.syllabus[activeIdx];

  const toggleComplete = (i: number) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

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

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Video + content */}
          <div>
            <div
              className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]"
              style={{ backgroundImage: `url(${course.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-foreground/40" />
              <button
                className="absolute inset-0 flex items-center justify-center text-background transition-transform hover:scale-105"
                aria-label="Play lesson"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-background/95 text-primary shadow-[var(--shadow-warm)]">
                  <PlayCircle className="h-10 w-10" />
                </span>
              </button>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-foreground/80 to-transparent p-5 text-background">
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-80">
                    Lesson {activeIdx + 1} of {course.syllabus.length}
                  </p>
                  <p className="mt-1 font-serif text-xl">{active.title}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/20 px-3 py-1 text-xs backdrop-blur">
                  <Clock className="h-3.5 w-3.5" /> {active.duration}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary">{course.title}</p>
                  <h1 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">{active.title}</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    With {course.instructor.name} · {course.instructor.title}
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
                onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-40"
              >
                ← Previous lesson
              </button>
              <button
                disabled={activeIdx === course.syllabus.length - 1}
                onClick={() => setActiveIdx((i) => Math.min(course.syllabus.length - 1, i + 1))}
                className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              >
                Next lesson →
              </button>
            </div>
          </div>

          {/* Lesson outline sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              <div className="border-b border-border/60 p-5">
                <p className="text-xs uppercase tracking-wider text-primary">Course outline</p>
                <p className="mt-1 font-serif text-lg text-foreground">{course.title}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{completed.size}/{course.syllabus.length} complete</span>
                    <span>{Math.round((completed.size / course.syllabus.length) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(completed.size / course.syllabus.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <ol className="max-h-[28rem] overflow-y-auto">
                {course.syllabus.map((lesson: Course["syllabus"][number], i: number) => {
                  const isActive = i === activeIdx;
                  const isDone = completed.has(i);
                  const isLocked = i > 0 && !completed.has(i - 1) && !isActive && i !== activeIdx + 1;
                  return (
                    <li key={lesson.title}>
                      <button
                        onClick={() => !isLocked && setActiveIdx(i)}
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
                          {isDone ? <CheckCircle2 className="h-4 w-4" /> : isLocked ? <Lock className="h-3 w-3" /> : i + 1}
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm ${isActive ? "font-medium text-foreground" : "text-foreground"}`}>
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

            <Link
              to="/course/$id"
              params={{ id: course.slug }}
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
