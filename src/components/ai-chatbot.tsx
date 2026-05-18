import { useEffect, useRef, useState } from "react";
import { ChefHat, X, Send, Sparkles, GraduationCap, Award, Tag, UserRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; text: string };

export function AIChatbot() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const welcome = t("chatbot.welcome");
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", text: welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUICK_ACTIONS = [
    { id: "q1", Icon: GraduationCap, label: t("chatbot.q1"), answer: t("chatbot.a1") },
    { id: "q2", Icon: Award, label: t("chatbot.q2"), answer: t("chatbot.a2") },
    { id: "q3", Icon: Tag, label: t("chatbot.q3"), answer: t("chatbot.a3") },
    { id: "q4", Icon: UserRound, label: t("chatbot.q4"), answer: t("chatbot.a4") },
  ];

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", text: t("chatbot.welcome") }]);
  }, [lang, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const reply = (userText: string, answer?: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    const response = answer ?? t("chatbot.fallback");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: response }]);
      setTyping(false);
    }, 550);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open pastry consultant"
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
                  {t("chatbot.subtitle")}
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

          {/* Quick actions */}
          <div className="border-t border-border/60 bg-muted/30 px-5 py-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("chatbot.quick")}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {QUICK_ACTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => reply(q.label, q.answer)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <q.Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reply(input);
            }}
            className="flex items-end gap-2 border-t border-border/60 bg-background p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot.placeholder")}
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
