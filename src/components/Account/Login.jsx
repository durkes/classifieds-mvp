// https://tailwindcomponents.com/component/custom-nextauth-login-page
// https://icons.getbootstrap.com/icons/twitter/

export default function Login() {
    return (
        <div class="z-60 fixed top-0 left-0 overflow-auto grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
            <div class="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
                <form class="p-4 md:p-5 lg:p-6">
                    <div class="grid gap-y-3">
                        <button class="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                            <svg style={{ color: 'rgb(203, 213, 225)' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fill="#cbd5e1" d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                            </svg>
                            Sign in with Twitter
                        </button>
                        <button class="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                            <svg style={{ color: 'rgb(203, 213, 225)' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fill="#cbd5e1" d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    <div class="my-3 flex items-center px-3">
                        <hr class="w-full border-slate-600" />
                        <span class="mx-3 text-slate-500">or</span>
                        <hr class="w-full border-slate-600" />
                    </div>

                    <div class="grid gap-y-3">
                        <input type="email" required class="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400" placeholder="email@example.com" />
                        <button class="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                            <svg style={{ color: 'rgb(203, 213, 225)' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                <path fill="#cbd5e1" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                            Sign in with Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function NewUser() {
    return (
        <div class="z-60 fixed top-0 left-0 overflow-auto grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
            <div class="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
                <form class="p-4 md:p-5 lg:p-6">
                    <div class="mb-4 text-center text-slate-500">Let's create an account for you! <span className="text-xl leading-none">🖐️</span></div>

                    <div class="grid gap-y-3">
                        <input type="email" required value="email@example.com" class="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400" />
                        <input type="password" required placeholder="Password" class="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400" />
                        <input type="password" required placeholder="Password (again)" class="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400" />
                        <button class="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}