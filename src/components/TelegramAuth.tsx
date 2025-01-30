'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { saveUser } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function TelegramAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isTelegramClient, setIsTelegramClient] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded) return;

    const telegram = window.Telegram;
    const isTelegram = Boolean(telegram?.WebApp);
    setIsTelegramClient(isTelegram);
    
    if (isTelegram && telegram?.WebApp) {
      if (!sessionStorage.getItem('telegramUser')) {
        const userData = telegram.WebApp.initDataUnsafe?.user;
        if (userData) {
          sessionStorage.setItem('telegramUser', JSON.stringify(userData));
          saveUser(userData);
          router.push('/menu');
        }
      } else {
        router.push('/menu');
      }
      telegram.WebApp.ready();
    }
    
    setIsLoading(false);
  }, [scriptLoaded, router]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onError={(e) => {
          console.error('Failed to load Telegram WebApp script:', e);
          setScriptLoaded(true);
          setIsLoading(false);
        }}
      />
      
      {isLoading ? (
        <div className="animate-pulse">Loading Telegram WebApp...</div>
      ) : !isTelegramClient ? (
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p>Please open this page in Telegram</p>
        </div>
      ) : (
        <div className="text-center p-4">
          <p>Authenticating...</p>
        </div>
      )}
    </>
  );
} 