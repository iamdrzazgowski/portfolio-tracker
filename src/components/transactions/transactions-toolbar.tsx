import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TransactionsToolbarProps {
    search: string;
    filter: "all" | "BUY" | "SELL";
    onSearchChange: (value: string) => void;
    onFilterChange: (value: "all" | "BUY" | "SELL") => void;
}

export function TransactionsToolbar({
    search,
    filter,
    onSearchChange,
    onFilterChange,
}: TransactionsToolbarProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm font-medium text-foreground">
                    Transaction History
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    All buy &amp; sell activities
                </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        className="h-8 w-full border-border/60 bg-background pl-8 text-xs placeholder:text-muted-foreground/60 sm:w-56"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <Select
                    value={filter}
                    onValueChange={(v) =>
                        onFilterChange(v as "all" | "BUY" | "SELL")
                    }
                >
                    <SelectTrigger className="h-8 w-full border-border/60 bg-background text-xs gap-1.5 sm:w-28">
                        <Filter className="size-3 text-muted-foreground" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all" className="text-xs">
                            All
                        </SelectItem>
                        <SelectItem value="BUY" className="text-xs">
                            Buy
                        </SelectItem>
                        <SelectItem value="SELL" className="text-xs">
                            Sell
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
