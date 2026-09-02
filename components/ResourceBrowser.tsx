'use client';

import { useMemo, useState } from 'react';
import type { Resource } from '@/lib/content';

export default function ResourceBrowser({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const r of resources) if (r.category) set.add(r.category);
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'zh-CN'));
  }, [resources]);

  const filtered = useMemo(() => {
    const kw = query.trim().toLowerCase();
    return resources.filter((r) => {
      const matchCategory = !category || r.category === category;
      const matchQuery =
        !kw ||
        r.title.toLowerCase().includes(kw) ||
        (r.description ?? '').toLowerCase().includes(kw);
      return matchCategory && matchQuery;
    });
  }, [resources, query, category]);

  const grouped = useMemo(() => {
    const map: Record<string, Resource[]> = {};
    for (const r of filtered) {
      const key = r.category ?? '未分类';
      if (!map[key]) map[key] = [];
      map[key].push(r);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索资源标题或描述"
          className="w-full rounded-full border border-black/10 bg-paper px-4 py-2 text-sm text-ink outline-none sm:max-w-xs"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border border-black/10 bg-paper px-4 py-2 text-sm text-ink outline-none"
        >
          <option value="">全部分类</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink/40">没有找到匹配的资源。</p>
      ) : (
        <div className="space-y-12">
          {Object.keys(grouped)
            .sort((a, b) => a.localeCompare(b, 'zh-CN'))
            .map((key) => (
              <section key={key}>
                <h2 className="mb-5 text-2xl font-semibold text-accent">{key}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[key].map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl border border-black/5 bg-paper p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                    >
                      <span className="rounded-full bg-accentSoft/30 px-2.5 py-1 text-xs text-accent">
                        {r.category ?? '未分类'}
                      </span>
                      <h3 className="mt-3 font-semibold text-ink transition-colors group-hover:text-accent">
                        {r.title}
                      </h3>
                      {r.description && (
                        <p className="mt-2 text-sm text-ink/55">{r.description}</p>
                      )}
                      <span className="mt-3 inline-block text-sm text-accent/70">访问 ↗</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}
