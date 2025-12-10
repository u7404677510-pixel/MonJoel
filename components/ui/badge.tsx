import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-joel-500 text-white',
        secondary: 'border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
        destructive: 'border-transparent bg-red-500 text-white',
        outline: 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300',
        success: 'border-transparent bg-success-100 text-success-700',
        warning: 'border-transparent bg-amber-100 text-amber-700',
        info: 'border-transparent bg-trust-100 text-trust-700',
        joel: 'border-transparent bg-joel-100 text-joel-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Status badge with dot indicator
interface StatusBadgeProps extends BadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

function StatusBadge({ status, children, className, ...props }: StatusBadgeProps) {
  const statusConfig = {
    success: { variant: 'success' as const, dotClass: 'bg-success-500' },
    warning: { variant: 'warning' as const, dotClass: 'bg-amber-500' },
    error: { variant: 'destructive' as const, dotClass: 'bg-red-500' },
    info: { variant: 'info' as const, dotClass: 'bg-trust-500' },
    neutral: { variant: 'secondary' as const, dotClass: 'bg-slate-400' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn('gap-1.5', className)} {...props}>
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dotClass)} />
      {children}
    </Badge>
  );
}

export { Badge, badgeVariants, StatusBadge };

