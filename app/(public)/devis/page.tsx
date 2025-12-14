'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/section';
import { prices, formatPrice, Service } from '@/lib/prices';

function DevisForm() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('cat') as 'serrurerie' | 'plomberie' | 'electricite' | null;
  const serviceId = searchParams.get('id');

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (categoryParam && serviceId) {
      const category = prices.categories[categoryParam];
      if (category) {
        const service = category.services.find(s => s.id === serviceId);
        if (service) {
          setSelectedService(service);
        }
      }
    }
  }, [categoryParam, serviceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="font-chillax text-2xl font-bold mb-4">Demande envoyée !</h2>
        <p className="text-slate-600 mb-6">
          Nous vous recontactons dans les plus brefs délais pour vous proposer un devis personnalisé.
        </p>
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <a href="tel:+33612018781">
              <Phone className="h-4 w-4 mr-2" />
              Appeler maintenant
            </a>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 max-w-2xl mx-auto">
      {selectedService && (
        <div className="mb-6 p-4 bg-joel-50 rounded-lg border border-joel-100">
          <p className="text-sm text-slate-500 mb-1">Intervention sélectionnée</p>
          <p className="font-semibold text-slate-900">{selectedService.name}</p>
          <Badge className="mt-2 bg-joel-100 text-joel-700">
            {formatPrice(selectedService)}
          </Badge>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet *</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone *</label>
            <Input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jean@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Adresse d&apos;intervention *</label>
          <Input
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="123 rue de Paris, 75001 Paris"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description du problème</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-joel-500"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Décrivez votre problème..."
          />
        </div>

        <div className="flex items-start gap-2 text-sm text-slate-500">
          <input type="checkbox" required className="mt-1" />
          <span>
            J&apos;accepte d&apos;être recontacté par Mon Joël pour obtenir un devis.
          </span>
        </div>

        <Button type="submit" size="lg" className="w-full">
          <Send className="h-4 w-4 mr-2" />
          Demander mon devis gratuit
        </Button>
      </form>
    </Card>
  );
}

export default function DevisPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-joel-600 to-joel-800 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-chillax text-4xl md:text-5xl font-bold mb-4">
            Demande de <span className="text-yellow-300">Devis Gratuit</span>
          </h1>
          <p className="text-xl text-joel-100 max-w-xl mx-auto">
            Remplissez le formulaire et recevez un devis personnalisé en quelques minutes.
          </p>
        </div>
      </section>

      <Section>
        <Suspense fallback={<div className="text-center py-12">Chargement...</div>}>
          <DevisForm />
        </Suspense>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          <div>
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">100% gratuit</p>
          </div>
          <div>
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Sans engagement</p>
          </div>
          <div>
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Réponse rapide</p>
          </div>
        </div>
      </Section>
    </>
  );
}
