import { useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import { Navigate } from 'react-router-dom';
import { setCookie } from '../../assets/browser-cookies';

export default function NewPost() {
    const { sessionData } = useContext(SessionContext);

    if (!sessionData.isLoggedIn) {
        setCookie('loginReferrer', '/listings/new', 1);
        return <Navigate replace to="/user/login" />;
    }

    return (
        <div>
            <p>This is the new post page. You can see this page when you're logged in.</p>
        </div>
    );
}