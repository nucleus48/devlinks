"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { LinksFormData } from "../lib/schema";
import { useLinks, useUnusedPlatforms } from "../providers/links-provider";
import LinkList from "./link-list";

export default function LinksForm() {
  const unusedPlatforms = useUnusedPlatforms();
  const { handleSubmit } = useFormContext<LinksFormData>();
  const { append } = useLinks();

  const addNewLink = () => {
    const { platform } = unusedPlatforms[0];
    append({ platform, url: "" });
  };

  const onSubmit = (formData: LinksFormData) => console.log(formData);

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
      <div className="p-4 sm:py-6 sm:px-10 border-t border-border">
        <Button className="block w-full ml-auto lg:w-max">Save</Button>
      </div>
    </form>
  );
}
