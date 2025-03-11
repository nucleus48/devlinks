import IllustrationEmpty from "@/components/icons/illustration-empty";

export default function LinksEmpty() {
  return (
    <div className="bg-muted rounded-lg flex flex-col items-center justify-center p-4 h-full">
      <IllustrationEmpty className="mb-10" />
      <div className="mb-6 font-bold text-2xl sm:text-[32px]">
        Let&apos;s get you started
      </div>
      <div className="text-muted-foreground text-center max-w-[448px]">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We&apos;re here to help you
        share your profiles with everyone!
      </div>
    </div>
  );
}
