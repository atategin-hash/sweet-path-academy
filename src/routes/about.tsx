import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MaisonCrumb Academy" },
      { name: "description", content: "MaisonCrumb is an online academy connecting home bakers with world-class cake and pastry chefs." },
      { property: "og:title", content: "About — MaisonCrumb Academy" },
      { property: "og:description", content: "Our story, our chefs, our mission." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Our story</p>
        <h1 className="mt-2 font-serif text-5xl leading-tight text-foreground md:text-6xl">
          A pastry school without walls.
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            MaisonCrumb was founded in 2024 by a small team of pâtissiers who believed great
            technique should travel. We film in working kitchens — flour on the counter,
            real ovens, real timing — and edit nothing about the craft itself.
          </p>
          <p>
            Every course is built around a single chef's voice. Buy a class once and it's
            yours for life, with downloadable recipes and a private Q&A thread.
          </p>
          <p>
            Whether you're piping your first rosette or laminating your hundredth croissant,
            there's a seat for you at our counter.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
