import prisma from '../prisma';

export const portfolioRepository = {
    async create(data: { name: string; description?: string; userId: string }) {
        return prisma.portfolio.create({
            data,
        });
    },
    async delete(data: { portfolioId: string; userId: string }) {
        return prisma.portfolio.deleteMany({
            where: {
                id: data.portfolioId,
                userId: data.userId,
            },
        });
    },
    async update(data: {
        id: string;
        name: string;
        description?: string;
        userId: string;
    }) {
        const { id, userId } = data;

        const result = await prisma.portfolio.updateMany({
            where: { id, userId },
            data: {
                name: data.name.trim(),
                description: data.description,
            },
        });

        if (result.count === 0) {
            throw new Error('Failed to update portfolio');
        }

        return prisma.portfolio.findUnique({
            where: { id },
        });
    },
    async getUserPortfolios(userId: string) {
        return prisma.portfolio.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                description: true,
                assets: {
                    select: {
                        id: true,
                        estimatedValue: true,
                        createdAt: true,
                        lastPrice: true,
                        lastPriceAt: true,
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    },
};
