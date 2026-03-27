'use server';

import { auth } from '@/lib/auth';
import {
    transactionService,
    CreateTransactionDTO,
} from '@/lib/services/transaction.service';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

type TransactionType = 'BUY' | 'SELL';
type AssetType = 'STOCK' | 'ETF' | 'CRYPTO' | 'COLLECTIBLE';

// function parseFormData(formData): CreateTransactionDTO {
//     const quantity = Number(formData.get('quantity'));
//     const price = Number(formData.get('price'));
//     const date = formData.get('date') as string;
//     const portfolioId = formData.get('portfolioId') as string;
//     const type = formData.get('type') as TransactionType;
//     const assetName = formData.get('assetName') as string;
//     const assetSymbol = formData.get('assetSymbol') as string;
//     const assetType = formData.get('assetType') as AssetType;
//     const currency = (formData.get('currency') as string) ?? 'USD';

//     if (!assetName || !assetSymbol || !assetType)
//         throw new Error('Asset data is required');
//     if (!portfolioId) throw new Error('Portfolio ID is required');
//     if (!type) throw new Error('Transaction type is required');
//     if (isNaN(quantity) || quantity <= 0) throw new Error('Invalid quantity');
//     if (isNaN(price) || price <= 0) throw new Error('Invalid price');
//     if (!date) throw new Error('Date is required');

//     return {
//         asset: {
//             name: assetName,
//             symbol: assetSymbol,
//             type: assetType,
//             currency,
//         },
//         portfolioId,
//         type,
//         quantity,
//         price,
//         date,
//     };
// }

export async function createTransactionAction(formData: FormValues) {
    console.log('1. action otrzymał:', formData);

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

        console.log('2. dto:', dto);

        const transaction = await transactionService.createTransaction(dto);
        revalidatePath(`/dashboard/transactions`);
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
        return { success: true, data: transactions };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error ? error.message : 'Something went wrong',
        };
    }
}
