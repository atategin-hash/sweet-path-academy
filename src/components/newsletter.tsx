import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Check } from "lucide-react";

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
    <section className="border-t border-border/40 bg-background py-20">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/30">
          <Mail className="h-4 w-4 text-muted-foreground" />
        </div>
        <h2 className="mt-6 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
          Join the Maison Crumb Insider
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Receive exclusive techniques, seasonal recipes, and academy updates directly to your inbox.
        </p>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-medium text-primary">
            <Check className="h-4 w-4" />
            <span>Welcome to the inner circle.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full rounded-full border-border/60 bg-muted/30 px-5 text-sm placeholder:text-muted-foreground/60 sm:w-80"
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

        <p className="mt-5 text-xs text-muted-foreground/60">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
