'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Key,
  DoorOpen,
  Shield,
  ShieldCheck,
  Wrench,
  Clock,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { trackAppelClick, trackDiagnosticClick } from '@/lib/analytics';

const navigation = [
  { name: 'Accueil', href: '/' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Ouverture de porte', href: '/services#ouverture', icon: DoorOpen },
      { name: 'Changement de cylindre', href: '/services#cylindre', icon: Key },
      { name: 'Serrure multipoints', href: '/services#multipoints', icon: Shield },
      { name: 'Sécurisation après effraction', href: '/services#securisation', icon: ShieldCheck },
      { name: 'Tous les services', href: '/services', icon: Wrench },
    ],
  },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Comment ça marche', href: '/diagnostic-ia' },
  { name: 'Artisans', href: '/artisans' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handlePhoneClick = () => {
    trackAppelClick('header');
  };

  const handleDiagnosticClick = () => {
    trackDiagnosticClick('header');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      )}
    >
      {/* Top Bar - Urgence */}
      <div className="bg-joel-500 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Urgence serrurerie 24h/24, 7j/7</span>
          <span className="hidden sm:inline">—</span>
          <a
            href="tel:+33123456789"
            onClick={handlePhoneClick}
            className="font-bold hover:underline flex items-center gap-1"
          >
            <Phone className="h-4 w-4" />
            01 23 45 67 89
          </a>
        </div>
      </div>

      {/* Main Header */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={isScrolled ? '/logo.svg' : '/logo-white.svg'}
              alt="Mon Joël"
              width={24}
              height={40}
              className="h-10 w-auto transition-transform group-hover:scale-105"
              priority
            />
            <span className={cn(
              "font-chillax font-bold text-xl transition-colors",
              isScrolled ? "text-primary" : "text-white"
            )}>
              Mon Joël
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1',
                    pathname === item.href
                      ? isScrolled 
                        ? 'text-joel-500 bg-joel-50'
                        : 'text-white bg-white/20'
                      : isScrolled
                        ? 'text-joel-800 hover:text-joel-500 hover:bg-joel-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2"
                      >
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-joel-50 hover:text-joel-600 transition-colors"
                            >
                              <Icon className="h-5 w-5 text-joel-500" />
                              {child.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild onClick={handleDiagnosticClick}>
              <Link href="/urgence-serrurerie">
                Devis gratuit
              </Link>
            </Button>
            <Button size="sm" asChild onClick={handlePhoneClick}>
              <a href="tel:+33123456789" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled 
                ? 'text-joel-700 hover:bg-joel-50' 
                : 'text-white hover:bg-white/10'
            )}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <React.Fragment key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                        pathname === item.href
                          ? 'text-joel-500 bg-joel-50'
                          : 'text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 flex flex-col gap-1">
                        {item.children.slice(0, 4).map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="px-4 py-2 text-sm text-slate-600 hover:text-joel-500"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </nav>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/urgence-serrurerie">Devis gratuit</Link>
                </Button>
                <Button className="w-full" asChild>
                  <a href="tel:+33123456789" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Appeler maintenant
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

