import type { Metadata } from 'next';
import { Phone, Plug, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Urgence Electricite - Electricien 24h/24',
  description: 'Urgence electrique ? Electricien disponible 24h/24, 7j/7. Panne, court-circuit, tableau electrique. Intervention rapide.',
};

export default function UrgenceElectricitePage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border border-white/40 animate-pulse"><Clock className="h-3 w-3 mr-1" />Urgence 24h/24</Badge>
          <h1 className="font-chillax text-4xl md:text-6xl font-bold mb-6">Urgence Electricite</h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">Panne electrique, court-circuit ? Electricien en 30 min.</p>
          <Button size="lg" className="bg-white hover:bg-orange-50 text-orange-600 text-xl px-10 py-6 h-auto" asChild>
            <a href="tel:+33612018781"><Phone className="h-6 w-6 mr-3" />06 12 01 87 81</a>
          </Button>
        </div>
      </section>
      <Section className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border-amber-200 bg-amber-50"><Zap className="h-10 w-10 text-amber-600 mx-auto mb-4" /><h3 className="font-bold text-lg mb-2">Panne electrique</h3><p className="text-slate-600 text-sm">Diagnostic rapide</p></Card>
          <Card className="p-6 text-center border-amber-200 bg-amber-50"><Plug className="h-10 w-10 text-amber-600 mx-auto mb-4" /><h3 className="font-bold text-lg mb-2">Court-circuit</h3><p className="text-slate-600 text-sm">Intervention securisee</p></Card>
          <Card className="p-6 text-center border-amber-200 bg-amber-50"><Shield className="h-10 w-10 text-amber-600 mx-auto mb-4" /><h3 className="font-bold text-lg mb-2">Tableau electrique</h3><p className="text-slate-600 text-sm">Remise en service</p></Card>
        </div>
      </Section>
    </>
  );
}
