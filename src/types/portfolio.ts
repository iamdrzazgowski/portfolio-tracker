export interface Portfolio {
    id: number;
    name: string;
    description: string;
    totalValue: number;
    totalInvested: number;
    change: number;
    assets: number;
    lastUpdated: string;
}
