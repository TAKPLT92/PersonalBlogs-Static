import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Resource {
  id: number;
  title: string;
  url: string;
  description: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  category: string | null;
  tags: string[];
  excerpt: string | null;
  cover_image: string | null;
}

export interface Post extends PostMeta {
  content: string;
}

export interface SiteSettings {
  site_title?: string | null;
  [key: string]: string | null | undefined;
}

function readJson<T>(file: string, fallback: T): T {
  const full = path.join(contentDir, file);
  if (!fs.existsSync(full)) return fallback;
  return JSON.parse(fs.readFileSync(full, 'utf8')) as T;
}

export function getPosts(): PostMeta[] {
  return readJson<PostMeta[]>('posts.json', []);
}

export function getCategories(): Category[] {
  return readJson<Category[]>('categories.json', []);
}

export function getTags(): Tag[] {
  return readJson<Tag[]>('tags.json', []);
}

export function getResources(): Resource[] {
  return readJson<Resource[]>('resources.json', []);
}

export function getSettings(): SiteSettings {
  return readJson<SiteSettings>('settings.json', {});
}

export function getSiteTitle(): string {
  return getSettings().site_title || '个人博客';
}

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; content: string } {
  const lines = raw.split('\n');
  if (lines[0]?.trim() !== '---') {
    return { meta: {}, content: raw };
  }

  const meta: Record<string, unknown> = {};
  let i = 1;
  let currentKey = '';
  const tagList: string[] = [];

  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') {
      i++;
      break;
    }
    const tagMatch = line.match(/^\s*-\s+(.*)$/);
    if (tagMatch && currentKey === 'tags') {
      tagList.push(cleanValue(tagMatch[1]));
      continue;
    }
    const match = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (match) {
      currentKey = match[1];
      meta[currentKey] = cleanValue(match[2]);
    }
  }

  if (tagList.length > 0) meta.tags = tagList;

  return {
    meta,
    content: lines.slice(i).join('\n').trim(),
  };
}

function cleanValue(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

export function getPostBySlug(slug: string): Post | null {
  const safeSlug = slug.replace(/[\\/:*?"<>|]/g, '-');
  const file = path.join(contentDir, 'posts', `${safeSlug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf8');
  const { meta, content } = parseFrontmatter(raw);

  const metaObj = meta as unknown as PostMeta;
  const tags = Array.isArray(meta.tags) ? (meta.tags as string[]) : [];

  return {
    title: metaObj.title || slug,
    slug,
    date: metaObj.date || '',
    category: (metaObj.category as string | null) || null,
    tags,
    excerpt: (metaObj.excerpt as string | null) || null,
    cover_image: (metaObj.cover_image as string | null) || null,
    content,
  };
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  const category = getCategories().find((c) => c.slug === categorySlug);
  if (!category) return [];
  return getPosts().filter((post) => post.category === category.name);
}

export function getPostsByTag(tagSlug: string): PostMeta[] {
  const tag = getTags().find((t) => t.slug === tagSlug);
  if (!tag) return [];
  return getPosts().filter((post) => post.tags.includes(tag.name));
}
