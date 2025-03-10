import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { verifySession } from "@/lib/session";
import { eq } from "drizzle-orm";

export const getLinks = async () => {
  const { userId } = await verifySession();

  const links = await db.query.linksTable.findMany({
    where: eq(linksTable.userId, userId),
    columns: { platform: true, url: true },
  });

  return links;
};
