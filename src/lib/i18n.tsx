import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "tr" | "ru" | "es" | "fr" | "ar";

export const LANGUAGES: { code: Lang; label: string; flag: string; native: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧", native: "English" },
  { code: "tr", label: "TR", flag: "🇹🇷", native: "Türkçe" },
  { code: "ru", label: "RU", flag: "🇷🇺", native: "Русский" },
  { code: "es", label: "ES", flag: "🇪🇸", native: "Español" },
  { code: "fr", label: "FR", flag: "🇫🇷", native: "Français" },
  { code: "ar", label: "AR", flag: "🇸🇦", native: "العربية" },
];

type Dict = Record<string, string>;

const DICTIONARIES: Record<Lang, Dict> = {
  en: {
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.dashboard": "Dashboard",
    "nav.start": "Start baking",
    "cart.open": "Open cart",
    "classroom.exit": "Exit classroom",
    "classroom.markComplete": "Mark complete",
    "classroom.completed": "Completed",
    "classroom.next": "Next lesson",
    "classroom.curriculum": "Curriculum",
    "classroom.audio": "Audio",
    "classroom.subtitles": "Subtitles",
    "classroom.subtitlesOff": "Off",
    "classroom.aiPowered": "Powered by AI Live Translation — Watch in your preferred language.",
    "classroom.aiTranslating": "AI translated",
    "tabs.overview": "Overview",
    "tabs.recipes": "Recipes",
    "tabs.discussion": "Discussion",
    "recipe.servings": "Servings",
    "recipe.time": "Time",
    "recipe.ingredients": "Ingredients",
    "recipe.steps": "Steps",
    "recipe.chefNotes": "Chef notes",
    "recipe.step": "Step",
    "course.about": "About this course",
    "course.curriculum": "Curriculum",
    "course.addToCart": "Add to cart",
    "course.viewInCart": "View in cart",
    "course.continue": "Continue learning",
    "course.preview": "Watch free preview",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Most-asked questions about this course",
    "lang.label": "Language",
  },
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.courses": "Kurslar",
    "nav.dashboard": "Panel",
    "nav.start": "Pişirmeye Başla",
    "cart.open": "Sepeti aç",
    "classroom.exit": "Sınıftan çık",
    "classroom.markComplete": "Tamamlandı işaretle",
    "classroom.completed": "Tamamlandı",
    "classroom.next": "Sonraki ders",
    "classroom.curriculum": "Müfredat",
    "classroom.audio": "Seslendirme",
    "classroom.subtitles": "Altyazı",
    "classroom.subtitlesOff": "Kapalı",
    "classroom.aiPowered": "AI Canlı Çeviri ile — Videoyu tercih ettiğiniz dilde izleyin.",
    "classroom.aiTranslating": "AI çevirili",
    "tabs.overview": "Genel Bakış",
    "tabs.recipes": "Reçeteler",
    "tabs.discussion": "Tartışma",
    "recipe.servings": "Porsiyon",
    "recipe.time": "Süre",
    "recipe.ingredients": "Malzemeler",
    "recipe.steps": "Adımlar",
    "recipe.chefNotes": "Şef notları",
    "recipe.step": "Adım",
    "course.about": "Bu kurs hakkında",
    "course.curriculum": "Müfredat",
    "course.addToCart": "Sepete ekle",
    "course.viewInCart": "Sepette görüntüle",
    "course.continue": "Öğrenmeye devam et",
    "course.preview": "Ücretsiz önizleme",
    "faq.title": "Sıkça Sorulan Sorular",
    "faq.subtitle": "Bu kurs hakkında en çok sorulanlar",
    "lang.label": "Dil",
  },
  ru: {
    "nav.home": "Главная",
    "nav.courses": "Курсы",
    "nav.dashboard": "Кабинет",
    "nav.start": "Начать печь",
    "cart.open": "Открыть корзину",
    "classroom.exit": "Выйти из класса",
    "classroom.markComplete": "Отметить как пройденный",
    "classroom.completed": "Пройдено",
    "classroom.next": "Следующий урок",
    "classroom.curriculum": "Программа",
    "classroom.audio": "Озвучка",
    "classroom.subtitles": "Субтитры",
    "classroom.subtitlesOff": "Выкл.",
    "classroom.aiPowered": "Работает на ИИ-переводе — Смотрите на любимом языке.",
    "classroom.aiTranslating": "ИИ-перевод",
    "tabs.overview": "Обзор",
    "tabs.recipes": "Рецепты",
    "tabs.discussion": "Обсуждение",
    "recipe.servings": "Порции",
    "recipe.time": "Время",
    "recipe.ingredients": "Ингредиенты",
    "recipe.steps": "Шаги",
    "recipe.chefNotes": "Заметки шефа",
    "recipe.step": "Шаг",
    "course.about": "Об этом курсе",
    "course.curriculum": "Программа",
    "course.addToCart": "В корзину",
    "course.viewInCart": "Открыть корзину",
    "course.continue": "Продолжить обучение",
    "course.preview": "Бесплатный превью",
    "faq.title": "Часто задаваемые вопросы",
    "faq.subtitle": "Самые популярные вопросы об этом курсе",
    "lang.label": "Язык",
  },
  es: {
    "nav.home": "Inicio",
    "nav.courses": "Cursos",
    "nav.dashboard": "Panel",
    "nav.start": "Empezar a hornear",
    "cart.open": "Abrir carrito",
    "classroom.exit": "Salir del aula",
    "classroom.markComplete": "Marcar como completado",
    "classroom.completed": "Completado",
    "classroom.next": "Siguiente lección",
    "classroom.curriculum": "Plan de estudios",
    "classroom.audio": "Audio",
    "classroom.subtitles": "Subtítulos",
    "classroom.subtitlesOff": "Desactivados",
    "classroom.aiPowered": "Con traducción IA en vivo — Mira en tu idioma preferido.",
    "classroom.aiTranslating": "Traducido por IA",
    "tabs.overview": "Resumen",
    "tabs.recipes": "Recetas",
    "tabs.discussion": "Discusión",
    "recipe.servings": "Porciones",
    "recipe.time": "Tiempo",
    "recipe.ingredients": "Ingredientes",
    "recipe.steps": "Pasos",
    "recipe.chefNotes": "Notas del chef",
    "recipe.step": "Paso",
    "course.about": "Sobre este curso",
    "course.curriculum": "Plan de estudios",
    "course.addToCart": "Añadir al carrito",
    "course.viewInCart": "Ver en el carrito",
    "course.continue": "Continuar aprendiendo",
    "course.preview": "Vista previa gratuita",
    "faq.title": "Preguntas frecuentes",
    "faq.subtitle": "Las preguntas más comunes sobre este curso",
    "lang.label": "Idioma",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.courses": "Cours",
    "nav.dashboard": "Tableau de bord",
    "nav.start": "Commencer à pâtisser",
    "cart.open": "Ouvrir le panier",
    "classroom.exit": "Quitter la salle",
    "classroom.markComplete": "Marquer comme terminé",
    "classroom.completed": "Terminé",
    "classroom.next": "Leçon suivante",
    "classroom.curriculum": "Programme",
    "classroom.audio": "Audio",
    "classroom.subtitles": "Sous-titres",
    "classroom.subtitlesOff": "Désactivés",
    "classroom.aiPowered": "Propulsé par la traduction IA — Regardez dans votre langue.",
    "classroom.aiTranslating": "Traduit par IA",
    "tabs.overview": "Aperçu",
    "tabs.recipes": "Recettes",
    "tabs.discussion": "Discussion",
    "recipe.servings": "Portions",
    "recipe.time": "Temps",
    "recipe.ingredients": "Ingrédients",
    "recipe.steps": "Étapes",
    "recipe.chefNotes": "Notes du chef",
    "recipe.step": "Étape",
    "course.about": "À propos de ce cours",
    "course.curriculum": "Programme",
    "course.addToCart": "Ajouter au panier",
    "course.viewInCart": "Voir le panier",
    "course.continue": "Continuer l'apprentissage",
    "course.preview": "Aperçu gratuit",
    "faq.title": "Questions fréquentes",
    "faq.subtitle": "Les questions les plus posées sur ce cours",
    "lang.label": "Langue",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.courses": "الدورات",
    "nav.dashboard": "لوحتي",
    "nav.start": "ابدأ الخَبز",
    "cart.open": "فتح السلة",
    "classroom.exit": "الخروج من الفصل",
    "classroom.markComplete": "وضع علامة إنجاز",
    "classroom.completed": "مكتمل",
    "classroom.next": "الدرس التالي",
    "classroom.curriculum": "المنهج",
    "classroom.audio": "الصوت",
    "classroom.subtitles": "الترجمة",
    "classroom.subtitlesOff": "إيقاف",
    "classroom.aiPowered": "مدعوم بالترجمة الفورية بالذكاء الاصطناعي — شاهد بلغتك المفضلة.",
    "classroom.aiTranslating": "مُترجم بالذكاء الاصطناعي",
    "tabs.overview": "نظرة عامة",
    "tabs.recipes": "الوصفات",
    "tabs.discussion": "نقاش",
    "recipe.servings": "حصص",
    "recipe.time": "الوقت",
    "recipe.ingredients": "المكونات",
    "recipe.steps": "الخطوات",
    "recipe.chefNotes": "ملاحظات الشيف",
    "recipe.step": "خطوة",
    "course.about": "عن هذه الدورة",
    "course.curriculum": "المنهج",
    "course.addToCart": "أضف إلى السلة",
    "course.viewInCart": "عرض السلة",
    "course.continue": "تابع التعلم",
    "course.preview": "معاينة مجانية",
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "أكثر الأسئلة شيوعًا حول هذه الدورة",
    "lang.label": "اللغة",
  },
};

