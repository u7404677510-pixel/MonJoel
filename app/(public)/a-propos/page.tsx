import type { Metadata } from 'next';
import {
  Shield,
  Eye,
  Zap,
  Lightbulb,
  CheckCircle,
  Quote,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader, PageHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';

export const metadata: Metadata = {
  title: 'À Propos de Mon Joël - Notre Mission | Serrurerie Intelligente',
  description:
    'Découvrez Mon Joël, le service de serrurerie qui révolutionne le secteur grâce à l\'IA. Notre mission : des interventions rapides, des prix justes, et la fin des arnaques.',
  alternates: {
    canonical: '/a-propos',
  },
};

const values = [
  {
    icon: Eye,
    title: 'Transparence',
    description: 'Devis clairs, prix affichés, pas de surprise. Vous savez ce que vous payez avant l\'intervention.',
  },
  {
    icon: Shield,
    title: 'Confiance',
    description: 'Des artisans vérifiés, assurés et évalués par nos clients. La qualité avant tout.',
  },
  {
    icon: Zap,
    title: 'Réactivité',
    description: 'Intervention rapide 24h/24. Parce qu\'une urgence ne prévient pas.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'L\'IA au service d\'un métier traditionnel pour une expérience client optimale.',
  },
];

const timeline = [
  {
    year: '2023',
    title: 'L\'idée naît',
    description: 'Après une mauvaise expérience avec un serrurier peu scrupuleux, notre fondateur décide de créer la solution qu\'il aurait aimé avoir.',
  },
  {
    year: '2024',
    title: 'Lancement de Mon Joël',
    description: 'La plateforme est lancée avec 50 artisans partenaires en Île-de-France. Le diagnostic IA est développé.',
  },
  {
    year: '2024',
    title: 'Expansion nationale',
    description: 'Mon Joël s\'étend à Lyon, Marseille, Bordeaux et Toulouse. Plus de 200 artisans rejoignent le réseau.',
  },
  {
    year: '2025',
    title: 'Aujourd\'hui',
    description: 'Plus de 15 000 interventions réalisées, 4.9/5 de satisfaction client, et une ambition : devenir la référence en France.',
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        title="À propos de Mon Joël"
        description="La serrurerie de confiance, réinventée grâce à la technologie. Découvrez notre mission et nos valeurs."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'À propos' },
        ]}
      />

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="joel" className="mb-4">Notre mission</Badge>
            <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              En finir avec les mauvaises surprises en serrurerie
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Combien de personnes se sont fait arnaquer par des serruriers peu scrupuleux ? 
                Des factures qui triplent à la fin de l&apos;intervention, des pièces remplacées 
                inutilement, des prix qui explosent la nuit...
              </p>
              <p>
                <strong className="text-slate-900">Mon Joël est né de ce constat.</strong> Nous 
                voulions créer un service de serrurerie où le client est informé, respecté, et 
                protégé. Un service où le prix est connu avant l&apos;intervention, où les artisans 
                sont de vrais professionnels, et où la technologie sert à améliorer l&apos;expérience.
              </p>
              <p>
                Grâce à notre diagnostic IA, vous savez en quelques minutes ce que coûtera 
                l&apos;intervention. Grâce à notre réseau d&apos;artisans vérifiés, vous avez la 
                garantie d&apos;un travail de qualité. C&apos;est ça, Mon Joël.
              </p>
            </div>
          </div>

          <Card className="p-8 bg-joel-50 border-joel-100">
            <Quote className="h-10 w-10 text-joel-300 mb-4" />
            <blockquote className="text-xl font-medium text-slate-900 mb-6">
              « Nous voulons que chaque personne bloquée dehors ou victime d&apos;effraction 
              puisse faire appel à un professionnel de confiance, sans craindre l&apos;arnaque. »
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-joel-500 flex items-center justify-center text-white font-bold">
                MJ
              </div>
              <div>
                <p className="font-semibold text-slate-900">L&apos;équipe Mon Joël</p>
                <p className="text-sm text-slate-600">Fondateurs</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Pourquoi Joël? */}
      <Section background="light">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="joel" className="mb-4">Le nom</Badge>
          <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Pourquoi &quot;Joël&quot; ?
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Joël, c&apos;est le prénom qu&apos;on associe au serrurier sympathique du quartier, 
            celui qui dépanne tout le monde et en qui on a confiance. Un prénom français, 
            accessible, rassurant.
          </p>
          <p className="text-lg text-slate-600">
            &quot;Mon Joël&quot;, c&apos;est l&apos;idée que chacun puisse avoir son serrurier 
            de confiance, partout en France, disponible quand on en a besoin. Un Joël 
            moderne, connecté, mais toujours humain.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          badge="Nos valeurs"
          title="Ce qui nous guide au quotidien"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.title} className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-joel-600" />
                </div>
                <h3 className="font-chillax text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Timeline */}
      <Section background="light">
        <SectionHeader
          badge="Notre histoire"
          title="De l'idée à aujourd'hui"
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-joel-200" />
            
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={event.year} className="relative flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-joel-500 text-white flex items-center justify-center text-sm font-bold shrink-0 z-10">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <span className="text-sm font-medium text-joel-600">{event.year}</span>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{event.title}</h3>
                    <p className="text-slate-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team/Commitment */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="joel" className="mb-4">Notre engagement</Badge>
            <h2 className="font-chillax text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Une équipe engagée pour vous
            </h2>
            <ul className="space-y-4">
              {[
                'Service client disponible 7j/7 pour répondre à vos questions',
                'Vérification rigoureuse de chaque artisan partenaire',
                'Amélioration continue de notre IA grâce à vos retours',
                'Engagement de satisfaction : remboursement si problème',
                'Formation continue des artisans sur les nouvelles serrures',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <p className="font-chillax text-4xl font-bold text-joel-600 mb-1">15K+</p>
              <p className="text-slate-600">Interventions</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="font-chillax text-4xl font-bold text-joel-600 mb-1">200+</p>
              <p className="text-slate-600">Artisans</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="font-chillax text-4xl font-bold text-joel-600 mb-1">4.9</p>
              <p className="text-slate-600">Note moyenne</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="font-chillax text-4xl font-bold text-joel-600 mb-1">24/7</p>
              <p className="text-slate-600">Disponibilité</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        title="Prêt à essayer Mon Joël ?"
        description="Faites l'expérience d'un service de serrurerie transparent et professionnel."
      />
    </>
  );
}

