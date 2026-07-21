import { QuranVerse, CanvasPreset, MockupScene } from '../types/quran';

export const POPULAR_VERSES: QuranVerse[] = [
  {
    id: 'ayat-al-kursi',
    surah: 2,
    ayah: '255',
    surahNameArabic: 'البقرة',
    surahNameEnglish: 'Al-Baqarah',
    arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    englishTranslation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta’khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-’ard...',
    meaningCategory: 'Protection & Majesty',
    recommendedLayout: 'Circular Thuluth',
    juz: 3,
    hizb: 5,
    revelationType: 'Madani'
  },
  {
    id: 'ar-rahman-verse',
    surah: 55,
    ayah: '13',
    surahNameArabic: 'الرحمن',
    surahNameEnglish: 'Ar-Rahman',
    arabicText: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
    englishTranslation: 'So which of the favors of your Lord would you deny?',
    transliteration: 'Fabi-ayyi ala-i Rabbikuma tukazziban',
    meaningCategory: 'Gratitude',
    recommendedLayout: 'Flowing Diwani',
    juz: 27,
    hizb: 54,
    revelationType: 'Makki'
  },
  {
    id: 'ash-sharh-ease',
    surah: 94,
    ayah: '5-6',
    surahNameArabic: 'الشرح',
    surahNameEnglish: 'Ash-Sharh',
    arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۞ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    englishTranslation: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease.',
    transliteration: 'Fa inna ma\'al \'usri yusra. Inna ma\'al \'usri yusra.',
    meaningCategory: 'Patience & Hope',
    recommendedLayout: 'Modern Minimal',
    juz: 30,
    hizb: 60,
    revelationType: 'Makki'
  },
  {
    id: 'al-fatiha-full',
    surah: 1,
    ayah: '1-7',
    surahNameArabic: 'الفاتحة',
    surahNameEnglish: 'Al-Fatiha',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۞ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۞ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    englishTranslation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
    transliteration: 'Bismillahir-Rahmanir-Rahim. Al-hamdu lillahi Rabbil-\'alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din...',
    meaningCategory: 'Guidance & Prayer',
    recommendedLayout: 'Majestic Kufic',
    juz: 1,
    hizb: 1,
    revelationType: 'Makki'
  },
  {
    id: 'al-ikhlas-full',
    surah: 112,
    ayah: '1-4',
    surahNameArabic: 'الإخلاص',
    surahNameEnglish: 'Al-Ikhlas',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    englishTranslation: 'Say, "He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent."',
    transliteration: 'Qul huwal-lahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.',
    meaningCategory: 'Monotheism (Tawhid)',
    recommendedLayout: 'Geometric Circle',
    juz: 30,
    hizb: 60,
    revelationType: 'Makki'
  },
  {
    id: 'al-ikhlas-crown',
    surah: 3,
    ayah: '173',
    surahNameArabic: 'آل عمران',
    surahNameEnglish: 'Ali \'Imran',
    arabicText: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    englishTranslation: 'Sufficient for us is Allah, and [He is] the best Disposer of affairs.',
    transliteration: 'Hasbunallahu wa ni\'mal wakil',
    meaningCategory: 'Trust (Tawakkul)',
    recommendedLayout: 'Thuluth Crest',
    juz: 4,
    hizb: 7,
    revelationType: 'Madani'
  },
  {
    id: 'al-qalam-nazar',
    surah: 68,
    ayah: '51-52',
    surahNameArabic: 'القلم',
    surahNameEnglish: 'Al-Qalam',
    arabicText: 'وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ لَمَّا سَمِعُوا الذِّكْرَ وَيَقُولُونَ إِنَّهُ لَمَجْنُونٌ ۞ وَمَا هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ',
    englishTranslation: 'And indeed, those who disbelieve would almost make you slip with their eyes when they hear the message, and they say, "Indeed, he is mad." But it is not except a reminder to the worlds.',
    transliteration: 'Wa in yakadul-lazina kafaru layuzliqunaka bi absarihim lamma sami\'ud-dhikra...',
    meaningCategory: 'Protection (Nazar)',
    recommendedLayout: 'Classical Canvas',
    juz: 29,
    hizb: 57,
    revelationType: 'Makki'
  }
];

