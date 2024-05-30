import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './complonents/header'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test App",
  description: "Testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header/>
          <main className='container mx-auto'>
            <div className="flex items start justify-center min-h-screen">
              <div className="mt-15">
                {children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
