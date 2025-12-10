import type { ServiceDefinition } from '@/types';

// ===========================================
// Services Catalog
// ===========================================

export const SERVICES: ServiceDefinition[] = [
  {
    id: 'ouverture-porte',
    slug: 'ouverture-de-porte',
    title: 'Ouverture de porte',
    shortDescription: 'Porte claquée, clé perdue ou cassée ? Intervention rapide pour retrouver l\'accès à votre domicile.',
    longDescription: `Vous êtes bloqué dehors ? Notre équipe de serruriers professionnels intervient rapidement 
    pour ouvrir votre porte sans dégradation. Que vous ayez oublié vos clés, qu'elles soient cassées dans la serrure 
    ou que votre porte se soit claquée, nous avons les outils et l'expertise pour vous dépanner en urgence.
    
    Notre diagnostic IA analyse votre type de serrure pour vous donner un devis précis avant intervention.`,
    icon: 'DoorOpen',
    basePrice: 8900, // 89€ en centimes
    estimatedDuration: '30-60 min',
    popular: true,
  },
  {
    id: 'changement-cylindre',
    slug: 'changement-de-cylindre',
    title: 'Changement de cylindre',
    shortDescription: 'Remplacement de cylindre suite à perte de clés, cambriolage ou pour renforcer votre sécurité.',
    longDescription: `Le cylindre est le cœur de votre serrure. Après une perte de clés, un cambriolage ou 
    simplement pour améliorer votre sécurité, le remplacement du cylindre est souvent la solution la plus 
    efficace et économique.
    
    Nous proposons une gamme de cylindres de haute sécurité (A2P, multipoints) adaptés à vos besoins 
    et à votre budget. Notre diagnostic IA identifie le modèle compatible avec votre porte.`,
    icon: 'Key',
    basePrice: 12900, // 129€
    estimatedDuration: '45-90 min',
    popular: true,
  },
  {
    id: 'serrure-multipoints',
    slug: 'serrure-multipoints',
    title: 'Serrure multipoints',
    shortDescription: 'Installation ou remplacement de serrure 3 ou 5 points pour une sécurité maximale.',
    longDescription: `La serrure multipoints offre une protection renforcée contre les effractions. 
    Avec 3 ou 5 points de verrouillage répartis sur toute la hauteur de la porte, elle résiste 
    efficacement aux tentatives d'intrusion.
    
    Nous installons des serrures certifiées A2P (1, 2 ou 3 étoiles selon vos besoins) compatibles 
    avec les exigences des assurances. Devis transparent incluant fourniture et pose.`,
    icon: 'Shield',
    basePrice: 29900, // 299€
    estimatedDuration: '1h30-2h30',
  },
  {
    id: 'securisation-effraction',
    slug: 'securisation-apres-effraction',
    title: 'Sécurisation après effraction',
    shortDescription: 'Intervention d\'urgence pour sécuriser votre domicile après un cambriolage.',
    longDescription: `Après un cambriolage, il est crucial de sécuriser rapidement votre domicile. 
    Nous intervenons en urgence 24h/24 pour :
    
    - Réparer ou remplacer la porte endommagée
    - Installer une serrure temporaire puis définitive
    - Renforcer les points faibles de votre sécurité
    - Vous fournir un rapport pour votre assurance
    
    Notre équipe est formée pour intervenir avec professionnalisme et empathie dans ces moments difficiles.`,
    icon: 'ShieldAlert',
    basePrice: 14900, // 149€
    estimatedDuration: '1h-2h',
    popular: true,
  },
  {
    id: 'blindage-porte',
    slug: 'blindage-de-porte',
    title: 'Blindage de porte',
    shortDescription: 'Renforcez votre porte existante avec un blindage professionnel anti-effraction.',
    longDescription: `Le blindage de porte est une solution économique pour renforcer la sécurité 
    de votre entrée sans changer toute la porte. Nous installons :
    
    - Blindage pivot ou fourreau selon votre configuration
    - Tôle en acier haute résistance
    - Serrure multipoints certifiée
    - Cornières anti-dégondage
    
    Solution idéale pour les appartements ou copropriétés. Certification A2P disponible.`,
    icon: 'ShieldCheck',
    basePrice: 89900, // 899€
    estimatedDuration: '3h-4h',
  },
  {
    id: 'coffre-fort',
    slug: 'coffre-fort',
    title: 'Ouverture de coffre-fort',
    shortDescription: 'Ouverture de coffre-fort suite à perte de code ou de clé, sans destruction.',
    longDescription: `Vous avez perdu le code ou la clé de votre coffre-fort ? Nos serruriers 
    spécialisés utilisent des techniques non destructives pour accéder à votre coffre :
    
    - Manipulation de serrures à combinaison
    - Crochetage de serrures à clé
    - Décodage électronique
    
    Dans la majorité des cas, nous ouvrons votre coffre sans dommage, vous permettant de le réutiliser.`,
    icon: 'Lock',
    basePrice: 19900, // 199€
    estimatedDuration: '1h-3h',
  },
  {
    id: 'double-cles',
    slug: 'double-de-cles',
    title: 'Double de clés',
    shortDescription: 'Reproduction de clés standard, sécurisées ou haute sécurité.',
    longDescription: `Besoin d'un double de clés ? Nous reproduisons tous types de clés :
    
    - Clés plates standard
    - Clés à gorges
    - Clés de sécurité (carte de propriété requise)
    - Clés haute sécurité A2P
    - Badges et télécommandes d'immeuble
    
    Reproduction rapide sur place ou commande sous 24-48h pour les modèles spéciaux.`,
    icon: 'KeyRound',
    basePrice: 1500, // 15€
    estimatedDuration: '15-30 min',
  },
  {
    id: 'depannage-volet',
    slug: 'depannage-volet-roulant',
    title: 'Dépannage volet roulant',
    shortDescription: 'Réparation de volet roulant bloqué, motorisation défaillante ou lames cassées.',
    longDescription: `Votre volet roulant est bloqué, fait du bruit ou ne répond plus ? 
    Nous diagnostiquons et réparons :
    
    - Moteur défaillant
    - Lames cassées ou désaxées
    - Tablier sorti des rails
    - Manivelle ou sangle cassée
    - Problèmes de télécommande
    
    Intervention rapide pour retrouver lumière et sécurité chez vous.`,
    icon: 'Blinds',
    basePrice: 9900, // 99€
    estimatedDuration: '45-90 min',
  },
];

