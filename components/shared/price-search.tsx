'use client';

import { useState, useMemo } from 'react';
import { Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PriceList } from './price-card';
import { Service, prices } from '@/lib/prices';

interface PriceSearchProps {
  services: Service[];
  category: 'serrurerie' | 'plomberie' | 'electricite';
  colorClass?: string;
}

export function PriceSearch({ services, category, colorClass }: PriceSearchProps) {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!query.trim()) return services;
    
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return services.filter(service => {
      const normalizedName = service.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedName.includes(normalizedQuery);
    });
  }, [services, query]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Rechercher une intervention..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Disclaimer */}
      <Alert className="bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-sm">
          {prices.disclaimer}
        </AlertDescription>
      </Alert>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        {filteredServices.length} intervention{filteredServices.length > 1 ? 's' : ''} trouvée{filteredServices.length > 1 ? 's' : ''}
      </p>

      {/* Services list */}
      {filteredServices.length > 0 ? (
        <PriceList services={filteredServices} category={category} colorClass={colorClass} />
      ) : (
        <div className="text-center py-12 text-slate-500">
          Aucune intervention trouvée pour &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

