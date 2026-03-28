import { getPortfoliosAction } from '@/actions/portfolio';
import { PortfoliosViewClient } from '@/components/portfolio/portfolios-view.client';

export default async function PortfoliosView() {
    const portfolios = await getPortfoliosAction();

    return <PortfoliosViewClient portfolios={portfolios} />;
}
