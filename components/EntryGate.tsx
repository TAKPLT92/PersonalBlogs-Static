'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EntryGate() {
  const router = useRouter();

  useEffect(() => {
    let entered = false;
    try {
      entered = sessionStorage.getItem('blog_entered') === '1';
    } catch {
      entered = false;
    }
    router.replace(entered ? '/home' : '/about');
  }, [router]);

  return null;
}
