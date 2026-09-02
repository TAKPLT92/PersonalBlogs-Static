import type { Metadata } from 'next';
import EnterHomeButton from '@/components/EnterHomeButton';
import { getSiteTitle } from '@/lib/content';

export const metadata: Metadata = {
  title: '关于我',
  description: '关于这个博客和博主',
};

export default function AboutPage() {
  const siteTitle = getSiteTitle();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-14">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-wide text-ink sm:text-5xl">关于我</h1>
        <p className="mt-3 text-ink/50">欢迎来到 {siteTitle}</p>
      </header>

      <div className="rounded-2xl border border-black/5 bg-paper p-8 shadow-card">
        <p className="leading-relaxed text-ink/75">
          这个博客是我的个人空间，用来记录日常思考、学习笔记、技术作品，以及收藏常用的资源和工具。
        </p>
        <p className="mt-4 leading-relaxed text-ink/75">感谢你的到访，愿每一段文字都有温度。</p>
      </div>

      <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
        <p className="text-lg font-medium text-ink">欢迎来到 {siteTitle}</p>
        <p className="mt-1 text-sm text-ink/50">点击下方按钮进入主页</p>
        <EnterHomeButton />
      </div>
    </main>
  );
}
