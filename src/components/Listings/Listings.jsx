import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import useStateParams from '../../utils/useStateParams';
import fetchHelper from '../../utils/fetch-helper';
import ListingsCard from './ListingsCard';
import LoadingOverlay from '../LoadingOverlay';

export default function Listings() {
    const [optionSort, setOptionSort] = useStateParams(
        'created',
        'sort',
        (s) => s.toString(),
        (s) => s.toString()
    );

    const [searchParams, setSearchParams] = useSearchParams();
    const { isSuccess, isError, data, error } = useQuery(['listings', ...searchParams], () =>
        fetchHelper('post', '/v1/listings', Object.fromEntries([...searchParams])), { retry: 6 });

    useEffect(() => {
        if (isError) {
            alert('Something went wrong. Please try again later.');
        }
    }, [isError]);

    if (!isSuccess) {
        return <LoadingOverlay />;
    }

    return (<>
        <header className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 xl:gap-5 text-sm md:text-base bg-slate-100 p-3 sm:p-4 rounded-2xl">
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
                    <select onChange={(e) => { setOptionSort(e.target.value); }} value={optionSort} className="mt-0.5 form-select text-xs sm:text-sm md:text-base block w-full">
                        <option></option>
                        <option value="-created">New ads first</option>
                        <option value="price">Price</option>
                        <option value="year">Year</option>
                        <option value="mileage">Mileage</option>
                    </select>
                </label>
            </div>
        </header>

        <div className="-mx-4 mt-6 flex flex-wrap">
            {data.items && data.items.map(item => <ListingsCard key={item.id} {...item} />)}
        </div>
    </>);
}