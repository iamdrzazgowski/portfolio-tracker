import type { Metadata } from 'next';
import { DM_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const dmMono = DM_Mono({
    weight: ['300', '400', '500'],
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Portfolio Tracker',
    description: 'Track and manage your investments in one place.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='en'
            className={cn(
                dmMono.variable,
                fraunces.variable,
                'font-sans dark',
            )}>
            <body className='antialiased'>{children}</body>
        </html>
    );
}
