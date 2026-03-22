"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-1 bg-foreground transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
