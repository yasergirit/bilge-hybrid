import { cn } from '@/lib/utils/format';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'sale' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    brand: 'bg-neutral-950 text-white',
    sale: 'bg-red-50 text-red-700',
    outline: 'border border-neutral-300 text-neutral-600',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
