"use server";

import { db } from "@/lib/db";
import {
  LogInFormData,
  LogInFormSchema,
  SignUpFormData,
  SignUpFormSchema,
} from "./schema";
import bcrypt from "bcrypt";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signup(formData: SignUpFormData) {
  const { email, password } = await SignUpFormSchema.parseAsync(formData);

  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (existingUser) return { error: "Email address already in use" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const [{ userId }] = await db
    .insert(usersTable)
    .values({
      email,
      password: hashedPassword,
    })
    .returning({ userId: usersTable.id });

  await createSession({ userId, email });
  redirect("/");
}

export async function login(fromData: LogInFormData) {
  const { email, password } = await LogInFormSchema.parseAsync(fromData);

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  const isValidPassword = await bcrypt.compare(password, user?.password || "");

  if (!user || !isValidPassword) return { error: "Invalid credentials" };

  await createSession({ userId: user.id, email });
  redirect("/");
}
