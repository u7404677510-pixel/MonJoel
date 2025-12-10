import type { Metadata } from 'next';

import { Section, PageHeader } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation | Mon Joël',
  description: 'Conditions générales d\'utilisation du site et des services Mon Joël. Droits et obligations des utilisateurs.',
  alternates: {
    canonical: '/cgu',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CguPage() {
  return (
    <>
      <PageHeader
        title="Conditions Générales d'Utilisation"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'CGU' },
        ]}
      />

      <Section>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p className="lead">
            Les présentes Conditions Générales d&apos;Utilisation (ci-après &quot;CGU&quot;) régissent 
            l&apos;utilisation du site monjoel.com et des services proposés par Mon Joël SAS.
          </p>

          <h2>Article 1 - Objet</h2>
          <p>
            Les présentes CGU ont pour objet de définir les conditions d&apos;accès et 
            d&apos;utilisation du site monjoel.com, ainsi que les droits et obligations des 
            utilisateurs et de Mon Joël SAS.
          </p>
          <p>
            En accédant au site ou en utilisant nos services, vous acceptez sans 
            réserve les présentes CGU.
          </p>

          <h2>Article 2 - Description des services</h2>
          <p>Mon Joël propose les services suivants :</p>
          <ul>
            <li>Mise en relation entre clients et artisans serruriers partenaires</li>
            <li>Diagnostic IA pour estimation de devis</li>
            <li>Demande de devis et d&apos;intervention</li>
            <li>Espace client pour suivi des interventions</li>
            <li>Blog informatif sur la serrurerie</li>
          </ul>

          <h2>Article 3 - Accès au site</h2>
          <p>
            L&apos;accès au site est gratuit. Les frais d&apos;accès à internet et d&apos;équipement 
            nécessaires à la consultation du site restent à la charge de l&apos;utilisateur.
          </p>
          <p>
            Mon Joël SAS se réserve le droit de suspendre, modifier ou interrompre 
            l&apos;accès au site à tout moment, sans préavis, notamment pour des raisons 
            de maintenance.
          </p>

          <h2>Article 4 - Compte utilisateur</h2>
          <p>
            Certains services nécessitent la création d&apos;un compte utilisateur. 
            L&apos;utilisateur s&apos;engage à :
          </p>
          <ul>
            <li>Fournir des informations exactes et à jour</li>
            <li>Maintenir la confidentialité de ses identifiants</li>
            <li>Informer Mon Joël de toute utilisation non autorisée de son compte</li>
            <li>Ne pas créer de faux comptes ou usurper l&apos;identité d&apos;autrui</li>
          </ul>

          <h2>Article 5 - Utilisation du diagnostic IA</h2>
          <p>
            Le diagnostic IA est un outil d&apos;aide à l&apos;estimation. Les résultats fournis 
            sont indicatifs et ne constituent pas un devis définitif. Le prix final sera 
            confirmé par l&apos;artisan lors de l&apos;intervention.
          </p>
          <p>
            En utilisant le diagnostic IA, vous autorisez Mon Joël à analyser les 
            photos et informations transmises dans le seul but de fournir une estimation.
          </p>

          <h2>Article 6 - Obligations de l&apos;utilisateur</h2>
          <p>L&apos;utilisateur s&apos;engage à :</p>
          <ul>
            <li>Utiliser le site conformément à sa destination</li>
            <li>Ne pas perturber le fonctionnement du site</li>
            <li>Ne pas collecter d&apos;informations sur les autres utilisateurs</li>
            <li>Respecter les droits de propriété intellectuelle</li>
            <li>Ne pas publier de contenu illicite, diffamatoire ou injurieux</li>
          </ul>

          <h2>Article 7 - Responsabilité de Mon Joël</h2>
          <p>
            Mon Joël SAS agit en tant qu&apos;intermédiaire entre les clients et les artisans 
            partenaires. Les interventions sont réalisées par des artisans indépendants 
            qui restent responsables de la qualité de leur travail.
          </p>
          <p>
            Mon Joël SAS s&apos;engage à sélectionner des artisans qualifiés et à faciliter 
            la résolution des litiges éventuels, mais ne peut être tenue responsable des 
            dommages causés par les artisans.
          </p>

          <h2>Article 8 - Tarification et paiement</h2>
          <p>
            Les tarifs des interventions sont fixés par les artisans partenaires, 
            conformément à la grille tarifaire de Mon Joël. Le paiement s&apos;effectue 
            directement auprès de l&apos;artisan après l&apos;intervention.
          </p>
          <p>
            Les majorations (nuit, week-end, urgence) sont systématiquement communiquées 
            avant validation de l&apos;intervention.
          </p>

          <h2>Article 9 - Données personnelles</h2>
          <p>
            Le traitement des données personnelles est décrit dans notre{' '}
            <a href="/politique-confidentialite">Politique de confidentialité</a>.
          </p>

          <h2>Article 10 - Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site (textes, images, logos, logiciels, etc.) sont 
            protégés par le droit de la propriété intellectuelle. Toute reproduction 
            non autorisée est interdite.
          </p>

          <h2>Article 11 - Modification des CGU</h2>
          <p>
            Mon Joël SAS se réserve le droit de modifier les présentes CGU à tout moment. 
            Les modifications entrent en vigueur dès leur publication sur le site. 
            L&apos;utilisateur est invité à consulter régulièrement les CGU.
          </p>

          <h2>Article 12 - Droit applicable et litiges</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, 
            une solution amiable sera recherchée avant toute action judiciaire. 
            À défaut, les tribunaux de Paris seront compétents.
          </p>

          <h2>Article 13 - Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU :<br />
            Email : cgu@monjoel.com<br />
            Adresse : Mon Joël SAS, 123 Avenue de l&apos;Innovation, 75001 Paris
          </p>

          <p className="text-sm text-slate-500 mt-8">
            Dernière mise à jour : Décembre 2024
          </p>
        </div>
      </Section>
    </>
  );
}

