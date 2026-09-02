import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">页面不存在</h1>
      <Link
        href="/home"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm text-white transition hover:bg-accent/90"
      >
        返回首页
      </Link>
    </main>
  );
}
