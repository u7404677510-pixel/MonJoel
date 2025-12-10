import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Sparkles,
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
  Camera,
  FileText,
  Truck,
  MapPin,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { CtaSection } from '@/components/shared/cta-section';
import { Testimonials, FeaturedTestimonial } from '@/components/shared/testimonials';
import { generateLocalBusinessSchema } from '@/lib/seo';
import { getPopularServices } from '@/lib/services';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Mon Joël - Serrurier de confiance | Dépannage 24h/24',
  description:
    'Serrurier disponible 24h/24 pour vos urgences. Devis transparent avant intervention, artisans certifiés, tarifs clairs. Ouverture de porte, changement de cylindre, sécurisation.',
  alternates: {
    canonical: '/',
  },
};

const trustBadges = [
  { icon: Clock, label: 'Disponible 24h/24, 7j/7', description: 'Même les jours fériés' },
  { icon: Shield, label: 'Artisans certifiés', description: 'Réseau vérifié et assuré' },
  { icon: CreditCard, label: 'Tarifs transparents', description: 'Devis avant intervention' },
  { icon: Zap, label: 'Intervention rapide', description: 'En 30 min en zone urbaine' },
];

const howItWorks = [
  {
    step: 1,
    icon: Camera,
    title: 'Décrivez votre problème',
    description: 'Prenez une photo de votre serrure et décrivez votre situation en quelques mots.',
  },
  {
    step: 2,
    icon: Sparkles,
    title: 'Diagnostic IA instantané',
    description: 'Notre intelligence artificielle analyse votre demande et identifie la solution.',
  },
  {
    step: 3,
    icon: FileText,
    title: 'Devis transparent',
    description: 'Recevez un devis précis avec le détail des prestations et aucun frais caché.',
  },
  {
    step: 4,
    icon: Truck,
    title: 'Intervention rapide',
    description: 'Un artisan certifié se déplace chez vous pour résoudre votre problème.',
  },
];

const faqs = [
  {
    question: 'Comment fonctionne le diagnostic IA ?',
    answer:
      "Envoyez une photo de votre serrure et décrivez votre problème. Notre IA analyse ces informations pour identifier le type de serrure, évaluer la complexité de l'intervention et vous fournir un devis précis en quelques minutes.",
  },
  {
    question: 'Quels sont vos délais d\'intervention ?',
    answer:
      'En zone urbaine, nous intervenons généralement en 20 à 40 minutes. Le délai exact vous est communiqué au moment de la prise en charge de votre demande.',
  },
  {
    question: 'Les tarifs sont-ils vraiment transparents ?',
    answer:
      'Oui, absolument. Vous recevez un devis détaillé avant toute intervention, incluant le prix de la main d\'œuvre, des pièces et du déplacement. Aucune mauvaise surprise à la fin.',
  },
];

