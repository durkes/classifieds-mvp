import { useEffect, useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import { Navigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import { getCookie } from '../../assets/browser-cookies';
import LoadingOverlay from '../LoadingOverlay';

export default function Logout() {
    const { sessionData, setSessionData } = useContext(SessionContext);

    const queryClient = useQueryClient();
    const queryKey = 'logout';

    const { isSuccess, isError, /*data, error,*/ refetch } = useQuery(queryKey, () =>
        fetchHelper('get', '/v1/logout', {}),
        { enabled: false }); // disable automatic re/fetch (to prevent infinite loop w/ removeQueries)

    useEffect(() => {
        refetch(); // fire only once by passing dependencies[] to useEffect (below) that do not change

        return function onUnmount() {
            queryClient.removeQueries(queryKey, { exact: true }); // remove the query cache on unmount
        };
    }, [refetch, queryClient]); // dependencies[] to prevent useEffect from firing every render

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
        return <Navigate replace to="/" />;
    }

    return <LoadingOverlay />;
}