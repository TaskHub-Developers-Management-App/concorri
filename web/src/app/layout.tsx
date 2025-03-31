import { HeroUIProvider } from '@heroui/system';
import './globals.css';
import { ToastProvider } from "@heroui/toast";

import favicon from "@/assets/short-logo.svg";

export const metadata = {
  title: 'Concorri',
  description: 'Sistema de sorteios sem complicação',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} />
      </head>
      <body className='bg-slate-50 h-dvh'>
        <HeroUIProvider>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}