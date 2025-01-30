export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

interface WebApp {
  ready(): void;
  close(): void;
  BackButton: {
    show(): void;
    hide(): void;
    onClick(cb: () => void): void;
  };
  initDataUnsafe?: {
    user?: TelegramUser;
  };
}

interface TelegramWebApp {
  WebApp: WebApp;
}

declare global {
  interface Window {
    Telegram?: TelegramWebApp;
  }
}

export {};
