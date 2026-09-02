import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { getPostsByTag, getTags } from '@/lib/content';

export function generateStaticParams() {
  return getTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = getTags().find((t) => t.slug === params.slug);
  if (!tag) return {};
  return { title: `#${tag.name}`, description: `标签“${tag.name}”下的文章` };
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const tag = getTags().find((t) => t.slug === params.slug);
  if (!tag) notFound();

  const posts = getPostsByTag(params.slug);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14">
      <Link href="/tags" className="mb-8 inline-block text-sm text-ink/50 hover:text-accent">
        ← 全部标签
      </Link>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">#{tag.name}</h1>
        <p className="mt-2 text-ink/50">{posts.length} 篇文章</p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-ink/40">这个标签下还没有文章。</p>
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
