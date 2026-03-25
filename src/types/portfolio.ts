export interface Portfolio {
    id: string;
    name: string;
    description?: string;
    assets: number;
    lastUpdated: string;
    totalValue: number;
    totalInvested?: number;
    change: number;
}
