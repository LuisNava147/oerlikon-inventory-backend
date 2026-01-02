import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { HeroUIProvider } from "@heroui/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oerlikon Inventory System',
  description: 'pagina web de inventario de equipos IT de Oerlikon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <HeroUIProvider>
        <Providers>
        {children}
        </Providers>
        </HeroUIProvider>
       </body>
    </html>
  )
}
