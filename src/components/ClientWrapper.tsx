'use client';

import dynamic from 'next/dynamic';

const TelegramAuth = dynamic(
  () => import('@/components/TelegramAuth'),
  { ssr: false }
);

export default function ClientWrapper() {
  return <TelegramAuth />;
} 