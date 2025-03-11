"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { LinksFormData } from "../lib/schema";
import { useLinks, useUnusedPlatforms } from "../providers/links-provider";
import LinkList from "./link-list";
import { toast } from "sonner";
import { saveLinks } from "../lib/actions";

export default function LinksForm() {
  const unusedPlatforms = useUnusedPlatforms();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<LinksFormData>();
  const { append } = useLinks();

  const addNewLink = () => {
    if (unusedPlatforms.length == 0) return;
    const { platform } = unusedPlatforms[0];
    append({ platform, url: "" });
  };

  const onSubmit = async (formData: LinksFormData) => {
    const { error, success } = await saveLinks(formData);
    if (success) toast.success(success);
    else if (error) toast.error(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex flex-col flex-1 p-6 sm:p-10">
        <h1 className="text-heading">Customize your links</h1>
        <p className="text-muted-foreground mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          type="button"
          disabled={unusedPlatforms.length == 0}
          onClick={addNewLink}
          variant={"secondary"}
          className="w-full mb-6"
        >
          + Add new link
        </Button>
        <div className="flex-1 space-y-6">
          <LinkList />
        </div>
      </div>
      <div className="sticky bottom-0 p-4 sm:py-6 sm:px-10 border-t border-border bg-white">
        <Button
          disabled={!isDirty || isSubmitting}
          className="block w-full ml-auto lg:w-max"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
