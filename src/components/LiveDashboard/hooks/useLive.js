import log from 'loglevel';
import { useContext, useEffect, useState } from 'react';
import { LiveDataContext } from '../../../data/LiveDataContext';

export const useLiveDashboard = () => {
    const { sessionData, fetchSessionData, refreshSessionData } = useContext(LiveDataContext);
    const [loading, setLoading] = useState(true);

    const loadLiveSessionData = async () => {
        setLoading(true);
        try {
            await fetchSessionData();
            log.info('Live data refreshed successfully.');
        } catch (error) {
            log.error(`Failed to refresh live session data.`, error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadLiveSessionData();
    }, [fetchSessionData, sessionData]);

    // Manual refresh always triggers a re-fetch, regardless of existing data.
    const handleRefreshClick = async () => {
        log.debug(`Manual refresh of live session data.`);
        setLoading(true);
        try {
            await refreshSessionData;
            log.info('Live data refreshed successfully.');
        } catch (error) {
            log.error(`Failed to refresh live session data: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        sessionData,
        handleRefreshClick,
    };
};
