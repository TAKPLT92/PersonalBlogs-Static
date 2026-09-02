import { Suspense } from 'react';
import HomeView from '@/components/HomeView';
import { getPosts, getSettings, getSiteTitle } from '@/lib/content';

export default function HomePage() {
  const posts = getPosts();
  const siteTitle = getSiteTitle();
  const settings = getSettings();

  return (
    <Suspense fallback={null}>
      <HomeView
        posts={posts}
        siteTitle={siteTitle}
        backgroundHome={settings.background_home}
      />
    </Suspense>
  );
}
