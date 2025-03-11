"use server";

import { verifySession } from "@/lib/session";
import { LinksFormData, LinksFormSchema } from "./schema";
import { usersTable } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function saveLinks(formData: LinksFormData) {
  const { userId } = await verifySession();
  const { links } = await LinksFormSchema.parseAsync(formData);

  await db.update(usersTable).set({ links }).where(eq(usersTable.id, userId));
}
