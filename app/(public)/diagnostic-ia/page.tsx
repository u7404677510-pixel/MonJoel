import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Camera,
  MessageSquare,
  FileText,
  CheckCircle,
  ArrowRight,
  Shield,
  Eye,
  Lock,
  Zap,
  Brain,
  Upload,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';

export const metadata: Metadata = {
  title: 'Diagnostic IA Serrurerie - Devis Gratuit Instantané | Mon Joël',
  description:
    'Obtenez un devis précis en quelques minutes grâce à notre diagnostic IA. Envoyez une photo de votre serrure, décrivez votre problème et recevez une estimation transparente.',
  alternates: {
    canonical: '/diagnostic-ia',
  },
};

const steps = [
  {
    icon: Camera,
    title: 'Prenez une photo',
    description: 'Photographiez votre serrure, cylindre ou porte pour aider notre IA à analyser la situation.',
  },
  {
    icon: MessageSquare,
    title: 'Décrivez le problème',
    description: 'Expliquez votre situation en quelques mots : porte claquée, clé cassée, besoin de sécurisation...',
  },
  {
    icon: Brain,
    title: 'Analyse IA instantanée',
    description: 'Notre intelligence artificielle identifie le type de serrure et évalue la complexité.',
  },
  {
    icon: FileText,
    title: 'Recevez votre devis',
    description: 'Un devis détaillé avec fourchette de prix, sans engagement ni frais cachés.',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Résultat en 5 minutes',
    description: 'Pas besoin d\'attendre qu\'un technicien se déplace pour avoir une idée du coût.',
  },
  {
    icon: Eye,
    title: '100% transparent',
    description: 'Le prix annoncé est le prix que vous paierez. Pas de surprise, pas d\'arnaque.',
  },
  {
    icon: Shield,
    title: 'Données protégées',
    description: 'Vos photos et informations sont sécurisées et ne sont jamais partagées.',
  },
  {
    icon: Lock,
    title: 'Sans engagement',
    description: 'Vous recevez un devis, vous décidez ensuite si vous voulez faire intervenir.',
  },
];

const problemTypes = [
  { value: 'porte-claquee', label: 'Porte claquée (clés à l\'intérieur)' },
  { value: 'cle-cassee', label: 'Clé cassée dans la serrure' },
  { value: 'cle-perdue', label: 'Clé perdue - besoin de changer la serrure' },
  { value: 'effraction', label: 'Sécurisation après effraction' },
  { value: 'serrure-bloquee', label: 'Serrure bloquée / difficile' },
  { value: 'changement-cylindre', label: 'Changement de cylindre préventif' },
  { value: 'serrure-multipoints', label: 'Installation serrure multipoints' },
  { value: 'blindage', label: 'Blindage de porte' },
  { value: 'autre', label: 'Autre demande' },
];

