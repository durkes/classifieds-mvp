import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import fetchHelper from '../../utils/fetch-helper';
import LoadingOverlay from '../LoadingOverlay';

export default function ListingItem() {
    const { id } = useParams();
    const { isSuccess, isError, data, error } = useQuery(['item', id], () =>
        fetchHelper('post', '/v1/listings/item', { id: id }));

    const deleteItem = useMutation(() => {
        return fetchHelper('post', '/v1/listings/delete', { id: id });
    });
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this listing? This cannot be undone.')) {
            deleteItem.mutate();
        }
    }

    useEffect(() => {
        if (isError) {
            if (error?.response?.status === 404) {
                alert('We couldn\'t find that listing.');
            }
            else {
                alert('Something went wrong. Please try again later.');
            }
        }
    }, [isError]);

    if (isError) {
        return <Navigate to="/listings/find" />;
    }
    if (!isSuccess) {
        return <LoadingOverlay />;
    }

    if (deleteItem.isSuccess) {
        return <Navigate replace to="/listings/mine" />;
    }

    return (
        <div className="grid md:grid-cols-7 gap-6">
            <aside className="md:col-span-3">
                <img className="rounded-lg" src={'/img/' + id + '.jpg'} alt={data.headline} />
            </aside>
            <section className="md:col-span-4 prose prose-slate">
                <h2 className="mb-2">{data.year} {data.headline}</h2>
                <div>
                    <span className="bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        {data.type}
                    </span>
                    <span className="pr-1 bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        {data.mileage}<span className="ml-0.5">🕛</span>
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        {'$' + data.price}
                    </span>
                    <button className="float-right text-xs tracking-wide uppercase">Favorite <span className="text-lg">◻️⭐️</span></button>
                </div>
                <p>{data.description}</p>
                {data.isOwner ?
                    <>
                        <Link to={'/listings/edit/' + id}>Edit this listing</Link>
                        <button onClick={handleDelete} className="ml-3">🗑️<span className="underline">Delete this listing</span></button>
                    </> :
                    <button><span className="underline">Contact this seller</span></button>
                }
            </section>
        </div>
    );
}