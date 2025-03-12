"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { verifySession } from "@/lib/session";
import { eq } from "drizzle-orm";

export async function updateUserProfile(url: string) {
  const { userId } = await verifySession();

  await db
    .update(usersTable)
    .set({ imageUrl: url })
    .where(eq(usersTable.id, userId));
}
