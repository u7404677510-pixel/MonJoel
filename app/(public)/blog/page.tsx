import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, PageHeader } from '@/components/layout/section';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog Serrurerie - Conseils & Astuces | Mon Joël',
  description:
    'Découvrez nos articles et conseils sur la serrurerie : comment éviter les arnaques, entretenir vos serrures, choisir le bon équipement. Blog expert Mon Joël.',
  alternates: {
    canonical: '/blog',
  },
};

// Mock blog posts - in production, these would come from the database
const blogPosts = [
  {
    slug: 'comment-eviter-arnaques-serrurier',
    title: 'Comment éviter les arnaques de serrurier ?',
    excerpt: 'Chaque année, des milliers de Français se font arnaquer par des serruriers peu scrupuleux. Découvrez nos conseils pour les identifier et vous protéger.',
    category: 'Conseils',
    coverImage: null,
    author: 'Mon Joël',
    publishedAt: new Date('2024-12-01'),
    readTime: 8,
  },
  {
    slug: 'cle-cassee-dans-serrure-que-faire',
    title: 'Que faire si votre clé casse dans la serrure ?',
    excerpt: 'Une clé cassée dans la serrure est une situation stressante. Voici les gestes à faire (et ne pas faire) avant l\'arrivée du serrurier.',
    category: 'Urgences',
    coverImage: null,
    author: 'Mon Joël',
    publishedAt: new Date('2024-11-15'),
    readTime: 5,
  },
  {
    slug: 'choisir-serrure-multipoints',
    title: 'Comment choisir sa serrure multipoints ?',
    excerpt: '3 points, 5 points, 7 points ? Certifiée A2P ? On vous explique tout pour faire le bon choix selon votre porte et votre budget.',
    category: 'Guide',
    coverImage: null,
    author: 'Mon Joël',
    publishedAt: new Date('2024-11-01'),
    readTime: 10,
  },
  {
    slug: 'securiser-appartement-apres-cambriolage',
    title: 'Sécuriser son appartement après un cambriolage',
    excerpt: 'Victime d\'un cambriolage ? Voici les étapes à suivre pour sécuriser votre logement et éviter que cela se reproduise.',
    category: 'Sécurité',
    coverImage: null,
    author: 'Mon Joël',
    publishedAt: new Date('2024-10-20'),
    readTime: 7,
  },
  {
    slug: 'entretenir-serrures-conseils',
    title: '5 conseils pour entretenir vos serrures',
    excerpt: 'Une serrure bien entretenue dure plus longtemps et évite les blocages. Découvrez nos conseils d\'entretien simples et efficaces.',
    category: 'Conseils',
    coverImage: null,
    author: 'Mon Joël',
    publishedAt: new Date('2024-10-05'),
    readTime: 4,
  },
];

const categories = ['Tous', 'Conseils', 'Urgences', 'Guide', 'Sécurité'];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog Serrurerie"
        description="Conseils, guides et astuces pour tout savoir sur la serrurerie et la sécurité de votre domicile."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Blog' },
        ]}
      />

      {/* Categories */}
      <Section background="light" className="py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === 'Tous'
                  ? 'bg-joel-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      {/* Featured Post */}
      <Section>
        <Link href={`/blog/${blogPosts[0]?.slug}`} className="block group">
          <Card className="overflow-hidden hover:shadow-xl transition-all">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto bg-gradient-to-br from-joel-400 to-joel-600 flex items-center justify-center">
                <span className="text-6xl text-white/50">📝</span>
              </div>
              <div className="p-8">
                <Badge variant="joel" className="mb-4">{blogPosts[0]?.category}</Badge>
                <h2 className="font-chillax text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-joel-600 transition-colors">
                  {blogPosts[0]?.title}
                </h2>
                <p className="text-slate-600 mb-6">{blogPosts[0]?.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {blogPosts[0]?.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {blogPosts[0]?.publishedAt && formatDate(blogPosts[0].publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0]?.readTime} min
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </Section>

      {/* Other Posts */}
      <Section background="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center rounded-t-xl">
                  <span className="text-4xl opacity-50">📝</span>
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                  <h3 className="font-chillax text-lg font-semibold text-slate-900 mb-2 group-hover:text-joel-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

