"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signup } from "../lib/actions";
import { SignUpFormData, SignUpFormSchema } from "../lib/schema";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { error, success } = await signup(data);
      if (error) toast.error(error);
      else if (success) {
        router.replace("/");
        toast.success(success);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-[32px] font-bold mb-2">Create account</h1>
      <p className="text-muted-foreground mb-10">
        Let&apos;s get you started sharing your links!
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    invalid={invalid}
                    placeholder="e.g. alex@email.com"
                    renderIcon={() => (
                      <Image
                        src="/images/icon-email.svg"
                        width={16}
                        height={16}
                        alt="email"
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel>Create password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    invalid={invalid}
                    placeholder="At least 8 characters"
                    renderIcon={() => (
                      <Image
                        src="/images/icon-password.svg"
                        width={16}
                        height={16}
                        alt="password"
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    invalid={invalid}
                    placeholder="At least 8 characters"
                    renderIcon={() => (
                      <Image
                        src="/images/icon-password.svg"
                        width={16}
                        height={16}
                        alt="password"
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <p className="text-xs text-muted-foreground">
            Password must contain at least 8 characters
          </p>

          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Create new account"}
          </Button>

          <p className="text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary block sm:inline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
