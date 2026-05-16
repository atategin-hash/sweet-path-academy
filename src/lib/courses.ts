import pastries from "@/assets/course-pastries.jpg";
import wedding from "@/assets/course-wedding.jpg";
import bread from "@/assets/course-bread.jpg";

export type Difficulty = "Beginner" | "Intermediate" | "Expert";

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
                { item: "Egg yolks", qty: "3 large (60 g)" },
                { item: "Vanilla bean paste", qty: "1 tsp" },
                { item: "Fine sea salt", qty: "1 g" },
                { item: "Lemon zest", qty: "1 lemon" },
                { item: "Apricot or raspberry jam", qty: "150 g" },
                { item: "Powdered sugar for dusting", qty: "as needed" },
              ],
              steps: [
                "Sift the flour and powdered sugar onto a clean work surface and rub in the cold butter until the mixture resembles fine sand.",
                "Make a well in the center, add yolks, vanilla, salt, and lemon zest, and bring together quickly without overworking.",
                "Flatten into a 2 cm disc, wrap, and chill for at least 1 hour (overnight is better).",
                "Roll the dough to 4 mm between two sheets of parchment. Cut 5 cm rounds; cut a 2 cm hole in half of them.",
                "Bake at 170 °C / 340 °F for 11–13 minutes until pale gold at the edges. Cool completely on the tray.",
                "Sandwich a full disc with a generous teaspoon of jam, top with a holed disc, and dust the tops with powdered sugar.",
              ],
              chefNotes: [
                "Gino Fabbri tip: keep all ingredients cold — frolla loves a cool kitchen and a quick hand.",
                "Pipe the jam in a small dome so it shows neatly through the eye.",
              ],
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
                { item: "Eggs, separated", qty: "4 large" },
                { item: "Almond flour", qty: "200 g" },
                { item: "Dutch cocoa powder", qty: "20 g" },
                { item: "Fine sea salt", qty: "2 g" },
                { item: "Vanilla extract", qty: "1 tsp" },
                { item: "Powdered sugar for dusting", qty: "as needed" },
              ],
              steps: [
                "Preheat oven to 170 °C / 340 °F. Line a 22 cm springform tin with parchment and butter the sides.",
                "Melt chocolate and butter gently over a bain-marie, stir smooth, set aside to cool slightly.",
                "Whisk yolks with half the sugar until pale. Stir in the chocolate mixture, then almond flour, cocoa, salt and vanilla.",
                "Whip whites with the remaining sugar to soft peaks. Fold into the chocolate base in three additions, keeping the batter airy.",
                "Pour into the tin and bake 35–40 minutes — the center should still be slightly soft.",
                "Cool fully in the tin. Unmold and dust generously with powdered sugar before slicing.",
              ],
              chefNotes: [
                "Montersino's signature: a fudgy center. Pull the cake when a skewer comes out with moist crumbs, not clean.",
                "Naturally gluten-free thanks to the almond flour.",
              ],
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
                { item: "Full-fat cream cheese, room temp", qty: "900 g" },
                { item: "Granulated sugar", qty: "200 g" },
                { item: "Sour cream", qty: "120 g" },
                { item: "Eggs", qty: "4 large" },
                { item: "Egg yolk", qty: "1" },
                { item: "Vanilla bean paste", qty: "2 tsp" },
                { item: "Lemon zest", qty: "1 lemon" },
                { item: "Cornstarch", qty: "20 g" },
              ],
              steps: [
                "Combine crushed biscuits with melted butter and press firmly into the base of a 23 cm springform tin. Chill 20 minutes.",
                "Beat cream cheese on low until perfectly smooth, scraping the bowl often. Add sugar and cornstarch and beat until silky.",
                "Mix in sour cream, vanilla and lemon zest. Add eggs and yolk one at a time on the lowest speed — never whip air in.",
                "Pour over the cooled base. Tap to release bubbles.",
                "Bake at 160 °C / 320 °F for 55–65 minutes. The edges should be set and the center should still wobble like jelly.",
                "Turn the oven off, crack the door, and let the cake cool inside for 1 hour. Chill at least 6 hours before unmolding.",
              ],
              chefNotes: [
                "Di Carlo principle: room-temperature ingredients give a lump-free, crackless cheesecake.",
                "No water bath needed if you keep your oven low and your mixer slow.",
              ],
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
                { item: "Cold European butter (butter block)", qty: "280 g" },
                { item: "Egg, beaten (wash)", qty: "1" },
              ],
              steps: [
                "Mix all détrempe ingredients on low for 4 minutes; medium for 4 minutes. Shape into a 20 × 20 cm square, wrap and chill overnight.",
                "Pound cold butter into a 18 × 18 cm square between parchment. Keep cool but pliable.",
                "Roll détrempe to 30 × 30 cm. Place butter on the diagonal, fold the corners in to enclose, seal seams.",
                "Roll to 20 × 60 cm and complete a letter fold (single fold). Chill 45 minutes. Repeat two more times, chilling between each.",
                "Final roll to 25 × 60 cm, 4 mm thick. Cut triangles 10 cm at the base, 25 cm tall. Roll each into a croissant.",
                "Proof 2–3 hours at 24 °C until wobbly and jiggly. Egg wash and bake at 200 °C / 400 °F for 18–22 minutes until deeply golden.",
              ],
              chefNotes: [
                "Butter must always be cold enough to bend without snapping. Pause and chill the dough whenever it resists.",
                "An overnight cold proof in the fridge gives the deepest flavor and easiest baking schedule.",
              ],
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
      "A modern three-module masterclass on the cake everyone is gifting right now. Build a tender vanilla sponge, master a silky stable buttercream and crumb coat, then finish with bento-style piping and lettering using the internet's most-loved tutorials.",
    image: wedding,
    difficulty: "Beginner",
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
                { item: "Eggs, room temperature", qty: "3 large" },
                { item: "Vanilla bean paste", qty: "1 tsp" },
                { item: "Self-raising flour", qty: "175 g" },
                { item: "Fine sea salt", qty: "1 pinch" },
                { item: "Whole milk", qty: "2 tbsp" },
              ],
              steps: [
                "Preheat oven to 170 °C / 340 °F. Butter and line two 6-inch round tins.",
                "Cream butter and sugar 4–5 minutes until pale and fluffy. Scrape down the bowl.",
                "Add eggs one at a time with a spoonful of flour to prevent splitting. Mix in vanilla.",
                "Fold in remaining flour and salt gently. Loosen with milk to a soft dropping consistency.",
                "Divide between tins and level. Bake 25–28 minutes until springy and a skewer comes out clean.",
                "Cool in the tin for 10 minutes, then turn out onto a rack.",
              ],
              chefNotes: [
                "Even, level layers are the foundation of every clean cake. Trim the domes with a serrated knife once cool.",
              ],
            },
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2 · Stable buttercream & crumb coat",
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
                { item: "Egg whites", qty: "150 g (about 5)" },
                { item: "Caster sugar", qty: "300 g" },
                { item: "Unsalted butter, softened cubes", qty: "450 g" },
                { item: "Vanilla bean paste", qty: "2 tsp" },
                { item: "Fine sea salt", qty: "1 small pinch" },
              ],
              steps: [
                "Whisk egg whites and sugar in a heatproof bowl over a bain-marie until 65 °C / 150 °F and sugar is fully dissolved.",
                "Transfer to a stand mixer with the whisk. Whip on high 8–10 minutes until stiff, glossy, and the bowl feels cool to the touch.",
                "Switch to the paddle. Add butter a few cubes at a time on medium. The mix will look curdled — keep going.",
                "Once smooth and silky, beat in vanilla and salt.",
                "Apply a thin crumb coat to the chilled cake to lock in stray crumbs. Chill 20 minutes.",
                "Apply the final coat and smooth with a bench scraper for a clean, sharp finish.",
              ],
              chefNotes: [
                "If buttercream looks soupy: chill the bowl 10 minutes and re-whip. If split: warm the bowl with a torch briefly and re-whip.",
              ],
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
                { item: "Piping tips: round #2, star #18", qty: "2" },
                { item: "Disposable piping bags", qty: "4" },
              ],
              steps: [
                "Divide buttercream into bowls and color in soft pastels. Cover with cling so it doesn't crust.",
                "Fit each bag with the chosen tip; twist the bag tight to remove air pockets.",
                "Pipe a smooth border with the star tip around the top edge, holding the bag at 90°.",
                "Add small decorative shells, dots and rosettes on the surface using gentle, even pressure.",
                "Switch to the round #2 tip for lettering. Pipe steadily, dragging just above the surface.",
                "Box the cake in a kraft bento container with parchment under the base.",
              ],
              chefNotes: [
                "Cold cake + room-temp buttercream is the sweet spot — pipes hold their shape and don't melt.",
              ],
            },
          },
          {
            id: "cake-lettering",
            title: "Piping perfect lettering (block & script)",
            videoUrl: yt("7NFRcyhw6hM"),
            duration: "12:31",
            recipe: {
              servings: "Decoration only",
              time: "15 min",
              ingredients: [
                { item: "Stiff buttercream or royal icing", qty: "100 g" },
                { item: "Round piping tip #2", qty: "1" },
                { item: "Toothpick (for guides)", qty: "1" },
              ],
              steps: [
                "Lightly score the message into the chilled surface with a toothpick to plan spacing.",
                "Hold the bag at a 45° angle, tip just above the surface. Pipe with steady arm motion, not just fingers.",
                "For block letters: stop pressure at every corner. For script: keep one continuous flowing motion.",
                "Pause and breathe between letters. Mistakes can be lifted off with a small offset spatula and re-piped.",
              ],
              chefNotes: [
                "Practice the message on parchment first — three rounds is usually enough to find your rhythm.",
              ],
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
      "A friendly first-step program for anyone walking into a kitchen for real. Set up like a pro, demystify yeast, then bake the cinnamon rolls everyone asks for. Three curated free lessons that turn home baking into a real craft.",
    image: bread,
    difficulty: "Beginner",
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
        title: "Lesson 1 · Understanding mise en place",
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
                { item: "Small bowls for each ingredient", qty: "as needed" },
                { item: "Digital scale (grams)", qty: "1" },
                { item: "Bench scraper", qty: "1" },
                { item: "Clean tea towel", qty: "1" },
              ],
              steps: [
                "Read the entire recipe out loud once. Mark butter temperatures, oven temps, and rest times.",
                "Weigh and pre-portion every ingredient into its own labeled bowl before turning on any equipment.",
                "Preheat the oven first — most home ovens take longer than you think.",
                "Lay out your tools in the order you'll use them. Clean as you go.",
                "Set a timer for any chill, proof, or rest step the moment that step begins.",
              ],
              chefNotes: [
                "Mise en place is the single biggest difference between hobby cooks and professionals.",
                "If you only do one thing differently in your kitchen this week, do this.",
              ],
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
                { item: "Active dry yeast", qty: "Activate in 40 °C water 5 min" },
                { item: "Instant yeast", qty: "Add directly to flour" },
                { item: "Fresh yeast", qty: "Use 3× the amount of instant" },
                { item: "Water temperature target", qty: "38–43 °C / 100–110 °F" },
                { item: "Salt", qty: "Never on raw yeast — kills it" },
              ],
              steps: [
                "Always test old yeast: stir 1 tsp yeast with 1 tsp sugar in warm water. It should foam in 5 minutes.",
                "Bulk ferment until the dough is roughly doubled and a gentle poke springs back slowly.",
                "Cold-proofing in the fridge develops flavor and gives you scheduling flexibility.",
                "Steam in the first 10 minutes of baking gives a thin, crackling crust.",
              ],
              chefNotes: [
                "1 packet of instant yeast = 7 g = 2¼ tsp. Memorize this and 90% of recipes get easier.",
                "Yeast dies at 60 °C — never mix it with hot liquid.",
              ],
            },
          },
        ],
      },
      {
        id: "l3",
        title: "Lesson 3 · Cinnamon rolls & yeast rolls",
        lessons: [
          {
            id: "cinnamon-rolls",
            title: "Cinnabon cinnamon rolls at home — But Better",
            videoUrl: yt("f6kzypYDLRg"),
            duration: "8:55",
            recipe: {
              servings: "8 large rolls",
              time: "Active 45m · Total 3h",
              ingredients: [
                { item: "Whole milk, warm (40 °C)", qty: "240 g" },
                { item: "Instant yeast", qty: "7 g" },
                { item: "Granulated sugar", qty: "50 g" },
                { item: "Egg + 1 yolk", qty: "1 + 1" },
                { item: "Bread flour", qty: "560 g" },
                { item: "Fine sea salt", qty: "9 g" },
                { item: "Unsalted butter, soft (dough)", qty: "85 g" },
                { item: "Brown sugar (filling)", qty: "200 g" },
                { item: "Cinnamon (filling)", qty: "20 g" },
                { item: "Soft butter (filling)", qty: "85 g" },
                { item: "Cream cheese (glaze)", qty: "115 g" },
                { item: "Powdered sugar (glaze)", qty: "150 g" },
                { item: "Milk (glaze)", qty: "1–2 tbsp" },
              ],
              steps: [
                "Whisk warm milk, yeast and a pinch of sugar. Let sit 5 minutes until foamy.",
                "Add eggs, sugar, flour and salt. Knead on low 6 minutes, then add soft butter and knead another 6 minutes until smooth.",
                "Bulk proof in a lightly oiled bowl 60–90 minutes until doubled.",
                "Roll dough into a 30 × 45 cm rectangle. Spread soft butter, sprinkle the cinnamon-sugar evenly to the edges.",
                "Roll tightly from the long side. Cut 8 equal rolls using unflavored floss. Place in a buttered baking dish.",
                "Proof 45–60 minutes until pillowy. Bake at 180 °C / 355 °F for 22–25 minutes until deeply golden.",
                "Whip cream cheese, powdered sugar and milk until smooth. Glaze the rolls warm — not hot.",
              ],
              chefNotes: [
                "Using bread flour gives that pull-apart, fluffy crumb. All-purpose works in a pinch but the texture is softer.",
                "For overnight rolls: shape, cover, and refrigerate after cutting. In the morning, let them warm up 1 hour, then bake.",
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
