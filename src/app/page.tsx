"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp } from "lucide-react";

export default function MinimalCenteredLoader() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 95 ? prev + 5 : prev));
        }, 100);

        const timeout = setTimeout(() => {
            setProgress(100);
            router.push("/dashboard");
        }, 1200);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background gap-6">
            <div className="flex items-center gap-2.5 text-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                    <TrendingUp className="size-4 text-primary-foreground" />
                </div>
                <span className="font-serif text-xl font-light italic tracking-tight">
                    Portfolio Tracker
                </span>
            </div>
            <div className="w-48 h-px bg-border overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
