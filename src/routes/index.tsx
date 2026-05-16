import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/courses";
import heroImg from "@/assets/hero-cake.jpg";
import { Star, Sparkles, Award, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MaisonCrumb — Online Cake & Pastry Academy" },
      { name: "description", content: "Learn cake decorating, pastry, bread, and chocolate craft from world-class chefs. On-demand video lessons for every level." },
      { property: "og:title", content: "MaisonCrumb — Online Cake & Pastry Academy" },
      { property: "og:description", content: "On-demand baking masterclasses from world-class pastry chefs." },
    ],
  }),
  component: HomePage,
});

const testimonials = [
  {
    quote: "The macaron course finally cracked it for me. My shells have feet, my shells are smooth, and my friends keep asking for more.",
    name: "Lara Mendes",
    role: "Home baker, Lisbon",
  },
  {
    quote: "Marco's chocolate cake class is the most generous, well-paced course I've taken. Felt like a private lesson.",
    name: "Daniel Ortiz",
    role: "Café owner, Mexico City",
  },
  {
    quote: "I went from sourdough panic to confident weekly bakes in a month. The video quality is gorgeous.",
    name: "Yuki Sato",
    role: "Student, Osaka",
  },
];

function HomePage() {
  const featured = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto grid gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> New season — winter classics
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Learn the craft of <em className="italic text-primary">cake & pastry</em> from anywhere.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              On-demand masterclasses from chefs in Paris, Tokyo, and Milan. Beautiful video, honest technique, lifetime access.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
              >
                Browse all courses
              </Link>
              <Link
                to="/courses/$slug"
                params={{ slug: "french-macarons" }}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <PlayCircle className="h-4 w-4 text-primary" /> Watch a preview
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-2 font-medium text-foreground">4.9</span>
              </div>
              <span>from 12,000+ students worldwide</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem]" style={{ background: "var(--gradient-warm)" }} />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]">
              <img
                src={heroImg}
                alt="Pastry chef decorating a layered cake with pink buttercream roses"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)] md:flex md:items-center md:gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Award className="h-5 w-5 text-primary" />
              </span>
              <div className="text-sm">
                <p className="font-medium text-foreground">Certified courses</p>
                <p className="text-muted-foreground">Lifetime access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Featured courses</p>
            <h2 className="mt-2 max-w-xl font-serif text-4xl text-foreground md:text-5xl">
              Hand-picked classes for your next bake.
            </h2>
          </div>
          <Link to="/courses" className="text-sm font-medium text-primary hover:underline">
            View all courses →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Loved by bakers</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
              Stories from our kitchen community.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16" style={{ background: "var(--gradient-warm)" }}>
          <div className="relative max-w-2xl">
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Your apron is waiting.
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Join thousands of bakers learning a new recipe every week. Start with a single course or go all-in.
            </p>
            <Link
              to="/courses"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Explore the catalog
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
