import type { Metadata } from 'next';
import Link from 'next/link';
import { Key, Plug, Droplets, Phone, ArrowRight, Info, CheckCircle, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';
import { prices, formatPrice } from '@/lib/prices';

export const metadata: Metadata = {
  title: 'Tarifs - Serrurerie, Électricité, Plomberie',
  description:
    'Tous nos tarifs en toute transparence : serrurerie, électricité, plomberie. Déplacement et fournitures inclus. Devis gratuit 24h/24.',
  alternates: {
    canonical: '/tarifs',
  },
};

const categories = [
  {
    id: 'serrurerie' as const,
    title: 'Serrurerie',
    icon: Key,
    color: 'bg-violet-100 text-violet-600',
    badgeColor: 'bg-violet-100 text-violet-700',
    href: '/services/serrurerie',
  },
  {
    id: 'electricite' as const,
    title: 'Électricité',
    icon: Plug,
    color: 'bg-amber-100 text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    href: '/services/electricite',
  },
  {
    id: 'plomberie' as const,
    title: 'Plomberie',
    icon: Droplets,
    color: 'bg-blue-100 text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
    href: '/services/plomberie',
  },
];

const benefits = [
  { icon: CheckCircle, title: 'Déplacement inclus', description: 'Aucun frais supplémentaire' },
  { icon: CheckCircle, title: 'Fournitures incluses', description: 'Pièces comprises dans le prix' },
  { icon: CheckCircle, title: 'Nettoyage inclus', description: 'Chantier propre garanti' },
  { icon: Info, title: 'Majorations horaires', description: 'Soir, week-end, jours fériés' },
];

export default function TarifsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-joel-600 via-joel-700 to-joel-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-yellow-300/20 text-yellow-300 border border-yellow-300/40">
            Prix transparents
          </Badge>
          <h1 className="font-chillax text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="text-yellow-300">Tarifs</span>
          </h1>
          <p className="text-xl text-joel-100 mb-8 max-w-2xl mx-auto">
            Des prix clairs et transparents pour tous nos services. Déplacement, fournitures et nettoyage inclus.
          </p>
          <Button size="lg" className="bg-yellow-300 hover:bg-yellow-400 text-joel-950" asChild>
            <a href="tel:+33612018781">
              <Phone className="h-5 w-5 mr-2" />
              06 12 01 87 81
            </a>
          </Button>
        </div>
      </section>

      {/* Benefits bar */}
      <Section background="light" className="py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="text-center">
                <Icon className="h-5 w-5 text-joel-600 mx-auto mb-2" />
                <p className="font-medium text-sm text-slate-900">{b.title}</p>
                <p className="text-xs text-slate-500">{b.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Disclaimer */}
      <Section className="pt-8 pb-0">
        <Alert className="bg-amber-50 border-amber-200 max-w-4xl mx-auto">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            {prices.disclaimer}
          </AlertDescription>
        </Alert>
      </Section>

      {/* Categories */}
      <Section>
        <SectionHeader
          badge="Choisissez votre métier"
          title="Tous nos tarifs par catégorie"
          description="Cliquez sur une catégorie pour voir toutes les interventions et leurs prix."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const categoryData = prices.categories[cat.id];
            const previewServices = categoryData.services.slice(0, 5);

            return (
              <Card key={cat.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`p-6 ${cat.color.split(' ')[0]}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-chillax text-xl font-bold text-slate-900">{cat.title}</h3>
                      <p className="text-sm text-slate-500">{categoryData.services.length} interventions</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {previewServices.map((service) => (
                      <li key={service.id} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700 truncate mr-2">{service.name}</span>
                        <Badge variant="secondary" className={cat.badgeColor}>
                          {formatPrice(service)}
                        </Badge>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full" asChild>
                    <Link href={cat.href}>
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

      {/* Trust section */}
      <Section background="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-chillax text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Pourquoi nos prix sont transparents ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Clock className="h-8 w-8 text-joel-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Prix fixe avant intervention</h3>
              <p className="text-sm text-slate-600">
                Vous connaissez le prix exact avant que l&apos;artisan n&apos;intervienne.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Shield className="h-8 w-8 text-joel-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Aucune surprise</h3>
              <p className="text-sm text-slate-600">
                Le prix annoncé est le prix payé. Pas de frais cachés.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <CheckCircle className="h-8 w-8 text-joel-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Tout compris</h3>
              <p className="text-sm text-slate-600">
                Déplacement, main d&apos;œuvre, fournitures et nettoyage inclus.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        title="Besoin d'un devis personnalisé ?"
        description="Appelez-nous ou remplissez notre formulaire pour un devis gratuit en 2 minutes."
      />
    </>
  );
}
