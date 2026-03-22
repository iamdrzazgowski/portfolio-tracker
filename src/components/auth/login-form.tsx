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
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginData } from "@/types/auth";
import { loginAction } from "@/actions/auth";
import Spinner from "@/components/ui/spinner";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        startTransition(() => {
            loginAction(data)
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
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
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
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
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
                </Field>
                <Field>
                    <Button type="submit" disabled={pending}>
                        {pending ? <Spinner size={16} /> : "Login"}
                    </Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
