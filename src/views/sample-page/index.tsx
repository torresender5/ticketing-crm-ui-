// material-ui

// project imports
import MainCard from 'ui-component/cards/MainCard';
import LatestOrder from './LatestOrder';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {

    return (
        <div className="w-1/2">
            <MainCard title={'1'}>
                <LatestOrder />
            </MainCard>

        </div>
    );
};

export default SamplePage;
