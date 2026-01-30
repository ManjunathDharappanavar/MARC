import { useAssets } from '../hooks/useAssets';
import { useTransactions } from '../hooks/useTransactions';
import TransactionsView from '../components/dashboard/TransactionsView';

const TransactionsPage = () => {
    const { data: assets = [] } = useAssets();
    const { data: transactions = [], isLoading } = useTransactions();

    return <TransactionsView transactions={transactions} isLoading={isLoading} assets={assets} />;
};

export default TransactionsPage;
