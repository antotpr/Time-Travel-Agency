// Les images sont chargées dynamiquement par src/utils/images.js (import.meta.glob).
// Pas d'import statique ici pour éviter les erreurs de build si les fichiers sont absents.
// → Placer les images dans : src/assets/{id}/{id}-card.jpeg  etc.

export const destinations = [
  {
    id: "egypt",
    name: "Égypte Ancienne",
    period: "-3200 à -30 av. J.-C.",
    shortDesc: "Mystère, temples millénaires et grandeur pharaonique au bord du Nil.",
    description: "Traversez les millénaires pour fouler les sables sacrés de l'Égypte ancienne. Assistez à la construction des pyramides, naviguez sur le Nil et pénétrez les secrets des temples de Karnak sous la guidance de nos experts temporels certifiés.",
    price: "8 900 €",
    risk: "Modéré",
    riskColor: "#e0a840",
    duration: "7 jours",
    highlights: [
      "Visite des pyramides de Gizeh",
      "Navigation sacrée sur le Nil",
      "Temples de Louxor et Karnak",
      "Audience avec les grands prêtres",
    ],
    tips: "Portez des vêtements légers en lin. Évitez les contacts prolongés avec les gardes du temple. Ne photographiez jamais les cérémonies rituelles sans permission.",
    outfit: "Tunique en lin blanc, sandales en cuir, coiffe protectrice",
    immersion: 92,
    colors: { primary: "#c9a84c", secondary: "#1a3a5c", accent: "#40bcd8" },
    gradient: "from-[#1a1200] via-[#2a1e00] to-[#08090f]",
    cardGradient: "linear-gradient(135deg, #1a1200 0%, #2a1e00 50%, #08090f 100%)",
    glowColor: "rgba(201, 168, 76, 0.25)",
    emoji: "🏺",
    // Images — placer dans src/assets/egypt/
    // egypt-hero.jpeg, egypt-card.jpeg, egypt-detail.jpeg
    imageAlt: "Pyramides et temples de l'Égypte ancienne",
  },
  {
    id: "rome",
    name: "Empire Romain",
    period: "Ier siècle av. J.-C. — IIe ap. J.-C.",
    shortDesc: "Puissance, stratégie et grandeur impériale dans la Ville Éternelle.",
    description: "Foulez les pavés du Forum Romain, assistez aux jeux spectaculaires du Colisée et côtoyez les grands stratèges de l'Empire. Rome vous attend à son apogée absolue, dans toute sa gloire et sa brutalité civilisatrice.",
    price: "7 500 €",
    risk: "Élevé",
    riskColor: "#e05030",
    duration: "5 jours",
    highlights: [
      "Jeux épiques au Colisée",
      "Session au Sénat romain",
      "Forum de Trajan",
      "Bains thermaux impériaux",
    ],
    tips: "Parlez peu et adoptez une posture assurée. Évitez les nuits près du Tibre. Portez toujours votre brassard d'identification temporelle.",
    outfit: "Toge blanche ou tunique de laine, sandales romaines caliga, cape",
    immersion: 88,
    colors: { primary: "#c0392b", secondary: "#4a3728", accent: "#d4a45a" },
    gradient: "from-[#1a0500] via-[#2a1500] to-[#08090f]",
    cardGradient: "linear-gradient(135deg, #1a0500 0%, #2a1500 50%, #08090f 100%)",
    glowColor: "rgba(192, 57, 43, 0.25)",
    emoji: "⚔️",
    // Images — placer dans src/assets/rome/
    // rome-hero.jpeg, rome-card.jpeg, rome-detail.jpeg
    imageAlt: "Colisée et Forum Romain de l'Empire Romain",
  },
  {
    id: "japan",
    name: "Japon Féodal",
    period: "XIIe — XVIIe siècle",
    shortDesc: "Samouraïs, cerisiers en fleurs et esthétique zen entre deux mondes.",
    description: "Découvrez le Japon dans toute sa splendeur féodale. Visitez les sanctuaires shinto millénaires, observez les samouraïs à l'entraînement au crépuscule et contemplez le Mont Fuji depuis les rizières en terrasse.",
    price: "9 200 €",
    risk: "Faible",
    riskColor: "#2ecc71",
    duration: "8 jours",
    highlights: [
      "Sanctuaires shinto de Kyoto",
      "Cérémonie du thé traditionnelle",
      "Observation des samouraïs",
      "Contemplation du Mont Fuji",
    ],
    tips: "Inclinez-vous toujours en signe de respect. Ne jamais tourner le dos à un samouraï. La discrétion est votre meilleure protection.",
    outfit: "Kimono de voyage en soie, obi, geta (sandales en bois de paulownia)",
    immersion: 95,
    colors: { primary: "#d4a0b0", secondary: "#1a2a3a", accent: "#e03030" },
    gradient: "from-[#0a0514] via-[#140a1a] to-[#08090f]",
    cardGradient: "linear-gradient(135deg, #0a0514 0%, #140a1a 50%, #08090f 100%)",
    glowColor: "rgba(212, 160, 176, 0.25)",
    emoji: "⛩️",
    // Images — placer dans src/assets/japan/
    // japan-hero.jpeg, japan-card.jpeg, japan-detail.jpeg
    imageAlt: "Sanctuaires et cerisiers du Japon Féodal",
  },
]

export const quizQuestions = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    answers: [
      { text: "Mystère et exploration", icon: "🔮", dest: "egypt" },
      { text: "Puissance et stratégie", icon: "⚔️", dest: "rome" },
      { text: "Calme et esthétique", icon: "🌸", dest: "japan" },
    ],
  },
  {
    id: 2,
    question: "Quel décor vous attire le plus ?",
    answers: [
      { text: "Temples, pyramides et désert", icon: "🏺", dest: "egypt" },
      { text: "Arènes, forums et cités antiques", icon: "🏛️", dest: "rome" },
      { text: "Sanctuaires, montagnes et cerisiers", icon: "⛩️", dest: "japan" },
    ],
  },
  {
    id: 3,
    question: "Votre rythme idéal ?",
    answers: [
      { text: "Immersif et contemplatif", icon: "🌅", dest: "egypt" },
      { text: "Intense et spectaculaire", icon: "🔥", dest: "rome" },
      { text: "Équilibré et spirituel", icon: "🍃", dest: "japan" },
    ],
  },
  {
    id: 4,
    question: "Votre profil de voyageur ?",
    answers: [
      { text: "Explorateur curieux", icon: "🧭", dest: "egypt" },
      { text: "Stratège ambitieux", icon: "🦅", dest: "rome" },
      { text: "Esthète discipliné", icon: "🎋", dest: "japan" },
    ],
  },
]
