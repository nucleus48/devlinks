"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ProfileFormData, ProfileFormSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useProfile } from "../providers/profile-provider";
import { useEffect } from "react";

export type ProfileFormProps = { profile: ProfileFormData };

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [, setProfile] = useProfile();
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: profile,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    getValues,
  } = form;

  const onSubmit = async (formData: ProfileFormData) => console.log(formData);

  useEffect(() => {
    setProfile(getValues());
  }, [getValues, setProfile]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <div className="flex flex-col flex-1 p-6 sm:p-10">
          <h1 className="text-heading">Profile Details</h1>
          <p className="text-muted-foreground mb-10">
            Add your details to create a personal touch to your profile.
          </p>
          <div className="flex-1"></div>
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
    </Form>
  );
}
