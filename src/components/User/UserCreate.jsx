import { useState, useEffect, useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import { Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import { getCookie } from '../../assets/browser-cookies';
import LoadingOverlay from '../LoadingOverlay';

// https://tailwindcomponents.com/component/custom-nextauth-login-page
// https://icons.getbootstrap.com/icons/twitter/

export default function LoginEmail() {
    const loginReferrer = getCookie('loginReferrer') || '/';
    const userEmail = getCookie('userEmail');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const { sessionData, setSessionData } = useContext(SessionContext);

    const createUser = useMutation(() => {
        return fetchHelper('post', '/v1/user/create', { username: userEmail, password: password });
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== password2) {
            return alert('The passwords do not match.');
        }

        createUser.mutate();
    }

    useEffect(() => {
        if (createUser.isError) {
            if (createUser?.error?.response?.data?.error?.data?.email?.code === 'validation_is_email') {
                alert('Please use a valid email address.');
            }
            else {
                alert('Something went wrong. Please try again later.');
            }
        }
    }, [createUser.isError]);

    useEffect(() => {
        if (createUser.isSuccess) {
            setSessionData({
                ...sessionData,
                isLoggedIn: getCookie('isLoggedIn'),
                userEmail: getCookie('userEmail')
            });
        }
    }, [createUser.isSuccess]);

    if (createUser.isSuccess) {
        return <Navigate replace to={loginReferrer} />;
    }

    return (<>
        {createUser.isLoading && <LoadingOverlay />}

        <div className="z-40 fixed top-0 left-0 overflow-auto grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
            <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
                <form onSubmit={handleSubmit} className="p-4 md:p-5 lg:p-6">
                    <div className="mb-4 text-center text-slate-500">Let's create an account for you!</div>

                    <div className="grid gap-y-3">
                        <input
                            type="email" disabled className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400 disabled:text-slate-400"
                            value={userEmail}
                        />
                        <input
                            type="password" required autoFocus minLength="8" placeholder="Password" className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            type="password" required placeholder="Password (again)" className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                            value={password2} onChange={e => setPassword2(e.target.value)}
                        />
                        <button type="submit" className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                            Sign me up <span className="text-xl leading-none">🎉</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
}