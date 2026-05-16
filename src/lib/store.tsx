import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type EnrolledEntry = { id: string; progress: number; lastLesson: number };

type StoreState = {
  cart: string[]; // course ids
  enrolled: EnrolledEntry[];
  drawerOpen: boolean;
};

type StoreCtx = StoreState & {
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawer: (open: boolean) => void;
  enroll: (ids: string[]) => void;
  isEnrolled: (id: string) => boolean;
  isInCart: (id: string) => boolean;
};

const Ctx = createContext<StoreCtx | null>(null);

const SEED: EnrolledEntry[] = [
  { id: "french-macarons", progress: 0.45, lastLesson: 3 },
  { id: "chocolate-cakes", progress: 0.8, lastLesson: 4 },
  { id: "artisan-bread", progress: 0.1, lastLesson: 1 },
];

const STORAGE_KEY = "maisoncrumb.store.v1";

function load(): { cart: string[]; enrolled: EnrolledEntry[] } {
  if (typeof window === "undefined") return { cart: [], enrolled: SEED };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], enrolled: SEED };
    const parsed = JSON.parse(raw);
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      enrolled: Array.isArray(parsed.enrolled) ? parsed.enrolled : SEED,
    };
  } catch {
    return { cart: [], enrolled: SEED };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState<EnrolledEntry[]>(SEED);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = load();
    setCart(s.cart);
    setEnrolled(s.enrolled);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, enrolled }));
  }, [cart, enrolled, hydrated]);

  const value = useMemo<StoreCtx>(
    () => ({
      cart,
      enrolled,
      drawerOpen,
      addToCart: (id) =>
        setCart((c) => (c.includes(id) ? c : [...c, id])),
      removeFromCart: (id) => setCart((c) => c.filter((x) => x !== id)),
      clearCart: () => setCart([]),
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      setDrawer: setDrawerOpen,
      enroll: (ids) =>
        setEnrolled((prev) => {
          const map = new Map(prev.map((e) => [e.id, e] as const));
          ids.forEach((id) => {
            if (!map.has(id)) map.set(id, { id, progress: 0, lastLesson: 1 });
          });
          return Array.from(map.values());
        }),
      isEnrolled: (id) => enrolled.some((e) => e.id === id),
      isInCart: (id) => cart.includes(id),
    }),
    [cart, enrolled, drawerOpen]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
