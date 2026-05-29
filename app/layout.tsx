import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Warehouse Inventory Orchestrator',
  description: 'Inventory operations dashboard for GlobalLogistics Corp.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
