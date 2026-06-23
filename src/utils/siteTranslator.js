import { useEffect } from "react";

const PROTECTED_PHRASES = new Set([
  "Creativity Natural Foods",
  "Debee Farms",
  "Teshie-Nungua",
  "WhatsApp",
  "Paystack",
  "DHL",
  "UPS",
  "FedEx",
  "LocalStorage",
  "Vercel",
  "Turso",
  "Cloudinary",
]);

const EXACT_TRANSLATIONS = {
  fr: {
    "Customer picks": "Choix des clients",
    "Best Sellers": "Meilleures ventes",
    "Shop favorites →": "Acheter les favoris →",
    "International friendly": "Adapté à l’international",
    "USD Prices": "Prix en USD",
    "Wild Honey": "Miel sauvage",
    "Groundnut Paste": "Pâte d’arachide",
    "Porridge & Powders": "Bouillies et poudres",
    "Shop all products →": "Voir tous les produits →",
    "Browse faster": "Parcourir plus vite",
    "Shop by Category": "Acheter par catégorie",
    "Everyday pantry": "Garde-manger quotidien",
    "Local Staples": "Produits locaux essentiels",
    "Explore staples →": "Explorer les essentiels →",
    "Why customers can trust us":
      "Pourquoi les clients peuvent nous faire confiance",
    "Real food, clear ordering, and human support before checkout":
      "De vrais aliments, une commande claire et une aide humaine avant le paiement",
    "This store is designed to make buyers feel safe before they pay. Customers can see what they are ordering, confirm availability, ask delivery questions, and send the final order directly through WhatsApp.":
      "Cette boutique aide les acheteurs à se sentir en confiance avant de payer. Les clients voient ce qu’ils commandent, confirment la disponibilité, posent des questions de livraison et envoient la commande finale directement par WhatsApp.",
    "Built for first-time buyers": "Conçu pour les nouveaux acheteurs",
    "Simple product cards, visible delivery notes, and WhatsApp confirmation reduce confusion before purchase.":
      "Des fiches produits simples, des notes de livraison visibles et une confirmation WhatsApp réduisent la confusion avant l’achat.",
    "Made in Ghana": "Fabriqué au Ghana",
    "Natural pantry staples": "Essentiels naturels du garde-manger",
    "Order confirmed first": "Commande confirmée d’abord",
    "WhatsApp support": "Assistance WhatsApp",
    "Delivery information": "Informations de livraison",
    "Local pickup, Ghana delivery, and international shipping":
      "Retrait local, livraison au Ghana et expédition internationale",
    "Start WhatsApp order": "Commencer la commande WhatsApp",
    "View delivery details": "Voir les détails de livraison",
    "Future tracking": "Suivi futur",
    "Package tracking preview": "Aperçu du suivi de colis",
    "Clear delivery updates for customers after a courier is selected and a tracking number is added.":
      "Des mises à jour de livraison claires après le choix du transporteur et l’ajout du numéro de suivi.",
    "Other courier": "Autre transporteur",
    "Order confirmed": "Commande confirmée",
    "Customer sends WhatsApp order": "Le client envoie la commande WhatsApp",
    "Packed in Ghana": "Préparé au Ghana",
    "Items prepared for dispatch": "Articles préparés pour l’expédition",
    "Shipped with courier": "Expédié avec un transporteur",
    "Tracking number added": "Numéro de suivi ajouté",
    "Out for delivery": "En cours de livraison",
    "Customer follows delivery updates": "Le client suit les mises à jour",
    "Customer questions": "Questions des clients",
    "Give shoppers quick answers about ordering, payment, delivery, international shipping, storage, and WhatsApp support before they leave the site.":
      "Donnez aux acheteurs des réponses rapides sur la commande, le paiement, la livraison, l’expédition internationale, le stockage et l’assistance WhatsApp avant qu’ils quittent le site.",
    "Still need help?": "Besoin d’aide ?",
    "View all FAQs": "Voir toutes les FAQ",
    "Shopping cart": "Panier",
    "Checkout with WhatsApp": "Commander avec WhatsApp",
    "Continue shopping": "Continuer les achats",
    "Quick links": "Liens rapides",
    "Our story": "Notre histoire",
    "Delivery & tracking": "Livraison et suivi",
    FAQ: "FAQ",
    "Contact us": "Nous contacter",
    "Auto by time": "Auto selon l’heure",
    "My account": "Mon compte",
    Shop: "Boutique",
    "All products": "Tous les produits",
    Delivery: "Livraison",
    Contact: "Contact",
    "Payment method": "Méthode de paiement",
    "Choose how this order starts":
      "Choisissez comment cette commande commence",
    "Order through WhatsApp": "Commander via WhatsApp",
    Available: "Disponible",
    "Pay Online": "Payer en ligne",
    "Coming soon": "Bientôt disponible",
    Details: "Détails",
    Deals: "Promotions",
    "Account centre": "Centre de compte",
    "Your account": "Votre compte",
    "Your orders": "Vos commandes",
    "Wish list": "Liste d’envies",
    "Delivery details": "Détails de livraison",
    "Checkout preferences": "Préférences de commande",
    "Sign out": "Se déconnecter",
    "Review your cart, add delivery details, choose the active payment flow, preview the message, then send the order through WhatsApp.":
      "Vérifiez votre panier, ajoutez les détails de livraison, choisissez le mode de paiement actif, prévisualisez le message, puis envoyez la commande par WhatsApp.",
    "Customer details": "Détails du client",
    "WhatsApp preview": "Aperçu WhatsApp",
    "Full name": "Nom complet",
    "Phone number": "Numéro de téléphone",
    "Delivery location or pickup note": "Lieu de livraison ou note de retrait",
    "Extra notes": "Notes supplémentaires",
    "Preview WhatsApp message": "Prévisualiser le message WhatsApp",
    "Send order on WhatsApp": "Envoyer la commande sur WhatsApp",
    "Edit details": "Modifier les détails",
    "Get in touch": "Entrer en contact",
    "Send a message": "Envoyer un message",
    "Your name": "Votre nom",
    Message: "Message",
    "Create an account": "Créer un compte",
    "Sign in": "Se connecter",
    Password: "Mot de passe",
    "Order history": "Historique des commandes",
    "Saved products": "Produits enregistrés",
    "Related products": "Produits associés",
    "Usage ideas": "Idées d’utilisation",
    "Good for": "Idéal pour",
    "See details": "Voir les détails",
    Save: "Enregistrer",
    Remove: "Supprimer",
    "Browse products": "Parcourir les produits",
    "Back to account": "Retour au compte",
    "Back to shop": "Retour à la boutique",
    "Sales analytics": "Analyse des ventes",
    "Time range": "Période",
    Category: "Catégorie",
    "Chart type": "Type de graphique",
    "Selected sales": "Ventes sélectionnées",
    "Top category": "Meilleure catégorie",
    "Store owner": "Propriétaire du magasin",
    "Product catalog": "Catalogue de produits",
    "Order queue": "File de commandes",
    Customers: "Clients",
    Settings: "Paramètres",
  },
  es: {
    "Customer picks": "Selecciones de clientes",
    "Best Sellers": "Más vendidos",
    "Shop favorites →": "Comprar favoritos →",
    "International friendly": "Apto para internacional",
    "USD Prices": "Precios en USD",
    "Wild Honey": "Miel silvestre",
    "Groundnut Paste": "Pasta de maní",
    "Porridge & Powders": "Gachas y polvos",
    "Shop all products →": "Ver todos los productos →",
    "Browse faster": "Navega más rápido",
    "Shop by Category": "Comprar por categoría",
    "Everyday pantry": "Despensa diaria",
    "Local Staples": "Básicos locales",
    "Explore staples →": "Explorar básicos →",
    "Why customers can trust us":
      "Por qué los clientes pueden confiar en nosotros",
    "Real food, clear ordering, and human support before checkout":
      "Comida real, pedido claro y soporte humano antes de pagar",
    "This store is designed to make buyers feel safe before they pay. Customers can see what they are ordering, confirm availability, ask delivery questions, and send the final order directly through WhatsApp.":
      "Esta tienda está diseñada para que los compradores se sientan seguros antes de pagar. Los clientes pueden ver lo que piden, confirmar disponibilidad, hacer preguntas de entrega y enviar el pedido final directamente por WhatsApp.",
    "Built for first-time buyers": "Hecho para compradores nuevos",
    "Simple product cards, visible delivery notes, and WhatsApp confirmation reduce confusion before purchase.":
      "Tarjetas de producto simples, notas de entrega visibles y confirmación por WhatsApp reducen la confusión antes de comprar.",
    "Made in Ghana": "Hecho en Ghana",
    "Natural pantry staples": "Básicos naturales de despensa",
    "Order confirmed first": "Pedido confirmado primero",
    "WhatsApp support": "Soporte por WhatsApp",
    "Delivery information": "Información de entrega",
    "Local pickup, Ghana delivery, and international shipping":
      "Recogida local, entrega en Ghana y envío internacional",
    "Start WhatsApp order": "Iniciar pedido por WhatsApp",
    "View delivery details": "Ver detalles de entrega",
    "Future tracking": "Seguimiento futuro",
    "Package tracking preview": "Vista previa de seguimiento",
    "Clear delivery updates for customers after a courier is selected and a tracking number is added.":
      "Actualizaciones claras después de elegir un mensajero y añadir un número de seguimiento.",
    "Other courier": "Otro mensajero",
    "Order confirmed": "Pedido confirmado",
    "Customer sends WhatsApp order": "El cliente envía el pedido por WhatsApp",
    "Packed in Ghana": "Empacado en Ghana",
    "Items prepared for dispatch": "Artículos preparados para envío",
    "Shipped with courier": "Enviado con mensajero",
    "Tracking number added": "Número de seguimiento añadido",
    "Out for delivery": "En reparto",
    "Customer follows delivery updates": "El cliente sigue las actualizaciones",
    "Customer questions": "Preguntas de clientes",
    "Still need help?": "¿Aún necesitas ayuda?",
    "Shopping cart": "Carrito",
    "Checkout with WhatsApp": "Pagar con WhatsApp",
    "Continue shopping": "Seguir comprando",
    "Quick links": "Enlaces rápidos",
    "Our story": "Nuestra historia",
    "Delivery & tracking": "Entrega y seguimiento",
    "Contact us": "Contáctanos",
    "Auto by time": "Auto por hora",
    "My account": "Mi cuenta",
    Shop: "Tienda",
    "All products": "Todos los productos",
    Delivery: "Entrega",
    "Payment method": "Método de pago",
    "Order through WhatsApp": "Ordenar por WhatsApp",
    Available: "Disponible",
    "Pay Online": "Pagar en línea",
    "Coming soon": "Próximamente",
    Details: "Detalles",
    Deals: "Ofertas",
    "Account centre": "Centro de cuenta",
    "Your account": "Tu cuenta",
    "Your orders": "Tus pedidos",
    "Wish list": "Lista de deseos",
    "Delivery details": "Detalles de entrega",
    "Checkout preferences": "Preferencias de pago",
    "Sign out": "Cerrar sesión",
    "Customer details": "Datos del cliente",
    "WhatsApp preview": "Vista previa de WhatsApp",
    "Full name": "Nombre completo",
    "Phone number": "Número de teléfono",
    "Extra notes": "Notas adicionales",
    "Preview WhatsApp message": "Previsualizar mensaje de WhatsApp",
    "Send order on WhatsApp": "Enviar pedido por WhatsApp",
    "Edit details": "Editar detalles",
    "Get in touch": "Ponte en contacto",
    "Send a message": "Enviar mensaje",
    "Create an account": "Crear una cuenta",
    "Sign in": "Iniciar sesión",
    Password: "Contraseña",
    "Order history": "Historial de pedidos",
    "Saved products": "Productos guardados",
    "Related products": "Productos relacionados",
    "Usage ideas": "Ideas de uso",
    "Good for": "Bueno para",
    "See details": "Ver detalles",
    Save: "Guardar",
    Remove: "Eliminar",
    "Browse products": "Ver productos",
    "Back to account": "Volver a la cuenta",
    "Back to shop": "Volver a la tienda",
    "Sales analytics": "Análisis de ventas",
    "Time range": "Rango de tiempo",
    Category: "Categoría",
    "Chart type": "Tipo de gráfico",
    "Selected sales": "Ventas seleccionadas",
    "Top category": "Categoría principal",
    "Store owner": "Propietario de tienda",
    "Product catalog": "Catálogo de productos",
    "Order queue": "Cola de pedidos",
    Customers: "Clientes",
    Settings: "Configuración",
  },
  de: {
    "Customer picks": "Kundenauswahl",
    "Best Sellers": "Bestseller",
    "Shop favorites →": "Favoriten kaufen →",
    "International friendly": "International geeignet",
    "USD Prices": "Preise in USD",
    "Wild Honey": "Wildhonig",
    "Groundnut Paste": "Erdnusspaste",
    "Porridge & Powders": "Brei und Pulver",
    "Shop all products →": "Alle Produkte ansehen →",
    "Browse faster": "Schneller stöbern",
    "Shop by Category": "Nach Kategorie kaufen",
    "Everyday pantry": "Täglicher Vorrat",
    "Local Staples": "Lokale Grundnahrungsmittel",
    "Explore staples →": "Grundnahrungsmittel entdecken →",
    "Why customers can trust us": "Warum Kunden uns vertrauen können",
    "Real food, clear ordering, and human support before checkout":
      "Echtes Essen, klare Bestellung und menschliche Hilfe vor dem Checkout",
    "Made in Ghana": "Hergestellt in Ghana",
    "Natural pantry staples": "Natürliche Vorratsprodukte",
    "Order confirmed first": "Bestellung zuerst bestätigt",
    "WhatsApp support": "WhatsApp-Support",
    "Delivery information": "Lieferinformationen",
    "Start WhatsApp order": "WhatsApp-Bestellung starten",
    "View delivery details": "Lieferdetails ansehen",
    "Future tracking": "Zukünftige Sendungsverfolgung",
    "Package tracking preview": "Paketverfolgung Vorschau",
    "Other courier": "Anderer Kurier",
    "Order confirmed": "Bestellung bestätigt",
    "Packed in Ghana": "In Ghana verpackt",
    "Shipped with courier": "Mit Kurier versendet",
    "Out for delivery": "In Zustellung",
    "Customer questions": "Kundenfragen",
    "Still need help?": "Noch Hilfe nötig?",
    "Shopping cart": "Warenkorb",
    "Checkout with WhatsApp": "Mit WhatsApp bestellen",
    "Continue shopping": "Weiter einkaufen",
    "Quick links": "Schnelllinks",
    "Our story": "Unsere Geschichte",
    "Delivery & tracking": "Lieferung und Tracking",
    "Contact us": "Kontakt",
    "My account": "Mein Konto",
    Shop: "Shop",
    "All products": "Alle Produkte",
    Delivery: "Lieferung",
    "Payment method": "Zahlungsmethode",
    "Order through WhatsApp": "Über WhatsApp bestellen",
    Available: "Verfügbar",
    "Coming soon": "Demnächst",
    Details: "Details",
    Deals: "Angebote",
    "Your account": "Ihr Konto",
    "Your orders": "Ihre Bestellungen",
    "Wish list": "Wunschliste",
    "Sign out": "Abmelden",
    "Customer details": "Kundendetails",
    "Full name": "Vollständiger Name",
    "Phone number": "Telefonnummer",
    "Send order on WhatsApp": "Bestellung per WhatsApp senden",
    "Create an account": "Konto erstellen",
    "Sign in": "Anmelden",
    Password: "Passwort",
    "Order history": "Bestellverlauf",
    "Saved products": "Gespeicherte Produkte",
    "Related products": "Ähnliche Produkte",
    "Usage ideas": "Verwendungsideen",
    "Good for": "Gut für",
    "See details": "Details ansehen",
    Save: "Speichern",
    Remove: "Entfernen",
    "Browse products": "Produkte durchsuchen",
    "Sales analytics": "Verkaufsanalyse",
    Category: "Kategorie",
    "Chart type": "Diagrammtyp",
    Customers: "Kunden",
    Settings: "Einstellungen",
  },
  pt: {
    "Customer picks": "Escolhas dos clientes",
    "Best Sellers": "Mais vendidos",
    "Shop favorites →": "Comprar favoritos →",
    "International friendly": "Pronto para internacional",
    "USD Prices": "Preços em USD",
    "Wild Honey": "Mel silvestre",
    "Groundnut Paste": "Pasta de amendoim",
    "Porridge & Powders": "Papa e pós",
    "Shop by Category": "Comprar por categoria",
    "Why customers can trust us": "Por que os clientes podem confiar em nós",
    "Made in Ghana": "Feito em Gana",
    "WhatsApp support": "Suporte por WhatsApp",
    "Delivery information": "Informações de entrega",
    "Start WhatsApp order": "Iniciar pedido no WhatsApp",
    "Shopping cart": "Carrinho",
    "Checkout with WhatsApp": "Finalizar com WhatsApp",
    "Continue shopping": "Continuar comprando",
    "Our story": "Nossa história",
    "Contact us": "Fale conosco",
    "All products": "Todos os produtos",
    Delivery: "Entrega",
    "Payment method": "Método de pagamento",
    Available: "Disponível",
    "Coming soon": "Em breve",
    Details: "Detalhes",
    Deals: "Ofertas",
    "Your account": "Sua conta",
    "Full name": "Nome completo",
    "Phone number": "Número de telefone",
    "Create an account": "Criar uma conta",
    "Sign in": "Entrar",
    Password: "Senha",
    Save: "Salvar",
    Remove: "Remover",
  },
  it: {
    "Customer picks": "Scelte dei clienti",
    "Best Sellers": "Più venduti",
    "Shop favorites →": "Acquista i preferiti →",
    "USD Prices": "Prezzi in USD",
    "Wild Honey": "Miele selvatico",
    "Groundnut Paste": "Pasta di arachidi",
    "Shop by Category": "Acquista per categoria",
    "Why customers can trust us": "Perché i clienti possono fidarsi",
    "Made in Ghana": "Prodotto in Ghana",
    "WhatsApp support": "Supporto WhatsApp",
    "Delivery information": "Informazioni di consegna",
    "Shopping cart": "Carrello",
    "Checkout with WhatsApp": "Ordina con WhatsApp",
    "Continue shopping": "Continua lo shopping",
    "Our story": "La nostra storia",
    "Contact us": "Contattaci",
    "All products": "Tutti i prodotti",
    Delivery: "Consegna",
    Available: "Disponibile",
    "Coming soon": "Prossimamente",
    Details: "Dettagli",
    "Your account": "Il tuo account",
    "Full name": "Nome completo",
    "Phone number": "Numero di telefono",
    "Create an account": "Crea un account",
    "Sign in": "Accedi",
    Password: "Password",
    Save: "Salva",
    Remove: "Rimuovi",
  },
  nl: {
    "Customer picks": "Keuzes van klanten",
    "Best Sellers": "Bestsellers",
    "Shop favorites →": "Favorieten kopen →",
    "USD Prices": "Prijzen in USD",
    "Wild Honey": "Wilde honing",
    "Groundnut Paste": "Pindapasta",
    "Shop by Category": "Shop per categorie",
    "Why customers can trust us": "Waarom klanten ons kunnen vertrouwen",
    "Made in Ghana": "Gemaakt in Ghana",
    "WhatsApp support": "WhatsApp-ondersteuning",
    "Delivery information": "Bezorginformatie",
    "Shopping cart": "Winkelwagen",
    "Checkout with WhatsApp": "Afrekenen met WhatsApp",
    "Continue shopping": "Verder winkelen",
    "Our story": "Ons verhaal",
    "Contact us": "Neem contact op",
    "All products": "Alle producten",
    Delivery: "Bezorging",
    Available: "Beschikbaar",
    "Coming soon": "Binnenkort",
    Details: "Details",
    "Your account": "Je account",
    "Full name": "Volledige naam",
    "Phone number": "Telefoonnummer",
    "Create an account": "Account aanmaken",
    "Sign in": "Inloggen",
    Password: "Wachtwoord",
    Save: "Opslaan",
    Remove: "Verwijderen",
  },
  zh: {
    "Customer picks": "客户精选",
    "Best Sellers": "热销产品",
    "Shop favorites →": "购买热门产品 →",
    "International friendly": "适合国际客户",
    "USD Prices": "美元价格",
    "Wild Honey": "野生蜂蜜",
    "Groundnut Paste": "花生酱",
    "Porridge & Powders": "粥粉与粉类",
    "Shop all products →": "查看全部产品 →",
    "Browse faster": "快速浏览",
    "Shop by Category": "按类别购买",
    "Everyday pantry": "日常食品储备",
    "Local Staples": "本地主食",
    "Explore staples →": "探索主食 →",
    "Why customers can trust us": "客户为什么可以信任我们",
    "Real food, clear ordering, and human support before checkout":
      "真实食品、清晰下单和付款前人工支持",
    "Made in Ghana": "加纳制造",
    "Natural pantry staples": "天然食品储备",
    "Order confirmed first": "先确认订单",
    "WhatsApp support": "WhatsApp 支持",
    "Delivery information": "配送信息",
    "Start WhatsApp order": "开始 WhatsApp 订单",
    "View delivery details": "查看配送详情",
    "Future tracking": "未来追踪",
    "Package tracking preview": "包裹追踪预览",
    "Other courier": "其他快递",
    "Order confirmed": "订单已确认",
    "Packed in Ghana": "在加纳打包",
    "Shipped with courier": "由快递发出",
    "Out for delivery": "正在派送",
    "Customer questions": "客户问题",
    "Still need help?": "还需要帮助？",
    "Shopping cart": "购物车",
    "Checkout with WhatsApp": "通过 WhatsApp 下单",
    "Continue shopping": "继续购物",
    "Quick links": "快速链接",
    "Our story": "我们的故事",
    "Delivery & tracking": "配送与追踪",
    "Contact us": "联系我们",
    "My account": "我的账户",
    Shop: "商店",
    "All products": "所有产品",
    Delivery: "配送",
    "Payment method": "付款方式",
    "Order through WhatsApp": "通过 WhatsApp 下单",
    Available: "可用",
    "Pay Online": "在线支付",
    "Coming soon": "即将推出",
    Details: "详情",
    Deals: "优惠",
    "Your account": "你的账户",
    "Full name": "全名",
    "Phone number": "电话号码",
    "Create an account": "创建账户",
    "Sign in": "登录",
    Password: "密码",
    Save: "保存",
    Remove: "移除",
  },
};

