import log from 'loglevel';
import { useState, useContext, useEffect } from 'react';
import { BacktestContext } from '../../../contexts/BacktestContext'; 


/**
 * Custom hook for managing the dashboard state, including loading backtests,
 * handling current backtest selection, and interacting with the BacktestContext.
 *
 * @returns {Object} The state and functions needed for dashboard operation.
 */
export const useBacktest = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { getBacktest, currentBacktestId, setCurrentBacktestId, backtestsCache , groupedSummaries } = useContext(BacktestContext);
    
    const updateBacktestId = async (newId) => {
        setCurrentBacktestId(newId);
        setIsLoading(true);          
        try {
          await getBacktest(newId); 
          log.info(`Backtest data loaded for ID: ${newId}`);
        } catch (error) {
          log.error(`Failed to load backtest data for ID: ${newId}:`, error);
        } finally{
          setIsLoading(false);
        }
      };
    
    useEffect(() => {
      if (groupedSummaries && Object.keys(groupedSummaries).length > 0 && !currentBacktestId) {
          const firstKey = Object.keys(groupedSummaries)[0]; 
          const firstGroup = groupedSummaries[firstKey];   
          if (firstGroup.length > 0) {
              updateBacktestId(firstGroup[0].id);  
          }
      }
    }, []); 
    
    return {
        isLoading,
        backtestsCache,
        currentBacktestId,
        groupedSummaries,
        updateBacktestId
    };
};
