import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Plug, Zap, Lightbulb, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/layout/section';
import { CtaSection } from '@/components/shared/cta-section';

export const metadata: Metadata = {
  title: 'Ã‰lectricitÃ© - Ã‰lectricien de confiance 24h/24',
  description: 'Services Ã©lectricitÃ© professionnels : panne Ã©lectrique, tableau, prises, Ã©clairage. Ã‰lectriciens certifiÃ©s, intervention rapide.',
};

const services = [
  { id: 'panne', icon: Zap, title: 'Panne Ã©lectrique', desc: 'Diagnostic et rÃ©paration rapide de pannes.', price: '79â‚¬' },
  { id: 'eclairage', icon: Lightbulb, title: 'Installation Ã©clairage', desc: 'Pose de luminaires, spots, LED.', price: '59â‚¬' },
  { id: 'tableau', icon: Plug, title: 'Tableau Ã©lectrique', desc: 'Mise aux normes, remplacement.', price: 'Sur devis' },
  { id: 'prises', icon: Cable, title: 'Prises et interrupteurs', desc: 'Installation et remplacement.', price: '45â‚¬' },
];

export default function ElectriciteServicesPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-amber-500 via-orange-600 to-orange-700 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border border-white/40"><Plug className="h-3 w-3 mr-1" />Ã‰lectricitÃ©</Badge>
          <h1 className="font-chillax text-4xl md:text-5xl font-bold mb-6">Services d&apos;<span className="text-yellow-200">Ã‰lectricitÃ©</span></h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">Ã‰lectriciens professionnels 24h/24 pour dÃ©pannage, installation et mise aux normes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-orange-50 text-orange-600" asChild><a href="tel:+33612018781"><Phone className="h-5 w-5 mr-2" />06 12 01 87 81</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild><Link href="/urgence-electricite">Urgence<ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
          </div>
        </div>
      </section>
      <Section>
        <SectionHeader badge="Prestations" title="Nos services Ã©lectricitÃ©" />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => { const Icon = s.icon; return (
            <Card key={s.id} id={s.id} className="p-6"><div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center"><Icon className="h-6 w-6 text-amber-600" /></div>
              <div><div className="flex items-center gap-2 mb-2"><h3 className="font-chillax text-lg font-bold">{s.title}</h3><Badge variant="secondary" className="bg-amber-100 text-amber-700">Ã€ partir de {s.price}</Badge></div><p className="text-slate-600">{s.desc}</p></div>
            </div></Card>
          ); })}
        </div>
      </Section>
      <CtaSection title="Besoin d'un Ã©lectricien ?" description="Artisans disponibles 24h/24." />
    </>
  );
}
