import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Flame, X } from "lucide-react";
import { searchCatalog } from "@/lib/courses";
import { useI18n } from "@/lib/i18n";

type Props = {
  placeholder?: string;
  size?: "lg" | "md";
  autoFocus?: boolean;
};

export function CatalogSearch({
  placeholder,
  size = "lg",
  autoFocus,
}: Props) {
  const { t, tx } = useI18n();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => searchCatalog(q), [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const heightClass = size === "lg" ? "h-14 text-base" : "h-11 text-sm";

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (hits[0]) {
            setOpen(false);
            navigate({
              to: "/classroom/$id",
              params: { id: hits[0].courseId },
              search: { lesson: hits[0].lessonId },
            });
          } else {
            navigate({ to: "/courses", search: { q } });
          }
        }}
        className="relative"
      >
        <Search
          className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground ${
            size === "lg" ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
        <input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder ?? t("catalog.searchPlaceholder")}
          className={`w-full rounded-full border border-border bg-card pl-14 pr-28 ${heightClass} text-foreground shadow-[var(--shadow-soft)] outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
            className="absolute right-24 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-accent"
            aria-label={t("catalog.clear")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-[55%]"
        >
          {t("catalog.searchButton")}
        </button>
      </form>

      {open && q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-warm)] animate-in fade-in slide-in-from-top-1">
          {hits.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">
              {t("catalog.noLesson")} “{q}”. {t("catalog.try")}
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {hits.map((h) => (
                <li key={`${h.courseId}-${h.lessonId}`}>
                  <Link
                    to="/classroom/$id"
                    params={{ id: h.courseId }}
                    search={{ lesson: h.lessonId }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-border/60 px-5 py-3 transition-colors last:border-b-0 hover:bg-accent/60"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Search className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {tx(h.lessonTitle)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {tx(h.courseTitle)} · {h.duration}
                      </p>
                    </div>
                    <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
                      {t(`tier.${h.tier}.short`)}
                    </span>
                    {h.trending && (
                      <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                        <Flame className="h-3 w-3" /> {t("common.hot")}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
