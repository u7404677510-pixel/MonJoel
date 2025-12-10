import { describe, it, expect } from 'vitest';
import {
  cn,
  formatPrice,
  formatDate,
  slugify,
  capitalize,
  truncate,
  isValidFrenchPhone,
  formatFrenchPhone,
  isValidFrenchZip,
  isValidSiret,
  getInitials,
  isNightHours,
  isWeekend,
} from '@/lib/utils';

describe('cn (classnames)', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});

describe('formatPrice', () => {
  it('should format price in cents to euros', () => {
    expect(formatPrice(8900)).toBe('89,00 €');
    expect(formatPrice(12950)).toBe('129,50 €');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('0,00 €');
  });

  it('should not show currency when disabled', () => {
    expect(formatPrice(8900, false)).toBe('89,00');
  });
});

describe('formatDate', () => {
  it('should format date in French', () => {
    const date = new Date('2024-12-10');
    expect(formatDate(date)).toContain('décembre');
    expect(formatDate(date)).toContain('2024');
  });

  it('should accept string dates', () => {
    expect(formatDate('2024-01-15')).toContain('janvier');
  });
});

describe('slugify', () => {
  it('should create URL-friendly slugs', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Paris 11ème')).toBe('paris-11eme');
    expect(slugify('Café & Thé')).toBe('cafe-the');
  });

  it('should handle accented characters', () => {
    expect(slugify('Éléphant')).toBe('elephant');
    expect(slugify('Château')).toBe('chateau');
  });
});

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('WORLD')).toBe('WORLD');
  });
});

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
  });

  it('should not truncate short strings', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});

describe('isValidFrenchPhone', () => {
  it('should validate French phone numbers', () => {
    expect(isValidFrenchPhone('0612345678')).toBe(true);
    expect(isValidFrenchPhone('06 12 34 56 78')).toBe(true);
    expect(isValidFrenchPhone('+33612345678')).toBe(true);
    expect(isValidFrenchPhone('0033612345678')).toBe(true);
  });

  it('should reject invalid numbers', () => {
    expect(isValidFrenchPhone('123')).toBe(false);
    expect(isValidFrenchPhone('abcdefghij')).toBe(false);
  });
});

describe('formatFrenchPhone', () => {
  it('should format French phone numbers', () => {
    expect(formatFrenchPhone('0612345678')).toBe('06 12 34 56 78');
    expect(formatFrenchPhone('+33612345678')).toBe('06 12 34 56 78');
  });
});

describe('isValidFrenchZip', () => {
  it('should validate French postal codes', () => {
    expect(isValidFrenchZip('75001')).toBe(true);
    expect(isValidFrenchZip('69003')).toBe(true);
  });

  it('should reject invalid postal codes', () => {
    expect(isValidFrenchZip('1234')).toBe(false);
    expect(isValidFrenchZip('123456')).toBe(false);
    expect(isValidFrenchZip('ABCDE')).toBe(false);
  });
});

describe('isValidSiret', () => {
  it('should validate SIRET numbers', () => {
    // Valid SIRET with correct Luhn checksum
    expect(isValidSiret('73282932000074')).toBe(true);
  });

  it('should reject invalid SIRET numbers', () => {
    expect(isValidSiret('12345678901234')).toBe(false);
    expect(isValidSiret('123')).toBe(false);
  });
});

describe('getInitials', () => {
  it('should get initials from name', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Marie')).toBe('MA');
    expect(getInitials('Jean Pierre Dupont')).toBe('JP');
  });
});

