# Mon Joël - Service de Serrurerie Intelligent

[![CI](https://github.com/monjoel/monjoel/actions/workflows/ci.yml/badge.svg)](https://github.com/monjoel/monjoel/actions)
[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com)

> Site vitrine + backoffice pour **Mon Joël**, service de serrurerie intelligent avec diagnostic IA.

![Mon Joël Screenshot](public/og-image.jpg)

## 🚀 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript (strict mode)
- **Base de données** : PostgreSQL + Prisma ORM
- **Auth** : Auth.js (NextAuth v5)
- **Styling** : Tailwind CSS + Design system custom
- **UI** : Composants inspirés shadcn/ui
- **Tests** : Vitest + Playwright
- **CI/CD** : GitHub Actions + Vercel

## 📋 Prérequis

- Node.js 20+
- PostgreSQL 14+ (ou Docker)
- npm ou pnpm

## 🛠️ Installation

```bash
# Cloner le repo
git clone https://github.com/monjoel/monjoel.git
cd monjoel

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp env.example .env.local

# Configurer les variables dans .env.local
# - DATABASE_URL : URL PostgreSQL
# - AUTH_SECRET : Générer avec `openssl rand -base64 32`

# Générer le client Prisma
npm run db:generate

# Créer les tables (développement)
npm run db:push

# (Optionnel) Seed la base de données
npm run db:seed
```

## 🔧 Développement

```bash
# Lancer le serveur de dev
npm run dev

# Ouvrir http://localhost:3000
```

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarrer en production |
| `npm run lint` | Linter ESLint |
| `npm run type-check` | Vérification TypeScript |
| `npm run test` | Tests unitaires (watch) |
| `npm run test:run` | Tests unitaires (CI) |
| `npm run test:e2e` | Tests E2E Playwright |
| `npm run db:studio` | Interface Prisma Studio |

## 📁 Structure du Projet

```
├── app/                    # Next.js App Router
│   ├── (public)/          # Pages publiques (vitrine)
│   ├── (auth)/            # Pages d'authentification
│   ├── (dashboard)/       # Dashboard admin
│   └── api/               # Route handlers (API)
├── components/            # Composants React
│   ├── ui/               # Composants de base
│   ├── layout/           # Header, Footer, etc.
│   └── shared/           # Composants partagés
├── lib/                   # Logique métier
├── prisma/               # Schéma et migrations
├── types/                # Types TypeScript
├── tests/                # Tests (unit + e2e)
├── docs/                 # Documentation
└── public/               # Assets statiques
```

## 🌐 Pages Principales

### Site vitrine
- `/` - Accueil
- `/urgence-serrurerie` - Landing page urgence (Google Ads)
- `/diagnostic-ia` - Formulaire diagnostic IA
- `/services` - Catalogue des services
- `/tarifs` - Grille tarifaire transparente
- `/artisans` - Recrutement partenaires B2B
- `/blog` - Articles SEO
- `/contact` - Formulaire de contact
- `/faq` - Questions fréquentes

### SEO Programmatique
- `/ville/[ville]/[service]` - Pages locales (ex: `/ville/paris/serrurier`)

### Admin
- `/admin` - Dashboard
- `/admin/demandes` - Gestion des demandes
- `/admin/pricebook` - Gestion des tarifs
- `/admin/seo` - Pages SEO programmatique
- `/admin/analytics` - Statistiques
- `/admin/settings` - Paramètres

## 🔐 Rôles Utilisateurs

| Rôle | Accès |
|------|-------|
| `CLIENT` | Espace client (futur) |
| `TECH` | App intervention (futur) |
| `ARTISAN` | Dashboard artisan (futur) |
| `ADMIN` | Backoffice complet |

## 📈 Ajouter du Contenu

### Nouvelle ville (SEO programmatique)

```typescript
// lib/growth/locations.ts
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

### Nouveau service

```typescript
// lib/services.ts
const SERVICES = [
  // ...
  {
    id: 'nouveau-service',
    slug: 'nouveau-service',
    title: 'Nouveau Service',
    shortDescription: 'Description courte',
    longDescription: 'Description longue...',
    icon: 'IconName',
    basePrice: 9900, // en centimes
    estimatedDuration: '1h-2h',
  },
];
```

### Nouvel article de blog

Créer dans `/app/(public)/blog/[slug]/page.tsx` ou via l'admin (futur CMS).

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Couverture
npm run test:coverage
```

## 🚢 Déploiement

### Vercel (recommandé)

1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement sur push

### Variables d'environnement production

```
DATABASE_URL=postgresql://...
AUTH_SECRET=xxx
NEXT_PUBLIC_SITE_URL=https://monjoel.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTAG_ADS_ID=AW-XXXXXXXXXX
```

## 📚 Documentation

- [Architecture](docs/Architecture.md)
- [Stratégie SEO](docs/SEO-Strategy.md)
- [Stratégie Ads](docs/Ads-Strategy.md)
- [API Reference](docs/API.md)
- [ADR: Monolith First](docs/ADR/ADR-0001-monolith-first.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Propriétaire - Mon Joël SAS

---

Développé avec ❤️ pour révolutionner la serrurerie en France.

