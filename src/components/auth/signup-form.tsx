"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
            className={cn("flex flex-col gap-7", className)}
            {...props}
        >
            {/* Header */}
            <div className="space-y-1">
                <h1 className="font-serif text-3xl font-light italic tracking-tight text-foreground">
                    Create account.
                </h1>
                <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    Start tracking your investments
                </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="name"
                        className="text-[10px] font-normal uppercase tracking-[0.1em] text-muted-foreground"
                    >
                        Full Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        className={cn(
                            "h-9 border-border/70 bg-card text-sm placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-0",
                            errors.name && "border-destructive",
                        )}
                        {...register("name", {
                            required: "This field is required",
                        })}
                    />
                    {errors.name && (
                        <p className="text-[11px] text-destructive">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
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

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="password"
                        className="text-[10px] font-normal uppercase tracking-[0.1em] text-muted-foreground"
                    >
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
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
                    {errors.password ? (
                        <p className="text-[11px] text-destructive">
                            {errors.password.message}
                        </p>
                    ) : (
                        <p className="text-[11px] text-muted-foreground/60">
                            At least 8 characters
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="confirmPassword"
                        className="text-[10px] font-normal uppercase tracking-[0.1em] text-muted-foreground"
                    >
                        Confirm Password
                    </label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        className={cn(
                            "h-9 border-border/70 bg-card text-sm focus-visible:border-primary focus-visible:ring-0",
                            errors.confirmPassword && "border-destructive",
                        )}
                        {...register("confirmPassword", {
                            required: "This field is required",
                            validate: (value) =>
                                value === getValues().password ||
                                "Passwords need to match",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-[11px] text-destructive">
                            {errors.confirmPassword.message}
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
                    {pending ? <Spinner size={14} /> : "Create Account"}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
}
