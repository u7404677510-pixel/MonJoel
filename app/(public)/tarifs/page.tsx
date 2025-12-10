import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  Info,
  Moon,
  CalendarDays,
  Zap,
  Phone,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Section, SectionHeader, PageHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';
import { JsonLd } from '@/components/shared/json-ld';
import { generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tarifs Serrurier - Prix Transparents | Mon Joël',
  description:
    'Consultez nos tarifs de serrurerie en toute transparence. Ouverture de porte à partir de 89€, changement de cylindre à partir de 129€. Devis gratuit avant intervention.',
  alternates: {
    canonical: '/tarifs',
  },
};

const pricingData = {
  ouverture: {
    title: 'Ouverture de porte',
    items: [
      { service: 'Ouverture porte simple (claquée)', price: '89 €', details: 'Sans dégradation' },
      { service: 'Ouverture porte blindée', price: '149 €', details: 'Technique spécialisée' },
      { service: 'Ouverture porte 3 points', price: '129 €', details: 'Serrure multipoints' },
      { service: 'Ouverture coffre-fort', price: 'Sur devis', details: 'Selon modèle' },
    ],
  },
  cylindres: {
    title: 'Changement de cylindre',
    items: [
      { service: 'Cylindre standard', price: '129 €', details: 'Fourni et posé' },
      { service: 'Cylindre de sécurité', price: '189 €', details: 'Niveau renforcé' },
      { service: 'Cylindre A2P*', price: '249 €', details: 'Haute sécurité certifiée' },
      { service: 'Cylindre A2P** ou ***', price: 'Sur devis', details: 'Maximum sécurité' },
    ],
  },
  serrures: {
    title: 'Serrures multipoints',
    items: [
      { service: 'Serrure 3 points encastrée', price: '299 €', details: 'Fourniture et pose' },
      { service: 'Serrure 5 points encastrée', price: '399 €', details: 'Fourniture et pose' },
      { service: 'Serrure carénée 3 points', price: '449 €', details: 'Avec carénage' },
      { service: 'Serrure carénée 5 points', price: '549 €', details: 'Avec carénage' },
    ],
  },
  securisation: {
    title: 'Sécurisation & Blindage',
    items: [
      { service: 'Sécurisation après effraction', price: '149 €', details: 'Mise en sécurité rapide' },
      { service: 'Blindage porte existante', price: '899 €', details: 'Pivot ou fourreau' },
      { service: 'Cornières anti-dégondage', price: '149 €', details: 'Protection des gonds' },
      { service: 'Barre de seuil', price: '99 €', details: 'Renfort bas de porte' },
    ],
  },
  autres: {
    title: 'Autres services',
    items: [
      { service: 'Double de clé standard', price: '15 €', details: 'Reproduction' },
      { service: 'Double de clé sécurisée', price: '45 €', details: 'Avec carte' },
      { service: 'Dépannage volet roulant', price: '99 €', details: 'Diagnostic + réparation' },
      { service: 'Déplacement', price: '39 €', details: 'Inclus dans les forfaits' },
    ],
  },
};

const surcharges = [
  {
    icon: Moon,
    label: 'Nuit (20h-8h)',
    value: '+50%',
    description: 'Majoration pour intervention nocturne',
  },
  {
    icon: CalendarDays,
    label: 'Week-end',
    value: '+30%',
    description: 'Majoration samedi et dimanche',
  },
  {
    icon: Zap,
    label: 'Urgence',
    value: '+25%',
    description: 'Intervention sous 30 minutes',
  },
];

