import log from 'loglevel';
import * as client from "../services/apiClient";
import React, { createContext, useState, useEffect } from 'react';

export const LiveDataContext = createContext();

export function LiveDataProvider({ children }) {
    const [sessionData, setSessionData] = useState({});
    const [sessionsList, setSessionsList] = useState([]);
    
    const fetchSessionsList  = async () => {
        try {
            log.debug("Fetching live sessions list.")
            if (sessionsList.length === 0){
                try {
                    const data = await client.getSessionList();
                    log.info('Sessions list fetched succesfully.');
                    setSessionsList(data);
                    // return data;
                } catch (error) {
                    log.error('Error fetching sessions list:', error);
                }
            }else{
                log.debug('Returning cached session list summaries.');
                return sessionsList;
            }
        }catch (error) {
                log.error('Error fetching session data:', error);
        }
        
    };
    useEffect(() => {
        fetchSessionsList();
    }, []);
    
    const refreshSessionData = async (session_id) => {
        log.debug('Fetching live data from database.');
        try {
            console.log("test", session_id);
            const data = await client.getSessionData(session_id); // Assuming this method exists and fetches current session data
            log.info(`Session data fetched successfully.`);
            setSessionData(data);
            log.info(`Fetched and cached data for session ID: ${session_id}`);
            return data;
        } catch (error) {
            log.error('Error fetching session data:', error);
        }
    }

    const contextValue = {
        sessionData,
        refreshSessionData,
        sessionsList
    };

    return (
        <LiveDataContext.Provider value={contextValue}>
            {children}
        </LiveDataContext.Provider>
    );
}
