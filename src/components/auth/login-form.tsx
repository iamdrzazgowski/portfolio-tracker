"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
            className={cn("flex flex-col gap-7", className)}
            {...props}
        >
            {/* Header */}
            <div className="space-y-1">
                <h1 className="font-serif text-3xl font-light italic tracking-tight text-foreground">
                    Welcome back.
                </h1>
                <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    Sign in to your portfolio
                </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="email"
                        className="text-[10px] font-normal uppercase tracking-[0.1em] text-muted-foreground"
                    >
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={cn(
                            "h-9 border-border/70 bg-card text-sm placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-0",
                            errors.email && "border-destructive",
                        )}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please provide a valid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-[11px] text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-[10px] font-normal uppercase tracking-[0.1em] text-muted-foreground"
                        >
                            Password
                        </label>
                        <a
                            href="#"
                            className="text-[11px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className={cn(
                            "h-9 border-border/70 bg-card text-sm focus-visible:border-primary focus-visible:ring-0",
                            errors.password && "border-destructive",
                        )}
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password needs a minimum of 8 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-[11px] text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-3">
                <Button
                    type="submit"
                    disabled={pending}
                    className="h-9 w-full bg-primary text-xs uppercase tracking-[0.1em] text-primary-foreground hover:bg-primary/90"
                >
                    {pending ? <Spinner size={14} /> : "Sign in"}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </form>
    );
}
