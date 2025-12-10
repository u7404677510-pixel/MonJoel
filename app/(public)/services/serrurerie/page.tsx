import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Key, DoorOpen, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';

export const metadata: Metadata = {
  title: 'Serrurerie - Serrurier de confiance 24h/24',
  description: 'Services de serrurerie professionnels : ouverture de porte, changement de cylindre, blindage. Artisans certifiÃ©s, intervention rapide.',
};

const services = [
  { id: 'ouverture', icon: DoorOpen, title: 'Ouverture de porte', desc: 'Porte claquÃ©e, clÃ© perdue ? Intervention sans dÃ©gÃ¢t.', price: '89â‚¬' },
  { id: 'cylindre', icon: Key, title: 'Changement cylindre', desc: 'Cylindres haute sÃ©curitÃ©, toutes marques.', price: '129â‚¬' },
  { id: 'blindage', icon: ShieldCheck, title: 'Blindage de porte', desc: 'Renforcement certifiÃ© A2P.', price: 'Sur devis' },
  { id: 'multipoints', icon: Lock, title: 'Serrure multipoints', desc: 'Installation 3, 5 ou 7 points.', price: '250â‚¬' },
];

export default function SerrurerieServicesPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-joel-600 via-joel-700 to-joel-900 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-yellow-300/20 text-yellow-300 border border-yellow-300/40"><Key className="h-3 w-3 mr-1" />Serrurerie</Badge>
          <h1 className="font-chillax text-4xl md:text-5xl font-bold mb-6">Services de <span className="text-yellow-300">Serrurerie</span></h1>
          <p className="text-xl text-joel-100 mb-8 max-w-2xl mx-auto">Serruriers professionnels 24h/24 pour urgences, installation et sÃ©curisation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-300 hover:bg-yellow-400 text-joel-950" asChild><a href="tel:+33612018781"><Phone className="h-5 w-5 mr-2" />06 12 01 87 81</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild><Link href="/urgence-serrurerie">Urgence<ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
          </div>
        </div>
      </section>
      <Section>
        <SectionHeader badge="Prestations" title="Nos services serrurerie" />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => { const Icon = s.icon; return (
            <Card key={s.id} id={s.id} className="p-6"><div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-joel-100 flex items-center justify-center"><Icon className="h-6 w-6 text-joel-600" /></div>
              <div><div className="flex items-center gap-2 mb-2"><h3 className="font-chillax text-lg font-bold">{s.title}</h3><Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Ã€ partir de {s.price}</Badge></div><p className="text-slate-600">{s.desc}</p></div>
            </div></Card>
          ); })}
        </div>
      </Section>
      <CtaSection title="Besoin d'un serrurier ?" description="Artisans disponibles 24h/24." />
    </>
  );
}
