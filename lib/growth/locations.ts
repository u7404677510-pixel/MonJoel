import type { CityLocation, NearbyCity } from '@/types';
import { slugify } from '@/lib/utils';

// ===========================================
// Programmatic SEO - Locations Database
// ===========================================

/**
 * List of major French cities for SEO pages
 * This list can be expanded programmatically
 */
export const CITIES: CityLocation[] = [
  // Île-de-France
  {
    slug: 'paris',
    name: 'Paris',
    department: 'Paris',
    region: 'Île-de-France',
    zip: ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010', 
          '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020'],
    lat: 48.8566,
    lng: 2.3522,
    population: 2161000,
  },
  {
    slug: 'boulogne-billancourt',
    name: 'Boulogne-Billancourt',
    department: 'Hauts-de-Seine',
    region: 'Île-de-France',
    zip: ['92100'],
    lat: 48.8333,
    lng: 2.25,
    population: 121334,
  },
  {
    slug: 'saint-denis',
    name: 'Saint-Denis',
    department: 'Seine-Saint-Denis',
    region: 'Île-de-France',
    zip: ['93200', '93210'],
    lat: 48.9356,
    lng: 2.3539,
    population: 113892,
  },
  {
    slug: 'versailles',
    name: 'Versailles',
    department: 'Yvelines',
    region: 'Île-de-France',
    zip: ['78000'],
    lat: 48.8014,
    lng: 2.1301,
    population: 85461,
  },
  // Grandes métropoles
  {
    slug: 'lyon',
    name: 'Lyon',
    department: 'Rhône',
    region: 'Auvergne-Rhône-Alpes',
    zip: ['69001', '69002', '69003', '69004', '69005', '69006', '69007', '69008', '69009'],
    lat: 45.7640,
    lng: 4.8357,
    population: 522250,
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    department: 'Bouches-du-Rhône',
    region: 'Provence-Alpes-Côte d\'Azur',
    zip: ['13001', '13002', '13003', '13004', '13005', '13006', '13007', '13008', '13009', '13010',
          '13011', '13012', '13013', '13014', '13015', '13016'],
    lat: 43.2965,
    lng: 5.3698,
    population: 870731,
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    department: 'Haute-Garonne',
    region: 'Occitanie',
    zip: ['31000', '31100', '31200', '31300', '31400', '31500'],
    lat: 43.6047,
    lng: 1.4442,
    population: 493465,
  },
  {
    slug: 'nice',
    name: 'Nice',
    department: 'Alpes-Maritimes',
    region: 'Provence-Alpes-Côte d\'Azur',
    zip: ['06000', '06100', '06200', '06300'],
    lat: 43.7102,
    lng: 7.2620,
    population: 342669,
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    department: 'Loire-Atlantique',
    region: 'Pays de la Loire',
    zip: ['44000', '44100', '44200', '44300'],
    lat: 47.2184,
    lng: -1.5536,
    population: 318808,
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    department: 'Gironde',
    region: 'Nouvelle-Aquitaine',
    zip: ['33000', '33100', '33200', '33300', '33800'],
    lat: 44.8378,
    lng: -0.5792,
    population: 260958,
  },
  {
    slug: 'lille',
    name: 'Lille',
    department: 'Nord',
    region: 'Hauts-de-France',
    zip: ['59000', '59800'],
    lat: 50.6292,
    lng: 3.0573,
    population: 236234,
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    department: 'Bas-Rhin',
    region: 'Grand Est',
    zip: ['67000', '67100', '67200'],
    lat: 48.5734,
    lng: 7.7521,
    population: 284677,
  },
  {
    slug: 'montpellier',
    name: 'Montpellier',
    department: 'Hérault',
    region: 'Occitanie',
    zip: ['34000', '34070', '34080', '34090'],
    lat: 43.6108,
    lng: 3.8767,
    population: 295542,
  },
  {
    slug: 'rennes',
    name: 'Rennes',
    department: 'Ille-et-Vilaine',
    region: 'Bretagne',
    zip: ['35000', '35200', '35700'],
    lat: 48.1173,
    lng: -1.6778,
    population: 222485,
  },
  {
    slug: 'grenoble',
    name: 'Grenoble',
    department: 'Isère',
    region: 'Auvergne-Rhône-Alpes',
    zip: ['38000', '38100'],
    lat: 45.1885,
    lng: 5.7245,
    population: 158454,
  },
];

