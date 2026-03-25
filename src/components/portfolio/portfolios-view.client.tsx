'use client';

import { useState, useTransition } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';
import { Portfolio } from '@/types/portfolio';
import { PortfolioSummaryCards } from '@/components/portfolio/portfolio-summary-cards';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { PortfolioDialog } from '@/components/portfolio/portfolio-dialog';
import { deletePortfolioAction } from '@/actions/portfolio';

export function PortfoliosViewClient({
    portfolios,
}: {
    portfolios: Portfolio[];
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(
        null,
    );
    const [, startTransition] = useTransition();

    const handleEdit = (portfolio: Portfolio) => {
        setEditingPortfolio(portfolio);
        setIsDialogOpen(true);
    };

    const handleDelete = (portfolio: Portfolio) => {
        startTransition(async () => {
            await deletePortfolioAction(portfolio.id);
        });
    };

    const handleAddNew = () => {
        setEditingPortfolio(null);
        setIsDialogOpen(true);
    };

    return (
        <div className='space-y-6'>
            <DashboardPageHeader
                title='Portfolios'
                description='Manage your investment portfolios'>
                <Button onClick={handleAddNew}>
                    <Plus className='mr-2 size-4' />
                    Add Portfolio
                </Button>
            </DashboardPageHeader>

            <PortfolioSummaryCards portfolios={portfolios} />

            <div className='grid gap-4 sm:grid-cols-2'>
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
