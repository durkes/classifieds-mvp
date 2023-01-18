import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import { MyAccount, UserCreate, Login, LoginEmail, OAuthCallback, Logout } from './User';
import { Listings, ListingItem, MyListings, MyFavorites, ListingCreate, ListingEdit } from './Listings';

export default function BaseLayout() {
    return (
        <div className="text-slate-800">
            <Navbar />
            <main className="container xl:max-w-6xl mx-auto mt-8 xl:mt-10 px-3 mb-12">
                <Routes>
                    <Route path="/listings/find" element={<Listings />} />
                    <Route path="/listings/item/:id" element={<ListingItem />} />
                    <Route path="/listings/new" element={<ListingCreate />} />
                    <Route path="/listings/edit/:id" element={<ListingEdit />} />
                    <Route path="/listings/mine" element={<MyListings />} />
                    <Route path="/listings/saved" element={<MyFavorites />} />
                    <Route path="/user/account" element={<MyAccount />} />
                    <Route path="/user/create" element={<UserCreate />} />
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/user/login/email" element={<LoginEmail />} />
                    <Route path="/user/login/callback" element={<OAuthCallback />} />
                    <Route path="/user/logout" element={<Logout />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
        </div>
    );
}