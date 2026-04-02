import { assetsRepository } from '../repositories/assets.repository';

export async function getUserAssets(userId: string) {
    if (!userId) throw new Error('User ID is required');

    const assets = await assetsRepository.getUserAssets(userId);

    if (!assets) throw new Error('No assets found');
    return assets;
}
