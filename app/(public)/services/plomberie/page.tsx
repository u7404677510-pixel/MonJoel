import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Droplets, ShowerHead, Thermometer, Wrench, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';

export const metadata: Metadata = {
  title: 'Plomberie - Plombier de confiance 24h/24',
  description: 'Services plomberie professionnels : fuite d eau, dÃ©bouchage, chauffe-eau, sanitaires. Plombiers certifiÃ©s, intervention rapide.',
};

const services = [
  { id: 'fuite', icon: Droplets, title: 'Fuite d eau', desc: 'DÃ©tection et rÃ©paration de fuites.', price: '89â‚¬' },
  { id: 'debouchage', icon: ShowerHead, title: 'DÃ©bouchage', desc: 'Canalisations, WC, Ã©viers, douches.', price: '79â‚¬' },
  { id: 'chauffe-eau', icon: Thermometer, title: 'Chauffe-eau', desc: 'Installation, rÃ©paration, remplacement.', price: 'Sur devis' },
  { id: 'sanitaires', icon: Wrench, title: 'Sanitaires', desc: 'Installation WC, lavabo, douche.', price: '99â‚¬' },
];

export default function PlomberieServicesPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-500 via-cyan-600 to-cyan-700 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border border-white/40"><Droplets className="h-3 w-3 mr-1" />Plomberie</Badge>
          <h1 className="font-chillax text-4xl md:text-5xl font-bold mb-6">Services de <span className="text-cyan-200">Plomberie</span></h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Plombiers professionnels 24h/24 pour urgences, installation et rÃ©paration.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-blue-50 text-blue-600" asChild><a href="tel:+33612018781"><Phone className="h-5 w-5 mr-2" />06 12 01 87 81</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild><Link href="/urgence-plomberie">Urgence<ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
          </div>
        </div>
      </section>
      <Section>
        <SectionHeader badge="Prestations" title="Nos services plomberie" />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => { const Icon = s.icon; return (
            <Card key={s.id} id={s.id} className="p-6"><div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center"><Icon className="h-6 w-6 text-blue-600" /></div>
              <div><div className="flex items-center gap-2 mb-2"><h3 className="font-chillax text-lg font-bold">{s.title}</h3><Badge variant="secondary" className="bg-blue-100 text-blue-700">Ã€ partir de {s.price}</Badge></div><p className="text-slate-600">{s.desc}</p></div>
            </div></Card>
          ); })}
        </div>
      </Section>
      <CtaSection title="Besoin d'un plombier ?" description="Artisans disponibles 24h/24." />
    </>
  );
}
