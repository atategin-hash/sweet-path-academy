import { useState } from "react";
import { Bell, Flame, Sparkles, TrendingUp, X } from "lucide-react";

type Update = {
  id: string;
  icon: typeof Flame;
  badge: string;
  title: string;
  when: string;
  tone: "trend" | "new" | "update";
};

const UPDATES: Update[] = [
  {
    id: "u1",
    icon: Flame,
    badge: "Yeni Trend",
    title: "New York Roll reçetesi güncellendi",
    when: "Bugün · 2 saat önce",
    tone: "trend",
  },
  {
    id: "u2",
    icon: Sparkles,
    badge: "Yeni Ders",
    title: "Bento Cake — kişisel tasarım kılavuzu eklendi",
    when: "Dün",
    tone: "new",
  },
  {
    id: "u3",
    icon: TrendingUp,
    badge: "Güncelleme",
    title: "Endüstriyel cheesecake — tunel fırın profili revize edildi",
    when: "2 gün önce",
    tone: "update",
  },
];

const toneStyles: Record<Update["tone"], string> = {
  trend: "bg-primary/10 text-primary",
  new: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  update: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function LiveUpdates() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = UPDATES.filter((u) => !dismissed.has(u.id));

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-medium text-foreground">Canlı güncellemeler</p>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
            {visible.length} yeni
          </span>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Toggle notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          {open ? "Gizle" : "Tümü"}
        </button>
      </div>

      <div className={`mt-4 space-y-2 ${open ? "" : "max-h-32 overflow-hidden"}`}>
        {visible.map((u) => (
          <div
            key={u.id}
            className="group flex items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-3 transition-colors hover:border-border"
          >
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${toneStyles[u.tone]}`}>
              <u.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {u.badge}
              </p>
              <p className="truncate text-sm font-medium text-foreground">{u.title}</p>
              <p className="text-xs text-muted-foreground">{u.when}</p>
            </div>
            <button
              onClick={() => setDismissed((s) => new Set(s).add(u.id))}
              className="opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
            Şu anda yeni bildirim yok.
          </p>
        )}
      </div>
    </div>
  );
}
