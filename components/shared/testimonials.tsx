'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { UserAvatar } from '@/components/ui/avatar';

interface Testimonial {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

// Mock testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie L.',
    city: 'Paris 11ème',
    rating: 5,
    comment:
      'Bloquée dehors à 22h, le serrurier est arrivé en 25 minutes. Ouverture propre, sans dégât, et un prix conforme au devis IA. Je recommande !',
  },
  {
    id: '2',
    name: 'Thomas B.',
    city: 'Lyon',
    rating: 5,
    comment:
      'Le diagnostic IA m\'a permis de comprendre exactement le problème avant même l\'intervention. Transparence totale sur le prix, ça change des arnaques habituelles.',
  },
  {
    id: '3',
    name: 'Sophie M.',
    city: 'Marseille',
    rating: 5,
    comment:
      'Après un cambriolage, Mon Joël a sécurisé mon appartement en urgence. Équipe professionnelle et rassurante dans un moment difficile.',
  },
  {
    id: '4',
    name: 'Pierre D.',
    city: 'Bordeaux',
    rating: 4,
    comment:
      'Changement de cylindre rapide et efficace. Le serrurier m\'a conseillé sur les meilleures options de sécurité pour mon budget.',
  },
  {
    id: '5',
    name: 'Emma V.',
    city: 'Toulouse',
    rating: 5,
    comment:
      'Service impeccable ! La possibilité d\'envoyer une photo pour le diagnostic à distance est vraiment pratique. Devis précis reçu en 5 minutes.',
  },
  {
    id: '6',
    name: 'Lucas R.',
    city: 'Nantes',
    rating: 5,
    comment:
      'Intervention un dimanche matin pour une porte blindée. Malgré la complexité, tout s\'est bien passé. Merci à l\'équipe !',
  },
];

interface TestimonialsProps {
  items?: Testimonial[];
  variant?: 'grid' | 'carousel';
  showAll?: boolean;
}

export function Testimonials({
  items = testimonials,
  variant = 'grid',
  showAll = false,
}: TestimonialsProps) {
  const displayItems = showAll ? items : items.slice(0, 6);

  if (variant === 'carousel') {
    return (
      <div className="overflow-hidden">
        <div className="flex gap-6 animate-[scroll_30s_linear_infinite] hover:pause">
          {[...displayItems, ...displayItems].map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayItems.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TestimonialCard testimonial={testimonial} />
        </motion.div>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-joel-200 mb-4" />

      {/* Rating */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < testimonial.rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-200'
            )}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-slate-600 mb-6 flex-grow">{testimonial.comment}</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <UserAvatar name={testimonial.name} size="sm" />
        <div>
          <p className="font-semibold text-slate-900">{testimonial.name}</p>
          {testimonial.city && (
            <p className="text-sm text-slate-500">{testimonial.city}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// Single featured testimonial
export function FeaturedTestimonial({ testimonial }: { testimonial?: Testimonial }) {
  const featured = testimonial || testimonials[0];
  if (!featured) return null;

  return (
    <div className="relative bg-joel-500 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-joel-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-joel-600/30 rounded-full blur-2xl" />

      <div className="relative z-10">
        <Quote className="h-12 w-12 text-joel-200/50 mb-6" />

        <div className="flex gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-6 w-6',
                i < featured.rating
                  ? 'text-amber-300 fill-amber-300'
                  : 'text-joel-300'
              )}
            />
          ))}
        </div>

        <blockquote className="text-xl md:text-2xl font-medium mb-8 text-balance">
          "{featured.comment}"
        </blockquote>

        <div className="flex items-center gap-4">
          <UserAvatar name={featured.name} size="lg" />
          <div>
            <p className="font-semibold text-lg">{featured.name}</p>
            {featured.city && (
              <p className="text-joel-100">{featured.city}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

