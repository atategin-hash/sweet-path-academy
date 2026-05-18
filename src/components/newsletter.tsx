import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

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
    <aside aria-labelledby="newsletter-heading" className="flex flex-col">
      <p className="text-[11px] font-light uppercase tracking-[0.24em] text-primary">
        Newsletter
      </p>
      <h2
        id="newsletter-heading"
        className="mt-1.5 font-serif text-2xl text-foreground md:text-3xl"
      >
        Join the Maison Crumb Insider
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Receive exclusive techniques, seasonal recipes, and academy updates directly to your inbox.
      </p>

      <div className="mt-5">
        {submitted ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary">
            <Check className="h-4 w-4" />
            <span>Welcome to the inner circle.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="h-11 flex-1 rounded-full border-border/60 bg-background/80 px-5 text-sm placeholder:text-muted-foreground/60 backdrop-blur-sm"
            />
            <Button
              type="submit"
              className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Join <span className="font-medium text-foreground">5,000+</span> passionate bakers worldwide.
        </p>
      </div>
    </aside>
  );
}
