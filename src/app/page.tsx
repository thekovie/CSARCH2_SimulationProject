"use client"
import React, { useEffect } from "react";
import InputForm from "@/components/Form/InputForm";
import { Metadata } from "next";

export default function Home() {
  const [decimal128, setDecimal128] = React.useState<string>("");
  function passDecimal128(decimal128: string) {
    setDecimal128(decimal128);
  }
  const [hex, setHex] = React.useState<string>("");
  function passHex(hex: string) {
    setHex(hex);
  }

  const [sign, setSign] = React.useState<string>("");
  const [combi, setCombi] = React.useState<string>("");
  const [exponent, setExponent] = React.useState<string>("");
  const [continuation, setContinuation] = React.useState<string>("");
  
  useEffect(() => {
    const split128 = decimal128.split(" ");
    setSign(split128[0]);
    setCombi(split128[1]);
    setExponent(split128[2]);
    setContinuation(split128[3]);
  }, [decimal128]);
  

  return (
    <main className="flex flex-col min-h-screen p-8 sm:p-24 items-center">
      <h1 className="font-bold text-2xl">
        Decimal-128 Floating Point Converter
      </h1>
      <p className="text-gray-500 mt-2">
        Convert a decimal number to a 128-bit floating point number.
      </p>

      <InputForm passDecimal128={passDecimal128} passHex={passHex}/>
      { decimal128 && 
        <div className="answer flex flex-col flex-wrap items-center mt-8">
          <h2 className="font-bold text-2xl">Answer</h2>
          <div className="flex flex-col sm:flex-row mt-4 gap-2 sm:gap-8">
            <div className="flex flex-col mt-4">
              <p className="text-gray-500">Sign</p>
              <p className="text-xl">{sign}</p>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-gray-500">Combi</p>
              <p className="text-xl">{combi}</p>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-gray-500">Exponent</p>
              <p className="text-xl">{exponent}</p>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-gray-500">Continuation</p>
              <p className="text-xl break-characters">{continuation}</p>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-gray-500">Hex</p>
              <p className="text-xl break-all">{hex}</p>
            </div>
          </div>
        </div>
       }
    </main>
  );
}
