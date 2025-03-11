import { cache } from "react";
import "server-only";
import { deleteSession, verifySession } from "./session";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";
import { redirect } from "next/navigation";

export const getUser = cache(async () => {
  const { userId } = await verifySession();
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
    columns: { password: false },
  });

  if (!user) {
    await deleteSession();
    redirect("/login");
  }

  return user;
});
