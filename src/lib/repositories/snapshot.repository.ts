import prisma from '../prisma';

export const snapshotRepository = {
    async create(data) {
        return prisma.portfolioSnapshot.create({
            data,
        });
    },
};
