import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Clock,
  Shield,
  Phone,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';
import { Testimonials } from '@/components/shared/testimonials';
import { JsonLd } from '@/components/shared/json-ld';
import { 
  getCityBySlug, 
  getNearbyCities, 
  generateCitySeoTitle, 
  generateCitySeoDescription,
  generateCityH1,
  generateCityIntro,
  CITIES,
} from '@/lib/growth/locations';
import { getPopularServices } from '@/lib/services';
import { generateCityServiceSchema } from '@/lib/seo';
import { formatPrice } from '@/lib/utils';

interface Props {
  params: Promise<{ ville: string; service: string }>;
}

// Services mapping
const serviceMap: Record<string, { title: string; description: string }> = {
  'serrurier': {
    title: 'Serrurier',
    description: 'service de serrurerie',
  },
  'ouverture-de-porte': {
    title: 'Ouverture de porte',
    description: 'ouverture de porte',
  },
  'changement-cylindre': {
    title: 'Changement de cylindre',
    description: 'changement de cylindre',
  },
  'serrure-multipoints': {
    title: 'Serrure multipoints',
    description: 'installation de serrure multipoints',
  },
  'securisation': {
    title: 'Sécurisation',
    description: 'sécurisation après effraction',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville, service } = await params;
  const city = getCityBySlug(ville);
  const serviceInfo = serviceMap[service];

  if (!city || !serviceInfo) {
    return { title: 'Page non trouvée' };
  }

  const title = generateCitySeoTitle(city.name, serviceInfo.title);
  const description = generateCitySeoDescription(city.name, serviceInfo.title);

  return {
    title,
    description,
    alternates: {
      canonical: `/ville/${ville}/${service}`,
    },
    openGraph: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const services = Object.keys(serviceMap);
  const cities = CITIES.slice(0, 5); // Generate for top 5 cities

  const params: { ville: string; service: string }[] = [];
  
  for (const city of cities) {
    for (const service of services) {
      params.push({ ville: city.slug, service });
    }
  }

  return params;
}

export default async function CityServicePage({ params }: Props) {
  const { ville, service } = await params;
  const city = getCityBySlug(ville);
  const serviceInfo = serviceMap[service];

  if (!city || !serviceInfo) {
    notFound();
  }

  const nearbyCities = getNearbyCities(city.slug, 6);
  const popularServices = getPopularServices();

  return (
    <>
      <JsonLd
        data={generateCityServiceSchema(
          city.name,
          serviceInfo.title,
          generateCitySeoDescription(city.name, serviceInfo.title)
        )}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-joel-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-joel-500/20 text-joel-300 border border-joel-500/30">
              <MapPin className="h-4 w-4 mr-2" />
              {city.name}, {city.region}
            </Badge>

            <h1 className="font-chillax text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {generateCityH1(city.name, serviceInfo.title)}
            </h1>

            <p className="text-xl text-slate-300 mb-8">
              {generateCityIntro(city.name, serviceInfo.description)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/diagnostic-ia">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Diagnostic gratuit
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="tel:+33123456789">
                  <Phone className="h-5 w-5 mr-2" />
                  01 23 45 67 89
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-joel-400" />
                Intervention en 30 min
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-joel-400" />
                Artisans certifiés
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-joel-400" />
                Devis transparent
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services disponibles */}
      <Section>
        <SectionHeader
          badge={`Services à ${city.name}`}
          title="Nos interventions de serrurerie"
          description={`Tous nos services de serrurerie sont disponibles à ${city.name} et ses environs, 24h/24 et 7j/7.`}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((svc) => (
            <Card key={svc.id} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-chillax text-xl font-semibold text-slate-900 mb-2">
                {svc.title}
              </h3>
              <p className="text-slate-600 mb-4">{svc.shortDescription}</p>
              <div className="flex items-center justify-between">
                <p className="text-joel-600 font-semibold">
                  À partir de {formatPrice(svc.basePrice)}
                </p>
                <Link
                  href={`/ville/${ville}/${svc.slug}`}
                  className="text-joel-500 hover:text-joel-600 text-sm font-medium"
                >
                  En savoir plus →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Zone d'intervention */}
      <Section background="light">
        <SectionHeader
          badge="Zone couverte"
          title={`Intervention rapide à ${city.name}`}
          description={`Nos artisans partenaires interviennent dans tout${city.name === 'Paris' ? '' : 'e la ville de'} ${city.name} et les communes environnantes.`}
        />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Codes postaux desservis :
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {city.zip.slice(0, 10).map((zip) => (
                <Badge key={zip} variant="secondary">{zip}</Badge>
              ))}
              {city.zip.length > 10 && (
                <Badge variant="secondary">+{city.zip.length - 10} autres</Badge>
              )}
            </div>

            <h3 className="font-semibold text-slate-900 mb-4">
              Nous intervenons aussi à :
            </h3>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/ville/${nearby.slug}/${service}`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-sm text-slate-700 hover:border-joel-300 transition-colors"
                >
                  <MapPin className="h-3 w-3 text-joel-500" />
                  {nearby.name}
                </Link>
              ))}
            </div>
          </div>

          <Card className="p-6 bg-joel-50 border-joel-100">
            <h3 className="font-chillax text-xl font-semibold text-slate-900 mb-4">
              Pourquoi choisir Mon Joël à {city.name} ?
            </h3>
            <ul className="space-y-3">
              {[
                'Artisans locaux basés dans votre région',
                'Intervention rapide (30 min en moyenne)',
                'Devis gratuit et transparent par IA',
                'Disponible 24h/24, même les jours fériés',
                'Paiement après intervention seulement',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-joel-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader
          badge="Avis clients"
          title={`Ce que disent nos clients à ${city.name}`}
        />
        <Testimonials />
      </Section>

      {/* CTA */}
      <CtaSection
        title={`Besoin d'un serrurier à ${city.name} ?`}
        description="Obtenez un devis instantané grâce à notre diagnostic IA, ou appelez-nous pour une intervention immédiate."
      />
    </>
  );
}

