export const AI_FAQ_SUGGESTIONS = [
  "How do I place an order?",
  "Do you deliver inside Ghana?",
  "Can you ship to the USA?",
  "How do I pay right now?",
  "How should I store the products?",
  "Can I order without an account?",
];

export const AI_FAQ_KNOWLEDGE = [
  {
    id: "order",
    title: "How to place an order",
    keywords: [
      "order",
      "buy",
      "checkout",
      "cart",
      "place",
      "purchase",
      "whatsapp",
      "how",
    ],
    answer:
      "Add products to your cart, review the cart, enter your name, phone, delivery method, location, and notes, then preview the WhatsApp message. When you click Send order on WhatsApp, the store receives the prepared order and confirms availability, delivery fee, and payment instructions.",
    actions: [
      { label: "Start WhatsApp order", page: "checkout", variant: "primary" },
      { label: "Browse products", page: "shop", variant: "outline" },
    ],
  },
  {
    id: "guest",
    title: "Ordering without an account",
    keywords: [
      "account",
      "sign",
      "login",
      "create account",
      "guest",
      "password",
    ],
    answer:
      "Yes, customers can order as guests. The store is WhatsApp-first, so the customer only needs to provide their name, phone number, delivery or pickup choice, location, and notes. Creating an account can stay optional later for saved details and order history.",
    actions: [
      { label: "Continue shopping", page: "shop", variant: "primary" },
      { label: "Browse products", page: "shop", variant: "outline" },
    ],
  },
  {
    id: "payment",
    title: "Payment right now",
    keywords: [
      "pay",
      "payment",
      "paystack",
      "momo",
      "mobile money",
      "card",
      "bank",
      "cash",
      "fee",
      "cost",
    ],
    answer:
      "For version one, payment is confirmed manually after the WhatsApp order is reviewed. Paystack is shown as coming soon. The store can confirm stock, delivery cost, final total, and the correct payment instructions directly through WhatsApp before the customer pays.",
    actions: [
      { label: "Start WhatsApp order", page: "checkout", variant: "primary" },
      {
        label: "Checkout preferences",
        page: "checkout-preferences",
        variant: "outline",
      },
    ],
  },
  {
    id: "ghana-delivery",
    title: "Ghana delivery",
    keywords: [
      "ghana",
      "accra",
      "tema",
      "teshie",
      "nungua",
      "kumasi",
      "local delivery",
      "pickup",
      "delivery inside ghana",
    ],
    answer:
      "Ghana delivery can be arranged after the order is confirmed on WhatsApp. The customer shares their location, then the store confirms the delivery fee and timeline. Ghana is the default country option during WhatsApp checkout.",
    actions: [
      {
        label: "View delivery details",
        page: "delivery-details",
        variant: "primary",
      },
      { label: "Start WhatsApp order", page: "checkout", variant: "outline" },
    ],
  },
  {
    id: "usa-shipping",
    title: "USA and international shipping",
    keywords: [
      "usa",
      "united states",
      "america",
      "international",
      "abroad",
      "ship",
      "shipping",
      "dhl",
      "ups",
      "fedex",
      "courier",
    ],
    answer:
      "USA and international orders can be handled case by case. During checkout, the customer can choose the USA phone region, and the WhatsApp order goes to the USA business number. The store can then confirm courier options, shipping quote, and estimated delivery timeline.",
    actions: [
      {
        label: "View delivery details",
        page: "delivery-details",
        variant: "primary",
      },
      { label: "Start WhatsApp order", page: "checkout", variant: "outline" },
    ],
  },
  {
    id: "tracking",
    title: "Package tracking",
    keywords: [
      "track",
      "tracking",
      "where",
      "package",
      "parcel",
      "dhl",
      "ups",
      "fedex",
      "status",
      "shipped",
    ],
    answer:
      "The site already has a tracking-ready design for steps like order confirmed, packed in Ghana, shipped with courier, and out for delivery. For now, tracking numbers and courier updates can be confirmed through WhatsApp after shipment.",
    actions: [
      {
        label: "View delivery details",
        page: "delivery-details",
        variant: "primary",
      },
      { label: "Contact us", page: "contact", variant: "outline" },
    ],
  },
  {
    id: "storage",
    title: "Product storage",
    keywords: [
      "store",
      "storage",
      "keep",
      "shelf",
      "expire",
      "preserve",
      "honey",
      "powder",
      "paste",
    ],
    answer:
      "Keep dry powders sealed in a cool, dry place away from moisture. Keep honey and groundnut paste covered tightly after use. Product detail pages include product-specific storage notes, ingredients, size, usage ideas, and good-for guidance.",
    actions: [{ label: "Browse products", page: "shop", variant: "primary" }],
  },
  {
    id: "ingredients",
    title: "Ingredients and allergies",
    keywords: [
      "ingredients",
      "natural",
      "allergy",
      "groundnut",
      "peanut",
      "wheat",
      "soya",
      "millet",
      "rice",
      "corn",
    ],
    answer:
      "Product detail pages list ingredients clearly. Some porridge products may include millet, soya, rice, wheat, groundnut, and corn, while groundnut paste contains roasted groundnuts. Customers with allergies should check the product detail page and confirm through WhatsApp before ordering.",
    actions: [
      { label: "Browse products", page: "shop", variant: "primary" },
      { label: "Contact us", page: "contact", variant: "outline" },
    ],
  },
  {
    id: "bulk",
    title: "Bulk and family-size orders",
    keywords: [
      "bulk",
      "family",
      "large",
      "wholesale",
      "many",
      "discount",
      "bucket",
      "2l",
      "2kg",
    ],
    answer:
      "Bulk and family-size orders can be requested through WhatsApp. The store can confirm available sizes, packaging, delivery cost, and any possible discount manually before payment.",
    actions: [
      { label: "Start WhatsApp order", page: "checkout", variant: "primary" },
      { label: "Browse products", page: "shop", variant: "outline" },
    ],
  },
  {
    id: "availability",
    title: "Stock and availability",
    keywords: [
      "available",
      "availability",
      "stock",
      "out of stock",
      "replacement",
      "substitute",
      "size",
    ],
    answer:
      "Availability is confirmed through WhatsApp before payment. If an item is unavailable, the seller can suggest another size, a similar product, or a later pickup or delivery time.",
    actions: [
      { label: "Start WhatsApp order", page: "checkout", variant: "primary" },
      { label: "Contact us", page: "contact", variant: "outline" },
    ],
  },
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findBestFaqAnswer(question) {
  const normalizedQuestion = normalize(question);

  if (!normalizedQuestion) {
    return {
      title: "Ask a question",
      answer:
        "Type a question about ordering, delivery, payment, product storage, ingredients, tracking, or WhatsApp checkout. I will suggest the most helpful answer from the store FAQ.",
      confidence: 0,
      actions: [],
      matchedKeywords: [],
    };
  }

  const scored = AI_FAQ_KNOWLEDGE.map((item) => {
    const matchedKeywords = item.keywords.filter((keyword) =>
      normalizedQuestion.includes(normalize(keyword)),
    );
    const titleWords = normalize(item.title)
      .split(" ")
      .filter((word) => word.length > 3);
    const matchedTitleWords = titleWords.filter((word) =>
      normalizedQuestion.includes(word),
    );
    const score = matchedKeywords.length * 3 + matchedTitleWords.length;
    return { ...item, score, matchedKeywords };
  }).sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (!best || best.score <= 0) {
    return {
      title: "I can help with store questions",
      answer:
        "I did not find an exact FAQ match yet. Try asking about ordering, payment, Ghana delivery, USA shipping, tracking, storage, ingredients, bulk orders, or product availability. You can also contact the store directly through WhatsApp.",
      confidence: 0,
      actions: [
        { label: "Contact us", page: "contact", variant: "primary" },
        { label: "Browse products", page: "shop", variant: "outline" },
      ],
      matchedKeywords: [],
    };
  }

  return {
    title: best.title,
    answer: best.answer,
    confidence: Math.min(98, 54 + best.score * 9),
    actions: best.actions,
    matchedKeywords: best.matchedKeywords,
  };
}
