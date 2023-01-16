import { useState } from 'react';
import { useMutation } from 'react-query';
import fetchHelper from '../../assets/fetch-helper';
import { getCookie } from '../../assets/browser-cookies';
import LoadingOverlay from '../LoadingOverlay';

// https://tailwindcomponents.com/component/custom-nextauth-login-page
// https://icons.getbootstrap.com/icons/twitter/

export default function LoginEmail() {
    const _userEmail = getCookie('userEmail');
    const [userEmail, setUserEmail] = useState(_userEmail);
    const [password, setPassword] = useState('');
    const checkLogin = useMutation(() => {
        return fetchHelper('post', '/v1/login/email', { username: userEmail, password: password });
    });

    function handleSubmit(e) {
        e.preventDefault();
        checkLogin.mutate();
    }

    if (checkLogin.isSuccess) {
        alert(JSON.stringify(checkLogin));
    }
    if (checkLogin.isError) {
        alert('Something went wrong. Please try again later.');
    }

    return (<>
        {checkLogin.isLoading && <LoadingOverlay />}

        <div className="z-40 fixed top-0 left-0 overflow-auto grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
            <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
                <form onSubmit={handleSubmit} className="p-4 md:p-5 lg:p-6">
                    <div className="mb-4 text-center text-slate-500">Let's make sure it's you <span className="text-xl leading-none">🔒</span></div>

                    <div className="grid gap-y-3">
                        <input
                            type="email" disabled className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400 disabled:text-slate-400"
                            value={userEmail}
                        />
                        <input
                            type="password" required autoFocus placeholder="Password" className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit" className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                            <svg style={{ color: 'rgb(203, 213, 225)' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                <path fill="#cbd5e1" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                            Sign in with Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
}