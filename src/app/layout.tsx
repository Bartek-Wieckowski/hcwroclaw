import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GameCalendar from '@/components/GameCalendar/GameCalendar';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Providers from '@/lib/queryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hockey Club Wrocław',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Providers>
          <GameCalendar />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
