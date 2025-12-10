# Architecture Mon Joël

## Vue d'ensemble

Mon Joël est une application web full-stack construite avec **Next.js 14** (App Router), utilisant un modèle monolithique TypeScript pour la facilité de développement et de déploiement.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                  │
│    (Navigateurs, Mobile via WebView futur, Artisans App)        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL / CDN                                 │
│              (Edge Network, Static Assets)                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   NEXT.JS APPLICATION                            │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │   App Router  │  │  API Routes   │  │  Middleware   │       │
│  │   (React)     │  │  (REST)       │  │  (Auth)       │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │    Lib/       │  │  Components/  │  │    Types/     │       │
│  │   (Business)  │  │  (UI)         │  │   (Models)    │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POSTGRESQL                                    │
│              (via Prisma ORM)                                    │
│                                                                  │
│  Tables: users, requests, tickets, quotes, jobs,                 │
│          technicians, artisans, seo_pages, etc.                  │
└─────────────────────────────────────────────────────────────────┘
```

## Stack Technique

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| Framework | Next.js 14 (App Router) | SSR/SSG, excellent SEO, DX moderne |
| Langage | TypeScript strict | Type safety, maintenabilité |
| Base de données | PostgreSQL | Robuste, relationnel, JSON support |
| ORM | Prisma | Type-safe, migrations, introspection |
| Auth | Auth.js (NextAuth v5) | Standard Next.js, flexible |
| Styling | Tailwind CSS | Utility-first, performance |
| UI Components | shadcn/ui inspiré | Composants accessibles, customisables |
| Validation | Zod | Runtime validation, inférence types |
| Tests | Vitest + Playwright | Rapide, compatible React |
| CI/CD | GitHub Actions | Intégration native GitHub |
| Hébergement | Vercel | Optimisé Next.js, edge network |

## Structure des Dossiers

```
/
├── app/                      # Next.js App Router
│   ├── (public)/            # Pages publiques (vitrine)
│   │   ├── page.tsx         # Accueil
│   │   ├── urgence-serrurerie/
│   │   ├── diagnostic-ia/
│   │   ├── services/
│   │   ├── tarifs/
│   │   ├── artisans/
│   │   ├── a-propos/
│   │   ├── faq/
│   │   ├── contact/
│   │   ├── blog/
│   │   └── ville/[ville]/[service]/  # SEO programmatique
│   ├── (auth)/              # Pages d'authentification
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Dashboard admin
│   │   └── admin/
│   ├── api/                 # Route handlers (API REST)
│   │   ├── auth/
│   │   ├── contact/
│   │   ├── diagnostic/
│   │   └── artisan-application/
│   └── layout.tsx           # Root layout
│
├── components/              # Composants React
│   ├── ui/                  # Composants de base (Button, Card, etc.)
│   ├── layout/              # Header, Footer, Section
│   ├── shared/              # Composants partagés (CTA, Testimonials)
│   └── forms/               # Formulaires typés
│
├── lib/                     # Logique métier & utilitaires
│   ├── auth.ts              # Configuration Auth.js
│   ├── db.ts                # Client Prisma
│   ├── utils.ts             # Helpers généraux
│   ├── pricing.ts           # Calculs de prix
│   ├── services.ts          # Catalogue services
│   ├── seo.ts               # Génération SEO/meta
│   ├── analytics.ts         # Tracking GA/Ads
│   ├── validations.ts       # Schémas Zod
│   └── growth/
│       └── locations.ts     # Villes pour SEO programmatique
│
├── prisma/
│   └── schema.prisma        # Schéma base de données
│
├── types/                   # Types TypeScript globaux
│   └── index.ts
│
├── styles/
│   └── globals.css          # Tailwind + design tokens
│
├── tests/                   # Tests
│   ├── unit/                # Tests unitaires (Vitest)
│   └── e2e/                 # Tests E2E (Playwright)
│
├── docs/                    # Documentation
│
└── scripts/                 # Scripts utilitaires
```

## Flux de Données

### 1. Demande d'intervention (Client → Système)

```
Client                    API Route              Database
   │                          │                      │
   │  POST /api/diagnostic    │                      │
   │─────────────────────────►│                      │
   │  { zip, description }    │                      │
   │                          │  Create Request      │
   │                          │─────────────────────►│
   │                          │                      │
   │                          │◄─────────────────────│
   │                          │                      │
   │                          │  AI Analysis (stub)  │
   │                          │  Calculate pricing   │
   │                          │                      │
   │                          │  Create Ticket       │
   │                          │─────────────────────►│
   │                          │                      │
   │◄─────────────────────────│                      │
   │  { estimate, eta }       │                      │
```

### 2. Authentification Admin

```
Admin                    Middleware            Auth.js            Database
  │                          │                    │                   │
  │  GET /admin              │                    │                   │
  │─────────────────────────►│                    │                   │
  │                          │  Verify session    │                   │
  │                          │───────────────────►│                   │
  │                          │                    │  Check user       │
  │                          │                    │──────────────────►│
  │                          │                    │◄──────────────────│
  │                          │◄───────────────────│                   │
  │                          │                    │                   │
  │  [If ADMIN role] Allow   │                    │                   │
  │◄─────────────────────────│                    │                   │
```

## Points d'Extension

### Extraction Future de Services

Le code est structuré pour permettre l'extraction de services indépendants :

1. **Service IA** (`lib/pricing.ts`, stubs dans `api/diagnostic`)
   - Actuellement : calculs locaux avec règles métier
   - Futur : API externe avec ML pour analyse photos

2. **Service Dispatch** (tables jobs, technicians)
   - Actuellement : gestion manuelle via admin
   - Futur : algorithme d'attribution automatique

3. **Service Paiement** (tables quotes)
   - Actuellement : paiement offline
   - Futur : intégration Stripe

4. **Service Notifications** (events)
   - Actuellement : events en DB
   - Futur : SMS/Email via Twilio/Resend

## Sécurité

- **Authentification** : Auth.js avec JWT, sessions sécurisées
- **Autorisation** : Middleware Next.js + rôles (CLIENT, ARTISAN, TECH, ADMIN)
- **Validation** : Zod côté serveur pour toutes les entrées
- **HTTPS** : Forcé en production via Vercel
- **Headers** : CSP, X-Frame-Options via next.config
- **Secrets** : Variables d'environnement, jamais dans le code

## Performance

- **SSG/ISR** : Pages statiques générées à la build
- **Edge Network** : Assets sur CDN Vercel
- **Images** : Optimisation via next/image
- **Fonts** : Préchargement, variable fonts
- **Code splitting** : Automatique par page

## Monitoring (À implémenter)

- Sentry pour error tracking
- Vercel Analytics pour performance
- Google Analytics pour usage
- Logs structurés pour debugging

