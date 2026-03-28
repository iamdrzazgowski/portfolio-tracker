'use server';

import { auth } from '@/lib/auth';
import {
    transactionService,
    CreateTransactionDTO,
} from '@/lib/services/transaction.service';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function createTransactionAction(formData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: 'Unauthorized' };

    try {
        const dto: CreateTransactionDTO = {
            asset: {
                name: formData.asset.name,
                symbol: formData.asset.symbol,
                type: formData.asset.type,
                currency: formData.asset.currency ?? 'USD',
            },
            portfolioId: formData.portfolioId,
            type: formData.type,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
            date: formData.date,
        };

        const transaction = await transactionService.createTransaction(dto);
        revalidatePath('/');
        return { success: true, data: transaction };
    } catch (error) {
        console.error('błąd:', error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message : 'Something went wrong',
        };
    }
}

export async function getTransactionsAction() {
    const session = await await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) return { success: false, error: 'Unauthorized' };

    try {
        const transactions = await transactionService.getTransactionsByUserId(
            session.user.id,
        );
        return transactions;
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error ? error.message : 'Something went wrong',
        };
    }
}

export async function deleteTransactionAction(id: string) {
    try {
        const result = await transactionService.deleteTransaction(id);
        revalidatePath('/');
        return result;
    } catch (err) {
        throw new Error('Problem with delete transaction');
    }
}
