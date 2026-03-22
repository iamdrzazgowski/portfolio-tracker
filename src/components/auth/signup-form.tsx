"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { SignUpData } from "@/types/auth";
import { signUpAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<SignUpData>();
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const onSubmit = async (data: SignUpData) => {
        startTransition(() => {
            signUpAction(data)
                .then(() => router.push("/"))
                .catch((err) => console.error(err.message));
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Fill in the form below to create your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={`bg-background ${
                            errors.name?.message ? "border-red-500" : ""
                        }`}
                        {...register("name", {
                            required: "This field is required",
                        })}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className={`bg-background ${
                            errors.email?.message ? "border-red-500" : ""
                        }`}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please provide a valid email address",
                            },
                        })}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        className={`bg-background ${
                            errors.password?.message ? "border-red-500" : ""
                        }`}
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password needs a minimum of 8 characters",
                            },
                        })}
                    />
                    <FieldDescription>
                        Must be at least 8 characters long.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                    </FieldLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        className={`bg-background ${
                            errors.confirmPassword?.message
                                ? "border-red-500"
                                : ""
                        }`}
                        {...register("confirmPassword", {
                            required: "This field is required",
                            validate: (value) => {
                                return (
                                    value === getValues().password ||
                                    "Passwords need to match"
                                );
                            },
                        })}
                    />
                    <FieldDescription>
                        Please confirm your password.
                    </FieldDescription>
                </Field>
                <Field>
                    <Button type="submit" disabled={pending}>
                        {pending ? <Spinner size={16} /> : "Create Account"}
                    </Button>
                </Field>
                <Field>
                    <FieldDescription className="px-6 text-center">
                        Already have an account?{" "}
                        <Link href="/login">Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
