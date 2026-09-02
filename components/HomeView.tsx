import PageBodyBackground from '@/components/PageBodyBackground';
import PostCard from '@/components/PostCard';
import { getPosts, getSettings, getSiteTitle } from '@/lib/content';

export default function HomeView() {
  const posts = getPosts();
  const siteTitle = getSiteTitle();
  const settings = getSettings();

  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-6 py-14">
      <PageBodyBackground imageUrl={settings.background_home} />
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-wide text-ink sm:text-5xl">
          {siteTitle}
        </h1>
        <p className="mt-3 text-ink/50">记录生活、沉淀思考、分享技术</p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-ink/40">还没有文章。</p>
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
