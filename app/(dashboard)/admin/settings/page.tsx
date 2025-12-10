'use client';

import * as React from 'react';
import {
  Settings,
  Phone,
  Mail,
  Globe,
  Palette,
  Search,
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building,
  Clock,
  Star,
  MessageSquare,
  Image as ImageIcon,
  Type,
  Zap,
  Shield,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  description: string | null;
  category: string;
  type: string;
}

const CATEGORY_INFO: Record<string, { label: string; icon: React.ElementType; description: string }> = {
  identity: {
    label: 'Identité',
    icon: Building,
    description: 'Nom, slogan et informations de base de votre entreprise',
  },
  contact: {
    label: 'Contact',
    icon: Phone,
    description: 'Numéros de téléphone, emails et coordonnées',
  },
  content: {
    label: 'Contenu',
    icon: Type,
    description: 'Textes et messages affichés sur le site',
  },
  trust: {
    label: 'Confiance',
    icon: Shield,
    description: 'Statistiques et éléments de réassurance',
  },
  seo: {
    label: 'SEO',
    icon: Search,
    description: 'Référencement et métadonnées',
  },
  social: {
    label: 'Réseaux',
    icon: Globe,
    description: 'Liens vers vos profils sociaux',
  },
  appearance: {
    label: 'Apparence',
    icon: Palette,
    description: 'Personnalisation visuelle du site',
  },
};

