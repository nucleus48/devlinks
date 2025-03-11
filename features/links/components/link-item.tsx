import DragAndDropIcon from "@/components/icons/drag-and-drop";
import { useLinks, useUnusedPlatforms } from "../providers/links-provider";
import { Label } from "@/components/ui/label";
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

export type LinkItemProps = {
  index: number;
};

export default function LinkItem({ index }: LinkItemProps) {
  const { remove } = useLinks();
  const { control } = useFormContext<LinksFormData>();
  const platform = useWatch({ control, name: `links.${index}.platform` });
  const unusedPlatforms = useUnusedPlatforms(platform);
  const { placeholder } = unusedPlatforms.find(
    (item) => item.platform === platform
  )!;

  return (
    <div className="p-5 space-y-3 rounded-lg bg-muted">
      <div className="text-muted-foreground flex items-center gap-2">
        <DragAndDropIcon />
        <span className="font-bold mr-auto">Link #{index + 1}</span>
        <button type="button" onClick={() => remove(index)}>
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
