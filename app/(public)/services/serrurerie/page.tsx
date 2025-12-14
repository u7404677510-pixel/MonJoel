import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Key, Shield, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';
import { PriceSearch } from '@/components/shared/price-search';
import { prices } from '@/lib/prices';

export const metadata: Metadata = {
  title: 'Tarifs Serrurerie - Tous nos prix',
  description: 'Découvrez nos tarifs serrurerie transparents : ouverture de porte, changement cylindre, blindage. Prix fixes, déplacement inclus. Devis gratuit.',
};

const benefits = [
  { icon: Clock, title: 'Intervention 30 min', description: 'En zone urbaine' },
  { icon: Shield, title: 'Artisans certifiés', description: 'Assurés et qualifiés' },
  { icon: CheckCircle, title: 'Prix tout compris', description: 'Déplacement inclus' },
];

export default function SerrurerieServicesPage() {
  const category = prices.categories.serrurerie;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-joel-600 via-joel-700 to-joel-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-yellow-300/20 text-yellow-300 border border-yellow-300/40">
            <Key className="h-3 w-3 mr-1" />
            {category.services.length} interventions
          </Badge>
          <h1 className="font-chillax text-4xl md:text-5xl font-bold mb-6">
            Tarifs <span className="text-yellow-300">Serrurerie</span>
          </h1>
          <p className="text-xl text-joel-100 mb-8 max-w-2xl mx-auto">
            Prix transparents pour toutes nos interventions de serrurerie. Devis gratuit, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-300 hover:bg-yellow-400 text-joel-950" asChild>
              <a href="tel:+33612018781">
                <Phone className="h-5 w-5 mr-2" />
                06 12 01 87 81
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/urgence-serrurerie">
                Urgence
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section background="light" className="py-8">
        <div className="grid grid-cols-3 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="text-center">
                <Icon className="h-6 w-6 text-joel-600 mx-auto mb-2" />
                <p className="font-medium text-sm text-slate-900">{b.title}</p>
                <p className="text-xs text-slate-500">{b.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Price List */}
      <Section>
        <SectionHeader
          badge="Nos tarifs"
          title="Toutes nos interventions serrurerie"
          description="Prix fixes incluant déplacement, fournitures et nettoyage."
        />
        <PriceSearch 
          services={category.services} 
          category="serrurerie"
          colorClass="bg-violet-100 text-violet-700"
        />
      </Section>

      {/* CTA */}
      <CtaSection
        title="Besoin d'un serrurier ?"
        description="Devis gratuit en 2 minutes. Artisans disponibles 24h/24."
      />
    </>
  );
}
