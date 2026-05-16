import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { getCourse } from "@/lib/courses";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function CartDrawer() {
  const { t, tx } = useI18n();
  const { cart, drawerOpen, setDrawer, removeFromCart, closeDrawer } = useStore();
  const items = cart.map((id) => getCourse(id)).filter((c): c is NonNullable<ReturnType<typeof getCourse>> => !!c);
  const total = items.reduce((s, c) => s + c.price, 0);

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawer}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-6 py-5 text-left">
          <SheetTitle className="font-serif text-2xl text-foreground">{t("cart.title")}</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? t("cart.empty")
              : `${items.length} ${items.length === 1 ? t("cart.course") : t("cart.courses")} ${t("cart.ready")}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
                <ShoppingBag className="h-6 w-6" />
              </span>
              <p className="text-sm text-muted-foreground">{t("cart.emptyHelp")}</p>
              <Link
                to="/courses"
                onClick={closeDrawer}
                className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {t("cart.explore")}
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {items.map((c) => (
                <li key={c.id} className="flex gap-4 p-5">
                  <img src={c.image} alt={tx(c.title)} className="h-20 w-20 flex-shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-xs uppercase tracking-wider text-primary">{t(`difficulty.${c.difficulty}`)}</p>
                    <p className="mt-0.5 font-serif text-base leading-tight text-foreground">{tx(c.title)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("cart.with")} {c.instructor.name}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <p className="font-medium text-foreground">${c.price}</p>
                      <button
                        onClick={() => removeFromCart(c.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/60 bg-muted/30 p-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{t("cart.subtotal")}</span>
              <span>${total}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-medium text-foreground">{t("cart.total")}</span>
              <span className="font-serif text-3xl text-foreground">${total}</span>
            </div>
            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5"
            >
              {t("cart.checkout")} <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t("cart.guarantee")}
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
