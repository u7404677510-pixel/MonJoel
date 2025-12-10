# ADR 0001: Architecture Monolithique First

## Statut

Accepté

## Contexte

Mon Joël est un nouveau produit qui doit être mis sur le marché rapidement. L'équipe initiale est réduite (1-3 développeurs). Le produit combine plusieurs fonctionnalités :

1. Site vitrine SEO-optimisé
2. Diagnostic IA
3. Gestion des demandes et devis
4. Dashboard admin
5. (Futur) App mobile artisans

Nous devions choisir entre :
- Architecture microservices dès le départ
- Architecture monolithique avec extraction future possible

## Décision

Nous avons choisi une **architecture monolithique** avec Next.js full-stack pour la V1.

### Choix technique

- **Frontend + Backend** : Next.js 14 App Router
- **API** : Route Handlers (pas de serveur séparé)
- **Database** : PostgreSQL unique
- **Auth** : Auth.js intégré

### Structure préparée pour extraction

Le code est organisé pour faciliter l'extraction future :

```
lib/
├── auth.ts          → Service Auth (peut devenir Auth0/Clerk)
├── pricing.ts       → Service Pricing (peut devenir microservice)
├── db.ts            → DAL (peut pointer vers APIs)
└── services/        → Business logic isolée
```

## Conséquences

### Positives

1. **Vélocité** : Un seul repo, déploiement simple, pas de coordination inter-services
2. **DX** : TypeScript end-to-end, type safety garantie
3. **Coût** : Hébergement simple (Vercel), pas d'infra complexe
4. **Debugging** : Stack trace unique, logs centralisés

### Négatives

1. **Scaling** : Scaling vertical uniquement au début
2. **Couplage** : Risque de couplage fort si pas vigilant
3. **Tech debt** : Extraction plus coûteuse si mal préparé

## Plan d'extraction future

### Critères de décision pour extraire un service

1. **Load** : Le composant nécessite un scaling indépendant
2. **Team** : Une équipe dédiée travaille dessus
3. **Tech** : Besoin d'une stack différente (ex: ML/Python)

### Services candidats à l'extraction

| Service | Trigger | Stack cible |
|---------|---------|-------------|
| IA Diagnostic | Volume + latence | Python/FastAPI |
| Dispatch | Complexité algo | Go ou Node |
| Billing | Compliance | Service dédié |
| Notifications | Volume | Serverless |

### Pattern d'extraction

1. Créer interface/abstraction dans le monolithe
2. Implémenter le nouveau service derrière l'interface
3. Basculer progressivement (feature flag)
4. Supprimer l'ancienne implémentation

Exemple avec le service IA :

```typescript
// Actuel (monolithe)
// lib/ai-diagnostic.ts
export async function analyze(data: DiagnosticInput): Promise<Analysis> {
  // Logique locale
  return localAnalysis(data);
}

// Futur (extraction)
// lib/ai-diagnostic.ts
export async function analyze(data: DiagnosticInput): Promise<Analysis> {
  const response = await fetch(process.env.AI_SERVICE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}
```

## Références

- [MonolithFirst - Martin Fowler](https://martinfowler.com/bliki/MonolithFirst.html)
- [Modular Monolith](https://www.kamilgrzybek.com/design/modular-monolith-primer/)

