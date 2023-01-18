import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import LoadingOverlay from '../LoadingOverlay';

export default function ListingEdit() {
    const [inputYear, setInputYear] = useState('');
    const [inputMileage, setInputMileage] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [inputType, setInputType] = useState('');
    const [inputHeadline, setInputHeadline] = useState('');
    const [inputDescription, setInputDescription] = useState('');

    const { id } = useParams();
    const { isSuccess, isError, data, error, refetch } = useQuery(['item', id], () =>
        fetchHelper('post', '/v1/listings/item', { id: id }),
        { enabled: false }); // disable automatic re/fetch (to prevent infinite loop w/ removeQueries)

    useEffect(() => {
        refetch(); // fire only once by passing dependencies[] to useEffect (below) that do not change
    }, [refetch]); // dependencies[] to prevent useEffect from firing every render

    const submitData = useMutation(() => {
        return fetchHelper('post', '/v1/listings/update', {
            id: id,
            year: inputYear,
            mileage: inputMileage,
            price: inputPrice,
            type: inputType,
            headline: inputHeadline,
            description: inputDescription,
        });
    });

    function handleSubmit(e) {
        e.preventDefault();
        submitData.mutate();
    }

    useEffect(() => {
        if (submitData.isError) {
            if (submitData?.error?.response?.status === 401) {
                alert('Uh oh. It looks like you\'re not signed in!');
            }
            else {
                alert('Something went wrong. Please try again later.');
            }
        }
    }, [submitData.isError]);

    useEffect(() => {
        if (isSuccess) {
            setInputYear(data.year);
            setInputMileage(data.mileage);
            setInputPrice(data.price);
            setInputType(data.type);
            setInputHeadline(data.headline);
            setInputDescription(data.description);
        }
    }, [isSuccess]);

    if (!isSuccess) {
        return <LoadingOverlay />;
    }

    if (submitData.isSuccess) {
        const postUrl = '/listings/item/' + submitData.data.id;
        return <Navigate replace to={postUrl} />;
    }

    return (<>
        {submitData.isLoading && <LoadingOverlay />}

        <div>
            <h2 className="text-2xl font-bold">Edit your listing</h2>
            <p className="mt-2 text-lg text-slate-600">Need to make changes? No problem.</p>
            <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <div className="grid gap-5">
                            <label className="block">
                                <span className="text-slate-700">Year</span>
                                <input onChange={(e) => { setInputYear(e.target.value); }} value={inputYear} required min="1980" max="2030" type="number" className="mt-1 block w-full" placeholder="" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">Mileage</span>
                                <input onChange={(e) => { setInputMileage(e.target.value); }} value={inputMileage} required min="0" max="250000" type="number" className="mt-1 block w-full" placeholder="e.g. 50000" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">Asking price (we'll add the $dollar sign later)</span>
                                <input onChange={(e) => { setInputPrice(e.target.value); }} value={inputPrice} required min="0" max="250000" type="number" className="mt-1 block w-full" placeholder="$16,000 = 16000" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">Type</span>
                                <select onChange={(e) => { setInputType(e.target.value); }} value={inputType} required className="block w-full mt-1">
                                    <option></option>
                                    <option>Car</option>
                                    <option>Truck</option>
                                    <option>SUV</option>
                                    <option>Other</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="grid gap-5">
                            <label className="block">
                                <span className="text-slate-700">Make, model, color</span>
                                <input onChange={(e) => { setInputHeadline(e.target.value); }} value={inputHeadline} required type="text" className="mt-1 block w-full" placeholder="e.g. Nissan Altima, black exterior, tan leather interior" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">What else would you like to tell potential buyers? Put as much here as you'd like.</span>
                                <textarea onChange={(e) => { setInputDescription(e.target.value); }} value={inputDescription} required className="mt-1 block w-full" rows="6"></textarea>
                            </label>
                            <div className="block">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Let's go!
                                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>);
}