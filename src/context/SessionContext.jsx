import { createContext } from 'react';

const SessionContext = createContext({
    sessionData: {},
    setSessionData: () => { },
});

export default SessionContext;