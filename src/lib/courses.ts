import pastries from "@/assets/course-pastries.jpg";
import wedding from "@/assets/course-wedding.jpg";
import bread from "@/assets/course-bread.jpg";
import chocolate from "@/assets/course-chocolate.jpg";
import macaronsImg from "@/assets/course-macarons.jpg";
import tarts from "@/assets/course-tarts.jpg";

export type Difficulty = "Beginner" | "Intermediate" | "Expert";
export type Tier = "home" | "business" | "industrial";

export const TIER_META: Record<Tier, { label: string; short: string; description: string }> = {
  home: {
    label: "Home Baker",
    short: "Home",
    description: "Minimal equipment, standard home ovens, single-cake yields.",
  },
  business: {
    label: "Business Starter",
    short: "Café",
    description: "Boutique cafés & bakeries — cost-aware, display-durable, high-margin.",
  },
  industrial: {
    label: "Industrial",
    short: "Factory",
    description: "Bulk mixing, shelf-life, scaled recipes for serial production.",
  },
};

export type RecipeIngredient = { item: string; qty: string };

export type LessonRecipe = {
  servings?: string;
  time?: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  chefNotes?: string[];
};

export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  recipe?: LessonRecipe;
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
  tier: Tier;
  trending?: boolean;
  keywords?: string[];
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  instructor: Instructor;
  modules: Module[];
};

const yt = (id: string) => `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fde7d3,f8c5b8,f5d4c1`;

