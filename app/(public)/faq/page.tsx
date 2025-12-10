import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section, PageHeader } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { generateFaqSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes | Mon Joël Serrurerie',
  description:
    'Trouvez les réponses à vos questions sur nos services de serrurerie : tarifs, délais, diagnostic IA, paiement, garanties. Tout ce que vous devez savoir.',
  alternates: {
    canonical: '/faq',
  },
};

const faqCategories = [
  {
    title: 'Services & Interventions',
    faqs: [
      {
        question: 'Quels types de serrures pouvez-vous ouvrir ou remplacer ?',
        answer: 'Nos artisans sont formés pour intervenir sur tous types de serrures : serrures simples, multipoints (3, 5 ou 7 points), serrures blindées, serrures à code, serrures connectées, cylindres européens, et même certains coffres-forts. Si votre serrure est particulière, notre diagnostic IA vous le dira.',
      },
      {
        question: 'Intervenez-vous pour les professionnels (commerces, bureaux) ?',
        answer: 'Oui, nous intervenons aussi bien pour les particuliers que pour les professionnels. Nous pouvons facturer avec TVA et établir des contrats de maintenance pour les entreprises qui le souhaitent.',
      },
      {
        question: 'Pouvez-vous intervenir si je ne suis pas propriétaire ?',
        answer: 'Oui, mais vous devrez justifier de votre droit d\'accès (bail, justificatif de domicile, attestation du propriétaire). En cas d\'urgence la nuit, nos artisans peuvent demander une pièce d\'identité pour s\'assurer que vous êtes bien le résident.',
      },
      {
        question: 'L\'ouverture de porte abîme-t-elle la serrure ?',
        answer: 'Dans 90% des cas, nos artisans utilisent des techniques non destructives (crochetage, by-pass) qui n\'endommagent pas la serrure. Si une destruction est nécessaire, vous en serez informé avant et cela sera inclus dans le devis.',
      },
    ],
  },
  {
    title: 'Tarifs & Paiement',
    faqs: [
      {
        question: 'Comment sont calculés vos tarifs ?',
        answer: 'Nos tarifs sont basés sur le type d\'intervention, la complexité de la serrure, et les éventuelles pièces à remplacer. Les majorations (nuit, week-end) sont clairement indiquées. Vous recevez un devis détaillé avant toute intervention.',
      },
      {
        question: 'Le devis est-il vraiment gratuit et sans engagement ?',
        answer: 'Oui, absolument. Vous pouvez demander un diagnostic IA ou un devis téléphonique sans aucun engagement. Si le prix ne vous convient pas, vous êtes libre de refuser sans frais.',
      },
      {
        question: 'Quand dois-je payer ?',
        answer: 'Le paiement s\'effectue après l\'intervention, une fois que vous êtes satisfait du travail. Vous ne payez jamais avant que le problème ne soit résolu.',
      },
      {
        question: 'Quels moyens de paiement acceptez-vous ?',
        answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard), les espèces et les chèques. Pour les professionnels, le paiement par virement est possible.',
      },
      {
        question: 'Pourquoi les prix sont plus élevés la nuit ?',
        answer: 'Les majorations nuit et week-end compensent les contraintes pour nos artisans (horaires décalés, astreinte). Ces majorations sont standards dans le secteur et toujours communiquées à l\'avance.',
      },
    ],
  },
  {
    title: 'Diagnostic IA',
    faqs: [
      {
        question: 'Comment fonctionne le diagnostic IA ?',
        answer: 'Envoyez une photo de votre serrure et décrivez votre problème. Notre intelligence artificielle, entraînée sur des milliers de cas, identifie le type de serrure et la complexité de l\'intervention pour vous donner une estimation de prix précise en quelques minutes.',
      },
      {
        question: 'Le diagnostic IA est-il fiable ?',
        answer: 'Notre IA a un taux de précision supérieur à 85% sur l\'identification des serrures. Pour les cas complexes, un expert humain peut compléter l\'analyse. Le prix final est confirmé par l\'artisan sur place.',
      },
      {
        question: 'Mes photos sont-elles sécurisées ?',
        answer: 'Oui, vos photos sont chiffrées et stockées de manière sécurisée. Elles ne sont utilisées que pour le diagnostic et ne sont jamais partagées ou vendues à des tiers.',
      },
    ],
  },
  {
    title: 'Délais & Disponibilité',
    faqs: [
      {
        question: 'En combien de temps un artisan peut-il arriver ?',
        answer: 'En zone urbaine, nos artisans arrivent généralement en 20 à 40 minutes. Le délai exact vous est communiqué au moment de la prise en charge de votre demande.',
      },
      {
        question: 'Intervenez-vous les jours fériés ?',
        answer: 'Oui, nous intervenons 24h/24, 7j/7, y compris les jours fériés. Une majoration s\'applique, comme pour les week-ends.',
      },
      {
        question: 'Puis-je programmer une intervention à une date ultérieure ?',
        answer: 'Oui, pour les travaux non urgents (changement de serrure préventif, installation de serrure multipoints), vous pouvez programmer un rendez-vous à la date et l\'heure de votre choix.',
      },
    ],
  },
  {
    title: 'Garanties & SAV',
    faqs: [
      {
        question: 'Y a-t-il une garantie sur les interventions ?',
        answer: 'Oui, toutes nos interventions sont garanties. La main d\'œuvre est garantie 1 an, et les pièces installées bénéficient de la garantie fabricant (généralement 2 à 5 ans selon les produits).',
      },
      {
        question: 'Que faire si j\'ai un problème après l\'intervention ?',
        answer: 'Contactez notre service client par téléphone ou email. Si le problème est lié à l\'intervention, nous renvoyons un artisan gratuitement. Nous nous engageons à trouver une solution.',
      },
      {
        question: 'Vos artisans sont-ils assurés ?',
        answer: 'Oui, tous nos artisans partenaires disposent d\'une assurance responsabilité civile professionnelle. En cas de dommage accidentel, vous êtes couvert.',
      },
    ],
  },
];

// Flatten FAQs for JSON-LD
const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={generateFaqSchema(allFaqs)} />

      <PageHeader
        title="Questions fréquentes"
        description="Trouvez rapidement les réponses à vos questions sur nos services de serrurerie."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'FAQ' },
        ]}
      />

      {/* FAQ Sections */}
      {faqCategories.map((category, index) => (
        <Section key={category.title} background={index % 2 === 0 ? 'white' : 'light'}>
          <h2 className="font-chillax text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            {category.title}
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {category.faqs.map((faq, faqIndex) => (
              <AccordionItem
                key={faqIndex}
                value={`${category.title}-${faqIndex}`}
                className="bg-white rounded-xl border border-slate-200 px-6"
              >
                <AccordionTrigger className="text-left font-medium text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      ))}

      {/* Contact CTA */}
      <Section>
        <Card className="max-w-3xl mx-auto p-8 text-center bg-joel-50 border-joel-100">
          <h2 className="font-chillax text-2xl font-bold text-slate-900 mb-4">
            Vous n&apos;avez pas trouvé votre réponse ?
          </h2>
          <p className="text-slate-600 mb-6">
            Notre équipe est là pour vous aider. Contactez-nous par téléphone ou email, 
            nous vous répondons rapidement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="tel:+33612018781">
                <Phone className="h-5 w-5 mr-2" />
                06 12 01 87 81
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Mail className="h-5 w-5 mr-2" />
                Nous contacter
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}

