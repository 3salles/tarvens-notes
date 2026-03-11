import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Lora, Playfair_Display } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Taverns & Notes',
  description:
    'Um espaço para registrar sessões de RPG, organizar anotações e acompanhar a evolução da sua campanha.',
};

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
});

const lora = Lora({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${playfair.variable} ${lora.variable} antialiased bg-ink
      text-white flex h-screen`}
      >
        <NuqsAdapter>
          {children}
          <Toaster position="top-right" />
        </NuqsAdapter>
      </body>
    </html>
  );
}
