import PlatformPreview from "@/components/platform-preview";
import { Button } from "@/components/ui/button";
import { getPreviewUser } from "@/lib/dal";
import { getSession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButton from "./share-button";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getPreviewUser(userId);
  const session = await getSession();

  if (!user) notFound();

  return (
    <div className="relative sm:p-6 space-y-8 sm:space-y-16 h-screen bg-white sm:bg-muted">
      <div className="hidden sm:block absolute z-1 inset-x-0 top-0 bg-primary rounded-b-[32px] h-1/3"></div>
      <header className="relative z-10 px-6 py-4 flex rounded-lg bg-white gap-4">
        {session?.userId === userId && (
          <Button
            className="basis-1/2 sm:basis-auto"
            variant={"secondary"}
            asChild
          >
            <Link href={"/"}>Back</Link>
          </Button>
        )}
        <ShareButton />
      </header>

      <main className="relative z-10">
        <div className="px-14 py-12 w-[349px] min-w-max flex flex-col gap-14 mx-auto items-center bg-white rounded-[24px]">
          <div className="text-center">
            {user.imageUrl && (
              <div className="size-[96px] mx-auto rounded-full border-4 border-primary overflow-hidden mb-[25px]">
                <Image
                  className="object-cover"
                  src={user.imageUrl}
                  alt="profile picture"
                  width={96}
                  height={96}
                />
              </div>
            )}

            {(user.firstName || user.lastName) && (
              <div className="text-heading mb-2">
                <span>{user.firstName}</span> <span>{user.lastName}</span>
              </div>
            )}

            {user.previewEmail && (
              <div className="text-muted-foreground">{user.previewEmail}</div>
            )}
          </div>

          <div className="w-full space-y-5">
            {user.links?.map((link, index) => (
              <PlatformPreview key={index} {...link} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
