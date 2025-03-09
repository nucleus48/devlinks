import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const LogInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LogInFormData = z.infer<typeof LogInFormSchema>;
