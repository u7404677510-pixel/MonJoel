'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Star,
  PenLine,
  ExternalLink,
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data pour les témoignages
const testimonials = [
  { id: '1', name: 'Marie L.', city: 'Paris 11ème', rating: 5, isPublished: true },
  { id: '2', name: 'Thomas B.', city: 'Lyon', rating: 5, isPublished: true },
  { id: '3', name: 'Sophie M.', city: 'Marseille', rating: 5, isPublished: true },
  { id: '4', name: 'Pierre D.', city: 'Bordeaux', rating: 4, isPublished: true },
  { id: '5', name: 'Emma V.', city: 'Toulouse', rating: 5, isPublished: true },
];

// Mock data pour les articles de blog
const blogPosts = [
  { id: '1', title: 'Comment éviter les arnaques de serrurier ?', status: 'published', date: '15 nov.' },
  { id: '2', title: 'Que faire si votre clé casse dans la serrure ?', status: 'published', date: '10 nov.' },
  { id: '3', title: 'Guide complet de la serrure connectée', status: 'draft', date: '1 déc.' },
];

const contentSections = [
  {
    title: 'Témoignages',
    description: 'Avis clients affichés sur le site',
    icon: MessageSquare,
    href: '/admin/content/testimonials',
    count: testimonials.length,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    title: 'Articles de blog',
    description: 'Contenu SEO et conseils',
    icon: PenLine,
    href: '/admin/content/blog',
    count: blogPosts.length,
    color: 'text-green-500 bg-green-50',
  },
  {
    title: 'FAQ',
    description: 'Questions fréquentes',
    icon: MessageSquare,
    href: '/admin/content/faq',
    count: 15,
    color: 'text-purple-500 bg-purple-50',
  },
  {
    title: 'Médias',
    description: 'Images et fichiers',
    icon: ImageIcon,
    href: '/admin/content/media',
    count: 24,
    color: 'text-orange-500 bg-orange-50',
  },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion du contenu</h1>
          <p className="text-slate-600 mt-1">
            Gérez les textes, témoignages et articles du site
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      {/* Content Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.title} href={section.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-xl ${section.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {section.count}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-4">{section.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Testimonials */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Témoignages récents
            </CardTitle>
            <CardDescription>Les derniers avis clients publiés</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/content/testimonials">
              Voir tout
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {testimonials.slice(0, 4).map((testimonial) => (
              <div key={testimonial.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.city}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Badge variant={testimonial.isPublished ? 'default' : 'secondary'}>
                    {testimonial.isPublished ? 'Publié' : 'Brouillon'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Blog Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Articles de blog
            </CardTitle>
            <CardDescription>Derniers articles publiés ou en brouillon</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/content/blog">
              Voir tout
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {blogPosts.map((post) => (
              <div key={post.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{post.title}</p>
                  <p className="text-sm text-slate-500">{post.date}</p>
                </div>
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                  {post.status === 'published' ? 'Publié' : 'Brouillon'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

