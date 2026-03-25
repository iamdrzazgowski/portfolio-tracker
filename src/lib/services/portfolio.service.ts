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

export async function deletePortfolio(data: {
    portfolioId: string;
    userId: string;
}) {
    const { portfolioId, userId } = data;

    if (!portfolioId) throw new Error('Portfolio ID is required');

    if (!userId) throw new Error('User ID is required');

    const result = await portfolioRepository.delete(data);

    console.log(result);
}

export async function updatePortfolio(data: {
    id: string;
    name: string;
    description?: string;
    userId: string;
}) {
    const { id, name, userId } = data;

    if (!id) {
        throw new Error('Portfolio ID is required');
    }

    if (!name || name.trim().length === 0) {
        throw new Error('Portfolio name is required');
    }

    if (!userId) {
        throw new Error('User ID is required');
    }

    const portfolio = await portfolioRepository.update({
        ...data,
        name: name.trim(),
    });

    if (!portfolio) {
        throw new Error('Failed to update portfolio');
    }

    return portfolio;
}

export async function getUserPortfolios(userId: string) {
    const portfolios = await portfolioRepository.getUserPortfolios(userId);

    return portfolios.map((portfolio) => {
        const assets = portfolio.assets;
        const assetsCount = assets.length;

        // ostatni update (kiedy dodano asseta)
        const lastUpdated =
            assets.length > 0
                ? assets.reduce(
                      (latest, asset) =>
                          asset.createdAt > latest ? asset.createdAt : latest,
                      assets[0].createdAt,
                  )
                : null;

        // current value = suma estimatedValue assetów
        const currentValue = assets.reduce(
            (sum, asset) => sum + (asset.estimatedValue ?? 0),
            0,
        );

        // baseline = suma ostatnich cen assetów (używane jako prosty "invested" przy uproszczonych danych)
        // uwaga: jeśli ostatnia cena nie istnieje, ignorujemy asset
        const lastPriceTotal = assets.reduce((sum, asset) => {
            if (!asset.lastPrice || !asset.estimatedValue) return sum;
            // wyciągamy poprzednią wartość na podstawie lastPrice
            return sum + asset.lastPrice; // prosty przykład
        }, 0);

        const totalInvested = lastPriceTotal;

        const growth =
            lastPriceTotal > 0
                ? ((currentValue - lastPriceTotal) / lastPriceTotal) * 100
                : 0;

        return {
            id: portfolio.id,
            name: portfolio.name,
            description: portfolio.description ?? undefined,
            assets: assetsCount,
            lastUpdated: lastUpdated ? lastUpdated.toISOString() : '',
            totalValue: currentValue,
            totalInvested,
            change: Number(growth.toFixed(2)),
        };
    });
}