export default function TarifsPage() {
  return (
    <>
      <JsonLd
        data={generateServiceSchema(
          'Services de serrurerie',
          'Tarifs transparents pour tous services de serrurerie : ouverture de porte, changement de cylindre, installation de serrures multipoints.',
          { min: 89, max: 899 }
        )}
      />

      <PageHeader
        title="Nos tarifs de serrurerie"
        description="Des prix clairs et transparents. Vous savez exactement ce que vous allez payer avant l'intervention."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Tarifs' },
        ]}
      />

      {/* Pricing Guarantee */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-joel-200 bg-joel-50">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-joel-500 flex items-center justify-center shrink-0">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="font-chillax text-2xl font-bold text-slate-900 mb-2">
                  Notre engagement transparence
                </h2>
                <p className="text-slate-700 mb-4">
                  Tous les tarifs affichés sont TTC et comprennent le déplacement (en zone urbaine). 
                  Vous recevez un devis détaillé avant toute intervention. Aucun frais caché, 
                  aucune surprise à la fin.
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    Devis gratuit et sans engagement
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    Prix fixé avant intervention
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    Paiement après le travail
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    Facture détaillée fournie
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Pricing Tables */}
      {Object.entries(pricingData).map(([key, category], index) => (
        <Section key={key} background={index % 2 === 0 ? 'white' : 'light'}>
          <SectionHeader title={category.title} centered={false} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Service</TableHead>
                <TableHead>Détails</TableHead>
                <TableHead className="text-right">Prix TTC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.items.map((item) => (
                <TableRow key={item.service}>
                  <TableCell className="font-medium">{item.service}</TableCell>
                  <TableCell className="text-slate-500">{item.details}</TableCell>
                  <TableCell className="text-right font-semibold text-joel-600">
                    {item.price.includes('devis') ? (
                      <Badge variant="secondary">Sur devis</Badge>
                    ) : (
                      `À partir de ${item.price}`
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      ))}

      {/* Surcharges */}
      <Section>
        <SectionHeader
          badge="Majorations"
          title="Tarifs spéciaux"
          description="Des majorations peuvent s'appliquer dans certaines situations. Elles vous sont toujours communiquées avant l'intervention."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {surcharges.map((surcharge) => {
            const Icon = surcharge.icon;
            return (
              <Card key={surcharge.label} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{surcharge.label}</h3>
                <p className="text-2xl font-bold text-joel-600 mb-2">{surcharge.value}</p>
                <p className="text-sm text-slate-500">{surcharge.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex gap-4">
              <Info className="h-6 w-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Bon à savoir</h4>
                <p className="text-sm text-blue-800">
                  Les majorations ne sont pas cumulables au-delà de 75%. Par exemple, une intervention 
                  de nuit le week-end sera majorée de 75% maximum (et non 80%). Les jours fériés sont 
                  considérés comme des week-ends.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Get a quote */}
      <Section background="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Obtenez votre devis personnalisé
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Pour un devis précis adapté à votre situation, utilisez notre diagnostic IA 
            ou appelez-nous directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/diagnostic-ia">
                <Sparkles className="h-5 w-5 mr-2" />
                Diagnostic IA gratuit
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+33123456789">
                <Phone className="h-5 w-5 mr-2" />
                01 23 45 67 89
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader
          badge="FAQ"
          title="Questions sur les tarifs"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'Le devis est-il vraiment gratuit ?',
              a: 'Oui, le devis est toujours gratuit et sans engagement. Vous pouvez refuser l\'intervention si le prix ne vous convient pas, sans aucun frais.',
            },
            {
              q: 'Les prix incluent-ils le déplacement ?',
              a: 'Oui, tous nos tarifs incluent le déplacement en zone urbaine (généralement dans un rayon de 15-20 km). Au-delà, un supplément peut s\'appliquer, toujours communiqué à l\'avance.',
            },
            {
              q: 'Quels moyens de paiement acceptez-vous ?',
              a: 'Nous acceptons les cartes bancaires, les espèces et les chèques. Le paiement s\'effectue après l\'intervention, une fois que vous êtes satisfait du travail.',
            },
            {
              q: 'Pourquoi les prix varient-ils ?',
              a: 'Le prix final dépend de plusieurs facteurs : type de serrure, complexité de l\'intervention, pièces nécessaires, horaires. C\'est pourquoi nous établissons toujours un devis personnalisé.',
            },
          ].map((faq) => (
            <Card key={faq.q} className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}

