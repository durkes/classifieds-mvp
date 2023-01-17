import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SessionContext from './context/SessionContext';
import BaseLayout from './components/BaseLayout';
import { getCookie } from './assets/browser-cookies';
import './App.css';

function App() {
    const sessionDataInit = {
        isLoggedIn: getCookie('isLoggedIn'),
        userEmail: getCookie('userEmail')
    };

    const [sessionData, setSessionData] = useState(sessionDataInit);
    const sessionDataState = { sessionData, setSessionData };
    const queryClient = new QueryClient();

    useEffect(() => {
        document.title = 'Auto Classifieds - Buy & Sell Cars';
    });

    return (
        <SessionContext.Provider value={sessionDataState}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <BaseLayout />
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionContext.Provider>
    );
}

export default App;