export const CANVAS_PRESETS: CanvasPreset[] = [
  {
    id: 'emerald-gold',
    name: 'Emerald & Gold Luxury',
    bgGradient: 'from-emerald-950 via-emerald-900 to-emerald-950',
    bgColor: '#022c22',
    textColor: '#fcd34d', // Amber 300
    accentColor: '#fbbf24', // Amber 400
    ornamentColor: '#f59e0b', // Amber 500
    texture: 'emerald-silk',
    fontFamily: 'Amiri'
  },
  {
    id: 'charcoal-ivory',
    name: 'Nordic Charcoal & Ivory',
    bgGradient: 'from-neutral-900 via-stone-800 to-neutral-900',
    bgColor: '#171717',
    textColor: '#f5f5f4', // Stone 100
    accentColor: '#d6d3d1', // Stone 300
    ornamentColor: '#78716c', // Stone 500
    texture: 'textured-paper',
    fontFamily: 'Montserrat'
  },
  {
    id: 'alabaster-gold',
    name: 'Alabaster Marble & Gold',
    bgGradient: 'from-stone-50 via-neutral-100 to-stone-50',
    bgColor: '#fafaf9',
    textColor: '#1c1917', // Stone 900
    accentColor: '#b45309', // Amber 700
    ornamentColor: '#d97706', // Amber 600
    texture: 'marble',
    fontFamily: 'Scheherazade New'
  },
  {
    id: 'sapphire-silver',
    name: 'Sapphire & Silver Majesty',
    bgGradient: 'from-blue-950 via-slate-900 to-blue-950',
    bgColor: '#172554',
    textColor: '#e2e8f0', // Slate 200
    accentColor: '#94a3b8', // Slate 400
    ornamentColor: '#cbd5e1', // Slate 300
    texture: 'gold-foil',
    fontFamily: 'Reem Kufi'
  },
  {
    id: 'minimal-beige',
    name: 'Warm Scandinavian Minimal',
    bgGradient: 'from-stone-100 via-orange-50/30 to-stone-100',
    bgColor: '#f5f5f4',
    textColor: '#292524',
    accentColor: '#78716c',
    ornamentColor: '#a8a29e',
    texture: 'none',
    fontFamily: 'Inter'
  }
];

import moroccanSalonImg from '../assets/images/moroccan_salon_mockup_1784654852263.jpg';
import gulfMajlisImg from '../assets/images/gulf_majlis_mockup_1784654869324.jpg';

