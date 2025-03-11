import DragAndDropIcon from "@/components/icons/drag-and-drop";
import { useUnusedPlatforms } from "../providers/links-provider";
import { Input } from "@/components/ui/input";
import LinkIcon from "@/components/icons/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LinksFormData } from "../lib/schema";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { HTMLAttributes } from "react";

export type LinkItemProps = HTMLAttributes<HTMLDivElement> & {
  index: number;
};

export default function LinkItemView({ index, ...props }: LinkItemProps) {
  const { control } = useFormContext<LinksFormData>();
  const platform = useWatch({ control, name: `links.${index}.platform` });
  const unusedPlatforms = useUnusedPlatforms(platform);
  const { placeholder } = unusedPlatforms.find(
    (item) => item.platform === platform
  )!;

  return (
    <div {...props} className="p-5 space-y-3 rounded-lg bg-muted border">
      <div className="text-muted-foreground flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-grabbing">
          <DragAndDropIcon />
          <span className="font-bold">Link #{index + 1}</span>
        </div>
        <button type="button" className="cursor-pointer">
          Remove
        </button>
      </div>

      <FormField
        control={control}
        name={`links.${index}.platform`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform</FormLabel>
            <Select
              value={field.value}
              onValueChange={(platform) => field.onChange(platform)}
            >
              <FormControl>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {unusedPlatforms.map((item) => (
                  <SelectItem key={item.platform} value={item.platform}>
                    {item.icon}
                    {item.platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`links.${index}.url`}
        render={({ field, fieldState: { error, invalid } }) => (
          <FormItem>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                invalid={invalid}
                message={error?.message}
                value={field.value || ""}
                placeholder={placeholder}
                renderIcon={() => <LinkIcon />}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
