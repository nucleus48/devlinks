import { z } from "zod";

export const ProfileFormSchema = z.object({
  imageUrl: z.string().url().optional(),
  firstName: z.string().min(1, "Can't be empty"),
  lastName: z.string().min(1, "Can't be empty"),
  email: z.string().email().optional(),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
