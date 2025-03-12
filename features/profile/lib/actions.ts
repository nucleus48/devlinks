"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { verifySession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { ProfileFormData, ProfileFormSchema } from "./schema";

export async function updateUserProfile(
  formData: Partial<Omit<ProfileFormData, "image">>
) {
  const { userId } = await verifySession();

  try {
    const data = await ProfileFormSchema.partial().parseAsync(formData);
    await db.update(usersTable).set(data).where(eq(usersTable.id, userId));
    return { success: "Updated profile successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
