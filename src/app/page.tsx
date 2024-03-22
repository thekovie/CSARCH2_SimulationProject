"use client"
import ClientParent from "@/components/ClientParent";
import { Metadata } from "next";


export default function Home() {
  
  return (
    <main className="flex flex-col min-h-screen p-8 sm:p-24 items-center">
      <h1 className="font-bold text-2xl">
        Decimal-128 Floating Point Converter
      </h1>
      <p className="text-gray-500 mt-2">
        Convert a decimal number to a 128-bit floating point number.
      </p>
      <ClientParent></ClientParent>
    </main>
  );
}
