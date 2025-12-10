import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-chillax text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-500 dark:text-slate-400', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

// Hoverable card variant
const CardHover = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        'cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-joel-200',
        className
      )}
      {...props}
    />
  )
);
CardHover.displayName = 'CardHover';

// Feature card (icon + title + description)
interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, title, description, ...props }, ref) => (
    <CardHover ref={ref} className={cn('p-6', className)} {...props}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-joel-100 text-joel-600">
        {icon}
      </div>
      <h4 className="mb-2 font-chillax text-lg font-semibold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </CardHover>
  )
);
FeatureCard.displayName = 'FeatureCard';

// Stats card
interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, label, value, change, icon, ...props }, ref) => (
    <Card ref={ref} className={cn('p-6', className)} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 font-chillax text-3xl font-bold text-slate-900">{value}</p>
          {change !== undefined && (
            <p
              className={cn(
                'mt-1 text-sm font-medium',
                change >= 0 ? 'text-success-600' : 'text-red-600'
              )}
            >
              {change >= 0 ? '+' : ''}
              {change}% vs période précédente
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-xl bg-slate-100 p-3 text-slate-600">{icon}</div>
        )}
      </div>
    </Card>
  )
);
StatsCard.displayName = 'StatsCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardHover,
  FeatureCard,
  StatsCard,
};

