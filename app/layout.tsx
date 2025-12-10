import type { Metadata, Viewport } from 'next';
import { Poppins, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';

import '@/styles/globals.css';

// ===========================================
// Fonts Configuration
// ===========================================

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Using Space Grotesk as display font (similar to Chillax)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-chillax',
  display: 'swap',
});

// ===========================================
// Metadata
// ===========================================

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://monjoel.fr'),
  title: {
    default: 'Mon Joël - Dépannage Serrurerie, Électricité, Plomberie 24h/24',
    template: '%s | Mon Joël',
  },
  description:
    'Artisans de confiance pour vos urgences : serrurerie, électricité, plomberie. Intervention rapide 24h/24, devis transparent, tarifs clairs. Appelez maintenant !',
  keywords: [
    'dépannage',
    'serrurier',
    'électricien',
    'plombier',
    'urgence',
    'serrurerie',
    'électricité',
    'plomberie',
    '24h/24',
    'artisan',
  ],
  authors: [{ name: 'Mon Joël' }],
  creator: 'Mon Joël',
  publisher: 'Mon Joël',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://monjoel.fr',
    siteName: 'Mon Joël',
    title: 'Mon Joël - Serrurier de confiance | Dépannage 24h/24',
    description:
      'Serrurier disponible 24h/24 pour vos urgences. Devis transparent avant intervention, artisans certifiés, tarifs clairs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mon Joël - Service de serrurerie intelligent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Joël - Serrurier de confiance | Dépannage 24h/24',
    description:
      'Serrurier disponible 24h/24 pour vos urgences. Devis transparent, artisans certifiés, intervention rapide.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ===========================================
// Root Layout
// ===========================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXXXX';

  return (
    <html lang="fr" className={`${poppins.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-poppins antialiased">
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}

