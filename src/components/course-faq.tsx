import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import type { Course } from "@/lib/courses";
import { useI18n } from "@/lib/i18n";

const TIER_FAQ: Record<Course["tier"], { q: string; a: string }[]> = {
  home: [
    {
      q: "Bu keki ne kadar saklayabilirim?",
      a: "Ev şartlarında buzdolabında hava almayan kapta 3–4 gün, derin dondurucuda dilim halinde 1 aya kadar saklayabilirsiniz.",
    },
    {
      q: "Hamuru/krema bazını dondurabilir miyim?",
      a: "Çoğu sünger kek hamuru dondurmaya uygun değildir; ancak buttercream/ganache bazları streçleyip 2 hafta dondurulabilir, kullanmadan 6 saat önce buzdolabına alın.",
    },
    {
      q: "Ev fırınımda sıcaklığı nasıl ayarlamalıyım?",
      a: "Alt-üst ısıtma 170°C, fan kapalı, orta raf. Fırın termometresi kullanmanızı öneririz — ev fırınları ortalama 10–15°C sapma gösterir.",
    },
    {
      q: "Tarifi yarıya bölebilir miyim?",
      a: "Evet, ancak yumurta gibi tek sayılı bileşenler için yumurtayı çırpıp gramajını ölçerek yarıya bölmek en doğrusudur.",
    },
  ],
  business: [
    {
      q: "Bu ürünün vitrin ömrü nedir?",
      a: "Soğuk vitrinde (4°C) 48 saat, kapaklı satışta 72 saat. Kremanın stabilizasyonu için %2 jelatin veya mascarpone bazı önerilir.",
    },
    {
      q: "Bu tarif için maliyet nasıl hesaplanır?",
      a: "Hammadde maliyeti = (her bileşenin g başı maliyeti × tarif gramajı). Üzerine %15 fire + %35 iş gücü ekleyin, satış fiyatını x3 katsayı ile belirleyin.",
    },
    {
      q: "Günlük üretim için tarifi nasıl ölçeklerim?",
      a: "Sınıftaki '×10 Business' modunu kullanın — sistem ölçüleri otomatik olarak kafe/butik bakery porsiyonuna çevirir.",
    },
    {
      q: "Hangi paketleme dayanıklılığı artırır?",
      a: "Termoform PET kutu + silikajel pad, dilim ürünlerde nem ve görüntüyü 72 saat korur.",
    },
  ],
  industrial: [
    {
      q: "Endüstriyel tarifte raf ömrü nedir?",
      a: "Vakum + modifiye atmosfer paketleme (MAP) ile 14–21 gün, koruyucu (potasyum sorbat %0.1) eklenirse 30 güne kadar uzar.",
    },
    {
      q: "Tarif kilogram bazında nasıl ölçeklenir?",
      a: "Classroom içindeki 'Industrial (×100)' modu tüm gramajları kilograma çevirir. Spiral mikser kapasitesine göre parti büyüklüğünü ayarlayın (genelde 40–60 kg/parti).",
    },
    {
      q: "Tunel fırın parametreleri ne olmalı?",
      a: "Bölge 1: 165°C, Bölge 2: 170°C, Bölge 3 (soğutma): 150°C. Konveyör hızı 6 m/dk, toplam pişme 14 dk.",
    },
    {
      q: "Hangi sertifikasyon gerekli?",
      a: "Türkiye için ISO 22000 + HACCP zorunlu. AB ihracatı için BRCGS Food Safety v9 + helal sertifikası önerilir.",
    },
  ],
};

const GENERIC = [
  {
    q: "Kursu satın aldıktan sonra ömür boyu erişebilir miyim?",
    a: "Evet. Tüm masterclass videolarına ve güncellemelerine sınırsız erişim sağlarsınız.",
  },
  {
    q: "Sertifika veriliyor mu?",
    a: "Kursu %100 tamamladığınızda MaisonCrumb Academy sertifikası dijital olarak panonuza eklenir.",
  },
];

export function CourseFAQ({ course, className }: { course: Course; className?: string }) {
  const { t, tx } = useI18n();
  const items = [...TIER_FAQ[course.tier], ...GENERIC];
  return (
    <section className={className}>
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {t("faq.title")}
        </p>
      </div>
      <h2 className="mt-2 font-serif text-3xl text-foreground">
        {t("faq.courseQuestions")}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {tx(course.title)} — {t(`tier.${course.tier}.label`)} {t("faq.focus")}.
      </p>

      <Accordion type="single" collapsible className="mt-6 rounded-2xl border border-border/60 bg-card px-2">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/60 last:border-0">
            <AccordionTrigger className="px-4 text-left text-base font-medium text-foreground hover:no-underline">
              {tx(it.q)}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
              {tx(it.a)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/** Dark-themed variant for the classroom page. */
export function CourseFAQDark({ course, className }: { course: Course; className?: string }) {
  const { t, tx } = useI18n();
  const items = [...TIER_FAQ[course.tier], ...GENERIC];
  return (
    <section className={className}>
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{t("faq.title")}</p>
      </div>
      <h2 className="mt-2 font-serif text-2xl text-white">{t("faq.subtitle")}</h2>
      <Accordion type="single" collapsible className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-2 backdrop-blur">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`cfaq-${i}`} className="border-b border-white/10 last:border-0">
            <AccordionTrigger className="px-4 text-left text-sm font-medium text-white hover:no-underline">
              {tx(it.q)}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm leading-relaxed text-white/70">
              {tx(it.a)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
