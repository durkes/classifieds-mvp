import { useState, useEffect } from 'react';

export default function Navbar() {
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleAnyClick = () => {
            // setTimeout to avoid conflict with onClick
            setTimeout(() => {
                // close each menu if open 
                navMenuOpen && setNavMenuOpen(false);
                userMenuOpen && setUserMenuOpen(false);
            }, 0);
        };

        document.addEventListener('click', handleAnyClick, true);

        return () => {
            // clean up
            document.removeEventListener('click', handleAnyClick, true);
        };
    }, [navMenuOpen, userMenuOpen]); // skip effect if values have not changed

    const avatars = ['👱', '👩', '👦', '👧', '👨', '👶', '🙂', '😀', '😃', '😉', '🤖', '👽'];
    const randomAvatar = randomItem(avatars);

    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    const navMenu = [
        { label: 'View Listings 🔍', href: './' },
        { label: 'Sell Your Car <span class="text-lg leading-none">🏷️</span>', href: './' },
    ];

    const userMenu = [
        { label: 'My Favorites ⭐️', href: './' },
        { label: 'My Listings', href: './' },
        { label: 'New Listing <span class="text-lg leading-none">🚗</span>', href: './' },
        { label: 'Settings 🔧', href: './' },
        { label: 'Sign out', href: './' },
    ];

    return (
        <nav className="bg-white border-gray-200 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="./" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"><span className="text-3xl sm:text-4xl mr-0.5">🚘</span>Auto Classifieds</span>
                </a>
                <div className="flex items-center md:order-2">
                    <button onClick={() => setUserMenuOpen(!userMenuOpen)} type="button" className="flex mr-3 text-sm bg-gray-200 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={userMenuOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <span className="text-3xl">{randomAvatar}</span>
                    </button>
                    <div className={`z-50 absolute top-12 right-1 ${!userMenuOpen ? 'hidden' : ''} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{/*Real Name*/}</span>
                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">email@address.com</span>
                        </div>
                        <ul className="py-1" aria-labelledby="user-menu-button">
                            {userMenu.map((item, i) =>
                                <li key={i}>
                                    <a href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" dangerouslySetInnerHTML={{ __html: item.label }}></a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <button onClick={() => setNavMenuOpen(!navMenuOpen)} data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded={navMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${!navMenuOpen ? 'hidden' : ''} w-full md:flex md:w-auto md:order-1`} id="mobile-menu">
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="./" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Current Page</a>
                        </li>
                        {navMenu.map((item, i) =>
                            <li key={i}>
                                <a href={item.href} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" dangerouslySetInnerHTML={{ __html: item.label }}></a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}