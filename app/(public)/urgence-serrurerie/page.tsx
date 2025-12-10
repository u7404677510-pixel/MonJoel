import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Clock,
  Shield,
  CheckCircle,
  MapPin,
  AlertTriangle,
  Zap,
  CreditCard,
  Upload,
  MessageSquare,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Section, SectionHeader } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { generateLocalBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Urgence Serrurerie 24h/24 - Intervention Rapide | Mon Joël',
  description:
    'Urgence serrurier ? Intervention en 30 minutes, 24h/24 et 7j/7. Devis gratuit par téléphone. Porte claquée, clé cassée, effraction. Appelez maintenant !',
  alternates: {
    canonical: '/urgence-serrurerie',
  },
  openGraph: {
    title: 'Urgence Serrurerie 24h/24 - Intervention Rapide',
    description:
      'Urgence serrurier ? Intervention en 30 minutes, 24h/24 et 7j/7. Devis gratuit par téléphone.',
  },
};

const trustBadges = [
  { icon: Clock, label: '24h/24, 7j/7', description: 'Disponible jour et nuit' },
  { icon: Zap, label: '30 min', description: 'Délai moyen d\'arrivée' },
  { icon: Shield, label: 'Certifiés', description: 'Artisans qualifiés' },
  { icon: CreditCard, label: 'Devis gratuit', description: 'Sans engagement' },
];

const urgencyTypes = [
  { value: 'porte-claquee', label: 'Porte claquée (clés à l\'intérieur)' },
  { value: 'cle-cassee', label: 'Clé cassée dans la serrure' },
  { value: 'cle-perdue', label: 'Clé perdue / volée' },
  { value: 'effraction', label: 'Effraction / Cambriolage' },
  { value: 'serrure-bloquee', label: 'Serrure bloquée / défectueuse' },
  { value: 'autre', label: 'Autre urgence' },
];

