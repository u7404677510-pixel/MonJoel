import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  calculateEstimate,
  calculateEta,
  formatPriceEstimate,
  formatEta,
  getServicePriceRange,
} from '@/lib/pricing';

describe('calculateEstimate', () => {
  it('should calculate base price correctly', () => {
    const estimate = calculateEstimate('ouverture-simple');
    expect(estimate.min).toBeGreaterThan(0);
    expect(estimate.max).toBeGreaterThan(estimate.min);
    expect(estimate.currency).toBe('EUR');
  });

  it('should apply night surcharge', () => {
    const baseEstimate = calculateEstimate('ouverture-simple', { isNight: false, isWeekend: false });
    const nightEstimate = calculateEstimate('ouverture-simple', { isNight: true, isWeekend: false });
    
    expect(nightEstimate.min).toBeGreaterThan(baseEstimate.min);
  });

  it('should apply weekend surcharge', () => {
    const baseEstimate = calculateEstimate('ouverture-simple', { isNight: false, isWeekend: false });
    const weekendEstimate = calculateEstimate('ouverture-simple', { isNight: false, isWeekend: true });
    
    expect(weekendEstimate.min).toBeGreaterThan(baseEstimate.min);
  });

  it('should handle unknown service codes', () => {
    const estimate = calculateEstimate('unknown-service');
    expect(estimate.min).toBe(0);
    expect(estimate.max).toBe(0);
  });
});

describe('calculateEta', () => {
  it('should calculate ETA correctly', () => {
    const eta = calculateEta('ouverture-simple');
    expect(eta.min).toBeGreaterThan(0);
    expect(eta.max).toBeGreaterThan(eta.min);
    expect(eta.unit).toBe('minutes');
  });

  it('should reduce ETA for urgent requests', () => {
    const normalEta = calculateEta('ouverture-simple', { isUrgent: false });
    const urgentEta = calculateEta('ouverture-simple', { isUrgent: true });
    
    expect(urgentEta.min).toBeLessThan(normalEta.min);
  });

  it('should increase ETA for farther distances', () => {
    const nearEta = calculateEta('ouverture-simple', { distance: 5 });
    const farEta = calculateEta('ouverture-simple', { distance: 20 });
    
    expect(farEta.min).toBeGreaterThan(nearEta.min);
  });
});

describe('formatPriceEstimate', () => {
  it('should format price range', () => {
    const formatted = formatPriceEstimate({ min: 8900, max: 12900, currency: 'EUR' });
    expect(formatted).toContain('89');
    expect(formatted).toContain('129');
    expect(formatted).toContain('€');
  });

  it('should format single price when min equals max', () => {
    const formatted = formatPriceEstimate({ min: 8900, max: 8900, currency: 'EUR' });
    expect(formatted).toBe('89 €');
  });
});

describe('formatEta', () => {
  it('should format ETA in minutes', () => {
    const formatted = formatEta({ min: 30, max: 45, unit: 'minutes' });
    expect(formatted).toBe('30 - 45 min');
  });

  it('should convert to hours for long durations', () => {
    const formatted = formatEta({ min: 90, max: 120, unit: 'minutes' });
    expect(formatted).toContain('h');
  });
});

describe('getServicePriceRange', () => {
  it('should return price range for known services', () => {
    const range = getServicePriceRange('ouverture-de-porte');
    expect(range.from).toBeGreaterThan(0);
    expect(range.to).toBeGreaterThanOrEqual(range.from);
  });

  it('should return zero for unknown services', () => {
    const range = getServicePriceRange('unknown');
    expect(range.from).toBe(0);
    expect(range.to).toBe(0);
  });
});

