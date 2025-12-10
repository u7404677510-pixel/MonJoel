import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Key,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  Shield,
  CreditCard,
} from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Ouverture de porte', href: '/services#ouverture' },
    { name: 'Changement de cylindre', href: '/services#cylindre' },
    { name: 'Serrure multipoints', href: '/services#multipoints' },
    { name: 'Sécurisation', href: '/services#securisation' },
    { name: 'Blindage de porte', href: '/services#blindage' },
    { name: 'Tous les services', href: '/services' },
  ],
  entreprise: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Nos tarifs', href: '/tarifs' },
    { name: 'Devenir artisan partenaire', href: '/artisans' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  villes: [
    { name: 'Serrurier Paris', href: '/ville/paris/serrurier' },
    { name: 'Serrurier Lyon', href: '/ville/lyon/serrurier' },
    { name: 'Serrurier Marseille', href: '/ville/marseille/serrurier' },
    { name: 'Serrurier Bordeaux', href: '/ville/bordeaux/serrurier' },
    { name: 'Serrurier Toulouse', href: '/ville/toulouse/serrurier' },
    { name: 'Toutes les villes', href: '/villes' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'CGU', href: '/cgu' },
    { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
  ],
};

const trustBadges = [
  { icon: Clock, label: '24h/24, 7j/7' },
  { icon: Shield, label: 'Artisans certifiés' },
  { icon: CreditCard, label: 'Paiement sécurisé' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Trust badges */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-2 text-sm">
                  <Icon className="h-5 w-5 text-joel-400" />
                  <span className="text-slate-300">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-joel-500 flex items-center justify-center">
                <Key className="h-6 w-6 text-white" />
              </div>
              <span className="font-chillax font-bold text-xl">Mon Joël</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Service de serrurerie intelligent avec diagnostic IA. Devis transparent, 
              intervention rapide, tarifs justes.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-slate-300 hover:text-joel-400 transition-colors"
              >
                <Phone className="h-5 w-5 text-joel-500" />
                <span>01 23 45 67 89</span>
              </a>
              <a
                href="mailto:contact@monjoel.com"
                className="flex items-center gap-3 text-slate-300 hover:text-joel-400 transition-colors"
              >
                <Mail className="h-5 w-5 text-joel-500" />
                <span>contact@monjoel.com</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="h-5 w-5 text-joel-500" />
                <span>Intervention toute la France</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-joel-500 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-joel-500 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-joel-500 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-chillax font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-joel-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-chillax font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-joel-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h4 className="font-chillax font-semibold text-white mb-4">Nos villes</h4>
            <ul className="space-y-2">
              {footerLinks.villes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-joel-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Mon Joël. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

