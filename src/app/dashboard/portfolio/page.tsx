"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/types/portfolio";
import { PortfolioSummaryCards } from "@/components/portfolio/portfolio-summary-cards";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { PortfolioDialog } from "@/components/portfolio/portfolio-dialog";
import { portfolios } from "@/data/mock-portfolios";

export default function PortfoliosView() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(
        null,
    );

    const handleEdit = (portfolio: Portfolio) => {
        setEditingPortfolio(portfolio);
        setIsDialogOpen(true);
    };

    const handleDelete = (portfolio: Portfolio) => {
        // TODO: implement delete logic
        console.log("Delete portfolio:", portfolio.id);
    };

    const handleAddNew = () => {
        setEditingPortfolio(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6 m-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Portfolios
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your investment portfolios
                    </p>
                </div>
                <Button onClick={handleAddNew}>
                    <Plus className="mr-2 size-4" />
                    Add Portfolio
                </Button>
            </div>

            <PortfolioSummaryCards portfolios={portfolios} />

            <div className="grid gap-4 sm:grid-cols-2">
                {portfolios.map((portfolio) => (
                    <PortfolioCard
                        key={portfolio.id}
                        portfolio={portfolio}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <PortfolioDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                editingPortfolio={editingPortfolio}
            />
        </div>
    );
}
