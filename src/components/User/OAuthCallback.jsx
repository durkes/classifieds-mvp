import { useEffect, useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import { Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import fetchHelper from '../../utils/fetch-helper';
import { getCookie } from '../../utils/browser-cookies';
import LoadingOverlay from '../LoadingOverlay';

export default function OAuthCallback() {
    const loginReferrer = getCookie('loginReferrer') || '/';
    const reqQuery = Object.fromEntries(new URLSearchParams(window.location.search));
    const { sessionData, setSessionData } = useContext(SessionContext);

    const { isSuccess, isError, /*data, error,*/ mutate } = useMutation(() => {
        return fetchHelper('post', '/v1/login/oauth', { state: reqQuery.state, code: reqQuery.code });
    });

    useEffect(() => {
        mutate(); // run once on load
    }, [mutate]);

    useEffect(() => {
        if (isSuccess) {
            setSessionData({
                ...sessionData,
                isLoggedIn: getCookie('isLoggedIn'),
                userEmail: getCookie('userEmail')
            });
        }
    }, [isSuccess]);

    if (isError) {
        return <Navigate replace to="/user/login" />;
    }
    if (isSuccess) {
        return <Navigate replace to={loginReferrer} />;
    }

    return <LoadingOverlay />;
}