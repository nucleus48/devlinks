"use client";

import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { ProfileFormData, ProfileFormSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useProfile } from "../providers/profile-provider";
import { useEffect } from "react";
import ProfileDetails from "./profile-details";
import ImageUpload from "./image-upload";
import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "../lib/uploadthing";
import { toast } from "sonner";
import { updateUserProfile } from "../lib/actions";

export type ProfileFormProps = { profile: ProfileFormData };

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [, setProfile] = useProfile();
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: profile,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    control,
  } = form;

  const data = useWatch({ control });
  const onSubmit = async (formData: ProfileFormData) => {
    const { firstName, lastName, previewEmail, image } = formData;

    let imageUrl: string | undefined = undefined;

    if (image && image.length > 0) {
      const data = await uploadFiles("imageUploader", { files: [image[0]] });
      imageUrl = data[0]?.ufsUrl;
    }

    const { success, error } = await updateUserProfile({
      firstName,
      lastName,
      previewEmail,
      imageUrl,
    });

    if (success) toast.success(success);
    else if (error) toast.error(error);
  };

  useEffect(() => {
    setProfile(data);
  }, [data, setProfile]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <div className="flex flex-col flex-1 p-6 sm:p-10">
          <h1 className="text-heading">Profile Details</h1>
          <p className="text-muted-foreground mb-10">
            Add your details to create a personal touch to your profile.
          </p>
          <div className="flex-1 space-y-6">
            <ImageUpload />
            <ProfileDetails />
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
    </Form>
  );
}
