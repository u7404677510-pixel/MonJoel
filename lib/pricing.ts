import type { PricingEstimate, PricingBreakdownItem, EtaEstimate } from '@/types';
import { isNightHours, isWeekend } from '@/lib/utils';

// ===========================================
// Pricing Engine
// ===========================================

// Base prices in cents
const BASE_PRICES: Record<string, number> = {
  'ouverture-simple': 8900,       // 89€
  'ouverture-blindee': 14900,     // 149€
  'cylindre-standard': 12900,     // 129€
  'cylindre-securise': 18900,     // 189€
  'cylindre-a2p': 24900,          // 249€
  'multipoints-3pts': 29900,      // 299€
  'multipoints-5pts': 39900,      // 399€
  'securisation': 14900,          // 149€
  'blindage': 89900,              // 899€
  'coffre-fort': 19900,           // 199€
  'double-standard': 1500,        // 15€
  'double-securise': 4500,        // 45€
  'volet': 9900,                  // 99€
  'deplacement': 3900,            // 39€
};

// Default surcharges in percentage
const DEFAULT_SURCHARGES = {
  night: 50,      // +50% after 20h and before 8h
  weekend: 30,    // +30% on weekends
  urgent: 25,     // +25% for same-day urgent
  holiday: 75,    // +75% on public holidays
};

// ===========================================
// Pricing Calculation Functions
// ===========================================

/**
 * Calculate estimated price for a service
 */
export function calculateEstimate(
  serviceCode: string,
  options: {
    isNight?: boolean;
    isWeekend?: boolean;
    isUrgent?: boolean;
    isHoliday?: boolean;
    quantity?: number;
  } = {}
): PricingEstimate {
  const {
    isNight: nightOverride,
    isWeekend: weekendOverride,
    isUrgent = false,
    isHoliday = false,
    quantity = 1,
  } = options;

  // Use current time if not overridden
  const night = nightOverride ?? isNightHours();
  const weekend = weekendOverride ?? isWeekend();

  const basePrice = BASE_PRICES[serviceCode] ?? 0;
  if (basePrice === 0) {
    return {
      min: 0,
      max: 0,
      currency: 'EUR',
    };
  }

  // Calculate surcharges
  let totalSurchargePercent = 0;
  const breakdown: PricingBreakdownItem[] = [];

  // Add base price
  breakdown.push({
    label: 'Prestation de base',
    amount: basePrice * quantity,
  });

  if (night) {
    totalSurchargePercent += DEFAULT_SURCHARGES.night;
    breakdown.push({
      label: 'Majoration nuit (20h-8h)',
      amount: Math.round((basePrice * quantity * DEFAULT_SURCHARGES.night) / 100),
    });
  }

  if (weekend) {
    totalSurchargePercent += DEFAULT_SURCHARGES.weekend;
    breakdown.push({
      label: 'Majoration week-end',
      amount: Math.round((basePrice * quantity * DEFAULT_SURCHARGES.weekend) / 100),
    });
  }

  if (isUrgent) {
    totalSurchargePercent += DEFAULT_SURCHARGES.urgent;
    breakdown.push({
      label: 'Majoration urgence',
      amount: Math.round((basePrice * quantity * DEFAULT_SURCHARGES.urgent) / 100),
    });
  }

  if (isHoliday) {
    totalSurchargePercent += DEFAULT_SURCHARGES.holiday;
    breakdown.push({
      label: 'Majoration jour férié',
      amount: Math.round((basePrice * quantity * DEFAULT_SURCHARGES.holiday) / 100),
    });
  }

  // Add displacement fee
  const displacement = BASE_PRICES['deplacement'] ?? 0;
  breakdown.push({
    label: 'Déplacement',
    amount: displacement,
  });

  const totalBase = basePrice * quantity + displacement;
  const total = Math.round(totalBase * (1 + totalSurchargePercent / 100));

  // Calculate min/max range (±10%)
  const min = Math.round(total * 0.9);
  const max = Math.round(total * 1.1);

  return {
    min,
    max,
    currency: 'EUR',
    breakdown,
  };
}

