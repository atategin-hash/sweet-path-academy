import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SiteHeader } from "@/components/site-chrome";
import { useStore } from "@/lib/store";
import { getCourse } from "@/lib/courses";
import { useEffect, useState } from "react";
import { CreditCard, Lock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Confetti } from "@/components/confetti";

const checkoutSearch = z.object({
  course: fallback(z.string().optional(), undefined).default(undefined),
  promo: fallback(z.string().optional(), undefined).default(undefined),
  discount: fallback(z.coerce.number().min(0).max(90).optional(), undefined).default(undefined),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: zodValidator(checkoutSearch),
  head: () => ({
    meta: [{ title: "Checkout — MaisonCrumb" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, enroll, clearCart, addToCart } = useStore();
  const { course: courseParam, promo, discount } = Route.useSearch();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-add course from URL (marketing redirects)
  useEffect(() => {
    if (courseParam && getCourse(courseParam)) {
      addToCart(courseParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseParam]);

  const items = cart.map((id) => getCourse(id)).filter((c): c is NonNullable<ReturnType<typeof getCourse>> => !!c);
  const subtotal = items.reduce((s, c) => s + c.price, 0);
  const discountPct = discount ?? 0;
  const discountAmt = Math.round(subtotal * (discountPct / 100));
  const afterDiscount = subtotal - discountAmt;
  const tax = Math.round(afterDiscount * 0.08);
  const total = afterDiscount + tax;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      enroll(cart);
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate({ to: "/dashboard" });
      }, 2800);
    }, 1200);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-4xl text-foreground">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Add a course to begin checkout.</p>
          <Link
            to="/courses"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
          >
            Browse courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
            ← Continue shopping
          </Link>
          <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Checkout</h1>
          <p className="mt-2 text-muted-foreground">Secure payment · Lifetime access · 30-day guarantee</p>

          {discountPct > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Promo <span className="font-mono">{promo ?? "AUTO"}</span> applied —{" "}
                    <span className="text-emerald-600">{discountPct}% OFF</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Discount auto-loaded from your offer link.</p>
                </div>
              </div>
              <span className="font-serif text-2xl text-emerald-600">−${discountAmt}</span>
            </div>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <form onSubmit={handlePay} className="space-y-6">
              <Section title="Billing details" step="01">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" name="firstName" placeholder="Camille" required />
                  <Field label="Last name" name="lastName" placeholder="Laurent" required />
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" required className="sm:col-span-2" />
                  <Field label="Address" name="address" placeholder="12 Rue des Pâtissiers" required className="sm:col-span-2" />
                  <Field label="City" name="city" placeholder="Paris" required />
                  <Field label="ZIP / Postal" name="zip" placeholder="75003" required />
                </div>
              </Section>

              <Section title="Payment method" step="02" icon={<CreditCard className="h-4 w-4" />}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CreditCard className="h-4 w-4 text-primary" /> Credit / debit card
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" /> Encrypted
                    </div>
                  </div>
                  <Field label="Card number" name="card" placeholder="4242 4242 4242 4242" required inputMode="numeric" maxLength={19} />
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <Field label="Expiry" name="exp" placeholder="MM / YY" required maxLength={7} />
                    <Field label="CVC" name="cvc" placeholder="123" required maxLength={4} />
                    <Field label="Postal" name="cardZip" placeholder="75003" required />
                  </div>
                  <Field label="Cardholder name" name="cardName" placeholder="Name on card" required className="mt-4" />
                </div>
              </Section>

              <button
                type="submit"
                disabled={processing}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Pay ${total} now <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Your payment info never touches our servers.
              </p>
            </form>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-soft)]">
                <div className="border-b border-border/60 p-6">
                  <p className="text-xs uppercase tracking-wider text-primary">Order summary</p>
                  <p className="mt-1 font-serif text-xl text-foreground">{items.length} {items.length === 1 ? "course" : "courses"}</p>
                </div>
                <ul className="divide-y divide-border/60">
                  {items.map((c) => (
                    <li key={c.id} className="flex gap-4 p-5">
                      <img src={c.image} alt={c.title} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col">
                        <p className="font-serif text-base leading-tight text-foreground">{c.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{c.duration} · {c.modules.length} modules</p>
                      </div>
                      <p className="font-medium text-foreground">${c.price}</p>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-border/60 p-6 text-sm">
                  <Row label="Subtotal" value={`$${subtotal}`} />
                  {discountPct > 0 && (
                    <Row label={`Promo ${promo ?? ""} (${discountPct}%)`} value={`−$${discountAmt}`} accent />
                  )}
                  <Row label="Tax (8%)" value={`$${tax}`} />
                  <div className="my-2 h-px bg-border/60" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-serif text-3xl text-foreground">${total}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {success && <SuccessOverlay count={items.length} />}
    </div>
  );
}

function SuccessOverlay({ count }: { count: number }) {
  return (
    <>
      <Confetti />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in">
        <div className="mx-4 w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-2xl animate-scale-in">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-warm)]">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="mt-6 font-serif text-3xl text-foreground">Welcome to the kitchen!</h2>
          <p className="mt-3 text-muted-foreground">
            Your payment was successful and {count} {count === 1 ? "course is" : "courses are"} now unlocked in your dashboard.
          </p>
          <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
            Redirecting to your dashboard…
          </p>
        </div>
      </div>
    </>
  );
}

function Section({ title, step, icon, children }: { title: string; step: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-medium text-primary">
          {icon ?? step}
        </span>
        <h2 className="font-serif text-2xl text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className={accent ? "font-semibold text-emerald-600" : "text-foreground"}>{value}</span>
    </div>
  );
}
