"use server";

import { SignUpFormData, SignUpFormSchema } from "./schema";

export async function signup(formData: SignUpFormData) {
  const data = await SignUpFormSchema.parseAsync(formData);
}
