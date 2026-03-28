import { transactionRepository } from '@/lib/repositories/transaction.repository';

type TransactionType = 'BUY' | 'SELL';
type AssetType = 'STOCK' | 'ETF' | 'CRYPTO' | 'COLLECTIBLE';

export interface CreateTransactionDTO {
    asset: {
        name: string;
        symbol: string;
        type: AssetType;
        currency: string;
    };
    portfolioId: string;
    type: TransactionType;
    quantity: number;
    price: number;
    date: string;
}

export const transactionService = {
    async createTransaction(dto: CreateTransactionDTO) {
        if (dto.quantity <= 0)
            throw new Error('Quantity must be greater than 0');
        if (dto.price <= 0) throw new Error('Price must be greater than 0');

        return transactionRepository.createWithAsset({
            assetName: dto.asset.name,
            assetSymbol: dto.asset.symbol,
            assetType: dto.asset.type,
            currency: dto.asset.currency,
            portfolioId: dto.portfolioId,
            type: dto.type,
            quantity: dto.quantity,
            price: dto.price,
            date: new Date(dto.date),
        });
    },

    async getTransactionsByUserId(userId: string) {
        const transactions =
            await transactionRepository.findManyByUserId(userId);

        return transactions.map((t) => ({
            id: t.id,
            type: t.type,
            date: t.date,
            quantity: t.quantity,
            price: t.price,
            total: t.quantity * t.price,
            asset: {
                name: t.asset.name,
                symbol: t.asset.symbol,
                type: t.asset.type,
                currency: t.asset.currency,
                portfolio: {
                    id: t.asset.portfolio.id,
                    name: t.asset.portfolio.name,
                },
            },
        }));
    },
};
