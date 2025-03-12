import { verifySession } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { updateUserProfile } from "./actions";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { userId } = await verifySession();
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await updateUserProfile(file.ufsUrl);
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
