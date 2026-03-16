import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="hover:text-neutral-950 transition-colors">Ana Sayfa</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-neutral-950 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-neutral-950">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
