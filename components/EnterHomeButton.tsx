'use client';

import { useRouter } from 'next/navigation';

export default function EnterHomeButton() {
  const router = useRouter();

  const handleClick = () => {
    try {
      sessionStorage.setItem('blog_entered', '1');
    } catch {
      // ignore
    }
    router.push('/home');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm text-white transition hover:bg-accent/90"
    >
      确认并进入主页
    </button>
  );
}