export const courses: Course[] = [
  {
    id: "italian-pastries",
    title: "The Art of Italian Pastries",
    tagline: "Four days inside Italy's finest pasticcerie",
    description:
      "A curated masterclass inspired by Club Academy's open program. Learn signature recipes from Gino Fabbri, Luca Montersino, Leonardo Di Carlo, and finish with classic French croissants — all from the world's best free video resources, organized into a guided journey.",
    image: pastries,
    difficulty: "Intermediate",
    tier: "business",
    keywords: ["italian", "frolla", "caprese", "cheesecake", "croissant", "occhi di bue"],
    duration: "4h 30m",
    price: 89,
    rating: 4.94,
    reviews: 1287,
    instructor: {
      name: "Club Academy Maestri",
      title: "Italian pastry collective",
      avatar: avatar("Gino Fabbri"),
    },
    modules: [
      {
        id: "day-1",
        title: "Day 1 · Frolla & filled cookies",
        lessons: [
          {
            id: "occhi-di-bue",
            title: "Occhi di bue with Gino Fabbri",
            videoUrl: yt("vdR7Wx9PptY"),
            duration: "8:51",
            recipe: {
              servings: "24 cookies",
              time: "1h 30m + 1h chill",
              ingredients: [
                { item: "All-purpose flour", qty: "300 g" },
                { item: "Unsalted butter, cold cubed", qty: "180 g" },
                { item: "Powdered sugar", qty: "120 g" },
                { item: "Egg yolks", qty: "60 g" },
                { item: "Vanilla bean paste", qty: "5 g" },
                { item: "Fine sea salt", qty: "1 g" },
                { item: "Apricot or raspberry jam", qty: "150 g" },
              ],
              steps: [
                "Sift the flour and powdered sugar onto a clean work surface and rub in the cold butter until the mixture resembles fine sand.",
                "Make a well in the center, add yolks, vanilla and salt, and bring together quickly without overworking.",
                "Flatten into a 2 cm disc, wrap, and chill for at least 1 hour (overnight is better).",
                "Roll the dough to 4 mm. Cut 5 cm rounds; cut a 2 cm hole in half of them.",
                "Bake at 170 °C for 11–13 minutes until pale gold at the edges. Cool completely.",
                "Sandwich with a teaspoon of jam, top with a holed disc, and dust with powdered sugar.",
              ],
              chefNotes: ["Keep everything cold — frolla loves a cool kitchen and a quick hand."],
            },
          },
        ],
      },
      {
        id: "day-2",
        title: "Day 2 · Torta Caprese",
        lessons: [
          {
            id: "torta-caprese",
            title: "Torta Caprese with Luca Montersino",
            videoUrl: yt("KlZOS-Fj9jA"),
            duration: "5:14",
            recipe: {
              servings: "10 slices · 22 cm tin",
              time: "1h 15m",
              ingredients: [
                { item: "70% dark chocolate", qty: "170 g" },
                { item: "Unsalted butter", qty: "170 g" },
                { item: "Granulated sugar", qty: "200 g" },
                { item: "Eggs, separated", qty: "220 g" },
                { item: "Almond flour", qty: "200 g" },
                { item: "Dutch cocoa powder", qty: "20 g" },
                { item: "Fine sea salt", qty: "2 g" },
              ],
              steps: [
                "Melt chocolate and butter over a bain-marie; cool slightly.",
                "Whisk yolks with half the sugar until pale. Fold in chocolate, almond flour, cocoa and salt.",
                "Whip whites with remaining sugar to soft peaks. Fold into the base in three additions.",
                "Bake at 170 °C for 35–40 minutes — center should still be slightly soft.",
                "Cool fully, dust generously with powdered sugar.",
              ],
              chefNotes: ["Pull the cake when a skewer comes out with moist crumbs, not clean."],
            },
          },
        ],
      },
      {
        id: "day-3",
        title: "Day 3 · Creamy cheesecake",
        lessons: [
          {
            id: "creamy-cheesecake",
            title: "Creamy cheesecake with Leonardo Di Carlo",
            videoUrl: yt("iJXLnsVns88"),
            duration: "9:54",
            recipe: {
              servings: "10 slices · 23 cm tin",
              time: "1h 30m + 6h chill",
              ingredients: [
                { item: "Digestive biscuits, crushed", qty: "250 g" },
                { item: "Melted butter", qty: "110 g" },
                { item: "Full-fat cream cheese", qty: "900 g" },
                { item: "Granulated sugar", qty: "200 g" },
                { item: "Sour cream", qty: "120 g" },
                { item: "Eggs", qty: "220 g" },
                { item: "Vanilla bean paste", qty: "10 g" },
                { item: "Cornstarch", qty: "20 g" },
              ],
              steps: [
                "Press biscuit base into a 23 cm springform; chill 20 minutes.",
                "Beat cream cheese smooth. Add sugar and cornstarch.",
                "Mix in sour cream, vanilla. Add eggs on lowest speed — no air.",
                "Bake at 160 °C for 55–65 min. Edges set, center wobbly.",
                "Cool in oven 1 h. Chill 6 h before unmolding.",
              ],
              chefNotes: ["Room-temperature ingredients give a crackless cheesecake."],
            },
          },
        ],
      },
      {
        id: "day-4",
        title: "Day 4 · French croissants",
        lessons: [
          {
            id: "french-croissants",
            title: "French croissants — the long lamination",
            videoUrl: yt("vpwY3nmLLaA"),
            duration: "29:56",
            recipe: {
              servings: "12 croissants",
              time: "Active 2h · Total 24h",
              ingredients: [
                { item: "Bread flour", qty: "500 g" },
                { item: "Whole milk, cold", qty: "140 g" },
                { item: "Water, cold", qty: "140 g" },
                { item: "Granulated sugar", qty: "55 g" },
                { item: "Fine sea salt", qty: "12 g" },
                { item: "Instant yeast", qty: "10 g" },
                { item: "Soft butter (détrempe)", qty: "40 g" },
                { item: "Cold butter (butter block)", qty: "280 g" },
              ],
              steps: [
                "Mix détrempe 4 min low + 4 min medium. Square it, chill overnight.",
                "Pound butter into an 18 cm square. Keep cool but pliable.",
                "Enclose butter in a 30 cm dough square. Complete 3 single folds with chills.",
                "Roll to 4 mm. Cut triangles 10 × 25 cm and roll into croissants.",
                "Proof 2–3 h at 24 °C. Egg wash and bake 200 °C for 18–22 min.",
              ],
              chefNotes: ["Butter must bend without snapping. Chill whenever it resists."],
            },
          },
        ],
      },
    ],
  },
  {
    id: "bento-celebration",
    title: "Mastering Bento & Celebration Cakes",
    tagline: "From the sponge to the perfect piped letter",
    description:
      "A modern three-module masterclass on the cake everyone is gifting right now. Build a tender vanilla sponge, master a silky stable buttercream, then finish with bento-style piping and lettering.",
    image: wedding,
    difficulty: "Beginner",
    tier: "home",
    trending: true,
    keywords: ["bento", "buttercream", "lettering", "celebration", "vanilla sponge"],
    duration: "3h 50m",
    price: 69,
    rating: 4.9,
    reviews: 962,
    instructor: {
      name: "Jemma Wilson",
      title: "Cake artist · Crumbs & Doilies",
      avatar: avatar("Jemma Wilson"),
    },
    modules: [
      {
        id: "m1",
        title: "Module 1 · Baking the perfect sponge",
        lessons: [
          {
            id: "vanilla-sponge",
            title: "The perfect vanilla sponge cake",
            videoUrl: yt("SWIaXtgETDY"),
            duration: "12:02",
            recipe: {
              servings: "Two 6-inch layers",
              time: "1h",
              ingredients: [
                { item: "Unsalted butter, soft", qty: "175 g" },
                { item: "Caster sugar", qty: "175 g" },
                { item: "Eggs, room temperature", qty: "165 g" },
                { item: "Vanilla bean paste", qty: "5 g" },
                { item: "Self-raising flour", qty: "175 g" },
                { item: "Fine sea salt", qty: "1 g" },
                { item: "Whole milk", qty: "30 g" },
              ],
              steps: [
                "Preheat oven to 170 °C. Line two 6-inch tins.",
                "Cream butter and sugar 4–5 min until pale.",
                "Add eggs gradually with a spoonful of flour. Mix in vanilla.",
                "Fold remaining flour and salt. Loosen with milk.",
                "Bake 25–28 min. Cool 10 min in tin then turn out.",
              ],
              chefNotes: ["Trim domes once cool for clean stacking."],
            },
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2 · Stable buttercream",
        lessons: [
          {
            id: "smbc",
            title: "Foolproof Swiss meringue buttercream",
            videoUrl: yt("w2TO5h501Hk"),
            duration: "16:53",
            recipe: {
              servings: "Frosts one 6-inch cake",
              time: "30 min",
              ingredients: [
                { item: "Egg whites", qty: "150 g" },
                { item: "Caster sugar", qty: "300 g" },
                { item: "Unsalted butter, softened", qty: "450 g" },
                { item: "Vanilla bean paste", qty: "10 g" },
                { item: "Fine sea salt", qty: "1 g" },
              ],
              steps: [
                "Whisk whites and sugar over bain-marie to 65 °C.",
                "Whip 8–10 min until stiff, glossy, cool.",
                "Switch to paddle. Add butter gradually. Will look curdled — keep going.",
                "Beat in vanilla and salt.",
                "Apply thin crumb coat, chill, then final coat.",
              ],
              chefNotes: ["Soupy? Chill 10 min and re-whip. Split? Warm bowl briefly."],
            },
          },
        ],
      },
      {
        id: "m3",
        title: "Module 3 · Bento piping & lettering",
        lessons: [
          {
            id: "bento-piping",
            title: "Super cute bento cakes — full decoration",
            videoUrl: yt("OXaG2uLosYU"),
            duration: "14:20",
            recipe: {
              servings: "One 4-inch bento cake",
              time: "45 min",
              ingredients: [
                { item: "Crumb-coated 4-inch cake", qty: "1" },
                { item: "Swiss meringue buttercream (white)", qty: "300 g" },
                { item: "Gel food coloring (pastel)", qty: "as needed" },
              ],
              steps: [
                "Divide buttercream into bowls and color in pastels.",
                "Pipe a smooth border with a star tip at 90°.",
                "Add shells, dots and rosettes with even pressure.",
                "Switch to round #2 tip for lettering — drag just above the surface.",
                "Box in a kraft bento container with parchment under base.",
              ],
              chefNotes: ["Cold cake + room-temp buttercream pipes the cleanest."],
            },
          },
        ],
      },
    ],
  },
  {
    id: "bakery-foundations",
    title: "Foundation of Bakery & Bread",
    tagline: "From mise en place to your first laminated rolls",
    description:
      "A friendly first-step program for anyone walking into a kitchen for real. Set up like a pro, demystify yeast, then bake the cinnamon rolls everyone asks for.",
    image: bread,
    difficulty: "Beginner",
    tier: "home",
    trending: true,
    keywords: ["cinnamon rolls", "yeast", "bread", "mise en place", "bakery basics"],
    duration: "1h 30m",
    price: 49,
    rating: 4.88,
    reviews: 1840,
    instructor: {
      name: "Erin Jeanne McDowell",
      title: "Bakery educator · Food52",
      avatar: avatar("Erin McDowell"),
    },
    modules: [
      {
        id: "l1",
        title: "Lesson 1 · Mise en place",
        lessons: [
          {
            id: "mise-en-place",
            title: "What is mise en place (and why it matters)",
            videoUrl: yt("67JR7XIi_3k"),
            duration: "4:21",
            recipe: {
              time: "Pre-work checklist",
              ingredients: [
                { item: "Recipe printed and read end-to-end", qty: "1" },
                { item: "Small bowls for ingredients", qty: "as needed" },
                { item: "Digital scale (grams)", qty: "1" },
              ],
              steps: [
                "Read the recipe out loud once.",
                "Weigh and pre-portion every ingredient.",
                "Preheat the oven first.",
                "Lay out tools in order of use. Clean as you go.",
              ],
              chefNotes: ["The single biggest difference between hobby cooks and professionals."],
            },
          },
        ],
      },
      {
        id: "l2",
        title: "Lesson 2 · Yeast & leavening basics",
        lessons: [
          {
            id: "yeast-basics",
            title: "Understanding yeast — Bake It Up a Notch",
            videoUrl: yt("QD2GGo181bQ"),
            duration: "50:14",
            recipe: {
              time: "Reference card",
              ingredients: [
                { item: "Active dry yeast", qty: "7 g" },
                { item: "Water at 40 °C", qty: "100 g" },
                { item: "Sugar (food for yeast)", qty: "5 g" },
              ],
              steps: [
                "Bloom yeast in warm water with sugar — should foam in 5 min.",
                "Bulk ferment until doubled and a poke springs back slowly.",
                "Cold-proof in fridge for deeper flavor.",
              ],
              chefNotes: ["1 packet instant yeast = 7 g = 2¼ tsp.", "Yeast dies at 60 °C."],
            },
          },
        ],
      },
      {
        id: "l3",
        title: "Lesson 3 · Cinnamon rolls",
        lessons: [
          {
            id: "cinnamon-rolls",
            title: "Cinnabon-style cinnamon rolls — But Better",
            videoUrl: yt("f6kzypYDLRg"),
            duration: "8:55",
            recipe: {
              servings: "8 large rolls",
              time: "Active 45m · Total 3h",
              ingredients: [
                { item: "Whole milk, warm", qty: "240 g" },
                { item: "Instant yeast", qty: "7 g" },
                { item: "Granulated sugar", qty: "50 g" },
                { item: "Egg + yolk", qty: "70 g" },
                { item: "Bread flour", qty: "560 g" },
                { item: "Fine sea salt", qty: "9 g" },
                { item: "Soft butter (dough)", qty: "85 g" },
                { item: "Brown sugar (filling)", qty: "200 g" },
                { item: "Cinnamon (filling)", qty: "20 g" },
                { item: "Soft butter (filling)", qty: "85 g" },
                { item: "Cream cheese (glaze)", qty: "115 g" },
                { item: "Powdered sugar (glaze)", qty: "150 g" },
              ],
              steps: [
                "Bloom yeast in warm milk + pinch of sugar.",
                "Knead dough 6 min, add butter, knead 6 more min.",
                "Bulk proof 60–90 min until doubled.",
                "Roll 30 × 45 cm, spread filling, roll tightly, cut 8 rolls.",
                "Proof 45–60 min. Bake 180 °C for 22–25 min.",
                "Whip glaze, drizzle on warm rolls.",
              ],
              chefNotes: ["Bread flour gives the pull-apart fluffy crumb."],
            },
          },
        ],
      },
    ],
  },
  {
    id: "medovik",
    title: "Classic Medovik — Russian Honey Cake",
    tagline: "Eight delicate honey layers, silky sour-cream filling",
    description:
      "The viral honey cake everyone is recreating. Master the elastic honey dough, paper-thin layers, and the tangy sour-cream-and-condensed-milk filling that makes Medovik unforgettable at home.",
    image: chocolate,
    difficulty: "Intermediate",
    tier: "home",
    trending: true,
    keywords: ["medovik", "honey cake", "russian", "sour cream", "trending"],
    duration: "1h 15m",
    price: 39,
    rating: 4.92,
    reviews: 530,
    instructor: {
      name: "Natasha Petrova",
      title: "Pastry chef · Moscow",
      avatar: avatar("Natasha Medovik"),
    },
    modules: [
      {
        id: "med-1",
        title: "Module 1 · The honey layers",
        lessons: [
          {
            id: "medovik-layers",
            title: "Medovik honey layers from scratch",
            videoUrl: yt("VeiH4ToK_5Y"),
            duration: "11:30",
            recipe: {
              servings: "One 8-layer 20 cm cake",
              time: "2h",
              ingredients: [
                { item: "Honey", qty: "90 g" },
                { item: "Granulated sugar", qty: "180 g" },
                { item: "Unsalted butter", qty: "100 g" },
                { item: "Eggs", qty: "110 g" },
                { item: "Baking soda", qty: "8 g" },
                { item: "All-purpose flour", qty: "450 g" },
                { item: "Sour cream (filling)", qty: "800 g" },
                { item: "Sweetened condensed milk (filling)", qty: "200 g" },
              ],
              steps: [
                "Melt honey, sugar and butter over a bain-marie until liquid.",
                "Whisk in eggs off-heat, then baking soda — mixture will foam.",
                "Stir in flour to form a soft dough. Divide into 8 balls and chill 30 min.",
                "Roll each ball paper-thin, bake at 180 °C for 4–5 min until golden.",
                "Whip sour cream and condensed milk until thick. Stack layers with cream.",
                "Crumb sides and top. Chill overnight before slicing.",
              ],
              chefNotes: ["The cake must rest 12 hours — the layers soften into pillows."],
            },
          },
        ],
      },
    ],
  },
  {
    id: "san-sebastian",
    title: "San Sebastian Cheesecake for Cafés",
    tagline: "The viral burnt Basque — display-stable, café-ready",
    description:
      "Built for boutique cafés: a high-margin signature dessert that holds its shape under glass for 48 hours, scales to 10 cakes per bake, and includes full cost-per-slice math.",
    image: tarts,
    difficulty: "Intermediate",
    tier: "business",
    trending: true,
    keywords: ["san sebastian", "basque", "burnt cheesecake", "cafe", "trending"],
    duration: "1h 5m",
    price: 79,
    rating: 4.91,
    reviews: 412,
    instructor: {
      name: "Mikel Etxeberria",
      title: "Pastry consultant · Donostia",
      avatar: avatar("Mikel SanSebastian"),
    },
    modules: [
      {
        id: "ss-1",
        title: "Module 1 · Café-grade Basque",
        lessons: [
          {
            id: "san-sebastian-base",
            title: "Burnt Basque cheesecake — café production",
            videoUrl: yt("XlPRSpQVnRA"),
            duration: "10:42",
            recipe: {
              servings: "1 cake · 18 cm",
              time: "1h + 6h chill",
              ingredients: [
                { item: "Full-fat cream cheese", qty: "800 g" },
                { item: "Granulated sugar", qty: "240 g" },
                { item: "Eggs", qty: "275 g" },
                { item: "Heavy cream (35%)", qty: "400 g" },
                { item: "All-purpose flour", qty: "25 g" },
                { item: "Fine sea salt", qty: "2 g" },
                { item: "Vanilla bean paste", qty: "5 g" },
              ],
              steps: [
                "Line a tall 18 cm tin with parchment, crumpling to fit with overhang.",
                "Beat cream cheese with sugar and salt until smooth — no air.",
                "Add eggs one at a time on low. Stream in cream, then sift flour.",
                "Strain batter, pour into tin. Bake 220 °C for 38–42 min until deeply burnt on top and still jiggly.",
                "Cool to room temp, then chill 6 h. Slice with a hot knife for clean café-window slices.",
              ],
              chefNotes: [
                "Sells at €7 / slice in EU cafés; food cost ≈ €0.85 per slice at scale.",
                "Holds 48 h in a display case — bake mornings, sell through dinner service.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "ny-croissant-rolls",
    title: "New York Croissant Rolls",
    tagline: "Laminated, twisted, sugared — Instagram's favorite pastry",
    description:
      "The supreme + flat croissant trend, decoded for café production. Make a one-day laminated dough, shape four trending formats, and finish with brûléed sugar tops.",
    image: pastries,
    difficulty: "Expert",
    tier: "business",
    trending: true,
    keywords: ["new york croissant", "supreme", "flat croissant", "laminated", "cafe"],
    duration: "1h 50m",
    price: 99,
    rating: 4.86,
    reviews: 287,
    instructor: {
      name: "Lasse Skjønhaug",
      title: "Head baker · Apollon Brooklyn",
      avatar: avatar("Lasse NYC"),
    },
    modules: [
      {
        id: "nyc-1",
        title: "Module 1 · The day-laminated dough",
        lessons: [
          {
            id: "nyc-croissant-dough",
            title: "Same-day laminated croissant dough",
            videoUrl: yt("vpwY3nmLLaA"),
            duration: "29:56",
            recipe: {
              servings: "12 croissant rolls",
              time: "Active 2h · Total 8h",
              ingredients: [
                { item: "Bread flour T65", qty: "500 g" },
                { item: "Cold milk", qty: "140 g" },
                { item: "Cold water", qty: "140 g" },
                { item: "Granulated sugar", qty: "55 g" },
                { item: "Fine sea salt", qty: "12 g" },
                { item: "Instant yeast", qty: "10 g" },
                { item: "Cold European butter (block)", qty: "280 g" },
                { item: "Granulated sugar (brûlée top)", qty: "60 g" },
              ],
              steps: [
                "Mix détrempe 4 min low + 4 min med. Chill 1 h.",
                "Enclose 18 cm butter block in 30 cm dough square.",
                "Complete 3 single folds with 30 min chills.",
                "Roll 4 mm. Cut strips, twist or coil into supreme / flat shapes.",
                "Proof at 26 °C for 2 h. Bake 190 °C for 16–18 min.",
                "Dip tops in sugar and torch for a brûléed café finish.",
              ],
              chefNotes: [
                "Sells at €6 in NY/EU specialty cafés; food cost ≈ €0.95.",
                "Same-day method = no overnight schedule, ideal for small teams.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "macarons-business",
    title: "French Macarons — Production Standard",
    tagline: "Consistent shells, 50-piece batches, zero rejects",
    description:
      "The reliable Italian-meringue macaron method designed for boutique sale. Build glossy feet, perfect color saturation, and three signature ganaches that hold 7 days in display.",
    image: macaronsImg,
    difficulty: "Expert",
    tier: "business",
    keywords: ["macaron", "italian meringue", "ganache", "boutique"],
    duration: "1h 40m",
    price: 89,
    rating: 4.83,
    reviews: 356,
    instructor: {
      name: "Claire Damon",
      title: "Pâtissière · Paris",
      avatar: avatar("Claire Macaron"),
    },
    modules: [
      {
        id: "mac-1",
        title: "Module 1 · Italian-meringue shells",
        lessons: [
          {
            id: "macaron-shells",
            title: "Italian-meringue macaron shells — 50 pcs",
            videoUrl: yt("vGqApdW9X-Q"),
            duration: "13:48",
            recipe: {
              servings: "50 shells (25 macarons)",
              time: "1h + 30m rest",
              ingredients: [
                { item: "Almond flour, sifted", qty: "150 g" },
                { item: "Powdered sugar", qty: "150 g" },
                { item: "Egg whites (split)", qty: "110 g" },
                { item: "Granulated sugar", qty: "150 g" },
                { item: "Water", qty: "40 g" },
                { item: "Gel food coloring", qty: "as needed" },
              ],
              steps: [
                "Whisk almond flour + powdered sugar with 55 g whites and coloring to a paste.",
                "Cook sugar + water to 118 °C. Stream into the remaining 55 g whites whipped to soft peaks.",
                "Whip Italian meringue until 50 °C. Fold into almond paste in 3 additions.",
                "Macaronage to a ribbon that flows back into the bowl in 10 seconds.",
                "Pipe 3.5 cm rounds. Rest 30 min until skinned.",
                "Bake 150 °C for 13–14 min. Cool fully before lifting.",
              ],
              chefNotes: [
                "Boutique price €2.20 / macaron; food cost ≈ €0.30 — best margin in the patisserie.",
                "Filled macarons mature 24 h in fridge before sale — texture improves dramatically.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "industrial-sponge",
    title: "Mass-Production Sponge Cakes",
    tagline: "Continuous mixers, sheet-pan yields, 12-month shelf-life",
    description:
      "Factory-scale sponge for industrial bakeries: emulsifier-stabilized batter, continuous-mix workflows, sheet-tunnel baking, and shelf-life formulation for retail-packed cakes.",
    image: wedding,
    difficulty: "Expert",
    tier: "industrial",
    keywords: ["industrial", "sponge", "factory", "scaled", "shelf life"],
    duration: "55m",
    price: 149,
    rating: 4.78,
    reviews: 92,
    instructor: {
      name: "Dr. Helmut Krause",
      title: "Industrial bakery consultant · Hamburg",
      avatar: avatar("Helmut Industrial"),
    },
    modules: [
      {
        id: "ind-1",
        title: "Module 1 · Stabilized factory sponge",
        lessons: [
          {
            id: "industrial-sponge-base",
            title: "Continuous-mix industrial sponge",
            videoUrl: yt("4n1mF7tFLNs"),
            duration: "9:12",
            recipe: {
              servings: "Base ratio — scale per batch",
              time: "Mix 8 min · Bake 12 min",
              ingredients: [
                { item: "Cake flour (low protein)", qty: "1000 g" },
                { item: "Granulated sugar", qty: "1000 g" },
                { item: "Whole egg (pasteurized liquid)", qty: "1100 g" },
                { item: "Vegetable oil", qty: "300 g" },
                { item: "Water", qty: "300 g" },
                { item: "Sponge emulsifier (mono-diglycerides)", qty: "60 g" },
                { item: "Baking powder", qty: "30 g" },
                { item: "Fine salt", qty: "10 g" },
                { item: "Potassium sorbate (preservative)", qty: "2 g" },
              ],
              steps: [
                "All-in to planetary or continuous mixer: 2 min low to hydrate, 6 min high to aerate to 0.45 g/mL specific gravity.",
                "Deposit 850 g batter per half-sheet pan (60 × 40 cm) lined with silicone.",
                "Bake in reel/tunnel oven at 195 °C top / 180 °C bottom for 11–12 min.",
                "Cool on spiral cooler to 25 °C core within 35 min.",
                "Cut, packaging at ≤ 35% RH and seal in modified-atmosphere film for 12-month shelf-life.",
              ],
              chefNotes: [
                "Emulsifier stabilizes air cells through transport vibration.",
                "Target Aw < 0.85 for ambient retail; below 0.70 for tropical export.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "industrial-creams",
    title: "Industrial Pastry Creams & Fillings",
    tagline: "Heat-stable creams that survive the production line",
    description:
      "Engineer pastry creams, custards and bake-stable fillings for industrial pastry. Modified-starch systems, hot-fill packaging, and color/flavor stability across a 9-month shelf.",
    image: chocolate,
    difficulty: "Expert",
    tier: "industrial",
    keywords: ["industrial", "pastry cream", "filling", "shelf stable", "factory"],
    duration: "45m",
    price: 139,
    rating: 4.74,
    reviews: 64,
    instructor: {
      name: "Sofia Linder",
      title: "Food technologist · Stockholm",
      avatar: avatar("Sofia Creams"),
    },
    modules: [
      {
        id: "ic-1",
        title: "Module 1 · Bake-stable pastry cream",
        lessons: [
          {
            id: "bake-stable-cream",
            title: "Bake-stable industrial pastry cream",
            videoUrl: yt("4n1mF7tFLNs"),
            duration: "8:30",
            recipe: {
              servings: "Base ratio — scale per kettle",
              time: "Cook 25 min · Hot-fill",
              ingredients: [
                { item: "Whole milk (UHT)", qty: "5000 g" },
                { item: "Granulated sugar", qty: "750 g" },
                { item: "Modified waxy maize starch", qty: "300 g" },
                { item: "Egg yolk (pasteurized)", qty: "400 g" },
                { item: "Butter (anhydrous)", qty: "200 g" },
                { item: "Salt", qty: "12 g" },
                { item: "Natural vanilla flavor", qty: "20 g" },
                { item: "Potassium sorbate", qty: "5 g" },
              ],
              steps: [
                "Pre-blend dry: sugar + starch + salt. Disperse into cold milk in scraped-surface kettle.",
                "Heat to 92 °C with continuous scraping for 4 min to fully gelatinize starch.",
                "Temper yolks and reintroduce. Hold at 85 °C for 3 min for microbial reduction.",
                "Stir in butter and flavors. Pump through inline cooler to 75 °C.",
                "Hot-fill into PE-lined pails or aseptic bags. Blast-cool to 4 °C in <60 min.",
              ],
              chefNotes: [
                "Waxy maize starch retains viscosity through a 200 °C bake-out cycle.",
                "Shelf-life: 9 months refrigerated; 14 days once opened in production.",
              ],
            },
          },
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

// Flatten every lesson across every course for global search.
export type SearchHit = {
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  tier: Tier;
  trending?: boolean;
  duration: string;
};

export const allLessons: SearchHit[] = courses.flatMap((c) =>
  c.modules.flatMap((m) =>
    m.lessons.map((l) => ({
      courseId: c.id,
      courseTitle: c.title,
      lessonId: l.id,
      lessonTitle: l.title,
      tier: c.tier,
      trending: c.trending,
      duration: l.duration,
    })),
  ),
);

export function searchCatalog(q: string): SearchHit[] {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return allLessons
    .filter((h) => {
      const course = getCourse(h.courseId);
      const haystack = [
        h.lessonTitle,
        h.courseTitle,
        ...(course?.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    })
    .slice(0, 8);
}

// ---- Recipe scaling for production tiers ----
// Home = 1×, Business = 10×, Industrial = 100× (and convert g → kg)
export type ScaleMode = "home" | "business" | "industrial";

export const SCALE_FACTORS: Record<ScaleMode, number> = {
  home: 1,
  business: 10,
  industrial: 100,
};

export function scaleIngredient(qty: string, mode: ScaleMode): string {
  const factor = SCALE_FACTORS[mode];
  if (factor === 1) return qty;
  // Match leading number with optional decimal, then unit (letters)
  const m = qty.match(/^([\d.]+)\s*([a-zA-Z°%]*)\s*(.*)$/);
  if (!m) return qty;
  const num = parseFloat(m[1]);
  if (Number.isNaN(num)) return qty;
  const unit = m[2];
  const rest = m[3];
  let scaled = num * factor;
  let outUnit = unit;
  // Industrial tier: convert g → kg, ml → L
  if (mode === "industrial") {
    if (unit === "g" && scaled >= 1000) {
      scaled = scaled / 1000;
      outUnit = "kg";
    } else if (unit === "ml" && scaled >= 1000) {
      scaled = scaled / 1000;
      outUnit = "L";
    }
  }
  const display =
    Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(scaled < 10 ? 2 : 1);
  return `${display}${outUnit ? " " + outUnit : ""}${rest ? " " + rest : ""}`.trim();
}
