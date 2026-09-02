'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default function MarkdownContent({ content }: { content: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: (props: any) => {
              const { href, children, ...rest } = props;
              const isExternal = !!href && /^https?:\/\//.test(href);
              return (
                <a
                  href={href}
                  {...rest}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {children}
                </a>
              );
            },
            img: (props: any) => {
              const { src, alt } = props;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src ?? ''}
                  alt={alt ?? ''}
                  loading="lazy"
                  className="my-4 cursor-zoom-in rounded-xl"
                  onClick={() => setLightbox(src ?? null)}
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {lightbox && (
        <button
          type="button"
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-6"
          onClick={() => setLightbox(null)}
          aria-label="关闭图片预览"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="图片预览"
            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          />
        </button>
      )}
    </>
  );
}
