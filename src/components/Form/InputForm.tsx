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

interface Props {
  // onSubmit: (values: z.infer<typeof formSchema>) => void;
  passDecimal128: (decimal128: string) => void;
  passHex: (hex: string) => void;
}

export function ProfileForm({ passDecimal128, passHex }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // decimal: "1",
      // exponent: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { decimal, exponent, method } = values;

    let decimalString = decimal;

    let decimalDigits = decimalString.length;
    if (decimal.includes(".")) decimalDigits -= 1;
    if (decimal.includes("-")) decimalDigits -= 1;

    let exponentDecimal = parseInt(exponent);
    let pointIndex = decimalString.indexOf(".");
    if (pointIndex === -1) pointIndex = decimalString.length;

    // remove trailing 0s
    let j = decimalString.length - 1;
    while (decimalString.charAt(j) === "0" || decimalString.charAt(j) === ".") {
      if (j < pointIndex) {
        // if 0 is part of the whole number, move decimal point to the left
        exponentDecimal += 1;
        pointIndex -= 1;
      }
      decimalString = decimalString.substring(0, j);
      j--;
      decimalDigits -= 1;
    }

    // remove leading 0s
    let i = 0;
    let negative = decimalString.startsWith("-");
    if (negative) decimalString = decimalString.substring(1);
    while (i < decimalString.length) {
      if (decimalString.charAt(i) === "0") {
        decimalString = decimalString.substring(1);
        decimalDigits -= 1;
      } else {
        break;
      }
    }
    if (negative) decimalString = "-" + decimalString;
    if (decimalDigits <= 34) {
      // pad with 0s
      let pad = 34 - decimalDigits;
      if (decimalString.includes(".")) pad += 1;
      decimalString = decimalString.padStart(decimalDigits + pad, "0");

      // if decimal is negative, move sign to the front
      if (negative) {
        decimalString = decimalString.replace("-", "0");
        decimalString = "-" + decimalString;
      }
    }
    // move decimal point to end of last digit
    if (negative) {
      decimalString = decimalString.replace("-", "");
    }
    pointIndex = decimalString.indexOf(".");
    if (pointIndex === -1) pointIndex = decimalDigits;
    let shift = 0;
    // console.log("pointIndex", pointIndex);
    // console.log("decimalDigits", decimalDigits);

    // if pointIndex is greater than 33, shift point to the left
    if (pointIndex !== decimalDigits || pointIndex > 34) {
      shift = 34 - pointIndex;
      exponentDecimal -= shift;
    }
    if (negative) decimalString = "-" + decimalString;
    decimalString = decimalString.replace(".", "");

    // console.log(decimalDigits);
    // console.log(values);
    console.log("shift", shift);

    console.log("exponentDecimal", exponentDecimal);
    // perform rounding if needed
    if (decimalDigits > 34) {
      let round = 0;
      let roundIndex = 34;
      const negative = decimalString.startsWith("-");
      if (negative) roundIndex = 35;
      // console.log("to evaluate ", decimalString.charAt(roundIndex));

      if (!negative) {
        if (method === "truncation") {
          round = 0;
        } else if (method === "ceiling") {
          round = 1;
        } else if (method === "floor") {
          round = -1;
        } else if (method === "RTN-TE") {
          round = 0;
          if (parseInt(decimalString.charAt(roundIndex)) > 5) {
            round = 1;
          } else if (parseInt(decimalString.charAt(roundIndex)) < 5) {
            round = -1;
          } else {
            if (parseInt(decimalString.charAt(roundIndex - 1)) % 2 !== 0) {
              let i = roundIndex;
              while (i < decimalString.length) {
                if (parseInt(decimalString.substring(i)) > 0) {
                  round = 1;
                  break;
                }
                i++;
              }
            }
          }
        }
      } else {
        // if negative number
        roundIndex = 35;
        if (method === "truncation") {
          round = 0;
        } else if (method === "ceiling") {
          round = -1;
        } else if (method === "floor") {
          round = 1;
        } else if (method === "RTN-TE") {
          round = 0;
          if (parseInt(decimalString.charAt(roundIndex)) > 5) {
            round = 1;
          } else if (parseInt(decimalString.charAt(roundIndex)) < 5) {
            round = -1;
          } else {
            if (parseInt(decimalString.charAt(roundIndex - 1)) % 2 !== 0) {
              let i = roundIndex;

              while (i < decimalString.length) {
                if (parseInt(decimalString.charAt(i)) > 0) {
                  round = 1;
                  break;
                }
                i++;
              }
            }
          }
        }
      }
      if (round === 1) {
        let carry = 1;
        let i = roundIndex - 1;
        while (i >= 0 && carry === 1) {
          let digit = parseInt(decimalString.charAt(i));
          digit += carry;
          if (digit === 10) {
            digit = 0;
            carry = 1;
          } else {
            carry = 0;
          }
          decimalString =
            decimalString.substring(0, i) +
            digit +
            decimalString.substring(i + 1);
          i--;
        }
        if (carry === 1) {
          decimalString = "1" + decimalString;
          exponentDecimal += 1;
        }
      }
      if (!negative) decimalString = decimalString.substring(0, 34);
      else decimalString = decimalString.substring(0, 35);
    }
    console.log("rounded decimalString", decimalString);
    // console.log("decimalString", decimalString);
    let decimalto128 = convertToDecimal128(decimalString, exponentDecimal);
    passDecimal128(decimalto128);
    console.log(decimalto128);
    passHex(binaryToHex(decimalto128.replaceAll(" ", "")));
    console.log(binaryToHex(decimalto128.replaceAll(" ", "")));
  }

  function convertToDecimal128(decimal: String, exponent: number) {
    const sign = decimal.startsWith("-") ? 1 : 0;
    let CombiField;
    let ExpConti;
    let coeffConti = "";

    // Remove the negative sign if present
    if (decimal.startsWith("-")) {
      decimal = decimal.substring(1);
    }
    // console.log("hello");
    const MSD = decimal.charAt(0); //get msd

    let convertMSDToBinary = padZeros(decimalToBinary(parseInt(MSD)), 4); //convert msd to binary and pad 0's to it

    let E_PrimeBinary = padZeros(decimalToBinary(exponent + 6176), 14); //convert eprime to binary and pad 0's until it 14 bits

    if (exponent > 6111) {
      // infinity
      CombiField = "1" + "1" + "1" + "1" + "0";
    } else if (exponent <= 6111 && exponent >= -6176) {
      // finite
      const checkMSD = parseInt(MSD);
      if (checkMSD >= 0 && checkMSD <= 7) {
        CombiField =
          E_PrimeBinary.charAt(0) +
          E_PrimeBinary.charAt(1) +
          convertMSDToBinary.charAt(1) +
          convertMSDToBinary.charAt(2) +
          convertMSDToBinary.charAt(3);
      } else if (checkMSD >= 8 && checkMSD <= 9) {
        CombiField =
          "1" +
          "1" +
          E_PrimeBinary.charAt(0) +
          E_PrimeBinary.charAt(1) +
          convertMSDToBinary.charAt(3);
      } else {
        console.log("something went wrong");
      }
    } else {
      // NaN
      CombiField = "1" + "1" + "1" + "1" + "1";
    }

    //get exponential continuaton field
    ExpConti = E_PrimeBinary.slice(2, 14);

    for (let i = 1; i < decimal.length; i += 3) {
      coeffConti = coeffConti + decimalToPackBCD(decimal.slice(i, i + 3));
    }

    return sign + " " + CombiField + " " + ExpConti + " " + coeffConti;
  }

  //dont ask
  function decimalToPackBCD(decimal: string) {
    let toBinary =
      padZeros(decimalToBinary(parseInt(decimal.charAt(0))), 4) +
      padZeros(decimalToBinary(parseInt(decimal.charAt(1))), 4) +
      padZeros(decimalToBinary(parseInt(decimal.charAt(2))), 4);
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

    if (a === "0" && e === "0" && i === "0")
      return b + c + d + f + g + h + "0" + j + k + m;
    if (a === "0" && e === "0" && i === "1")
      return b + c + d + f + g + h + "1" + "0" + "0" + m;
    if (a === "0" && e === "1" && i === "0")
      return b + c + d + j + k + h + "1" + "0" + "1" + m;
    if (a === "0" && e === "1" && i === "1")
      return b + c + d + "1" + "0" + h + "1" + "1" + "1" + m;
    if (a === "1" && e === "0" && i === "0")
      return j + k + d + f + g + h + "1" + "1" + "0" + m;
    if (a === "1" && e === "0" && i === "1")
      return f + g + d + "0" + "1" + h + "1" + "1" + "1" + m;
    if (a === "1" && e === "1" && i === "0")
      return j + k + d + "0" + "0" + h + "1" + "1" + "1" + m;
    if (a === "1" && e === "1" && i === "1")
      return "0" + "0" + d + "1" + "1" + h + "1" + "1" + "1" + m;
    return "";
  }

  function decimalToBinary(decimal: number): string {
    return (decimal >>> 0).toString(2);
  }

  function binaryToHex(binaryString: string) {
    // add a space every 4 digits
    let binaryStringWithSpaces = "";
    for (let i = 0; i < binaryString.length; i += 4) {
      binaryStringWithSpaces += binaryString.substring(i, i + 4) + " ";
    }

    let hexString = "";

    for (let i = 0; i < binaryStringWithSpaces.length; i += 5) {
      let group = binaryStringWithSpaces.substring(i, i + 4);
      let hexDigit = parseInt(group, 2).toString(16);
      hexString += hexDigit;
    }
    return hexString.toUpperCase();
  }

  function padZeros(binaryStr: string, length: number): string {
    while (binaryStr.length < length) {
      binaryStr = "0" + binaryStr;
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
