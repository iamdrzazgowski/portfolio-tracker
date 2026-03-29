export type AssetType = 'STOCK' | 'CRYPTO' | 'COLLECTIBLE' | 'ETF' | 'OTHER';
export type TransactionType = 'BUY' | 'SELL';

export interface Portfolio {
    id: string;
    name: string;
}

export interface Asset {
    id: string;
    name: string;
    symbol: string;
    type: AssetType;
    currency: string;
    cryptoId?: string | null;
    lastPrice?: number | null;
    lastPriceAt?: Date | null;
    estimatedValue?: number | null;
    portfolioId: string;
    createdAt: Date;
    updatedAt: Date;
    portfolio: Portfolio;
}

export interface AssetSearchResult {
    symbol: string;
    name: string;
    type: 'STOCK' | 'ETF' | 'CRYPTO' | 'COLLECTIBLE';
    cryptoId?: string | null;
}

export interface Transaction {
    id: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    date: Date;
    asset: {
        name: string;
        symbol: string;
        type: string;
        currency: string;
        cryptoId?: string | null;
        portfolio: {
            id: string;
            name: string;
        };
    };
}

export function getTransactionTotal(tx: Transaction): number {
    return tx.quantity * tx.price;
}
