import { useEffect, useRef, useState } from "react";
import { ChefHat, X, Send, Sparkles, Home, Store, Factory } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TIER_META, type Tier } from "@/lib/courses";
import { useI18n } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; text: string };

const TIER_OPTIONS: { id: Tier; Icon: typeof Home }[] = [
  { id: "home", Icon: Home },
  { id: "business", Icon: Store },
  { id: "industrial", Icon: Factory },
];

function smartReply(prompt: string, tier: Tier): string {
  const p = prompt.toLowerCase();
  const tierPrefix =
    tier === "home"
      ? "Ev şartları için"
      : tier === "business"
      ? "Butik kafe/işletme için"
      : "Endüstriyel üretim için";

  if (p.includes("kabar")) {
    return (
      `${tierPrefix} kabarmama sebepleri genelde 3 başlıkta toplanır:\n\n` +
      `1. **Kabartıcı**: Kabartma tozu/maya tazeliğini test edin (sıcak suya bir tutam atın — köpürmeli).\n` +
      `2. **Sıcaklık**: ${
        tier === "home"
          ? "Ev fırınında 170°C alt-üst ısıtma + fan kapalı."
          : tier === "business"
          ? "Konveksiyon fırında 160°C, %20 fan."
          : "Tunel fırında 165°C, 14 dk konveyör hızı."
      }\n` +
      `3. **Karıştırma**: Glüten gelişimi fazla — son una geçince spatula ile katlayın.`
    );
  }
  if (p.includes("fırın") || p.includes("oven")) {
    return tier === "home"
      ? "Ev fırınında **170°C alt-üst** modu, ızgara orta rafta, fan kapalı. Cam kapağı ilk 20 dk açmayın."
      : tier === "business"
      ? "Konveksiyon (turbo) fırında **160°C, %30 fan**. Tepsiyi rafın merkezine yerleştirin, 10 dk sonra 180° döndürün."
      : "Tunel fırın: **165°C bölge 1**, **170°C bölge 2**, **150°C soğutma**. Konveyör hızı: 6 m/dk.";
  }
  if (p.includes("bişkek") || p.includes("malzeme") || p.includes("nereden")) {
    return (
      `Bişkek'te malzeme tedariki için önerilerim:\n\n` +
      `• **Frunze Pazarı** — taze süt ürünleri ve yumurta.\n` +
      `• **Globus / Frunze Hipermarket** — Avrupa unu, kakao, vanilya.\n` +
      `• **Asia Mall – HoReCa** — ${
        tier === "home" ? "küçük paket profesyonel malzemeler" : "toptan paketler, 25 kg un, 10 kg şeker"
      }.\n` +
      `• **Dordoy Bazaar** — kalıplar, spatula, pasta seti.`
    );
  }
  if (p.includes("krema") || p.includes("ayrış")) {
    return `${tierPrefix} kremanın ayrışması genelde sıcaklık farkından olur. Tereyağı **22°C**, krem şanti **4°C** olmalı. Karışım kesilirse 30 sn sıcak su banyosunda karıştırarak kurtarın.`;
  }
  if (p.includes("merhaba") || p.includes("selam") || p.includes("hi")) {
    return `Merhaba 👋 Ben MaisonCrumb'ın AI Pasta Asistanıyım. Şu an **${TIER_META[tier].label}** modunda yanıtlıyorum. Sorunuz nedir?`;
  }
  return (
    `${tierPrefix} bu konuda önerim:\n\n` +
    `Tarifin kritik noktalarını (sıcaklık, oran, dinlenme süresi) kontrol edin. ` +
    `Daha spesifik bilgi için tarif adımını veya kek ismini yazabilirsiniz — size özel adım adım yol haritası çıkarayım.`
  );
}

export function AIChatbot() {
  const { t, lang, region } = useI18n();
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState<Tier>("home");
  const welcome = t("chatbot.welcome");
  const QUICK_PROMPTS = [t("chatbot.q1"), t("chatbot.q2"), t("chatbot.q3"), t("chatbot.q4")];
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", text: welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", text: t("chatbot.welcome") }]);
  }, [lang, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: smartReply(t, tier) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open baking assistant"
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_40px_-8px_oklch(0.7_0.15_50/0.5)] ring-4 ring-primary/15 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-8px_oklch(0.7_0.15_50/0.6)] ${
          open ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <ChefHat className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[10px] font-bold text-primary ring-2 ring-primary">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-warm)]">
                <ChefHat className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <SheetTitle className="font-serif text-xl">{t("chatbot.title")}</SheetTitle>
                <SheetDescription className="text-xs">
                  {t("chatbot.subtitle")} · {region === "imperial" ? "°F / oz / lb" : "°C / g / kg"}
                </SheetDescription>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tier selector */}
            <div className="mt-4 flex gap-1.5 rounded-full border border-border/60 bg-background/60 p-1">
              {TIER_OPTIONS.map((t) => {
                const active = t.id === tier;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <t.Icon className="h-3.5 w-3.5" />
                    {TIER_META[t.id].short}
                  </button>
                );
              })}
            </div>
          </SheetHeader>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/60 bg-card text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border/60 bg-card px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="border-t border-border/60 bg-muted/30 px-5 py-3">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t("chatbot.quick")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-border/60 bg-background p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sorunuzu yazın…"
              className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