const FALLBACK_LANGUAGE = {
  enus: "en",
};

const WORD_TRANSLATIONS = {
  fr: {
    Shop: "Boutique",
    Products: "Produits",
    Product: "Produit",
    Category: "Catégorie",
    Categories: "Catégories",
    Delivery: "Livraison",
    Order: "Commande",
    Orders: "Commandes",
    Customer: "Client",
    Customers: "Clients",
    Cart: "Panier",
    Checkout: "Commande",
    Account: "Compte",
    Settings: "Paramètres",
    Search: "Recherche",
    Save: "Enregistrer",
    Remove: "Supprimer",
    Add: "Ajouter",
    Edit: "Modifier",
    View: "Voir",
    Details: "Détails",
    Price: "Prix",
    Total: "Total",
    Status: "Statut",
    Phone: "Téléphone",
    Name: "Nom",
    Message: "Message",
    Help: "Aide",
    Story: "Histoire",
    Contact: "Contact",
    Sales: "Ventes",
    Analytics: "Analyses",
    Honey: "Miel",
    Porridge: "Bouillie",
    Peanut: "Arachide",
    Butter: "Beurre",
    Local: "Local",
    Staples: "Essentiels",
    Support: "Assistance",
    Tracking: "Suivi",
    Payment: "Paiement",
    Password: "Mot de passe",
    Create: "Créer",
    Sign: "Se connecter",
    Continue: "Continuer",
    Browse: "Parcourir",
  },
  es: {
    Shop: "Tienda",
    Products: "Productos",
    Product: "Producto",
    Category: "Categoría",
    Categories: "Categorías",
    Delivery: "Entrega",
    Order: "Pedido",
    Orders: "Pedidos",
    Customer: "Cliente",
    Customers: "Clientes",
    Cart: "Carrito",
    Checkout: "Pago",
    Account: "Cuenta",
    Settings: "Configuración",
    Search: "Buscar",
    Save: "Guardar",
    Remove: "Eliminar",
    Add: "Añadir",
    Edit: "Editar",
    View: "Ver",
    Details: "Detalles",
    Price: "Precio",
    Total: "Total",
    Status: "Estado",
    Phone: "Teléfono",
    Name: "Nombre",
    Message: "Mensaje",
    Help: "Ayuda",
    Story: "Historia",
    Contact: "Contacto",
    Sales: "Ventas",
    Analytics: "Análisis",
    Honey: "Miel",
    Porridge: "Gachas",
    Peanut: "Maní",
    Butter: "Mantequilla",
    Local: "Local",
    Staples: "Básicos",
    Support: "Soporte",
    Tracking: "Seguimiento",
    Payment: "Pago",
    Password: "Contraseña",
    Create: "Crear",
    Sign: "Iniciar",
    Continue: "Continuar",
    Browse: "Explorar",
  },
  de: {
    Shop: "Shop",
    Products: "Produkte",
    Product: "Produkt",
    Category: "Kategorie",
    Categories: "Kategorien",
    Delivery: "Lieferung",
    Order: "Bestellung",
    Orders: "Bestellungen",
    Customer: "Kunde",
    Customers: "Kunden",
    Cart: "Warenkorb",
    Checkout: "Kasse",
    Account: "Konto",
    Settings: "Einstellungen",
    Search: "Suche",
    Save: "Speichern",
    Remove: "Entfernen",
    Add: "Hinzufügen",
    Edit: "Bearbeiten",
    View: "Ansehen",
    Details: "Details",
    Price: "Preis",
    Total: "Gesamt",
    Status: "Status",
    Phone: "Telefon",
    Name: "Name",
    Message: "Nachricht",
    Help: "Hilfe",
    Story: "Geschichte",
    Contact: "Kontakt",
    Sales: "Verkäufe",
    Analytics: "Analysen",
    Honey: "Honig",
    Porridge: "Brei",
    Peanut: "Erdnuss",
    Butter: "Butter",
    Local: "Lokal",
    Staples: "Grundnahrungsmittel",
    Support: "Support",
    Tracking: "Tracking",
    Payment: "Zahlung",
    Password: "Passwort",
    Create: "Erstellen",
    Sign: "Anmelden",
    Continue: "Weiter",
    Browse: "Durchsuchen",
  },
  pt: {
    Shop: "Loja",
    Products: "Produtos",
    Product: "Produto",
    Category: "Categoria",
    Delivery: "Entrega",
    Order: "Pedido",
    Orders: "Pedidos",
    Customer: "Cliente",
    Cart: "Carrinho",
    Account: "Conta",
    Save: "Salvar",
    Remove: "Remover",
    Add: "Adicionar",
    View: "Ver",
    Details: "Detalhes",
    Price: "Preço",
    Honey: "Mel",
    Porridge: "Papa",
    Peanut: "Amendoim",
    Butter: "Manteiga",
    Local: "Local",
    Staples: "Básicos",
    Support: "Suporte",
    Tracking: "Rastreamento",
    Payment: "Pagamento",
    Create: "Criar",
    Continue: "Continuar",
  },
  it: {
    Shop: "Negozio",
    Products: "Prodotti",
    Product: "Prodotto",
    Category: "Categoria",
    Delivery: "Consegna",
    Order: "Ordine",
    Orders: "Ordini",
    Customer: "Cliente",
    Cart: "Carrello",
    Account: "Account",
    Save: "Salva",
    Remove: "Rimuovi",
    Add: "Aggiungi",
    View: "Vedi",
    Details: "Dettagli",
    Price: "Prezzo",
    Honey: "Miele",
    Porridge: "Porridge",
    Peanut: "Arachidi",
    Butter: "Burro",
    Local: "Locale",
    Staples: "Basi",
    Support: "Supporto",
    Tracking: "Tracciamento",
    Payment: "Pagamento",
    Create: "Crea",
    Continue: "Continua",
  },
  nl: {
    Shop: "Winkel",
    Products: "Producten",
    Product: "Product",
    Category: "Categorie",
    Delivery: "Bezorging",
    Order: "Bestelling",
    Orders: "Bestellingen",
    Customer: "Klant",
    Cart: "Winkelwagen",
    Account: "Account",
    Save: "Opslaan",
    Remove: "Verwijderen",
    Add: "Toevoegen",
    View: "Bekijken",
    Details: "Details",
    Price: "Prijs",
    Honey: "Honing",
    Porridge: "Pap",
    Peanut: "Pinda",
    Butter: "Boter",
    Local: "Lokaal",
    Staples: "Basisproducten",
    Support: "Ondersteuning",
    Tracking: "Volgen",
    Payment: "Betaling",
    Create: "Aanmaken",
    Continue: "Doorgaan",
  },
  zh: {
    Shop: "商店",
    Products: "产品",
    Product: "产品",
    Category: "类别",
    Delivery: "配送",
    Order: "订单",
    Orders: "订单",
    Customer: "客户",
    Cart: "购物车",
    Account: "账户",
    Save: "保存",
    Remove: "移除",
    Add: "添加",
    View: "查看",
    Details: "详情",
    Price: "价格",
    Honey: "蜂蜜",
    Porridge: "粥",
    Peanut: "花生",
    Butter: "黄油",
    Local: "本地",
    Staples: "主食",
    Support: "支持",
    Tracking: "追踪",
    Payment: "付款",
    Create: "创建",
    Continue: "继续",
  },
};