export default function UrgenceSerrureriePage() {
  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />

      {/* Hero Section - Optimisé pour conversion */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-red-900 via-slate-900 to-slate-900 overflow-hidden">
        {/* Urgent pulse effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full animate-pulse animation-delay-500" />

        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Content */}
            <div className="text-white">
              <Badge className="mb-6 bg-red-500 text-white border-0 animate-pulse">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Urgence 24h/24
              </Badge>

              <h1 className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Serrurier
                <span className="text-red-400"> urgence</span>
                <br />
                intervention immédiate
              </h1>

              <p className="text-xl text-slate-300 mb-8">
                Bloqué dehors ? Effraction ? Serrure cassée ?
                <br />
                <strong className="text-white">Un artisan arrive en 30 minutes.</strong>
              </p>

              {/* Phone CTA - Main */}
              <a
                href="tel:+33123456789"
                className="inline-flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white px-8 py-5 rounded-2xl text-2xl font-bold mb-8 transition-all hover:scale-105 shadow-xl shadow-red-500/30"
              >
                <Phone className="h-8 w-8" />
                01 23 45 67 89
              </a>

              <p className="text-slate-400 mb-8">
                Appel gratuit • Devis immédiat • Sans engagement
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
                    >
                      <Icon className="h-6 w-6 text-red-400 mx-auto mb-2" />
                      <p className="font-semibold text-white text-sm">{badge.label}</p>
                      <p className="text-xs text-slate-400">{badge.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="font-chillax text-2xl font-bold text-slate-900 mb-2">
                Demande d&apos;intervention rapide
              </h2>
              <p className="text-slate-600 mb-6">
                Remplissez ce formulaire et nous vous rappelons sous 5 minutes.
              </p>

              <form className="space-y-4">
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
                  <Label htmlFor="zip" required>Code postal</Label>
                  <Input
                    id="zip"
                    placeholder="75001"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="urgency-type" required>Type d&apos;urgence</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionnez votre problème" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Détails (optionnel)</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez brièvement votre situation..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Photo de la serrure (optionnel)</Label>
                  <div className="mt-1 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-joel-300 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Cliquez ou glissez une photo</p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG - Max 10 Mo</p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full text-lg">
                  <Zap className="h-5 w-5 mr-2" />
                  Demander un rappel immédiat
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par téléphone 
                  pour votre demande d&apos;intervention.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Section */}
      <Section background="light">
        <SectionHeader
          badge="Pourquoi nous faire confiance ?"
          title="Une intervention d'urgence professionnelle"
          description="Mon Joël, c'est la garantie d'un service rapide, transparent et de qualité."
        />

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-joel-600" />
            </div>
            <h3 className="font-chillax text-xl font-semibold mb-2">Intervention rapide</h3>
            <p className="text-slate-600">
              Nos artisans se déplacent en 30 minutes en moyenne dans les zones urbaines. 
              Disponibles 24h/24, même les jours fériés.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-joel-600" />
            </div>
            <h3 className="font-chillax text-xl font-semibold mb-2">Prix transparent</h3>
            <p className="text-slate-600">
              Devis gratuit avant toute intervention. Vous savez exactement ce que vous paierez, 
              sans mauvaise surprise à la fin.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-joel-600" />
            </div>
            <h3 className="font-chillax text-xl font-semibold mb-2">Artisans certifiés</h3>
            <p className="text-slate-600">
              Tous nos partenaires sont vérifiés, assurés et qualifiés. 
              Travail soigné et garantie sur les interventions.
            </p>
          </Card>
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <SectionHeader
          badge="Simple et rapide"
          title="Comment se déroule une intervention d'urgence ?"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {[
              {
                step: 1,
                icon: Phone,
                title: 'Vous nous appelez ou remplissez le formulaire',
                description: 'Un conseiller prend votre demande et évalue la situation.',
              },
              {
                step: 2,
                icon: MessageSquare,
                title: 'Devis gratuit en quelques minutes',
                description: 'Nous vous donnons une estimation précise du coût avant d\'envoyer un artisan.',
              },
              {
                step: 3,
                icon: MapPin,
                title: 'Un artisan part immédiatement',
                description: 'Le serrurier le plus proche de chez vous se met en route.',
              },
              {
                step: 4,
                icon: CheckCircle,
                title: 'Problème résolu',
                description: 'Intervention professionnelle, paiement sécurisé après le travail.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-joel-500 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* FAQ Urgence */}
      <Section background="light">
        <SectionHeader
          badge="FAQ"
          title="Questions fréquentes - Urgence"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'Combien de temps pour qu\'un serrurier arrive ?',
              a: 'En zone urbaine, nos artisans arrivent en 20 à 40 minutes en moyenne. Le délai exact vous est communiqué lors de votre appel.',
            },
            {
              q: 'Les tarifs sont-ils plus chers la nuit ou le week-end ?',
              a: 'Oui, une majoration s\'applique pour les interventions de nuit (20h-8h) et le week-end. Cette majoration vous est toujours communiquée avant l\'intervention.',
            },
            {
              q: 'Dois-je payer avant l\'intervention ?',
              a: 'Non, vous payez uniquement après l\'intervention, une fois le travail terminé à votre satisfaction. Nous acceptons CB, espèces et chèques.',
            },
            {
              q: 'Et si je ne suis pas satisfait ?',
              a: 'Nous garantissons nos interventions. En cas de problème, contactez notre service client qui trouvera une solution rapidement.',
            },
          ].map((faq) => (
            <Card key={faq.q} className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-red-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-chillax text-3xl font-bold text-white mb-4">
            Besoin d&apos;un serrurier maintenant ?
          </h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Ne restez pas bloqué. Appelez-nous immédiatement, un artisan peut être chez vous 
            en moins de 30 minutes.
          </p>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center gap-3 bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl text-xl font-bold transition-all hover:scale-105"
          >
            <Phone className="h-6 w-6" />
            01 23 45 67 89
          </a>
        </div>
      </section>
    </>
  );
}

