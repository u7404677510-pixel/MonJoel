import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Clock,
  Shield,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Key,
  DoorOpen,
  ShieldCheck,
  Truck,
  MapPin,
  Wrench,
  Plug,
  Droplets,
  Lightbulb,
  ShowerHead,
  Lock,
  Cable,
  Thermometer,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { CtaSection } from '@/components/shared/cta-section';
import { Testimonials } from '@/components/shared/testimonials';
import { generateLocalBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mon Joël - Dépannage Serrurerie, Électricité, Plomberie 24h/24',
  description:
    'Artisans de confiance pour vos urgences : serrurerie, électricité, plomberie. Intervention rapide 24h/24, devis transparent, tarifs clairs. Appelez maintenant !',
  alternates: {
    canonical: '/',
  },
};

// Les 3 métiers de Mon Joël
const trades = [
  {
    id: 'serrurerie',
    icon: Key,
    title: 'Serrurerie',
    description: 'Ouverture de porte, changement de cylindre, sécurisation',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-100',
    textColor: 'text-violet-600',
    href: '/services/serrurerie',
    services: [
      { icon: DoorOpen, name: 'Ouverture de porte', price: 'À partir de 89€' },
      { icon: Lock, name: 'Changement cylindre', price: 'À partir de 129€' },
      { icon: ShieldCheck, name: 'Blindage porte', price: 'Sur devis' },
    ],
  },
  {
    id: 'electricite',
    icon: Plug,
    title: 'Électricité',
    description: 'Panne électrique, tableau, prises, éclairage',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    href: '/services/electricite',
    services: [
      { icon: Zap, name: 'Panne électrique', price: 'À partir de 79€' },
      { icon: Lightbulb, name: 'Installation éclairage', price: 'À partir de 59€' },
      { icon: Cable, name: 'Tableau électrique', price: 'Sur devis' },
    ],
  },
  {
    id: 'plomberie',
    icon: Droplets,
    title: 'Plomberie',
    description: 'Fuite d\'eau, débouchage, chauffe-eau, sanitaires',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    href: '/services/plomberie',
    services: [
      { icon: Droplets, name: 'Fuite d\'eau', price: 'À partir de 89€' },
      { icon: ShowerHead, name: 'Débouchage', price: 'À partir de 79€' },
      { icon: Thermometer, name: 'Chauffe-eau', price: 'Sur devis' },
    ],
  },
];

const trustBadges = [
  { icon: Clock, label: 'Disponible 24h/24', description: 'Même les jours fériés' },
  { icon: Shield, label: 'Artisans certifiés', description: 'Réseau vérifié et assuré' },
  { icon: CreditCard, label: 'Tarifs transparents', description: 'Devis avant intervention' },
  { icon: Zap, label: 'Intervention rapide', description: 'En 30 min en zone urbaine' },
];

const howItWorks = [
  {
    step: 1,
    title: 'Appelez ou décrivez votre problème',
    description: 'Contactez-nous par téléphone ou remplissez notre formulaire en ligne.',
  },
  {
    step: 2,
    title: 'Devis transparent immédiat',
    description: 'Recevez un devis clair avec le détail des prestations, sans surprise.',
  },
  {
    step: 3,
    title: 'Intervention d\'un artisan certifié',
    description: 'Un professionnel qualifié se déplace chez vous rapidement.',
  },
  {
    step: 4,
    title: 'Paiement après satisfaction',
    description: 'Payez uniquement une fois le travail terminé et validé.',
  },
];

