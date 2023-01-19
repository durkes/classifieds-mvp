import { Link } from 'react-router-dom';

export default function _({ id, headline, year, mileage, price }) {
    return (
        <Link to={'/listings/item/' + id} className="w-full p-4 md:w-1/2 lg:w-1/4">
            <span className="block h-48 overflow-hidden rounded-lg">
                <img alt={headline} className="h-full w-full object-cover object-center" src={'/img/' + id + '.jpg'} />
            </span>
            <div className="mt-4">
                <div class="grid grid-cols-2">
                    <div className="col-span-1 text-xs tracking-widest text-slate-500">{year}</div>
                    <div className="col-span-1 text-right text-xs tracking-widest text-slate-500">{mileage}🕛</div>
                </div>
                <h2 className="mt-1 leading-snug text-lg font-medium text-slate-900">{headline}</h2>
                <p className="mt-1">{'$' + price}</p>
            </div>
        </Link>
    );
}