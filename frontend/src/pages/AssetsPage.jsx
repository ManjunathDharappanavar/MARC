import { useAssets } from '../hooks/useAssets';
import AssetsView from '../components/dashboard/AssetsView';

const AssetsPage = () => {
    const { data: assets = [], isLoading } = useAssets();

    return <AssetsView assets={assets} isLoading={isLoading} />;
};

export default AssetsPage;
