import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Award, ChefHat, Infinity as InfinityIcon } from "lucide-react";
import newsletterBg from "@/assets/newsletter-bg.jpg";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      className="relative border-t border-border/40 bg-background"
      aria-labelledby="newsletter-heading"
    >
      {/* Subtle marble background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: `url(${newsletterBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" aria-hidden="true" />

      <div className="container relative mx-auto max-w-6xl px-6 py-12 md:py-14">
        {/* Horizontal layout */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: heading + description */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Newsletter
            </p>
            <h2
              id="newsletter-heading"
              className="mt-4 font-serif text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              Join the Maison Crumb Insider
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Receive exclusive techniques, seasonal recipes, and academy updates directly to your inbox.
            </p>
          </div>

          {/* Right: email form */}
          <div className="md:pl-6">
            {submitted ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-medium text-primary">
                <Check className="h-4 w-4" />
                <span>Welcome to the inner circle.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="h-12 flex-1 rounded-full border-border/60 bg-background/80 px-5 text-sm placeholder:text-muted-foreground/60 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            <p className="mt-4 text-sm text-muted-foreground">
              Join <span className="font-medium text-foreground">5,000+</span> passionate bakers worldwide.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-16 h-px w-24 bg-border/60 md:mt-20" aria-hidden="true" />

        {/* Three feature columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-3 md:gap-8">
          {[
            { Icon: Award, title: "Global Certification", desc: "Internationally recognised academy credentials." },
            { Icon: ChefHat, title: "Professional Techniques", desc: "Curated by world-class pastry masters." },
            { Icon: InfinityIcon, title: "Unlimited Access", desc: "Lifetime streaming across every device." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/70 backdrop-blur-sm">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-serif text-lg text-foreground">{title}</h3>
              <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
