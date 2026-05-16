import macarons from "@/assets/course-macarons.jpg";
import chocolate from "@/assets/course-chocolate.jpg";
import pastries from "@/assets/course-pastries.jpg";
import wedding from "@/assets/course-wedding.jpg";
import bread from "@/assets/course-bread.jpg";
import tarts from "@/assets/course-tarts.jpg";

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  price: number;
  instructor: { name: string; title: string };
  syllabus: { title: string; duration: string }[];
};

export const courses: Course[] = [
  {
    slug: "french-macarons",
    title: "The Art of French Macarons",
    tagline: "Master delicate shells and silky ganache",
    description:
      "Learn the precise technique behind perfect Parisian macarons — from meringue mastery to flavored fillings.",
    image: macarons,
    level: "Intermediate",
    duration: "4h 20m",
    lessons: 18,
    price: 79,
    instructor: { name: "Camille Laurent", title: "Pâtissière, Paris" },
    syllabus: [
      { title: "Ingredients & equipment", duration: "12m" },
      { title: "Italian vs French meringue", duration: "24m" },
      { title: "Macaronage technique", duration: "32m" },
      { title: "Piping & resting", duration: "20m" },
      { title: "Buttercream & ganache fillings", duration: "48m" },
      { title: "Signature flavor pairings", duration: "40m" },
    ],
  },
  {
    slug: "chocolate-cakes",
    title: "Decadent Chocolate Cakes",
    tagline: "From flourless to layered showstoppers",
    description:
      "Explore rich chocolate techniques, glossy ganache drips, and the science of moist, tender crumb.",
    image: chocolate,
    level: "Beginner",
    duration: "3h 45m",
    lessons: 14,
    price: 59,
    instructor: { name: "Marco Bellini", title: "Chocolatier, Milan" },
    syllabus: [
      { title: "Choosing chocolate", duration: "15m" },
      { title: "Perfect sponge base", duration: "30m" },
      { title: "Ganache & glaze", duration: "35m" },
      { title: "Layering & assembly", duration: "40m" },
      { title: "Decoration", duration: "25m" },
    ],
  },
  {
    slug: "viennoiserie",
    title: "Viennoiserie & Croissants",
    tagline: "Buttery, flaky, golden every time",
    description:
      "A complete deep-dive into laminated dough — croissants, pain au chocolat, and seasonal pastries.",
    image: pastries,
    level: "Advanced",
    duration: "6h 10m",
    lessons: 22,
    price: 119,
    instructor: { name: "Sophie Dubois", title: "Boulangère, Lyon" },
    syllabus: [
      { title: "Dough & détrempe", duration: "30m" },
      { title: "Lamination 101", duration: "55m" },
      { title: "Shaping classics", duration: "45m" },
      { title: "Proofing science", duration: "30m" },
      { title: "Baking & finishing", duration: "40m" },
    ],
  },
  {
    slug: "wedding-cakes",
    title: "Wedding Cake Masterclass",
    tagline: "Elegant tiers and sugar florals",
    description:
      "Design, structure, and decorate multi-tier wedding cakes with confident sugar craft and clean finishes.",
    image: wedding,
    level: "Advanced",
    duration: "8h 00m",
    lessons: 26,
    price: 149,
    instructor: { name: "Eleanor Hart", title: "Cake Designer, London" },
    syllabus: [
      { title: "Structure & dowelling", duration: "40m" },
      { title: "Smooth buttercream finish", duration: "55m" },
      { title: "Sugar flower roses", duration: "1h 20m" },
      { title: "Color theory", duration: "30m" },
      { title: "Photography & delivery", duration: "25m" },
    ],
  },
  {
    slug: "artisan-bread",
    title: "Artisan Sourdough Bread",
    tagline: "Living dough, honest crust",
    description:
      "Build and maintain a starter, master hydration, and pull beautiful crusty loaves from your home oven.",
    image: bread,
    level: "Beginner",
    duration: "5h 15m",
    lessons: 20,
    price: 69,
    instructor: { name: "Hannah Kepler", title: "Baker, Copenhagen" },
    syllabus: [
      { title: "Build a starter", duration: "20m" },
      { title: "Autolyse & bulk", duration: "45m" },
      { title: "Shaping boules & batards", duration: "35m" },
      { title: "Scoring patterns", duration: "25m" },
      { title: "Baking with steam", duration: "30m" },
    ],
  },
  {
    slug: "tarts-pies",
    title: "Modern Fruit Tarts",
    tagline: "Crisp shells, bright fruit, perfect cream",
    description:
      "Pastry cream, crémeux, and pâte sucrée techniques for tarts that look as good as they taste.",
    image: tarts,
    level: "Intermediate",
    duration: "3h 30m",
    lessons: 15,
    price: 65,
    instructor: { name: "Akira Tanaka", title: "Pâtissier, Tokyo" },
    syllabus: [
      { title: "Pâte sucrée", duration: "25m" },
      { title: "Blind baking", duration: "20m" },
      { title: "Vanilla pastry cream", duration: "30m" },
      { title: "Fruit prep & glaze", duration: "30m" },
      { title: "Plating & finishing", duration: "20m" },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