const stats = [
  { value: '15 000+', label: 'Interventions réalisées' },
  { value: '4.9/5', label: 'Note moyenne clients' },
  { value: '30 min', label: 'Délai moyen d\'arrivée' },
  { value: '200+', label: 'Artisans partenaires' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-joel-600 via-joel-700 to-joel-900" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-joel-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <Badge className="mb-6 bg-yellow-300/20 text-yellow-300 border border-yellow-300/40">
              <Clock className="h-3 w-3 mr-1 text-yellow-300" />
              Disponible 24h/24, 7j/7
            </Badge>

            {/* Title */}
            <h1 className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Dépannage{' '}
              <span className="text-yellow-300">Serrurerie</span>,{' '}
              <span className="text-yellow-300">Électricité</span>,{' '}
              <span className="text-yellow-300">Plomberie</span>
            </h1>

            <p className="text-xl text-joel-100 mb-8 max-w-2xl mx-auto">
              Des artisans de confiance, une intervention rapide, des prix transparents. 
              Mon Joël vous connecte avec les meilleurs professionnels près de chez vous.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-yellow-300 hover:bg-yellow-400 text-joel-950 text-lg px-8" asChild>
                <a href="tel:+33612018781" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  06 12 01 87 81
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Demander un devis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-joel-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                Devis gratuit
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                Sans engagement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                Paiement après intervention
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ArrowRight className="h-6 w-6 rotate-90" />
        </div>
      </section>

      {/* Trust Badges */}
      <Section background="light" className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-7 w-7 text-joel-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{badge.label}</h3>
                <p className="text-sm text-slate-500">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 3 Trades Section */}
      <Section>
        <SectionHeader
          badge="Nos métiers"
          title="Tous vos dépannages en un seul endroit"
          description="Serrurerie, électricité, plomberie : des artisans qualifiés pour chaque besoin."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {trades.map((trade) => {
            const TradeIcon = trade.icon;
            return (
              <Card key={trade.id} className="overflow-hidden hover:shadow-xl transition-all group">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${trade.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <TradeIcon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-chillax text-2xl font-bold">{trade.title}</h3>
                      <p className="text-white/80 text-sm">{trade.description}</p>
                    </div>
                  </div>
                </div>

                {/* Services list */}
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    {trade.services.map((service) => {
                      const ServiceIcon = service.icon;
                      return (
                        <li key={service.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${trade.bgColor} flex items-center justify-center`}>
                              <ServiceIcon className={`h-4 w-4 ${trade.textColor}`} />
                            </div>
                            <span className="text-slate-700">{service.name}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-500">{service.price}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <Button className="w-full group-hover:bg-joel-600" asChild>
                    <Link href={trade.href}>
                      Voir les services
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Urgence banner */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="font-chillax text-2xl font-bold mb-2">Urgence ?</h3>
          <p className="text-red-100 mb-6">
            Nos artisans interviennent 24h/24, 7j/7 pour tous vos dépannages urgents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50" asChild>
              <a href="tel:+33612018781">
                <Phone className="h-5 w-5 mr-2" />
                Appeler maintenant
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/urgence">
                Page urgence
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section background="light">
        <SectionHeader
          badge="Simple et rapide"
          title="Comment ça marche ?"
          description="En 4 étapes, votre problème est résolu."
        />

        <div className="grid md:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line */}
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-joel-200" />
              )}
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-joel-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-joel-500/30">
                  {step.step}
                </div>
                <h3 className="font-chillax text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section>
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

      {/* Why choose us */}
      <Section background="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="joel" className="mb-4">Pourquoi Mon Joël ?</Badge>
            <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              La plateforme qui connecte clients et artisans de confiance
            </h2>
            <p className="text-slate-600 mb-8">
              Fini les arnaques et les mauvaises surprises. Mon Joël sélectionne rigoureusement 
              ses artisans partenaires pour vous garantir un service de qualité à prix juste.
            </p>
            
            <ul className="space-y-4">
              {[
                'Artisans vérifiés et assurés',
                'Devis transparent avant intervention',
                'Prix fixé à l\'avance, sans surprise',
                'Paiement après satisfaction',
                'Service client disponible 7j/7',
                'Garantie sur les interventions',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-8 bg-joel-50 border-joel-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-joel-200 border-2 border-white flex items-center justify-center text-joel-600 font-semibold text-sm"
                  >
                    {['JD', 'ML', 'PR', 'AS'][i - 1]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600">+2500 avis vérifiés</p>
              </div>
            </div>

            <blockquote className="text-lg text-slate-700 mb-6">
              « Serrurier arrivé en 25 minutes pour une porte claquée. Prix annoncé au téléphone 
              = prix payé. Je recommande ! »
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-joel-500 flex items-center justify-center text-white font-semibold">
                ML
              </div>
              <div>
                <p className="font-semibold text-slate-900">Marie L.</p>
                <p className="text-sm text-slate-500">Paris 11ème</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <Testimonials />
      </Section>

      {/* Coverage */}
      <Section background="light">
        <SectionHeader
          badge="Zones d'intervention"
          title="Nous intervenons dans toute la France"
          description="Nos artisans sont présents dans les grandes villes et leurs alentours."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes',
            'Bordeaux', 'Lille', 'Strasbourg', 'Rennes', 'Montpellier', 'Grenoble',
          ].map((city) => (
            <Link
              key={city}
              href={`/ville/${city.toLowerCase()}/serrurier`}
              className="flex items-center justify-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-slate-700 hover:text-joel-600"
            >
              <MapPin className="h-4 w-4 text-joel-500" />
              {city}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/zones">
              Voir toutes les zones
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection
        title="Besoin d'un artisan maintenant ?"
        description="Nos professionnels sont disponibles 24h/24 pour tous vos dépannages."
      />
    </>
  );
}
