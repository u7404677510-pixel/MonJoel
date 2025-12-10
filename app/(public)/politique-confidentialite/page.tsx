import type { Metadata } from 'next';

import { Section, PageHeader } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Mon Joël',
  description: 'Politique de confidentialité et protection des données personnelles du site monjoel.com. RGPD et droits des utilisateurs.',
  alternates: {
    canonical: '/politique-confidentialite',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader
        title="Politique de Confidentialité"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Politique de confidentialité' },
        ]}
      />

      <Section>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p className="lead">
            Mon Joël SAS s&apos;engage à protéger la vie privée des utilisateurs de son site 
            monjoel.com. Cette politique de confidentialité explique comment nous 
            collectons, utilisons et protégeons vos données personnelles.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est :<br />
            <strong>Mon Joël SAS</strong><br />
            123 Avenue de l&apos;Innovation, 75001 Paris<br />
            Email : dpo@monjoel.com
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          
          <h3>2.1 Données fournies directement</h3>
          <ul>
            <li>Nom, prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale (pour les interventions)</li>
            <li>Photos de serrures (diagnostic IA)</li>
            <li>Description du problème</li>
          </ul>

          <h3>2.2 Données collectées automatiquement</h3>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur et appareil</li>
            <li>Pages visitées et durée de visite</li>
            <li>Source d&apos;arrivée (UTM)</li>
            <li>Cookies (voir section dédiée)</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Traiter vos demandes d&apos;intervention</li>
            <li>Vous fournir un diagnostic et un devis</li>
            <li>Vous mettre en relation avec un artisan</li>
            <li>Vous envoyer des communications relatives à votre demande</li>
            <li>Améliorer nos services et notre site</li>
            <li>Répondre à nos obligations légales</li>
            <li>Avec votre consentement : vous envoyer des offres commerciales</li>
          </ul>

          <h2>4. Base légale du traitement</h2>
          <p>Nos traitements reposent sur :</p>
          <ul>
            <li><strong>L&apos;exécution du contrat</strong> : traitement de vos demandes d&apos;intervention</li>
            <li><strong>Le consentement</strong> : envoi de newsletters, cookies publicitaires</li>
            <li><strong>L&apos;intérêt légitime</strong> : amélioration de nos services, sécurité</li>
            <li><strong>L&apos;obligation légale</strong> : conservation des factures, réponse aux réquisitions</li>
          </ul>

          <h2>5. Destinataires des données</h2>
          <p>Vos données peuvent être partagées avec :</p>
          <ul>
            <li>Nos artisans partenaires (uniquement pour les interventions)</li>
            <li>Nos sous-traitants techniques (hébergement, email, analytics)</li>
            <li>Les autorités compétentes en cas d&apos;obligation légale</li>
          </ul>
          <p>
            Nous ne vendons jamais vos données personnelles à des tiers.
          </p>

          <h2>6. Durée de conservation</h2>
          <ul>
            <li>Données clients : 5 ans après la dernière interaction</li>
            <li>Données de facturation : 10 ans (obligation légale)</li>
            <li>Données de prospection : 3 ans après le dernier contact</li>
            <li>Cookies : 13 mois maximum</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>Notre site utilise des cookies pour :</p>
          <ul>
            <li><strong>Cookies essentiels</strong> : fonctionnement du site, session utilisateur</li>
            <li><strong>Cookies analytiques</strong> : mesure d&apos;audience (Google Analytics)</li>
            <li><strong>Cookies publicitaires</strong> : suivi des conversions (Google Ads)</li>
          </ul>
          <p>
            Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau 
            de consentement ou les paramètres de votre navigateur.
          </p>

          <h2>8. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger vos données</li>
            <li><strong>Droit à l&apos;effacement</strong> : supprimer vos données</li>
            <li><strong>Droit à la limitation</strong> : limiter le traitement</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données</li>
            <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement</li>
            <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
          </ul>
          <p>
            Pour exercer vos droits, contactez-nous à : dpo@monjoel.com
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL : 
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
          </p>

          <h2>9. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles 
            appropriées pour protéger vos données :
          </p>
          <ul>
            <li>Chiffrement des données en transit (HTTPS)</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Hébergement sécurisé</li>
            <li>Sauvegardes régulières</li>
          </ul>

          <h2>10. Transfert de données</h2>
          <p>
            Certains de nos sous-traitants (hébergement, analytics) peuvent être 
            situés en dehors de l&apos;Union Européenne. Ces transferts sont encadrés 
            par des garanties appropriées (clauses contractuelles types, certification).
          </p>

          <h2>11. Modifications</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour. Les modifications 
            seront publiées sur cette page avec la date de mise à jour.
          </p>

          <h2>12. Contact</h2>
          <p>
            Pour toute question sur cette politique ou vos données personnelles :<br />
            Email : dpo@monjoel.com<br />
            Adresse : Mon Joël SAS - DPO, 123 Avenue de l&apos;Innovation, 75001 Paris
          </p>

          <p className="text-sm text-slate-500 mt-8">
            Dernière mise à jour : Décembre 2024
          </p>
        </div>
      </Section>
    </>
  );
}

