import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'gradient' | 'pattern';
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  background = 'white',
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
    gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
    pattern: 'bg-white bg-hero-pattern',
  };

  return (
    <section
      id={id}
      className={cn('py-16 md:py-20 lg:py-24', backgroundClasses[background], className)}
    >
      <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      {badge && (
        <span className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-joel-100 text-joel-700">
          {badge}
        </span>
      )}
      <h2 className="font-chillax text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 text-lg text-slate-600 max-w-3xl',
          centered && 'mx-auto'
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            {breadcrumbs.map((item, index) => (
              <span key={item.label} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {item.href ? (
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-slate-300">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-chillax text-4xl md:text-5xl lg:text-6xl font-bold text-balance max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

