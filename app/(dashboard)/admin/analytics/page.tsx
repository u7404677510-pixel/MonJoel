import type { Metadata } from 'next';
import {
  TrendingUp,
  Users,
  MousePointerClick,
  Clock,
  ExternalLink,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Analytics | Admin Mon Joël',
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-chillax text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">Statistiques et performances du site</p>
        </div>
        <Badge variant="secondary">Dernière mise à jour : il y a 1h</Badge>
      </div>

      {/* Placeholder message */}
      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-joel-600" />
          </div>
          <h2 className="font-chillax text-xl font-semibold text-slate-900 mb-2">
            Analytics en cours d&apos;intégration
          </h2>
          <p className="text-slate-600 mb-6">
            Cette section permettra de visualiser les statistiques Google Analytics, 
            les conversions publicitaires et les KPIs métier.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-joel-600 hover:underline"
            >
              Google Analytics
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://ads.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-joel-600 hover:underline"
            >
              Google Ads
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Card>

      {/* Preview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Visiteurs (30j)</p>
              <p className="font-chillax text-2xl font-bold text-slate-900">12,456</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-green-100">
              <MousePointerClick className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Taux de conversion</p>
              <p className="font-chillax text-2xl font-bold text-slate-900">3.4%</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Durée moyenne</p>
              <p className="font-chillax text-2xl font-bold text-slate-900">2:34</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-100">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pages/session</p>
              <p className="font-chillax text-2xl font-bold text-slate-900">4.2</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart placeholders */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Trafic par jour</h3>
          </div>
          <div className="p-5">
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">Graphique de trafic (Recharts)</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Sources de trafic</h3>
          </div>
          <div className="p-5">
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">Graphique camembert (Recharts)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top pages */}
      <Card>
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Pages les plus visitées</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { page: '/', title: 'Accueil', views: 4521, percent: 36 },
            { page: '/urgence-serrurerie', title: 'Urgence', views: 2134, percent: 17 },
            { page: '/diagnostic-ia', title: 'Diagnostic IA', views: 1876, percent: 15 },
            { page: '/tarifs', title: 'Tarifs', views: 1234, percent: 10 },
            { page: '/services', title: 'Services', views: 987, percent: 8 },
          ].map((item) => (
            <div key={item.page} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">{item.page}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{item.views.toLocaleString('fr-FR')}</p>
                <p className="text-sm text-slate-500">{item.percent}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

