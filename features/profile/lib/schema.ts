import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1, "Can't be empty"),
  lastName: z.string().min(1, "Can't be empty"),
  previewEmail: z.string().email().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  image: z
    .custom<FileList | undefined>(
      (file) => file instanceof FileList || file === undefined
    )
    .refine(
      (file) => !file || file.length === 0 || file[0].size <= 4 * 1024 * 1024,
      { message: "File must be less than 4MB" }
    )
    .refine(
      (file) =>
        !file ||
        file.length === 0 ||
        ["image/png", "image/jpeg", "image/jpg"].includes(file[0].type),
      { message: "Only PNG and JPG formats are allowed" }
    ),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
