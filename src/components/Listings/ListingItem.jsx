import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import LoadingOverlay from '../LoadingOverlay';

export default function ListingItem() {
    const { id } = useParams();
    const { isSuccess, isError, data, error } = useQuery(['item', id], () =>
        fetchHelper('post', '/v1/listings/item', { id: id }));

    if (!isSuccess) {
        return <LoadingOverlay />;
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
                    <button>🗑️<span className="underline">Delete this listing</span></button> :
                    <button><span className="underline">Contact this seller</span></button>
                }
            </section>
        </div >
    );
}