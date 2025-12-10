import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Default site settings - enrichi avec toutes les catégories
const DEFAULT_SETTINGS = [
  // Identity
  { key: 'site_name', value: 'Mon Joël', label: 'Nom du site', description: 'Nom affiché partout sur le site', category: 'identity', type: 'text' },
  { key: 'tagline', value: 'Votre serrurier intelligent disponible 24h/24', label: 'Slogan', description: 'Phrase d\'accroche principale', category: 'identity', type: 'text' },
  { key: 'company_name', value: 'Mon Joël SAS', label: 'Raison sociale', description: 'Nom légal de l\'entreprise', category: 'identity', type: 'text' },
  
  // Contact
  { key: 'phone_number', value: '06 12 01 87 81', label: 'Téléphone principal', description: 'Numéro affiché sur le site', category: 'contact', type: 'phone' },
  { key: 'phone_number_raw', value: '+33612018781', label: 'Téléphone (format tel:)', description: 'Format pour les liens cliquables', category: 'contact', type: 'phone' },
  { key: 'email', value: 'contact@monjoel.fr', label: 'Email principal', description: 'Email de contact affiché', category: 'contact', type: 'email' },
  { key: 'email_support', value: 'support@monjoel.fr', label: 'Email support', description: 'Email pour le support client', category: 'contact', type: 'email' },
  { key: 'address', value: '', label: 'Adresse', description: 'Adresse physique (optionnel)', category: 'contact', type: 'textarea' },
  
  // Content
  { key: 'hero_title', value: 'Serrurier de confiance\nintervention rapide', label: 'Titre Hero', description: 'Titre principal de la page d\'accueil', category: 'content', type: 'textarea' },
  { key: 'hero_subtitle', value: 'Porte claquée, clé perdue, serrure bloquée ? Un artisan certifié intervient chez vous en 30 minutes avec un devis clair avant intervention.', label: 'Sous-titre Hero', description: 'Texte sous le titre principal', category: 'content', type: 'textarea' },
  { key: 'cta_primary', value: 'Demander un devis', label: 'CTA Principal', description: 'Texte du bouton principal', category: 'content', type: 'text' },
  { key: 'cta_secondary', value: 'Appeler maintenant', label: 'CTA Secondaire', description: 'Texte du bouton secondaire', category: 'content', type: 'text' },
  { key: 'urgency_banner_text', value: 'Urgence serrurerie 24h/24, 7j/7', label: 'Bandeau urgence', description: 'Message du bandeau en haut', category: 'content', type: 'text' },
  
  // Trust
  { key: 'intervention_time', value: '30', label: 'Temps d\'intervention', description: 'Délai moyen en minutes', category: 'trust', type: 'number' },
  { key: 'reviews_count', value: '2500', label: 'Nombre d\'avis', description: 'Total des avis clients', category: 'trust', type: 'number' },
  { key: 'reviews_rating', value: '4.9', label: 'Note moyenne', description: 'Note sur 5 étoiles', category: 'trust', type: 'number' },
  { key: 'interventions_count', value: '15000', label: 'Interventions réalisées', description: 'Nombre total d\'interventions', category: 'trust', type: 'number' },
  { key: 'artisans_count', value: '150', label: 'Artisans partenaires', description: 'Nombre d\'artisans dans le réseau', category: 'trust', type: 'number' },
  { key: 'cities_count', value: '50', label: 'Villes couvertes', description: 'Nombre de villes desservies', category: 'trust', type: 'number' },
  
  // SEO
  { key: 'meta_title', value: 'Mon Joël - Serrurier intelligent avec diagnostic IA', label: 'Meta Title', description: 'Titre pour les moteurs de recherche', category: 'seo', type: 'text' },
  { key: 'meta_description', value: 'Service de serrurerie innovant avec diagnostic IA. Devis instantané, tarifs transparents, intervention rapide 24h/24.', label: 'Meta Description', description: 'Description pour Google', category: 'seo', type: 'textarea' },
  { key: 'og_image', value: '/og-image.jpg', label: 'Image Open Graph', description: 'Image pour les partages sociaux', category: 'seo', type: 'text' },
  
  // Social
  { key: 'facebook_url', value: '', label: 'Facebook', description: 'URL de votre page Facebook', category: 'social', type: 'url' },
  { key: 'instagram_url', value: '', label: 'Instagram', description: 'URL de votre profil Instagram', category: 'social', type: 'url' },
  { key: 'linkedin_url', value: '', label: 'LinkedIn', description: 'URL de votre page LinkedIn', category: 'social', type: 'url' },
  { key: 'twitter_url', value: '', label: 'Twitter/X', description: 'URL de votre profil Twitter', category: 'social', type: 'url' },
  { key: 'youtube_url', value: '', label: 'YouTube', description: 'URL de votre chaîne YouTube', category: 'social', type: 'url' },
  
  // Appearance
  { key: 'urgency_banner_enabled', value: 'true', label: 'Bandeau urgence activé', description: 'Afficher le bandeau en haut du site', category: 'appearance', type: 'boolean' },
  { key: 'show_reviews_badge', value: 'true', label: 'Badge avis visible', description: 'Afficher le badge avec la note', category: 'appearance', type: 'boolean' },
  { key: 'show_intervention_time', value: 'true', label: 'Temps intervention visible', description: 'Afficher le délai d\'intervention', category: 'appearance', type: 'boolean' },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@monjoel.com' },
    update: {
      passwordHash: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
    create: {
      email: 'admin@monjoel.com',
      name: 'Admin Mon Joël',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create pricebook items
  const pricebookItems = [
    { code: 'OUV-SIMPLE', label: 'Ouverture porte simple', category: 'ouverture', basePrice: 8900 },
    { code: 'OUV-BLINDEE', label: 'Ouverture porte blindée', category: 'ouverture', basePrice: 14900 },
    { code: 'OUV-3PTS', label: 'Ouverture serrure 3 points', category: 'ouverture', basePrice: 12900 },
    { code: 'CYL-STD', label: 'Cylindre standard', category: 'cylindre', basePrice: 12900 },
    { code: 'CYL-SEC', label: 'Cylindre sécurisé', category: 'cylindre', basePrice: 18900 },
    { code: 'CYL-A2P', label: 'Cylindre A2P', category: 'cylindre', basePrice: 24900 },
    { code: 'MULTI-3PTS', label: 'Serrure 3 points', category: 'multipoints', basePrice: 29900 },
    { code: 'MULTI-5PTS', label: 'Serrure 5 points', category: 'multipoints', basePrice: 39900 },
    { code: 'SECU-URG', label: 'Sécurisation urgence', category: 'securisation', basePrice: 14900 },
    { code: 'BLINDAGE', label: 'Blindage porte', category: 'securisation', basePrice: 89900 },
    { code: 'DEPLACEMENT', label: 'Frais de déplacement', category: 'divers', basePrice: 3900 },
  ];

  for (const item of pricebookItems) {
    await prisma.pricebookItem.upsert({
      where: { code: item.code },
      update: item,
      create: {
        ...item,
        nightSurcharge: 50,
        weekendSurcharge: 30,
        urgentSurcharge: 25,
        isActive: true,
      },
    });
  }
  console.log('✅ Created pricebook items:', pricebookItems.length);

  // Create testimonials
  const testimonials = [
    { name: 'Marie L.', city: 'Paris 11ème', rating: 5, comment: 'Bloquée dehors à 22h, le serrurier est arrivé en 25 minutes. Ouverture propre, sans dégât, et un prix conforme au devis IA. Je recommande !' },
    { name: 'Thomas B.', city: 'Lyon', rating: 5, comment: 'Le diagnostic IA m\'a permis de comprendre exactement le problème avant même l\'intervention. Transparence totale sur le prix, ça change des arnaques habituelles.' },
    { name: 'Sophie M.', city: 'Marseille', rating: 5, comment: 'Après un cambriolage, Mon Joël a sécurisé mon appartement en urgence. Équipe professionnelle et rassurante dans un moment difficile.' },
    { name: 'Pierre D.', city: 'Bordeaux', rating: 4, comment: 'Changement de cylindre rapide et efficace. Le serrurier m\'a conseillé sur les meilleures options de sécurité pour mon budget.' },
    { name: 'Emma V.', city: 'Toulouse', rating: 5, comment: 'Service impeccable ! La possibilité d\'envoyer une photo pour le diagnostic à distance est vraiment pratique. Devis précis reçu en 5 minutes.' },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        ...t,
        isPublished: true,
      },
    });
  }
  console.log('✅ Created testimonials:', testimonials.length);

  // Create sample SEO pages
  const seoPages = [
    { slug: 'paris/serrurier', city: 'Paris', service: 'Serrurier', title: 'Serrurier Paris - Intervention 24h/24 | Mon Joël' },
    { slug: 'lyon/serrurier', city: 'Lyon', service: 'Serrurier', title: 'Serrurier Lyon - Intervention Rapide | Mon Joël' },
    { slug: 'marseille/serrurier', city: 'Marseille', service: 'Serrurier', title: 'Serrurier Marseille - Urgence 24h/24 | Mon Joël' },
  ];

  for (const page of seoPages) {
    await prisma.seoPage.upsert({
      where: { slug: page.slug },
      update: page,
      create: {
        ...page,
        description: `Serrurier à ${page.city} disponible 24h/24. Devis gratuit, intervention rapide, tarifs transparents.`,
        contentMd: `# ${page.title}\n\nContenu de la page...`,
        isPublished: true,
      },
    });
  }
  console.log('✅ Created SEO pages:', seoPages.length);

  // Create site settings
  for (const setting of DEFAULT_SETTINGS) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Created site settings:', DEFAULT_SETTINGS.length);

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

