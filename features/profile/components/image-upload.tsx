import { useFormContext, useWatch } from "react-hook-form";
import { ProfileFormData } from "../lib/schema";
import UploadImageIcon from "@/components/icons/upload-image";
import { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ImageUpload() {
  const { register, setValue, control } = useFormContext<ProfileFormData>();
  const image = useWatch({ control, name: "image" });
  const imageUrl = useWatch({ control, name: "imageUrl" });

  useEffect(() => {
    if (image && image.length > 0) {
      const url = URL.createObjectURL(image[0]);
      setValue("imageUrl", url);
    }
  }, [image, setValue]);

  return (
    <div className="p-4 space-y-3 rounded-lg bg-muted text-muted-foreground xl:flex gap-4 items-center">
      <div className="max-w-[240px] w-full">Profile picture</div>
      <div className="xl:flex items-center gap-6 space-y-6 xl:space-y-0">
        <button
          className={cn(
            "relative bg-primary-lighter size-[193px] rounded-lg overflow-hidden shrink-0 flex flex-col items-center justify-center gap-2 cursor-pointer",
            imageUrl ? "text-white" : "text-primary"
          )}
        >
          <input
            {...register("image")}
            type="file"
            className="absolute opacity-0 inset-0 z-20"
          />
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="profile picture"
              fill
              className="object-cover brightness-50"
            />
          )}
          <UploadImageIcon className="relative z-10" />
          <div className="font-bold relative z-10">
            {imageUrl ? "Change Image" : "+ Upload Image"}
          </div>
        </button>
        <div className="text-xs 2xl:text-base min-w-0">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </div>
      </div>
    </div>
  );
}