/**
 * Calculate ETA based on service type and current conditions
 */
export function calculateEta(
  serviceCode: string,
  options: {
    isUrgent?: boolean;
    distance?: number; // in km
  } = {}
): EtaEstimate {
  const { isUrgent = false, distance = 5 } = options;

  // Base intervention times in minutes
  const baseTimes: Record<string, { min: number; max: number }> = {
    'ouverture-simple': { min: 30, max: 60 },
    'ouverture-blindee': { min: 45, max: 90 },
    'cylindre-standard': { min: 45, max: 90 },
    'cylindre-securise': { min: 60, max: 120 },
    'multipoints-3pts': { min: 90, max: 150 },
    'multipoints-5pts': { min: 120, max: 180 },
    'securisation': { min: 60, max: 120 },
    'blindage': { min: 180, max: 240 },
    'coffre-fort': { min: 60, max: 180 },
    'double-standard': { min: 15, max: 30 },
    'volet': { min: 45, max: 90 },
  };

  const times = baseTimes[serviceCode] ?? { min: 30, max: 60 };
  
  // Add travel time (estimated 3 min/km)
  const travelTime = Math.round(distance * 3);
  
  // Add arrival time (urgent: 20-40min, normal: 30-60min)
  const arrivalTime = isUrgent ? { min: 20, max: 40 } : { min: 30, max: 60 };

  return {
    min: arrivalTime.min + travelTime + times.min,
    max: arrivalTime.max + travelTime + times.max,
    unit: 'minutes',
  };
}

/**
 * Format price estimate for display
 */
export function formatPriceEstimate(estimate: PricingEstimate): string {
  const minEuros = (estimate.min / 100).toFixed(0);
  const maxEuros = (estimate.max / 100).toFixed(0);
  
  if (estimate.min === estimate.max) {
    return `${minEuros} €`;
  }
  
  return `${minEuros} € - ${maxEuros} €`;
}

/**
 * Format ETA for display
 */
export function formatEta(eta: EtaEstimate): string {
  if (eta.unit === 'hours') {
    return `${eta.min}h - ${eta.max}h`;
  }
  
  // Convert to hours if > 60 min
  if (eta.max > 60) {
    const minHours = Math.floor(eta.min / 60);
    const maxHours = Math.ceil(eta.max / 60);
    return `${minHours}h - ${maxHours}h`;
  }
  
  return `${eta.min} - ${eta.max} min`;
}

/**
 * Get service price range for display (simple version)
 */
export function getServicePriceRange(serviceSlug: string): { from: number; to: number } {
  const slugToCode: Record<string, string[]> = {
    'ouverture-de-porte': ['ouverture-simple', 'ouverture-blindee'],
    'changement-de-cylindre': ['cylindre-standard', 'cylindre-a2p'],
    'serrure-multipoints': ['multipoints-3pts', 'multipoints-5pts'],
    'securisation-apres-effraction': ['securisation'],
    'blindage-de-porte': ['blindage'],
    'coffre-fort': ['coffre-fort'],
    'double-de-cles': ['double-standard', 'double-securise'],
    'depannage-volet-roulant': ['volet'],
  };

  const codes = slugToCode[serviceSlug] ?? [];
  const prices = codes.map((code) => BASE_PRICES[code] ?? 0).filter((p) => p > 0);

  if (prices.length === 0) {
    return { from: 0, to: 0 };
  }

  return {
    from: Math.min(...prices),
    to: Math.max(...prices),
  };
}

/**
 * Get all service categories for pricebook
 */
export function getPricebookCategories(): string[] {
  return [
    'ouverture',
    'cylindre',
    'multipoints',
    'securisation',
    'divers',
  ];
}

