import log from 'loglevel';
import { useContext, useEffect, useState } from 'react';
import { LiveDataContext } from '../../../data/LiveDataContext';

export const useLiveDashboard = () => {
    const { sessionData, refreshSessionData, sessionsList } = useContext(LiveDataContext);
    const [loading, setLoading] = useState(true);
    const [selectedStrategyId, setSelectedStrategyId] = useState(sessionsList[0]);

    const loadLiveSessionData = async () => {
        setLoading(true);
        try {
            await refreshSessionData(selectedStrategyId);
            log.info('Live data refreshed successfully.');
        } catch (error) {
            log.error(`Failed to refresh live session data.`, error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadLiveSessionData();
    }, [selectedStrategyId]);

    // Manual refresh always triggers a re-fetch, regardless of existing data.
    const handleRefreshClick = async () => {
        log.debug(`Manual refresh of live session data.`);
        setLoading(true);
        try {
            await refreshSessionData(selectedStrategyId);
            log.info('Live data refreshed successfully.');
        } catch (error) {
            log.error(`Failed to refresh live session data: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle changing the selected session
    const handleSessionChange = (e) => {
        const newSessionId = e.target.value;
        setSelectedStrategyId(newSessionId);
    };


    return {
        loading,
        sessionData,
        handleRefreshClick,
        selectedStrategyId, 
        sessionsList,
        handleSessionChange 
    };
};
