import prisma from '../prisma';

export const assetsRepository = {
    async getUserAssets(userId: string) {
        return prisma.asset.findMany({
            where: {
                portfolio: {
                    userId: userId,
                },
            },
        });
    },
};
