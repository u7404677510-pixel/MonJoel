import type { Metadata } from 'next';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Section, PageHeader } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Contact | Mon Joël Serrurerie',
  description:
    'Contactez Mon Joël pour toute question sur nos services de serrurerie. Par téléphone, email ou formulaire. Réponse rapide garantie.',
  alternates: {
    canonical: '/contact',
  },
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Téléphone',
    description: 'Pour une urgence ou un devis rapide',
    value: '06 12 01 87 81',
    href: 'tel:+33612018781',
    available: '24h/24, 7j/7',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Pour les demandes non urgentes',
    value: 'contact@monjoel.com',
    href: 'mailto:contact@monjoel.com',
    available: 'Réponse sous 24h',
  },
  {
    icon: MessageSquare,
    title: 'Chat',
    description: 'Discutez avec un conseiller',
    value: 'Ouvrir le chat',
    href: '#chat',
    available: '8h-22h',
  },
];

const subjects = [
  { value: 'devis', label: 'Demande de devis' },
  { value: 'question', label: 'Question sur un service' },
  { value: 'reclamation', label: 'Réclamation / SAV' },
  { value: 'partenariat', label: 'Partenariat / Presse' },
  { value: 'autre', label: 'Autre' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contactez-nous"
        description="Une question, une demande ? Notre équipe est à votre écoute."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* Contact Methods */}
      <Section background="light">
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-joel-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-joel-600" />
                </div>
                <h3 className="font-chillax text-lg font-semibold text-slate-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{method.description}</p>
                <a
                  href={method.href}
                  className="text-joel-600 font-semibold hover:text-joel-700 transition-colors"
                >
                  {method.value}
                </a>
                <p className="text-xs text-slate-400 mt-2">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {method.available}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Contact Form */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="p-8">
            <h2 className="font-chillax text-2xl font-bold text-slate-900 mb-2">
              Envoyez-nous un message
            </h2>
            <p className="text-slate-600 mb-6">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" required>Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean@exemple.fr"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Téléphone (optionnel)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subject" required>Sujet</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" required>Votre message</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre demande en détail..."
                  rows={5}
                  className="mt-1"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="consent" className="mt-1" />
                <Label htmlFor="consent" className="text-sm text-slate-600 font-normal">
                  J&apos;accepte que mes données soient traitées conformément à la{' '}
                  <a href="/politique-confidentialite" className="text-joel-600 hover:underline">
                    politique de confidentialité
                  </a>{' '}
                  pour répondre à ma demande.
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Send className="h-5 w-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div>
            <h2 className="font-chillax text-2xl font-bold text-slate-900 mb-6">
              Nos coordonnées
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-joel-100 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-joel-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Téléphone</h3>
                  <a href="tel:+33612018781" className="text-joel-600 hover:underline">
                    06 12 01 87 81
                  </a>
                  <p className="text-sm text-slate-500 mt-1">
                    Disponible 24h/24 pour les urgences
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-joel-100 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-joel-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <a href="mailto:contact@monjoel.com" className="text-joel-600 hover:underline">
                    contact@monjoel.com
                  </a>
                  <p className="text-sm text-slate-500 mt-1">
                    Réponse sous 24h ouvrées
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-joel-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-joel-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Adresse</h3>
                  <p className="text-slate-600">
                    Mon Joël SAS<br />
                    123 Avenue de l&apos;Innovation<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500">
                    Carte interactive
                  </p>
                  <p className="text-sm text-slate-400">
                    (Google Maps à intégrer)
                  </p>
                </div>
              </div>
            </Card>

            {/* Opening hours */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-joel-500" />
                Horaires du service client
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Lundi - Vendredi</span>
                  <span className="font-medium text-slate-900">8h - 20h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Samedi</span>
                  <span className="font-medium text-slate-900">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Dimanche & Fériés</span>
                  <span className="font-medium text-slate-900">10h - 16h</span>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  * Pour les urgences, le service d&apos;intervention reste disponible 24h/24
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

