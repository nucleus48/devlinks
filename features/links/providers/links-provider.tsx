"use client";

import React, { createContext, use } from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  useWatch,
} from "react-hook-form";
import { LinksFormData, LinksFormSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Platforms } from "../constants/platforms";

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

  const watchedLinks = useWatch({ control: form.control, name: "links" });

  const { fields, ...fieldArray } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const watchedFields = watchedLinks.map((link, index) => ({
    ...fields[index],
    ...link,
  }));

  return (
    <LinksContext value={{ ...fieldArray, fields: watchedFields }}>
      <Form {...form}>{children}</Form>
    </LinksContext>
  );
}

export function useLinks() {
  return use(LinksContext)!;
}

export function useUnusedPlatforms(excludePlatform?: string) {
  const { fields: links } = useLinks();
  const usedPlatforms = links.map((link) => link.platform);

  return Platforms.filter(
    ({ platform }) =>
      platform === excludePlatform || !usedPlatforms.includes(platform)
  );
}
