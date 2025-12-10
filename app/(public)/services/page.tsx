import type { Metadata } from 'next';
import Link from 'next/link';
import {
  DoorOpen,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,
  Blinds,
  ArrowRight,
  CheckCircle,
  Phone,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader, PageHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';
import { JsonLd } from '@/components/shared/json-ld';
import { generateServiceSchema } from '@/lib/seo';
import { getAllServices, getServicesGrouped } from '@/lib/services';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services de Serrurerie - Ouverture, Installation, Dépannage | Mon Joël',
  description:
    'Découvrez tous nos services de serrurerie : ouverture de porte, changement de cylindre, serrure multipoints, sécurisation, blindage. Devis gratuit, intervention rapide.',
  alternates: {
    canonical: '/services',
  },
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'ouverture-porte': DoorOpen,
  'changement-cylindre': Key,
  'serrure-multipoints': Shield,
  'securisation-effraction': ShieldAlert,
  'blindage-porte': ShieldCheck,
  'coffre-fort': Lock,
  'double-cles': KeyRound,
  'depannage-volet': Blinds,
};

export default function ServicesPage() {
  const services = getAllServices();
  const servicesGrouped = getServicesGrouped();

  // Generate JSON-LD for each service
  const servicesJsonLd = services.map((service) =>
    generateServiceSchema(
      service.title,
      service.shortDescription,
      { min: service.basePrice / 100, max: (service.basePrice * 1.5) / 100 }
    )
  );

  return (
    <>
      {servicesJsonLd.map((jsonLd, index) => (
        <JsonLd key={index} data={jsonLd} />
      ))}

      <PageHeader
        title="Nos services de serrurerie"
        description="Des solutions professionnelles pour tous vos besoins en serrurerie. Intervention rapide, tarifs transparents, artisans certifiés."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Services' },
        ]}
      />

      {/* Services by category */}
      {Object.entries(servicesGrouped).map(([category, categoryServices]) => (
        <Section key={category} background={category === 'Ouverture & Accès' ? 'white' : 'light'}>
          <SectionHeader
            title={category}
            centered={false}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {categoryServices.map((service) => {
              const Icon = serviceIcons[service.id] ?? Lock;
              return (
                <Card
                  key={service.id}
                  id={service.slug}
                  className="p-6 hover:shadow-xl transition-all scroll-mt-32"
                >
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-xl bg-joel-100 flex items-center justify-center shrink-0">
                      <Icon className="h-7 w-7 text-joel-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-chillax text-xl font-semibold text-slate-900">
                          {service.title}
                        </h3>
                        {service.popular && (
                          <Badge variant="joel" className="shrink-0">Populaire</Badge>
                        )}
                      </div>
                      <p className="text-slate-600 mb-4">{service.shortDescription}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="text-joel-600 font-semibold">
                          À partir de {formatPrice(service.basePrice)}
                        </div>
                        <div className="text-slate-500">
                          ⏱ {service.estimatedDuration}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded description */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600 whitespace-pre-line">
                      {service.longDescription}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Button size="sm" asChild>
                        <Link href="/diagnostic-ia">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Diagnostic gratuit
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href="tel:+33123456789">
                          <Phone className="h-4 w-4 mr-2" />
                          Appeler
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      ))}

      {/* Why choose us */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="joel" className="mb-4">Nos engagements</Badge>
            <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Pourquoi choisir Mon Joël ?
            </h2>
            <ul className="space-y-4">
              {[
                'Artisans certifiés et assurés',
                'Devis gratuit et transparent avant intervention',
                'Intervention rapide 24h/24, 7j/7',
                'Paiement sécurisé après le travail',
                'Garantie sur les interventions et le matériel',
                'Service client disponible et réactif',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-success-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-8 bg-joel-50 border-joel-100">
            <h3 className="font-chillax text-2xl font-bold text-slate-900 mb-4">
              Besoin d&apos;un devis ?
            </h3>
            <p className="text-slate-600 mb-6">
              Utilisez notre diagnostic IA pour obtenir une estimation instantanée, 
              ou appelez-nous pour parler à un conseiller.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/diagnostic-ia">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Diagnostic IA
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+33123456789">
                  <Phone className="h-5 w-5 mr-2" />
                  01 23 45 67 89
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <CtaSection variant="urgent" />
    </>
  );
}