// ===========================================
// Service Helpers
// ===========================================

/**
 * Get all services
 */
export function getAllServices(): ServiceDefinition[] {
  return SERVICES;
}

/**
 * Get popular services
 */
export function getPopularServices(): ServiceDefinition[] {
  return SERVICES.filter((s) => s.popular);
}

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Get service by ID
 */
export function getServiceById(id: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.id === id);
}

/**
 * Get all service slugs
 */
export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

/**
 * Get service categories
 */
export function getServiceCategories(): string[] {
  return [
    'Ouverture',
    'Installation',
    'Sécurisation',
    'Dépannage',
  ];
}

/**
 * Group services by category
 */
export function getServicesGrouped(): Record<string, ServiceDefinition[]> {
  return {
    'Ouverture & Accès': SERVICES.filter((s) => 
      ['ouverture-porte', 'coffre-fort'].includes(s.id)
    ),
    'Serrures & Cylindres': SERVICES.filter((s) => 
      ['changement-cylindre', 'serrure-multipoints'].includes(s.id)
    ),
    'Sécurisation': SERVICES.filter((s) => 
      ['securisation-effraction', 'blindage-porte'].includes(s.id)
    ),
    'Autres services': SERVICES.filter((s) => 
      ['double-cles', 'depannage-volet'].includes(s.id)
    ),
  };
}

