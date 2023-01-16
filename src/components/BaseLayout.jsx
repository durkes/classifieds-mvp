import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import { MyAccount, UserCreate, Login, LoginEmail, OAuthCallback, Logout } from './User';
import { Listings, MyListings, MyFavorites, NewPost } from './Listings';

export default function BaseLayout() {
    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 relative">
            <Navbar />
            <div className="container mx-auto">
                <Routes>
                    <Route path="/listings/view" element={<Listings />} />
                    <Route path="/listings/new" element={<NewPost />} />
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
            </div>
        </div>
    );
}