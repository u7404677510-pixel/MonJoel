import { describe, it, expect } from 'vitest';
import {
  getCityBySlug,
  getCityByZip,
  getNearbyCities,
  getAllCitySlugs,
  isZipInServiceArea,
  generateCitySeoTitle,
  generateCitySeoDescription,
} from '@/lib/growth/locations';

describe('getCityBySlug', () => {
  it('should return city for valid slug', () => {
    const paris = getCityBySlug('paris');
    expect(paris).toBeDefined();
    expect(paris?.name).toBe('Paris');
  });

  it('should return undefined for invalid slug', () => {
    const unknown = getCityBySlug('unknown-city');
    expect(unknown).toBeUndefined();
  });
});

describe('getCityByZip', () => {
  it('should return city for valid zip', () => {
    const paris = getCityByZip('75001');
    expect(paris).toBeDefined();
    expect(paris?.name).toBe('Paris');
  });

  it('should return undefined for invalid zip', () => {
    const unknown = getCityByZip('99999');
    expect(unknown).toBeUndefined();
  });
});

describe('getNearbyCities', () => {
  it('should return nearby cities', () => {
    const nearby = getNearbyCities('paris', 3);
    expect(nearby).toHaveLength(3);
    expect(nearby.every((city) => city.slug !== 'paris')).toBe(true);
  });

  it('should return empty array for unknown city', () => {
    const nearby = getNearbyCities('unknown', 5);
    expect(nearby).toHaveLength(0);
  });
});

describe('getAllCitySlugs', () => {
  it('should return array of slugs', () => {
    const slugs = getAllCitySlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain('paris');
    expect(slugs).toContain('lyon');
  });
});

describe('isZipInServiceArea', () => {
  it('should return true for covered areas', () => {
    expect(isZipInServiceArea('75001')).toBe(true);
    expect(isZipInServiceArea('69001')).toBe(true);
  });

  it('should return false for uncovered areas', () => {
    expect(isZipInServiceArea('99999')).toBe(false);
  });
});

describe('generateCitySeoTitle', () => {
  it('should generate title with city name', () => {
    const title = generateCitySeoTitle('Paris');
    expect(title).toContain('Paris');
    expect(title).toContain('Serrurier');
  });

  it('should include service when provided', () => {
    const title = generateCitySeoTitle('Lyon', 'Ouverture de porte');
    expect(title).toContain('Lyon');
    expect(title).toContain('Ouverture de porte');
  });
});

describe('generateCitySeoDescription', () => {
  it('should generate description with city name', () => {
    const desc = generateCitySeoDescription('Marseille');
    expect(desc).toContain('Marseille');
    expect(desc.length).toBeGreaterThan(50);
    expect(desc.length).toBeLessThan(200);
  });
});

