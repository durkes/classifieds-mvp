import { useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import { Navigate } from 'react-router-dom';
import { setCookie } from '../../assets/browser-cookies';

export default function NewPost() {
    const { sessionData } = useContext(SessionContext);

    // if (!sessionData.isLoggedIn) {
    // setCookie('loginReferrer', '/listings/new', 1);
    // return <Navigate replace to="/user/login" />;
    // }

    return (
        <div>
            <h2 className="text-2xl font-bold">Tell us about your car!</h2>
            <p className="mt-2 text-lg text-slate-600">Fill in the details here, and you can attach a photo next.</p>
            <form className="mt-6 md:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <div className="grid gap-5">
                            <label className="block">
                                <span className="text-slate-700">Year</span>
                                <input required min="1980" max="2030" type="number" className="mt-1 block w-full" placeholder="" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">Mileage</span>
                                <input required min="0" max="250000" type="number" className="mt-1 block w-full" placeholder="e.g. 50000" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">Asking price (we'll add the $dollar sign later)</span>
                                <input required min="0" max="250000" type="number" className="mt-1 block w-full" placeholder="$12,000 = 12000" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">Type</span>
                                <select required className="block w-full mt-1">
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
                                <input required type="text" className="mt-1 block w-full" placeholder="e.g. Nissan Altima, black exterior, tan leather interior" />
                            </label>
                            <label className="block">
                                <span className="text-slate-700">What else would you like to tell potential buyers? Put as much here as you'd like.</span>
                                <textarea required className="mt-1 block w-full" rows="6"></textarea>
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
    );
}