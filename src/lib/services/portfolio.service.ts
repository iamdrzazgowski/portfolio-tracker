import { portfolioRepository } from '../repositories/portfolio.repository';

export async function createPortfolio(data: {
    name: string;
    description?: string;
    userId: string;
}) {
    const { name, userId } = data;

    if (!name || name.trim().length === 0) {
        throw new Error('Portfolio name is required');
    }

    if (!userId) {
        throw new Error('User ID is required');
    }

    const portfolio = await portfolioRepository.create({
        ...data,
        name: name.trim(),
    });

    if (!portfolio) throw new Error('Failed to create portfolio');

    return portfolio;
}