const MACHINE_LANGUAGE_TARGET = {
  en: "en",
  enus: "en",
  fr: "fr",
  es: "es",
  de: "de",
  pt: "pt",
  it: "it",
  nl: "nl",
  zh: "zh-CN",
  tw: "ak",
  ga: "gaa",
  fat: "ak",
  ee: "ee",
  ha: "ha",
  sw: "sw",
  no: "no",
  ru: "ru",
  ua: "uk",
};

const ORIGINAL_TEXT_BY_NODE = new WeakMap();
const ORIGINAL_ATTR_BY_ELEMENT = new WeakMap();
const TRANSLATION_TEXT_WRITES = new WeakSet();
const TRANSLATION_ATTR_WRITES = new WeakMap();

const MACHINE_TRANSLATION_CACHE_KEY = "cnf:machineTranslationCache:v1";
const machineTranslationCache = new Map();
const inFlightTranslations = new Map();

let machineCacheLoaded = false;
let machineCacheSaveTimer = null;

function languageBase(lang) {
  return FALLBACK_LANGUAGE[lang] || lang || "en";
}

function isEnglishLanguage(lang) {
  return languageBase(lang) === "en";
}

function exactDictionary(lang) {
  const base = languageBase(lang);
  return EXACT_TRANSLATIONS[base] || {};
}

