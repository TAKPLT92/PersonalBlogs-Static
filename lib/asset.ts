const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(src: string): string {
  if (!src) return src;
  if (src.startsWith('/') && !src.startsWith(basePath)) {
    return `${basePath}${src}`;
  }
  return src;
}
