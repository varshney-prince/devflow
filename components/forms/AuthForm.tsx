"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully"
          : "Signed up successfully"
      );

      router.push(ROUTES.HOME);
    } else {
      toast.error(result?.error?.message || "Something went wrong");
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      <FieldGroup>
        {Object.keys(defaultValues).map((fieldName) => {
          const name = fieldName as Path<T>;
          const error = form.formState.errors[name];
          return (
            <Field key={name}>
              <FieldContent>
                <FieldLabel className="paragraph-medium text-dark400_light700">
                  {name === "email"
                    ? "Email Address"
                    : name.charAt(0).toUpperCase() + name.slice(1)}
                </FieldLabel>
                <Input
                  required
                  type={name === "password" ? "password" : "text"}
                  {...form.register(name)}
                  className="min-h-12 rounded-1.5 border light-border-2 background-light900_dark300 paragraph-regular text-dark300_light700 no-focus"
                />
                {error && (
                  <FieldError errors={[{ message: error.message as string }]} />
                )}
              </FieldContent>
            </Field>
          );
        })}
      </FieldGroup>

      <Button
        disabled={form.formState.isSubmitting}
        className="font-inter min-h-12 w-full rounded-2 px-4 py-3 paragraph-medium text-light-900! primary-gradient"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="primary-text-gradient paragraph-semibold"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="primary-text-gradient paragraph-semibold"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
