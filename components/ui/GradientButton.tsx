import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const gradientButtonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-teal-500 to-cyan-500 text-primary-foreground hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl',
        destructive:
          'bg-gradient-to-r from-red-500 to-orange-500 text-destructive-foreground hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl',
        outline:
          'border-2 border-teal-500 bg-transparent text-teal-500 hover:bg-teal-500/10',
        secondary:
          'bg-gradient-to-r from-amber-500 to-peach-500 text-secondary-foreground hover:from-amber-600 hover:to-peach-600 shadow-lg hover:shadow-xl',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 rounded-xl px-4 text-sm',
        md: 'h-12 px-6 py-3',
        lg: 'h-14 px-8 py-4 text-lg rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, disabled = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
GradientButton.displayName = 'GradientButton';

export { GradientButton, gradientButtonVariants };