"use client";

import EmailIcon from "@/components/icons/email";
import PasswordIcon from "@/components/icons/password";
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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signup } from "../lib/actions";
import { SignUpFormData, SignUpFormSchema } from "../lib/schema";

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const { error } = await signup(data);
    toast.error(error);
  };

  return (
    <div>
      <h1 className="text-heading">Create account</h1>
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
                    renderIcon={() => <EmailIcon />}
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
                    renderIcon={() => <PasswordIcon />}
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
                    renderIcon={() => <PasswordIcon />}
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
