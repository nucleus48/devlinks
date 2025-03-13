import DragAndDropIcon from "@/components/icons/drag-and-drop";
import { useLinks, useUnusedPlatforms } from "../providers/links-provider";
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
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type LinkItemProps = {
  id: string;
  index: number;
  platform: string;
};

export default function LinkItem({ index, id, platform }: LinkItemProps) {
  const { remove } = useLinks();
  const { control } = useFormContext<LinksFormData>();
  const unusedPlatforms = useUnusedPlatforms(platform);
  const { placeholder } = unusedPlatforms.find(
    (item) => item.platform === platform
  )!;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { index } });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="p-5 space-y-3 rounded-lg bg-muted border"
    >
      <div className="text-muted-foreground flex items-center justify-between">
        <div {...listeners} className="flex gap-2 items-center cursor-grab">
          <DragAndDropIcon />
          <span className="font-bold">Link #{index + 1}</span>
        </div>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => remove(index)}
        >
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
