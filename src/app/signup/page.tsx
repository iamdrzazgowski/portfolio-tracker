import { SignupForm } from "@/components/auth/signup-form";
import { TrendingUp } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* ── Left panel — dark editorial branding ── */}
            <div className="relative hidden flex-col justify-between bg-foreground p-10 text-background lg:flex">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                        <TrendingUp className="size-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium tracking-tight">
                        Portfolio Tracker
                    </span>
                </div>

                {/* Headline */}
                <div className="space-y-3">
                    <p className="font-serif text-[2.6rem] font-light italic leading-[1.15] tracking-tight">
                        Start building your{" "}
                        <em className="not-italic text-primary">portfolio</em>
                        <br />
                        today.
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-background/40">
                        Stocks · ETFs · Crypto · Collectibles
                    </p>
                </div>

                {/* Bottom stats */}
                <div className="grid grid-cols-3 gap-4 border-t border-background/10 pt-6">
                    <div>
                        <p className="font-serif text-xl font-light">Free</p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-background/40">
                            Always
                        </p>
                    </div>
                    <div>
                        <p className="font-serif text-xl font-light">2 min</p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-background/40">
                            Setup time
                        </p>
                    </div>
                    <div>
                        <p className="font-serif text-xl font-light">
                            Real-time
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-background/40">
                            Prices
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right panel — form ── */}
            <div className="flex flex-col bg-background">
                {/* Mobile logo */}
                <div className="flex items-center gap-2 p-6 lg:hidden">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary">
                        <TrendingUp className="size-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium tracking-tight">
                        Portfolio Tracker
                    </span>
                </div>

                <div className="flex flex-1 items-center justify-center p-8">
                    <div className="w-full max-w-sm">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
