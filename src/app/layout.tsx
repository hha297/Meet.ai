import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { TRPCReactProvider } from '@/trpc/client';
import { Toaster } from 'sonner';

const spaceGrotesk = Space_Grotesk({
        subsets: ['latin'],
        weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
        title: 'Meet.ai',
        description: 'Meet.ai - Your AI Meeting Assistant',
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <TRPCReactProvider>
                        <html lang="en">
                                <body className={`${spaceGrotesk.className} antialiased`}>
                                        <Toaster />
                                        {children}
                                </body>
                        </html>
                </TRPCReactProvider>
        );
}
