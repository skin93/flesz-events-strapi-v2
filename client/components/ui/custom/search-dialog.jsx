"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "nextjs-toploader/app";

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
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SearchDialog() {
  const router = useRouter();

  const FormSchema = z.object({
    term: z.string().min(2, {
      message: "Szukana fraza ma mniej niż 2 znaki",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      term: "",
    },
  });

  function onSubmit(data) {
    router.push(`/search?q=${data.term}`);
    form.reset();
    setOpen(false);
  }

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Szukaj frazy</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] border-none overflow-y-hidden">
        <DialogTitle className="my-0">Szukaj frazy</DialogTitle>
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
