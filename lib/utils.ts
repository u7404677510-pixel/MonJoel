import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price from cents to euros with French locale
 */
export function formatPrice(cents: number, showCurrency = true): string {
  const euros = cents / 100;
  const formatted = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(euros);
  return showCurrency ? `${formatted} €` : formatted;
}

/**
 * Format date with French locale
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', options).format(d);
}

/**
 * Format relative time (e.g., "il y a 2 heures")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'à l\'instant';
  if (diffMin < 60) return `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
  if (diffHour < 24) return `il y a ${diffHour} heure${diffHour > 1 ? 's' : ''}`;
  if (diffDay < 7) return `il y a ${diffDay} jour${diffDay > 1 ? 's' : ''}`;

  return formatDate(d);
}

/**
 * Generate a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Parse UTM parameters from URL
 */
export function parseUtmParams(url: string): Record<string, string> {
  const params = new URL(url).searchParams;
  const utm: Record<string, string> = {};
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utm[key.replace('utm_', '')] = value;
    }
  });
  
  return utm;
}

/**
 * Validate French phone number
 */
export function isValidFrenchPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, '');
  // French phone: starts with 0 or +33, followed by 9 digits
  return /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/.test(cleaned);
}

/**
 * Format French phone number
 */
export function formatFrenchPhone(phone: string): string {
  const cleaned = phone.replace(/[\s.-]/g, '');
  const match = cleaned.match(/^(?:(?:\+|00)33|0)([1-9])([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/);
  
  if (!match) return phone;
  
  return `0${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
}

/**
 * Validate French postal code
 */
export function isValidFrenchZip(zip: string): boolean {
  return /^[0-9]{5}$/.test(zip);
}

/**
 * Validate SIRET number
 */
export function isValidSiret(siret: string): boolean {
  const cleaned = siret.replace(/\s/g, '');
  if (!/^[0-9]{14}$/.test(cleaned)) return false;
  
  // Luhn algorithm check
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(cleaned[i] ?? '0', 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  
  return sum % 10 === 0;
}

/**
 * Format SIRET with spaces
 */
export function formatSiret(siret: string): string {
  const cleaned = siret.replace(/\s/g, '');
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 14)}`;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Delay/sleep function
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Generate random ID
 */
export function generateId(length = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Check if we're on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if we're in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Get base URL
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return 'http://localhost:3000';
}

/**
 * Calculate price with surcharges
 */
export function calculatePriceWithSurcharges(
  basePrice: number,
  options: {
    isNight?: boolean;
    isWeekend?: boolean;
    isUrgent?: boolean;
    nightSurcharge?: number;
    weekendSurcharge?: number;
    urgentSurcharge?: number;
  } = {}
): number {
  const {
    isNight = false,
    isWeekend = false,
    isUrgent = false,
    nightSurcharge = 50,
    weekendSurcharge = 30,
    urgentSurcharge = 25,
  } = options;

  let totalSurcharge = 0;
  if (isNight) totalSurcharge += nightSurcharge;
  if (isWeekend) totalSurcharge += weekendSurcharge;
  if (isUrgent) totalSurcharge += urgentSurcharge;

  return Math.round(basePrice * (1 + totalSurcharge / 100));
}

/**
 * Check if current time is night hours (20h-8h)
 */
export function isNightHours(): boolean {
  const hour = new Date().getHours();
  return hour >= 20 || hour < 8;
}

/**
 * Check if current day is weekend
 */
export function isWeekend(): boolean {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

