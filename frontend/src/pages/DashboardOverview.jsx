import { useAssets } from '../hooks/useAssets';
import { useTransactions } from '../hooks/useTransactions';
import DashboardView from '../components/dashboard/DashboardView';

const DashboardOverview = () => {
    const { data: assets = [], isLoading: assetsLoading } = useAssets();
    const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();

    return (
        <DashboardView
            assets={assets}
            transactions={transactions}
            assetsLoading={assetsLoading}
            transactionsLoading={transactionsLoading}
        />
    );
};

export default DashboardOverview;
