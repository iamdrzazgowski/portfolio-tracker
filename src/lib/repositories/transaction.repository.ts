import prisma from '../prisma';

type TransactionType = 'BUY' | 'SELL';
type AssetType = 'STOCK' | 'ETF' | 'CRYPTO' | 'COLLECTIBLE';

export interface CreateTransactionInput {
    assetName: string;
    assetSymbol: string;
    assetType: AssetType;
    currency: string;
    portfolioId: string;
    type: TransactionType;
    quantity: number;
    price: number;
    date: Date;
}

export const transactionRepository = {
    async createWithAsset(input: CreateTransactionInput) {
        const existingAsset = await prisma.asset.findFirst({
            where: {
                symbol: input.assetSymbol,
                portfolioId: input.portfolioId,
            },
        });

        const result = await prisma.transaction.create({
            data: {
                type: input.type,
                quantity: input.quantity,
                price: input.price,
                date: input.date,
                asset: existingAsset
                    ? {
                          connect: { id: existingAsset.id },
                      }
                    : {
                          create: {
                              name: input.assetName,
                              symbol: input.assetSymbol,
                              type: input.assetType,
                              currency: input.currency,
                              portfolioId: input.portfolioId,
                          },
                      },
            },
            include: { asset: true },
        });

        await prisma.portfolio.update({
            where: { id: input.portfolioId },
            data: {},
        });

        return result;
    },

    async findManyByUserId(userId: string) {
        return prisma.transaction.findMany({
            where: {
                asset: {
                    portfolio: {
                        userId,
                    },
                },
            },
            select: {
                id: true,
                type: true,
                quantity: true,
                price: true,
                date: true,
                asset: {
                    select: {
                        name: true,
                        symbol: true,
                        type: true,
                        currency: true,
                        portfolio: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });
    },

    async delete(id: string) {
        return prisma.transaction.delete({
            where: {
                id,
            },
        });
    },
};