export default function HomePage() {
  const popularServices = getPopularServices();

  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background - Gradient violet clair vers sombre */}
        <div className="absolute inset-0 bg-gradient-to-br from-joel-950 via-joel-900 to-joel-800" />
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        
        {/* Decorative blurs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-joel-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <Badge variant="joel" className="mb-6 bg-yellow-300/20 text-yellow-300 border border-yellow-300/40">
                <Clock className="h-3 w-3 mr-1 text-yellow-300" />
                Disponible 24h/24
              </Badge>

              <h1 className="font-chillax text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
                Serrurier de
                <span className="text-joel-400"> confiance</span>
                <br />
                intervention rapide
              </h1>

              <p className="text-xl text-joel-200 mb-8 max-w-lg">
                Porte claquée, clé perdue, serrure bloquée ? Un artisan certifié 
                intervient chez vous en 30 minutes avec un devis clair avant intervention.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="xl" className="text-lg group bg-joel-500 hover:bg-joel-600" asChild>
                  <Link href="/urgence-serrurerie">
                    <Zap className="h-5 w-5 mr-2" />
                    Demander un devis
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="text-lg border-white/30 text-white hover:bg-white/10" asChild>
                  <a href="tel:+33123456789">
                    <Phone className="h-5 w-5 mr-2" />
                    01 23 45 67 89
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-joel-200">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                    ))}
                  </div>
                  <span>4.9/5 sur 2 500+ avis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-joel-200">
                  <CheckCircle className="h-4 w-4 text-yellow-300" />
                  <span>+15 000 interventions</span>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Card */}
            <div className="relative">
              <div className="bg-joel-800/50 backdrop-blur-lg rounded-3xl p-8 border border-joel-600/30">
                <h3 className="font-chillax text-xl font-semibold text-white mb-6">
                  Pourquoi choisir Mon Joël ?
                </h3>
                <div className="space-y-4">
                  {trustBadges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div key={badge.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-joel-500/30 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-joel-300" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{badge.label}</p>
                          <p className="text-sm text-joel-300">{badge.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating badge - Yellow accent */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-300 text-joel-950 px-5 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Intervention en 30 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <Section background="light">
        <SectionHeader
          badge="Simple et rapide"
          title="Comment ça marche ?"
          description="De votre demande à l'intervention, tout est pensé pour être simple, rapide et transparent."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {/* Connection line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-joel-200" />
                )}
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-joel-500 text-white mb-4 shadow-lg shadow-joel-500/30">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/3 w-7 h-7 rounded-full bg-yellow-300 border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-joel-950">
                    {step.step}
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

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-yellow-300 hover:bg-yellow-400 text-joel-950" asChild>
            <Link href="/urgence-serrurerie">
              Demander une intervention
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Popular Services */}
      <Section>
        <SectionHeader
          badge="Nos services"
          title="Nos interventions les plus demandées"
          description="Des solutions adaptées à chaque situation, avec des tarifs clairs et sans surprise."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <Card key={service.id} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-joel-100 to-yellow-100 flex items-center justify-center mb-4">
                {service.id === 'ouverture-porte' && <DoorOpen className="h-6 w-6 text-joel-600" />}
                {service.id === 'changement-cylindre' && <Key className="h-6 w-6 text-joel-600" />}
                {service.id === 'securisation-effraction' && <ShieldCheck className="h-6 w-6 text-joel-600" />}
              </div>
              <h3 className="font-chillax text-xl font-semibold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-4">{service.shortDescription}</p>
              <div className="flex items-center justify-between">
                <p className="text-joel-600 font-semibold">
                  À partir de {formatPrice(service.basePrice)}
                </p>
                <Link
                  href={`/services#${service.slug}`}
                  className="text-joel-500 hover:text-joel-600 font-medium text-sm flex items-center gap-1"
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              Voir tous les services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="light">
        <SectionHeader
          badge="Avis clients"
          title="Ce que disent nos clients"
          description="Plus de 15 000 interventions réussies et des clients satisfaits partout en France."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Testimonials />
          </div>
          <div>
            <FeaturedTestimonial />
          </div>
        </div>
      </Section>

      {/* Pricing Teaser */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="joel" className="mb-4">Transparence</Badge>
            <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Des tarifs clairs, sans mauvaise surprise
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Chez Mon Joël, nous croyons en la transparence totale. Vous connaissez le prix 
              de l&apos;intervention avant qu&apos;elle ne commence, grâce à notre diagnostic IA.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="h-5 w-5 text-success-500" />
                Devis détaillé avant intervention
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="h-5 w-5 text-success-500" />
                Pas de frais cachés ni de surfacturation
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="h-5 w-5 text-success-500" />
                Tarifs majorés clairement indiqués (nuit, week-end)
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="h-5 w-5 text-success-500" />
                Paiement sécurisé après intervention
              </li>
            </ul>
            <Button size="lg" asChild>
              <Link href="/tarifs">
                Consulter nos tarifs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="font-chillax text-xl font-semibold text-slate-900 mb-6">
              Exemples de tarifs
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Ouverture porte simple</p>
                  <p className="text-sm text-slate-500">Sans dégradation</p>
                </div>
                <p className="font-semibold text-joel-600">à partir de 89 €</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Changement de cylindre</p>
                  <p className="text-sm text-slate-500">Cylindre standard fourni</p>
                </div>
                <p className="font-semibold text-joel-600">à partir de 129 €</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Serrure 3 points</p>
                  <p className="text-sm text-slate-500">Fourniture et pose</p>
                </div>
                <p className="font-semibold text-joel-600">à partir de 299 €</p>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-slate-900">Sécurisation urgence</p>
                  <p className="text-sm text-slate-500">Après effraction</p>
                </div>
                <p className="font-semibold text-joel-600">à partir de 149 €</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              * Prix TTC indicatifs pour une intervention en journée. Devis précis après diagnostic.
            </p>
          </div>
        </div>
      </Section>

      {/* Coverage */}
      <Section background="light">
        <SectionHeader
          badge="Zone d'intervention"
          title="Nous intervenons partout en France"
          description="Un réseau d'artisans partenaires couvrant les principales villes et agglomérations."
        />

        <div className="flex flex-wrap justify-center gap-3">
          {['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Lille', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Rennes', 'Grenoble'].map((city) => (
            <Link
              key={city}
              href={`/ville/${city.toLowerCase()}/serrurier`}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-joel-300 hover:shadow-md transition-all"
            >
              <MapPin className="h-4 w-4 text-joel-500" />
              <span className="text-slate-700">{city}</span>
            </Link>
          ))}
        </div>

        <p className="text-center mt-8 text-slate-600">
          Et bien d&apos;autres villes...{' '}
          <Link href="/contact" className="text-joel-500 hover:underline">
            Contactez-nous pour vérifier la disponibilité dans votre zone
          </Link>
        </p>
      </Section>

      {/* FAQ Teaser */}
      <Section>
        <SectionHeader
          badge="FAQ"
          title="Questions fréquentes"
          description="Les réponses aux questions que vous vous posez le plus souvent."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-slate-600">{faq.answer}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/faq">
              Voir toutes les questions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}

