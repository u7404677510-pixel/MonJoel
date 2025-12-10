// ===========================================
// Analytics & Tracking Utilities
// ===========================================

// Type pour gtag
type GtagCommand = 'config' | 'event' | 'set' | 'js';

interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (command: GtagCommand, target: string | Date, config?: GtagEventParams) => void;
    dataLayer?: unknown[];
  }
}

// ===========================================
// Google Analytics / Google Tag Manager
// ===========================================

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXXXX';
const ADS_ID = process.env.NEXT_PUBLIC_GTAG_ADS_ID ?? 'AW-XXXXXXXXXX';

/**
 * Track page view
 */
export function pageview(url: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_ID, {
    page_path: url,
  });
}

/**
 * Track custom event
 */
export function event(
  action: string,
  params?: GtagEventParams
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, params);
}

// ===========================================
// Pre-defined Event Helpers
// ===========================================

/**
 * Track CTA click events
 */
export function trackCtaClick(ctaName: string, location?: string): void {
  event('click_cta', {
    cta_name: ctaName,
    location: location ?? 'unknown',
  });
}

/**
 * Track "Obtenir un devis" CTA
 */
export function trackDevisClick(location?: string): void {
  trackCtaClick('devis', location);
  event('click_cta_devis', { location });
}

/**
 * Track phone call CTA
 */
export function trackAppelClick(location?: string): void {
  trackCtaClick('appel', location);
  event('click_cta_appel', { location });
}

/**
 * Track diagnostic CTA
 */
export function trackDiagnosticClick(location?: string): void {
  trackCtaClick('diagnostic', location);
  event('click_cta_diagnostic', { location });
}

/**
 * Track connect/login CTA
 */
export function trackConnectClick(location?: string): void {
  trackCtaClick('connect', location);
  event('click_cta_connect', { location });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  event('form_submission', {
    form_name: formName,
    success: success,
  });
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(success: boolean): void {
  trackFormSubmission('contact', success);
  if (success) {
    event('generate_lead', {
      source: 'contact_form',
    });
  }
}

/**
 * Track diagnostic form submission
 */
export function trackDiagnosticFormSubmit(success: boolean, city?: string): void {
  trackFormSubmission('diagnostic', success);
  if (success) {
    event('generate_lead', {
      source: 'diagnostic_form',
      city: city ?? 'unknown',
    });
  }
}

/**
 * Track artisan application submission
 */
export function trackArtisanApplication(success: boolean): void {
  trackFormSubmission('artisan_application', success);
}

// ===========================================
// Google Ads Conversion Tracking
// ===========================================

/**
 * Track conversion for Google Ads
 */
export function trackConversion(conversionLabel: string, value?: number): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${conversionLabel}`,
    value: value,
    currency: 'EUR',
  });
}

/**
 * Track lead conversion (e.g., form submission)
 */
export function trackLeadConversion(value?: number): void {
  trackConversion('LEAD_CONVERSION_LABEL', value);
}

/**
 * Track quote request conversion
 */
export function trackQuoteConversion(value?: number): void {
  trackConversion('QUOTE_CONVERSION_LABEL', value);
}

// ===========================================
// UTM Parameter Handling
// ===========================================

interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

/**
 * Get UTM params from URL
 */
export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');
  const term = params.get('utm_term');
  const content = params.get('utm_content');

  if (source) utm.source = source;
  if (medium) utm.medium = medium;
  if (campaign) utm.campaign = campaign;
  if (term) utm.term = term;
  if (content) utm.content = content;

  return utm;
}

/**
 * Store UTM params in session storage
 */
export function storeUtmParams(): void {
  if (typeof window === 'undefined') return;

  const utm = getUtmParams();
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utm));
  }
}

/**
 * Get stored UTM params from session storage
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const stored = sessionStorage.getItem('utm_params');
  if (!stored) return {};

  try {
    return JSON.parse(stored) as UtmParams;
  } catch {
    return {};
  }
}

// ===========================================
// Analytics Script Component (for layout)
// ===========================================

/**
 * Get the GA script tags HTML (for head)
 */
export function getAnalyticsScripts(): string {
  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', {
        page_path: window.location.pathname,
      });
      gtag('config', '${ADS_ID}');
    </script>
  `;
}

