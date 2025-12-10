import type { Metadata } from 'next';
import { Phone, Droplets, ShowerHead, Clock, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Urgence Plomberie - Plombier 24h/24',
  description: 'Urgence plomberie ? Plombier disponible 24h/24, 7j/7. Fuite eau, debouchage, chauffe-eau. Intervention rapide.',
};

export default function UrgencePlomberiePage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-500 via-cyan-600 to-blue-700 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border border-white/40 animate-pulse"><Clock className="h-3 w-3 mr-1" />Urgence 24h/24</Badge>
          <h1 className="font-chillax text-4xl md:text-6xl font-bold mb-6">Urgence Plomberie</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Fuite eau, canalisation bouchee ? Plombier en 30 min.</p>
          <Button size="lg" className="bg-white hover:bg-blue-50 text-blue-600 text-xl px-10 py-6 h-auto" asChild>
            <a href="tel:+33612018781"><Phone className="h-6 w-6 mr-3" />06 12 01 87 81</a>
          </Button>
        </div>
      </section>
      <Section className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border-blue-200 bg-blue-50"><Droplets className="h-10 w-10 text-blue-600 mx-auto mb-4" /><h3 className="font-bold text-lg mb-2">Fuite eau</h3><p className="text-slate-600 text-sm">Reparation urgente</p></Card>
          <Card className="p-6 text-center border-blue-200 bg-blue-50"><ShowerHead className="h-10 w-10 text-blue-600 mx-auto mb-4" /><h3 className="font-bold text-lg mb-2">Debouchage</h3><p className="text-slate-600 text-sm">Canalisations, WC</p></Card>
          <Card className="p-6 text-center border-blue-200 bg-blue-50"><Thermometer className="h-10 w-10 text-blue-600 mx-auto mb-4" /><h3 className="font-bold text-lg mb-2">Chauffe-eau</h3><p className="text-slate-600 text-sm">Depannage rapide</p></Card>
        </div>
      </Section>
    </>
  );
}
