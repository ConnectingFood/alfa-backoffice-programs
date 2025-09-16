import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPA - Programa Contra o Desperdício',
  description: 'Sistema de gestão do programa contra o desperdício de alimentos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Sans&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}