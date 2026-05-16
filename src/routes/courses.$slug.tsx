import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getCourse } from "@/lib/courses";
import { Clock, BookOpen, BarChart3, PlayCircle, CheckCircle2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
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
              <button className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-background/95 px-6 py-3 text-sm font-medium text-foreground">
                  <PlayCircle className="h-5 w-5 text-primary" /> Play preview
                </span>
              </button>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-3xl text-foreground">About this course</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{course.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-3xl text-foreground">Syllabus</h2>
              <ul className="mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
                {course.syllabus.map((lesson, i) => (
                  <li key={lesson.title} className="flex items-center gap-4 p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-medium text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{lesson.title}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-wider text-primary">{course.level}</p>
              <h1 className="mt-2 font-serif text-4xl leading-tight text-foreground">
                {course.title}
              </h1>
              <p className="mt-3 text-muted-foreground">{course.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-foreground">${course.price}</span>
                <span className="text-sm text-muted-foreground">/ lifetime access</span>
              </div>

              <button className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5">
                <ShoppingBag className="h-4 w-4" /> Purchase course
              </button>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-accent">
                <PlayCircle className="h-4 w-4 text-primary" /> Watch free preview
              </button>

              <dl className="mt-8 space-y-3 border-t border-border/60 pt-6 text-sm">
                <Stat icon={<Clock className="h-4 w-4" />} label="Total runtime" value={course.duration} />
                <Stat icon={<BookOpen className="h-4 w-4" />} label="Lessons" value={`${course.lessons} videos`} />
                <Stat icon={<BarChart3 className="h-4 w-4" />} label="Level" value={course.level} />
              </dl>

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm font-medium text-foreground">Your instructor</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-serif text-lg text-primary">
                    {course.instructor.name.charAt(0)}
                  </span>
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
