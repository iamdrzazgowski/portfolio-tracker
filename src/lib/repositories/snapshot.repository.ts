import prisma from '../prisma';

export const snapshotRepository = {
    async create(data) {
        return prisma.portfolioSnapshot.create({
            data,
        });
    },

    async getUserSnapshot(userId: string) {
        return prisma.portfolioSnapshot.findMany({
            where: {
                userId,
            },
            orderBy: {
                date: 'desc',
            },
        });
    },
};