export const MOCKUP_SCENES: MockupScene[] = [
  {
    id: 'salon-marocain-luxury',
    name: 'Salon Marocain (Traditional Moroccan Lounge)',
    imageUrl: moroccanSalonImg,
    canvasX: '37%',
    canvasY: '20%',
    canvasW: '26%',
    canvasH: '34%',
    shadow: 'shadow-2xl shadow-black/85',
    rotation: 'rotate-0'
  },
  {
    id: 'moyen-orient-majlis',
    name: 'Moyen-Orient Luxury Majlis (Gulf Interior)',
    imageUrl: gulfMajlisImg,
    canvasX: '37.5%',
    canvasY: '21%',
    canvasW: '25%',
    canvasH: '33%',
    shadow: 'shadow-2xl shadow-black/80',
    rotation: 'rotate-0'
  },
  {
    id: 'living-room-luxury',
    name: 'Luxury Living Room (Gold Accents)',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    canvasX: '36.5%',
    canvasY: '24%',
    canvasW: '27%',
    canvasH: '36%',
    shadow: 'shadow-2xl shadow-black/80',
    rotation: 'rotate-0'
  },
  {
    id: 'living-room-modern',
    name: 'Modern Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    canvasX: '38%',
    canvasY: '19%',
    canvasW: '24%',
    canvasH: '32%',
    shadow: 'shadow-2xl shadow-stone-800/60',
    rotation: 'rotate-0'
  },
  {
    id: 'scandinavian-interior',
    name: 'Scandinavian Interior',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200',
    canvasX: '37%',
    canvasY: '16%',
    canvasW: '26%',
    canvasH: '34%',
    shadow: 'shadow-xl shadow-stone-900/50',
    rotation: 'rotate-0'
  },
  {
    id: 'minimal-office',
    name: 'Minimal Office',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    canvasX: '42%',
    canvasY: '18%',
    canvasW: '24%',
    canvasH: '32%',
    shadow: 'shadow-2xl shadow-stone-950/60',
    rotation: 'rotate-0'
  },
  {
    id: 'executive-office',
    name: 'Executive Office',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    canvasX: '38%',
    canvasY: '21%',
    canvasW: '24%',
    canvasH: '32%',
    shadow: 'shadow-2xl shadow-stone-900/50',
    rotation: 'rotate-0'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
    canvasX: '39%',
    canvasY: '18%',
    canvasW: '22%',
    canvasH: '29%',
    shadow: 'shadow-xl shadow-black/60',
    rotation: '-rotate-1'
  },
  {
    id: 'nursery',
    name: 'Nursery',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200',
    canvasX: '35%',
    canvasY: '22%',
    canvasW: '30%',
    canvasH: '38%',
    shadow: 'shadow-xl shadow-amber-950/40',
    rotation: 'rotate-0'
  },
  {
    id: 'prayer-room',
    name: 'Prayer Room',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    canvasX: '38%',
    canvasY: '18%',
    canvasW: '24%',
    canvasH: '32%',
    shadow: 'shadow-2xl shadow-stone-900/40',
    rotation: 'rotate-0'
  },
  {
    id: 'mosque',
    name: 'Mosque',
    imageUrl: 'https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=1200',
    canvasX: '36%',
    canvasY: '20%',
    canvasW: '28%',
    canvasH: '36%',
    shadow: 'shadow-2xl shadow-stone-950/70',
    rotation: 'rotate-0'
  },
  {
    id: 'islamic-center',
    name: 'Islamic Center',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200',
    canvasX: '35%',
    canvasY: '22%',
    canvasW: '30%',
    canvasH: '40%',
    shadow: 'shadow-2xl shadow-amber-950/40',
    rotation: 'rotate-0'
  },
  {
    id: 'hallway',
    name: 'Hallway',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    canvasX: '42%',
    canvasY: '25%',
    canvasW: '20%',
    canvasH: '35%',
    shadow: 'shadow-2xl shadow-stone-900/60',
    rotation: 'rotate-0'
  },
  {
    id: 'gallery-wall',
    name: 'Gallery Wall',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
    canvasX: '36%',
    canvasY: '20%',
    canvasW: '28%',
    canvasH: '38%',
    shadow: 'shadow-2xl shadow-stone-950/65',
    rotation: 'rotate-0'
  }
];

export const ORNAMENT_SVGS = {
  arches: [
    {
      id: 'mihrab-arch',
      name: 'Mihrab Classic Arch',
      path: 'M 50,5 C 20,5 5,25 5,50 L 5,95 L 95,95 L 95,50 C 95,25 80,5 50,5 Z',
      viewBox: '0 0 100 100'
    },
    {
      id: 'moroccan-arch',
      name: 'Moroccan Pointed Arch',
      path: 'M 50,5 C 35,5 25,18 5,35 L 5,95 L 95,95 L 95,35 C 75,18 65,5 50,5 Z',
      viewBox: '0 0 100 100'
    }
  ],
  corners: [
    {
      id: 'arabesque-corner-1',
      name: 'Arabesque Vintage Corner',
      path: 'M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z',
      viewBox: '0 0 100 100'
    }
  ],
  medallions: [
    {
      id: 'eight-point-star',
      name: 'Andalussian 8-Point Star',
      path: 'M 50,5 L 63,22 L 85,22 L 77,44 L 95,50 L 77,56 L 85,78 L 63,78 L 50,95 L 37,78 L 15,78 L 23,56 L 5,50 L 23,44 L 15,22 L 37,22 Z',
      viewBox: '0 0 100 100'
    }
  ]
};
