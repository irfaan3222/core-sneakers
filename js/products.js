/**
 * CORE FOOTWEAR - Product Catalog Dataset
 * Includes Men, Women, and Unisex shoes with multiple angles, specs, and styling notes.
 */

let PRODUCTS_DATA = [
  // --- USER MEN SNEAKERS ---
  {
    id: "core-men-drift-1",
    name: "Core Men Phantom Low Drift",
    gender: "men",
    category: "sneakers",
    price: 3499,
    originalPrice: 4499,
    rating: 4.9,
    reviewsCount: 88,
    badge: "NEW IN MEN",
    section: "men-collection",
    description: "Sculpted architectural low-top silhouette with reinforced eyelets, padded ankle cushioning, and ultra-durable vulcanized outsole.",
    details: ["Full-grain breathable upper", "Padded ergonomic collar", "High traction vulcanized rubber sole", "Core minimal branding"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [{ name: "Black / Monochrome", hex: "#111111" }],
    images: [
      "assets/men/men-1.jpg",
      "assets/men/men-2.jpg",
      "assets/men/men-3.jpg"
    ]
  },
  {
    id: "core-men-retro-2",
    name: "Core Men Air Stride Street",
    gender: "men",
    category: "sneakers",
    price: 3799,
    originalPrice: 4899,
    rating: 5.0,
    reviewsCount: 104,
    badge: "BESTSELLER",
    section: "men-collection",
    description: "High performance streetwear sneaker designed for daily concrete commute with impact absorption cupsole.",
    details: ["Layered mesh and premium synthetic leather", "Chunky ergonomic outsole", "Arch support foam insole"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [{ name: "Onyx / Drift", hex: "#1f1f1f" }],
    images: [
      "assets/men/men-2.jpg",
      "assets/men/men-4.jpg",
      "assets/men/men-5.jpg"
    ]
  },
  {
    id: "core-men-court-3",
    name: "Core Men Classic Court Minimal",
    gender: "men",
    category: "sneakers",
    price: 3299,
    originalPrice: 4199,
    rating: 4.8,
    reviewsCount: 72,
    badge: "HERITAGE",
    section: "men-collection",
    description: "Clean timeless court silhouette crafted for effortless versatility. Minimal paneling with tonal stitching.",
    details: ["Supple matte calf leather", "Anti-slip rubber cupsole", "Breathable perforated toe box"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [{ name: "Core Black / White", hex: "#000000" }],
    images: [
      "assets/men/men-3.jpg",
      "assets/men/men-6.jpg",
      "assets/men/men-7.jpg"
    ]
  },
  {
    id: "core-men-chunky-4",
    name: "Core Men Bold Lug Platform",
    gender: "men",
    category: "sneakers",
    price: 3999,
    originalPrice: 5199,
    rating: 4.9,
    reviewsCount: 65,
    badge: "BOLD EDIT",
    section: "men-collection",
    description: "Architectural oversized lug sole profile with heavy-duty construction and deep traction flex grooves.",
    details: ["Heavy-duty lug sole", "Water-resistant treated leather", "Padded collar & tongue"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [{ name: "Obsidian Lug", hex: "#141414" }],
    images: [
      "assets/men/men-4.jpg",
      "assets/men/men-1.jpg",
      "assets/men/men-5.jpg"
    ]
  },

  // --- USER WOMEN SNEAKERS ---
  {
    id: "core-women-platform-1",
    name: "Core Women Cloud Stride Platform",
    gender: "women",
    category: "sneakers",
    price: 3499,
    originalPrice: 4499,
    rating: 5.0,
    reviewsCount: 142,
    badge: "NEW IN WOMEN",
    section: "women-collection",
    description: "Featherlight elevated platform sole with ultra-clean silhouette and plush memory foam insole for all-day comfort.",
    details: ["Sculpted 4.5cm lightweight platform", "Supple premium finish leather", "Memory foam arch support insole"],
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [{ name: "Vanilla / Cream", hex: "#faf7f2" }],
    images: [
      "assets/women/women-1.jpg",
      "assets/women/women-2.jpg",
      "assets/women/women-3.jpg"
    ]
  },
  {
    id: "core-women-retro-2",
    name: "Core Women Sleek Retro Runner",
    gender: "women",
    category: "sneakers",
    price: 3699,
    originalPrice: 4799,
    rating: 4.9,
    reviewsCount: 96,
    badge: "TRENDING",
    section: "women-collection",
    description: "Vintage-inspired aerodynamic trainer with streamlined contours, subtle textural contrasts, and flexible rubber sole.",
    details: ["Streamlined low-profile silhouette", "Padded tongue with embossed logo", "High grip tread pattern"],
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [{ name: "Soft Sand / Bone", hex: "#f0eae1" }],
    images: [
      "assets/women/women-2.jpg",
      "assets/women/women-4.jpg",
      "assets/women/women-5.jpg"
    ]
  },
  {
    id: "core-women-chunky-3",
    name: "Core Women Fat-Lace Chunky Low",
    gender: "women",
    category: "sneakers",
    price: 3899,
    originalPrice: 4999,
    rating: 5.0,
    reviewsCount: 178,
    badge: "VIRAL EDIT",
    section: "women-collection",
    description: "The iconic chunky fat-lace edition tailored with balanced proportions and statement styling potential.",
    details: ["Overstuffed tubular fat laces", "Supple leather shell-toe structure", "Detachable subtle metal lace jewel"],
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [{ name: "Clean White / Black", hex: "#ffffff" }],
    images: [
      "assets/women/women-3.jpg",
      "assets/women/women-1.jpg",
      "assets/women/women-4.jpg"
    ]
  },
  {
    id: "core-women-low-4",
    name: "Core Women Minimal Drift Runner",
    gender: "women",
    category: "sneakers",
    price: 3299,
    originalPrice: 4199,
    rating: 4.8,
    reviewsCount: 84,
    badge: "DAILY ESSENTIAL",
    section: "women-collection",
    description: "Everyday clean trainer made with soft premium calfskin and responsive foam footbed for maximum ease.",
    details: ["Ultra-lightweight EVA midsole", "Tonal minimal stitching", "Breathable organic cotton lining"],
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [{ name: "Pristine White", hex: "#ffffff" }],
    images: [
      "assets/women/women-4.jpg",
      "assets/women/women-5.jpg",
      "assets/women/women-2.jpg"
    ]
  },

  // --- USER FEATURED DROPS (The 4 user-uploaded shoes front and center!) ---
  {
    id: "core-fatlace-superstar",
    name: "Core Fat-Lace Custom Low",
    gender: "women",
    category: "sneakers",
    price: 4499,
    originalPrice: 5699,
    rating: 5.0,
    reviewsCount: 168,
    badge: "VIRAL EDIT",
    section: "must-have",
    description: "The viral street silhouette. Premium crisp white calfskin leather upper paired with exaggerated chunky woven fat laces, contrasting obsidian side stripes, gold foil tongue typography, and a removable rhinestone crystal chain lace charm.",
    details: [
      "Overstuffed 24mm jumbo woven tubular laces",
      "Supple full-grain calf leather with reinforced shell-toe",
      "Detachable diamond-cut rhinestone lace link chain",
      "Cushioned memory foam cupsole for cloud-like support"
    ],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [
      { name: "Chalk White / Obsidian", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#151515" },
      { name: "Cobalt Blue Accents", hex: "#0a0a0a" }
    ],
    images: [
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-oldskool-black.jpg"
    ]
  },
  {
    id: "core-oldskool-canvas",
    name: "Core Stripe Canvas Skater",
    gender: "unisex",
    category: "sneakers",
    price: 3299,
    originalPrice: 4199,
    rating: 4.9,
    reviewsCount: 204,
    badge: "HERITAGE",
    section: "must-have",
    description: "The timeless low-top skate silhouette built with heavy-duty 14oz double-stitched canvas and velvety suede toe & heel caps. Features an architectural white curved wave stripe and a high-grip vulcanized waffle gum sole.",
    details: [
      "14oz rugged canvas with reinforced suede stress zones",
      "Archival vulcanized foxing tape with signature red heel tab",
      "Padded collar for ankle protection and mobility",
      "Custom diamond waffle vulcanized rubber outsole"
    ],
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Black / True White", hex: "#1a1a1a" },
      { name: "Bone White", hex: "#eae6dc" },
      { name: "Royal Blue Stripe", hex: "#0a0a0a" }
    ],
    images: [
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-air-runner-onfeet.jpg"
    ]
  },
  {
    id: "core-air-stride-retro",
    name: "Core Air-Stride 90s Runner",
    gender: "men",
    category: "sneakers",
    price: 4899,
    originalPrice: 6299,
    rating: 4.9,
    reviewsCount: 135,
    badge: "AIR CUSHION",
    section: "must-have",
    description: "A dynamic 90s-inspired street runner featuring breathable athletic mesh, contrast black aerodynamic contour cages, vibrant infrared heel accents, and an exposed pressurized air-sole chamber.",
    details: [
      "Max-volume visible pressurized air cushioning capsule",
      "Multi-layered ripstop mesh with synthetic leather overlays",
      "Ergonomic waffle lug traction for all-weather grip",
      "Padded neoprene tongue with retro silicone badge"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "White / Infrared / Black", hex: "#ffffff" },
      { name: "Electric Blue / White", hex: "#0a0a0a" }
    ],
    images: [
      "assets/products/core-air-runner-onfeet.jpg",
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-superstar-black.jpg"
    ]
  },
  {
    id: "core-shell-superstar-black",
    name: "Core Shell-Toe 'Obsidian'",
    gender: "men",
    category: "sneakers",
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 92,
    badge: "ICONIC ARCHIVE",
    section: "must-have",
    description: "The definitive monochromatic court staple. Matte black full-grain leather upper, sculpted protective rubber shell toe, contrasting serrated white triple stripes, and gold metallic foil branding on the tongue.",
    details: [
      "Full-grain matte cowhide leather upper",
      "Architectural textured rubber shell toe bumper",
      "Metallic gold hot-stamped tongue and quarter branding",
      "Herringbone traction pattern rubber cupsole"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Obsidian / White", hex: "#181818" },
      { name: "Triple White", hex: "#ffffff" }
    ],
    images: [
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-air-runner-onfeet.jpg"
    ]
  },

  // --- ADDITIONAL MEN & WOMEN EDITORIAL SILHOUETTES ---
  {
    id: "core-runner-v1-raw",
    name: "Core Runner V1 Raw",
    gender: "men",
    category: "sneakers",
    price: 4299,
    originalPrice: 5499,
    rating: 4.9,
    reviewsCount: 142,
    badge: "BESTSELLER",
    section: "must-have",
    description: "An architectural everyday runner crafted from tactile ripstop canvas, brushed suede mudguards, and a dual-density sculpted EVA midsole. Engineered for concrete navigation.",
    details: [
      "Custom sculpted vulcanized rubber outsole",
      "Ergonomic dual-density memory foam footbed",
      "Reinforced heavy-gauge stitch detailing",
      "Breathable aerospace mesh tongue"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Raw Charcoal", hex: "#262626" },
      { name: "Cobalt Blue", hex: "#0a0a0a" }
    ],
    images: [
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-air-runner-onfeet.jpg",
      "assets/products/core-fatlace-white.jpg"
    ]
  },
  {
    id: "aura-sculpted-platform",
    name: "Aura Sculpted Platform",
    gender: "women",
    category: "sneakers",
    price: 4199,
    originalPrice: 5299,
    rating: 4.8,
    reviewsCount: 98,
    badge: "TRENDING",
    section: "must-have",
    description: "Elevated 5.5cm curved platform sneaker in creamy tumbled calfskin leather with a cushioned ankle collar. Perfectly balances brutalist sole architecture with featherlight comfort.",
    details: [
      "5.5cm sculpted lightweight platform sole",
      "Premium tumbled calfskin leather upper",
      "Padded collar and tongue for zero heel slippage",
      "Anti-fatigue arch support shank"
    ],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [
      { name: "Vanilla Cream", hex: "#f5f2eb" },
      { name: "Sky Blue Tint", hex: "#d8e6ff" }
    ],
    images: [
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-oldskool-black.jpg"
    ]
  },
  {
    id: "strata-low-minimalist",
    name: "Strata Low Minimalist",
    gender: "men",
    category: "sneakers",
    price: 3899,
    originalPrice: 4799,
    rating: 5.0,
    reviewsCount: 84,
    badge: "STAFF PICK",
    section: "must-have",
    description: "Stripped-down luxury court silhouette with seamless side panels, full-grain Italian leather, and an unlined collar for a glove-like mold around your foot.",
    details: [
      "Full-grain nappa leather from certified tanneries",
      "Waxed tonal cotton laces",
      "Recycled rubber low-profile cupsole",
      "Blind eyelets with interior metal reinforcements"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Off-White / Bone", hex: "#eae6df" },
      { name: "Electric Blue Accent", hex: "#0a0a0a" }
    ],
    images: [
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-superstar-black.jpg"
    ]
  },

  // --- OUTDOOR / EARTH & DEEP TONE SERIES ---
  {
    id: "shadowline-high-top",
    name: "Shadowline High-Top Trainer",
    gender: "women",
    category: "sneakers",
    price: 3799,
    originalPrice: 4899,
    rating: 4.9,
    reviewsCount: 112,
    badge: "NEW ARRIVAL",
    section: "earth-tones",
    description: "Distressed heavyweight 18oz selvedge duck canvas high-top with raw exposed edge detailing and a vulcanized rubber toe bumper. Inspired by archival military gym shoes.",
    details: [
      "18oz heavyweight Japanese selvedge canvas",
      "Raw exposed foam tongue with tonal woven badge",
      "Double-wrap foxing tape with textured toe bumper",
      "Orthopedic high-rebound drop-in footbed"
    ],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7"],
    colors: [
      { name: "Washed Black / Stone", hex: "#2d2d2d" },
      { name: "Ocean Slate", hex: "#254878" }
    ],
    images: [
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-superstar-black.jpg"
    ]
  },
  {
    id: "mudstone-knee-stitch-boot",
    name: "Mudstone Lug-Sole Derby",
    gender: "men",
    category: "boots",
    price: 4999,
    originalPrice: 6299,
    rating: 4.7,
    reviewsCount: 65,
    badge: "LIMITED",
    section: "earth-tones",
    description: "Brutalist 3-eyelet derby featuring an exaggerated commando lug sole, contrast welt stitching, and matte water-resistant pull-up leather that develops rich patina over time.",
    details: [
      "Brushed oiled calfskin with water-repellent finish",
      "Exaggerated 4.8cm cleated rubber commando sole",
      "Storm-welt construction for maximum moisture barrier",
      "Reinforced steel shank for all-day structural stability"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Mudstone Earth", hex: "#4b443c" },
      { name: "Deep Navy Blue", hex: "#0b1d3a" }
    ],
    images: [
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-air-runner-onfeet.jpg"
    ]
  },
  {
    id: "frostline-trail-runner",
    name: "Frostline Technical Runner",
    gender: "men",
    category: "sneakers",
    price: 3699,
    originalPrice: 4599,
    rating: 4.9,
    reviewsCount: 78,
    badge: "WEATHERPROOF",
    section: "earth-tones",
    description: "Engineered for city and trail transitions. Water-resistant ripstop upper paired with high-abrasion TPU overlays and multi-directional chevron lug traction.",
    details: [
      "Weather-sealed water-resistant ripstop mesh",
      "Quick-pull bungee cord lacing system",
      "High-grip aggressive traction compound",
      "360-degree reflective accents for night visibility"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Glacier Blue", hex: "#4a7bb0" },
      { name: "Ash Slate", hex: "#41474d" }
    ],
    images: [
      "assets/products/core-air-runner-onfeet.jpg",
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-fatlace-white.jpg"
    ]
  },

  // --- BOOTS & FORMALS ---
  {
    id: "monolith-chelsea-boot",
    name: "Monolith Chelsea Lug Boot",
    gender: "men",
    category: "boots",
    price: 5999,
    originalPrice: 7499,
    rating: 5.0,
    reviewsCount: 153,
    badge: "FLAGSHIP",
    section: "deep-tones",
    description: "The definitive CORE boot. Premium oiled Italian leather upper sitting atop a monolithic cleated sole with durable woven pull tabs and wide elastic side gussets.",
    details: [
      "Hand-burnished full-grain Italian leather",
      "Heavy-duty cleated lug sole (5cm height)",
      "High-tensile woven front & rear pull tabs with blue bar-tacks",
      "Seamless Goodyear welt construction"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Midnight Navy", hex: "#0c1b33" }
    ],
    images: [
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-fatlace-white.jpg"
    ]
  },
  {
    id: "monolith-tall-chelsea-women",
    name: "Monolith Platform Chelsea Boot",
    gender: "women",
    category: "boots",
    price: 5499,
    originalPrice: 6999,
    rating: 4.9,
    reviewsCount: 120,
    badge: "MUST HAVE",
    section: "deep-tones",
    description: "An elongated shaft Chelsea silhouette for women featuring a 6cm sculpted tooth platform. Dramatic street silhouette with cloud-soft memory cushioning.",
    details: [
      "Sculpted 6cm tooth platform outsole",
      "Glossy semi-patent water-resistant calf leather",
      "Calf-hugging elastic ribbed shaft",
      "Reinforced heel counter prevents creasing"
    ],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [
      { name: "Gloss Obsidian", hex: "#0d0d0d" },
      { name: "Royal Blue Ribbing", hex: "#0a0a0a" }
    ],
    images: [
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-oldskool-black.jpg"
    ]
  },
  {
    id: "terra-chunky-loafer",
    name: "Terra Chunky Lug Loafer",
    gender: "women",
    category: "loafers",
    price: 4499,
    originalPrice: 5699,
    rating: 4.8,
    reviewsCount: 89,
    badge: "POPULAR",
    section: "deep-tones",
    description: "Modernized heritage penny loafer with an exaggerated serrated lug sole, brushed leather finish, and reinforced moc-toe hand stitching.",
    details: [
      "Hand-stitched moccasin toe seam",
      "Matte blue steel hardware bridge slot",
      "4.5cm lightweight extruded EVA tread",
      "Anti-blister padded suede back heel liner"
    ],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7"],
    colors: [
      { name: "Deep Oxblood", hex: "#401820" },
      { name: "Navy Blue Patent", hex: "#0a1936" }
    ],
    images: [
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-air-runner-onfeet.jpg"
    ]
  },

  // --- UNISEX & SLIDES / MULES ---
  {
    id: "core-slide-ergonomic",
    name: "Core Slide Bio-Foam",
    gender: "unisex",
    category: "slides",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 215,
    badge: "RESTOCKED",
    section: "deep-tones",
    description: "One-piece molded bio-based recovery slide with anatomical arch support, deep heel cup, and anti-slip water drainage tread.",
    details: [
      "Zero-waste single injection molded bio-EVA",
      "Anatomically molded footbed with metatarsal support",
      "Waterproof and 100% washable",
      "Grip-tread ripple sole for indoor/outdoor use"
    ],
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Electric Blue", hex: "#0a0a0a" },
      { name: "Chalk White", hex: "#f0f4ff" },
      { name: "Onyx Black", hex: "#1c1c1c" }
    ],
    images: [
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-fatlace-white.jpg"
    ]
  },
  {
    id: "nomad-leather-mule",
    name: "Nomad Leather Mule Clog",
    gender: "men",
    category: "slides",
    price: 2999,
    originalPrice: 3899,
    rating: 4.7,
    reviewsCount: 52,
    badge: "SUMMER EDIT",
    section: "deep-tones",
    description: "A relaxed architectural slip-on. Soft oiled nubuck leather upper sitting on a natural cork-latex footbed lined with plush microfiber.",
    details: [
      "Buttery-soft oiled nubuck leather",
      "Natural cork-latex footbed with arch cradle",
      "Matte blue steel branded pin-buckle strap",
      "Shock-absorbing EVA outsole"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Matte Black", hex: "#222222" },
      { name: "Navy Nubuck", hex: "#152642" }
    ],
    images: [
      "assets/products/core-oldskool-black.jpg",
      "assets/products/core-superstar-black.jpg",
      "assets/products/core-air-runner-onfeet.jpg"
    ]
  },
  {
    id: "aero-breeze-knit-women",
    name: "Aero Breeze Knit Runner",
    gender: "women",
    category: "sneakers",
    price: 3299,
    originalPrice: 4199,
    rating: 4.8,
    reviewsCount: 74,
    badge: "FEATHERLIGHT",
    section: "deep-tones",
    description: "Ultra-breathable slip-on sneaker knitted from zero-friction recycled yarns. Weighs under 190 grams with responsive rebound cushioning.",
    details: [
      "Seamless 3D knit upper with zoned elasticity",
      "Responsive rebound honeycomb insole",
      "Ultra-flexible segmented groove outsole",
      "Machine washable with cold delicate cycle"
    ],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    colors: [
      { name: "Ice Blue / White", hex: "#d0e1fd" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    images: [
      "assets/products/core-fatlace-white.jpg",
      "assets/products/core-air-runner-onfeet.jpg",
      "assets/products/core-oldskool-black.jpg"
    ]
  }
];

// Lookbook Reels (Incorporates the 4 REAL MP4 VIDEOS from /home/technaureus/Downloads)
const REELS_DATA = [
  {
    id: "reel-1",
    title: "CORE FIT REEL 01",
    subtitle: "BAGGY DENIM STACK",
    aspect: "9:16",
    duration: "0:12",
    video: "assets/videos/video2.mp4",
    productLinked: "core-fatlace-superstar",
    productName: "Core Fat-Lace Custom Low",
    productPrice: "â‚¹4,499",
    thumbnail: "assets/products/core-fatlace-white.jpg",
    description: "Styling the viral chunky white fat-laces with loose oversized denim jeans in motion."
  },
  {
    id: "reel-2",
    title: "AIR-STRIDE RETRO STRIDE",
    subtitle: "URBAN CONCRETE WALK",
    aspect: "9:16",
    duration: "0:15",
    video: "assets/videos/video1.mp4",
    productLinked: "core-air-stride-retro",
    productName: "Core Air-Stride 90s Runner",
    productPrice: "â‚¹4,899",
    thumbnail: "assets/products/core-air-runner-onfeet.jpg",
    description: "Real motion test of the exposed air cushion chamber on city pavements."
  },
  {
    id: "reel-3",
    title: "OLD SKOOL SKATE FLOW",
    subtitle: "STREET CULTURE DROP",
    aspect: "9:16",
    duration: "0:24",
    video: "assets/videos/reel-3.mp4",
    productLinked: "core-oldskool-canvas",
    productName: "Core Stripe Canvas Skater",
    productPrice: "â‚¹3,299",
    thumbnail: "assets/products/core-oldskool-black.jpg",
    description: "Archival vulcanized sole flexibility and durable 14oz black canvas on-foot action."
  },
  {
    id: "reel-4",
    title: "SHELL-TOE DETAIL INSPECTION",
    subtitle: "LEATHER & GOLD EMBLEM",
    aspect: "9:16",
    duration: "0:18",
    video: "assets/videos/reel-4.mp4",
    productLinked: "core-shell-superstar-black",
    productName: "Core Shell-Toe 'Obsidian'",
    productPrice: "â‚¹3,999",
    thumbnail: "assets/products/core-superstar-black.jpg",
    description: "Close-up craftsmanship inspection of the matte cowhide leather and hot-stamped gold foil branding."
  }
];

// FAQs Data (Matches Screenshot 5)
const FAQS_DATA = [
  {
    question: "How does CORE shoe sizing compare to standard sneakers?",
    answer: "CORE shoes fit true to standard European and UK sizing. If you typically wear a half size, we recommend sizing UP for boots and chunky sneakers (like the Monolith or Apex Runner) for optimal toe clearance, or sizing DOWN for minimalist court sneakers and leather mules. Check our Size Guide on each product for exact centimeter measurements."
  },
  {
    question: "Do you have specific sizes for both Men and Women?",
    answer: "Yes! Our collection includes dedicated men's silhouettes (UK 6 to UK 11 / EU 40-46) and women's silhouettes (UK 3 to UK 8 / EU 36-41), as well as unisex architectural models that span all sizes. All our footwear is built on unisex-compatible ergonomic lasts with gender-specific arch support."
  },
  {
    question: "What makes CORE footwear durable for everyday wear?",
    answer: "Every pair is built with vulcanized or Goodyear-welted rubber compounds, reinforced double-needle bar tacks, full-grain calf leathers from certified tanneries, and high-abrasion aerospace ripstop nylon. Our outsoles are tested for over 500,000 flex cycles."
  },
  {
    question: "What is your shipping, exchange, and return policy?",
    answer: "We offer FREE Express Shipping on all prepaid orders over â‚¹2,499. Delivery typically takes 2-4 business days across India and 5-7 days worldwide. We offer a 14-day hassle-free size exchange and return policy on all unworn footwear in original packaging."
  },
  {
    question: "How do I clean and care for my CORE shoes?",
    answer: "For smooth leather styles, wipe with a damp microfiber cloth and apply a neutral leather balm every 2-3 months. For canvas and ripstop mesh, spot clean with mild soapy water and a soft bristle brush. Never machine dry your footwear; air dry at room temperature away from direct sunlight."
  }
];

if (typeof module !== "undefined") {
  module.exports = { PRODUCTS_DATA, REELS_DATA, FAQS_DATA };
}

