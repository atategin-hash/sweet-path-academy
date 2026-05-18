import { Link, useRouterState } from "@tanstack/react-router";
import { Cake, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import { LegalLink } from "@/components/LegalLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { cart, openDrawer } = useStore();
  const { t } = useI18n();

  const navLinks = [
    { to: "/" as const, label: t("nav.home"), exact: true },
    { to: "/courses" as const, label: t("nav.courses") },
    { to: "/dashboard" as const, label: t("nav.dashboard") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Cake className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl tracking-tight text-foreground">
            Maison<span className="text-primary">Crumb</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={l.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground font-medium" }}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <button
            onClick={openDrawer}
            aria-label={t("cart.open")}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
          >
            <ShoppingBag className="h-4 w-4" />
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground shadow-sm animate-scale-in">
                {cart.length}
              </span>
            )}
          </button>
          <Link
            to="/courses"
            className="hidden h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            {t("nav.start")}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={t("nav.toggle")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => {
              const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm transition-colors ${
                    active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/courses"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
            >
              {t("nav.start")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Cake className="h-4 w-4" />
              </span>
              <span className="font-serif text-lg tracking-tight">MaisonCrumb</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.about")}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-foreground">{t("footer.explore")}</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/courses" className="transition-colors hover:text-foreground">{t("footer.allCourses")}</Link></li>
              <li><Link to="/dashboard" className="transition-colors hover:text-foreground">{t("nav.dashboard")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-foreground">{t("footer.contact")}</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>hello@maisoncrumb.com</li>
              <li>Paris · Tokyo · New York</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-foreground">Legal</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><LegalLink type="terms" /></li>
              <li><LegalLink type="privacy" /></li>
              <li><LegalLink type="refund" /></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground/70">
            © 2026 Maison Crumb Ltd. All rights reserved. Registered in England and Wales.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Company Number: [Pending Approval]
          </p>
        </div>
      </div>
    </footer>
  );
}
