"use client";

import { Button } from "@/components/ui/button";
import LinksEmpty from "./links-empty";
import { useFormContext } from "react-hook-form";
import { LinksFormData } from "../lib/schema";
import { useLinks } from "../providers/links-provider";

export default function LinksForm() {
  const { handleSubmit } = useFormContext<LinksFormData>();
  const { append } = useLinks();

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
          onClick={() => append({ url: "", platform: "" })}
          variant={"secondary"}
          className="w-full mb-6"
        >
          + Add new link
        </Button>
        <div className="flex-1">
          <LinksEmpty />
        </div>
      </div>
      <div className="p-4 sm:py-6 sm:px-10 border-t border-border">
        <Button className="block w-full ml-auto lg:w-max">Save</Button>
      </div>
    </form>
  );
}
