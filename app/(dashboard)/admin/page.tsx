import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Settings,
  Eye,
  Globe,
  Star,
  ArrowRight,
  ExternalLink,
  Palette,
  MessageSquare,
  PenLine,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dashboard Admin | Mon Joël',
  robots: { index: false, follow: false },
};

// Stats cards
const stats = [
  {
    label: 'Pages SEO',
    value: '24',
    description: 'Pages locales publiées',
    icon: Globe,
    href: '/admin/seo',
  },
  {
    label: 'Témoignages',
    value: '5',
    description: 'Avis clients actifs',
    icon: Star,
    href: '/admin/content',
  },
  {
    label: 'Articles',
    value: '3',
    description: 'Articles de blog',
    icon: FileText,
    href: '/admin/content',
  },
  {
    label: 'Visites',
    value: '2.4K',
    description: '7 derniers jours',
    icon: Eye,
    href: '/admin/analytics',
  },
];

// Quick actions
const quickActions = [
  {
    title: 'Paramètres du site',
    description: 'Modifier les informations de contact, textes et apparence',
    icon: Settings,
    href: '/admin/settings',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Gérer le contenu',
    description: 'Témoignages, articles de blog, FAQ',
    icon: PenLine,
    href: '/admin/content',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    title: 'Pages SEO',
    description: 'Pages locales pour le référencement',
    icon: Globe,
    href: '/admin/seo',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'Personnalisation',
    description: 'Couleurs, bandeau, éléments visuels',
    icon: Palette,
    href: '/admin/settings?tab=appearance',
    color: 'bg-purple-500/10 text-purple-600',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Gérez le contenu et le référencement de votre site
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4 mr-2" />
            Voir le site
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-all hover:border-slate-300 h-full">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Icon className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-700">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <Card className="hover:shadow-md transition-all hover:border-slate-300 h-full group">
                  <CardContent className="p-5">
                    <div className={`inline-flex p-2.5 rounded-xl ${action.color} mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contenu récent */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-slate-400" />
              Derniers témoignages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Marie L.', city: 'Paris', rating: 5 },
              { name: 'Thomas B.', city: 'Lyon', rating: 5 },
              { name: 'Sophie M.', city: 'Marseille', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.city}</p>
                </div>
                <div className="flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
              <Link href="/admin/content">
                Voir tous les témoignages
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Pages SEO populaires */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" />
              Pages SEO populaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { page: 'Serrurier Paris', views: '1.2K' },
              { page: 'Serrurier Lyon', views: '567' },
              { page: 'Serrurier Marseille', views: '432' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <p className="font-medium text-slate-900">{p.page}</p>
                <p className="text-sm text-slate-500">{p.views} vues</p>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
              <Link href="/admin/seo">
                Gérer les pages SEO
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
