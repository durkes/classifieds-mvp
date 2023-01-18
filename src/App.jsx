import { useState, useEffect } from 'react';
import SessionContext from './context/SessionContext';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getCookie } from './utils/browser-cookies';
import BaseLayout from './components/BaseLayout';
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