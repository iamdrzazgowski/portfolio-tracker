import prisma from '../prisma';

export const portfolioRepository = {
    async create(data: { name: string; description?: string; userId: string }) {
        return prisma.portfolio.create({
            data,
        });
    },
};