function wordDictionary(lang) {
  const base = languageBase(lang);
  return WORD_TRANSLATIONS[base] || {};
}

function machineTarget(lang) {
  return (
    MACHINE_LANGUAGE_TARGET[lang] ||
    MACHINE_LANGUAGE_TARGET[languageBase(lang)] ||
    lang
  );
}

function withWhitespace(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

function shouldTranslateText(text) {
  if (!text) return false;

  const trimmed = text.trim();

  if (!trimmed) return false;
  if (PROTECTED_PHRASES.has(trimmed)) return false;

  // Do not send pure numbers, prices, punctuation, or symbols.
  if (!/[A-Za-z]/.test(trimmed)) return false;

  // Avoid translating long technical-looking IDs.
  if (/^[A-Z0-9_/-]{2,}$/.test(trimmed)) return false;

  // Avoid translating URLs and emails.
  if (/https?:\/\//i.test(trimmed)) return false;
  if (/\S+@\S+\.\S+/.test(trimmed)) return false;

  return true;
}

function loadMachineCache() {
  if (machineCacheLoaded) return;

  machineCacheLoaded = true;

  if (typeof window === "undefined" || !window.localStorage) return;

  try {
    const saved = window.localStorage.getItem(MACHINE_TRANSLATION_CACHE_KEY);
    if (!saved) return;

    const entries = JSON.parse(saved);

    if (Array.isArray(entries)) {
      entries.forEach(([key, value]) => {
        if (typeof key === "string" && typeof value === "string") {
          machineTranslationCache.set(key, value);
        }
      });
    }
  } catch {
    // Ignore cache errors.
  }
}

function saveMachineCacheSoon() {
  if (typeof window === "undefined" || !window.localStorage) return;

  window.clearTimeout(machineCacheSaveTimer);

  machineCacheSaveTimer = window.setTimeout(() => {
    try {
      const entries = Array.from(machineTranslationCache.entries()).slice(-900);
      window.localStorage.setItem(
        MACHINE_TRANSLATION_CACHE_KEY,
        JSON.stringify(entries),
      );
    } catch {
      // Ignore cache errors.
    }
  }, 500);
}

function cacheKey(text, lang) {
  return `${machineTarget(lang)}::${text}`;
}

function protectBrandWords(text) {
  const replacements = [];

  let protectedText = text;

  PROTECTED_PHRASES.forEach((phrase) => {
    if (!phrase || !protectedText.includes(phrase)) return;

    const token = ` CNFBRANDTOKEN${replacements.length} `;
    replacements.push({ token: token.trim(), phrase });
    protectedText = protectedText.split(phrase).join(token);
  });

  return { protectedText, replacements };
}

function restoreBrandWords(text, replacements) {
  let restored = text;

  replacements.forEach(({ token, phrase }) => {
    restored = restored
      .split(token)
      .join(phrase)
      .split(token.replace(/\s+/g, ""))
      .join(phrase);
  });

  return restored;
}

async function fetchMachineTranslation(text, lang) {
  if (isEnglishLanguage(lang)) return text;
  if (!shouldTranslateText(text)) return text;

  loadMachineCache();

  const trimmed = text.trim();
  const key = cacheKey(trimmed, lang);

  if (machineTranslationCache.has(key)) {
    return withWhitespace(text, machineTranslationCache.get(key));
  }

  if (inFlightTranslations.has(key)) {
    const value = await inFlightTranslations.get(key);
    return withWhitespace(text, value);
  }

  const target = machineTarget(lang);
  const { protectedText, replacements } = protectBrandWords(trimmed);

  const promise = fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
      target,
    )}&dt=t&q=${encodeURIComponent(protectedText)}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      return response.json();
    })
    .then((data) => {
      const translated = Array.isArray(data?.[0])
        ? data[0].map((part) => part?.[0] || "").join("")
        : trimmed;

      const restored = restoreBrandWords(translated || trimmed, replacements);

      machineTranslationCache.set(key, restored);
      saveMachineCacheSoon();

      return restored;
    })
    .catch(() => trimmed)
    .finally(() => {
      inFlightTranslations.delete(key);
    });

  inFlightTranslations.set(key, promise);

  const translated = await promise;
  return withWhitespace(text, translated);
}

