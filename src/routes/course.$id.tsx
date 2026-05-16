import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getCourse, totalLessons, type Course } from "@/lib/courses";
import { useStore } from "@/lib/store";
import { CourseFAQ } from "@/components/course-faq";
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
} from "lucide-react";

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
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Course not found</h1>
        <Link to="/courses" className="mt-6 inline-block text-primary hover:underline">← Back to catalog</Link>
      </div>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  const lessonCount = totalLessons(course);
  const { addToCart, openDrawer, isInCart, isEnrolled } = useStore();
  const inCart = isInCart(course.id);
  const enrolled = isEnrolled(course.id);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-6 py-12 md:py-16">
        <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
          ← All courses
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]">
              <img
                src={course.image}
                alt={course.title}
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
                  <PlayCircle className="h-5 w-5 text-primary" /> Play preview
                </span>
              </Link>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-3xl text-foreground">About this course</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{course.description}</p>
            </div>

            {/* Curriculum */}
            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="font-serif text-3xl text-foreground">Curriculum</h2>
                <span className="text-sm text-muted-foreground">
                  {course.modules.length} modules · {lessonCount} lessons · {course.duration}
                </span>
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
                          Module {mIdx + 1}
                        </p>
                        <p className="font-serif text-xl text-foreground">{mod.title}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {mod.lessons.length} lessons
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
                            <p className="text-sm text-foreground">{lesson.title}</p>
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

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                  {course.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                  <span>({course.reviews})</span>
                </span>
              </div>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground">
                {course.title}
              </h1>
              <p className="mt-3 text-muted-foreground">{course.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-foreground">${course.price}</span>
                <span className="text-sm text-muted-foreground">/ lifetime access</span>
              </div>

              {enrolled ? (
                <Link
                  to="/classroom/$id"
                  params={{ id: course.id }}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
                >
                  <PlayCircle className="h-4 w-4" /> Continue learning
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
                  {inCart ? "View in cart" : "Add to cart"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <Link
                to="/classroom/$id"
                params={{ id: course.id }}
                className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <PlayCircle className="h-4 w-4 text-primary" /> Watch free preview
              </Link>

              <dl className="mt-8 space-y-3 border-t border-border/60 pt-6 text-sm">
                <Stat icon={<Clock className="h-4 w-4" />} label="Total runtime" value={course.duration} />
                <Stat icon={<BookOpen className="h-4 w-4" />} label="Lessons" value={`${lessonCount} videos`} />
                <Stat icon={<Layers className="h-4 w-4" />} label="Modules" value={String(course.modules.length)} />
                <Stat icon={<BarChart3 className="h-4 w-4" />} label="Difficulty" value={course.difficulty} />
              </dl>

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm font-medium text-foreground">Your instructor</p>
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

              <ul className="mt-8 space-y-2 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                {["HD video lessons", "Downloadable recipes", "Q&A with chef", "Certificate of completion"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
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
