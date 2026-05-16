import { Link } from "@tanstack/react-router";
import { Cake } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Cake className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl tracking-tight text-foreground">
            Maison<span className="text-primary">Crumb</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/courses" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Courses
          </Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
        <Link
          to="/courses"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          Start baking
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="container mx-auto grid gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Cake className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg">MaisonCrumb</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            An online academy for cake and pastry lovers — taught by world-class chefs.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium text-foreground">Explore</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/courses" className="hover:text-foreground">All courses</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium text-foreground">Contact</p>
          <p className="mt-3 text-muted-foreground">hello@maisoncrumb.com</p>
          <p className="text-muted-foreground">Paris · Tokyo · New York</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MaisonCrumb Academy. Baked with love.
      </div>
    </footer>
  );
}
