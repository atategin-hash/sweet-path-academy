import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { courses, getCourse } from "@/lib/courses";
import { enrolledCourses } from "@/lib/enrollment";
import { PlayCircle, Clock, BookOpen, Trophy, Flame } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — MaisonCrumb" },
      { name: "description", content: "Track your progress and continue your enrolled cake and pastry courses." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const enrolled = enrolledCourses
    .map((e) => ({ ...e, course: getCourse(e.id)! }))
    .filter((e) => e.course);

  const recommended = courses.filter((c) => !enrolled.some((e) => e.id === c.id)).slice(0, 3);
  const avgProgress = Math.round((enrolled.reduce((a, b) => a + b.progress, 0) / enrolled.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">My dashboard</p>
            <h1 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
              Welcome back, baker.
            </h1>
            <p className="mt-2 text-muted-foreground">Pick up where you left off and keep the oven warm.</p>
          </div>
          <Link
            to="/courses"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Browse more courses
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard icon={<BookOpen className="h-5 w-5" />} label="Enrolled courses" value={String(enrolled.length)} />
          <StatCard icon={<Trophy className="h-5 w-5" />} label="Average progress" value={`${avgProgress}%`} />
          <StatCard icon={<Flame className="h-5 w-5" />} label="Day streak" value="7" />
        </div>

        {/* Continue learning */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl text-foreground">Continue learning</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {enrolled.map(({ course, progress, lastLesson }) => {
              const pct = Math.round(progress * 100);
              return (
                <div
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card sm:flex-row"
                >
                  <div className="aspect-[5/4] w-full sm:aspect-auto sm:w-48 sm:flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-wider text-primary">{course.difficulty}</p>
                    <h3 className="mt-1 font-serif text-xl text-foreground">{course.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Lesson {lastLesson} of {course.syllabus.length} ·{" "}
                      <span className="text-foreground">{course.syllabus[lastLesson - 1]?.title}</span>
                    </p>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{pct}% complete</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link
                        to="/classroom/$id"
                        params={{ id: course.id }}
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
                      >
                        <PlayCircle className="h-4 w-4" /> Resume lesson
                      </Link>
                      <Link
                        to="/course/$id"
                        params={{ id: course.id }}
                        className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm text-foreground hover:bg-accent"
                      >
                        Course details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl text-foreground">Recommended for you</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recommended.map((c) => (
              <Link
                key={c.id}
                to="/course/$id"
                params={{ id: c.id }}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <img src={c.image} alt={c.title} loading="lazy" className="aspect-video w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-primary">{c.difficulty}</p>
                  <p className="mt-1 font-serif text-lg text-foreground">{c.title}</p>
                  <p className="mt-3 text-sm text-primary group-hover:underline">View course →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-serif text-2xl text-foreground">{value}</p>
      </div>
    </div>
  );
}
