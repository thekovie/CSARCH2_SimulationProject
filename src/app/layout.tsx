
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decimal-128 Floating Point Converter",
  description: "Convert a decimal number to a 128-bit floating point number.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <div className="flex flex-col sm:flex-row justify-between bg-gray-600 text-white p-8">
        <div className="footer flex flex-col">
          <span className="font-semibold">Created by CSARCH2 S11 Group 4</span>
          <span className="text-sm mt-2">Go, Javellana, Martinez, Niño</span>
        </div>
        <Link href="https://github.com/thekovie/CSARCH2_SimulationProject" target="_blank" className="text-sm mt-4 hover:underline items-end">GitHub Repository</Link>
      </div>
    </html>
  );
}
