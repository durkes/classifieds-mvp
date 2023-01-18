import { Navigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import { setCookie } from '../../assets/browser-cookies';
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
        <h2 className="text-2xl font-bold mb-8">My Listings</h2>

        <div className="-m-4 flex flex-wrap">
            {data.items && data.items.map(item => <ItemPreview {...item} />)}
        </div>
    </>);
}

function ItemPreview({ id, headline, year, mileage, price }) {
    return (
        <Link to={'/listings/item/' + id} className="w-full p-4 md:w-1/2 lg:w-1/4">
            <span className="block h-48 overflow-hidden rounded-lg">
                <img alt={headline} className="h-full w-full object-cover object-center" src={'/img/' + id + '.jpg'} />
            </span>
            <div className="mt-4">
                <h3 className="inline-block text-xs tracking-widest text-slate-500">{year}</h3>
                <h3 className="float-right text-xs tracking-widest text-slate-500">{mileage}🕛</h3>
                <h2 className="leading-snug text-lg font-medium text-slate-900">{headline}</h2>
                <p className="mt-1">{'$' + price}</p>
            </div>
        </Link>
    );
}