# Stratégie SEO - Mon Joël

## Vue d'ensemble

La stratégie SEO de Mon Joël repose sur trois piliers :

1. **Pages piliers** : Pages de contenu approfondi sur les services
2. **Pages locales** : SEO programmatique ville + service
3. **Blog** : Contenu informatif et long-tail keywords

## Structure des URLs

```
monjoel.com/
├── /                           # Accueil (page pilier principale)
├── /services                   # Hub services
├── /tarifs                     # Transparence prix
├── /diagnostic-ia              # Fonctionnalité différenciante
├── /urgence-serrurerie         # Landing page Ads/urgence
│
├── /ville/[ville]/[service]    # Pages SEO locales
│   ├── /paris/serrurier
│   ├── /paris/ouverture-de-porte
│   ├── /lyon/serrurier
│   └── ...
│
├── /blog/                      # Hub blog
│   └── /blog/[slug]            # Articles
│
└── /faq                        # FAQ (rich snippets)
```

## Mots-clés Ciblés

### Intentions Transactionnelles (priorité)
- serrurier urgence
- serrurier 24h/24
- ouverture de porte prix
- devis serrurier
- serrurier [ville]

### Intentions Informationnelles (blog)
- comment ouvrir une porte claquée
- clé cassée dans serrure que faire
- éviter arnaque serrurier
- comment choisir serrure multipoints

### Long-tail Local
- serrurier paris 11
- ouverture porte lyon prix
- changement cylindre marseille

## SEO Programmatique

### Génération des Pages Locales

Fichier source : `lib/growth/locations.ts`

```typescript
// Ajouter une nouvelle ville :
const CITIES = [
  // ...
  {
    slug: 'nouvelle-ville',
    name: 'Nouvelle Ville',
    department: 'XX',
    region: 'Région',
    zip: ['XXXXX'],
    lat: XX.XXXX,
    lng: X.XXXX,
  },
];
```

### Services disponibles pour les pages locales

Définis dans `lib/services.ts` :
- serrurier
- ouverture-de-porte
- changement-cylindre
- serrure-multipoints
- securisation

### Génération automatique

Pour générer toutes les combinaisons :

```bash
# Script à exécuter
npm run generate-seo-pages

# Ou manuellement via l'admin
/admin/seo → "Générer pages pour nouvelles villes"
```

## Schema.org / Rich Snippets

### LocalBusiness (Accueil)

```json
{
  "@type": "Locksmith",
  "name": "Mon Joël",
  "priceRange": "€€",
  "openingHours": "Mo-Su 00:00-23:59"
}
```

### Service (Tarifs)

```json
{
  "@type": "Service",
  "name": "Ouverture de porte",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "minPrice": 89,
      "maxPrice": 149
    }
  }
}
```

### FAQPage (FAQ)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment fonctionne le diagnostic IA ?",
      "acceptedAnswer": { ... }
    }
  ]
}
```

### Article (Blog)

```json
{
  "@type": "Article",
  "headline": "Comment éviter les arnaques...",
  "datePublished": "2024-12-01"
}
```

## Meta Tags

Chaque page doit avoir :

- `<title>` unique (50-60 caractères)
- `<meta description>` unique (120-160 caractères)
- `<link rel="canonical">`
- OpenGraph tags (og:title, og:description, og:image)
- Twitter Cards

### Exemple pour page locale

```tsx
export const metadata: Metadata = {
  title: 'Serrurier Paris - Intervention 24h/24 | Mon Joël',
  description: 'Serrurier à Paris disponible 24h/24. Devis gratuit en 5 min grâce à notre diagnostic IA. Ouverture de porte, changement cylindre.',
  alternates: {
    canonical: '/ville/paris/serrurier',
  },
};
```

## Sitemap

Généré automatiquement via `scripts/generate-sitemap.ts` :

```bash
npm run sitemap
```

Fichier généré : `public/sitemap.xml`

## Performance SEO

### Core Web Vitals à optimiser

- **LCP** < 2.5s : Images optimisées, font preload
- **FID** < 100ms : Code splitting, lazy loading
- **CLS** < 0.1 : Dimensions images fixées, font-display: swap

### Checklist technique

- [ ] HTTPS forcé
- [ ] Mobile-first responsive
- [ ] Sitemap.xml présent
- [ ] Robots.txt configuré
- [ ] Pages 404/500 personnalisées
- [ ] Redirections 301 configurées
- [ ] Images avec alt text
- [ ] Headings hiérarchiques (H1 > H2 > H3)
- [ ] Liens internes stratégiques

## Tracking & Mesure

### Google Search Console

- Vérifier l'indexation des pages locales
- Suivre les positions sur mots-clés cibles
- Détecter les erreurs de crawl

### KPIs à suivre

| Métrique | Cible M+3 | Cible M+6 |
|----------|-----------|-----------|
| Pages indexées | 100 | 500 |
| Trafic organique/mois | 5000 | 20000 |
| Position moyenne | 15 | 8 |
| Clicks /mois | 500 | 3000 |

## Actions d'expansion

### Phase 1 : Top 15 villes (actuel)
- Paris, Lyon, Marseille, Bordeaux, Toulouse, Lille, Nice, Nantes, Strasbourg, Montpellier, Rennes, Grenoble, etc.
- 15 villes × 5 services = 75 pages

### Phase 2 : Arrondissements Paris
- 20 arrondissements × 5 services = 100 pages

### Phase 3 : Villes moyennes
- Top 100 villes France
- 100 villes × 5 services = 500 pages

### Phase 4 : Micro-local
- Quartiers des grandes villes
- Communes périurbaines

