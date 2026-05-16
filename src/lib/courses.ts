import macarons from "@/assets/course-macarons.jpg";
import chocolate from "@/assets/course-chocolate.jpg";
import pastries from "@/assets/course-pastries.jpg";
import wedding from "@/assets/course-wedding.jpg";
import bread from "@/assets/course-bread.jpg";
import tarts from "@/assets/course-tarts.jpg";

export type Difficulty = "Beginner" | "Intermediate" | "Expert";

export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Instructor = {
  name: string;
  title: string;
  avatar: string;
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  difficulty: Difficulty;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  instructor: Instructor;
  modules: Module[];
};

// Royalty-free sample videos from Google's public bucket.
const V = {
  bigBuck: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  elephants: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  forBigger: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  sintel: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  tears: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  subaru: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
};

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fde7d3,f8c5b8,f5d4c1`;

export const courses: Course[] = [
  {
    id: "french-macarons",
    title: "The Art of French Macarons",
    tagline: "Master delicate shells and silky ganache",
    description:
      "Learn the precise technique behind perfect Parisian macarons — from meringue mastery to flavored fillings.",
    image: macarons,
    difficulty: "Intermediate",
    duration: "4h 20m",
    price: 79,
    rating: 4.9,
    reviews: 1284,
    instructor: { name: "Camille Laurent", title: "Pâtissière, Paris", avatar: avatar("Camille") },
    modules: [
      {
        id: "m1",
        title: "Foundations",
        lessons: [
          { id: "l1", title: "Welcome & what you'll bake", videoUrl: V.bigBuck, duration: "4:12" },
          { id: "l2", title: "Ingredients & equipment", videoUrl: V.elephants, duration: "8:30" },
          { id: "l3", title: "Almond flour & sifting", videoUrl: V.forBigger, duration: "6:45" },
        ],
      },
      {
        id: "m2",
        title: "Meringue mastery",
        lessons: [
          { id: "l4", title: "Italian vs French meringue", videoUrl: V.sintel, duration: "12:20" },
          { id: "l5", title: "Whipping & sugar syrup", videoUrl: V.tears, duration: "9:50" },
          { id: "l6", title: "Macaronage technique", videoUrl: V.subaru, duration: "14:05" },
        ],
      },
      {
        id: "m3",
        title: "Piping & baking",
        lessons: [
          { id: "l7", title: "Piping uniform shells", videoUrl: V.bigBuck, duration: "10:00" },
          { id: "l8", title: "Resting & feet formation", videoUrl: V.elephants, duration: "7:15" },
          { id: "l9", title: "Oven temperatures", videoUrl: V.forBigger, duration: "8:40" },
        ],
      },
      {
        id: "m4",
        title: "Fillings & flavors",
        lessons: [
          { id: "l10", title: "Vanilla buttercream", videoUrl: V.sintel, duration: "11:00" },
          { id: "l11", title: "Salted caramel ganache", videoUrl: V.tears, duration: "13:25" },
          { id: "l12", title: "Pairing & assembly", videoUrl: V.subaru, duration: "9:10" },
        ],
      },
    ],
  },
  {
    id: "chocolate-cakes",
    title: "Decadent Chocolate Cakes",
    tagline: "From flourless to layered showstoppers",
    description:
      "Explore rich chocolate techniques, glossy ganache drips, and the science of moist, tender crumb.",
    image: chocolate,
    difficulty: "Beginner",
    duration: "3h 45m",
    price: 59,
    rating: 4.8,
    reviews: 942,
    instructor: { name: "Marco Bellini", title: "Chocolatier, Milan", avatar: avatar("Marco") },
    modules: [
      {
        id: "m1",
        title: "Chocolate fundamentals",
        lessons: [
          { id: "l1", title: "Welcome to the kitchen", videoUrl: V.bigBuck, duration: "3:40" },
          { id: "l2", title: "Choosing your chocolate", videoUrl: V.elephants, duration: "9:15" },
          { id: "l3", title: "Tempering basics", videoUrl: V.forBigger, duration: "12:30" },
        ],
      },
      {
        id: "m2",
        title: "Cakes & sponges",
        lessons: [
          { id: "l4", title: "Classic chocolate sponge", videoUrl: V.sintel, duration: "14:00" },
          { id: "l5", title: "Flourless chocolate cake", videoUrl: V.tears, duration: "11:25" },
          { id: "l6", title: "Devil's food layer cake", videoUrl: V.subaru, duration: "13:10" },
        ],
      },
      {
        id: "m3",
        title: "Finishing touches",
        lessons: [
          { id: "l7", title: "Glossy ganache & drips", videoUrl: V.bigBuck, duration: "10:20" },
          { id: "l8", title: "Decoration & plating", videoUrl: V.elephants, duration: "8:00" },
        ],
      },
    ],
  },
  {
    id: "viennoiserie",
    title: "Viennoiserie & Croissants",
    tagline: "Buttery, flaky, golden every time",
    description:
      "A complete deep-dive into laminated dough — croissants, pain au chocolat, and seasonal pastries.",
    image: pastries,
    difficulty: "Expert",
    duration: "6h 10m",
    price: 119,
    rating: 4.95,
    reviews: 612,
    instructor: { name: "Sophie Dubois", title: "Boulangère, Lyon", avatar: avatar("Sophie") },
    modules: [
      {
        id: "m1",
        title: "Dough & détrempe",
        lessons: [
          { id: "l1", title: "Introduction to lamination", videoUrl: V.bigBuck, duration: "6:00" },
          { id: "l2", title: "Mixing the détrempe", videoUrl: V.elephants, duration: "11:30" },
          { id: "l3", title: "Butter block prep", videoUrl: V.forBigger, duration: "9:45" },
        ],
      },
      {
        id: "m2",
        title: "Lamination",
        lessons: [
          { id: "l4", title: "First single fold", videoUrl: V.sintel, duration: "13:20" },
          { id: "l5", title: "Double fold technique", videoUrl: V.tears, duration: "14:10" },
          { id: "l6", title: "Resting between folds", videoUrl: V.subaru, duration: "7:55" },
        ],
      },
      {
        id: "m3",
        title: "Shaping classics",
        lessons: [
          { id: "l7", title: "Croissants au beurre", videoUrl: V.bigBuck, duration: "15:40" },
          { id: "l8", title: "Pain au chocolat", videoUrl: V.elephants, duration: "10:30" },
          { id: "l9", title: "Almond & seasonal fills", videoUrl: V.forBigger, duration: "9:50" },
        ],
      },
      {
        id: "m4",
        title: "Proof & bake",
        lessons: [
          { id: "l10", title: "Proofing science", videoUrl: V.sintel, duration: "12:15" },
          { id: "l11", title: "Egg wash & finishing", videoUrl: V.tears, duration: "6:20" },
          { id: "l12", title: "Baking for color & crumb", videoUrl: V.subaru, duration: "11:45" },
        ],
      },
    ],
  },
  {
    id: "wedding-cakes",
    title: "Wedding Cake Masterclass",
    tagline: "Elegant tiers and sugar florals",
    description:
      "Design, structure, and decorate multi-tier wedding cakes with confident sugar craft and clean finishes.",
    image: wedding,
    difficulty: "Expert",
    duration: "8h 00m",
    price: 149,
    rating: 4.92,
    reviews: 421,
    instructor: { name: "Eleanor Hart", title: "Cake Designer, London", avatar: avatar("Eleanor") },
    modules: [
      {
        id: "m1",
        title: "Design & structure",
        lessons: [
          { id: "l1", title: "Design briefs & sketching", videoUrl: V.bigBuck, duration: "9:30" },
          { id: "l2", title: "Dowelling multi-tier cakes", videoUrl: V.elephants, duration: "12:00" },
        ],
      },
      {
        id: "m2",
        title: "Smooth finishes",
        lessons: [
          { id: "l3", title: "Italian buttercream", videoUrl: V.forBigger, duration: "13:20" },
          { id: "l4", title: "Razor-sharp edges", videoUrl: V.sintel, duration: "15:10" },
          { id: "l5", title: "Fondant covering", videoUrl: V.tears, duration: "14:05" },
        ],
      },
      {
        id: "m3",
        title: "Sugar florals",
        lessons: [
          { id: "l6", title: "Sugar rose petals", videoUrl: V.subaru, duration: "18:00" },
          { id: "l7", title: "Assembly & arrangement", videoUrl: V.bigBuck, duration: "11:40" },
        ],
      },
      {
        id: "m4",
        title: "Delivery & photography",
        lessons: [
          { id: "l8", title: "Boxing & transport", videoUrl: V.elephants, duration: "6:50" },
          { id: "l9", title: "Styling the cake table", videoUrl: V.forBigger, duration: "8:30" },
        ],
      },
    ],
  },
  {
    id: "artisan-bread",
    title: "Artisan Sourdough Bread",
    tagline: "Living dough, honest crust",
    description:
      "Build and maintain a starter, master hydration, and pull beautiful crusty loaves from your home oven.",
    image: bread,
    difficulty: "Beginner",
    duration: "5h 15m",
    price: 69,
    rating: 4.85,
    reviews: 1567,
    instructor: { name: "Hannah Kepler", title: "Baker, Copenhagen", avatar: avatar("Hannah") },
    modules: [
      {
        id: "m1",
        title: "The starter",
        lessons: [
          { id: "l1", title: "Building a starter from scratch", videoUrl: V.bigBuck, duration: "8:20" },
          { id: "l2", title: "Daily feeding routine", videoUrl: V.elephants, duration: "6:00" },
          { id: "l3", title: "Storing & reviving", videoUrl: V.forBigger, duration: "5:40" },
        ],
      },
      {
        id: "m2",
        title: "Mixing & bulk",
        lessons: [
          { id: "l4", title: "Hydration & flour choices", videoUrl: V.sintel, duration: "10:00" },
          { id: "l5", title: "Autolyse & mixing", videoUrl: V.tears, duration: "9:20" },
          { id: "l6", title: "Stretch & folds", videoUrl: V.subaru, duration: "11:00" },
        ],
      },
      {
        id: "m3",
        title: "Shape & bake",
        lessons: [
          { id: "l7", title: "Shaping boules & batards", videoUrl: V.bigBuck, duration: "12:30" },
          { id: "l8", title: "Cold proof overnight", videoUrl: V.elephants, duration: "5:50" },
          { id: "l9", title: "Scoring patterns", videoUrl: V.forBigger, duration: "7:15" },
          { id: "l10", title: "Baking with steam", videoUrl: V.sintel, duration: "9:40" },
        ],
      },
    ],
  },
  {
    id: "tarts-pies",
    title: "Modern Fruit Tarts",
    tagline: "Crisp shells, bright fruit, perfect cream",
    description:
      "Pastry cream, crémeux, and pâte sucrée techniques for tarts that look as good as they taste.",
    image: tarts,
    difficulty: "Intermediate",
    duration: "3h 30m",
    price: 65,
    rating: 4.87,
    reviews: 738,
    instructor: { name: "Akira Tanaka", title: "Pâtissier, Tokyo", avatar: avatar("Akira") },
    modules: [
      {
        id: "m1",
        title: "Pastry shells",
        lessons: [
          { id: "l1", title: "Pâte sucrée mixing", videoUrl: V.bigBuck, duration: "8:50" },
          { id: "l2", title: "Lining the tart ring", videoUrl: V.elephants, duration: "7:30" },
          { id: "l3", title: "Blind baking", videoUrl: V.forBigger, duration: "6:20" },
        ],
      },
      {
        id: "m2",
        title: "Creams & curds",
        lessons: [
          { id: "l4", title: "Vanilla pastry cream", videoUrl: V.sintel, duration: "10:40" },
          { id: "l5", title: "Lemon curd & crémeux", videoUrl: V.tears, duration: "11:25" },
        ],
      },
      {
        id: "m3",
        title: "Fruit & finishing",
        lessons: [
          { id: "l6", title: "Cutting & arranging fruit", videoUrl: V.subaru, duration: "9:00" },
          { id: "l7", title: "Glaze & shine", videoUrl: V.bigBuck, duration: "6:10" },
          { id: "l8", title: "Plating for guests", videoUrl: V.elephants, duration: "5:30" },
        ],
      },
    ],
  },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id);

export const totalLessons = (course: Course) =>
  course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

export const flatLessons = (course: Course) =>
  course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title })));
