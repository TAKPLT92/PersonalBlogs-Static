import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import { formatDate } from '@/lib/format';
import {
  getCategories,
  getPostBySlug,
  getPosts,
  getSiteTitle,
  getTags,
} from '@/lib/content';

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const siteTitle = getSiteTitle();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.date,
    author: { '@type': 'Person', name: siteTitle },
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-14">
      <div className="mb-8">
        <Link href="/home" className="text-sm text-ink/50 hover:text-accent">
          ← 返回首页
        </Link>
      </div>

      <article className="book-open">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-ink/50">
            {post.category && (
              <Link
                href={`/categories/${
                  getCategories().find((c) => c.name === post.category)?.slug ??
                  slugify(post.category)
                }`}
                className="rounded-full bg-accentSoft/30 px-3 py-1 text-xs text-accent"
              >
                {post.category}
              </Link>
            )}
            <time>{formatDate(post.date)}</time>
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-ink/60">{post.excerpt}</p>
          )}
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${
                    getTags().find((t) => t.name === tag)?.slug ?? slugify(tag)
                  }`}
                  className="text-sm text-ink/40 hover:text-accent"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <MarkdownContent content={post.content} />
      </article>
    </main>
  );
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'post';
}
