import type { Metadata } from 'next';
import { Archivo, Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
const display = Archivo({ subsets: ['latin'], weight: ['600','700','800'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const sport = Barlow_Condensed({ subsets: ['latin'], weight: ['600','700'], variable: '--font-sport' });
export const metadata: Metadata = {title:'SportProof',description:'Private, verifiable aggregate evidence for sporting-event sponsorship decisions on Base Sepolia.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" className={`${display.variable} ${body.variable} ${sport.variable}`}><body>{children}</body></html>}
