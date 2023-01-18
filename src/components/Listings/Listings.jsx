export default function Listings() {
    return (<>
        <header className="mb-8 grid grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-4 xl:gap-6 text-xs sm:text-sm md:text-base bg-slate-100 p-2 sm:p-4 rounded-2xl">
            <div className="col-span-2">
                <fieldset className="block">
                    <legend className="text-gray-700 whitespace-nowrap">Vehicle type</legend>
                    <div className="mt-0.5 grid grid-cols-2 gap-1 sm:gap-2">
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
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    <label className="col-span-1 block">
                        <span className="text-gray-700 whitespace-nowrap">Year (min)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                    <label className="col-span-1 block">
                        <span className="text-gray-700">(max)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    <label className="col-span-1 block">
                        <span className="text-gray-700 whitespace-nowrap">Mileage (min)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                    <label className="col-span-1 block">
                        <span className="text-gray-700">(max)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    <label className="col-span-1 block">
                        <span className="text-gray-700 whitespace-nowrap">Price (min)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                    <label className="col-span-1 block">
                        <span className="text-gray-700">(max)</span>
                        <input type="number" className="mt-0.5 form-input text-xs sm:text-sm md:text-base block w-full" />
                    </label>
                </div>
            </div>
            <div className="col-span-1">
                <label className="block">
                    <span className="text-gray-700 whitespace-nowrap">Sort by</span>
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
            <div className="w-full p-4 md:w-1/2 lg:w-1/4 cursor-pointer">
                <span className="block h-48 overflow-hidden rounded-lg">
                    <img alt="Title of listing" className="h-full w-full object-cover object-center" src="https://images.craigslist.org/00Y0Y_1tuTErtSfYQ_0uY0ne_600x450.jpg" />
                </span>
                <div className="mt-4">
                    <h3 className="inline-block text-xs tracking-widest text-gray-500">2013</h3>
                    <h3 className="float-right text-xs tracking-widest text-gray-500">60,543🕛</h3>
                    <h2 className="leading-snug text-lg font-medium text-gray-900">Nissan Altima, black exterior, tan leather interior</h2>
                    <p className="mt-1">$7,900</p>
                </div>
            </div>

        </div>
    </>);
}