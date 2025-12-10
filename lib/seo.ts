import type { Metadata } from 'next';
import type { SeoMeta, JsonLdData } from '@/types';

// ===========================================
// SEO Utilities
// ===========================================

const SITE_NAME = 'Mon Joël';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://monjoel.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// ===========================================
// Metadata Generation
// ===========================================

/**
 * Generate Next.js Metadata object
 */
export function generateMetadata(seo: SeoMeta): Metadata {
  const title = seo.title.includes(SITE_NAME) ? seo.title : `${seo.title} | ${SITE_NAME}`;
  const canonical = seo.canonical ?? SITE_URL;

  return {
    title,
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: seo.description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: seo.ogImage ?? DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seo.description,
      images: [seo.ogImage ?? DEFAULT_OG_IMAGE],
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// ===========================================
// JSON-LD Schema Generation
// ===========================================

/**
 * Generate LocalBusiness schema for locksmith
 */
export function generateLocalBusinessSchema(): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    name: SITE_NAME,
    description:
      'Service de serrurerie intelligent avec diagnostic IA. Devis instantané, tarifs transparents, intervention rapide 24h/24.',
    url: SITE_URL,
    telephone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? '+33 1 23 45 67 89',
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'contact@monjoel.com',
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      // Social media links (placeholders)
      // 'https://www.facebook.com/monjoelserrurerie',
      // 'https://www.instagram.com/monjoelserrurerie',
    ],
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
  name: string,
  description: string,
  price: { min: number; max: number }
): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Locksmith',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        minPrice: price.min,
        maxPrice: price.max,
      },
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFaqSchema(
  faqs: { question: string; answer: string }[]
): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url.startsWith('http') ? article.url : `${SITE_URL}${article.url}`,
    image: article.image ?? DEFAULT_OG_IMAGE,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author ?? SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Generate LocalBusiness schema for a specific city
 */
export function generateCityServiceSchema(
  city: string,
  service: string,
  serviceDescription: string
): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service} à ${city}`,
    description: serviceDescription,
    provider: {
      '@type': 'Locksmith',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'Country',
        name: 'France',
      },
    },
    serviceType: 'Serrurerie',
  };
}

// ===========================================
// JSON-LD Script Component Helper
// ===========================================

/**
 * Render JSON-LD script tag content
 */
export function renderJsonLd(data: JsonLdData | JsonLdData[]): string {
  return JSON.stringify(data);
}

// ===========================================
// SEO Content Helpers
// ===========================================

/**
 * Generate SEO-friendly title for city+service pages
 */
export function generateCityServiceTitle(city: string, service: string): string {
  return `${service} à ${city} - Intervention rapide 24h/24 | ${SITE_NAME}`;
}

/**
 * Generate SEO-friendly description for city+service pages
 */
export function generateCityServiceDescription(city: string, service: string): string {
  return `Besoin d'un serrurier pour ${service.toLowerCase()} à ${city} ? Mon Joël intervient rapidement 24h/24, 7j/7. Devis gratuit et transparent grâce à notre diagnostic IA.`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

