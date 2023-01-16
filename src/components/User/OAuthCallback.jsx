import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingOverlay from '../LoadingOverlay';

export default function OAuthCallback() {
    const reqQuery = Object.fromEntries(new URLSearchParams(window.location.search));
    const { isLoading, isError, data, error } = useQuery('OAuth', () => confirmOAuth({ state: reqQuery.state, code: reqQuery.code }));

    if (isLoading) {
        return <LoadingOverlay />;
    }
    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    // success
    return <Navigate replace to="/" />;
}

async function confirmOAuth(payload) {
    const url = '/oauth/confirm';
    const result = await axios.post(url, payload);
    return result.data;
}