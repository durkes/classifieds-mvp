import { useState, useEffect, useContext } from 'react';
import SessionContext from '../context/SessionContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setCookie } from '../assets/browser-cookies';

export default function Navbar() {
    const location = useLocation();

    const { sessionData } = useContext(SessionContext);
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

    const navigate = useNavigate();
    function handleUserMenuClick() {
        if (sessionData.isLoggedIn) {
            setUserMenuOpen(!userMenuOpen);
        }
        else {
            const loginReferrer = location.pathname + location.search + location.hash;
            setCookie('loginReferrer', loginReferrer, 1);
            navigate('/user/login', { replace: false });
        }
    }

    let avatar = '👤';
    if (sessionData.isLoggedIn) {
        const avatars = ['👱', '👩', '👦', '👧', '👨', '👶', '🙂', '😀', '😃', '😉', '🤖', '👽'];
        avatar = randomItem(avatars);
    }

    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    const navMenu = [
        { label: 'View Listings 🔍', href: '/listings/find' },
        { label: 'Sell Your Car <span class="text-lg leading-none">🏷️</span>', href: '/listings/new' },
    ];

    const userMenu = [
        { label: 'My Favorites ⭐️', href: '/listings/saved' },
        { label: 'My Listings', href: '/listings/mine' },
        { label: 'New Listing <span class="text-lg leading-none">🚗</span>', href: '/listings/new' },
        { label: 'My Account 🔧', href: '/user/account' },
        { label: 'Sign out', href: '/user/logout' },
    ];

    return (
        <nav className="bg-white drop-shadow-md dark:bg-slate-900">
            <div className="relative container xl:max-w-6xl mx-auto py-3 px-2 flex flex-wrap items-center justify-between">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"><span className="text-3xl sm:text-4xl mr-0.5">🚘</span>Auto Classifieds</span>
                </Link>
                <div className="flex items-center md:order-2">
                    <button onClick={handleUserMenuClick} type="button" className="flex mr-3 text-sm bg-slate-200 rounded-full md:mr-0 focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600" id="user-menu-button" aria-expanded={userMenuOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <span className="text-3xl">{avatar}</span>
                    </button>
                    <div className={`z-20 absolute top-12 right-1 ${!userMenuOpen ? 'hidden' : ''} my-4 text-base list-none bg-white divide-y divide-slate-100 rounded shadow dark:bg-slate-700 dark:divide-slate-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-slate-900 dark:text-white">{/*Real Name*/}</span>
                            <span className="block text-sm font-medium text-slate-500 truncate dark:text-slate-400">{sessionData.userEmail}</span>
                        </div>
                        <ul className="py-1" aria-labelledby="user-menu-button">
                            {userMenu.map((item, i) =>
                                <li key={i}>
                                    <UserMenuLink to={item.href} label={item.label} location={location} />
                                </li>
                            )}
                        </ul>
                    </div>
                    <button onClick={() => setNavMenuOpen(!navMenuOpen)} data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600" aria-controls="mobile-menu" aria-expanded={navMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${!navMenuOpen ? 'hidden' : ''} w-full md:flex md:w-auto md:order-1`} id="mobile-menu">
                    <ul className="flex flex-col p-4 mt-4 border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700">
                        {navMenu.map((item, i) =>
                            <li key={i}>
                                <NavMenuLink to={item.href} label={item.label} location={location} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

// https://flowbite.com/docs/components/navbar/#user-menu-dropdown
function NavMenuLink({ to, label, location }) {
    const currentPage = location.pathname === to;

    let className = 'block rounded py-2 pl-3 pr-4 text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-slate-400 md:dark:hover:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700';
    if (currentPage) {
        className = 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white';
    }

    return (
        <Link to={to} className={className} aria-current={currentPage && 'page'} dangerouslySetInnerHTML={{ __html: label }} />
    );
}

function UserMenuLink({ to, label, location }) {
    const currentPage = location.pathname === to;

    let className = 'block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white';
    if (currentPage) {
        className = 'block px-4 py-2 text-sm text-slate-700 bg-slate-100 dark:bg-slate-600 dark:text-white';
    }

    return (
        <Link to={to} className={className} aria-current={currentPage && 'page'} dangerouslySetInnerHTML={{ __html: label }} />
    );
}