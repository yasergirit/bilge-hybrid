import type { OwnBrandInfo } from '@/lib/types';

interface OwnBrandBadgeProps {
  info: OwnBrandInfo;
  compact?: boolean;
}

export function OwnBrandBadge({ info, compact = false }: OwnBrandBadgeProps) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 text-white rounded-full text-xs font-medium">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        Bilge Hybrid Üretimi
      </div>
    );
  }

  const productionLabels = {
    local: 'Yerel Üretim',
    'private-label': 'Bilge Hybrid Markası',
    custom: 'Özel Tasarım',
  };

  return (
    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        <span className="font-semibold text-sm text-neutral-950">{productionLabels[info.productionType]}</span>
      </div>

      <p className="text-sm text-neutral-600 leading-relaxed">{info.story}</p>

      <div className="flex flex-wrap gap-2">
        {info.materials && (
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full">
            Malzeme: {info.materials}
          </span>
        )}
        {info.craftHighlight && (
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full">
            {info.craftHighlight}
          </span>
        )}
        {info.authenticityBadge && (
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full">
            QR ile Orijinallik Doğrulama
          </span>
        )}
      </div>
    </div>
  );
}
