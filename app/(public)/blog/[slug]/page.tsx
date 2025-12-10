import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';
import { JsonLd } from '@/components/shared/json-ld';
import { generateArticleSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

// Mock blog posts content
const blogPostsContent: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: Date;
  readTime: number;
}> = {
  'comment-eviter-arnaques-serrurier': {
    title: 'Comment éviter les arnaques de serrurier ?',
    excerpt: 'Chaque année, des milliers de Français se font arnaquer par des serruriers peu scrupuleux. Découvrez nos conseils pour les identifier et vous protéger.',
    category: 'Conseils',
    author: 'Mon Joël',
    publishedAt: new Date('2024-12-01'),
    readTime: 8,
    content: `
## Le problème des arnaques en serrurerie

Chaque année en France, des milliers de personnes sont victimes d'arnaques de la part de faux serruriers ou de serruriers malhonnêtes. Les situations d'urgence (porte claquée, effraction) sont propices à ces pratiques : on est stressé, on veut rentrer chez soi rapidement, et on n'a pas le temps de comparer les prix.

## Les signaux d'alerte

### 1. Un tarif au téléphone trop bas

Méfiez-vous des tarifs annoncés au téléphone qui semblent trop beaux pour être vrais. Un "forfait ouverture à 39€" cache souvent des frais additionnels qui feront exploser la facture finale.

### 2. Pas de devis écrit avant l'intervention

Un professionnel sérieux vous donne toujours un devis détaillé avant de commencer le travail. Si le serrurier refuse ou dit que "c'est compliqué à estimer", c'est mauvais signe.

### 3. L'insistance pour changer la serrure

Beaucoup d'arnaques reposent sur ce schéma : le serrurier prétend que la serrure est endommagée et qu'il faut tout changer. Dans 90% des cas, une simple ouverture sans dégât est possible.

### 4. Des prix qui gonflent à la fin

Le pire scénario : le serrurier annonce un prix, puis multiplie la facture par 3 ou 4 à la fin de l'intervention, sous des prétextes variés (pièce spéciale, difficulté imprévue...).

## Comment se protéger ?

### Demandez un devis précis et écrit

Avant toute intervention, exigez un devis détaillé comprenant :
- Le coût de la main d'œuvre
- Le coût des pièces éventuelles
- Les frais de déplacement
- Les majorations (nuit, week-end)

### Vérifiez l'identité du serrurier

Un professionnel sérieux se présente avec :
- Une carte professionnelle
- Un véhicule identifié
- Des outils professionnels

### Ne payez jamais avant

Le paiement s'effectue APRÈS l'intervention, une fois que vous êtes satisfait. Ne donnez jamais d'argent avant que le travail soit terminé.

### Utilisez des services de confiance

C'est là qu'intervient Mon Joël : notre diagnostic IA vous donne une estimation fiable avant l'intervention, et tous nos artisans sont vérifiés et évalués par nos clients.

## Que faire si vous êtes victime d'une arnaque ?

1. **Gardez tous les justificatifs** : devis, facture, ticket CB
2. **Signalez sur SignalConso** (plateforme gouvernementale)
3. **Portez plainte** si les montants sont importants
4. **Contestez le paiement** auprès de votre banque si vous avez payé par CB

## Conclusion

La meilleure protection contre les arnaques est la prévention : prenez le temps de demander un devis, vérifiez les avis en ligne, et passez par des plateformes de confiance comme Mon Joël qui garantissent la transparence des prix.
    `,
  },
  'cle-cassee-dans-serrure-que-faire': {
    title: 'Que faire si votre clé casse dans la serrure ?',
    excerpt: 'Une clé cassée dans la serrure est une situation stressante. Voici les gestes à faire (et ne pas faire) avant l\'arrivée du serrurier.',
    category: 'Urgences',
    author: 'Mon Joël',
    publishedAt: new Date('2024-11-15'),
    readTime: 5,
    content: `
## Pas de panique !

Une clé qui casse dans la serrure, ça arrive plus souvent qu'on ne le pense. La bonne nouvelle : dans la plupart des cas, un serrurier peut extraire le morceau sans endommager la serrure.

## Ce qu'il ne faut PAS faire

### 1. Forcer avec des outils inadaptés

N'essayez pas d'extraire le morceau avec un tournevis, une pince ou tout autre outil si vous n'êtes pas sûr de vous. Vous risquez de :
- Enfoncer le morceau plus profondément
- Endommager le mécanisme
- Rendre l'extraction plus difficile (et plus chère)

### 2. Utiliser de la colle

On voit parfois ce "conseil" sur internet : coller un autre objet sur le morceau de clé pour le tirer. C'est une très mauvaise idée : la colle peut bloquer le mécanisme.

### 3. Insister avec la clé cassée

Si un morceau de clé dépasse, ne tentez pas de tourner avec ce qu'il reste. Vous risquez de casser encore plus.

## Ce que vous pouvez essayer

### Si le morceau dépasse suffisamment

1. Vaporisez un peu de dégrippant (WD-40) dans la serrure
2. Utilisez une pince fine à bec long
3. Tirez délicatement en effectuant de légers mouvements de rotation

### La technique de la scie

Dans certains cas, une lame de scie à métaux très fine peut accrocher les encoches de la clé et permettre l'extraction. Mais c'est délicat.

## Quand appeler un serrurier

Si le morceau est complètement à l'intérieur ou si vos tentatives échouent, faites appel à un professionnel. L'extraction d'une clé cassée est une intervention courante et généralement rapide (15-30 minutes).

## Combien ça coûte ?

Chez Mon Joël, l'extraction d'une clé cassée coûte en moyenne 89€, déplacement inclus. Si la serrure doit être remplacée (rare), on vous le dit avant et on vous fait un devis.

## Prévention

Pour éviter que cela ne se reproduise :
- Évitez de forcer sur une clé qui tourne mal
- Faites entretenir vos serrures (un peu de graphite de temps en temps)
- Remplacez vos clés si elles sont usées ou tordues
    `,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsContent[slug];
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} | Blog Mon Joël`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPostsContent).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsContent[slug];
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={generateArticleSchema({
          title: post.title,
          description: post.excerpt,
          url: `/blog/${slug}`,
          datePublished: post.publishedAt.toISOString(),
          author: post.author,
        })}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <Badge variant="joel" className="mb-4 bg-joel-500/20 text-joel-300 border border-joel-500/30">
            {post.category}
          </Badge>

          <h1 className="font-chillax text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} min de lecture
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg prose-slate max-w-none prose-headings:font-chillax prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-joel-600 prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />').replace(/## /g, '</p><h2>').replace(/### /g, '</p><h3>').replace(/<h2>/g, '</h3><h2>').replace(/<h3>/g, '</p><h3>') }} />
          </article>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Partager cet article
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CtaSection variant="minimal" />
    </>
  );
}

