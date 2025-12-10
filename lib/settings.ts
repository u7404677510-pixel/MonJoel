/**
 * Site Settings Management
 * Gère les paramètres configurables du site via l'admin
 */

import { prisma as db } from './db';

// Types
export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  description: string | null;
  category: string;
  type: string;
}

export type SettingsCategory = 'general' | 'contact' | 'seo' | 'social' | 'appearance';

// Default settings (used for initialization)
export const DEFAULT_SETTINGS: Omit<SiteSetting, 'id'>[] = [
  // Contact
  {
    key: 'phone_number',
    value: '01 23 45 67 89',
    label: 'Numéro de téléphone',
    description: 'Numéro affiché sur tout le site',
    category: 'contact',
    type: 'phone',
  },
  {
    key: 'phone_number_raw',
    value: '+33123456789',
    label: 'Numéro de téléphone (format international)',
    description: 'Format pour les liens tel:',
    category: 'contact',
    type: 'phone',
  },
  {
    key: 'email',
    value: 'contact@monjoel.fr',
    label: 'Email de contact',
    description: 'Email affiché sur le site',
    category: 'contact',
    type: 'email',
  },
  {
    key: 'email_support',
    value: 'support@monjoel.fr',
    label: 'Email support',
    description: 'Email pour le support client',
    category: 'contact',
    type: 'email',
  },
  
  // General
  {
    key: 'site_name',
    value: 'Mon Joël',
    label: 'Nom du site',
    description: 'Nom de la marque',
    category: 'general',
    type: 'text',
  },
  {
    key: 'tagline',
    value: 'Votre serrurier intelligent disponible 24h/24',
    label: 'Slogan',
    description: 'Phrase d\'accroche principale',
    category: 'general',
    type: 'text',
  },
  {
    key: 'intervention_time',
    value: '30',
    label: 'Temps d\'intervention (minutes)',
    description: 'Délai moyen affiché aux clients',
    category: 'general',
    type: 'number',
  },
  {
    key: 'reviews_count',
    value: '2500',
    label: 'Nombre d\'avis',
    description: 'Affiché dans les badges de confiance',
    category: 'general',
    type: 'number',
  },
  {
    key: 'reviews_rating',
    value: '4.9',
    label: 'Note moyenne',
    description: 'Note sur 5 étoiles',
    category: 'general',
    type: 'number',
  },
  {
    key: 'interventions_count',
    value: '15000',
    label: 'Nombre d\'interventions',
    description: 'Total des interventions réalisées',
    category: 'general',
    type: 'number',
  },
  
  // SEO
  {
    key: 'meta_title',
    value: 'Mon Joël - Serrurier intelligent avec diagnostic IA',
    label: 'Meta Title (SEO)',
    description: 'Titre par défaut pour les moteurs de recherche',
    category: 'seo',
    type: 'text',
  },
  {
    key: 'meta_description',
    value: 'Service de serrurerie innovant avec diagnostic IA. Devis instantané, tarifs transparents, intervention rapide 24h/24.',
    label: 'Meta Description (SEO)',
    description: 'Description par défaut pour les moteurs de recherche',
    category: 'seo',
    type: 'textarea',
  },
  
  // Social
  {
    key: 'facebook_url',
    value: '',
    label: 'Facebook',
    description: 'URL de la page Facebook',
    category: 'social',
    type: 'url',
  },
  {
    key: 'instagram_url',
    value: '',
    label: 'Instagram',
    description: 'URL du profil Instagram',
    category: 'social',
    type: 'url',
  },
  {
    key: 'linkedin_url',
    value: '',
    label: 'LinkedIn',
    description: 'URL de la page LinkedIn',
    category: 'social',
    type: 'url',
  },
  
  // Appearance
  {
    key: 'emergency_banner_enabled',
    value: 'true',
    label: 'Bandeau urgence activé',
    description: 'Afficher le bandeau "Urgence 24h/24" en haut',
    category: 'appearance',
    type: 'boolean',
  },
  {
    key: 'emergency_banner_text',
    value: 'Urgence serrurerie 24h/24, 7j/7',
    label: 'Texte du bandeau urgence',
    description: 'Message affiché dans le bandeau',
    category: 'appearance',
    type: 'text',
  },
];

/**
 * Get all settings
 */
export async function getAllSettings(): Promise<SiteSetting[]> {
  try {
    const settings = await db.siteSetting.findMany({
      orderBy: [{ category: 'asc' }, { key: 'asc' }],
    });
    return settings;
  } catch {
    console.error('Error fetching settings, returning defaults');
    return DEFAULT_SETTINGS.map((s, i) => ({ ...s, id: `default-${i}` }));
  }
}

/**
 * Get settings by category
 */
export async function getSettingsByCategory(category: string): Promise<SiteSetting[]> {
  try {
    return await db.siteSetting.findMany({
      where: { category },
      orderBy: { key: 'asc' },
    });
  } catch {
    return DEFAULT_SETTINGS
      .filter((s) => s.category === category)
      .map((s, i) => ({ ...s, id: `default-${i}` }));
  }
}

/**
 * Get a single setting value
 */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const setting = await db.siteSetting.findUnique({
      where: { key },
    });
    return setting?.value ?? getDefaultValue(key);
  } catch {
    return getDefaultValue(key);
  }
}

/**
 * Get default value for a key
 */
function getDefaultValue(key: string): string | null {
  const defaultSetting = DEFAULT_SETTINGS.find((s) => s.key === key);
  return defaultSetting?.value ?? null;
}

/**
 * Update a setting
 */
export async function updateSetting(key: string, value: string): Promise<SiteSetting> {
  return await db.siteSetting.update({
    where: { key },
    data: { value },
  });
}

/**
 * Update multiple settings
 */
export async function updateSettings(settings: { key: string; value: string }[]): Promise<void> {
  await db.$transaction(
    settings.map((s) =>
      db.siteSetting.update({
        where: { key: s.key },
        data: { value: s.value },
      })
    )
  );
}

/**
 * Initialize default settings in database
 */
export async function initializeSettings(): Promise<void> {
  for (const setting of DEFAULT_SETTINGS) {
    await db.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
}

/**
 * Get settings as a key-value object (for client components)
 */
export async function getSettingsObject(): Promise<Record<string, string>> {
  const settings = await getAllSettings();
  return settings.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, string>
  );
}

