import pricesData from '@/data/prices.json';

export interface Service {
  id: string;
  name: string;
  min: number;
  max?: number;
  onQuote?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  services: Service[];
}

export interface PricesData {
  disclaimer: string;
  categories: {
    serrurerie: Category;
    plomberie: Category;
    electricite: Category;
  };
}

export const prices = pricesData as PricesData;

export function formatPrice(service: Service): string {
  if (service.onQuote) {
    return `Dès ${service.min} € (sur devis)`;
  }
  if (service.max) {
    return `${service.min} – ${service.max} €`;
  }
  return `${service.min} €`;
}

export function getCategory(slug: 'serrurerie' | 'plomberie' | 'electricite'): Category {
  return prices.categories[slug];
}

export function getAllServices(): Service[] {
  return [
    ...prices.categories.serrurerie.services,
    ...prices.categories.plomberie.services,
    ...prices.categories.electricite.services,
  ];
}

export function searchServices(query: string, category?: 'serrurerie' | 'plomberie' | 'electricite'): Service[] {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const services = category 
    ? prices.categories[category].services 
    : getAllServices();
  
  return services.filter(service => {
    const normalizedName = service.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedName.includes(normalizedQuery);
  });
}
