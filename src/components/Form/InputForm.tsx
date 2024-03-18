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
