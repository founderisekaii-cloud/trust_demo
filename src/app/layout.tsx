import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { Toaster } from '@/components/ui/toaster';
import { BackButton } from '@/components/app/back-button';

export const metadata: Metadata = {
  title: 'Vikhyat Foundation | Empowering Communities, Driving Social Change',
  description: 'A political and social trust dedicated to building a more just, equitable, and prosperous society.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <BackButton />
      </body>
    </html>
  );
}
