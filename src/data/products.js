import honey250Img from "../assets/products/honey-250ml.png";
import honey500Img from "../assets/products/honey-500ml.png";
import honey1LImg from "../assets/products/honey-1l.png";
import honey2LImg from "../assets/products/honey-2l.png";
import pbBucketImg from "../assets/products/pb-bucket.png";
import porridgeSaleImg from "../assets/products/porridge-1kg.png";
import porridge1KgImg from "../assets/products/porridge-1kg.png";
import porridge2KgImg from "../assets/products/porridge-2kg.png";
import milletPowder1KgImg from "../assets/08-millet-sorghum-powder-1kg-ghs25.png";
import milletPowder2KgImg from "../assets/09-millet-sorghum-powder-2kg-ghs50.png";

export const products = [
  {
    id: "honey-250ml",
    category: "honey",
    categoryKey: "n_honey",
    nameKey: "Wild Honey",
    sizeKey: "250 ml",
    descKey: "Raw, unfiltered wild honey in a handy small bottle.",
    ingredients: ["Pure wild honey"],
    weightDetail:
      "250 ml bottle — easy starter size for tea, toast, and travel.",
    storage:
      "Store tightly closed in a cool, dry place away from direct sunlight. Natural crystallization may occur.",
    usageIdeas: [
      "Sweeten tea, sobolo, or warm drinks",
      "Drizzle over oats, bread, pancakes, or fruit",
      "Use in marinades and homemade dressings",
    ],
    goodFor: [
      "First-time honey buyers",
      "Small households",
      "Gifting or travel",
    ],
    prices: {
      ghana: { originalPrice: 25, salePrice: null },
      international: { originalPrice: 8.99, salePrice: null },
    },
    image: honey250Img,
    alt: "Creativity Natural Foods Wild Honey 250 ml bottle",
    bestSeller: false,
  },
  {
    id: "honey-500ml",
    category: "honey",
    categoryKey: "n_honey",
    nameKey: "Wild Honey",
    sizeKey: "500 ml",
    descKey: "Raw, unfiltered wild honey for everyday home use.",
    ingredients: ["Pure wild honey"],
    weightDetail: "500 ml bottle — balanced size for regular home use.",
    storage:
      "Store tightly closed in a cool, dry place away from direct sunlight. Natural crystallization may occur.",
    usageIdeas: [
      "Sweeten tea, porridge, or smoothies",
      "Drizzle over breakfast bowls",
      "Use in sauces, marinades, and baking",
    ],
    goodFor: [
      "Everyday family use",
      "Breakfast routines",
      "Natural sweetener replacement",
    ],
    prices: {
      ghana: { originalPrice: 50, salePrice: 45 },
      international: { originalPrice: 14.99, salePrice: null },
    },
    image: honey500Img,
    alt: "Creativity Natural Foods Wild Honey 500 ml bottle",
    bestSeller: false,
  },
  {
    id: "honey-1l",
    category: "honey",
    categoryKey: "n_honey",
    nameKey: "Wild Honey",
    sizeKey: "1 litre",
    descKey: "Pure wild honey in a larger family-size bottle.",
    ingredients: ["Pure wild honey"],
    weightDetail: "1 litre bottle — family-size value for frequent use.",
    storage:
      "Store tightly closed in a cool, dry place away from direct sunlight. Natural crystallization may occur.",
    usageIdeas: [
      "Daily tea and breakfast sweetener",
      "Cooking, baking, and marinades",
      "Pair with tombrown or oats",
    ],
    goodFor: ["Families", "Frequent honey users", "Best-seller shoppers"],
    prices: {
      ghana: { originalPrice: 100, salePrice: 90 },
      international: { originalPrice: 27.99, salePrice: null },
    },
    image: honey1LImg,
    alt: "Creativity Natural Foods Wild Honey 1 litre bottle",
    bestSeller: true,
  },
  {
    id: "honey-2l",
    category: "honey",
    categoryKey: "n_honey",
    nameKey: "Wild Honey",
    sizeKey: "2 litres",
    descKey: "Large-value wild honey container, great for bulk use.",
    ingredients: ["Pure wild honey"],
    weightDetail:
      "2 litre container — bulk value for homes, offices, and food prep.",
    storage:
      "Store tightly closed in a cool, dry place away from direct sunlight. Natural crystallization may occur.",
    usageIdeas: [
      "Bulk sweetener for drinks and meals",
      "Baking, sauces, and marinades",
      "Refill smaller kitchen bottles",
    ],
    goodFor: ["Bulk buyers", "Large families", "Small food businesses"],
    prices: {
      ghana: { originalPrice: 200, salePrice: 190 },
      international: { originalPrice: 49.99, salePrice: null },
    },
    image: honey2LImg,
    alt: "Creativity Natural Foods Wild Honey 2 litre container",
    bestSeller: false,
  },
  {
    id: "pb-bucket",
    category: "pb",
    categoryKey: "n_pb",
    nameKey: "Groundnut Paste",
    sizeKey: "Large Bucket",
    descKey: "Rich groundnut paste / peanut butter in a large bucket.",
    ingredients: ["Roasted groundnuts"],
    weightDetail:
      "Large bucket — value pack for family cooking and frequent use.",
    storage:
      "Keep sealed after opening. Store in a cool, dry place and stir before use if natural oil separation appears.",
    usageIdeas: [
      "Use for groundnut soup and stews",
      "Spread on bread or toast",
      "Add to sauces, dips, and porridges",
    ],
    goodFor: [
      "Groundnut soup lovers",
      "Family meal prep",
      "Bulk pantry stocking",
    ],
    prices: {
      ghana: { originalPrice: 150, salePrice: null },
      international: { originalPrice: 29.99, salePrice: null },
    },
    image: pbBucketImg,
    alt: "Creativity Natural Foods groundnut paste large bucket",
    bestSeller: true,
  },
  {
    id: "mixed-porridge-tombrown",
    category: "porridge",
    categoryKey: "n_porridge",
    nameKey: "Mixed Porridge (Tombrown)",
    sizeKey: "Pack",
    descKey:
      "Nutritious tom brown porridge blend with millet, soya, rice, wheat, groundnut and yellow corn.",
    ingredients: [
      "Millet",
      "Soya beans",
      "Rice",
      "Wheat",
      "Groundnut",
      "Yellow corn",
    ],
    weightDetail:
      "Pack size — convenient porridge blend for breakfast and quick meals.",
    storage:
      "Keep sealed in an airtight container after opening. Store in a cool, dry place away from moisture.",
    usageIdeas: [
      "Prepare as warm breakfast porridge",
      "Sweeten with honey or milk",
      "Use as a filling family breakfast option",
    ],
    goodFor: ["Breakfast", "Children and family meals", "Quick pantry meals"],
    prices: {
      ghana: { originalPrice: 60, salePrice: 55 },
      international: { originalPrice: 12.99, salePrice: null },
    },
    image: porridgeSaleImg,
    alt: "Creativity Natural Foods Mixed Porridge Tombrown pack",
    bestSeller: false,
  },
  {
    id: "mixed-porridge-1kg",
    category: "porridge",
    categoryKey: "n_porridge",
    nameKey: "Mixed Porridge (Tombrown)",
    sizeKey: "1 kg",
    descKey: "Nutritious tom brown porridge blend — 1 kg bag.",
    ingredients: [
      "Millet",
      "Soya beans",
      "Rice",
      "Wheat",
      "Groundnut",
      "Yellow corn",
    ],
    weightDetail: "1 kg bag — steady home supply for porridge breakfasts.",
    storage:
      "Keep sealed in an airtight container after opening. Store in a cool, dry place away from moisture.",
    usageIdeas: [
      "Prepare as tom brown porridge",
      "Serve with honey, milk, or sugar",
      "Batch-cook for family breakfast",
    ],
    goodFor: ["Home breakfast routines", "Small families", "Pantry restock"],
    prices: {
      ghana: { originalPrice: 25, salePrice: null },
      international: { originalPrice: 14.99, salePrice: null },
    },
    image: porridge1KgImg,
    alt: "Creativity Natural Foods Mixed Porridge Tombrown 1 kg bag",
    bestSeller: false,
  },
  {
    id: "mixed-porridge-2kg",
    category: "porridge",
    categoryKey: "n_porridge",
    nameKey: "Mixed Porridge (Tombrown)",
    sizeKey: "2 kg",
    descKey: "Nutritious tom brown porridge blend — 2 kg family-size bag.",
    ingredients: [
      "Millet",
      "Soya beans",
      "Rice",
      "Wheat",
      "Groundnut",
      "Yellow corn",
    ],
    weightDetail: "2 kg bag — larger family-size pack for repeated breakfasts.",
    storage:
      "Keep sealed in an airtight container after opening. Store in a cool, dry place away from moisture.",
    usageIdeas: [
      "Prepare family-size tom brown porridge",
      "Pair with honey for a natural sweetener",
      "Keep as a long-lasting breakfast staple",
    ],
    goodFor: ["Families", "Bulk breakfast prep", "Frequent porridge eaters"],
    prices: {
      ghana: { originalPrice: 50, salePrice: null },
      international: { originalPrice: 27.99, salePrice: null },
    },
    image: porridge2KgImg,
    alt: "Creativity Natural Foods Mixed Porridge Tombrown 2 kg bag",
    bestSeller: false,
  },
  {
    id: "sorghum-powder-1kg",
    category: "porridge",
    categoryKey: "n_porridge",
    nameKey: "Sorghum Powder",
    sizeKey: "1 kg",
    descKey: "Fine sorghum powder for banku or koko.",
    ingredients: ["Sorghum"],
    weightDetail:
      "1 kg pack — steady home supply for koko, banku, and traditional meals.",
    storage:
      "Keep dry and sealed after opening. Store away from moisture and strong odors.",
    usageIdeas: [
      "Prepare koko or porridge",
      "Use for banku mixtures",
      "Stock up for traditional family meals",
    ],
    goodFor: [
      "Frequent cooking",
      "Traditional Ghanaian meals",
      "Family pantry stocking",
    ],
    prices: {
      ghana: { originalPrice: 25, salePrice: null },
      international: { originalPrice: 12.99, salePrice: null },
    },
    image: milletPowder1KgImg,
    alt: "Creativity Natural Foods sorghum powder 1 kg package",
    bestSeller: false,
  },
  {
    id: "sorghum-powder-2kg",
    category: "porridge",
    categoryKey: "n_porridge",
    nameKey: "Sorghum Powder",
    sizeKey: "2 kg",
    descKey: "Fine sorghum powder for banku or koko.",
    ingredients: ["Sorghum"],
    weightDetail: "2 kg pack — larger supply for households that cook often.",
    storage:
      "Keep dry and sealed after opening. Store away from moisture and strong odors.",
    usageIdeas: [
      "Prepare koko or porridge",
      "Use for banku mixtures",
      "Stock up for traditional family meals",
    ],
    goodFor: [
      "Frequent cooking",
      "Traditional Ghanaian meals",
      "Family pantry stocking",
    ],
    prices: {
      ghana: { originalPrice: 50, salePrice: null },
      international: { originalPrice: 23.99, salePrice: null },
    },
    image: milletPowder2KgImg,
    alt: "Creativity Natural Foods sorghum powder 2 kg package",
    bestSeller: false,
  },
];
