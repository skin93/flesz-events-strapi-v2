"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

export default function SearchDialog() {
  const router = useRouter();

  const FormSchema = z.object({
    term: z.string().min(2, {
      message: "Szukana fraza ma mniej niż 2 znaki",
    }),
  });

  const form =
    useForm <
    z.infer <
    typeof FormSchema >>
      {
        resolver: zodResolver(FormSchema),
        defaultValues: {
          term: "",
        },
      };

  function onSubmit(data) {
    router.push(`/szukaj?q=${data.term}&strona=1`);
    form.reset();
    setOpen(false);
  }

  const [open, setOpen] = useState < boolean > false;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Szukaj frazy</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="shrink">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-[100px] w- xl:h-[200px] text-4xl xl:text-6xl border-0 focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Szukaj frazy..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
