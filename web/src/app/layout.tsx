import { HeroUIProvider } from '@heroui/system';
import './globals.css';

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
      <body>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}