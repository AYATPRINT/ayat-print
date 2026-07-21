import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  defaultCurrency: string;
  currencySymbol: string;
  defaultUnit: 'cm' | 'in';
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr', defaultCurrency: 'USD', currencySymbol: '$', defaultUnit: 'in' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', defaultCurrency: 'EUR', currencySymbol: '€', defaultUnit: 'cm' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', defaultCurrency: 'SAR', currencySymbol: '﷼', defaultUnit: 'cm' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', defaultCurrency: 'EUR', currencySymbol: '€', defaultUnit: 'cm' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', defaultCurrency: 'EUR', currencySymbol: '€', defaultUnit: 'cm' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr', defaultCurrency: 'EUR', currencySymbol: '€', defaultUnit: 'cm' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr', defaultCurrency: 'USD', currencySymbol: '$', defaultUnit: 'cm' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr', defaultCurrency: 'TRY', currencySymbol: '₺', defaultUnit: 'cm' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl', defaultCurrency: 'USD', currencySymbol: '$', defaultUnit: 'cm' },
  { code: 'prs', name: 'Dari', nativeName: 'دری', flag: '🇦🇫', dir: 'rtl', defaultCurrency: 'USD', currencySymbol: '$', defaultUnit: 'cm' },
];

export type TranslationKey = keyof typeof TRANSLATIONS.en;

