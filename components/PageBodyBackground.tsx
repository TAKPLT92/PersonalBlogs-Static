'use client';

import { asset } from '@/lib/asset';

export default function PageBodyBackground({
  imageUrl,
}: {
  imageUrl?: string | null;
}) {
  if (!imageUrl) return null;

  const url = asset(imageUrl);

  return (
    <style>{`
      body {
        background-image: url("${url}");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      }
    `}</style>
  );
}
