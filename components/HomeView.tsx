'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageBodyBackground from '@/components/PageBodyBackground';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/content';

export default function HomeView({
  posts,
  siteTitle,
  backgroundHome,
}: {
  posts: PostMeta[];
  siteTitle: string;
  backgroundHome?: string | null;
}) {
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.trim() ?? '';
  const keyword = q.toLowerCase();

  const filtered = keyword
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          (post.excerpt ?? '').toLowerCase().includes(keyword) ||
          post.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
          (post.category ?? '').toLowerCase().includes(keyword),
      )
    : posts;

  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-6 py-14">
      <PageBodyBackground imageUrl={backgroundHome} />

      {q && (
        <div className="mb-6">
          <Link
            href="/home"
            className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent"
          >
            ← 返回首页
          </Link>
        </div>
      )}

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-wide text-ink sm:text-5xl">
          {siteTitle}
        </h1>
        <p className="mt-3 text-ink/50">
          {q ? `“${q}” 的搜索结果` : '记录生活、沉淀思考、分享技术'}
        </p>
      </header>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink/40">
          {q ? '没有找到相关文章。' : '还没有文章。'}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
