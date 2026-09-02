import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: '分类',
  description: '按分类浏览博客文章',
};

export default function CategoriesPage() {
  const categories = getCategories();
  const posts = getPosts();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">分类</h1>
        <p className="mt-2 text-ink/50">按主题浏览所有文章</p>
      </header>

      {categories.length === 0 ? (
        <p className="py-20 text-center text-ink/40">还没有分类。</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat.name).length;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group rounded-2xl border border-black/5 bg-paper p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <h2 className="text-xl font-semibold text-ink group-hover:text-accent">{cat.name}</h2>
                <p className="mt-2 text-sm text-ink/50">{count} 篇文章</p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
