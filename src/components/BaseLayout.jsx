import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import { MyAccount, Login, OAuthCallback, Logout } from './Account';
import { Listings, MyListings, MyFavorites, NewPost } from './Listings';

export default function BaseLayout() {
    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 relative">
            <Navbar />
            <div className="container mx-auto">
                <Routes>
                    <Route exact path={'/'} element={<Home />} />
                    <Route exact path={'/listings'} element={<Listings />} />
                    <Route exact path={'/listings/new'} element={<NewPost />} />
                    <Route exact path={'/listings/mine'} element={<MyListings />} />
                    <Route exact path={'/listings/saved'} element={<MyFavorites />} />
                    <Route exact path={'/account'} element={<MyAccount />} />
                    <Route exact path={'/login'} element={<Login />} />
                    <Route exact path={'/login/callback'} element={<OAuthCallback />} />
                    <Route exact path={'/logout'} element={<Logout />} />
                </Routes>
            </div>
        </div>
    );
}