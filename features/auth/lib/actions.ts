"use server";

import {
  LogInFormData,
  LogInFormSchema,
  SignUpFormData,
  SignUpFormSchema,
} from "./schema";

export async function signup(formData: SignUpFormData) {
  const data = await SignUpFormSchema.parseAsync(formData);
}

export async function login(fromData: LogInFormData) {
  const data = await LogInFormSchema.parseAsync(fromData);
}