// Default settings structure enrichie
const DEFAULT_SETTINGS: SiteSetting[] = [
  // Identity
  { id: '1', key: 'site_name', value: 'Mon Joël', label: 'Nom du site', description: 'Nom affiché partout sur le site', category: 'identity', type: 'text' },
  { id: '2', key: 'tagline', value: 'Votre serrurier intelligent disponible 24h/24', label: 'Slogan', description: 'Phrase d\'accroche principale', category: 'identity', type: 'text' },
  { id: '3', key: 'company_name', value: 'Mon Joël SAS', label: 'Raison sociale', description: 'Nom légal de l\'entreprise', category: 'identity', type: 'text' },
  
  // Contact
  { id: '4', key: 'phone_number', value: '01 23 45 67 89', label: 'Téléphone principal', description: 'Numéro affiché sur le site', category: 'contact', type: 'phone' },
  { id: '5', key: 'phone_number_raw', value: '+33123456789', label: 'Téléphone (format tel:)', description: 'Format pour les liens cliquables', category: 'contact', type: 'phone' },
  { id: '6', key: 'email', value: 'contact@monjoel.fr', label: 'Email principal', description: 'Email de contact affiché', category: 'contact', type: 'email' },
  { id: '7', key: 'email_support', value: 'support@monjoel.fr', label: 'Email support', description: 'Email pour le support client', category: 'contact', type: 'email' },
  { id: '8', key: 'address', value: '', label: 'Adresse', description: 'Adresse physique (optionnel)', category: 'contact', type: 'textarea' },
  
  // Content
  { id: '9', key: 'hero_title', value: 'Serrurier de confiance\nintervention rapide', label: 'Titre Hero', description: 'Titre principal de la page d\'accueil', category: 'content', type: 'textarea' },
  { id: '10', key: 'hero_subtitle', value: 'Porte claquée, clé perdue, serrure bloquée ? Un artisan certifié intervient chez vous en 30 minutes avec un devis clair avant intervention.', label: 'Sous-titre Hero', description: 'Texte sous le titre principal', category: 'content', type: 'textarea' },
  { id: '11', key: 'cta_primary', value: 'Demander un devis', label: 'CTA Principal', description: 'Texte du bouton principal', category: 'content', type: 'text' },
  { id: '12', key: 'cta_secondary', value: 'Appeler maintenant', label: 'CTA Secondaire', description: 'Texte du bouton secondaire', category: 'content', type: 'text' },
  { id: '13', key: 'urgency_banner_text', value: 'Urgence serrurerie 24h/24, 7j/7', label: 'Bandeau urgence', description: 'Message du bandeau en haut', category: 'content', type: 'text' },
  
  // Trust
  { id: '14', key: 'intervention_time', value: '30', label: 'Temps d\'intervention', description: 'Délai moyen en minutes', category: 'trust', type: 'number' },
  { id: '15', key: 'reviews_count', value: '2500', label: 'Nombre d\'avis', description: 'Total des avis clients', category: 'trust', type: 'number' },
  { id: '16', key: 'reviews_rating', value: '4.9', label: 'Note moyenne', description: 'Note sur 5 étoiles', category: 'trust', type: 'number' },
  { id: '17', key: 'interventions_count', value: '15000', label: 'Interventions réalisées', description: 'Nombre total d\'interventions', category: 'trust', type: 'number' },
  { id: '18', key: 'artisans_count', value: '150', label: 'Artisans partenaires', description: 'Nombre d\'artisans dans le réseau', category: 'trust', type: 'number' },
  { id: '19', key: 'cities_count', value: '50', label: 'Villes couvertes', description: 'Nombre de villes desservies', category: 'trust', type: 'number' },
  
  // SEO
  { id: '20', key: 'meta_title', value: 'Mon Joël - Serrurier intelligent avec diagnostic IA', label: 'Meta Title', description: 'Titre pour les moteurs de recherche', category: 'seo', type: 'text' },
  { id: '21', key: 'meta_description', value: 'Service de serrurerie innovant avec diagnostic IA. Devis instantané, tarifs transparents, intervention rapide 24h/24.', label: 'Meta Description', description: 'Description pour Google', category: 'seo', type: 'textarea' },
  { id: '22', key: 'og_image', value: '/og-image.jpg', label: 'Image Open Graph', description: 'Image pour les partages sociaux', category: 'seo', type: 'text' },
  
  // Social
  { id: '23', key: 'facebook_url', value: '', label: 'Facebook', description: 'URL de votre page Facebook', category: 'social', type: 'url' },
  { id: '24', key: 'instagram_url', value: '', label: 'Instagram', description: 'URL de votre profil Instagram', category: 'social', type: 'url' },
  { id: '25', key: 'linkedin_url', value: '', label: 'LinkedIn', description: 'URL de votre page LinkedIn', category: 'social', type: 'url' },
  { id: '26', key: 'twitter_url', value: '', label: 'Twitter/X', description: 'URL de votre profil Twitter', category: 'social', type: 'url' },
  { id: '27', key: 'youtube_url', value: '', label: 'YouTube', description: 'URL de votre chaîne YouTube', category: 'social', type: 'url' },
  
  // Appearance
  { id: '28', key: 'urgency_banner_enabled', value: 'true', label: 'Bandeau urgence activé', description: 'Afficher le bandeau en haut du site', category: 'appearance', type: 'boolean' },
  { id: '29', key: 'show_reviews_badge', value: 'true', label: 'Badge avis visible', description: 'Afficher le badge avec la note', category: 'appearance', type: 'boolean' },
  { id: '30', key: 'show_intervention_time', value: 'true', label: 'Temps intervention visible', description: 'Afficher le délai d\'intervention', category: 'appearance', type: 'boolean' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<SiteSetting[]>(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = React.useState<SiteSetting[]>(DEFAULT_SETTINGS);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = React.useState('identity');

  // Fetch settings on mount
  React.useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setSettings(data.data);
          setOriginalSettings(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const changedSettings = settings
        .filter((s) => {
          const original = originalSettings.find((o) => o.key === s.key);
          return original?.value !== s.value;
        })
        .map((s) => ({ key: s.key, value: s.value }));

      if (changedSettings.length === 0) {
        setMessage({ type: 'success', text: 'Aucune modification à sauvegarder' });
        setSaving(false);
        return;
      }

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: changedSettings }),
      });

      if (response.ok) {
        setOriginalSettings(settings);
        setMessage({ type: 'success', text: `${changedSettings.length} paramètre(s) mis à jour` });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(originalSettings);
    setMessage(null);
  };

  const hasChanges = React.useMemo(() => {
    return settings.some((s) => {
      const original = originalSettings.find((o) => o.key === s.key);
      return original?.value !== s.value;
    });
  }, [settings, originalSettings]);

  const settingsByCategory = React.useMemo(() => {
    return settings.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = [];
      }
      acc[setting.category].push(setting);
      return acc;
    }, {} as Record<string, SiteSetting[]>);
  }, [settings]);

  const categories = Object.keys(CATEGORY_INFO);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Paramètres du site</h1>
          <p className="text-slate-500 mt-1">
            Personnalisez le contenu et l&apos;apparence de votre site
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset} size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving || !hasChanges} size="sm">
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {message.text}
        </div>
      )}

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap h-auto gap-1 p-1 bg-slate-100/80">
          {categories.map((category) => {
            const info = CATEGORY_INFO[category];
            const Icon = info.icon;
            const hasSettings = settingsByCategory[category]?.length > 0;
            if (!hasSettings && category !== activeTab) return null;
            return (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{info.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => {
          const info = CATEGORY_INFO[category];
          const categorySettings = settingsByCategory[category] || [];

          return (
            <TabsContent key={category} value={category} className="mt-6">
              <Card className="border-slate-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <info.icon className="h-4 w-4 text-primary" />
                    </div>
                    {info.label}
                  </CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {categorySettings.length > 0 ? (
                    categorySettings.map((setting) => (
                      <SettingField
                        key={setting.key}
                        setting={setting}
                        originalValue={
                          originalSettings.find((o) => o.key === setting.key)?.value || ''
                        }
                        onChange={(value) => handleChange(setting.key, value)}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 py-4 text-center">
                      Aucun paramètre dans cette catégorie
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Floating save button */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-200">
          <span className="text-sm font-medium text-slate-700">Modifications non sauvegardées</span>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sauvegarder'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Setting Field Component
function SettingField({
  setting,
  originalValue,
  onChange,
}: {
  setting: SiteSetting;
  originalValue: string;
  onChange: (value: string) => void;
}) {
  const isModified = setting.value !== originalValue;

  const renderInput = () => {
    switch (setting.type) {
      case 'textarea':
        return (
          <Textarea
            id={setting.key}
            value={setting.value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="resize-none"
          />
        );
      case 'boolean':
        return (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onChange(setting.value === 'true' ? 'false' : 'true')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.value === 'true' ? 'bg-primary' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  setting.value === 'true' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-slate-600">
              {setting.value === 'true' ? 'Activé' : 'Désactivé'}
            </span>
          </div>
        );
      case 'number':
        return (
          <Input
            id={setting.key}
            type="number"
            value={setting.value}
            onChange={(e) => onChange(e.target.value)}
            className="max-w-[200px]"
          />
        );
      case 'email':
        return (
          <div className="relative max-w-md">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id={setting.key}
              type="email"
              value={setting.value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10"
            />
          </div>
        );
      case 'phone':
        return (
          <div className="relative max-w-md">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id={setting.key}
              type="tel"
              value={setting.value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10"
            />
          </div>
        );
      case 'url':
        return (
          <div className="relative max-w-lg">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id={setting.key}
              type="url"
              value={setting.value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10"
              placeholder="https://..."
            />
          </div>
        );
      default:
        return (
          <Input
            id={setting.key}
            type="text"
            value={setting.value}
            onChange={(e) => onChange(e.target.value)}
            className="max-w-lg"
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={setting.key} className="font-medium text-slate-900">
          {setting.label}
        </Label>
        {isModified && (
          <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
            Modifié
          </Badge>
        )}
      </div>
      {renderInput()}
      {setting.description && (
        <p className="text-sm text-slate-500">{setting.description}</p>
      )}
    </div>
  );
}
