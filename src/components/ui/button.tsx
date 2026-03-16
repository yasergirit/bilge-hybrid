import { cn } from '@/lib/utils/format';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary: 'bg-neutral-950 text-white hover:bg-neutral-800',
      secondary: 'bg-neutral-100 text-neutral-950 hover:bg-neutral-200',
      outline: 'border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50',
      ghost: 'text-neutral-950 hover:bg-neutral-100',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-11 px-5 text-sm rounded-lg',
      lg: 'h-12 px-8 text-base rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