/** Lightweight word-level translator for AI-translated course content. */
const CONTENT_GLOSSARY: Record<Lang, Array<[RegExp, string]>> = {
  en: [],
  tr: [
    [/\bflour\b/gi, "un"],
    [/\bsugar\b/gi, "şeker"],
    [/\bbutter\b/gi, "tereyağı"],
    [/\beggs?\b/gi, "yumurta"],
    [/\bmilk\b/gi, "süt"],
    [/\bcream\b/gi, "krema"],
    [/\bsalt\b/gi, "tuz"],
    [/\bvanilla\b/gi, "vanilya"],
    [/\bchocolate\b/gi, "çikolata"],
    [/\boven\b/gi, "fırın"],
    [/\bbake\b/gi, "pişir"],
    [/\bmix\b/gi, "karıştır"],
    [/\bfold\b/gi, "katlayarak karıştır"],
    [/\bwhisk\b/gi, "çırp"],
    [/\bminutes?\b/gi, "dakika"],
    [/\bhours?\b/gi, "saat"],
  ],
  ru: [
    [/\bflour\b/gi, "мука"],
    [/\bsugar\b/gi, "сахар"],
    [/\bbutter\b/gi, "масло"],
    [/\beggs?\b/gi, "яйца"],
    [/\bmilk\b/gi, "молоко"],
    [/\bcream\b/gi, "сливки"],
    [/\bsalt\b/gi, "соль"],
    [/\bvanilla\b/gi, "ваниль"],
    [/\bchocolate\b/gi, "шоколад"],
    [/\boven\b/gi, "духовка"],
    [/\bbake\b/gi, "выпекать"],
    [/\bmix\b/gi, "смешать"],
    [/\bfold\b/gi, "вмешать"],
    [/\bwhisk\b/gi, "взбить"],
    [/\bminutes?\b/gi, "минут"],
    [/\bhours?\b/gi, "ч"],
  ],
  es: [
    [/\bflour\b/gi, "harina"],
    [/\bsugar\b/gi, "azúcar"],
    [/\bbutter\b/gi, "mantequilla"],
    [/\beggs?\b/gi, "huevos"],
    [/\bmilk\b/gi, "leche"],
    [/\bcream\b/gi, "crema"],
    [/\bsalt\b/gi, "sal"],
    [/\bvanilla\b/gi, "vainilla"],
    [/\bchocolate\b/gi, "chocolate"],
    [/\boven\b/gi, "horno"],
    [/\bbake\b/gi, "hornear"],
    [/\bmix\b/gi, "mezclar"],
    [/\bfold\b/gi, "incorporar"],
    [/\bwhisk\b/gi, "batir"],
    [/\bminutes?\b/gi, "minutos"],
    [/\bhours?\b/gi, "horas"],
  ],
  fr: [
    [/\bflour\b/gi, "farine"],
    [/\bsugar\b/gi, "sucre"],
    [/\bbutter\b/gi, "beurre"],
    [/\beggs?\b/gi, "œufs"],
    [/\bmilk\b/gi, "lait"],
    [/\bcream\b/gi, "crème"],
    [/\bsalt\b/gi, "sel"],
    [/\bvanilla\b/gi, "vanille"],
    [/\bchocolate\b/gi, "chocolat"],
    [/\boven\b/gi, "four"],
    [/\bbake\b/gi, "cuire"],
    [/\bmix\b/gi, "mélanger"],
    [/\bfold\b/gi, "incorporer"],
    [/\bwhisk\b/gi, "fouetter"],
    [/\bminutes?\b/gi, "minutes"],
    [/\bhours?\b/gi, "heures"],
  ],
  ar: [
    [/\bflour\b/gi, "دقيق"],
    [/\bsugar\b/gi, "سكر"],
    [/\bbutter\b/gi, "زبدة"],
    [/\beggs?\b/gi, "بيض"],
    [/\bmilk\b/gi, "حليب"],
    [/\bcream\b/gi, "كريمة"],
    [/\bsalt\b/gi, "ملح"],
    [/\bvanilla\b/gi, "فانيليا"],
    [/\bchocolate\b/gi, "شوكولاتة"],
    [/\boven\b/gi, "فرن"],
    [/\bbake\b/gi, "اخبز"],
    [/\bmix\b/gi, "اخلط"],
    [/\bfold\b/gi, "اطوِ"],
    [/\bwhisk\b/gi, "اخفق"],
    [/\bminutes?\b/gi, "دقائق"],
    [/\bhours?\b/gi, "ساعات"],
  ],
};

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  /** AI-style content translation for free-form text (course descriptions, recipes). */
  tx: (text: string) => string;
};

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = "maisoncrumb.lang";

function detect(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && DICTIONARIES[saved]) return saved;
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  const supported = LANGUAGES.map((l) => l.code) as string[];
  if (nav && supported.includes(nav)) return nav as Lang;
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detect());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  };

  const value = useMemo<I18nCtx>(() => {
    const dict = DICTIONARIES[lang];
    const fallback = DICTIONARIES.en;
    return {
      lang,
      setLang,
      t: (key: string) => dict[key] ?? fallback[key] ?? key,
      tx: (text: string) => {
        if (lang === "en" || !text) return text;
        let out = text;
        for (const [re, val] of CONTENT_GLOSSARY[lang]) out = out.replace(re, val);
        return out;
      },
    };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside <I18nProvider>");
  return v;
}
