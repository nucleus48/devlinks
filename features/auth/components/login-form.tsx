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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "../lib/actions";
import { LogInFormData, LogInFormSchema } from "../lib/schema";

export default function LogInForm() {
  const router = useRouter();
  const form = useForm<LogInFormData>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LogInFormData) => {
    try {
      const { error, success } = await login(data);
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
      <h1 className="text-[32px] font-bold mb-2">Login</h1>
      <p className="text-muted-foreground mb-10">
        Add your details below to get back into the app
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    invalid={invalid}
                    placeholder="Enter your password"
                    renderIcon={() => <PasswordIcon />}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Login"}
          </Button>

          <p className="text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary block sm:inline">
              Create account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
