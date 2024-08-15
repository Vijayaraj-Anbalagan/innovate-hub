import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innothon 24",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
