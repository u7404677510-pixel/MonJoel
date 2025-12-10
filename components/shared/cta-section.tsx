'use client';

import Link from 'next/link';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { trackAppelClick, trackDiagnosticClick } from '@/lib/analytics';

interface CtaSectionProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'urgent' | 'minimal';
}

export function CtaSection({
  title = 'Besoin d\'un serrurier ?',
  description = 'Obtenez un diagnostic gratuit et un devis transparent en quelques minutes grâce à notre IA.',
  variant = 'default',
}: CtaSectionProps) {
  const handlePhoneClick = () => {
    trackAppelClick('cta_section');
  };

  const handleDiagnosticClick = () => {
    trackDiagnosticClick('cta_section');
  };

  if (variant === 'minimal') {
    return (
      <div className="bg-joel-50 rounded-2xl p-8 text-center">
        <h3 className="font-chillax text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild onClick={handleDiagnosticClick}>
            <Link href="/diagnostic-ia">
              <Sparkles className="h-4 w-4 mr-2" />
              Diagnostic gratuit
            </Link>
          </Button>
          <Button variant="outline" asChild onClick={handlePhoneClick}>
            <a href="tel:+33612018781">
              <Phone className="h-4 w-4 mr-2" />
              06 12 01 87 81
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'urgent') {
    return (
      <section className="bg-joel-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-chillax text-2xl md:text-3xl font-bold mb-2">
                Urgence serrurerie ? On arrive !
              </h3>
              <p className="text-joel-100">
                Intervention en 30 minutes, disponible 24h/24, 7j/7.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-white text-joel-600 hover:bg-joel-50"
                asChild
                onClick={handlePhoneClick}
              >
                <a href="tel:+33612018781" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Appeler maintenant
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
                onClick={handleDiagnosticClick}
              >
                <Link href="/urgence-serrurerie">
                  Page urgence
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-joel-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-joel-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-joel-500/20 text-joel-300 border border-joel-500/30">
            <Sparkles className="h-4 w-4 mr-2" />
            Diagnostic IA gratuit
          </span>

          <h2 className="font-chillax text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            {title}
          </h2>

          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="text-lg" asChild onClick={handleDiagnosticClick}>
              <Link href="/diagnostic-ia">
                <Sparkles className="h-5 w-5 mr-2" />
                Lancer le diagnostic
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="text-lg border-white/30 text-white hover:bg-white/10"
              asChild
              onClick={handlePhoneClick}
            >
              <a href="tel:+33612018781">
                <Phone className="h-5 w-5 mr-2" />
                06 12 01 87 81
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            Devis gratuit et sans engagement • Réponse en quelques minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}

