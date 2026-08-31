// =========================================================================
// 💖 FICHIER DE PERSONNALISATION - NOTRE ESPACE AMOUREUX 💖
// Modifie facilement les textes, dates, questions et lettres ci-dessous !
// =========================================================================

export const loveConfig = {
  // --- 1. Informations du couple ---
  partnerName: "Mon Cœur",        // Le prénom ou surnom de ta petite amie
  senderName: "Ton Amoureux",     // Ton prénom ou surnom
  relationTitle: "Notre Histoire d'Amour ✨",
  subtitle: "Un petit coin secret créé rien que pour toi, avec tout mon amour.",
  
  // Date de début de relation (Format: AAAA-MM-JJ ou AAAA-MM-JJTHH:MM:SS)
  // Ajuste cette date pour que le compteur soit 100% exact !
  startDate: "2023-06-14T20:00:00", 
  
  // Petit message d'accueil
  welcomeBadge: "Spécialement pour la femme de ma vie ❤️",
  
  // --- 2. Compliments aléatoires (Bouton "Dose d'Amour") ---
  sweetWords: [
    "Ton sourire illumine littéralement toutes mes journées.",
    "Tu es la plus belle chose qui me soit arrivée dans cette vie.",
    "J'adore la façon dont tes yeux pétillent quand tu es passionnée.",
    "Chaque seconde passée avec toi est mon moment préféré.",
    "Tu es mon refuge, mon rire et ma plus belle aventure.",
    "Même le plus beau coucher de soleil est fade à côté de ta beauté.",
    "Tu as ce super-pouvoir de rendre tout magique autour de toi.",
    "Je t'aimais hier, je t'aime aujourd'hui, et je t'aimerai encore plus demain."
  ],

  // --- 3. La Boîte à Lettres & Messages Secrets (Love Capsule) ---
  capsules: [
    {
      id: "bad-day",
      tag: "Ouvre quand...",
      title: "Tu passes une mauvaise journée",
      subtitle: "Un câlin virtuel et un rappel de ta force 🌧️➡️🌈",
      category: "Réconfort",
      color: "from-amber-500 to-rose-500",
      accentColor: "#f59e0b",
      icon: "Sun",
      isWaxSealed: true,
      audioVibe: "Pluie douce & Piano",
      letter: {
        date: "Pour les jours gris",
        salutation: "Ma princesse adorée,",
        paragraphs: [
          "Si tu lis cette lettre, c'est que la journée a été lourde, fatigante ou que les choses ne se sont pas passées comme tu le voulais. Respire un grand coup, relâche tes épaules.",
          "Je veux juste te rappeler à quel point tu es une personne forte, incroyable et lumineuse. Même les tempêtes les plus sombres finissent toujours par laisser place au soleil.",
          "Tu as le droit d'être fatiguée, tu as le droit de faire une pause. Ferme les yeux et imagine-toi dans mes bras : je te serre fort et rien ne peut t'atteindre.",
          "Tout va bien se passer, mon amour. Je crois en toi, je suis là pour toi, quoi qu'il arrive. Ce soir, détends-toi, je m'occupe de tout."
        ],
        signature: "Ton plus grand soutien, pour toujours ❤️"
      }
    },
    {
      id: "miss-me",
      tag: "Ouvre quand...",
      title: "Je te manque terriblement",
      subtitle: "Pour combler la distance entre nous deux 💌",
      category: "Douceur",
      color: "from-rose-500 to-purple-600",
      accentColor: "#e11d48",
      icon: "HeartHandshake",
      isWaxSealed: true,
      audioVibe: "Bande-son romantique",
      letter: {
        date: "Quand la distance se fait sentir",
        salutation: "Mon amour,",
        paragraphs: [
          "Si je te manque en ce moment précis, sache une chose : je suis en train de penser à toi aussi. C'est presque automatique, tu occupes 99% de mes pensées chaque jour.",
          "Regarde notre ciel : c'est le même qui est au-dessus de nous deux. La distance physique n'a aucun pouvoir contre ce qu'on ressent l'un pour l'autre.",
          "Rappelle-toi nos fous rires, la chaleur de nos mains serrées, et l'odeur de ton parfum qui me rend fou. Chaque minute qui passe nous rapproche du moment où je pourrai enfin t'embrasser à nouveau.",
          "Envoie-moi un message dès que tu as fini de lire ceci, je t'attends !"
        ],
        signature: "Celui qui ne cesse de compter les heures avant de te revoir 💕"
      }
    },
    {
      id: "why-love-you",
      tag: "Spécial Déclaration",
      title: "10 raisons pour lesquelles je t'aime",
      subtitle: "Même s'il y en a en réalité plus d'un million 💖",
      category: "Déclaration",
      color: "from-pink-500 to-rose-600",
      accentColor: "#ec4899",
      icon: "Sparkles",
      isWaxSealed: true,
      audioVibe: "Mélodie magique",
      letter: {
        date: "Gravé dans mon cœur",
        salutation: "À la fille qui a volé mon cœur,",
        paragraphs: [
          "Si on me demandait pourquoi je t'aime, je pourrais en parler pendant des jours entiers. Voici 10 petites pépites qui me rendent fou de toi au quotidien :",
          "1. Ton rire contagieux qui me redonne instantanément le sourire.\n2. La manière adorable dont tu t'endors sur mon épaule.\n3. Ta bienveillance et la pureté de ton cœur avec les gens que tu aimes.\n4. Tes petites mimiques mignonnes quand tu es concentrée.\n5. Ta façon de me regarder qui me donne l'impression d'être invincible.\n6. Nos délires secrets que personne d'autre ne peut comprendre.\n7. Ton soutien sans faille dans tout ce que j'entreprends.\n8. La beauté naturelle de ton visage le matin au réveil.\n9. Tes câlins qui ont le pouvoir d'effacer tous mes soucis.\n10. Le simple fait que le monde est mille fois plus beau quand tu es dedans.",
          "Et la vérité, c'est que je t'aime surtout pour tout ce que tu es, sans aucun filtre."
        ],
        signature: "Amoureux de toi à l'infini ✨"
      }
    },
    {
      id: "our-future",
      tag: "Ouvre quand...",
      title: "Tu doutes ou penses à notre avenir",
      subtitle: "Une promesse sincère gravée dans le marbre 💍",
      category: "Promesse",
      color: "from-indigo-500 to-pink-500",
      accentColor: "#6366f1",
      icon: "Compass",
      isWaxSealed: true,
      audioVibe: "Promesse éternelle",
      letter: {
        date: "Pour toujours et au-delà",
        salutation: "Mon futur et mon présent,",
        paragraphs: [
          "Le futur peut parfois sembler flou ou incertain, mais s'il y a bien une certitude absolue dans ma vie, c'est que je veux le construire à tes côtés.",
          "J'imagine déjà nos prochains voyages, nos futures bêtises, notre petit cocon décoré ensemble, et tous ces dimanches matins tranquilles où nous prendrons le petit-déjeuner au lit.",
          "Je te promets d'être ton rocher quand tu as besoin d'appui, ton clown quand tu as besoin de rire, et ton plus grand allié dans toutes tes ambitions.",
          "Notre histoire ne fait que commencer, et le meilleur reste encore à écrire."
        ],
        signature: "Prêt pour toute une vie avec toi 🏡💫"
      }
    }
  ],

  // --- 4. Carte à Gratter Secrète ---
  scratchSecret: {
    title: "✨ Carte Mystère à Gratter ✨",
    instruction: "Gratte avec ton doigt pour dévoiler le mot secret...",
    revealedMessage: "Félicitations mon amour ! Tu as gagné un baiser passionné de 5 minutes + un massage de la nuque immédiat dès qu'on se voit ❤️🥰",
    rewardTitle: "Privilège Spécial Amour",
    couponCode: "LOVE-FOREVER-2026"
  },

  // --- 5. Le Mini-Quiz Complice (Tu te rappelles ?) ---
  quiz: {
    title: "Le Grand Quiz de Notre Couple 💘",
    subtitle: "Es-tu sûre de te souvenir de tous nos petits secrets ?",
    questions: [
      {
        id: 1,
        question: "Te souviens-tu de l'endroit exact de notre tout premier rendez-vous ?",
        options: [
          { text: "Dans un petit café cosy et chaleureux ☕", isCorrect: true, comment: "Bravo ! L'odeur du café et la magie dans tes yeux ce jour-là !" },
          { text: "Au cinéma devant un film qu'on n'a même pas regardé 🎬", isCorrect: false, comment: "Pas mal, mais c'était bien dans un café cosy !" },
          { text: "En train de se promener sous la pluie comme dans un film ☔", isCorrect: false, comment: "Très poétique mais ce n'était pas le tout premier !" },
          { text: "Dans un resto chic avec des chandelles 🕯️", isCorrect: false, comment: "Un grand classique, mais nous c'était bien plus intime !" }
        ]
      },
      {
        id: 2,
        question: "Quelle a été ma toute première pensée en te voyant pour la première fois ?",
        options: [
          { text: "« Waouh... Elle est encore plus sublime en vrai ! » ✨", isCorrect: true, comment: "Exactement ! J'ai eu le souffle coupé dès le premier regard." },
          { text: "« J'espère qu'elle aime les blagues nulles ! » 😂", isCorrect: false, comment: "Aussi, mais j'étais surtout ébloui par ta beauté !" },
          { text: "« Est-ce que j'ai l'air assez cool ? » 😎", isCorrect: false, comment: "J'étais stressé, mais surtout subjugué par toi !" },
          { text: "« J'espère qu'elle ne remarquera pas que je rougis » 🙈", isCorrect: false, comment: "Vrai aussi, mais ta beauté m'a hypnotisé !" }
        ]
      },
      {
        id: 3,
        question: "Qui est officiellement le plus gros demandeur de câlins dans le couple ?",
        options: [
          { text: "Toi (même si tu fais semblant du contraire) 🐱", isCorrect: true, comment: "Ahah tu es une vraie boîte à câlins et j'adore ça !" },
          { text: "Moi à 1000% dès que je te vois 🥰", isCorrect: true, comment: "Totalement vrai ! Impossible de résister à l'envie de te serrer fort !" },
          { text: "Ex æquo, on est deux pots de colle inséparables 🍯", isCorrect: true, comment: "La réponse parfaite : on ne peut pas vivre l'un sans l'autre !" },
          { text: "Personne, on est très indépendants... (Faux !) 🤥", isCorrect: false, comment: "Mensonge total ! On est collés H24 !" }
        ]
      },
      {
        id: 4,
        question: "Quelle est notre activité préférée par excellence lors d'une soirée à deux ?",
        options: [
          { text: "Commander de la bonne bouffe et regarder notre série sous le plaid 🍕🛋️", isCorrect: true, comment: "Le bonheur absolu en toute simplicité avec toi !" },
          { text: "Parler pendant des heures de tout et de rien au lit 🌙", isCorrect: true, comment: "Nos conversations nocturnes sont les plus précieuses !" },
          { text: "Faire semblant de choisir un film pendant 45 minutes pour finalement s'endormir 😴", isCorrect: true, comment: "Ahah tellement nous deux ! Tu t'endors toujours avant le générique." },
          { text: "Faire une compétition de cuisine gastronomique 👩‍🍳", isCorrect: false, comment: "On préfère largement le plaid et les sushis !" }
        ]
      },
      {
        id: 5,
        question: "Si je devais choisir une seule chose à garder pour toute la vie, ce serait :",
        options: [
          { text: "Toi, ta main dans la mienne et ton sourire pour toujours ❤️", isCorrect: true, comment: "C'est la seule et unique bonne réponse. Je te choisis toi, chaque jour." },
          { text: "Une réserve infinie de chocolat 🍫", isCorrect: false, comment: "Tentant, mais tu es infiniment plus douce que le chocolat !" },
          { text: "Gagner à l'Euromillions 💰", isCorrect: false, comment: "L'argent ne vaut rien sans toi pour le partager !" },
          { text: "Une téléportation pour éviter le trafic 🚗", isCorrect: false, comment: "Pratique, mais rien n'égale ton sourire !" }
        ]
      }
    ],
    results: {
      perfect: {
        title: "Âmes Sœurs Certifiées ! 🏆👑",
        badge: "Score Parfait : 100%",
        message: "Tu te souviens de tout ! Tu es officiellement la meilleure petite amie de la Terre. Pour te récompenser, voici tes Chèques d'Amour Spéciaux :"
      },
      good: {
        title: "Couple de Rêve ! 💕✨",
        badge: "Score d'Amour : Élevé",
        message: "Presque un sans-faute ! De toute façon, même quand tu te trompes, tu es adorable. Voici tes récompenses bien méritées :"
      }
    }
  },

  // --- 6. Bons d'Amour Débloquables (Chéquier Cadeau) ---
  coupons: [
    {
      id: "coupon-1",
      icon: "Sparkles",
      title: "Bon pour un Massage Relaxant",
      description: "Massage du dos, des épaules ou des pieds de 30 minutes avec musique douce et huiles parfumées.",
      tag: "Détente Ultime",
      color: "from-amber-400 to-rose-400"
    },
    {
      id: "coupon-2",
      icon: "Utensils",
      title: "Bon pour un Dîner de Reine",
      description: "Tu choisis le restaurant ou le repas, je m'occupe de payer / cuisiner et de faire la vaisselle !",
      tag: "Gourmandise",
      color: "from-rose-400 to-pink-500"
    },
    {
      id: "coupon-3",
      icon: "Film",
      title: "Pass Soirée Film & Câlins",
      description: "Tu as le contrôle total de la télécommande et je n'ai pas le droit de me plaindre du film romantique !",
      tag: "Soirée Cosy",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: "coupon-4",
      icon: "Crown",
      title: "Joker Ultime : Vœu Exaucé",
      description: "Utilisable à tout moment pour ce que tu veux : un caprice, un pardon immédiat ou une sortie surprise.",
      tag: "Illimité & Éternel",
      color: "from-pink-500 to-rose-600"
    }
  ]
};
