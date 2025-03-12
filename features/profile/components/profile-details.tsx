import { useFormContext } from "react-hook-form";
import { ProfileFormData } from "../lib/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ProfileDetails() {
  const { control } = useFormContext<ProfileFormData>();
  return (
    <div className="p-4 space-y-3 rounded-lg bg-muted">
      <FormField
        control={control}
        name="firstName"
        render={({ field, fieldState: { invalid, error } }) => (
          <FormItem className="xl:flex *:flex-1 gap-x-4">
            <FormLabel className="xl:text-base max-w-[240px]">
              First Name*
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="e.g. John"
                invalid={invalid}
                message={error?.message}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="lastName"
        render={({ field, fieldState: { invalid, error } }) => (
          <FormItem className="xl:flex *:flex-1 gap-x-4">
            <FormLabel className="xl:text-base max-w-[240px]">
              Last Name*
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="e.g. Appleseed"
                invalid={invalid}
                message={error?.message}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field, fieldState: { invalid, error } }) => (
          <FormItem className="xl:flex *:flex-1 gap-x-4">
            <FormLabel className="xl:text-base max-w-[240px]">Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="e.g. email@example.com"
                invalid={invalid}
                message={error?.message}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
