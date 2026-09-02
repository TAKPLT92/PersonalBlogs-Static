'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EntryGate() {
  const router = useRouter();

  useEffect(() => {
    // 每次进入网站都先显示“关于/欢迎”页
    router.replace('/about');
  }, [router]);

  return null;
}
