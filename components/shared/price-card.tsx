'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service, formatPrice } from '@/lib/prices';
import { cn } from '@/lib/utils';

interface PriceCardProps {
  service: Service;
  category: 'serrurerie' | 'plomberie' | 'electricite';
  colorClass?: string;
}

export function PriceCard({ service, category, colorClass = 'bg-joel-100 text-joel-700' }: PriceCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-900 truncate">{service.name}</h3>
        <Badge variant="secondary" className={cn('mt-1', colorClass)}>
          {formatPrice(service)}
        </Badge>
      </div>
      <Button size="sm" variant="outline" asChild>
        <Link href={`/devis?cat=${category}&id=${service.id}`}>
          Réserver
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </Button>
    </Card>
  );
}

interface PriceListProps {
  services: Service[];
  category: 'serrurerie' | 'plomberie' | 'electricite';
  colorClass?: string;
}

export function PriceList({ services, category, colorClass }: PriceListProps) {
  return (
    <div className="grid gap-3">
      {services.map((service) => (
        <PriceCard 
          key={service.id} 
          service={service} 
          category={category}
          colorClass={colorClass}
        />
      ))}
    </div>
  );
}

