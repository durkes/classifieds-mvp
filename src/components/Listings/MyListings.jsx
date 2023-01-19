import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchHelper from '../../utils/fetch-helper';
import { setCookie } from '../../utils/browser-cookies';
import ListingsCard from './ListingsCard';
import LoadingOverlay from '../LoadingOverlay';

export default function Listings() {
    const { isSuccess, isError, data, error } = useQuery(['listings', 1], () =>
        fetchHelper('post', '/v1/listings/mine', {}));

    if (isError) {
        setCookie('loginReferrer', '/listings/mine', 1);
        return <Navigate to="/user/login" />;
    }

    if (!isSuccess) {
        return <LoadingOverlay />;
    }

    return (<>
        <h2 className="text-2xl font-bold">My Listings</h2>

        <div className="-mx-4 mt-6 flex flex-wrap">
            {data.items && data.items.map(item => <ListingsCard {...item} />)}
        </div>
    </>);
}