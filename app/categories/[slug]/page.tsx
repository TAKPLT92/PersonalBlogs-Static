import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { getCategories, getPostsByCategory } from '@/lib/content';

export function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategories().find((c) => c.slug === params.slug);
  if (!category) return {};
  return { title: category.name, description: `${category.name}分类下的文章` };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategories().find((c) => c.slug === params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(params.slug);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14">
      <Link href="/categories" className="mb-8 inline-block text-sm text-ink/50 hover:text-accent">
        ← 全部分类
      </Link>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{category.name}</h1>
        <p className="mt-2 text-ink/50">{posts.length} 篇文章</p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-ink/40">这个分类下还没有文章。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