// ===========================================
// Paris Arrondissements (for more granular SEO)
// ===========================================

export const PARIS_ARRONDISSEMENTS: CityLocation[] = Array.from({ length: 20 }, (_, i) => {
  const num = i + 1;
  const suffix = num === 1 ? 'er' : 'ème';
  return {
    slug: `paris-${num}`,
    name: `Paris ${num}${suffix}`,
    department: 'Paris',
    region: 'Île-de-France',
    zip: [`750${num.toString().padStart(2, '0')}`],
    lat: 48.8566,
    lng: 2.3522,
  };
});

// ===========================================
// Location Helpers
// ===========================================

/**
 * Get all cities (including Paris arrondissements)
 */
export function getAllCities(): CityLocation[] {
  return [...CITIES, ...PARIS_ARRONDISSEMENTS];
}

/**
 * Get city by slug
 */
export function getCityBySlug(slug: string): CityLocation | undefined {
  return getAllCities().find((city) => city.slug === slug);
}

/**
 * Get city by ZIP code
 */
export function getCityByZip(zip: string): CityLocation | undefined {
  return getAllCities().find((city) => city.zip.includes(zip));
}

/**
 * Calculate distance between two coordinates (in km)
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get nearby cities
 */
export function getNearbyCities(citySlug: string, limit = 5): NearbyCity[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];

  return getAllCities()
    .filter((c) => c.slug !== citySlug)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      distance: calculateDistance(city.lat, city.lng, c.lat, c.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

/**
 * Generate slug for city + service
 */
export function generateCityServiceSlug(city: string, service: string): string {
  return `${slugify(city)}/${slugify(service)}`;
}

/**
 * Get all city slugs for static params
 */
export function getAllCitySlugs(): string[] {
  return getAllCities().map((city) => city.slug);
}

/**
 * Check if a ZIP code is in service area
 */
export function isZipInServiceArea(zip: string): boolean {
  // For now, we serve all listed cities
  // This can be expanded to check specific zones
  return getAllCities().some((city) => city.zip.includes(zip));
}

/**
 * Get region name from city
 */
export function getRegionFromCity(citySlug: string): string | undefined {
  return getCityBySlug(citySlug)?.region;
}

// ===========================================
// SEO Content Generation Helpers
// ===========================================

/**
 * Generate SEO title for a city page
 */
export function generateCitySeoTitle(cityName: string, service?: string): string {
  if (service) {
    return `${service} à ${cityName} - Serrurier 24h/24 | Mon Joël`;
  }
  return `Serrurier à ${cityName} - Intervention rapide 24h/24 | Mon Joël`;
}

/**
 * Generate SEO description for a city page
 */
export function generateCitySeoDescription(cityName: string, service?: string): string {
  const baseService = service ?? 'intervention de serrurerie';
  return `Besoin d'un serrurier pour une ${baseService.toLowerCase()} à ${cityName} ? ` +
    `Mon Joël intervient rapidement 24h/24, 7j/7. Devis gratuit et transparent grâce à notre diagnostic IA. ` +
    `Tarifs clairs, sans surprises.`;
}

/**
 * Generate H1 for city pages
 */
export function generateCityH1(cityName: string, service?: string): string {
  if (service) {
    return `${service} à ${cityName}`;
  }
  return `Serrurier à ${cityName}`;
}

/**
 * Generate intro paragraph for city pages
 */
export function generateCityIntro(cityName: string, service?: string): string {
  const serviceText = service ? service.toLowerCase() : 'services de serrurerie';
  return `Vous recherchez un serrurier de confiance à ${cityName} pour ${serviceText} ? ` +
    `Mon Joël met à votre disposition un réseau d'artisans qualifiés, disponibles 24h/24 et 7j/7. ` +
    `Grâce à notre diagnostic IA innovant, obtenez un devis précis et transparent en quelques minutes, ` +
    `sans mauvaise surprise.`;
}

