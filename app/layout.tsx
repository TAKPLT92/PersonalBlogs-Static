import type { Metadata } from 'next';
import 'highlight.js/styles/github.css';
import './globals.css';
import SakuraCanvas from '@/components/SakuraCanvas';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getPosts, getSiteTitle } from '@/lib/content';

export const metadata: Metadata = {
  title: {
    default: '个人博客',
    template: '%s | 个人博客',
  },
  description: '个人日记、学习笔记、技术作品与常用资源收藏。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteTitle = getSiteTitle();
  const posts = getPosts();

  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <SakuraCanvas />
        <SiteHeader siteTitle={siteTitle} posts={posts} />
        <div className="relative z-10 flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
