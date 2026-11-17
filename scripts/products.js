/**
 * CORE SNEAKERS — Product Data Source
 * Add / edit products here. The UI reads from this array automatically.
 */

const CORE_PRODUCTS = [
  {
    id: "cs-001",
    name: "CORE Street Runner",
    subtitle: "All-Day Comfort",
    category: "Lifestyle",
    price: 2999,
    originalPrice: 3999,
    description: "Built for the streets, designed for the culture. The CORE Street Runner delivers all-day comfort with a lightweight mesh upper and cushioned sole unit.",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White/Blue", "All Black"],
    images: ["assets/products/street-runner-1.webp"],
    featured: true,
    newArrival: false,
    inStock: true,
    badge: "BESTSELLER"
  },
  {
    id: "cs-002",
    name: "CORE Shadow Low",
    subtitle: "Minimalist Edge",
    category: "Sneakers",
    price: 2499,
    originalPrice: 3299,
    description: "Clean lines, minimal profile. The Shadow Low is for those who let their kicks do the talking — quietly.",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Triple White", "Bone/Gum"],
    images: ["assets/products/shadow-low-1.webp"],
    featured: true,
    newArrival: true,
    inStock: true,
    badge: "NEW"
  },
  {
    id: "cs-003",
    name: "CORE Vapor X",
    subtitle: "Performance & Style",
    category: "Performance",
    price: 3499,
    originalPrice: 4499,
    description: "Where performance meets premium streetwear. The Vapor X features an engineered upper, responsive foam, and a bold CORE tongue branding.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Electric Blue", "Black/White"],
    images: ["assets/products/vapor-x-1.webp"],
    featured: false,
    newArrival: true,
    inStock: true,
    badge: "NEW DROP"
  },
  {
    id: "cs-004",
    name: "CORE Classic High",
    subtitle: "Heritage Silhouette",
    category: "High-Top",
    price: 3199,
    originalPrice: 3999,
    description: "The high-top reimagined. Clean canvas upper, cushioned collar, and CORE's signature star-point detail on the tongue.",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["White/Navy", "Black/Gold"],
    images: ["assets/products/classic-high-1.webp"],
    featured: true,
    newArrival: false,
    inStock: true,
    badge: null
  },
  {
    id: "cs-005",
    name: "CORE Night Shift",
    subtitle: "Dark Colorways",
    category: "Lifestyle",
    price: 2799,
    originalPrice: null,
    description: "All-black everything. The Night Shift is crafted for those who move after midnight — tonal colorway, premium suede accents.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Triple Black"],
    images: ["assets/products/night-shift-1.webp"],
    featured: false,
    newArrival: true,
    inStock: true,
    badge: "LIMITED"
  },
  {
    id: "cs-006",
    name: "CORE Drift Runner",
    subtitle: "Retro Runner Vibes",
    category: "Running",
    price: 2299,
    originalPrice: 2999,
    description: "Inspired by 90s running culture, updated for 2026. Lightweight, fast, and endlessly wearable.",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["White/Coral", "Blue/White"],
    images: ["assets/products/drift-runner-1.webp"],
    featured: false,
    newArrival: false,
    inStock: true,
    badge: null
  }
];

// Whatsapp config
const WHATSAPP_CONFIG = {
  number: "916238469390",
  baseUrl: "https://wa.me/",
  messageTemplate: (product, size, qty = 1) =>
    `Hi CORE Sneakers! 👟\n\nI'd like to place an order:\n\n*Product:* ${product.name}\n*Size:* UK ${size}\n*Price:* ₹${product.price.toLocaleString("en-IN")}\n*Quantity:* ${qty}\n\nPlease confirm availability and share payment details.\n\nThank you!`
};

function generateWhatsAppLink(product, size, qty = 1) {
  const msg = WHATSAPP_CONFIG.messageTemplate(product, size, qty);
  return `${WHATSAPP_CONFIG.baseUrl}${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(msg)}`;
}

function getProductById(id) {
  return CORE_PRODUCTS.find(p => p.id === id);
}

function getFeaturedProducts() {
  return CORE_PRODUCTS.filter(p => p.featured);
}

function getNewArrivals() {
  return CORE_PRODUCTS.filter(p => p.newArrival);
}

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function getDiscount(price, originalPrice) {
  if (!originalPrice) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
