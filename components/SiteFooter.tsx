export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-black/5 py-8 text-center text-sm text-ink/40">
      <p>© {new Date().getFullYear()} 个人博客 · 用 ❤️ 与 Next.js 构建</p>
    </footer>
  );
}
