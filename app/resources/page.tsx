import type { Metadata } from 'next';
import ResourceBrowser from '@/components/ResourceBrowser';
import { getResources } from '@/lib/content';

export const metadata: Metadata = {
  title: '资源收藏',
  description: '常用网站与学习资料收藏',
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-wide text-ink sm:text-5xl">资源收藏</h1>
        <p className="mt-3 text-ink/50">常用网站与学习资料</p>
      </header>
      <ResourceBrowser resources={resources} />
    </main>
  );
}
