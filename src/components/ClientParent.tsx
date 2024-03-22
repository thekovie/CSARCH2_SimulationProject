"use client"
import React, { useEffect } from "react";
import InputForm from "@/components/Form/InputForm";
import { Button } from "@/components/ui/button";

const ClientParent = () => {
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
  
    function downloadTextFile() {
      const text = `Answer:\n${sign} ${combi} ${exponent} ${continuation} \n\n0x${hex}\n\nSign: ${sign}\nCombi: ${combi}\nExponent: ${exponent}\nContinuation: ${continuation}\nHex: 0x${hex}`;
      const element = document.createElement("a");
      const file = new Blob([text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "floating_point.txt";
      document.body.appendChild(element);
      element.click();
    }

  return (
    <>
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
                <div className="flex flex-row">
                <p className="text-xl">0</p>
                <p className="text-xl">x</p>
                <p className="text-xl break-all">{hex}</p>
                </div>
              </div>
            </div>
            <Button className="mt-8" onClick={downloadTextFile}>
              Download as text file
            </Button>
          </div>
         }
    </>
    )
}

export default ClientParent;