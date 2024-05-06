import log from 'loglevel';
import React, { createContext, useState, useEffect } from 'react';

import * as apiClient from "../services/apiClient";
import { convertUnixNanosecondsToISO } from "../utils/unix_time";

export const BacktestContext = createContext();

/**
 * Provides a context for managing and caching backtest data.
 * 
 * @param {Object} props - Component props containing children elements.
 */
export function BacktestProvider ({ children }) {
  const [backtestsCache, setBacktestsCache] = useState({});
  const [groupedSummaries, setGroupedSummaries] = useState({});
  const [currentBacktestId, setCurrentBacktestId] = useState(null);
  
  /**
   * Fetches backtest summaries from the server and groups them by strategy if not already cached.
   * This is called on component mount to ensure that user has data available for selection immediately.
   */
  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') { // strictly for testing purposes
      const shouldFetchSummaries = Object.keys(groupedSummaries).length === 0;
      if (shouldFetchSummaries) {
        fetchSummaries();
      }
    }
  }, []);

  /**
   * Fetches backtest summaries from the server and groups them by strategy.
   * If the summaries have already been fetched and are stored in the state,
   * it returns the cached summaries instead of re-fetching them.
   *
   * @returns {Promise<Object>} A promise that resolves to an object where keys are strategy names
   * and values are arrays of summary objects related to each strategy.
   */
  const fetchSummaries = async () => {
    try {
      const data = await apiClient.getBacktestList();
      const grouped = groupSummariesByStrategy(data);
      setGroupedSummaries(grouped);
      log.info('Summaries fetched and grouped successfully.');
    } catch (error) {
      log.error('Error fetching backtest summaries:', error);
    }
  };

  /**
   * Groups an array of summary objects by their strategy name.
   *
   * @param {Array} summaries - The array of summary objects to group. Each summary object must
   * include a 'strategy_name' property and optionally a 'parameters' property as a JSON string.
   * @returns {Object} An object where each key is a strategy name and each value is an array of
   * summaries associated with that strategy. The 'parameters' property of each summary, if present,
   * is parsed from JSON into an object.
   */
  const groupSummariesByStrategy = (summaries) => {
    return summaries.reduce((acc, summary) => {
      // Ensure the summary has a strategy name and it's not just whitespace
      if (summary.strategy_name && summary.strategy_name.trim() !== "") {
        // Initialize the strategy group if it doesn't already exist
        if (!acc[summary.strategy_name]) {
          acc[summary.strategy_name] = [];
        }
        // Add the summary to the corresponding strategy group
        acc[summary.strategy_name].push(summary);
      }
      return acc;
    }, {});
  };
  
  /**
   * Fetches backtest data by ID, utilizing cache if available.
   * 
   * @param {string} backtest_id - The ID of the backtest to fetch.
   */
  const getBacktest = async (backtest_id) => {
    // Check if the data is already in the cache
    if (!backtestsCache[backtest_id]) {
      // Fetch data from the API if not available in cache
      try {
        const data = await apiClient.getBacktestById(backtest_id);
        if (data) {
          const processedData = processBacktest(data);
          setBacktestsCache(prevCache => ({ ...prevCache, [backtest_id]: processedData }));
          log.info('Updated backtest cache', { backtest_id });
        }
      } catch (error) {
        log.error('Error fetching backtest:', error);
        throw error;
      }
    }
  };
  
  /**
   * Processes the raw backtest data, filtering and mapping timeseries stats, price data,
   * and signals to their respective processed formats. Unprocessed parts of the backtest
   * data are preserved and included in the returned object.
   * 
   * @param {Object} backtestData - The raw backtest data including timeseries_stats, price_data, and signals, along with any additional data.
   * @returns {Object} The processed backtest data, including processed timeseriesData, priceData, and signalData, along with all other unmodified backtest data.
   */
  const processBacktest = (backtestData) => {
    // Destructure the parts of backtestData that require processing
    const { timeseries_stats, price_data, signals,trades, ...restOfBacktestData } = backtestData;
    
    // Remove duplicate entries in timeseries_stats based on timestamp uniqueness (shouldn't be any )
    const preprocessedData = timeseries_stats.filter((item, index, self) =>
      index === self.findIndex((findItem) => findItem.timestamp === item.timestamp)
    );

    // Convert timeseries data to a more usable format with simplified time and normalized numerical values
    const timeseriesData = preprocessedData.map(item => ({
      timestamp: Math.floor(item.timestamp / 1000000000), // Convert nanoseconds to seconds
      equity_value: parseFloat(item.equity_value),
      period_return: parseFloat(item.period_return),
      cumulative_return: parseFloat(item.cumulative_return),
      percent_drawdown: parseFloat(item.percent_drawdown),
      daily_strategy_return: parseFloat(item.daily_strategy_return),
      daily_benchmark_return: parseFloat(item.daily_benchmark_return),
    }));
    
    // Format price data by normalizing numerical values and adjusting timestamps
    const priceData = price_data.map(item => ({
      symbol: item.symbol,
      time: Math.floor(item.timestamp / 1000000000), // Convert nanoseconds to seconds
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseInt(item.volume),
    }));

    // Enhance signal data with human-readable timestamps and maintain raw numerical values
    const signalData = signals.map(item => ({
      iso_timestamp: convertUnixNanosecondsToISO(item.timestamp), // Convert to ISO format for readability
      time: Math.floor(item.timestamp / 1000000000), // Convert nanoseconds to seconds
      trade_instructions: item.trade_instructions,
    }));

    // Process trade data to include readable timestamps and normalized numerical values
    const tradeData = trades.map(item => ({
      action: item.action,
      cost: parseFloat(item.cost),
      fees: parseFloat(item.fees),
      leg_id: parseInt(item.leg_id),
      price: parseFloat(item.price),
      quantity: parseFloat(item.quantity),
      ticker: item.ticker,
      iso_timestamp: convertUnixNanosecondsToISO(item.timestamp), // Convert to ISO format for readability
      timestamp: Math.floor(item.timestamp / 1000000000), // Convert nanoseconds to seconds
      trade_id: parseInt(item.trade_id)
    }));
  
    // Combine processed data with unmodified parts of the original dataset
    return {
      ...restOfBacktestData,
      timeseriesData,
      priceData,
      signalData,
      tradeData
    };
  };

  const contextValue = {
    fetchSummaries,
    getBacktest,
    currentBacktestId,
    setCurrentBacktestId,
    setGroupedSummaries,
    backtestsCache,
    groupedSummaries,
    setBacktestsCache
  };

  return (
    <BacktestContext.Provider value={contextValue}>
      {children}
    </BacktestContext.Provider>
  );
};
