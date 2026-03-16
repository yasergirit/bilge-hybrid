import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { legalPages, getLegalPageBySlug } from '@/lib/data/legal';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { formatDate } from '@/lib/utils/format';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) return {};
  return { title: page.title };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: page.title }]} />

      <h1 className="text-2xl font-bold text-neutral-950 mt-6 mb-2">{page.title}</h1>
      <p className="text-xs text-neutral-400 mb-8">Son güncelleme: {formatDate(page.lastUpdated)}</p>

      <div
        className="prose prose-sm prose-neutral max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-neutral-600 [&_li]:text-sm [&_li]:text-neutral-600"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(page.content) }}
      />
    </div>
  );
}

// Simple markdown to HTML converter for legal pages
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*\[(.+?)\]\*/g, '<em class="block mt-4 text-xs text-neutral-400">$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc pl-5 space-y-1">${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hulo])/gm, (match) => match ? `<p>${match}` : '')
    .replace(/<p><\/p>/g, '');
}
