import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import LoadingOverlay from '../LoadingOverlay';

export default function OAuthCallback() {
    const reqQuery = Object.fromEntries(new URLSearchParams(window.location.search));

    const queryClient = useQueryClient();
    const queryKey = 'OAuthGate';

    const { isSuccess, isError, /*data, error,*/ refetch } = useQuery(queryKey, () =>
        fetchHelper('post', '/v1/login/oauth', { state: reqQuery.state, code: reqQuery.code }),
        { enabled: false }); // disable automatic re/fetch (to prevent infinite loop w/ removeQueries)

    useEffect(() => {
        refetch(); // fire only once by passing dependencies[] to useEffect (below) that do not change

        return function onUnmount() {
            queryClient.removeQueries(queryKey, { exact: true }); // remove the query cache on unmount
        };
    }, [refetch, queryClient]); // dependencies[] to prevent useEffect from firing every render

    if (isError) {
        return <Navigate replace to="/user/login" />;
    }
    if (isSuccess) {
        return <Navigate replace to="/" />;
    }

    return <LoadingOverlay />;
}