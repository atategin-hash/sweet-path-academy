import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Sparkles, X, Crown, Timer, ChefHat } from "lucide-react";

const PROMO_CODE = "ACADEMY29";
const PROMO_DISCOUNT = 50; // percent

// ------- Sticky countdown (urgency) -------
function format(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function CountdownUpsell({ courseId }: { courseId: string }) {
  const [remaining, setRemaining] = useState(14 * 60 + 22);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden w-[320px] overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-[oklch(0.18_0.04_50)] to-[oklch(0.14_0.02_60)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur md:block">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-2 top-2 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="border-b border-white/10 px-4 py-3">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
          <Crown className="h-3 w-3" /> Limited offer
        </p>
        <p className="mt-2 font-serif text-base leading-tight text-white">
          Global Certification — full academy access
        </p>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-3xl text-white">$29</span>
          <span className="text-xs text-white/40 line-through">$199</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
          <Timer className="h-3 w-3 text-amber-300" />
          Expires in <span className="font-mono font-semibold text-white">{format(remaining)}</span>
        </div>
        <Link
          to="/checkout"
          search={{ course: courseId, promo: PROMO_CODE, discount: PROMO_DISCOUNT }}
          className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-amber-400 text-xs font-semibold text-[oklch(0.18_0.04_50)] transition-transform hover:-translate-y-0.5"
        >
          Claim discount →
        </Link>
      </div>
    </div>
  );
}

// ------- End-of-lesson teaser modal -------
export function NextStepTeaser({
  open,
  onClose,
  courseId,
}: {
  open: boolean;
  onClose: () => void;
  courseId: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.2_0.04_50)] to-[oklch(0.13_0.02_60)] p-8 text-center shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-serif text-2xl text-white">Loved this recipe?</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Unlock the advanced <strong className="text-white">Boutique Café Secrets</strong> course to learn cost calculation, shelf-life, and how to scale this into a real business.
        </p>
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs text-amber-200">
          <span className="font-bold text-amber-300">50% OFF</span> auto-applied at checkout — today only.
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            to="/checkout"
            search={{ course: courseId, promo: PROMO_CODE, discount: PROMO_DISCOUNT }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-amber-400 text-sm font-semibold text-[oklch(0.18_0.04_50)] transition-transform hover:-translate-y-0.5"
            onClick={onClose}
          >
            <Crown className="h-4 w-4" /> Unlock Premium — 50% OFF
          </Link>
          <button onClick={onClose} className="text-xs text-white/50 hover:text-white">
            Keep watching free lessons
          </button>
        </div>
      </div>
    </div>
  );
}

// ------- Blurred secret-tips overlay in recipes -------
export function LockedChefSecrets({ courseId }: { courseId: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-primary/10 p-5">
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-amber-300">
          <ChefHat className="h-4 w-4" /> Secret Chef Tips & Scaling Calculator
        </div>
        <ul className="space-y-1.5 text-sm text-white/80">
          <li>— Substitute glucose for invert syrup to hold humidity 36h longer.</li>
          <li>— Industrial conversion: ×42 yields with 6.2% loss correction.</li>
          <li>— Café cost per portion: €0.42 ingredient / €3.80 sell — 89% margin.</li>
          <li>— Egg-free variation tested for school-safe production runs.</li>
        </ul>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-5 text-center backdrop-blur-[2px]">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-[oklch(0.18_0.04_50)] shadow-lg">
          <Lock className="h-5 w-5" />
        </div>
        <p className="mt-3 max-w-xs font-serif text-base text-white">
          Upgrade to Premium to unlock Industrial Scaling & Ingredient Substitutions
        </p>
        <Link
          to="/checkout"
          search={{ course: courseId, promo: PROMO_CODE, discount: PROMO_DISCOUNT }}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-amber-400 px-4 text-xs font-semibold text-[oklch(0.18_0.04_50)] transition-transform hover:-translate-y-0.5"
        >
          <Crown className="mr-1.5 h-3.5 w-3.5" /> Unlock Premium (50% OFF)
        </Link>
      </div>
    </div>
  );
}
