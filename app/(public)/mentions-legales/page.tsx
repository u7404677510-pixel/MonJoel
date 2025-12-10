import type { Metadata } from 'next';

import { Section, PageHeader } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Mentions Légales | Mon Joël',
  description: 'Mentions légales du site monjoel.com - Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation.',
  alternates: {
    canonical: '/mentions-legales',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        title="Mentions légales"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Mentions légales' },
        ]}
      />

      <Section>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2>1. Éditeur du site</h2>
          <p>
            Le site monjoel.com est édité par :<br />
            <strong>Mon Joël SAS</strong><br />
            Société par Actions Simplifiée au capital de 10 000 euros<br />
            Siège social : 123 Avenue de l&apos;Innovation, 75001 Paris<br />
            RCS Paris B 123 456 789<br />
            N° TVA intracommunautaire : FR12 123456789<br />
            Téléphone : 01 23 45 67 89<br />
            Email : contact@monjoel.com
          </p>
          <p>
            Directeur de la publication : [Nom du dirigeant]
          </p>

          <h2>2. Hébergement</h2>
          <p>
            Le site monjoel.com est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789<br />
            États-Unis
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du site monjoel.com (textes, images, logos, vidéos, 
            structure, design) est protégé par le droit d&apos;auteur et le droit des marques.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de 
            tout ou partie des éléments du site, quel que soit le moyen ou le procédé 
            utilisé, est interdite, sauf autorisation écrite préalable de Mon Joël SAS.
          </p>
          <p>
            La marque &quot;Mon Joël&quot; et le logo associé sont des marques déposées. 
            Toute utilisation non autorisée de ces marques est strictement interdite.
          </p>

          <h2>4. Données personnelles</h2>
          <p>
            Les informations relatives au traitement de vos données personnelles sont 
            détaillées dans notre{' '}
            <a href="/politique-confidentialite">Politique de confidentialité</a>.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à 
            la loi Informatique et Libertés, vous disposez de droits sur vos données 
            personnelles. Pour les exercer, contactez-nous à : dpo@monjoel.com
          </p>

          <h2>5. Cookies</h2>
          <p>
            Le site monjoel.com utilise des cookies pour améliorer l&apos;expérience utilisateur 
            et mesurer l&apos;audience. Pour plus d&apos;informations, consultez notre{' '}
            <a href="/politique-confidentialite">Politique de confidentialité</a>.
          </p>

          <h2>6. Liens hypertextes</h2>
          <p>
            Le site monjoel.com peut contenir des liens vers d&apos;autres sites. Mon Joël 
            SAS n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité 
            quant à leur contenu.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            Mon Joël SAS s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées 
            sur ce site. Toutefois, elle ne peut être tenue responsable des erreurs, 
            omissions ou des résultats qui pourraient être obtenus par un mauvais usage 
            de ces informations.
          </p>
          <p>
            Mon Joël SAS ne peut être tenue responsable des dommages directs ou indirects 
            résultant de l&apos;accès ou de l&apos;utilisation du site, y compris l&apos;inaccessibilité, 
            les pertes de données, détériorations, destructions ou virus.
          </p>

          <h2>8. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de 
            litige, les tribunaux de Paris seront seuls compétents.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, vous pouvez 
            nous contacter à :<br />
            Email : legal@monjoel.com<br />
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

