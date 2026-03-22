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
        (sum, p) => sum + p.totalInvested,
        0,
    );
    const totalChange = ((totalValue - totalInvested) / totalInvested) * 100;
    const totalPL = totalValue - totalInvested;

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border border-border/50 bg-card">
                <CardContent className="p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Value
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                        ${formatNumber(totalValue)}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                        {totalChange >= 0 ? (
                            <TrendingUp className="size-4 text-success" />
                        ) : (
                            <TrendingDown className="size-4 text-destructive" />
                        )}
                        <span
                            className={
                                totalChange >= 0
                                    ? "text-sm text-success"
                                    : "text-sm text-destructive"
                            }
                        >
                            {totalChange >= 0 ? "+" : ""}
                            {totalChange.toFixed(2)}%
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card">
                <CardContent className="p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Invested
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                        ${formatNumber(totalInvested)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Across {portfolios.length} portfolios
                    </p>
                </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card">
                <CardContent className="p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total P/L
                    </p>
                    <p
                        className={`mt-1 text-2xl font-semibold ${totalPL >= 0 ? "text-success" : "text-destructive"}`}
                    >
                        {totalPL >= 0 ? "+" : ""}${formatNumber(totalPL)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Unrealized gains
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
