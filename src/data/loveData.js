// =========================================================================
// CONFIGURATION DE VOTRE ESPACE AMOUREUX
// Source de données unifiée : src/data/siteData.json
// Modifiable directement et à 100% depuis l'interface /admin
// =========================================================================
import siteData from './siteData.json';

export const loveConfig = {
  // --- 1. Informations du couple ---
  partnerName: siteData.couple?.partnerName || "Mon Amour",
  senderName: siteData.couple?.senderName || "SNACKA",
  relationTitle: siteData.couple?.relationTitle || "Notre Histoire",
  subtitle: siteData.couple?.subtitle || "Un espace intime et dédié pour célébrer chaque instant passé à tes côtés.",
  startDate: siteData.couple?.startDate || "2022-11-28T00:50:00",
  welcomeBadge: siteData.couple?.welcomeBadge || "Espace Privé & Dédicacé",

  // --- 2. Pensées & Mots Doux ---
  sweetWords: siteData.sweetWords || [],

  // --- 3. La Boîte à Lettres ---
  capsules: siteData.capsules || [],

  // --- 4. Carte Mystère à Révéler ---
  scratchSecret: siteData.scratchSecret || {
    title: "Message Privilège",
    instruction: "Faites glisser votre doigt sur la surface pour révéler le message...",
    revealedMessage: "Un dîner d'exception dans le restaurant de ton choix.",
    rewardTitle: "Privilège Accordé",
    couponCode: "PRIVILEGE-2026"
  },

  // --- 5. Questionnaire Complice ---
  quiz: {
    title: siteData.quiz?.title || "Le Questionnaire Complice",
    subtitle: siteData.quiz?.subtitle || "Quelques questions simples pour tester nos souvenirs partagés.",
    results: siteData.quiz?.results || {
      perfect: {
        title: "Complicité Parfaite",
        badge: "Score d'affinité : 100%",
        message: "Une parfaite mémoire de notre parcours et une connexion intacte."
      },
      good: {
        title: "Belle Complicité",
        badge: "Score d'affinité : Élevé",
        message: "Une excellente compréhension mutuelle."
      }
    }
  },

  // --- 6. Privilèges Débloquables ---
  coupons: siteData.coupons || []
};
