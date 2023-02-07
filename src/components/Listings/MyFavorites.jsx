import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchHelper from '../../utils/fetch-helper';
import { setCookie } from '../../utils/browser-cookies';
import ListingsCard from './ListingsCard';
import LoadingOverlay from '../LoadingOverlay';

export default function MyFavotires() {
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
        <h2 className="text-2xl font-bold">My Favorites</h2>
        <p className="mt-2 text-lg text-slate-600">This function is under construction...</p>

        <div className="-mx-4 mt-6 flex flex-wrap">
            {data.items && data.items.map(item => <ListingsCard key={item.id} {...item} />)}
        </div>
    </>);
}