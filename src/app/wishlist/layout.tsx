import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateSEO } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('SEO.wishlist');
  
  return generateSEO({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
  });
}

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}