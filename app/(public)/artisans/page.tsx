import type { Metadata } from 'next';
import {
  Users,
  TrendingUp,
  Smartphone,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Building2,
  Shield,
  HeartHandshake,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Section, SectionHeader, PageHeader } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Devenir Artisan Partenaire | Mon Joël',
  description:
    'Rejoignez le réseau d\'artisans serruriers Mon Joël. Accédez à de nouveaux clients, gérez vos interventions facilement, et développez votre activité.',
  alternates: {
    canonical: '/artisans',
  },
};

const benefits = [
  {
    icon: Users,
    title: 'Accès à de nouveaux clients',
    description: 'Recevez des demandes qualifiées dans votre zone d\'intervention, sans effort de prospection.',
  },
  {
    icon: Smartphone,
    title: 'Application dédiée',
    description: 'Gérez vos interventions, devis et factures depuis une app mobile intuitive.',
  },
  {
    icon: CreditCard,
    title: 'Paiements sécurisés',
    description: 'Recevez vos paiements rapidement et en toute sécurité sur votre compte.',
  },
  {
    icon: TrendingUp,
    title: 'Développez votre CA',
    description: 'Nos artisans partenaires augmentent leur chiffre d\'affaires de 30% en moyenne.',
  },
  {
    icon: Shield,
    title: 'Assurance incluse',
    description: 'Bénéficiez d\'une assurance RC Pro complémentaire pour toutes vos interventions.',
  },
  {
    icon: HeartHandshake,
    title: 'Support dédié',
    description: 'Une équipe à votre écoute pour vous accompagner au quotidien.',
  },
];

const requirements = [
  'Être un professionnel de la serrurerie établi (SIRET actif)',
  'Disposer d\'une assurance responsabilité civile professionnelle',
  'Avoir au minimum 2 ans d\'expérience dans le métier',
  'Respecter notre charte qualité et nos engagements clients',
  'Pouvoir intervenir 24h/24 au moins certains jours de la semaine',
];

const stats = [
  { value: '200+', label: 'Artisans partenaires' },
  { value: '15 000+', label: 'Interventions/an' },
  { value: '30%', label: 'Croissance moyenne' },
  { value: '4.9/5', label: 'Satisfaction client' },
];

export default function ArtisansPage() {
  return (
    <>
      <PageHeader
        title="Rejoignez le réseau Joël"
        description="Développez votre activité de serrurerie en rejoignant un réseau innovant. Plus de clients, moins d'administratif."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Artisans' },
        ]}
      >
        <Badge className="bg-white/20 text-white border-0">
          <Building2 className="h-4 w-4 mr-2" />
          Partenariat B2B
        </Badge>
      </PageHeader>

      {/* Stats */}
      <Section background="light">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-chillax text-4xl md:text-5xl font-bold text-joel-600 mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeader
          badge="Avantages"
          title="Pourquoi rejoindre Mon Joël ?"
          description="Un partenariat gagnant-gagnant pour développer votre activité sereinement."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-joel-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-joel-600" />
                </div>
                <h3 className="font-chillax text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* How it works */}
      <Section background="light">
        <SectionHeader
          badge="Fonctionnement"
          title="Comment ça marche ?"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Inscrivez-vous',
                description: 'Remplissez le formulaire ci-dessous avec vos informations professionnelles.',
              },
              {
                step: 2,
                title: 'Validation de votre profil',
                description: 'Notre équipe vérifie vos documents et valide votre inscription sous 48h.',
              },
              {
                step: 3,
                title: 'Téléchargez l\'application',
                description: 'Accédez à l\'app partenaire pour paramétrer vos disponibilités et zones.',
              },
              {
                step: 4,
                title: 'Recevez vos premières demandes',
                description: 'Des clients vous sont envoyés selon vos zones et disponibilités.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-joel-500 text-white flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="joel" className="mb-4">Prérequis</Badge>
            <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Profil recherché
            </h2>
            <p className="text-slate-600 mb-6">
              Nous recherchons des artisans serruriers professionnels, sérieux et engagés 
              dans la satisfaction client.
            </p>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Application Form */}
          <Card className="p-8" id="formulaire">
            <h3 className="font-chillax text-2xl font-bold text-slate-900 mb-2">
              Candidature partenaire
            </h3>
            <p className="text-slate-600 mb-6">
              Remplissez ce formulaire et nous vous contacterons sous 48h.
            </p>

            <form className="space-y-4">
              <div>
                <Label htmlFor="company" required>Nom de la société</Label>
                <Input id="company" placeholder="Serrurerie Dupont" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="siret" required>SIRET</Label>
                <Input id="siret" placeholder="123 456 789 00012" className="mt-1" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact" required>Nom du contact</Label>
                  <Input id="contact" placeholder="Jean Dupont" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" required>Téléphone</Label>
                  <Input id="phone" type="tel" placeholder="06 12 34 56 78" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="email" required>Email professionnel</Label>
                <Input id="email" type="email" placeholder="contact@serrurerie-dupont.fr" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="zones" required>Zones d&apos;intervention</Label>
                <Input id="zones" placeholder="Paris, 92, 93, 94..." className="mt-1" />
                <p className="text-xs text-slate-500 mt-1">
                  Indiquez les départements ou villes où vous intervenez
                </p>
              </div>

              <div>
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  placeholder="Présentez-vous brièvement, votre expérience, vos spécialités..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Envoyer ma candidature
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-slate-500 text-center">
                En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe 
                commerciale.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="light">
        <SectionHeader
          badge="FAQ"
          title="Questions fréquentes"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'Quel est le coût pour rejoindre le réseau ?',
              a: 'L\'inscription est gratuite. Nous prélevons une commission de 15% sur chaque intervention réalisée via notre plateforme. Pas de frais fixes ni d\'abonnement.',
            },
            {
              q: 'Comment sont attribuées les demandes ?',
              a: 'Les demandes sont envoyées aux artisans disponibles les plus proches du client. Vous pouvez définir vos zones et créneaux de disponibilité dans l\'application.',
            },
            {
              q: 'Puis-je garder mes clients actuels ?',
              a: 'Bien sûr ! Le partenariat Mon Joël vient en complément de votre activité existante. Vos clients restent les vôtres.',
            },
            {
              q: 'Comment sont gérés les paiements ?',
              a: 'Le client paie après l\'intervention (CB, espèces, chèque). Les paiements CB sont virés sur votre compte sous 7 jours, moins notre commission.',
            },
          ].map((faq) => (
            <Card key={faq.q} className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Rejoignez plus de 200 artisans qui font confiance à Mon Joël pour leur croissance.
          </p>
          <Button size="lg" asChild>
            <a href="#formulaire">
              Postuler maintenant
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}

