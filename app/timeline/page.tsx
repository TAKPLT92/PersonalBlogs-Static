import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: '时间线',
  description: '按时间倒序浏览所有文章',
};

export default function TimelinePage() {
  const posts = getPosts();

  const grouped: Record<string, typeof posts> = {};
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    const key = Number.isNaN(year) ? '未知' : String(year);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(post);
  }

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">时间线</h1>
        <p className="mt-2 text-ink/50">按时间倒序回顾所有文章</p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-ink/40">还没有文章。</p>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year}>
              <h2 className="mb-5 text-2xl font-semibold text-accent">{year}</h2>
              <ol className="relative space-y-5 border-l border-black/10 pl-6">
                {grouped[year].map((post) => (
                  <li key={post.slug} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-paper" />
                    <time className="block text-sm text-ink/40">{formatDate(post.date)}</time>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="mt-1 block text-lg font-medium text-ink hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
