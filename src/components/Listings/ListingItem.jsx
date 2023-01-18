export default function ListingItem() {
    return (
        <div class="grid md:grid-cols-7 gap-6">
            <aside className="col-span-3">
                <img src="https://images.craigslist.org/00Y0Y_1tuTErtSfYQ_0uY0ne_600x450.jpg" alt="Vehicle for sale" />
            </aside>
            <section className="col-span-4 prose">
                <h2 className="mb-2">2013 Nissan Altima, black exterior, tan leather interior</h2>
                <div>
                    <span class="bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        Car
                    </span>
                    <span class="pr-1 bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        60,543<span className="ml-0.5">🕛</span>
                    </span>
                    <span class="bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        $7,900
                    </span>
                    <button className="float-right mr-2 text-indigo-600 text-xs font-medium tracking-wide uppercase">Favorite <span className="text-lg">◻️⭐️</span></button>
                </div>
                <p>
                    selling my 2013 Nissan Maxima SV, clean title, 194000 miles on it. Transmission recently replaced with a brand new one.

                    According to KBB, fair condition low price is $4,172. condition is better than just "fair", only marked as fair for the few issues mentioned below.

                    priced to sell.

                    6 cylinder engine.
                    Sunroof.
                    Backup Camera.
                    Premium bose sound system.
                    Light beige leather seats.

                    The bad:
                    -Paint scratches/scrape on the rear bumper right side (see 6th picture)
                    -Leak in power steering fluid (Power steering works but you have to keep toping it up every few days)
                    -Needs O2 sensor (to pass inspection, but runs and drives fine)
                </p>
                <a href="/">Contact this seller</a> <button>🗑️<span className="underline">Delete this listing</span></button>
            </section>
        </div >
    );
}