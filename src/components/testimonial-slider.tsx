import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Testimonial = { quote: string; name: string; role: string };

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length, paused]);

  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const tm = items[i];

  return (
    <div
      className="relative mx-auto max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <figure
        key={i}
        className="animate-fade-in rounded-2xl border border-border/50 bg-card px-6 py-5 shadow-[0_10px_30px_-12px_oklch(0.27_0.008_50/0.18)] ring-1 ring-foreground/[0.03]"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, k) => (
              <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
          </div>
          <Dialog>
            <DialogTrigger className="text-[11px] font-light uppercase tracking-[0.18em] text-primary/80 transition-colors hover:text-primary">
              Read full story
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {tm.name}
                </DialogTitle>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {tm.role}
                </p>
              </DialogHeader>
              <div className="mt-2 flex gap-0.5">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-3 font-serif text-lg leading-relaxed text-foreground">
                “{tm.quote}”
              </blockquote>
            </DialogContent>
          </Dialog>
        </div>
        <blockquote className="mt-3 line-clamp-2 font-serif text-base leading-snug text-foreground">
          “{tm.quote}”
        </blockquote>
        <figcaption className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 text-xs">
          <span className="font-medium text-foreground">{tm.name}</span>
          <span className="text-muted-foreground">{tm.role}</span>
        </figcaption>
      </figure>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Go to testimonial ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
