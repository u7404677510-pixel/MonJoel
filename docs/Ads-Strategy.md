# Stratégie Google Ads - Mon Joël

## Vue d'ensemble

Mon Joël utilise Google Ads comme canal d'acquisition principal pour les demandes urgentes. La stratégie se concentre sur :

1. **Search Ads** : Capture de l'intention immédiate
2. **Conversion Tracking** : Mesure précise du ROI
3. **Landing Page Optimisée** : `/urgence-serrurerie`

## Configuration Tracking

### Installation du tag Google

Le tag est configuré dans `app/layout.tsx` :

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
    gtag('config', '${ADS_ID}');
  `}
</Script>
```

### Variables d'environnement

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTAG_ADS_ID=AW-XXXXXXXXXX
```

## Events de Conversion

### Events définis (`lib/analytics.ts`)

| Event | Description | Trigger |
|-------|-------------|---------|
| `click_cta_devis` | Clic sur CTA diagnostic | Bouton "Diagnostic gratuit" |
| `click_cta_appel` | Clic sur numéro téléphone | Lien tel: |
| `click_cta_diagnostic` | Début diagnostic IA | Bouton diagnostic |
| `form_submission` | Soumission formulaire | Contact, Diagnostic |
| `generate_lead` | Lead qualifié | Formulaire complété |

### Implémentation

```tsx
import { trackDevisClick, trackAppelClick } from '@/lib/analytics';

<Button onClick={() => trackDevisClick('hero')}>
  Diagnostic gratuit
</Button>

<a href="tel:+33612018781" onClick={() => trackAppelClick('header')}>
  06 12 01 87 81
</a>
```

## Conversions à configurer dans Google Ads

### 1. Appels téléphoniques

```javascript
// Conversion tag pour appels
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXXX/CALL_CONVERSION_LABEL',
  'value': 50.0,
  'currency': 'EUR'
});
```

### 2. Formulaires soumis

```javascript
// Conversion tag pour leads
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXXX/LEAD_CONVERSION_LABEL',
  'value': 30.0,
  'currency': 'EUR'
});
```

### 3. Diagnostic complété

```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXXX/DIAGNOSTIC_CONVERSION_LABEL',
  'value': 20.0,
  'currency': 'EUR'
});
```

## Paramètres UTM

### Stockage des UTM

Les paramètres UTM sont automatiquement capturés et stockés :

```typescript
// lib/analytics.ts
export function storeUtmParams(): void {
  const utm = getUtmParams();
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utm));
  }
}
```

### Transmission aux API

Les UTM sont inclus dans les requêtes vers `/api/diagnostic` :

```typescript
const response = await fetch('/api/diagnostic', {
  method: 'POST',
  body: JSON.stringify({
    ...formData,
    sourceUtm: getStoredUtmParams(),
  }),
});
```

### Structure UTM recommandée

```
?utm_source=google
&utm_medium=cpc
&utm_campaign=urgence_paris
&utm_term=serrurier+urgence+paris
&utm_content=ad_variant_a
```

## Landing Pages

### Page principale Ads : `/urgence-serrurerie`

Optimisée pour :
- **Vitesse** : Minimum de JS, images optimisées
- **Mobile** : Design mobile-first
- **Conversion** : CTA au-dessus de la ligne de flottaison
- **Trust** : Badges de confiance visibles

### Éléments clés

1. **Hero** : Numéro de téléphone très visible
2. **Formulaire court** : 4-5 champs max
3. **Réassurance** : 24/7, délais, certifications
4. **FAQ** : Réponses aux objections

### A/B Testing

Variantes à tester :
- Couleur du CTA principal
- Texte du headline
- Position du formulaire
- Présence/absence de témoignages

## Structure des Campagnes

### Campagne 1 : Urgences (priorité haute)

**Keywords** :
- serrurier urgence [ville]
- serrurier 24h/24 [ville]
- porte claquée [ville]
- ouverture porte urgence

**Bidding** : Target CPA ou Maximize Conversions

### Campagne 2 : Génériques

**Keywords** :
- serrurier [ville]
- serrurier pas cher [ville]
- devis serrurier

**Bidding** : Target CPA plus bas

### Campagne 3 : Services spécifiques

**Keywords** :
- changement cylindre [ville]
- serrure multipoints [ville]
- blindage porte [ville]

**Bidding** : Manual CPC ou Target ROAS

## Budget et Objectifs

### Phase de lancement (M1-M3)

| Métrique | Objectif |
|----------|----------|
| Budget mensuel | 2000-3000€ |
| CPC moyen | 3-5€ |
| Taux de conversion | 5-8% |
| CPA cible | 40-60€ |
| Leads/mois | 50-75 |

### Phase de scaling (M4+)

| Métrique | Objectif |
|----------|----------|
| Budget mensuel | 5000-10000€ |
| CPC moyen | 2-4€ |
| Taux de conversion | 8-12% |
| CPA cible | 30-45€ |
| Leads/mois | 150-300 |

## Reporting

### Dashboard à créer

Métriques à suivre dans `/admin/analytics` :
- Dépenses par campagne
- Conversions par type (appel, formulaire)
- CPA par ville
- ROAS par service
- Quality Score moyen

### Export vers Google Ads

Implémenter l'import offline des conversions :
```bash
# Quand un devis devient un job payé
npm run export-conversions
```

## Call Tracking (Futur)

Pour un tracking précis des appels :

1. **Numéros dynamiques** : Un numéro par source
2. **Intégration** : Twilio ou CallRail
3. **Attribution** : Lier appel → campagne → conversion

Configuration future dans `lib/call-tracking.ts`.

