import prisma from '../prisma';

export const snapshotRepository = {
    async create(data) {
        return prisma.portfolioSnapshot.create({
            data,
        });
    },

    async getUserSnapshots(userId: string) {
        return prisma.portfolioSnapshot.findMany({
            where: {
                userId,
            },
            orderBy: {
                date: 'desc',
            },
        });
    },

    async findFirst(userId: string, monthStart: Date) {
        return prisma.portfolioSnapshot.findFirst({
            where: {
                userId,
                date: monthStart,
            },
        });
    },
};
