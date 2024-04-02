import log from 'loglevel';
import * as client from "../services/apiClient";
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const LiveDataContext = createContext();

export function LiveDataProvider({ children }) {
    const [sessionData, setSessionData] = useState({});
    
    const refreshSessionData = async () => {
        log.debug('Fetching live data from database.');
        try {
            const data = await client.getSessionData(); // Assuming this method exists and fetches current session data
            log.info('Session data fetched successfully.');
            setSessionData(data);
        } catch (error) {
            log.error('Error fetching session data:', error);
        }
    }

    const fetchSessionData = async () => {
        if (Object.keys(sessionData).length === 0){
            await refreshSessionData();
        }else {
            return sessionData;
        }
    };

    const contextValue = {
        sessionData,
        refreshSessionData,
        fetchSessionData,
    };

    return (
        <LiveDataContext.Provider value={contextValue}>
            {children}
        </LiveDataContext.Provider>
    );
}
