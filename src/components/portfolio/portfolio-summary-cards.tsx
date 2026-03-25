"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import { Portfolio } from "@/types/portfolio";

interface PortfolioSummaryCardsProps {
    portfolios: Portfolio[];
}

export function PortfolioSummaryCards({
    portfolios,
}: PortfolioSummaryCardsProps) {
    const totalValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
    const totalInvested = portfolios.reduce(
        (sum, p) => sum + (p.totalInvested ?? 0),
        0,
    );

    const totalChange =
        totalInvested > 0
            ? ((totalValue - totalInvested) / totalInvested) * 100
            : 0;
    const totalPL = totalValue - totalInvested;

    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {/* Accent KPI — Total Value */}
            <Card className="border border-primary/40 bg-accent shadow-none">
                <CardContent className="p-4">
                    <p className="text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground">
                        Total Value
                    </p>
                    <p className="mt-1.5 font-serif text-[22px] font-medium leading-none text-primary">
                        ${formatNumber(totalValue)}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5">
                        {totalChange >= 0 ? (
                            <TrendingUp className="size-3.5 text-success" />
                        ) : (
                            <TrendingDown className="size-3.5 text-destructive" />
                        )}
                        <span
                            className={`text-[11px] font-medium ${
                                totalChange >= 0
                                    ? "text-success"
                                    : "text-destructive"
                            }`}
                        >
                            {totalChange >= 0 ? "+" : ""}
                            {totalChange.toFixed(2)}%
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            all time
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Total Invested */}
            <Card className="border border-border/50 bg-card shadow-none">
                <CardContent className="p-4">
                    <p className="text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground">
                        Total Invested
                    </p>
                    <p className="mt-1.5 font-serif text-[22px] font-medium leading-none text-foreground">
                        ${formatNumber(totalInvested)}
                    </p>
                    <p className="mt-2.5 text-[11px] text-muted-foreground">
                        across{" "}
                        <span className="font-medium text-foreground">
                            {portfolios.length}
                        </span>{" "}
                        {portfolios.length === 1 ? "portfolio" : "portfolios"}
                    </p>
                </CardContent>
            </Card>

            {/* Total P/L */}
            <Card className="border border-border/50 bg-card shadow-none">
                <CardContent className="p-4">
                    <p className="text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground">
                        Total P/L
                    </p>
                    <p
                        className={`mt-1.5 font-serif text-[22px] font-medium leading-none ${
                            totalPL >= 0 ? "text-success" : "text-destructive"
                        }`}
                    >
                        {totalPL >= 0 ? "+" : ""}${formatNumber(totalPL)}
                    </p>
                    <p className="mt-2.5 text-[11px] text-muted-foreground">
                        unrealized gains
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