export function translateSiteText(text, lang) {
  if (!text) return text;

  const trimmed = text.trim();

  if (!trimmed || PROTECTED_PHRASES.has(trimmed)) return text;

  // English and EN-US always restore the original text.
  if (isEnglishLanguage(lang)) return text;

  const dict = exactDictionary(lang);

  if (dict[trimmed]) {
    return withWhitespace(text, dict[trimmed]);
  }

  const words = wordDictionary(lang);

  if (!words || Object.keys(words).length === 0) {
    return text;
  }

  let translatedCount = 0;

  const replaced = trimmed.replace(/\b[A-Za-z][A-Za-z'-]*\b/g, (word) => {
    const clean = word.replace(/'s$/, "");

    const translated =
      words[word] ||
      words[clean] ||
      words[word[0].toUpperCase() + word.slice(1)];

    if (!translated) return word;

    translatedCount += 1;

    return word.endsWith("'s") ? translated : translated;
  });

  if (translatedCount === 0 || replaced === trimmed) {
    return text;
  }

  return withWhitespace(text, replaced);
}

async function translateSiteTextAsync(text, lang) {
  const dictionaryTranslation = translateSiteText(text, lang);

  if (dictionaryTranslation !== text || isEnglishLanguage(lang)) {
    return dictionaryTranslation;
  }

  return fetchMachineTranslation(text, lang);
}

function shouldSkipNode(node) {
  const parent = node.parentElement;

  if (!parent) return true;

  return Boolean(
    parent.closest(
      "script, style, noscript, code, pre, svg, textarea, [data-no-translate]",
    ),
  );
}

function getOriginalText(node) {
  if (!ORIGINAL_TEXT_BY_NODE.has(node)) {
    ORIGINAL_TEXT_BY_NODE.set(node, node.nodeValue || "");
  }

  return ORIGINAL_TEXT_BY_NODE.get(node) || "";
}

function updateOriginalTextFromReact(node) {
  if (!node || !node.nodeValue) return;
  ORIGINAL_TEXT_BY_NODE.set(node, node.nodeValue);
}

async function translateTextNode(node, lang) {
  if (shouldSkipNode(node)) return;

  const original = getOriginalText(node);
  const next = await translateSiteTextAsync(original, lang);

  if (node.nodeValue !== next) {
    TRANSLATION_TEXT_WRITES.add(node);
    node.nodeValue = next;
  }
}

function getAttrWriteSet(element) {
  let writeSet = TRANSLATION_ATTR_WRITES.get(element);

  if (!writeSet) {
    writeSet = new Set();
    TRANSLATION_ATTR_WRITES.set(element, writeSet);
  }

  return writeSet;
}

function getOriginalAttributes(element) {
  let originalAttrs = ORIGINAL_ATTR_BY_ELEMENT.get(element);

  if (!originalAttrs) {
    originalAttrs = {};
    ORIGINAL_ATTR_BY_ELEMENT.set(element, originalAttrs);
  }

  return originalAttrs;
}

function getOriginalAttribute(element, attr) {
  const originalAttrs = getOriginalAttributes(element);

  if (!(attr in originalAttrs)) {
    originalAttrs[attr] =
      element.getAttribute(`data-i18n-original-${attr}`) ||
      element.getAttribute(attr) ||
      "";
  }

  return originalAttrs[attr];
}

function updateOriginalAttributeFromReact(element, attr) {
  const originalAttrs = getOriginalAttributes(element);
  originalAttrs[attr] = element.getAttribute(attr) || "";
}

async function translateAttributes(root, lang) {
  const attrs = ["placeholder", "aria-label", "title"];

  const elements = Array.from(
    root.querySelectorAll(attrs.map((attr) => `[${attr}]`).join(",")),
  );

  await Promise.all(
    elements.map(async (element) => {
      if (element.closest("[data-no-translate]")) return;

      await Promise.all(
        attrs.map(async (attr) => {
          if (!element.hasAttribute(attr)) return;

          const original = getOriginalAttribute(element, attr);
          const next = await translateSiteTextAsync(original, lang);

          if (next !== element.getAttribute(attr)) {
            const writeSet = getAttrWriteSet(element);
            writeSet.add(attr);
            element.setAttribute(attr, next);
          }
        }),
      );
    }),
  );
}

async function translateTree(root, lang) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;

      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  await Promise.all(nodes.map((node) => translateTextNode(node, lang)));
  await translateAttributes(root, lang);
}

