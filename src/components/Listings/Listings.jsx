import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchHelper from '../../utils/fetch-helper';
import LoadingOverlay from '../LoadingOverlay';

export default function Listings() {
    const { isSuccess, isError, data, error } = useQuery('listings', () =>
        fetchHelper('post', '/v1/listings', {}), { retry: 6 });

    useEffect(() => {
        if (isError) {
            alert('Something went wrong. Please try again later.');
        }
    }, [isError]);

    if (!isSuccess) {
        return <LoadingOverlay />;
    }

    return (<>
        <header className="mb-8 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 xl:gap-5 text-sm md:text-base bg-slate-100 p-3 sm:p-4 rounded-2xl">
            <div className="col-span-2">
                <fieldset className="block">
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <div>
                                <label className="inline-flex items-center">
                                    <input className="form-checkbox" type="checkbox" />
                                    <span className="ml-2">Cars</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input className="form-checkbox" type="checkbox" />
                                    <span className="ml-2">SUVs</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <label className="inline-flex items-center">
                                    <input className="form-checkbox" type="checkbox" />
                                    <span className="ml-2">Trucks</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input className="form-checkbox" type="checkbox" />
                                    <span className="ml-2">Other</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-2 gap-2">
                    <label className="col-span-1 block">
                        <span className="text-slate-700 whitespace-nowrap">Year (min)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                    <label className="col-span-1 block">
                        <span className="text-slate-700">(max)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-2 gap-2">
                    <label className="col-span-1 block">
                        <span className="text-slate-700 whitespace-nowrap">Mileage (min)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                    <label className="col-span-1 block">
                        <span className="text-slate-700">(max)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-2 gap-2">
                    <label className="col-span-1 block">
                        <span className="text-slate-700 whitespace-nowrap">Price (min)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                    <label className="col-span-1 block">
                        <span className="text-slate-700">(max)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <label className="block">
                    <span className="text-slate-700 whitespace-nowrap">Sort by</span>
                    <select className="mt-0.5 form-select text-xs sm:text-sm md:text-base block w-full">
                        <option>New ads first</option>
                        <option>Price</option>
                        <option>Year</option>
                        <option>Mileage</option>
                    </select>
                </label>
            </div>
        </header>

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