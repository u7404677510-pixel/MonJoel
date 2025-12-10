import type { Metadata } from 'next';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Globe,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pages SEO | Admin Mon Joël',
  robots: { index: false, follow: false },
};

// Mock SEO pages data
const seoPages = [
  {
    id: '1',
    slug: 'paris/serrurier',
    city: 'Paris',
    service: 'Serrurier',
    title: 'Serrurier Paris - Intervention 24h/24 | Mon Joël',
    isPublished: true,
    createdAt: new Date('2024-11-01'),
    views: 1234,
  },
  {
    id: '2',
    slug: 'lyon/serrurier',
    city: 'Lyon',
    service: 'Serrurier',
    title: 'Serrurier Lyon - Intervention Rapide | Mon Joël',
    isPublished: true,
    createdAt: new Date('2024-11-01'),
    views: 567,
  },
  {
    id: '3',
    slug: 'marseille/serrurier',
    city: 'Marseille',
    service: 'Serrurier',
    title: 'Serrurier Marseille - Urgence 24h/24 | Mon Joël',
    isPublished: true,
    createdAt: new Date('2024-11-01'),
    views: 432,
  },
  {
    id: '4',
    slug: 'paris/ouverture-de-porte',
    city: 'Paris',
    service: 'Ouverture de porte',
    title: 'Ouverture de porte Paris - Sans dégât | Mon Joël',
    isPublished: true,
    createdAt: new Date('2024-11-15'),
    views: 876,
  },
  {
    id: '5',
    slug: 'bordeaux/serrurier',
    city: 'Bordeaux',
    service: 'Serrurier',
    title: 'Serrurier Bordeaux - Devis Gratuit | Mon Joël',
    isPublished: false,
    createdAt: new Date('2024-12-01'),
    views: 0,
  },
];

export default function AdminSeoPage() {
  const publishedCount = seoPages.filter((p) => p.isPublished).length;
  const totalViews = seoPages.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-chillax text-2xl font-bold text-slate-900">Pages SEO</h1>
          <p className="text-slate-600">Gérez les pages de SEO programmatique</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle page
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-500">Total pages</p>
          <p className="font-chillax text-2xl font-bold text-slate-900">{seoPages.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Publiées</p>
          <p className="font-chillax text-2xl font-bold text-green-600">{publishedCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Brouillons</p>
          <p className="font-chillax text-2xl font-bold text-amber-600">
            {seoPages.length - publishedCount}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Vues totales</p>
          <p className="font-chillax text-2xl font-bold text-slate-900">
            {totalViews.toLocaleString('fr-FR')}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Rechercher par ville ou service..." className="pl-10" />
            </div>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="published">Publiées</SelectItem>
              <SelectItem value="draft">Brouillons</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ville</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead className="text-center">Statut</TableHead>
              <TableHead className="text-right">Vues</TableHead>
              <TableHead>Créée le</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seoPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.city}</TableCell>
                <TableCell>{page.service}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate text-sm text-slate-600">{page.title}</p>
                </TableCell>
                <TableCell className="text-center">
                  {page.isPublished ? (
                    <Badge variant="success">
                      <Globe className="h-3 w-3 mr-1" />
                      Publiée
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Brouillon</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">{page.views.toLocaleString('fr-FR')}</TableCell>
                <TableCell className="text-sm text-slate-500">
                  {formatDate(page.createdAt, { day: 'numeric', month: 'short' })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Prévisualiser
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Voir en ligne
                      </DropdownMenuItem>
                      {page.isPublished ? (
                        <DropdownMenuItem>
                          <XCircle className="h-4 w-4 mr-2" />
                          Dépublier
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Publier
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Actions en masse</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            Générer pages pour nouvelles villes
          </Button>
          <Button variant="outline">
            Mettre à jour les meta descriptions
          </Button>
          <Button variant="outline">
            Régénérer le sitemap
          </Button>
        </div>
      </Card>
    </div>
  );
}

