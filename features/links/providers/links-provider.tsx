"use client";

import React, { createContext, use } from "react";
import { useFieldArray, UseFieldArrayReturn, useForm } from "react-hook-form";
import { LinksFormData, LinksFormSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

export type LinksProviderProps = React.PropsWithChildren<{
  links: LinksFormData["links"];
}>;

export const LinksContext = createContext<UseFieldArrayReturn<
  LinksFormData,
  "links",
  "id"
> | null>(null);

export default function LinksProvider({ children, links }: LinksProviderProps) {
  const form = useForm<LinksFormData>({
    resolver: zodResolver(LinksFormSchema),
    defaultValues: { links },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "links",
  });

  return (
    <LinksContext value={fieldArray}>
      <Form {...form}>{children}</Form>
    </LinksContext>
  );
}

export function useLinks() {
  return use(LinksContext)!;
}
