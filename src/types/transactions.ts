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
    lastPrice?: number | null;
    lastPriceAt?: Date | null;
    estimatedValue?: number | null;
    portfolioId: string;
    createdAt: Date;
    updatedAt: Date;
    portfolio: Portfolio;
}

// export interface Transaction {
//     id: string;
//     type: TransactionType;
//     quantity: number;
//     price: number;
//     date: Date;
//     assetId: string;
//     createdAt: Date;
//     updatedAt: Date;
//     asset: Asset;
// }

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
        currency: string; // ✅ dodaj
        portfolio: {
            id: string;
            name: string;
        };
    };
}

// Derived helpers
export function getTransactionTotal(tx: Transaction): number {
    return tx.quantity * tx.price;
}
