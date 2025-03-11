import { z } from "zod";
import { Platforms } from "../constants/platforms";

export const LinkSchema = z
  .object({
    platform: z.string(),
    url: z.string().min(1, "Can't be empty").url("Please check the URL"),
  })
  .refine(
    (data) =>
      Platforms.find(({ platform }) => platform === data.platform)?.regex.test(
        data.url
      ),
    {
      message: "Please check the URL",
      path: ["url"],
    }
  );

export const LinksFormSchema = z.object({
  links: z.array(LinkSchema),
});

export type LinksFormData = z.infer<typeof LinksFormSchema>;