export function useSiteTranslation(lang) {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const root = document.getElementById("root") || document.body;
    let frameId = null;
    let runId = 0;

    function run() {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      const currentRunId = runId + 1;
      runId = currentRunId;

      frameId = window.requestAnimationFrame(() => {
        translateTree(root, lang).then(() => {
          if (currentRunId !== runId) return;
        });
      });
    }

    run();

    const observer = new MutationObserver((mutations) => {
      let shouldRun = false;

      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          if (TRANSLATION_TEXT_WRITES.has(mutation.target)) {
            TRANSLATION_TEXT_WRITES.delete(mutation.target);
          } else {
            updateOriginalTextFromReact(mutation.target);
          }

          shouldRun = true;
        }

        if (mutation.type === "attributes") {
          const element = mutation.target;
          const attr = mutation.attributeName;

          if (!attr) continue;

          const writeSet = TRANSLATION_ATTR_WRITES.get(element);

          if (writeSet?.has(attr)) {
            writeSet.delete(attr);
          } else {
            updateOriginalAttributeFromReact(element, attr);
          }

          shouldRun = true;
        }

        if (mutation.type === "childList") {
          shouldRun = true;
        }
      }

      if (shouldRun) {
        run();
      }
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    return () => {
      runId += 1;

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      observer.disconnect();
    };
  }, [lang]);
}
