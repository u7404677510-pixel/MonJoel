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
  Plug,
  Droplets,
  MapPin,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { CtaSection } from '@/components/shared/cta-section';
import { generateLocalBusinessSchema } from '@/lib/seo';
import { prices, formatPrice } from '@/lib/prices';

export const metadata: Metadata = {
  title: 'Mon Joël - Dépannage Serrurerie, Électricité, Plomberie 24h/24',
  description:
    'Artisans de confiance pour vos urgences : serrurerie, électricité, plomberie. Intervention rapide 24h/24, devis transparent, tarifs clairs.',
  alternates: {
    canonical: '/',
  },
};

// Les 3 métiers
const trades = [
  {
    id: 'serrurerie' as const,
    icon: Key,
    title: 'Serrurerie',
    description: 'Ouverture de porte, changement de serrure, blindage',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    href: '/services/serrurerie',
  },
  {
    id: 'electricite' as const,
    icon: Plug,
    title: 'Électricité',
    description: 'Panne électrique, tableau, prises, éclairage',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    href: '/services/electricite',
  },
  {
    id: 'plomberie' as const,
    icon: Droplets,
    title: 'Plomberie',
    description: 'Fuite d\'eau, débouchage, chauffe-eau',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    href: '/services/plomberie',
  },
];

const trustPoints = [
  { icon: Clock, title: '24h/24, 7j/7', description: 'Disponibles à tout moment' },
  { icon: Shield, title: 'Artisans vérifiés', description: 'Réseau certifié et assuré' },
  { icon: CreditCard, title: 'Prix fixes', description: 'Devis avant intervention' },
  { icon: Zap, title: '30 min', description: 'Intervention rapide' },
];

const stats = [
  { value: '15 000+', label: 'Interventions' },
  { value: '4.9/5', label: 'Note clients' },
  { value: '30 min', label: 'Délai moyen' },
  { value: '200+', label: 'Artisans' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />

      {/* Hero Section - Clean & Minimal */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="outline" className="mb-6 border-joel-200 text-joel-600">
              <Clock className="h-3 w-3 mr-1" />
              Disponible 24h/24
            </Badge>

            {/* Title */}
            <h1 className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Dépannage{' '}
              <span className="text-joel-600">Serrurerie</span>,{' '}
              <span className="text-amber-500">Électricité</span>,{' '}
              <span className="text-blue-500">Plomberie</span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Des artisans de confiance, une intervention rapide, des prix transparents.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-joel-600 hover:bg-joel-700 text-lg px-8" asChild>
                <a href="tel:+33612018781">
                  <Phone className="h-5 w-5 mr-2" />
                  06 12 01 87 81
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="text-center p-4">
                    <Icon className="h-6 w-6 text-joel-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-900 text-sm">{point.title}</p>
                    <p className="text-xs text-slate-500">{point.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3 Trades - Clean cards */}
      <Section background="light">
        <SectionHeader
          badge="Nos services"
          title="Tous vos dépannages"
          description="Serrurerie, électricité, plomberie : des artisans qualifiés disponibles 24h/24."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {trades.map((trade) => {
            const Icon = trade.icon;
            const categoryData = prices.categories[trade.id];
            const previewServices = categoryData.services.slice(0, 3);

            return (
              <Card key={trade.id} className="overflow-hidden bg-white hover:shadow-lg transition-all border-0 shadow-sm">
                {/* Icon header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${trade.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-chillax text-xl font-bold text-slate-900">{trade.title}</h3>
                      <p className="text-sm text-slate-500">{trade.description}</p>
                    </div>
                  </div>
                </div>

                {/* Services preview */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {previewServices.map((service) => (
                      <li key={service.id} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{service.name}</span>
                        <span className={`font-medium ${trade.textColor}`}>{formatPrice(service)}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={trade.href}>
                      Voir tous les tarifs
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-chillax text-4xl font-bold text-joel-600 mb-1">{stat.value}</p>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section background="light">
        <SectionHeader
          badge="Simple"
          title="Comment ça marche ?"
        />

        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { step: 1, title: 'Appelez-nous', desc: 'Décrivez votre problème' },
            { step: 2, title: 'Devis immédiat', desc: 'Prix fixe avant intervention' },
            { step: 3, title: 'Intervention', desc: 'Artisan chez vous en 30 min' },
            { step: 4, title: 'Paiement', desc: 'Une fois satisfait' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-joel-600 text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Pourquoi Mon Joël ?</Badge>
              <h2 className="font-chillax text-3xl font-bold text-slate-900 mb-6">
                La plateforme qui vous connecte aux meilleurs artisans
              </h2>
              
              <ul className="space-y-4">
                {[
                  'Artisans vérifiés et assurés',
                  'Devis transparent avant intervention',
                  'Prix fixe, aucune surprise',
                  'Paiement après satisfaction',
                  'Service client 7j/7',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-8 bg-slate-50 border-0">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-slate-600">4.9/5</span>
              </div>

              <blockquote className="text-slate-700 mb-6">
                &ldquo;Serrurier arrivé en 25 minutes pour une porte claquée. Prix annoncé = prix payé. Je recommande !&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-joel-100 flex items-center justify-center text-joel-600 font-semibold">
                  ML
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Marie L.</p>
                  <p className="text-sm text-slate-500">Paris 11ème</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Cities */}
      <Section background="light">
        <SectionHeader
          badge="Zones"
          title="Nous intervenons partout"
        />

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-8">
          {['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux', 'Lille', 'Strasbourg', 'Rennes', 'Montpellier', 'Grenoble'].map((city) => (
            <Link
              key={city}
              href={`/ville/${city.toLowerCase()}/serrurier`}
              className="flex items-center justify-center gap-1 bg-white rounded-lg py-3 px-2 text-sm text-slate-700 hover:text-joel-600 hover:shadow-sm transition-all"
            >
              <MapPin className="h-3 w-3 text-joel-500" />
              {city}
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        title="Besoin d'un artisan ?"
        description="Artisans disponibles 24h/24 pour tous vos dépannages."
      />
    </>
  );
}
