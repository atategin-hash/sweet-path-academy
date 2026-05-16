import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useI18n, type Lang } from "@/lib/i18n";

export function LanguageSelector({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang, t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang)!;

  const trigger =
    variant === "dark"
      ? "inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      : "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={trigger} aria-label={t("lang.label")}>
        <Globe className="h-3.5 w-3.5" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="tracking-wider">{current.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[60vh] w-56 overflow-y-auto">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("lang.label")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code as Lang)}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <span className="flex-1">
              <span className="text-sm font-medium">{l.native}</span>
              <span className="ml-2 text-xs text-muted-foreground">{l.label}</span>
            </span>
            {lang === l.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
