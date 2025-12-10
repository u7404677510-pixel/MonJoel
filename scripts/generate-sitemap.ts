/**
 * Script de génération du sitemap.xml
 * Usage: npx tsx scripts/generate-sitemap.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://monjoel.com';

// Pages statiques
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/urgence-serrurerie', priority: '0.9', changefreq: 'weekly' },
  { url: '/diagnostic-ia', priority: '0.9', changefreq: 'monthly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/tarifs', priority: '0.8', changefreq: 'monthly' },
  { url: '/artisans', priority: '0.7', changefreq: 'monthly' },
  { url: '/a-propos', priority: '0.6', changefreq: 'yearly' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'yearly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
  { url: '/cgu', priority: '0.3', changefreq: 'yearly' },
  { url: '/politique-confidentialite', priority: '0.3', changefreq: 'yearly' },
];

// Villes pour SEO programmatique
const cities = [
  'paris', 'lyon', 'marseille', 'toulouse', 'bordeaux',
  'lille', 'nice', 'nantes', 'strasbourg', 'montpellier',
  'rennes', 'grenoble', 'toulon', 'dijon', 'angers',
];

// Services pour SEO programmatique
const services = [
  'serrurier',
  'ouverture-de-porte',
  'changement-cylindre',
  'serrure-multipoints',
  'securisation',
];

// Articles de blog (à récupérer depuis la DB en production)
const blogPosts = [
  { slug: 'eviter-arnaques-serrurier' },
  { slug: 'cle-cassee-que-faire' },
  { slug: 'securiser-porte-entree' },
];

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Pages statiques
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Pages SEO villes/services
  for (const city of cities) {
    for (const service of services) {
      xml += `  <url>
    <loc>${SITE_URL}/ville/${city}/${service}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  }

  // Articles de blog
  for (const post of blogPosts) {
    xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return xml;
}

// Génération
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✅ Sitemap généré : ${outputPath}`);
console.log(`   - ${staticPages.length} pages statiques`);
console.log(`   - ${cities.length * services.length} pages SEO locales`);
console.log(`   - ${blogPosts.length} articles de blog`);
console.log(`   Total: ${staticPages.length + cities.length * services.length + blogPosts.length} URLs`);

