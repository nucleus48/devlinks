import { z } from "zod";

export const LinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
});

export const LinksFormSchema = z.object({
  links: z.array(LinkSchema),
});

export type LinksFormData = z.infer<typeof LinksFormSchema>;