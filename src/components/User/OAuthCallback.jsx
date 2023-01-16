import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import LoadingOverlay from '../LoadingOverlay';

export default function OAuthCallback() {
    const reqQuery = Object.fromEntries(new URLSearchParams(window.location.search));

    const queryClient = useQueryClient();
    const queryKey = 'OAuthGate';

    const { isSuccess, isError, data, error, refetch } = useQuery(queryKey, () =>
        confirmOAuth({ state: reqQuery.state, code: reqQuery.code }), { enabled: false });

    useEffect(() => {
        // useQuery {enabled: false} (above) disables automatic re/fetch (to prevent infinite loop w/ removeQueries)
        refetch(); // call refetch only once by passing dependencies[] to useEffect (below) that will not change

        return function onUnmount() {
            queryClient.removeQueries(queryKey, { exact: true }); // remove the query cache on unmount
        };
    }, [refetch, queryClient]); // dependencies[] to prevent useEffect from firing every render

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    if (isSuccess) {
        return <Navigate replace to="/" />;
    }

    return <LoadingOverlay />;
}

async function confirmOAuth(payload) {
    const url = '/oauth/confirm';
    const result = await axios.post(url, payload);
    return result.data;
}