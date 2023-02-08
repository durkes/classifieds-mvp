import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import fetchHelper from '../../utils/fetch-helper';
import ListingsCard from './ListingsCard';
import LoadingOverlay from '../LoadingOverlay';

export default function Listings() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [optionSort, setOptionSort] = useState(searchParams.get('sort') || '');
    const [inputYearMin, setInputYearMin] = useState(searchParams.get('yearMin') || '');
    const [inputYearMax, setInputYearMax] = useState(searchParams.get('yearMax') || '');
    const [inputMileageMin, setInputMileageMin] = useState(searchParams.get('mileageMin') || '');
    const [inputMileageMax, setInputMileageMax] = useState(searchParams.get('mileageMax') || '');
    const [inputPriceMin, setInputPriceMin] = useState(searchParams.get('priceMin') || '');
    const [inputPriceMax, setInputPriceMax] = useState(searchParams.get('priceMax') || '');
    const [optionCar, setOptionCar] = useState(searchParams.get('car') === 'true');
    const [optionTruck, setOptionTruck] = useState(searchParams.get('truck') === 'true');
    const [optionSuv, setOptionSuv] = useState(searchParams.get('suv') === 'true');
    const [optionOther, setOptionOther] = useState(searchParams.get('other') === 'true');

    function updateSearch(param, value) {
        if (value) {
            searchParams.set(param, value);
        }
        else {
            searchParams.delete(param);
        }

        searchParams.sort();
        setSearchParams(searchParams);
    }

    return (<>
        <form onSubmit={(e) => e.preventDefault()}>
            <header className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 xl:gap-5 text-sm md:text-base bg-slate-100 p-3 sm:p-4 rounded-2xl">
                <div className="col-span-2">
                    <fieldset className="block">
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <div className="col-span-1">
                                <div>
                                    <label className="inline-flex items-center">
                                        <input className="form-checkbox" type="checkbox" onChange={e => { setOptionCar(e.target.checked); updateSearch('car', e.target.checked); }} checked={optionCar} />
                                        <span className="ml-2">Cars</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input className="form-checkbox" type="checkbox" onChange={e => { setOptionSuv(e.target.checked); updateSearch('suv', e.target.checked); }} checked={optionSuv} />
                                        <span className="ml-2">SUVs</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <label className="inline-flex items-center">
                                        <input className="form-checkbox" type="checkbox" onChange={e => { setOptionTruck(e.target.checked); updateSearch('truck', e.target.checked); }} checked={optionTruck} />
                                        <span className="ml-2">Trucks</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input className="form-checkbox" type="checkbox" onChange={e => { setOptionOther(e.target.checked); updateSearch('other', e.target.checked); }} checked={optionOther} />
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
                            <input onChange={e => setInputYearMin(e.target.value)} onBlur={e => updateSearch('yearMin', e.target.value)} value={inputYearMin} min="1980" max="2030" type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                        </label>
                        <label className="col-span-1 block">
                            <span className="text-slate-700">(max)</span>
                            <input onChange={e => setInputYearMax(e.target.value)} onBlur={e => updateSearch('yearMax', e.target.value)} value={inputYearMax} min="1980" max="2030" type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                        </label>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="col-span-1 block">
                            <span className="text-slate-700 whitespace-nowrap">Mileage (min)</span>
                            <input onChange={e => setInputMileageMin(e.target.value)} onBlur={e => updateSearch('mileageMin', e.target.value)} value={inputMileageMin} min="0" max="250000" type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                        </label>
                        <label className="col-span-1 block">
                            <span className="text-slate-700">(max)</span>
                            <input onChange={e => setInputMileageMax(e.target.value)} onBlur={e => updateSearch('mileageMax', e.target.value)} value={inputMileageMax} min="0" max="250000" type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                        </label>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="col-span-1 block">
                            <span className="text-slate-700 whitespace-nowrap">Price (min)</span>
                            <input onChange={e => setInputPriceMin(e.target.value)} onBlur={e => updateSearch('priceMin', e.target.value)} value={inputPriceMin} min="0" max="250000" type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                        </label>
                        <label className="col-span-1 block">
                            <span className="text-slate-700">(max)</span>
                            <input onChange={e => setInputPriceMax(e.target.value)} onBlur={e => updateSearch('priceMax', e.target.value)} value={inputPriceMax} min="0" max="250000" type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                        </label>
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block">
                        <span className="text-slate-700 whitespace-nowrap">Sort by</span>
                        <select onChange={e => { setOptionSort(e.target.value); updateSearch('sort', e.target.value); }} value={optionSort} className="mt-0.5 form-select text-xs sm:text-sm md:text-base block w-full">
                            <option></option>
                            <option value="-created">New ads first</option>
                            <option value="year">Year</option>
                            <option value="mileage">Mileage</option>
                            <option value="price">Price</option>
                        </select>
                    </label>
                </div>
            </header>
        </form>

        <ListingsCards />
    </>);
}

function ListingsCards() {
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

    return (
        <div className="-mx-4 mt-6 flex flex-wrap">
            {data.items && data.items.map(item => <ListingsCard key={item.id} {...item} />)}
        </div>
    );
}