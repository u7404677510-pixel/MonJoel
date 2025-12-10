import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Key, Plug, Droplets, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Urgence - Depannage 24h/24',
  description: 'Urgence serrurerie, electricite, plomberie. Artisans disponibles 24h/24, 7j/7. Intervention rapide, devis gratuit.',
};

const urgences = [
  { title: 'Serrurerie', icon: Key, href: '/urgence-serrurerie', color: 'from-violet-500 to-purple-600', desc: 'Porte claquee, cle cassee' },
  { title: 'Electricite', icon: Plug, href: '/urgence-electricite', color: 'from-amber-500 to-orange-600', desc: 'Panne, court-circuit' },
  { title: 'Plomberie', icon: Droplets, href: '/urgence-plomberie', color: 'from-blue-500 to-cyan-600', desc: 'Fuite eau, debouchage' },
];

export default function UrgencePage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border border-white/40 animate-pulse"><Clock className="h-3 w-3 mr-1" />Urgence 24h/24</Badge>
          <h1 className="font-chillax text-4xl md:text-6xl font-bold mb-6">Depannage Urgence</h1>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">Serrurerie, electricite, plomberie : artisans disponibles maintenant.</p>
          <Button size="lg" className="bg-white hover:bg-red-50 text-red-600 text-xl px-10 py-6 h-auto" asChild>
            <a href="tel:+33612018781"><Phone className="h-6 w-6 mr-3" />06 12 01 87 81</a>
          </Button>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {urgences.map((u) => { const Icon = u.icon; return (
              <Link key={u.title} href={u.href}>
                <Card className="p-8 text-center hover:shadow-xl transition-all cursor-pointer group">
                  <div className={w-20 h-20 rounded-2xl bg-gradient-to-r {u.color} flex items-center justify-center mx-auto mb-6}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="font-chillax text-2xl font-bold mb-2">{u.title}</h2>
                  <p className="text-slate-600 mb-4">{u.desc}</p>
                  <span className="text-joel-600 font-medium flex items-center justify-center gap-2 group-hover:gap-3 transition-all">Urgence {u.title}<ArrowRight className="h-4 w-4" /></span>
                </Card>
              </Link>
            ); })}
          </div>
        </div>
      </section>
    </>
  );
}