export const TRANSLATIONS = {
  en: {
    shippingBanner: "Worldwide Shipping • Museum-Quality 300 DPI Fine Art Canvas • Tanzil Verified Scripture Integrity",
    store: "Luxury Gallery Store",
    b2b: "Institutional B2B",
    roomSimulator: "AI Room Simulator",
    studio: "Canvas Studio",
    connections: "Connections",
    fontEngine: "Font Engine",
    techSpec: "Tech Spec",
    heroSubtitle: "Sacred Typography • Museum Print House",
    heroTitle: "Transform Holy Scripture into Museum-Grade Wall Art",
    heroDesc: "AI-assisted design studio, cryptographic Tanzil verse validation, and luxury Print-on-Demand fulfillment across 40+ countries.",
    searchPlaceholder: "Search Surah, translation, or style...",
    previewRoom: "Preview in Room Space",
    openInStudio: "Open in Canvas Studio",
    addToCart: "Add Framed Canvas to Cart",
    selectFrame: "Select Floating Frame Style",
    dimensions: "Canvas Dimensions",
    units: "Units",
    currency: "Currency",
    language: "Language",
    customVerse: "Custom Verse",
    tanzilVerified: "Tanzil Verified",
    goldFoil: "24K Gold Foil",
    walnut: "American Walnut",
    blackWood: "Black Satin Wood",
    oak: "Natural Frosted Oak",
    cart: "Cart",
    wishlist: "Wishlist",
    account: "Client Vault",
    guarantee: "100-Year Archival Guarantee",
    allMasterpieces: "All Masterpieces",
    moroccanSalon: "Moroccan Salons",
    gulfMajlis: "Gulf Majlis",
    andalusianMihrab: "Andalusian Mihrabs",
    nordicVellum: "Nordic Vellum",
    verifiedScripture: "Verified Scripture",
    totalFramedPrint: "Total Framed Print",
    customizeTextInStudio: "Customize Text in Studio",
    trendRadar: "AI Trend Radar",
    fulfillmentMargins: "Fulfillment & Margins",
    architecturalSurfaces: "Architectural Surfaces & Interiors",
    panoramicWallpaper: "Panoramic Wallpaper Mural",
    acrylicGlass: "High-Gloss Acrylic Glass",
    brushedAluminum: "Brushed Aluminum Dibond",
    woodPanels: "Natural Walnut Wood Panel",
    mihrabPanels: "Mihrab Architectural Wall Panels",
    windowFilms: "Mashrabiya Glass Window Films",
    cushionsDecor: "Luxury Silk & Velvet Cushions",
    aiInteriorAdvisor: "AI Interior Designer Advice",
  },
  fr: {
    shippingBanner: "Livraison Mondiale • Toile d'Art Qualité Musée 300 DPI • Intégrité des Textes Vérifiée par Tanzil",
    store: "Galerie de Luxe",
    b2b: "Espace B2B Institutionnel",
    roomSimulator: "Simulateur de Pièce IA",
    studio: "Studio de Création",
    connections: "Intégrations POD",
    fontEngine: "Moteur Typographique",
    techSpec: "Spécifications Techniques",
    heroSubtitle: "Typographie Sacrée • Maison d'Édition d'Art",
    heroTitle: "Transformez les Écritures Saintes en Œuvres d'Art de Musée",
    heroDesc: "Studio de design assisté par IA, validation cryptographique des versets Tanzil et impression d'art sur demande dans plus de 40 pays.",
    searchPlaceholder: "Rechercher une sourate, une traduction ou un style...",
    previewRoom: "Aperçu en Situation",
    openInStudio: "Ouvrir dans le Studio",
    addToCart: "Ajouter le Tableau Encadré au Panier",
    selectFrame: "Choisir le Style de Cadre",
    dimensions: "Dimensions de la Toile",
    units: "Unités",
    currency: "Devise",
    language: "Langue",
    customVerse: "Verset Personnalisé",
    tanzilVerified: "Certifié Tanzil",
    goldFoil: "Feuille d'Or 24K",
    walnut: "Noyer Américain",
    blackWood: "Bois Satiné Noir",
    oak: "Chêne Givré Naturel",
    cart: "Panier",
    wishlist: "Favoris",
    account: "Espace Client",
    guarantee: "Garantie Archivistique 100 Ans",
    allMasterpieces: "Toutes les Œuvres",
    moroccanSalon: "Salons Marocains",
    gulfMajlis: "Majlis du Golfe",
    andalusianMihrab: "Mihrabs Andalous",
    nordicVellum: "Vellum Nordique",
    verifiedScripture: "Écriture Sainte Vérifiée",
    totalFramedPrint: "Prix Total Encadré",
    customizeTextInStudio: "Personnaliser dans le Studio",
    trendRadar: "Radar de Tendances IA",
    fulfillmentMargins: "Livraison & Marges",
  },
  ar: {
    shippingBanner: "شحن عالمي • قماش فني فاخر جودة المتاحف 300 DPI • توثيق القرآني المعتمد من تنزيل",
    store: "المعرض الفني الفاخر",
    b2b: "منصة المؤسسات B2B",
    roomSimulator: "محاكي الغرف بالذكاء الاصطناعي",
    studio: "استوديو التصميم",
    connections: "التكامل والطباعة",
    fontEngine: "محرر الخطوط العربية",
    techSpec: "المواصفات التقنية",
    heroSubtitle: "الخط العربي المقدس • دار الطباعة الفاخرة",
    heroTitle: "تحويل الآيات القرآنية الكريمة إلى لوحات فنية جدارية فاخرة",
    heroDesc: "استوديو تصميم مدعوم بالذكاء الاصطناعي، توثيق آيات تنزيل المشفر، وشبكة طباعة فاخرة حسب الطلب عبر أكثر من 40 دولة.",
    searchPlaceholder: "ابحث عن سورة، ترجمة، أو نمط خطي...",
    previewRoom: "معاينة اللوحة في الغرفة",
    openInStudio: "فتح في استوديو التصميم",
    addToCart: "إضافة اللوحة المؤطرة إلى السلة",
    selectFrame: "اختر نوع الإطار الفاخر",
    dimensions: "أبعاد اللوحة",
    units: "الوحدات",
    currency: "العملة",
    language: "اللغة",
    customVerse: "آية مخصصة",
    tanzilVerified: "موثق من تنزيل",
    goldFoil: "رقائق الذهب عيار 24",
    walnut: "خشب الجوز الأمريكي",
    blackWood: "خشب أسود ملكي",
    oak: "خشب البلوط الطبيعي",
    cart: "السلة",
    wishlist: "المفضلة",
    account: "بوابة العملاء",
    guarantee: "ضمان حفظ الألوان 100 عام",
    allMasterpieces: "جميع اللوحات",
    moroccanSalon: "صالونات مغربية",
    gulfMajlis: "مجالس خاليجية",
    andalusianMihrab: "محاريب أندلسية",
    nordicVellum: "رق نورديك حديث",
    verifiedScripture: "نص قرآني موثق",
    totalFramedPrint: "إجمالي السعر مؤطر",
    customizeTextInStudio: "تعديل النص في الاستوديو",
    trendRadar: "رادار الاتجاهات بالذكاء الاصطناعي",
    fulfillmentMargins: "الشحن والأرباح",
  },
  de: {
    shippingBanner: "Weltweiter Versand • Museumsqulität 300 DPI Fine Art Leinwand • Tanzil-Verifizierte Heilige Schrift",
    store: "Luxus Galerie Shop",
    b2b: "Institutionelles B2B",
    roomSimulator: "KI Raum-Simulator",
    studio: "Canvas Studio",
    connections: "POD Anbindungen",
    fontEngine: "Schriftgenerator",
    techSpec: "Technische Spezifikation",
    heroSubtitle: "Heilige Typografie • Museums-Druckhaus",
    heroTitle: "Verwandeln Sie Heilige Schriften in Museumswürdige Wandkunst",
    heroDesc: "KI-gestütztes Designstudio, kryptografische Tanzil-Versvalidierung und erstklassiger Print-on-Demand-Versand in über 40 Länder.",
    searchPlaceholder: "Suche nach Sure, Übersetzung oder Stil...",
    previewRoom: "Raum Vorschau",
    openInStudio: "Im Studio öffnen",
    addToCart: "Gerahmtes Bild in den Warenkorb",
    selectFrame: "Rahmenstil Auswählen",
    dimensions: "Leinwand-Maße",
    units: "Einheiten",
    currency: "Währung",
    language: "Sprache",
    customVerse: "Eigener Vers",
    tanzilVerified: "Tanzil Verifiziert",
    goldFoil: "24K Blattgold",
    walnut: "Amerikanischer Walnuss",
    blackWood: "Schwarz Seidenholz",
    oak: "Natur Frosted Eiche",
    cart: "Warenkorb",
    wishlist: "Wunschliste",
    account: "Kundenkonto",
    guarantee: "100 Jahre Archivgarantie",
    allMasterpieces: "Alle Meisterwerke",
    moroccanSalon: "Marokkanische Salons",
    gulfMajlis: "Golf Majlis",
    andalusianMihrab: "Andalusische Mihrabs",
    nordicVellum: "Nordisches Pergament",
    verifiedScripture: "Geprüfte Heilige Schrift",
    totalFramedPrint: "Gesamtpreis Gerahmt",
    customizeTextInStudio: "Im Studio Anpassen",
    trendRadar: "KI-Trend-Radar",
    fulfillmentMargins: "Versand & Margen",
  },
  es: {
    shippingBanner: "Envío Mundial • Lienzo de Calidad de Museo 300 DPI • Integridad Escritural Verificada por Tanzil",
    store: "Galería de Lujo",
    b2b: "B2B Institucional",
    roomSimulator: "Simulador de Espacios IA",
    studio: "Estudio de Diseño",
    connections: "Conexiones POD",
    fontEngine: "Motor Tipográfico",
    techSpec: "Especificaciones Técnicas",
    heroSubtitle: "Tipografía Sagrada • Casa de Impresión de Arte",
    heroTitle: "Transforme Sagradas Escrituras en Arte de Galería para su Hogar",
    heroDesc: "Estudio de diseño con IA, validación criptográfica de versos por Tanzil e impresión de arte bajo demanda en más de 40 países.",
    searchPlaceholder: "Buscar Sura, traducción o estilo...",
    previewRoom: "Vista Previa en Habitación",
    openInStudio: "Abrir en el Estudio",
    addToCart: "Añadir Cuadro Enmarcado al Carrito",
    selectFrame: "Seleccionar Estilo de Marco",
    dimensions: "Dimensiones del Lienzo",
    units: "Unidades",
    currency: "Moneda",
    language: "Idioma",
    customVerse: "Versículo Personalizado",
    tanzilVerified: "Verificado por Tanzil",
    goldFoil: "Pan de Oro de 24K",
    walnut: "Nogal Americano",
    blackWood: "Madera Satinada Negra",
    oak: "Roble Natural",
    cart: "Carrito",
    wishlist: "Lista de Deseos",
    account: "Portal de Cliente",
    guarantee: "Garantía de Archivo de 100 Años",
    allMasterpieces: "Todas las Obras",
    moroccanSalon: "Salones Marroquíes",
    gulfMajlis: "Majlis del Golfo",
    andalusianMihrab: "Mihrabs Andaluces",
    nordicVellum: "Pergamino Nórdico",
    verifiedScripture: "Escritura Sagrada Verificada",
    totalFramedPrint: "Precio Total Enmarcado",
    customizeTextInStudio: "Personalizar Texto en Estudio",
    trendRadar: "Radar de Tendencias IA",
    fulfillmentMargins: "Producción y Márgenes",
  },
  it: {
    shippingBanner: "Spedizione Mondiale • Tela Fine Art 300 DPI Qualità Museo • Integrità del Testo Verificata Tanzil",
    store: "Galleria di Lusso",
    b2b: "Portale B2B Istituzionale",
    roomSimulator: "Simulatore di Stanza IA",
    studio: "Studio di Design",
    connections: "Integrazioni POD",
    fontEngine: "Motore Tipografico",
    techSpec: "Specifiche Tecniche",
    heroSubtitle: "Tipografia Sacra • Casa d'Arte Fine Art",
    heroTitle: "Trasforma le Sacre Scritture in Opere d'Arte da Museo",
    heroDesc: "Studio di progettazione guidato dall'IA, verifica crittografica delle sure Tanzil e stampa d'arte su richiesta in oltre 40 paesi.",
    searchPlaceholder: "Cerca Sura, traduzione o stile...",
    previewRoom: "Anteprima nella Stanza",
    openInStudio: "Apri nello Studio",
    addToCart: "Aggiungi Quadro Incorniciato al Carrello",
    selectFrame: "Seleziona Stile di Cornice",
    dimensions: "Dimensioni Tela",
    units: "Unità",
    currency: "Valuta",
    language: "Lingua",
    customVerse: "Versetto Personalizzato",
    tanzilVerified: "Verificato Tanzil",
    goldFoil: "Foglia d'Oro 24K",
    walnut: "Noche Americano",
    blackWood: "Legno Satinato Nero",
    oak: "Rovere Naturale",
    cart: "Carrello",
    wishlist: "Preferiti",
    account: "Area Clienti",
    guarantee: "Garanzia di Conservazione 100 Anni",
    allMasterpieces: "Tutti i Capolavori",
    moroccanSalon: "Saloni Marocchini",
    gulfMajlis: "Majlis del Golfo",
    andalusianMihrab: "Mihrab Andalusi",
    nordicVellum: "Pergamena Nordica",
    verifiedScripture: "Scrittura Sacra Verificata",
    totalFramedPrint: "Prezzo Totale Incorniciato",
    customizeTextInStudio: "Personalizza Testo nello Studio",
    trendRadar: "Radar Tendenze IA",
    fulfillmentMargins: "Spedizione e Margini",
  },
  ru: {
    shippingBanner: "Мировая доставка • Музейный холст 300 DPI • Гарантия точности текстов от Tanzil",
    store: "Галерея Роскоши",
    b2b: "Корпоративный B2B",
    roomSimulator: "ИИ Симулятор Интерьера",
    studio: "Студия Дизайна",
    connections: "Печать и Интеграции",
    fontEngine: "Шрифтовой Движок",
    techSpec: "Технические Данные",
    heroSubtitle: "Священная Каллиграфия • Музейная Печать",
    heroTitle: "Превратите Священные Писания в Музейное Искусство для Дома",
    heroDesc: "Студия дизайна с ИИ, криптографическая проверка сур Tanzil и высококлассная печать по запросу с доставкой в 40+ стран.",
    searchPlaceholder: "Поиск суры, перевода или стиля...",
    previewRoom: "Примерить в Интерьере",
    openInStudio: "Открыть в Студии",
    addToCart: "Добавить Картину в Корзину",
    selectFrame: "Выберите Тип Багета",
    dimensions: "Размеры Холста",
    units: "Единицы",
    currency: "Валюта",
    language: "Язык",
    customVerse: "Свой Аят",
    tanzilVerified: "Проверено Tanzil",
    goldFoil: "Сусальное Золото 24K",
    walnut: "Американский Орех",
    blackWood: "Черное Сатиновое Дерево",
    oak: "Натуральный Дуб",
    cart: "Корзина",
    wishlist: "Избранное",
    account: "Кабинет Клиента",
    guarantee: "100 Лет Гарантии Цвета",
    allMasterpieces: "Все Шедевры",
    moroccanSalon: "Марокканские Салоны",
    gulfMajlis: "Меджлисы Персидского Залива",
    andalusianMihrab: "Андалузские Михрабы",
    nordicVellum: "Скандинавский Веллум",
    verifiedScripture: "Проверенный Священный Текст",
    totalFramedPrint: "Итого в Раме",
    customizeTextInStudio: "Настроить в Студии",
    trendRadar: "ИИ Радар Трендов",
    fulfillmentMargins: "Логистика и Прибыль",
  },
  tr: {
    shippingBanner: "Dünya Çapında Kargo • Müze Kalitesinde 300 DPI Kanvas • Tanzil Onaylı Ayet Doğruluğu",
    store: "Lüks Galeri Mağazası",
    b2b: "Kurumsal B2B Portal",
    roomSimulator: "Yapay Zeka Oda Simülatörü",
    studio: "Tasarım Stüdyosu",
    connections: "Baskı Entegrasyonları",
    fontEngine: "Hüsn-i Hat Motoru",
    techSpec: "Teknik Özellikler",
    heroSubtitle: "Kutsal Hat Sanatı • Müze Baskı Evi",
    heroTitle: "Kutsal Ayetleri Müze Kalitesinde Duvar Sanatına Dönüştürün",
    heroDesc: "Yapay zeka destekli tasarım stüdyosu, Tanzil onaylı ayet doğrulama ve 40'tan fazla ülkeye lüks isteğe bağlı baskı gönderimi.",
    searchPlaceholder: "Sure, meal veya hat stili ara...",
    previewRoom: "Odamda Gör",
    openInStudio: "Stüdyoda Aç",
    addToCart: "Çerçeveli Kanvası Sepete Ekle",
    selectFrame: "Çerçeve Stilini Seç",
    dimensions: "Kanvas Boyutları",
    units: "Birimler",
    currency: "Para Birimi",
    language: "Dil",
    customVerse: "Özel Ayet",
    tanzilVerified: "Tanzil Onaylı",
    goldFoil: "24K Altın Varak",
    walnut: "Amerikan Cevizi",
    blackWood: "Siyah Saten Ahşap",
    oak: "Doğal Meşe",
    cart: "Sepet",
    wishlist: "Favoriler",
    account: "Müşteri Portalı",
    guarantee: "100 Yıl Solmazlık Garantisi",
    allMasterpieces: "Tüm Eserler",
    moroccanSalon: "Fas Salonları",
    gulfMajlis: "Körfez Meclisleri",
    andalusianMihrab: "Endülüs Mihrapları",
    nordicVellum: "İskandinav Parşömen",
    verifiedScripture: "Onaylı Kutsal Metin",
    totalFramedPrint: "Çerçeveli Toplam Fiyat",
    customizeTextInStudio: "Stüdyoda Özelleştir",
    trendRadar: "Yapay Zeka Trend Radarı",
    fulfillmentMargins: "Kargo ve Karlılık",
  },
  fa: {
    shippingBanner: "ارسال به سراسر جهان • بوم هنری فاخر ۳۰۰ DPI کیفیت موزه • صحت سنجی قرآن تنزیل",
    store: "گالری فاخر آرت",
    b2b: "پرتال سازمانی B2B",
    roomSimulator: "شبیه ساز دکوراسیون هوشمند",
    studio: "استودیو طراحی بوم",
    connections: "اتصالات چاپ",
    fontEngine: "موتور خوشنویسی",
    techSpec: "مشخصات فنی",
    heroSubtitle: "خوشنویسی مقدس • دارالطباعه موزه ای",
    heroTitle: "تبدیل آیات شریف قرآن به تابلوهای هنری فاخر موزه ای",
    heroDesc: "استودیو طراحی هوشمند، تاییدیه مشفر آیات تنزیل و چاپ فاخر سفارشی با ارسال به بیش از ۴۰ کشور.",
    searchPlaceholder: "جستجوی سوره، ترجمه یا سبک خط...",
    previewRoom: "پیش‌نمایش در دکوراسیون",
    openInStudio: "باز کردن در استودیو",
    addToCart: "افزودن تابلوی قاب‌دار به سبد خرید",
    selectFrame: "انتخاب سبک قاب فاخر",
    dimensions: "ابعاد بوم",
    units: "واحدها",
    currency: "ارز",
    language: "زبان",
    customVerse: "آیه سفارشی",
    tanzilVerified: "تایید شده تنزیل",
    goldFoil: "ورق طلای ۲۴ عیار",
    walnut: "گردوی آمریکایی",
    blackWood: "چوب مشکی سلطنتی",
    oak: "چوب بلوط طبیعی",
    cart: "سبد خرید",
    wishlist: "علاقه‌مندی‌ها",
    account: "پرتال مشتریان",
    guarantee: "ضمانت ماندگاری ۱۰۰ ساله رنگ",
    allMasterpieces: "همه آثار فاخر",
    moroccanSalon: "سالن‌های مراکشی",
    gulfMajlis: "مجالس خلیجی",
    andalusianMihrab: "محراب‌های اندلسی",
    nordicVellum: "پوست آهوی مدرن",
    verifiedScripture: "متن مقدس تایید شده",
    totalFramedPrint: "قیمت کل با قاب",
    customizeTextInStudio: "ویرایش متن در استودیو",
    trendRadar: "رادار ترندهای هوش مصنوعی",
    fulfillmentMargins: "ارسال و سودآوری",
  },
  prs: {
    shippingBanner: "ارسال به سراسر جهان • بوم هنری ۳۰۰ DPI موزه ای • صحت سنجی قرآن کریم تنزیل",
    store: "گالری فاخر",
    b2b: "پرتال B2B نهادها",
    roomSimulator: "شبیه‌ساز دکوراسیون",
    studio: "استودیوی دیزاین",
    connections: "اتصالات چاپ",
    fontEngine: "موتور خطاطی",
    techSpec: "مشخصات تخنیکی",
    heroSubtitle: "خوشنویسی مقدس • چاپخانه موزه‌ای",
    heroTitle: "تبدیل آیات مبارک قرآن به تابلوهای دیواری فاخر",
    heroDesc: "استودیوی دیزاین هوشمند، تاییدیه آیات تنزیل و چاپ اختصاصی با ارسال به ۴۰+ کشور جهان.",
    searchPlaceholder: "جستجوی سوره، ترجمه یا سبک...",
    previewRoom: "دیدن در اتاق",
    openInStudio: "باز کردن در استودیو",
    addToCart: "اضافه کردن به سبد خرید",
    selectFrame: "انتخاب نوع چوکات",
    dimensions: "اندازه‌های بوم",
    units: "واحدها",
    currency: "ارز",
    language: "زبان",
    customVerse: "آیت سفارشی",
    tanzilVerified: "تایید شده تنزیل",
    goldFoil: "ورق طلای ۲۴ عیار",
    walnut: "چوب چنار/گردو",
    blackWood: "چوب سیاه چرمی",
    oak: "چوب بلوط",
    cart: "سبد خرید",
    wishlist: "پسندیده‌ها",
    account: "حساب مشتری",
    guarantee: "تضمین ۱۰۰ ساله رنگ",
    allMasterpieces: "همه شاهکارها",
    moroccanSalon: "صالون‌های مراکشی",
    gulfMajlis: "مجلس‌های خلیجی",
    andalusianMihrab: "محراب‌های اندلسی",
    nordicVellum: "پوست آهوی نوردیک",
    verifiedScripture: "متن مقدس تایید شده",
    totalFramedPrint: "قیمت مکمل با چوکات",
    customizeTextInStudio: "تغییر متن در استودیو",
    trendRadar: "رادار هوش مصنوعی",
    fulfillmentMargins: "ارسال و مفاد",
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguageByCode: (code: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  unit: 'cm' | 'in';
  setUnit: (u: 'cm' | 'in') => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
  formatPrice: (priceUSD: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ayatprint_lang');
    if (saved) {
      const found = SUPPORTED_LANGUAGES.find(l => l.code === saved);
      if (found) return found;
    }
    // Auto-detect browser language
    const navLang = navigator.language.split('-')[0].toLowerCase();
    const matched = SUPPORTED_LANGUAGES.find(l => l.code === navLang);
    return matched || SUPPORTED_LANGUAGES[0];
  });

  const [currency, setCurrency] = useState<string>(currentLanguage.defaultCurrency);
  const [unit, setUnit] = useState<'cm' | 'in'>(currentLanguage.defaultUnit);

  useEffect(() => {
    // Update HTML dir and lang attributes for full CSS & Layout mirroring
    document.documentElement.dir = currentLanguage.dir;
    document.documentElement.lang = currentLanguage.code;
    
    // Add RTL class on body for Tailwind targetting if needed
    if (currentLanguage.dir === 'rtl') {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }

    localStorage.setItem('ayatprint_lang', currentLanguage.code);
  }, [currentLanguage]);

  const setLanguageByCode = (code: string) => {
    const found = SUPPORTED_LANGUAGES.find(l => l.code === code);
    if (found) {
      setCurrentLanguage(found);
      setCurrency(found.defaultCurrency);
      setUnit(found.defaultUnit);
    }
  };

  const t = (key: TranslationKey): string => {
    const langDict = TRANSLATIONS[currentLanguage.code as keyof typeof TRANSLATIONS];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return TRANSLATIONS.en[key] || key;
  };

  const isRTL = currentLanguage.dir === 'rtl';

  const formatPrice = (priceUSD: number): string => {
    let converted = priceUSD;
    let symbol = '$';
    switch (currency) {
      case 'EUR':
        converted = priceUSD * 0.92;
        symbol = '€';
        break;
      case 'SAR':
        converted = priceUSD * 3.75;
        symbol = '﷼';
        break;
      case 'TRY':
        converted = priceUSD * 32.5;
        symbol = '₺';
        break;
      case 'AED':
        converted = priceUSD * 3.67;
        symbol = 'د.إ';
        break;
      case 'GBP':
        converted = priceUSD * 0.79;
        symbol = '£';
        break;
      default:
        symbol = currentLanguage.currencySymbol || '$';
    }

    const rounded = Math.round(converted);
    if (isRTL) {
      return `${rounded} ${symbol}`;
    }
    return `${symbol}${rounded}`;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguageByCode,
      currency,
      setCurrency,
      unit,
      setUnit,
      t,
      isRTL,
      formatPrice
    }}>
      <div dir={currentLanguage.dir} className={isRTL ? 'font-serif-rtl' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
