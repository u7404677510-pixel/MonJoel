import type { Metadata } from 'next';
import Link from 'next/link';
import { Key, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const metadata: Metadata = {
  title: 'Créer un compte | Mon Joël',
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </Link>

        <Card className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-joel-500 flex items-center justify-center">
              <Key className="h-6 w-6 text-white" />
            </div>
            <span className="font-chillax font-bold text-xl text-slate-900">Mon Joël</span>
          </div>

          <h1 className="font-chillax text-2xl font-bold text-slate-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-slate-600 mb-6">
            Rejoignez Mon Joël pour suivre vos interventions
          </p>

          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                placeholder="Jean Dupont"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.fr"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
              />
              <p className="text-xs text-slate-500 mt-1">
                Au moins 8 caractères, 1 majuscule, 1 chiffre
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-slate-600 font-normal">
                J&apos;accepte les{' '}
                <Link href="/cgu" className="text-joel-600 hover:underline">
                  Conditions Générales d&apos;Utilisation
                </Link>
                {' '}et la{' '}
                <Link href="/politique-confidentialite" className="text-joel-600 hover:underline">
                  Politique de Confidentialité
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Créer mon compte
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-600">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-joel-600 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

