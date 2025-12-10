# API Reference - Mon Joël

## Vue d'ensemble

L'API Mon Joël est construite avec les Next.js Route Handlers (API Routes). Toutes les routes sont sous `/api/*`.

**Base URL** : `https://monjoel.com/api`

## Authentification

Les routes protégées utilisent Auth.js (NextAuth). Le token JWT est passé via cookies de session.

Pour les routes admin, le middleware vérifie :
1. Présence d'une session valide
2. Rôle utilisateur = `ADMIN`

## Endpoints

### Contact

#### POST /api/contact

Soumet un message via le formulaire de contact.

**Request Body** :
```json
{
  "name": "Jean Dupont",
  "email": "jean@exemple.fr",
  "phone": "0612345678",        // optionnel
  "subject": "devis",
  "message": "Je souhaite un devis pour...",
  "consentRgpd": true
}
```

**Response** :
```json
{
  "success": true,
  "message": "Votre message a bien été envoyé.",
  "data": {
    "id": "clxyz123..."
  }
}
```

**Erreurs** :
- `400` : Validation échouée
- `500` : Erreur serveur

---

### Diagnostic IA

#### POST /api/diagnostic

Soumet une demande de diagnostic avec analyse IA.

**Request Body** :
```json
{
  "zip": "75011",
  "city": "Paris",
  "problemType": "porte-claquee",
  "description": "Ma porte s'est claquée avec les clés à l'intérieur",
  "contactName": "Marie L.",
  "contactPhone": "0612345678",
  "contactEmail": "marie@exemple.fr",  // optionnel
  "urgency": "urgent"
}
```

**Problem Types** :
- `porte-claquee`
- `cle-cassee`
- `cle-perdue`
- `effraction`
- `serrure-bloquee`
- `changement-cylindre`
- `serrure-multipoints`
- `blindage`
- `autre`

**Urgency Levels** :
- `normal`
- `urgent`
- `very_urgent`

**Response** :
```json
{
  "success": true,
  "message": "Diagnostic effectué avec succès.",
  "data": {
    "requestId": "clxyz456...",
    "analysis": {
      "lockType": "porte-claquee",
      "brand": null,
      "confidence": 0.85,
      "pricing": {
        "min": 8010,
        "max": 9790,
        "currency": "EUR",
        "breakdown": [
          { "label": "Prestation de base", "amount": 8900 },
          { "label": "Déplacement", "amount": 3900 }
        ]
      },
      "eta": {
        "min": 50,
        "max": 100,
        "unit": "minutes"
      },
      "riskFlags": ["urgent"],
      "notes": "Diagnostic automatique..."
    }
  }
}
```

---

### Candidature Artisan

#### POST /api/artisan-application

Soumet une candidature pour rejoindre le réseau artisans.

**Request Body** :
```json
{
  "companyName": "Serrurerie Dupont",
  "siret": "12345678901234",
  "contactName": "Pierre Dupont",
  "email": "contact@serrurerie-dupont.fr",
  "phone": "0612345678",
  "zones": "Paris, 92, 93, 94",
  "message": "Présentation de l'entreprise..."  // optionnel
}
```

**Response** :
```json
{
  "success": true,
  "message": "Votre candidature a bien été reçue.",
  "data": {
    "id": "clxyz789..."
  }
}
```

**Erreurs** :
- `400` : SIRET déjà existant ou validation échouée

---

## Types de Réponse

### ApiResponse

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### PaginatedResponse

```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Bad Request - Validation échouée |
| 401 | Non authentifié |
| 403 | Non autorisé (rôle insuffisant) |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

## Rate Limiting

(À implémenter)

Limites prévues :
- 100 requêtes/minute pour endpoints publics
- 1000 requêtes/minute pour utilisateurs authentifiés

## Webhooks (Futur)

Endpoints webhooks prévus pour intégrations externes :

- `POST /api/webhooks/stripe` - Événements paiement
- `POST /api/webhooks/twilio` - Callbacks SMS

## Versioning

Actuellement v1 (implicite). Pour futures versions :

```
/api/v2/diagnostic
```

