import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-blue-700 text-white shadow hover:bg-blue-700/80',
        secondary:
          'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
        destructive:
          'border-transparent bg-red-100 text-red-600 hover:bg-red-100/80',
        warning:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100/80',
        success:
          'border-transparent bg-emerald-100/70 text-emerald-700 rounded-full font-semibold',
        outline: 'text-slate-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
