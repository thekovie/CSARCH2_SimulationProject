"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  decimal: z
    .string()
    .min(0, {
      message: "Must be greater than 0.",
    })
    .regex(/^-?\d+(\.\d+)?$/, {
      message: "Must be a number.",
    }),
  exponent: z
    .string()
    .min(0, {
      message: "Must be greater than 0.",
    })
    .regex(/^-?\d+$/, {
      message: "Must be a number.",
    }),
  method: z.enum(["truncation", "ceiling", "floor", "RTN-TE"]),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // decimal: "1",
      // exponent: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: do something with the form values
    const { decimal, exponent, method } = values;

    // get rid of leading zeros
    let decimalNum = parseFloat(decimal);
    let decimalString = decimalNum.toString();

    let decimalDigits = decimalString.length;
    if (decimal.includes(".")) decimalDigits -= 1;
    if (decimal.includes("-")) decimalDigits -= 1;

    const exponentDecimal = parseInt(exponent);
    if (decimalDigits > 34) {
      // move decimal point to 34th digit
      let pointIndex = decimalString.indexOf(".");
      if (pointIndex === -1) pointIndex = decimalDigits;
      // shift decimal point to the right if pointIndex < 34
      // shift decimal point to the left if pointIndex > 34

      // TODO: rounding based on option
    }
    if (exponentDecimal > 6177) {
      console.log("Error: Exponent is too large.");
      return;
    }
    if (exponentDecimal < -6176) {
      console.log("Error: Exponent is too small.");
      return;
    }
    console.log(decimalDigits);
    console.log(values);
    
    console.log(convertToDecimal128(decimal, parseInt(exponent)));
  }

  function convertToDecimal128( decimal: String, exponent: number){
    const sign = decimal.startsWith('-') ? 1 : 0;
    let CombiField;
    let ExpConti;
    let coeffConti ="";
    
    // Remove the negative sign if present
    if (decimal.startsWith('-')) {
        decimal = decimal.substring(1);
    }
    console.log('hello');
    const MSD = decimal.charAt(0); //get msd

    let convertMSDToBinary = padZeros(decimalToBinary(parseInt(MSD)), 4); //convert msd to binary and pad 0's to it
    
    let E_PrimeBinary = padZeros(decimalToBinary(exponent + 6176), 14); //convert eprime to binary and pad 0's until it 14 bits


    //get the combifield
    const checkMSD = parseInt(MSD);
    if(checkMSD >= 0 && checkMSD <= 7){
      CombiField = E_PrimeBinary.charAt(0) + E_PrimeBinary.charAt(1) + convertMSDToBinary.charAt(1) + convertMSDToBinary.charAt(2) + convertMSDToBinary.charAt(3)
    }else if(checkMSD >= 8 && checkMSD <= 9){
      CombiField = "1" + "1" + E_PrimeBinary.charAt(0) + E_PrimeBinary.charAt(1) + convertMSDToBinary.charAt(3)
    }else{
      console.log("something went wrong")
    }

    //get exponential continuaton field
    ExpConti = E_PrimeBinary.slice(2, 14);


    for (let i = 1; i < decimal.length; i += 3) {
      coeffConti = coeffConti + decimalToPackBCD(decimal.slice(i, i + 3))
    }
    

    return sign  + " | " + CombiField + " | " + ExpConti + " | " + coeffConti;
  }



  //dont ask
  function decimalToPackBCD(decimal: string){
    let toBinary = padZeros(decimalToBinary(parseInt(decimal.charAt(0))), 4) + padZeros(decimalToBinary(parseInt(decimal.charAt(1))), 4) + padZeros(decimalToBinary(parseInt(decimal.charAt(2))), 4)
    let a = toBinary.charAt(0);
    let b = toBinary.charAt(1);
    let c = toBinary.charAt(2);
    let d = toBinary.charAt(3);

    let e = toBinary.charAt(4);
    let f = toBinary.charAt(5);
    let g = toBinary.charAt(6);
    let h = toBinary.charAt(7);

    let i = toBinary.charAt(8);
    let j = toBinary.charAt(9);
    let k = toBinary.charAt(10);
    let m = toBinary.charAt(11);


    if(a === "0" && e === "0" && i === "0") 
      return b + c + d + f + g + h + "0" + j + k + m;
    if(a=== "0" && e === "0" && i === "1") 
      return b + c + d + f + g + h + "1" + "0" + "0" + m;
    if(a === "0" && e === "1" && i=== "0") 
      return b + c + d + j + k + h + "1" + "0" + "1" + m;
    if(a === "0" && e === "1" && i === "1") 
      return b + c + d + "1" + "0" + h + "1" + "1" + "1" + m;
    if(a === "1" && e === "0" && i === "0") 
      return j + k + d + f + g + h + "1" + "1" + "0" + m;
    if(a === "1" && e === "0" && i === "1") 
      return f + g + d + "0" + "1" + h + "1" + "1" + "1" + m;
    if(a === "1" && e === "1" && i === "0") 
      return j + k + d + "0" + "0" + h + "1" + "1" + "1" + m;
    if(a === "1" && e === "1" && i === "1") 
      return "0" + "0" + d + "1" + "1" + h + "1" + "1" + "1" + m;
    return ""
  }


  function decimalToBinary(decimal: number): string {
    return (decimal >>> 0).toString(2);
  }

function padZeros(binaryStr: string, length: number): string {
    while (binaryStr.length < length) {
        binaryStr = '0' + binaryStr;
    }
    return binaryStr;
  }



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 mt-10 w-full sm:w-4/5"
      >
        <FormField
          control={form.control}
          name="decimal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decimal</FormLabel>
              <FormControl>
                <Input placeholder="Enter decimal" {...field} />
              </FormControl>
              <FormDescription>Enter a decimal to convert.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exponent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exponent</FormLabel>
              <FormControl>
                <Input placeholder="Enter exponent" {...field} />
              </FormControl>
              <FormDescription>Enter an exponent.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rounding Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rounding method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="truncation">Truncation</SelectItem>
                  <SelectItem value="ceiling">Ceiling</SelectItem>
                  <SelectItem value="floor">Floor</SelectItem>
                  <SelectItem value="RTN-TE">
                    Round to Nearest Ties to Even
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select a rounding method.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Solve</Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
