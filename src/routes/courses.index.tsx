import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "All Courses — MaisonCrumb Academy" },
      { name: "description", content: "Browse every cake, pastry, bread, and chocolate course in the MaisonCrumb catalog." },
      { property: "og:title", content: "All Courses — MaisonCrumb Academy" },
      { property: "og:description", content: "Browse every cake, pastry, bread, and chocolate course." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-6 py-16 md:py-20">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Catalog</p>
        <h1 className="mt-2 max-w-2xl font-serif text-5xl text-foreground md:text-6xl">
          Every course, every level.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          From your first sponge to laminated wonders — pick a class and start baking today.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