export default function DiagnosticIAPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-joel-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-joel-500/20 text-joel-300 border border-joel-500/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Technologie exclusive
            </Badge>

            <h1 className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Diagnostic IA
              <span className="text-joel-400"> serrurerie</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Obtenez un devis précis en quelques minutes. Notre intelligence artificielle 
              analyse votre situation et vous donne une estimation transparente.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success-400" />
                Gratuit et sans engagement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success-400" />
                Résultat en 5 minutes
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success-400" />
                Prix transparent
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section background="light">
        <SectionHeader
          badge="Comment ça marche ?"
          title="Le diagnostic IA en 4 étapes"
          description="Un processus simple et rapide pour obtenir votre devis."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-joel-200" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-joel-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-joel-500/30">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-chillax text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Diagnostic Form */}
      <Section id="formulaire">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <Card className="p-8 shadow-xl">
            <h2 className="font-chillax text-2xl font-bold text-slate-900 mb-2">
              Lancer mon diagnostic
            </h2>
            <p className="text-slate-600 mb-6">
              Remplissez le formulaire ci-dessous pour recevoir votre estimation.
            </p>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip" required>Code postal</Label>
                  <Input
                    id="zip"
                    placeholder="75001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city" required>Ville</Label>
                  <Input
                    id="city"
                    placeholder="Paris"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="problem" required>Type de problème</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez votre situation" />
                  </SelectTrigger>
                  <SelectContent>
                    {problemTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" required>Décrivez votre situation</Label>
                <Textarea
                  id="description"
                  placeholder="Ex: Je suis bloqué dehors, ma porte s'est claquée avec les clés à l'intérieur. C'est une porte blindée avec une serrure 3 points..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Photo de la serrure (recommandé)</Label>
                <div className="mt-1 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-joel-300 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 mb-1">
                    Cliquez ou glissez vos photos ici
                  </p>
                  <p className="text-xs text-slate-400">
                    JPG, PNG - Max 10 Mo par image
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Une photo aide notre IA à identifier précisément le type de serrure et à vous donner 
                  une estimation plus précise.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" required>Votre nom</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" required>Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email (optionnel)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@exemple.fr"
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Pour recevoir votre devis par email
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Sparkles className="h-5 w-5 mr-2" />
                Obtenir mon devis gratuit
              </Button>

              <p className="text-xs text-slate-500 text-center">
                En soumettant ce formulaire, vous acceptez notre{' '}
                <Link href="/politique-confidentialite" className="underline">
                  politique de confidentialité
                </Link>
                . Vos données ne seront jamais vendues.
              </p>
            </form>
          </Card>

          {/* Benefits */}
          <div>
            <h3 className="font-chillax text-2xl font-bold text-slate-900 mb-6">
              Pourquoi utiliser le diagnostic IA ?
            </h3>

            <div className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-joel-100 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-joel-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Example result preview */}
            <Card className="mt-8 p-6 bg-slate-50 border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-joel-500" />
                Exemple de résultat
              </h4>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Type identifié :</strong> Serrure multipoints 3 points
                </p>
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Marque :</strong> Vachette (probable)
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  <strong>Intervention :</strong> Ouverture sans dégradation
                </p>
                <div className="bg-joel-50 rounded-lg p-3">
                  <p className="font-semibold text-joel-700">
                    Estimation : 89 € - 149 €
                  </p>
                  <p className="text-xs text-joel-600 mt-1">
                    Prix TTC, déplacement inclus
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* How AI works */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Technologie"
            title="Comment fonctionne notre IA ?"
            description="Une analyse intelligente pour des devis précis"
            centered
          />

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Notre intelligence artificielle a été entraînée sur des milliers d'images de serrures 
              et de situations de serrurerie. Elle est capable de :
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Identifier le type de serrure (simple, multipoints, blindée...)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Reconnaître la marque et le modèle quand c'est possible
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Évaluer la complexité de l'intervention
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Calculer une fourchette de prix réaliste basée sur notre historique
                </span>
              </li>
            </ul>

            <p className="text-slate-600">
              Le résultat est une estimation fiable qui vous permet de savoir à quoi vous attendre 
              avant de faire intervenir un artisan. Si vous validez le devis, un serrurier de notre 
              réseau se déplace pour réaliser l'intervention au prix convenu.
            </p>
          </div>
        </div>
      </Section>

      {/* Need help now? */}
      <Section>
        <Card className="bg-joel-500 p-8 md:p-12 text-white text-center">
          <h2 className="font-chillax text-3xl font-bold mb-4">
            Besoin d&apos;aide maintenant ?
          </h2>
          <p className="text-joel-100 mb-8 max-w-xl mx-auto">
            Si vous êtes en situation d'urgence, appelez-nous directement. 
            Un conseiller vous répond immédiatement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-joel-600 hover:bg-joel-50"
              asChild
            >
              <a href="tel:+33123456789" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                01 23 45 67 89
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/urgence-serrurerie">
                Page urgence
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}

